import { existsSync } from 'node:fs';
// Tests für den Lern-Motor. Aufruf: node --test test/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EINSTELLUNGEN as E, EINSTELLUNGEN_VERSION } from '../motor/einstellungen.js';
import { bewerte, leseZahl } from '../motor/bewerten.js';
import { instanz, pruefePaket, hoheStufe } from '../motor/format.js';
import { leeresModell, verbuche, status, istFaellig, passeNiveauAn, bewertungFuer, Rating } from '../motor/schuelermodell.js';
import { Sitzung, pauseNoetig, verzahne, zaehleFaellige, kontrolleStichtag, vertiefungFrei } from '../motor/sitzung.js';
import { aktualisiereSerie, leereSerie, zieheBonus } from '../motor/belohnung.js';
import { KATALOG } from '../pakete/katalog.js';
import { ergaenze, ladeErgaenzung } from '../pakete/ergaenze.js';

const TAG = 86400000;
const t0 = new Date(2026, 10, 23, 8, 0); // Montag

// Kleines Testpaket: 3 Kompetenzen, je 2 Lernziele, je 2 Aufgaben (verschiedene Variantengruppen)
function testpaket() {
  const kompetenzen = ['A', 'B', 'C'].map(id => ({ id, titel: 'Kompetenz ' + id }));
  const lernziele = [], aufgaben = [];
  for (const k of kompetenzen) for (const n of [1, 2]) {
    const lid = k.id + n;
    lernziele.push({ id: lid, kompetenz: k.id, titel: 'Lernziel ' + lid });
    for (const v of ['x', 'y']) aufgaben.push({
      id: lid + v, lernziel: lid, typ: 'mc', schwierigkeit: v === 'x' ? 2 : 4, variantengruppe: lid + v, quelle: 'Test', pruefstatus: 'geprueft',
      text: 'Frage ' + lid + v, erklaerung: 'Weil.', optionen: [{ text: 'richtig', richtig: true }, { text: 'falsch', richtig: false, erklaerung: 'Fehlvorstellung' }]
    });
  }
  return { id: 'test', titel: 'Test', kompetenzen, lernziele, aufgaben };
}
const richtigeNr = i => i.optionen.find(o => o.richtig).nr;
const falscheNr = i => i.optionen.find(o => !o.richtig).nr;

test('Bewertung: Multiple Choice mit Erklärung pro falscher Option', () => {
  const i = instanz(testpaket().aufgaben[0]);
  assert.equal(bewerte(i, richtigeNr(i)).richtig, true);
  const b = bewerte(i, falscheNr(i));
  assert.equal(b.richtig, false);
  assert.match(b.erklaerung, /Fehlvorstellung/);
  assert.equal(b.gewaehlt, 1); // Originalindex, unabhängig vom Mischen
});

test('Bewertung: Zahl mit Toleranz, Komma, Tausendertrennung und Einheit', () => {
  assert.deepEqual(leseZahl("1'200,5 kJ"), { x: 1200.5, einheit: 'kJ' });
  const i = { typ: 'zahl', text: 'W?', wert: 2500, einheit: 'J', erklaerung: '…', toleranzRel: 0.01 };
  assert.equal(bewerte(i, '2500').richtig, true);
  assert.equal(bewerte(i, '2 510').richtig, true);
  assert.equal(bewerte(i, '2600').richtig, false);
  assert.equal(bewerte(i, 'abc').gueltig, false);
  const mitEinheit = { ...i, einheitPruefen: true, einheitenAlternativ: { kJ: 1000 } };
  assert.equal(bewerte(mitEinheit, '2,5 kJ').richtig, true);
  assert.equal(bewerte(mitEinheit, '2500 W').richtig, false);
  assert.equal(bewerte(mitEinheit, '2500').gueltig, false);
});

test('Bewertung: Lückentext, Zuordnen (Teilpunkte), Reihenfolge, Selbsterklärung', () => {
  const l = { typ: 'luecke', text: '___ und ___', luecken: [['Joule', 'J'], ['Watt']], erklaerung: '' };
  assert.equal(bewerte(l, [' joule ', 'watt']).richtig, true);
  assert.equal(bewerte(l, ['J', 'Volt']).punkte, 0.5);
  const z = { typ: 'zuordnen', paare: [['P', 'W'], ['E', 'J'], ['U', 'V']], erklaerung: '' };
  assert.equal(bewerte(z, ['W', 'V', 'J']).punkte, 1 / 3);
  const r = { typ: 'reihenfolge', elemente: ['a', 'b', 'c'], erklaerung: '' };
  assert.equal(bewerte(r, ['a', 'b', 'c']).richtig, true);
  const x = { typ: 'erklaeren', musterantwort: '…' };
  assert.equal(bewerte(x, 'teilweise').punkte, 0.5);
});

test('Schülermodell: falsch kommt früher wieder als richtig', () => {
  let m = leeresModell('test');
  m = verbuche(m, 'A1', { punkte: 1 }, t0);
  m = verbuche(m, 'B1', { punkte: 1 }, t0);
  const t1 = new Date(+t0 + 3 * TAG);
  m = verbuche(m, 'A1', { punkte: 1 }, t1);
  m = verbuche(m, 'B1', { punkte: 0 }, t1);
  assert.ok(new Date(m.lernziele.B1.karte.due) < new Date(m.lernziele.A1.karte.due));
  assert.equal(m.lernziele.B1.falsch, 1);
  assert.equal(status(m, 'C1', t1), 'neu');
});

test('Schülermodell: nach dem Pausenhinweis zählt ein Fehler schwächer; unsicher richtig = schwer', () => {
  assert.equal(bewertungFuer({ punkte: 0 }), Rating.Again);
  assert.equal(bewertungFuer({ punkte: 0, nachPause: true }), Rating.Hard);
  assert.equal(bewertungFuer({ punkte: 1, sicherheit: 'geraten' }), Rating.Hard);
  assert.equal(bewertungFuer({ punkte: 1, sicherheit: 'sicher' }), Rating.Good);
});

