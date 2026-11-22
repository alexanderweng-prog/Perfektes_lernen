// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs aus fantasy-lernapp/src/chapters/motor.js
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


/* ---------- Inhalt: Elektromotor und Generator, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 'm1', nr: 1, title: 'Magnet und Elektromagnet', sub: 'Strom erzeugt ein Magnetfeld',
    items: [
      { id: 'm1-pole', topic: 'Magnetpole', make() {
        return mc('Du schneidest einen Stabmagneten in der Mitte durch. Was entsteht?', [
          'Zwei kleinere Magnete, jeder mit Nord- und Südpol.',
          'Ein Stück nur mit Nordpol und ein Stück nur mit Südpol.',
          'Zwei Stücke ohne Magnetismus.',
          'Ein Magnet mit zwei Nordpolen.'],
          'Magnete haben immer zwei Pole. Teilst du einen Magneten, entsteht an der Schnittstelle sofort ein neues Polpaar. Einzelne Pole gibt es nicht.');
      } },
      { id: 'm1-abstossen', topic: 'Anziehen und Abstossen', make() {
        return mc('Du hältst zwei Magnete so zusammen, dass sich Nordpol und Nordpol gegenüberstehen. Was passiert?', [
          'Sie stossen sich ab.',
          'Sie ziehen sich an.',
          'Nichts, Magnete wirken nur auf Eisen.',
          'Sie ziehen sich nur an, wenn Strom fliesst.'],
          'Gleichnamige Pole stossen sich ab, ungleichnamige ziehen sich an. Genau das nutzt später der Elektromotor.');
      } },
      { id: 'm1-oersted', topic: 'Magnetische Wirkung des Stroms', make() {
        return mc('Neben einem Draht liegt ein Kompass. Du schaltest den Strom im Draht ein. Was beobachtest du?', [
          'Die Kompassnadel schlägt aus: Der Strom erzeugt ein Magnetfeld.',
          'Nichts, denn Strom und Magnetismus haben nichts miteinander zu tun.',
          'Die Nadel dreht sich nur, wenn der Draht aus Eisen ist.',
          'Der Draht wird kalt.'],
          'Ein elektrischer Strom ist von einem Magnetfeld umgeben. Das hat Hans Christian Oersted entdeckt. Ohne diesen Zusammenhang gäbe es keinen Elektromotor.');
      } },
      { id: 'm1-staerke', topic: 'Elektromagnet verstärken', make() {
        return mc('Wie wird ein Elektromagnet stärker?', [
          'Mehr Windungen, grössere Stromstärke und ein Eisenkern in der Spule.',
          'Weniger Windungen und ein Holzkern.',
          'Ein dünnerer Draht und weniger Strom.',
          'Man muss den Magneten erwärmen.'],
          'Die Stärke wächst mit der Zahl der Windungen und mit der Stromstärke. Ein Eisenkern verstärkt das Magnetfeld noch einmal deutlich.');
      } },
      { id: 'm1-einaus', topic: 'Vorteil des Elektromagneten', make() {
        return mc('Ein Kran auf dem Schrottplatz hebt Autos mit einem Elektromagneten. Was ist der Vorteil gegenüber einem Dauermagneten?', [
          'Man kann ihn ausschalten, dann lässt er das Auto los.',
          'Er ist immer stärker als jeder Dauermagnet.',
          'Er braucht keine Energie.',
          'Er zieht auch Holz und Plastik an.'],
          'Ein Elektromagnet wirkt nur, solange Strom fliesst. Schaltest du aus, lässt er los. Auch Stärke und Polung lassen sich über den Strom steuern.');
      } },
      { id: 'm1-leistung', topic: 'Leistung des Elektromagneten', make() {
        const U = rnd([1.5, 3, 4.5, 6, 9, 12]), I = rnd([0.5, 1, 1.5, 2, 3]), P = U * I;
        return num(`Ein Elektromagnet wird an ${fmt(U)} V betrieben. Es fliesst ein Strom von ${fmt(I)} A. Wie gross ist die elektrische Leistung?`, 'W', P,
          'Elektrische Leistung = Spannung · Stromstärke.',
          `P = U · I = ${fmt(U)} V · ${fmt(I)} A = ${fmt(P)} W`);
      } }
    ]
  },
  {
    id: 'm2', nr: 2, title: 'Der Elektromotor', sub: 'Kraft im Magnetfeld',
    items: [
      { id: 'm2-kommutator', topic: 'Aufgabe des Kommutators', make() {
        return mc('Wozu dient der Kommutator (Polwender) in einem Gleichstrommotor?', [
          'Er kehrt die Stromrichtung in der Spule jede halbe Umdrehung um, damit sie weiterdreht.',
          'Er verstärkt die Spannung der Batterie.',
          'Er kühlt den Motor.',
          'Er bremst den Rotor ab.'],
          'Ohne Kommutator würde die Spule nach einer halben Umdrehung stehen bleiben, weil sich ihre Pole dann anziehen. Der Polwender kehrt rechtzeitig die Stromrichtung um, und die Spule dreht weiter.');
      } },
      { id: 'm2-umpolen', topic: 'Drehrichtung ändern', make() {
        return mc('Du vertauschst bei einem Gleichstrommotor die beiden Anschlüsse an der Batterie. Was passiert?', [
          'Der Motor dreht in die Gegenrichtung.',
          'Der Motor dreht gleich weiter.',
          'Der Motor bleibt stehen.',
          'Der Motor dreht doppelt so schnell.'],
          'Die Kraft im Magnetfeld hängt von der Stromrichtung ab. Kehrst du den Strom um, kehrt sich auch die Kraft um, und der Motor dreht rückwärts.');
      } },
      { id: 'm2-energie', topic: 'Energieumwandlung im Motor', make() {
        return mc('Welche Energieumwandlung findet in einem Elektromotor statt?', [
          'Elektrische Energie wird in Bewegungsenergie umgewandelt, ein Teil wird Wärme.',
          'Bewegungsenergie wird in elektrische Energie umgewandelt.',
          'Wärme wird in elektrische Energie umgewandelt.',
          'Elektrische Energie wird vollständig in Bewegung umgewandelt.'],
          'Der Motor wandelt elektrische in mechanische Energie um. Wegen Reibung und dem Widerstand der Spule wird immer ein Teil zu Wärme (Energieentwertung).');
      } },
      { id: 'm2-drehzahl', topic: 'Drehzahl und Spannung', make() {
        const U = rnd([1.5, 3, 4.5, 9, 12]), n = 3000 * U / 6;
        return num(`Ein Gleichstrommotor dreht ohne Last bei 6 V mit 3000 U/min. Rechne mit direkter Proportionalität zwischen Spannung und Drehzahl. Wie schnell dreht er bei ${fmt(U)} V ohne Last?`, 'U/min', n,
          'Berechne zuerst, wie viele Umdrehungen pro Minute es pro Volt sind (3000 : 6).',
          `3000 U/min : 6 V = 500 U/min pro V<br>n = ${fmt(U)} V · 500 U/min pro V = ${fmt(n)} U/min`);
      } },
      { id: 'm2-ups', topic: 'Umdrehungen pro Sekunde', make() {
        const n = rnd([600, 1200, 1800, 3000, 6000, 9000]), u = n / 60;
        return num(`Ein Motor dreht mit ${fmt(n)} U/min. Wie viele Umdrehungen macht er pro Sekunde?`, 'U/s', u,
          'Eine Minute hat 60 Sekunden.',
          `${fmt(n)} U/min : 60 = ${fmt(u)} Umdrehungen pro Sekunde`);
      } },
      { id: 'm2-blockiert', topic: 'Motor unter Last', ext: true, make() {
        return mc('Ein laufender Gleichstrommotor wird stark gebremst oder blockiert. Was passiert mit der Stromstärke?', [
          'Sie steigt stark an, der Motor kann überhitzen.',
          'Sie sinkt auf null.',
          'Sie bleibt immer gleich.',
          'Der Motor erzeugt dann Strom und die Batterie lädt sich auf.'],
          'Ein laufender Motor erzeugt selbst eine Gegenspannung, die den Strom begrenzt. Wird er gebremst, sinkt sie und der Strom steigt. Ein blockierter Motor nimmt sehr viel Strom auf, wird heiss und kann verbrennen. Darum niemals festhalten.');
      } }
    ]
  },
  {
    id: 'm3', nr: 3, title: 'Der Generator', sub: 'Bewegung wird zu Strom',
    items: [
      { id: 'm3-induktion', topic: 'Induktion', make() {
        return mc('Du bewegst einen Magneten in eine Spule, die an ein Voltmeter angeschlossen ist. Was beobachtest du?', [
          'Das Voltmeter zeigt eine Spannung, solange sich der Magnet bewegt.',
          'Das Voltmeter zeigt nur eine Spannung, wenn der Magnet ruhig in der Spule liegt.',
          'Das Voltmeter zeigt nichts, denn Magnete erzeugen keine Spannung.',
          'Das Voltmeter zeigt immer dieselbe Spannung.'],
          'Ändert sich das Magnetfeld in der Spule, entsteht eine Spannung (Induktion). Liegt der Magnet still, ändert sich nichts und die Spannung ist null.');
      } },
      { id: 'm3-motorgen', topic: 'Motor als Generator', make() {
        return mc('Du drehst die Achse eines kleinen Elektromotors von Hand und schliesst ein Voltmeter an. Was geschieht?', [
          'Das Voltmeter zeigt eine Spannung: Der Motor arbeitet als Generator.',
          'Nichts, ein Motor kann nur Strom verbrauchen.',
          'Der Motor wird kalt.',
          'Das Voltmeter zeigt nur eine Spannung, wenn zusätzlich eine Batterie angeschlossen ist.'],
          'Motor und Generator sind fast gleich gebaut. Wird die Achse von aussen gedreht, entsteht eine Spannung. Ein Generator ist also ein Motor, der rückwärts arbeitet.');
      } },
      { id: 'm3-kraftwerk', topic: 'Generatoren im Alltag', make() {
        return mc('Was haben Wasserkraftwerk, Windrad und Fahrraddynamo gemeinsam?', [
          'Alle treiben einen Generator an, der Bewegungsenergie in elektrische Energie umwandelt.',
          'Alle erzeugen Energie aus dem Nichts.',
          'Alle brauchen einen Verbrennungsmotor.',
          'Alle liefern nur Gleichspannung aus einer Batterie.'],
          'Wasser, Wind oder die Beine der Radfahrerin drehen einen Generator. Die Energie wird dabei nicht erzeugt, sondern von Bewegungsenergie in elektrische Energie umgewandelt.');
      } },
      { id: 'm3-spannung', topic: 'Spannung und Drehzahl', make() {
        const s = rnd([[60, 2, 150], [60, 3, 100], [120, 4, 30], [120, 6, 180], [50, 2, 125], [100, 5, 40]]);
        const U = s[1] * s[2] / s[0];
        return num(`Ein Handgenerator liefert bei ${fmt(s[0])} Umdrehungen pro Minute eine Spannung von ${fmt(s[1])} V. Rechne mit direkter Proportionalität. Welche Spannung liefert er bei ${fmt(s[2])} Umdrehungen pro Minute?`, 'V', U,
          'Wie oft so schnell wird gekurbelt? Um denselben Faktor ändert sich die Spannung.',
          `Faktor: ${fmt(s[2])} : ${fmt(s[0])} = ${fmt(s[2] / s[0])}<br>U = ${fmt(s[1])} V · ${fmt(s[2] / s[0])} = ${fmt(U)} V`);
      } },
      { id: 'm3-erhoehen', topic: 'Spannung erhöhen', make() {
        return mc('Wie lässt sich die Spannung eines Generators erhöhen?', [
          'Schneller drehen, mehr Windungen oder einen stärkeren Magneten verwenden.',
          'Langsamer drehen.',
          'Weniger Windungen verwenden.',
          'Den Magneten aus der Spule nehmen.'],
          'Die Spannung steigt, wenn sich das Magnetfeld schneller ändert (höhere Drehzahl), wenn die Spule mehr Windungen hat und wenn der Magnet stärker ist.');
      } },
      { id: 'm3-energie', topic: 'Elektrische Energie des Generators', make() {
        const s = rnd([[6, 0.5, 20], [4, 0.5, 30], [3, 1, 20], [6, 1, 10], [2, 0.5, 60], [12, 0.5, 15]]);
        const E = s[0] * s[1] * s[2];
        return num(`Ein Handgenerator liefert ${fmt(s[0])} V bei ${fmt(s[1])} A. Du kurbelst ${fmt(s[2])} s lang. Welche elektrische Energie hat er in dieser Zeit abgegeben?`, 'J', E,
          'Erst die Leistung P = U · I, dann die Energie E = P · t.',
          `P = U · I = ${fmt(s[0])} V · ${fmt(s[1])} A = ${fmt(s[0] * s[1])} W<br>E = P · t = ${fmt(s[0] * s[1])} W · ${fmt(s[2])} s = ${fmt(E)} J`);
      } }
    ]
  },
  {
    id: 'm4', nr: 4, title: 'Leistung und Wirkungsgrad', sub: 'η = P_mech : P_el',
    items: [
      { id: 'm4-pel', topic: 'Aufgenommene Leistung', make() {
        const s = rnd([[6, 0.5], [12, 2], [12, 4], [24, 5], [9, 1], [24, 2.5]]);
        const P = s[0] * s[1];
        return num(`Ein Motor wird an ${fmt(s[0])} V betrieben und nimmt ${fmt(s[1])} A auf. Welche elektrische Leistung nimmt er auf?`, 'W', P,
          'P = U · I.',
          `P_el = U · I = ${fmt(s[0])} V · ${fmt(s[1])} A = ${fmt(P)} W`);
      } },
      { id: 'm4-eta', topic: 'Wirkungsgrad berechnen', make() {
        const s = rnd([[50, 40], [100, 85], [200, 160], [500, 450], [120, 90], [80, 60]]);
        const eta = s[1] / s[0] * 100;
        return num(`Ein Motor nimmt ${fmt(s[0])} W elektrische Leistung auf und gibt ${fmt(s[1])} W mechanische Leistung ab. Wie gross ist sein Wirkungsgrad?`, '%', eta,
          'η = abgegebene Leistung : aufgenommene Leistung, dann mal 100.',
          `η = P_mech : P_el = ${fmt(s[1])} W : ${fmt(s[0])} W = ${fmt(eta / 100)} = ${fmt(eta)} %`);
      } },
      { id: 'm4-verlust', topic: 'Verlustleistung', make() {
        const P = rnd([50, 100, 200, 400]), eta = rnd([60, 70, 80, 90]), V = P * (100 - eta) / 100;
        return num(`Ein Motor nimmt ${fmt(P)} W auf und hat einen Wirkungsgrad von ${fmt(eta)} %. Wie viel Leistung geht als Wärme verloren?`, 'W', V,
          'Der Rest, der nicht abgegeben wird, geht verloren: (100 % − η) von der aufgenommenen Leistung.',
          `P_mech = ${fmt(eta / 100)} · ${fmt(P)} W = ${fmt(P * eta / 100)} W<br>Verlust = ${fmt(P)} W − ${fmt(P * eta / 100)} W = ${fmt(V)} W`);
      } },
      { id: 'm4-heben', topic: 'Hubleistung', make() {
        const s = rnd([[20, 2, 5], [10, 3, 6], [5, 2, 2], [40, 1, 5], [25, 2, 5], [50, 3, 10]]);
        const P = s[0] * 10 * s[1] / s[2];
        return num(`Ein Motor hebt eine Last von ${fmt(s[0])} kg in ${fmt(s[2])} s um ${fmt(s[1])} m. Welche mechanische Leistung gibt er dabei ab? Rechne mit g = 10 N/kg.`, 'W', P,
          'Zuerst die Hubarbeit W = m · g · h, dann P = W : t.',
          `W = ${fmt(s[0])} kg · 10 N/kg · ${fmt(s[1])} m = ${fmt(s[0] * 10 * s[1])} J<br>P_mech = W : t = ${fmt(s[0] * 10 * s[1])} J : ${fmt(s[2])} s = ${fmt(P)} W`);
      } },
      { id: 'm4-aufnahme', topic: 'Aufgenommene Leistung beim Heben', ext: true, make() {
        const s = rnd([[10, 3, 6, 50], [40, 1, 5, 80], [25, 2, 5, 80], [50, 3, 10, 75], [20, 2, 5, 80]]);
        const Pm = s[0] * 10 * s[1] / s[2], Pe = Pm / (s[3] / 100);
        return num(`Ein Motor hebt eine Last von ${fmt(s[0])} kg in ${fmt(s[2])} s um ${fmt(s[1])} m. Sein Wirkungsgrad beträgt ${fmt(s[3])} %. Welche elektrische Leistung muss er aufnehmen? Rechne mit g = 10 N/kg.`, 'W', Pe,
          'Erst P_mech berechnen (m · g · h : t). Dann P_el = P_mech : η, mit η als Anteil.',
          `P_mech = ${fmt(s[0])} kg · 10 N/kg · ${fmt(s[1])} m : ${fmt(s[2])} s = ${fmt(Pm)} W<br>P_el = P_mech : η = ${fmt(Pm)} W : ${fmt(s[3] / 100)} = ${fmt(Pe)} W`);
      } },
      { id: 'm4-waerme', topic: 'Verluste im Motor', make() {
        return mc('Wohin geht die Energie, die der Motor nicht als Bewegung abgibt?', [
          'Vor allem als Wärme, durch Reibung und den Widerstand der Spule.',
          'Sie verschwindet.',
          'Sie wird in der Batterie gespeichert.',
          'Sie wird zu Magnetismus, der sich im Gehäuse sammelt.'],
          'Energie geht nie verloren. Der Teil, der nicht als Bewegung ankommt, wird zu Wärme (Energieentwertung) und verteilt sich in der Umgebung. Darum werden Motoren warm.');
      } }
    ]
  },
  {
    id: 'm5', nr: 5, title: 'Getriebe', sub: 'Drehzahl gegen Kraft',
    items: [
      { id: 'm5-drehzahl', topic: 'Drehzahl am Getriebe', make() {
        const s = rnd([[10, 40, 1200], [12, 36, 900], [20, 60, 1500], [15, 45, 1800], [8, 32, 2000], [10, 50, 2500]]);
        const n = s[2] * s[0] / s[1];
        return num(`Ein Zahnrad mit ${fmt(s[0])} Zähnen treibt ein Zahnrad mit ${fmt(s[1])} Zähnen an und dreht mit ${fmt(s[2])} U/min. Wie schnell dreht das angetriebene Rad?`, 'U/min', n,
          'Das grössere Rad dreht langsamer. n₂ = n₁ · Zähne(treibend) : Zähne(angetrieben).',
          `n₂ = n₁ · z₁ : z₂ = ${fmt(s[2])} U/min · ${fmt(s[0])} : ${fmt(s[1])} = ${fmt(n)} U/min`);
      } },
      { id: 'm5-umdrehungen', topic: 'Umdrehungen am Getriebe', make() {
        const s = rnd([[10, 40], [12, 48], [15, 45], [10, 50], [8, 48]]);
        const u = s[1] / s[0];
        return num(`Ein kleines Zahnrad mit ${fmt(s[0])} Zähnen treibt ein grosses mit ${fmt(s[1])} Zähnen an. Wie viele Umdrehungen macht das kleine Rad, bis sich das grosse einmal gedreht hat?`, 'Umdrehungen', u,
          'Das grosse Rad hat mehr Zähne. Wie oft passt die kleine Zähnezahl hinein?',
          `${fmt(s[1])} Zähne : ${fmt(s[0])} Zähne = ${fmt(u)}`);
      } },
      { id: 'm5-kraft', topic: 'Kraft am Getriebe', make() {
        return mc('Ein Getriebe verlangsamt die Drehzahl auf einen Viertel. Was gilt (ohne Verluste) für die Kraft am Abtrieb?', [
          'Sie wird etwa viermal so gross.',
          'Sie wird auf einen Viertel kleiner.',
          'Sie bleibt gleich.',
          'Sie wird doppelt so gross.'],
          'Das ist die Goldene Regel der Mechanik am Zahnrad: Was an Drehzahl (Weg) verloren geht, gewinnst du an Kraft. Bei einem Viertel der Drehzahl hast du ungefähr die vierfache Kraft.');
      } },
      { id: 'm5-akkuschrauber', topic: 'Sinn eines Getriebes', make() {
        return mc('Warum hat ein Akkuschrauber ein Getriebe?', [
          'Es verlangsamt die Drehzahl und erhöht dafür die Kraft.',
          'Es macht den Motor schneller und die Kraft kleiner.',
          'Es lädt den Akku wieder auf.',
          'Es verhindert, dass der Motor warm wird.'],
          'Der Motor dreht schnell, aber mit wenig Kraft. Das Getriebe tauscht Drehzahl gegen Kraft, sodass die Schraube mit viel Kraft gedreht werden kann.');
      } },
      { id: 'm5-zahnzahl', topic: 'Zähnezahl bestimmen', ext: true, make() {
        const s = rnd([[12, 1800, 300], [10, 1500, 500], [15, 1200, 400], [8, 2400, 600], [20, 900, 300]]);
        const z = s[0] * s[1] / s[2];
        return num(`Ein Antriebsrad mit ${fmt(s[0])} Zähnen dreht mit ${fmt(s[1])} U/min. Das Abtriebsrad soll mit ${fmt(s[2])} U/min drehen. Wie viele Zähne braucht es?`, 'Zähne', z,
          'Stelle n₂ = n₁ · z₁ : z₂ nach z₂ um: z₂ = z₁ · n₁ : n₂.',
          `z₂ = z₁ · n₁ : n₂ = ${fmt(s[0])} · ${fmt(s[1])} : ${fmt(s[2])} = ${fmt(z)}`);
      } },
      { id: 'm5-uebersetzung', topic: 'Übersetzungsverhältnis', make() {
        const s = rnd([[10, 40], [12, 36], [20, 60], [8, 40], [15, 90]]);
        const i = s[1] / s[0];
        return num(`Das treibende Rad hat ${fmt(s[0])} Zähne, das angetriebene ${fmt(s[1])} Zähne. Wie gross ist das Übersetzungsverhältnis i = z₂ : z₁?`, ': 1', i,
          'Teile die Zähnezahl des angetriebenen Rads durch die des treibenden.',
          `i = z₂ : z₁ = ${fmt(s[1])} : ${fmt(s[0])} = ${fmt(i)}`);
      } }
    ]
  },
  {
    id: 'm6', nr: 6, title: 'Motoren im Alltag', sub: 'Akku, Reichweite, Rekuperation',
    items: [
      { id: 'm6-wh', topic: 'Akku-Energie', make() {
        const s = rnd([[12, 5], [3.7, 3], [14.8, 1.5], [36, 10], [48, 10], [7.4, 2]]);
        const E = s[0] * s[1];
        return num(`Ein Akku hat eine Spannung von ${fmt(s[0])} V und eine Kapazität von ${fmt(s[1])} Ah. Wie viel Energie kann er speichern?`, 'Wh', E,
          'Energie in Wh = Spannung in V · Kapazität in Ah.',
          `E = U · Q = ${fmt(s[0])} V · ${fmt(s[1])} Ah = ${fmt(E)} Wh`, { tolRel: 0.015 });
      } },
      { id: 'm6-laufzeit', topic: 'Laufzeit', make() {
        const s = rnd([[360, 120], [480, 240], [60, 20], [500, 250], [100, 40], [240, 60]]);
        const t = s[0] / s[1];
        return num(`Ein Akku speichert ${fmt(s[0])} Wh. Der Motor nimmt dauernd ${fmt(s[1])} W auf. Wie lange läuft er?`, 'h', t,
          'Laufzeit = Energie : Leistung. Wh geteilt durch W ergibt Stunden.',
          `t = E : P = ${fmt(s[0])} Wh : ${fmt(s[1])} W = ${fmt(t)} h`);
      } },
      { id: 'm6-reichweite', topic: 'Reichweite eines E-Bikes', ext: true, make() {
        const s = rnd([[500, 10], [360, 9], [420, 7], [450, 15], [600, 10], [300, 6]]);
        const km = s[0] / s[1];
        return num(`Der Akku eines E-Bikes speichert ${fmt(s[0])} Wh. Der Motor braucht im Schnitt ${fmt(s[1])} Wh pro Kilometer. Wie weit kommst du?`, 'km', km,
          'Reichweite = gespeicherte Energie : Energie pro Kilometer.',
          `s = ${fmt(s[0])} Wh : ${fmt(s[1])} Wh/km = ${fmt(km)} km`);
      } },
      { id: 'm6-rekuperation', topic: 'Rekuperation', make() {
        return mc('Ein Elektroauto bremst und lädt dabei den Akku ein wenig auf (Rekuperation). Wie ist das möglich?', [
          'Der Motor arbeitet beim Bremsen als Generator.',
          'Beim Bremsen entsteht Energie aus dem Nichts.',
          'Die Bremsbeläge erzeugen Strom durch Reibung.',
          'Der Akku lädt sich von selbst auf, wenn das Auto steht.'],
          'Rollt das Auto, kann es die Achse des Motors drehen. Der Motor wird zum Generator und wandelt Bewegungsenergie wieder in elektrische Energie um. So wird weniger Energie als Wärme in den Bremsen vergeudet.');
      } },
      { id: 'm6-vergleich', topic: 'Elektro- und Benzinmotor', make() {
        return mc('Ein Elektromotor hat einen Wirkungsgrad von etwa 90 %, ein Benzinmotor von etwa 30 % (Richtwerte). Was folgt daraus?', [
          'Beim Elektromotor wird ein viel grösserer Teil der zugeführten Energie zu Bewegung. Beim Benzinmotor geht über die Hälfte als Wärme verloren.',
          'Beide Motoren nutzen gleich viel Energie.',
          'Der Benzinmotor ist effizienter, weil er mehr Energie umsetzt.',
          'Ein Elektromotor erzeugt zusätzliche Energie.'],
          'Der Elektromotor nutzt rund 90 % der aufgenommenen Energie, beim Benzinmotor sind es nur rund 30 %. Für einen fairen Gesamtvergleich zählt aber auch, wie der Strom erzeugt wurde.');
      } },
      { id: 'm6-kv', topic: 'Drohnenmotor und kV', ext: true, make() {
        const s = rnd([[2000, 11.1], [2300, 14.8], [1800, 22.2], [2600, 7.4], [3000, 3.7], [1400, 22.2]]);
        const n = s[0] * s[1];
        return num(`Ein Drohnenmotor hat die Angabe ${fmt(s[0])} kV. Das heisst: ${fmt(s[0])} Umdrehungen pro Minute pro Volt ohne Last (nicht Kilovolt). Wie schnell dreht er ohne Last an einem Akku mit ${fmt(s[1])} V?`, 'U/min', n,
          'Drehzahl = kV-Wert · Spannung.',
          `n = ${fmt(s[0])} U/min pro V · ${fmt(s[1])} V = ${fmt(n)} U/min`, { tolRel: 0.015 });
      } }
    ]
  }
];

/* ---------- Lerninhalt: Lektionskarten pro Station ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;
const tri = (top, l, r) => `<div class="tri" role="img" aria-label="Formeldreieck: oben ${top}, unten ${l} und ${r}"><div class="tri-top mono">${top}</div><div class="tri-row"><div class="mono">${l}</div><div class="mono">${r}</div></div></div>`;

const LESSONS = {
  m1: [
    { h: 'Magnetpole und Magnetfeld',
      body: `<p>Jeder Magnet hat einen <b>Nordpol</b> und einen <b>Südpol</b>. Zwischen Magneten wirken Kräfte:</p>
        ${merk('Gleichnamige Pole <b>stossen sich ab</b>.<br>Ungleichnamige Pole <b>ziehen sich an</b>.')}
        <p>Schneidest du einen Magneten durch, hat jedes Stück wieder zwei Pole. Einzelne Pole gibt es nicht.</p>
        <p>Um einen Magneten herum gibt es ein <b>Magnetfeld</b>. Du kannst es dir als Linien vorstellen, die ausserhalb des Magneten vom Nordpol zum Südpol laufen. Eisenfeilspäne machen es sichtbar.</p>` },
    { h: 'Strom macht Magnetismus',
      body: `<p>Ein elektrischer Strom ist immer von einem Magnetfeld umgeben. Das zeigt ein Kompass neben einem Draht: Sobald Strom fliesst, schlägt die Nadel aus.</p>
        <p>Wickelst du den Draht zu einer <b>Spule</b>, addieren sich die Magnetfelder der Windungen. Die Spule wirkt wie ein Stabmagnet. Steckst du einen <b>Eisenkern</b> hinein, wird das Feld viel stärker. Das ist ein <b>Elektromagnet</b>.</p>
        ${merk('Elektromagnet: Er wirkt nur, solange Strom fliesst.<br>Kehrst du den Strom um, vertauschen sich Nord- und Südpol.')}` },
    { h: 'Baue einen Elektromagneten',
      body: '<p>Verändere Windungen, Stromstärke und Kern. Das Bild ist ein Modell: Es zeigt, wie sich die Stärke ändert, nicht reale Messwerte.</p>', sim: 'magnet' },
    { h: 'Sicherheit',
      body: warnbox('<b>Draht und Batterie können heiss werden.</b><br>Eine Spule an einer Batterie nimmt viel Strom auf. Schalte nur kurz ein und berühre den Draht nicht, wenn er lange verbunden war. Schliesse eine Batterie nie direkt kurz.') },
    { h: 'Kurz testen',
      check: { q: 'Welche Änderung macht einen Elektromagneten schwächer?',
        options: ['Weniger Windungen wickeln.', 'Einen Eisennagel in die Spule stecken.', 'Mehr Windungen wickeln.', 'Mehr Strom durch die Spule schicken.'],
        explain: 'Weniger Windungen schwächen den Elektromagneten. Mehr Windungen, mehr Strom und ein Eisenkern machen ihn stärker.' } }
  ],
  m2: [
    { h: 'So ist ein Motor gebaut',
      body: `<p>Ein einfacher <b>Gleichstrommotor</b> besteht aus vier Teilen:</p>
        <ul><li><b>Magnet</b> (Stator): steht fest und liefert das Magnetfeld.</li>
        <li><b>Spule</b> (Rotor): dreht sich und wird vom Strom zum Elektromagneten.</li>
        <li><b>Kommutator</b> (Polwender): kehrt die Stromrichtung in der Spule um.</li>
        <li><b>Schleifkontakte</b>: führen den Strom zum drehenden Teil.</li></ul>
        ${merk('Elektromotor: Elektrische Energie wird in Bewegungsenergie umgewandelt.')}` },
    { h: 'Warum dreht er?',
      body: `<p>Fliesst Strom durch die Spule, wird sie zum Elektromagneten. Ihre Pole werden vom festen Magneten abgestossen und angezogen. Die Spule beginnt sich zu drehen.</p>
        <p>Nach einer halben Umdrehung würden sich die Pole anziehen und die Spule bliebe stehen. Darum kehrt der <b>Kommutator</b> genau dann die Stromrichtung um, und die Spule dreht weiter.</p>
        ${merk('Die Kraft im Magnetfeld hängt von der Stromrichtung ab.<br>Strom umpolen: Der Motor dreht in die andere Richtung.')}` },
    { h: 'Dreh am Regler',
      body: '<p>Der Beispielmotor dreht ohne Last mit 500 U/min pro Volt. Die Animation läuft in Zeitlupe. Ändere die Spannung und vertausche die Polung.</p>', sim: 'motor' },
    { h: 'Vorgerechnet: Drehzahl', worked: {
      given: 'Ein Motor dreht ohne Last bei 6 V mit 3000 U/min. Wie schnell dreht er bei 9 V? Rechne mit direkter Proportionalität.',
      steps: [['Drehzahl pro Volt', '3000 U/min : 6 V = 500 U/min pro V'], ['Neue Drehzahl', '9 V · 500 U/min pro V = 4500 U/min'], ['In Umdrehungen pro Sekunde', '4500 U/min : 60 = 75 U/s'], ['Antwort', 'Bei 9 V dreht der Motor ohne Last mit etwa 4500 U/min. Unter Last ist er langsamer.']] } },
    { h: 'Wenn der Motor blockiert',
      body: warnbox('<b>Halte einen laufenden Motor nie fest.</b><br>Ein gebremster oder blockierter Motor nimmt sehr viel Strom auf. Er wird heiss, und Draht und Batterie können beschädigt werden. Schalte sofort aus, wenn sich der Motor nicht dreht.') },
    { h: 'Kurz testen',
      check: { q: 'Du vertauschst die beiden Anschlüsse eines Gleichstrommotors an der Batterie. Was passiert?',
        options: ['Er dreht in die andere Richtung.', 'Er dreht gleich weiter.', 'Er bleibt stehen.', 'Er dreht doppelt so schnell.'],
        explain: 'Wird die Stromrichtung umgekehrt, kehrt sich die Kraft im Magnetfeld um. Der Motor dreht rückwärts.' } }
  ],
  m3: [
    { h: 'Strom aus Bewegung',
      body: `<p>Bewegst du einen Magneten in einer Spule, entsteht in der Spule eine Spannung. Das heisst <b>Induktion</b>.</p>
        ${merk('Die Spannung entsteht nur, solange sich das Magnetfeld in der Spule ändert.<br>Ruhender Magnet: keine Spannung.')}
        <p>Die Spannung wird grösser, wenn du den Magneten schneller bewegst, wenn die Spule mehr Windungen hat oder wenn der Magnet stärker ist.</p>` },
    { h: 'Der Generator',
      body: `<p>Ein <b>Generator</b> ist fast gleich gebaut wie ein Motor. Wird er von aussen gedreht, liefert er Spannung. Er ist ein Motor, der rückwärts arbeitet.</p>
        <p>Angetrieben wird er zum Beispiel von Wasser (Wasserkraftwerk), Wind (Windrad), den Beinen (Fahrraddynamo) oder einer Kurbel.</p>
        ${merk('Generator: Bewegungsenergie wird in elektrische Energie umgewandelt.')}
        <p>Die Steckdose liefert Wechselspannung mit 50 Hz: Die Richtung des Stroms wechselt 100-mal pro Sekunde.</p>` },
    { h: 'Dreh die Kurbel',
      body: '<p>Der Beispielgenerator liefert bei 100 Windungen 0,05 V pro U/min. Ändere die Kurbeldrehzahl und die Windungen und beobachte die Lampe. Das Bild ist ein Modell.</p>', sim: 'generator' },
    { h: 'Vorgerechnet: Drehzahl und Spannung', worked: {
      given: 'Ein Handgenerator liefert bei 60 U/min eine Spannung von 2 V. Welche Spannung liefert er bei 150 U/min? Rechne mit direkter Proportionalität.',
      steps: [['Faktor bestimmen', '150 U/min : 60 U/min = 2,5'], ['Spannung berechnen', 'U = 2 V · 2,5 = 5 V'], ['Antwort', 'Bei 150 U/min liefert der Generator etwa 5 V.']] } },
    { h: 'Energie kommt nicht aus dem Nichts',
      body: `<p>Ein Generator erzeugt keine Energie. Du musst kurbeln, und je mehr Strom du entnimmst, desto schwerer lässt sich die Kurbel drehen.</p>
        ${merk('Elektrische Energie des Generators = Bewegungsenergie, die du hineinsteckst, abzüglich der Verluste (Wärme).')}` },
    { h: 'Kurz testen',
      check: { q: 'Du drehst einen Generator doppelt so schnell. Was ändert sich?',
        options: ['Die Spannung wird ungefähr doppelt so gross.', 'Die Spannung bleibt gleich.', 'Die Spannung wird halbiert.', 'Die Spannung wird null.'],
        explain: 'Die Spannung ist ungefähr proportional zur Drehzahl. Doppelt so schnell drehen ergibt ungefähr die doppelte Spannung.' } }
  ],
  m4: [
    { h: 'Leistung des Motors',
      body: `<p>Ein Motor nimmt elektrische Leistung auf und gibt mechanische Leistung ab. Ein Teil geht als Wärme verloren.</p>
        ${merk('Aufgenommen: <b>P_el = U · I</b><br>Abgegeben: <b>P_mech</b> (zum Beispiel Hubleistung = m · g · h : t)<br>Wirkungsgrad: <b>η = P_mech : P_el</b>')}
        <p>Den Wirkungsgrad kennst du schon aus der Leistungs-App. Hier wenden wir ihn auf Motoren an.</p>` },
    { h: 'Stelle den Motor ein',
      body: '<p>Verändere Spannung, Stromstärke und Wirkungsgrad. Schau, wie sich die aufgenommene und die abgegebene Leistung unterscheiden.</p>', sim: 'motorflow' },
    { h: 'Vorgerechnet: Last heben', worked: {
      given: 'Ein Motor hebt eine Last von 20 kg in 5 s um 2 m. Dabei nimmt er 100 W auf. Wie gross ist sein Wirkungsgrad?',
      steps: [['Gewichtskraft', 'F = 20 kg · 10 N/kg = 200 N'], ['Hubarbeit', 'W = F · h = 200 N · 2 m = 400 J'], ['Abgegebene Leistung', 'P_mech = W : t = 400 J : 5 s = 80 W'], ['Wirkungsgrad', 'η = 80 W : 100 W = 0,8 = 80 %'], ['Antwort', 'Der Wirkungsgrad beträgt 80 %. 20 W gehen als Wärme verloren.']] } },
    { h: 'Warum wird der Motor warm?',
      body: `<p>Die Verluste haben drei Hauptursachen:</p>
        <ul><li>Der <b>Widerstand der Spule</b> macht aus einem Teil des Stroms Wärme.</li>
        <li><b>Reibung</b> in Lagern und an den Schleifkontakten.</li>
        <li>Verluste im Eisen durch das wechselnde Magnetfeld.</li></ul>
        <p>Gute Elektromotoren erreichen oft über 80 % Wirkungsgrad. Das ist ein Richtwert und hängt vom Motor ab.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Motor nimmt 200 W auf und gibt 150 W ab. Wie gross ist der Wirkungsgrad?',
        options: ['75 %', '25 %', '133 %', '50 %'],
        explain: 'η = 150 W : 200 W = 0,75 = 75 %.' } }
  ],
  m5: [
    { h: 'Zahnräder übersetzen',
      body: `<p>Zahnräder greifen ineinander. Das Verhältnis der Zähnezahlen bestimmt, wie sich die Drehzahl ändert.</p>
        ${merk('Übersetzungsverhältnis: <b>i = z₂ : z₁</b><br>Drehzahl am Abtrieb: <b>n₂ = n₁ · z₁ : z₂</b>')}
        <p>z₁ ist die Zähnezahl des treibenden, z₂ die des angetriebenen Rads. Treibt ein kleines Rad ein grosses an, dreht das grosse Rad langsamer.</p>` },
    { h: 'Zwei Zahnräder',
      body: '<p>Das linke Rad treibt das rechte an. Verändere die Zähnezahlen und die Antriebsdrehzahl. Die Animation läuft in Zeitlupe.</p>', sim: 'gear' },
    { h: 'Vorgerechnet: Getriebe', worked: {
      given: 'Das Antriebsrad hat 10 Zähne und dreht mit 1200 U/min. Das Abtriebsrad hat 40 Zähne. Wie schnell dreht es? Und was gilt für die Kraft?',
      steps: [['Übersetzungsverhältnis', 'i = z₂ : z₁ = 40 : 10 = 4'], ['Drehzahl am Abtrieb', 'n₂ = n₁ : i = 1200 U/min : 4 = 300 U/min'], ['Kraft', 'Die Drehzahl wird viermal kleiner, also wird die Kraft (ohne Verluste) etwa viermal grösser.'], ['Antwort', 'Das Abtriebsrad dreht mit 300 U/min und hat etwa die vierfache Kraft.']] } },
    { h: 'Die Goldene Regel am Getriebe',
      body: `<p>Du kennst die Goldene Regel der Mechanik von der schiefen Ebene: Was du an Kraft sparst, musst du an Weg zugeben. Beim Getriebe gilt dasselbe:</p>
        ${merk('Was du an <b>Drehzahl</b> verlierst, gewinnst du an <b>Kraft</b>.<br>Die Leistung bleibt gleich (ohne Verluste).')}
        <p>Darum haben Akkuschrauber und E-Bikes ein Getriebe: Der Motor dreht schnell, am Rad braucht es aber Kraft.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein kleines Zahnrad treibt ein grosses an. Was stimmt?',
        options: ['Das grosse Rad dreht langsamer, hat aber mehr Kraft.', 'Das grosse Rad dreht schneller und hat mehr Kraft.', 'Beide Räder drehen gleich schnell.', 'Das grosse Rad dreht schneller, hat aber weniger Kraft.'],
        explain: 'Das grosse Rad hat mehr Zähne und dreht deshalb langsamer. Dafür ist seine Kraft grösser, denn Drehzahl wird gegen Kraft getauscht.' } }
  ],
  m6: [
    { h: 'Energie im Akku',
      body: `<p>Auf einem Akku stehen Spannung (V) und Kapazität (Ah). Daraus berechnest du die gespeicherte Energie:</p>
        ${merk('<b>E = U · Q</b> (in Wh = V · Ah)<br>Laufzeit: <b>t = E : P</b>')}
        <p>1 Wh sind 3600 J. Ein Akku mit 12 V und 5 Ah speichert 60 Wh. Nimmt ein Motor 20 W auf, läuft er 3 Stunden.</p>` },
    { h: 'Rechne mit dem Akku',
      body: '<p>Stelle Akku und Verbraucher ein und beobachte, wie lange die Energie reicht. Das Bild ist ein Modell ohne Verluste.</p>', sim: 'runtime' },
    { h: 'Vorgerechnet: E-Bike', worked: {
      given: 'Ein E-Bike-Akku hat 36 V und 10 Ah. Der Motor braucht im Schnitt 12 Wh pro Kilometer. Wie weit kommst du?',
      steps: [['Gespeicherte Energie', 'E = U · Q = 36 V · 10 Ah = 360 Wh'], ['Reichweite', 's = 360 Wh : 12 Wh/km = 30 km'], ['Antwort', 'Du kommst etwa 30 km weit. Steigungen und Gegenwind verkürzen die Strecke.']] } },
    { h: 'Motor und Generator in einem',
      body: `<p>Ein Elektromotor kann auch als Generator arbeiten. Beim Bremsen eines Elektroautos oder E-Bikes wird er von den Rädern gedreht und lädt den Akku ein wenig auf. Das heisst <b>Rekuperation</b>.</p>
        <p>Elektromotoren haben einen hohen Wirkungsgrad (Richtwert rund 90 %), Benzinmotoren nur rund 30 %. Für einen fairen Vergleich zählt aber auch, wie der Strom erzeugt wurde.</p>` },
    { h: 'Zusatz: Drohnenmotoren',
      body: `<p>Bei Drohnenmotoren steht oft ein <b>kV-Wert</b>. Das bedeutet nicht Kilovolt, sondern: Umdrehungen pro Minute pro Volt ohne Last.</p>
        ${merk('Leerlaufdrehzahl = kV-Wert · Spannung<br>Beispiel: 2300 kV an 14,8 V: 2300 · 14,8 \u2248 34\u202F040 U/min')}
        <p>Der Propeller bremst den Motor. Im Flug dreht er also langsamer als im Leerlauf.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Akku hat 12 V und 5 Ah. Wie viel Energie speichert er?',
        options: ['60 Wh', '17 Wh', '2,4 Wh', '600 Wh'],
        explain: 'E = U · Q = 12 V · 5 Ah = 60 Wh.' } }
  ]
};
const lc = (id, h) => LESSONS[id].find(c => c.h === h);
const GOALS = {
  m1: ['Magnetpole und Magnetfeld beschreiben', 'erklären, wie ein Elektromagnet funktioniert und stärker wird'],
  m2: ['die Teile eines Gleichstrommotors benennen', 'erklären, warum er sich dreht und wie sich die Drehrichtung ändert'],
  m3: ['Induktion erklären', 'beschreiben, wie ein Generator Bewegung in Strom umwandelt'],
  m4: ['die aufgenommene und abgegebene Leistung eines Motors berechnen', 'den Wirkungsgrad eines Motors bestimmen'],
  m5: ['Drehzahl und Übersetzung eines Getriebes berechnen', 'die Goldene Regel am Getriebe erklären'],
  m6: ['Akku-Energie, Laufzeit und Reichweite berechnen', 'Rekuperation und den Wirkungsgrad von Motoren einordnen']
};
const LEARN = {
  'm1-pole': 'Magnetpole und Magnetfeld', 'm1-abstossen': 'Magnetpole und Magnetfeld', 'm1-oersted': 'Strom macht Magnetismus', 'm1-staerke': 'Baue einen Elektromagneten', 'm1-einaus': 'Strom macht Magnetismus', 'm1-leistung': 'Strom macht Magnetismus',
  'm2-kommutator': 'Warum dreht er?', 'm2-umpolen': 'Warum dreht er?', 'm2-energie': 'So ist ein Motor gebaut', 'm2-drehzahl': 'Vorgerechnet: Drehzahl', 'm2-ups': 'Vorgerechnet: Drehzahl', 'm2-blockiert': 'Wenn der Motor blockiert',
  'm3-induktion': 'Strom aus Bewegung', 'm3-motorgen': 'Der Generator', 'm3-kraftwerk': 'Der Generator', 'm3-spannung': 'Vorgerechnet: Drehzahl und Spannung', 'm3-erhoehen': 'Strom aus Bewegung', 'm3-energie': 'Energie kommt nicht aus dem Nichts',
  'm4-pel': 'Leistung des Motors', 'm4-eta': 'Leistung des Motors', 'm4-verlust': 'Leistung des Motors', 'm4-heben': 'Vorgerechnet: Last heben', 'm4-aufnahme': 'Vorgerechnet: Last heben', 'm4-waerme': 'Warum wird der Motor warm?',
  'm5-drehzahl': 'Zahnräder übersetzen', 'm5-umdrehungen': 'Zahnräder übersetzen', 'm5-kraft': 'Die Goldene Regel am Getriebe', 'm5-akkuschrauber': 'Die Goldene Regel am Getriebe', 'm5-zahnzahl': 'Vorgerechnet: Getriebe', 'm5-uebersetzung': 'Zahnräder übersetzen',
  'm6-wh': 'Energie im Akku', 'm6-laufzeit': 'Energie im Akku', 'm6-reichweite': 'Vorgerechnet: E-Bike', 'm6-rekuperation': 'Motor und Generator in einem', 'm6-vergleich': 'Motor und Generator in einem', 'm6-kv': 'Zusatz: Drohnenmotoren'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Spielzeugmotor', pw: 'ca. 1 W' },
  { xp: 80, name: 'Ventilator', pw: 'ca. 50 W' },
  { xp: 200, name: 'Akkuschrauber', pw: 'ca. 300 W' },
  { xp: 380, name: 'Elektroauto', pw: 'ca. 100 kW' },
  { xp: 620, name: 'Lokomotive', pw: 'ca. 6 MW' },
  { xp: 920, name: 'Kraftwerk', pw: 'MW und mehr' }
];

/* ---------- Thema: Elektromotor und Generator ---------- */
const TOPIC = {
  id: 'motor', storeKey: 'halingen-motor-lernapp-v1', other: { title: 'Leistung: Wie schnell wird Energie umgewandelt?', href: 'index.html' },
  title: 'Motor', lead: 'Wie wird aus Strom Bewegung und aus Bewegung Strom?', tag: 'Natur und Technik',
  tips: ['Ein Generator ist ein Motor, der rückwärts arbeitet.', 'Kein Motor schafft einen Wirkungsgrad über 100 %.'],
  formulas: [
    ['Elektromagnet', 'mehr Windungen, mehr Strom', 'Eisenkern verstärkt'],
    ['Drehzahl (Näherung)', 'n ~ U', 'ohne Last proportional zur Spannung'],
    ['Elektrische Leistung', 'P = U \u00B7 I', 'I = P : U'],
    ['Hubleistung', 'P = m \u00B7 g \u00B7 h : t', 'g = 10 N/kg'],
    ['Wirkungsgrad', '\u03B7 = P_mech : P_el', 'Verlust = P_el \u2212 P_mech'],
    ['Getriebe', 'n2 = n1 \u00B7 z1 : z2', 'i = z2 : z1'],
    ['Akku-Energie', 'E = U \u00B7 Q', 'Wh = V \u00B7 Ah, t = E : P'],
    ['Leerlaufdrehzahl', 'n = kV \u00B7 U', 'kV: U/min pro Volt']
  ]
};

