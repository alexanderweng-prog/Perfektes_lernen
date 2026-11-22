// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs aus fantasy-lernapp/src/chapters/nt8-1.js
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


/* ---------- Inhalt: 8_1 Stromkreise untersuchen, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'k1', nr: 1, title: 'Stromkreise und Fehlersuche', sub: 'Wenn ein Gerät nicht funktioniert',
    items: [
      { id: 'k1-geschlossen', topic: 'Geschlossener Stromkreis', make() {
        return mc('Was muss gelten, damit eine Lampe in einem Stromkreis leuchtet?', ['Der Stromkreis muss geschlossen sein.', 'Der Stromkreis muss offen sein.', 'Es braucht nur ein Kabel zur Batterie.', 'Die Lampe muss kalt sein.'],
          'Der Strom fliesst nur, wenn der Stromkreis von der Quelle durch das Gerät und zurück geschlossen ist.');
      } },
      { id: 'k1-kabel', topic: 'Zwei Leiter im Kabel', make() {
        return mc('Eine Tischlampe hat scheinbar nur ein Kabel zur Steckdose. Wie funktioniert der Stromkreis?', ['Im Kabel liegen zwei Leiter: einer hin, einer zurück.', 'Ein Leiter genügt, der Strom kehrt durch die Luft zurück.', 'Der Stromkreis ist offen und die Lampe leuchtet trotzdem.', 'Das Kabel ist leer.'],
          'Ein Kabel enthält mehrere Leiter. Für einen Stromkreis braucht es immer einen Hin- und einen Rückweg.');
      } },
      { id: 'k1-schalter', topic: 'Schalter und Sicherung', make() {
        return mc('Was macht ein Schalter und was ist eine Sicherung?', ['Ein Schalter schliesst oder unterbricht den Stromkreis. Eine Sicherung ist ein besonderer Schalter, der bei zu grosser Stromstärke öffnet.', 'Ein Schalter erzeugt Strom. Eine Sicherung speichert ihn.', 'Beide verstärken den Strom.', 'Beide sind nur Zierde.'],
          'Mit dem Schalter schaltest du ein und aus. Die Sicherung schützt, indem sie den Stromkreis selbst unterbricht, wenn es zu gefährlich wird.');
      } },
      { id: 'k1-fehler', topic: 'Fehlersuche', make() {
        return mc('Ein Haushaltgerät funktioniert nicht mehr. Wie gehst du sicher vor?', ['Zuerst den Stecker ziehen, dann systematisch Kabel, Stecker, Schalter und Sicherung prüfen.', 'Das Gerät eingesteckt aufschrauben und nachschauen.', 'Mit einem Messer am Kabel kratzen.', 'So lange einschalten, bis es geht.'],
          'Bei Fehlersuche gilt: zuerst vom Netz trennen. Dann suchst du Schritt für Schritt: Ist das Kabel beschädigt? Sitzt der Stecker richtig? Ist die Lampe defekt oder die Sicherung draussen?');
      } },
      { id: 'k1-stecker', topic: 'Stecker anschliessen', make() {
        return mc('Du schliesst ein Kabel an einen neuen Stecker an. Was ist wichtig?', ['Die Lehrperson prüft den Anschluss, erst danach wird der Stecker zugeschraubt und eingesteckt.', 'Du steckst ihn sofort ein.', 'Du lässt die Drähte offen liegen.', 'Du prüfst nichts, es geht schon.'],
          'Ein falsch angeschlossener Stecker ist gefährlich. Darum wird der Anschluss geprüft, bevor der Stecker zusammengeschraubt und in die Steckdose gesteckt wird.');
      } },
      { id: 'k1-verbrauch', topic: 'Wird Strom verbraucht?', make() {
        return mc('«Strom wird in einer Lampe verbraucht.» Wie beurteilst du diese Aussage?', ['Sie stimmt nicht: Die Stromstärke ist vor und hinter der Lampe gleich. Die elektrische Energie wird umgewandelt.', 'Sie stimmt, denn nach der Lampe ist kein Strom mehr da.', 'Sie stimmt, denn die Batterie wird leer.', 'Sie ist nie falsch.'],
          'Der Strom fliesst im geschlossenen Stromkreis weiter, auch hinter der Lampe. Umgewandelt wird die elektrische Energie, zum Beispiel in Licht und thermische Energie. Strom und Energie sind nicht dasselbe.');
      } }
    ]
  },
  {
    id: 'k2', nr: 2, title: 'Serie- und Parallelschaltung', sub: 'Lampen verbinden',
    items: [
      { id: 'k2-raus', topic: 'Lampe herausschrauben', make() {
        return mc('Du schraubst bei zwei Lampen eine heraus. In welcher Schaltung leuchtet die andere weiter?', ['In der Parallelschaltung.', 'In der Serieschaltung.', 'In beiden Schaltungen.', 'In keiner Schaltung.'],
          'In der Serieschaltung gibt es nur einen Weg. Wird er unterbrochen, geht alles aus. In der Parallelschaltung hat jede Lampe ihren eigenen Weg.');
      } },
      { id: 'k2-spannung', topic: 'Spannung in Serie', make() {
        const s = rnd([[6, 2], [9, 3], [4.5, 3], [12, 3], [12, 4], [9, 2]]), u = r2(s[0] / s[1]);
        return num(`${fmt(s[1])} gleiche Lampen sind in Serie an eine Batterie mit ${fmt(s[0])} V angeschlossen. Welche Spannung liegt an jeder Lampe?`, 'V', u, 'In einer Serieschaltung teilt sich die Gesamtspannung auf gleiche Lampen gleichmässig auf.', `${fmt(s[0])} V : ${fmt(s[1])} = ${fmt(u)} V`);
      } },
      { id: 'k2-strom', topic: 'Stromstärke in Parallel', make() {
        const s = rnd([[0.6, 3], [0.8, 2], [0.9, 3], [1.2, 4], [0.6, 2], [1.5, 5]]), i = r2(s[0] / s[1]);
        return num(`Der Gesamtstrom von ${fmt(s[0])} A teilt sich auf ${fmt(s[1])} gleiche parallele Lampen auf. Wie gross ist die Stromstärke durch eine Lampe?`, 'A', i, 'In der Parallelschaltung teilt sich die Stromstärke auf gleiche Zweige gleichmässig auf.', `${fmt(s[0])} A : ${fmt(s[1])} = ${fmt(i)} A`);
      } },
      { id: 'k2-par-u', topic: 'Spannung in Parallel', make() {
        return mc('Zu einer Lampe werden weitere Lampen parallel geschaltet. Die Spannung der Batterie bleibt gleich. Was gilt für die Spannung an der ersten Lampe?', ['Sie bleibt gleich.', 'Sie wird kleiner.', 'Sie wird grösser.', 'Sie wird null.'],
          'In der Parallelschaltung liegt an jeder Lampe die Spannung der Batterie. Die erste Lampe leuchtet gleich hell wie vorher.');
      } },
      { id: 'k2-leiste', topic: 'Steckdosenleiste', make() {
        return mc('Warum sind die Steckdosen einer Steckdosenleiste parallel geschaltet?', ['Damit jedes Gerät die volle Netzspannung bekommt und unabhängig ein- und ausgeschaltet werden kann.', 'Damit alle Geräte zusammen ausgehen.', 'Damit sich die Spannung aufteilt.', 'Das ist reiner Zufall.'],
          'Parallel angeschlossene Geräte haben alle dieselbe Spannung und arbeiten unabhängig voneinander.');
      } },
      { id: 'k2-hell', topic: 'Helligkeit in Serie', make() {
        return mc('Zu einer Lampe wird eine zweite gleiche Lampe in Serie geschaltet. Die Batterie bleibt gleich. Was ändert sich?', ['Die Stromstärke wird kleiner, die Lampen leuchten schwächer.', 'Die Lampen leuchten heller.', 'Nichts ändert sich.', 'Die Batterie wird leichter.'],
          'Mit der zweiten Lampe wird der Weg des Stroms «schwerer». Die Stromstärke sinkt, deshalb leuchten beide schwächer.');
      } }
    ]
  },
  {
    id: 'k3', nr: 3, title: 'Stromstärke, Spannung, Widerstand', sub: 'Das ohmsche Gesetz',
    items: [
      { id: 'k3-einheiten', topic: 'Grössen und Einheiten', make() {
        return mc('Welche Zuordnung stimmt?', ['Stromstärke I in Ampère (A), Spannung U in Volt (V), Widerstand R in Ohm (Ω).', 'Stromstärke in Volt, Spannung in Ampère, Widerstand in Ohm.', 'Stromstärke in Ohm, Spannung in Ampère, Widerstand in Volt.', 'Alle drei in Joule.'],
          'I misst man in Ampère, U in Volt und R in Ohm. Die elektrische Ladung Q ist die vierte Grösse, die du kennenlernst.');
      } },
      { id: 'k3-strom', topic: 'Stromstärke berechnen', make() {
        const s = rnd([[6, 30], [9, 45], [12, 60], [4.5, 15], [9, 30], [12, 40], [6, 12], [9, 18], [12, 24], [4.5, 9], [6, 20], [12, 30]]), i = r2(s[0] / s[1]);
        return num(`An einem Widerstand von ${fmt(s[1])} Ω liegt eine Spannung von ${fmt(s[0])} V. Wie gross ist die Stromstärke?`, 'A', i, 'Stromstärke = Spannung : Widerstand', `I = U : R = ${fmt(s[0])} V : ${fmt(s[1])} Ω = ${fmt(i)} A`);
      } },
      { id: 'k3-spannung', topic: 'Spannung berechnen', make() {
        const s = rnd([[20, 0.3], [10, 0.5], [15, 0.4], [30, 0.2], [45, 0.1], [12, 0.5], [40, 0.3], [25, 0.2]]), u = r2(s[0] * s[1]);
        return num(`Durch einen Widerstand von ${fmt(s[0])} Ω fliesst eine Stromstärke von ${fmt(s[1])} A. Wie gross ist die Spannung?`, 'V', u, 'Spannung = Widerstand · Stromstärke', `U = R · I = ${fmt(s[0])} Ω · ${fmt(s[1])} A = ${fmt(u)} V`);
      } },
      { id: 'k3-widerstand', topic: 'Widerstand berechnen', ext: true, make() {
        const s = rnd([[6, 0.2], [9, 0.3], [12, 0.4], [4.5, 0.15], [9, 0.45], [6, 0.3], [12, 0.6], [4.5, 0.5], [6, 0.5], [12, 0.5]]), r = r2(s[0] / s[1]);
        return num(`An einem Bauteil liegt eine Spannung von ${fmt(s[0])} V. Es fliesst eine Stromstärke von ${fmt(s[1])} A. Wie gross ist der Widerstand?`, 'Ω', r, 'Widerstand = Spannung : Stromstärke', `R = U : I = ${fmt(s[0])} V : ${fmt(s[1])} A = ${fmt(r)} Ω`);
      } },
      { id: 'k3-sprache', topic: 'Richtige Wörter', make() {
        return mc('Welche Wortwahl ist richtig?', ['«Elektrische Spannung» und «elektrische Stromstärke».', '«Stromspannung», denn das ist dasselbe wie Stromstärke.', '«Stromverbrauch», denn Strom wird weggenutzt.', '«Energie» für alles, was elektrisch ist.'],
          'Das Wort «Stromspannung» führt zu Verwechslungen zwischen Spannung und Stromstärke. Auch «Stromverbrauch» ist irreführend, denn der Strom fliesst im Kreis weiter.');
      } },
      { id: 'k3-ohm', topic: 'Ohmsches Gesetz', make() {
        return mc('Wann spricht man vom ohmschen Gesetz?', ['Wenn der Quotient U : I konstant ist, der Widerstand also gleich bleibt.', 'Immer, wenn man R = U : I schreibt.', 'Nur bei Batterien.', 'Nur bei Wechselstrom.'],
          'R = U : I definiert den Widerstand. Von einem ohmschen Gesetz spricht man erst, wenn dieser Wert konstant ist, zum Beispiel bei einem Konstantandraht.');
      } }
    ]
  },
  {
    id: 'k4', nr: 4, title: 'Knoten- und Maschenregel', sub: 'Regeln im verzweigten Stromkreis',
    items: [
      { id: 'k4-knoten', topic: 'Knotenregel', make() {
        return mc('Wie lautet die Knotenregel?', ['An einem Knoten ist die Summe der zufliessenden Stromstärken gleich der Summe der abfliessenden.', 'An einem Knoten ist die Spannung null.', 'Ein Knoten verbraucht Strom.', 'Die Stromstärke wird am Knoten verdoppelt.'],
          'Am Verzweigungspunkt geht kein Strom verloren. Was hineinfliesst, fliesst auch wieder heraus.');
      } },
      { id: 'k4-masche', topic: 'Maschenregel', make() {
        return mc('Wie lautet die Maschenregel?', ['In einer Masche ergeben die Spannungen an den Bauteilen zusammen die Spannung der Quelle.', 'In einer Masche ist die Stromstärke null.', 'In einer Masche addieren sich die Stromstärken zur Spannung.', 'In einer Masche gibt es nur Widerstände mit 1 Ω.'],
          'In einem geschlossenen Teilstromkreis (einer Masche) wird die Spannung der Quelle auf die Bauteile aufgeteilt.');
      } },
      { id: 'k4-i3', topic: 'Strom am Knoten', make() {
        const s = rnd([[0.5, 0.2], [0.6, 0.4], [0.9, 0.3], [1.2, 0.5], [0.8, 0.3], [1.0, 0.6]]), i3 = r2(s[0] - s[1]);
        return num(`Zu einem Knoten fliesst ${fmt(s[0])} A hinein. Eine Leitung führt ${fmt(s[1])} A ab. Die andere Leitung führt den Rest ab. Wie gross ist dieser Strom?`, 'A', i3, 'Was hineinfliesst, fliesst auch heraus.', `${fmt(s[0])} A − ${fmt(s[1])} A = ${fmt(i3)} A`);
      } },
      { id: 'k4-u2', topic: 'Spannung in der Masche', ext: true, make() {
        const s = rnd([[9, 4], [6, 2.5], [12, 7], [4.5, 1.5], [9, 3.5], [6, 4]]), u2 = r2(s[0] - s[1]);
        return num(`Eine Batterie liefert ${fmt(s[0])} V. In Serie sind zwei Lampen angeschlossen. An der ersten Lampe liegen ${fmt(s[1])} V. Welche Spannung liegt an der zweiten Lampe?`, 'V', u2, 'Beide Teilspannungen ergeben zusammen die Spannung der Batterie.', `${fmt(s[0])} V − ${fmt(s[1])} V = ${fmt(u2)} V`);
      } },
      { id: 'k4-leiste', topic: 'Mehr Geräte in der Steckdosenleiste', make() {
        return mc('Du steckst weitere Geräte in eine Steckdosenleiste. Was geschieht mit der Gesamtstromstärke?', ['Sie wird grösser, denn die Stromstärken der Zweige addieren sich.', 'Sie wird kleiner.', 'Sie bleibt immer gleich.', 'Sie wird null.'],
          'Nach der Knotenregel fliesst der Gesamtstrom durch die Zuleitung. Er ist die Summe der Ströme in allen Zweigen. Bei zu vielen Geräten löst die Sicherung aus.');
      } },
      { id: 'k4-messen', topic: 'Messen mit dem Multimeter', make() {
        return mc('Wie schliesst du ein Multimeter an, um die Stromstärke zu messen und wie, um die Spannung zu messen?', ['Stromstärke in Serie zum Bauteil, Spannung parallel zum Bauteil.', 'Stromstärke parallel, Spannung in Serie.', 'Beides in Serie.', 'Beides parallel.'],
          'Zum Messen der Stromstärke muss der Strom durch das Messgerät fliessen, darum schaltest du es in Serie. Spannung misst du am Bauteil, also parallel.');
      } }
    ]
  },
  {
    id: 'k5', nr: 5, title: 'Wirkungen des elektrischen Stroms', sub: 'Wärme, Licht, Chemie, Magnetismus',
    items: [
      { id: 'k5-vier', topic: 'Vier Wirkungen', make() {
        return mc('Welche Wirkungen hat der elektrische Strom?', ['Wärmewirkung, Lichtwirkung, chemische Wirkung und magnetische Wirkung.', 'Nur die Wärmewirkung.', 'Schallwirkung, Geruchswirkung und Farbwirkung.', 'Keine.'],
          'Der Strom kann Drähte erwärmen, Lampen leuchten lassen, chemische Reaktionen auslösen und Magnetfelder erzeugen.');
      } },
      { id: 'k5-draht', topic: 'Wärmewirkung', make() {
        return mc('Du schliesst einen kurzen und einen langen Draht (gleich dick) an dieselbe Batterie an. Was beobachtest du?', ['Der kurze Draht wird heisser.', 'Der lange Draht wird heisser.', 'Beide werden gleich heiss.', 'Keiner wird warm.'],
          'Bei gleicher Spannung wird ein kurzer Draht heisser als ein langer, gleich dicker Draht. Dasselbe gilt für eine Drahtspirale im Vergleich zu einem gestreckten Draht.');
      } },
      { id: 'k5-lampen', topic: 'Lichtwirkung', make() {
        return mc('Welche Lampe wandelt bei gleicher Helligkeit am meisten elektrische Energie in thermische Energie um?', ['Die Glühlampe.', 'Die LED-Lampe.', 'Die Leuchtstofflampe.', 'Alle gleich viel.'],
          'Glühlampen werden sehr heiss. Das erkennst du auch auf dem Wärmebild. LED-Lampen wandeln mehr elektrische Energie in Licht um und werden kaum warm.');
      } },
      { id: 'k5-galvanisieren', topic: 'Chemische Wirkung', make() {
        return mc('Was geschieht beim Galvanisieren, zum Beispiel beim Verkupfern einer Münze?', ['Mit elektrischem Strom wird eine dünne Metallschicht auf einen Gegenstand aufgetragen.', 'Der Gegenstand wird nur gewaschen.', 'Der Gegenstand schmilzt.', 'Der Gegenstand wird magnetisch.'],
          'Beim Galvanisieren löst der Strom chemische Vorgänge aus. Dabei setzt sich zum Beispiel Kupfer, Silber oder Gold an der Oberfläche ab.');
      } },
      { id: 'k5-oersted', topic: 'Versuch von Oersted', make() {
        return mc('Fliesst Strom durch einen Draht neben einem Kompass, bewegt sich die Nadel. Was zeigt das?', ['Elektrischer Strom hat eine magnetische Wirkung.', 'Der Draht ist ein Magnet aus Eisen.', 'Die Nadel ist elektrisch geladen.', 'Der Kompass ist kaputt.'],
          'Hans Christian Oersted entdeckte diesen Zusammenhang zufällig. Ein stromdurchflossener Leiter erzeugt ein Magnetfeld.');
      } },
      { id: 'k5-lautsprecher', topic: 'Lautsprecher', make() {
        return mc('Wie viele Magnete hat ein Lautsprecher?', ['Zwei: einen Elektromagneten (Spule) und einen Permanentmagneten.', 'Gar keinen.', 'Nur einen Permanentmagneten.', 'Genau tausend.'],
          'Die Spule wird zum Elektromagneten, wenn Strom durchfliesst. Sie bewegt sich im Feld des Permanentmagneten und bringt die Membran zum Schwingen.');
      } }
    ]
  },
  {
    id: 'k6', nr: 6, title: 'Elektromotor und Generator', sub: 'Zwei Richtungen der Energieumwandlung',
    items: [
      { id: 'k6-motor', topic: 'Energieumwandlung im Motor', make() {
        return mc('Welche Energieumwandlung findet im Elektromotor statt?', ['Elektrische Energie wird in Bewegungsenergie umgewandelt.', 'Bewegungsenergie wird in elektrische Energie umgewandelt.', 'Lageenergie wird in Schallenergie umgewandelt.', 'Chemische Energie wird in Spannenergie umgewandelt.'],
          'Der Motor wird mit Strom betrieben und dreht sich. Dabei entsteht zusätzlich etwas thermische Energie.');
      } },
      { id: 'k6-generator', topic: 'Energieumwandlung im Generator', make() {
        return mc('Was macht ein Generator?', ['Er wandelt Bewegungsenergie in elektrische Energie um.', 'Er wandelt elektrische Energie in Bewegungsenergie um.', 'Er erzeugt Energie aus dem Nichts.', 'Er speichert Wärme.'],
          'Ein Generator ist im Prinzip ein Elektromotor, der von aussen angetrieben wird. So lässt sich mit derselben Maschine Energie in beide Richtungen umwandeln.');
      } },
      { id: 'k6-richtung', topic: 'Drehrichtung ändern', make() {
        return mc('Wie kannst du die Drehrichtung eines einfachen Elektromotors ändern?', ['Die Anschlüsse an der Batterie vertauschen, damit der Strom in die andere Richtung fliesst.', 'Die Batterie kühlen.', 'Den Motor kräftiger schütteln.', 'Gar nicht, die Richtung ist fest.'],
          'Kehrst du die Stromrichtung um, wechseln die Magnetpole der Spule. Der Motor dreht dann in die andere Richtung.');
      } },
      { id: 'k6-fehler', topic: 'Motor läuft nicht', make() {
        return mc('Dein selbst gebauter Elektromotor dreht sich nicht. Was prüfst du?', ['Ob die Kontakte Strom leiten, die Batterie in Ordnung ist und der Rotor frei drehen kann.', 'Ob es draussen regnet.', 'Ob die Schraube aus Gold ist.', 'Nichts, er muss einfach so laufen.'],
          'Typische Fehler: Kabel nicht abisoliert, Kontakte schlecht, Batterie leer oder der Rotor klemmt. Eine systematische Fehlersuche hilft.');
      } },
      { id: 'k6-geraet', topic: 'Motoren im Alltag', make() {
        return mc('Welches Gerät enthält einen Elektromotor?', ['Ein Haartrockner.', 'Eine Glühlampe.', 'Ein Toaster ohne Gebläse.', 'Eine Taschenlampe.'],
          'Im Haartrockner treibt ein Elektromotor das Gebläse an. Glühlampe, Toaster und Taschenlampe nutzen nur die Wärme- oder Lichtwirkung.');
      } },
      { id: 'k6-gen-klein', topic: 'Motor als Generator', make() {
        return mc('Du drehst von Hand deinen selbst gebauten Motor, aber eine angeschlossene Lampe leuchtet nicht. Was ist der Grund?', ['Die erzeugte Spannung ist zu klein.', 'Motoren können nie Strom erzeugen.', 'Die Lampe ist zu hell.', 'Du hast zu wenig Luft.'],
          'Ein einfacher Motor ist nur ein schlechter Generator. Mit einer LED und einem industriell gefertigten Motor kann es gelingen, ein Lämpchen leuchten zu lassen.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  k1: [
    { h: 'Der geschlossene Stromkreis',
      body: `<p>Ein Gerät funktioniert, wenn der Stromkreis <b>geschlossen</b> ist: Quelle, Leitung, Gerät und Rückleitung bilden einen Kreis. Es braucht immer <b>zwei Leiter</b>, auch wenn man nur ein Kabel sieht.</p>
        ${merk('Ein <b>Schalter</b> schliesst oder öffnet den Stromkreis. Eine <b>Sicherung</b> ist ein besonderer Schalter, der bei zu grosser Stromstärke öffnet.')}
        <p>Strom wird nicht verbraucht. Die Stromstärke ist vor und nach der Lampe gleich. Umgewandelt wird die elektrische Energie.</p>` },
    { h: 'Baue den Stromkreis',
      body: '<p>Schalte den Schalter und baue Fehler ein. Beobachte, wann die Lampe leuchtet.</p>', sim: 'kreis' },
    { h: 'Systematische Fehlersuche',
      body: `<p>Wenn ein Gerät nicht funktioniert, gehst du Schritt für Schritt vor:</p>
        <ol><li>Netzstecker ziehen.</li><li>Kabel, Stecker, Schalter und Lampe ansehen.</li><li>Sicherung prüfen.</li><li>Fehler genau beschreiben.</li></ol>
        ${warnbox('<b>Sicherheit:</b> Arbeite nie an Geräten, die am Netz angeschlossen sind. Beim Anschliessen eines Steckers prüft die Lehrperson den Anschluss, bevor du ihn einsteckst.')}` },
    { h: 'Vorgerechnet: Fehler finden', worked: {
      given: 'Eine Taschenlampe mit Batterie leuchtet nicht mehr. Wie gehst du vor?',
      steps: [['Stromkreis prüfen', 'Ist der Schalter ein, sitzt die Batterie richtig, berühren die Kontakte?'], ['Bauteile prüfen', 'Ist die Lampe defekt? Ist die Batterie leer?'], ['Fehler beschreiben', 'Zum Beispiel: Die Lampe ist durchgebrannt, der Stromkreis ist unterbrochen.'], ['Korrigieren', 'Defektes Bauteil ersetzen, dann erneut prüfen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was brauchst du, damit ein Lämpchen leuchtet?',
        options: ['Einen geschlossenen Stromkreis mit Quelle und Rückweg.', 'Nur ein Kabel zur Batterie.', 'Einen offenen Schalter.', 'Zwei Lampen in Serie.'],
        explain: 'Nur wenn der Strom von der Quelle durch die Lampe und zurück fliessen kann, leuchtet sie.' } }
  ],
  k2: [
    { h: 'Serie und parallel',
      body: `<ul><li><b>Serieschaltung:</b> Die Bauteile liegen hintereinander. Es gibt nur einen Weg. Fällt ein Bauteil aus, geht alles aus. Die Spannung teilt sich auf.</li>
        <li><b>Parallelschaltung:</b> Die Bauteile liegen nebeneinander. Jedes hat einen eigenen Weg. Die Stromstärke teilt sich auf, die Spannung ist überall gleich.</li></ul>` },
    { h: 'Schalte Lampen',
      body: '<p>Wähle Serie oder Parallel und die Anzahl der Lampen. Schraube eine Lampe heraus und beobachte. Beispielwerte: Batterie 6 V, Lampen mit je 10 Ω.</p>', sim: 'serpar' },
    { h: 'Regeln für Serie und Parallel',
      body: `${merk('<b>Serie:</b> Gesamtspannung teilt sich auf, Stromstärke ist überall gleich, mehr Lampen leuchten schwächer.<br><b>Parallel:</b> Spannung ist überall gleich, Stromstärke teilt sich auf, weitere Lampen ändern die erste nicht.')}
        <p>Beispiel Steckdosenleiste: Die Geräte sind parallel geschaltet.</p>` },
    { h: 'Vorgerechnet: Spannung aufteilen', worked: {
      given: '3 gleiche Lampen sind in Serie an eine Batterie mit 9 V angeschlossen. Welche Spannung liegt an jeder Lampe?',
      steps: [['Regel', 'In Serie teilt sich die Spannung gleichmässig auf gleiche Lampen auf.'], ['Rechnung', '9 V : 3 = 3 V'], ['Antwort', 'An jeder Lampe liegen 3 V.']] } },
    { h: 'Kurz testen',
      check: { q: 'Bei welcher Schaltung leuchten die anderen Lampen weiter, wenn eine herausgeschraubt wird?',
        options: ['Parallelschaltung.', 'Serieschaltung.', 'Bei beiden Schaltungen nicht.', 'Nur bei einer Lampe.'],
        explain: 'Bei der Parallelschaltung hat jede Lampe einen eigenen Stromweg.' } }
  ],
  k3: [
    { h: 'Die Grössen im Stromkreis',
      body: `<ul><li><b>Ladung Q:</b> was durch den Draht fliesst.</li>
        <li><b>Stromstärke I</b> in Ampère (A): wie viel Ladung pro Zeit fliesst.</li>
        <li><b>Spannung U</b> in Volt (V): Antrieb des Stroms.</li>
        <li><b>Widerstand R</b> in Ohm (Ω): wie stark ein Bauteil den Strom hemmt.</li></ul>
        ${merk('Sage <b>elektrische Spannung</b>, nicht «Stromspannung». Sage nicht «Stromverbrauch»: Strom wird nicht verbraucht.')}` },
    { h: 'Das ohmsche Gesetz',
      body: `${merk('<b>R = U : I</b> &nbsp; oder &nbsp; <b>I = U : R</b> &nbsp; oder &nbsp; <b>U = R · I</b>')}
        <p>Den Widerstand erhältst du als Quotient aus Spannung und Stromstärke. Von einem <b>ohmschen Gesetz</b> spricht man erst, wenn dieser Quotient konstant bleibt.</p>` },
    { h: 'Spiele mit U, R und I',
      body: '<p>Verändere Spannung und Widerstand. Beobachte, wie sich die Stromstärke ändert.</p>', sim: 'ohm' },
    { h: 'Vorgerechnet: Stromstärke', worked: {
      given: 'An einem Widerstand von 30 Ω liegt eine Spannung von 6 V. Wie gross ist die Stromstärke?',
      steps: [['Formel wählen', 'I = U : R'], ['Einsetzen', 'I = 6 V : 30 Ω'], ['Antwort', 'I = 0,2 A']] } },
    { h: 'Kurz testen',
      check: { q: 'Die Spannung bleibt gleich, der Widerstand wird grösser. Was geschieht mit der Stromstärke?',
        options: ['Sie wird kleiner.', 'Sie wird grösser.', 'Sie bleibt gleich.', 'Sie wird zu Spannung.'],
        explain: 'Wegen I = U : R sinkt die Stromstärke, wenn der Widerstand wächst und U gleich bleibt.' } }
  ],
  k4: [
    { h: 'Knotenregel',
      body: `${merk('<b>Knotenregel:</b> Die Summe der zufliessenden Stromstärken ist gleich der Summe der abfliessenden.')}
        <p>Am Verzweigungspunkt geht nichts verloren. Betrachte immer den ganzen Stromkreis, nicht nur ein einzelnes Bauteil.</p>` },
    { h: 'Maschenregel',
      body: `${merk('<b>Maschenregel:</b> In einer Masche ergeben die Spannungen an den Bauteilen zusammen die Spannung der Quelle.')}
        <p>Eine Masche ist ein geschlossener Teilstromkreis.</p>` },
    { h: 'Teste die Regeln',
      body: '<p>Wähle Parallel (Knotenregel) oder Serie (Maschenregel). Verändere Widerstände und Spannung. Die Werte sind berechnete Beispiele.</p>', sim: 'knoten' },
    { h: 'Vorgerechnet: Strom am Knoten', worked: {
      given: 'Zu einem Knoten fliesst 0,6 A hinein. Eine Leitung führt 0,4 A ab. Wie gross ist der Strom in der anderen Leitung?',
      steps: [['Knotenregel', 'Zufliessend = abfliessend'], ['Rechnung', '0,6 A − 0,4 A = 0,2 A'], ['Antwort', 'In der anderen Leitung fliessen 0,2 A.']] } },
    { h: 'Kurz testen',
      check: { q: 'In einer Masche liegen zwei Lampen in Serie an 9 V. An der ersten liegen 4 V. Wie viele Volt liegen an der zweiten?',
        options: ['5 V', '4 V', '13 V', '9 V'],
        explain: 'Die Teilspannungen ergeben zusammen die Quellenspannung: 9 V − 4 V = 5 V.' } }
  ],
  k5: [
    { h: 'Wärmewirkung und Lichtwirkung',
      body: `<p>Fliesst Strom durch einen Draht, erwärmt er sich. Bei gleicher Spannung wird ein <b>kurzer</b> Draht heisser als ein langer, gleich dicker. Das nutzen Toaster und Wasserkocher.</p>
        <p>Eine <b>Glühlampe</b> bringt einen Draht zum Glühen. Sie wandelt viel elektrische Energie in thermische Energie um. <b>LED-Lampen</b> werden kaum warm.</p>
        ${warnbox('<b>Sicherheit:</b> Drähte an der Batterie werden heiss. Arbeite auf einer feuerfesten Unterlage und schalte nur kurz ein.')}` },
    { h: 'Ordne die Wirkungen zu',
      body: '<p>Tippe bei jedem Gerät auf die passende Wirkung. Manchmal passt mehr als eine.</p>', sim: 'wirkung' },
    { h: 'Chemische Wirkung',
      body: `<p>Strom kann chemische Vorgänge auslösen. Beim <b>Galvanisieren</b> setzt sich eine dünne Metallschicht auf einem Gegenstand ab, zum Beispiel beim Verkupfern, Versilbern oder Vergolden.</p>
        <p>Das schützt zum Beispiel Eisen vor dem Rosten.</p>` },
    { h: 'Magnetische Wirkung',
      body: `<p>Hans Christian Oersted entdeckte zufällig: Ein Draht mit Strom lenkt die Kompassnadel ab. Strom erzeugt ein Magnetfeld.</p>
        ${merk('Eine Spule mit Strom ist ein <b>Elektromagnet</b>. Er hat einen Nord- und einen Südpol. Mit einem <b>Eisenkern</b> wird er stärker.')}
        <p>Im Lautsprecher gibt es zwei Magnete: einen Elektromagneten (Spule) und einen Permanentmagneten.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Welche Wirkung des Stroms nutzt ein Toaster?',
        options: ['Die Wärmewirkung.', 'Die magnetische Wirkung.', 'Die chemische Wirkung.', 'Keine.'],
        explain: 'Im Toaster erwärmen sich Drähte, wenn Strom durch sie fliesst. Das ist die Wärmewirkung.' } }
  ],
  k6: [
    { h: 'Der Elektromotor',
      body: `<p>Ein Elektromotor wandelt <b>elektrische Energie</b> in <b>Bewegungsenergie</b> um. Er ist die wichtigste Anwendung der magnetischen Wirkung des Stroms.</p>
        <p>Es gibt viele Bauformen, aber das Funktionsprinzip ist immer dasselbe: Eine Spule wird durch Strom zum Elektromagneten. Sie dreht sich im Feld eines Magneten.</p>` },
    { h: 'Motor und Generator',
      body: '<p>Schalte zwischen Motor und Generator. Beobachte, in welche Richtung die Energie umgewandelt wird.</p>', sim: 'motorgen' },
    { h: 'Der Generator',
      body: `${merk('Ein <b>Generator</b> ist ein Elektromotor, der von aussen angetrieben wird. Er wandelt <b>Bewegungsenergie</b> in <b>elektrische Energie</b> um.')}
        <p>Mit derselben Maschine geht die Energieumwandlung in beide Richtungen. Ein selbst gebauter Motor ist aber nur ein schlechter Generator: Die Spannung ist zu klein, um eine Lampe zum Leuchten zu bringen.</p>` },
    { h: 'Vorgerechnet: Energiekette', worked: {
      given: 'Beschreibe die Energieumwandlung bei einem Haartrockner und bei einem Kraftwerk-Generator.',
      steps: [['Haartrockner', 'Elektrische Energie → Elektromotor → Bewegungsenergie (Gebläse). Dazu thermische Energie durch die Heizung.'], ['Generator', 'Bewegungsenergie → Generator → elektrische Energie.'], ['Vergleich', 'Der Motor und der Generator sind im Prinzip dieselbe Maschine, die Energie fliesst in die andere Richtung.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie änderst du die Drehrichtung eines einfachen Elektromotors?',
        options: ['Die Anschlüsse an der Batterie vertauschen.', 'Die Batterie aufladen.', 'Den Motor kühlen.', 'Ein zweites Kabel dazunehmen.'],
        explain: 'Mit vertauschten Anschlüssen fliesst der Strom in die andere Richtung. Die Pole der Spule wechseln, und der Motor dreht umgekehrt.' } }
  ]
};
const GOALS = {
  k1: ['einen geschlossenen Stromkreis beschreiben', 'eine einfache Fehlersuche durchführen'],
  k2: ['Serie- und Parallelschaltung unterscheiden', 'Spannung und Stromstärke in beiden Schaltungen beschreiben'],
  k3: ['I, U und R richtig benennen und berechnen', 'das ohmsche Gesetz anwenden'],
  k4: ['die Knotenregel anwenden', 'die Maschenregel anwenden'],
  k5: ['vier Wirkungen des Stroms nennen', 'mit Experimenten Wirkungen des Stroms zeigen'],
  k6: ['die Funktion von Elektromotor und Generator beschreiben', 'die Energieumwandlungen benennen']
};
const LEARN = {
  'k1-geschlossen': 'Der geschlossene Stromkreis', 'k1-kabel': 'Der geschlossene Stromkreis', 'k1-schalter': 'Der geschlossene Stromkreis', 'k1-fehler': 'Systematische Fehlersuche', 'k1-stecker': 'Systematische Fehlersuche', 'k1-verbrauch': 'Der geschlossene Stromkreis',
  'k2-raus': 'Serie und parallel', 'k2-spannung': 'Vorgerechnet: Spannung aufteilen', 'k2-strom': 'Regeln für Serie und Parallel', 'k2-par-u': 'Regeln für Serie und Parallel', 'k2-leiste': 'Regeln für Serie und Parallel', 'k2-hell': 'Schalte Lampen',
  'k3-einheiten': 'Die Grössen im Stromkreis', 'k3-strom': 'Vorgerechnet: Stromstärke', 'k3-spannung': 'Das ohmsche Gesetz', 'k3-widerstand': 'Das ohmsche Gesetz', 'k3-sprache': 'Die Grössen im Stromkreis', 'k3-ohm': 'Das ohmsche Gesetz',
  'k4-knoten': 'Knotenregel', 'k4-masche': 'Maschenregel', 'k4-i3': 'Vorgerechnet: Strom am Knoten', 'k4-u2': 'Maschenregel', 'k4-leiste': 'Knotenregel', 'k4-messen': 'Teste die Regeln',
  'k5-vier': 'Ordne die Wirkungen zu', 'k5-draht': 'Wärmewirkung und Lichtwirkung', 'k5-lampen': 'Wärmewirkung und Lichtwirkung', 'k5-galvanisieren': 'Chemische Wirkung', 'k5-oersted': 'Magnetische Wirkung', 'k5-lautsprecher': 'Magnetische Wirkung',
  'k6-motor': 'Der Elektromotor', 'k6-generator': 'Der Generator', 'k6-richtung': 'Kurz testen', 'k6-fehler': 'Der Elektromotor', 'k6-geraet': 'Vorgerechnet: Energiekette', 'k6-gen-klein': 'Der Generator'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Pol', pw: 'unter Spannung' },
  { xp: 80, name: 'Draht', pw: 'leitet gut' },
  { xp: 200, name: 'Lämpchen', pw: 'leuchtet' },
  { xp: 380, name: 'Schalter', pw: 'schliesst Kreise' },
  { xp: 620, name: 'Elektromagnet', pw: 'zieht an' },
  { xp: 920, name: 'Generator', pw: 'liefert Strom' }
];

/* ---------- Thema: 8_1 Stromkreise untersuchen ---------- */
const TOPIC = {
  id: 'nt8-1', storeKey: 'halingen-nt8-1-v1', other: { title: 'Elektromotor und Generator (Vertiefung)', href: 'motor.html' },
  title: 'Stromkreise untersuchen', lead: 'Stromstärke, Spannung und Widerstand', tag: 'Natur und Technik', cardName: 'Formelkarte',
  tips: ['Strom wird nicht verbraucht.', 'Sage «elektrische Spannung», nicht «Stromspannung».'],
  formulas: [
    ['Ohmsches Gesetz', 'R = U : I', 'I = U : R, U = R · I'],
    ['Serie', 'Spannung teilt sich auf', 'Stromstärke ist überall gleich'],
    ['Parallel', 'Spannung ist überall gleich', 'Stromstärke teilt sich auf'],
    ['Knotenregel', 'Zufliessend = abfliessend', 'Summe der Stromstärken'],
    ['Maschenregel', 'Teilspannungen = Quellenspannung', 'in jeder Masche'],
    ['Einheiten', 'I in A, U in V, R in Ω', 'Q: Ladung']
  ]
};

