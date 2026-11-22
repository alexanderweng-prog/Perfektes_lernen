// Verbindung zum Backend (Supabase). Der Schlüssel ist der öffentliche «publishable key»: Er darf im Code stehen.
// Niemals den «secret» oder «service_role»-Schlüssel hier eintragen.
// Leer lassen = App läuft ohne Backend (Lernstand nur auf dem Gerät).
export const BACKEND = {
  url: 'https://efsznvanzievcxvewgpi.supabase.co',
  key: 'sb_publishable_mJIRn9_fyhTj2Wwm9A_fSw_1xifb1HF'
};

// Gemeinsame Geräte: nach so vielen Minuten ohne Aktivität wird automatisch abgemeldet
export const ABMELDEN_NACH_MINUTEN = 20;
