// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_7_Land_Oekosysteme_erforschen.html
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

/* ---------- Inhalt: 9_7 Land-Ökosysteme erforschen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_7 (ein Lehrerkommentar liegt nicht vor). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'l1', nr: 1, title: 'Wiese, Wald und Zeigerpflanzen', sub: 'Standorte lesen lernen',
    items: [
      { id: 'l1-ohne', topic: 'Ohne Menschen', make() {
        return mc('Wie sähe die Schweiz ohne Menschen aus?', ['Sie wäre ein Waldland. Wiesen gäbe es nur sehr hoch oben oder an sehr nassen Stellen.', 'Sie wäre eine einzige Wiese.', 'Sie wäre eine Wüste.', 'Sie hätte gleich viele Wiesen wie heute.'],
          'Die allermeisten Wiesen sind durch den Menschen geschaffen. Wo Wiesen nicht bewirtschaftet werden, werden sie mit der Zeit wieder zu Wald.');
      } },
      { id: 'l1-zeiger', topic: 'Zeigerpflanzen', make() {
        return mc('Was sind Zeigerpflanzen?', ['Pflanzen, die ganz bestimmte Eigenschaften ihres Standorts anzeigen, zum Beispiel Nährstoffe oder den pH-Wert des Bodens.', 'Pflanzen, die mit Blüten auf Wege zeigen.', 'Pflanzen, die nur im Wald wachsen.', 'Pflanzen ohne Wurzeln.'],
          'Licht, Feuchtigkeit, pH-Wert und Nährstoffgehalt bestimmen, welche Pflanzen an einem Standort wachsen.');
      } },
      { id: 'l1-kerbel', topic: 'Wiesenkerbel', make() {
        return mc('Auf einer Wiese wächst viel Wiesenkerbel. Was sagt das über den Boden?', ['Er enthält sehr viele Nährstoffe.', 'Er ist sehr sauer und nährstoffarm.', 'Er ist versiegelt.', 'Er ist ohne Wasser.'],
          'Der Wiesenkerbel mag viele Nährstoffe. Er ist deshalb eine Zeigerpflanze für nährstoffreiche Böden.');
      } },
      { id: 'l1-heidel', topic: 'Heidelbeere', make() {
        return mc('Heidelbeeren wachsen bevorzugt auf …', ['saurem Boden.', 'basischem Boden.', 'versiegeltem Boden.', 'nährstoffreichem, neutralem Boden.'],
          'Die Heidelbeere zeigt sauren Boden an. Nadeln von Nadelbäumen senken wegen ihres Säuregehalts den pH-Wert des Bodens.');
      } },
      { id: 'l1-rand', topic: 'Gestufter Waldrand', make() {
        return mc('Warum ist ein gestufter Waldrand ökologisch wertvoller als ein harter Übergang von Wiese zu Hochwald?', ['Er bietet Tieren Verstecke und Nahrung, hat eine hohe Artenvielfalt und schützt den Wald vor Wind.', 'Er ist einfach nur schöner.', 'Er hat weniger Arten.', 'Er enthält keine Sträucher.'],
          'Niedere Bäume und Sträucher mit Stacheln und Dornen schaffen Lebensraum für Tiere, die sowohl im Wald als auch auf der Wiese leben.');
      } },
      { id: 'l1-wald', topic: 'Nutzen des Waldes', make() {
        return mc('Welche Vorteile hat der Wald für uns Menschen?', ['Er speichert Wasser im Boden, kühlt im Sommer, schützt vor Wind und Lawinen, filtert Schmutz aus der Luft und speichert Kohlenstoff.', 'Er hat keinen Nutzen.', 'Er erzeugt nur Lärm.', 'Er erhöht Hochwasser.'],
          'Der Wald speichert viel Wasser im Boden und vermindert dadurch Hochwasser. Durch Fotosynthese wird Kohlenstoff im Holz der Bäume gespeichert.');
      } }
    ]
  },
  {
    id: 'l2', nr: 2, title: 'Boden: Bestandteile und Funktionen', sub: 'Mehr als nur Dreck',
    items: [
      { id: 'l2-teile', topic: 'Bestandteile des Bodens', make() {
        return mc('Woraus besteht ein Boden?', ['Aus Gesteinsbruchstücken (knapp die Hälfte), Wasser und Luft (je etwa ein Viertel) und etwas Humus.', 'Nur aus Sand und Wasser.', 'Nur aus Humus.', 'Nur aus Steinen.'],
          'Humus wird durch biologische Vorgänge aufgebaut. Er besteht zum grössten Teil aus abgestorbenen Lebewesen und deren Ausscheidungen.');
      } },
      { id: 'l2-luft', topic: 'Luftanteil berechnen', make() {
        const v = rnd([400, 800, 1000, 2000, 4000]), l = v / 4;
        return num(`In einem Boden bestehen etwa ein Viertel des Volumens aus Luft. Wie viele Liter Luft stecken in ${fmt(v)} Litern Boden?`, 'Liter', l, 'Ein Viertel ist die Zahl geteilt durch 4.', `${fmt(v)} L : 4 = ${fmt(l)} L Luft`);
      } },
      { id: 'l2-funk', topic: 'Funktionen des Bodens', make() {
        return mc('Welche Funktionen hat der Boden?', ['Lebensmittelproduzent, Lebensraum, Lieferant von Baumaterial sowie Reinigung und Speicherung von Wasser.', 'Nur Platz für Gebäude.', 'Nur Lieferant von Wasser.', 'Er hat keine Funktion.'],
          'Die feinen Hohlräume wirken wie ein Filter und entfernen Schadstoffe aus dem Wasser. Der Boden speichert Wasser wie ein Schwamm.');
      } },
      { id: 'l2-bildung', topic: 'Entstehung des Bodens', make() {
        return mc('Wie entsteht Boden?', ['Von unten durch die Verwitterung von Gestein über Jahrtausende, von oben durch abgestorbene Pflanzen und Tiere, die Humus bilden.', 'In wenigen Tagen durch Regen.', 'Nur durch Dünger.', 'Durch Bauarbeiten.'],
          'Fruchtbare Böden brauchen Tausende von Jahren, um sich zu bilden.');
      } },
      { id: 'l2-humus', topic: 'Humus', make() {
        return mc('Wie wird die Humusbildung auf einer Wiese oder einem Acker unterstützt?', ['Durch biologische Dünger wie Mist oder Gülle. Chemische Dünger enthalten Nährstoffe, tragen aber nichts zur Humusbildung bei.', 'Durch chemische Dünger.', 'Durch schwere Maschinen.', 'Durch Versiegeln.'],
          'Nährstoffe werden vor allem im Humus durch Mikroorganismen gebildet. Im Wald entsteht der meiste Humus aus abgestorbenen Blättern.');
      } },
      { id: 'l2-verdicht', topic: 'Verdichtung', make() {
        return mc('Was geschieht, wenn schwere Maschinen den Boden verdichten?', ['Die Hohlräume werden zusammengedrückt, der Boden speichert weniger Wasser, und das Wasser fliesst an der Oberfläche ab.', 'Der Boden speichert mehr Wasser.', 'Es entstehen mehr Regenwürmer.', 'Nichts.'],
          'Das trägt zu Hochwasser bei. Pflanzenwurzeln und Regenwürmer sorgen für verzweigte Hohlräume.');
      } }
    ]
  },
  {
    id: 'l3', nr: 3, title: 'Boden untersuchen', sub: 'Wasser, Humus und pH-Wert',
    items: [
      { id: 'l3-wasser', topic: 'Wasserspeicherfähigkeit', make() {
        const s = rnd([[250, 1000], [100, 500], [150, 1000], [60, 400], [90, 300]]), p = r2(s[0] / s[1] * 100);
        return num(`${fmt(s[1])} mL Boden können ${fmt(s[0])} mL Wasser speichern. Wie gross ist die Wasserspeicherfähigkeit in Prozent?`, '%', p, 'Teile das Wasservolumen durch das Bodenvolumen.', `${fmt(s[0])} mL : ${fmt(s[1])} mL = ${fmt(p / 100)} = ${fmt(p)} %`);
      } },
      { id: 'l3-bereich', topic: 'Idealer Bereich', make() {
        return mc('Welche Wasserspeicherfähigkeit ist für Pflanzen gut?', ['Zwischen 15 und 40 Prozent.', 'Unter 5 Prozent.', 'Über 80 Prozent.', 'Genau 100 Prozent.'],
          'Je mehr Hohlräume ein Boden hat, desto grösser ist seine Wasserspeicherfähigkeit.');
      } },
      { id: 'l3-humus', topic: 'Humusgehalt berechnen', make() {
        const s = rnd([[50, 2], [100, 6], [50, 4], [200, 6], [20, 1]]), p = r2(s[1] / s[0] * 100);
        return num(`In einer Bodenprobe von ${fmt(s[0])} g sind ${fmt(s[1])} g Humus. Wie viel Prozent beträgt der Humusgehalt?`, '%', p, 'Humusgehalt = Humus : Probe · 100 %', `${fmt(s[1])} g : ${fmt(s[0])} g · 100 % = ${fmt(p)} %`);
      } },
      { id: 'l3-klasse', topic: 'Humusklassen', make() {
        return mc('Ein Boden hat einen Humusgehalt von 5 Prozent. Wie heisst er?', ['Humusreich (4 bis 8 Prozent).', 'Humusarm (unter 2 Prozent).', 'Mässig humushaltig (2 bis 4 Prozent).', 'Sehr humusreich (über 8 Prozent).'],
          'Nährstoffhaltige Böden haben einen Humusgehalt von 4 Prozent und mehr.');
      } },
      { id: 'l3-ph', topic: 'pH-Wert des Bodens', make() {
        return mc('Welche pH-Werte bevorzugen die meisten Bodenlebewesen und Pflanzen?', ['Zwischen 5 und 7,5.', 'Unter 2.', 'Über 12.', 'Genau 14.'],
          'In einem sauren Boden werden Nährstoffe leichter ausgewaschen. Nadeln von Nadelbäumen senken den pH-Wert.');
      } },
      { id: 'l3-daten', topic: 'Daten beurteilen', make() {
        return mc('Eine Bodenprobe hat den pH-Wert 4,5 und eine Wasserspeicherfähigkeit von 12 Prozent. Was kannst du sagen?', ['Der Boden ist ziemlich sauer und speichert wenig Wasser (unter 15 Prozent). Für viele Pflanzen ist er nicht ideal.', 'Der Boden ist ideal.', 'Der Boden ist basisch.', 'Man kann nichts aussagen.'],
          'Die Werte liegen ausserhalb des Idealbereichs: pH 5 bis 7,5 und Wasserspeicherfähigkeit 15 bis 40 Prozent.');
      } }
    ]
  },
  {
    id: 'l4', nr: 4, title: 'Dörfer und Städte als Ökosysteme', sub: 'Artenvielfalt und Versiegelung',
    items: [
      { id: 'l4-arten', topic: 'Artenvielfalt der Stadt', make() {
        return mc('Wie gross ist die Artenvielfalt in Siedlungen im Vergleich?', ['Kleiner als in einem Laub-Mischwald, aber oft grösser als auf intensiv bewirtschafteten Landwirtschaftsflächen.', 'Immer kleiner als überall.', 'Immer grösser als im Wald.', 'Es gibt keine Arten in der Stadt.'],
          'Manche Städte haben sogar doppelt so viele Wildpflanzen wie das Land.');
      } },
      { id: 'l4-gruende', topic: 'Gründe für Artenreichtum', make() {
        return mc('Welcher Grund erklärt die grosse Artenvielfalt in Siedlungen?', ['Abwechslungsreiche Lebensräume, weniger Pestizide, keine Jagd, Abfälle und Kompost als Nahrung sowie ein wärmeres Klima.', 'Mehr Pestizide.', 'Weniger Lebensräume.', 'Mehr Jagd.'],
          'Parks, Gärten, Strassenränder, Hauswände und alte Industrieflächen bieten Lebensräume für unterschiedliche Lebewesen.');
      } },
      { id: 'l4-allein', topic: 'Stadt allein?', make() {
        return mc('Kann ein Stadt-Ökosystem allein überleben?', ['Nein. Es ist auf andere Ökosysteme angewiesen, die Nahrung, Wasser und Energie liefern und Abfälle aufnehmen.', 'Ja, es ist völlig unabhängig.', 'Ja, weil Städte alles selbst erzeugen.', 'Nein, weil Städte keine Lebewesen haben.'],
          'In einer Stadt sind die Stoff- und Energieflüsse nicht geschlossen. Sie sind auf Zufuhr und Abfuhr von aussen angewiesen.');
      } },
      { id: 'l4-versiegel', topic: 'Folgen der Versiegelung', make() {
        return mc('Welche Folgen hat die Versiegelung von Böden?', ['Regenwasser versickert schlechter, es sammelt sich weniger Grundwasser, Überschwemmungen werden häufiger, Bodenlebewesen sterben und weniger Kohlenstoff wird gespeichert.', 'Mehr Grundwasser.', 'Mehr Bodenlebewesen.', 'Keine Folgen.'],
          'Versiegelt sind Böden, die durch Gebäude, Strassen oder Schienen bedeckt sind. Es kommen kaum Wasser und Luft hinein.');
      } },
      { id: 'l4-flaeche', topic: 'Versiegelte Fläche', make() {
        const f = rnd([200, 400, 1000, 2000, 600]), v = f / 20;
        return num(`In der Schweiz ist knapp ein Zwanzigstel der Fläche versiegelt. In einem Beispielgebiet von ${fmt(f)} km² wäre ein Zwanzigstel versiegelt. Wie gross ist diese Fläche?`, 'km²', v, 'Teile durch 20.', `${fmt(f)} km² : 20 = ${fmt(v)} km²`);
      } },
      { id: 'l4-grund', topic: 'Ursachen der Versiegelung', make() {
        return mc('Warum schreitet die Versiegelung fort?', ['Weil die Bevölkerung wächst und jede Person mehr Platz zum Wohnen, Fortbewegen und Einkaufen braucht.', 'Weil Böden absichtlich zerstört werden.', 'Weil es weniger Menschen gibt.', 'Weil Pflanzen Beton wollen.'],
          'Fruchtbare Böden brauchen Tausende von Jahren, um sich zu bilden. Durch Versiegelung gehen sie weitgehend verloren.');
      } }
    ]
  },
  {
    id: 'l5', nr: 5, title: 'Biodiversität in Gefahr', sub: 'Ursachen des Artenrückgangs',
    items: [
      { id: 'l5-div', topic: 'Drei Ebenen der Biodiversität', make() {
        return mc('Wovon hängt die Biodiversität ab?', ['Von der Vielfalt der Ökosysteme, der Arten und der Erbanlagen innerhalb der Arten.', 'Nur von der Zahl der Tiere.', 'Nur von der Zahl der Pflanzen.', 'Nur von der Grösse eines Waldes.'],
          'Zur Vielfalt der Erbanlagen gehören zum Beispiel Tierrassen und Pflanzensorten.');
      } },
      { id: 'l5-leben', topic: 'Zerstörung von Lebensräumen', make() {
        return mc('Welche Entwicklung zerstört Lebensräume?', ['Ausdehnung von Siedlungen und intensiver Landwirtschaft, Ersatz von Mischwäldern durch Wälder mit nur einer Baumart.', 'Mehr Hecken und Moore.', 'Mehr Magerwiesen.', 'Mehr Wildnis.'],
          'Hecken, Magerwiesen und Moore, aber auch Regenwälder weichen intensiv bewirtschafteten Flächen.');
      } },
      { id: 'l5-nachhalt', topic: 'Nachhaltigkeit', make() {
        return mc('Was bedeutet nachhaltiger Umgang mit natürlichen Ressourcen?', ['So viel nutzen, wie natürlich wieder nachwachsen kann.', 'So viel nutzen wie möglich.', 'Nichts nutzen.', 'Nur das Billigste nutzen.'],
          'Heute fischen Menschen weltweit mehr Fische, als nachwachsen können, und ernten mehr, als der Boden hergibt.');
      } },
      { id: 'l5-insel', topic: 'Verinselung', make() {
        return mc('Was ist Verinselung?', ['Strassen, Bahnen, Siedlungen und intensive Landwirtschaft zerschneiden Ökosysteme. Es bleiben kleine Inseln, die für viele Arten zu klein sind.', 'Neue Inseln im Meer.', 'Mehr Arten auf Inseln.', 'Ein Hochwasserschutz.'],
          'Für Lebewesen sind Strassen und Siedlungen oft unüberwindbare Hindernisse.');
      } },
      { id: 'l5-fremd', topic: 'Fremde Arten', make() {
        return mc('Wie können fremde Arten die Biodiversität gefährden?', ['Sie verdrängen heimische Arten, zum Beispiel fressen ausgesetzte Rotwangenschildkröten heimische Tiere.', 'Sie helfen immer.', 'Sie sterben sofort.', 'Sie verändern die Sonne.'],
          'Auch nicht heimische Pflanzen wie das Drüsige Springkraut können Böden instabil machen.');
      } },
      { id: 'l5-fuenftel', topic: 'Bedrohte Pflanzenarten', make() {
        const n = rnd([500, 1000, 2500, 3000, 4000]), b = n / 5;
        return num(`Ein Fünftel aller Pflanzenarten ist vom Aussterben bedroht. Wie viele wären es bei ${fmt(n)} Pflanzenarten?`, 'Arten', b, 'Teile durch 5.', `${fmt(n)} : 5 = ${fmt(b)} Arten`);
      } }
    ]
  },
  {
    id: 'l6', nr: 6, title: 'Naturnutzung und Naturschutz', sub: 'Reuss-Mündung und Permakultur',
    items: [
      { id: 'l6-reuss', topic: 'Renaturierung der Reuss-Mündung', make() {
        return mc('Was wurde bei der Reuss-Mündung gemacht und warum?', ['Der Kanal im See wurde zurückgebaut und das flache Ufer mit Aushub vom NEAT-Tunnel aufgeschüttet, weil die Wellen das Ufer abtrugen.', 'Der Fluss wurde zugeschüttet.', 'Es wurde ein Kraftwerk gebaut.', 'Der See wurde abgelassen.'],
          'Es entstanden Naturschutzgebiete, Erholungsraum, flache Ufer für Fische. Kies darf weiter abgebaut werden. Über 200 Vogelarten wurden gesichtet.');
      } },
      { id: 'l6-gewinner', topic: 'Interessen vereinen', make() {
        return mc('Warum spricht man bei der Reuss-Renaturierung von «nur Gewinnern»?', ['Natur, Freizeit, Fischerei, Kiesabbau und Vogelschutz profitieren alle.', 'Weil es teuer war.', 'Weil niemand etwas wollte.', 'Weil nur Menschen profitieren.'],
          'Naturschutz und Naturnutzung können sich ergänzen, wenn die Bedingungen gut geplant sind.');
      } },
      { id: 'l6-perma', topic: 'Permakultur', make() {
        return mc('Was ist Permakultur?', ['Eine Landwirtschaft, die Kreisläufe der Natur nachahmt und möglichst ohne Pestizide, Kunstdünger und schwere Maschinen auskommt.', 'Eine Landwirtschaft mit viel Dünger.', 'Eine Form von Bauen.', 'Ein Fussballverein.'],
          'Vorbild sind selbstregulierende Ökosysteme. Grundsätze: von der Natur lernen, Vielfalt ermöglichen, Vernetzung fördern, Kreisläufe ermöglichen.');
      } },
      { id: 'l6-milpa', topic: 'Milpa-System', make() {
        return mc('Wie arbeiten Mais, Bohnen und Kürbis im Milpa-System zusammen?', ['Mais dient den Bohnen als Kletterhilfe, die Bohnen wandeln Stickstoff aus der Luft zu Dünger um, der Kürbis schützt den Boden und hemmt Unkraut.', 'Alle konkurrieren.', 'Sie wachsen nur getrennt.', 'Der Kürbis frisst den Mais.'],
          'Das Milpa-System der Maya heisst auch «Die drei Schwestern». Es ist ein jahrhundertealtes Beispiel der Permakultur.');
      } },
      { id: 'l6-vernetz', topic: 'Vernetzung', make() {
        return mc('Welcher Grundsatz der Permakultur steckt im Beispiel «Das Schaf liefert Milch, Fleisch und Wolle und mäht und düngt das Gras»?', ['Vernetzung fördern: Elemente erfüllen mehrere Aufgaben.', 'Von der Natur lernen.', 'Kreisläufe ermöglichen.', 'Vielfalt ermöglichen.'],
          'Weitere Grundsätze: Stoffe, Wasser und Energie möglichst aus der Nähe beziehen und effizient nutzen.');
      } },
      { id: 'l6-persp', topic: 'Perspektiven', make() {
        return mc('Ein Grundstück soll bebaut werden. Wie gehst du bei der Frage vor, was damit passieren soll?', ['Ich betrachte verschiedene Standpunkte (zum Beispiel Natur, Wohnen, Landwirtschaft) und wäge ab, was in welchem Mass nützt oder schadet.', 'Ich entscheide nach Lust.', 'Ich frage niemanden.', 'Nur der Preis zählt.'],
          'Je nach Standpunkt lautet die Antwort anders. Wichtig ist, Argumente zu nennen und zu begründen.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  l1: [
    { h: 'Ohne Menschen wäre die Schweiz ein Waldland',
      body: `<p>Wiesen gibt es nur dort, wo es sehr kalt oder sehr nass ist. Alle übrigen Wiesen hat der <b>Mensch</b> geschaffen. Wo sie nicht bewirtschaftet werden, wachsen sie wieder zu Wald zu.</p>` },
    { h: 'Zeigerpflanzen',
      body: `${merk('<b>Zeigerpflanzen</b> zeigen Eigenschaften ihres Standorts an: Licht, Feuchtigkeit, pH-Wert und Nährstoffe.')}
        <ul><li><b>Wiesenkerbel:</b> viele Nährstoffe.</li><li><b>Heidelbeere:</b> saurer Boden.</li></ul>` },
    { h: 'Welche Pflanze zeigt was?',
      body: '<p>Ordne zu, was die Pflanze oder der Hinweis über den Boden verrät.</p>', sim: 'zeiger' },
    { h: 'Wald und Waldrand',
      body: `<p>Ein <b>gestufter Waldrand</b> (Wiese, Waldsaum, niedere Bäume, Sträucher, hohe Bäume) ist ökologisch wertvoller als ein harter Übergang. Er bietet Tieren Verstecke und Nahrung und schützt den Wald vor Wind.</p>
        <p>Der <b>Wald</b> speichert Wasser im Boden (weniger Hochwasser), kühlt im Sommer, schützt vor Wind und Lawinen, filtert Schmutz aus der Luft und speichert Kohlenstoff.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Auf einer Wiese wächst viel Wiesenkerbel. Was zeigt das an?',
        options: ['Der Boden enthält viele Nährstoffe.', 'Der Boden ist sauer.', 'Der Boden ist trocken.', 'Der Boden ist versiegelt.'],
        explain: 'Der Wiesenkerbel braucht viele Nährstoffe. Er ist eine Zeigerpflanze für nährstoffreiche Böden.' } }
  ],
  l2: [
    { h: 'Bestandteile des Bodens',
      body: `<p>Ein Boden besteht aus vier Bestandteilen:</p>
        <ul><li>knapp die Hälfte <b>Gesteinsbruchstücke</b> (Steine, Sand),</li><li>etwa ein Viertel <b>Wasser</b>,</li><li>etwa ein Viertel <b>Luft</b>,</li><li>ein kleiner Rest <b>Humus</b> aus abgestorbenen Lebewesen und deren Ausscheidungen.</li></ul>` },
    { h: 'Der Boden im Überblick',
      body: '<p>Die Balken zeigen die ungefähren Anteile. Das ist ein Modell mit gerundeten Werten.</p>', sim: 'bodenbau' },
    { h: 'Funktionen und Entstehung',
      body: `<ul><li><b>Lebensmittelproduzent</b>, <b>Lebensraum</b>, <b>Lieferant von Baumaterial</b>, <b>Reinigung und Speicherung</b> von Wasser.</li>
        <li>Boden entsteht <b>unten</b> durch Verwitterung von Gestein über Jahrtausende und <b>oben</b> durch abgestorbene Pflanzen und Tiere (Humus).</li></ul>
        <p>Biologische Dünger (Mist, Gülle) fördern die Humusbildung. Chemische Dünger enthalten Nährstoffe, tragen aber nichts zur Humusbildung bei. Schwere Maschinen <b>verdichten</b> den Boden.</p>` },
    { h: 'Vorgerechnet: Luft im Boden', worked: {
      given: 'Etwa ein Viertel eines Bodens besteht aus Luft. Wie viele Liter Luft sind in 2000 L Boden?',
      steps: [['Ein Viertel', '2000 L : 4'], ['Rechnung', '2000 : 4 = 500'], ['Antwort', 'Etwa 500 Liter Luft.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum sind verdichtete Böden problematisch?',
        options: ['Sie speichern weniger Wasser, und Regen fliesst an der Oberfläche ab.', 'Sie haben mehr Humus.', 'Sie haben mehr Luft.', 'Sie sind fruchtbarer.'],
        explain: 'Die Hohlräume werden zusammengedrückt. Das trägt zu Hochwasser bei.' } }
  ],
  l3: [
    { h: 'Wasserspeicherfähigkeit',
      body: `<p>Je mehr <b>Hohlräume</b> ein Boden hat, desto mehr Wasser kann er speichern. Für Pflanzen sollte die Wasserspeicherfähigkeit zwischen <b>15 und 40 Prozent</b> liegen.</p>` },
    { h: 'Verdichte den Boden',
      body: '<p>Verändere die Verdichtung. Du siehst, wie sich die Wasserspeicherfähigkeit verändert. Das ist ein Modell mit Beispielwerten.</p>', sim: 'boden' },
    { h: 'pH-Wert und Humus',
      body: `<ul><li>Die meisten Bodenlebewesen und Pflanzen bevorzugen pH-Werte zwischen <b>5 und 7,5</b>. In sauren Böden werden Nährstoffe leichter ausgewaschen.</li>
        <li>Humusgehalt: unter 2 % <b>humusarm</b>, 2 bis 4 % mässig humushaltig, 4 bis 8 % <b>humusreich</b>, über 8 % sehr humusreich. Nährstoffhaltige Böden haben 4 % und mehr.</li></ul>` },
    { h: 'Vorgerechnet: Humusgehalt', worked: {
      given: 'In einer Bodenprobe von 100 g sind 6 g Humus. Wie hoch ist der Humusgehalt?',
      steps: [['Formel', 'Humus : Probe · 100 %'], ['Rechnung', '6 g : 100 g = 0,06 = 6 %'], ['Antwort', '6 %: Der Boden ist humusreich.']] } },
    { h: 'Vorgerechnet: Wasserspeicherung', worked: {
      given: '1000 mL Boden speichern 250 mL Wasser. Wie gross ist die Wasserspeicherfähigkeit?',
      steps: [['Rechnung', '250 mL : 1000 mL = 0,25'], ['Antwort', '25 %. Das liegt im Bereich von 15 bis 40 %.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welcher pH-Wert ist für die meisten Bodenlebewesen und Pflanzen gut?',
        options: ['Zwischen 5 und 7,5.', 'Unter 2.', 'Über 11.', 'Genau 0.'],
        explain: 'Der Bereich zwischen 5 und 7,5 ist schwach sauer bis neutral.' } }
  ],
  l4: [
    { h: 'Artenvielfalt in Siedlungen',
      body: `<p>Siedlungen sind oft artenreicher als intensiv bewirtschaftete Landwirtschaftsflächen. Gründe: <b>abwechslungsreiche</b> Lebensräume, <b>weniger Pestizide</b>, <b>keine Jagd</b>, Abfälle und Kompost als <b>Nahrung</b> und ein <b>wärmeres, trockeneres Klima</b>.</p>` },
    { h: 'Eine Stadt allein?',
      body: `<p>Ein Stadt-Ökosystem kann <b>nicht allein</b> überleben. Es braucht Zufuhr (Nahrung, Wasser, Energie) und Abfuhr (Abfälle, Abwasser). Die Stoff- und Energieflüsse reichen über die Stadt hinaus in andere Ökosysteme.</p>` },
    { h: 'Versiegelung des Bodens',
      body: '<p>Verändere den versiegelten Anteil. Das Modell zeigt grob, wie sich das Regenwasser verteilt (gerundete Beispielwerte).</p>', sim: 'versiegel' },
    { h: 'Folgen der Versiegelung',
      body: `<ul><li>Regenwasser versickert weniger, es entsteht weniger Grundwasser.</li><li>Starkregen führt öfter zu Überschwemmungen.</li><li>Bodenlebewesen sterben, die Artenvielfalt nimmt ab.</li><li>Es wird weniger Kohlenstoff gespeichert.</li></ul>
        <p>In der Schweiz ist knapp ein Zwanzigstel der Fläche versiegelt. Gründe sind das Bevölkerungswachstum und der wachsende Platzbedarf pro Person (Wohnen, Fortbewegen, Einkaufen).</p>` },
    { h: 'Vorgerechnet: Versiegelte Fläche', worked: {
      given: 'In einem Gebiet von 400 km² ist ein Zwanzigstel versiegelt. Wie gross ist die Fläche?',
      steps: [['Rechnung', '400 km² : 20 = 20 km²'], ['Antwort', '20 km².']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum braucht eine Stadt andere Ökosysteme?',
        options: ['Weil sie Nahrung, Wasser und Energie nicht selbst herstellt und Abfälle abgibt.', 'Weil sie keine Bewohner hat.', 'Weil es dort keinen Boden gibt.', 'Weil sie zu klein ist.'],
        explain: 'Die Stoff- und Energieflüsse einer Stadt sind nicht geschlossen.' } }
  ],
  l5: [
    { h: 'Was ist Biodiversität?',
      body: `<p>Die <b>Biodiversität</b> ist die Vielfalt des Lebens. Sie hat drei Ebenen:</p>
        <ul><li>Vielfalt der <b>Ökosysteme</b>,</li><li>Vielfalt der <b>Arten</b>,</li><li>Vielfalt der <b>Erbanlagen</b> innerhalb einer Art (Tierrassen, Pflanzensorten).</li></ul>
        <p>Pflanzen und Insekten bilden die Basis jedes Land-Ökosystems. Ihr Rückgang bedroht auch uns.</p>` },
    { h: 'Sechs Gründe für den Rückgang',
      body: `<ol><li><b>Zerstörung von Lebensräumen</b> (Siedlungen, intensive Landwirtschaft, Monokulturen).</li><li><b>Übernutzung</b> natürlicher Ressourcen.</li><li><b>Verschmutzung, Überdüngung, Versauerung</b>.</li><li><b>Verinselung</b> durch Strassen, Bahnen und Siedlungen.</li><li><b>Einführung fremder Arten</b>.</li><li><b>Klimastörung</b>: Arten verschieben sich nach Norden und in höhere Lagen.</li></ol>` },
    { h: 'Welche Gefahr ist es?',
      body: '<p>Ordne die Beispiele einem Grund zu.</p>', sim: 'gruende' },
    { h: 'Nachhaltig nutzen',
      body: `${merk('<b>Nachhaltig</b> heisst: so viel nutzen, wie natürlich wieder nachwachsen kann.')}
        <p>Wir Menschen bestimmen durch unser Verhalten mit, wie das Leben auf der Erde in Zukunft aussieht.</p>` },
    { h: 'Vorgerechnet: Bedrohte Arten', worked: {
      given: 'Ein Fünftel aller Pflanzenarten ist bedroht. Wie viele sind es bei 3000 Arten?',
      steps: [['Ein Fünftel', '3000 : 5'], ['Rechnung', '3000 : 5 = 600'], ['Antwort', '600 Pflanzenarten.']] } },
    { h: 'Kurz testen',
      check: { q: 'Eine Autobahn zerschneidet einen Wald. Welcher Grund für den Artenrückgang ist das?',
        options: ['Verinselung.', 'Fremde Arten.', 'Klimastörung.', 'Übernutzung der Fische.'],
        explain: 'Strassen und Bahnlinien zerschneiden Ökosysteme in kleine Inseln, die für viele Arten zu klein sind.' } }
  ],
  l6: [
    { h: 'Reuss-Mündung: Renaturierung',
      body: `<p>Die Reuss wurde früher in einen Kanal weit in den See verlegt. Dadurch verschwanden die flachen Ufer, und die Wellen trugen das Ufer ab. Man baute den Kanal zurück und schüttete mit dem <b>Aushub des NEAT-Tunnels</b> flache Ufer auf.</p>
        <p>Natur, Freizeit, Fischerei, Kiesabbau und Vogelschutz profitieren. Über 200 Vogelarten wurden gesichtet.</p>` },
    { h: 'Permakultur',
      body: `<p>Permakultur ahmt <b>Kreisläufe der Natur</b> nach und verzichtet möglichst auf Pestizide, Kunstdünger und schwere Maschinen. Vier Grundsätze:</p>` },
    { h: 'Welcher Grundsatz?',
      body: '<p>Ordne die Beispiele einem Grundsatz zu.</p>', sim: 'permakultur' },
    { h: 'Milpa: Die drei Schwestern',
      body: `<ul><li><b>Mais:</b> liefert energiereiche Nahrung und dient den Bohnen als Kletterhilfe.</li><li><b>Bohnen:</b> liefern Protein und wandeln Stickstoff aus der Luft zu Dünger um.</li><li><b>Kürbis:</b> liefert Vitamine, schützt den Boden vor dem Austrocknen und hemmt Unkraut.</li></ul>` },
    { h: 'Kurz testen',
      check: { q: 'Was macht ein Milpa-System aus?',
        options: ['Mais, Bohnen und Kürbis ergänzen sich gegenseitig.', 'Es wird nur eine Pflanze angebaut.', 'Es braucht viel Pestizid.', 'Es gibt keinen Boden.'],
        explain: 'Das alte System der Maya nutzt die Zusammenarbeit der Pflanzen.' } }
  ]
};
const GOALS = {
  l1: ['Zeigerpflanzen deuten', 'den Nutzen von Wald und Waldrand beschreiben'],
  l2: ['Bestandteile und Funktionen des Bodens nennen', 'Boden und Humus in Beziehung setzen'],
  l3: ['Wasserspeicherfähigkeit, pH-Wert und Humus bestimmen', 'Messdaten einschätzen'],
  l4: ['Artenvielfalt von Siedlungen begründen', 'Folgen der Versiegelung beschreiben'],
  l5: ['Biodiversität beschreiben', 'Gründe für ihren Rückgang erklären'],
  l6: ['Naturnutzung und Naturschutz verbinden', 'Permakultur-Grundsätze anwenden']
};
const LEARN = {
  'l1-ohne': 'Ohne Menschen wäre die Schweiz ein Waldland', 'l1-zeiger': 'Zeigerpflanzen', 'l1-kerbel': 'Welche Pflanze zeigt was?', 'l1-heidel': 'Welche Pflanze zeigt was?', 'l1-rand': 'Wald und Waldrand', 'l1-wald': 'Wald und Waldrand',
  'l2-teile': 'Bestandteile des Bodens', 'l2-luft': 'Vorgerechnet: Luft im Boden', 'l2-funk': 'Funktionen und Entstehung', 'l2-bildung': 'Funktionen und Entstehung', 'l2-humus': 'Funktionen und Entstehung', 'l2-verdicht': 'Funktionen und Entstehung',
  'l3-wasser': 'Vorgerechnet: Wasserspeicherung', 'l3-bereich': 'Wasserspeicherfähigkeit', 'l3-humus': 'Vorgerechnet: Humusgehalt', 'l3-klasse': 'pH-Wert und Humus', 'l3-ph': 'pH-Wert und Humus', 'l3-daten': 'pH-Wert und Humus',
  'l4-arten': 'Artenvielfalt in Siedlungen', 'l4-gruende': 'Artenvielfalt in Siedlungen', 'l4-allein': 'Eine Stadt allein?', 'l4-versiegel': 'Folgen der Versiegelung', 'l4-flaeche': 'Vorgerechnet: Versiegelte Fläche', 'l4-grund': 'Folgen der Versiegelung',
  'l5-div': 'Was ist Biodiversität?', 'l5-leben': 'Sechs Gründe für den Rückgang', 'l5-nachhalt': 'Nachhaltig nutzen', 'l5-insel': 'Welche Gefahr ist es?', 'l5-fremd': 'Sechs Gründe für den Rückgang', 'l5-fuenftel': 'Vorgerechnet: Bedrohte Arten',
  'l6-reuss': 'Reuss-Mündung: Renaturierung', 'l6-gewinner': 'Reuss-Mündung: Renaturierung', 'l6-perma': 'Permakultur', 'l6-milpa': 'Milpa: Die drei Schwestern', 'l6-vernetz': 'Welcher Grundsatz?', 'l6-persp': 'Welcher Grundsatz?'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Samenkorn', pw: 'keimt' },
  { xp: 80, name: 'Wiese', pw: 'blüht' },
  { xp: 200, name: 'Waldrand', pw: 'bietet Verstecke' },
  { xp: 380, name: 'Humusboden', pw: 'nährt alles' },
  { xp: 620, name: 'Mischwald', pw: 'ist artenreich' },
  { xp: 920, name: 'Naturhüter', pw: 'schützt klug' }
];

/* ---------- Thema: 9_7 Land-Ökosysteme erforschen ---------- */
const TOPIC = {
  id: 'nt9-7', storeKey: 'halingen-nt9-7-v1', other: { title: '8_2 Gewässer-Ökosysteme erforschen', href: '8_2_Gewaesser_Oekosysteme_erforschen.html' },
  title: 'Land-Ökosysteme erforschen', lead: 'Boden, Biodiversität und Naturschutz', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Zeigerpflanzen verraten den Standort.', 'Nachhaltig: so viel nutzen, wie nachwächst.'],
  formulas: [
    ['Boden', '≈ ½ Gestein, ¼ Wasser, ¼ Luft', 'Rest: Humus'],
    ['Wasserspeicher', 'ideal 15 bis 40 %', 'Wasser : Boden · 100 %'],
    ['pH-Wert', 'ideal 5 bis 7,5', 'Nadeln senken den pH'],
    ['Humus', '&lt; 2 % arm, 4 bis 8 % reich', 'Humus : Probe · 100 %'],
    ['Biodiversität', 'Ökosysteme, Arten, Erbanlagen', '6 Gründe für den Rückgang'],
    ['Permakultur', 'Natur nachahmen', 'Vielfalt, Vernetzung, Kreisläufe']
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
  zeiger(el) {
    sorter(el, [
      { t: 'Auf einer Wiese wächst viel Wiesenkerbel.', ok: ['na'], why: 'Der Wiesenkerbel zeigt viele Nährstoffe an.' },
      { t: 'Im Nadelwald wachsen viele Heidelbeeren.', ok: ['sa'], why: 'Heidelbeeren zeigen sauren Boden an. Nadeln senken den pH-Wert.' },
      { t: 'Ein Acker wird regelmässig mit Mist und Gülle gedüngt, und es wachsen viele Pflanzen, die Nährstoffe lieben.', ok: ['na'], why: 'Biologischer Dünger macht den Boden nährstoffreich.' },
      { t: 'Ein Boden mit pH-Wert 4,5 und viel Heidelbeere.', ok: ['sa'], why: 'Ein pH-Wert unter 5 ist sauer.' }
    ], { na: 'Nährstoffreicher Boden', sa: 'Saurer Boden' }, 'Was zeigt der Hinweis an?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  gruende(el) {
    sorter(el, [
      { t: 'Ein Regenwald wird zu Ackerland.', ok: ['le'], why: 'Das ist Zerstörung von Lebensräumen.' },
      { t: 'Es werden mehr Fische gefangen, als nachwachsen können.', ok: ['ue'], why: 'Das ist Übernutzung natürlicher Ressourcen.' },
      { t: 'Pestizide und Dünger gelangen in Boden und Wasser.', ok: ['ve'], why: 'Das ist Verschmutzung und Überdüngung.' },
      { t: 'Eine Autobahn trennt zwei Waldstücke.', ok: ['vi'], why: 'Das ist Verinselung.' },
      { t: 'Ausgesetzte Rotwangenschildkröten fressen heimische Tiere.', ok: ['fr'], why: 'Das ist die Einführung fremder Arten.' },
      { t: 'Arten weichen der Erwärmung nach Norden und in höhere Lagen aus.', ok: ['kl'], why: 'Das ist die Klimastörung.' }
    ], { le: 'Lebensräume zerstört', ue: 'Übernutzung', ve: 'Verschmutzung', vi: 'Verinselung', fr: 'Fremde Arten', kl: 'Klimastörung' }, 'Welcher Grund ist es?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  permakultur(el) {
    sorter(el, [
      { t: 'Bewährte Abläufe der Natur nachahmen.', ok: ['na'], why: 'Das heisst: von der Natur lernen.' },
      { t: 'Tiere, Pflanzen und Menschen zu sinnvollen Gemeinschaften kombinieren.', ok: ['vi'], why: 'Das heisst: Vielfalt ermöglichen.' },
      { t: 'Das Schaf liefert Milch und Wolle, mäht und düngt das Gras.', ok: ['ve'], why: 'Ein Element erfüllt mehrere Aufgaben: Vernetzung fördern.' },
      { t: 'Stoffe, Wasser und Energie aus der Nähe beziehen.', ok: ['kr'], why: 'Das heisst: Kreisläufe ermöglichen.' }
    ], { na: 'Von der Natur lernen', vi: 'Vielfalt ermöglichen', ve: 'Vernetzung fördern', kr: 'Kreisläufe ermöglichen' }, 'Welcher Grundsatz passt?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  bodenbau(el) {
    const T = [['Gesteinsbruchstücke', 45], ['Wasser', 25], ['Luft', 25], ['Humus', 5]];
    el.innerHTML = `<div class="sim">${T.map((t, i) => `<div class="brow"><span class="bname">${t[0]}</span><div class="btrack"><div class="bfill${i === 1 ? ' th' : ''}" style="width:${t[1] * 2}%"></div></div><b class="mono bval">≈ ${t[1]} %</b></div>`).join('')}
      <p class="readout">Die Werte sind gerundet: knapp die Hälfte Gestein, je etwa ein Viertel Wasser und Luft, der kleine Rest ist Humus.</p></div>`;
  },

  boden(el) {
    el.innerHTML = `<div class="sim">${sl('bv', 'Verdichtung durch Maschinen', 0, 100, 10, 0, '%')}
      <div class="brow"><span class="bname">Wasserspeicherfähigkeit</span><div class="btrack"><div class="bfill" id="bb"></div></div><b class="mono bval" id="bw"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const v = +$id('bv').value, w = 40 - 0.3 * v;
      $id('bvv').textContent = fmt(v);
      $id('bb').style.width = (w / 40 * 100) + '%'; $id('bw').textContent = fmt(r2(w), 1) + ' %';
      $id('ro').innerHTML = `Bei ${fmt(v)} % Verdichtung speichert der Boden etwa <b>${fmt(r2(w), 1)} %</b> Wasser. ` + (w < 15 ? 'Das ist unter dem Idealbereich von 15 bis 40 %. Regen fliesst an der Oberfläche ab, das trägt zu Hochwasser bei.' : 'Das liegt im Bereich für Pflanzen (15 bis 40 %).') + ' Modell mit Beispielwerten.';
    }
    $id('bv').addEventListener('input', upd); $id('bb').style.width = '100%'; nf(el, upd);
  },

  versiegel(el) {
    el.innerHTML = `<div class="sim">${sl('vv', 'Anteil versiegelt', 0, 100, 10, 0, '%')}
      <div class="brow"><span class="bname">Verdunstung</span><div class="btrack"><div class="bfill" id="va"></div></div><b class="mono bval" id="vaa"></b></div>
      <div class="brow"><span class="bname">Abfluss an der Oberfläche</span><div class="btrack"><div class="bfill th" id="vb"></div></div><b class="mono bval" id="vbb"></b></div>
      <div class="brow"><span class="bname">Versickerung</span><div class="btrack"><div class="bfill" id="vc"></div></div><b class="mono bval" id="vcc"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const s = +$id('vv').value / 100, ve = 40 - 10 * s, ab = 10 + 45 * s, vs = 100 - ve - ab;
      $id('vvv').textContent = fmt(Math.round(s * 100));
      $id('va').style.width = ve + '%'; $id('vb').style.width = ab + '%'; $id('vc').style.width = vs + '%';
      $id('vaa').textContent = fmt(Math.round(ve)) + ' %'; $id('vbb').textContent = fmt(Math.round(ab)) + ' %'; $id('vcc').textContent = fmt(Math.round(vs)) + ' %';
      $id('ro').innerHTML = `Je mehr Boden versiegelt ist, desto mehr Regenwasser fliesst an der Oberfläche ab (jetzt ${fmt(Math.round(ab))} %) und desto weniger versickert (${fmt(Math.round(vs))} %). Das ergibt weniger Grundwasser und mehr Hochwasser. Gerundete Beispielwerte, kein Messergebnis.`;
    }
    $id('vv').addEventListener('input', upd); $id('va').style.width = '40%'; $id('vb').style.width = '10%'; $id('vc').style.width = '50%'; nf(el, upd);
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-7","titel":"Land-Ökosysteme erforschen","kapitel":"NaTech 9, Kapitel 7","audio":"nt9-7"});
