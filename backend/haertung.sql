-- Härtung nach den Sicherheitshinweisen von Supabase (optional, schadet nichts).
-- Supabase → SQL Editor → New query → einfügen → Run.

-- Funktionen für Lehrpersonen: ohne Anmeldung gar nicht erst aufrufbar
-- (sie prüfen den Login bereits selbst, das hier ist eine zweite Sperre)
revoke execute on function public.lm_klasse_erstellen(text), public.lm_meine_klassen(), public.lm_klasse_loeschen(uuid),
  public.lm_dashboard(uuid, text), public.lm_freigabe_setzen(text[], text) from public, anon;
grant execute on function public.lm_klasse_erstellen(text), public.lm_meine_klassen(), public.lm_klasse_loeschen(uuid),
  public.lm_dashboard(uuid, text), public.lm_freigabe_setzen(text[], text) to authenticated;

-- Hilfsfunktionen: festen Suchpfad setzen
alter function lernmotor.min_gruppe() set search_path = '';
alter function lernmotor.hash(text) set search_path = '';
alter function lernmotor.wort(int) set search_path = '';
alter function lernmotor.zufall(int) set search_path = '';
alter function lernmotor.neuer_lerncode() set search_path = '';
alter function lernmotor.gross(text) set search_path = '';