test('Schwierigkeit: steigt über dem Band, sinkt deutlich darunter, bleibt bei ca. 80 %', () => {
  const n = E.fensterNiveau;
  assert.equal(passeNiveauAn(2, Array(n).fill(true)), 2 + E.schrittNiveau);
  assert.equal(passeNiveauAn(2, Array(n).fill(false)), 2 - E.schrittNiveau);
  const achtzig = Array.from({ length: n }, (_, k) => k % 5 !== 0);
  assert.equal(passeNiveauAn(2, achtzig), 2);
});

test('Sitzung ohne Vorwissen: Beispiel → mit Hilfe → ohne Hilfe, mit Abstand', () => {
  const p = testpaket();
  const s = new Sitzung(p, leeresModell('test'), { uhr: () => t0, zufall: () => 0.99 });
  const folge = [];
  let a;
  while ((a = s.naechster())) {
    folge.push(a.schritt.lernziel + ':' + a.schritt.phase);
    if (a.schritt.phase === 'beispiel') s.weiter(); else s.antworte(richtigeNr(a.instanz));
  }
  const neu = folge.filter(x => x.endsWith(':beispiel')).map(x => x.split(':')[0]);
  assert.equal(neu.length, E.blockMaxNeueLernziele);
  for (const lz of neu) {
    const b = folge.indexOf(lz + ':beispiel'), h = folge.indexOf(lz + ':mitHilfe'), o = folge.indexOf(lz + ':neu');
    assert.ok(b < h && h < o, folge.join(' '));
    assert.ok(o - h > 1 || folge.length < 6, 'Abstand zwischen den Fading-Schritten');
  }
  // Nach der Sitzung haben die neuen Lernziele einen Planer-Eintrag
  for (const lz of neu) assert.ok(s.modell.lernziele[lz].karte);
});

test('Sitzung: Fällige zuerst und gemischt, Obergrenze, falsch kommt in anderer Variante wieder', () => {
  const p = testpaket();
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  const spaeter = new Date(+t0 + 30 * TAG);
  assert.equal(zaehleFaellige(p, m, { jetzt: spaeter }), 6);
  const s = new Sitzung(p, m, { uhr: () => spaeter, zufall: () => 0.5 });
  const erste = s.naechster();
  assert.equal(erste.schritt.phase, 'faellig');
  s.antworte(falscheNr(erste.instanz));
  const gezeigt = [erste];
  let a;
  while ((a = s.naechster())) { gezeigt.push(a); s.antworte(richtigeNr(a.instanz)); }
  // keine zwei gleichen Kompetenzen direkt hintereinander, solange es Alternativen gibt
  const k = gezeigt.slice(0, 6).map(x => x.lernziel.kompetenz);
  for (let i = 1; i < k.length; i++) assert.notEqual(k[i], k[i - 1], k.join(''));
  const nochmals = gezeigt.find(x => x.schritt.phase === 'nochmals');
  assert.ok(nochmals, 'falsch gelöstes Lernziel kommt nochmals');
  assert.equal(nochmals.schritt.lernziel, erste.schritt.lernziel);
  assert.notEqual(nochmals.aufgabe.variantengruppe, erste.aufgabe.variantengruppe);
  assert.ok(gezeigt.indexOf(nochmals) > E.abstandNachFehler, 'nicht sofort');
  assert.ok(s.aufgabenZahl <= E.blockMaxAufgaben);
});

test('Beispiel: vorgerechnete Aufgabe kommt weder «ohne Hilfe» noch «nochmals»; Hinweis «andere Form» stimmt', () => {
  for (const z of [0, 0.3, 0.6, 0.99]) {
    const p = testpaket();
    const s = new Sitzung(p, leeresModell('test'), { uhr: () => t0, zufall: () => z });
    const vorgerechnet = new Map(), gezeigt = [];
    let a;
    while ((a = s.naechster())) {
      const ph = a.schritt.phase, g = a.aufgabe.variantengruppe;
      if (ph === 'beispiel') { assert.equal(a.zeigeVorgerechnet, true); vorgerechnet.set(a.schritt.lernziel, g); s.weiter(); continue; }
      if (ph === 'neu' || ph === 'nochmals') assert.notEqual(g, vorgerechnet.get(a.schritt.lernziel), `${ph} bringt das Beispiel (zufall ${z})`);
      // «ohne Hilfe» falsch: mit nur 2 Gruppen ist keine neue Form mehr übrig (Beispiel gesperrt, die andere schon benutzt)
      const r = s.antworte(ph === 'neu' ? falscheNr(a.instanz) : richtigeNr(a.instanz));
      if (ph === 'neu') assert.equal(r.nochmals, 'gleicheForm');
      if (ph === 'mitHilfe' || ph === 'nochmals') assert.equal(r.nochmals, null);
      gezeigt.push(ph);
    }
    assert.ok(gezeigt.includes('nochmals'));
  }
});

test('Beispiel: Lernziel mit nur einer Variantengruppe zeigt keine vorgerechnete Aufgabe', () => {
  const p = testpaket();
  p.aufgaben = p.aufgaben.filter(a => !a.id.endsWith('y'));
  const s = new Sitzung(p, leeresModell('test'), { uhr: () => t0, zufall: () => 0.5 });
  let a, beispiele = 0;
  while ((a = s.naechster())) {
    if (a.schritt.phase === 'beispiel') { beispiele++; assert.equal(a.zeigeVorgerechnet, false); s.weiter(); } else s.antworte(richtigeNr(a.instanz));
  }
  assert.ok(beispiele > 0);
});

