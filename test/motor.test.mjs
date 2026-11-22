// Tests für den Lern-Motor. Aufruf: node --test test/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EINSTELLUNGEN as E } from '../motor/einstellungen.js';
import { bewerte, leseZahl } from '../motor/bewerten.js';
import { instanz, pruefePaket } from '../motor/format.js';
import { leeresModell, verbuche, status, istFaellig, passeNiveauAn, bewertungFuer, Rating } from '../motor/schuelermodell.js';
import { Sitzung, pauseNoetig, verzahne, zaehleFaellige } from '../motor/sitzung.js';
import { aktualisiereSerie, leereSerie } from '../motor/belohnung.js';
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

test('Ergänzungen: alle MC-Optionen erklärt, jedes Lernziel mit mind. 2 Varianten, Format gültig', async () => {
  for (const k of KATALOG) {
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
