// Schlanker Zugriff auf Supabase ohne Bibliothek: Funktionsaufrufe (RPC) und Login für Lehrpersonen.
import { BACKEND } from './config.js';

export const backendAktiv = () => !!(BACKEND.url && BACKEND.key);

export class BackendFehler extends Error {
  constructor(text, status) { super(text); this.status = status; }
}

export async function rpc(name, args = {}, token = null) {
  let r;
  try {
    r = await fetch(`${BACKEND.url}/rest/v1/rpc/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: BACKEND.key, Authorization: `Bearer ${token || BACKEND.key}` },
      body: JSON.stringify(args)
    });
  } catch (e) {
    throw new BackendFehler('Keine Verbindung zum Server. Prüfe das Internet.', 0);
  }
  const text = await r.text();
  let daten = null;
  try { daten = text ? JSON.parse(text) : null; } catch (e) { /* kein JSON */ }
  if (!r.ok) throw new BackendFehler(uebersetze(daten && daten.message), r.status);
  return daten;
}

function uebersetze(m) {
  if (!m) return 'Der Server hat einen Fehler gemeldet.';
  if (/Lerncode unbekannt/.test(m)) return 'Diesen Lerncode gibt es nicht. Prüfe die Schreibweise.';
  if (/Klassencode unbekannt/.test(m)) return 'Diesen Klassencode gibt es nicht.';
  if (/Could not find the function/.test(m)) return 'Das Backend ist noch nicht eingerichtet.';
  return m;
}

// Login Lehrperson (E-Mail + Passwort, Supabase Auth)
export async function lehrerLogin(email, passwort) {
  const r = await fetch(`${BACKEND.url}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', apikey: BACKEND.key },
    body: JSON.stringify({ email, password: passwort })
  }).catch(() => { throw new BackendFehler('Keine Verbindung zum Server.', 0); });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new BackendFehler(d.error_description || d.msg || 'Anmeldung fehlgeschlagen.', r.status);
  return { token: d.access_token, ablauf: Date.now() + (d.expires_in || 3600) * 1000, email: d.user && d.user.email };
}