test('Nochmals: «in anderer Form» nur, wenn eine unbenutzte Variante existiert', () => {
  const p = testpaket();
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  const s = new Sitzung(p, m, { uhr: () => new Date(+t0 + 30 * TAG), zufall: () => 0.5 });
  const a = s.naechster();
  assert.equal(s.antworte(falscheNr(a.instanz)).nochmals, 'andereForm');
  const einzeln = testpaket();
  einzeln.aufgaben = einzeln.aufgaben.filter(x => !x.id.endsWith('y'));
  const s2 = new Sitzung(einzeln, m, { uhr: () => new Date(+t0 + 30 * TAG), zufall: () => 0.5 });
  const b = s2.naechster();
  assert.equal(s2.antworte(falscheNr(b.instanz)).nochmals, 'gleicheForm');
});

test('Hinweisleiter: Zahl mit weiteren Versuchen, nur der erste zählt für FSRS; MC ohne zweiten Versuch', () => {
  const p = testpaket();
  p.aufgaben.find(a => a.id === 'A1x').typ = 'zahl';
  Object.assign(p.aufgaben.find(a => a.id === 'A1x'), { wert: 10, einheit: 'J', optionen: undefined });
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  const spaeter = new Date(+t0 + 30 * TAG);
  const s = new Sitzung(p, m, { uhr: () => spaeter, zufall: () => 0 });
  let a = s.naechster();
  while (a.aufgabe.id !== 'A1x') { s.antworte(richtigeNr(a.instanz)); a = s.naechster(); }
  const vorher = s.modell.lernziele.A1;
  const r1 = s.antworte('3');
  assert.deepEqual([r1.versuch, r1.hilfsstufe, r1.nochVersuch, r1.fertig], [1, 1, true, false]);
  const nachErstem = s.modell.lernziele.A1;
  assert.notDeepEqual(nachErstem.karte, vorher.karte, 'erster Versuch zählt');
  const r2 = s.antworte('4');
  assert.deepEqual([r2.versuch, r2.hilfsstufe, r2.nochVersuch], [2, 2, true]);
  const r3 = s.antworte('10');
  assert.deepEqual([r3.versuch, r3.richtig, r3.fertig, r3.xp], [3, true, true, E.xp.nachHinweis]);
  assert.deepEqual(s.modell.lernziele.A1, nachErstem, 'spätere Versuche ändern das Modell nicht');
  const eintraege = s.protokoll.filter(x => x.aufgabe === 'A1x');
  assert.equal(eintraege.length, 1, 'ein Eintrag pro Aufgabe');
  assert.deepEqual([eintraege[0].richtig, eintraege[0].versuch, eintraege[0].hilfsstufe, eintraege[0].richtigAmEnde], [false, 3, 2, true]);
  assert.equal(s.offen.filter(x => x.lernziel === 'A1' && x.phase === 'nochmals').length, 1, 'nochmals nach erstem Fehler, nur einmal');
  // Nach drei Fehlern: Lösung (Stufe 3), keine weiteren Versuche
  const s2 = new Sitzung(p, m, { uhr: () => spaeter, zufall: () => 0 });
  a = s2.naechster();
  while (a.aufgabe.id !== 'A1x') { s2.antworte(richtigeNr(a.instanz)); a = s2.naechster(); }
  s2.antworte('1'); s2.antworte('2');
  const r = s2.antworte('3');
  assert.deepEqual([r.hilfsstufe, r.nochVersuch, r.fertig], [3, false, true]);
  // MC: ein Versuch, danach Lösung
  const mc = s2.naechster();
  const rm = s2.antworte(falscheNr(mc.instanz));
  assert.deepEqual([rm.versuch, rm.hilfsstufe, rm.nochVersuch, rm.fertig], [1, 3, false, true]);
  assert.equal(s2.ergebnisse.length, s2.protokoll.length, 'Pausenhinweis zählt jede Aufgabe einmal');
});

test('Protokoll: vorhergesagte Abrufwahrscheinlichkeit, Zeit im Beispiel, Versionen', () => {
  const p = testpaket();
  let zeit = +t0;
  const uhr = () => new Date(zeit);
  const s = new Sitzung(p, leeresModell('test'), { uhr, zufall: () => 0.5, appVersion: 'test-1' });
  let a, beispiel = null;
  while ((a = s.naechster())) {
    zeit += 30000;
    if (a.schritt.phase === 'beispiel') { const e = s.weiter(); beispiel = beispiel || e; } else s.antworte(richtigeNr(a.instanz));
  }
  assert.deepEqual([beispiel.phase, beispiel.typ, beispiel.dauerMs, beispiel.app, beispiel.einstellungen], ['beispiel', 'beispiel', 30000, 'test-1', EINSTELLUNGEN_VERSION]);
  assert.ok(s.protokoll.includes(beispiel), 'Beispiel steht im Protokoll');
  const antworten = s.protokoll.filter(x => x.phase !== 'beispiel');
  assert.ok(antworten.length && antworten.every(x => x.pVorher === null && x.app === 'test-1'), 'neue Lernziele: noch keine Vorhersage');
  assert.equal(s.abschliessen().einstellungen, EINSTELLUNGEN_VERSION);
  // Fällige Lernziele: Vorhersage zwischen 0 und 1
  const s2 = new Sitzung(p, s.modell, { uhr: () => new Date(+t0 + 20 * TAG), zufall: () => 0.5 });
  const f = s2.naechster();
  s2.antworte(richtigeNr(f.instanz));
  const pv = s2.protokoll[0].pVorher;
  assert.ok(f.schritt.phase === 'faellig' && pv > 0 && pv < 1, 'pVorher ' + pv);
  assert.match(EINSTELLUNGEN_VERSION, /^e[0-9a-z]+$/);
});