/* ---------- Simulationen ---------- */
function sorter(el, items, names, intro, endText) {
  el.innerHTML = `<div class="sim"><p class="small" id="gn" aria-live="polite"></p><p class="gcard" id="gc"></p>
    <div class="gbtns" id="gb">${Object.keys(names).map(k => `<button class="btn sm" data-g="${k}">${names[k]}</button>`).join('')}</div>
    <p class="readout" id="ro" aria-live="polite"></p>
    <button class="btn btn-primary block" id="nx" hidden>Weiter zum nächsten Beispiel</button></div>`;
  let i = 0, score = 0, done = false;
  function show() {
    done = false; $id('nx').hidden = true;
    if (i >= items.length) {
      $id('gn').textContent = ''; $id('gc').textContent = 'Geschafft!'; $id('gb').hidden = true;
      $id('ro').innerHTML = `<b>${score} von ${items.length}</b> beim ersten Tipp richtig. ${endText}`;
      const again = document.createElement('button'); again.className = 'btn sm'; again.textContent = 'Nochmals spielen';
      again.addEventListener('click', () => { i = 0; score = 0; $id('gb').hidden = false; again.remove(); show(); });
      $id('ro').appendChild(document.createElement('br')); $id('ro').appendChild(again); return;
    }
    $id('gn').textContent = 'Beispiel ' + (i + 1) + ' von ' + items.length;
    $id('gc').textContent = items[i].t; $id('ro').textContent = intro;
    el.querySelectorAll('[data-g]').forEach(b => b.classList.remove('good', 'bad'));
  }
  el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => {
    if (i >= items.length) return;
    if (done) { show(); return; }
    done = true;
    const it = items[i], ok = it.ok.includes(b.dataset.g);
    if (ok) score++;
    el.querySelectorAll('[data-g]').forEach(x => { if (it.ok.includes(x.dataset.g)) x.classList.add('good'); else if (x === b) x.classList.add('bad'); });
    $id('ro').innerHTML = (ok ? '<b>Richtig.</b> ' : '<b>Nicht ganz.</b> ') + it.why;
    i++;
    const nx = $id('nx'); nx.hidden = false; nx.textContent = i >= items.length ? 'Ergebnis ansehen' : 'Weiter zum nächsten Beispiel';
    if (nx.scrollIntoView) nx.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }));
  $id('nx').addEventListener('click', show);
  show();
}
const SIMS = {
  wirkung(el) {
    sorter(el, [
      { t: 'Ein Toaster röstet Brot', ok: ['wae'], why: 'Drähte werden heiss. Das ist die Wärmewirkung.' },
      { t: 'Eine Glühlampe leuchtet', ok: ['lic', 'wae'], why: 'Der Draht glüht (Lichtwirkung) und wird sehr heiss (Wärmewirkung).' },
      { t: 'Eine Münze wird verkupfert', ok: ['che'], why: 'Der Strom löst chemische Vorgänge aus. Das nennt man Galvanisieren.' },
      { t: 'Ein Elektromagnet hebt Schrott an', ok: ['mag'], why: 'Eine Spule mit Strom ist ein Magnet. Das ist die magnetische Wirkung.' },
      { t: 'Eine Heizspirale im Wasserkocher', ok: ['wae'], why: 'Der Draht erwärmt das Wasser durch die Wärmewirkung.' },
      { t: 'Die Membran eines Lautsprechers schwingt', ok: ['mag'], why: 'Die Spule bewegt sich im Magnetfeld. Das ist die magnetische Wirkung.' }
    ], { wae: 'Wärmewirkung', lic: 'Lichtwirkung', che: 'Chemische Wirkung', mag: 'Magnetische Wirkung' }, 'Welche Wirkung des Stroms wird genutzt?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  kreis(el) {
    el.innerHTML = `<div class="sim"><div class="circ" aria-hidden="true"><div class="cbat">Batterie</div><div class="cwire" id="w1"></div><div class="clamp" id="lamp"></div><div class="cwire" id="w2"></div></div>
      <label class="chk"><input type="checkbox" id="sw" checked> Schalter geschlossen</label>
      <label class="chk"><input type="checkbox" id="e1"> Kabel unterbrochen</label>
      <label class="chk"><input type="checkbox" id="e2"> Lampe defekt</label>
      <label class="chk"><input type="checkbox" id="e3"> Sicherung entfernt</label>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const bad = [];
      if (!$id('sw').checked) bad.push('Der Schalter ist offen.');
      if ($id('e1').checked) bad.push('Ein Kabel ist unterbrochen.');
      if ($id('e2').checked) bad.push('Die Lampe ist defekt.');
      if ($id('e3').checked) bad.push('Die Sicherung fehlt.');
      const on = bad.length === 0;
      $id('lamp').classList.toggle('on', on);
      $id('w1').classList.toggle('flow', on); $id('w2').classList.toggle('flow', on);
      $id('ro').innerHTML = on ? 'Der Stromkreis ist <b>geschlossen</b>. Die Lampe leuchtet.' : 'Der Stromkreis ist <b>unterbrochen</b>: ' + bad.join(' ');
    }
    ['sw', 'e1', 'e2', 'e3'].forEach(id => $id(id).addEventListener('change', upd)); upd();
  },

  serpar(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Schaltung"><button class="btn sm on" data-m="s">Serie</button><button class="btn sm" data-m="p">Parallel</button></div>
      ${sl('sn', 'Anzahl Lampen', 1, 4, 1, 2, '')}
      <label class="chk"><input type="checkbox" id="rm"> Eine Lampe herausschrauben</label>
      <div class="lamps" id="lm" aria-hidden="true"></div>
      <div class="trio"><div><span class="k">Batterie</span><b class="mono">6 V</b></div><div><span class="k">Gesamtstrom</span><b class="mono" id="t1"></b></div><div><span class="k">Je Lampe</span><b class="mono" id="t2"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let mode = 's';
    function upd() {
      const n = +$id('sn').value, rm = $id('rm').checked && n > 1, R = 10, U = 6;
      $id('snv').textContent = String(n);
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
      let lampsOn, itot, u, il;
      if (mode === 's') { lampsOn = rm ? 0 : n; itot = rm ? 0 : U / (R * n); u = U / n; il = itot; }
      else { lampsOn = n - (rm ? 1 : 0); itot = lampsOn * U / R; u = U; il = U / R; }
      const lm = $id('lm'); lm.innerHTML = '';
      for (let i = 0; i < n; i++) { const d = document.createElement('i'); const out = rm && i === n - 1; d.className = 'lp' + (out ? ' gone' : (lampsOn > 0 && (mode === 'p' || !rm) ? ' on' : '')); d.style.opacity = out ? '.25' : (lampsOn > 0 ? String(Math.min(1, 0.35 + 0.65 * (u * il) / (U * U / R))) : '.35'); lm.appendChild(d); }
      $id('t1').textContent = fmt(r2(itot), 2) + ' A'; $id('t2').textContent = lampsOn > 0 ? fmt(r2(u), 1) + ' V' : '0 V';
      $id('ro').innerHTML = mode === 's'
        ? (rm ? 'Der Stromkreis ist unterbrochen: <b>alle Lampen sind aus</b>.' : `Serie: Die Spannung teilt sich auf, jede Lampe bekommt ${fmt(r2(u), 1)} V. Mit mehr Lampen leuchten sie schwächer.`)
        : `Parallel: Jede Lampe bekommt 6 V und leuchtet gleich hell. ${rm ? 'Die anderen Lampen leuchten weiter.' : 'Der Gesamtstrom teilt sich auf.'}`;
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; upd(); }));
    $id('sn').addEventListener('input', upd); $id('rm').addEventListener('change', upd); upd();
  },

  ohm(el) {
    el.innerHTML = `<div class="sim"><div class="brow"><span class="bname">Stromstärke</span><div class="btrack"><div class="bfill" id="bi"></div></div><b class="mono bval" id="iv"></b></div>
      ${sl('ou', 'Spannung U', 0, 12, 1, 6, 'V')}${sl('or', 'Widerstand R', 5, 100, 5, 30, 'Ω')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const U = +$id('ou').value, R = +$id('or').value, I = U / R;
      $id('ouv').textContent = fmt(U); $id('orv').textContent = fmt(R);
      $id('bi').style.width = Math.min(100, I / 2.4 * 100) + '%'; $id('iv').textContent = fmt(r2(I), 2) + ' A';
      $id('ro').innerHTML = `I = U : R = ${fmt(U)} V : ${fmt(R)} Ω = <b>${fmt(r2(I), 2)} A</b><br>Grösserer Widerstand: kleinere Stromstärke. Grössere Spannung: grössere Stromstärke.`;
    }
    $id('ou').addEventListener('input', upd); $id('or').addEventListener('input', upd); $id('bi').style.width = '0%'; nf(el, upd);
  },

  knoten(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Schaltung"><button class="btn sm on" data-m="p">Parallel (Knotenregel)</button><button class="btn sm" data-m="s">Serie (Maschenregel)</button></div>
      ${sl('ku', 'Spannung U', 3, 12, 1, 6, 'V')}${sl('k1', 'Widerstand R1', 10, 60, 10, 20, 'Ω')}${sl('k2', 'Widerstand R2', 10, 60, 10, 30, 'Ω')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let mode = 'p';
    function upd() {
      const U = +$id('ku').value, R1 = +$id('k1').value, R2 = +$id('k2').value;
      $id('kuv').textContent = fmt(U); $id('k1v').textContent = fmt(R1); $id('k2v').textContent = fmt(R2);
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
      if (mode === 'p') {
        const I1 = U / R1, I2 = U / R2;
        $id('ro').innerHTML = `Parallel: An beiden Widerständen liegen ${fmt(U)} V.<br>I1 = ${fmt(r2(I1), 2)} A, I2 = ${fmt(r2(I2), 2)} A<br>Gesamtstrom am Knoten: <b>${fmt(r2(I1), 2)} + ${fmt(r2(I2), 2)} = ${fmt(r2(I1 + I2), 2)} A</b>`;
      } else {
        const I = U / (R1 + R2), U1 = I * R1, U2 = I * R2;
        $id('ro').innerHTML = `Serie: Überall fliessen ${fmt(r2(I), 2)} A.<br>U1 = ${fmt(r2(U1), 2)} V, U2 = ${fmt(r2(U2), 2)} V<br>Maschenregel: <b>${fmt(r2(U1), 2)} + ${fmt(r2(U2), 2)} = ${fmt(r2(U1 + U2), 2)} V</b> (Quelle: ${fmt(U)} V)`;
      }
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; upd(); }));
    ['ku', 'k1', 'k2'].forEach(id => $id(id).addEventListener('input', upd)); upd();
  },

  motorgen(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Betriebsart"><button class="btn sm on" data-m="m">Elektromotor</button><button class="btn sm" data-m="g">Generator</button></div>
      <div class="chain" aria-hidden="true"><div class="cbox" id="ea"></div><div class="carrow">→</div><div class="cbox w"><span class="gear" id="gr">⚙</span> <span id="eb"></span></div><div class="carrow">→</div><div class="cbox" id="ec"></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function set(m) {
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === m));
      if (m === 'm') { $id('ea').textContent = 'Elektrische Energie'; $id('eb').textContent = 'Motor'; $id('ec').textContent = 'Bewegungsenergie'; $id('ro').innerHTML = 'Der Motor wandelt <b>elektrische Energie</b> in <b>Bewegungsenergie</b> um. Etwas thermische Energie entsteht auch.'; }
      else { $id('ea').textContent = 'Bewegungsenergie'; $id('eb').textContent = 'Generator'; $id('ec').textContent = 'Elektrische Energie'; $id('ro').innerHTML = 'Der Generator wird von aussen gedreht und wandelt <b>Bewegungsenergie</b> in <b>elektrische Energie</b> um.'; }
      $id('gr').className = 'gear ' + m;
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => set(b.dataset.m)));
    set('m');
  }
};




export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt8-1","titel":"Stromkreise untersuchen","kapitel":"NaTech 8, Kapitel 1"});
