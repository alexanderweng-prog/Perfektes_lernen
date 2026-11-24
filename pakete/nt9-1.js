// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_1_Optische_Phaenomene_erkunden.html
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

/* ---------- Inhalt: 9_1 Optische Phänomene erkunden, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_1 (ein Lehrerkommentar liegt nicht vor). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'o1', nr: 1, title: 'Licht und Sehen', sub: 'Wie Licht zum Auge kommt',
    items: [
      { id: 'o1-sehen', topic: 'Gegenstände sehen', make() {
        return mc('Wann siehst du einen Gegenstand, der selbst nicht leuchtet?', ['Wenn Licht auf ihn trifft, von ihm zurückgeworfen wird und in dein Auge gelangt.', 'Wenn das Auge Lichtstrahlen aussendet.', 'Wenn er sich bewegt.', 'Nur im Dunkeln.'],
          'Alle Gegenstände, die nicht selbst leuchten, siehst du nur durch Reflexion. Das Licht einer Lampe oder der Sonne trifft auf den Gegenstand und gelangt von dort in dein Auge.');
      } },
      { id: 'o1-quelle', topic: 'Lichtquellen und Reflexion', make() {
        return mc('Welcher Gegenstand ist eine Lichtquelle, welcher wird nur durch Reflexion gesehen?', ['Die Sonne leuchtet selbst. Ein Baum wird nur gesehen, weil er Licht reflektiert.', 'Der Baum leuchtet selbst, die Sonne reflektiert.', 'Beide leuchten selbst.', 'Beide reflektieren nur.'],
          'Lichtquellen wie Lampe und Sonne senden Licht aus. Alles andere sehen wir, weil es Licht von Lichtquellen zurückwirft.');
      } },
      { id: 'o1-gerade', topic: 'Lichtausbreitung', make() {
        return mc('Warum gibt es Schatten und warum wird es bei einer Sonnenfinsternis auf einem Teil der Erde dunkler?', ['Licht breitet sich geradlinig aus. Bei der Sonnenfinsternis schiebt sich der Mond vor die Sonne und schattet das Licht ab.', 'Licht breitet sich in Kurven aus.', 'Die Sonne schaltet sich ab.', 'Die Erde dreht sich plötzlich anders.'],
          'Weil Licht geradlinig läuft, entstehen hinter undurchsichtigen Gegenständen Schatten. Der Mond wirft bei einer Sonnenfinsternis einen Schatten auf die Erde.');
      } },
      { id: 'o1-fisch', topic: 'Speerfischer', make() {
        return mc('Ein Speerfischer will einen Fisch treffen. Wohin zielt er?', ['Tiefer als dahin, wo er den Fisch sieht, denn der Fisch erscheint angehoben.', 'Genau auf die Stelle, wo er den Fisch sieht.', 'Höher als dahin, wo er den Fisch sieht.', 'Es spielt keine Rolle.'],
          'Die Lichtstrahlen werden beim Übergang von Wasser in Luft gebrochen. Der Fisch erscheint dadurch höher, als er wirklich ist. Das Phänomen heisst optische Hebung.');
      } },
      { id: 'o1-linsen', topic: 'Linsenarten', make() {
        return mc('Was machen konvexe und konkave Linsen mit parallelen Lichtstrahlen?', ['Konvexe Linsen sammeln sie in einem Punkt. Konkave Linsen streuen sie.', 'Konvexe Linsen streuen sie, konkave sammeln sie.', 'Beide lassen sie unverändert.', 'Beide löschen das Licht.'],
          'Konvexe Linsen heissen auch Sammellinsen, konkave Linsen Zerstreuungslinsen.');
      } },
      { id: 'o1-taeuschung', topic: 'Optische Täuschung', make() {
        return mc('Zwei Linien wirken schief, sind aber parallel. Was zeigt das?', ['Die Wahrnehmung kann getäuscht werden. Mit einem Massstab lässt sich die Täuschung überprüfen.', 'Deine Augen sind kaputt.', 'Linien sind nie parallel.', 'Der Massstab lügt.'],
          'Optische Täuschungen entstehen in der Verarbeitung im Gehirn. Messen hilft, eine Täuschung zu erkennen.');
      } }
    ]
  },
  {
    id: 'o2', nr: 2, title: 'Spiegel und Reflexion', sub: 'Reflexionsgesetz und Spiegelbild',
    items: [
      { id: 'o2-gesetz', topic: 'Reflexionsgesetz', make() {
        return mc('Wie lautet das Reflexionsgesetz?', ['Der Einfallswinkel ist gleich dem Reflexionswinkel: α = α\'.', 'Der Reflexionswinkel ist doppelt so gross wie der Einfallswinkel.', 'Der Einfallswinkel ist immer 90°.', 'Der Strahl geht immer senkrecht zurück.'],
          'Beide Winkel misst du zum Lot, einer senkrecht auf dem Spiegel stehenden Hilfslinie am Auftreffpunkt.');
      } },
      { id: 'o2-reflex', topic: 'Reflexionswinkel', make() {
        const a = rnd([15, 20, 30, 45, 60, 75]);
        return num(`Ein Lichtstrahl trifft mit dem Einfallswinkel α = ${fmt(a)}° auf einen ebenen Spiegel. Wie gross ist der Reflexionswinkel α'?`, '°', a, 'Nach dem Reflexionsgesetz sind beide Winkel gleich gross.', `α' = α = ${fmt(a)}°`);
      } },
      { id: 'o2-zwei', topic: 'Winkel zwischen den Strahlen', ext: true, make() {
        const a = rnd([20, 30, 35, 40, 45]), g = 2 * a;
        return num(`Ein Lichtstrahl trifft mit dem Einfallswinkel α = ${fmt(a)}° auf einen ebenen Spiegel. Wie gross ist der Winkel zwischen dem einfallenden und dem reflektierten Strahl?`, '°', g, 'Beide Winkel liegen auf verschiedenen Seiten des Lots. Addiere sie.', `α + α' = ${fmt(a)}° + ${fmt(a)}° = ${fmt(g)}°`);
      } },
      { id: 'o2-abstand', topic: 'Abstand des Spiegelbilds', make() {
        const d = rnd([0.5, 1, 1.5, 2, 3]), t = 2 * d;
        return num(`Du stehst ${fmt(d)} m vor einem ebenen Spiegel. Das Spiegelbild erscheint genauso weit hinter dem Spiegel. Wie weit bist du von deinem Spiegelbild entfernt?`, 'm', t, 'Addiere den Abstand vor und hinter dem Spiegel.', `${fmt(d)} m + ${fmt(d)} m = ${fmt(t)} m`);
      } },
      { id: 'o2-virtuell', topic: 'Virtuelles Bild', make() {
        return mc('Warum nennt man ein Spiegelbild ein virtuelles Bild?', ['Weil die Lichtstrahlen so wirken, als kämen sie von Punkten hinter dem Spiegel. Dort ist aber nichts.', 'Weil es auf einem Bildschirm entsteht.', 'Weil man es berühren kann.', 'Weil es nur im Dunkeln entsteht.'],
          'Das Gehirn verlängert die in das Auge gelangenden Strahlen geradlinig nach hinten. Sie schneiden sich in den virtuellen Bildpunkten.');
      } },
      { id: 'o2-krumm', topic: 'Gekrümmte Spiegel', make() {
        return mc('Wie unterscheiden sich Wölbspiegel und Hohlspiegel?', ['Ein Wölbspiegel (Discokugel) streut das Licht. Ein Hohlspiegel (Kosmetikspiegel, Solarkocher) sammelt es.', 'Ein Wölbspiegel sammelt das Licht, ein Hohlspiegel streut es.', 'Beide sind ebene Spiegel.', 'Beide verschlucken das Licht.'],
          'Das Reflexionsgesetz gilt auch hier. Du kannst dir vorstellen, ein gekrümmter Spiegel bestehe aus vielen kleinen ebenen Spiegeln.');
      } }
    ]
  },
  {
    id: 'o3', nr: 3, title: 'Lichtbrechung', sub: 'Brechungsgesetz und optische Hebung',
    items: [
      { id: 'o3-dicht', topic: 'In dichteren Stoff', make() {
        return mc('Ein Lichtstrahl geht von Luft in Wasser. Wie ändert sich seine Richtung?', ['Er wird zum Lot hin gebrochen.', 'Er wird vom Lot weg gebrochen.', 'Er bleibt immer unverändert.', 'Er wird immer vollständig reflektiert.'],
          'Luft ist optisch dünner als Wasser. Beim Übergang in den optisch dichteren Stoff wird der Strahl zum Lot hin gebrochen. Der Brechungswinkel ist dann kleiner als der Einfallswinkel.');
      } },
      { id: 'o3-weg', topic: 'In dünneren Stoff', make() {
        return mc('Ein Lichtstrahl geht von Wasser in Luft. Wie ändert sich seine Richtung?', ['Er wird vom Lot weg gebrochen.', 'Er wird zum Lot hin gebrochen.', 'Er wird nicht gebrochen.', 'Er wird immer zum Spiegel.'],
          'Beim Übergang in den optisch dünneren Stoff wird der Strahl vom Lot weg gebrochen. Der Brechungswinkel ist grösser als der Einfallswinkel.');
      } },
      { id: 'o3-senkrecht', topic: 'Senkrechter Einfall', make() {
        return mc('Ein Lichtstrahl trifft senkrecht auf die Grenzfläche von Luft und Wasser. Was geschieht?', ['Er wird nicht gebrochen und behält seine Richtung bei.', 'Er wird stark gebrochen.', 'Er wird vollständig reflektiert.', 'Er verschwindet.'],
          'Bei senkrechtem Einfall ist der Einfallswinkel null. Dann gibt es keine Richtungsänderung.');
      } },
      { id: 'o3-hebung', topic: 'Optische Hebung', make() {
        return mc('Du schaust von oben in ein Gefäss mit Wasser. Warum erscheint der Boden angehoben?', ['Die Lichtstrahlen werden beim Austritt aus dem Wasser vom Lot weg gebrochen. Dein Gehirn verlängert sie geradlinig und sieht den Boden höher.', 'Das Wasser drückt den Boden hoch.', 'Der Boden ist wirklich höher.', 'Das Auge vergrössert den Gegenstand.'],
          'Das ist die optische Hebung. Für dich erscheint ein Gegenstand im Wasser angehoben und etwas näher.');
      } },
      { id: 'o3-speer', topic: 'Schütze und Fisch', make() {
        return mc('Inés sagt: «Um beim Speerfischen den Fisch im Wasser zu treffen, muss ich über ihn zielen.» Hat sie recht?', ['Nein. Der Fisch erscheint höher, als er ist. Sie muss tiefer zielen.', 'Ja, sie muss höher zielen.', 'Ja, aber nur im Winter.', 'Es gibt keinen Unterschied.'],
          'Der scheinbare Ort des Fisches liegt höher als sein wirklicher Ort. Wer auf den scheinbaren Ort zielt, trifft darüber hinweg.');
      } },
      { id: 'o3-lot', topic: 'Winkel zum Lot', make() {
        const g = rnd([20, 30, 45, 60, 70]), a = 90 - g;
        return num(`Ein Lichtstrahl trifft unter ${fmt(g)}° zur Wasseroberfläche auf (Winkel zwischen Strahl und Oberfläche). Wie gross ist der Einfallswinkel α zum Lot?`, '°', a, 'Das Lot steht senkrecht auf der Oberfläche. Ergänze den Winkel auf 90°.', `α = 90° − ${fmt(g)}° = ${fmt(a)}°`);
      } }
    ]
  },
  {
    id: 'o4', nr: 4, title: 'Totalreflexion', sub: 'Glasfaser und Fata Morgana',
    items: [
      { id: 'o4-total', topic: 'Totalreflexion', make() {
        return mc('Was ist Totalreflexion?', ['Das Licht wird an der Grenzfläche vollständig reflektiert, und es dringt kein Licht in den zweiten Stoff ein.', 'Das Licht wird vollständig absorbiert.', 'Das Licht wird immer geteilt.', 'Das Licht läuft unverändert weiter.'],
          'Totalreflexion tritt auf, wenn Licht aus einem optisch dichteren Stoff unter einem grossen Einfallswinkel auf einen optisch dünneren Stoff trifft.');
      } },
      { id: 'o4-richtung', topic: 'Bedingung der Totalreflexion', make() {
        return mc('In welcher Richtung kann Totalreflexion auftreten?', ['Beim Übergang vom optisch dichteren in den optisch dünneren Stoff, ab einem bestimmten Einfallswinkel.', 'Beim Übergang vom optisch dünneren in den dichteren Stoff.', 'Immer, bei jedem Winkel.', 'Nur bei senkrechtem Einfall.'],
          'Beim Übergang in den dichteren Stoff wird der Strahl zum Lot hin gebrochen. Dort gibt es immer einen gebrochenen Strahl.');
      } },
      { id: 'o4-glas', topic: 'Glasfasern', make() {
        return mc('Wie leitet eine Glasfaser Licht?', ['Das Licht wird im Kern durch Totalreflexion an der Grenze zum Mantel immer wieder zurückgeworfen.', 'Das Licht läuft durch ein Loch in der Mitte.', 'Das Licht wird absorbiert und wieder erzeugt.', 'Das Licht fliesst wie Wasser.'],
          'Glasfaserkabel nutzen die Totalreflexion. So lassen sich zum Beispiel Daten für das Internet mit Licht übertragen.');
      } },
      { id: 'o4-fata', topic: 'Fata Morgana', make() {
        return mc('Warum siehst du an heissen Tagen auf der Strasse scheinbar Pfützen?', ['Direkt über der Strasse liegt heisse, optisch dünnere Luft. Dort werden Lichtstrahlen vom Himmel total reflektiert, du siehst ein Spiegelbild des Himmels.', 'Es hat wirklich Wasser auf der Strasse.', 'Die Strasse leuchtet selbst.', 'Das Auge erfindet Pfützen immer.'],
          'Das Phänomen heisst Luftspiegelung oder Fata Morgana. Sie entsteht nicht nur in der Wüste.');
      } },
      { id: 'o4-diamant', topic: 'Diamant', make() {
        return mc('Warum funkelt ein geschliffener Diamant in allen Farben?', ['Das Licht wird im Stein mehrfach gebrochen und total reflektiert. Dabei wird es in seine farbigen Anteile zerlegt.', 'Der Diamant leuchtet selbst.', 'Der Diamant ist farbig angemalt.', 'Der Diamant erzeugt neue Farben aus Dunkelheit.'],
          'Die Schliffflächen lenken das Licht durch Totalreflexion im Stein um. Weil die Farben verschieden stark gebrochen werden, entstehen farbige Blitze.');
      } },
      { id: 'o4-muenze', topic: 'Münze im Glas', make() {
        return mc('Eine Münze liegt unter einem mit Wasser gefüllten Glas. Warum siehst du sie von der Seite nicht?', ['Das Licht von der Münze wird an der Grenzfläche total reflektiert und gelangt nicht in dein Auge.', 'Die Münze löst sich im Wasser auf.', 'Das Glas ist undurchsichtig.', 'Das Wasser ist zu kalt.'],
          'Bei schrägem Blick trifft das Licht im Glas unter einem so grossen Winkel auf die Grenzfläche, dass Totalreflexion eintritt.');
      } }
    ]
  },
  {
    id: 'o5', nr: 5, title: 'Linsen und optische Geräte', sub: 'Abbildung, Kamera, Lupe',
    items: [
      { id: 'o5-brenn', topic: 'Brennpunkt und Brennweite', make() {
        return mc('Was sind Brennpunkt und Brennweite einer konvexen Linse?', ['Im Brennpunkt treffen sich parallele Lichtstrahlen. Die Brennweite ist der Abstand von der Linse zum Brennpunkt.', 'Der Brennpunkt ist die Mitte der Linse.', 'Die Brennweite ist der Durchmesser der Linse.', 'Beides sind Farben.'],
          'Eine konvexe Linse bricht parallele Strahlen so, dass sie sich im Brennpunkt F treffen. Der Abstand von der Linse zu F heisst Brennweite f.');
      } },
      { id: 'o5-lupe', topic: 'Lupe', make() {
        return mc('Wie funktioniert eine Lupe?', ['Sie ist eine konvexe Linse. Der Gegenstand befindet sich innerhalb der Brennweite, du siehst ein vergrössertes virtuelles Bild.', 'Sie ist eine konkave Linse.', 'Der Gegenstand muss weit weg sein.', 'Sie verkleinert immer.'],
          'Eine gute Vergrösserung erhältst du mit Lupen, die eine kleine Brennweite haben, zum Beispiel kleiner als 15 cm.');
      } },
      { id: 'o5-abbild', topic: 'Abbildung durch eine konvexe Linse', make() {
        return mc('Du bildest mit einer konvexen Linse einen Gegenstand ab, der weit ausserhalb der doppelten Brennweite steht. Wie ist das Bild?', ['Verkleinert und umgekehrt.', 'Vergrössert und aufrecht.', 'Genau gleich gross wie der Gegenstand.', 'Es gibt kein Bild.'],
          'Steht der Gegenstand weit weg, entsteht ein verkleinertes, umgekehrtes Bild, wie in einer Kamera. Zwischen einfacher und doppelter Brennweite wird das Bild vergrössert.');
      } },
      { id: 'o5-kamera', topic: 'Kamera', make() {
        return mc('Welche Bestandteile hat eine Kamera und was bewirkt die Blende?', ['Objektiv (Linse oder Linsensystem mit Blende), Bildsensor und Speichermedium. Die Blende regelt, wie viel Licht auf den Bildsensor trifft.', 'Nur ein Spiegel.', 'Nur ein Bildschirm.', 'Die Blende speichert die Bilder.'],
          'Das Objektiv bricht das Licht. Auf dem Bildsensor entsteht das Bild. Bei Digitalkameras wird es gespeichert.');
      } },
      { id: 'o5-auge', topic: 'Auge und Kamera', make() {
        return mc('Welcher Vergleich zwischen Auge und Kamera passt?', ['Die Linse im Auge und das Objektiv der Kamera bilden den Gegenstand ab. Der Bildsensor entspricht der Netzhaut, die Blende der Pupille.', 'Die Netzhaut entspricht dem Speicher, die Pupille dem Objektiv.', 'Es gibt keine Gemeinsamkeit.', 'Das Auge hat keine Linse.'],
          'Beide bilden mit einer Linse ein Bild ab und regeln das einfallende Licht. Unterschiede: Das Auge passt sich selbst an (Akkommodation), und das Gehirn verarbeitet das Bild.');
      } },
      { id: 'o5-geraet', topic: 'Optische Geräte', make() {
        return mc('Welche Aussage passt zu den optischen Geräten?', ['Mikroskop, Fernrohr, Beamer und Kamera nutzen Linsen oder Linsensysteme.', 'Sie nutzen nur ebene Spiegel.', 'Sie funktionieren ohne Licht.', 'Sie brauchen immer Strom.'],
          'Im Mikroskop und im Kepler-Fernrohr arbeiten mehrere Linsen zusammen. Auch ein Mini-Beamer fürs Smartphone nutzt eine Linse.');
      } }
    ]
  },
  {
    id: 'o6', nr: 6, title: 'Farben und Licht', sub: 'Farbmischung, Spektrum, Täuschung',
    items: [
      { id: 'o6-add', topic: 'Additive Farbmischung', make() {
        return mc('Du mischst rotes und grünes Licht in gleichen Anteilen. Welche Farbe siehst du?', ['Gelb.', 'Magenta.', 'Cyan.', 'Weiss.'],
          'Rot + Grün ergibt Gelb. Rot + Blau ergibt Magenta. Grün + Blau ergibt Cyan. Alle drei in gleichen Anteilen ergeben Weiss.');
      } },
      { id: 'o6-weiss', topic: 'Weiss und Schwarz', make() {
        return mc('Wann siehst du Weiss und wann Schwarz?', ['Weiss, wenn alle drei Zapfenarten gleich stark angeregt werden. Schwarz, wenn keine angeregt wird.', 'Schwarz, wenn alle Zapfen stark angeregt werden.', 'Weiss entsteht durch Mischen von Rot und Grün.', 'Weiss und Schwarz gibt es nicht.'],
          'Das Farbsehen im Auge funktioniert nach demselben Prinzip wie die additive Farbmischung.');
      } },
      { id: 'o6-rgb', topic: 'RGB-Farbmodell', make() {
        return mc('Wie erzeugt ein Bildschirm alle Farben?', ['Mit Punkten, die rot, grün und blau leuchten und verschieden stark angesteuert werden (RGB-Farbmodell).', 'Mit gelben, roten und schwarzen Farben.', 'Mit einem Prisma.', 'Mit gemalten Pixeln.'],
          'Die Grundfarben der additiven Farbmischung sind Rot, Grün und Blau. Das RGB-Farbmodell gibt die Anteile dieser drei Farben an.');
      } },
      { id: 'o6-prisma', topic: 'Spektrum', make() {
        return mc('Wie zerlegt ein Prisma weisses Licht und welches Licht wird am stärksten gebrochen?', ['Die farbigen Anteile werden verschieden stark gebrochen. Blaues Licht wird am stärksten, rotes am wenigsten gebrochen.', 'Rotes Licht wird am stärksten gebrochen.', 'Alle Farben werden gleich gebrochen.', 'Das Prisma färbt das Licht ein.'],
          'Weisses Licht besteht aus verschiedenfarbigen Anteilen. Beim Übergang in Glas überlagern sie sich nicht mehr, du siehst das Spektrum.');
      } },
      { id: 'o6-zapfen', topic: 'Zapfen im Auge', make() {
        return mc('Wie viele Zapfenarten hat das Auge und wofür sind sie empfindlich?', ['Drei Arten, die für rotes, grünes oder blaues Licht besonders empfindlich sind.', 'Eine Art für alle Farben.', 'Sieben Arten, eine pro Regenbogenfarbe.', 'Zapfen gibt es nur bei Tieren.'],
          'Welche Farbe du siehst, hängt davon ab, welche Zapfen wie stark angeregt werden.');
      } },
      { id: 'o6-stoerung', topic: 'Farbsehstörung', make() {
        return mc('Was bedeutet eine Farbsehstörung (oft Farbenblindheit genannt)?', ['Eine Zapfenart fehlt, darum werden manche Farben weniger gut gesehen.', 'Das Auge sieht nur Schwarzweiss.', 'Es gibt dann keine Netzhaut.', 'Das Gehirn fehlt.'],
          'Meist fehlt eine der drei Zapfenarten. Betroffene sehen die meisten Farben, unterscheiden manche aber schlechter.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  o1: [
    { h: 'Wie du Dinge siehst',
      body: `<p>Du siehst Gegenstände, weil Lichtstrahlen von einer Lichtquelle auf sie treffen, <b>zurückgeworfen</b> werden und in dein Auge gelangen.</p>
        ${merk('Lichtquellen (Sonne, Lampe) leuchten selbst. Alles andere siehst du nur durch <b>Reflexion</b>. Licht breitet sich <b>geradlinig</b> aus, darum gibt es Schatten.')}` },
    { h: 'Reflexion, Brechung oder Totalreflexion?',
      body: '<p>Ordne die Alltagsbeispiele dem passenden Phänomen zu.</p>', sim: 'phaenomen' },
    { h: 'Was dich in diesem Kapitel erwartet',
      body: `<ul><li><b>Spiegel:</b> Reflexionsgesetz und Spiegelbild.</li><li><b>Brechung:</b> Wasser, Glas und die optische Hebung.</li><li><b>Totalreflexion:</b> Glasfaser und Fata Morgana.</li><li><b>Linsen:</b> Lupe, Kamera, Auge.</li><li><b>Farben:</b> additive Farbmischung und das Spektrum.</li></ul>
        <p>Unsere Wahrnehmung kann auch <b>getäuscht</b> werden. Überprüfe Eindrücke immer mit Messungen.</p>` },
    { h: 'Beispiel durchdacht: Der Speerfischer', worked: {
      given: 'Ein Speerfischer sieht einen Fisch im Wasser. Wohin muss er zielen?',
      steps: [['Was passiert mit dem Licht?', 'Es geht vom Fisch aus dem Wasser (dichter) in die Luft (dünner) und wird vom Lot weg gebrochen.'], ['Was sieht der Fischer?', 'Sein Gehirn verlängert die Strahlen geradlinig. Der Fisch erscheint höher und näher.'], ['Antwort', 'Er muss tiefer zielen als dorthin, wo er den Fisch sieht.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum siehst du einen Baum?',
        options: ['Er reflektiert Licht der Sonne, das in dein Auge gelangt.', 'Er leuchtet selbst.', 'Dein Auge sendet Strahlen zum Baum.', 'Du siehst ihn nur im Dunkeln.'],
        explain: 'Der Baum ist keine Lichtquelle. Du siehst ihn, weil er Licht zurückwirft.' } }
  ],
  o2: [
    { h: 'Das Reflexionsgesetz',
      body: `${merk('<b>Einfallswinkel α = Reflexionswinkel α\'</b><br>Beide Winkel misst du zum <b>Lot</b>, einer gedachten Linie senkrecht zum Spiegel.')}
        <p>Das gilt für sehr glatte Oberflächen wie einen ebenen Spiegel oder ruhiges Wasser.</p>` },
    { h: 'Lenke einen Lichtstrahl',
      body: '<p>Verändere den Einfallswinkel und beobachte den reflektierten Strahl. Das ist ein Modell.</p>', sim: 'reflex' },
    { h: 'Das Spiegelbild',
      body: `<p>Die Strahlen von einem Punkt des Gegenstands werden nach dem Reflexionsgesetz reflektiert. Verlängerst du sie nach hinten, schneiden sie sich im <b>virtuellen Bildpunkt</b>.</p>
        ${merk('Das Spiegelbild steht <b>genauso weit hinter dem Spiegel</b>, wie der Gegenstand davor steht.')}` },
    { h: 'Wie weit weg ist dein Bild?',
      body: '<p>Verschiebe den Gegenstand. Beobachte den Abstand zum Spiegelbild.</p>', sim: 'spiegelbild' },
    { h: 'Gekrümmte Spiegel',
      body: `<ul><li><b>Wölbspiegel</b> (nach aussen gekrümmt, Konvexspiegel): streut das Licht, zum Beispiel eine Discokugel.</li>
        <li><b>Hohlspiegel</b> (nach innen gekrümmt, Konkavspiegel): sammelt das Licht in einem Punkt, zum Beispiel ein Kosmetikspiegel oder ein Solarkocher.</li></ul>` },
    { h: 'Kurz testen',
      check: { q: 'Du stehst 2 m vor einem Spiegel. Wie weit ist dein Spiegelbild von dir entfernt?',
        options: ['4 m', '2 m', '1 m', '0 m'],
        explain: 'Das Spiegelbild steht 2 m hinter dem Spiegel. Zusammen ergibt das 4 m.' } }
  ],
  o3: [
    { h: 'Das Brechungsgesetz',
      body: `<p>Trifft Licht auf eine Grenzfläche zwischen zwei Stoffen, wird ein Teil reflektiert, ein Teil <b>gebrochen</b>.</p>
        ${merk('Von <b>dünner nach dichter</b> (Luft → Wasser): Strahl wird <b>zum Lot hin</b> gebrochen.<br>Von <b>dichter nach dünner</b> (Wasser → Luft): Strahl wird <b>vom Lot weg</b> gebrochen.<br>Bei <b>senkrechtem</b> Einfall gibt es keine Brechung.')}` },
    { h: 'Beobachte die Brechung',
      body: '<p>Wähle die Richtung und den Einfallswinkel. Die Zahlen sind aus einem Modell berechnet (Wasser).</p>', sim: 'brechung' },
    { h: 'Die optische Hebung',
      body: `<p>Der Boden eines Gefässes mit Wasser erscheint <b>angehoben</b>. Die Strahlen werden beim Übergang vom Wasser in die Luft vom Lot weg gebrochen. Das Gehirn verlängert sie geradlinig und sieht den Punkt höher.</p>
        <p>Darum muss ein Speerfischer tiefer zielen. Ein Schützenfisch sieht die Fliege über Wasser höher und muss tiefer zielen.</p>` },
    { h: 'Vorgerechnet: Winkel zum Lot', worked: {
      given: 'Ein Lichtstrahl trifft unter 30° zur Wasseroberfläche auf. Wie gross ist der Einfallswinkel zum Lot?',
      steps: [['Lot', 'Das Lot steht senkrecht (90°) auf der Oberfläche.'], ['Rechnung', '90° − 30° = 60°'], ['Antwort', 'Der Einfallswinkel α beträgt 60°.']] } },
    { h: 'Kurz testen',
      check: { q: 'Ein Lichtstrahl geht von Luft in Glas. Wie verhalten sich Einfalls- und Brechungswinkel?',
        options: ['Der Brechungswinkel ist kleiner als der Einfallswinkel.', 'Der Brechungswinkel ist grösser.', 'Beide sind immer gleich.', 'Der Brechungswinkel ist 90°.'],
        explain: 'Beim Übergang in den optisch dichteren Stoff wird der Strahl zum Lot hin gebrochen.' } }
  ],
  o4: [
    { h: 'Totalreflexion',
      body: `<p>Geht Licht von einem <b>dichteren</b> in einen <b>dünneren</b> Stoff, wird es vom Lot weg gebrochen. Ab einem bestimmten Einfallswinkel kommt kein gebrochener Strahl mehr heraus: Das Licht wird <b>vollständig reflektiert</b>.</p>
        ${merk('Totalreflexion gibt es nur beim Übergang von einem optisch dichteren in einen optisch dünneren Stoff.')}` },
    { h: 'Probiere es aus',
      body: '<p>Wähle «Wasser → Luft» und erhöhe den Einfallswinkel, bis die Totalreflexion eintritt.</p>', sim: 'brechung' },
    { h: 'Glasfasern',
      body: `<p>Eine Glasfaser hat einen <b>Kern</b> und einen <b>Mantel</b>. Das Licht wird im Kern durch Totalreflexion immer wieder zurückgeworfen und läuft so um Kurven. Damit werden Daten übertragen (Glasfasernetz) und in der Medizin Körperteile ausgeleuchtet.</p>` },
    { h: 'Fata Morgana und Diamant',
      body: `<p>Über einer heissen Strasse liegt heisse, optisch dünnere Luft. Lichtstrahlen vom Himmel werden dort total reflektiert. Du siehst das Spiegelbild des Himmels und denkst an Pfützen.</p>
        <p>Ein <b>Diamant</b> funkelt, weil das Licht im Stein durch Brechung und Totalreflexion mehrfach umgelenkt und in Farben zerlegt wird.</p>` },
    { h: 'Kurz testen',
      check: { q: 'In welchem Fall kann Totalreflexion auftreten?',
        options: ['Von Wasser in Luft bei grossem Einfallswinkel.', 'Von Luft in Wasser bei jedem Winkel.', 'Nur bei senkrechtem Einfall.', 'Nie.'],
        explain: 'Totalreflexion braucht den Übergang vom dichteren in den dünneren Stoff und einen genügend grossen Winkel.' } }
  ],
  o5: [
    { h: 'Konvexe Linse',
      body: `<p>Parallele Lichtstrahlen werden von einer konvexen Linse so gebrochen, dass sie sich im <b>Brennpunkt F</b> treffen. Die <b>Brennweite f</b> ist der Abstand von der Linse zum Brennpunkt.</p>
        <p>Eine <b>Lupe</b> ist eine konvexe Linse mit kleiner Brennweite (zum Beispiel unter 15 cm), bei der der Gegenstand innerhalb der Brennweite liegt.</p>` },
    { h: 'Wie die Linse abbildet',
      body: '<p>Verschiebe den Gegenstand vor einer Linse mit der Brennweite f. Die Bildart ändert sich mit seinem Abstand. Das ist ein Modell.</p>', sim: 'abbildung' },
    { h: 'Kamera und Auge',
      body: `<p>Eine <b>Kamera</b> hat ein Objektiv aus Linse(n) und einer Blende. Die Blende regelt die Lichtmenge. Auf dem Bildsensor entsteht das Bild, das gespeichert wird.</p>
        ${merk('Auge und Kamera: Linse ↔ Objektiv, Netzhaut ↔ Bildsensor, Pupille ↔ Blende.')}` },
    { h: 'Weitere optische Geräte',
      body: `<ul><li><b>Mikroskop:</b> zwei Linsensysteme (Objektiv und Okular) vergrössern.</li>
        <li><b>Kepler-Fernrohr:</b> zwei konvexe Linsen zeigen entfernte Gegenstände.</li>
        <li><b>Mini-Beamer:</b> eine Linse projiziert das Smartphone-Bild vergrössert an die Wand.</li></ul>` },
    { h: 'Kurz testen',
      check: { q: 'Was regelt die Blende in einer Kamera?',
        options: ['Wie viel Licht auf den Bildsensor trifft.', 'Wie weit die Kamera sieht.', 'Die Farbe der Bilder.', 'Wie viele Bilder gespeichert werden.'],
        explain: 'Die Blende ist ein Loch, das grösser oder kleiner gestellt werden kann. So steuert sie die Lichtmenge.' } }
  ],
  o6: [
    { h: 'Farben sehen',
      body: `<p>In deinem Auge gibt es drei Arten von <b>Zapfen</b>, die besonders empfindlich sind für rotes, grünes und blaues Licht. Welche Farbe du siehst, hängt davon ab, welche Zapfen wie stark angeregt werden.</p>
        <p>Wenn eine Zapfenart fehlt, sehen Betroffene manche Farben weniger gut (Farbsehstörung).</p>` },
    { h: 'Mische Licht',
      body: `${merk('<b>Additive Farbmischung:</b> Rot + Grün = Gelb, Rot + Blau = Magenta, Grün + Blau = Cyan, alle drei gleich stark = Weiss.')}
        <p>Verändere die Anteile und beobachte die Mischfarbe. Bildschirme nutzen dieses <b>RGB-Farbmodell</b>.</p>`, sim: 'farbmisch' },
    { h: 'Das Lichtspektrum',
      body: `<p>Weisses Licht besteht aus verschiedenfarbigen Anteilen. Beim Übergang in Glas oder Wasser werden die Farben verschieden stark gebrochen: <b>Rotes Licht am wenigsten, blaues am stärksten</b>. Ein <b>Prisma</b> zerlegt so weisses Licht in sein Spektrum.</p>
        <p>Ein Alltagsbeispiel ist ein Wasserglas im Sonnenlicht oder ein geschliffener Diamant.</p>` },
    { h: 'Vorgerechnet: Farben mischen', worked: {
      given: 'Ein Bildschirmpunkt leuchtet mit 100 % Rot, 100 % Grün und 0 % Blau. Welche Farbe siehst du?',
      steps: [['Zapfen', 'Rot- und Grün-Zapfen werden gleich stark angeregt, Blau-Zapfen nicht.'], ['Mischung', 'Rot + Grün in gleichen Anteilen'], ['Antwort', 'Du siehst Gelb.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Farbe entsteht bei gleichen Anteilen von Grün und Blau?',
        options: ['Cyan.', 'Gelb.', 'Magenta.', 'Weiss.'],
        explain: 'Grün + Blau ergibt Cyan. Rot + Blau gibt Magenta, Rot + Grün gibt Gelb.' } }
  ]
};
const GOALS = {
  o1: ['erklären, wie Gegenstände sichtbar werden', 'Reflexion, Brechung und Totalreflexion unterscheiden'],
  o2: ['das Reflexionsgesetz anwenden', 'Spiegelbild und gekrümmte Spiegel beschreiben'],
  o3: ['das Brechungsgesetz beschreiben', 'die optische Hebung erklären'],
  o4: ['Totalreflexion erklären', 'Anwendungen wie Glasfaser und Fata Morgana beschreiben'],
  o5: ['die Abbildung durch eine konvexe Linse beschreiben', 'Kamera und Auge vergleichen'],
  o6: ['additive Farbmischung anwenden', 'das Lichtspektrum erklären']
};
const LEARN = {
  'o1-sehen': 'Wie du Dinge siehst', 'o1-quelle': 'Wie du Dinge siehst', 'o1-gerade': 'Wie du Dinge siehst', 'o1-fisch': 'Beispiel durchdacht: Der Speerfischer', 'o1-linsen': 'Was dich in diesem Kapitel erwartet', 'o1-taeuschung': 'Was dich in diesem Kapitel erwartet',
  'o2-gesetz': 'Das Reflexionsgesetz', 'o2-reflex': 'Lenke einen Lichtstrahl', 'o2-zwei': 'Lenke einen Lichtstrahl', 'o2-abstand': 'Wie weit weg ist dein Bild?', 'o2-virtuell': 'Das Spiegelbild', 'o2-krumm': 'Gekrümmte Spiegel',
  'o3-dicht': 'Das Brechungsgesetz', 'o3-weg': 'Das Brechungsgesetz', 'o3-senkrecht': 'Das Brechungsgesetz', 'o3-hebung': 'Die optische Hebung', 'o3-speer': 'Die optische Hebung', 'o3-lot': 'Vorgerechnet: Winkel zum Lot',
  'o4-total': 'Totalreflexion', 'o4-richtung': 'Probiere es aus', 'o4-glas': 'Glasfasern', 'o4-fata': 'Fata Morgana und Diamant', 'o4-diamant': 'Fata Morgana und Diamant', 'o4-muenze': 'Totalreflexion',
  'o5-brenn': 'Konvexe Linse', 'o5-lupe': 'Konvexe Linse', 'o5-abbild': 'Wie die Linse abbildet', 'o5-kamera': 'Kamera und Auge', 'o5-auge': 'Kamera und Auge', 'o5-geraet': 'Weitere optische Geräte',
  'o6-add': 'Mische Licht', 'o6-weiss': 'Mische Licht', 'o6-rgb': 'Mische Licht', 'o6-prisma': 'Das Lichtspektrum', 'o6-zapfen': 'Farben sehen', 'o6-stoerung': 'Farben sehen'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Lichtpunkt', pw: 'leuchtet' },
  { xp: 80, name: 'Lichtstrahl', pw: 'geht geradeaus' },
  { xp: 200, name: 'Spiegel', pw: 'wirft zurück' },
  { xp: 380, name: 'Prisma', pw: 'zerlegt Licht' },
  { xp: 620, name: 'Linse', pw: 'bündelt Licht' },
  { xp: 920, name: 'Regenbogen', pw: 'zeigt alle Farben' }
];

/* ---------- Thema: 9_1 Optische Phänomene erkunden ---------- */
const TOPIC = {
  id: 'nt9-1', storeKey: 'halingen-nt9-1-v1', other: { title: '7_3 Reize und Sinne untersuchen', href: '7_3_Reize_und_Sinne_untersuchen.html' },
  title: 'Optische Phänomene erkunden', lead: 'Spiegel, Linsen, Brechung und Farben', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Beide Winkel misst du zum Lot.', 'Rot wird am wenigsten, Blau am stärksten gebrochen.'],
  formulas: [
    ['Reflexionsgesetz', 'α = α\'', 'beide Winkel zum Lot'],
    ['Spiegelbild', 'virtuell', 'gleich weit hinter dem Spiegel'],
    ['Brechung', 'dünn → dicht: zum Lot hin', 'dicht → dünn: vom Lot weg'],
    ['Totalreflexion', 'dicht → dünn', 'ab einem Grenzwinkel'],
    ['Konvexe Linse', 'sammelt im Brennpunkt', 'f = Abstand Linse bis Brennpunkt'],
    ['Farben', 'Rot + Grün = Gelb', 'Rot + Blau = Magenta, Grün + Blau = Cyan']
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
  phaenomen(el) {
    sorter(el, [
      { t: 'Dein Spiegelbild im Badezimmerspiegel', ok: ['re'], why: 'Das Licht wird am ebenen Spiegel reflektiert.' },
      { t: 'Ein Strohhalm sieht im Wasserglas geknickt aus', ok: ['br'], why: 'Das Licht wird beim Übergang zwischen Wasser und Luft gebrochen.' },
      { t: 'Ein Glasfaserkabel leitet Licht um Kurven', ok: ['to'], why: 'Im Kern wird das Licht durch Totalreflexion immer wieder zurückgeworfen.' },
      { t: 'Scheinbare Pfützen auf der heissen Strasse', ok: ['to'], why: 'An der heissen, optisch dünneren Luft wird Licht vom Himmel total reflektiert.' },
      { t: 'Eine Discokugel wirft Lichtpunkte in alle Richtungen', ok: ['re'], why: 'Die Kugel ist ein Wölbspiegel und reflektiert das Licht.' },
      { t: 'Eine Lupe vergrössert die Schrift', ok: ['br'], why: 'Die konvexe Linse bricht das Licht.' },
      { t: 'Ein Prisma zerlegt weisses Licht in Farben', ok: ['br'], why: 'Die Farben werden verschieden stark gebrochen.' }
    ], { re: 'Reflexion', br: 'Brechung', to: 'Totalreflexion' }, 'Welches Phänomen steckt dahinter?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  reflex(el) {
    el.innerHTML = `<div class="sim"><svg viewBox="0 0 300 140" class="lensvg" role="img" aria-label="Reflexion am Spiegel"><line x1="30" y1="110" x2="270" y2="110" class="mirror"/><line x1="150" y1="15" x2="150" y2="110" class="ax"/><line id="ri" x1="150" y1="110" x2="150" y2="15" class="ray"/><line id="rr" x1="150" y1="110" x2="150" y2="15" class="ray2"/></svg>
      ${sl('ra', 'Einfallswinkel α', 0, 80, 5, 40, '°')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const a = +$id('ra').value, L = 90, s = Math.sin(a * Math.PI / 180), c = Math.cos(a * Math.PI / 180);
      $id('rav').textContent = fmt(a);
      const set = (id, x2, y2) => { $id(id).setAttribute('x2', x2); $id(id).setAttribute('y2', y2); };
      set('ri', 150 - L * s, 110 - L * c); set('rr', 150 + L * s, 110 - L * c);
      $id('ro').innerHTML = `Einfallswinkel α = ${fmt(a)}°, Reflexionswinkel α' = <b>${fmt(a)}°</b>.<br>Winkel zwischen den Strahlen: ${fmt(2 * a)}°.`;
    }
    $id('ra').addEventListener('input', upd); upd();
  },

  spiegelbild(el) {
    el.innerHTML = `<div class="sim">${sl('sd', 'Abstand zum Spiegel', 1, 5, 1, 2, 'm')}
      <div class="brow"><span class="bname">Gegenstand bis Spiegel</span><div class="btrack"><div class="bfill" id="s1"></div></div><b class="mono bval" id="v1"></b></div>
      <div class="brow"><span class="bname">Spiegel bis Bild</span><div class="btrack"><div class="bfill th" id="s2"></div></div><b class="mono bval" id="v2"></b></div>
      <div class="trio"><div><span class="k">Gegenstand–Bild</span><b class="mono" id="v3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const d = +$id('sd').value;
      $id('sdv').textContent = fmt(d);
      $id('s1').style.width = (d * 20) + '%'; $id('s2').style.width = (d * 20) + '%';
      $id('v1').textContent = fmt(d) + ' m'; $id('v2').textContent = fmt(d) + ' m'; $id('v3').textContent = fmt(2 * d) + ' m';
      $id('ro').innerHTML = `Das Spiegelbild liegt ${fmt(d)} m hinter dem Spiegel. Du bist ${fmt(d)} m + ${fmt(d)} m = <b>${fmt(2 * d)} m</b> von deinem Spiegelbild entfernt.`;
    }
    $id('sd').addEventListener('input', upd); $id('s1').style.width = '0%'; $id('s2').style.width = '0%'; nf(el, upd);
  },

  brechung(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Richtung"><button class="btn sm on" data-m="in">Luft → Wasser</button><button class="btn sm" data-m="out">Wasser → Luft</button></div>
      <svg viewBox="0 0 300 160" class="lensvg" role="img" aria-label="Brechung an der Wasseroberfläche"><rect x="20" y="80" width="260" height="70" class="water"/><line x1="20" y1="80" x2="280" y2="80" class="mirror"/><line x1="150" y1="10" x2="150" y2="150" class="ax"/><line id="bi" x1="150" y1="80" x2="150" y2="10" class="ray"/><line id="bb" x1="150" y1="80" x2="150" y2="150" class="ray2"/></svg>
      ${sl('ba', 'Einfallswinkel α', 0, 80, 5, 40, '°')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let mode = 'in';
    const n = 1.33, rad = x => x * Math.PI / 180, deg = x => x * 180 / Math.PI;
    function upd() {
      const a = +$id('ba').value, L = 70;
      $id('bav').textContent = fmt(a);
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
      const set = (id, x2, y2) => { $id(id).setAttribute('x2', x2); $id(id).setAttribute('y2', y2); };
      let txt;
      if (mode === 'in') {
        const b = deg(Math.asin(Math.sin(rad(a)) / n));
        set('bi', 150 - L * Math.sin(rad(a)), 80 - L * Math.cos(rad(a)));
        set('bb', 150 + L * Math.sin(rad(b)), 80 + L * Math.cos(rad(b)));
        txt = `Luft → Wasser: Einfallswinkel ${fmt(a)}°, Brechungswinkel <b>${fmt(Math.round(b))}°</b>. Der Strahl wird <b>zum Lot hin</b> gebrochen.`;
      } else {
        const s = Math.sin(rad(a)) * n;
        $id('bi').setAttribute('x1', 150); $id('bi').setAttribute('y1', 80);
        set('bi', 150 - L * Math.sin(rad(a)), 80 + L * Math.cos(rad(a)));
        if (s >= 1) { set('bb', 150 + L * Math.sin(rad(a)), 80 + L * Math.cos(rad(a))); txt = `Wasser → Luft bei ${fmt(a)}°: <b>Totalreflexion</b>. Das Licht wird vollständig zurückgeworfen.`; }
        else { const b = deg(Math.asin(s)); set('bb', 150 + L * Math.sin(rad(b)), 80 - L * Math.cos(rad(b))); txt = `Wasser → Luft: Einfallswinkel ${fmt(a)}°, Brechungswinkel <b>${fmt(Math.round(b))}°</b>. Der Strahl wird <b>vom Lot weg</b> gebrochen.`; }
      }
      if (mode === 'in') { $id('bi').setAttribute('x1', 150); $id('bi').setAttribute('y1', 80); }
      $id('ro').innerHTML = txt + '<br>Modell mit Wasser (Beispielwerte).';
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; upd(); }));
    $id('ba').addEventListener('input', upd); upd();
  },

  abbildung(el) {
    el.innerHTML = `<div class="sim">${sl('ag', 'Abstand des Gegenstands (in Brennweiten f)', 1, 6, 1, 4, '')}
      <p class="small">Stufen: 1 = 0,5 f, 2 = f, 3 = 1,5 f, 4 = 2 f, 5 = 3 f, 6 = 4 f</p>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    const T = [
      ['0,5 f', 'Der Gegenstand steht innerhalb der Brennweite: Du siehst ein <b>vergrössertes, aufrechtes, virtuelles Bild</b>. Das ist die Lupe.'],
      ['f', 'Der Gegenstand steht genau im Brennpunkt: Die Strahlen verlassen die Linse parallel. Es entsteht <b>kein Bild</b>.'],
      ['1,5 f', 'Der Gegenstand steht zwischen f und 2 f: Es entsteht ein <b>vergrössertes, umgekehrtes Bild</b>. So arbeitet ein Beamer.'],
      ['2 f', 'Der Gegenstand steht bei 2 f: Das Bild ist <b>gleich gross</b> wie der Gegenstand und umgekehrt.'],
      ['3 f', 'Der Gegenstand steht weit weg: Das Bild ist <b>verkleinert und umgekehrt</b>. So arbeitet eine Kamera.'],
      ['4 f', 'Der Gegenstand steht sehr weit weg: Das Bild ist <b>stark verkleinert und umgekehrt</b>.']
    ];
    function upd() {
      const k = +$id('ag').value;
      $id('agv').textContent = T[k - 1][0];
      $id('ro').innerHTML = T[k - 1][1] + '<br>Qualitatives Modell.';
    }
    $id('ag').addEventListener('input', upd); upd();
  },

  farbmisch(el) {
    el.innerHTML = `<div class="sim"><div class="swatch" id="sw" aria-hidden="true"></div>
      ${sl('cr', 'Rotes Licht', 0, 100, 10, 100, '%')}${sl('cg', 'Grünes Licht', 0, 100, 10, 100, '%')}${sl('cb', 'Blaues Licht', 0, 100, 10, 0, '%')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const r = +$id('cr').value, g = +$id('cg').value, b = +$id('cb').value;
      $id('crv').textContent = fmt(r); $id('cgv').textContent = fmt(g); $id('cbv').textContent = fmt(b);
      $id('sw').style.background = `rgb(${Math.round(r * 2.55)}, ${Math.round(g * 2.55)}, ${Math.round(b * 2.55)})`;
      const hi = x => x >= 60, lo = x => x <= 20; let n;
      if (lo(r) && lo(g) && lo(b)) n = 'Schwarz'; else if (hi(r) && hi(g) && hi(b) && Math.max(r, g, b) - Math.min(r, g, b) <= 20) n = 'Weiss';
      else if (hi(r) && hi(g) && lo(b)) n = 'Gelb'; else if (hi(r) && hi(b) && lo(g)) n = 'Magenta'; else if (hi(g) && hi(b) && lo(r)) n = 'Cyan';
      else if (hi(r) && lo(g) && lo(b)) n = 'Rot'; else if (hi(g) && lo(r) && lo(b)) n = 'Grün'; else if (hi(b) && lo(r) && lo(g)) n = 'Blau'; else n = 'eine Mischfarbe';
      $id('ro').innerHTML = `Rot ${r} %, Grün ${g} %, Blau ${b} %: Du siehst <b>${n}</b>.<br>Additive Farbmischung (RGB-Farbmodell). Die Farbe am Bildschirm ist ein Modell und kann je nach Gerät leicht abweichen.`;
    }
    ['cr', 'cg', 'cb'].forEach(id => $id(id).addEventListener('input', upd)); upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-1","titel":"Optische Phänomene erkunden","kapitel":"NaTech 9, Kapitel 1","audio":"nt9-1"});
