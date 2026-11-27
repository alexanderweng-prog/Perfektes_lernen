-- Migration «Backend absichern» (Review November 2026)
-- 1. Freigaben setzen/zurückziehen nur für Konten aus lernmotor.admins
-- 2. Dashboard «Fehlvorstellungen»: Mindestgruppe (5 Kinder) auch pro Option und für «sicher falsch»
-- 3. Dashboard zählt nur Kinder mit Aktivität an mindestens 3 verschiedenen Tagen (Serverzeit),
--    damit erfundene Kinder die Mindestgruppe nicht sofort aushebeln
--
-- Voraussetzung: schema.sql (bzw. nachtrag.sql) und freigaben.sql sind eingespielt.
-- Einspielen: Supabase → SQL Editor → New query → alles einfügen → Run. Danach haertung.sql.
-- Kann mehrfach ausgeführt werden.

/* ---------- 1 Admin-Liste für Freigaben ---------- */

create table if not exists lernmotor.admins (
  benutzer uuid primary key references auth.users(id) on delete cascade,
  notiz text check (char_length(notiz) <= 60),
  erstellt timestamptz not null default now()
);
alter table lernmotor.admins enable row level security;  -- keine Policies: nur über Funktionen

-- Eigene ID eintragen (Platzhalter ersetzen). Die ID steht unter Authentication → Users → User UID,
-- oder: select id, email from auth.users;
-- insert into lernmotor.admins (benutzer, notiz) values ('00000000-0000-0000-0000-000000000000', 'Inhalte freigeben') on conflict do nothing;

-- Angemeldete Lehrperson, die in der Admin-Liste steht, sonst Fehler 42501
create or replace function lernmotor.admin() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare lp uuid := lernmotor.lehrperson();
begin
  if not exists (select 1 from lernmotor.admins where benutzer = lp) then
    raise exception 'Nur für Admins: Inhalte freigeben und zurückziehen' using errcode = '42501';
  end if;
  return lp;
end $$;

create or replace function public.lm_freigabe_setzen(p_eintraege text[], p_status text) returns int
language plpgsql security definer set search_path = '' as $$
declare lp uuid := lernmotor.admin(); n int;
begin
  if p_status is null or p_status not in ('geprueft', 'zurueckgezogen', 'entwurf') then raise exception 'Status ungültig'; end if;
  if array_length(p_eintraege, 1) > 1000 then raise exception 'Zu viele Einträge'; end if;
  if p_status = 'entwurf' then
    delete from lernmotor.freigaben where eintrag = any(p_eintraege);
  else
    insert into lernmotor.freigaben (eintrag, status) select e, p_status from unnest(p_eintraege) e
    on conflict (eintrag) do update set status = excluded.status, geaendert = now();
  end if;
  get diagnostics n = row_count;
  return n;
end $$;

/* ---------- 3 Aktive Tage (Serverzeit) ---------- */

-- Pro Kind die Tage, an denen es Daten geschickt hat. Gesetzt wird nur vom Server (now()),
-- die Zeitangaben aus der App (antworten.zeit) sind fälschbar und zählen dafür nicht.
create table if not exists lernmotor.aktive_tage (
  lernende uuid not null references lernmotor.lernende(id) on delete cascade,
  tag date not null,
  primary key (lernende, tag)
);
alter table lernmotor.aktive_tage enable row level security;

create or replace function lernmotor.min_aktive_tage() returns int language sql immutable set search_path = '' as $$ select 3 $$;

-- Kinder einer Klasse, die im Dashboard zählen
create or replace function lernmotor.gezaehlte_kinder(p_klasse uuid) returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(l.id), '{}') from lernmotor.lernende l
  where l.klasse = p_klasse
    and (select count(*) from lernmotor.aktive_tage t where t.lernende = l.id) >= lernmotor.min_aktive_tage()
$$;

