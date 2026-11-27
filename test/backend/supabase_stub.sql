-- NUR für eine leere lokale Postgres-Instanz (test/backend/lokal.sh), NIE in Supabase einspielen.
-- Bildet das Nötigste von Supabase nach: Rollen, auth.users, auth.uid(), auth.jwt(), pgcrypto im Schema «extensions»,
-- pg_cron (nur cron.schedule) und die Standardrechte von Supabase im Schema public.

do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin; end if;
end $$;

create schema if not exists auth;
create table if not exists auth.users (
  id uuid primary key,
  email text,
  is_anonymous boolean not null default false
);

-- wie in Supabase: Angaben aus dem JWT, das PostgREST in request.jwt.claims ablegt
create or replace function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claim', true), ''), nullif(current_setting('request.jwt.claims', true), ''))::jsonb
$$;
create or replace function auth.uid() returns uuid language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claim.sub', true), ''), auth.jwt() ->> 'sub')::uuid
$$;
grant usage on schema auth to anon, authenticated, service_role;
grant execute on function auth.jwt(), auth.uid() to anon, authenticated, service_role;

create schema if not exists extensions;
create extension if not exists pgcrypto schema extensions;
grant usage on schema extensions to anon, authenticated, service_role;

create schema if not exists cron;
create or replace function cron.schedule(name text, zeitplan text, befehl text) returns bigint language sql as $$ select 1::bigint $$;

grant usage on schema public to anon, authenticated, service_role;
-- Supabase gibt neuen Funktionen in public automatisch EXECUTE für anon und authenticated
alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;
