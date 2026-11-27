-- SQL-Tests für das Backend: Rechte, Mindestgruppe, Löschen.
-- Läuft in EINER Transaktion und wird am Ende zurückgerollt: es bleibt nichts in der Datenbank.
-- Schlägt ein Test fehl, bricht das Skript mit «FEHLGESCHLAGEN: …» ab.
-- Nur gegen eine TESTdatenbank laufen lassen (lokal mit test/backend/lokal.sh oder ein Supabase-Testprojekt),
-- in der schema.sql, freigaben.sql, backend/2026-11-absichern.sql und haertung.sql eingespielt sind.
--   psql "<Verbindungsstring der Testdatenbank>" -v ON_ERROR_STOP=1 -f test/backend/backend_tests.sql

begin;

create temp table t_ok (nr serial primary key, test text not null);
create temp table t_wert (k text primary key, v text);
grant all on t_ok, t_wert to public;
grant usage on sequence t_ok_nr_seq to public;

/* ---------- Hilfsfunktionen (nur in dieser Sitzung) ---------- */
create function pg_temp.pruefe(bedingung boolean, test text) returns void language plpgsql as $$
begin
  if bedingung is not true then raise exception 'FEHLGESCHLAGEN: %', test; end if;
  insert into pg_temp.t_ok (test) values (test);
end $$;
-- führt SQL aus und gibt den Fehlercode zurück (null = kein Fehler)
create function pg_temp.fehler(befehl text) returns text language plpgsql as $$
begin execute befehl; return null; exception when others then return sqlstate; end $$;
create function pg_temp.als_lehrer(id uuid, anonym boolean default false) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', id, 'role', 'authenticated', 'is_anonymous', anonym)::text, true);
  perform set_config('role', 'authenticated', true);
end $$;
create function pg_temp.als_kind() returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', '{"role":"anon"}', true);
  perform set_config('role', 'anon', true);
end $$;
create function pg_temp.wert(schluessel text) returns text language sql as $$ select v from pg_temp.t_wert where k = schluessel $$;
create function pg_temp.setze(schluessel text, wert text) returns void language sql as $$
  insert into pg_temp.t_wert (k, v) values (schluessel, wert) on conflict (k) do update set v = excluded.v
$$;
-- eine MC-Antwort im Format der App
create function pg_temp.mc(aufgabe text, richtig boolean, gewaehlt text, sicherheit text default null) returns jsonb language sql as $$
  select jsonb_build_object('sitzung', 's1', 'aufgabe', aufgabe, 'lernziel', 'lz-' || aufgabe, 'typ', 'mc', 'phase', 'faellig',
    'richtig', richtig, 'punkte', case when richtig then 1 else 0 end, 'gewaehlt', gewaehlt, 'sicherheit', sicherheit, 'zeit', now())
$$;

/* ---------- Testdaten: drei Konten ---------- */
-- A = Admin-Lehrperson, B = Lehrperson ohne Admin, C = anonymes Supabase-Konto
insert into auth.users (id, email) values
  ('a0000000-0000-4000-8000-00000000000a', 'test-a@example.invalid'),
  ('b0000000-0000-4000-8000-00000000000b', 'test-b@example.invalid');
insert into auth.users (id, is_anonymous) values ('c0000000-0000-4000-8000-00000000000c', true);
insert into lernmotor.admins (benutzer, notiz) values ('a0000000-0000-4000-8000-00000000000a', 'Test');

/* ---------- 1 Rechte ---------- */
select pg_temp.als_kind();
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_freigabe_setzen(array['test.x'], 'geprueft') $q$) = '42501', 'R1 Kind (anon) kann nichts freigeben');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_dashboard(gen_random_uuid(), 'leistung') $q$) = '42501', 'R2 Kind (anon) kann kein Dashboard abrufen');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_meine_klassen() $q$) = '42501', 'R3 Kind (anon) sieht keine Klassen');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_klasse_erstellen('X') $q$) = '42501', 'R4 Kind (anon) kann keine Klasse erstellen');
select pg_temp.pruefe(pg_temp.fehler($q$ select count(*) from lernmotor.lernende $q$) = '42501', 'R5 Kind (anon) liest keine Tabelle direkt');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_freigaben() $q$) is null, 'R6 Freigabeliste ist für alle lesbar');
reset role;

select pg_temp.als_lehrer('c0000000-0000-4000-8000-00000000000c', true);
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_klasse_erstellen('X') $q$) = '42501', 'R7 anonymes Konto gilt nicht als Lehrperson');
reset role;

