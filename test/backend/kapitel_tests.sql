-- SQL-Tests für backend/migrationen/2026-11-klassen-kapitel.sql: Kapitel pro Klasse.
-- Eine Transaktion, wird am Ende zurückgerollt. Nur gegen eine TESTdatenbank.
--   psql "<Verbindungsstring der Testdatenbank>" -v ON_ERROR_STOP=1 -f test/backend/kapitel_tests.sql

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
create function pg_temp.fehler(befehl text) returns text language plpgsql as $$
begin execute befehl; return null; exception when others then return sqlstate; end $$;
create function pg_temp.wert(schluessel text) returns text language sql as $$ select v from pg_temp.t_wert where k = schluessel $$;
create function pg_temp.setze(schluessel text, wert text) returns void language sql as $$
  insert into pg_temp.t_wert (k, v) values (schluessel, wert) on conflict (k) do update set v = excluded.v
$$;
create function pg_temp.als_lehrer(id uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', id, 'role', 'authenticated')::text, true);
  perform set_config('role', 'authenticated', true);
end $$;
create function pg_temp.als_kind() returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', '{"role":"anon"}', true);
  perform set_config('role', 'anon', true);
end $$;

insert into auth.users (id, email) values
  ('a0000000-0000-4000-8000-00000000000a', 'test-a@example.invalid'),
  ('b0000000-0000-4000-8000-00000000000b', 'test-b@example.invalid');

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select pg_temp.setze('k', public.lm_klasse_erstellen('Testklasse')::text);
reset role;
select pg_temp.als_kind();
select pg_temp.setze('code', public.lm_registrieren(pg_temp.wert('k')::jsonb ->> 'klassencode') ->> 'lerncode');
select pg_temp.pruefe(public.lm_klasse_kapitel(pg_temp.wert('code')) is null, 'K1 neue Klasse: alle Kapitel (null)');
select pg_temp.pruefe(pg_temp.fehler(format('select public.lm_klasse_kapitel_setzen(%L, array[%L])', pg_temp.wert('k')::jsonb ->> 'id', 'leistung')) = '42501',
  'K2 Kind kann die Kapitel nicht setzen');
reset role;

select pg_temp.als_lehrer('b0000000-0000-4000-8000-00000000000b');
select pg_temp.pruefe(pg_temp.fehler(format('select public.lm_klasse_kapitel_setzen(%L, array[%L])', pg_temp.wert('k')::jsonb ->> 'id', 'leistung')) = 'P0002',
  'K3 fremde Lehrperson kann die Kapitel nicht setzen');
reset role;

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select pg_temp.pruefe(public.lm_klasse_kapitel_setzen((pg_temp.wert('k')::jsonb ->> 'id')::uuid, array['leistung', 'nt7-1']) = '["leistung", "nt7-1"]'::jsonb,
  'K4 Lehrperson setzt zwei Kapitel');
select pg_temp.pruefe((select e -> 'kapitel' from jsonb_array_elements(public.lm_meine_klassen()) e) = '["leistung", "nt7-1"]'::jsonb,
  'K5 Klassenliste zeigt die Kapitel');
select pg_temp.pruefe(pg_temp.fehler(format('select public.lm_klasse_kapitel_setzen(%L, array[%L])', pg_temp.wert('k')::jsonb ->> 'id', repeat('x', 41))) is not null,
  'K6 ungültige Kapitelliste wird abgelehnt');
reset role;

select pg_temp.als_kind();
select pg_temp.pruefe(public.lm_klasse_kapitel(pg_temp.wert('code')) = '["leistung", "nt7-1"]'::jsonb, 'K7 Kind bekommt die Kapitel seiner Klasse');
select pg_temp.pruefe(public.lm_anmelden(pg_temp.wert('code')) -> 'kapitel' = '["leistung", "nt7-1"]'::jsonb, 'K8 Anmeldung liefert die Kapitel mit');
reset role;

select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select public.lm_klasse_kapitel_setzen((pg_temp.wert('k')::jsonb ->> 'id')::uuid, array[]::text[]);
reset role;
select pg_temp.als_kind();
select pg_temp.pruefe(public.lm_klasse_kapitel(pg_temp.wert('code')) = '[]'::jsonb, 'K9 leere Liste: im Moment kein Kapitel');
reset role;
select pg_temp.als_lehrer('a0000000-0000-4000-8000-00000000000a');
select public.lm_klasse_kapitel_setzen((pg_temp.wert('k')::jsonb ->> 'id')::uuid, null);
reset role;
select pg_temp.als_kind();
select pg_temp.pruefe(public.lm_klasse_kapitel(pg_temp.wert('code')) is null, 'K10 zurück auf alle Kapitel');
reset role;

select nr, 'ok' as ergebnis, test from t_ok order by nr;
rollback;