/* ---------- Simulationen ---------- */
const SIMS = {
  magnet(el) {
    el.innerHTML = `<div class="sim"><div class="magvis"><div class="nail" aria-hidden="true"><div class="coil" id="coil"></div><div class="core" id="core"></div></div>
      <div class="clips" id="clips" aria-hidden="true"></div></div>
      <div class="brow"><span class="bname">Stärke</span><div class="btrack"><div class="bfill" id="bS"></div></div><b class="mono bval" id="vS"></b></div>
      ${sl('N', 'Windungen', 5, 50, 5, 30, '')}${sl('I', 'Stromstärke', 0.5, 3, 0.5, 1.5, 'A')}
      <label class="chk"><input type="checkbox" id="kern" checked> Eisenkern in der Spule</label>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    const clips = $id('clips');
    for (let i = 0; i < 12; i++) { const c = document.createElement('i'); c.className = 'clip'; clips.appendChild(c); }
    function upd() {
      const N = +$id('N').value, I = +$id('I').value, kern = $id('kern').checked;
      const s = N * I * (kern ? 5 : 1), rel = s / (50 * 3 * 5), n = Math.round(rel * 12);
      $id('Nv').textContent = fmt(N); $id('Iv').textContent = fmt(I);
      $id('bS').style.width = Math.max(2, rel * 100) + '%'; $id('vS').textContent = Math.round(rel * 100) + ' %';
      $id('core').style.opacity = kern ? 1 : 0.15;
      $id('coil').style.setProperty('--turns', Math.round(N / 5));
      clips.querySelectorAll('.clip').forEach((c, i) => c.classList.toggle('on', i < n));
      $id('ro').innerHTML = `Modell: Stärke ~ Windungen · Stromstärke${kern ? ' · 5 (Eisenkern)' : ''}<br>${n} von 12 Büroklammern halten.`;
    }
    ['N', 'I'].forEach(i => $id(i).addEventListener('input', upd));
    $id('kern').addEventListener('change', upd);
    upd();
  },

  motor(el) {
    el.innerHTML = `<div class="sim"><div class="motorvis"><div class="pole n mono" aria-hidden="true">N</div><div class="rotorbox" aria-hidden="true"><div class="rotor" id="rotor"></div><div class="axis"></div></div><div class="pole s mono" aria-hidden="true">S</div></div>
      <div class="trio"><div><span class="k">Drehzahl</span><b class="mono" id="rpm"></b></div><div><span class="k">Pro Sekunde</span><b class="mono" id="rps"></b></div><div><span class="k">Richtung</span><b class="mono" id="dir"></b></div></div>
      ${sl('U', 'Spannung', 0, 12, 1, 6, 'V')}
      <button class="btn sm" id="flip">Polung umkehren</button>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let dir = 1;
    function upd() {
      const U = +$id('U').value, n = 500 * U, r = $id('rotor');
      $id('Uv').textContent = fmt(U);
      $id('rpm').textContent = fmt(n) + ' U/min'; $id('rps').textContent = fmt(n / 60, 1) + ' U/s';
      $id('dir').textContent = dir > 0 ? 'rechtsherum' : 'linksherum';
      r.style.animationDuration = n > 0 ? (1.2 * 6000 / n) + 's' : '1s';
      r.style.animationDirection = dir > 0 ? 'normal' : 'reverse';
      r.style.animationPlayState = n > 0 && !reduced() ? 'running' : 'paused';
      $id('ro').innerHTML = `n = ${fmt(U)} V · 500 U/min pro V = <b>${fmt(n)} U/min</b><br>Die Animation ist in Zeitlupe.`;
    }
    $id('U').addEventListener('input', upd);
    $id('flip').addEventListener('click', () => { dir = -dir; upd(); });
    upd();
  },

  generator(el) {
    el.innerHTML = `<div class="sim"><div class="genvis"><div class="crank" aria-hidden="true"><div class="crankarm" id="arm"></div></div><div class="lampwrap" aria-hidden="true"><div class="lamp" id="lamp"></div><span class="small">Lampe</span></div></div>
      <div class="trio"><div><span class="k">Kurbel</span><b class="mono" id="kn"></b></div><div><span class="k">Windungen</span><b class="mono" id="kw"></b></div><div><span class="k">Spannung</span><b class="mono" id="ku"></b></div></div>
      ${sl('n', 'Kurbeldrehzahl', 0, 240, 20, 60, 'U/min')}
      <div class="seg3" role="group" aria-label="Windungen"><button class="btn sm on" data-w="100">100 Windungen</button><button class="btn sm" data-w="200">200 Windungen</button></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let W = 100;
    function upd() {
      const n = +$id('n').value, U = 0.05 * n * (W / 100), arm = $id('arm');
      $id('nv').textContent = fmt(n);
      $id('kn').textContent = fmt(n) + ' U/min'; $id('kw').textContent = String(W); $id('ku').textContent = fmt(U, 1) + ' V';
      $id('lamp').style.opacity = (0.12 + 0.88 * Math.min(1, U / 24)).toFixed(2);
      arm.style.animationDuration = n > 0 ? (60 / n * 4) + 's' : '1s';
      arm.style.animationPlayState = n > 0 && !reduced() ? 'running' : 'paused';
      $id('ro').innerHTML = `U = ${fmt(n)} U/min · 0,05 V pro U/min${W === 200 ? ' · 2 (doppelte Windungen)' : ''} = <b>${fmt(U, 1)} V</b>`;
      el.querySelectorAll('[data-w]').forEach(b => b.classList.toggle('on', +b.dataset.w === W));
    }
    $id('n').addEventListener('input', upd);
    el.querySelectorAll('[data-w]').forEach(b => b.addEventListener('click', () => { W = +b.dataset.w; upd(); }));
    upd();
  },

  motorflow(el) {
    el.innerHTML = `<div class="sim">${brow('Aufgenommen', 'fE', 'vE')}${brow('Abgegeben', 'fM', 'vM')}${brow('Wärme', 'fW', 'vW')}
      <p class="readout" id="ro" aria-live="polite"></p>
      ${sl('U', 'Spannung', 3, 24, 1, 12, 'V')}${sl('I', 'Stromstärke', 0.5, 10, 0.5, 2, 'A')}${sl('eta', 'Wirkungsgrad \u03B7', 50, 95, 5, 80, '%')}</div>`;
    ['fE', 'fM', 'fW'].forEach(i => { $id(i).style.width = '0%'; });
    function upd() {
      const U = +$id('U').value, I = +$id('I').value, eta = +$id('eta').value;
      const Pe = U * I, Pm = Pe * eta / 100, Pw = Pe - Pm;
      $id('Uv').textContent = fmt(U); $id('Iv').textContent = fmt(I); $id('etav').textContent = fmt(eta);
      $id('fE').style.width = '100%'; $id('fM').style.width = (Pm / Pe * 100) + '%'; $id('fW').style.width = (Pw / Pe * 100) + '%';
      $id('vE').textContent = fmt(Pe, 1) + ' W'; $id('vM').textContent = fmt(Pm, 1) + ' W'; $id('vW').textContent = fmt(Pw, 1) + ' W';
      $id('ro').innerHTML = `P_el = ${fmt(U)} V \u00B7 ${fmt(I)} A = <b>${fmt(Pe, 1)} W</b><br>P_mech = ${fmt(eta / 100)} \u00B7 ${fmt(Pe, 1)} W = <b>${fmt(Pm, 1)} W</b>`;
    }
    ['U', 'I', 'eta'].forEach(i => $id(i).addEventListener('input', upd));
    nf(el, upd);
    $id('Uv').textContent = '12'; $id('Iv').textContent = '2'; $id('etav').textContent = '80';
  },

  gear(el) {
    el.innerHTML = `<div class="sim"><div class="gearvis" aria-hidden="true"><div class="gearbox"><div class="gear g1" id="g1"></div><span class="mono gl" id="gl1"></span></div><div class="gearbox"><div class="gear g2" id="g2"></div><span class="mono gl" id="gl2"></span></div></div>
      <div class="trio"><div><span class="k">Übersetzung</span><b class="mono" id="gi"></b></div><div><span class="k">Abtrieb</span><b class="mono" id="gn"></b></div><div><span class="k">Kraft</span><b class="mono" id="gf"></b></div></div>
      ${sl('z1', 'Zähne treibendes Rad', 8, 24, 2, 10, '')}${sl('z2', 'Zähne angetriebenes Rad', 8, 48, 2, 40, '')}${sl('n1', 'Antriebsdrehzahl', 600, 3000, 300, 1200, 'U/min')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const z1 = +$id('z1').value, z2 = +$id('z2').value, n1 = +$id('n1').value, i = z2 / z1, n2 = n1 / i;
      $id('z1v').textContent = fmt(z1); $id('z2v').textContent = fmt(z2); $id('n1v').textContent = fmt(n1);
      $id('gi').textContent = fmt(i, 2) + ' : 1'; $id('gn').textContent = fmt(n2) + ' U/min'; $id('gf').textContent = fmt(i, 2) + '-fach';
      const g1 = $id('g1'), g2 = $id('g2');
      g1.style.width = g1.style.height = (30 + z1 * 3) + 'px'; g2.style.width = g2.style.height = (30 + z2 * 3) + 'px';
      $id('gl1').textContent = z1 + ' Zähne'; $id('gl2').textContent = z2 + ' Zähne';
      const d1 = 60 / n1 * 8;
      g1.style.animationDuration = d1 + 's'; g2.style.animationDuration = (d1 * i) + 's';
      g1.style.animationPlayState = g2.style.animationPlayState = reduced() ? 'paused' : 'running';
      $id('ro').innerHTML = `i = ${fmt(z2)} : ${fmt(z1)} = <b>${fmt(i, 2)}</b><br>n\u2082 = ${fmt(n1)} U/min : ${fmt(i, 2)} = <b>${fmt(n2)} U/min</b><br>Kraft am Abtrieb: etwa ${fmt(i, 2)}-mal grösser (ohne Verluste)`;
    }
    ['z1', 'z2', 'n1'].forEach(i => $id(i).addEventListener('input', upd));
    upd();
  },

  runtime(el) {
    el.innerHTML = `<div class="sim"><div class="battvis" aria-hidden="true"><div class="batt"><div class="battfill" id="bf"></div></div><div class="battcap"></div></div>
      <div class="trio"><div><span class="k">Energie</span><b class="mono" id="rE"></b></div><div><span class="k">Verbrauch</span><b class="mono" id="rP"></b></div><div><span class="k">Laufzeit</span><b class="mono" id="rt"></b></div></div>
      ${sl('U', 'Akkuspannung', 3.7, 48, 0.1, 12, 'V')}${sl('Q', 'Kapazität', 1, 20, 0.5, 5, 'Ah')}${sl('P', 'Motorleistung', 10, 500, 10, 60, 'W')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    $id('bf').style.height = '0%';
    function upd() {
      const U = +$id('U').value, Q = +$id('Q').value, P = +$id('P').value, E = U * Q, t = E / P;
      $id('Uv').textContent = fmt(U, 1); $id('Qv').textContent = fmt(Q, 1); $id('Pv').textContent = fmt(P);
      $id('rE').textContent = fmt(E, 1) + ' Wh'; $id('rP').textContent = fmt(P) + ' W';
      $id('rt').textContent = t >= 1 ? fmt(t, 1) + ' h' : fmt(t * 60, 0) + ' min';
      $id('bf').style.height = Math.min(100, t / 10 * 100) + '%';
      $id('ro').innerHTML = `E = ${fmt(U, 1)} V \u00B7 ${fmt(Q, 1)} Ah = <b>${fmt(E, 1)} Wh</b><br>t = ${fmt(E, 1)} Wh : ${fmt(P)} W = <b>${fmt(t, 2)} h</b>`;
    }
    ['U', 'Q', 'P'].forEach(i => $id(i).addEventListener('input', upd));
    nf(el, upd);
    $id('Uv').textContent = '12'; $id('Qv').textContent = '5'; $id('Pv').textContent = '60';
  }
};




export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"motor","titel":"Elektromotor und Generator","kapitel":"Vertiefung Motor"});
