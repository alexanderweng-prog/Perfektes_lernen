-- Migration «Taxonomiestufen» (Auftrag 4)
-- Neu im Protokoll: Bloom-Stufe der Aufgabe (null = Grundstufe ohne Angabe). Der Aufgabentyp steht schon in «typ»,
-- die neuen Typen (fehler, daten, vergleich, versuch, vorhersage) sind höchstens 20 Zeichen lang.
-- Voraussetzung: backend/migrationen/2026-11-protokoll-pilot.sql ist eingespielt.
-- Einspielen VOR der Veröffentlichung der App: Supabase → SQL Editor → alles einfügen → Run. Kann mehrfach ausgeführt werden.
-- (Die App schickt «stufe» auch ohne diese Migration; das alte lm_sync verwirft das Feld dann nur.)

alter table lernmotor.antworten add column if not exists stufe smallint; -- 1–6, null = ohne Angabe (Grundstufe)

-- lm_sync wie in 2026-11-protokoll-pilot.sql, zusätzlich mit «stufe»
create or replace function public.lm_sync(p_code text, p_paket text, p_daten jsonb, p_status jsonb, p_antworten jsonb, p_sitzungen jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code); v int;
begin
  if char_length(p_paket) > 40 or pg_column_size(p_daten) > 500000 then raise exception 'Daten zu gross'; end if;
  if jsonb_array_length(coalesce(p_antworten, '[]')) > 500 or jsonb_array_length(coalesce(p_sitzungen, '[]')) > 50 then
    raise exception 'Zu viele Einträge auf einmal';
  end if;
  insert into lernmotor.aktive_tage (lernende, tag) values (r.id, (now() at time zone 'Europe/Zurich')::date)
  on conflict do nothing;

  insert into lernmotor.lernstand (lernende, paket, daten, version) values (r.id, p_paket, p_daten, 1)
  on conflict (lernende, paket) do update set daten = excluded.daten, version = lernmotor.lernstand.version + 1, aktualisiert = now()
  returning version into v;

  if p_status is not null then
    delete from lernmotor.lernziel_status where lernende = r.id and paket = p_paket;
    insert into lernmotor.lernziel_status (lernende, paket, lernziel, status)
    select r.id, p_paket, left(key, 120), value #>> '{}' from jsonb_each(p_status)
    where value #>> '{}' in ('wackelt', 'sitzt');
  end if;

  insert into lernmotor.antworten (lernende, klasse, paket, sitzung, aufgabe, lernziel, typ, phase, richtig, punkte, gewaehlt, sicherheit, nach_pause, zeit, dauer_ms,
                                   p_vorher, kontrolle, kontrolle_ist, versuch, hilfsstufe, richtig_am_ende, app_version, einstellungen, stufe)
  select r.id, r.klasse, p_paket, left(a ->> 'sitzung', 40), left(a ->> 'aufgabe', 120), left(a ->> 'lernziel', 120), left(a ->> 'typ', 20),
         left(a ->> 'phase', 20), coalesce((a ->> 'richtig')::boolean, false), (a ->> 'punkte')::real, left(a ->> 'gewaehlt', 200),
         nullif(a ->> 'sicherheit', ''), coalesce((a ->> 'nachPause')::boolean, false),
         least(coalesce((a ->> 'zeit')::timestamptz, now()), now()), least(greatest((a ->> 'dauerMs')::bigint, 0), 3600000)::int,
         lernmotor.begrenzt((a ->> 'pVorher')::numeric, 0, 1)::real, lernmotor.begrenzt((a ->> 'kontrolle')::numeric, 0, 1000)::smallint,
         lernmotor.begrenzt((a ->> 'kontrolleIst')::numeric, 0, 1000)::real, lernmotor.begrenzt((a ->> 'versuch')::numeric, 1, 20)::smallint,
         lernmotor.begrenzt((a ->> 'hilfsstufe')::numeric, 0, 3)::smallint, (a ->> 'richtigAmEnde')::boolean,
         left(a ->> 'app', 40), left(a ->> 'einstellungen', 40), lernmotor.begrenzt((a ->> 'stufe')::numeric, 1, 6)::smallint
  from jsonb_array_elements(coalesce(p_antworten, '[]')) a
  where coalesce(a ->> 'phase', '') <> 'beispiel'
    and (a ->> 'sicherheit' is null or a ->> 'sicherheit' in ('sicher', 'unsicher', 'geraten'));

  insert into lernmotor.beispiele (lernende, klasse, paket, sitzung, aufgabe, lernziel, zeit, dauer_ms, app_version, einstellungen)
  select r.id, r.klasse, p_paket, left(a ->> 'sitzung', 40), left(a ->> 'aufgabe', 120), left(coalesce(a ->> 'lernziel', ''), 120),
         least(coalesce((a ->> 'zeit')::timestamptz, now()), now()), least(greatest((a ->> 'dauerMs')::bigint, 0), 3600000)::int,
         left(a ->> 'app', 40), left(a ->> 'einstellungen', 40)
  from jsonb_array_elements(coalesce(p_antworten, '[]')) a
  where a ->> 'phase' = 'beispiel';

  insert into lernmotor.sitzungen (lernende, id, klasse, paket, art, start, ende, aufgaben, abrufe, richtig, pause_nach, abgebrochen, app_version, einstellungen)
  select r.id, left(s ->> 'id', 40), r.klasse, p_paket, s ->> 'art', (s ->> 'start')::timestamptz, least((s ->> 'ende')::timestamptz, now()),
         (s ->> 'aufgaben')::int, (s ->> 'abrufe')::int, (s ->> 'richtig')::int, (s ->> 'pauseHinweisNach')::int, coalesce((s ->> 'abgebrochenNachPause')::boolean, false),
         left(s ->> 'app', 40), left(s ->> 'einstellungen', 40)
  from jsonb_array_elements(coalesce(p_sitzungen, '[]')) s
  where s ->> 'art' in ('block', 'zusatz')
  on conflict (lernende, id) do nothing;

  return jsonb_build_object('version', v);
end $$;