test('Kontrollfragen: fester Abstand, ändern weder Planer noch Niveau, im Protokoll markiert', () => {
  const p = testpaket();
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  m.lernziele.A1 = { ...m.lernziele.A1, kontrolle: { ab: t0.toISOString(), offen: [14, 28] } };
  assert.equal(kontrolleStichtag(m, 'A1', new Date(+t0 + 13 * TAG)), null, 'vor dem Stichtag');
  assert.equal(kontrolleStichtag(m, 'A1', new Date(+t0 + 30 * TAG)), 28, 'Stichtag 14 verpasst, 28 gilt');
  assert.equal(kontrolleStichtag(m, 'A1', new Date(+t0 + 36 * TAG)), null, 'nach dem Fenster verfallen');
  const tag15 = new Date(+t0 + 15 * TAG);
  const s = new Sitzung(p, m, { uhr: () => tag15, zufall: () => 0.5 });
  assert.equal(s.offen.filter(x => x.lernziel === 'A1').map(x => x.phase).join(), 'kontrolle', 'A1 nur als Kontrollfrage, nicht zusätzlich fällig');
  let a = s.naechster();
  while (a.schritt.phase !== 'kontrolle') { s.antworte(richtigeNr(a.instanz)); a = s.naechster(); }
  const vorher = s.modell;
  const r = s.antworte(falscheNr(a.instanz));
  assert.equal(r.nochmals, null, 'keine Wiederholung nach einer Kontrollfrage');
  const e = s.modell.lernziele.A1;
  assert.deepEqual([e.karte, e.richtig, e.falsch], [vorher.lernziele.A1.karte, vorher.lernziele.A1.richtig, vorher.lernziele.A1.falsch], 'Planer und Zähler unverändert');
  assert.deepEqual([s.modell.niveau, s.modell.verlauf], [vorher.niveau, vorher.verlauf], 'Niveau unverändert');
  assert.deepEqual(e.kontrolle.offen, [28]);
  const eintragK = s.protokoll.at(-1);
  assert.deepEqual([eintragK.phase, eintragK.kontrolle, eintragK.kontrolleIst, eintragK.richtig], ['kontrolle', 14, 15, false]);
  assert.ok(s.protokoll.filter(x => x.phase !== 'kontrolle').every(x => x.kontrolle === null));
});

test('Kontrollfragen: Auswahl beim ersten Abruf ohne Hilfe', () => {
  const lauf = z => {
    const s = new Sitzung(testpaket(), leeresModell('test'), { uhr: () => t0, zufall: () => z });
    let a;
    while ((a = s.naechster())) { if (a.schritt.phase === 'beispiel') s.weiter(); else s.antworte(richtigeNr(a.instanz)); }
    return Object.values(s.modell.lernziele).filter(e => e.kontrolle);
  };
  const gewaehlt = lauf(0);
  assert.equal(gewaehlt.length, E.blockMaxNeueLernziele);
  assert.deepEqual(gewaehlt[0].kontrolle, { ab: t0.toISOString(), offen: E.kontrolle.tage });
  assert.equal(lauf(0.99).length, 0, 'zufall über dem Anteil: keine Kontrollfrage');
});

test('Schalter: Klassenwertung standardmässig aus, Bonus und Serie an', () => {
  assert.deepEqual(E.schalter, { serie: true, klassenwertung: false, bonus: true });
  assert.ok(zieheBonus({ abrufe: 3 }, () => 0), 'Bonus an: kann gezogen werden');
});

/* ---------- Höhere Taxonomiestufen ---------- */
// Richtige Antwort für jede Instanz (auch die neuen Typen)
function richtigeAntwort(i) {
  const nr = liste => liste.findIndex(x => x.richtig);
  return {
    mc: () => richtigeNr(i), zahl: () => String(i.wert), luecke: () => i.luecken.map(l => l[0]), zuordnen: () => i.paare.map(x => x[1]),
    reihenfolge: () => i.elemente, erklaeren: () => 'passt',
    fehler: () => ({ zeile: i.fehlerZeile, art: i.fehlerArt }), daten: () => i.aussagen.map(x => x.richtig),
    vergleich: () => ({ wahl: i.besser, begruendung: nr(i.begruendungen) }),
    versuch: () => ({ frage: i.fragen ? nr(i.fragen) : undefined, rollen: i.groessen.map(g => [].concat(g.rolle)[0]) }),
    vorhersage: () => ({ vorhersage: nr(i.optionen), beobachtung: nr(i.optionen) })
  }[i.typ]();
}
const DEMO = (await import('../pakete/demo-formate.js')).default;
const demoAufgabe = id => instanz(DEMO.aufgaben.find(a => a.id === id));

test('Stufen: Demo-Paket mit allen neuen Typen ist gültig, Fehler im Format werden erkannt', () => {
  assert.deepEqual(pruefePaket(DEMO), []);
  const typen = new Set(DEMO.aufgaben.filter(hoheStufe).map(a => a.typ));
  assert.deepEqual([...typen].sort(), ['daten', 'fehler', 'vergleich', 'versuch', 'vorhersage']);
  const kaputt = aenderung => pruefePaket({ ...DEMO, aufgaben: DEMO.aufgaben.map(a => (a.id === aenderung.id ? { ...a, ...aenderung } : a)) });
  assert.match(kaputt({ id: 'demo.h1', stufe: 7 }).join(), /Stufe muss 1–6/);
  assert.match(kaputt({ id: 'demo.h1', stufe_begruendung: undefined }).join(), /stufe_begruendung/);
  assert.match(kaputt({ id: 'demo.h1', fehlerZeile: 9 }).join(), /fehlerZeile/);
  assert.match(kaputt({ id: 'demo.h2', aussagen: DEMO.aufgaben.find(a => a.id === 'demo.h2').aussagen.map(x => ({ ...x, richtig: true })) }).join(), /1 oder 2 Aussagen/);
  assert.match(kaputt({ id: 'demo.h4', groessen: [{ text: 'a', rolle: 'veraendern' }, { text: 'b', rolle: 'konstant' }, { text: 'c', rolle: 'egal' }] }).join(), /messen/);
  assert.match(kaputt({ id: 'demo.h5', simulation: undefined }).join(), /Simulation/);
  // Bestehende Aufgaben ohne Feld «stufe» bleiben Grundstufe
  assert.ok(DEMO.aufgaben.filter(a => a.stufe === undefined).every(a => !hoheStufe(a)));
});

