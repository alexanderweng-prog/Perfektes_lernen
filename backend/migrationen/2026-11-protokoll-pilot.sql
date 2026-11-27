-- Migration «Protokoll für die Pilot-Messung» (Auftrag 3)
-- Voraussetzung: backend/2026-11-absichern.sql ist eingespielt (dieses lm_sync baut darauf auf: aktive_tage).
-- WICHTIG: zuerst einspielen, DANN die neue App veröffentlichen. Die neue App schickt Beispiel-Einträge mit;
-- das alte lm_sync würde sie als falsche Antworten in «antworten» speichern.
-- Einspielen: Supabase → SQL Editor → New query → alles einfügen → Run. Kann mehrfach ausgeführt werden.

/* ---------- Neue Spalten ---------- */
alter table lernmotor.antworten
  add column if not exists p_vorher real,           -- vorhergesagte Abrufwahrscheinlichkeit (FSRS) vor der Antwort, null = noch keine Planer-Karte
  add column if not exists kontrolle smallint,      -- Kontrollfrage: Stichtag in Tagen (z. B. 14, 28), sonst null
  add column if not exists kontrolle_ist real,      -- Kontrollfrage: tatsächlicher Abstand in Tagen seit dem ersten Abruf
  add column if not exists versuch smallint,        -- Hinweisleiter (Auftrag 2): Anzahl Versuche
  add column if not exists hilfsstufe smallint,     -- 0 keine, 1 Denkanstoss, 2 Hilfe, 3 Lösung
  add column if not exists richtig_am_ende boolean, -- richtig nach dem letzten Versuch («richtig» = erster Versuch)
  add column if not exists app_version text,
  add column if not exists einstellungen text;      -- Kennung von motor/einstellungen.js

alter table lernmotor.sitzungen
  add column if not exists app_version text,
  add column if not exists einstellungen text;

-- Beispiel-Schritte: Lesezeit, keine Antwort. Eigene Tabelle, damit die Trefferquoten im Dashboard unberührt bleiben.
create table if not exists lernmotor.beispiele (
  id bigint generated always as identity primary key,
  lernende uuid not null references lernmotor.lernende(id) on delete cascade,
  klasse uuid not null,
  paket text not null,
  sitzung text,
  aufgabe text,                 -- vorgerechnete Aufgabe, null = nur Lernkarte gezeigt
  lernziel text not null,
  zeit timestamptz not null,
  dauer_ms int,
  app_version text,
  einstellungen text
);
create index if not exists beispiele_klasse on lernmotor.beispiele(klasse, paket, zeit);
create index if not exists beispiele_lernende on lernmotor.beispiele(lernende);
alter table lernmotor.beispiele enable row level security;  -- keine Policies: nur über Funktionen

/* ---------- lm_sync: neue Felder speichern, Beispiele getrennt ablegen ---------- */
-- Wert auf einen Bereich begrenzen, null bleibt null (greatest/least würden aus null die Grenze machen)
create or replace function lernmotor.begrenzt(x numeric, unten numeric, oben numeric) returns numeric
language sql immutable set search_path = '' as $$ select case when x is null then null else least(greatest(x, unten), oben) end $$;
revoke all on function lernmotor.begrenzt(numeric, numeric, numeric) from public, anon, authenticated;

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
                                   p_vorher, kontrolle, kontrolle_ist, versuch, hilfsstufe, richtig_am_ende, app_version, einstellungen)
  select r.id, r.klasse, p_paket, left(a ->> 'sitzung', 40), left(a ->> 'aufgabe', 120), left(a ->> 'lernziel', 120), left(a ->> 'typ', 20),
         left(a ->> 'phase', 20), coalesce((a ->> 'richtig')::boolean, false), (a ->> 'punkte')::real, left(a ->> 'gewaehlt', 200),
         nullif(a ->> 'sicherheit', ''), coalesce((a ->> 'nachPause')::boolean, false),
         least(coalesce((a ->> 'zeit')::timestamptz, now()), now()), least(greatest((a ->> 'dauerMs')::bigint, 0), 3600000)::int,
         lernmotor.begrenzt((a ->> 'pVorher')::numeric, 0, 1)::real, lernmotor.begrenzt((a ->> 'kontrolle')::numeric, 0, 1000)::smallint,
         lernmotor.begrenzt((a ->> 'kontrolleIst')::numeric, 0, 1000)::real, lernmotor.begrenzt((a ->> 'versuch')::numeric, 1, 20)::smallint,
         lernmotor.begrenzt((a ->> 'hilfsstufe')::numeric, 0, 3)::smallint, (a ->> 'richtigAmEnde')::boolean,
         left(a ->> 'app', 40), left(a ->> 'einstellungen', 40)
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

/* ---------- Klassenwertung: serverseitig ausgeschaltet ---------- */
-- Der Schalter in motor/einstellungen.js wirkt nur in der App. Damit die Rangfolge auch über einen direkten
-- Aufruf nicht erscheint, liefert lm_klassenwertung leer, solange dieser Wert false ist.
create or replace function lernmotor.klassenwertung_an() returns boolean language sql immutable set search_path = '' as $$ select false $$;

create or replace function public.lm_klassenwertung(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code); woche timestamptz;
begin
  if not lernmotor.klassenwertung_an() then return '[]'::jsonb; end if;
  woche := (date_trunc('week', now() at time zone 'Europe/Zurich')) at time zone 'Europe/Zurich';
  return coalesce((
    select jsonb_agg(jsonb_build_object('team', x.teamname, 'anteil', x.anteil, 'eigene', x.id = r.klasse) order by x.anteil desc, x.teamname)
    from (
      select k.id, k.teamname,
        round((select count(distinct s.lernende) from lernmotor.sitzungen s where s.klasse = k.id and s.art = 'block' and s.ende >= woche)::numeric
              / nullif((select count(*) from lernmotor.lernende l where l.klasse = k.id), 0), 2) as anteil
      from lernmotor.klassen k
      where k.schule = (select schule from lernmotor.klassen where id = r.klasse)
        and (select count(*) from lernmotor.lernende l where l.klasse = k.id) >= lernmotor.min_gruppe()
    ) x), '[]'::jsonb);
end $$;

revoke all on function lernmotor.klassenwertung_an() from public, anon, authenticated;
