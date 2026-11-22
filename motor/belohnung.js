// Belohnungen, strikt an die Lernaufgabe gekoppelt: XP gibt es für Abrufe, nicht für Klicks.
// Serie mit Schonfrist: ein freier Schultag pro Woche, Wochenende zählt nicht.
// Wird die Serie trotzdem unterbrochen, halbiert sie sich statt auf null zu fallen (Wiedereinstieg ohne Nullstellung).

import { EINSTELLUNGEN as E } from './einstellungen.js';

export function tagSchluessel(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function ausSchluessel(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d, 12); }
function wochenSchluessel(d) {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); // Montag dieser Woche
  return tagSchluessel(t);
}

export function leereSerie() { return { wert: 0, rekord: 0, letzterTag: null, joker: [] }; }

export function aktualisiereSerie(serie, jetzt) {
  const heute = tagSchluessel(jetzt);
  if (serie.letzterTag === heute) return serie;
  let s = { ...serie, joker: [...serie.joker] };
  let unterbrochen = false;
  if (s.letzterTag) {
    const d = ausSchluessel(s.letzterTag);
    d.setDate(d.getDate() + 1);
    while (tagSchluessel(d) < heute) {
      const wt = d.getDay();
      if (wt !== 0 && wt !== 6) {
        const w = wochenSchluessel(d);
        if (!s.joker.includes(w)) s.joker.push(w); else { unterbrochen = true; }
      }
      d.setDate(d.getDate() + 1);
    }
  }
  s.wert = unterbrochen ? Math.floor(s.wert / 2) + 1 : s.wert + 1;
  s.rekord = Math.max(s.rekord, s.wert);
  s.letzterTag = heute;
  s.joker = s.joker.slice(-4);
  return s;
}

// Unregelmässige Bonus-Trophäe nach einer Sitzung (nicht nach jeder Aufgabe)
export const BONUS = [
  { id: 'funke', icon: '✨', name: 'Funke' },
  { id: 'kompass', icon: '\u{1F9ED}', name: 'Kompass' },
  { id: 'kristall', icon: '\u{1F48E}', name: 'Kristall' },
  { id: 'komet', icon: '☄️', name: 'Komet' },
  { id: 'eule', icon: '\u{1F989}', name: 'Eule' },
  { id: 'blitz', icon: '⚡', name: 'Blitz' }
];
export function zieheBonus(zusammenfassung, zufall = Math.random) {
  if (!zusammenfassung.abrufe || zufall() >= E.bonusWahrscheinlichkeit) return null;
  return BONUS[Math.floor(zufall() * BONUS.length)];
}

export const STUFEN = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];
export function stufe(xp) { let s = 0; STUFEN.forEach((g, i) => { if (xp >= g) s = i; }); return s + 1; }
export function fortschrittStufe(xp) {
  const s = stufe(xp) - 1, a = STUFEN[s], b = STUFEN[s + 1];
  return b === undefined ? 1 : (xp - a) / (b - a);
}
