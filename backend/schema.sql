-- Lern-Motor: Backend (Supabase / Postgres)
-- Grundsätze (siehe Konzept, Abschnitt Datenschutz):
--  * Kinder: nur Pseudonym + Klasse, kein Name, keine E-Mail. Anmeldung mit einem persönlichen Lerncode.
--  * Alle Tabellen liegen im Schema «lernmotor», das über die API nicht erreichbar ist.
--    Zugriff nur über die Funktionen lm_* (security definer), die selbst prüfen, wer was darf.
--  * Das Dashboard bekommt nur Summen. Die Mindestgruppengrösse (5 Kinder) wird hier in der Datenbank erzwungen.
--  * Kinder können ihre Daten selbst löschen. Klassen werden nach Ablauf (Standard: 31. Juli) automatisch gelöscht.
-- Das Skript kann mehrfach ausgeführt werden.

create schema if not exists lernmotor;
revoke all on schema lernmotor from public, anon, authenticated;

create table if not exists lernmotor.klassen (
  id uuid primary key default gen_random_uuid(),
  lehrperson uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 40),     -- nur die Lehrperson sieht ihn
  teamname text not null,                                            -- Zufallsname für die Klassenwertung
  klassencode text not null unique,
  schule text not null default 'halingen',
  loeschen_ab date not null,
  erstellt timestamptz not null default now()
);

create table if not exists lernmotor.lernende (
  id uuid primary key default gen_random_uuid(),
  klasse uuid not null references lernmotor.klassen(id) on delete cascade,
  pseudonym text not null,
  code_hash text not null unique,
  erstellt timestamptz not null default now(),
  zuletzt timestamptz not null default now()
);
create index if not exists lernende_klasse on lernmotor.lernende(klasse);

create table if not exists lernmotor.lernstand (
  lernende uuid not null references lernmotor.lernende(id) on delete cascade,
  paket text not null,
  daten jsonb not null,
  version int not null default 0,
  aktualisiert timestamptz not null default now(),
  primary key (lernende, paket)
);

create table if not exists lernmotor.lernziel_status (
  lernende uuid not null references lernmotor.lernende(id) on delete cascade,
  paket text not null,
  lernziel text not null,
  status text not null check (status in ('wackelt', 'sitzt')),
  primary key (lernende, paket, lernziel)
);

create table if not exists lernmotor.antworten (
  id bigint generated always as identity primary key,
  lernende uuid not null references lernmotor.lernende(id) on delete cascade,
  klasse uuid not null,
  paket text not null,
  sitzung text,
  aufgabe text not null,
  lernziel text not null,
  typ text,
  phase text,
  richtig boolean not null,
  punkte real,
  gewaehlt text,
  sicherheit text check (sicherheit in ('sicher', 'unsicher', 'geraten')),
  nach_pause boolean not null default false,
  zeit timestamptz not null,
  dauer_ms int
);
create index if not exists antworten_klasse on lernmotor.antworten(klasse, paket, zeit);
create index if not exists antworten_lernende on lernmotor.antworten(lernende);

create table if not exists lernmotor.sitzungen (
  lernende uuid not null references lernmotor.lernende(id) on delete cascade,
  id text not null,
  klasse uuid not null,
  paket text not null,
  art text not null check (art in ('block', 'zusatz')),
  start timestamptz, ende timestamptz,
  aufgaben int, abrufe int, richtig int,
  pause_nach int, abgebrochen boolean,
  primary key (lernende, id)
);
create index if not exists sitzungen_klasse on lernmotor.sitzungen(klasse, ende);

alter table lernmotor.klassen enable row level security;
alter table lernmotor.lernende enable row level security;
alter table lernmotor.lernstand enable row level security;
alter table lernmotor.lernziel_status enable row level security;
alter table lernmotor.antworten enable row level security;
alter table lernmotor.sitzungen enable row level security;
-- Keine Policies: direkter Zugriff ist für alle Rollen gesperrt.

/* ---------- Hilfsfunktionen (nicht von aussen aufrufbar) ---------- */

create or replace function lernmotor.min_gruppe() returns int language sql immutable as $$ select 5 $$;

