// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_5_Genetik_und_Gentechnik_verstehen.html
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

/* ---------- Inhalt: 9_5 Genetik und Gentechnik verstehen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_5 (ein Lehrerkommentar liegt nicht vor). Ethische Fragen werden sachlich dargestellt, ohne eigene Wertung. */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'g1', nr: 1, title: 'Zelle, Chromosom und Gen', sub: 'Wo die Erbinformationen liegen',
    items: [
      { id: 'g1-erbinfo', topic: 'Erbinformationen in der Zelle', make() {
        return mc('Wo sind die Erbinformationen einer Zelle gespeichert?', ['Auf den Chromosomen im Zellkern.', 'In der Zellwand.', 'Nur in den Geschlechtszellen.', 'In der Zellflüssigkeit.'],
          'In jeder einzelnen Zelle eines Lebewesens sind die gesamten Erbinformationen auf den Chromosomen abgelegt.');
      } },
      { id: 'g1-46', topic: 'Chromosomen des Menschen', make() {
        return mc('Wie viele Chromosomen haben menschliche Körperzellen und woher stammen sie?', ['46 Chromosomen: 23 von der Mutter und 23 vom Vater, die sich zu 23 Paaren ordnen lassen.', '23 Chromosomen, alle von der Mutter.', '92 Chromosomen.', '46 Chromosomen, alle vom Vater.'],
          'Weil jede Information zweimal angelegt ist, kann ein Chromosom defekte Teile des anderen ausgleichen.');
      } },
      { id: 'g1-genetik', topic: 'Was ist Genetik?', make() {
        return mc('Womit befasst sich die Genetik?', ['Mit der Organisation und Weitergabe der Erbinformationen.', 'Mit dem Wetter.', 'Mit der Bewegung von Planeten.', 'Mit Metallen.'],
          'Aus einer einzigen befruchteten Eizelle entsteht ein ganzer Mensch, weil der Bauplan schon in den Erbinformationen dieser Zelle steckt.');
      } },
      { id: 'g1-gen', topic: 'Was ist ein Gen?', make() {
        return mc('Was ist ein Gen?', ['Ein kleiner Abschnitt auf der DNA, der den Bauplan für ein Protein trägt.', 'Ein ganzes Chromosom.', 'Eine Zelle.', 'Ein Merkmal wie die Haarfarbe.'],
          'Gene sind Träger der Erbinformationen. Die Merkmale entstehen erst, wenn die Proteine nach dem Bauplan hergestellt werden.');
      } },
      { id: 'g1-zwilling', topic: 'Eineiige Zwillinge', make() {
        return mc('Warum sehen eineiige Zwillinge fast gleich aus?', ['Weil sie aus derselben befruchteten Eizelle entstanden sind und die gleichen Erbinformationen haben.', 'Weil sie gleich alt sind.', 'Weil sie gleich viele Chromosomen haben, aber verschiedene Gene.', 'Weil sie sich ähnlich anziehen.'],
          'Das Aussehen hängt eng mit den Erbinformationen zusammen. Auch Umwelteinflüsse spielen eine Rolle.');
      } },
      { id: 'g1-chrom', topic: 'Chromosomenzahl', ext: true, make() {
        const p = rnd([7, 10, 12, 19, 23]), c = 2 * p;
        return num(`Die Zellen einer Art haben ${fmt(p)} Chromosomenpaare. Wie viele Chromosomen sind das insgesamt?`, 'Chromosomen', c, 'Jedes Paar besteht aus zwei Chromosomen.', `${fmt(p)} · 2 = ${fmt(c)} Chromosomen`);
      } }
    ]
  },
  {
    id: 'g2', nr: 2, title: 'Zellteilung', sub: 'Mitose und Differenzierung',
    items: [
      { id: 'g2-mitose', topic: 'Mitose', make() {
        return mc('Was geschieht bei der Mitose?', ['Die Zelle kopiert zuerst ihre Chromosomen und teilt sich dann. Beide neuen Zellen erhalten alle Erbinformationen.', 'Die Zelle teilt sich, ohne die Chromosomen zu kopieren.', 'Die Zelle verliert ihre Erbinformationen.', 'Die Zelle wird zu einer Geschlechtszelle.'],
          'So entsteht aus der befruchteten Eizelle ein vielzelliges Lebewesen, in dem jede Zelle die gesamte Erbinformation besitzt.');
      } },
      { id: 'g2-chromatid', topic: 'Chromatid und Chromosom', make() {
        return mc('Wie unterscheiden sich 1-Chromatid- und 2-Chromatiden-Chromosom?', ['Das 2-Chromatiden-Chromosom entsteht durch Verdopplung und besteht aus zwei identischen Chromatiden. Bei der Teilung werden sie getrennt.', 'Es gibt keinen Unterschied.', 'Ein Chromatid ist grösser als ein Chromosom.', 'Chromatiden gibt es nur bei Pflanzen.'],
          'Auf beiden entstandenen 1-Chromatid-Chromosomen sind dieselben Erbinformationen enthalten.');
      } },
      { id: 'g2-diff', topic: 'Differenzierung', make() {
        return mc('Was bedeutet es, dass sich Zellen differenzieren?', ['Sie spezialisieren sich auf bestimmte Aufgaben und können danach keine andere Funktion mehr übernehmen.', 'Sie teilen sich schneller.', 'Sie verlieren die Erbinformationen.', 'Sie werden zu Pflanzenzellen.'],
          'Eine weisse Blutzelle kann nicht plötzlich eine Lichtsinneszelle werden. Trotzdem enthalten auch differenzierte Zellen alle Erbinformationen.');
      } },
      { id: 'g2-alle', topic: 'Alle Erbinformationen in jeder Zelle', make() {
        return mc('Enthält eine Muskelzelle auch die Informationen für die Augenfarbe?', ['Ja. Jede Zelle enthält die gesamten Erbinformationen, nur ein Teil davon wird genutzt.', 'Nein, nur Augenzellen haben sie.', 'Nein, nur der Zellkern der Eizelle.', 'Nur bei Kindern.'],
          'Jeder Zellkern enthält die gesamten Erbinformationen. Das zeigen Versuche, bei denen aus einem einzelnen Zellkern ein ganzes Lebewesen entsteht.');
      } },
      { id: 'g2-teil', topic: 'Anzahl Zellen nach Teilungen', make() {
        const n = rnd([3, 4, 5, 6, 10]), z = Math.pow(2, n);
        return num(`Aus einer Zelle entstehen durch wiederholte Teilung jeweils zwei neue Zellen. Wie viele Zellen sind es nach ${fmt(n)} Teilungsrunden?`, 'Zellen', z, 'Bei jeder Runde verdoppelt sich die Zahl der Zellen.', `2<sup>${fmt(n)}</sup> = ${fmt(z)} Zellen`);
      } },
      { id: 'g2-streck', topic: 'Streckungswachstum', make() {
        return mc('Wie können Pflanzen wachsen?', ['Durch Zellteilung und durch Streckungswachstum, bei dem Vakuolen gedehnt und Zellwände gestreckt werden.', 'Nur durch Zellteilung.', 'Nur durch Fotosynthese.', 'Pflanzen wachsen nicht.'],
          'Beim Streckungswachstum wird die Zelle grösser, ohne dass sie ihre Stabilität verliert.');
      } }
    ]
  },
  {
    id: 'g3', nr: 3, title: 'Die DNA', sub: 'Bausteine, Doppelhelix und Verdopplung',
    items: [
      { id: 'g3-bau', topic: 'DNA-Bausteine', make() {
        return mc('Woraus besteht ein DNA-Baustein?', ['Aus einem Phosphorsäure-Rest, einem Zucker-Molekül und einer von vier Basen.', 'Aus Eiweiss, Wasser und Fett.', 'Aus Proteinen und Salzen.', 'Aus Chromosomen.'],
          'Die vier Basen heissen Adenin (A), Cytosin (C), Guanin (G) und Thymin (T). Die DNA ist ein langkettiges Molekül aus Millionen solcher Bausteine.');
      } },
      { id: 'g3-paar', topic: 'Basenpaarung', make() {
        return mc('Welche Basen bilden Paare?', ['A mit T und G mit C.', 'A mit C und G mit T.', 'A mit G und C mit T.', 'Alle Basen mit allen.'],
          'Nur diese Paarungen ergeben eine stabile «Strickleiter»: Die Basenpaare sind die Sprossen, Phosphorsäure-Reste und Zucker die Stricke.');
      } },
      { id: 'g3-prozent', topic: 'Anteile der Basen', make() {
        const a = rnd([20, 30, 25, 22, 18]), g = (100 - 2 * a) / 2;
        return num(`In einer DNA-Analyse sind ${fmt(a)} % der Basen Adenin (A). Wie viel Prozent sind Guanin (G)? Es gibt gleich viele A und T sowie gleich viele G und C.`, '%', g, 'A und T zusammen machen 2 · A aus. Der Rest verteilt sich je zur Hälfte auf G und C.', `T = ${fmt(a)} %<br>A + T = ${fmt(2 * a)} %<br>G + C = ${fmt(100 - 2 * a)} %<br>G = ${fmt(g)} %`);
      } },
      { id: 'g3-gegen', topic: 'Gegenstrang bilden', make() {
        return mc('Ein Strang der DNA lautet ATGGCCCTGT. Wie lautet der gegenüberliegende Strang?', ['TACCGGGACA', 'TACGGCCAGA', 'ATGGCCCTGT', 'UACCGGGACA'],
          'A paart sich mit T, T mit A, G mit C und C mit G. Auf Thymin (T) folgt im Gegenstrang also A.');
      } },
      { id: 'g3-helix', topic: 'Doppelhelix', make() {
        return mc('Warum spricht man von einer Doppelhelix?', ['Die beiden DNA-Stränge (Doppel) sind spiralförmig verdreht (Helix).', 'Weil es zwei Chromosomen gibt.', 'Weil die DNA doppelt so lang wie eine Zelle ist.', 'Weil sie aus zwei Zellen besteht.'],
          'Die DNA einer Zelle wäre zu einer Kette gezogen etwa 2 Meter lang, aber so fein, dass man sie im Mikroskop nicht sehen könnte.');
      } },
      { id: 'g3-kopie', topic: 'DNA-Verdopplung', make() {
        return mc('Wie wird die DNA vor einer Zellteilung verdoppelt?', ['Ein Enzym trennt die Basenpaare. An jeden Einzelstrang lagern sich neue Bausteine nach den Paarungsregeln an.', 'Die DNA wird zerschnitten und in Wasser aufgelöst.', 'Die DNA wird einfach verdoppelt, ohne sie zu trennen.', 'Die DNA wird in Proteine verwandelt.'],
          'So entstehen aus einem Doppelstrang zwei identische Doppelstränge. Die Erbinformationen sind bereit zur Weitergabe.');
      } }
    ]
  },
  {
    id: 'g4', nr: 4, title: 'Veränderung der Erbinformation', sub: 'Mutation und Fortpflanzung',
    items: [
      { id: 'g4-mut', topic: 'Mutation', make() {
        return mc('Was ist eine Mutation?', ['Eine Veränderung der Erbinformation.', 'Eine Zellteilung.', 'Ein neues Protein.', 'Eine Art von Zelle.'],
          'Mutationen können Stücke der DNA, die Abfolge der Basen oder die Chromosomen betreffen.');
      } },
      { id: 'g4-ursache', topic: 'Ursachen von Mutationen', make() {
        return mc('Was kann Mutationen auslösen?', ['Stoffe aus Abgasen, UV- und Röntgenstrahlen, bestimmte Viren sowie Fehler beim Kopieren der DNA oder bei der Zellteilung.', 'Nur das Alter der Eltern.', 'Nur Nahrung.', 'Nur Kälte.'],
          'Chemische, physikalische und biologische Ursachen sowie Fehler beim Verdoppeln der DNA gehören dazu.');
      } },
      { id: 'g4-folge', topic: 'Folgen von Mutationen', make() {
        return mc('Welche Folgen haben Mutationen?', ['Die meisten bleiben ohne Auswirkung. Manche sind negativ (zum Beispiel Auslöser von Krebs), manche positiv, weil sie Varianten mit Vorteilen ergeben.', 'Alle Mutationen sind schädlich.', 'Alle Mutationen sind nützlich.', 'Mutationen haben nie Folgen.'],
          'Eine neue Variante, die sich unter den vorhandenen Umweltbedingungen besser fortpflanzt, ist ein Vorteil. Das ist ein Grundmechanismus der Evolution.');
      } },
      { id: 'g4-keim', topic: 'Vererbung von Mutationen', make() {
        return mc('In welchen Zellen muss eine Mutation vorkommen, damit deine Kinder sie von dir erben könnten?', ['In den Geschlechtszellen (Eizellen oder Spermienzellen).', 'In jeder Hautzelle.', 'Nur in Muskelzellen.', 'In keiner Zelle.'],
          'Eine Mutation in einer Hautzelle wird nur an die Tochterzellen dieser Zelle weitergegeben, nicht an Kinder.');
      } },
      { id: 'g4-halb', topic: 'Chromosomen in Geschlechtszellen', make() {
        const c = rnd([46, 14, 38, 20, 78]), n = c / 2;
        return num(`Die Körperzellen einer Art haben ${fmt(c)} Chromosomen. Wie viele Chromosomen hat eine Eizelle dieser Art?`, 'Chromosomen', n, 'Jede Geschlechtszelle enthält nur ein Chromosom von jedem Paar.', `${fmt(c)} : 2 = ${fmt(n)} Chromosomen`);
      } },
      { id: 'g4-zuecht', topic: 'Züchtung', make() {
        return mc('Wie entstehen grosse Garten-Erdbeeren aus kleinen Wald-Erdbeeren?', ['Durch Züchtung: Aus mutierten Varianten werden gezielt die Pflanzen mit den gewünschten Eigenschaften ausgewählt.', 'Durch mehr Wasser.', 'Durch Zellteilung allein.', 'Durch Gentechnik im Labor.'],
          'Züchtung nutzt Mutationen und die Auswahl der passenden Varianten über viele Generationen.');
      } }
    ]
  },
  {
    id: 'g5', nr: 5, title: 'Vom Gen zum Merkmal', sub: 'Proteine und genetischer Code',
    items: [
      { id: 'g5-protein', topic: 'Vom Gen zum Protein', make() {
        return mc('Wie wird aus einem Gen ein Protein?', ['Zuerst wird eine Kopie des Gens erstellt, die den Zellkern verlässt. Dann wird sie in der Zellflüssigkeit in eine Aminosäurekette übersetzt, die sich zum Protein faltet.', 'Das Gen wird direkt gegessen.', 'Das Protein entsteht im Zellkern ohne Anleitung.', 'Die ganze DNA verlässt den Zellkern.'],
          'Die DNA bleibt geschützt im Zellkern. Die Proteine werden in der Zellflüssigkeit aufgebaut.');
      } },
      { id: 'g5-merkmal', topic: 'Merkmalsausprägung', make() {
        return mc('Wie hängen Gen, Protein und Merkmal zusammen?', ['Gene enthalten den Bauplan für Proteine. Die Proteine beeinflussen, wie ein Merkmal (zum Beispiel Blütenfarbe) ausgeprägt wird.', 'Gene sind selbst die Merkmale.', 'Proteine tragen die Erbinformationen weiter.', 'Merkmale entstehen ohne Gene.'],
          'Die meisten Merkmale werden von mehreren Genen beeinflusst. Die Blutgruppe wird dagegen von einem einzigen Gen bestimmt.');
      } },
      { id: 'g5-triplett', topic: 'Triplettcode', make() {
        return mc('Wie codiert die DNA für eine Aminosäure?', ['Immer drei Basen (ein Triplett) codieren für eine Aminosäure.', 'Eine einzelne Base codiert für eine Aminosäure.', 'Zwei Basen codieren für ein Protein.', 'Die DNA codiert nicht.'],
          'GGT codiert zum Beispiel für die Aminosäure Glycin. Dieser Drei-Basen-Code ist in allen Lebewesen gleich: der universelle genetische Code.');
      } },
      { id: 'g5-moeglich', topic: 'Anzahl möglicher Codes', make() {
        const k = rnd([1, 2, 3]), m = Math.pow(4, k);
        return num(`Der Code verwendet 4 verschiedene Basen. Wie viele verschiedene Codewörter gibt es, wenn jedes Codewort aus ${fmt(k)} Base${k > 1 ? 'n' : ''} besteht?`, 'Möglichkeiten', m, 'Für jede Stelle gibt es 4 Möglichkeiten. Multipliziere sie.', `4<sup>${fmt(k)}</sup> = ${fmt(m)}`);
      } },
      { id: 'g5-aminos', topic: 'Aminosäuren zählen', ext: true, make() {
        const n = rnd([30, 99, 300, 60, 150]), a = n / 3;
        return num(`Ein Gen-Abschnitt hat ${fmt(n)} Basen, die für eine Aminosäurekette codieren. Wie viele Aminosäuren sind es?`, 'Aminosäuren', a, 'Immer drei Basen codieren für eine Aminosäure.', `${fmt(n)} : 3 = ${fmt(a)}`);
      } },
      { id: 'g5-universell', topic: 'Universeller Code', make() {
        return mc('Was bedeutet «Der genetische Code ist universell»?', ['Die Basen-Tripletts bedeuten in allen Lebewesen dieselbe Aminosäure.', 'Alle Lebewesen haben dieselbe DNA.', 'Alle Gene sind gleich.', 'Der Code verändert sich jeden Tag.'],
          'Deshalb kann ein Gen eines Bakteriums in einer Pflanze abgelesen werden. Das ist die Grundlage der Gentechnik.');
      } }
    ]
  },
  {
    id: 'g6', nr: 6, title: 'Gentechnik und Ethik', sub: 'Möglichkeiten, Chancen und Fragen',
    items: [
      { id: 'g6-gvo', topic: 'GVO', make() {
        return mc('Was ist ein GVO?', ['Ein gentechnisch veränderter Organismus, dessen Erbinformationen gezielt verändert wurden.', 'Ein gesund vermehrter Organismus.', 'Ein Gen von Organismen.', 'Ein gelöschter Viren-Organismus.'],
          'Beispiele sind schädlingsresistenter Mais oder Soja sowie Bakterien, die Insulin herstellen.');
      } },
      { id: 'g6-insulin', topic: 'Insulin aus Bakterien', make() {
        return mc('Wie werden Bakterien dazu gebracht, menschliches Insulin herzustellen?', ['Das Insulin-Gen wird aus menschlicher DNA geschnitten und in ein Plasmid eingebaut, das in Bakterien eingeführt wird. Die Bakterien vermehren sich und lesen das Gen ab.', 'Menschen essen die Bakterien.', 'Die Bakterien werden bestrahlt.', 'Insulin kann nie hergestellt werden.'],
          'Plasmide sind kleine DNA-Ringe von Bakterien. Man nennt sie auch «Gen-Taxis». Seit 1982 ist gentechnisch hergestelltes Insulin als Medikament zugelassen.');
      } },
      { id: 'g6-crispr', topic: 'CRISPR/Cas9', make() {
        return mc('Was ist CRISPR/Cas9?', ['Eine «Genschere»: Mit ihr lässt sich die DNA sehr einfach und präzise an der gewünschten Stelle schneiden (Genom-Editing).', 'Ein Medikament.', 'Ein Mikroskop.', 'Ein Pflanzenschutzmittel.'],
          'Jennifer Doudna und Emmanuelle Charpentier erhielten 2020 dafür den Nobelpreis für Chemie. Es gibt aber auch Bedenken, weil das Risiko des Missbrauchs steigt.');
      } },
      { id: 'g6-werte', topic: 'Wertvorstellungen', make() {
        return mc('An welchen drei Wertvorstellungen kann man sich bei ethischen Fragen der Gentechnik orientieren?', ['Menschenwürde, Verantwortung und Glück.', 'Geld, Zeit und Macht.', 'Schnelligkeit, Grösse und Preis.', 'Alter, Herkunft und Beruf.'],
          'Bei ethischen Fragen gibt es oft kein einfaches Richtig oder Falsch. Man wägt ab, ob ein Vorhaben gerecht und verantwortungsvoll ist.');
      } },
      { id: 'g6-recht', topic: 'Gesetze', make() {
        return mc('Warum müssen Gesetze zur Gentechnik immer wieder diskutiert werden?', ['Weil die Forschung rasch fortschreitet und neue Fragen entstehen, für die es noch kein Gesetz gibt.', 'Weil Gesetze nie gelten.', 'Weil es keine Gentechnik gibt.', 'Weil Gesetze für Tiere gelten.'],
          'In Gesetzen werden Bedingungen und Grenzen der Gentechnik und der Gen-Diagnostik festgelegt. Sie werden laufend angepasst.');
      } },
      { id: 'g6-chance', topic: 'Chancen und Risiken', make() {
        return mc('Welche Aussage über Chancen und Risiken der Gentechnik ist fachlich richtig?', ['Gentechnik bietet Chancen (zum Beispiel Medikamente, Therapien), bringt aber auch Risiken und Fragen mit sich, die man gegeneinander abwägen muss.', 'Gentechnik hat nur Vorteile.', 'Gentechnik hat nur Nachteile.', 'Gentechnik ist immer verboten.'],
          'Die Gentechnik wird in Medizin, Landwirtschaft und Industrie eingesetzt. Eine einzige Antwort für alle Fälle gibt es nicht.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  g1: [
    { h: 'Genetik im Alltag',
      body: `<p>Jedes Leben beginnt mit <b>einer Zelle</b>. Der ganze Bauplan steckt schon in den <b>Erbinformationen</b> dieser ersten Zelle. <b>Genetik</b> ist die Wissenschaft von der Organisation und Weitergabe der Erbinformationen.</p>` },
    { h: 'Zellkern, Chromosom, Gen, DNA',
      body: `<ul><li>Im <b>Zellkern</b> liegen die <b>Chromosomen</b>, lange dünne Fäden.</li><li>Der Mensch hat <b>46 Chromosomen</b>, geordnet in 23 Paaren (23 von der Mutter, 23 vom Vater).</li><li>Chromosomen bestehen hauptsächlich aus <b>DNA</b>.</li><li>Ein <b>Gen</b> ist ein kleiner Abschnitt der DNA mit dem Bauplan für ein Protein.</li></ul>` },
    { h: 'Welcher Begriff?',
      body: '<p>Ordne die Beschreibungen den Begriffen zu.</p>', sim: 'begriffe' },
    { h: 'Vorgerechnet: Chromosomen', worked: {
      given: 'Eine Pflanzenart hat 7 Chromosomenpaare. Wie viele Chromosomen hat eine Körperzelle?',
      steps: [['Paare', 'Jedes Paar besteht aus 2 Chromosomen.'], ['Rechnung', '7 · 2 = 14'], ['Antwort', '14 Chromosomen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie viele Chromosomen hat eine menschliche Körperzelle?',
        options: ['46 (23 Paare).', '23 (nur von der Mutter).', '92.', '10.'],
        explain: 'Von der Mutter stammen 23, vom Vater 23 Chromosomen. Zusammen ergeben sie 23 Paare.' } }
  ],
  g2: [
    { h: 'Die Mitose',
      body: `<p>Bevor sich eine Zelle teilt, <b>kopiert</b> sie ihre Chromosomen. Dann erst teilt sie sich. Beide neuen Zellen enthalten alle Erbinformationen. Das heisst <b>Mitose</b>.</p>
        <p>Beim Verdoppeln entsteht aus einem 1-Chromatid-Chromosom ein <b>2-Chromatiden-Chromosom</b>. Bei der Teilung werden die beiden Chromatiden getrennt.</p>` },
    { h: 'Schritt für Schritt',
      body: '<p>Verfolge die Teilung einer Zelle in vier vereinfachten Schritten.</p>', sim: 'mitose' },
    { h: 'Wie viele Zellen entstehen?',
      body: '<p>Stelle die Anzahl der Teilungsrunden ein. Nach jeder Runde verdoppelt sich die Zahl der Zellen. Das ist ein Modell.</p>', sim: 'teilung' },
    { h: 'Zellen spezialisieren sich',
      body: `<p>Aus der befruchteten Eizelle entstehen durch Teilung viele Zellen. Sie <b>differenzieren</b> sich und übernehmen verschiedene Aufgaben (Blutzelle, Lichtsinneszelle). Trotzdem enthält <b>jede Zelle alle Erbinformationen</b>.</p>
        <p>Pflanzen wachsen auch durch <b>Streckungswachstum</b>: Die Vakuolen werden gedehnt.</p>` },
    { h: 'Vorgerechnet: Zellzahl', worked: {
      given: 'Aus einer Zelle entstehen durch 4 Teilungsrunden Zellen. Wie viele sind es?',
      steps: [['Verdopplung', 'Nach jeder Runde doppelt so viele Zellen.'], ['Rechnung', '2 · 2 · 2 · 2 = 16'], ['Antwort', '16 Zellen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum kopiert die Zelle ihre Chromosomen vor der Teilung?',
        options: ['Damit beide neuen Zellen die gesamten Erbinformationen erhalten.', 'Damit die Zelle grösser wird.', 'Damit sie sich differenziert.', 'Damit sie Energie spart.'],
        explain: 'Ohne die Kopie hätte nur eine der beiden Tochterzellen die ganze Erbinformation.' } }
  ],
  g3: [
    { h: 'Die Bausteine der DNA',
      body: `<p>Die DNA ist ein langkettiges Molekül aus Millionen <b>Bausteinen</b>. Jeder besteht aus einem <b>Phosphorsäure-Rest</b>, einem <b>Zucker-Molekül</b> und einer von vier <b>Basen</b>: Adenin (A), Cytosin (C), Guanin (G) und Thymin (T).</p>` },
    { h: 'Strickleiter und Doppelhelix',
      body: `<p>Zwei Stränge liegen sich gegenüber, wie eine <b>Strickleiter</b>. Aussen liegen Phosphorsäure-Reste und Zucker, innen die Basen.</p>
        ${merk('<b>A paart sich mit T</b> und <b>G paart sich mit C</b>. Die Stränge sind spiralig verdreht: <b>Doppelhelix</b>.')}` },
    { h: 'Ergänze den Gegenstrang',
      body: '<p>Baue den passenden Gegenstrang Base für Base.</p>', sim: 'dnapaar' },
    { h: 'Die Verdopplung',
      body: `<p>Zur Verdopplung trennt ein <b>Enzym</b> die Basenpaare. An jeden Einzelstrang lagern sich neue Bausteine an. So entstehen aus <b>einem</b> Doppelstrang <b>zwei</b> gleiche Doppelstränge.</p>` },
    { h: 'Vorgerechnet: Basenanteile', worked: {
      given: 'In einer DNA sind 20 % der Basen Adenin. Wie viel Prozent sind G, C und T?',
      steps: [['T', 'A und T sind gleich häufig: 20 %.'], ['G + C', '100 % − 20 % − 20 % = 60 %'], ['G und C', '60 % : 2 = 30 % je']] } },
    { h: 'Kurz testen',
      check: { q: 'Der DNA-Strang lautet ATG. Wie lautet der Gegenstrang?',
        options: ['TAC', 'ATG', 'CGA', 'UAC'],
        explain: 'A paart sich mit T, T mit A und G mit C. Das ergibt TAC.' } }
  ],
  g4: [
    { h: 'Mutationen',
      body: `<p>Veränderungen der Erbinformation heissen <b>Mutationen</b>. Mögliche Ursachen sind chemische Stoffe (zum Beispiel aus Abgasen), UV- und Röntgenstrahlen, bestimmte Viren und Fehler beim Kopieren der DNA oder bei der Zellteilung.</p>` },
    { h: 'Woher kommt die Mutation?',
      body: '<p>Ordne die Ursachen zu.</p>', sim: 'mutation' },
    { h: 'Folgen und Züchtung',
      body: `<p>Die meisten Mutationen haben <b>keine Auswirkung</b>. Manche sind schädlich (zum Beispiel können sie Krebs auslösen), andere nützlich. Neue Varianten können sich besser fortpflanzen. Bei der <b>Züchtung</b> werden gezielt Varianten mit gewünschten Eigenschaften ausgewählt.</p>` },
    { h: 'Mischung bei der Fortpflanzung',
      body: `<p>Geschlechtszellen enthalten nur <b>23 einzelne Chromosomen</b> (ein Chromosom pro Paar). Bei der Befruchtung entsteht wieder eine Zelle mit 46 Chromosomen. Vererbt werden nur Mutationen, die in den <b>Geschlechtszellen</b> auftreten.</p>` },
    { h: 'Vorgerechnet: Geschlechtszellen', worked: {
      given: 'Körperzellen einer Art haben 14 Chromosomen. Wie viele Chromosomen hat eine Eizelle?',
      steps: [['Regel', 'Eine Geschlechtszelle hat die Hälfte.'], ['Rechnung', '14 : 2 = 7'], ['Antwort', '7 Chromosomen.']] } },
    { h: 'Kurz testen',
      check: { q: 'In welchen Zellen muss eine Mutation sein, damit sie an Kinder vererbt werden kann?',
        options: ['In Eizellen oder Spermienzellen.', 'In Hautzellen.', 'In Knochenzellen.', 'In Blutzellen.'],
        explain: 'Nur über die Geschlechtszellen gelangt Erbinformation in die nächste Generation.' } }
  ],
  g5: [
    { h: 'Vom Gen zum Protein',
      body: `<p>Die DNA ist eine Bauanleitung für <b>Proteine</b>. Der Weg:</p>
        <ol><li>Start: Spezielle Proteine geben das Startsignal.</li><li>Kopieren: Eine Kopie des Gens entsteht.</li><li>Verschieben: Die Kopie verlässt den Zellkern.</li><li>Übersetzen: In der Zellflüssigkeit entsteht eine Aminosäurekette.</li><li>Falten: Die Kette wird zum funktionierenden Protein.</li></ol>` },
    { h: 'Proteine und Merkmale',
      body: `<p>Proteine beeinflussen, wie ein <b>Merkmal</b> ausgeprägt wird, zum Beispiel die Blütenfarbe: Ein Enzym wandelt einen Stoff in roten Farbstoff um. Fehlt das Protein, bleibt die Blüte weiss.</p>
        <p>Die meisten Merkmale werden von <b>mehreren Genen</b> beeinflusst. Die Blutgruppe von einem einzigen.</p>` },
    { h: 'Der genetische Code',
      body: `<p>Es gibt 4 Basen, aber 20 Aminosäuren. Darum codieren immer <b>drei Basen</b> (ein <b>Triplett</b>) für eine Aminosäure. Der Code gilt in allen Lebewesen: <b>universeller genetischer Code</b>.</p>` },
    { h: 'Reicht der Code?',
      body: '<p>Stelle die Länge der Codewörter ein. Vergleiche die Anzahl Möglichkeiten mit den 20 Aminosäuren. Das ist ein Modell.</p>', sim: 'codon' },
    { h: 'Vorgerechnet: Anzahl Tripletts', worked: {
      given: 'Wie viele verschiedene Tripletts gibt es bei 4 Basen?',
      steps: [['Stellen', '3 Stellen, je 4 Möglichkeiten'], ['Rechnung', '4 · 4 · 4 = 64'], ['Antwort', '64 Möglichkeiten. Das reicht für die 20 Aminosäuren. Wichtige Aminosäuren haben mehrere Codes.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie viele Basen codieren für eine Aminosäure?',
        options: ['Drei.', 'Eine.', 'Zwei.', 'Vier.'],
        explain: 'Ein Basen-Triplett codiert für eine Aminosäure.' } }
  ],
  g6: [
    { h: 'Was ist Gentechnik?',
      body: `<p>Gentechnik umfasst alle Methoden, die Erbinformationen gezielt verändern. Die Ergebnisse heissen <b>GVO</b> (gentechnisch veränderte Organismen). Das geht, weil der genetische Code <b>universell</b> ist.</p>
        <p>Beispiel Medizin: Bakterien stellen mit einem eingebauten Insulin-Gen <b>menschliches Insulin</b> her. Ein <b>Plasmid</b> dient als «Gen-Taxi».</p>` },
    { h: 'Die Genschere CRISPR/Cas9',
      body: `<p><b>CRISPR/Cas9</b> schneidet DNA einfach und präzise (Genom-Editing). Die Entdeckerinnen erhielten 2020 den Nobelpreis für Chemie. Gleichzeitig steigt das Risiko des Missbrauchs.</p>` },
    { h: 'Ethische Fragen',
      body: `<p>Bei ethischen Fragen geht es darum, abzuwägen, ob ein Vorhaben gerecht und verantwortungsvoll ist. Das Buch nennt drei Wertvorstellungen:</p>
        <ul><li><b>Menschenwürde:</b> Selbstbestimmung achten, niemanden für ein Vorhaben instrumentalisieren.</li><li><b>Verantwortung:</b> künftige Risiken bedenken.</li><li><b>Glück:</b> das Glück aller Betroffenen zusammen soll möglichst gross sein.</li></ul>
        <p>Viele Fälle haben keine eindeutige Antwort. Hier lernst du, Fragen zu stellen und zu begründen.</p>` },
    { h: 'Welche Wertvorstellung?',
      body: '<p>Ordne die Aussagen einer Wertvorstellung zu. Ob ein Vorhaben erlaubt sein soll, entscheidet die Gesellschaft mit Gesetzen.</p>', sim: 'ethik' },
    { h: 'Kurz testen',
      check: { q: 'Warum stehen Gesetze zur Gentechnik immer wieder zur Diskussion?',
        options: ['Weil die Forschung schnell weitergeht und neue Fragen entstehen.', 'Weil sie nie angewendet werden.', 'Weil es keine Gentechnik gibt.', 'Weil sie nur für Pflanzen gelten.'],
        explain: 'Gesetze müssen laufend an neue Möglichkeiten angepasst werden.' } }
  ]
};
const GOALS = {
  g1: ['Zellkern, Chromosom, Gen und DNA unterscheiden', 'die Chromosomenzahl des Menschen angeben'],
  g2: ['die Mitose beschreiben', 'Differenzierung erklären'],
  g3: ['den Aufbau der DNA beschreiben', 'die Basenpaarung anwenden'],
  g4: ['Ursachen und Folgen von Mutationen beschreiben', 'Vererbung über Geschlechtszellen erklären'],
  g5: ['vom Gen zum Protein erklären', 'den genetischen Code beschreiben'],
  g6: ['Methoden der Gentechnik nennen', 'ethische Fragen mit Wertvorstellungen ordnen']
};
const LEARN = {
  'g1-erbinfo': 'Zellkern, Chromosom, Gen, DNA', 'g1-46': 'Zellkern, Chromosom, Gen, DNA', 'g1-genetik': 'Genetik im Alltag', 'g1-gen': 'Welcher Begriff?', 'g1-zwilling': 'Genetik im Alltag', 'g1-chrom': 'Vorgerechnet: Chromosomen',
  'g2-mitose': 'Die Mitose', 'g2-chromatid': 'Die Mitose', 'g2-diff': 'Zellen spezialisieren sich', 'g2-alle': 'Zellen spezialisieren sich', 'g2-teil': 'Vorgerechnet: Zellzahl', 'g2-streck': 'Zellen spezialisieren sich',
  'g3-bau': 'Die Bausteine der DNA', 'g3-paar': 'Strickleiter und Doppelhelix', 'g3-prozent': 'Vorgerechnet: Basenanteile', 'g3-gegen': 'Ergänze den Gegenstrang', 'g3-helix': 'Strickleiter und Doppelhelix', 'g3-kopie': 'Die Verdopplung',
  'g4-mut': 'Mutationen', 'g4-ursache': 'Woher kommt die Mutation?', 'g4-folge': 'Folgen und Züchtung', 'g4-keim': 'Mischung bei der Fortpflanzung', 'g4-halb': 'Vorgerechnet: Geschlechtszellen', 'g4-zuecht': 'Folgen und Züchtung',
  'g5-protein': 'Vom Gen zum Protein', 'g5-merkmal': 'Proteine und Merkmale', 'g5-triplett': 'Der genetische Code', 'g5-moeglich': 'Reicht der Code?', 'g5-aminos': 'Der genetische Code', 'g5-universell': 'Der genetische Code',
  'g6-gvo': 'Was ist Gentechnik?', 'g6-insulin': 'Was ist Gentechnik?', 'g6-crispr': 'Die Genschere CRISPR/Cas9', 'g6-werte': 'Ethische Fragen', 'g6-recht': 'Welche Wertvorstellung?', 'g6-chance': 'Ethische Fragen'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Zelle', pw: 'fängt an' },
  { xp: 80, name: 'Zellkern', pw: 'bewahrt die Pläne' },
  { xp: 200, name: 'Chromosom', pw: 'trägt Gene' },
  { xp: 380, name: 'Gen', pw: 'baut Proteine' },
  { xp: 620, name: 'Genetik-Profi', pw: 'liest den Code' },
  { xp: 920, name: 'Doppelhelix', pw: 'kennt den Bauplan' }
];

/* ---------- Thema: 9_5 Genetik und Gentechnik verstehen ---------- */
const TOPIC = {
  id: 'nt9-5', storeKey: 'halingen-nt9-5-v1', other: { title: '8_3 Funktionen des Körpers analysieren', href: '8_3_Funktionen_des_Koerpers_analysieren.html' },
  title: 'Genetik und Gentechnik verstehen', lead: 'Zelle, DNA, Gene und ethische Fragen', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['A paart sich mit T, G paart sich mit C.', 'Drei Basen codieren für eine Aminosäure.'],
  formulas: [
    ['Chromosomen', 'Mensch: 46 = 23 Paare', 'Geschlechtszelle: 23'],
    ['Mitose', 'Chromosomen kopieren', 'dann Zelle teilen'],
    ['DNA', 'Basen A, T, G, C', 'A–T und G–C'],
    ['Gen', 'Bauplan für ein Protein', 'Protein → Merkmal'],
    ['Code', '3 Basen = 1 Aminosäure', '4³ = 64 Möglichkeiten'],
    ['Werte', 'Menschenwürde, Verantwortung', 'Glück']
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
  begriffe(el) {
    sorter(el, [
      { t: 'Ein Abschnitt der DNA mit dem Bauplan für ein Protein', ok: ['ge'], why: 'Das ist ein Gen.' },
      { t: 'Ein langkettiges Molekül aus den Basen A, T, G und C', ok: ['dn'], why: 'Das ist die DNA.' },
      { t: 'Ein Faden im Zellkern, beim Menschen 46 Stück', ok: ['ch'], why: 'Das sind die Chromosomen.' },
      { t: 'Ein Stoff, der nach dem Bauplan hergestellt wird und Merkmale beeinflusst', ok: ['pr'], why: 'Das ist ein Protein.' },
      { t: 'Die Chromosomen liegen im ... der Zelle', ok: ['ze'], why: 'Im Zellkern sind die Chromosomen geschützt.' }
    ], { ge: 'Gen', dn: 'DNA', ch: 'Chromosom', pr: 'Protein', ze: 'Zellkern' }, 'Welcher Begriff passt?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  mutation(el) {
    sorter(el, [
      { t: 'UV-Strahlung der Sonne schädigt die DNA', ok: ['ph'], why: 'Das ist eine physikalische Ursache.' },
      { t: 'Stoffe aus Abgasen verändern die Basen', ok: ['ch'], why: 'Das ist eine chemische Ursache.' },
      { t: 'Bestimmte Viren verändern die Erbinformation', ok: ['bi'], why: 'Das ist eine biologische Ursache.' },
      { t: 'Beim Kopieren der DNA wird eine Base falsch eingebaut', ok: ['fe'], why: 'Das ist ein Fehler bei der Verdopplung.' },
      { t: 'Röntgenstrahlen treffen eine Zelle', ok: ['ph'], why: 'Das ist eine physikalische Ursache.' }
    ], { ph: 'Physikalisch', ch: 'Chemisch', bi: 'Biologisch', fe: 'Kopierfehler' }, 'Welche Ursache liegt vor?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  ethik(el) {
    sorter(el, [
      { t: 'Niemand darf nur als Mittel zum Zweck benutzt werden.', ok: ['mw'], why: 'Das gehört zur Menschenwürde.' },
      { t: 'Künftige Risiken müssen rechtzeitig bedacht werden, auch wenn nicht sicher ist, ob sie eintreten.', ok: ['ve'], why: 'Das ist Verantwortung.' },
      { t: 'Das Glück aller Betroffenen zusammen soll möglichst gross sein.', ok: ['gl'], why: 'Das ist die Wertvorstellung Glück.' },
      { t: 'Das Recht auf Selbstbestimmung darf nicht verletzt werden.', ok: ['mw'], why: 'Selbstbestimmung gehört zur Menschenwürde.' },
      { t: 'Der Schmerz aller Beteiligten soll möglichst klein sein.', ok: ['gl'], why: 'Das gehört zur Wertvorstellung Glück.' },
      { t: 'Man muss Schäden verhindern, bevor sie entstehen.', ok: ['ve'], why: 'Das gehört zur Verantwortung.' }
    ], { mw: 'Menschenwürde', ve: 'Verantwortung', gl: 'Glück' }, 'Welche Wertvorstellung ist gemeint?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  mitose(el) {
    const S = [
      ['Ausgangszelle', 'Die Zelle hat im Zellkern ihre Chromosomen (beim Menschen 46). Jedes besteht aus einem Chromatid.'],
      ['DNA-Verdopplung', 'Die Chromosomen werden kopiert. Jedes Chromosom besteht nun aus zwei identischen Chromatiden (2-Chromatiden-Chromosom).'],
      ['Chromatiden trennen sich', 'Die beiden Chromatiden jedes Chromosoms werden auseinandergezogen, zu den entgegengesetzten Seiten der Zelle.'],
      ['Zwei Zellen', 'Die Zelle teilt sich. Beide Tochterzellen haben wieder je 46 Chromosomen mit denselben Erbinformationen.']
    ];
    el.innerHTML = `<div class="sim"><div class="ohrchain" aria-hidden="true">${S.map((s, i) => `<span class="ostep" data-i="${i}">${s[0]}</span>`).join('<b>→</b>')}</div>
      <p class="readout" id="ro" aria-live="polite"></p><button class="btn btn-primary block" id="on">Weiter</button></div>`;
    let i = 0;
    function show() {
      el.querySelectorAll('.ostep').forEach((x, k) => x.classList.toggle('on', k === i));
      $id('ro').innerHTML = `<b>${S[i][0]}:</b> ${S[i][1]}`;
      $id('on').textContent = i === S.length - 1 ? 'Nochmals von vorn' : 'Weiter';
    }
    $id('on').addEventListener('click', () => { i = (i + 1) % S.length; show(); });
    show();
  },

  teilung(el) {
    el.innerHTML = `<div class="sim">${sl('tn', 'Teilungsrunden', 0, 8, 1, 0, '')}
      <div class="trio"><div><span class="k">Runden</span><b class="mono" id="t1"></b></div><div><span class="k">Zellen</span><b class="mono" id="t2"></b></div></div>
      <div class="cubes" id="tc" aria-hidden="true"></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const n = +$id('tn').value, z = Math.pow(2, n);
      $id('tnv').textContent = String(n); $id('t1').textContent = String(n); $id('t2').textContent = fmt(z);
      const c = $id('tc'); c.innerHTML = '';
      for (let i = 0; i < Math.min(z, 64); i++) { const d = document.createElement('i'); d.className = 'cube bew'; c.appendChild(d); }
      $id('ro').innerHTML = `Nach ${n} Teilungsrunden gibt es 2<sup>${n}</sup> = <b>${fmt(z)}</b> Zellen. Alle enthalten dieselben Erbinformationen (Modell${z > 64 ? ', es werden höchstens 64 Zellen gezeichnet' : ''}).`;
    }
    $id('tn').addEventListener('input', upd); upd();
  },

  dnapaar(el) {
    const B = ['A', 'T', 'G', 'C'], P = { A: 'T', T: 'A', G: 'C', C: 'G' };
    el.innerHTML = `<div class="sim"><p class="small">Ergänze den Gegenstrang Base für Base.</p>
      <div class="dna" id="dn" aria-live="polite"></div>
      <div class="gbtns" id="db">${B.map(b => `<button class="btn sm" data-b="${b}">${b}</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p><button class="btn sm" id="dr">Neue Folge</button></div>`;
    let seq = [], got = [], fehler = 0;
    function neu() { seq = Array.from({ length: 8 }, () => B[Math.floor(Math.random() * 4)]); got = []; fehler = 0; draw(); }
    function draw() {
      $id('dn').innerHTML = `<div class="dstrang">${seq.map(b => `<span class="base b${b}">${b}</span>`).join('')}</div><div class="dstrang">${seq.map((b, i) => `<span class="base ${i < got.length ? 'b' + got[i] : 'leer'}">${i < got.length ? got[i] : '?'}</span>`).join('')}</div>`;
      $id('ro').innerHTML = got.length === seq.length ? `<b>Geschafft!</b> Der Gegenstrang ist vollständig. Fehlversuche: ${fehler}.` : `Welche Base gehört gegenüber von <b>${seq[got.length]}</b>?`;
    }
    el.querySelectorAll('[data-b]').forEach(b => b.addEventListener('click', () => {
      if (got.length >= seq.length) return;
      if (b.dataset.b === P[seq[got.length]]) got.push(b.dataset.b); else { fehler++; $id('ro').innerHTML = `<b>Nicht ganz.</b> ${seq[got.length]} paart sich mit ${P[seq[got.length]]} (A–T, G–C). Fehlversuche: ${fehler}.`; return; }
      draw();
    }));
    $id('dr').addEventListener('click', neu);
    neu();
  },

  codon(el) {
    el.innerHTML = `<div class="sim">${sl('ck', 'Basen pro Codewort', 1, 4, 1, 1, '')}
      <div class="brow"><span class="bname">Möglichkeiten</span><div class="btrack"><div class="bfill" id="cb"></div></div><b class="mono bval" id="cv"></b></div>
      <div class="trio"><div><span class="k">Aminosäuren</span><b class="mono">20</b></div><div><span class="k">Möglichkeiten</span><b class="mono" id="c2"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const k = +$id('ck').value, m = Math.pow(4, k);
      $id('ckv').textContent = String(k); $id('c2').textContent = String(m); $id('cv').textContent = String(m);
      $id('cb').style.width = Math.min(100, m / 64 * 100) + '%';
      $id('ro').innerHTML = `4<sup>${k}</sup> = <b>${m}</b> Möglichkeiten. ` + (m < 20 ? 'Das reicht nicht für die 20 Aminosäuren.' : k === 3 ? 'Das reicht: Es sind genug Tripletts. Wichtige Aminosäuren haben mehrere Codes. So funktioniert der genetische Code.' : 'Mehr als nötig.') + ' Modell.';
    }
    $id('ck').addEventListener('input', upd); $id('cb').style.width = '0%'; nf(el, upd);
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-5","titel":"Genetik und Gentechnik verstehen","kapitel":"NaTech 9, Kapitel 5","audio":"nt9-5"});
