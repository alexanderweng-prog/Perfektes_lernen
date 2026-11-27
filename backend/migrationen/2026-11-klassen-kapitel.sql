-- Migration «Kapitel pro Klasse»
-- Die Lehrperson legt pro Klasse fest, welche Kapitel (Themen der App) die Kinder sehen. Jederzeit änderbar.
-- null = alle Kapitel (Standard, auch für bestehende Klassen); leere Liste = im Moment keines.
-- Einspielen VOR der Veröffentlichung der App: Supabase → SQL Editor → alles einfügen → Run. Kann mehrfach ausgeführt werden.

alter table lernmotor.klassen add column if not exists kapitel text[];

-- Lehrperson: Kapitel einer eigenen Klasse setzen (p_kapitel = null: alle)
create or replace function public.lm_klasse_kapitel_setzen(p_klasse uuid, p_kapitel text[]) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare k lernmotor.klassen := lernmotor.meine_klasse(p_klasse);
begin
  if p_kapitel is not null and (cardinality(p_kapitel) > 200
      or exists (select 1 from unnest(p_kapitel) x where x is null or char_length(x) not between 1 and 40)) then
    raise exception 'Kapitelliste ungültig';
  end if;
  update lernmotor.klassen set kapitel = p_kapitel where id = k.id;
  return to_jsonb(p_kapitel);
end $$;

-- Kind: Kapitel der eigenen Klasse (null = alle). Die App fragt das bei jedem Öffnen ab.
create or replace function public.lm_klasse_kapitel(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code);
begin
  return to_jsonb((select kapitel from lernmotor.klassen where id = r.klasse));
end $$;

-- Anmeldung liefert die Kapitel gleich mit
create or replace function public.lm_anmelden(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r lernmotor.lernende := lernmotor.kind(p_code);
begin
  return jsonb_build_object(
    'pseudonym', r.pseudonym,
    'team', (select teamname from lernmotor.klassen where id = r.klasse),
    'kapitel', (select to_jsonb(kapitel) from lernmotor.klassen where id = r.klasse),
    'lernstand', coalesce((select jsonb_object_agg(paket, jsonb_build_object('daten', daten, 'version', version))
                            from lernmotor.lernstand where lernende = r.id), '{}'::jsonb));
end $$;

-- Klassenliste der Lehrperson mit den gewählten Kapiteln
create or replace function public.lm_meine_klassen() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare lp uuid := lernmotor.lehrperson();
begin
  return coalesce((select jsonb_agg(jsonb_build_object('id', k.id, 'name', k.name, 'teamname', k.teamname, 'klassencode', k.klassencode,
      'loeschen_ab', k.loeschen_ab, 'kapitel', to_jsonb(k.kapitel), 'mitglieder', (select count(*) from lernmotor.lernende l where l.klasse = k.id)) order by k.erstellt)
    from lernmotor.klassen k where k.lehrperson = lp), '[]'::jsonb);
end $$;

-- Rechte: Setzen nur für angemeldete Lehrpersonen, Abfragen für Kinder (Lerncode)
revoke execute on function public.lm_klasse_kapitel_setzen(uuid, text[]) from public, anon;
grant execute on function public.lm_klasse_kapitel_setzen(uuid, text[]) to authenticated;
revoke execute on function public.lm_klasse_kapitel(text) from public;
grant execute on function public.lm_klasse_kapitel(text) to anon, authenticated;
