// Konto und Speicher. Zwei Betriebsarten:
//  * «schule»: Anmeldung mit persönlichem Lerncode. Der Lernstand liegt auf dem Server und folgt dem Kind auf jedes Gerät.
//    Auf gemeinsamen Geräten wird nach jedem Block und nach Inaktivität abgemeldet und alles Lokale gelöscht.
//  * «lokal»: ohne Backend. Mehrere Profile pro Gerät («Wer übt?»), Lernstand nur auf diesem Gerät.
import { rpc, backendAktiv } from './backend.js';
import { ABMELDEN_NACH_MINUTEN } from './config.js';
import { leeresModell, leereSerie, status } from '../motor/index.js';

const KONTO_KEY = 'lernmotor.konto.v2';
const PROFILE_KEY = 'lernmotor.lokaleProfile.v1';
const MAX_AUSSTEHEND = 3000;

const lies = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const schreib = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* privater Modus */ } };
const weg = k => { try { localStorage.removeItem(k); } catch (e) { /* ohne Speicher */ } };

function kurzHash(s) {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}

export let konto = lies(KONTO_KEY);

function kontoSpeichern() { if (konto) schreib(KONTO_KEY, konto); else weg(KONTO_KEY); }
export function aktivitaet() { if (konto) { konto.zuletzt = Date.now(); kontoSpeichern(); } }

// Beim Start: auf gemeinsamen Geräten nach Inaktivität abmelden
export async function pruefeAblauf() {
  if (konto && konto.geteilt && Date.now() - (konto.zuletzt || 0) > ABMELDEN_NACH_MINUTEN * 60000) await abmelden({ trotzdem: true });
}

const datenKey = paketId => `lernmotor.v2.${konto.id}.${paketId}`;

export function neueDaten(paketId) {
  return { modell: leeresModell(paketId), freigabe: [], sitzungen: [], xp: 0, serie: leereSerie(), bonus: [], ausstehend: { antworten: [], sitzungen: [] } };
}
export function ladeDaten(paketId) {
  const d = lies(datenKey(paketId)) || neueDaten(paketId);
  d.ausstehend = d.ausstehend || { antworten: [], sitzungen: [] };
  return d;
}
export function speichereDaten(paketId, d) {
  if (d.ausstehend.antworten.length > MAX_AUSSTEHEND) d.ausstehend.antworten = d.ausstehend.antworten.slice(-MAX_AUSSTEHEND);
  schreib(datenKey(paketId), d);
}

/* ---------- Schule: Lerncode ---------- */
export async function registrieren(klassencode) {
  return rpc('lm_registrieren', { p_klassencode: klassencode });
}

export async function anmelden(lerncode, geteilt) {
  const code = lerncode.trim().toLowerCase();
  const r = await rpc('lm_anmelden', { p_code: code });
  konto = { modus: 'schule', id: 's' + kurzHash(code), lerncode: code, pseudonym: r.pseudonym, team: r.team, geteilt: !!geteilt, zuletzt: Date.now() };
  kontoSpeichern();
  // Lernstand vom Server übernehmen (der Server ist massgebend)
  for (const [paketId, v] of Object.entries(r.lernstand || {})) {
    const lokal = lies(datenKey(paketId));
    const d = { ...v.daten, ausstehend: lokal && lokal.ausstehend ? lokal.ausstehend : { antworten: [], sitzungen: [] } };
    schreib(datenKey(paketId), d);
  }
  return konto;
}

// Lernstand und neue Antworten hochladen
export async function synchronisiere(paket, d) {
  if (!konto || konto.modus !== 'schule') return { ok: true, lokal: true };
  const jetzt = new Date();
  const st = {};
  for (const l of paket.lernziele) { const s = status(d.modell, l.id, jetzt); if (s !== 'neu') st[l.id] = s; }
  const antworten = d.ausstehend.antworten.slice(0, 500), sitzungen = d.ausstehend.sitzungen.slice(0, 50);
  const { ausstehend, ...lernstand } = d;
  await rpc('lm_sync', { p_code: konto.lerncode, p_paket: paket.id, p_daten: lernstand, p_status: st, p_antworten: antworten, p_sitzungen: sitzungen });
  d.ausstehend.antworten = d.ausstehend.antworten.slice(antworten.length);
  d.ausstehend.sitzungen = d.ausstehend.sitzungen.slice(sitzungen.length);
  speichereDaten(paket.id, d);
  if (d.ausstehend.antworten.length || d.ausstehend.sitzungen.length) return synchronisiere(paket, d);
  return { ok: true };
}

export function hatAusstehendes() {
  if (!konto) return false;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(`lernmotor.v2.${konto.id}.`)) {
      const d = lies(k);
      if (d && d.ausstehend && (d.ausstehend.antworten.length || d.ausstehend.sitzungen.length)) return true;
    }
  }
  return false;
}

function lokaleDatenLoeschen(id) {
  const weg2 = [];
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(`lernmotor.v2.${id}.`)) weg2.push(k); }
  weg2.forEach(weg);
}

// Abmelden. Auf gemeinsamen Geräten (und immer im Schulmodus) verschwindet alles Lokale dieses Kontos.
export async function abmelden({ trotzdem = false } = {}) {
  if (!konto) return true;
  if (konto.modus === 'schule') {
    if (hatAusstehendes() && !trotzdem) return false;
    lokaleDatenLoeschen(konto.id);
  }
  konto = null; kontoSpeichern();
  return true;
}

export async function meineDatenLoeschen() {
  if (konto.modus === 'schule') await rpc('lm_daten_loeschen', { p_code: konto.lerncode });
  else schreib(PROFILE_KEY, lokaleProfile().filter(p => p.id !== konto.id));
  lokaleDatenLoeschen(konto.id);
  konto = null; kontoSpeichern();
}

export async function klassenwertung() {
  if (!konto || konto.modus !== 'schule') return null;
  return rpc('lm_klassenwertung', { p_code: konto.lerncode });
}

/* ---------- Lokal: Profile auf diesem Gerät ---------- */
export const lokaleProfile = () => lies(PROFILE_KEY) || [];
export function lokalesProfilNeu(name) {
  const p = { id: 'l' + Date.now().toString(36), pseudonym: name.trim().slice(0, 30) || 'Profil' };
  schreib(PROFILE_KEY, [...lokaleProfile(), p]);
  return p;
}
export function lokalWaehlen(p) {
  konto = { modus: 'lokal', id: p.id, pseudonym: p.pseudonym, geteilt: false, zuletzt: Date.now() };
  kontoSpeichern();
}

export { backendAktiv };