create or replace function lernmotor.hash(p text) returns text language sql immutable as $$
  select encode(sha256(convert_to(lower(regexp_replace(coalesce(p, ''), '[^a-zA-Z0-9]', '', 'g')), 'UTF8')), 'hex')
$$;

create or replace function lernmotor.wort(i int) returns text language sql immutable as $$
  select (array['apfel','ast','bach','ball','banane','berg','birne','blatt','blitz','blume','boot','brot','burg','dach','delfin','drache',
  'eiche','eimer','eis','elch','ente','erde','esel','falke','farbe','feder','feld','fels','fisch','flagge','floss','fluss','frosch','fuchs',
  'gabel','gans','garten','geige','gold','gras','hafen','hai','hase','haus','hecht','held','hirsch','honig','horn','hut','igel','insel',
  'jacke','kaktus','kamel','kanu','karte','katze','kerze','kiwi','koala','komet','kompass','krone','kuchen','lampe','laterne','lava',
  'leiter','lemur','licht','loewe','luchs','magnet','mais','mantel','maus','meer','melone','mond','moos','muschel','nebel','nest','nuss',
  'ofen','orange','otter','palme','panda','papier','pferd','pilz','pinguin','planet','quelle','rabe','rakete','regen','ring','robbe',
  'rose','sand','schaf','schiff','see','segel','sonne','stern','sturm','tal','tanne','tiger','tisch','tropfen','turm','uhr','vogel',
  'vulkan','wal','wald','welle','wind','wolf','wolke','zebra','zelt','zug'])[(i % 128) + 1]
$$;

create or replace function lernmotor.zufall(n int) returns int language sql volatile as $$
  select ((get_byte(b, 0) * 65536 + get_byte(b, 1) * 256 + get_byte(b, 2)) % n)
  from (select extensions.gen_random_bytes(3) as b) x
$$;

-- Lerncode: drei Wörter und vier Ziffern, z. B. «tiger-mond-segel-4821» (ca. 34 Bit Zufall)
create or replace function lernmotor.neuer_lerncode() returns text language sql volatile as $$
  select lernmotor.wort(lernmotor.zufall(128)) || '-' || lernmotor.wort(lernmotor.zufall(128)) || '-' ||
         lernmotor.wort(lernmotor.zufall(128)) || '-' || lpad(lernmotor.zufall(10000)::text, 4, '0')
$$;

create or replace function lernmotor.gross(t text) returns text language sql immutable as $$ select upper(left(t, 1)) || substr(t, 2) $$;

create or replace function lernmotor.kind(p_code text) returns lernmotor.lernende
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende;
begin
  select * into r from lernmotor.lernende where code_hash = lernmotor.hash(p_code);
  if r.id is null then raise exception 'Lerncode unbekannt' using errcode = 'P0002'; end if;
  update lernmotor.lernende set zuletzt = now() where id = r.id;
  return r;
end $$;

-- Lehrperson = angemeldet mit E-Mail (nicht anonym)
create or replace function lernmotor.lehrperson() returns uuid
language plpgsql stable security definer set search_path = '' as $$
begin
  if auth.uid() is null or coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false) then
    raise exception 'Nur für angemeldete Lehrpersonen' using errcode = '42501';
  end if;
  return auth.uid();
end $$;

create or replace function lernmotor.meine_klasse(p_klasse uuid) returns lernmotor.klassen
language plpgsql stable security definer set search_path = '' as $$
declare k lernmotor.klassen;
begin
  select * into k from lernmotor.klassen where id = p_klasse and lehrperson = lernmotor.lehrperson();
  if k.id is null then raise exception 'Klasse nicht gefunden' using errcode = 'P0002'; end if;
  return k;
end $$;

/* ---------- Kinder (Rolle anon, Anmeldung mit Lerncode) ---------- */