select pg_temp.als_lehrer('b0000000-0000-4000-8000-00000000000b');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_freigabe_setzen(array['test.x'], 'geprueft') $q$) = '42501', 'R8 Lehrperson ohne Admin kann nicht freigeben');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_freigabe_setzen(array['test.x'], 'zurueckgezogen') $q$) = '42501', 'R9 Lehrperson ohne Admin kann nicht zurückziehen');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_freigabe_setzen(array['test.x'], 'entwurf') $q$) = '42501', 'R10 Lehrperson ohne Admin kann nicht auf Entwurf setzen');
select pg_temp.pruefe(pg_temp.fehler($q$ select count(*) from lernmotor.admins $q$) = '42501', 'R11 Admin-Liste ist nicht lesbar');
reset role;

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
-- Setzen und Lesen in getrennten Anweisungen (lm_freigaben ist STABLE und sieht Änderungen derselben Anweisung nicht)
select pg_temp.pruefe(public.lm_freigabe_setzen(array['test.x'], 'geprueft') = 1, 'R12 Admin kann freigeben');
select pg_temp.pruefe(public.lm_freigaben() ->> 'test.x' = 'geprueft', 'R13 Freigabe ist danach für alle sichtbar');
select pg_temp.pruefe(public.lm_freigabe_setzen(array['test.x'], 'zurueckgezogen') = 1, 'R14 Admin kann zurückziehen');
select pg_temp.pruefe(public.lm_freigaben() ->> 'test.x' = 'zurueckgezogen', 'R15 Zurückziehen ist sichtbar');
select pg_temp.pruefe(public.lm_freigabe_setzen(array['test.x'], 'entwurf') = 1, 'R16 Admin kann auf Entwurf setzen');
select pg_temp.pruefe(public.lm_freigaben() ->> 'test.x' is null, 'R17 Entwurf ist nicht mehr in der Liste');
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_freigabe_setzen(array['test.x'], 'irgendwas') $q$) is not null, 'R18 ungültiger Status wird abgelehnt');
-- Klasse von A
select pg_temp.setze('k1', public.lm_klasse_erstellen('Testklasse')::text);
select pg_temp.setze('klasse', pg_temp.wert('k1')::jsonb ->> 'id'), pg_temp.setze('klassencode', pg_temp.wert('k1')::jsonb ->> 'klassencode');
reset role;

select pg_temp.als_lehrer('b0000000-0000-4000-8000-00000000000b');
select pg_temp.pruefe(pg_temp.fehler(format('select public.lm_dashboard(%L, %L)', pg_temp.wert('klasse'), 'leistung')) = 'P0002', 'R19 fremde Lehrperson sieht das Dashboard nicht');
select pg_temp.pruefe(pg_temp.fehler(format('select public.lm_klasse_loeschen(%L)', pg_temp.wert('klasse'))) = 'P0002', 'R20 fremde Lehrperson kann die Klasse nicht löschen');
select pg_temp.pruefe(public.lm_meine_klassen() = '[]'::jsonb, 'R21 fremde Lehrperson sieht die Klasse nicht in ihrer Liste');
reset role;

/* ---------- 2 Mindestgruppe ---------- */
-- 8 Kinder registrieren sich und üben heute. Kind 8 übt nur heute (Fantasie-Kind), die anderen auch an zwei Vortagen.
-- q1: Kinder 1–5 wählen falsch «1», alle «sicher»     → Option sichtbar, sicherFalsch = 5
--     Kinder 6–7 wählen falsch «2»                    → nur 2 Kinder, Option darf nicht erscheinen
-- q2: Kinder 1–4 richtig, 5–6 falsch «3»              → 2 von 6 (33 %), früher sichtbar, jetzt unterdrückt
-- q3: Kinder 1–5 falsch «4», nur Kinder 1–2 «sicher»  → Option sichtbar, sicherFalsch unterdrückt (null)
select pg_temp.als_kind();
do $$
declare n int; code text; antworten jsonb;
begin
  for n in 1..8 loop
    code := public.lm_registrieren(pg_temp.wert('klassencode')) ->> 'lerncode';
    perform pg_temp.setze('kind' || n, code);
    antworten := '[]'::jsonb;
    if n <= 5 then antworten := antworten || pg_temp.mc('q1', false, '1', 'sicher'); end if;
    if n in (6, 7) then antworten := antworten || pg_temp.mc('q1', false, '2'); end if;
    if n <= 4 then antworten := antworten || pg_temp.mc('q2', true, '0'); end if;
    if n in (5, 6) then antworten := antworten || pg_temp.mc('q2', false, '3'); end if;
    if n <= 5 then antworten := antworten || pg_temp.mc('q3', false, '4', case when n <= 2 then 'sicher' end); end if;
    if n = 8 then antworten := antworten || pg_temp.mc('q1', false, '2') || pg_temp.mc('q1', false, '2'); end if;
    perform public.lm_sync(code, 'leistung', '{"x":1}'::jsonb, '{"lz-q1":"wackelt"}'::jsonb, antworten,
      jsonb_build_array(jsonb_build_object('id', 's' || n, 'art', 'block', 'start', now() - interval '5 minutes', 'ende', now(), 'aufgaben', 3, 'abrufe', 3, 'richtig', 1)));
  end loop;