-- lm_sync: unverändert bis auf den Eintrag in aktive_tage (Zeile «aktiver Tag»)
create or replace function public.lm_sync(p_code text, p_paket text, p_daten jsonb, p_status jsonb, p_antworten jsonb, p_sitzungen jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code); v int;
begin
  if char_length(p_paket) > 40 or pg_column_size(p_daten) > 500000 then raise exception 'Daten zu gross'; end if;
  if jsonb_array_length(coalesce(p_antworten, '[]')) > 500 or jsonb_array_length(coalesce(p_sitzungen, '[]')) > 50 then
    raise exception 'Zu viele Einträge auf einmal';
  end if;
  insert into lernmotor.aktive_tage (lernende, tag) values (r.id, (now() at time zone 'Europe/Zurich')::date)
  on conflict do nothing;  -- aktiver Tag

  insert into lernmotor.lernstand (lernende, paket, daten, version) values (r.id, p_paket, p_daten, 1)
  on conflict (lernende, paket) do update set daten = excluded.daten, version = lernmotor.lernstand.version + 1, aktualisiert = now()
  returning version into v;

  if p_status is not null then
    delete from lernmotor.lernziel_status where lernende = r.id and paket = p_paket;
    insert into lernmotor.lernziel_status (lernende, paket, lernziel, status)
    select r.id, p_paket, left(key, 120), value #>> '{}' from jsonb_each(p_status)
    where value #>> '{}' in ('wackelt', 'sitzt');
  end if;

  insert into lernmotor.antworten (lernende, klasse, paket, sitzung, aufgabe, lernziel, typ, phase, richtig, punkte, gewaehlt, sicherheit, nach_pause, zeit, dauer_ms)
  select r.id, r.klasse, p_paket, left(a ->> 'sitzung', 40), left(a ->> 'aufgabe', 120), left(a ->> 'lernziel', 120), left(a ->> 'typ', 20),
         left(a ->> 'phase', 20), coalesce((a ->> 'richtig')::boolean, false), (a ->> 'punkte')::real, left(a ->> 'gewaehlt', 200),
         nullif(a ->> 'sicherheit', ''), coalesce((a ->> 'nachPause')::boolean, false),
         least(coalesce((a ->> 'zeit')::timestamptz, now()), now()), least(greatest((a ->> 'dauerMs')::bigint, 0), 3600000)::int
  from jsonb_array_elements(coalesce(p_antworten, '[]')) a
  where a ->> 'sicherheit' is null or a ->> 'sicherheit' in ('sicher', 'unsicher', 'geraten');

  insert into lernmotor.sitzungen (lernende, id, klasse, paket, art, start, ende, aufgaben, abrufe, richtig, pause_nach, abgebrochen)
  select r.id, left(s ->> 'id', 40), r.klasse, p_paket, s ->> 'art', (s ->> 'start')::timestamptz, least((s ->> 'ende')::timestamptz, now()),
         (s ->> 'aufgaben')::int, (s ->> 'abrufe')::int, (s ->> 'richtig')::int, (s ->> 'pauseHinweisNach')::int, coalesce((s ->> 'abgebrochenNachPause')::boolean, false)
  from jsonb_array_elements(coalesce(p_sitzungen, '[]')) s
  where s ->> 'art' in ('block', 'zusatz')
  on conflict (lernende, id) do nothing;

  return jsonb_build_object('version', v);
end $$;

/* ---------- 2 + 3 Dashboard ---------- */