create or replace function public.lm_registrieren(p_klassencode text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare k lernmotor.klassen; code text; pseudo text;
begin
  select * into k from lernmotor.klassen where klassencode = upper(btrim(p_klassencode)) and loeschen_ab >= current_date;
  if k.id is null then raise exception 'Klassencode unbekannt' using errcode = 'P0002'; end if;
  if (select count(*) from lernmotor.lernende where klasse = k.id) >= 60 then raise exception 'Klasse ist voll'; end if;
  loop
    code := lernmotor.neuer_lerncode();
    exit when not exists (select 1 from lernmotor.lernende where code_hash = lernmotor.hash(code));
  end loop;
  pseudo := lernmotor.gross(lernmotor.wort(lernmotor.zufall(128))) || '-' || lernmotor.gross(lernmotor.wort(lernmotor.zufall(128))) || '-' || (10 + lernmotor.zufall(90));
  insert into lernmotor.lernende (klasse, pseudonym, code_hash) values (k.id, pseudo, lernmotor.hash(code));
  return jsonb_build_object('lerncode', code, 'pseudonym', pseudo, 'team', k.teamname);
end $$;

create or replace function public.lm_anmelden(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code);
begin
  return jsonb_build_object(
    'pseudonym', r.pseudonym,
    'team', (select teamname from lernmotor.klassen where id = r.klasse),
    'lernstand', coalesce((select jsonb_object_agg(paket, jsonb_build_object('daten', daten, 'version', version))
                            from lernmotor.lernstand where lernende = r.id), '{}'::jsonb));
end $$;

-- Speichert Lernstand, Lernziel-Status, neue Antworten und Sitzungen in einem Schritt.
create or replace function public.lm_sync(p_code text, p_paket text, p_daten jsonb, p_status jsonb, p_antworten jsonb, p_sitzungen jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code); v int;
begin
  if char_length(p_paket) > 40 or pg_column_size(p_daten) > 500000 then raise exception 'Daten zu gross'; end if;
  if jsonb_array_length(coalesce(p_antworten, '[]')) > 500 or jsonb_array_length(coalesce(p_sitzungen, '[]')) > 50 then
    raise exception 'Zu viele Einträge auf einmal';
  end if;
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

create or replace function public.lm_daten_loeschen(p_code text) returns void
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code);
begin
  delete from lernmotor.lernende where id = r.id;  -- löscht Lernstand, Antworten und Sitzungen mit
end $$;

-- Klassenwertung innerhalb der Schule: Anteil der Klasse, der diese Woche einen Block gemacht hat.
-- Nur Klassen mit mindestens 5 Kindern, nur Teamnamen.
create or replace function public.lm_klassenwertung(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code); woche timestamptz;
begin
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

/* ---------- Lehrpersonen (Rolle authenticated, Login mit E-Mail) ---------- */