end $$;
select pg_temp.pruefe(pg_temp.fehler($q$ select public.lm_sync('gibt-es-nicht-1234', 'leistung', '{}', null, '[]', '[]') $q$) = 'P0002', 'M1 unbekannter Lerncode kann nichts speichern');
reset role;

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select pg_temp.setze('d', public.lm_dashboard(pg_temp.wert('klasse')::uuid, 'leistung')::text);
select pg_temp.pruefe((pg_temp.wert('d')::jsonb ->> 'zuKlein')::boolean and (pg_temp.wert('d')::jsonb ->> 'registriert')::int = 8
  and (pg_temp.wert('d')::jsonb ->> 'mitglieder')::int = 0, 'M2 Kinder mit nur einem aktiven Tag zählen nicht (Dashboard gesperrt)');
reset role;

-- zwei frühere aktive Tage für Kinder 1–7 nachbilden (in Wirklichkeit schreibt sie lm_sync an anderen Tagen)
insert into lernmotor.aktive_tage (lernende, tag)
select l.id, current_date - d from lernmotor.lernende l, generate_series(1, 2) d, generate_series(1, 7) n
where l.code_hash = lernmotor.hash(pg_temp.wert('kind' || n));

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select pg_temp.setze('d', public.lm_dashboard(pg_temp.wert('klasse')::uuid, 'leistung')::text);
select pg_temp.pruefe(pg_temp.wert('d')::jsonb ->> 'zuKlein' is null and (pg_temp.wert('d')::jsonb ->> 'mitglieder')::int = 7
  and (pg_temp.wert('d')::jsonb ->> 'registriert')::int = 8, 'M3 nach 3 aktiven Tagen zählen 7 Kinder, das Fantasie-Kind nicht');
select pg_temp.setze('fv', pg_temp.wert('d')::jsonb ->> 'fehlvorstellungen');
select pg_temp.pruefe(exists (select 1 from jsonb_array_elements(pg_temp.wert('fv')::jsonb) e where e ->> 'aufgabe' = 'q1' and e ->> 'option' = '1'
  and (e ->> 'sicherFalsch')::int = 5), 'M4 Option mit 5 Kindern erscheint, «sicher falsch» mit 5 Kindern auch');
select pg_temp.pruefe(not exists (select 1 from jsonb_array_elements(pg_temp.wert('fv')::jsonb) e where e ->> 'option' in ('2', '3')),
  'M5 Optionen mit weniger als 5 Kindern erscheinen nie (auch nicht über das Fantasie-Kind)');
select pg_temp.pruefe(not exists (select 1 from jsonb_array_elements(pg_temp.wert('fv')::jsonb) e where e ->> 'aufgabe' = 'q2'),
  'M6 Aufgabe mit genug Kindern, aber kleiner falscher Option: nichts sichtbar');
select pg_temp.pruefe(exists (select 1 from jsonb_array_elements(pg_temp.wert('fv')::jsonb) e where e ->> 'aufgabe' = 'q3' and e ->> 'option' = '4'
  and e -> 'sicherFalsch' = 'null'::jsonb), 'M7 «sicher falsch» von nur 2 Kindern wird unterdrückt');