test('Stufen: Auswertung mit Teilpunkten und Rückmeldung pro Fehler, ohne die Lösung zu verraten', () => {
  const verraten = (r, ...loesungsteile) => r.hinweise.some(h => loesungsteile.some(t => h.includes(t)));
  // Fehler finden
  const f = demoAufgabe('demo.h1');
  assert.equal(bewerte(f, { zeile: 2, art: 1 }).punkte, 1);
  const f1 = bewerte(f, { zeile: 2, art: 0 });
  assert.deepEqual([f1.punkte, f1.hinweise.length], [0.5, 1]);
  const f2 = bewerte(f, { zeile: 0, art: 1 });
  assert.deepEqual([f2.punkte, f2.hinweise.length], [0, 1], 'Fehlerart zählt nur bei richtiger Zeile');
  assert.ok(!verraten(f2, 'Zeile 3', f.zeilen[2], 'Rechenart'));
  assert.equal(bewerte(f, { zeile: 2 }).gueltig, false);
  // Datenanalyse
  const d = demoAufgabe('demo.h2');
  assert.equal(bewerte(d, [false, true, true, false]).richtig, true);
  const d1 = bewerte(d, [true, true, false, false]);
  assert.deepEqual([d1.punkte, d1.hinweise.length], [0.5, 2]);
  assert.ok(!verraten(d1, ...d.aussagen.map(x => x.text)));
  // Vergleichen und begründen
  const v = demoAufgabe('demo.h3');
  assert.equal(bewerte(v, { wahl: 0, begruendung: 0 }).punkte, 1);
  const v1 = bewerte(v, { wahl: 0, begruendung: 1 });
  assert.equal(v1.punkte, 0.5);
  assert.match(v1.erklaerung, /Mehr messen allein/, 'Erklärung zur gewählten Begründung kommt mit der Lösung');
  assert.equal(bewerte(v, { wahl: 1, begruendung: 0 }).punkte, 0, 'Begründung zählt nur bei richtiger Wahl');
  // Versuch planen: Struktur
  const p = demoAufgabe('demo.h4');
  const gut = ['veraendern', 'messen', 'konstant', 'konstant', 'egal'];
  assert.equal(bewerte(p, { frage: 0, rollen: gut }).richtig, true);
  assert.equal(bewerte(p, { frage: 0, rollen: ['veraendern', 'messen', 'konstant', 'konstant', 'konstant'] }).richtig, true, 'Unwichtiges konstant halten ist kein Fehler');
  const p1 = bewerte(p, { frage: 0, rollen: ['veraendern', 'messen', 'veraendern', 'konstant', 'egal'] });
  assert.ok(p1.punkte < 1 && p1.hinweise.some(h => /mehr als eine Grösse/.test(h)), 'zwei veränderte Grössen werden erkannt');
  const p2 = bewerte(p, { frage: 1, rollen: ['veraendern', 'messen', 'egal', 'konstant', 'egal'] });
  assert.equal(p2.hinweise.length, 2, 'falsche Frage und fehlende Kontrollgrösse');
  assert.ok(!verraten(p2, ...p.groessen.map(g => g.text)));
  assert.equal(bewerte(p, { frage: 0, rollen: ['veraendern', '', 'konstant', 'konstant', 'egal'] }).gueltig, false);
  // Vorhersage
  const h = demoAufgabe('demo.h5');
  assert.equal(bewerte(h, { vorhersage: 1, beobachtung: 1 }).punkte, 1);
  assert.equal(bewerte(h, { vorhersage: 0, beobachtung: 1 }).punkte, 0.5);
  assert.match(bewerte(h, { vorhersage: 0, beobachtung: 1 }).erklaerung, /unterscheiden sich/);
});

// Testpaket mit je einer Vertiefungsaufgabe (Stufe 4) pro Lernziel, bei A1 zusätzlich eine mit Simulation
function stufenPaket() {
  const p = testpaket();
  for (const l of p.lernziele) p.aufgaben.push({ ...p.aufgaben.find(a => a.lernziel === l.id), id: l.id + 'h', variantengruppe: l.id + 'h',
    stufe: 4, stufe_begruendung: 'Test', schwierigkeit: 3 });
  p.aufgaben.push({ ...p.aufgaben.find(a => a.id === 'A1h'), id: 'A1s', variantengruppe: 'A1s', simulation: 'sim' });
  p.simulationen = { sim() {} };
  return p;
}
// Modell, in dem alle Lernziele gelernt (Stabilität 30 Tage) und erst in 60 Tagen fällig sind
function gelerntesModell(p, stabilitaet = 30) {
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  for (const l of p.lernziele) m.lernziele[l.id].karte = { ...m.lernziele[l.id].karte, stability: stabilitaet, due: new Date(+t0 + 60 * TAG).toISOString() };
  return m;
}

test('Stufen: Grundphasen und Beispiel verwenden nie eine Aufgabe ab Stufe 4', () => {
  for (const z of [0, 0.3, 0.7, 0.99]) {
    const s = new Sitzung(stufenPaket(), leeresModell('test'), { uhr: () => t0, zufall: () => z });
    let a;
    while ((a = s.naechster())) {
      assert.ok(!hoheStufe(a.aufgabe), `${a.schritt.phase} brachte ${a.aufgabe.id}`);
      if (a.schritt.phase === 'beispiel') s.weiter(); else s.antworte(falscheNr(a.instanz));
    }
    assert.ok(!s.offen.some(x => x.phase === 'vertiefung'));
  }
});

