// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs aus fantasy-lernapp/src/chapters/leistung.js
// Nicht von Hand ändern. Simulationen (SIMS) werden im Browser mit simulationen[id](element) gestartet.
import { ausNaturalia } from './naturalia-adapter.js';

/* ---------- Hilfsfunktionen ---------- */
const G = 10; // Ortsfaktor in N/kg (Annahme: Sek-Standard)
let RNG = Math.random; // wird für die Challenge kurz durch einen Seed-Generator ersetzt
const rnd = a => a[Math.floor(RNG() * a.length)];
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = (() => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return (h ^= h >>> 16) >>> 0; })();
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const NICK_A = ['Runen', 'Sternen', 'Nebel', 'Donner', 'Silber', 'Glut', 'Mond', 'Frost', 'Schatten', 'Kristall'];
const NICK_B = ['Greif', 'Drache', 'Phönix', 'Einhorn', 'Wolf', 'Rabe', 'Eule', 'Golem'];
const newNick = () => NICK_A[Math.floor(Math.random() * NICK_A.length)] + '-' + NICK_B[Math.floor(Math.random() * NICK_B.length)];
const shuffle = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(RNG() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
function fmt(n, d) {
  d = d === undefined ? 3 : d;
  const f = Math.pow(10, d);
  n = Math.round(n * f) / f;
  const neg = n < 0;
  let [i, fr] = Math.abs(n).toString().split('.');
  if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F');
  return (neg ? '\u2212' : '') + i + (fr ? ',' + fr : '');
}
const num = (q, unit, ans, hint, explain, o) =>
  Object.assign({ type: 'num', q, unit, ans, hint, explain, tolRel: 0.01, tolAbs: 0 }, o || {});
// MC: options[0] ist die richtige Antwort, gemischt wird beim Anzeigen
const mc = (q, options, explain) => ({ type: 'mc', q, options, explain });

const $id = id => document.getElementById(id);
const nextFrame = f => requestAnimationFrame(() => requestAnimationFrame(f));
const nf = (host, f) => nextFrame(() => { if (host.isConnected) f(); });
const reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const sl = (id, label, min, max, step, val, unit) =>
  `<label class="sl"><span class="sll">${label}: <b class="mono" id="${id}v"></b> ${unit}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
const brow = (name, id, vid) =>
  `<div class="brow"><span class="bname">${name}</span><div class="btrack"><div class="bfill" id="${id}"></div></div><b class="mono bval" id="${vid}"></b></div>`;
// Zahl weich hochzählen lassen
function tween(from, to, ms, cb) {
  if (reduced() || from === to) { cb(to); return; }
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / ms);
    cb(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}


/* ---------- Inhalt: 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 's1', nr: 1, title: 'Arbeit und Lageenergie', sub: 'W = F \u00B7 s',
    items: [
      { id: 's1-gewicht', topic: 'Gewichtskraft berechnen', make() {
        const m = rnd([2, 5, 8, 10, 20, 40, 60]); const F = m * G;
        return num(`Ein Rucksack hat eine Masse von ${fmt(m)} kg. Wie gross ist seine Gewichtskraft? Rechne mit g = 10 N/kg.`, 'N', F,
          'Gewichtskraft = Masse \u00B7 Ortsfaktor, also F = m \u00B7 g.',
          `F = m \u00B7 g = ${fmt(m)} kg \u00B7 10 N/kg = ${fmt(F)} N`);
      } },
      { id: 's1-hub', topic: 'Hubarbeit berechnen', make() {
        const m = rnd([2, 3, 4, 5, 8, 10]); const h = rnd([0.5, 1, 1.5, 2, 2.5, 3]); const W = m * G * h;
        return num(`Du hebst eine Kiste mit ${fmt(m)} kg um ${fmt(h)} m hoch. Wie gross ist die Hubarbeit?`, 'J', W,
          'Zuerst die Gewichtskraft berechnen (F = m \u00B7 g), dann Arbeit = Kraft \u00B7 Weg.',
          `F = ${fmt(m)} kg \u00B7 10 N/kg = ${fmt(m * G)} N<br>W = F \u00B7 s = ${fmt(m * G)} N \u00B7 ${fmt(h)} m = ${fmt(W)} J`);
      } },
      { id: 's1-richtung', topic: 'Wann wird Arbeit verrichtet?', make() {
        return mc('Du trägst einen schweren Koffer waagrecht durch den Gang. Verrichtest du dabei Hubarbeit?', [
          'Nein: Die Kraft zeigt nach oben, der Weg aber waagrecht.',
          'Ja: Der Koffer ist schwer, also verrichtest du immer Arbeit.',
          'Ja, aber nur, wenn du dabei schwitzt.',
          'Nein: Beim Tragen wird nie Arbeit verrichtet.'],
          'Arbeit gibt es nur, wenn Kraft und Weg in dieselbe Richtung zeigen. Beim waagrechten Tragen zeigt die Haltekraft nach oben, der Weg geht aber zur Seite. Der Koffer gewinnt keine Höhe, also keine Hubarbeit.');
      } },
      { id: 's1-arbeit', topic: 'Arbeit = Kraft \u00B7 Weg', make() {
        const F = rnd([50, 100, 200, 250, 400]); const s = rnd([2, 4, 5, 10, 15]); const W = F * s;
        return num(`Du schiebst einen Wagen mit einer gleichbleibenden Kraft von ${fmt(F)} N über ${fmt(s)} m. Welche Arbeit verrichtest du?`, 'J', W,
          'Arbeit = Kraft \u00B7 Weg.',
          `W = F \u00B7 s = ${fmt(F)} N \u00B7 ${fmt(s)} m = ${fmt(W)} J`);
      } },
      { id: 's1-goldene', topic: 'Goldene Regel der Mechanik', make() {
        return mc('Auf einer schiefen Ebene brauchst du nur die halbe Kraft, um eine Last hochzuschieben. Was gilt für den Weg?', [
          'Der Weg wird doppelt so lang, die Arbeit bleibt gleich.',
          'Der Weg bleibt gleich, die Arbeit wird halbiert.',
          'Der Weg wird halb so lang, die Arbeit bleibt gleich.',
          'Der Weg wird doppelt so lang, die Arbeit wird doppelt so gross.'],
          'Goldene Regel der Mechanik: Was du an Kraft sparst, musst du an Weg zugeben. Die Arbeit W = F \u00B7 s bleibt gleich (ohne Reibung).');
      } },
      { id: 's1-schiefe', topic: 'Kraft auf der schiefen Ebene', ext: true, make() {
        const m = rnd([20, 40, 60]); const h = rnd([1, 2, 3]); const k = rnd([2, 4, 5]); const s = h * k; const F = m * G / k;
        return num(`Eine Last mit ${fmt(m)} kg soll ${fmt(h)} m hoch gehoben werden. Du schiebst sie stattdessen eine reibungsfreie schiefe Ebene mit ${fmt(s)} m Länge hinauf. Welche Kraft brauchst du?`, 'N', F,
          'Die Arbeit ist gleich wie beim direkten Heben: W = m \u00B7 g \u00B7 h = F \u00B7 s. Löse nach F auf.',
          `W = m \u00B7 g \u00B7 h = ${fmt(m)} kg \u00B7 10 N/kg \u00B7 ${fmt(h)} m = ${fmt(m * G * h)} J<br>F = W : s = ${fmt(m * G * h)} J : ${fmt(s)} m = ${fmt(F)} N`);
      } }
    ]
  },
  {
    id: 's2', nr: 2, title: 'Leistung: Arbeit pro Zeit', sub: 'P = W : t',
    items: [
      { id: 's2-def', topic: 'Was ist Leistung?', make() {
        return mc('Was beschreibt die Leistung in der Physik?', [
          'Wie viel Energie pro Zeit umgewandelt wird.',
          'Wie viel Energie insgesamt umgewandelt wird.',
          'Wie gross die Kraft ist, die auf einen Körper wirkt.',
          'Welchen Weg ein Körper pro Zeit zurücklegt.'],
          'Leistung ist „Energie pro Zeit“ (oder Arbeit pro Zeit): P = W : t. Sie sagt, wie schnell Energie umgewandelt wird, nicht wie viel insgesamt.');
      } },
      { id: 's2-p', topic: 'Leistung berechnen', make() {
        const P = rnd([50, 100, 150, 200, 300, 500]); const t = rnd([2, 3, 4, 5, 6, 8, 10]); const W = P * t;
        return num(`Ein Motor verrichtet in ${fmt(t)} s eine Arbeit von ${fmt(W)} J. Welche Leistung hat er?`, 'W', P,
          'Leistung = Arbeit : Zeit.',
          `P = W : t = ${fmt(W)} J : ${fmt(t)} s = ${fmt(P)} W`);
      } },
      { id: 's2-treppe', topic: 'Leistung beim Treppensteigen', make() {
        let h, t, P;
        do { h = rnd([3, 4, 5, 6]); t = rnd([6, 8, 9, 10, 12, 15, 18, 20, 24, 30]); P = 600 * h / t; } while (!Number.isInteger(P) || P > 400 || P < 80);
        return num(`Eine Person mit 60 kg steigt in ${fmt(t)} s eine Treppe mit ${fmt(h)} m Höhenunterschied hoch. Welche Leistung bringt sie auf? Rechne mit g = 10 N/kg.`, 'W', P,
          'Zwei Schritte: erst die Hubarbeit W = m \u00B7 g \u00B7 h, dann P = W : t.',
          `W = 60 kg \u00B7 10 N/kg \u00B7 ${fmt(h)} m = ${fmt(600 * h)} J<br>P = W : t = ${fmt(600 * h)} J : ${fmt(t)} s = ${fmt(P)} W`);
      } },
      { id: 's2-zeit', topic: 'Zeit aus Leistung und Arbeit', make() {
        const P = rnd([100, 200, 500, 1000, 2000]); const t = rnd([3, 4, 5, 6, 8, 10, 12]); const W = P * t;
        return num(`Ein Motor mit ${fmt(P)} W soll eine Arbeit von ${fmt(W)} J verrichten. Wie lange braucht er dafür?`, 's', t,
          'Stelle P = W : t nach t um: t = W : P.',
          `t = W : P = ${fmt(W)} J : ${fmt(P)} W = ${fmt(t)} s`);
      } },
      { id: 's2-vergleich', topic: 'Arbeit und Leistung unterscheiden', make() {
        return mc('Anna und Ben haben die gleiche Masse und steigen dieselbe Treppe hoch. Anna braucht 10 s, Ben 20 s. Welche Aussage stimmt?', [
          'Beide verrichten gleich viel Arbeit, Anna hat die doppelte Leistung.',
          'Anna verrichtet doppelt so viel Arbeit und hat die doppelte Leistung.',
          'Beide haben die gleiche Leistung, weil sie dieselbe Treppe steigen.',
          'Ben hat die grössere Leistung, weil er länger arbeitet.'],
          'Gleiche Masse und gleiche Höhe bedeuten gleiche Hubarbeit. Anna schafft sie in der halben Zeit, also hat sie die doppelte Leistung (P = W : t).');
      } },
      { id: 's2-arbeit', topic: 'Arbeit aus Leistung und Zeit', make() {
        const P = rnd([500, 1000, 2000, 2500]); const t = rnd([5, 10, 15, 20, 30]); const W = P * t;
        return num(`Ein Kran leistet ${fmt(P)} W und arbeitet ${fmt(t)} s lang. Welche Arbeit verrichtet er?`, 'J', W,
          'Stelle P = W : t nach W um: W = P \u00B7 t.',
          `W = P \u00B7 t = ${fmt(P)} W \u00B7 ${fmt(t)} s = ${fmt(W)} J`);
      } }
    ]
  },
  {
    id: 's3', nr: 3, title: 'Einheiten: W, kW und PS', sub: '1 W = 1 J/s',
    items: [
      { id: 's3-kw-w', topic: 'kW in W umrechnen', make() {
        const k = rnd([0.5, 1.5, 2, 2.5, 3, 7.5]); const W = k * 1000;
        return num(`Ein Heizlüfter hat eine Leistung von ${fmt(k)} kW. Wie viel Watt sind das?`, 'W', W,
          '1 kW = 1000 W.',
          `${fmt(k)} kW \u00B7 1000 = ${fmt(W)} W`);
      } },
      { id: 's3-w-kw', topic: 'W in kW umrechnen', make() {
        const W = rnd([500, 1500, 2200, 4500, 8000]); const k = W / 1000;
        return num(`Ein Backofen hat eine Leistung von ${fmt(W)} W. Wie viel Kilowatt sind das?`, 'kW', k,
          '1 kW = 1000 W, also teilst du durch 1000.',
          `${fmt(W)} W : 1000 = ${fmt(k)} kW`);
      } },
      { id: 's3-einheit', topic: 'Einheit Watt', make() {
        return mc('Welche Aussage über die Einheit Watt stimmt?', [
          '1 W = 1 J pro Sekunde',
          '1 W = 1 J mal Sekunde',
          '1 W = 1 N pro Meter',
          '1 W = 1 kg pro Sekunde'],
          'Leistung ist Energie pro Zeit: 1 Watt bedeutet, dass pro Sekunde 1 Joule umgewandelt wird (1 W = 1 J/s).');
      } },
      { id: 's3-ps', topic: 'PS in W umrechnen', make() {
        const PS = rnd([1, 2, 4, 5, 10]); const W = PS * 735;
        return num(`Ein Mofa hat eine Leistung von ${fmt(PS)} PS. Rechne in Watt um. Es gilt 1 PS \u2248 735 W.`, 'W', W,
          'Multipliziere die PS-Zahl mit 735.',
          `${fmt(PS)} PS \u00B7 735 W = ${fmt(W)} W`, { tolRel: 0.015 });
      } },
      { id: 's3-mensch', topic: 'Leistungen einordnen', make() {
        return mc('Welche Leistung bringt ein Mensch beim zügigen Treppensteigen kurzzeitig ungefähr auf?', [
          'etwa 200 W',
          'etwa 2 W',
          'etwa 20\u202F000 W',
          'etwa 2\u202F000\u202F000 W'],
          'Ein Mensch leistet kurzzeitig einige Hundert Watt (bei 60 kg, 3 m in 10 s sind es rund 180 W). 2 W wäre viel zu wenig (das schafft schon eine kleine Lampe), 20 000 W wäre rund hundertmal so viel.');
      } },
      { id: 's3-kw-ps', topic: 'kW in PS umrechnen', ext: true, make() {
        const kW = rnd([30, 50, 75, 100, 150]); const PS = kW * 1000 / 735;
        return num(`Ein Auto hat eine Motorleistung von ${fmt(kW)} kW. Wie viele PS sind das ungefähr? Es gilt 1 PS \u2248 735 W.`, 'PS', PS,
          'Zuerst in Watt umrechnen (\u00B7 1000), dann durch 735 teilen.',
          `${fmt(kW)} kW = ${fmt(kW * 1000)} W<br>${fmt(kW * 1000)} W : 735 W/PS \u2248 ${fmt(PS, 1)} PS`, { tolRel: 0.02 });
      } }
    ]
  },
  {
    id: 's4', nr: 4, title: 'Elektrische Leistung', sub: 'P = U \u00B7 I',
    items: [
      { id: 's4-pui', topic: 'P = U \u00B7 I anwenden', make() {
        const s = rnd([
          ['Ein Lämpchen', 6, 0.5], ['Ein Motor', 12, 2], ['Ein Föhn', 230, 8],
          ['Ein Staubsauger', 230, 5], ['Ein Mixer', 230, 2], ['Eine Taschenlampe', 6, 0.3]
        ]);
        const P = s[1] * s[2];
        return num(`${s[0]} wird an ${fmt(s[1])} V betrieben. Es fliesst ein Strom von ${fmt(s[2])} A. Wie gross ist die elektrische Leistung?`, 'W', P,
          'Elektrische Leistung = Spannung \u00B7 Stromstärke.',
          `P = U \u00B7 I = ${fmt(s[1])} V \u00B7 ${fmt(s[2])} A = ${fmt(P)} W`);
      } },
      { id: 's4-strom', topic: 'Stromstärke aus Typenschild', make() {
        const I = rnd([1, 2, 4, 5, 8, 10]); const P = 230 * I;
        return num(`Auf dem Typenschild eines Geräts steht: 230 V, ${fmt(P)} W. Welche Stromstärke fliesst beim Betrieb?`, 'A', I,
          'Stelle P = U \u00B7 I nach I um: I = P : U.',
          `I = P : U = ${fmt(P)} W : 230 V = ${fmt(I)} A`);
      } },
      { id: 's4-typenschild', topic: 'Typenschild lesen', make() {
        return mc('Auf einem Wasserkocher steht „230 V, 2000 W“. Was bedeuten die 2000 W?', [
          'Der Wasserkocher wandelt pro Sekunde 2000 J elektrische Energie um.',
          'Der Wasserkocher kann insgesamt 2000 J Energie speichern.',
          'Der Wasserkocher braucht 2000 s, bis das Wasser kocht.',
          'Am Wasserkocher liegt eine Spannung von 2000 V an.'],
          '2000 W = 2000 J/s: Das ist die Leistung, also die Energie, die pro Sekunde umgewandelt wird. Die Spannung steht in V (hier 230 V).');
      } },
      { id: 's4-verdoppeln', topic: 'Spannung, Strom und Leistung', make() {
        return mc('Die Spannung bleibt gleich, die Stromstärke wird verdoppelt. Was passiert mit der elektrischen Leistung?', [
          'Sie wird doppelt so gross.',
          'Sie bleibt gleich.',
          'Sie wird halbiert.',
          'Sie wird viermal so gross.'],
          'P = U \u00B7 I: Wenn U gleich bleibt und I doppelt so gross wird, wird auch P doppelt so gross.');
      } },
      { id: 's4-spannung', topic: 'Spannung berechnen', ext: true, make() {
        const U = rnd([6, 12, 24]); const I = rnd([0.5, 1, 2, 3]); const P = U * I;
        return num(`Ein Gerät nimmt ${fmt(P)} W auf. Die Stromstärke beträgt ${fmt(I)} A. Welche Spannung liegt an?`, 'V', U,
          'Stelle P = U \u00B7 I nach U um: U = P : I.',
          `U = P : I = ${fmt(P)} W : ${fmt(I)} A = ${fmt(U)} V`);
      } },
      { id: 's4-sicherheit', topic: 'Sicherheit beim Experimentieren', make() {
        return mc('Warum arbeiten wir bei Schülerversuchen mit Netzgeräten bis höchstens 12 V und nicht direkt mit der Steckdose?', [
          'Steckdosenspannung (230 V) kann lebensgefährlich sein, Kleinspannung nicht.',
          'Weil die Lämpchen bei 230 V sofort durchbrennen würden.',
          'Weil man bei 230 V nichts messen kann.',
          'Weil die Steckdose im Schulzimmer sowieso nicht funktioniert.'],
          'Ströme aus der Steckdose (230 V) können tödlich sein. Im Unterricht verwenden wir deshalb Kleinspannung. 230-V-Geräte schliesst du nur über ein Energiekostenmessgerät und unter Aufsicht an.');
      } }
    ]
  },
  {
    id: 's5', nr: 5, title: 'Energie und Kosten', sub: 'E = P \u00B7 t',
    items: [
      { id: 's5-kwh', topic: 'Energie in kWh berechnen', make() {
        const P = rnd([100, 500, 1000, 1500, 2000, 3000]); const t = rnd([0.5, 1, 2, 4, 10]); const E = P / 1000 * t;
        return num(`Ein Gerät mit ${fmt(P)} W läuft ${fmt(t)} h. Wie viel elektrische Energie wandelt es um?`, 'kWh', E,
          'Rechne die Leistung zuerst in kW um, dann E = P \u00B7 t.',
          `P = ${fmt(P)} W = ${fmt(P / 1000)} kW<br>E = P \u00B7 t = ${fmt(P / 1000)} kW \u00B7 ${fmt(t)} h = ${fmt(E)} kWh`);
      } },
      { id: 's5-kosten', topic: 'Stromkosten berechnen', make() {
        const P = rnd([100, 200, 400, 500, 1000, 2000]); const t = rnd([1, 2, 3, 5, 10]); const pr = rnd([20, 25, 30]);
        const E = P / 1000 * t; const K = E * pr;
        return num(`Ein Gerät mit ${fmt(P)} W läuft ${fmt(t)} h. 1 kWh kostet ${fmt(pr)} Rappen. Wie viel kostet der Betrieb?`, 'Rappen', K,
          'Erst die Energie in kWh berechnen (E = P \u00B7 t), dann mit dem Preis pro kWh multiplizieren.',
          `E = ${fmt(P / 1000)} kW \u00B7 ${fmt(t)} h = ${fmt(E)} kWh<br>Kosten = ${fmt(E)} kWh \u00B7 ${fmt(pr)} Rp./kWh = ${fmt(K)} Rappen`,
          { tolAbs: 0.5 });
      } },
      { id: 's5-einheit', topic: 'Einheit kWh', make() {
        return mc('Die Einheit kWh (Kilowattstunde) ist eine Einheit für …', [
          'Energie',
          'Leistung',
          'Spannung',
          'Zeit'],
          'kW ist die Leistung, h die Zeit. Leistung \u00B7 Zeit ergibt Energie: Die kWh ist eine Energieeinheit (1 kWh = 3,6 MJ).');
      } },
      { id: 's5-standby', topic: 'Standby-Kosten', ext: true, make() {
        const P = rnd([2, 5, 10, 20]); const K = P * 8.76 * 0.25;
        return num(`Ein Gerät verbraucht im Standby dauernd ${fmt(P)} W (365 Tage, 24 h pro Tag). 1 kWh kostet 25 Rappen. Wie viele Franken kostet das pro Jahr?`, 'Franken', K,
          'Ein Jahr hat 365 \u00B7 24 = 8760 h. Erst die Energie in kWh, dann die Kosten.',
          `E = ${fmt(P / 1000)} kW \u00B7 8760 h = ${fmt(P * 8.76)} kWh<br>Kosten = ${fmt(P * 8.76)} kWh \u00B7 0,25 Fr./kWh \u2248 ${fmt(K, 2)} Fr.`,
          { tolRel: 0.03 });
      } },
      { id: 's5-fall', topic: 'Leistung und Energie unterscheiden', make() {
        return mc('Ein Föhn (1800 W) läuft 5 Minuten. Ein Laptop (60 W) läuft 3 Stunden. Welches Gerät braucht mehr Energie?', [
          'Der Laptop (rund 0,18 kWh gegenüber 0,15 kWh beim Föhn).',
          'Der Föhn, weil er die grössere Leistung hat.',
          'Beide brauchen gleich viel Energie.',
          'Das lässt sich ohne die Strompreise nicht sagen.'],
          'Föhn: 1,8 kW \u00B7 (5 : 60) h = 0,15 kWh. Laptop: 0,06 kW \u00B7 3 h = 0,18 kWh. Grosse Leistung heisst nicht automatisch viel Energie: Es kommt auf die Zeit an.');
      } },
      { id: 's5-zeit', topic: 'Laufzeit aus Energie und Leistung', make() {
        const s = rnd([[2000, 1, 30], [1000, 1, 60], [500, 0.5, 60], [4000, 1, 15], [2000, 0.5, 15], [500, 1, 120], [1000, 0.5, 30]]);
        return num(`Ein Heizlüfter hat ${fmt(s[0])} W. Wie viele Minuten darf er laufen, bis er ${fmt(s[1])} kWh Energie verbraucht hat?`, 'min', s[2],
          'Stelle E = P \u00B7 t nach t um (P in kW), das Ergebnis ist in Stunden. Dann mal 60.',
          `t = E : P = ${fmt(s[1])} kWh : ${fmt(s[0] / 1000)} kW = ${fmt(s[1] / (s[0] / 1000))} h = ${fmt(s[2])} min`);
      } }
    ]
  },
  {
    id: 's6', nr: 6, title: 'Wirkungsgrad', sub: '\u03B7 = E_nutz : E_zu',
    items: [
      { id: 's6-def', topic: 'Wirkungsgrad definieren', make() {
        return mc('Wie berechnest du den Wirkungsgrad \u03B7 eines Geräts?', [
          '\u03B7 = Nutzenergie : zugeführte Energie',
          '\u03B7 = zugeführte Energie : Nutzenergie',
          '\u03B7 = Nutzenergie \u00B7 Zeit',
          '\u03B7 = Leistung : Zeit'],
          'Der Wirkungsgrad sagt, welcher Anteil der zugeführten Energie nutzbar ist: \u03B7 = E_nutz : E_zu. Meist gibst du ihn in Prozent an.');
      } },
      { id: 's6-eta', topic: 'Wirkungsgrad berechnen', make() {
        const zu = rnd([100, 200, 500, 1000]); const eta = rnd([5, 10, 25, 40, 60, 80, 90]); const nu = zu * eta / 100;
        return num(`Einem Gerät werden ${fmt(zu)} J elektrische Energie zugeführt. Es gibt ${fmt(nu)} J als Nutzenergie ab. Wie gross ist der Wirkungsgrad?`, '%', eta,
          '\u03B7 = Nutzenergie : zugeführte Energie, dann mal 100 für Prozent.',
          `\u03B7 = ${fmt(nu)} J : ${fmt(zu)} J = ${fmt(eta / 100)} = ${fmt(eta)} %`);
      } },
      { id: 's6-nutz', topic: 'Nutzenergie berechnen', make() {
        const eta = rnd([20, 50, 60, 80, 90]); const zu = rnd([200, 500, 1000, 2500]); const nu = zu * eta / 100;
        return num(`Ein Elektromotor hat einen Wirkungsgrad von ${fmt(eta)} %. Ihm werden ${fmt(zu)} J elektrische Energie zugeführt. Wie viel Nutzenergie gibt er ab?`, 'J', nu,
          'Nutzenergie = Wirkungsgrad \u00B7 zugeführte Energie (Prozent als Anteil rechnen).',
          `E_nutz = \u03B7 \u00B7 E_zu = ${fmt(eta / 100)} \u00B7 ${fmt(zu)} J = ${fmt(nu)} J`);
      } },
      { id: 's6-ueber100', topic: 'Grenzen des Wirkungsgrads', make() {
        return mc('Ein Erfinder behauptet, sein Gerät habe einen Wirkungsgrad von 120 %. Was sagst du dazu?', [
          'Unmöglich: Das Gerät würde mehr Energie abgeben, als es bekommt. Das widerspricht der Energieerhaltung.',
          'Möglich, wenn das Gerät sehr gut gebaut ist.',
          'Möglich, aber nur bei Elektrogeräten.',
          'Möglich, wenn man die Reibung ganz weglässt.'],
          'Energie kann nicht entstehen. Ein Wirkungsgrad über 100 % würde mehr Nutzenergie bedeuten, als zugeführt wurde. Auch ohne Reibung ist 100 % die Obergrenze. Wärmepumpen wirken nur so, als ob sie mehr schaffen, weil sie zusätzlich Wärme aus der Umgebung nutzen. Rechnest du die mit, bleibt es bei höchstens 100 %.');
      } },
      { id: 's6-verlust', topic: 'Energieentwertung', make() {
        return mc('Eine Glühlampe wandelt nur wenige Prozent der elektrischen Energie in Licht um. Was passiert mit dem Rest?', [
          'Er wird zu Wärme (thermischer Energie) und ist nicht mehr nutzbar.',
          'Er geht verloren und verschwindet.',
          'Er wird in der Lampe als Lichtenergie gespeichert.',
          'Er wird zu zusätzlicher Spannung.'],
          'Energie geht nie verloren (Energieerhaltung). Der nicht genutzte Teil wird bei der Glühlampe zu Wärme und verteilt sich in der Umgebung. Das nennt man Energieentwertung.');
      } },
      { id: 's6-kocher', topic: 'Wirkungsgrad Wasserkocher', ext: true, make() {
        const t = rnd([30, 60, 90]); const eta = rnd([75, 80, 85, 90]); const zu = 2 * t; const nu = zu * eta / 100;
        return num(`Ein Wasserkocher mit 2000 W läuft ${fmt(t)} s. Das Wasser nimmt ${fmt(nu)} kJ Wärmeenergie auf. Wie gross ist der Wirkungsgrad?`, '%', eta,
          'Zugeführte Energie: E = P \u00B7 t (in J, dann in kJ umrechnen). Dann \u03B7 = E_nutz : E_zu.',
          `E_zu = 2000 W \u00B7 ${fmt(t)} s = ${fmt(zu * 1000)} J = ${fmt(zu)} kJ<br>\u03B7 = ${fmt(nu)} kJ : ${fmt(zu)} kJ = ${fmt(eta / 100)} = ${fmt(eta)} %`);
      } }
    ]
  }
];

/* ---------- Lerninhalt: Lektionskarten pro Station ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;
const tri = (top, l, r) => `<div class="tri" role="img" aria-label="Formeldreieck: oben ${top}, unten ${l} und ${r}"><div class="tri-top mono">${top}</div><div class="tri-row"><div class="mono">${l}</div><div class="mono">${r}</div></div></div>`;

const LESSONS = {
  s1: [
    { h: 'Arbeit: Kraft über einen Weg',
      body: `<p>Du verrichtest <b>Arbeit</b>, wenn du mit einer Kraft einen Körper über eine Strecke bewegst, und zwar in Richtung der Kraft.</p>
        ${merk('<b>W = F \u00B7 s</b><br>Arbeit = Kraft \u00B7 Weg<br>Einheit: Joule (J), 1 J = 1 N \u00B7 1 m')}
        <p>Ein Beispiel: Eine Tafel Schokolade (100 g) wiegt etwa 1 N. Hebst du sie 1 m hoch, verrichtest du ungefähr 1 J Arbeit.</p>
        <p>Wichtig: Wer einen Koffer waagrecht trägt, verrichtet im physikalischen Sinn keine Hubarbeit. Die Kraft zeigt nach oben, der Weg geht aber zur Seite.</p>` },
    { h: 'Hubarbeit und Lageenergie',
      body: `<p>Beim Heben musst du die Gewichtskraft überwinden. Sie hängt von der Masse ab:</p>
        ${merk('<b>F = m \u00B7 g</b> mit g = 10 N/kg<br>Ein Körper mit 1 kg hat also etwa 10 N Gewichtskraft.')}
        <p>Für die Hubarbeit gilt damit:</p>
        ${merk('<b>W = m \u00B7 g \u00B7 h</b>')}
        <p>Diese Arbeit ist danach nicht weg: Sie steckt als <b>Lageenergie</b> im angehobenen Körper. Lässt du ihn fallen, wird daraus wieder Bewegungsenergie.</p>
        <p><b>Beispiel:</b> 5 kg um 2 m heben.<br>F = 5 kg \u00B7 10 N/kg = 50 N<br>W = 50 N \u00B7 2 m = 100 J</p>` },
    { h: 'Probiere es aus',
      body: '<p>Verändere Masse und Höhe. Was passiert mit der Arbeit, wenn du die Masse verdoppelst? Und wenn du die Höhe verdoppelst?</p>', sim: 'hub' },
    { h: 'Die Goldene Regel der Mechanik',
      body: `<p>Eine schiefe Ebene macht das Heben leichter: Du brauchst weniger Kraft. Dafür wird der Weg länger.</p>
        ${merk('<b>Was du an Kraft sparst, musst du an Weg zugeben.</b><br>Die Arbeit bleibt gleich (ohne Reibung).')}
        <p>Hier wird eine Last von 40 kg um 2 m angehoben. Wähle die Länge der Strecke.</p>`, sim: 'ramp' },
    { h: 'Kurz testen',
      check: { q: 'Du schiebst eine Kiste eine 4 m lange schiefe Ebene hinauf, statt sie 1 m hoch zu heben. Was wird dadurch kleiner?',
        options: ['Die nötige Kraft.', 'Die verrichtete Arbeit.', 'Der Weg.', 'Die Lageenergie am Ende.'],
        explain: 'Die Kraft sinkt auf etwa einen Viertel, dafür wird der Weg viermal so lang. Arbeit und Lageenergie am Ende bleiben gleich.' } }
  ],
  s2: [
    { h: 'Wer ist schneller oben?',
      body: `<p>Anna und Ben steigen dieselbe Treppe hoch. Anna braucht 10 s, Ben 20 s. Beide haben gleich viel Arbeit verrichtet. Trotzdem war Anna leistungsstärker, weil sie dieselbe Arbeit in kürzerer Zeit geschafft hat.</p>
        <p>Diesen Unterschied beschreibt die <b>Leistung</b>.</p>
        ${merk('<b>P = W : t</b><br>Leistung = Arbeit : Zeit<br>Einheit: Watt (W), 1 W = 1 J/s')}
        <p>Leistung heisst also: <b>Wie viel Energie wird pro Sekunde umgewandelt?</b> 100 W bedeutet, dass pro Sekunde 100 J umgewandelt werden.</p>` },
    { h: 'Das Treppenrennen',
      body: '<p>Beide haben 60 kg und steigen 3 m hoch. Stelle die Zeiten ein und drücke Start. Vergleiche Arbeit und Leistung.</p>', sim: 'runner' },
    { h: 'Formeln umstellen',
      body: `<p>Mit dem Formeldreieck findest du die richtige Formel. Decke die Grösse ab, die du suchst.</p>
        ${tri('W', 'P', 't')}
        <ul><li>Gesucht P: P = W : t</li><li>Gesucht W: W = P \u00B7 t</li><li>Gesucht t: t = W : P</li></ul>
        <p><b>Beispiel Treppe:</b> 60 kg, 3 m hoch, in 10 s.<br>W = 60 kg \u00B7 10 N/kg \u00B7 3 m = 1800 J<br>P = 1800 J : 10 s = 180 W</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Kran hebt eine Last in 5 s auf 10 m. Ein zweiter Kran hebt dieselbe Last in 10 s auf 10 m. Welche Aussage stimmt?',
        options: ['Der erste Kran hat die doppelte Leistung.', 'Der zweite Kran verrichtet mehr Arbeit.', 'Beide haben dieselbe Leistung.', 'Der zweite Kran hat die doppelte Leistung.'],
        explain: 'Gleiche Last und gleiche Höhe bedeuten gleiche Arbeit. Der erste Kran schafft sie in der halben Zeit, also hat er die doppelte Leistung.' } }
  ],
  s3: [
    { h: 'Watt, Kilowatt, PS',
      body: `<p>Watt ist eine kleine Einheit. Darum gibt es grössere:</p>
        <ul><li>1 kW (Kilowatt) = 1000 W</li><li>1 MW (Megawatt) = 1\u202F000\u202F000 W</li><li>1 PS (Pferdestärke) \u2248 735 W</li></ul>
        <p>PS findest du noch bei Autos und Mofas. Physikalisch richtig ist Watt oder Kilowatt.</p>
        ${merk('kW \u2192 W: mal 1000<br>W \u2192 kW: durch 1000<br>PS \u2192 W: mal 735')}` },
    { h: 'Leistungen einordnen',
      body: '<p>Tippe auf einen Balken. Die Skala ist gestaucht: Schon ein kleines Stück mehr Balken bedeutet ein Vielfaches an Leistung. Die Werte sind Richtwerte.</p>', sim: 'scale' },
    { h: 'Umrechnen',
      body: '<p>Schiebe den Regler und sieh dir dieselbe Leistung in drei Einheiten an.</p>', sim: 'convert' },
    { h: 'Kurz testen',
      check: { q: 'Ein Heizlüfter hat 2,5 kW. Wie viel Watt sind das?',
        options: ['2500 W', '250 W', '25 W', '25\u202F000 W'],
        explain: '1 kW sind 1000 W, also 2,5 \u00B7 1000 = 2500 W.' } }
  ],
  s4: [
    { h: 'Strom bringt Energie',
      body: `<p>Im Stromkreis ist die <b>Spannung U</b> (in Volt) der Antrieb: Sie sagt, wie viel Energie jede Ladung mitbringt. Die <b>Stromstärke I</b> (in Ampere) sagt, wie viel Ladung pro Sekunde fliesst.</p>
        <p>Je grösser beides, desto mehr Energie wird pro Sekunde umgewandelt:</p>
        ${merk('<b>P = U \u00B7 I</b><br>Leistung = Spannung \u00B7 Stromstärke<br>1 W = 1 V \u00B7 1 A')}
        <p>Der Vergleich mit einem Wasserrad hilft: Fallhöhe (\u2248 Spannung) mal Wassermenge pro Sekunde (\u2248 Stromstärke) ergibt die Leistung.</p>` },
    { h: 'Die Leistungs-Fläche',
      body: '<p>Das Rechteck zeigt U (Breite) und I (Höhe). Seine Fläche ist die Leistung P. Verändere beide Werte und beobachte die Lampe.</p>', sim: 'pui' },
    { h: 'Typenschild lesen',
      body: `<div class="plate mono"><div>Wasserkocher</div><div>230 V</div><div>2000 W</div></div>
        <p>Auf dem Typenschild stehen Spannung und Leistung. Daraus berechnest du die Stromstärke:</p>
        ${tri('P', 'U', 'I')}
        <p>I = P : U = 2000 W : 230 V \u2248 8,7 A</p>` },
    { h: 'Sicherheit',
      body: `${warnbox('<b>230 V aus der Steckdose kann lebensgefährlich sein.</b><br>Im Unterricht arbeiten wir mit Netzgeräten bis höchstens 12 V. 230-V-Geräte misst du nur über ein Energiekostenmessgerät und zusammen mit deiner Lehrperson.')}` },
    { h: 'Kurz testen',
      check: { q: 'Ein Motor läuft an 12 V und nimmt 2 A auf. Welche Leistung hat er?',
        options: ['24 W', '6 W', '14 W', '10 W'],
        explain: 'P = U \u00B7 I = 12 V \u00B7 2 A = 24 W.' } }
  ],
  s5: [
    { h: 'Wie schnell, wie viel?',
      body: `<p>Leistung sagt, <b>wie schnell</b> Energie umgewandelt wird. Die <b>Energie</b> sagt, <b>wie viel</b> es insgesamt war. Beides hängt über die Zeit zusammen:</p>
        ${merk('<b>E = P \u00B7 t</b>')}
        <p>Für Strom ist das Joule zu klein. Deshalb rechnet man mit der <b>Kilowattstunde (kWh)</b>:</p>
        ${merk('1 kWh = 1 kW während 1 h<br>1 kWh = 3,6 MJ = 3\u202F600\u202F000 J')}
        <p>Auf der Stromrechnung bezahlst du vor allem Energie in kWh.</p>` },
    { h: 'Der Stromzähler',
      body: '<p>Stelle Leistung, Laufzeit und Preis ein und beobachte den Zähler. Rechne in kWh: Watt durch 1000, mal Stunden.</p>', sim: 'meter' },
    { h: 'Viel Leistung heisst nicht viel Energie',
      body: '<p>Ein Föhn hat 1800 W, ein Laptop nur 60 W. Wer braucht mehr Energie? Das hängt von der Laufzeit ab. Probiere es aus.</p>', sim: 'vergleich' },
    { h: 'Standby kostet',
      body: `<p>Ein Gerät im Standby braucht wenig Leistung, läuft aber das ganze Jahr.</p>
        <p><b>Beispiel:</b> 10 W im Standby<br>Ein Jahr hat 365 \u00B7 24 = 8760 h.<br>E = 0,01 kW \u00B7 8760 h = 87,6 kWh<br>Bei 25 Rappen pro kWh sind das etwa 21,90 Franken.</p>
        ${merk('Kleine Leistung mal lange Zeit ergibt viel Energie.')}` },
    { h: 'Kurz testen',
      check: { q: 'Ein 100-W-Gerät läuft 10 Stunden. Wie viel Energie wandelt es um?',
        options: ['1 kWh', '10 kWh', '0,1 kWh', '1000 kWh'],
        explain: '100 W = 0,1 kW. E = 0,1 kW \u00B7 10 h = 1 kWh.' } }
  ],
  s6: [
    { h: 'Nutzen und Verlust',
      body: `<p>Kein Gerät wandelt Energie vollständig in das um, was du willst. Eine Glühlampe soll leuchten, wird aber vor allem warm. Der nützliche Teil heisst <b>Nutzenergie</b>. Der Rest geht meist als Wärme in die Umgebung (<b>Energieentwertung</b>).</p>
        <p>Energie geht dabei nicht verloren, sie ist nur nicht mehr nutzbar:</p>
        ${merk('E_zu = E_nutz + E_Wärme')}
        ${merk('<b>\u03B7 = E_nutz : E_zu</b><br>\u03B7 (Eta) heisst Wirkungsgrad und wird meist in Prozent angegeben.')}` },
    { h: 'Wirkungsgrad einstellen',
      body: '<p>Pro 100 J, die ins Gerät gehen: Wie viel kommt als Nutzenergie an? Tippe auf ein Beispiel. Die Werte sind Richtwerte und können je nach Gerät abweichen.</p>', sim: 'eta' },
    { h: 'Rechenbeispiel Wasserkocher',
      body: `<p>Ein Wasserkocher mit 2000 W läuft 60 s.</p>
        <ul><li>Zugeführt: E = P \u00B7 t = 2000 W \u00B7 60 s = 120\u202F000 J = 120 kJ</li>
        <li>Das Wasser nimmt 96 kJ auf (Nutzenergie).</li>
        <li>\u03B7 = 96 kJ : 120 kJ = 0,8 = 80 %</li>
        <li>24 kJ gehen als Wärme an Gerät und Umgebung.</li></ul>` },
    { h: 'Die Grenze: 100 %',
      body: `<p>Der Wirkungsgrad ist nie grösser als 100 %. Sonst würde ein Gerät mehr Energie abgeben, als man hineinsteckt. Das widerspricht der Energieerhaltung.</p>
        <p>Ein Perpetuum mobile, das ohne Energiezufuhr dauernd läuft, gibt es deshalb nicht.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Motor nimmt 500 J auf und gibt 400 J Nutzenergie ab. Wie gross ist der Wirkungsgrad?',
        options: ['80 %', '125 %', '20 %', '400 %'],
        explain: '\u03B7 = 400 J : 500 J = 0,8 = 80 %.' } }
  ]
};
const lc = (id, h) => LESSONS[id].find(c => c.h === h);
const addAfter = (id, h, card) => { const a = LESSONS[id]; a.splice(a.findIndex(c => c.h === h) + 1, 0, card); };
lc('s1', 'Hubarbeit und Lageenergie').body = lc('s1', 'Hubarbeit und Lageenergie').body.replace(/<p><b>Beispiel:<\/b>[\s\S]*?<\/p>/, '');
lc('s2', 'Formeln umstellen').body = lc('s2', 'Formeln umstellen').body.replace(/<p><b>Beispiel Treppe:<\/b>[\s\S]*?<\/p>/, '');
addAfter('s1', 'Hubarbeit und Lageenergie', { h: 'Vorgerechnet: Rucksack heben', worked: {
  given: 'Du hebst einen Rucksack mit 8 kg um 1,5 m hoch. Wie gross ist die Hubarbeit?',
  steps: [['Gewichtskraft berechnen', 'F = m \u00B7 g = 8 kg \u00B7 10 N/kg = 80 N'], ['Arbeit berechnen', 'W = F \u00B7 h = 80 N \u00B7 1,5 m = 120 J'], ['Antwort', 'Du verrichtest 120 J Hubarbeit. Sie steckt danach als Lageenergie im Rucksack.']] } });
addAfter('s2', 'Das Treppenrennen', { h: 'Vorgerechnet: Treppenlauf', worked: {
  given: 'Eine Person mit 60 kg steigt in 12 s eine Treppe mit 4 m Höhenunterschied hoch. Welche Leistung bringt sie auf?',
  steps: [['Gewichtskraft berechnen', 'F = 60 kg \u00B7 10 N/kg = 600 N'], ['Arbeit berechnen', 'W = F \u00B7 h = 600 N \u00B7 4 m = 2400 J'], ['Leistung berechnen', 'P = W : t = 2400 J : 12 s = 200 W'], ['Antwort', 'Die Person leistet 200 W. Das ist ein Wert, den ein Mensch kurz schafft.']] } });
addAfter('s3', 'Watt, Kilowatt, PS', { h: 'Vorgerechnet: Umrechnen', worked: {
  given: 'Ein Auto hat 75 kW. Wie viele PS sind das?',
  steps: [['kW in W umrechnen', '75 kW \u00B7 1000 = 75\u202F000 W'], ['W in PS umrechnen', '75\u202F000 W : 735 W/PS \u2248 102 PS'], ['Antwort', 'Das Auto hat etwa 102 PS.']] } });
addAfter('s4', 'Typenschild lesen', { h: 'Vorgerechnet: Föhn', worked: {
  given: 'Auf dem Föhn steht 230 V und 1800 W. Welche Stromstärke fliesst?',
  steps: [['Formel umstellen', 'P = U \u00B7 I wird zu I = P : U'], ['Einsetzen', 'I = 1800 W : 230 V'], ['Ausrechnen', 'I \u2248 7,8 A'], ['Antwort', 'Beim Betrieb fliessen etwa 7,8 A.']] } });
addAfter('s5', 'Der Stromzähler', { h: 'Vorgerechnet: Gaming-PC', worked: {
  given: 'Ein Gaming-PC mit 400 W läuft 5 h. 1 kWh kostet 25 Rappen. Was kostet das?',
  steps: [['Leistung in kW', '400 W = 0,4 kW'], ['Energie berechnen', 'E = P \u00B7 t = 0,4 kW \u00B7 5 h = 2 kWh'], ['Kosten berechnen', '2 kWh \u00B7 25 Rp./kWh = 50 Rappen'], ['Antwort', 'Der Abend am PC kostet 50 Rappen.']] } });
const kocher = lc('s6', 'Rechenbeispiel Wasserkocher');
kocher.h = 'Vorgerechnet: Wasserkocher'; delete kocher.body;
kocher.worked = { given: 'Ein Wasserkocher mit 2000 W läuft 60 s. Das Wasser nimmt 96 kJ auf. Wie gross ist der Wirkungsgrad?',
  steps: [['Zugeführte Energie', 'E = P \u00B7 t = 2000 W \u00B7 60 s = 120\u202F000 J = 120 kJ'], ['Wirkungsgrad als Anteil', '\u03B7 = E_nutz : E_zu = 96 kJ : 120 kJ = 0,8'], ['In Prozent', '0,8 \u00B7 100 = 80 %'], ['Antwort', '80 % sind nutzbar. Die übrigen 24 kJ gehen als Wärme an Gerät und Umgebung.']] };
const GOALS = {
  s1: ['Hubarbeit und Gewichtskraft berechnen', 'erklären, was die Goldene Regel der Mechanik sagt'],
  s2: ['Leistung als Arbeit pro Zeit erklären', 'P, W oder t mit der Formel berechnen'],
  s3: ['W, kW und PS umrechnen', 'Leistungen im Alltag einordnen'],
  s4: ['die Formel P = U \u00B7 I anwenden', 'ein Typenschild lesen und die Stromstärke bestimmen'],
  s5: ['Energie in kWh berechnen', 'Stromkosten bestimmen'],
  s6: ['den Wirkungsgrad berechnen', 'erklären, warum er nie über 100 % liegt']
};
const LEARN = {
  's1-gewicht': 'Hubarbeit und Lageenergie', 's1-hub': 'Hubarbeit und Lageenergie', 's1-richtung': 'Arbeit: Kraft über einen Weg', 's1-arbeit': 'Arbeit: Kraft über einen Weg',
  's1-goldene': 'Die Goldene Regel der Mechanik', 's1-schiefe': 'Die Goldene Regel der Mechanik',
  's2-def': 'Wer ist schneller oben?', 's2-vergleich': 'Wer ist schneller oben?', 's2-p': 'Vorgerechnet: Treppenlauf', 's2-treppe': 'Vorgerechnet: Treppenlauf', 's2-zeit': 'Formeln umstellen', 's2-arbeit': 'Formeln umstellen',
  's3-kw-w': 'Watt, Kilowatt, PS', 's3-w-kw': 'Watt, Kilowatt, PS', 's3-einheit': 'Watt, Kilowatt, PS', 's3-ps': 'Vorgerechnet: Umrechnen', 's3-kw-ps': 'Vorgerechnet: Umrechnen', 's3-mensch': 'Leistungen einordnen',
  's4-pui': 'Strom bringt Energie', 's4-spannung': 'Strom bringt Energie', 's4-strom': 'Vorgerechnet: Föhn', 's4-typenschild': 'Typenschild lesen', 's4-verdoppeln': 'Die Leistungs-Fläche', 's4-sicherheit': 'Sicherheit',
  's5-kwh': 'Wie schnell, wie viel?', 's5-einheit': 'Wie schnell, wie viel?', 's5-zeit': 'Wie schnell, wie viel?', 's5-kosten': 'Vorgerechnet: Gaming-PC', 's5-standby': 'Standby kostet', 's5-fall': 'Viel Leistung heisst nicht viel Energie',
  's6-def': 'Nutzen und Verlust', 's6-eta': 'Nutzen und Verlust', 's6-nutz': 'Nutzen und Verlust', 's6-verlust': 'Nutzen und Verlust', 's6-ueber100': 'Die Grenze: 100 %', 's6-kocher': 'Vorgerechnet: Wasserkocher'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Stirnlampe', pw: '3 W' },
  { xp: 80, name: 'E-Bike-Motor', pw: '250 W' },
  { xp: 200, name: 'Föhn', pw: '2 kW' },
  { xp: 380, name: 'Traktor', pw: '100 kW' },
  { xp: 620, name: 'Lokomotive', pw: '6 MW' },
  { xp: 920, name: 'Kraftwerk', pw: 'MW und mehr' }
];

/* ---------- Thema: Leistung ---------- */
const TOPIC = {
  id: 'leistung', storeKey: 'halingen-leistung-lernapp-v1', other: { title: 'Motor: Elektromotor und Generator', href: 'motor.html' },
  title: 'Leistung', lead: 'Wie schnell wird Energie umgewandelt?', tag: 'Natur und Technik',
  tips: ['Leistung heisst: Energie pro Sekunde.', 'Mein Wirkungsgrad ist 100 %. Das sagt zumindest mein Anwalt.'],
  formulas: [
    ['Gewichtskraft', 'F = m \u00B7 g', 'g = 10 N/kg'],
    ['Arbeit', 'W = F \u00B7 s', 'Hubarbeit: W = m \u00B7 g \u00B7 h'],
    ['Leistung', 'P = W : t', 'W = P \u00B7 t,  t = W : P'],
    ['Einheiten', '1 W = 1 J/s', '1 kW = 1000 W,  1 PS \u2248 735 W'],
    ['Elektrische Leistung', 'P = U \u00B7 I', 'I = P : U,  U = P : I'],
    ['Elektrische Energie', 'E = P \u00B7 t', 'P in kW, t in h \u2192 E in kWh'],
    ['Wirkungsgrad', '\u03B7 = E_nutz : E_zu', 'in Prozent angeben']
  ]
};

/* ---------- Simulationen ---------- */
function fmtP(p) {
  return p >= 1e6 ? fmt(p / 1e6) + ' MW' : p >= 1000 ? fmt(p / 1000) + ' kW' : fmt(p) + ' W';
}

const SIMS = {
  hub(el) {
    el.innerHTML = `<div class="sim"><div class="hubvis">
        <div class="rail" aria-hidden="true"><span class="rl top mono">4 m</span><span class="rl bot mono">0 m</span><div class="wtbox" id="wt"><span class="mono" id="wtl"></span></div></div>
        <div class="readout mono" id="ro" aria-live="polite"></div></div>
      ${sl('m', 'Masse', 1, 20, 1, 5, 'kg')}${sl('h', 'Höhe', 0.5, 4, 0.5, 2, 'm')}
      <button class="btn sm" id="again">Nochmals heben</button></div>`;
    const m = $id('m'), h = $id('h'), wt = $id('wt');
    function upd(replay) {
      const mv = +m.value, hv = +h.value, F = mv * 10, W = F * hv;
      $id('mv').textContent = fmt(mv); $id('hv').textContent = fmt(hv);
      $id('wtl').textContent = fmt(mv) + ' kg';
      wt.style.width = (30 + mv * 2) + 'px';
      $id('ro').innerHTML = `F = ${fmt(mv)} kg \u00B7 10 N/kg = <b>${fmt(F)} N</b><br>W = ${fmt(F)} N \u00B7 ${fmt(hv)} m = <b>${fmt(W)} J</b>`;
      if (replay) { wt.style.transition = 'none'; wt.style.transform = 'translateY(0)'; void wt.offsetWidth; wt.style.transition = ''; }
      wt.style.transform = `translateY(-${hv / 4 * 150}px)`;
    }
    wt.style.transform = 'translateY(0)'; void wt.offsetWidth;
    upd(false);
    m.addEventListener('input', () => upd(false));
    h.addEventListener('input', () => upd(false));
    $id('again').addEventListener('click', () => upd(true));
  },

  ramp(el) {
    el.innerHTML = `<div class="sim">
      <div class="seg3" role="group" aria-label="Länge der Strecke">
        <button class="btn sm on" data-s="2">2 m senkrecht</button><button class="btn sm" data-s="4">4 m Rampe</button><button class="btn sm" data-s="8">8 m Rampe</button></div>
      ${brow('Kraft', 'bF', 'vF')}${brow('Weg', 'bS', 'vS')}${brow('Arbeit', 'bW', 'vW')}
      <p class="readout mono" id="ro" aria-live="polite"></p></div>`;
    function upd(s) {
      const F = 800 / s;
      $id('bF').style.width = (F / 400 * 100) + '%'; $id('vF').textContent = fmt(F) + ' N';
      $id('bS').style.width = (s / 8 * 100) + '%'; $id('vS').textContent = fmt(s) + ' m';
      $id('bW').style.width = '100%'; $id('vW').textContent = '800 J';
      $id('ro').innerHTML = `W = F \u00B7 s = ${fmt(F)} N \u00B7 ${fmt(s)} m = <b>800 J</b>`;
      el.querySelectorAll('[data-s]').forEach(b => b.classList.toggle('on', +b.dataset.s === s));
    }
    ['bF', 'bS', 'bW'].forEach(i => { $id(i).style.width = '0%'; });
    nf(el, () => upd(2));
    el.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => upd(+b.dataset.s)));
  },

  runner(el) {
    const lane = (k, name) => `<div class="lane"><div class="trk" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><div class="run" id="run${k}"></div></div>
      <div class="lname">${name}</div><div class="btrack"><div class="bfill" id="p${k}"></div></div><div class="mono small lpl" id="pl${k}"></div></div>`;
    el.innerHTML = `<div class="sim"><div class="lanes">${lane('A', 'Anna')}${lane('B', 'Ben')}</div>
      ${sl('tA', 'Zeit Anna', 3, 30, 1, 10, 's')}${sl('tB', 'Zeit Ben', 3, 30, 1, 20, 's')}
      <button class="btn btn-primary sm" id="go">Start</button>
      <p class="readout mono" id="ro" aria-live="polite">Beide leisten W = 60 kg \u00B7 10 N/kg \u00B7 3 m = 1800 J.</p></div>`;
    function upd() {
      ['A', 'B'].forEach(k => {
        const t = +$id('t' + k).value, P = 1800 / t;
        $id('t' + k + 'v').textContent = fmt(t);
        $id('p' + k).style.width = (P / 600 * 100) + '%';
        $id('pl' + k).textContent = `P = 1800 J : ${fmt(t)} s = ${fmt(P, 1)} W`;
      });
    }
    upd();
    $id('tA').addEventListener('input', upd); $id('tB').addEventListener('input', upd);
    $id('go').addEventListener('click', () => {
      ['A', 'B'].forEach(k => {
        const r = $id('run' + k), t = +$id('t' + k).value;
        r.style.transition = 'none'; r.style.transform = 'translateY(0)'; void r.offsetWidth;
        r.style.transition = reduced() ? 'none' : `transform ${t * 0.25}s linear`;
        r.style.transform = 'translateY(-118px)';
      });
    });
  },

  scale(el) {
    const items = [['Handy-Ladegerät', 10], ['Mensch, kurzzeitig', 200], ['Föhn', 1800], ['Auto-Motor', 100000], ['E-Lok', 6000000]];
    el.innerHTML = `<div class="sim">${items.map((it, i) =>
      `<button class="srow" data-i="${i}"><span class="bname">${it[0]}</span><span class="btrack"><span class="bfill" id="sb${i}"></span></span><b class="mono bval">ca. ${fmtP(it[1])}</b></button>`).join('')}
      <p class="readout" id="ro" aria-live="polite">Tippe auf einen Balken.</p></div>`;
    items.forEach((it, i) => { $id('sb' + i).style.width = '0%'; });
    nf(el, () => items.forEach((it, i) => { $id('sb' + i).style.width = (Math.log10(it[1]) / 7 * 100) + '%'; }));
    el.querySelectorAll('.srow').forEach(b => b.addEventListener('click', () => {
      const it = items[+b.dataset.i], r = it[1] / 200;
      el.querySelectorAll('.srow').forEach(x => x.classList.toggle('on', x === b));
      $id('ro').innerHTML = r === 1 ? `<b>${it[0]}</b>: Das ist unser Vergleichswert von etwa 200 W.`
        : r > 1 ? `<b>${it[0]}</b> hat etwa das <b>${fmt(r, 1)}-Fache</b> der Leistung eines Menschen (200 W).`
          : `<b>${it[0]}</b> hat nur etwa <b>${fmt(1 / r, 1)}-mal weniger</b> Leistung als ein Mensch (200 W).`;
    }));
  },

  convert(el) {
    el.innerHTML = `<div class="sim">${sl('kw', 'Leistung', 0.5, 150, 0.5, 2.5, 'kW')}
      <div class="trio"><div><span class="k">Watt</span><b class="mono" id="cw"></b></div>
      <div><span class="k">Kilowatt</span><b class="mono" id="ck"></b></div>
      <div><span class="k">PS</span><b class="mono" id="cp"></b></div></div>
      <p class="small">1 kW = 1000 W und 1 PS \u2248 735 W</p></div>`;
    const kw = $id('kw');
    function upd() {
      const k = +kw.value, W = k * 1000;
      $id('kwv').textContent = fmt(k);
      $id('cw').textContent = fmt(W) + ' W';
      $id('ck').textContent = fmt(k) + ' kW';
      $id('cp').textContent = fmt(W / 735, 1) + ' PS';
    }
    upd(); kw.addEventListener('input', upd);
  },

  pui(el) {
    el.innerHTML = `<div class="sim"><div class="puivis"><div class="areabox" aria-hidden="true"><div class="area" id="ar"><span class="mono">P</span></div></div>
      <div class="lampwrap" aria-hidden="true"><div class="lamp" id="lamp"></div><span class="small">Helligkeit</span></div></div>
      <p class="readout mono" id="ro" aria-live="polite"></p>
      ${sl('U', 'Spannung U', 1, 24, 1, 12, 'V')}${sl('I', 'Stromstärke I', 0.1, 5, 0.1, 2, 'A')}</div>`;
    const U = $id('U'), I = $id('I');
    function upd() {
      const u = +U.value, i = +I.value, P = Math.round(u * i * 100) / 100;
      $id('Uv').textContent = fmt(u); $id('Iv').textContent = fmt(i);
      $id('ar').style.width = (u / 24 * 100) + '%'; $id('ar').style.height = (i / 5 * 100) + '%';
      $id('lamp').style.opacity = (0.12 + 0.88 * P / 120).toFixed(2);
      $id('ro').innerHTML = `P = U \u00B7 I = ${fmt(u)} V \u00B7 ${fmt(i)} A = <b>${fmt(P, 2)} W</b>`;
    }
    $id('ar').style.width = '0%'; $id('ar').style.height = '0%';
    nf(el, upd);
    U.addEventListener('input', upd); I.addEventListener('input', upd);
    // Zahlen sofort anzeigen
    $id('Uv').textContent = fmt(+U.value); $id('Iv').textContent = fmt(+I.value);
  },

  meter(el) {
    el.innerHTML = `<div class="sim"><div class="meterbox"><div class="mdisp mono" id="E">0,00</div><span class="mu mono">kWh</span></div>
      <div class="btrack"><div class="bfill" id="bE"></div></div>
      <p class="mcost">Kosten: <b class="mono" id="K">0,0</b> <span class="mono">Rappen</span></p>
      <p class="readout mono" id="ro" aria-live="polite"></p>
      ${sl('P', 'Leistung', 100, 3000, 100, 1000, 'W')}${sl('t', 'Laufzeit', 0.5, 10, 0.5, 2, 'h')}${sl('pr', 'Preis pro kWh', 20, 30, 5, 25, 'Rappen')}</div>`;
    let cur = 0;
    function upd() {
      const P = +$id('P').value, t = +$id('t').value, pr = +$id('pr').value;
      const E = P / 1000 * t, K = E * pr;
      $id('Pv').textContent = fmt(P); $id('tv').textContent = fmt(t); $id('prv').textContent = fmt(pr);
      $id('bE').style.width = Math.min(100, E / 30 * 100) + '%';
      $id('ro').innerHTML = `E = ${fmt(P / 1000)} kW \u00B7 ${fmt(t)} h = <b>${fmt(E, 2)} kWh</b><br>Kosten = ${fmt(E, 2)} kWh \u00B7 ${fmt(pr)} Rp. = <b>${fmt(K, 1)} Rappen</b>`;
      const from = cur; cur = E;
      tween(from, E, 700, v => { if (!el.isConnected) return; $id('E').textContent = fmt(v, 2); $id('K').textContent = fmt(v * pr, 1); });
    }
    ['P', 't', 'pr'].forEach(i => $id(i).addEventListener('input', upd));
    $id('bE').style.width = '0%';
    nf(el, upd);
  },

  vergleich(el) {
    el.innerHTML = `<div class="sim"><div class="tag">Leistung</div>
      ${brow('Föhn', 'lF', 'lFv')}${brow('Laptop', 'lL', 'lLv')}
      <div class="tag" style="margin-top:12px">Energie</div>
      ${brow('Föhn', 'eF', 'eFv')}${brow('Laptop', 'eL', 'eLv')}
      <p class="verdict" id="vd" aria-live="polite"></p>
      ${sl('tf', 'Föhn läuft', 1, 15, 1, 5, 'min')}${sl('tl', 'Laptop läuft', 0.5, 6, 0.5, 3, 'h')}</div>`;
    $id('lFv').textContent = '1800 W'; $id('lLv').textContent = '60 W';
    ['lF', 'lL', 'eF', 'eL'].forEach(i => { $id(i).style.width = '0%'; });
    function upd() {
      const tf = +$id('tf').value, tl = +$id('tl').value;
      const Ef = 1.8 * tf / 60, El = 0.06 * tl;
      $id('tfv').textContent = fmt(tf); $id('tlv').textContent = fmt(tl);
      $id('lF').style.width = '100%'; $id('lL').style.width = (60 / 1800 * 100) + '%';
      $id('eF').style.width = Math.min(100, Ef / 0.5 * 100) + '%'; $id('eL').style.width = Math.min(100, El / 0.5 * 100) + '%';
      $id('eFv').textContent = fmt(Ef, 3) + ' kWh'; $id('eLv').textContent = fmt(El, 3) + ' kWh';
      const a = Math.round(Ef * 10000), b = Math.round(El * 10000);
      $id('vd').innerHTML = a > b ? 'Der <b>Föhn</b> braucht mehr Energie.' : a < b ? 'Der <b>Laptop</b> braucht mehr Energie.' : 'Beide brauchen <b>gleich viel</b> Energie.';
    }
    $id('tf').addEventListener('input', upd); $id('tl').addEventListener('input', upd);
    nf(el, upd);
    $id('tfv').textContent = '5'; $id('tlv').textContent = '3';
  },

  eta(el) {
    const pre = [['Glühlampe', 5], ['Benzinmotor', 30], ['Wasserkocher', 85], ['Elektromotor', 90]];
    el.innerHTML = `<div class="sim"><div class="chips" role="group" aria-label="Beispiele">${pre.map(p => `<button class="btn sm" data-e="${p[1]}">${p[0]} \u2248 ${p[1]} %</button>`).join('')}</div>
      <div class="stack" aria-hidden="true"><div class="sn" id="sn"></div><div class="sw" id="sw"></div></div>
      <div class="stlab"><span><b class="mono" id="nL"></b> Nutzenergie</span><span><b class="mono" id="wL"></b> Wärme</span></div>
      <p class="readout mono" id="ro" aria-live="polite"></p>
      ${sl('eta', 'Wirkungsgrad \u03B7', 0, 100, 5, 80, '%')}</div>`;
    const e = $id('eta');
    function upd() {
      const v = +e.value;
      $id('etav').textContent = fmt(v);
      $id('sn').style.width = v + '%'; $id('sw').style.width = (100 - v) + '%';
      $id('nL').textContent = fmt(v) + ' J'; $id('wL').textContent = fmt(100 - v) + ' J';
      $id('ro').innerHTML = `\u03B7 = ${fmt(v)} J : 100 J = <b>${fmt(v)} %</b>`;
    }
    $id('sn').style.width = '0%'; $id('sw').style.width = '100%';
    $id('etav').textContent = '80';
    nf(el, upd);
    e.addEventListener('input', upd);
    el.querySelectorAll('[data-e]').forEach(b => b.addEventListener('click', () => { e.value = b.dataset.e; upd(); }));
  }
};




export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"leistung","titel":"Leistung","kapitel":"Vertiefung Leistung"});
