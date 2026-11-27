// Bewertet eine Antwort zu einer Instanz. Ergebnis:
// { gueltig, richtig, punkte (0–1), gewaehlt, erklaerung, loesung }
// Neue Typen (höhere Stufen) zusätzlich: hinweise = Rückmeldung pro Fehler, die die Lösung nicht verrät
// (wird vor der Lösung gezeigt); Teilpunkte = Anteil erfüllter Kriterien.
// gueltig = false heisst: Eingabe nicht auswertbar (z. B. keine Zahl), nichts zählen.

import { ROLLEN } from './format.js';

export function bewerte(i, antwort) {
  switch (i.typ) {
    case 'mc': return mc(i, antwort);
    case 'zahl': return zahl(i, antwort);
    case 'luecke': return luecke(i, antwort);
    case 'zuordnen': return zuordnen(i, antwort);
    case 'reihenfolge': return reihenfolge(i, antwort);
    case 'erklaeren': return erklaeren(i, antwort);
    case 'fehler': return fehler(i, antwort);
    case 'daten': return daten(i, antwort);
    case 'vergleich': return vergleich(i, antwort);
    case 'versuch': return versuch(i, antwort);
    case 'vorhersage': return vorhersage(i, antwort);
    default: throw new Error('Unbekannter Typ ' + i.typ);
  }
}

function ergebnis(punkte, extra) {
  return { gueltig: true, punkte, richtig: punkte >= 1, ...extra };
}

function mc(i, nr) {
  const o = i.optionen.find(x => x.nr === nr);
  if (!o) return { gueltig: false };
  const richtige = i.optionen.find(x => x.richtig);
  // Eigene Erklärung pro falscher Option (Fehlvorstellung), sonst die allgemeine
  const erklaerung = !o.richtig && o.erklaerung ? o.erklaerung + '<br><br>' + i.erklaerung : i.erklaerung;
  return ergebnis(o.richtig ? 1 : 0, { gewaehlt: nr, erklaerung, loesung: richtige.text });
}