test('Stufen: Vertiefung erst nach dem Lernen, ohne Einfluss auf FSRS, im Protokoll mit Stufe', () => {
  const p = stufenPaket();
  assert.equal(vertiefungFrei(gelerntesModell(p, 3), 'A1'), false, 'Stabilität unter der Schwelle');
  assert.equal(new Sitzung(p, gelerntesModell(p, 3), { uhr: () => t0 }).offen.filter(x => x.phase === 'vertiefung').length, 0);
  const m = gelerntesModell(p);
  const s = new Sitzung(p, m, { uhr: () => new Date(+t0 + TAG), zufall: () => 0.5 });
  const plan = s.offen.filter(x => x.phase === 'vertiefung');
  assert.equal(plan.length, E.hoehereStufen.maxProBlock);
  const a = s.naechster();
  assert.equal(a.schritt.phase, 'vertiefung');
  assert.ok(hoheStufe(a.aufgabe) && !a.aufgabe.simulation, 'im Block nur ohne Simulation');
  const vorher = s.modell.lernziele[a.schritt.lernziel];
  const r = s.antworte(falscheNr(a.instanz));
  const nachher = s.modell.lernziele[a.schritt.lernziel];
  assert.deepEqual([nachher.karte, nachher.richtig, nachher.falsch], [vorher.karte, vorher.richtig, vorher.falsch], 'FSRS und Zähler unverändert');
  assert.ok(nachher.vertieft);
  assert.deepEqual([r.nochmals, s.ergebnisse.length], [null, 0], 'kein «nochmals», zählt nicht für den Pausenhinweis');
  assert.deepEqual([s.protokoll[0].phase, s.protokoll[0].stufe, s.protokoll[0].typ], ['vertiefung', 4, 'mc']);
  // Beim nächsten Mal kommt ein anderes Lernziel zuerst (am längsten nicht vertieft)
  const s2 = new Sitzung(p, s.modell, { uhr: () => new Date(+t0 + 2 * TAG), zufall: () => 0.5 });
  assert.notEqual(s2.offen.find(x => x.phase === 'vertiefung').lernziel, a.schritt.lernziel);
  // Zusatzblock: mehr Vertiefung, auch mit Simulation
  const z = new Sitzung(p, m, { art: 'zusatz', uhr: () => new Date(+t0 + TAG), zufall: () => 0 });
  assert.equal(z.offen.filter(x => x.phase === 'vertiefung').length, E.hoehereStufen.zusatzMax);
});

test('Stufen: Vertiefungsaufgaben kommen der Reihe nach, nicht nur die zum Niveau passende', () => {
  const p = { ...DEMO, aufgaben: DEMO.aufgaben.filter(a => !hoheStufe(a) || a.lernziel !== 'demo.leistung' || !a.simulation) };
  let m = gelerntesModell(p);
  const gesehen = [];
  for (let k = 1; k <= 4; k++) {
    const s = new Sitzung(p, m, { uhr: () => new Date(+t0 + k * TAG), zufall: () => 0.5 });
    let a;
    while ((a = s.naechster())) {
      if (a.schritt.phase === 'vertiefung') gesehen.push(a.aufgabe.id);
      if (a.schritt.phase === 'beispiel') s.weiter(); else assert.ok(s.antworte(richtigeAntwort(a.instanz)).richtig, a.aufgabe.id);
    }
    m = s.modell;
  }
  assert.deepEqual([...gesehen].sort(), ['demo.h1', 'demo.h2', 'demo.h3', 'demo.h4'], gesehen.join());
});

test('Stufen: zweiter Versuch nach Rückmeldung pro Fehler', () => {
  const p = { ...DEMO, aufgaben: DEMO.aufgaben.filter(a => !hoheStufe(a) || a.id === 'demo.h1') };
  const m = gelerntesModell(p);
  const s = new Sitzung(p, m, { uhr: () => new Date(+t0 + TAG), zufall: () => 0.5 });
  const a = s.naechster();
  assert.equal(a.aufgabe.id, 'demo.h1');
  const r1 = s.antworte({ zeile: 0, art: 1 });
  assert.deepEqual([r1.nochVersuch, r1.hinweise.length], [true, 1]);
  const r2 = s.antworte({ zeile: 2, art: 1 });
  assert.deepEqual([r2.richtig, r2.fertig, s.protokoll[0].versuch, s.protokoll[0].richtig], [true, true, 2, false]);
});

test('Pilot Leistung: höchstens 9 Entwürfe auf Stufe 4–6 mit Begründung, lösbar, Lösung nicht im Aufgabentext', async () => {
  const roh = (await import('../pakete/leistung.js')).default;
  const erg = await ladeErgaenzung('leistung');
  const pilot = ergaenze(roh, erg).aufgaben.filter(hoheStufe);
  assert.ok(pilot.length >= 7 && pilot.length <= 9, pilot.length + ' Aufgaben');
  assert.ok(pilot.every(a => a.pruefstatus === 'entwurf'), 'ohne Freigabe alles Entwurf');
  assert.equal(new Set(pilot.map(a => a.lernziel)).size, 3, 'drei Lernziele');
  for (const lz of new Set(pilot.map(a => a.lernziel))) {
    const stufen = pilot.filter(a => a.lernziel === lz).map(a => a.stufe);
    assert.ok(stufen.includes(4) && stufen.includes(5), lz + ': Stufe 4 und 5');
  }
  assert.ok(pilot.some(a => a.typ === 'versuch' && a.stufe === 6), 'eine Versuchsplanung auf Stufe 6');
  const frei = ergaenze(roh, erg, { alleFreigeben: true });
  for (const a of frei.aufgaben.filter(hoheStufe)) {
    const i = instanz(a);
    assert.ok(a.stufe_begruendung && a.stufe_begruendung.length > 30, a.id + ': Begründung der Stufe');
    assert.equal(bewerte(i, richtigeAntwort(i)).punkte, 1, a.id + ': richtige Antwort gibt volle Punkte');
    const verraten = { fehler: () => [i.fehlerarten[i.fehlerArt]], vergleich: () => i.begruendungen.filter(b => b.richtig).map(b => b.text),
      daten: () => i.aussagen.map(x => x.text), versuch: () => [] }[i.typ]();
    assert.ok(!verraten.some(t => i.text.includes(t)), a.id + ': Lösung steht im Aufgabentext');
  }
  // Vertiefung ersetzt nie die Grundaufgaben: jedes Pilot-Lernziel hat weiterhin geprüfte Grundaufgaben
  for (const lz of new Set(pilot.map(a => a.lernziel))) assert.ok(frei.aufgaben.some(a => a.lernziel === lz && !hoheStufe(a) && a.pruefstatus === 'geprueft'));
});

