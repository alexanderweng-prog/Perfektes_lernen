// Schülermodell: pro Kind und Lernziel, wie sicher das Wissen sitzt.
// Planer: FSRS über die Bibliothek ts-fsrs (MIT, vendor/ts-fsrs). Nichts davon ist selbst erfunden,
// ausser der Zuordnung «Antwort → FSRS-Bewertung» und dem Schwierigkeitsniveau (beides Annahmen).

import { fsrs, generatorParameters, createEmptyCard, Rating, State } from '../vendor/ts-fsrs/ts-fsrs.mjs';
import { EINSTELLUNGEN as E } from './einstellungen.js';

const planer = fsrs(generatorParameters({
  request_retention: E.zielBehalten,
  maximum_interval: E.maxIntervallTage,
  enable_fuzz: false,
  // Schule: kein Wiederholen nach Minuten. Innerhalb einer Sitzung regelt die Warteschlange das.
  enable_short_term: false
}));

export function leeresModell(paketId) {
  return { version: 1, paket: paketId, lernziele: {}, niveau: E.startNiveau, verlauf: [] };
}

function karteLaden(k) {
  return { ...k, due: new Date(k.due), last_review: k.last_review ? new Date(k.last_review) : undefined };
}
function karteSpeichern(k) {
  return { ...k, due: k.due.toISOString(), last_review: k.last_review ? new Date(k.last_review).toISOString() : null };
}

export function eintrag(modell, lernzielId) {
  return modell.lernziele[lernzielId] || null;
}

export function istNeu(modell, lernzielId) {
  const e = eintrag(modell, lernzielId);
  return !e || !e.karte;
}

export function istFaellig(modell, lernzielId, jetzt) {
  const e = eintrag(modell, lernzielId);
  return !!(e && e.karte && new Date(e.karte.due) <= jetzt);
}

// Wie wahrscheinlich das Kind das Lernziel jetzt noch abrufen kann (0–1). Neu: 0.
export function abrufWahrscheinlichkeit(modell, lernzielId, jetzt) {
  const e = eintrag(modell, lernzielId);
  if (!e || !e.karte) return 0;
  return planer.get_retrievability(karteLaden(e.karte), jetzt, false);
}

// Antwort → FSRS-Bewertung.
// falsch → «nochmals»; richtig, aber unsicher/geraten oder nur teilweise → «schwer»; sonst «gut».
// Nach dem Pausenhinweis zählt ein Fehler nur als «schwer» (geringere Gewichtung bei Ermüdung, Annahme).
export function bewertungFuer({ punkte, sicherheit, nachPause }) {
  if (punkte < 0.5) return nachPause ? Rating.Hard : Rating.Again;
  if (punkte < 1) return Rating.Hard;
  if (sicherheit === 'unsicher' || sicherheit === 'geraten') return Rating.Hard;
  return Rating.Good;
}

// Trägt einen Abruf ins Modell ein (gibt ein neues Modell zurück, das alte bleibt unverändert).
// zaehltFuerPlaner = false: nur Zähler (z. B. Aufgabe mit Hilfe oder Wiederholung in derselben Sitzung).
export function verbuche(modell, lernzielId, { punkte, sicherheit, nachPause, zaehltFuerPlaner = true }, jetzt) {
  const alt = modell.lernziele[lernzielId] || { richtig: 0, falsch: 0, karte: null };
  const e = { ...alt };
  if (punkte >= 1) e.richtig++; else e.falsch++;
  e.letzterAbruf = jetzt.toISOString();
  if (zaehltFuerPlaner) {
    const karte = e.karte ? karteLaden(e.karte) : createEmptyCard(jetzt);
    const r = planer.next(karte, jetzt, bewertungFuer({ punkte, sicherheit, nachPause }));
    e.karte = karteSpeichern(r.card);
  }
  const verlauf = zaehltFuerPlaner ? [...modell.verlauf, punkte >= 1].slice(-E.fensterNiveau) : modell.verlauf;
  const niveau = zaehltFuerPlaner ? passeNiveauAn(modell.niveau, verlauf) : modell.niveau;
  return { ...modell, lernziele: { ...modell.lernziele, [lernzielId]: e }, verlauf: niveau !== modell.niveau ? [] : verlauf, niveau };
}

// Zielgenauigkeit ca. 80 %: darüber wird es schwieriger, deutlich darunter leichter.
// Erst wenn das Fenster voll ist, danach beginnt das Fenster neu (verhindert Hin und Her).
export function passeNiveauAn(niveau, verlauf) {
  if (verlauf.length < E.fensterNiveau) return niveau;
  const quote = verlauf.filter(Boolean).length / verlauf.length;
  if (quote > E.bandOben) return Math.min(5, niveau + E.schrittNiveau);
  if (quote < E.bandUnten) return Math.max(1, niveau - E.schrittNiveau);
  return niveau;
}

// Anzeige für das Kind: «neu», «wackelt» oder «sitzt»
export function status(modell, lernzielId, jetzt) {
  const e = eintrag(modell, lernzielId);
  if (!e || !e.karte) return 'neu';
  const k = e.karte;
  if (k.state === State.Review && k.stability >= E.sitztAbStabilitaetTage && new Date(k.due) > jetzt) return 'sitzt';
  return 'wackelt';
}

export { Rating, State };