create or replace function public.lm_klasse_erstellen(p_name text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare lp uuid := lernmotor.lehrperson(); code text; team text; bis date; k lernmotor.klassen;
begin
  loop
    code := 'K' || (select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', lernmotor.zufall(31) + 1, 1), '') from generate_series(1, 5));
    exit when not exists (select 1 from lernmotor.klassen where klassencode = code);
  end loop;
  team := 'Team ' || lernmotor.gross(lernmotor.wort(lernmotor.zufall(128)));
  bis := make_date(extract(year from current_date)::int + case when extract(month from current_date) >= 8 then 1 else 0 end, 7, 31);
  insert into lernmotor.klassen (lehrperson, name, teamname, klassencode, loeschen_ab)
  values (lp, left(btrim(p_name), 40), team, code, bis) returning * into k;
  return jsonb_build_object('id', k.id, 'name', k.name, 'teamname', k.teamname, 'klassencode', k.klassencode, 'loeschen_ab', k.loeschen_ab);
end $$;

create or replace function public.lm_meine_klassen() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare lp uuid := lernmotor.lehrperson();
begin
  return coalesce((select jsonb_agg(jsonb_build_object('id', k.id, 'name', k.name, 'teamname', k.teamname, 'klassencode', k.klassencode,
      'loeschen_ab', k.loeschen_ab, 'mitglieder', (select count(*) from lernmotor.lernende l where l.klasse = k.id)) order by k.erstellt)
    from lernmotor.klassen k where k.lehrperson = lp), '[]'::jsonb);
end $$;

create or replace function public.lm_klasse_loeschen(p_klasse uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare k lernmotor.klassen := lernmotor.meine_klasse(p_klasse);
begin
  delete from lernmotor.antworten where klasse = k.id;
  delete from lernmotor.sitzungen where klasse = k.id;
  delete from lernmotor.klassen where id = k.id;
end $$;

-- Dashboard: nur Summen, jede Zelle mit mindestens 5 verschiedenen Kindern, sonst fehlt sie.
create or replace function public.lm_dashboard(p_klasse uuid, p_paket text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  k lernmotor.klassen := lernmotor.meine_klasse(p_klasse);
  m int := lernmotor.min_gruppe();
  mitglieder int; aktiv int; woche timestamptz; t7 timestamptz := now() - interval '7 days'; t14 timestamptz := now() - interval '14 days';
  res jsonb;
begin
  select count(*) into mitglieder from lernmotor.lernende where klasse = k.id;
  if mitglieder < m then
    return jsonb_build_object('zuKlein', true, 'mitglieder', mitglieder, 'minGruppe', m);
  end if;
  select count(*) into aktiv from lernmotor.lernstand s join lernmotor.lernende l on l.id = s.lernende where l.klasse = k.id and s.paket = p_paket;
  woche := (date_trunc('week', now() at time zone 'Europe/Zurich')) at time zone 'Europe/Zurich';

  res := jsonb_build_object('mitglieder', mitglieder, 'aktiv', aktiv, 'minGruppe', m);

  -- 1 Klassenübersicht: Anteil sitzt / wackelt / neu pro Lernziel
  res := res || jsonb_build_object('uebersicht', case when aktiv < m then null else coalesce((
    select jsonb_agg(jsonb_build_object('lernziel', lernziel, 'sitzt', sitzt, 'wackelt', wackelt, 'neu', aktiv - sitzt - wackelt) order by wackelt desc)
    from (select st.lernziel, count(*) filter (where st.status = 'sitzt') sitzt, count(*) filter (where st.status = 'wackelt') wackelt
          from lernmotor.lernziel_status st join lernmotor.lernende l on l.id = st.lernende
          where l.klasse = k.id and st.paket = p_paket group by st.lernziel) x), '[]'::jsonb) end);

  -- 2 Problem-Lernziele: tiefste Trefferquote der letzten 7 Tage, mit Vorwoche
  res := res || jsonb_build_object('problemLernziele', coalesce((
    select jsonb_agg(jsonb_build_object('lernziel', lernziel, 'quote', quote, 'kinder', kinder, 'vorwoche', vorwoche) order by quote)
    from (
      select a.lernziel, round(avg(a.richtig::int), 2) quote, count(distinct a.lernende) kinder,
        (select round(avg(b.richtig::int), 2) from lernmotor.antworten b
          where b.klasse = k.id and b.paket = p_paket and b.lernziel = a.lernziel and b.zeit >= t14 and b.zeit < t7 and b.phase in ('faellig', 'neu', 'nochmals')
          having count(distinct b.lernende) >= m) vorwoche
      from lernmotor.antworten a
      where a.klasse = k.id and a.paket = p_paket and a.zeit >= t7 and a.phase in ('faellig', 'neu', 'nochmals')
      group by a.lernziel having count(distinct a.lernende) >= m
      order by 2 limit 5) x), '[]'::jsonb));

  -- 3 Häufige Fehlvorstellungen: pro MC-Aufgabe die häufigste falsche Option (letzte 28 Tage)
  res := res || jsonb_build_object('fehlvorstellungen', coalesce((
    select jsonb_agg(jsonb_build_object('aufgabe', aufgabe, 'option', gewaehlt, 'anteil', anteil, 'sicherFalsch', sicher_falsch, 'kinder', kinder) order by anteil desc)
    from (
      select distinct on (a.aufgabe) a.aufgabe, a.gewaehlt,
        round(count(*)::numeric / t.n, 2) anteil, count(*) filter (where a.sicherheit = 'sicher') sicher_falsch, t.kinder
      from lernmotor.antworten a
      join (select aufgabe, count(*) n, count(distinct lernende) kinder from lernmotor.antworten
            where klasse = k.id and paket = p_paket and typ = 'mc' and zeit >= now() - interval '28 days' group by aufgabe
            having count(distinct lernende) >= m) t on t.aufgabe = a.aufgabe
      where a.klasse = k.id and a.paket = p_paket and a.typ = 'mc' and not a.richtig and a.zeit >= now() - interval '28 days'
      group by a.aufgabe, a.gewaehlt, t.n, t.kinder
      order by a.aufgabe, count(*) desc) x
    where anteil >= 0.2), '[]'::jsonb));

  -- 4 Nutzung: Anteil der Klasse mit mindestens einem Wiederholungsblock diese Woche
  res := res || jsonb_build_object('nutzung', jsonb_build_object(
    'woche', round((select count(distinct lernende) from lernmotor.sitzungen where klasse = k.id and art = 'block' and ende >= woche)::numeric / mitglieder, 2),
    'vorwoche', round((select count(distinct lernende) from lernmotor.sitzungen where klasse = k.id and art = 'block' and ende >= woche - interval '7 days' and ende < woche)::numeric / mitglieder, 2)));

  -- 5 Sitzungslänge: wie oft der Pausenhinweis kommt und nach wie vielen Aufgaben (28 Tage)
  res := res || jsonb_build_object('sitzungslaenge', (
    select case when count(distinct lernende) < m then null else jsonb_build_object(
      'bloecke', count(*), 'anteilPause', round(avg((pause_nach is not null)::int), 2),
      'pauseNachSchnitt', round(avg(pause_nach), 1), 'aufgabenSchnitt', round(avg(aufgaben), 1),
      'minutenSchnitt', round(avg(extract(epoch from (ende - start)) / 60)::numeric, 1)) end
    from lernmotor.sitzungen where klasse = k.id and paket = p_paket and art = 'block' and ende >= now() - interval '28 days'));

  -- 6 Aufgabenqualität: Aufgaben, die fast alle falsch haben (60 Tage)
  res := res || jsonb_build_object('aufgabenQualitaet', coalesce((
    select jsonb_agg(jsonb_build_object('aufgabe', aufgabe, 'quote', quote, 'kinder', kinder) order by quote)
    from (select aufgabe, round(avg(richtig::int), 2) quote, count(distinct lernende) kinder from lernmotor.antworten
          where klasse = k.id and paket = p_paket and zeit >= now() - interval '60 days' and phase <> 'mitHilfe'
          group by aufgabe having count(distinct lernende) >= m and avg(richtig::int) < 0.3) x), '[]'::jsonb));

  return res;
end $$;

-- Aufräumen: abgelaufene Klassen und seit über einem Jahr inaktive Kinder löschen
create or replace function lernmotor.aufraeumen() returns void
language plpgsql security definer set search_path = '' as $$
begin
  delete from lernmotor.antworten a using lernmotor.klassen k where a.klasse = k.id and k.loeschen_ab < current_date;
  delete from lernmotor.sitzungen s using lernmotor.klassen k where s.klasse = k.id and k.loeschen_ab < current_date;
  delete from lernmotor.klassen where loeschen_ab < current_date;
  delete from lernmotor.lernende where zuletzt < now() - interval '400 days';
end $$;

/* ---------- Rechte ---------- */
revoke all on all functions in schema lernmotor from public, anon, authenticated;
revoke execute on function public.lm_registrieren(text), public.lm_anmelden(text), public.lm_sync(text, text, jsonb, jsonb, jsonb, jsonb),
  public.lm_daten_loeschen(text), public.lm_klassenwertung(text), public.lm_klasse_erstellen(text), public.lm_meine_klassen(),
  public.lm_klasse_loeschen(uuid), public.lm_dashboard(uuid, text) from public;
grant execute on function public.lm_registrieren(text), public.lm_anmelden(text), public.lm_sync(text, text, jsonb, jsonb, jsonb, jsonb),
  public.lm_daten_loeschen(text), public.lm_klassenwertung(text) to anon, authenticated;
grant execute on function public.lm_klasse_erstellen(text), public.lm_meine_klassen(), public.lm_klasse_loeschen(uuid),
  public.lm_dashboard(uuid, text) to authenticated;

/* ---------- Tägliches Aufräumen (pg_cron) ---------- */
create extension if not exists pg_cron;
select cron.schedule('lernmotor-aufraeumen', '17 3 * * *', 'select lernmotor.aufraeumen()');