// «2,5», «2.5», «1'200», «−3», «2,5 kJ»
export function leseZahl(s) {
  s = String(s ?? '').trim().replace(/−/g, '-');
  const m = /^(-?[\d\s'’ ]*[.,]?\d+)\s*(.*)$/.exec(s);
  if (!m) return null;
  const x = parseFloat(m[1].replace(/[\s'’ ]/g, '').replace(',', '.'));
  return Number.isFinite(x) ? { x, einheit: m[2].trim() } : null;
}

function zahl(i, eingabe) {
  const z = leseZahl(eingabe);
  if (!z) return { gueltig: false, hinweis: 'Gib eine Zahl ein, zum Beispiel 120 oder 2,5.' };
  let faktor = 1;
  if (i.einheitPruefen) {
    const alt = i.einheitenAlternativ || {};
    if (!z.einheit) return { gueltig: false, hinweis: `Gib auch die Einheit an, zum Beispiel ${i.einheit}.` };
    if (gleichEinheit(z.einheit, i.einheit)) faktor = 1;
    else {
      const k = Object.keys(alt).find(e => gleichEinheit(z.einheit, e));
      if (!k) return ergebnis(0, { gewaehlt: eingabe, erklaerung: `Die Einheit «${z.einheit}» passt nicht.<br>${i.erklaerung}`, loesung: `${i.wert} ${i.einheit}`, einheitFalsch: true });
      faktor = alt[k];
    }
  }
  const x = z.x * faktor;
  const tol = Math.max(Math.abs(i.wert) * (i.toleranzRel ?? 0.01), i.toleranzAbs ?? 0, 1e-9);
  const ok = Math.abs(x - i.wert) <= tol;
  return ergebnis(ok ? 1 : 0, { gewaehlt: eingabe, erklaerung: i.erklaerung, loesung: `${i.wert} ${i.einheit || ''}`.trim() });
}

const gleichEinheit = (a, b) => a.replace(/\s/g, '') === String(b).replace(/\s/g, '');

export function normalisiere(s) {
  return String(s ?? '').trim().toLowerCase().replace(/ß/g, 'ss').replace(/\s+/g, ' ');
}

function luecke(i, antworten) {
  if (!Array.isArray(antworten)) return { gueltig: false };
  let ok = 0;
  i.luecken.forEach((akzeptiert, k) => { if (akzeptiert.some(a => normalisiere(a) === normalisiere(antworten[k]))) ok++; });
  return ergebnis(ok / i.luecken.length, { gewaehlt: antworten, erklaerung: i.erklaerung, loesung: i.luecken.map(l => l[0]).join(' · ') });
}

function zuordnen(i, zuordnung) {
  if (!Array.isArray(zuordnung)) return { gueltig: false };
  const ok = i.paare.filter((p, k) => zuordnung[k] === p[1]).length;
  return ergebnis(ok / i.paare.length, { gewaehlt: zuordnung, erklaerung: i.erklaerung, loesung: i.paare.map(p => `${p[0]} → ${p[1]}`).join('<br>') });
}

function reihenfolge(i, folge) {
  if (!Array.isArray(folge) || folge.length !== i.elemente.length) return { gueltig: false };
  const ok = i.elemente.filter((e, k) => folge[k] === e).length;
  return ergebnis(ok / i.elemente.length, { gewaehlt: folge, erklaerung: i.erklaerung, loesung: i.elemente.join(' → ') });
}

// Version 1: keine KI-Bewertung. Das Kind vergleicht mit der Musterantwort und schätzt sich selbst ein.
function erklaeren(i, selbst) {
  const p = { passt: 1, teilweise: 0.5, fehlt: 0 }[selbst];
  if (p === undefined) return { gueltig: false };
  return ergebnis(p, { gewaehlt: selbst, erklaerung: i.erklaerung || '', loesung: i.musterantwort, selbstbewertet: true });
}

/* ---------- Höhere Stufen: Auswertung über Kriterien, ohne KI ---------- */

// kriterien: [{ ok, hinweis }]. Punkte = Anteil erfüllter Kriterien. Hinweise nur für nicht erfüllte, ohne Lösung.
function ausKriterien(kriterien, extra) {
  const ok = kriterien.filter(k => k.ok).length;
  return ergebnis(ok / kriterien.length, { ...extra, hinweise: kriterien.filter(k => !k.ok && k.hinweis).map(k => k.hinweis) });
}
const istNr = (x, liste) => Number.isInteger(x) && x >= 0 && x < liste.length;

// Fehler finden: { zeile, art }. Die Fehlerart zählt nur, wenn die Zeile stimmt.
function fehler(i, a) {
  if (!a || !istNr(a.zeile, i.zeilen) || !istNr(a.art, i.fehlerarten)) return { gueltig: false, hinweis: 'Markiere eine Zeile und wähle die Fehlerart.' };
  const zeileOk = a.zeile === i.fehlerZeile;
  return ausKriterien([
    { ok: zeileOk, hinweis: 'Die markierte Zeile ist korrekt. Prüfe die anderen Zeilen Schritt für Schritt.' },
    { ok: zeileOk && a.art === i.fehlerArt, hinweis: zeileOk ? 'Die Zeile stimmt. Überlege nochmals, welche Art Fehler es ist.' : null }
  ], { gewaehlt: [a.zeile, a.art], erklaerung: i.erklaerung,
    loesung: `Zeile ${i.fehlerZeile + 1} («${i.zeilen[i.fehlerZeile]}»): ${i.fehlerarten[i.fehlerArt]}` });
}

// Datenanalyse: Array mit true (stimmt) / false pro Aussage. Rückmeldung nur zur Art des Fehlers, nicht zur Aussage.
function daten(i, a) {
  if (!Array.isArray(a) || a.length !== i.aussagen.length) return { gueltig: false };
  const kriterien = i.aussagen.map((x, k) => ({ ok: !!a[k] === !!x.richtig }));
  const zuViel = i.aussagen.some((x, k) => a[k] && !x.richtig), zuWenig = i.aussagen.some((x, k) => !a[k] && x.richtig);
  const r = ausKriterien(kriterien, { gewaehlt: a.map(x => (x ? 1 : 0)).join(''),
    erklaerung: [i.erklaerung, ...i.aussagen.filter((x, k) => !!a[k] !== !!x.richtig && x.erklaerung).map(x => x.erklaerung)].join('<br><br>'),
    loesung: i.aussagen.filter(x => x.richtig).map(x => x.text).join('<br>') });
  r.hinweise = [
    zuViel && 'Mindestens eine Aussage, die du angekreuzt hast, passt nicht zu den Daten.',
    zuWenig && 'Mindestens eine Aussage, die zu den Daten passt, hast du nicht angekreuzt.'
  ].filter(Boolean);
  return r;
}

// Vergleichen und begründen: { wahl, begruendung }. Die Begründung zählt nur bei richtiger Wahl.
function vergleich(i, a) {
  if (!a || !istNr(a.wahl, i.varianten) || !istNr(a.begruendung, i.begruendungen)) return { gueltig: false, hinweis: 'Wähle eine Variante und eine Begründung.' };
  const wahlOk = a.wahl === i.besser, b = i.begruendungen[a.begruendung];
  const richtige = i.begruendungen.find(x => x.richtig);
  return ausKriterien([
    { ok: wahlOk, hinweis: 'Schau nochmals, worin sich die beiden unterscheiden und was das für das Ergebnis bedeutet.' },
    { ok: wahlOk && b.richtig, hinweis: wahlOk ? 'Deine Wahl stimmt. Die Begründung trifft den entscheidenden Unterschied noch nicht.' : null }
  ], { gewaehlt: [a.wahl, a.begruendung], erklaerung: !b.richtig && b.erklaerung ? b.erklaerung + '<br><br>' + i.erklaerung : i.erklaerung,
    loesung: `${i.varianten[i.besser].titel}, weil ${richtige.text}` });
}

// Versuch planen: { frage?, rollen: [Rolle pro Grösse] }. Geprüft wird die Struktur des Plans, nicht ein Wortlaut.
function versuch(i, a) {
  if (!a || !Array.isArray(a.rollen) || a.rollen.length !== i.groessen.length || a.rollen.some(r => !ROLLEN.includes(r))) return { gueltig: false, hinweis: 'Wähle für jede Grösse eine Rolle.' };
  if (i.fragen && !istNr(a.frage, i.fragen)) return { gueltig: false, hinweis: 'Wähle zuerst eine Frage.' };
  const passt = (k, r) => [].concat(i.groessen[k].rolle).includes(r);
  const mit = r => a.rollen.map((x, k) => (x === r ? k : -1)).filter(k => k >= 0);
  const veraendert = mit('veraendern'), gemessen = mit('messen');
  const kriterien = [
    { ok: veraendert.length === 1, hinweis: veraendert.length ? 'Du veränderst mehr als eine Grösse. Dann weisst du nicht, welche die Wirkung hat.' : 'Du veränderst keine Grösse.' },
    { ok: veraendert.length === 1 && passt(veraendert[0], 'veraendern'), hinweis: veraendert.length === 1 ? 'Die Grösse, die du veränderst, passt noch nicht zur Frage.' : null },
    { ok: gemessen.length > 0 && gemessen.every(k => passt(k, 'messen')), hinweis: gemessen.length ? 'Mindestens eine Messgrösse beantwortet die Frage nicht.' : 'Du misst noch nichts.' },
    { ok: i.groessen.every((g, k) => [].concat(g.rolle).join() !== 'konstant' || a.rollen[k] === 'konstant'),
      hinweis: 'Mindestens eine Grösse, die das Ergebnis beeinflusst, bleibt noch nicht gleich.' }
  ];
  if (i.fragen) kriterien.unshift({ ok: !!i.fragen[a.frage].richtig, hinweis: 'Die gewählte Frage lässt sich so mit einem Versuch noch nicht klar beantworten.' });
  const ROLLE = { veraendern: 'verändern', messen: 'messen', konstant: 'gleich lassen', egal: 'egal' };
  return ausKriterien(kriterien, { gewaehlt: { frage: a.frage, rollen: a.rollen }, erklaerung: i.erklaerung,
    loesung: (i.fragen ? `Frage: ${i.fragen.find(x => x.richtig).text}<br>` : '') + i.groessen.map(g => `${g.text}: ${ROLLE[[].concat(g.rolle)[0]]}`).join('<br>') });
}

// Vorhersage: { vorhersage, beobachtung } (Index der Option). Je ein Punkt für richtige Vorhersage und richtige Beobachtung.
function vorhersage(i, a) {
  if (!a || !istNr(a.vorhersage, i.optionen) || !istNr(a.beobachtung, i.optionen)) return { gueltig: false, hinweis: 'Gib zuerst eine Vorhersage ab, dann deine Beobachtung.' };
  const richtig = i.optionen.findIndex(o => o.richtig);
  const vergleichText = a.vorhersage === a.beobachtung ? 'Deine Vorhersage und deine Beobachtung stimmen überein.'
    : 'Deine Vorhersage und deine Beobachtung unterscheiden sich. Überlege, warum.';
  return ausKriterien([
    { ok: a.beobachtung === richtig, hinweis: 'Schau nochmals genau in die Simulation.' },
    { ok: a.vorhersage === richtig }
  ], { gewaehlt: [a.vorhersage, a.beobachtung], erklaerung: vergleichText + '<br><br>' + i.erklaerung, loesung: i.optionen[richtig].text });
}