function grossesPaket() {
  const p = testpaket();
  for (let n = 0; n < 30; n++) {
    p.lernziele.push({ id: 'Z' + n, kompetenz: 'ABC'[n % 3], titel: 'Z' + n });
    p.aufgaben.push({ ...p.aufgaben[0], id: 'Z' + n + 'a', lernziel: 'Z' + n, variantengruppe: 'Z' + n });
  }
  return p;
}

test('Sitzung: Obergrenze bei vielen fälligen Lernzielen', () => {
  const p = grossesPaket();
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  const s = new Sitzung(p, m, { uhr: () => new Date(+t0 + 60 * TAG) });
  let a, n = 0;
  while ((a = s.naechster())) { n++; s.antworte(richtigeNr(a.instanz)); }
  assert.equal(n, E.blockMaxAufgaben);
});

test('Pausenhinweis: nur bei deutlich mehr Fehlern als im eigenen Schnitt', () => {
  const gut = Array(8).fill(true);
  assert.equal(pauseNoetig([...gut, false, false, false, true, false]), true);
  assert.equal(pauseNoetig([...gut, true, true, true, true, false]), false);
  // durchgehend schwach: kein Anstieg gegenüber dem eigenen Schnitt → kein Hinweis
  assert.equal(pauseNoetig([false, true, false, false, true, false, false, true, false, false, true, false, false]), false);
  assert.equal(pauseNoetig([false, false, false, false, false]), false); // zu früh
});

test('Pausenhinweis in der Sitzung: Kind entscheidet, danach geringere Gewichtung', () => {
  const p = grossesPaket();
  let m = leeresModell('test');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  const s = new Sitzung(p, m, { uhr: () => new Date(+t0 + 60 * TAG), zufall: () => 0.5 });
  let a, hinweis = false, n = 0;
  while ((a = s.naechster())) {
    n++;
    const r = s.antworte(n <= 6 ? richtigeNr(a.instanz) : falscheNr(a.instanz));
    if (r.pauseHinweis) { hinweis = true; s.nachPausenhinweis(false); }
  }
  assert.ok(hinweis);
  assert.equal(s.nachPause, true);
  assert.ok(s.protokoll.some(x => x.nachPause));
  assert.ok(s.abschliessen().pauseHinweisNach >= E.pauseMinAufgaben);
});

test('Interleaving: verzahne', () => {
  assert.deepEqual(verzahne(['a1', 'a2', 'b1', 'c1', 'b2'], x => x[0]), ['a1', 'b1', 'c1', 'a2', 'b2']);
});

test('Serie mit Schonfrist: Wochenende zählt nicht, ein freier Tag pro Woche, Wiedereinstieg ohne Nullstellung', () => {
  const tag = d => new Date(2026, 10, d, 9);
  let s = leereSerie();
  for (const d of [23, 24, 25, 26, 27]) s = aktualisiereSerie(s, tag(d)); // Mo–Fr
  assert.equal(s.wert, 5);
  s = aktualisiereSerie(s, tag(30)); // nächster Montag, Wochenende dazwischen
  assert.equal(s.wert, 6);
  s = aktualisiereSerie(s, tag(30));
  assert.equal(s.wert, 6); // gleicher Tag zählt einmal
  s = aktualisiereSerie(s, new Date(2026, 11, 2, 9)); // Dienstag ausgelassen: Joker
  assert.equal(s.wert, 7);
  s = aktualisiereSerie(s, new Date(2026, 11, 4, 9)); // Donnerstag ausgelassen: zweiter Fehltag in der Woche
  assert.equal(s.wert, 4); // halbiert + 1, nicht null
  assert.equal(s.rekord, 7);
});

test('Alle Naturalia-Pakete erfüllen das Format', async () => {
  for (const k of KATALOG) {
    const p = (await import('../pakete/' + k.id + '.js')).default;
    assert.deepEqual(pruefePaket(p, { durchlaeufe: 10 }), [], k.id);
  }
});

test('Prüfstatus: nur geprüfte Aufgaben kommen in Umlauf', () => {
  const p = testpaket();
  p.aufgaben.forEach(a => { if (a.lernziel === 'A1') a.pruefstatus = 'entwurf'; });
  const s = new Sitzung(p, leeresModell('test'), { art: 'zusatz' });
  let a;
  while ((a = s.naechster())) {
    assert.notEqual(a.schritt.lernziel, 'A1');
    if (a.schritt.phase === 'beispiel') s.weiter(); else s.antworte(richtigeNr(a.instanz));
  }
});

// Alle Kapitel haben Ergänzungen. Ein neu importiertes Kapitel ohne Ergänzung lässt diesen Test scheitern, bis sie geschrieben ist.
const MIT_ERGAENZUNG = KATALOG.filter(k => existsSync(new URL(`../pakete/ergaenzungen/${k.id}.js`, import.meta.url)));