select pg_temp.pruefe(jsonb_array_length(pg_temp.wert('fv')::jsonb) = 2, 'M8 genau zwei Fehlvorstellungen sichtbar');
select pg_temp.pruefe((pg_temp.wert('d')::jsonb #>> '{nutzung,woche}')::numeric = 1, 'M9 Nutzung bezieht sich auf die gezählten Kinder');
reset role;

/* ---------- 3 Löschen ---------- */
select pg_temp.setze('id7', (select id::text from lernmotor.lernende where code_hash = lernmotor.hash(pg_temp.wert('kind7'))));
select pg_temp.als_kind();
select public.lm_daten_loeschen(pg_temp.wert('kind7'));
select pg_temp.pruefe(pg_temp.fehler(format('select public.lm_anmelden(%L)', pg_temp.wert('kind7'))) = 'P0002', 'L1 nach dem Löschen ist der Lerncode ungültig');
reset role;
select pg_temp.pruefe(
  (select count(*) from lernmotor.lernende where id = pg_temp.wert('id7')::uuid) + (select count(*) from lernmotor.lernstand where lernende = pg_temp.wert('id7')::uuid)
  + (select count(*) from lernmotor.lernziel_status where lernende = pg_temp.wert('id7')::uuid) + (select count(*) from lernmotor.antworten where lernende = pg_temp.wert('id7')::uuid)
  + (select count(*) from lernmotor.sitzungen where lernende = pg_temp.wert('id7')::uuid) + (select count(*) from lernmotor.aktive_tage where lernende = pg_temp.wert('id7')::uuid) = 0,
  'L2 Kind löscht seine Daten: nichts bleibt übrig (auch keine aktiven Tage)');
select pg_temp.pruefe((select count(*) from lernmotor.lernende where klasse = pg_temp.wert('klasse')::uuid) = 7, 'L3 die anderen Kinder bleiben');

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select public.lm_klasse_loeschen(pg_temp.wert('klasse')::uuid);
reset role;
select pg_temp.pruefe(
  (select count(*) from lernmotor.klassen where id = pg_temp.wert('klasse')::uuid) + (select count(*) from lernmotor.lernende where klasse = pg_temp.wert('klasse')::uuid)
  + (select count(*) from lernmotor.antworten where klasse = pg_temp.wert('klasse')::uuid) + (select count(*) from lernmotor.sitzungen where klasse = pg_temp.wert('klasse')::uuid)
  + (select count(*) from lernmotor.aktive_tage t where not exists (select 1 from lernmotor.lernende l where l.id = t.lernende)) = 0,
  'L4 Lehrperson löscht die Klasse: Kinder, Antworten, Sitzungen und aktive Tage sind weg');

-- Aufräumen: abgelaufene Klasse und seit über 400 Tagen inaktive Kinder
select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select pg_temp.setze('k2', public.lm_klasse_erstellen('Alt')::text);
select pg_temp.setze('k3', public.lm_klasse_erstellen('Aktiv')::text);
select pg_temp.setze('klasse2', pg_temp.wert('k2')::jsonb ->> 'id');
reset role;
select pg_temp.als_kind();
select pg_temp.setze('alt', public.lm_registrieren(pg_temp.wert('k2')::jsonb ->> 'klassencode') ->> 'lerncode');
select public.lm_sync(pg_temp.wert('alt'), 'leistung', '{}', null, jsonb_build_array(pg_temp.mc('q1', true, '0')), '[]');
select pg_temp.setze('inaktiv', public.lm_registrieren(pg_temp.wert('k3')::jsonb ->> 'klassencode') ->> 'lerncode');
select pg_temp.setze('aktiv', public.lm_registrieren(pg_temp.wert('k3')::jsonb ->> 'klassencode') ->> 'lerncode');
reset role;
update lernmotor.klassen set loeschen_ab = current_date - 1 where id = pg_temp.wert('klasse2')::uuid;
update lernmotor.lernende set zuletzt = now() - interval '401 days' where code_hash = lernmotor.hash(pg_temp.wert('inaktiv'));
select lernmotor.aufraeumen();
select pg_temp.pruefe((select count(*) from lernmotor.klassen where id = pg_temp.wert('klasse2')::uuid) = 0
  and (select count(*) from lernmotor.antworten where klasse = pg_temp.wert('klasse2')::uuid) = 0, 'L5 Aufräumen löscht abgelaufene Klassen samt Antworten');
select pg_temp.pruefe(not exists (select 1 from lernmotor.lernende where code_hash = lernmotor.hash(pg_temp.wert('inaktiv')))
  and exists (select 1 from lernmotor.lernende where code_hash = lernmotor.hash(pg_temp.wert('aktiv'))), 'L6 Aufräumen löscht nur lange inaktive Kinder');

/* ---------- Ergebnis ---------- */
select nr, 'ok' as ergebnis, test from t_ok order by nr;
rollback;
