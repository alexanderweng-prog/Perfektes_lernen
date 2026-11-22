// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs aus fantasy-lernapp/src/chapters/nt7-5.js
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


/* ---------- Inhalt: 7_5 Energie erkunden, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 'e1', nr: 1, title: 'Energieformen', sub: 'Energie ist überall',
    items: [
      { id: 'e1-spann', topic: 'Spannenergie', make() {
        return mc('Welche Energieform hat ein gespanntes Gummiband?', ['Spannenergie.', 'Bewegungsenergie.', 'Schallenergie.', 'Strahlungsenergie.'],
          'Ein gespanntes Gummiband oder eine zusammengedrückte Feder speichert Spannenergie. Beim Loslassen kann daraus Bewegungsenergie werden.');
      } },
      { id: 'e1-bewegung', topic: 'Bewegungsenergie', make() {
        return mc('Ein Ball rollt über den Boden. Welche Energieform hat er?', ['Bewegungsenergie.', 'Lageenergie.', 'Spannenergie.', 'Chemische Energie.'],
          'Ein Körper, der sich bewegt, hat Bewegungsenergie. Je schneller er ist, desto mehr hat er davon.');
      } },
      { id: 'e1-nahrung', topic: 'Chemische Energie', make() {
        return mc('In welcher Energieform ist Energie in Nahrung und in Batterien gespeichert?', ['Als chemische Energie.', 'Als Schallenergie.', 'Als Bewegungsenergie.', 'Als Strahlungsenergie.'],
          'Nahrung, Holz, Benzin und Batterien enthalten chemische Energie. Wir essen nicht die Energie, sondern den Energieträger.');
      } },
      { id: 'e1-stausee', topic: 'Lageenergie', make() {
        return mc('Zwei gleich grosse Stauseen sind mit gleich viel Wasser gefüllt. See B liegt höher als See A. Welcher See hat mehr Energie gespeichert?', ['See B, denn je höher das Wasser liegt, desto grösser ist seine Lageenergie.', 'See A, denn tiefer liegendes Wasser hat mehr Energie.', 'Beide gleich viel.', 'Keiner, denn Wasser hat keine Energie.'],
          'Die Lageenergie wächst mit der Höhe. Je höher das Wasser liegt, desto mehr Lageenergie hat es, genau wie bei der Achterbahn.');
      } },
      { id: 'e1-eigenschaft', topic: 'Was ist Energie?', make() {
        return mc('Welche Aussage über Energie ist richtig?', ['Energie ist eine Eigenschaft von Körpern: Weil ein Körper Energie hat, kann sich etwas verändern.', 'Energie ist ein Stoff, den man von A nach B tragen kann.', 'Energie ist eine Flüssigkeit, die ausläuft.', 'Energie ist etwas, das man aufessen kann.'],
          'Energie ist kein Ding und kein Stoff. Sie ist eine Eigenschaft oder ein Zustand eines Körpers. Immer dort, wo sich etwas verändert, spielt Energie eine Rolle.');
      } },
      { id: 'e1-sprache', topic: 'Fachsprache', make() {
        return mc('Welche Formulierung ist fachlich passender?', ['«Energie wird genutzt.»', '«Energie wird verbraucht.»', '«Energie geht kaputt.»', '«Energie wird aufgegessen.»'],
          'Energie wird nicht verbraucht, sondern von einer Form in eine andere umgewandelt und genutzt. Darum sagen wir «genutzt» statt «gebraucht».');
      } }
    ]
  },
  {
    id: 'e2', nr: 2, title: 'Energieumwandlung', sub: 'Aus einer Form wird eine andere',
    items: [
      { id: 'e2-achterbahn', topic: 'Achterbahn', make() {
        return mc('Ein Achterbahnwagen rollt vom höchsten Punkt nach unten. Wie ändert sich seine Energie?', ['Die Lageenergie nimmt ab, die Bewegungsenergie nimmt zu.', 'Die Lageenergie nimmt zu, die Bewegungsenergie nimmt ab.', 'Beide nehmen zu.', 'Die Energie verschwindet.'],
          'Beim Hinunterrollen verliert der Wagen an Höhe: Lageenergie wird zu Bewegungsenergie. Ein kleiner Teil wird zu thermischer Energie.');
      } },
      { id: 'e2-solar', topic: 'Solarzelle', make() {
        return mc('Was wandelt eine Solarzelle um?', ['Strahlungsenergie in elektrische Energie.', 'Elektrische Energie in Strahlungsenergie.', 'Bewegungsenergie in Lageenergie.', 'Chemische Energie in Schallenergie.'],
          'Die Solarzelle ist ein Energiewandler: Sie wandelt das Licht der Sonne (Strahlungsenergie) in elektrische Energie um.');
      } },
      { id: 'e2-generator', topic: 'Generator als Energiewandler', make() {
        return mc('Welche Energieumwandlungskette stimmt? «Bewegungsenergie, dann …»', ['Generator, elektrische Energie, Heizung, thermische Energie.', 'Heizung, elektrische Energie, Generator, Bewegungsenergie.', 'Batterie, Lageenergie, Lampe, Schallenergie.', 'Generator, chemische Energie, Solarzelle, Lageenergie.'],
          'In einer Kette stehen Energieformen und Energiewandler nacheinander: Bewegungsenergie, Generator, elektrische Energie, Heizung, thermische Energie.');
      } },
      { id: 'e2-taschenlampe', topic: 'Kette der Taschenlampe', make() {
        return mc('Welche Kette gehört zu einer Taschenlampe mit Batterie?', ['Chemische Energie, elektrische Energie, Strahlungsenergie (und etwas thermische Energie).', 'Lageenergie, Bewegungsenergie, Schallenergie.', 'Strahlungsenergie, thermische Energie, chemische Energie.', 'Spannenergie, Lageenergie, Strahlungsenergie.'],
          'Die Batterie speichert chemische Energie. Sie liefert elektrische Energie. Die Lampe macht daraus Licht (Strahlungsenergie) und etwas thermische Energie.');
      } },
      { id: 'e2-pfeil', topic: 'Pfeile in der Kette', make() {
        return mc('Du zeichnest eine Energieumwandlungskette mit Pfeilen. Was gilt für die Dicke der Pfeile?', ['Der Pfeil am Anfang ist so dick wie alle Pfeile am Ende zusammen.', 'Alle Pfeile sind gleich dick, egal wie viel Energie fliesst.', 'Der Pfeil am Ende ist immer dünner als alle anderen.', 'Die Dicke der Pfeile spielt keine Rolle.'],
          'Die Dicke zeigt die Energiemenge. Am Anfang ist so viel Energie vorhanden wie am Ende insgesamt. Es geht nichts verloren, also muss die Summe der Pfeile am Ende dem Anfangspfeil entsprechen.');
      } },
      { id: 'e2-wuerfel', topic: 'Energiewürfel in der Achterbahn', make() {
        const s = rnd([[8, 6], [10, 7], [6, 5], [12, 9], [9, 7], [10, 8]]), t = s[0] - s[1];
        return num(`Eine Achterbahn hat oben ${fmt(s[0])} Energiewürfel Lageenergie. Unten sind ${fmt(s[1])} Würfel zu Bewegungsenergie geworden. Der Rest ist thermische Energie. Wie viele Würfel sind thermische Energie?`, 'Würfel', t, 'Es sind am Ende gleich viele Würfel wie am Anfang. Ziehe die Bewegungswürfel ab.', `${fmt(s[0])} − ${fmt(s[1])} = ${fmt(t)} Würfel thermische Energie`);
      } }
    ]
  },
  {
    id: 'e3', nr: 3, title: 'Energieentwertung', sub: 'Die wertvolle Energie nimmt ab',
    items: [
      { id: 'e3-thermisch', topic: 'Thermische Energie bei Umwandlungen', make() {
        return mc('Was geschieht bei Energieumwandlungen fast immer?', ['Ein Teil der Energie wird in thermische Energie umgewandelt.', 'Die gesamte Energie wird vernichtet.', 'Alle Energie bleibt in derselben Form.', 'Es wird mehr Energie, als vorher da war.'],
          'Bei fast jeder Umwandlung entsteht auch thermische Energie. Man nennt das Energieentwertung: Die Energie ist nicht weg, aber schlecht nutzbar.');
      } },
      { id: 'e3-lampen', topic: 'Lampen im Vergleich', make() {
        return mc('Eine LED-Lampe wird kaum warm, eine Glühlampe wird sehr warm. Was bedeutet das?', ['Die LED-Lampe nutzt die elektrische Energie besser, weil weniger thermische Energie entsteht.', 'Die Glühlampe nutzt die Energie besser, weil sie wärmer wird.', 'Beide nutzen die Energie gleich gut.', 'Die LED-Lampe braucht keine Energie.'],
          'Eine Lampe soll leuchten. Die thermische Energie ist hier unerwünscht. Je weniger warm die Lampe wird, desto besser wird die elektrische Energie für das Licht genutzt.');
      } },
      { id: 'e3-verlust', topic: 'Verlustenergie', make() {
        return mc('Wie nennt man die thermische Energie, die bei einer Umwandlung entsteht, aber nicht erwünscht ist?', ['Verlustenergie (entwertete Energie).', 'Neue Energie.', 'Zusatzenergie.', 'Erhaltungsenergie.'],
          'Die unerwünschte thermische Energie nennt man auch Verlustenergie. Sie ist nicht verschwunden, aber in der Umgebung verteilt und kaum noch nutzbar.');
      } },
      { id: 'e3-ball', topic: 'Springender Ball', make() {
        return mc('Ein Ball springt bei jedem Aufprall weniger hoch. Wohin geht die Energie?', ['Ein Teil wird zu thermischer Energie in Ball, Boden und Luft.', 'Sie verschwindet einfach.', 'Sie wird zu Lageenergie im Boden.', 'Sie wird zu mehr Bewegungsenergie.'],
          'Bei jedem Aufprall wird ein Teil der Bewegungsenergie zu thermischer Energie. Die Energie ist erhalten, aber der Ball hat weniger davon in nutzbarer Form.');
      } },
      { id: 'e3-warm', topic: 'Warum Geräte warm werden', make() {
        return mc('Ein Laptop wird beim Arbeiten warm. Was ist der Grund?', ['Ein Teil der elektrischen Energie wird zu thermischer Energie umgewandelt.', 'Der Laptop erzeugt Energie aus dem Nichts.', 'Die Wärme ist ein Stoff, der im Laptop wohnt.', 'Der Laptop wird nur von der Sonne erwärmt.'],
          'Auch Geräte, die nicht heizen sollen, wandeln einen Teil der elektrischen Energie in thermische Energie um. Das ist Energieentwertung.');
      } },
      { id: 'e3-licht', topic: 'Anteil Licht', make() {
        const s = rnd([[10, 9], [10, 8], [10, 7], [20, 15], [8, 5], [12, 9]]), l = s[0] - s[1];
        return num(`Einer Lampe werden ${fmt(s[0])} Energiewürfel elektrische Energie zugeführt. ${fmt(s[1])} Würfel werden zu thermischer Energie. Wie viele Würfel werden zu Strahlungsenergie (Licht)?`, 'Würfel', l, 'Die Summe am Ende ist gleich viel wie am Anfang.', `${fmt(s[0])} − ${fmt(s[1])} = ${fmt(l)} Würfel Strahlungsenergie`);
      } }
    ]
  },
  {
    id: 'e4', nr: 4, title: 'Energie speichern und nutzen', sub: 'Joule und Energieträger',
    items: [
      { id: 'e4-joule', topic: 'Einheit der Energie', make() {
        return mc('In welcher Einheit wird Energie angegeben?', ['Joule (J) und Kilojoule (kJ).', 'Watt (W).', 'Meter pro Sekunde (m/s).', 'Newton (N).'],
          'Die Einheit der Energie ist das Joule (J). Auf Lebensmitteln steht meist Kilojoule (kJ) oder Kilokalorien (kcal).');
      } },
      { id: 'e4-kj', topic: 'kJ in J umrechnen', make() {
        const k = rnd([1, 2, 3, 5, 12, 40]), j = k * 1000;
        return num(`Ein Snack enthält ${fmt(k)} kJ Energie. Wie viele Joule sind das?`, 'J', j, '1 kJ sind 1000 J.', `${fmt(k)} kJ · 1000 = ${fmt(j)} J`);
      } },
      { id: 'e4-portion', topic: 'Energie einer Portion', make() {
        const s = rnd([[2000, 25], [1500, 50], [400, 150], [2300, 20], [1000, 250], [500, 200]]), e = s[0] * s[1] / 100;
        return num(`Ein Lebensmittel enthält pro 100 g ${fmt(s[0])} kJ. Wie viel Energie steckt in ${fmt(s[1])} g?`, 'kJ', e, 'Teile die Masse durch 100 und multipliziere mit der Energie pro 100 g.', `${fmt(s[1])} g : 100 g = ${fmt(s[1] / 100)}<br>${fmt(s[1] / 100)} · ${fmt(s[0])} kJ = ${fmt(e)} kJ`);
      } },
      { id: 'e4-kcal', topic: 'kcal in kJ umrechnen', ext: true, make() {
        const c = rnd([100, 200, 250, 500, 50, 150]), k = c * 4.2;
        return num(`Auf einer Packung stehen ${fmt(c)} kcal. Rechne mit 1 kcal = 4,2 kJ. Wie viele kJ sind das?`, 'kJ', k, 'Multipliziere die kcal mit 4,2.', `${fmt(c)} kcal · 4,2 = ${fmt(k)} kJ`);
      } },
      { id: 'e4-traeger', topic: 'Energieträger', make() {
        return mc('Was essen wir, wenn wir «Energie» zu uns nehmen?', ['Einen Energieträger, zum Beispiel eine Kartoffel. In ihm ist chemische Energie gespeichert.', 'Reine Energie als Stoff.', 'Nur Wasser.', 'Gar nichts, Energie kann man nicht aufnehmen.'],
          'Energie ist eine Eigenschaft, kein Stoff. Wir essen den Träger der Energie, zum Beispiel Kartoffeln, Brot oder Fett. Im Körper wird die chemische Energie umgewandelt.');
      } },
      { id: 'e4-speicher', topic: 'Energiespeicher', make() {
        return mc('Welche Energieform speichert ein hoch gelegener Stausee?', ['Lageenergie des Wassers.', 'Chemische Energie.', 'Schallenergie.', 'Spannenergie.'],
          'Das hoch gelegene Wasser hat Lageenergie. Fliesst es nach unten, wird sie zu Bewegungsenergie und in einem Generator zu elektrischer Energie.');
      } }
    ]
  },
  {
    id: 'e5', nr: 5, title: 'Transport von thermischer Energie', sub: 'Leitung, Strömung, Strahlung',
    items: [
      { id: 'e5-begriff', topic: 'Thermische Energie statt Wärmeenergie', make() {
        return mc('Welcher Begriff ist in der Sekundarstufe der richtige?', ['Thermische Energie.', 'Wärmeenergie.', 'Kälteenergie.', 'Hitzestoff.'],
          'Wir sagen thermische Energie. «Wärmeenergie» ist eine Vereinfachung aus der Primarstufe. So unterscheidest du auch besser zwischen Energie und Wärme (dem Transport).');
      } },
      { id: 'e5-leitung', topic: 'Wärmeleitung', make() {
        return mc('Ein Metalllöffel steht in heisser Suppe und wird bald auch am Griff heiss. Wie wird die thermische Energie transportiert?', ['Durch Wärmeleitung.', 'Durch Wärmeströmung.', 'Durch Wärmestrahlung.', 'Gar nicht, der Griff wird von selbst heiss.'],
          'In einem Feststoff wie dem Metalllöffel geben die Teilchen ihre Bewegung an die Nachbarteilchen weiter. Das ist Wärmeleitung.');
      } },
      { id: 'e5-stroemung', topic: 'Wärmeströmung', make() {
        return mc('Warme Luft steigt über einer Heizung auf, kühlere Luft strömt nach. Wie wird die thermische Energie transportiert?', ['Durch Wärmeströmung.', 'Durch Wärmeleitung.', 'Durch Wärmestrahlung.', 'Durch Schallwellen.'],
          'In Flüssigkeiten und Gasen werden warme Teilchen mitbewegt. Dieser Transport heisst Wärmeströmung.');
      } },
      { id: 'e5-strahlung', topic: 'Wärmestrahlung', make() {
        return mc('Die Sonne erwärmt die Erde, obwohl dazwischen fast leerer Raum liegt. Wie gelangt die Energie zu uns?', ['Durch Wärmestrahlung.', 'Durch Wärmeleitung.', 'Durch Wärmeströmung.', 'Durch Schall.'],
          'Strahlung braucht keinen Stoff, der sie transportiert. Darum kann die Sonne die Erde auch durch den leeren Raum erwärmen.');
      } },
      { id: 'e5-thermos', topic: 'Thermosflasche', make() {
        return mc('Wie wird bei einer Thermosflasche die Wärmestrahlung verringert?', ['Die Wände sind verspiegelt und reflektieren die Strahlung.', 'Die Flasche wird schwarz angemalt.', 'Die Flasche hat Löcher.', 'Man füllt sie mit Salz.'],
          'Die verspiegelten Wände reflektieren Wärmestrahlung wie ein Spiegel das Licht. Der luftleere Raum zwischen den Wänden verhindert die Wärmeleitung, der Deckel die Wärmeströmung.');
      } },
      { id: 'e5-isolation', topic: 'Isolation', make() {
        return mc('Wozu dient eine Isolation?', ['Sie verringert den Transport thermischer Energie von warm nach kalt.', 'Sie erzeugt zusätzliche Energie.', 'Sie macht Dinge von selbst warm.', 'Sie verwandelt Kälte in Wärme.'],
          'Thermische Energie fliesst immer von warm nach kalt. Eine Isolation, zum Beispiel eine dicke Jacke, bremst diesen Transport.');
      } }
    ]
  },
  {
    id: 'e6', nr: 6, title: 'Energie geht nicht verloren', sub: 'Energieerhaltung und Energiewürfel',
    items: [
      { id: 'e6-erhaltung', topic: 'Energieerhaltung', make() {
        return mc('Was besagt die Energieerhaltung?', ['Energie kann weder erzeugt noch vernichtet werden. Sie wird umgewandelt oder transportiert.', 'Energie wird bei jeder Umwandlung weniger.', 'Energie entsteht, wenn man sie braucht.', 'Energie verschwindet, wenn man das Licht ausschaltet.'],
          'Die Gesamtmenge der Energie bleibt immer gleich. Sie ändert nur ihre Form oder ihren Ort.');
      } },
      { id: 'e6-schieben', topic: 'Transport und Umwandlung im Modell', make() {
        return mc('Im Energiewürfelmodell: Was bedeutet es, einen Würfel zu schieben, und was, ihn zu drehen?', ['Schieben ist Energietransport, Drehen ist Energieumwandlung.', 'Schieben ist Umwandlung, Drehen ist Transport.', 'Beides ist dasselbe.', 'Schieben vernichtet Energie, Drehen erzeugt sie.'],
          'Beim Transport wechselt die Energie das System: Der Würfel wird verschoben. Bei der Umwandlung bleibt der Würfel am selben Ort, aber die Energieform ändert sich: Der Würfel wird gedreht.');
      } },
      { id: 'e6-modell', topic: 'Grenzen des Modells', make() {
        return mc('Was ist beim Energiewürfelmodell besonders zu beachten?', ['Es ist ein Modell. Energie besteht nicht wirklich aus Würfeln und ist kein Stoff.', 'Energie besteht genau aus kleinen Würfeln.', 'Man kann Energiewürfel kaufen und anfassen.', 'Es gilt nur für Achterbahnen.'],
          'Das Modell hilft, Energie zu zählen und zu verfolgen. Der Würfel bleibt derselbe, aber sein Zustand ändert sich. Energie ist weiterhin eine Eigenschaft von Körpern.');
      } },
      { id: 'e6-batterie', topic: 'Entladene Batterie', make() {
        return mc('Eine Batterie lädt nicht mehr. Wohin ist ihre Energie gegangen?', ['Sie wurde umgewandelt, zum Beispiel in Licht und thermische Energie. Die Gesamtmenge ist gleich geblieben.', 'Sie ist verschwunden.', 'Sie wurde vernichtet.', 'Sie ist in die Luft gegangen und lässt sich nie mehr finden.'],
          'Die chemische Energie der Batterie wurde im Stromkreis umgewandelt, etwa in Strahlungsenergie und thermische Energie. Es ist nichts verloren, nur verteilt.');
      } },
      { id: 'e6-summe', topic: 'Würfel am Ende', make() {
        const s = rnd([[12, 7, 2], [10, 6, 1], [9, 5, 2], [8, 4, 3], [15, 9, 4], [11, 7, 1]]), t = s[0] - s[1] - s[2];
        return num(`Zu Beginn sind ${fmt(s[0])} Energiewürfel vorhanden. Am Ende sind ${fmt(s[1])} Würfel Bewegungsenergie und ${fmt(s[2])} Würfel Lageenergie. Der Rest ist thermische Energie. Wie viele Würfel sind thermisch?`, 'Würfel', t, 'Die Gesamtzahl bleibt gleich. Ziehe die beiden anderen Gruppen ab.', `${fmt(s[0])} − ${fmt(s[1])} − ${fmt(s[2])} = ${fmt(t)} Würfel`);
      } },
      { id: 'e6-anfang', topic: 'Würfel am Anfang', ext: true, make() {
        const s = rnd([[7, 2], [8, 1], [9, 3], [6, 2], [10, 2], [12, 3]]), a = s[0] + s[1];
        return num(`Am Ende hat eine Murmelbahn ${fmt(s[0])} Würfel Bewegungsenergie und ${fmt(s[1])} Würfel thermische Energie. Mit wie vielen Würfeln Lageenergie ist sie oben gestartet?`, 'Würfel', a, 'Die Würfel am Anfang entsprechen der Summe aller Würfel am Ende.', `${fmt(s[0])} + ${fmt(s[1])} = ${fmt(a)} Würfel`);
      } }
    ]
  }
];

/* ---------- Lerninhalt: Lektionskarten pro Station ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  e1: [
    { h: 'Energie ist überall',
      body: `<p>Du erkennst Energie daran, dass sich etwas verändert: Ein Ball rollt, eine Lampe leuchtet, Essen macht dich satt und warm. Energie ist eine <b>Eigenschaft von Körpern</b>, kein Stoff.</p>
        ${merk('Weil ein Körper Energie hat, kann ein Vorgang ablaufen und sich etwas verändern.')}
        <p>Energie nimmst du nicht «auf wie Wasser». Du isst einen <b>Energieträger</b>, zum Beispiel Brot oder Kartoffeln.</p>` },
    { h: 'Die Energieformen',
      body: `<p>Du unterscheidest diese Energieformen:</p>
        <ul><li><b>Lageenergie:</b> etwas liegt hoch (Wasser im Stausee, Achterbahnwagen oben).</li>
        <li><b>Bewegungsenergie:</b> etwas bewegt sich (rollender Ball).</li>
        <li><b>Spannenergie:</b> etwas ist gespannt (Feder, Gummiband).</li>
        <li><b>Chemische Energie:</b> in Stoffen gespeichert (Nahrung, Benzin, Batterie).</li>
        <li><b>Thermische Energie:</b> Bewegung der kleinsten Teilchen (heisses Wasser).</li>
        <li><b>Strahlungsenergie:</b> Licht und andere Strahlung.</li>
        <li><b>Schallenergie:</b> Schall, den du hörst.</li>
        <li><b>Elektrische Energie:</b> Strom aus Batterie oder Steckdose.</li></ul>` },
    { h: 'Ordne die Energieformen zu',
      body: '<p>Tippe bei jedem Beispiel auf die passende Energieform. Manchmal sind mehrere richtig.</p>', sim: 'formen' },
    { h: 'Richtig sprechen',
      body: `<p>Achte auf die Sprache. Falsche Formulierungen führen zu falschen Vorstellungen:</p>
        ${merk('Sage <b>«Energie wird genutzt»</b>, nicht «Energie wird verbraucht».<br>Sage <b>thermische Energie</b>, nicht «Wärmeenergie».')}
        <p>Der Grund: Energie geht nicht kaputt und verschwindet nicht. Sie wird umgewandelt.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Stausee liegt höher als ein zweiter mit gleich viel Wasser. Wie begründest du, dass er mehr Energie gespeichert hat?',
        options: ['Je höher das Wasser liegt, desto grösser ist die Lageenergie.', 'Je tiefer das Wasser liegt, desto grösser ist die Lageenergie.', 'Je kälter das Wasser ist, desto grösser ist die Lageenergie.', 'Die Höhe spielt keine Rolle.'],
        explain: 'Das ist ein Je-desto-Satz über die Lageenergie: Je höher, desto mehr Lageenergie, so wie bei der Achterbahn.' } }
  ],
  e2: [
    { h: 'Aus einer Form wird eine andere',
      body: `<p>Bei einem Vorgang wird Energie von einer Form in eine andere <b>umgewandelt</b>. Ein Beispiel ist die Achterbahn:</p>
        <ul><li>Oben hat der Wagen viel <b>Lageenergie</b>.</li>
        <li>Beim Hinunterfahren wird sie zu <b>Bewegungsenergie</b>.</li>
        <li>Ein kleiner Teil wird zu <b>thermischer Energie</b>, denn es gibt Reibung.</li></ul>` },
    { h: 'Energiewandler und Ketten',
      body: `<p>Geräte, die Energie umwandeln, heissen <b>Energiewandler</b>. Du zeigst eine Umwandlung als <b>Energieumwandlungskette</b>:</p>
        ${merk('Bewegungsenergie → <b>Generator</b> → elektrische Energie → <b>Heizung</b> → thermische Energie')}
        <p>Auf den Pfeilen stehen die Energieformen, bei den Kästchen die Wandler. Die Dicke der Pfeile zeigt die Energiemenge.</p>` },
    { h: 'Baue eine Kette',
      body: '<p>Wähle ein Gerät. Du siehst, wie die Energie sich verteilt. Das Bild ist ein Modell mit Beispielverhältnissen.</p>', sim: 'kette' },
    { h: 'Vorgerechnet: Würfel in der Achterbahn', worked: {
      given: 'Eine Achterbahn hat oben 10 Energiewürfel Lageenergie. Unten sind 7 Würfel zu Bewegungsenergie geworden, der Rest ist thermische Energie. Wie viele Würfel sind thermisch?',
      steps: [['Gesamtzahl bleibt gleich', 'Am Ende gibt es insgesamt wieder 10 Würfel.'], ['Rechnung', '10 − 7 = 3'], ['Antwort', '3 Würfel sind thermische Energie. Der Pfeil am Anfang ist so dick wie alle Pfeile am Ende zusammen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Umwandlung passiert in einer Solarzelle?',
        options: ['Strahlungsenergie wird zu elektrischer Energie.', 'Elektrische Energie wird zu Strahlungsenergie.', 'Lageenergie wird zu Bewegungsenergie.', 'Chemische Energie wird zu Spannenergie.'],
        explain: 'Eine Solarzelle wandelt Licht (Strahlungsenergie) in elektrische Energie um.' } }
  ],
  e3: [
    { h: 'Die wertvolle Energie nimmt ab',
      body: `<p>Bei fast jeder Energieumwandlung entsteht auch <b>thermische Energie</b>. Das nennt man <b>Energieentwertung</b>.</p>
        ${merk('Energie geht nicht verloren, aber ein Teil wird zu thermischer Energie. Sie verteilt sich in der Umgebung und ist kaum noch nutzbar.')}
        <p>Diese thermische Energie nennt man auch <b>Verlustenergie</b>, wenn sie unerwünscht ist.</p>` },
    { h: 'Lampen im Vergleich',
      body: `<p>Du vergleichst drei Lampenarten auf Wärmebildern: LED-Lampe, Halogenlampe und Glühlampe. Die Glühlampe wird sehr heiss, die LED-Lampe nur wenig.</p>
        ${merk('Je weniger thermische Energie bei einer Lampe entsteht, desto besser wird die elektrische Energie für das Licht genutzt.')}` },
    { h: 'Wohin geht die Energie?',
      body: '<p>Ziehe den Regler und sieh, wie sich die Energiewürfel verteilen, wenn etwas rollt oder fällt. Ein Teil wird thermisch. Das ist ein Modell.</p>', sim: 'wuerfel' },
    { h: 'Vorgerechnet: Wie viel Licht?', worked: {
      given: 'Einer Lampe werden 10 Energiewürfel elektrische Energie zugeführt. 8 Würfel werden zu thermischer Energie. Wie viele werden zu Licht?',
      steps: [['Gesamtzahl am Ende', 'Am Ende sind es wieder 10 Würfel.'], ['Rechnung', '10 − 8 = 2'], ['Antwort', '2 Würfel werden zu Strahlungsenergie. Die Lampe nutzt nur wenig von der Energie für das Licht.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was bedeutet Energieentwertung?',
        options: ['Ein Teil der Energie wird zu thermischer Energie und ist kaum noch nutzbar.', 'Energie wird weniger und verschwindet.', 'Energie wird zu Geld.', 'Energie verändert sich nie.'],
        explain: 'Energieentwertung heisst: Die Energie bleibt erhalten, aber ein Teil liegt als thermische Energie in der Umgebung vor und ist schlecht nutzbar.' } }
  ],
  e4: [
    { h: 'Energie speichern',
      body: `<p>Energie lässt sich in <b>Energieträgern</b> speichern:</p>
        <ul><li><b>Nahrung, Holz, Kohle, Benzin:</b> chemische Energie.</li>
        <li><b>Batterie:</b> chemische Energie, die als elektrische Energie abgegeben wird.</li>
        <li><b>Hoch gelegener Stausee:</b> Lageenergie.</li></ul>
        <p>Speichern ist schwierig: Man braucht dafür einen passenden Speicher, zum Beispiel eine Fettzelle oder eine Batterie.</p>` },
    { h: 'Die Einheit Joule',
      body: `${merk('Die Einheit der Energie ist das <b>Joule (J)</b>.<br>1 kJ = 1000 J<br>Auf Verpackungen steht oft kJ oder kcal.')}
        <p>Für Lebensmittel gilt: Die Angabe bezieht sich meist auf 100 g. Wenn du mehr oder weniger isst, rechnest du um.</p>
        <p>Zum Umrechnen von kcal in kJ kannst du mit etwa 4,2 multiplizieren.</p>` },
    { h: 'Rechne mit Lebensmitteln',
      body: '<p>Stelle Masse und Energie pro 100 g ein. Die Werte sind Beispiele, keine echten Lebensmittel.</p>', sim: 'speicher' },
    { h: 'Vorgerechnet: Eine Portion', worked: {
      given: 'Ein Lebensmittel enthält pro 100 g 2000 kJ. Wie viel Energie steckt in 25 g?',
      steps: [['Anteil der Masse', '25 g : 100 g = 0,25'], ['Energie berechnen', '0,25 · 2000 kJ = 500 kJ'], ['Antwort', 'In 25 g stecken 500 kJ. Das sind 500 000 J.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie viele Joule sind 3 kJ?',
        options: ['3000 J', '30 J', '0,003 J', '300 J'],
        explain: '1 kJ = 1000 J, also 3 kJ = 3000 J.' } }
  ],
  e5: [
    { h: 'Thermische Energie',
      body: `<p>Thermische Energie ist die Bewegung der kleinsten Teilchen (Teilchenmodell). Je schneller sich die Teilchen bewegen, desto grösser ist die thermische Energie und desto wärmer ist der Körper.</p>
        ${merk('Sage <b>thermische Energie</b>, nicht Wärmeenergie.<br>Thermische Energie fliesst immer von <b>warm nach kalt</b>.')}` },
    { h: 'Drei Wege für den Transport',
      body: `<ul><li><b>Wärmeleitung:</b> in Feststoffen, die Teilchen geben ihre Bewegung weiter (Löffel in heisser Suppe).</li>
        <li><b>Wärmeströmung:</b> in Flüssigkeiten und Gasen, warme Teilchen strömen (aufsteigende Luft über der Heizung).</li>
        <li><b>Wärmestrahlung:</b> ohne Stoff dazwischen (Sonne).</li></ul>` },
    { h: 'Sieh dir die drei Wege an',
      body: '<p>Wähle einen Transportweg. Die Animation zeigt das Prinzip vereinfacht.</p>', sim: 'waerme' },
    { h: 'Isolation und Thermosflasche',
      body: `<p>Eine <b>Isolation</b> bremst den Transport thermischer Energie. Bei der Thermosflasche wirken drei Dinge:</p>
        <ul><li>Der Deckel verhindert die <b>Wärmeströmung</b>.</li>
        <li>Verspiegelte Wände reflektieren die <b>Wärmestrahlung</b>.</li>
        <li>Der luftleere Raum zwischen den Wänden verhindert die <b>Wärmeleitung</b>.</li></ul>
        ${warnbox('<b>Experimente:</b> Wasser und Dosen können heiss sein. Verwende Schutzbrille und Handschuhe, wenn du mit heissem Wasser arbeitest.')}` },
    { h: 'Kurz testen',
      check: { q: 'Was bewirkt das dicke, isolierende Fell eines Eisbären?',
        options: ['Es bremst den Transport thermischer Energie nach aussen.', 'Es erzeugt zusätzliche Energie.', 'Es zieht Kälte an.', 'Es macht den Bär schwerer.'],
        explain: 'Isolierendes Fell bremst den Transport thermischer Energie vom warmen Körper in die kalte Umgebung. Der Körper kühlt dadurch langsamer ab.' } }
  ],
  e6: [
    { h: 'Energieerhaltung',
      body: `${merk('<b>Energie geht nicht verloren.</b> Sie kann weder erzeugt noch vernichtet werden. Sie wird umgewandelt oder transportiert.')}
        <p>Das heisst: In einem abgeschlossenen Vorgang ist die Energiemenge am Anfang so gross wie am Ende.</p>` },
    { h: 'Das Modell der Energiewürfel',
      body: `<p>Mit Energiewürfeln kannst du Energie verfolgen. Jeder Würfel steht für eine Portion Energie.</p>
        ${merk('<b>Drehen</b> = Energieumwandlung (andere Energieform).<br><b>Schieben</b> = Energietransport (in ein anderes System).')}
        <p>Der Würfel bleibt immer derselbe, nur sein Zustand ändert sich. Energie besteht nicht wirklich aus Würfeln. Es ist ein Modell.</p>` },
    { h: 'Spiele das Szenario',
      body: '<p>Ziehe den Regler. Die Würfel ändern ihre Form, aber ihre Zahl bleibt gleich.</p>', sim: 'wuerfel' },
    { h: 'Vorgerechnet: Würfel am Ende', worked: {
      given: 'Zu Beginn sind 12 Energiewürfel vorhanden. Am Ende sind 7 Würfel Bewegungsenergie und 2 Würfel Lageenergie. Der Rest ist thermisch. Wie viele sind es?',
      steps: [['Gesamtzahl', 'Es bleiben 12 Würfel.'], ['Rechnung', '12 − 7 − 2 = 3'], ['Antwort', '3 Würfel sind thermische Energie.']] } },
    { h: 'Energie clever nutzen',
      body: `<p>Wenn du Energie clever nutzen willst, beachtest du:</p>
        <ul><li>Energie nicht unnötig in thermische Energie umwandeln.</li>
        <li>Geräte nutzen, die die Energie gut ausnutzen.</li>
        <li>Energie speichern, wo es sinnvoll ist.</li></ul>
        <p>Im Projekt «Papierachterbahn» wendest du alles an: Energieformen, Umwandlungen, Erhaltung und Entwertung.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Wie lässt sich Energieerhaltung am besten beschreiben?',
        options: ['Die Gesamtmenge bleibt gleich, nur Form oder Ort ändern sich.', 'Die Energie nimmt bei jedem Vorgang um die Hälfte ab.', 'Energie wird verbraucht und muss neu gekauft werden.', 'Die Energie verschwindet, sobald etwas anhält.'],
        explain: 'Energie geht nicht verloren. Sie wird nur umgewandelt oder transportiert. Die Gesamtmenge bleibt gleich.' } }
  ]
};
const GOALS = {
  e1: ['Energieformen benennen und im Alltag zuordnen', 'Energie als Eigenschaft von Körpern beschreiben'],
  e2: ['Energieumwandlungen und Energiewandler beschreiben', 'Energieumwandlungsketten richtig darstellen'],
  e3: ['Energieentwertung mit Alltagsbeispielen erklären', 'thermische Energie als Verlustenergie erkennen'],
  e4: ['Energieträger und Energiespeicher nennen', 'Energiemengen in J, kJ und kcal umrechnen'],
  e5: ['Wärmeleitung, Wärmeströmung und Wärmestrahlung unterscheiden', 'Isolation an Alltagsbeispielen beschreiben'],
  e6: ['das Prinzip der Energieerhaltung beschreiben', 'Energiewürfelszenarien nutzen']
};
const LEARN = {
  'e1-spann': 'Die Energieformen', 'e1-bewegung': 'Die Energieformen', 'e1-nahrung': 'Die Energieformen', 'e1-stausee': 'Kurz testen', 'e1-eigenschaft': 'Energie ist überall', 'e1-sprache': 'Richtig sprechen',
  'e2-achterbahn': 'Aus einer Form wird eine andere', 'e2-solar': 'Energiewandler und Ketten', 'e2-generator': 'Energiewandler und Ketten', 'e2-taschenlampe': 'Baue eine Kette', 'e2-pfeil': 'Energiewandler und Ketten', 'e2-wuerfel': 'Vorgerechnet: Würfel in der Achterbahn',
  'e3-thermisch': 'Die wertvolle Energie nimmt ab', 'e3-lampen': 'Lampen im Vergleich', 'e3-verlust': 'Die wertvolle Energie nimmt ab', 'e3-ball': 'Wohin geht die Energie?', 'e3-warm': 'Die wertvolle Energie nimmt ab', 'e3-licht': 'Vorgerechnet: Wie viel Licht?',
  'e4-joule': 'Die Einheit Joule', 'e4-kj': 'Die Einheit Joule', 'e4-portion': 'Vorgerechnet: Eine Portion', 'e4-kcal': 'Die Einheit Joule', 'e4-traeger': 'Energie speichern', 'e4-speicher': 'Energie speichern',
  'e5-begriff': 'Thermische Energie', 'e5-leitung': 'Drei Wege für den Transport', 'e5-stroemung': 'Drei Wege für den Transport', 'e5-strahlung': 'Drei Wege für den Transport', 'e5-thermos': 'Isolation und Thermosflasche', 'e5-isolation': 'Isolation und Thermosflasche',
  'e6-erhaltung': 'Energieerhaltung', 'e6-schieben': 'Das Modell der Energiewürfel', 'e6-modell': 'Das Modell der Energiewürfel', 'e6-batterie': 'Energieerhaltung', 'e6-summe': 'Vorgerechnet: Würfel am Ende', 'e6-anfang': 'Vorgerechnet: Würfel am Ende'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Funke', pw: 'schlummert' },
  { xp: 80, name: 'Glühwürmchen', pw: 'leuchtet' },
  { xp: 200, name: 'Batterie', pw: 'speichert' },
  { xp: 380, name: 'Solarzelle', pw: 'wandelt um' },
  { xp: 620, name: 'Windrad', pw: 'liefert Strom' },
  { xp: 920, name: 'Kraftwerk', pw: 'versorgt Städte' }
];

/* ---------- Thema: 7_5 Energie erkunden ---------- */
const TOPIC = {
  id: 'nt7-5', storeKey: 'halingen-nt7-5-v1', other: { title: '7_4 Bewegungen erkunden', href: '7_4_Bewegungen_erkunden.html' },
  title: 'Energie erkunden', lead: 'Energie wandelt sich um und geht nicht verloren', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Energie wird genutzt, nicht verbraucht.', 'Beim Energiewürfelmodell bleibt die Zahl der Würfel gleich.'],
  formulas: [
    ['Energieformen', 'Lage, Bewegung, Spann, chemisch', 'thermisch, Strahlung, Schall, elektrisch'],
    ['Einheit', 'Joule (J)', '1 kJ = 1000 J, 1 kcal ≈ 4,2 kJ'],
    ['Energieentwertung', 'immer etwas thermische Energie', 'Verlustenergie'],
    ['Energietransport', 'Leitung, Strömung, Strahlung', 'immer von warm nach kalt'],
    ['Energieerhaltung', 'Energie geht nicht verloren', 'Anfang = Ende (Würfelzahl)'],
    ['Modell Energiewürfel', 'Drehen = Umwandlung', 'Schieben = Transport']
  ]
};

