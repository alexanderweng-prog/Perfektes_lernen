// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_6_Evolution_nachvollziehen.html
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

/* ---------- Inhalt: 9_6 Evolution nachvollziehen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_6 (ein Lehrerkommentar liegt nicht vor). */
const r2 = x => Math.round(x * 1000) / 1000;
const EV = [['die Entstehung der Erde', 4500], ['die ersten Lebewesen (Urbakterien)', 3700], ['die ersten Sauerstoff produzierenden Bakterien', 3500], ['das Entstehen der Ozonschicht', 700], ['die ersten Landpflanzen', 400], ['die ersten Wirbeltiere an Land', 350], ['die Zeit der meisten Dinosaurier', 230], ['das Verschwinden der Dinosaurier', 65]];
const STATIONS = [
  {
    id: 'v1', nr: 1, title: 'Entstehung der Lebewesen', sub: 'Eine Reise durch die Erdgeschichte',
    items: [
      { id: 'v1-sauerstoff', topic: 'Sauerstoff und Leben an Land', make() {
        return mc('Warum wurde Leben an Land erst möglich, als sich Sauerstoff in der Atmosphäre stark anreicherte?', ['Aus dem Sauerstoff entstand die Ozonschicht. Sie schützt vor der Sonneneinstrahlung und ermöglicht Leben an Land.', 'Weil Sauerstoff Pflanzen ersetzte.', 'Weil Sauerstoff das Wasser vertrieb.', 'Weil Sauerstoff Dinosaurier ernährte.'],
          'Vor etwa 700 Millionen Jahren begann sich Sauerstoff in der Atmosphäre stark anzureichern. Die Ozonschicht entstand.');
      } },
      { id: 'v1-erste', topic: 'Die ersten Lebewesen', make() {
        return mc('Wann und welche Lebewesen entstanden zuerst?', ['Vor etwa 3,7 Milliarden Jahren die Urbakterien, rund 0,8 Milliarden Jahre nach der Entstehung der Erde.', 'Zuerst die Dinosaurier.', 'Zuerst die Landpflanzen.', 'Zuerst der Mensch.'],
          'Die Erde entstand vor etwa 4,5 Milliarden Jahren. Die ersten Sauerstoff produzierenden Bakterien entstanden vor etwa 3,5 Milliarden Jahren.');
      } },
      { id: 'v1-pflanzen', topic: 'Landpflanzen', make() {
        return mc('Welche Rolle spielten die ersten Landpflanzen?', ['Durch die Fotosynthese produzierten sie zusätzlichen Sauerstoff.', 'Sie verbrauchten allen Sauerstoff.', 'Sie vertrieben die Bakterien.', 'Sie erzeugten die Ozonschicht.'],
          'Sie entstanden vor etwa 400 Millionen Jahren. Erste Wirbeltiere lebten vor etwa 350 Millionen Jahren an Land.');
      } },
      { id: 'v1-aussterben', topic: 'Aussterben', make() {
        return mc('Vor etwa 250 Millionen Jahren starben viele Lebewesen. Was war eine Ursache?', ['Viele Vulkanausbrüche verringerten den Sauerstoffgehalt der Erde.', 'Es gab zu viel Sauerstoff.', 'Der Mond verschwand.', 'Die Dinosaurier fressen alles.'],
          'Seit etwa 65 Millionen Jahren gibt es keine Dinosaurier mehr. Auch heute sind viele Arten vom Aussterben bedroht.');
      } },
      { id: 'v1-mensch', topic: 'Der moderne Mensch', make() {
        return mc('Wie lange gibt es den modernen Menschen im Vergleich zur Erdgeschichte?', ['Seit etwa 300 000 Jahren, also erst sehr kurze Zeit.', 'Seit 4,5 Milliarden Jahren.', 'Seit 700 Millionen Jahren.', 'Seit 65 Millionen Jahren.'],
          'Menschenaffen lebten von vor etwa 4 bis 2 Millionen Jahren. Sie gehören zu den Vorfahren der Menschen.');
      } },
      { id: 'v1-zeit', topic: 'Zeitspannen', make() {
        const i = Math.floor(Math.random() * 7), j = i + 1 + Math.floor(Math.random() * (7 - i)), a = EV[i], b = EV[j], d = a[1] - b[1];
        return num(`Vor ${fmt(a[1])} Millionen Jahren fand ${a[0]} statt, vor ${fmt(b[1])} Millionen Jahren ${b[0]}. Wie viele Millionen Jahre liegen dazwischen?`, 'Mio. Jahre', d, 'Ziehe die kleinere Zahl von der grösseren ab.', `${fmt(a[1])} − ${fmt(b[1])} = ${fmt(d)} Millionen Jahre`);
      } }
    ]
  },
  {
    id: 'v2', nr: 2, title: 'Lebewesen ordnen', sub: 'Homologie, Analogie und Kladogramm',
    items: [
      { id: 'v2-homo', topic: 'Homologie', make() {
        return mc('Was ist eine Homologie?', ['Gleicher Aufbau eines Körperteils bei verschiedenen Lebewesen wegen gemeinsamem Ursprung, auch wenn die Funktion verschieden ist.', 'Gleiche Funktion bei unterschiedlichem Aufbau.', 'Ein Merkmal, das nur bei einer Art vorkommt.', 'Ein Fehler im Erbgut.'],
          'Die Vordergliedmassen von Mensch, Wal, Fledermaus und Pferd haben denselben Knochenaufbau, dienen aber zum Greifen, Schwimmen, Fliegen oder Laufen.');
      } },
      { id: 'v2-ana', topic: 'Analogie', make() {
        return mc('Was ist eine Analogie? Nenne ein Beispiel.', ['Gleiche Funktion bei unterschiedlichem Aufbau, zum Beispiel die Flügel von Vögeln und Insekten.', 'Gleicher Aufbau bei gleicher Funktion.', 'Gleiche Gene.', 'Ein Merkmal, das Vorfahren hatten.'],
          'Analogien sind das Gegenteil von Homologien. Sie zeigen keine nahe Verwandtschaft, sondern ähnliche Funktionen.');
      } },
      { id: 'v2-klad', topic: 'Kladogramm lesen', make() {
        return mc('Im Kladogramm der Wirbeltiere trennen sich die Linien von Säugetieren und Reptilien später als die von Knochenfischen und Reptilien. Was folgt daraus?', ['Säugetiere und Reptilien sind näher miteinander verwandt als Knochenfische und Reptilien.', 'Knochenfische sind näher mit Reptilien verwandt.', 'Verwandtschaft lässt sich nicht ablesen.', 'Alle sind gleich verwandt.'],
          'Je mehr Merkmale Lebewesen gemeinsam haben, desto später trennen sich ihre Linien im Kladogramm.');
      } },
      { id: 'v2-ast', topic: 'Verzweigungen im Kladogramm', make() {
        return mc('Was bedeutet eine Verzweigung in einem Kladogramm?', ['Ein neu vorhandenes Merkmal. Alle Lebewesen oberhalb davon besitzen es.', 'Ein Streit zwischen Arten.', 'Ein Fehler der Zeichnung.', 'Das Alter der Tiere.'],
          'So lassen sich Lebewesen durch gemeinsame Merkmale von anderen abgrenzen. Alle Wirbeltiere haben zum Beispiel eine Wirbelsäule.');
      } },
      { id: 'v2-klasse', topic: 'Klasse und Art', make() {
        return mc('Was ist der Unterschied zwischen Klasse und Art?', ['Eine Klasse (zum Beispiel Säugetiere) fasst Lebewesen mit gleichen oder ähnlichen Merkmalen zusammen. Zu ihr gehören verschiedene Arten wie Fuchs, Bär oder Hase.', 'Eine Art besteht aus mehreren Klassen.', 'Beides ist dasselbe.', 'Eine Klasse ist ein Lebewesen.'],
          'Das Kladogramm zeigt sieben Klassen von Wirbeltieren: Rundmäuler, Knorpelfische, Knochenfische, Amphibien, Reptilien, Vögel und Säugetiere.');
      } },
      { id: 'v2-merkmal', topic: 'Gemeinsame Merkmale', make() {
        return mc('Welche Aussage über Verwandtschaft ist richtig?', ['Je mehr Merkmale zwei Lebewesen gemeinsam haben, desto näher sind sie miteinander verwandt.', 'Je weniger Merkmale, desto näher verwandt.', 'Das Aussehen sagt nie etwas aus.', 'Nur die Grösse zählt.'],
          'Manchmal erkennt man Verwandtschaft nicht auf den ersten Blick. Der Knochenaufbau der Vordergliedmassen zeigt zum Beispiel einen gemeinsamen Vorfahren.');
      } }
    ]
  },
  {
    id: 'v3', nr: 3, title: 'Evolutionstheorien', sub: 'Lamarck und Darwin/Wallace',
    items: [
      { id: 'v3-lamarck', topic: 'Theorie von Lamarck', make() {
        return mc('Wie erklärte Lamarck den langen Hals der Giraffen?', ['Die Giraffen streckten sich nach Blättern, ihr Hals wurde länger, und diesen erworbenen Hals gaben sie an die Nachkommen weiter.', 'Durch zufällige Unterschiede und Auslese.', 'Durch Isolation durch Gletscher.', 'Durch Kreuzung mit anderen Arten.'],
          'Lamarck ging davon aus, dass im Lauf des Lebens erworbene Eigenschaften vererbt werden.');
      } },
      { id: 'v3-wider', topic: 'Warum widerlegt?', make() {
        return mc('Warum gilt die Theorie von Lamarck als widerlegt?', ['Erworbene Eigenschaften sind nicht im Erbgut verankert und werden nicht weitergegeben. Man kann seine Entwicklung auch nicht bewusst steuern.', 'Weil Giraffen keine Hälse haben.', 'Weil Lamarck zu alt war.', 'Weil es zu wenig Giraffen gab.'],
          'Der eigene Hals wird nicht länger, indem man sich einen längeren Hals wünscht.');
      } },
      { id: 'v3-darwin', topic: 'Theorie von Darwin und Wallace', make() {
        return mc('Wie erklären Darwin und Wallace den langen Hals der Giraffen?', ['Giraffen unterscheiden sich zufällig. Bei knapper Nahrung überleben die mit langem Hals eher, pflanzen sich fort und geben die Merkmalsausprägung weiter.', 'Alle Giraffen strecken sich.', 'Der Hals wächst durch Wunsch.', 'Die Natur plant den langen Hals.'],
          'Die Theorie von Darwin und Wallace ist wissenschaftlich anerkannt und bildet die Grundlage der heutigen Evolutionsforschung.');
      } },
      { id: 'v3-gene', topic: 'Gene und Darwins Zeit', make() {
        return mc('Darwin und Wallace wussten noch nicht, was Gene sind. Warum ist ihre Theorie trotzdem eine Grundlage?', ['Sie beschrieb richtig, dass zufällige Unterschiede und Auslese Arten verändern. Die Gene wurden später als Ursache entdeckt.', 'Weil Gene für die Theorie nicht wichtig sind.', 'Weil die Theorie falsch ist.', 'Weil Darwin nur Pflanzen untersuchte.'],
          'Heute erklärt die Genetik, wie Variabilität entsteht: durch Rekombination und Mutationen.');
      } },
      { id: 'v3-origin', topic: 'Darwins Buch', make() {
        return mc('Warum wird die Evolutionstheorie eher mit Darwin als mit Wallace verbunden?', ['Darwin veröffentlichte sie sehr ausführlich im Buch «Die Entstehung der Arten», das grosses Interesse fand.', 'Wallace war nie beteiligt.', 'Darwin war jünger.', 'Wallace lebte nicht mehr.'],
          'Darwin und Wallace hatten unabhängig voneinander eine ähnliche Theorie entwickelt.');
      } },
      { id: 'v3-alter', topic: 'Lebensdauer berechnen', ext: true, make() {
        const s = rnd([['Lamarck', 1744, 1829], ['Darwin', 1809, 1882], ['Wallace', 1823, 1913]]), d = s[2] - s[1];
        return num(`${s[0]} lebte von ${fmt(s[1])} bis ${fmt(s[2])}. Wie alt wurde er?`, 'Jahre', d, 'Ziehe das Geburtsjahr vom Todesjahr ab.', `${fmt(s[2])} − ${fmt(s[1])} = ${fmt(d)} Jahre`);
      } }
    ]
  },
  {
    id: 'v4', nr: 4, title: 'Variabilität und Selektion', sub: 'Die Evolutionsfaktoren',
    items: [
      { id: 'v4-vari', topic: 'Variabilität', make() {
        return mc('Woher kommt die Variabilität innerhalb einer Art?', ['Aus der Rekombination der Erbanlagen bei der geschlechtlichen Fortpflanzung und aus Mutationen.', 'Aus der Ernährung allein.', 'Aus der Luft.', 'Variabilität gibt es nicht.'],
          'Ausgenommen sind eineiige Zwillinge, die sich in ihren Erbanlagen nicht unterscheiden.');
      } },
      { id: 'v4-mut', topic: 'Mutation und Vererbung', make() {
        return mc('Wann kann eine Mutation an die nächste Generation weitergegeben werden?', ['Wenn sie in einer Geschlechtszelle erfolgt.', 'Wenn sie in einer beliebigen Körperzelle erfolgt.', 'Nie.', 'Nur bei Pflanzen.'],
          'Ein Beispiel für eine auffällige Mutation ist der Albinismus mit sehr heller Haut oder weissem Fell.');
      } },
      { id: 'v4-fit', topic: 'Survival of the fittest', make() {
        return mc('Was bedeutet «survival of the fittest» wirklich?', ['Es überleben die Lebewesen, die am besten an ihre Umgebung angepasst sind, nicht unbedingt die stärksten.', 'Es überleben immer die Stärksten.', 'Es überleben immer die Grössten.', 'Es überleben alle.'],
          'To fit heisst auf Englisch passen. Gut getarnte Birkenspanner überleben eher, weil Vögel sie schlecht sehen.');
      } },
      { id: 'v4-natur', topic: 'Natürliche Selektion', make() {
        return mc('Was ist natürliche Selektion?', ['Eigenschaften des Lebensraums führen dazu, dass bestimmte Lebewesen eher überleben und einen höheren Fortpflanzungserfolg haben.', 'Menschen wählen Tiere aus.', 'Zufälliges Sterben.', 'Das Wachstum von Pflanzen.'],
          'Nachkommen der gut angepassten Lebewesen haben ähnliche Merkmale und sind ebenfalls gut angepasst.');
      } },
      { id: 'v4-kunst', topic: 'Künstliche Selektion', make() {
        return mc('Was ist künstliche Selektion?', ['Menschen bestimmen, welche Lebewesen sich fortpflanzen dürfen, zum Beispiel bei der Zucht von Tieren oder Pflanzen.', 'Das Überleben der Besten in der Natur.', 'Zufälliges Aussterben.', 'Eine Mutation durch Strahlen.'],
          'Züchterinnen und Züchter greifen in den Fortpflanzungserfolg ein.');
      } },
      { id: 'v4-anteil', topic: 'Anteile nach der Selektion', make() {
        const s = rnd([[60, 40, 20], [45, 55, 25], [30, 70, 40], [80, 40, 20], [40, 60, 20], [75, 50, 25]]), p = r2(s[0] / (s[0] + s[1] - s[2]) * 100);
        return num(`Ein Beet hat ${fmt(s[0])} grüne und ${fmt(s[1])} braune Käfer. Vögel fressen ${fmt(s[2])} braune Käfer, aber keine grünen. Wie viel Prozent der übrigen Käfer sind grün?`, '%', p, 'Zähle zuerst, wie viele Käfer übrig bleiben. Teile dann die grünen Käfer durch diese Zahl.', `Übrig: ${fmt(s[0])} + ${fmt(s[1] - s[2])} = ${fmt(s[0] + s[1] - s[2])}<br>${fmt(s[0])} : ${fmt(s[0] + s[1] - s[2])} = ${fmt(p / 100)} = ${fmt(p)} %`);
      } }
    ]
  },
  {
    id: 'v5', nr: 5, title: 'Artbildung', sub: 'Sexuelle Selektion, Isolation, Spezialisierung',
    items: [
      { id: 'v5-sex', topic: 'Sexuelle Selektion', make() {
        return mc('Was ist sexuelle Selektion? Nenne ein Beispiel.', ['Merkmale setzen sich durch, weil sie bei der Partnerwahl bevorzugt werden, zum Beispiel die farbigen Federn des Pfauen-Männchens.', 'Auslese durch Fressfeinde.', 'Auslese durch Klimawechsel.', 'Auslese durch Züchter.'],
          'Das Weibchen schliesst aus schönen Federn, dass das Männchen stark und gesund ist. So setzen sich die Federn über viele Generationen durch.');
      } },
      { id: 'v5-zufall', topic: 'Zufallseffekte', make() {
        return mc('Wie können Zufallseffekte die Evolution beeinflussen?', ['Bei einer Katastrophe überleben zufällig einige Lebewesen und geben ihre Gene weiter.', 'Zufall spielt keine Rolle.', 'Zufall entscheidet nur bei Pflanzen.', 'Zufall ersetzt die Selektion.'],
          'Welche Lebewesen eine Überschwemmung überleben, ist dem Zufall überlassen.');
      } },
      { id: 'v5-iso', topic: 'Isolation', make() {
        return mc('Wann entstehen aus einer Art neue Arten?', ['Wenn der Austausch von Erbmaterial unterbunden wird, zum Beispiel durch Isolation.', 'Sobald es Mutationen gibt.', 'Sobald Tiere wandern.', 'Wenn Tiere sich häufiger paaren.'],
          'Isolierte Lebewesen entwickeln sich unabhängig voneinander. Nach vielen Generationen können sie sich nicht mehr fortpflanzen.');
      } },
      { id: 'v5-raum', topic: 'Räumliche Isolation', make() {
        return mc('Wie entstanden Grauspecht und Grünspecht?', ['In der Eiszeit trennten Gletscher die ursprüngliche Spechtart räumlich. Die Gruppen entwickelten sich unterschiedlich.', 'Durch Kreuzung mit Wasserfröschen.', 'Durch Mutation in einer Nacht.', 'Durch Zucht.'],
          'Heute leben beide wieder am gleichen Ort, können sich aber nicht mehr untereinander fortpflanzen.');
      } },
      { id: 'v5-jahr', topic: 'Jahreszeitliche Isolation', make() {
        return mc('Warum kommt es zwischen Grasfrosch und Wasserfrosch nicht zu Paarungen?', ['Ihre Paarungszeiten liegen zu verschiedenen Zeiten: Der Grasfrosch paart sich im März, der Wasserfrosch im Mai und Juni.', 'Sie leben an verschiedenen Orten.', 'Sie sehen gleich aus.', 'Sie sind keine Tiere.'],
          'Theoretisch könnten sich die beiden paaren. Weil es nie dazu kommt, gelten sie als zwei Arten.');
      } },
      { id: 'v5-ueberleben', topic: 'Überlebende nach einer Katastrophe', make() {
        const s = rnd([[100, 20], [500, 10], [200, 25], [1000, 5], [80, 50]]), n = r2(s[0] * s[1] / 100);
        return num(`Bei einer Überschwemmung überleben zufällig ${fmt(s[1])} % einer Population von ${fmt(s[0])} Tieren. Wie viele Tiere überleben?`, 'Tiere', n, 'Berechne den Prozentsatz der Gesamtzahl.', `${fmt(s[0])} · ${fmt(s[1])} % = ${fmt(n)} Tiere`);
      } }
    ]
  },
  {
    id: 'v6', nr: 6, title: 'Evolution anwenden', sub: 'Beispiele erklären',
    items: [
      { id: 'v6-frosch', topic: 'Flugfrosch', make() {
        return mc('Flugfrösche haben Spannhäute zwischen den Fingern. Wie erklären Darwin und Wallace deren Entstehung?', ['Frösche unterschieden sich zufällig in der Grösse der Spannhäute. Frösche mit grösseren Häuten entkamen Feinden besser, pflanzten sich fort und gaben die Ausprägung weiter.', 'Die Frösche wollten fliegen und streckten ihre Finger.', 'Spannhäute entstehen durch Baden.', 'Es sind Pflanzenteile.'],
          'Nach Lamarck hätten die Frösche die Häute durch Gebrauch erworben und vererbt. Das gilt heute als widerlegt.');
      } },
      { id: 'v6-hirsch', topic: 'Hirschgeweih', make() {
        return mc('Ein grosses Geweih ist für Hirsche unpraktisch. Warum konnte es sich trotzdem durchsetzen?', ['Weil Weibchen Männchen mit grossem Geweih bevorzugen: sexuelle Selektion.', 'Weil Jäger grosse Geweihe lieben.', 'Weil es das Laufen beschleunigt.', 'Weil Geweihe nicht vererbt werden.'],
          'Der Fortpflanzungserfolg entscheidet. Männchen mit auffälligem Merkmal haben mehr Nachkommen, auch wenn sie leichter entdeckt werden.');
      } },
      { id: 'v6-spezial', topic: 'Spezialisierung', make() {
        return mc('Was haben Darwinfinken und Kärpflinge mit Spezialisierung zu tun?', ['Sie haben sich auf unterschiedliche Nahrung und Lebensräume spezialisiert (zum Beispiel verschiedene Schnabel- oder Kieferformen) und sind dadurch zu verschiedenen Arten geworden.', 'Sie sind alle gleich geblieben.', 'Sie fressen nur ein Futter.', 'Sie sind ausgestorben.'],
          'Die Formen von Schnabel oder Kiefer passen zur jeweiligen Nahrung. Daraus entsteht Nischenbildung.');
      } },
      { id: 'v6-stamm', topic: 'Stammbäume', make() {
        return mc('Jemand sagt: «Stammbäume dürfen nicht weiterentwickelt werden, sie sind eine feststehende Theorie.» Was ist passend?', ['Stammbäume beruhen auf Forschung und werden mit neuen Erkenntnissen ergänzt und verbessert.', 'Der Satz ist richtig.', 'Stammbäume sind erfunden.', 'Stammbäume ändern sich nie.'],
          'Wissenschaft ist offen für neue Daten. Auch Kladogramme werden überprüft und angepasst.');
      } },
      { id: 'v6-ind', topic: 'Einzelne Lebewesen und Arten', make() {
        return mc('Wer oder was verändert sich bei der Evolution?', ['Die Arten über viele Generationen. Ein einzelnes Lebewesen verändert seine Erbanlagen nicht durch Wollen oder Üben.', 'Jedes einzelne Lebewesen im Lauf seines Lebens.', 'Nur die Umwelt.', 'Nur Pflanzen.'],
          'Evolution beschreibt die Entwicklung von Arten über mehrere Generationen.');
      } },
      { id: 'v6-faktoren', topic: 'Zusammenspiel der Faktoren', make() {
        return mc('Welche Faktoren führen zusammen zur Evolution?', ['Variabilität (Rekombination, Mutation), Selektion, Zufallseffekte und Isolation oder Spezialisierung.', 'Nur Mutation.', 'Nur Isolation.', 'Nur der Wille der Lebewesen.'],
          'Durch Variabilität, Selektion und Zufall allein entstehen noch keine neuen Arten. Erst wenn der Austausch von Erbmaterial unterbunden wird, spalten sich Arten auf.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  v1: [
    { h: 'Was ist Evolution?',
      body: `<p>Sehr vereinfacht beschreibt <b>Evolution</b> die Entstehung und Entwicklung der Lebewesen. Der <b>Sauerstoffgehalt</b> der Erde spielte dabei eine bedeutende Rolle.</p>` },
    { h: 'Die Reise durch die Zeit',
      body: '<p>Schiebe den Regler und sieh, was wann geschah. Die Angaben sind gerundet.</p>', sim: 'zeitstrahl' },
    { h: 'Wichtige Stationen',
      body: `<ul><li>Vor 4,5 Mrd. Jahren entsteht die Erde, vor 3,7 Mrd. Jahren entstehen die <b>Urbakterien</b>.</li>
        <li>Vor 3,5 Mrd. Jahren entstehen Bakterien, die <b>Sauerstoff produzieren</b>.</li>
        <li>Vor 700 Mio. Jahren reichert sich Sauerstoff stark an, die <b>Ozonschicht</b> entsteht und ermöglicht Leben an Land.</li>
        <li>Landpflanzen (400 Mio.), Wirbeltiere an Land (350 Mio.), Dinosaurier (230 Mio., verschwunden vor 65 Mio.).</li>
        <li>Den modernen Menschen gibt es seit etwa 300 000 Jahren.</li></ul>` },
    { h: 'Vorgerechnet: Zeitspanne', worked: {
      given: 'Vor 4500 Millionen Jahren entstand die Erde, vor 3700 Millionen Jahren die ersten Lebewesen. Wie viele Millionen Jahre liegen dazwischen?',
      steps: [['Rechnung', '4500 − 3700 = 800'], ['Antwort', '800 Millionen Jahre.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was ermöglichte Leben an Land?',
        options: ['Die Ozonschicht, die aus dem Sauerstoff entstand und vor Sonneneinstrahlung schützt.', 'Die Dinosaurier.', 'Das Verschwinden des Wassers.', 'Der moderne Mensch.'],
        explain: 'Mit dem Sauerstoff bildete sich die Ozonschicht. Sie schirmt gefährliche Strahlung ab.' } }
  ],
  v2: [
    { h: 'Ähnlicher Bau, gemeinsame Vorfahren',
      body: `<p>Die Vordergliedmassen von Mensch, Wal, Fledermaus, Pferd und Maulwurf sehen verschieden aus, haben aber denselben Knochenaufbau. Das spricht für einen <b>gemeinsamen Vorfahren</b>.</p>
        ${merk('<b>Homologie:</b> gleicher Aufbau, auch bei verschiedener Funktion.<br><b>Analogie:</b> gleiche Funktion, aber verschiedener Aufbau (Flügel von Vogel und Insekt).')}` },
    { h: 'Homologie oder Analogie?',
      body: '<p>Ordne die Beispiele zu.</p>', sim: 'homolog' },
    { h: 'Das Kladogramm',
      body: `<p>Ein <b>Kladogramm</b> ist ein Stammbaum, der Abstammung und Verwandtschaft zeigt. Jede Verzweigung steht für ein <b>neues Merkmal</b>.</p>
        <ul><li>Je mehr Merkmale gemeinsam, desto näher verwandt und desto später trennen sich die Linien.</li><li>Alle Wirbeltiere haben eine Wirbelsäule. Mit Ausnahme der Rundmäuler haben alle paarige Gliedmassen.</li></ul>` },
    { h: 'Klassen und Arten',
      body: `<p>Im Kladogramm der Wirbeltiere stehen sieben <b>Klassen</b>: Rundmäuler, Knorpelfische, Knochenfische, Amphibien, Reptilien, Vögel, Säugetiere. Zur Klasse der Säugetiere gehören verschiedene <b>Arten</b> wie Fuchs, Bär und Hase.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Die Flügel von Vogel und Insekt erfüllen dieselbe Funktion, sind aber verschieden gebaut. Was ist das?',
        options: ['Eine Analogie.', 'Eine Homologie.', 'Ein Kladogramm.', 'Eine Mutation.'],
        explain: 'Gleiche Funktion bei unterschiedlichem Aufbau nennt man Analogie.' } }
  ],
  v3: [
    { h: 'Zwei Erklärungsversuche',
      body: `<p>Die Entwicklung von Arten über mehrere Generationen heisst <b>Evolution</b>. Zwei wichtige Theorien erklären sie am Beispiel des langen Giraffenhalses.</p>` },
    { h: 'Lamarck oder Darwin?',
      body: '<p>Ordne die Aussagen der passenden Theorie zu.</p>', sim: 'giraffe' },
    { h: 'Lamarck',
      body: `<p>Jean-Baptiste de Lamarck dachte: Die Giraffen streckten ihre Hälse nach Blättern, die Hälse wurden länger, und diese <b>erworbene Eigenschaft</b> wurde vererbt. Heute weiss man: Erworbene Eigenschaften sind nicht im Erbgut verankert. Die Theorie gilt als <b>widerlegt</b>.</p>` },
    { h: 'Darwin und Wallace',
      body: `<p>Nach Darwin und Wallace unterscheiden sich Lebewesen einer Art <b>zufällig</b>. Bei knapper Nahrung überleben die Giraffen mit langem Hals eher. Sie pflanzen sich fort und geben die Merkmalsausprägung weiter. Die Theorie ist <b>wissenschaftlich anerkannt</b>, auch wenn man damals Gene und DNA noch nicht kannte.</p>` },
    { h: 'Vorgerechnet: Alter', worked: {
      given: 'Charles Darwin lebte von 1809 bis 1882. Wie alt wurde er?',
      steps: [['Rechnung', '1882 − 1809 = 73'], ['Antwort', 'Er wurde 73 Jahre alt.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was unterscheidet Darwin/Wallace von Lamarck?',
        options: ['Zufällige Unterschiede und Auslese statt Vererbung erworbener Eigenschaften.', 'Sie bestritten, dass sich Arten verändern.', 'Sie waren sich einig.', 'Sie sprachen über Pflanzen.'],
        explain: 'Nach Darwin und Wallace wählt die Umwelt aus, was zufällig vorhanden ist.' } }
  ],
  v4: [
    { h: 'Variabilität',
      body: `<p>Bei der geschlechtlichen Fortpflanzung werden die Erbanlagen von Mutter und Vater durchmischt: <b>Rekombination</b>. Dazu kommen <b>Mutationen</b>. So unterscheiden sich Lebewesen einer Art leicht: <b>Variabilität</b>. Eineiige Zwillinge sind die Ausnahme.</p>` },
    { h: 'Natürliche Selektion',
      body: `<p>Lebewesen, deren Merkmale gut an den Lebensraum passen, überleben eher und haben mehr Nachkommen.</p>
        ${merk('<b>Survival of the fittest</b> heisst nicht «Überleben des Stärksten», sondern «Überleben des am besten Angepassten». <b>To fit</b> heisst passen.')}
        <p>Bei der <b>künstlichen Selektion</b> (Zucht) bestimmen Menschen, welche Lebewesen sich fortpflanzen.</p>` },
    { h: 'Welcher Evolutionsfaktor?',
      body: '<p>Ordne die Beispiele einem Faktor zu.</p>', sim: 'faktor' },
    { h: 'Käfer unter Beobachtung',
      body: '<p>In einem Beet leben grüne und braune Käfer. Vögel fressen die braunen häufiger. Schiebe die Zeit nach vorne. Das ist ein Modell mit Beispielwerten.</p>', sim: 'selektion' },
    { h: 'Vorgerechnet: Käferanteil', worked: {
      given: 'Ein Beet hat 60 grüne und 40 braune Käfer. Vögel fressen 20 braune. Wie viel Prozent der übrigen Käfer sind grün?',
      steps: [['Übrige Käfer', '60 grüne + (40 − 20) braune = 80'], ['Anteil', '60 : 80 = 0,75'], ['Antwort', '75 % der Käfer sind grün. Der Anteil der grünen ist von 60 % auf 75 % gestiegen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Die Vögel fressen mehr braune als grüne Käfer. Was geschieht über viele Generationen?',
        options: ['Der Anteil grüner Käfer steigt, weil sie besser angepasst sind.', 'Der Anteil brauner Käfer steigt.', 'Alle Käfer werden braun.', 'Nichts ändert sich.'],
        explain: 'Gut getarnte Käfer überleben eher und haben mehr Nachkommen.' } }
  ],
  v5: [
    { h: 'Sexuelle Selektion und Zufall',
      body: `<ul><li><b>Sexuelle Selektion:</b> Merkmale setzen sich durch, weil sie bei der Partnerwahl bevorzugt werden (Federn des Pfauen-Männchens, Hirschgeweih).</li><li><b>Zufallseffekte:</b> Nach einer Katastrophe überleben zufällig einige Lebewesen.</li></ul>` },
    { h: 'Isolation',
      body: `<p>Neue Arten entstehen erst, wenn der <b>Austausch von Erbmaterial</b> unterbunden wird. Das nennt man <b>Isolation</b>. Isolierte Lebewesen entwickeln sich unabhängig. Nach vielen Generationen können sie sich nicht mehr fortpflanzen.</p>
        <ul><li><b>Räumlich:</b> Grauspecht und Grünspecht (Gletscher in der Eiszeit).</li><li><b>Jahreszeitlich:</b> Grasfrosch (März) und Wasserfrosch (Mai und Juni).</li></ul>` },
    { h: 'Welche Art der Artbildung?',
      body: '<p>Ordne die Beispiele zu.</p>', sim: 'isolation' },
    { h: 'Spezialisierung',
      body: `<p>Tiere können sich auf unterschiedliche Nahrung und Lebensräume <b>spezialisieren</b> (Nischenbildung). Die <b>Darwinfinken</b> der Galapagos-Inseln und die Kärpflinge der Bahamas mit verschiedenen Kieferformen sind Beispiele.</p>` },
    { h: 'Vorgerechnet: Überlebende', worked: {
      given: 'Von 200 Tieren überleben zufällig 25 % eine Überschwemmung. Wie viele sind es?',
      steps: [['Rechnung', '200 · 25 % = 50'], ['Antwort', '50 Tiere. Nur diese geben ihre Gene weiter.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum entstehen aus Selektion und Variabilität allein noch keine neuen Arten?',
        options: ['Es braucht Isolation oder Spezialisierung, damit kein Erbmaterial mehr ausgetauscht wird.', 'Weil Mutationen selten sind.', 'Weil Arten sich nie verändern.', 'Weil Pflanzen das verhindern.'],
        explain: 'Solange sich die Lebewesen untereinander fortpflanzen, durchmischt sich das Erbmaterial wieder.' } }
  ],
  v6: [
    { h: 'Evolution erklären',
      body: `<p>Wenn du eine Entwicklung erklären willst, gehst du so vor:</p>
        <ol><li>Es gibt <b>Variabilität</b>: Merkmale kommen in verschiedenen Ausprägungen vor.</li><li>Bestimmte Ausprägungen bringen einen <b>Vorteil</b> (Überleben, Fortpflanzung, Partnerwahl).</li><li>Diese Lebewesen haben mehr <b>Nachkommen</b> und geben die Ausprägung weiter.</li><li>Mit der Zeit wird die Ausprägung <b>häufiger</b>.</li></ol>` },
    { h: 'Beispiele',
      body: `<ul><li><b>Flugfrosch:</b> Zufällig grössere Spannhäute helfen bei der Flucht.</li><li><b>Hirschgeweih:</b> Trotz Nachteil setzt es sich durch, weil es bei der Partnerwahl bevorzugt wird.</li><li><b>Darwinfinken:</b> Spezialisierung auf Nahrung.</li></ul>
        <p>Nicht das einzelne Lebewesen verändert sich, sondern die <b>Art</b> über viele Generationen.</p>` },
    { h: 'Offene Wissenschaft',
      body: `<p>Stammbäume und Kladogramme beruhen auf jahrelanger Forschung. Sie werden mit neuen Erkenntnissen <b>ergänzt und verbessert</b>.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über die Evolution stimmt?',
        options: ['Arten verändern sich über viele Generationen.', 'Ein Lebewesen verändert sein Erbgut durch Wünsche.', 'Alle Lebewesen einer Art sind gleich.', 'Evolution dauert nur ein Leben lang.'],
        explain: 'Evolution beschreibt die Entwicklung von Arten über mehrere Generationen.' } }
  ]
};
const GOALS = {
  v1: ['wichtige Stationen der Erdgeschichte einordnen', 'die Rolle des Sauerstoffs beschreiben'],
  v2: ['Homologie und Analogie unterscheiden', 'ein Kladogramm lesen'],
  v3: ['die Theorien von Lamarck und Darwin/Wallace vergleichen', 'begründen, warum Lamarck widerlegt ist'],
  v4: ['Variabilität und Selektion erklären', 'survival of the fittest richtig deuten'],
  v5: ['Isolation und Spezialisierung beschreiben', 'sexuelle Selektion und Zufall unterscheiden'],
  v6: ['Evolution an Beispielen erklären', 'die Faktoren der Evolution verknüpfen']
};
const LEARN = {
  'v1-sauerstoff': 'Wichtige Stationen', 'v1-erste': 'Wichtige Stationen', 'v1-pflanzen': 'Wichtige Stationen', 'v1-aussterben': 'Wichtige Stationen', 'v1-mensch': 'Die Reise durch die Zeit', 'v1-zeit': 'Vorgerechnet: Zeitspanne',
  'v2-homo': 'Ähnlicher Bau, gemeinsame Vorfahren', 'v2-ana': 'Homologie oder Analogie?', 'v2-klad': 'Das Kladogramm', 'v2-ast': 'Das Kladogramm', 'v2-klasse': 'Klassen und Arten', 'v2-merkmal': 'Das Kladogramm',
  'v3-lamarck': 'Lamarck', 'v3-wider': 'Lamarck', 'v3-darwin': 'Darwin und Wallace', 'v3-gene': 'Darwin und Wallace', 'v3-origin': 'Zwei Erklärungsversuche', 'v3-alter': 'Vorgerechnet: Alter',
  'v4-vari': 'Variabilität', 'v4-mut': 'Variabilität', 'v4-fit': 'Natürliche Selektion', 'v4-natur': 'Natürliche Selektion', 'v4-kunst': 'Welcher Evolutionsfaktor?', 'v4-anteil': 'Vorgerechnet: Käferanteil',
  'v5-sex': 'Sexuelle Selektion und Zufall', 'v5-zufall': 'Sexuelle Selektion und Zufall', 'v5-iso': 'Isolation', 'v5-raum': 'Isolation', 'v5-jahr': 'Welche Art der Artbildung?', 'v5-ueberleben': 'Vorgerechnet: Überlebende',
  'v6-frosch': 'Beispiele', 'v6-hirsch': 'Beispiele', 'v6-spezial': 'Beispiele', 'v6-stamm': 'Offene Wissenschaft', 'v6-ind': 'Beispiele', 'v6-faktoren': 'Evolution erklären'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Urbakterium', pw: 'macht den Anfang' },
  { xp: 80, name: 'Landpflanze', pw: 'erobert das Land' },
  { xp: 200, name: 'Wirbeltier', pw: 'hat eine Wirbelsäule' },
  { xp: 380, name: 'Säugetier', pw: 'säugt die Jungen' },
  { xp: 620, name: 'Darwinfink', pw: 'passt sich an' },
  { xp: 920, name: 'Evolutionsprofi', pw: 'versteht die Zusammenhänge' }
];

/* ---------- Thema: 9_6 Evolution nachvollziehen ---------- */
const TOPIC = {
  id: 'nt9-6', storeKey: 'halingen-nt9-6-v1', other: { title: '9_5 Genetik und Gentechnik verstehen', href: '9_5_Genetik_und_Gentechnik_verstehen.html' },
  title: 'Evolution nachvollziehen', lead: 'Erdgeschichte, Stammbäume und Selektion', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Survival of the fittest heisst: am besten angepasst.', 'Nicht das Einzelne verändert sich, sondern die Art.'],
  formulas: [
    ['Homologie', 'gleicher Aufbau', 'gemeinsamer Ursprung'],
    ['Analogie', 'gleiche Funktion', 'anderer Aufbau'],
    ['Lamarck', 'erworbene Eigenschaften vererbt', 'widerlegt'],
    ['Darwin/Wallace', 'Variabilität + Selektion', 'anerkannt'],
    ['Artbildung', 'Isolation oder Spezialisierung', 'kein Austausch von Erbmaterial'],
    ['Faktoren', 'Variabilität, Selektion', 'Zufall, Isolation']
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
  homolog(el) {
    sorter(el, [
      { t: 'Der Arm des Menschen und der Flügel der Fledermaus', ok: ['ho'], why: 'Gleicher Knochenaufbau bei verschiedener Funktion: Homologie.' },
      { t: 'Die Flügel von Vogel und Insekt', ok: ['an'], why: 'Gleiche Funktion (Fliegen), aber unterschiedlicher Aufbau: Analogie.' },
      { t: 'Die Vorderbeine des Pferdes und die Arme des Menschen', ok: ['ho'], why: 'Beide haben denselben Knochenaufbau: Homologie.' },
      { t: 'Die Flosse des Hais und die Flosse des Wals', ok: ['an'], why: 'Beide dienen zum Schwimmen, sind aber verschieden gebaut: Analogie.' },
      { t: 'Die Vordergliedmasse des Maulwurfs (Grabschaufel) und die des Menschen', ok: ['ho'], why: 'Gleicher Aufbau, andere Funktion: Homologie.' }
    ], { ho: 'Homologie', an: 'Analogie' }, 'Gleicher Aufbau oder gleiche Funktion?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  giraffe(el) {
    sorter(el, [
      { t: 'Die Giraffen streckten ihre Hälse. Diese längeren Hälse gaben sie an die Nachkommen weiter.', ok: ['la'], why: 'Das ist die Vorstellung von Lamarck. Sie gilt als widerlegt.' },
      { t: 'Unter den Giraffen gibt es zufällig solche mit längerem und solche mit kürzerem Hals.', ok: ['da'], why: 'Zufällige Unterschiede sind die Grundlage der Theorie von Darwin und Wallace.' },
      { t: 'Bei knapper Nahrung überleben die Giraffen mit langem Hals eher.', ok: ['da'], why: 'Das ist die natürliche Selektion.' },
      { t: 'Im Lauf des Lebens erworbene Eigenschaften werden an die Nachkommen vererbt.', ok: ['la'], why: 'Das besagt die Theorie von Lamarck. Heute weiss man, dass das nicht stimmt.' },
      { t: 'Diese Theorie ist wissenschaftlich anerkannt.', ok: ['da'], why: 'Die Theorie von Darwin und Wallace bildet die Grundlage der heutigen Evolutionsforschung.' }
    ], { la: 'Lamarck', da: 'Darwin/Wallace' }, 'Welche Theorie ist gemeint?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  faktor(el) {
    sorter(el, [
      { t: 'Bei der Fortpflanzung werden Erbanlagen durchmischt (Rekombination).', ok: ['va'], why: 'Das erzeugt Variabilität.' },
      { t: 'Gut getarnte Käfer werden seltener gefressen.', ok: ['ns'], why: 'Das ist natürliche Selektion.' },
      { t: 'Weibchen bevorzugen Männchen mit schönen Federn.', ok: ['ss'], why: 'Das ist sexuelle Selektion.' },
      { t: 'Eine Überschwemmung tötet viele Tiere zufällig.', ok: ['zu'], why: 'Das ist ein Zufallseffekt.' },
      { t: 'Ein Gletscher trennt zwei Gruppen einer Art.', ok: ['is'], why: 'Das ist Isolation.' },
      { t: 'Eine Züchterin wählt nur die grössten Tiere zur Fortpflanzung aus.', ok: ['ks'], why: 'Das ist künstliche Selektion.' }
    ], { va: 'Variabilität', ns: 'Natürliche Selektion', ss: 'Sexuelle Selektion', zu: 'Zufall', is: 'Isolation', ks: 'Künstliche Selektion' }, 'Welcher Faktor wirkt?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  isolation(el) {
    sorter(el, [
      { t: 'Grauspecht und Grünspecht: Gletscher trennten die Vorfahren in der Eiszeit.', ok: ['ra'], why: 'Das ist eine räumliche Isolation.' },
      { t: 'Grasfrosch (März) und Wasserfrosch (Mai und Juni) paaren sich zu verschiedenen Zeiten.', ok: ['ja'], why: 'Das ist eine jahreszeitliche Isolation.' },
      { t: 'Darwinfinken haben sich auf unterschiedliche Nahrung spezialisiert.', ok: ['sp'], why: 'Das ist Spezialisierung (Nischenbildung).' },
      { t: 'Kärpflinge auf den Bahamas haben verschiedene Kieferformen für verschiedene Nahrung.', ok: ['sp'], why: 'Auch das ist Spezialisierung.' },
      { t: 'Ein Fluss trennt zwei Populationen einer Käferart.', ok: ['ra'], why: 'Das ist eine räumliche Isolation.' }
    ], { ra: 'Räumliche Isolation', ja: 'Jahreszeitliche Isolation', sp: 'Spezialisierung' }, 'Wie kommt es zur Artbildung?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  zeitstrahl(el) {
    const E = [
      [4500, 'Die Erde entsteht.'], [3700, 'Die ersten Lebewesen entstehen: Urbakterien.'], [3500, 'Erste Bakterien produzieren Sauerstoff.'],
      [2000, 'Sauerstoff reichert sich langsam in der Atmosphäre an. Viele Bakterien sterben, weil er für sie giftig ist.'], [1500, 'Lebewesen im Wasser nutzen den Sauerstoff für Energieumwandlungen.'],
      [700, 'Sauerstoff reichert sich stark an, die Ozonschicht entsteht und ermöglicht Leben an Land.'], [400, 'Erste Landpflanzen entstehen und produzieren zusätzlichen Sauerstoff.'],
      [350, 'Erste Wirbeltiere leben an Land.'], [250, 'Viele Vulkanausbrüche verringern den Sauerstoffgehalt. Viele Lebewesen sterben.'], [230, 'Die meisten Dinosaurier leben.'],
      [65, 'Seit dieser Zeit gibt es keine Dinosaurier mehr.'], [0.3, 'Seit etwa 300 000 Jahren gibt es den modernen Menschen.']
    ];
    el.innerHTML = `<div class="sim">${sl('zt', 'Ereignis', 1, E.length, 1, 1, '')}
      <div class="brow"><span class="bname">Zeit seit Erdentstehung</span><div class="btrack"><div class="bfill" id="zb"></div></div><b class="mono bval" id="zv"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const k = +$id('zt').value, e = E[k - 1];
      $id('ztv').textContent = String(k) + ' von ' + E.length;
      $id('zb').style.width = ((4500 - e[0]) / 4500 * 100) + '%';
      const lab = e[0] >= 1000 ? fmt(e[0] / 1000) + ' Mrd.' : (e[0] < 1 ? fmt(e[0] * 1000) + ' Tsd.' : fmt(e[0]) + ' Mio.');
      $id('zv').textContent = lab;
      $id('ro').innerHTML = `<b>Vor etwa ${lab} Jahren:</b> ${e[1]}`;
    }
    $id('zt').addEventListener('input', upd); $id('zb').style.width = '0%'; nf(el, upd);
  },

  selektion(el) {
    el.innerHTML = `<div class="sim">${sl('sg', 'Generation', 0, 6, 1, 0, '')}
      <div class="brow"><span class="bname">Grüne Käfer</span><div class="btrack"><div class="bfill" id="s1"></div></div><b class="mono bval" id="v1"></b></div>
      <div class="brow"><span class="bname">Braune Käfer</span><div class="btrack"><div class="bfill th" id="s2"></div></div><b class="mono bval" id="v2"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const n = +$id('sg').value; let g = 50, b = 50;
      for (let i = 0; i < n; i++) { const g2 = g * 0.9, b2 = b * 0.6, t = g2 + b2; g = g2 / t * 100; b = b2 / t * 100; }
      $id('sgv').textContent = String(n);
      $id('s1').style.width = g + '%'; $id('s2').style.width = b + '%';
      $id('v1').textContent = fmt(Math.round(g)) + ' %'; $id('v2').textContent = fmt(Math.round(b)) + ' %';
      $id('ro').innerHTML = `Nach ${n} Generationen sind etwa <b>${fmt(Math.round(g))} %</b> der Käfer grün. Grüne Käfer sind besser getarnt: Von ihnen überleben in jeder Generation mehr (Annahme: 90 % statt 60 %). Modell mit Beispielwerten.`;
    }
    $id('sg').addEventListener('input', upd); $id('s1').style.width = '50%'; $id('s2').style.width = '50%'; nf(el, upd);
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-6","titel":"Evolution nachvollziehen","kapitel":"NaTech 9, Kapitel 6","audio":"nt9-6"});
