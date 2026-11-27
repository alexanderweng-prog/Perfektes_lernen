-- SQL-Tests für backend/migrationen/2026-11-protokoll-pilot.sql und 2026-11-stufen.sql: neue Protokollfelder, Beispiele, Klassenwertung aus.
-- Eine Transaktion, wird am Ende zurückgerollt. Nur gegen eine TESTdatenbank.
--   psql "<Verbindungsstring der Testdatenbank>" -v ON_ERROR_STOP=1 -f test/backend/protokoll_tests.sql

begin;

create temp table t_ok (nr serial primary key, test text not null);
create temp table t_wert (k text primary key, v text);
grant all on t_ok, t_wert to public;
grant usage on sequence t_ok_nr_seq to public;

create function pg_temp.pruefe(bedingung boolean, test text) returns void language plpgsql as $$
begin
  if bedingung is not true then raise exception 'FEHLGESCHLAGEN: %', test; end if;
  insert into pg_temp.t_ok (test) values (test);
end $$;
create function pg_temp.wert(schluessel text) returns text language sql as $$ select v from pg_temp.t_wert where k = schluessel $$;
create function pg_temp.setze(schluessel text, wert text) returns void language sql as $$
  insert into pg_temp.t_wert (k, v) values (schluessel, wert) on conflict (k) do update set v = excluded.v
$$;

insert into auth.users (id, email) values ('a0000000-0000-4000-8000-00000000000a', 'test-a@example.invalid');
select set_config('request.jwt.claims', '{"sub":"a0000000-0000-4000-8000-00000000000a","role":"authenticated"}', true);
set local role authenticated;
select pg_temp.setze('k', public.lm_klasse_erstellen('Testklasse')::text);
reset role;

select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
select pg_temp.setze('code', public.lm_registrieren(pg_temp.wert('k')::jsonb ->> 'klassencode') ->> 'lerncode');
-- so schickt die App die Einträge (Felder wie in motor/sitzung.js)
select public.lm_sync(pg_temp.wert('code'), 'leistung', '{}', null, jsonb_build_array(
  jsonb_build_object('sitzung', 's1', 'aufgabe', 'q1', 'lernziel', 'lz1', 'typ', 'beispiel', 'phase', 'beispiel', 'zeit', now(), 'dauerMs', 42000,
                     'app', '2026-11-27', 'einstellungen', 'eabc'),
  jsonb_build_object('sitzung', 's1', 'aufgabe', 'q2', 'lernziel', 'lz1', 'typ', 'zahl', 'phase', 'faellig', 'richtig', false, 'punkte', 0,
                     'gewaehlt', '"3"', 'zeit', now(), 'dauerMs', 9000, 'pVorher', 0.8312, 'kontrolle', null, 'kontrolleIst', null,
                     'versuch', 3, 'hilfsstufe', 2, 'richtigAmEnde', true, 'app', '2026-11-27', 'einstellungen', 'eabc'),
  jsonb_build_object('sitzung', 's1', 'aufgabe', 'q3', 'lernziel', 'lz2', 'typ', 'mc', 'phase', 'kontrolle', 'richtig', true, 'punkte', 1,
                     'gewaehlt', 0, 'zeit', now(), 'dauerMs', 5000, 'pVorher', 0.5, 'kontrolle', 14, 'kontrolleIst', 15.2,
                     'versuch', 1, 'hilfsstufe', 0, 'richtigAmEnde', true, 'app', '2026-11-27', 'einstellungen', 'eabc', 'stufe', 4)),
  jsonb_build_array(jsonb_build_object('id', 's1', 'art', 'block', 'start', now() - interval '5 minutes', 'ende', now(),
                                       'aufgaben', 2, 'abrufe', 2, 'richtig', 1, 'app', '2026-11-27', 'einstellungen', 'eabc')));
select pg_temp.setze('wertung', public.lm_klassenwertung(pg_temp.wert('code'))::text);
reset role;

select pg_temp.setze('kind', (select id::text from lernmotor.lernende where code_hash = lernmotor.hash(pg_temp.wert('code'))));

select pg_temp.pruefe((select count(*) from lernmotor.antworten where lernende = pg_temp.wert('kind')::uuid) = 2,
  'P1 Beispiel landet nicht in «antworten» (keine falsche Antwort in den Quoten)');
select pg_temp.pruefe(exists (select 1 from lernmotor.beispiele where lernende = pg_temp.wert('kind')::uuid and aufgabe = 'q1' and lernziel = 'lz1'
  and dauer_ms = 42000 and app_version = '2026-11-27' and einstellungen = 'eabc'), 'P2 Beispiel mit Lesezeit und Versionen in «beispiele»');
select pg_temp.pruefe(exists (select 1 from lernmotor.antworten where lernende = pg_temp.wert('kind')::uuid and aufgabe = 'q2'
  and abs(p_vorher - 0.8312) < 1e-4 and kontrolle is null and kontrolle_ist is null and versuch = 3 and hilfsstufe = 2 and richtig_am_ende and not richtig
  and app_version = '2026-11-27' and einstellungen = 'eabc'), 'P3 Vorhersage, Hinweisleiter und Versionen gespeichert');
select pg_temp.pruefe(exists (select 1 from lernmotor.antworten where lernende = pg_temp.wert('kind')::uuid and aufgabe = 'q3'
  and phase = 'kontrolle' and kontrolle = 14 and abs(kontrolle_ist - 15.2) < 1e-4), 'P4 Kontrollfrage markiert (Stichtag und tatsächlicher Abstand)');
select pg_temp.pruefe((select stufe from lernmotor.antworten where lernende = pg_temp.wert('kind')::uuid and aufgabe = 'q3') = 4
  and (select stufe from lernmotor.antworten where lernende = pg_temp.wert('kind')::uuid and aufgabe = 'q2') is null, 'P4b Taxonomiestufe gespeichert (ohne Angabe: null)');
select pg_temp.pruefe(exists (select 1 from lernmotor.sitzungen where lernende = pg_temp.wert('kind')::uuid and app_version = '2026-11-27'
  and einstellungen = 'eabc'), 'P5 Sitzung mit Versionen');
select pg_temp.pruefe(pg_temp.wert('wertung')::jsonb = '[]'::jsonb, 'P6 Klassenwertung ist serverseitig aus');

select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
select public.lm_daten_loeschen(pg_temp.wert('code'));
reset role;
select pg_temp.pruefe((select count(*) from lernmotor.beispiele where lernende = pg_temp.wert('kind')::uuid) = 0,
  'P7 Kind löscht seine Daten: auch die Beispiel-Einträge sind weg');

select nr, 'ok' as ergebnis, test from t_ok order by nr;
rollback;
