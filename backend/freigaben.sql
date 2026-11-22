-- Freigabe von Inhalten (Ergänzungen von Claude): erst «geprueft», dann sehen die Kinder sie.
-- Kein Personenbezug: gespeichert wird nur, welche Aufgabe freigegeben ist und wann.
create table if not exists lernmotor.freigaben (
  eintrag text primary key check (char_length(eintrag) <= 160),
  status text not null check (status in ('geprueft', 'zurueckgezogen')),
  geaendert timestamptz not null default now()
);
alter table lernmotor.freigaben enable row level security;

-- Für alle lesbar (auch ohne Anmeldung): Liste der freigegebenen und zurückgezogenen Einträge
create or replace function public.lm_freigaben() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_object_agg(eintrag, status), '{}'::jsonb) from lernmotor.freigaben
$$;

-- Nur Lehrpersonen: Einträge freigeben, zurückziehen oder wieder auf Entwurf setzen (p_status = 'entwurf')
create or replace function public.lm_freigabe_setzen(p_eintraege text[], p_status text) returns int
language plpgsql security definer set search_path = '' as $$
declare lp uuid := lernmotor.lehrperson(); n int;
begin
  if p_status not in ('geprueft', 'zurueckgezogen', 'entwurf') then raise exception 'Status ungültig'; end if;
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

revoke execute on function public.lm_freigaben(), public.lm_freigabe_setzen(text[], text) from public;
grant execute on function public.lm_freigaben() to anon, authenticated;
grant execute on function public.lm_freigabe_setzen(text[], text) to authenticated;
