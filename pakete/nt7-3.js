// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/7_3_Reize_und_Sinne_untersuchen.html
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

/* ---------- Inhalt: 7_3 Reize und Sinne untersuchen, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 'r1', nr: 1, title: 'Sinne und ihr Zusammenspiel', sub: 'Geschmack, Aroma und Sinnesorgane',
    items: [
      { id: 'r1-geschmack', topic: 'Geschmacksrichtungen', make() {
        return mc('Welche Geschmacksrichtungen nimmst du mit dem Mund wahr?', ['Süss, sauer, salzig, bitter und umami.', 'Nur süss und sauer.', 'Süss, scharf und heiss.', 'Nur salzig.'],
          'Süss, sauer, salzig, bitter und umami (würzig, herzhaft) sind Geschmacksrichtungen. «Scharf» gehört nicht dazu: Es ist ein Schmerzempfinden in Mund und Rachen.');
      } },
      { id: 'r1-aroma', topic: 'Geschmack und Aroma', make() {
        return mc('Was ist der Unterschied zwischen Geschmack und Aroma?', ['Geschmack nimmst du nur mit dem Mund wahr. Das Aroma entsteht im Zusammenspiel mit dem Geruchssinn.', 'Geschmack und Aroma sind dasselbe.', 'Aroma nimmst du nur mit den Augen wahr.', 'Geschmack entsteht nur in der Nase.'],
          'Naturwissenschaftlich meint Geschmack nur die chemischen Wahrnehmungen im Mund, vor allem auf der Zunge. Das Aroma von Essen entsteht, weil auch der Geruch mitspielt.');
      } },
      { id: 'r1-nase', topic: 'Nase zuhalten', make() {
        return mc('Du hältst dir die Nase zu und trinkst Limonade. Warum schmeckst du weniger?', ['Der Geruchssinn fehlt, darum nimmst du das Aroma kaum wahr.', 'Die Zunge funktioniert nicht mehr.', 'Das Getränk wird kälter.', 'Die Augen helfen nicht mehr.'],
          'Ohne den Geruch fehlt ein wichtiger Teil des Aromas. Aus demselben Grund schmeckt Essen bei Schnupfen fade.');
      } },
      { id: 'r1-zunge', topic: 'Zungenkarte', make() {
        return mc('Eine alte Vorstellung sagt: Süss schmeckt man nur vorn, bitter nur hinten. Wie beurteilst du das?', ['Das ist widerlegt: Alle Geschmacksrichtungen lassen sich in den geschmacksempfindlichen Bereichen etwa gleich wahrnehmen.', 'Das stimmt genau so.', 'Das stimmt nur für Salz.', 'Das stimmt nur bei Kindern.'],
          'Die «Zungenkarte» ist seit vielen Jahren widerlegt. Sinneszellen für Geschmack gibt es auch in Mundhöhle, Rachen und Schlund.');
      } },
      { id: 'r1-scharf', topic: 'Was ist scharf?', make() {
        return mc('Was bedeutet «scharf», zum Beispiel bei Chili?', ['Ein Schmerzempfinden in Mund und Rachen, keine Geschmacksrichtung.', 'Eine Geschmacksrichtung wie süss.', 'Ein Geruch.', 'Ein Geräusch.'],
          'Schärfe ist keine Geschmacksrichtung. Sie wird als Schmerz wahrgenommen.');
      } },
      { id: 'r1-sinne', topic: 'Sinne zusammen nutzen', make() {
        return mc('Warum sagt man Kindern «luege, lose, laufe»?', ['Weil man im Strassenverkehr mehrere Sinne gleichzeitig nutzen sollte.', 'Weil man nur den Sehsinn braucht.', 'Weil Hören unwichtig ist.', 'Weil man dann schneller läuft.'],
          'Augen und Ohren ergänzen sich. Oft hörst du ein Auto, bevor du es siehst, zum Beispiel hinter einer Hausecke.');
      } }
    ]
  },
  {
    id: 'r2', nr: 2, title: 'Reize und Reaktionen', sub: 'Reflexe und bewusste Reaktionen',
    items: [
      { id: 'r2-schema', topic: 'Reiz-Reaktions-Schema', make() {
        return mc('Welche Reihenfolge beschreibt eine Reaktion auf einen Reiz?', ['Reiz, Sinnesorgan, Nerven, Gehirn, Nerven, Muskel, Reaktion.', 'Reaktion, Muskel, Gehirn, Sinnesorgan, Reiz.', 'Gehirn, Reiz, Muskel, Nerven, Sinnesorgan.', 'Muskel, Reiz, Reaktion, Gehirn.'],
          'Ein Sinnesorgan nimmt den Reiz auf. Nerven leiten die Information zum Gehirn. Das Gehirn verarbeitet sie. Wieder über Nerven wird ein Muskel (oder eine Drüse) angesteuert, und es kommt zur Reaktion.');
      } },
      { id: 'r2-reflex', topic: 'Was ist ein Reflex?', make() {
        return mc('Was ist ein Reflex?', ['Eine schnelle, angeborene Reaktion, bei der das Gehirn nicht beteiligt ist und die über das Rückenmark läuft.', 'Eine bewusste Entscheidung.', 'Eine Reaktion, die man lernen muss.', 'Eine langsame Reaktion über das Gehirn.'],
          'Reflexe schützen den Körper. Die Information wird im Rückenmark umgeschaltet, nicht erst im Gehirn.');
      } },
      { id: 'r2-herdplatte', topic: 'Reflex erkennen', make() {
        return mc('Du ziehst die Hand von einer heissen Herdplatte weg, noch bevor du den Schmerz bewusst spürst. Was ist das?', ['Ein Reflex.', 'Eine bewusste Reaktion.', 'Eine gelernte Reaktion.', 'Eine Reaktion ohne Reiz.'],
          'Die schnelle Rückzugsbewegung ist ein Schutzreflex. Erst danach nimmst du den Schmerz bewusst wahr.');
      } },
      { id: 'r2-bewusst', topic: 'Bewusste Reaktion', make() {
        return mc('Welche Reaktion ist bewusst?', ['Du entscheidest, mit der Hand eine Fliege zu verscheuchen.', 'Der Lidschlag bei Staub im Auge.', 'Das Zusammenziehen der Pupille bei hellem Licht.', 'Der Herzschlag.'],
          'Bewusste Reaktionen steuerst du über das Gehirn und kannst sie willentlich entscheiden. Lidschluss, Pupillenreflex und Herzschlag laufen von selbst.');
      } },
      { id: 'r2-schnell', topic: 'Reflexe sind schnell', make() {
        return mc('Warum ist ein Reflex schneller als eine normale Reaktion?', ['Weil die Information im Rückenmark umgeschaltet wird und nicht den Weg über das Gehirn nimmt.', 'Weil der Reiz stärker ist.', 'Weil das Gehirn schneller denkt.', 'Weil Muskeln im Rückenmark liegen.'],
          'Der kürzere Weg spart Zeit. Das ist bei Schutzreflexen wichtig, wenn jede Zehntelsekunde zählt.');
      } },
      { id: 'r2-impulse', topic: 'Nervenimpulse zählen', ext: true, make() {
        const s = rnd([[10, 2], [20, 3], [40, 5], [50, 4], [100, 2], [20, 10]]), n = s[0] * s[1];
        return num(`Bei einem Reiz sendet eine Nervenzelle ${fmt(s[0])} Nervenimpulse pro Sekunde (Beispielwert). Wie viele Impulse sind es in ${fmt(s[1])} Sekunden?`, 'Impulse', n, 'Multipliziere die Impulse pro Sekunde mit der Zeit.', `${fmt(s[0])} · ${fmt(s[1])} = ${fmt(n)} Impulse`);
      } }
    ]
  },
  {
    id: 'r3', nr: 3, title: 'Hören und Schall', sub: 'Richtungshören, Schallausbreitung',
    items: [
      { id: 'r3-richtung', topic: 'Richtungshören', make() {
        return mc('Ein Geräusch kommt von links. Warum erkennst du die Richtung?', ['Der Schall erreicht das linke Ohr früher und kräftiger als das rechte.', 'Das rechte Ohr hört nichts.', 'Das Gehirn rät die Richtung.', 'Die Augen verraten es.'],
          'Weil die Strecke zum linken Ohr kürzer ist, kommt der Schall dort zuerst an. Das Gehirn vergleicht die beiden Signale.');
      } },
      { id: 'r3-schall', topic: 'Was ist Schall?', make() {
        return mc('Wie breitet sich Schall in der Luft aus?', ['Als fortschreitende Verdichtung der Luft: Luftteilchen schwingen hin und her.', 'Als Wind, der von der Quelle zu dir bläst.', 'Als Licht, das hörbar wird.', 'Gar nicht, Schall braucht keine Luft.'],
          'Eine Schallquelle bringt Luftteilchen zum Schwingen. Die Verdichtungen wandern weiter, die Teilchen bleiben aber ungefähr an ihrem Ort.');
      } },
      { id: 'r3-teilchen', topic: 'Fliegen Luftteilchen ins Ohr?', make() {
        return mc('Fliegen Luftteilchen von der Schallquelle in dein Ohr?', ['Nein, sie schwingen nur hin und her und geben die Schwingung weiter.', 'Ja, sie fliegen direkt zum Trommelfell.', 'Ja, in einer geraden Linie.', 'Nein, sie werden durch Licht ersetzt.'],
          'Das ist eine verbreitete Fehlvorstellung. Nur die Schwingung wandert weiter, nicht die einzelnen Teilchen.');
      } },
      { id: 'r3-kerze', topic: 'Kerze vor Lautsprecher', make() {
        return mc('Eine Kerzenflamme steht vor einem Lautsprecher mit viel Bass und bewegt sich im Takt. Warum?', ['Die Membran bringt die Luftteilchen zum Schwingen, und diese bewegen die Flamme.', 'Der Lautsprecher bläst Wind.', 'Die Flamme hört die Musik.', 'Die Kerze wird von der Wärme bewegt.'],
          'Die Schwingungen der Lautsprechermembran übertragen sich auf die Luft und von dort auf die Flamme.');
      } },
      { id: 'r3-donner', topic: 'Entfernung des Gewitters', make() {
        const t = rnd([2, 3, 4, 5, 6, 10]), d = 340 * t;
        return num(`Zwischen Blitz und Donner vergehen ${fmt(t)} Sekunden. Rechne mit einer Schallgeschwindigkeit von 340 m/s. Wie weit ist das Gewitter entfernt?`, 'm', d, 'Strecke = Geschwindigkeit · Zeit. Das Licht des Blitzes ist praktisch sofort da.', `s = 340 m/s · ${fmt(t)} s = ${fmt(d)} m`);
      } },
      { id: 'r3-zeit', topic: 'Zeit bis zum Donner', ext: true, make() {
        const s = rnd([[340, 1], [680, 2], [1020, 3], [1700, 5], [3400, 10], [2040, 6]]);
        return num(`Ein Blitz schlägt ${fmt(s[0])} m entfernt ein. Rechne mit 340 m/s. Nach wie vielen Sekunden hörst du den Donner?`, 's', s[1], 'Zeit = Strecke : Geschwindigkeit.', `t = ${fmt(s[0])} m : 340 m/s = ${fmt(s[1])} s`);
      } }
    ]
  },
  {
    id: 'r4', nr: 4, title: 'Das Gehör und Gehörschutz', sub: 'Vom Trommelfell zur Hörschnecke',
    items: [
      { id: 'r4-weg', topic: 'Weg des Schalls', make() {
        return mc('Welche Reihenfolge zeigt den Weg des Schalls im Ohr?', ['Ohrmuschel, Gehörgang, Trommelfell, Gehörknöchelchen, Hörschnecke, Hörnerv.', 'Hörschnecke, Trommelfell, Ohrmuschel, Gehörgang.', 'Trommelfell, Ohrmuschel, Hörnerv, Gehörgang.', 'Gehörgang, Hörschnecke, Ohrmuschel, Trommelfell.'],
          'Die Ohrmuschel fängt den Schall auf. Er geht durch den Gehörgang zum Trommelfell, über die Gehörknöchelchen zur Hörschnecke. Dort wird er in Nervenimpulse umgewandelt, die das Gehirn auswertet.');
      } },
      { id: 'r4-schnecke', topic: 'Hohe und tiefe Töne', make() {
        return mc('Wie werden verschieden hohe Töne in der Hörschnecke verarbeitet?', ['In verschiedenen Bereichen der Hörschnecke.', 'Überall gleich.', 'Nur im Trommelfell.', 'Nur im Gehörgang.'],
          'Die Hörschnecke ist wie eine Tastatur aufgebaut: Verschiedene Stellen reagieren auf verschiedene Tonhöhen.');
      } },
      { id: 'r4-riss', topic: 'Trommelfellriss', make() {
        return mc('Warum hört man bei einem Trommelfellriss schlechter?', ['Das Trommelfell kann die Schwingungen nicht mehr richtig auf die Gehörknöchelchen übertragen.', 'Die Ohrmuschel fehlt.', 'Das Gehirn ist beschädigt.', 'Die Hörschnecke wird grösser.'],
          'Ohne intaktes Trommelfell geht ein Teil der Schallenergie verloren. Ein Trommelfellriss kann durch einen lauten Knall entstehen.');
      } },
      { id: 'r4-haerchen', topic: 'Lärmschwerhörigkeit', make() {
        return mc('Was geschieht bei einer Lärmschwerhörigkeit?', ['Sinneshärchen in der Hörschnecke sterben ab. Das ist nicht rückgängig zu machen.', 'Das Trommelfell wächst nach.', 'Die Ohrmuschel verschwindet.', 'Die Ohren werden grösser.'],
          'Bei anhaltend zu lautem Schall sterben einzelne Sinneshärchen ab, weil sie ungenügend versorgt werden. Dadurch entstehen Lücken im Hörbereich. Der Schaden bleibt dauerhaft.');
      } },
      { id: 'r4-schutz', topic: 'Gehörschutz', make() {
        return mc('Du gehst drei Stunden an ein Open-Air-Konzert. Was ist sinnvoll?', ['Gehörschutz tragen, Abstand zu den Lautsprechern halten und Pausen einlegen.', 'Möglichst nah an die Lautsprecher stehen.', 'Nichts tun, die Ohren erholen sich sofort.', 'Die Musik noch lauter machen.'],
          'Dauer, Lautstärke und Abstand zur Schallquelle bestimmen das Risiko. Mit Gehörschutz, Abstand und Pausen schützt du deine Hörschnecke.');
      } },
      { id: 'r4-woche', topic: 'Hörzeit pro Woche', ext: true, make() {
        const s = rnd([[5, 2], [3, 4], [7, 1], [4, 3], [2, 5], [6, 2]]), h = s[0] * s[1];
        return num(`Du hörst an ${fmt(s[0])} Tagen pro Woche je ${fmt(s[1])} Stunden laute Musik über Kopfhörer. Wie viele Stunden sind das pro Woche?`, 'h', h, 'Multipliziere die Tage mit den Stunden pro Tag.', `${fmt(s[0])} · ${fmt(s[1])} = ${fmt(h)} Stunden pro Woche`);
      } }
    ]
  },
  {
    id: 'r5', nr: 5, title: 'Linsen und Auge', sub: 'Licht, Brennweite, Akkommodation',
    items: [
      { id: 'r5-konvex', topic: 'Konvexe Linse', make() {
        return mc('Welche Linse bündelt Lichtstrahlen in einem Punkt?', ['Die konvexe Linse (Sammellinse).', 'Die konkave Linse (Zerstreuungslinse).', 'Keine, Linsen bündeln nie.', 'Nur ein Spiegel.'],
          'Eine konvexe Linse ist in der Mitte dicker. Parallele Lichtstrahlen werden nach der Linse im Brennpunkt vereinigt.');
      } },
      { id: 'r5-konkav', topic: 'Konkave Linse', make() {
        return mc('Was bewirkt eine konkave Linse?', ['Sie lässt Lichtstrahlen auseinanderlaufen (Zerstreuungslinse).', 'Sie bündelt Lichtstrahlen.', 'Sie macht Licht dunkler, ohne die Richtung zu ändern.', 'Sie erzeugt Licht.'],
          'Konkave Linsen sind in der Mitte dünner. Sie spreizen parallele Lichtstrahlen.');
      } },
      { id: 'r5-brennweite', topic: 'Brennweite', make() {
        return mc('Was ist die Brennweite einer Linse?', ['Der Abstand zwischen der Linse und ihrem Brennpunkt.', 'Die Dicke der Linse.', 'Die Breite des Lichts.', 'Die Farbe der Linse.'],
          'Die Brennweite zeigt, wie stark eine Linse die Strahlen bündelt. Stärker gewölbte konvexe Linsen haben eine kürzere Brennweite.');
      } },
      { id: 'r5-reihe', topic: 'Brennweiten vergleichen', ext: true, make() {
        const t = rnd([[12, 8, 20], [5, 15, 10], [30, 10, 20], [25, 5, 15], [18, 6, 12]]), d = Math.max(...t) - Math.min(...t);
        return num(`Drei konvexe Linsen haben die Brennweiten ${fmt(t[0])} cm, ${fmt(t[1])} cm und ${fmt(t[2])} cm. Um wie viele cm ist die längste Brennweite länger als die kürzeste?`, 'cm', d, 'Suche die grösste und die kleinste Zahl und ziehe ab.', `${fmt(Math.max(...t))} cm − ${fmt(Math.min(...t))} cm = ${fmt(d)} cm`);
      } },
      { id: 'r5-bild', topic: 'Bild im Auge', make() {
        return mc('Wo entsteht im Auge das scharfe Bild?', ['Auf der Netzhaut. Hornhaut und Linse brechen das Licht dorthin.', 'In der Pupille.', 'Auf der Iris.', 'Im Augenlid.'],
          'Das Licht wird zuerst an der Hornhaut und dann an der Linse gebrochen. Auf der Netzhaut liegt ein scharfes, auf dem Kopf stehendes Bild. Das Gehirn dreht es wieder um.');
      } },
      { id: 'r5-akkom', topic: 'Akkommodation', make() {
        return mc('Du schaust von einem fernen Berg auf dein Buch. Was passiert mit der Linse im Auge?', ['Sie wird stärker gewölbt.', 'Sie wird flacher.', 'Sie verschwindet.', 'Sie bleibt immer gleich.'],
          'Beim Scharfstellen auf die Nähe (Nahakkommodation) wölbt sich die Linse stärker. So werden die Lichtstrahlen stärker gebrochen.');
      } }
    ]
  },
  {
    id: 'r6', nr: 6, title: 'Sehfehler, Netzhaut und Tiersinne', sub: 'Sehen mit Zapfen, Stäbchen und Spezialorganen',
    items: [
      { id: 'r6-kurz', topic: 'Kurzsichtigkeit', make() {
        return mc('Bei Kurzsichtigkeit liegt das scharfe Bild …', ['vor der Netzhaut. Eine konkave Linse korrigiert den Fehler.', 'hinter der Netzhaut. Eine konvexe Linse korrigiert den Fehler.', 'genau auf der Netzhaut.', 'ausserhalb des Auges.'],
          'Das kurzsichtige Auge bricht das Licht zu stark. Das Bild entsteht vor der Netzhaut. Eine Zerstreuungslinse (konkav) verschiebt es zurück auf die Netzhaut.');
      } },
      { id: 'r6-weit', topic: 'Weitsichtigkeit', make() {
        return mc('Bei Weitsichtigkeit liegt das scharfe Bild …', ['hinter der Netzhaut. Eine konvexe Linse korrigiert den Fehler.', 'vor der Netzhaut. Eine konkave Linse korrigiert den Fehler.', 'genau auf der Netzhaut.', 'in der Linse.'],
          'Das weitsichtige Auge bricht das Licht zu schwach. Das Bild entsteht hinter der Netzhaut. Eine Sammellinse (konvex) verschiebt es nach vorn.');
      } },
      { id: 'r6-dunkel', topic: 'Sehen bei wenig Licht', make() {
        return mc('Warum siehst du bei sehr wenig Licht nur Graustufen?', ['Die Zellen für das Farbsehen brauchen mehr Licht. Bei Dämmerung sind nur die lichtempfindlichen Zellen für Hell und Dunkel aktiv.', 'Die Farben verschwinden aus der Welt.', 'Das Gehirn schaltet ab.', 'Die Augen schliessen sich.'],
          'Die Netzhaut hat zwei Arten von Sinneszellen: Zapfen für Farben und helles Licht, Stäbchen für Hell und Dunkel auch bei wenig Licht.');
      } },
      { id: 'r6-fleck', topic: 'Blinder Fleck', make() {
        return mc('Was ist der blinde Fleck?', ['Die Stelle auf der Netzhaut, an der der Sehnerv das Auge verlässt und keine Sinneszellen liegen.', 'Ein dunkler Fleck auf der Hornhaut.', 'Ein Fleck auf der Linse.', 'Ein Fehler im Gehirn.'],
          'An dieser Stelle gibt es keine Lichtsinneszellen. Du bemerkst das normalerweise nicht, weil das andere Auge und das Gehirn die Lücke ausgleichen.');
      } },
      { id: 'r6-pupille', topic: 'Adaption', make() {
        return mc('Du kommst von draussen in einen hellen Raum. Was tut die Pupille?', ['Sie wird kleiner.', 'Sie wird grösser.', 'Sie verschwindet.', 'Sie wird rot.'],
          'Bei viel Licht verengt sich die Pupille und schützt so die Netzhaut. Bei wenig Licht wird sie weiter. Das nennt man Adaption.');
      } },
      { id: 'r6-fisch', topic: 'Seitenlinienorgan', make() {
        return mc('Fische leben oft in trübem, dunklem Wasser. Wie bemerken sie, dass andere Fische vorbeischwimmen?', ['Mit dem Seitenlinienorgan, das Bewegungen des Wassers wahrnimmt.', 'Mit den Augen, immer.', 'Mit den Ohren an der Wasseroberfläche.', 'Gar nicht.'],
          'Das Seitenlinienorgan reagiert auf Strömungen und Druckänderungen im Wasser. So bemerken Fische Bewegungen auch bei schlechter Sicht.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  r1: [
    { h: 'Die Welt wahrnehmen',
      body: `<p>Mit deinen Sinnesorganen nimmst du Reize aus der Umwelt wahr: Augen (Sehen), Ohren (Hören), Nase (Riechen), Zunge (Schmecken) und Haut (Fühlen).</p>
        ${merk('Ein Sinn allein reicht oft nicht. Meist arbeiten mehrere Sinne zusammen. Beispiel: Du hörst ein Auto um die Ecke, bevor du es siehst.')}` },
    { h: 'Geschmack und Aroma',
      body: `<p>Geschmack nimmst du mit dem Mund wahr (vor allem mit der Zunge). Es gibt <b>süss, sauer, salzig, bitter und umami</b>.</p>
        ${merk('<b>Aroma</b> = Geschmack + Geruch. Ohne Nase schmeckt Essen fade, zum Beispiel bei Schnupfen.')}
        <p>«Scharf» ist keine Geschmacksrichtung, sondern ein Schmerzempfinden. Die Zungenkarte (vorn süss, hinten bitter) ist widerlegt.</p>` },
    { h: 'Welcher Sinn?',
      body: '<p>Tippe bei jeder Situation auf das passende Sinnesorgan. Manchmal passen mehrere.</p>', sim: 'sinne' },
    { h: 'Beispiel durchdacht: Getränke testen', worked: {
      given: 'Du trinkst mit verbundenen Augen und zugehaltener Nase einen Zitronensaft. Was nimmst du wahr?',
      steps: [['Was fällt weg?', 'Der Sehsinn und der Geruchssinn.'], ['Was bleibt?', 'Die Zunge nimmt noch sauer und süss wahr.'], ['Was fehlt?', 'Das Aroma, denn dafür braucht es den Geruch.'], ['Antwort', 'Das Getränk schmeckt weniger intensiv, und es ist schwer, es zu erkennen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum schmeckt Essen bei einem Schnupfen fade?',
        options: ['Weil der Geruchssinn eingeschränkt ist und das Aroma fehlt.', 'Weil die Zunge verschwindet.', 'Weil der Magen anders arbeitet.', 'Weil die Augen schlecht sehen.'],
        explain: 'Das Aroma entsteht im Zusammenspiel von Geschmack und Geruch. Bei verstopfter Nase fehlt ein grosser Teil davon.' } }
  ],
  r2: [
    { h: 'Reiz und Reaktion',
      body: `<p>Ein <b>Reiz</b> löst eine <b>Reaktion</b> aus. Dabei arbeiten Körperteile zusammen:</p>
        ${merk('Sinnesorgan → Nerven → <b>Gehirn</b> → Nerven → Muskel oder Drüse → Reaktion')}
        <p>Die Reaktion kann bewusst sein (du entscheidest), unbewusst (läuft von selbst) oder ein Reflex.</p>` },
    { h: 'Bewusst, unbewusst oder Reflex?',
      body: '<p>Ordne Reaktionen ein. Die Grenze ist nicht immer klar, denn zum Beispiel Kauen läuft unbewusst, kann aber auch bewusst gesteuert werden.</p>', sim: 'reflex' },
    { h: 'Reflexe',
      body: `<p>Reflexe sind <b>schnelle, angeborene Reaktionen</b>. Das Gehirn ist daran nicht beteiligt. Die Information wird im <b>Rückenmark</b> umgeschaltet. Reflexe schützen den Körper, zum Beispiel:</p>
        <ul><li><b>Lidschlussreflex:</b> Staub im Auge, die Lider schliessen sich.</li>
        <li><b>Pupillenreflex:</b> bei viel Licht wird die Pupille klein.</li>
        <li><b>Kniesehnenreflex:</b> Beim Einknicken verhindert er ein Umfallen.</li></ul>` },
    { h: 'Beispiel durchdacht: Saras Tee', worked: {
      given: 'Sara macht Hausaufgaben. Mit einer Handbewegung verscheucht sie eine Fliege und stösst dabei die Teetasse um. Sie zieht die Hand vom heissen Tee zurück. Welche Reaktionen sind bewusst, unbewusst oder Reflex?',
      steps: [['Fliege verscheuchen', 'Bewusst: Sara entscheidet es.'], ['Tasse umstossen', 'Unbewusst: Das war nicht beabsichtigt.'], ['Hand zurückziehen', 'Reflex: Es geht sehr schnell und schützt vor Verbrennung.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über Reflexe stimmt?',
        options: ['Sie sind schnell, weil die Information im Rückenmark umgeschaltet wird.', 'Sie sind langsam, weil das Gehirn lange nachdenkt.', 'Sie müssen mühsam gelernt werden.', 'Sie finden nur im Schlaf statt.'],
        explain: 'Bei Reflexen fehlt der Umweg über das Gehirn. Das macht sie schnell.' } }
  ],
  r3: [
    { h: 'Richtungshören',
      body: `<p>Mit zwei Ohren kannst du die Richtung von Geräuschen erkennen. Ein Geräusch von links erreicht das linke Ohr <b>früher und kräftiger</b>. Das Gehirn vergleicht beide Signale.</p>
        <p>Das räumliche Hören ist wichtig, zum Beispiel im Strassenverkehr oder im Sport.</p>` },
    { h: 'Was ist Schall?',
      body: `${merk('Schall ist eine <b>fortschreitende Verdichtung der Luft</b>. Luftteilchen schwingen hin und her und stossen ihre Nachbarn an.')}
        <p>Die Luftteilchen fliegen nicht von der Quelle zum Ohr. Die Schwingung breitet sich in <b>alle Richtungen</b> aus.</p>` },
    { h: 'Sieh den Schall',
      body: '<p>Verändere die Lautstärke und die Tonhöhe. Die Punkte sind Luftteilchen. Das ist ein Modell.</p>', sim: 'schall' },
    { h: 'Vorgerechnet: Gewitter', worked: {
      given: 'Zwischen Blitz und Donner vergehen 4 Sekunden. Wie weit ist das Gewitter entfernt? Rechne mit 340 m/s.',
      steps: [['Formel', 'Strecke = Geschwindigkeit · Zeit'], ['Einsetzen', 's = 340 m/s · 4 s'], ['Antwort', 's = 1360 m. Das Gewitter ist etwa 1,4 km entfernt.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie überträgt Schall seine Energie in der Luft?',
        options: ['Durch schwingende Luftteilchen, die ihre Nachbarn anstossen.', 'Durch Wind, der von der Quelle zum Ohr weht.', 'Durch Licht.', 'Durch Wärme, die aufsteigt.'],
        explain: 'Schall ist eine Schwingung der Luftteilchen. Nur die Verdichtung wandert weiter.' } }
  ],
  r4: [
    { h: 'So funktioniert das Gehör',
      body: `<p>Der Schall nimmt diesen Weg:</p>
        <ol><li><b>Ohrmuschel</b> fängt Schall auf.</li><li><b>Gehörgang</b> leitet ihn zum Trommelfell.</li><li>Das <b>Trommelfell</b> schwingt.</li><li>Die <b>Gehörknöchelchen</b> übertragen die Schwingung.</li><li>In der <b>Hörschnecke</b> reagieren Sinneshärchen. Verschiedene Töne werden an verschiedenen Stellen verarbeitet.</li><li>Der <b>Hörnerv</b> leitet die Impulse zum Gehirn.</li></ol>` },
    { h: 'Der Weg des Schalls',
      body: '<p>Tippe auf «Weiter» und folge dem Schall durch das Ohr.</p>', sim: 'ohr' },
    { h: 'Wenn es zu laut ist',
      body: `<p>Zu viel Lärm schadet dem Gehör:</p>
        <ul><li><b>Trommelfellriss:</b> durch einen sehr lauten Knall.</li>
        <li><b>Lärmschwerhörigkeit:</b> Durch dauerhaften Lärm sterben Sinneshärchen in der Hörschnecke ab. Es entstehen Lücken im Hörbereich. Der Schaden ist <b>nicht rückgängig</b>.</li>
        <li><b>Tinnitus:</b> ein Pfeifen oder Rauschen im Ohr.</li></ul>
        ${warnbox('<b>Schutz:</b> Gehörschutz tragen, Abstand zu Lautsprechern halten, Musik leiser stellen, Pausen einlegen. Entscheidend sind Lautstärke, Dauer und Abstand.')}` },
    { h: 'Vorgerechnet: Lärmzeit', worked: {
      given: 'Du hörst an 5 Tagen pro Woche je 2 Stunden laute Musik. Wie viele Stunden sind das pro Woche?',
      steps: [['Rechnung', '5 · 2 = 10'], ['Antwort', '10 Stunden pro Woche. Je länger die Hörzeit, desto grösser das Risiko für das Gehör.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie lässt sich eine Lärmschwerhörigkeit verhindern?',
        options: ['Lärm meiden und Gehörschutz tragen, denn zerstörte Sinneshärchen wachsen nicht nach.', 'Mit einer Salbe auf dem Ohr.', 'Durch Schlaf.', 'Durch lauteres Hören, damit sich die Ohren daran gewöhnen.'],
        explain: 'Die Sinneshärchen sterben bei zu viel Lärm ab und erneuern sich nicht. Darum ist Vorbeugen wichtig.' } }
  ],
  r5: [
    { h: 'Konvexe und konkave Linsen',
      body: `<ul><li><b>Konvexe Linse</b> (Sammellinse): in der Mitte dicker, bündelt Licht im <b>Brennpunkt</b>.</li>
        <li><b>Konkave Linse</b> (Zerstreuungslinse): in der Mitte dünner, spreizt das Licht.</li></ul>
        ${merk('<b>Brennweite</b> = Abstand zwischen Linse und Brennpunkt. Je stärker eine konvexe Linse gewölbt ist, desto kürzer ist ihre Brennweite.')}` },
    { h: 'Strahlen durch eine Linse',
      body: '<p>Wähle konvex oder konkav und verändere die Wölbung. Das Bild zeigt drei parallele Lichtstrahlen. Das ist ein Modell.</p>', sim: 'linse' },
    { h: 'So siehst du scharf',
      body: `<p>Im Auge brechen <b>Hornhaut und Linse</b> das Licht. Auf der <b>Netzhaut</b> entsteht ein scharfes, umgekehrtes Bild. Das Gehirn dreht es um.</p>
        ${merk('<b>Akkommodation:</b> Beim Blick in die Nähe wölbt sich die Linse stärker, beim Blick in die Ferne wird sie flacher.')}
        <p>Nahe und ferne Dinge siehst du nie gleichzeitig scharf.</p>` },
    { h: 'Vorgerechnet: Brennweiten vergleichen', worked: {
      given: 'Drei Linsen haben Brennweiten von 12 cm, 8 cm und 20 cm. Welche bricht das Licht am stärksten, und wie gross ist der Unterschied zwischen längster und kürzester Brennweite?',
      steps: [['Stärkste Brechung', 'Die kürzeste Brennweite: 8 cm.'], ['Unterschied', '20 cm − 8 cm = 12 cm'], ['Antwort', 'Die Linse mit 8 cm bricht am stärksten. Der Unterschied beträgt 12 cm.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was geschieht mit der Linse im Auge, wenn du auf etwas Nahes schaust?',
        options: ['Sie wölbt sich stärker.', 'Sie wird flacher.', 'Sie springt aus dem Auge.', 'Nichts.'],
        explain: 'Bei Nahakkommodation wird die Linse stärker gewölbt und bricht das Licht stärker.' } }
  ],
  r6: [
    { h: 'Sehfehler und Korrektur',
      body: `<ul><li><b>Kurzsichtigkeit:</b> Das Bild entsteht <b>vor</b> der Netzhaut. Korrektur mit einer <b>konkaven</b> Linse.</li>
        <li><b>Weitsichtigkeit:</b> Das Bild entsteht <b>hinter</b> der Netzhaut. Korrektur mit einer <b>konvexen</b> Linse.</li>
        <li><b>Alterssichtigkeit:</b> Die Linse verliert an Beweglichkeit, das Nahsehen wird schwerer.</li></ul>` },
    { h: 'Teste die Brille',
      body: '<p>Wähle einen Sehfehler und eine Brille. Du siehst, wo das Bild im Auge entsteht. Das ist ein Modell.</p>', sim: 'auge' },
    { h: 'Netzhaut und Licht',
      body: `<ul><li><b>Zapfen</b> sehen Farben und helles Licht.</li>
        <li><b>Stäbchen</b> sehen auch bei wenig Licht, aber nur Hell und Dunkel.</li>
        <li><b>Blinder Fleck:</b> Hier verlässt der Sehnerv das Auge, es gibt keine Sinneszellen. Das andere Auge gleicht die Lücke aus.</li>
        <li><b>Adaption:</b> Die Pupille wird bei viel Licht klein, bei wenig Licht gross.</li></ul>
        <p>Räumlich sehen wir mit zwei Augen: Jedes sieht ein leicht anderes Bild. Das Gehirn setzt sie zusammen.</p>` },
    { h: 'Besondere Sinne bei Tieren',
      body: `<p>Tiere haben Sinne, die zu ihrer Lebensweise passen:</p>
        <ul><li><b>Falken:</b> sehr scharfe Augen für die Jagd aus grosser Höhe.</li>
        <li><b>Katzen:</b> sehen gut bei wenig Licht.</li>
        <li><b>Fische:</b> Das <b>Seitenlinienorgan</b> nimmt Wasserbewegungen wahr, auch in trübem Wasser.</li>
        <li><b>Schlangen:</b> Das <b>Grubenorgan</b> hilft ihnen, in völliger Dunkelheit Beute zu finden.</li></ul>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Mensch ist kurzsichtig. Welche Linse korrigiert den Fehler?',
        options: ['Eine konkave Linse.', 'Eine konvexe Linse.', 'Gar keine Linse.', 'Ein Spiegel.'],
        explain: 'Eine konkave Linse spreizt die Strahlen leicht. Das Bild rückt dadurch auf die Netzhaut.' } }
  ]
};
const GOALS = {
  r1: ['Sinnesorgane und Sinne zuordnen', 'Geschmack und Aroma unterscheiden'],
  r2: ['Reiz und Reaktion beschreiben', 'bewusste, unbewusste und reflexartige Reaktionen einordnen'],
  r3: ['Richtungshören erklären', 'Schall als Schwingung der Luftteilchen beschreiben'],
  r4: ['den Weg des Schalls im Ohr beschreiben', 'Gehörschäden mit Lärm in Beziehung setzen und Schutz ableiten'],
  r5: ['konvexe und konkave Linsen unterscheiden', 'beschreiben, wie im Auge ein Bild entsteht'],
  r6: ['Sehfehler und ihre Korrektur beschreiben', 'Sinnesorgane von Tieren mit ihrer Lebensweise verknüpfen']
};
const LEARN = {
  'r1-geschmack': 'Geschmack und Aroma', 'r1-aroma': 'Geschmack und Aroma', 'r1-nase': 'Beispiel durchdacht: Getränke testen', 'r1-zunge': 'Geschmack und Aroma', 'r1-scharf': 'Geschmack und Aroma', 'r1-sinne': 'Die Welt wahrnehmen',
  'r2-schema': 'Reiz und Reaktion', 'r2-reflex': 'Reflexe', 'r2-herdplatte': 'Beispiel durchdacht: Saras Tee', 'r2-bewusst': 'Bewusst, unbewusst oder Reflex?', 'r2-schnell': 'Reflexe', 'r2-impulse': 'Reiz und Reaktion',
  'r3-richtung': 'Richtungshören', 'r3-schall': 'Was ist Schall?', 'r3-teilchen': 'Sieh den Schall', 'r3-kerze': 'Sieh den Schall', 'r3-donner': 'Vorgerechnet: Gewitter', 'r3-zeit': 'Vorgerechnet: Gewitter',
  'r4-weg': 'So funktioniert das Gehör', 'r4-schnecke': 'So funktioniert das Gehör', 'r4-riss': 'Wenn es zu laut ist', 'r4-haerchen': 'Wenn es zu laut ist', 'r4-schutz': 'Wenn es zu laut ist', 'r4-woche': 'Vorgerechnet: Lärmzeit',
  'r5-konvex': 'Konvexe und konkave Linsen', 'r5-konkav': 'Konvexe und konkave Linsen', 'r5-brennweite': 'Konvexe und konkave Linsen', 'r5-reihe': 'Vorgerechnet: Brennweiten vergleichen', 'r5-bild': 'So siehst du scharf', 'r5-akkom': 'So siehst du scharf',
  'r6-kurz': 'Sehfehler und Korrektur', 'r6-weit': 'Sehfehler und Korrektur', 'r6-dunkel': 'Netzhaut und Licht', 'r6-fleck': 'Netzhaut und Licht', 'r6-pupille': 'Netzhaut und Licht', 'r6-fisch': 'Besondere Sinne bei Tieren'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Sinneszelle', pw: 'nimmt Reize auf' },
  { xp: 80, name: 'Nerv', pw: 'leitet weiter' },
  { xp: 200, name: 'Gehirn', pw: 'verarbeitet' },
  { xp: 380, name: 'Hörschnecke', pw: 'hört Töne' },
  { xp: 620, name: 'Linse', pw: 'bündelt Licht' },
  { xp: 920, name: 'Falkenauge', pw: 'sieht scharf' }
];

/* ---------- Thema: 7_3 Reize und Sinne untersuchen ---------- */
const TOPIC = {
  id: 'nt7-3', storeKey: 'halingen-nt7-3-v1', other: { title: '7_1 Naturwissenschaften erkunden', href: '7_1_Naturwissenschaften_erkunden.html' },
  title: 'Reize und Sinne untersuchen', lead: 'Hören, Sehen und Reagieren', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Aroma = Geschmack + Geruch.', 'Reflexe laufen über das Rückenmark, nicht über das Gehirn.'],
  formulas: [
    ['Reiz-Reaktions-Schema', 'Sinnesorgan, Nerven, Gehirn', 'Nerven, Muskel, Reaktion'],
    ['Reflex', 'schnell und angeboren', 'über das Rückenmark'],
    ['Schall', 'Verdichtung der Luft', 's = 340 m/s · t'],
    ['Linsen', 'konvex bündelt, konkav spreizt', 'Brennweite: Linse bis Brennpunkt'],
    ['Sehfehler', 'kurzsichtig: konkav', 'weitsichtig: konvex'],
    ['Netzhaut', 'Zapfen: Farbe und hell', 'Stäbchen: hell und dunkel']
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
  sinne(el) {
    sorter(el, [
      { t: 'Du hörst im letzten Moment einen Bus um die Ecke kommen', ok: ['ohr'], why: 'Schall wird mit den Ohren wahrgenommen.' },
      { t: 'Du erkennst den Duft von frischem Popcorn', ok: ['nase'], why: 'Gerüche nimmst du mit der Nase wahr.' },
      { t: 'Du merkst, dass eine Suppe zu salzig ist', ok: ['zunge'], why: 'Salzig ist eine Geschmacksrichtung und wird im Mund wahrgenommen.' },
      { t: 'Du siehst einen Blitz am Himmel', ok: ['auge'], why: 'Licht nimmst du mit den Augen wahr.' },
      { t: 'Der Zitronenkuchen hat ein feines Aroma', ok: ['nase', 'zunge'], why: 'Aroma entsteht aus Geschmack (Zunge) und Geruch (Nase).' },
      { t: 'Du spürst, dass das Wasser heiss ist', ok: ['haut'], why: 'Wärme und Berührung nimmst du mit der Haut wahr.' }
    ], { auge: 'Auge', ohr: 'Ohr', nase: 'Nase', zunge: 'Zunge', haut: 'Haut' }, 'Welches Sinnesorgan wird gebraucht?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  reflex(el) {
    sorter(el, [
      { t: 'Du verscheuchst mit der Hand eine Fliege', ok: ['bew'], why: 'Du entscheidest dich dafür. Das Gehirn steuert die Bewegung.' },
      { t: 'Du ziehst die Hand blitzschnell von der heissen Herdplatte weg', ok: ['ref'], why: 'Schutzreflex über das Rückenmark, sehr schnell.' },
      { t: 'Dein Herz schlägt, ohne dass du darüber nachdenkst', ok: ['unb'], why: 'Der Herzschlag läuft automatisch ab.' },
      { t: 'Bei Staub im Auge schliessen sich die Lider', ok: ['ref'], why: 'Das ist der Lidschlussreflex.' },
      { t: 'Du entscheidest, nach dem Glas zu greifen', ok: ['bew'], why: 'Eine gewollte, bewusste Bewegung.' },
      { t: 'Du stösst beim Greifen aus Versehen die Tasse um', ok: ['unb'], why: 'Du wolltest es nicht. Es geschah unbewusst.' }
    ], { bew: 'Bewusst', unb: 'Unbewusst', ref: 'Reflex' }, 'Wie läuft diese Reaktion ab?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  schall(el) {
    const N = 24;
    el.innerHTML = `<div class="sim"><div class="wave" id="wv" aria-hidden="true"></div>${sl('amp', 'Lautstärke', 0, 10, 1, 5, '')}${sl('frq', 'Tonhöhe', 1, 6, 1, 2, '')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    const wv = $id('wv'), dots = [];
    for (let i = 0; i < N; i++) { const d = document.createElement('i'); wv.appendChild(d); dots.push(d); }
    let raf = 0, t = 0;
    function draw() {
      const A = +$id('amp').value * 1.3, F = +$id('frq').value, W = wv.clientWidth || 280, step = W / (N + 1);
      dots.forEach((d, i) => { const x0 = (i + 1) * step; d.style.left = (x0 + A * Math.sin(2 * Math.PI * (F * x0 / W) - t)) + 'px'; d.style.top = '50%'; });
    }
    function loop() { if (!el.isConnected) return; t += 0.08; draw(); raf = requestAnimationFrame(loop); }
    function upd() {
      $id('ampv').textContent = $id('amp').value; $id('frqv').textContent = $id('frq').value;
      $id('ro').innerHTML = `Lauter Ton: Die Teilchen schwingen weiter hin und her. Höherer Ton: Die Verdichtungen folgen dichter aufeinander.<br>Die Teilchen bleiben ungefähr am Ort, nur die <b>Schwingung wandert</b>.`;
      draw();
    }
    $id('amp').addEventListener('input', upd); $id('frq').addEventListener('input', upd); upd();
    if (!reduced()) raf = requestAnimationFrame(loop);
  },

  ohr(el) {
    const S = [
      ['Ohrmuschel', 'Fängt den Schall auf und lenkt ihn in den Gehörgang.'],
      ['Gehörgang', 'Leitet den Schall zum Trommelfell.'],
      ['Trommelfell', 'Dünne Haut. Sie gerät durch den Schall in Schwingung.'],
      ['Gehörknöchelchen', 'Drei kleine Knochen. Sie übertragen und verstärken die Schwingung.'],
      ['Hörschnecke', 'Sinneshärchen wandeln die Schwingung in Nervenimpulse um. Hohe und tiefe Töne werden an verschiedenen Stellen verarbeitet.'],
      ['Hörnerv', 'Leitet die Impulse zum Gehirn. Dort entsteht der Höreindruck.']
    ];
    el.innerHTML = `<div class="sim"><div class="ohrchain" id="oc" aria-hidden="true">${S.map((s, i) => `<span class="ostep" data-i="${i}">${s[0]}</span>`).join('<b>→</b>')}</div>
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

  linse(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Linsenart"><button class="btn sm on" data-l="x">Konvex (Sammellinse)</button><button class="btn sm" data-l="k">Konkav (Zerstreuungslinse)</button></div>
      <svg viewBox="0 0 300 150" class="lensvg" role="img" aria-label="Strahlen durch eine Linse"><line x1="0" y1="75" x2="300" y2="75" class="ax"/><g id="lg"></g><ellipse id="le" cx="110" cy="75" rx="8" ry="46" class="lens"/></svg>
      ${sl('fw', 'Wölbung', 1, 5, 1, 3, '')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let kind = 'x';
    function upd() {
      const w = +$id('fw').value, f = 190 / (w + 0.5), X = 110;
      $id('fwv').textContent = String(w);
      el.querySelectorAll('[data-l]').forEach(b => b.classList.toggle('on', b.dataset.l === kind));
      const ys = [-30, 0, 30]; let g = '';
      ys.forEach(y => {
        g += `<line x1="0" y1="${75 + y}" x2="${X}" y2="${75 + y}" class="ray"/>`;
        if (kind === 'x') g += `<line x1="${X}" y1="${75 + y}" x2="${X + f}" y2="75" class="ray"/><line x1="${X + f}" y1="75" x2="${Math.min(300, X + f * 1.6)}" y2="${75 - y * 0.6}" class="ray"/>`;
        else g += `<line x1="${X}" y1="${75 + y}" x2="300" y2="${75 + y + y * (300 - X) / f}" class="ray"/><line x1="${X}" y1="${75 + y}" x2="${X - f}" y2="75" class="vray"/>`;
      });
      g += `<circle cx="${kind === 'x' ? X + f : X - f}" cy="75" r="4" class="fp"/>`;
      $id('lg').innerHTML = g;
      $id('le').setAttribute('rx', kind === 'x' ? 8 : 4);
      $id('ro').innerHTML = kind === 'x' ? `Konvex: Die Strahlen treffen sich im <b>Brennpunkt</b>. Stärkere Wölbung: <b>kürzere</b> Brennweite.` : `Konkav: Die Strahlen laufen <b>auseinander</b>. Sie sehen aus, als kämen sie vom (gestrichelten) Brennpunkt vor der Linse.`;
    }
    el.querySelectorAll('[data-l]').forEach(b => b.addEventListener('click', () => { kind = b.dataset.l; upd(); }));
    $id('fw').addEventListener('input', upd); upd();
  },

  auge(el) {
    el.innerHTML = `<div class="sim"><p class="small">Sehfehler</p><div class="seg3" role="group" aria-label="Sehfehler"><button class="btn sm on" data-f="0">Normalsichtig</button><button class="btn sm" data-f="-1">Kurzsichtig</button><button class="btn sm" data-f="1">Weitsichtig</button></div>
      <p class="small">Brille</p><div class="seg3" role="group" aria-label="Brille"><button class="btn sm on" data-b="0">Keine</button><button class="btn sm" data-b="1">Konkav</button><button class="btn sm" data-b="-1">Konvex</button></div>
      <svg viewBox="0 0 300 100" class="lensvg" role="img" aria-label="Lage des Bildes im Auge"><rect x="20" y="25" width="260" height="50" rx="22" class="eye"/><line id="ret" x1="250" y1="28" x2="250" y2="72" class="ret"/><circle id="fp2" cx="250" cy="50" r="6" class="fp"/></svg>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let f = 0, b = 0;
    function upd() {
      el.querySelectorAll('[data-f]').forEach(x => x.classList.toggle('on', +x.dataset.f === f));
      el.querySelectorAll('[data-b]').forEach(x => x.classList.toggle('on', +x.dataset.b === b));
      const off = f * 30 + b * 30;   // Kurzsichtig: -30 (vor der Netzhaut), konkave Brille: +30
      $id('fp2').setAttribute('cx', 250 + off);
      const sharp = off === 0;
      $id('ro').innerHTML = sharp ? 'Das Bild entsteht <b>genau auf der Netzhaut</b>: Du siehst scharf.' : (off < 0 ? 'Das Bild entsteht <b>vor der Netzhaut</b>: unscharf.' : 'Das Bild entsteht <b>hinter der Netzhaut</b>: unscharf.');
    }
    el.querySelectorAll('[data-f]').forEach(x => x.addEventListener('click', () => { f = +x.dataset.f; upd(); }));
    el.querySelectorAll('[data-b]').forEach(x => x.addEventListener('click', () => { b = +x.dataset.b; upd(); }));
    upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-3","titel":"Reize und Sinne untersuchen","kapitel":"NaTech 7, Kapitel 3","audio":"nt7-3"});