test('Ergänzungen: alle MC-Optionen erklärt, jedes Lernziel mit mind. 2 Varianten, Format gültig', async () => {
  assert.equal(MIT_ERGAENZUNG.length, KATALOG.length, 'Kapitel ohne Ergänzung: ' + KATALOG.filter(k => !MIT_ERGAENZUNG.includes(k)).map(k => k.id).join(', '));
  for (const k of MIT_ERGAENZUNG) {
    const roh = (await import('../pakete/' + k.id + '.js')).default;
    const p = ergaenze(roh, await ladeErgaenzung(k.id), { alleFreigeben: true });
    assert.deepEqual(pruefePaket(p, { durchlaeufe: 15 }), [], k.id);
    for (const a of p.aufgaben.filter(a => a.typ === 'mc')) {
      const i = instanz(a);
      assert.ok(i.optionen.filter(o => !o.richtig).every(o => o.erklaerung), `${a.id}: falsche Option ohne Erklärung`);
    }
    for (const l of p.lernziele) {
      const gruppen = new Set(p.aufgaben.filter(a => a.lernziel === l.id).map(a => a.variantengruppe));
      assert.ok(gruppen.size >= 2, `${l.id}: nur ${gruppen.size} Variantengruppe`);
    }
  }
});

test('Ergänzungen: ohne Freigabe Entwurf, nach Freigabe in Umlauf, zurückgezogen bleibt draussen', async () => {
  const roh = (await import('../pakete/leistung.js')).default;
  const erg = await ladeErgaenzung('leistung');
  const ohne = ergaenze(roh, erg);
  assert.ok(ohne.aufgaben.filter(a => a.pruefstatus === 'entwurf').length > 0);
  assert.equal(instanz(ohne.aufgaben.find(a => a.id === 'leistung.s1-richtung')).optionen.find(o => !o.richtig).erklaerung, undefined);
  const mit = ergaenze(roh, erg, { freigaben: { 'leistung.s3-mensch-v2': 'geprueft', 'leistung.s1-richtung#erklaerungen': 'geprueft', 'leistung.s3-mensch-v3': 'zurueckgezogen' } });
  assert.equal(mit.aufgaben.find(a => a.id === 'leistung.s3-mensch-v2').pruefstatus, 'geprueft');
  assert.equal(mit.aufgaben.find(a => a.id === 'leistung.s3-mensch-v3').pruefstatus, 'zurueckgezogen');
  assert.ok(instanz(mit.aufgaben.find(a => a.id === 'leistung.s1-richtung')).optionen.filter(o => !o.richtig).every(o => o.erklaerung));
});

test('Simulationen: nur im Zusatzblock, nie im Wiederholungsblock', async () => {
  const roh = (await import('../pakete/leistung.js')).default;
  const p = ergaenze(roh, await ladeErgaenzung('leistung'), { alleFreigeben: true });
  assert.equal(Object.keys(p.simulationen).length, 9);
  // Block: keine Aufgabe mit Simulation
  let m = leeresModell('leistung');
  for (const l of p.lernziele) m = verbuche(m, l.id, { punkte: 1 }, t0);
  const block = new Sitzung(p, m, { uhr: () => new Date(+t0 + 60 * TAG) });
  let a;
  while ((a = block.naechster())) { assert.ok(!a.aufgabe.simulation, 'Simulation im Block'); block.antworte(a.instanz.typ === 'mc' ? richtigeNr(a.instanz) : String(a.instanz.wert)); }
  // Zusatz: Simulationsschritte vorhanden und mit passender Aufgabe
  const zusatz = new Sitzung(p, m, { art: 'zusatz', uhr: () => new Date(+t0 + 60 * TAG) });
  const sims = [];
  while ((a = zusatz.naechster())) {
    if (a.schritt.phase === 'simulation') { sims.push(a); assert.ok(a.aufgabe.simulation); assert.ok((a.lernziel.simulationen || []).some(s => s.id === a.aufgabe.simulation)); }
    if (a.schritt.phase === 'beispiel') zusatz.weiter(); else zusatz.antworte(a.instanz.typ === 'mc' ? richtigeNr(a.instanz) : String(a.instanz.wert));
  }
  assert.equal(sims.length, E.zusatzMaxSimulationen);
  // Simulationsantworten verändern den Wiederholungsplan nicht
  const vorher = JSON.stringify(m.lernziele[sims[0].schritt.lernziel].karte);
  assert.equal(JSON.stringify(zusatz.modell.lernziele[sims[0].schritt.lernziel].karte), vorher);
});

test('Naturalia: alle «Kurz testen»-Fragen übernommen', async () => {
  for (const k of KATALOG) {
    const p = (await import('../pakete/' + k.id + '.js')).default;
    const kt = p.aufgaben.filter(a => a.thema === 'Kurz testen');
    assert.equal(kt.length, p.kompetenzen.length, k.id);
    assert.ok(Object.keys(p.simulationen).length > 0, k.id + ': keine Simulationen');
    kt.forEach(a => assert.ok(p.lernziele.some(l => l.id === a.lernziel), a.id));
  }
});

test('Simulationen: zu jeder Simulation gibt es eine Frage', async () => {
  for (const k of KATALOG) {
    const roh = (await import('../pakete/' + k.id + '.js')).default;
    const p = ergaenze(roh, await ladeErgaenzung(k.id), { alleFreigeben: true });
    const zugeordnet = new Set(p.lernziele.flatMap(l => (l.simulationen || []).map(s => s.id)));
    const mitFrage = new Set(p.aufgaben.filter(a => a.simulation).map(a => a.simulation));
    const fehlen = [...zugeordnet].filter(id => !mitFrage.has(id));
    assert.deepEqual(fehlen, [], k.id + ': Simulationen ohne Frage');
  }
});

test('Vorlesen: jede Lernkarte hat eine Aufnahme', async () => {
  const fehlen = [];
  for (const k of KATALOG) {
    const p = (await import('../pakete/' + k.id + '.js')).default;
    for (const l of p.lernziele) for (const c of [l.lernkarte, ...(l.zusatzkarten || [])]) {
      if (c && !(c.audio && existsSync(new URL('../audio/' + c.audio, import.meta.url)))) fehlen.push(k.id + ': ' + c.titel);
    }
  }
  assert.deepEqual(fehlen, []);
});