/* ---------- Simulationen ---------- */
const FORMEN = { lage: 'Lageenergie', bew: 'Bewegungsenergie', che: 'Chemische Energie', str: 'Strahlungsenergie', the: 'Thermische Energie', ele: 'Elektrische Energie', spa: 'Spannenergie', sch: 'Schallenergie' };
const SIMS = {
  formen(el) {
    const items = [
      { t: 'Ein Apfel hängt hoch am Baum', ok: ['lage'], why: 'Der Apfel liegt hoch. Er hat Lageenergie.' },
      { t: 'Ein Velo rollt den Hang hinunter', ok: ['bew'], why: 'Das Velo bewegt sich. Es hat Bewegungsenergie.' },
      { t: 'Ein Stück Brot', ok: ['che'], why: 'In der Nahrung ist chemische Energie gespeichert.' },
      { t: 'Eine gespannte Feder im Kugelschreiber', ok: ['spa'], why: 'Gespannte Federn haben Spannenergie.' },
      { t: 'Die Sonne scheint', ok: ['str'], why: 'Licht ist Strahlungsenergie.' },
      { t: 'Eine Tasse mit heissem Tee', ok: ['the'], why: 'Heisse Körper haben viel thermische Energie.' },
      { t: 'Ein Lautsprecher spielt Musik', ok: ['sch'], why: 'Was du hörst, ist Schallenergie.' },
      { t: 'Strom aus der Steckdose', ok: ['ele'], why: 'Das ist elektrische Energie.' }
    ];
    el.innerHTML = `<div class="sim"><p class="small" id="gn" aria-live="polite"></p><p class="gcard" id="gc"></p>
      <div class="gbtns" id="gb">${Object.keys(FORMEN).map(k => `<button class="btn sm" data-g="${k}">${FORMEN[k]}</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p>
      <button class="btn btn-primary block" id="nx" hidden>Weiter zum nächsten Beispiel</button></div>`;
    let i = 0, score = 0, done = false;
    function show() {
      done = false; $id('nx').hidden = true;
      if (i >= items.length) {
        $id('gn').textContent = ''; $id('gc').textContent = 'Geschafft!'; $id('gb').hidden = true;
        $id('ro').innerHTML = `<b>${score} von ${items.length}</b> beim ersten Tipp richtig. Unten geht es mit «Weiter» zur nächsten Karte.`;
        const again = document.createElement('button'); again.className = 'btn sm'; again.textContent = 'Nochmals spielen';
        again.addEventListener('click', () => { i = 0; score = 0; $id('gb').hidden = false; again.remove(); show(); });
        $id('ro').appendChild(document.createElement('br')); $id('ro').appendChild(again); return;
      }
      $id('gn').textContent = 'Beispiel ' + (i + 1) + ' von ' + items.length;
      $id('gc').textContent = items[i].t; $id('ro').textContent = 'Tippe auf die passende Energieform.';
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
  },

  kette(el) {
    // Beispielverhältnisse (Modell): Anteile am Ende; die Summe ist immer 100
    const dev = {
      lampe: { name: 'Glühlampe', start: 'Elektrische Energie', wandler: 'Lampe', nutz: ['Strahlungsenergie (Licht)', 8], rest: 92 },
      led: { name: 'LED-Lampe', start: 'Elektrische Energie', wandler: 'LED-Lampe', nutz: ['Strahlungsenergie (Licht)', 40], rest: 60 },
      solar: { name: 'Solarauto', start: 'Strahlungsenergie', wandler: 'Solarzelle und Motor', nutz: ['Bewegungsenergie', 70], rest: 30 },
      toast: { name: 'Toaster', start: 'Elektrische Energie', wandler: 'Heizdraht', nutz: ['Thermische Energie (Brot)', 85], rest: 15 }
    };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Gerät">${Object.keys(dev).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-d="${k}">${dev[k].name}</button>`).join('')}</div>
      <div class="chain" aria-hidden="true"><div class="cbox" id="c1"></div><div class="carrow">→</div><div class="cbox w" id="c2"></div><div class="carrow">→</div><div class="cend"><div class="brow"><span class="bname">Nutzen</span><div class="btrack"><div class="bfill" id="bn"></div></div></div><div class="brow"><span class="bname">Thermisch</span><div class="btrack"><div class="bfill th" id="bt"></div></div></div></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function set(k) {
      const d = dev[k];
      el.querySelectorAll('[data-d]').forEach(b => b.classList.toggle('on', b.dataset.d === k));
      $id('c1').textContent = d.start; $id('c2').textContent = d.wandler;
      $id('bn').style.width = d.nutz[1] + '%'; $id('bt').style.width = d.rest + '%';
      $id('ro').innerHTML = `${d.start} → ${d.wandler} → ${d.nutz[0]} und thermische Energie.<br>Der Pfeil am Anfang (100) ist so dick wie die beiden am Ende zusammen (${d.nutz[1]} + ${d.rest}). Beispielverhältnisse (Modell).`;
    }
    el.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => set(b.dataset.d)));
    $id('bn').style.width = '0%'; $id('bt').style.width = '0%';
    nf(el, () => set('lampe'));
  },

  wuerfel(el) {
    const N = 10;
    el.innerHTML = `<div class="sim"><div class="cubes" id="cb" aria-hidden="true"></div>
      <div class="legend"><span class="lgd lage"></span>Lage <span class="lgd bew"></span>Bewegung <span class="lgd therm"></span>thermisch</div>
      ${sl('pos', 'Ablauf', 0, 100, 10, 0, '%')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    const cb = $id('cb');
    for (let i = 0; i < N; i++) { const c = document.createElement('i'); c.className = 'cube lage'; cb.appendChild(c); }
    function upd() {
      const p = +$id('pos').value / 100;
      $id('posv').textContent = String(Math.round(p * 100));
      const th = Math.round(N * 0.3 * p), bew = Math.round(N * (1 - 0.3 * p) * p) , lage = N - th - bew;
      const cubes = cb.querySelectorAll('.cube');
      cubes.forEach((c, i) => { c.className = 'cube ' + (i < lage ? 'lage' : i < lage + bew ? 'bew' : 'therm'); });
      $id('ro').innerHTML = `Lage: <b>${lage}</b>, Bewegung: <b>${bew}</b>, thermisch: <b>${th}</b>. Zusammen: <b>${lage + bew + th}</b> Würfel.<br>Die Zahl bleibt gleich, nur die Formen ändern sich (Modell).`;
    }
    $id('pos').addEventListener('input', upd); upd();
  },

  speicher(el) {
    el.innerHTML = `<div class="sim"><div class="trio"><div><span class="k">Energie</span><b class="mono" id="r1"></b></div><div><span class="k">in J</span><b class="mono" id="r2"></b></div><div><span class="k">in kcal</span><b class="mono" id="r3"></b></div></div>
      ${sl('sm', 'Masse', 10, 300, 10, 50, 'g')}${sl('se', 'Energie pro 100 g', 100, 3000, 100, 1500, 'kJ')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const m = +$id('sm').value, e = +$id('se').value, E = m * e / 100;
      $id('smv').textContent = fmt(m); $id('sev').textContent = fmt(e);
      $id('r1').textContent = fmt(E) + ' kJ'; $id('r2').textContent = fmt(E * 1000) + ' J'; $id('r3').textContent = fmt(E / 4.2, 0) + ' kcal';
      $id('ro').innerHTML = `E = ${fmt(m)} g : 100 g · ${fmt(e)} kJ = <b>${fmt(E)} kJ</b><br>1 kcal ≈ 4,2 kJ, also ≈ ${fmt(E / 4.2, 0)} kcal.`;
    }
    $id('sm').addEventListener('input', upd); $id('se').addEventListener('input', upd); upd();
  },

  waerme(el) {
    const modes = {
      leitung: ['Wärmeleitung', 'Im Feststoff geben die Teilchen ihre Bewegung an die Nachbarteilchen weiter. Die thermische Energie wandert durch den Stab.'],
      stroemung: ['Wärmeströmung', 'In Flüssigkeiten und Gasen steigen warme Teilchen auf, kühlere sinken ab. Es entsteht eine Strömung.'],
      strahlung: ['Wärmestrahlung', 'Die Energie wird als Strahlung abgegeben. Sie braucht keinen Stoff, der sie weiterreicht.']
    };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Transportweg">${Object.keys(modes).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-w="${k}">${modes[k][0]}</button>`).join('')}</div>
      <div class="wdemo" id="wd" data-m="leitung" aria-hidden="true"><div class="hot"></div><div class="ws"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="cold"></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function set(k) {
      $id('wd').dataset.m = k;
      el.querySelectorAll('[data-w]').forEach(b => b.classList.toggle('on', b.dataset.w === k));
      $id('ro').innerHTML = `<b>${modes[k][0]}:</b> ${modes[k][1]}<br>Immer von warm nach kalt.`;
    }
    el.querySelectorAll('[data-w]').forEach(b => b.addEventListener('click', () => set(b.dataset.w)));
    set('leitung');
  }
};




export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-5","titel":"Energie erkunden","kapitel":"NaTech 7, Kapitel 5"});
