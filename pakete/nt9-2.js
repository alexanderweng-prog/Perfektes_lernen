// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_2_Atommodelle_nutzen.html
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
const NICK_A = ['Blitz', 'Funke', 'Turbo', 'Watt', 'Joule', 'Volt', 'Ampere', 'Kilo', 'Dynamo', 'Magnet'];
const NICK_B = ['Fuchs', 'Adler', 'Luchs', 'Falke', 'Dachs', 'Otter', 'Uhu', 'Igel'];
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

/* ---------- Inhalt: 9_2 Atommodelle nutzen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_2 (ein Lehrerkommentar liegt nicht vor). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'a1', nr: 1, title: 'Atome und Denkmodelle', sub: 'Von Dalton bis zum Orbital',
    items: [
      { id: 'a1-element', topic: 'Elemente und Atomsorten', make() {
        return mc('Wie viele Elemente sind heute bekannt und was ist ein Element?', ['118. Ein Element besteht immer aus einer einzigen Atomsorte.', '10. Ein Element besteht aus allen Atomsorten.', '1000. Ein Element ist ein Gemisch.', '4. Ein Element ist immer ein Gas.'],
          'Bis heute sind 118 Atomsorten entdeckt. Im Periodensystem sind alle 118 Elemente beschrieben.');
      } },
      { id: 'a1-modell', topic: 'Denkmodelle', make() {
        return mc('Was ist ein Atommodell?', ['Ein Denkmodell über den Aufbau von Atomen. Es beruht auf Vermutungen, weil Atome zu klein sind, um hineinzusehen.', 'Ein Foto eines Atoms.', 'Eine genaue Abbildung der Wirklichkeit.', 'Ein Gerät im Labor.'],
          'Atommodelle erklären das Verhalten von Atomen immer genauer. Dank besserer Modelle lassen sich zum Beispiel Medikamente und neue Materialien gezielt herstellen.');
      } },
      { id: 'a1-dalton', topic: 'Modell von Dalton', make() {
        return mc('Wie stellte sich John Dalton die Atome vor?', ['Als homogene Kugeln. Alle Atome eines Elements sind gleichartig, verschiedene Elemente unterscheiden sich in der Masse.', 'Als Kugeln mit Elektronen wie Rosinen im Kuchen.', 'Als Kern mit Kreisbahnen.', 'Als leere Räume.'],
          'Homogen bedeutet, dass das Innere der Kugel überall gleich ist. Woraus das Innere besteht, war damals unklar.');
      } },
      { id: 'a1-thomson', topic: 'Rosinenkuchenmodell', make() {
        return mc('Was besagt das Rosinenkuchenmodell von Thomson?', ['Das Atom besteht aus einer positiv geladenen Masse, in der die Elektronen verteilt sind. Insgesamt ist es neutral.', 'Das Atom besteht aus einem winzigen Kern und leerem Raum.', 'Die Elektronen kreisen auf festen Bahnen.', 'Das Atom ist negativ geladen.'],
          'Der positiv geladene «Teig» enthält die negativ geladenen Elektronen wie Rosinen. Das Atom als Ganzes ist elektrisch neutral.');
      } },
      { id: 'a1-reihe', topic: 'Reihenfolge der Modelle', make() {
        return mc('Welche Reihenfolge der Atommodelle ist richtig?', ['Dalton, Thomson, Rutherford, Bohr, Orbitalmodell.', 'Bohr, Dalton, Rutherford, Thomson.', 'Rutherford, Dalton, Bohr, Thomson.', 'Orbitalmodell, Bohr, Dalton, Thomson.'],
          'Jedes Modell brachte etwas Neues dazu: Dalton die Kugel, Thomson die Elektronen im Atom, Rutherford den Kern, Bohr die Bahnen, das Orbitalmodell die Aufenthaltswahrscheinlichkeit.');
      } },
      { id: 'a1-jahre', topic: 'Zeit zwischen den Modellen', ext: true, make() {
        const s = rnd([[1808, 1911], [1808, 1913], [1911, 1913]]), d = s[1] - s[0], n = { 1808: 'Dalton', 1911: 'Rutherford', 1913: 'Bohr' };
        return num(`${n[s[0]]} stellte sein Atommodell ${fmt(s[0])} vor, ${n[s[1]]} ${fmt(s[1])}. Wie viele Jahre liegen dazwischen?`, 'Jahre', d, 'Ziehe die frühere Jahreszahl von der späteren ab.', `${fmt(s[1])} − ${fmt(s[0])} = ${fmt(d)} Jahre`);
      } }
    ]
  },
  {
    id: 'a2', nr: 2, title: 'Rutherford und Bohr', sub: 'Atomkern, Bahnen und Schalen',
    items: [
      { id: 'a2-gold', topic: 'Goldfolienversuch', make() {
        return mc('Rutherford beschoss eine dünne Goldfolie mit Alpha-Teilchen. Fast alle gingen hindurch. Was schloss er daraus?', ['Atome bestehen zum grossen Teil aus leerem Raum.', 'Atome sind massive Kugeln.', 'Gold ist durchsichtig.', 'Alpha-Teilchen sind unsichtbar.'],
          'Wären die Atome massiv, wären die Alpha-Teilchen abgeprallt oder aufgefangen worden. Das konnte nicht beobachtet werden.');
      } },
      { id: 'a2-kern', topic: 'Atomkern', make() {
        return mc('Einzelne Alpha-Teilchen wurden abgelenkt oder zurückgeworfen. Was bedeutet das?', ['Im Atom gibt es ein kleines, massives, positiv geladenes Zentrum: den Atomkern.', 'Die Elektronen haben die Teilchen abgelenkt.', 'Die Goldfolie war kaputt.', 'Es gibt keinen Kern.'],
          'Die Elektronen sind viel leichter als die Alpha-Teilchen und können sie nicht ablenken. Wo sich die Elektronen befinden, konnte der Versuch nicht zeigen.');
      } },
      { id: 'a2-ablenk', topic: 'Abgelenkte Teilchen', make() {
        const k = rnd([2, 3, 5, 8, 10]), n = 8000 * k;
        return num(`Etwa eines von 8000 Alpha-Teilchen wird zurückgeworfen oder abgelenkt. Wie viele von ${fmt(n)} Teilchen sind das ungefähr?`, 'Teilchen', k, 'Teile die Gesamtzahl durch 8000.', `${fmt(n)} : 8000 = ${fmt(k)}`);
      } },
      { id: 'a2-bohr', topic: 'Modell von Bohr', make() {
        return mc('Was ist neu im Atommodell von Bohr?', ['Die Elektronen bewegen sich auf Kreisbahnen mit festen Abständen. Beim Wechsel der Bahn nehmen sie Energie auf oder geben sie ab.', 'Atome sind massive Kugeln.', 'Es gibt keinen Kern.', 'Die Elektronen stehen still.'],
          'Bohr erklärte damit, dass Wasserstoff-Atome Licht ganz bestimmter Farben aufnehmen oder abstrahlen.');
      } },
      { id: 'a2-zustand', topic: 'Grundzustand und angeregter Zustand', make() {
        return mc('Wie unterscheiden sich Grundzustand und angeregter Zustand?', ['Im angeregten Zustand ist das Elektron weiter vom Kern entfernt und das Atom hat mehr Energie.', 'Im Grundzustand hat das Atom mehr Energie.', 'Beide haben gleich viel Energie.', 'Im angeregten Zustand gibt es keine Elektronen.'],
          'Fällt das Elektron auf die Bahn näher am Kern zurück, strahlt es die gleiche Energiemenge ab, oft als Licht einer bestimmten Farbe.');
      } },
      { id: 'a2-schalen', topic: 'Schalenmodell', make() {
        return mc('Was besagt das Schalenmodell?', ['Die Elektronen bewegen sich in Schalen um den Kern. Innerhalb der Schalen haben sie keine feste Bahn.', 'Die Elektronen bewegen sich auf einer einzigen Bahn.', 'Es gibt keine Elektronen.', 'Der Kern ist leer.'],
          'Das Schalenmodell ist eine Weiterentwicklung des Bohr-Modells. In NaTech 9 werden Atome meist im Schalenmodell dargestellt.');
      } }
    ]
  },
  {
    id: 'a3', nr: 3, title: 'Aufbau der Atome', sub: 'Protonen, Neutronen, Elektronen',
    items: [
      { id: 'a3-teilchen', topic: 'Teilchen im Atom', make() {
        return mc('Welche Aussage über die Teilchen im Atom ist richtig?', ['Protonen (positiv) und Neutronen (ungeladen) sind im Kern, Elektronen (negativ) in der Hülle.', 'Elektronen sind im Kern.', 'Neutronen sind negativ geladen.', 'Protonen sind in der Hülle.'],
          'Protonen und Neutronen haben die Masse 1, Elektronen haben fast keine Masse (0,0005).');
      } },
      { id: 'a3-ordnung', topic: 'Ordnungszahl', make() {
        return mc('Was gibt die Ordnungszahl im Periodensystem an?', ['Die Anzahl Protonen im Atomkern. Sie bestimmt die Atomsorte.', 'Die Anzahl Neutronen.', 'Die Masse in Gramm.', 'Die Anzahl Schalen.'],
          'Das Periodensystem ordnet die Elemente nach der Anzahl Protonen. Natrium hat 11 Protonen, Sauerstoff 8.');
      } },
      { id: 'a3-neutronen', topic: 'Neutronen berechnen', make() {
        const s = rnd([[12, 6], [13, 6], [238, 92], [235, 92], [23, 11], [16, 8]]), n = s[0] - s[1];
        return num(`Ein Atom hat die Massenzahl ${fmt(s[0])} und die Ordnungszahl ${fmt(s[1])}. Wie viele Neutronen hat der Kern?`, 'Neutronen', n, 'Die Massenzahl ist die Summe aus Protonen und Neutronen.', `${fmt(s[0])} − ${fmt(s[1])} = ${fmt(n)} Neutronen`);
      } },
      { id: 'a3-ion', topic: 'Elektronen im Ion', make() {
        const s = rnd([[11, 1, 'Natrium-Kation'], [8, -2, 'Sauerstoff-Anion'], [12, 2, 'Magnesium-Kation'], [17, -1, 'Chlor-Anion'], [9, -1, 'Fluor-Anion'], [20, 2, 'Calcium-Kation']]), e = s[0] - s[1];
        return num(`Ein ${s[2]} hat ${fmt(s[0])} Protonen und die Ladung ${s[1] > 0 ? '+' : '−'}${fmt(Math.abs(s[1]))}. Wie viele Elektronen hat es?`, 'Elektronen', e, 'Ein neutrales Atom hat gleich viele Elektronen wie Protonen. Bei einem Kation fehlen Elektronen, bei einem Anion sind welche dazugekommen.', `${fmt(s[0])} − (${s[1] > 0 ? '+' : '−'}${fmt(Math.abs(s[1]))}) = ${fmt(e)} Elektronen`);
      } },
      { id: 'a3-isotop', topic: 'Isotope', make() {
        return mc('Was sind Isotope?', ['Atome desselben Elements mit gleich vielen Protonen, aber verschieden vielen Neutronen.', 'Atome mit verschieden vielen Protonen.', 'Ionen mit gleicher Ladung.', 'Moleküle mit gleicher Masse.'],
          'Kohlenstoff hat immer 6 Protonen. Die meisten Atome haben 6 Neutronen (Kohlenstoff-12), wenige 7 (Kohlenstoff-13) und ganz wenige 8 (Kohlenstoff-14, instabil).');
      } },
      { id: 'a3-schalen', topic: 'Elektronenkonfiguration', make() {
        return mc('Natrium hat die Elektronenkonfiguration 2/8/1. Was bedeutet das?', ['2 Elektronen in der innersten Schale, 8 in der zweiten, 1 in der äussersten. Das Atom hat drei Schalen.', '2 Protonen, 8 Neutronen, 1 Elektron.', '2 Atome, 8 Moleküle, 1 Ion.', 'Natrium hat 2 Schalen.'],
          'Die innerste Schale fasst höchstens 2, die zweite 8 Elektronen. Natrium hat insgesamt 11 Elektronen.');
      } }
    ]
  },
  {
    id: 'a4', nr: 4, title: 'Edelgasregel und Bindungen', sub: 'Ionenbindung und Elektronenpaarbindung',
    items: [
      { id: 'a4-edel', topic: 'Edelgasregel', make() {
        return mc('Was besagt die Edelgasregel?', ['Atome streben eine voll besetzte äusserste Schale an (Edelgaskonfiguration), weil sie besonders stabil ist.', 'Edelgase reagieren immer.', 'Atome verlieren alle Elektronen.', 'Nur Metalle sind stabil.'],
          'Helium hat 2 Elektronen in der äussersten Schale, die anderen Edelgase 8. Atome erreichen das Ziel durch Aufnehmen, Abgeben oder gemeinsames Nutzen von Elektronen.');
      } },
      { id: 'a4-ion', topic: 'Ionenbindung', make() {
        return mc('Wann entsteht eine Ionenbindung?', ['Wenn Metall-Atome mit Nichtmetall-Atomen reagieren: Elektronen werden übertragen, entgegengesetzt geladene Ionen ziehen sich an.', 'Wenn zwei Nichtmetall-Atome Elektronen teilen.', 'Wenn Edelgase reagieren.', 'Wenn nichts geschieht.'],
          'Beispiel Kochsalz: Natrium gibt ein Elektron an Chlor ab. Es entsteht ein Gitter aus Na⁺ und Cl⁻.');
      } },
      { id: 'a4-paar', topic: 'Elektronenpaarbindung', make() {
        return mc('Wann entsteht eine Elektronenpaarbindung?', ['Wenn Nichtmetall-Atome Elektronen gemeinsam nutzen. So entstehen Moleküle.', 'Wenn Metalle Elektronen abgeben.', 'Wenn Ionen sich anziehen.', 'Nur im Weltall.'],
          'Im Wasserstoff-Molekül H₂ nutzen zwei Wasserstoff-Atome ihre Elektronen gemeinsam. Beide erreichen die Edelgaskonfiguration von Helium.');
      } },
      { id: 'a4-aufnehmen', topic: 'Elektronen aufnehmen', make() {
        const x = rnd([7, 6, 5]), n = 8 - x;
        return num(`Ein Nichtmetall-Atom hat ${fmt(x)} Elektronen in der äussersten Schale. Wie viele Elektronen muss es aufnehmen, um die Edelgaskonfiguration mit 8 zu erreichen?`, 'Elektronen', n, 'Ergänze auf 8.', `8 − ${fmt(x)} = ${fmt(n)} Elektronen`);
      } },
      { id: 'a4-nacl', topic: 'Kochsalz', make() {
        return mc('Was geschieht bei der Reaktion von Natrium mit Chlor?', ['Natrium gibt ein Elektron ab, Chlor nimmt es auf. Es entsteht ein Kochsalzgitter aus Natrium- und Chlorid-Ionen.', 'Chlor gibt ein Elektron an Natrium ab.', 'Es entstehen neutrale Atome.', 'Es passiert nichts.'],
          'Aus dem Metall Natrium und dem giftigen Chlorgas entsteht der völlig neue Stoff Kochsalz.');
      } },
      { id: 'a4-gruppe', topic: 'Gruppen im Periodensystem', make() {
        return mc('Wie erreichen die Elemente der Gruppen 1 und 17 die Edelgaskonfiguration?', ['Gruppe 1 (Alkalimetalle) gibt ein Elektron ab, Gruppe 17 (Halogene) nimmt ein Elektron auf.', 'Gruppe 1 nimmt ein Elektron auf.', 'Gruppe 17 gibt ein Elektron ab.', 'Beide geben alle Elektronen ab.'],
          'Die Gruppe verrät dir, wie viele Elektronen in der äussersten Schale sind und was das Atom bevorzugt.');
      } }
    ]
  },
  {
    id: 'a5', nr: 5, title: 'Redoxreaktionen und Strom', sub: 'Oxidation, Reduktion, Batterie',
    items: [
      { id: 'a5-oxi', topic: 'Oxidation', make() {
        return mc('Was ist eine Oxidation?', ['Eine Teilreaktion, bei der Elektronen abgegeben werden.', 'Eine Teilreaktion, bei der Elektronen aufgenommen werden.', 'Eine Reaktion ohne Elektronen.', 'Das Verdampfen von Wasser.'],
          'Kupfer wird oxidiert: Cu → Cu²⁺ + 2 e⁻. Jedes Kupfer-Atom gibt zwei Elektronen ab.');
      } },
      { id: 'a5-red', topic: 'Reduktion', make() {
        return mc('Was ist eine Reduktion?', ['Eine Teilreaktion, bei der Elektronen aufgenommen werden.', 'Eine Teilreaktion, bei der Elektronen abgegeben werden.', 'Das Kleinerwerden eines Atoms.', 'Das Abkühlen.'],
          'Sauerstoff wird reduziert: O + 2 e⁻ → O²⁻. Jedes Sauerstoff-Atom nimmt zwei Elektronen auf.');
      } },
      { id: 'a5-redox', topic: 'Redoxreaktion', make() {
        return mc('Was ist eine Redoxreaktion?', ['Eine Elektronenübertragungsreaktion: Oxidation und Reduktion laufen gleichzeitig ab.', 'Eine Reaktion nur mit Oxidation.', 'Eine Reaktion nur mit Reduktion.', 'Eine Reaktion ohne Teilchen.'],
          'Das Wort ist die Kurzform von Reduktions-Oxidations-Reaktion. Das Kupfer gibt Elektronen ab, der Sauerstoff nimmt sie auf.');
      } },
      { id: 'a5-elek', topic: 'Elektronenbilanz', make() {
        const n = rnd([2, 3, 4, 5, 10]), e = 2 * n;
        return num(`Bei der Oxidation geben ${fmt(n)} Kupfer-Atome je 2 Elektronen ab. Wie viele Elektronen werden insgesamt abgegeben?`, 'Elektronen', e, 'Multipliziere die Anzahl Atome mit 2.', `${fmt(n)} · 2 = ${fmt(e)} Elektronen`);
      } },
      { id: 'a5-strom', topic: 'Strom und Redox', make() {
        return mc('Wie hängen elektrischer Strom und Redoxreaktionen zusammen?', ['Strom kann Redoxreaktionen auslösen (Elektrolyse, Galvanisierung). Redoxreaktionen können Strom liefern (Batterie, Brennstoffzelle).', 'Strom und Redoxreaktionen haben nichts miteinander zu tun.', 'Nur Strom löst Redoxreaktionen aus, nie umgekehrt.', 'Nur Batterien nutzen Strom.'],
          'Bewegte Elektronen sind elektrischer Strom. Werden bei einer Redoxreaktion die Elektronen durch ein Kabel gelenkt, fliesst Strom.');
      } },
      { id: 'a5-brenn', topic: 'Brennstoffzelle', make() {
        return mc('Was geschieht in einer Brennstoffzelle?', ['Wasserstoff und Sauerstoff reagieren zu Wasser. Die chemische Energie wird in elektrische Energie umgewandelt.', 'Wasser wird zu Wasserstoff und Sauerstoff zerlegt.', 'Es wird nur Wärme erzeugt.', 'Es entsteht Kochsalz.'],
          'Brennstoffzellenfahrzeuge nutzen diese Umwandlung, um den Motor mit elektrischer Energie anzutreiben.');
      } }
    ]
  },
  {
    id: 'a6', nr: 6, title: 'Radioaktivität und Kernenergie', sub: 'Zerfall, Spaltung und Fusion',
    items: [
      { id: 'a6-radio', topic: 'Radioaktiver Zerfall', make() {
        return mc('Was ist Radioaktivität?', ['Die Eigenschaft instabiler Atomkerne, sich spontan umzuwandeln und Energie abzugeben.', 'Eine Eigenschaft der Elektronen.', 'Eine chemische Reaktion in der Hülle.', 'Eine Eigenschaft aller Stoffe.'],
          'Befinden sich zu wenige Neutronen zwischen den Protonen, stossen sich diese ab und der Kern zerfällt. Die Kernenergie wird dabei in thermische Energie umgewandelt.');
      } },
      { id: 'a6-hwz', topic: 'Halbwertszeit', make() {
        return mc('Was ist die Halbwertszeit?', ['Die Zeit, in der die Hälfte der Atomkerne eines radioaktiven Stoffs zerfällt.', 'Die Zeit, bis alles zerfallen ist.', 'Die halbe Lebenszeit eines Menschen.', 'Die Zeit eines Experiments.'],
          'Kohlenstoff-14 hat eine Halbwertszeit von 5730 Jahren. Radioaktives Iod hat eine von etwa 8 Tagen.');
      } },
      { id: 'a6-halb', topic: 'Reste berechnen', make() {
        const s = rnd([[80, 3], [64, 4], [100, 2], [48, 4], [32, 5], [200, 3]]), r = r2(s[0] / Math.pow(2, s[1]));
        return num(`Von einer radioaktiven Probe sind ${fmt(s[0])} g vorhanden. Es vergehen ${fmt(s[1])} Halbwertszeiten. Wie viele Gramm sind noch radioaktiv?`, 'g', r, 'Nach jeder Halbwertszeit halbiert sich die Menge.', `${fmt(s[0])} g : 2<sup>${fmt(s[1])}</sup> = ${fmt(s[0])} g : ${fmt(Math.pow(2, s[1]))} = ${fmt(r)} g`);
      } },
      { id: 'a6-spalt', topic: 'Kernspaltung', make() {
        return mc('Wie läuft eine Kernspaltung ab?', ['Ein grosser Kern (zum Beispiel Uran-235) wird mit Neutronen beschossen und zerfällt in kleinere Kerne. Dabei werden weitere Neutronen frei: Es entsteht eine Kettenreaktion.', 'Zwei kleine Kerne verschmelzen.', 'Elektronen werden abgegeben.', 'Ein Atom wird in Wasser gelöst.'],
          'In Kernenergieanlagen wird die Kettenreaktion kontrolliert, die frei werdende thermische Energie wird in elektrische Energie umgewandelt.');
      } },
      { id: 'a6-fusion', topic: 'Kernfusion', make() {
        return mc('Was ist Kernfusion und wo kommt sie natürlich vor?', ['Kleine Atomkerne verschmelzen. In der Sonne fusionieren Wasserstoff-Kerne zu Helium-Kernen.', 'Grosse Kerne werden gespalten.', 'Moleküle werden zerlegt.', 'Eine Reaktion in der Atomhülle.'],
          'Dabei wird Kernenergie in thermische Energie umgewandelt. Eine Nutzung auf der Erde ist noch nicht dauerhaft gelungen.');
      } },
      { id: 'a6-nutz', topic: 'Nutzen und Gefahren', make() {
        return mc('Worin unterscheiden sich chemische Reaktionen und Kernreaktionen, und welche Rolle spielt die Kernenergie für Mensch und Umwelt?', ['Chemische Reaktionen betreffen die Atomhülle, Kernreaktionen den Atomkern. Kernenergie liefert Strom und hilft in der Medizin, ist aber bei Waffen und Unfällen gefährlich.', 'Beide betreffen nur den Kern.', 'Kernenergie ist immer ungefährlich.', 'Kernenergie gibt es nur im Weltall.'],
          'Nützlich sind zum Beispiel Stromerzeugung und Krebstherapie. Schädlich sind Atombomben und eine nicht kontrollierte Kettenreaktion (Nuklearkatastrophe).');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  a1: [
    { h: 'Was ist ein Atom?',
      body: `<p>Es sind <b>118 Atomsorten</b> bekannt. Ein <b>Element</b> besteht immer aus einer einzigen Atomsorte. Das Wort «Atom» heisst «unteilbar». Heute weisst du, dass Atome aus noch kleineren Teilchen bestehen.</p>
        ${merk('Atommodelle sind <b>Denkmodelle</b>. Sie beruhen auf Vermutungen, weil man Atomen nicht ins Innere sehen kann. Mit besseren Modellen lässt sich das Verhalten der Atome immer genauer erklären.')}` },
    { h: 'Welches Modell ist es?',
      body: '<p>Ordne die Beschreibungen den Modellen zu.</p>', sim: 'modelle' },
    { h: 'Die Modelle der Reihe nach',
      body: `<ul><li><b>Dalton (1808):</b> Atome sind homogene Kugeln. Atome eines Elements sind gleichartig.</li>
        <li><b>Thomson:</b> Rosinenkuchen. Elektronen sind in einer positiv geladenen Masse verteilt.</li>
        <li><b>Rutherford (1911):</b> kleiner Kern mit Protonen, Elektronen bilden die Hülle, dazwischen leerer Raum.</li>
        <li><b>Bohr (1913):</b> Elektronen auf Kreisbahnen, später das Schalenmodell.</li>
        <li><b>Orbitalmodell:</b> nur der wahrscheinlichste Aufenthaltsort der Elektronen lässt sich angeben.</li></ul>` },
    { h: 'Vorgerechnet: Zeit zwischen Modellen', worked: {
      given: 'Dalton stellte sein Modell 1808 vor, Rutherford 1911. Wie viele Jahre liegen dazwischen?',
      steps: [['Rechnung', '1911 − 1808 = 103'], ['Antwort', 'Es sind 103 Jahre. So lange dauerte es, bis der Atomkern entdeckt wurde.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum gibt es mehrere Atommodelle?',
        options: ['Weil sich die Erkenntnisse durch Forschung verändert haben und neue Modelle mehr erklären können.', 'Weil jeder Forscher ein anderes Atom hatte.', 'Weil Atome ihre Form ändern.', 'Weil Modelle immer falsch sind.'],
        explain: 'Neue Experimente zeigten, was ältere Modelle nicht erklären konnten. Darum wurden die Modelle verbessert.' } }
  ],
  a2: [
    { h: 'Rutherfords Versuch',
      body: `<p>Rutherford beschoss eine hauchdünne <b>Goldfolie</b> mit <b>Alpha-Teilchen</b>. Fast alle flogen hindurch. Etwa <b>eines von 8000</b> wurde abgelenkt oder zurückgeworfen.</p>
        ${merk('Folgerung: Atome bestehen zum grossen Teil aus <b>leerem Raum</b>. Im Inneren gibt es ein kleines, massives, positiv geladenes <b>Zentrum</b>, den <b>Atomkern</b>.')}` },
    { h: 'Schiesse auf die Goldfolie',
      body: '<p>Stelle die Anzahl der Alpha-Teilchen ein. Du siehst, wie viele hindurchgehen und wie viele abgelenkt werden. Das ist ein Modell mit gerundeten Werten.</p>', sim: 'streu' },
    { h: 'Bohrs Bahnen',
      body: `<p>Bohr erklärte das Licht des Wasserstoffs: Das Elektron bewegt sich im <b>Grundzustand</b> nahe am Kern. Nimmt es Energie auf, springt es auf eine weiter entfernte Bahn (<b>angeregter Zustand</b>). Fällt es zurück, strahlt es die Energie wieder ab, oft als Licht einer bestimmten Farbe.</p>
        <p>Beim Weiterentwickeln wurde daraus das <b>Schalenmodell</b>. Metallsalze färben deshalb eine Flamme in verschiedenen Farben.</p>` },
    { h: 'Vorgerechnet: Abgelenkte Teilchen', worked: {
      given: 'Eines von 8000 Alpha-Teilchen wird abgelenkt. Wie viele sind es bei 40 000 Teilchen?',
      steps: [['Rechnung', '40 000 : 8000 = 5'], ['Antwort', 'Etwa 5 Teilchen werden abgelenkt. Das ist sehr selten, deshalb ist der Kern so klein.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was zeigte Rutherfords Versuch über das Atom?',
        options: ['Es hat einen kleinen, massiven, positiven Kern und besteht sonst fast nur aus leerem Raum.', 'Es ist eine massive Kugel.', 'Es hat keine Elektronen.', 'Es ist negativ geladen.'],
        explain: 'Fast alle Teilchen gingen hindurch, wenige wurden abgelenkt. Das spricht für einen winzigen Kern.' } }
  ],
  a3: [
    { h: 'Teilchen im Atom',
      body: `<ul><li><b>Proton:</b> Ladung +1, im Kern, Masse 1.</li><li><b>Neutron:</b> Ladung 0, im Kern, Masse 1.</li><li><b>Elektron:</b> Ladung −1, in der Hülle, Masse fast 0 (0,0005).</li></ul>
        ${merk('Die <b>Ordnungszahl</b> ist die Anzahl <b>Protonen</b>. Sie bestimmt die Atomsorte. Ein neutrales Atom hat gleich viele Elektronen wie Protonen.')}` },
    { h: 'Baue ein Atom',
      body: '<p>Verändere Protonen, Neutronen und Elektronen. Du siehst, welches Element entsteht, wie schwer es ist und ob es ein Atom oder ein Ion ist. Gezeigt werden die ersten 20 Elemente.</p>', sim: 'atombau' },
    { h: 'Ionen, Neutronen und Isotope',
      body: `<ul><li><b>Kation:</b> weniger Elektronen als Protonen (positiv). <b>Anion:</b> mehr Elektronen als Protonen (negativ).</li>
        <li><b>Massenzahl</b> = Protonen + Neutronen.</li>
        <li><b>Isotope:</b> gleiche Protonenzahl, verschiedene Neutronenzahl. Kohlenstoff-12 hat 6, Kohlenstoff-13 hat 7 Neutronen.</li>
        <li>Neutronen machen den Kern stabil.</li></ul>` },
    { h: 'Elektronen in Schalen',
      body: `<p>Die innerste Schale fasst 2 Elektronen, die zweite 8. Die Anordnung heisst <b>Elektronenkonfiguration</b>. Natrium hat 11 Elektronen: <b>2/8/1</b>.</p>
        <p>Je mehr Schalen, desto grösser das Atom: Der Atomradius nimmt in einer Gruppe von oben nach unten zu. Das einfache Schalenmodell gilt zuverlässig bis zur Ordnungszahl 20.</p>` },
    { h: 'Vorgerechnet: Neutronen', worked: {
      given: 'Uran hat die Ordnungszahl 92. Ein Uran-Atom hat die Massenzahl 238. Wie viele Neutronen hat es?',
      steps: [['Formel', 'Neutronen = Massenzahl − Protonen'], ['Rechnung', '238 − 92 = 146'], ['Antwort', 'Das Uran-Atom hat 146 Neutronen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Ein Atom hat 11 Protonen und 10 Elektronen. Was ist es?',
        options: ['Ein positiv geladenes Ion (Kation).', 'Ein neutrales Atom.', 'Ein negativ geladenes Ion (Anion).', 'Ein Isotop.'],
        explain: 'Es hat ein Elektron weniger als Protonen. Damit ist es einfach positiv geladen.' } }
  ],
  a4: [
    { h: 'Die Edelgasregel',
      body: `${merk('Edelgase haben eine <b>voll besetzte äusserste Schale</b> (Helium 2, die anderen 8 Elektronen). Das ist ein energiearmer, stabiler Zustand. Alle Atome <b>streben</b> diese <b>Edelgaskonfiguration</b> an.')}
        <p>Sie erreichen sie, indem sie Elektronen abgeben, aufnehmen oder gemeinsam nutzen.</p>` },
    { h: 'Ionenbindung',
      body: `<p>Reagieren <b>Metall-Atome</b> mit <b>Nichtmetall-Atomen</b>, geben die Metalle Elektronen ab und die Nichtmetalle nehmen sie auf. Die entstehenden Ionen ziehen sich an und bilden ein <b>Gitter</b>.</p>
        <p>Beispiel Kochsalz: Na → Na⁺ + e⁻ und Cl + e⁻ → Cl⁻.</p>`, },
    { h: 'Ionen verbinden sich',
      body: '<p>Wähle ein Metall und ein Nichtmetall. Du siehst, wie viele Elektronen übertragen werden und welche Formel entsteht. Das ist ein Modell.</p>', sim: 'ionbindung' },
    { h: 'Elektronenpaarbindung',
      body: `<p>Reagieren nur <b>Nichtmetall-Atome</b> miteinander, nutzen sie Elektronen aus der äussersten Schale <b>gemeinsam</b>. Es entsteht eine Elektronenpaarbindung und ein <b>Molekül</b>. Beispiel: Wasserstoff-Molekül H₂ (H–H).</p>` },
    { h: 'Vorgerechnet: Elektronen aufnehmen', worked: {
      given: 'Ein Chlor-Atom hat 7 Elektronen in der äussersten Schale. Wie viele muss es aufnehmen?',
      steps: [['Ziel', 'Edelgaskonfiguration mit 8 Elektronen'], ['Rechnung', '8 − 7 = 1'], ['Antwort', 'Chlor nimmt 1 Elektron auf und wird zum Chlorid-Anion Cl⁻.']] } },
    { h: 'Kurz testen',
      check: { q: 'Zwei Nichtmetall-Atome nutzen Elektronen gemeinsam. Welche Bindung ist das?',
        options: ['Eine Elektronenpaarbindung.', 'Eine Ionenbindung.', 'Eine Metallbindung.', 'Keine Bindung.'],
        explain: 'Wenn nur Nichtmetall-Atome reagieren, teilen sie Elektronen. Es entstehen Moleküle.' } }
  ],
  a5: [
    { h: 'Oxidation und Reduktion',
      body: `${merk('<b>Oxidation:</b> Elektronen werden <b>abgegeben</b>.<br><b>Reduktion:</b> Elektronen werden <b>aufgenommen</b>.<br><b>Redoxreaktion:</b> beides zusammen, eine <b>Elektronenübertragung</b>.')}
        <p>Beispiel Kupfer + Sauerstoff: Cu → Cu²⁺ + 2 e⁻ (Oxidation), O + 2 e⁻ → O²⁻ (Reduktion).</p>` },
    { h: 'Oxidation oder Reduktion?',
      body: '<p>Ordne die Teilreaktionen zu.</p>', sim: 'redox' },
    { h: 'Strom und Redoxreaktionen',
      body: `<ul><li>Strom löst Redoxreaktionen aus: <b>Elektrolyse</b> von Wasser und <b>Galvanisierung</b> (Münze verkupfern).</li>
        <li>Redoxreaktionen liefern Strom: <b>Batterie</b>, <b>Akku</b>, <b>Brennstoffzelle</b> (Wasserstoff und Sauerstoff reagieren zu Wasser).</li></ul>
        <p>Bewegte Elektronen sind elektrischer Strom.</p>` },
    { h: 'Vorgerechnet: Elektronen zählen', worked: {
      given: 'Bei der Oxidation geben 3 Kupfer-Atome je 2 Elektronen ab. Wie viele Elektronen sind das?',
      steps: [['Rechnung', '3 · 2 = 6'], ['Antwort', 'Es werden 6 Elektronen abgegeben. Sie werden von den Sauerstoff-Atomen aufgenommen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Umwandlung findet in einer Brennstoffzelle statt?',
        options: ['Chemische Energie wird in elektrische Energie umgewandelt.', 'Elektrische Energie wird in chemische Energie umgewandelt.', 'Lageenergie wird in Bewegungsenergie umgewandelt.', 'Es findet keine Umwandlung statt.'],
        explain: 'Wasserstoff und Sauerstoff reagieren zu Wasser. Dabei wird die chemische Energie zu elektrischer Energie.' } }
  ],
  a6: [
    { h: 'Radioaktiver Zerfall',
      body: `<p>Ein Atomkern mit zu wenigen Neutronen ist <b>instabil</b>: Die Protonen stossen sich ab, und der Kern wandelt sich in kleinere Kerne um. Dabei wird Strahlung abgegeben. Man nennt das <b>Radioaktivität</b>.</p>
        <p>Natürliche Strahlung kommt aus dem Weltall (kosmisch) und aus der Erde (terrestrisch), zum Beispiel vom Edelgas Radon.</p>` },
    { h: 'Die Halbwertszeit',
      body: `${merk('Die <b>Halbwertszeit</b> ist die Zeit, in der die <b>Hälfte</b> der radioaktiven Kerne zerfällt. Nach jeder Halbwertszeit halbiert sich die Menge noch einmal.')}
        <p>Kohlenstoff-14: 5730 Jahre (Altersbestimmung). Radioaktives Iod: etwa 8 Tage (Behandlung der Schilddrüse).</p>` },
    { h: 'Zerfall im Modell',
      body: '<p>Wähle ein Nuklid und schiebe die Zeit nach vorne. Das Modell zeigt die Restmenge einer Probe mit 64 g.</p>', sim: 'halbwert' },
    { h: 'Kernspaltung und Kernfusion',
      body: `<ul><li><b>Kernspaltung:</b> Ein grosser Kern (Uran-235) wird mit Neutronen beschossen und zerfällt. Die frei werdenden Neutronen spalten weitere Kerne: <b>Kettenreaktion</b>.</li>
        <li><b>Kernfusion:</b> Kleine Kerne verschmelzen. In der Sonne fusionieren Wasserstoff-Kerne zu Helium-Kernen.</li></ul>
        <p>Die Kernenergie wird in thermische Energie umgewandelt. Sie kann Strom liefern oder, als Atombombe, zerstören.</p>` },
    { h: 'Chemisch oder Kern?',
      body: '<p>Ordne die Vorgänge zu.</p>', sim: 'kern' },
    { h: 'Kurz testen',
      check: { q: 'Eine Probe hat eine Halbwertszeit von 8 Tagen. Wie viel ist nach 24 Tagen noch vorhanden?',
        options: ['Ein Achtel.', 'Die Hälfte.', 'Ein Viertel.', 'Nichts.'],
        explain: '24 Tage sind drei Halbwertszeiten. Die Menge halbiert sich dreimal: 1/2 · 1/2 · 1/2 = 1/8.' } }
  ]
};
const GOALS = {
  a1: ['die Entwicklung der Atommodelle beschreiben', 'Atommodelle als Denkmodelle verstehen'],
  a2: ['den Versuch von Rutherford erklären', 'das Modell von Bohr beschreiben'],
  a3: ['Protonen, Neutronen und Elektronen zählen', 'Isotope und Ionen unterscheiden'],
  a4: ['die Edelgasregel anwenden', 'Ionenbindung und Elektronenpaarbindung unterscheiden'],
  a5: ['Oxidation, Reduktion und Redoxreaktion unterscheiden', 'Zusammenhänge zwischen Strom und Reaktionen erklären'],
  a6: ['Radioaktivität und Halbwertszeit erklären', 'Kernspaltung und Kernfusion unterscheiden']
};
const LEARN = {
  'a1-element': 'Was ist ein Atom?', 'a1-modell': 'Was ist ein Atom?', 'a1-dalton': 'Die Modelle der Reihe nach', 'a1-thomson': 'Die Modelle der Reihe nach', 'a1-reihe': 'Welches Modell ist es?', 'a1-jahre': 'Vorgerechnet: Zeit zwischen Modellen',
  'a2-gold': 'Rutherfords Versuch', 'a2-kern': 'Rutherfords Versuch', 'a2-ablenk': 'Vorgerechnet: Abgelenkte Teilchen', 'a2-bohr': 'Bohrs Bahnen', 'a2-zustand': 'Bohrs Bahnen', 'a2-schalen': 'Bohrs Bahnen',
  'a3-teilchen': 'Teilchen im Atom', 'a3-ordnung': 'Teilchen im Atom', 'a3-neutronen': 'Vorgerechnet: Neutronen', 'a3-ion': 'Ionen, Neutronen und Isotope', 'a3-isotop': 'Ionen, Neutronen und Isotope', 'a3-schalen': 'Elektronen in Schalen',
  'a4-edel': 'Die Edelgasregel', 'a4-ion': 'Ionenbindung', 'a4-paar': 'Elektronenpaarbindung', 'a4-aufnehmen': 'Vorgerechnet: Elektronen aufnehmen', 'a4-nacl': 'Ionen verbinden sich', 'a4-gruppe': 'Ionen verbinden sich',
  'a5-oxi': 'Oxidation und Reduktion', 'a5-red': 'Oxidation und Reduktion', 'a5-redox': 'Oxidation oder Reduktion?', 'a5-elek': 'Vorgerechnet: Elektronen zählen', 'a5-strom': 'Strom und Redoxreaktionen', 'a5-brenn': 'Strom und Redoxreaktionen',
  'a6-radio': 'Radioaktiver Zerfall', 'a6-hwz': 'Die Halbwertszeit', 'a6-halb': 'Zerfall im Modell', 'a6-spalt': 'Kernspaltung und Kernfusion', 'a6-fusion': 'Kernspaltung und Kernfusion', 'a6-nutz': 'Chemisch oder Kern?'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Atom', pw: 'fängt an' },
  { xp: 80, name: 'Elektron', pw: 'kreist' },
  { xp: 200, name: 'Isotop', pw: 'trägt Neutronen' },
  { xp: 380, name: 'Ion', pw: 'hat Ladung' },
  { xp: 620, name: 'Reaktor', pw: 'spaltet Kerne' },
  { xp: 920, name: 'Sonne', pw: 'fusioniert' }
];

/* ---------- Thema: 9_2 Atommodelle nutzen ---------- */
const TOPIC = {
  id: 'nt9-2', storeKey: 'halingen-nt9-2-v1', other: { title: '8_4 Chemische Reaktionen erforschen', href: '8_4_Chemische_Reaktionen_erforschen.html' },
  title: 'Atommodelle nutzen', lead: 'Aufbau, Bindung, Redox und Kernenergie', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Ordnungszahl = Anzahl Protonen.', 'Nach jeder Halbwertszeit halbiert sich die Menge.'],
  formulas: [
    ['Teilchen', 'Proton +1, Neutron 0', 'Elektron −1'],
    ['Massenzahl', 'Protonen + Neutronen', 'Ordnungszahl = Protonen'],
    ['Edelgasregel', 'äusserste Schale voll', 'He: 2, sonst 8'],
    ['Bindungen', 'Ion: Metall + Nichtmetall', 'Elektronenpaar: Nichtmetalle'],
    ['Redox', 'Oxidation: Elektronen ab', 'Reduktion: Elektronen auf'],
    ['Halbwertszeit', 'Menge halbiert sich', 'Rest = Anfang : 2ⁿ']
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
const ELEM = ['Wasserstoff', 'Helium', 'Lithium', 'Beryllium', 'Bor', 'Kohlenstoff', 'Stickstoff', 'Sauerstoff', 'Fluor', 'Neon', 'Natrium', 'Magnesium', 'Aluminium', 'Silicium', 'Phosphor', 'Schwefel', 'Chlor', 'Argon', 'Kalium', 'Calcium'];
const SYM = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
const SIMS = {
  modelle(el) {
    sorter(el, [
      { t: 'Atome sind massive Kugeln, innen überall gleich', ok: ['da'], why: 'Das ist das Modell von Dalton mit homogenen Kugeln.' },
      { t: 'Positiv geladener «Teig» mit Elektronen wie Rosinen darin', ok: ['th'], why: 'Das ist das Rosinenkuchenmodell von Thomson.' },
      { t: 'Winziger positiver Kern, drumherum fast nur leerer Raum', ok: ['ru'], why: 'Das ist das Modell von Rutherford nach dem Goldfolienversuch.' },
      { t: 'Elektronen auf Kreisbahnen, beim Wechsel wird Energie aufgenommen oder abgegeben', ok: ['bo'], why: 'Das ist das Modell von Bohr.' },
      { t: 'Nur der wahrscheinlichste Aufenthaltsort der Elektronen lässt sich angeben', ok: ['or'], why: 'Das ist das Orbitalmodell, auf dem die aktuellen Modelle aufbauen.' }
    ], { da: 'Dalton', th: 'Thomson', ru: 'Rutherford', bo: 'Bohr', or: 'Orbital' }, 'Welches Atommodell ist gemeint?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  redox(el) {
    sorter(el, [
      { t: 'Cu → Cu²⁺ + 2 e⁻', ok: ['ox'], why: 'Das Kupfer-Atom gibt zwei Elektronen ab: Oxidation.' },
      { t: 'O + 2 e⁻ → O²⁻', ok: ['re'], why: 'Das Sauerstoff-Atom nimmt zwei Elektronen auf: Reduktion.' },
      { t: 'Ein Natrium-Atom gibt ein Elektron ab', ok: ['ox'], why: 'Elektronenabgabe heisst Oxidation.' },
      { t: 'Ein Chlor-Atom nimmt ein Elektron auf', ok: ['re'], why: 'Elektronenaufnahme heisst Reduktion.' },
      { t: 'Magnesium → Mg²⁺ + 2 e⁻', ok: ['ox'], why: 'Das Magnesium-Atom gibt Elektronen ab.' }
    ], { ox: 'Oxidation', re: 'Reduktion' }, 'Werden Elektronen abgegeben oder aufgenommen?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  kern(el) {
    sorter(el, [
      { t: 'Kupfer reagiert mit Sauerstoff zu Kupferoxid', ok: ['ch'], why: 'Es ändern sich Elektronen in der Atomhülle: chemische Reaktion.' },
      { t: 'Ein Urankern wird mit einem Neutron beschossen und zerfällt', ok: ['sp'], why: 'Ein grosser Kern wird gespalten: Kernspaltung.' },
      { t: 'In der Sonne verschmelzen Wasserstoff-Kerne zu Helium', ok: ['fu'], why: 'Kleine Kerne verschmelzen: Kernfusion.' },
      { t: 'Natrium gibt ein Elektron an Chlor ab', ok: ['ch'], why: 'Auch das ist eine Reaktion der Atomhülle.' },
      { t: 'In einer Kernenergieanlage wird Strom erzeugt', ok: ['sp'], why: 'Dort wird die Kernspaltung genutzt.' }
    ], { ch: 'Chemische Reaktion', sp: 'Kernspaltung', fu: 'Kernfusion' }, 'Welche Art von Reaktion ist es?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  streu(el) {
    el.innerHTML = `<div class="sim">${sl('sn', 'Anzahl Alpha-Teilchen', 1, 10, 1, 4, '000')}
      <div class="trio"><div><span class="k">Beschossen</span><b class="mono" id="s1"></b></div><div><span class="k">Hindurch</span><b class="mono" id="s2"></b></div><div><span class="k">Abgelenkt</span><b class="mono" id="s3"></b></div></div>
      <div class="brow"><span class="bname">Abgelenkt</span><div class="btrack"><div class="bfill th" id="sb"></div></div><b class="mono bval" id="sv"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const k = +$id('sn').value, n = k * 8000, a = k;
      $id('snv').textContent = String(k * 8);
      $id('s1').textContent = fmt(n); $id('s2').textContent = fmt(n - a); $id('s3').textContent = fmt(a);
      $id('sb').style.width = Math.min(100, a / n * 100 * 80) + '%'; $id('sv').textContent = '1 : 8000';
      $id('ro').innerHTML = `Von ${fmt(n)} Teilchen gehen fast alle durch. Nur etwa <b>${fmt(a)}</b> werden abgelenkt. Das spricht für ein winziges, massives Zentrum: den Atomkern (gerundete Werte).`;
    }
    $id('sn').addEventListener('input', upd); $id('sb').style.width = '0%'; nf(el, upd);
  },

  atombau(el) {
    el.innerHTML = `<div class="sim">${sl('ap', 'Protonen', 1, 20, 1, 11, '')}${sl('an', 'Neutronen', 0, 22, 1, 12, '')}${sl('ae', 'Elektronen', 0, 21, 1, 11, '')}
      <div class="trio"><div><span class="k">Element</span><b class="mono" id="a1"></b></div><div><span class="k">Masse</span><b class="mono" id="a2"></b></div><div><span class="k">Ladung</span><b class="mono" id="a3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function conf(e) { const cap = [2, 8, 8, 2], out = []; let r = e; for (let i = 0; i < cap.length && r > 0; i++) { const t = Math.min(cap[i], r); out.push(t); r -= t; } return out.join('/') || '0'; }
    function upd() {
      const p = +$id('ap').value, n = +$id('an').value, e = +$id('ae').value, ch = p - e;
      $id('apv').textContent = String(p); $id('anv').textContent = String(n); $id('aev').textContent = String(e);
      const sy = SYM[p - 1], nm = ELEM[p - 1];
      $id('a1').textContent = sy; $id('a2').textContent = String(p + n); $id('a3').textContent = ch === 0 ? '0' : (ch > 0 ? '+' + ch : String(ch));
      const typ = ch === 0 ? 'ein neutrales <b>Atom</b>' : ch > 0 ? 'ein <b>Kation</b> (positiv)' : 'ein <b>Anion</b> (negativ)';
      $id('ro').innerHTML = `${nm} (${sy}): ${typ}. Massenzahl ${p + n}, Ordnungszahl ${p}.<br>Elektronenkonfiguration: ${conf(e)}. ${p > 1 && n * 2 < p ? 'Sehr wenige Neutronen: Der Kern wäre instabil.' : ''}<br>Isotop: ${sy}-${p + n}.`;
    }
    ['ap', 'an', 'ae'].forEach(id => $id(id).addEventListener('input', upd)); upd();
  },

  ionbindung(el) {
    const R = {
      a: { n: 'Natrium + Chlor', m: 'Natrium', nm: 'Chlor', cm: 1, ca: 1, fm: 'Na⁺', fa: 'Cl⁻', f: 'NaCl' },
      b: { n: 'Magnesium + Sauerstoff', m: 'Magnesium', nm: 'Sauerstoff', cm: 2, ca: 2, fm: 'Mg²⁺', fa: 'O²⁻', f: 'MgO' },
      c: { n: 'Calcium + Chlor', m: 'Calcium', nm: 'Chlor', cm: 2, ca: 1, fm: 'Ca²⁺', fa: 'Cl⁻', f: 'CaCl₂' },
      d: { n: 'Lithium + Fluor', m: 'Lithium', nm: 'Fluor', cm: 1, ca: 1, fm: 'Li⁺', fa: 'F⁻', f: 'LiF' }
    };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Reaktion">${Object.keys(R).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-r="${k}">${R[k].n}</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function set(k) {
      const r = R[k], nA = r.cm / r.ca;
      el.querySelectorAll('[data-r]').forEach(b => b.classList.toggle('on', b.dataset.r === k));
      $id('ro').innerHTML = `<b>${r.m}</b>-Atom gibt <b>${r.cm}</b> Elektron${r.cm > 1 ? 'en' : ''} ab → ${r.fm}.<br><b>${r.nm}</b>-Atom nimmt <b>${r.ca}</b> Elektron${r.ca > 1 ? 'en' : ''} auf → ${r.fa}.<br>Auf 1 ${r.fm} kommen ${nA} ${r.fa}: Die Ladungen gleichen sich aus.<br>Formel: <b>${r.f}</b>. Modell im Schalenmodell.`;
    }
    el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => set(b.dataset.r)));
    set('a');
  },

  halbwert(el) {
    const N = { i: ['Radioaktives Iod', 8, 'Tage'], c: ['Kohlenstoff-14', 5730, 'Jahre'] };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Nuklid">${Object.keys(N).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-n="${k}">${N[k][0]}</button>`).join('')}</div>
      ${sl('hn', 'Anzahl Halbwertszeiten', 0, 6, 1, 0, '')}
      <div class="brow"><span class="bname">Restmenge</span><div class="btrack"><div class="bfill" id="hb"></div></div><b class="mono bval" id="hv"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let k = 'i';
    function upd() {
      const n = +$id('hn').value, m = 64 / Math.pow(2, n), t = n * N[k][1];
      $id('hnv').textContent = String(n);
      el.querySelectorAll('[data-n]').forEach(b => b.classList.toggle('on', b.dataset.n === k));
      $id('hb').style.width = (m / 64 * 100) + '%'; $id('hv').textContent = fmt(m) + ' g';
      $id('ro').innerHTML = `Nach ${n} Halbwertszeiten (${fmt(t)} ${N[k][2]}) sind von 64 g noch <b>${fmt(m)} g</b> vorhanden. Bei jeder Halbwertszeit halbiert sich die Menge. Modell.`;
    }
    el.querySelectorAll('[data-n]').forEach(b => b.addEventListener('click', () => { k = b.dataset.n; upd(); }));
    $id('hn').addEventListener('input', upd); $id('hb').style.width = '100%'; nf(el, upd);
  }
};


const INTERVALS = [0, 1, 3, 7, 14]; // Tage bis zur nächsten Wiederholung je Box
const ROUND_SIZE = 6;

/* ---------- Interaktive Simulationen (nur Geometrie, keine Illustrationen) ---------- */
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-2","titel":"Atommodelle nutzen","kapitel":"NaTech 9, Kapitel 2","audio":"nt9-2"});