-- Wie bisher, aber:
--  * alle Zahlen nur über «gezählte» Kinder (mind. 3 aktive Tage); «mitglieder» = gezählte Kinder, «registriert» = alle
--  * Fehlvorstellungen: eine Option erscheint nur, wenn sie von mind. 5 Kindern gewählt wurde;
--    «sicherFalsch» nur, wenn mind. 5 Kinder diese Option «sicher» gewählt haben, sonst null
create or replace function public.lm_dashboard(p_klasse uuid, p_paket text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  k lernmotor.klassen := lernmotor.meine_klasse(p_klasse);
  m int := lernmotor.min_gruppe();
  ids uuid[] := lernmotor.gezaehlte_kinder(k.id);
  registriert int; mitglieder int := cardinality(ids); aktiv int;
  woche timestamptz; t7 timestamptz := now() - interval '7 days'; t14 timestamptz := now() - interval '14 days';
  res jsonb;
begin
  select count(*) into registriert from lernmotor.lernende where klasse = k.id;
  if mitglieder < m then
    return jsonb_build_object('zuKlein', true, 'mitglieder', mitglieder, 'registriert', registriert, 'minGruppe', m, 'minTage', lernmotor.min_aktive_tage());
  end if;
  select count(*) into aktiv from lernmotor.lernstand s where s.lernende = any(ids) and s.paket = p_paket;
  woche := (date_trunc('week', now() at time zone 'Europe/Zurich')) at time zone 'Europe/Zurich';

  res := jsonb_build_object('mitglieder', mitglieder, 'registriert', registriert, 'aktiv', aktiv, 'minGruppe', m, 'minTage', lernmotor.min_aktive_tage());

  -- 1 Klassenübersicht: Anteil sitzt / wackelt / neu pro Lernziel
  res := res || jsonb_build_object('uebersicht', case when aktiv < m then null else coalesce((
    select jsonb_agg(jsonb_build_object('lernziel', lernziel, 'sitzt', sitzt, 'wackelt', wackelt, 'neu', aktiv - sitzt - wackelt) order by wackelt desc)
    from (select st.lernziel, count(*) filter (where st.status = 'sitzt') sitzt, count(*) filter (where st.status = 'wackelt') wackelt
          from lernmotor.lernziel_status st
          where st.lernende = any(ids) and st.paket = p_paket group by st.lernziel) x), '[]'::jsonb) end);

  -- 2 Problem-Lernziele: tiefste Trefferquote der letzten 7 Tage, mit Vorwoche
  res := res || jsonb_build_object('problemLernziele', coalesce((
    select jsonb_agg(jsonb_build_object('lernziel', lernziel, 'quote', quote, 'kinder', kinder, 'vorwoche', vorwoche) order by quote)
    from (
      select a.lernziel, round(avg(a.richtig::int), 2) quote, count(distinct a.lernende) kinder,
        (select round(avg(b.richtig::int), 2) from lernmotor.antworten b
          where b.klasse = k.id and b.lernende = any(ids) and b.paket = p_paket and b.lernziel = a.lernziel and b.zeit >= t14 and b.zeit < t7
            and b.phase in ('faellig', 'neu', 'nochmals')
          having count(distinct b.lernende) >= m) vorwoche
      from lernmotor.antworten a
      where a.klasse = k.id and a.lernende = any(ids) and a.paket = p_paket and a.zeit >= t7 and a.phase in ('faellig', 'neu', 'nochmals')
      group by a.lernziel having count(distinct a.lernende) >= m
      order by 2 limit 5) x), '[]'::jsonb));

  -- 3 Häufige Fehlvorstellungen: pro MC-Aufgabe die häufigste falsche Option (letzte 28 Tage),
  --   nur Optionen, die mindestens m verschiedene Kinder gewählt haben
  res := res || jsonb_build_object('fehlvorstellungen', coalesce((
    select jsonb_agg(jsonb_build_object('aufgabe', aufgabe, 'option', gewaehlt, 'anteil', anteil, 'sicherFalsch', sicher_falsch, 'kinder', kinder) order by anteil desc)
    from (
      select distinct on (a.aufgabe) a.aufgabe, a.gewaehlt,
        round(count(*)::numeric / t.n, 2) anteil,
        case when count(distinct a.lernende) filter (where a.sicherheit = 'sicher') >= m
             then count(*) filter (where a.sicherheit = 'sicher') end sicher_falsch,
        t.kinder
      from lernmotor.antworten a
      join (select aufgabe, count(*) n, count(distinct lernende) kinder from lernmotor.antworten
            where klasse = k.id and lernende = any(ids) and paket = p_paket and typ = 'mc' and zeit >= now() - interval '28 days' group by aufgabe
            having count(distinct lernende) >= m) t on t.aufgabe = a.aufgabe
      where a.klasse = k.id and a.lernende = any(ids) and a.paket = p_paket and a.typ = 'mc' and not a.richtig and a.zeit >= now() - interval '28 days'
      group by a.aufgabe, a.gewaehlt, t.n, t.kinder
      having count(distinct a.lernende) >= m
      order by a.aufgabe, count(*) desc) x
    where anteil >= 0.2), '[]'::jsonb));

  -- 4 Nutzung: Anteil der (gezählten) Klasse mit mindestens einem Wiederholungsblock diese Woche
  res := res || jsonb_build_object('nutzung', jsonb_build_object(
    'woche', round((select count(distinct lernende) from lernmotor.sitzungen where klasse = k.id and lernende = any(ids) and art = 'block' and ende >= woche)::numeric / mitglieder, 2),
    'vorwoche', round((select count(distinct lernende) from lernmotor.sitzungen where klasse = k.id and lernende = any(ids) and art = 'block'
                       and ende >= woche - interval '7 days' and ende < woche)::numeric / mitglieder, 2)));

  -- 5 Sitzungslänge: wie oft der Pausenhinweis kommt und nach wie vielen Aufgaben (28 Tage)
  res := res || jsonb_build_object('sitzungslaenge', (
    select case when count(distinct lernende) < m then null else jsonb_build_object(
      'bloecke', count(*), 'anteilPause', round(avg((pause_nach is not null)::int), 2),
      'pauseNachSchnitt', round(avg(pause_nach), 1), 'aufgabenSchnitt', round(avg(aufgaben), 1),
      'minutenSchnitt', round(avg(extract(epoch from (ende - start)) / 60)::numeric, 1)) end
    from lernmotor.sitzungen where klasse = k.id and lernende = any(ids) and paket = p_paket and art = 'block' and ende >= now() - interval '28 days'));

  -- 6 Aufgabenqualität: Aufgaben, die fast alle falsch haben (60 Tage)
  res := res || jsonb_build_object('aufgabenQualitaet', coalesce((
    select jsonb_agg(jsonb_build_object('aufgabe', aufgabe, 'quote', quote, 'kinder', kinder) order by quote)
    from (select aufgabe, round(avg(richtig::int), 2) quote, count(distinct lernende) kinder from lernmotor.antworten
          where klasse = k.id and lernende = any(ids) and paket = p_paket and zeit >= now() - interval '60 days' and phase <> 'mitHilfe'
          group by aufgabe having count(distinct lernende) >= m and avg(richtig::int) < 0.3) x), '[]'::jsonb));

  return res;
end $$;

/* ---------- Rechte ---------- */
-- Neue Hilfsfunktionen: nicht von aussen aufrufbar (Schema lernmotor ist ohnehin gesperrt, das ist eine zweite Sperre)
revoke all on function lernmotor.admin(), lernmotor.min_aktive_tage(), lernmotor.gezaehlte_kinder(uuid) from public, anon, authenticated;
-- Lehrpersonen-Funktionen: nur angemeldet (gleich wie haertung.sql; schadet nicht doppelt)
revoke execute on function public.lm_freigabe_setzen(text[], text), public.lm_dashboard(uuid, text) from public, anon;
grant execute on function public.lm_freigabe_setzen(text[], text), public.lm_dashboard(uuid, text) to authenticated;
