// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_3_Elektronische_Schaltungen_untersuchen.html
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

/* ---------- Inhalt: 9_3 Elektronische Schaltungen untersuchen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_3 (ein Lehrerkommentar liegt nicht vor). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'e1', nr: 1, title: 'Elektronik und LEDs', sub: 'Aufbau und Anwendungen',
    items: [
      { id: 'e1-led', topic: 'Was ist eine LED?', make() {
        return mc('Wofür steht die Abkürzung LED und wozu werden LEDs verwendet?', ['Licht emittierende Diode (Leuchtdiode). Sie wird als Leuchtmittel, Statusanzeige und Bauteil verwendet.', 'Lange elektrische Dauer.', 'Leitender elektrischer Draht.', 'Leichter elektronischer Drucker.'],
          'LEDs zeigen zum Beispiel an, ob ein Gerät ein- oder ausgeschaltet ist, bilden Leuchtziffern und Anzeigetafeln und dienen als sparsame Lampen.');
      } },
      { id: 'e1-anode', topic: 'Anode und Kathode', make() {
        return mc('Wie schliesst du eine LED richtig an?', ['Die Anode (der längere Anschluss) an den Pluspol, die Kathode (Seite mit der abgeflachten Stelle) an den Minuspol.', 'Die Kathode an den Pluspol.', 'Es ist egal, wie herum.', 'Beide an den Pluspol.'],
          'Die LED leitet den Strom nur in einer Richtung. Du erkennst die Kathode am kürzeren Anschluss und an der flachen Stelle der Kunststofflinse.');
      } },
      { id: 'e1-richtung', topic: 'Falsch angeschlossen', make() {
        return mc('Du vertauschst die Pole an einer LED. Was geschieht?', ['Es fliesst kein Strom und die LED leuchtet nicht.', 'Die LED leuchtet heller.', 'Die LED schmilzt immer sofort.', 'Die LED leuchtet in einer anderen Farbe.'],
          'Das gilt für alle Dioden. Die LED sperrt den Strom in der falschen Richtung.');
      } },
      { id: 'e1-blau', topic: 'Blaue LEDs', make() {
        return mc('Warum waren blaue LEDs so wichtig?', ['Erst mit blauen LEDs konnten weisse LEDs und grosse, helle Bildschirme gebaut werden. Das spart elektrische Energie.', 'Blaues Licht ist wärmer.', 'Blaue LEDs sind billiger als alle anderen.', 'Sie sind nur Dekoration.'],
          'Drei japanische Forscher entwickelten 1992 die blaue LED und erhielten dafür 2014 den Nobelpreis für Physik. Weisse LEDs entstehen, wenn eine blaue LED eine spezielle Leuchtschicht erhält.');
      } },
      { id: 'e1-rgb', topic: 'RGB-LED im Bildschirm', make() {
        return mc('Wie entstehen die Farben eines Bildpunkts auf einem LED-Bildschirm?', ['Ein roter, ein grüner und ein blauer LED-Chip leuchten verschieden hell. Die Farben mischen sich additiv.', 'Jeder Bildpunkt hat eine Farbe, die nicht verändert werden kann.', 'Es werden Farben auf die Lampe gemalt.', 'Die Farben stammen von einem Prisma.'],
          'In modernen Bildschirmen sind die drei Chips in einer RGB-LED in einem einzigen Gehäuse.');
      } },
      { id: 'e1-chips', topic: 'LED-Chips zählen', ext: true, make() {
        const n = rnd([1000, 5000, 20000, 100000]), c = 3 * n;
        return num(`Ein LED-Bildschirm hat ${fmt(n)} Bildpunkte. Jeder Bildpunkt ist eine RGB-LED mit je 3 Chips (rot, grün, blau). Wie viele LED-Chips sind es insgesamt?`, 'Chips', c, 'Multipliziere die Anzahl Bildpunkte mit 3.', `${fmt(n)} · 3 = ${fmt(c)} Chips`);
      } }
    ]
  },
  {
    id: 'e2', nr: 2, title: 'Widerstände und Vorwiderstand', sub: 'LED richtig betreiben',
    items: [
      { id: 'e2-fest', topic: 'Festwiderstände', make() {
        return mc('Was ist ein Festwiderstand und wie erkennst du seinen Wert?', ['Ein Bauteil mit festem Widerstandswert in Ohm (Ω). Der Wert ist als Farbcode aufgedruckt.', 'Ein Widerstand, den man drehen kann.', 'Ein Bauteil ohne Widerstand.', 'Ein Bauteil, das Licht abgibt.'],
          'Das Formelzeichen ist R, die Einheit Ohm (Ω). Die kleinen Festwiderstände auf Leiterplatten tragen farbige Ringe.');
      } },
      { id: 'e2-vor', topic: 'Zweck des Vorwiderstands', make() {
        return mc('Warum braucht eine LED einen Vorwiderstand?', ['Er begrenzt die Stromstärke und die Spannung an der LED. Ohne ihn geht die LED kaputt.', 'Er macht die LED heller.', 'Er verändert die Farbe der LED.', 'Er speichert Energie.'],
          'Eine normale rote LED verträgt höchstens 20 mA und eine Spannung zwischen 1,6 V und 2,1 V.');
      } },
      { id: 'e2-serie', topic: 'Serie mit Vorwiderstand', make() {
        return mc('LED und Vorwiderstand sind in Serie geschaltet. Was gilt?', ['Die Stromstärke ist überall gleich. Die Spannung der Batterie teilt sich auf LED und Widerstand auf.', 'Die Spannung ist überall gleich.', 'Die Stromstärke teilt sich auf.', 'Es fliesst kein Strom.'],
          'Es gilt U = U₁ + U₂ und I₁ = I₂. Es ist egal, auf welcher Seite der LED der Widerstand steht.');
      } },
      { id: 'e2-gross', topic: 'Grösse des Vorwiderstands', make() {
        return mc('Du vergrösserst den Vorwiderstand. Was geschieht mit Stromstärke und Spannung an der LED?', ['Beide werden kleiner.', 'Beide werden grösser.', 'Die Stromstärke wird grösser, die Spannung kleiner.', 'Beide bleiben gleich.'],
          'Je grösser der Vorwiderstand, desto kleiner sind die Stromstärke und die Spannung an der LED. Bei zu grossem Widerstand leuchtet die LED nicht mehr.');
      } },
      { id: 'e2-rechnen', topic: 'Vorwiderstand berechnen', make() {
        const s = rnd([[4.5, 20], [9, 20], [5, 10], [4.5, 10], [6, 20], [9, 10]]), r = Math.round((s[0] - 2) / (s[1] / 1000));
        return num(`Eine rote LED (Spannung 2 V, Beispielwert) soll mit der Stromstärke ${fmt(s[1])} mA an einer Batterie mit ${fmt(s[0])} V betrieben werden. Welchen Vorwiderstand brauchst du? Rechne mit R = U : I.`, 'Ω', r, 'Am Widerstand liegt die Differenz aus Batteriespannung und LED-Spannung. Rechne die mA in A um.', `U<sub>R</sub> = ${fmt(s[0])} V − 2 V = ${fmt(s[0] - 2)} V<br>R = ${fmt(s[0] - 2)} V : ${fmt(s[1] / 1000)} A = ${fmt(r)} Ω`);
      } },
      { id: 'e2-uwid', topic: 'Spannung am Widerstand', make() {
        const s = rnd([[4.5, 2], [9, 2], [6, 2], [5, 1.8], [4.5, 1.8], [9, 2.1]]), u = r2(s[0] - s[1]);
        return num(`Eine Batterie mit ${fmt(s[0])} V speist eine LED mit einem Vorwiderstand in Serie. An der LED liegen ${fmt(s[1])} V. Wie gross ist die Spannung am Widerstand?`, 'V', u, 'Die Spannungen in Serie ergeben zusammen die Batteriespannung.', `${fmt(s[0])} V − ${fmt(s[1])} V = ${fmt(u)} V`);
      } }
    ]
  },
  {
    id: 'e3', nr: 3, title: 'Halbleiter', sub: 'Zwischen Leiter und Isolator',
    items: [
      { id: 'e3-leiter', topic: 'Leiter und Nichtleiter', make() {
        return mc('Warum leiten Metalle Strom, Glas und Kunststoff aber nicht?', ['In Metallen sind Elektronen frei beweglich, in Glas und Kunststoff nicht.', 'Metalle sind kälter.', 'Glas ist zu glatt.', 'Kunststoff hat keine Atome.'],
          'Materialien, die Strom leiten, heissen Leiter. Materialien, die ihn nicht leiten, heissen Nichtleiter oder Isolatoren.');
      } },
      { id: 'e3-halb', topic: 'Halbleiter', make() {
        return mc('Was zeichnet einen Halbleiter aus?', ['Er leitet bei Zimmertemperatur Strom, aber viel schlechter als Metalle. Er leitet besser, wenn er wärmer ist oder Licht auf ihn fällt.', 'Er leitet immer gleich gut wie Metalle.', 'Er leitet nie.', 'Er leitet nur im Dunkeln.'],
          'Bei sehr tiefen Temperaturen leitet ein Halbleiter nicht, denn die äusseren Elektronen sind stark gebunden.');
      } },
      { id: 'e3-loch', topic: 'Loch', make() {
        return mc('Was ist ein «Loch» im Halbleiter?', ['Ein Atom, dem ein Elektron fehlt. Es ist positiv geladen.', 'Ein echtes Loch im Material.', 'Ein zusätzliches Elektron.', 'Ein Neutron.'],
          'Weil immer wieder anderen Atomen ein Elektron fehlt, scheinen sich die Löcher zu bewegen. Man nennt das Löcherleitung.');
      } },
      { id: 'e3-eigen', topic: 'Eigenleitung', make() {
        return mc('Was ist die Eigenleitung eines Halbleiters?', ['Elektronenleitung und Löcherleitung zusammen.', 'Die Leitung durch Fremdatome allein.', 'Die Leitung durch Kabel.', 'Die Leitung nur im Vakuum.'],
          'Bei Zimmertemperatur ist die Eigenleitung gering. Sie nimmt zu, wenn die Temperatur steigt oder Licht einfällt.');
      } },
      { id: 'e3-si', topic: 'Silizium', make() {
        return mc('Was weisst du über Silizium?', ['Es ist ein Halbmetall und der häufigste Halbleiter. Für Bauteile muss es sehr rein sein.', 'Es ist ein Edelgas.', 'Es leitet wie Kupfer.', 'Es kommt kaum auf der Erde vor.'],
          'Silizium ist das zweithäufigste Element der Erdkruste. Sand und Gestein enthalten viel davon. Die Gegend «Silicon Valley» heisst nach dem englischen Wort silicon.');
      } },
      { id: 'e3-licht', topic: 'Licht und Leitung', make() {
        return mc('Warum leitet ein Halbleiter besser, wenn Licht auf ihn fällt?', ['Das Licht löst mehr Elektronen von den Atomen. Es gibt mehr freie Elektronen und Löcher.', 'Das Licht erwärmt nur die Luft.', 'Das Licht entfernt die Atome.', 'Das Licht verändert die Spannung.'],
          'Mit steigender Temperatur oder mehr Licht nehmen sowohl die freien Elektronen als auch die Löcher zu.');
      } }
    ]
  },
  {
    id: 'e4', nr: 4, title: 'Dotierung, Diode und Transistor', sub: 'Halbleiter-Bauteile',
    items: [
      { id: 'e4-dot', topic: 'Dotierung', make() {
        return mc('Was bedeutet Dotierung?', ['Einzelne Atome im Halbleiter-Gitter werden durch Fremdatome ersetzt, zum Beispiel jedes millionste.', 'Das Halbleiter-Gitter wird geschmolzen.', 'Der Halbleiter wird gefärbt.', 'Der Halbleiter wird unter Wasser gesetzt.'],
          'Dadurch entstehen auch bei Zimmertemperatur frei bewegliche Elektronen oder Löcher. Man unterscheidet p- und n-Dotierung.');
      } },
      { id: 'e4-p', topic: 'p-Dotierung', make() {
        return mc('Wie entsteht eine p-Dotierung von Silizium?', ['Silizium-Atome werden durch Atome mit weniger als vier Aussenelektronen ersetzt, zum Beispiel Indium oder Bor. Es entstehen Löcher.', 'Durch Atome mit mehr als vier Aussenelektronen.', 'Durch zusätzliche Neutronen.', 'Durch Erhitzen.'],
          'Indium hat drei Aussenelektronen. Das vierte Elektron holt es sich von einem Nachbaratom, dort bleibt ein Loch zurück.');
      } },
      { id: 'e4-n', topic: 'n-Dotierung', make() {
        return mc('Wie entsteht eine n-Dotierung von Silizium?', ['Silizium-Atome werden durch Atome mit mehr als vier Aussenelektronen ersetzt, zum Beispiel Arsen. Es entstehen frei bewegliche Elektronen.', 'Durch Atome mit weniger als vier Aussenelektronen.', 'Durch Entfernen von Protonen.', 'Durch Abkühlen.'],
          'Arsen hat fünf Aussenelektronen. Vier werden ins Gitter eingebunden, das fünfte kann sich frei bewegen: Elektronenleitung.');
      } },
      { id: 'e4-diode', topic: 'Diode', make() {
        return mc('Was macht eine Diode?', ['Sie lässt den Strom nur in eine Richtung durch und schützt so Geräte, wenn zum Beispiel Batterien falsch herum eingesetzt werden.', 'Sie lässt den Strom in beide Richtungen durch.', 'Sie verstärkt den Strom.', 'Sie speichert Spannung.'],
          'Dioden bestehen aus einer Kombination dotierter Halbleiter. Auch eine LED ist eine Diode.');
      } },
      { id: 'e4-trans', topic: 'Transistor', make() {
        return mc('Was können Transistoren?', ['Sie schalten elektronisch (ohne Hand) und können einen elektrischen Strom verstärken.', 'Sie speichern Licht.', 'Sie senden Funk.', 'Sie messen die Temperatur.'],
          'Erst durch Transistoren wurde moderne Elektronik möglich. In einem Mikroprozessor sitzen Milliarden mikroskopisch kleiner Transistoren.');
      } },
      { id: 'e4-dotier', topic: 'Fremdatome zählen', ext: true, make() {
        const n = rnd([2, 3, 5, 10, 20]);
        return num(`Bei einer Dotierung wird jedes millionste Atom durch ein Fremdatom ersetzt. Wie viele Fremdatome sind es bei ${fmt(n)} Millionen Atomen?`, 'Fremdatome', n, 'Auf jede Million Atome kommt ein Fremdatom.', `${fmt(n)} Millionen : 1 Million = ${fmt(n)}`);
      } }
    ]
  },
  {
    id: 'e5', nr: 5, title: 'Sensoren', sub: 'Elektronische «Sinnesorgane»',
    items: [
      { id: 'e5-sensor', topic: 'Was ist ein Sensor?', make() {
        return mc('Was ist ein Sensor?', ['Ein Bauteil, das Eigenschaften oder Ereignisse der Umwelt erfasst, ähnlich wie ein Sinnesorgan.', 'Ein Kabel.', 'Ein Bildschirm.', 'Eine Batterie.'],
          'Es gibt Sensoren für Schall, Temperatur, Berührung, Licht, Bewegung und Distanzen. Einige erfassen sogar, was Menschen nicht wahrnehmen, zum Beispiel Feinstaub oder Ozon.');
      } },
      { id: 'e5-passiv', topic: 'Fotowiderstand', make() {
        return mc('Wie reagiert ein Fotowiderstand auf Licht?', ['Je mehr Licht, desto kleiner sein Widerstand. Es fliesst mehr Strom und eine LED leuchtet.', 'Je mehr Licht, desto grösser sein Widerstand.', 'Er erzeugt selbst Strom.', 'Er reagiert nicht auf Licht.'],
          'Der Fotowiderstand ist ein passiver Sensor: Er stellt selbst keine elektrische Energie bereit.');
      } },
      { id: 'e5-aktiv', topic: 'Aktive Sensoren', make() {
        return mc('Warum ist eine Solarzelle ein aktiver Sensor?', ['Sie stellt selbst elektrische Energie bereit, wenn Licht auf sie fällt.', 'Sie braucht immer eine Batterie.', 'Sie hat keinen Anschluss.', 'Sie leuchtet selbst.'],
          'Eine Solarzelle wandelt Strahlungsenergie in elektrische Energie um. Je mehr Licht, desto mehr elektrische Energie.');
      } },
      { id: 'e5-phone', topic: 'Sensoren im Smartphone', make() {
        return mc('Welcher Sensor sorgt dafür, dass der Bildschirm beim Telefonieren am Ohr dunkel wird?', ['Der Näherungssensor.', 'Der Barometer.', 'Das Mikrofon.', 'Der GPS-Empfänger.'],
          'Der Helligkeitssensor regelt die Helligkeit, der Beschleunigungssensor zählt Schritte, das Magnetometer ergibt den Kompass, das Barometer misst den Luftdruck.');
      } },
      { id: 'e5-bew', topic: 'Bewegungssensor', make() {
        return mc('In welchen Geräten steckt oft ein Bewegungssensor?', ['In Lampen, die beim Näherkommen angehen, und in Alarmanlagen.', 'In Taschenrechnern.', 'In Brotmessern.', 'In Kerzen.'],
          'Der Sensor erfasst eine Veränderung in der Umwelt und löst ein Ereignis aus, zum Beispiel das Einschalten einer Lampe.');
      } },
      { id: 'e5-mess', topic: 'Messen mit Sensoren', make() {
        return mc('Wozu werden Sensoren in einer Wetterstation gebraucht?', ['Um Luftdruck, Temperatur und Luftfeuchtigkeit zu messen.', 'Um das Wetter zu machen.', 'Um Blitze zu erzeugen.', 'Um Wolken zu färben.'],
          'Dazu braucht es einen Luftdrucksensor, einen Temperatursensor und einen Feuchtigkeitssensor.');
      } }
    ]
  },
  {
    id: 'e6', nr: 6, title: 'Schaltungen lesen und bauen', sub: 'Poti, Strom und Schaltplan',
    items: [
      { id: 'e6-poti', topic: 'Potenziometer', make() {
        return mc('Was ist ein Potenziometer (Poti)?', ['Ein Widerstand, dessen Wert sich mechanisch verändern lässt, durch Drehen oder Schieben.', 'Ein Widerstand mit festem Wert.', 'Ein Bauteil, das Licht misst.', 'Eine Batterie.'],
          'Es gibt Drehpotis, Schiebepotis und kleine Trimmpotis. Du kennst sie von Reglern am Mischpult.');
      } },
      { id: 'e6-klein', topic: 'Zu kleiner Vorwiderstand', make() {
        return mc('Der Vorwiderstand einer LED ist zu klein. Was ist die Folge?', ['Stromstärke und Spannung an der LED sind zu gross, die LED geht kaputt.', 'Die LED bleibt dunkel.', 'Die LED leuchtet blau.', 'Nichts geschieht.'],
          'Eine zu grosse Stromstärke zerstört den LED-Chip. Darum rechnest du den Vorwiderstand vorher aus.');
      } },
      { id: 'e6-poti-num', topic: 'Widerstand im Schiebepoti', make() {
        const s = rnd([[10, 30], [10, 60], [20, 25], [5, 40], [50, 10], [10, 80]]), r = r2(s[0] * s[1] / 100);
        return num(`Ein Schiebepoti hat zwischen den Enden einen Gesamtwiderstand von ${fmt(s[0])} kΩ. Der Schleifer steht bei ${fmt(s[1])} % der Länge von Kontakt 1 aus. Wie gross ist der Widerstand zwischen Kontakt 1 und dem Schleifer? Der Widerstand wächst gleichmässig mit der Länge.`, 'kΩ', r, 'Der Widerstand ist proportional zur Länge der Widerstandsschicht.', `${fmt(s[0])} kΩ · ${fmt(s[1])} % = ${fmt(r)} kΩ`);
      } },
      { id: 'e6-strom', topic: 'Stromstärke der LED', ext: true, make() {
        const s = rnd([[4.5, 125, 20], [9, 350, 20], [5, 300, 10], [6, 200, 20], [4.5, 250, 10]]), i = r2((s[0] - 2) / s[1] * 1000);
        return num(`Eine LED (2 V, Beispielwert) wird mit einem Vorwiderstand von ${fmt(s[1])} Ω an ${fmt(s[0])} V betrieben. Wie gross ist die Stromstärke in mA?`, 'mA', i, 'Am Widerstand liegen U − 2 V. Rechne I = U : R und wandle in mA um.', `I = ${fmt(s[0] - 2)} V : ${fmt(s[1])} Ω = ${fmt(i / 1000)} A = ${fmt(i)} mA`);
      } },
      { id: 'e6-trans', topic: 'Transistor in der Sensorschaltung', make() {
        return mc('Eine LED soll durch einen Berührungssensor zum Leuchten gebracht werden. Welche Rolle spielt der Transistor?', ['Er schaltet den Stromkreis der LED und verstärkt dabei den kleinen Strom des Sensors.', 'Er ist die Lichtquelle.', 'Er speichert die Berührung.', 'Er ersetzt die Batterie.'],
          'Der Sensor liefert nur ein schwaches Signal. Der Transistor schaltet damit den grösseren Strom durch die LED.');
      } },
      { id: 'e6-plan', topic: 'Schaltpläne', make() {
        return mc('Wozu dienen Schaltsymbole und Schaltpläne?', ['Mit genormten Symbolen für LED, Widerstand, Poti, Transistor und Co. lässt sich eine Schaltung übersichtlich zeichnen und lesen.', 'Sie zeigen, wie die Bauteile aussehen.', 'Sie berechnen Strom automatisch.', 'Sie sind reine Dekoration.'],
          'Im Schaltplan kommt es auf die Verbindungen an, nicht auf das genaue Aussehen oder die Lage der Bauteile.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  e1: [
    { h: 'Elektronik um uns',
      body: `<p>Elektronik steckt in fast allen elektrischen Geräten: Radio, Laptop, Smartphone, Strassenlaternen oder Heizungen, die sich selbst ein- und ausschalten. Elektronische Schaltungen nehmen Informationen auf, verarbeiten sie und lösen eine Reaktion aus, ähnlich wie Sinne, Gehirn und Muskeln.</p>` },
    { h: 'Aufbau einer LED',
      body: `<p>LED heisst <b>Licht emittierende Diode</b>. Sie hat eine Kunststofflinse, zwei Anschlüsse und innen einen LED-Chip aus einem Halbleiter.</p>
        ${merk('<b>Anode</b> (länger) an den <b>Pluspol</b>, <b>Kathode</b> (flache Stelle) an den <b>Minuspol</b>. Falsch herum leuchtet die LED nicht.')}` },
    { h: 'Blaue LEDs und Bildschirme',
      body: `<p>1992 entwickelten drei japanische Forscher blaue LEDs (Nobelpreis 2014). Damit liessen sich <b>weisse LEDs</b> und grosse Bildschirme bauen. Ein Bildpunkt besteht aus einer roten, einer grünen und einer blauen LED (RGB-LED). Die Farben entstehen durch <b>additive Farbmischung</b>.</p>` },
    { h: 'Vorgerechnet: LED-Chips', worked: {
      given: 'Ein Bildschirm hat 5000 Bildpunkte. Jeder besteht aus einer RGB-LED mit 3 Chips. Wie viele Chips sind es?',
      steps: [['Rechnung', '5000 · 3 = 15 000'], ['Antwort', 'Es sind 15 000 LED-Chips.']] } },
    { h: 'Kurz testen',
      check: { q: 'Du schliesst eine LED falsch herum an. Was passiert?',
        options: ['Sie leuchtet nicht, denn es fliesst kein Strom.', 'Sie leuchtet heller.', 'Sie wird kälter.', 'Sie wechselt die Farbe.'],
        explain: 'Die LED leitet den Strom nur in einer Richtung (Durchlassrichtung).' } }
  ],
  e2: [
    { h: 'Widerstände',
      body: `<p>Widerstände sorgen für die richtige <b>Stromstärke</b>. Festwiderstände haben einen festen Wert in <b>Ohm (Ω)</b>, als <b>Farbcode</b> aufgedruckt. Auf Leiterplatten sitzen sie zusammen mit anderen Bauteilen. Heute werden sehr kleine SMD-Widerstände verbaut.</p>` },
    { h: 'Der Vorwiderstand',
      body: `<p>Eine LED braucht einen <b>Vorwiderstand</b> in Serie. Eine normale rote LED verträgt höchstens <b>20 mA</b> und eine Spannung zwischen <b>1,6 V und 2,1 V</b>.</p>
        ${merk('Serie: Die <b>Stromstärke</b> ist überall gleich. Die <b>Spannung</b> teilt sich auf: <b>U = U₁ + U₂</b>.<br>Je grösser der Vorwiderstand, desto kleiner sind Stromstärke und Spannung an der LED.')}` },
    { h: 'Teste die LED-Schaltung',
      body: '<p>Verändere die Batteriespannung und den Vorwiderstand. Du siehst, ob die LED leuchtet, zu schwach ist oder kaputtgeht. Das Modell rechnet mit 2 V an der LED (Beispielwert).</p>', sim: 'ledsim' },
    { h: 'Vorgerechnet: Vorwiderstand', worked: {
      given: 'Eine LED (2 V) soll mit 20 mA an einer 4,5-V-Batterie betrieben werden. Welchen Vorwiderstand brauchst du?',
      steps: [['Spannung am Widerstand', '4,5 V − 2 V = 2,5 V'], ['Stromstärke umrechnen', '20 mA = 0,02 A'], ['Widerstand berechnen', 'R = 2,5 V : 0,02 A = 125 Ω'], ['Antwort', 'Du brauchst mindestens etwa 125 Ω. Nimm den nächstgrösseren handelsüblichen Wert.']] } },
    { h: 'Kurz testen',
      check: { q: 'Der Vorwiderstand einer LED wird grösser. Was geschieht mit der Stromstärke?',
        options: ['Sie wird kleiner.', 'Sie wird grösser.', 'Sie bleibt gleich.', 'Sie wird negativ.'],
        explain: 'Bei gleicher Spannung gilt I = U : R. Ein grösserer Widerstand bedeutet eine kleinere Stromstärke.' } }
  ],
  e3: [
    { h: 'Leiter, Nichtleiter, Halbleiter',
      body: `<ul><li><b>Leiter</b> (Metalle): Elektronen sind frei beweglich.</li><li><b>Nichtleiter</b> (Gummi, Glas, Kunststoff): Elektronen sind gebunden.</li><li><b>Halbleiter</b> (zum Beispiel Silizium): leiten bei Zimmertemperatur, aber viel schlechter als Metalle.</li></ul>
        ${merk('Bei höherer Temperatur oder mit Lichteinfall leiten Halbleiter <b>besser</b>.')}` },
    { h: 'Freie Ladungsträger',
      body: '<p>Verändere Temperatur und Dotierung. Du siehst, wie viele frei bewegliche Ladungsträger es gibt. Das ist ein Modell mit Beispielwerten.</p>', sim: 'halbl' },
    { h: 'Elektronen und Löcher',
      body: `<p>Löst sich ein Elektron von einem Atom, bleibt ein positiv geladenes <b>Loch</b> zurück. Wird eine Spannung angelegt, bewegen sich freie Elektronen zum Pluspol (<b>Elektronenleitung</b>). Die Löcher scheinen zum Minuspol zu wandern (<b>Löcherleitung</b>). Beides zusammen heisst <b>Eigenleitung</b>.</p>` },
    { h: 'Silizium',
      body: `<p>Silizium (Si) ist ein Halbmetall und der häufigste Halbleiter. Es ist das zweithäufigste Element in der Erdkruste. Für Bauteile muss es sehr rein sein. Reines Silizium leitet kaum.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Was geschieht, wenn Licht auf einen Halbleiter fällt?',
        options: ['Es lösen sich mehr Elektronen von den Atomen, er leitet besser.', 'Er leitet schlechter.', 'Er wird zum Isolator.', 'Es geschieht nichts.'],
        explain: 'Die Energie des Lichts löst Elektronen. Es entstehen mehr freie Elektronen und Löcher.' } }
  ],
  e4: [
    { h: 'Dotierung',
      body: `<p>Bei der <b>Dotierung</b> werden nur sehr wenige Atome (zum Beispiel jedes millionste) durch <b>Fremdatome</b> ersetzt.</p>
        <ul><li><b>p-Dotierung:</b> Fremdatome mit weniger als 4 Aussenelektronen (Indium, Bor). Es entstehen <b>Löcher</b>.</li><li><b>n-Dotierung:</b> Fremdatome mit mehr als 4 Aussenelektronen (Arsen). Es entstehen frei bewegliche <b>Elektronen</b>.</li></ul>` },
    { h: 'p oder n?',
      body: '<p>Ordne die Fremdatome der passenden Dotierung zu. Silizium hat 4 Aussenelektronen.</p>', sim: 'dotier' },
    { h: 'Dioden',
      body: `${merk('Eine <b>Diode</b> lässt den Strom nur in <b>eine Richtung</b> durch. Sie besteht aus einer Kombination von p- und n-dotierten Halbleitern.')}
        <p>Dioden schützen Geräte, wenn zum Beispiel Batterien falsch herum eingesetzt werden.</p>` },
    { h: 'Fliesst der Strom?',
      body: '<p>Beurteile, ob die Diode den Strom durchlässt.</p>', sim: 'diode' },
    { h: 'Transistoren',
      body: `<p><b>Transistoren</b> funktionieren wie Schalter, die <b>elektronisch</b> betätigt werden. Zusätzlich können sie einen Strom <b>verstärken</b>. Mikroprozessoren enthalten Milliarden davon. Es gibt PNP- und NPN-Transistoren.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Arsen hat 5 Aussenelektronen und ersetzt ein Silizium-Atom. Welche Dotierung ist das?',
        options: ['Eine n-Dotierung.', 'Eine p-Dotierung.', 'Keine Dotierung.', 'Eine Löcherdotierung.'],
        explain: 'Mehr als vier Aussenelektronen ergeben ein frei bewegliches Elektron. Das ist die n-Dotierung.' } }
  ],
  e5: [
    { h: 'Sensoren sind fast wie Sinnesorgane',
      body: `<p>Sensoren erfassen Eigenschaften und Ereignisse aus der Umwelt: Schall, Temperatur, Berührung, Licht, Bewegung, Distanz. Manche erfassen sogar Stoffe wie Feinstaub, Ozon oder Kohlenstoffdioxid.</p>
        <p>Sie dienen dazu, ein <b>Ereignis auszulösen</b> (Lampe geht an) oder <b>Werte zu messen</b> (Wetterstation).</p>` },
    { h: 'Welcher Sensor?',
      body: '<p>Ordne die Aufgaben dem passenden Sensor zu.</p>', sim: 'sensoren' },
    { h: 'Aktive und passive Sensoren',
      body: `<ul><li><b>Aktiv:</b> stellt selbst elektrische Energie bereit, zum Beispiel eine <b>Solarzelle</b>.</li><li><b>Passiv:</b> verändert nur seinen Widerstand, zum Beispiel ein <b>Fotowiderstand</b>.</li></ul>
        ${merk('Fotowiderstand: Je mehr Licht, desto <b>kleiner</b> der Widerstand, desto mehr Strom, desto heller die LED.')}` },
    { h: 'Licht steuert die LED',
      body: '<p>Verändere die Lichtstärke. Der Fotowiderstand ändert seinen Widerstand, die LED reagiert. Beispielwerte (Modell).</p>', sim: 'foto' },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über den Fotowiderstand stimmt?',
        options: ['Er ist ein passiver Sensor: Bei Licht sinkt sein Widerstand.', 'Er erzeugt selbst Strom.', 'Er wird bei Licht zum Isolator.', 'Er braucht kein Licht.'],
        explain: 'Der Fotowiderstand stellt keine Energie bereit. Sein Widerstand sinkt, wenn mehr Licht darauf fällt.' } }
  ],
  e6: [
    { h: 'Das Potenziometer',
      body: `<p>Ein <b>Poti</b> ist ein Widerstand, dessen Wert sich <b>mechanisch</b> verändern lässt (Drehpoti, Schiebepoti, kleines Trimmpoti). Der Schleifer teilt die Widerstandsschicht in zwei Teile. Je länger das Stück, desto grösser der Widerstand.</p>` },
    { h: 'Schaltpläne',
      body: `<p>Im <b>Schaltplan</b> zeichnest du Bauteile mit genormten <b>Schaltsymbolen</b>: Batterie, Widerstand, Poti, LED, Diode, Transistor, Fotowiderstand. Wichtig sind die Verbindungen. Ein Berührungssensor mit Transistor schaltet die LED, weil der Transistor den kleinen Sensorstrom verstärkt.</p>` },
    { h: 'Vorgerechnet: Poti', worked: {
      given: 'Ein Schiebepoti hat 10 kΩ. Der Schleifer steht bei 30 % der Länge von Kontakt 1 aus. Wie gross ist der Widerstand zwischen Kontakt 1 und dem Schleifer?',
      steps: [['Proportional zur Länge', '30 % von 10 kΩ'], ['Rechnung', '10 kΩ · 0,3 = 3 kΩ'], ['Antwort', 'Zwischen Kontakt 1 und dem Schleifer liegen 3 kΩ, zwischen Schleifer und Kontakt 3 die restlichen 7 kΩ.']] } },
    { h: 'Vorgerechnet: Stromstärke', worked: {
      given: 'Eine LED (2 V) hat einen Vorwiderstand von 125 Ω an 4,5 V. Wie gross ist die Stromstärke?',
      steps: [['Spannung am Widerstand', '4,5 V − 2 V = 2,5 V'], ['Stromstärke', 'I = 2,5 V : 125 Ω = 0,02 A'], ['Antwort', '20 mA. Das ist gerade die höchste Stromstärke für eine rote LED.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was passiert, wenn der Vorwiderstand einer LED viel zu klein gewählt wird?',
        options: ['Die Stromstärke ist zu gross, die LED geht kaputt.', 'Die LED bleibt dunkel.', 'Die Batterie wird geladen.', 'Es passiert nichts.'],
        explain: 'Ein kleiner Widerstand lässt viel Strom fliessen. Über 20 mA zerstört den LED-Chip einer roten LED.' } }
  ]
};
const GOALS = {
  e1: ['eine LED richtig anschliessen', 'den Zusammenhang von LED und Bildschirm beschreiben'],
  e2: ['den Vorwiderstand erklären und berechnen', 'Stromstärke und Spannung in Serie beschreiben'],
  e3: ['Leiter, Nichtleiter und Halbleiter unterscheiden', 'Eigenleitung erklären'],
  e4: ['p- und n-Dotierung unterscheiden', 'Diode und Transistor beschreiben'],
  e5: ['Sensoren und ihre Aufgaben beschreiben', 'aktive und passive Sensoren unterscheiden'],
  e6: ['einen Schaltplan lesen', 'ein Poti und eine LED-Schaltung berechnen']
};
const LEARN = {
  'e1-led': 'Elektronik um uns', 'e1-anode': 'Aufbau einer LED', 'e1-richtung': 'Aufbau einer LED', 'e1-blau': 'Blaue LEDs und Bildschirme', 'e1-rgb': 'Blaue LEDs und Bildschirme', 'e1-chips': 'Vorgerechnet: LED-Chips',
  'e2-fest': 'Widerstände', 'e2-vor': 'Der Vorwiderstand', 'e2-serie': 'Der Vorwiderstand', 'e2-gross': 'Teste die LED-Schaltung', 'e2-rechnen': 'Vorgerechnet: Vorwiderstand', 'e2-uwid': 'Der Vorwiderstand',
  'e3-leiter': 'Leiter, Nichtleiter, Halbleiter', 'e3-halb': 'Leiter, Nichtleiter, Halbleiter', 'e3-loch': 'Elektronen und Löcher', 'e3-eigen': 'Elektronen und Löcher', 'e3-si': 'Silizium', 'e3-licht': 'Freie Ladungsträger',
  'e4-dot': 'Dotierung', 'e4-p': 'p oder n?', 'e4-n': 'p oder n?', 'e4-diode': 'Dioden', 'e4-trans': 'Transistoren', 'e4-dotier': 'Dotierung',
  'e5-sensor': 'Sensoren sind fast wie Sinnesorgane', 'e5-passiv': 'Aktive und passive Sensoren', 'e5-aktiv': 'Aktive und passive Sensoren', 'e5-phone': 'Welcher Sensor?', 'e5-bew': 'Welcher Sensor?', 'e5-mess': 'Sensoren sind fast wie Sinnesorgane',
  'e6-poti': 'Das Potenziometer', 'e6-klein': 'Kurz testen', 'e6-poti-num': 'Vorgerechnet: Poti', 'e6-strom': 'Vorgerechnet: Stromstärke', 'e6-trans': 'Schaltpläne', 'e6-plan': 'Schaltpläne'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Draht', pw: 'leitet' },
  { xp: 80, name: 'LED', pw: 'leuchtet' },
  { xp: 200, name: 'Widerstand', pw: 'bremst' },
  { xp: 380, name: 'Transistor', pw: 'schaltet' },
  { xp: 620, name: 'Sensor', pw: 'spürt die Umwelt' },
  { xp: 920, name: 'Mikrochip', pw: 'rechnet' }
];

/* ---------- Thema: 9_3 Elektronische Schaltungen untersuchen ---------- */
const TOPIC = {
  id: 'nt9-3', storeKey: 'halingen-nt9-3-v1', other: { title: '8_1 Stromkreise untersuchen', href: '8_1_Stromkreise_untersuchen.html' },
  title: 'Elektronische Schaltungen untersuchen', lead: 'LED, Widerstand, Halbleiter und Sensoren', tag: 'Natur und Technik', cardName: 'Formelkarte',
  tips: ['Anode an Plus, Kathode an Minus.', 'Eine LED braucht immer einen Vorwiderstand.'],
  formulas: [
    ['Vorwiderstand', 'R = (U − U_LED) : I', 'rote LED: höchstens 20 mA'],
    ['Serie', 'I überall gleich', 'U = U₁ + U₂'],
    ['Ohmsches Gesetz', 'R = U : I', 'I = U : R'],
    ['Dotierung', 'p: Löcher (&lt; 4 Aussenelektronen)', 'n: Elektronen (&gt; 4)'],
    ['Diode', 'Strom nur in eine Richtung', 'LED = leuchtende Diode'],
    ['Transistor', 'schaltet elektronisch', 'verstärkt Strom']
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
  dotier(el) {
    sorter(el, [
      { t: 'Indium (3 Aussenelektronen)', ok: ['p'], why: 'Weniger als vier Aussenelektronen: Es entstehen Löcher (p-Dotierung).' },
      { t: 'Arsen (5 Aussenelektronen)', ok: ['n'], why: 'Mehr als vier Aussenelektronen: Ein Elektron ist frei beweglich (n-Dotierung).' },
      { t: 'Bor (3 Aussenelektronen)', ok: ['p'], why: 'Bor hat drei Aussenelektronen. Es erzeugt Löcher.' },
      { t: 'Phosphor (5 Aussenelektronen)', ok: ['n'], why: 'Phosphor hat fünf Aussenelektronen. Es erzeugt freie Elektronen.' },
      { t: 'Gallium (3 Aussenelektronen)', ok: ['p'], why: 'Weniger als vier Aussenelektronen: p-Dotierung.' }
    ], { p: 'p-Dotierung (Löcher)', n: 'n-Dotierung (Elektronen)' }, 'Welche Dotierung entsteht in Silizium?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  diode(el) {
    sorter(el, [
      { t: 'Anode einer LED am Pluspol, Kathode am Minuspol, mit Vorwiderstand', ok: ['fl'], why: 'Das ist die Durchlassrichtung: Der Strom fliesst.' },
      { t: 'Eine LED ist mit vertauschten Polen angeschlossen', ok: ['sp'], why: 'In Sperrrichtung fliesst kein Strom.' },
      { t: 'Eine Diode schützt ein Gerät, die Batterie wurde falsch herum eingesetzt', ok: ['sp'], why: 'Die Diode sperrt und schützt das Gerät.' },
      { t: 'Eine Diode im Netzteil, der Strom kommt in der erlaubten Richtung', ok: ['fl'], why: 'In der erlaubten Richtung lässt die Diode den Strom durch.' }
    ], { fl: 'Strom fliesst', sp: 'Strom sperrt' }, 'Lässt die Diode den Strom durch?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  sensoren(el) {
    sorter(el, [
      { t: 'Eine Lampe vor dem Haus geht an, wenn jemand näher kommt', ok: ['bw'], why: 'Das erledigt ein Bewegungssensor.' },
      { t: 'Der Bildschirm des Smartphones wird am Ohr dunkel', ok: ['na'], why: 'Der Näherungssensor erkennt, wie nahe etwas ist.' },
      { t: 'Die Bildschirmhelligkeit passt sich der Umgebung an', ok: ['li'], why: 'Der Helligkeitssensor misst das Licht.' },
      { t: 'Der Kompass im Smartphone zeigt nach Norden', ok: ['ma'], why: 'Das Magnetometer misst das Erdmagnetfeld.' },
      { t: 'Eine Fitness-App zählt deine Schritte', ok: ['be'], why: 'Der Beschleunigungssensor misst, wie stark das Gerät bewegt wird.' }
    ], { bw: 'Bewegungssensor', na: 'Näherungssensor', li: 'Helligkeitssensor', ma: 'Magnetometer', be: 'Beschleunigungssensor' }, 'Welcher Sensor wird verwendet?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  ledsim(el) {
    el.innerHTML = `<div class="sim">${sl('lu', 'Batteriespannung', 3, 9, 1, 5, 'V')}${sl('lr', 'Vorwiderstand', 50, 1000, 50, 200, 'Ω')}
      <label class="chk"><input type="checkbox" id="lp" checked> LED richtig herum angeschlossen</label>
      <div class="ledbox" aria-hidden="true"><div class="led" id="ld"></div></div>
      <div class="trio"><div><span class="k">Stromstärke</span><b class="mono" id="l1"></b></div><div><span class="k">Spannung am R</span><b class="mono" id="l2"></b></div><div><span class="k">Zustand</span><b class="mono" id="l3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const U = +$id('lu').value, R = +$id('lr').value, ok = $id('lp').checked;
      $id('luv').textContent = fmt(U); $id('lrv').textContent = fmt(R);
      const ULED = 2, I = ok ? Math.max(0, (U - ULED) / R * 1000) : 0;
      let st, cls; if (!ok) { st = 'aus'; cls = 'off'; } else if (U <= ULED) { st = 'aus'; cls = 'off'; } else if (I > 20) { st = 'kaputt'; cls = 'dead'; } else if (I < 2) { st = 'zu schwach'; cls = 'dim'; } else { st = 'leuchtet'; cls = 'on'; }
      $id('ld').className = 'led ' + cls;
      $id('l1').textContent = fmt(r2(I), 1) + ' mA'; $id('l2').textContent = ok ? fmt(r2(Math.max(0, U - ULED)), 1) + ' V' : '0 V'; $id('l3').textContent = st;
      $id('ro').innerHTML = !ok ? 'Die LED ist falsch herum angeschlossen: Es fliesst kein Strom.' : U <= ULED ? 'Die Batteriespannung reicht nicht für die LED (2 V).' : `I = (${fmt(U)} V − 2 V) : ${fmt(R)} Ω = <b>${fmt(r2(I), 1)} mA</b>.<br>${st === 'kaputt' ? 'Über 20 mA: Die LED geht kaputt. Wähle einen grösseren Vorwiderstand.' : st === 'zu schwach' ? 'Die Stromstärke ist sehr klein, die LED leuchtet kaum.' : 'Die Stromstärke liegt im sicheren Bereich bis 20 mA.'}<br>Modell mit Beispielwerten.`;
    }
    ['lu', 'lr'].forEach(id => $id(id).addEventListener('input', upd)); $id('lp').addEventListener('change', upd); upd();
  },

  foto(el) {
    el.innerHTML = `<div class="sim">${sl('fl', 'Lichtstärke', 0, 100, 10, 0, '%')}
      <div class="ledbox" aria-hidden="true"><div class="led" id="ld"></div></div>
      <div class="trio"><div><span class="k">Fotowiderstand</span><b class="mono" id="f1"></b></div><div><span class="k">Stromstärke</span><b class="mono" id="f2"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const L = +$id('fl').value, Rf = 5000 * (1 - L / 100) + 100, I = (4.5 - 2) / (Rf + 100) * 1000;
      $id('flv').textContent = fmt(L);
      $id('f1').textContent = fmt(Math.round(Rf)) + ' Ω'; $id('f2').textContent = fmt(r2(I), 1) + ' mA';
      $id('ld').className = 'led ' + (I < 1 ? 'off' : I < 6 ? 'dim' : 'on');
      $id('ro').innerHTML = `Je mehr Licht, desto kleiner der Widerstand des Fotowiderstands und desto grösser die Stromstärke. Bei ${fmt(L)} % Licht fliessen ${fmt(r2(I), 1)} mA (Beispielwerte, 4,5 V, LED 2 V, fester Widerstand 100 Ω).`;
    }
    $id('fl').addEventListener('input', upd); upd();
  },

  halbl(el) {
    el.innerHTML = `<div class="sim">${sl('ht', 'Temperatur oder Licht', 0, 10, 1, 2, '')}
      <div class="seg3" role="group" aria-label="Dotierung"><button class="btn sm on" data-d="0">reiner Halbleiter</button><button class="btn sm" data-d="1">dotiert</button></div>
      <div class="cubes" id="hc" aria-hidden="true"></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let d = 0;
    function upd() {
      const t = +$id('ht').value, free = Math.min(20, t + (d ? 6 : 0));
      $id('htv').textContent = String(t);
      el.querySelectorAll('[data-d]').forEach(b => b.classList.toggle('on', +b.dataset.d === d));
      const c = $id('hc'); c.innerHTML = '';
      for (let i = 0; i < 20; i++) { const x = document.createElement('i'); x.className = 'cube ' + (i < free ? 'bew' : 'lage'); c.appendChild(x); }
      $id('ro').innerHTML = `Gelb = frei bewegliche Ladungsträger: <b>${free} von 20</b>. ${d ? 'Die Dotierung liefert auch bei Zimmertemperatur freie Ladungsträger.' : 'Beim reinen Halbleiter nimmt die Zahl mit Temperatur oder Licht zu.'} Modell mit Beispielwerten.`;
    }
    el.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => { d = +b.dataset.d; upd(); }));
    $id('ht').addEventListener('input', upd); upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-3","titel":"Elektronische Schaltungen untersuchen","kapitel":"NaTech 9, Kapitel 3","audio":"nt9-3"});
