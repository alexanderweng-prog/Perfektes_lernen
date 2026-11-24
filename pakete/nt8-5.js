// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/8_5_Kraefte_Arbeit_und_Leistung_erforschen.html
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

/* ---------- Inhalt: 8_5 Kräfte, Arbeit und Leistung erforschen, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'f1', nr: 1, title: 'Kräfte und Gewichtskraft', sub: 'Wirkungen, Masse und Newton',
    items: [
      { id: 'f1-wirkung', topic: 'Wirkungen von Kräften', make() {
        return mc('Welche Wirkungen kann eine Kraft haben?', ['Sie kann einen Körper verformen oder seine Bewegung verändern (schneller, langsamer, andere Richtung).', 'Sie kann nur etwas erwärmen.', 'Sie kann nur etwas leuchten lassen.', 'Sie hat keine sichtbare Wirkung.'],
          'Kräfte zeigen sich durch Verformung (zum Beispiel eine Plastilinkugel nach dem Fall) und durch Änderungen der Bewegung oder der Lage eines Körpers.');
      } },
      { id: 'f1-allein', topic: 'Eine Kraft kommt nie allein', make() {
        return mc('Was gilt für Kräfte?', ['Eine Kraft kommt nie allein vor: Es sind immer zwei Körper beteiligt.', 'Es gibt Kräfte, die ohne zweiten Körper wirken.', 'Eine Kraft wirkt immer nur auf einen einzigen Körper und ihr Partner fehlt.', 'Kräfte kommen immer zu dritt vor.'],
          'Immer wenn ein Körper eine Kraft auf einen anderen ausübt, wirkt auch eine Gegenkraft zurück. Darum kommt eine Kraft nie allein vor.');
      } },
      { id: 'f1-masse', topic: 'Masse und Gewichtskraft', make() {
        return mc('Was ist der Unterschied zwischen Masse und Gewichtskraft?', ['Masse misst man in Kilogramm. Die Gewichtskraft ist eine Kraft, wird in Newton gemessen und hängt vom Ort ab.', 'Beides ist dasselbe und wird in Kilogramm gemessen.', 'Die Masse misst man in Newton, die Gewichtskraft in Kilogramm.', 'Die Masse ist auf dem Mond kleiner.'],
          'Die Masse eines Körpers bleibt überall gleich. Die Gewichtskraft ist die Kraft der Erde (oder eines anderen Himmelskörpers) auf ihn und ist auf dem Mond kleiner.');
      } },
      { id: 'f1-gewicht', topic: 'Gewichtskraft berechnen', make() {
        const m = rnd([0.2, 0.5, 2, 5, 12, 60, 75]), f = r2(m * 10);
        return num(`Ein Körper hat eine Masse von ${fmt(m)} kg. Rechne mit g = 10 N/kg. Wie gross ist seine Gewichtskraft?`, 'N', f, 'Gewichtskraft = Masse · 10 N/kg', `F = m · g = ${fmt(m)} kg · 10 N/kg = ${fmt(f)} N`);
      } },
      { id: 'f1-mond', topic: 'Gewichtskraft auf dem Mond', ext: true, make() {
        const m = rnd([5, 10, 20, 50, 60]), f = r2(m * 1.6);
        return num(`Auf dem Mond wirkt auf jedes Kilogramm eine Gewichtskraft von etwa 1,6 N. Wie gross ist die Gewichtskraft eines Körpers mit ${fmt(m)} kg auf dem Mond?`, 'N', f, 'Multipliziere die Masse mit 1,6 N/kg.', `F = ${fmt(m)} kg · 1,6 N/kg = ${fmt(f)} N`);
      } },
      { id: 'f1-kraftmesser', topic: 'Kraftmesser', make() {
        return mc('Wie funktioniert ein Kraftmesser und was zeigt dein Experiment mit Massestücken?', ['Eine Feder wird gedehnt. Je grösser die Masse, desto grösser die Gewichtskraft und die Dehnung: Beide sind proportional.', 'Er misst die Masse direkt in Kilogramm.', 'Er misst nur Wärme.', 'Er funktioniert nur auf der Erde nicht.'],
          'Bei doppelter Masse wirkt die doppelte Gewichtskraft. Eine Feder dehnt sich entsprechend doppelt so stark. Das ist eine Proportionalität.');
      } }
    ]
  },
  {
    id: 'f2', nr: 2, title: 'Reibungskräfte', sub: 'Haften, Gleiten, Rollen',
    items: [
      { id: 'f2-arten', topic: 'Arten der Reibung', make() {
        return mc('Ein schwerer Schrank steht ruhig auf dem Boden und lässt sich zuerst nicht schieben. Welche Kraft hält ihn fest?', ['Die Haftreibungskraft.', 'Die Gleitreibungskraft.', 'Die Rollreibungskraft.', 'Gar keine Kraft.'],
          'Solange sich der Schrank nicht bewegt, wirkt die Haftreibungskraft. Rutscht er, ist es die Gleitreibungskraft. Rollt er auf Rädern, wirkt die Rollreibungskraft.');
      } },
      { id: 'f2-reihe', topic: 'Reibungskräfte vergleichen', make() {
        return mc('Welche Reihenfolge der Reibungskräfte gilt in der Regel, von gross nach klein?', ['Haftreibung, Gleitreibung, Rollreibung.', 'Rollreibung, Gleitreibung, Haftreibung.', 'Gleitreibung, Rollreibung, Haftreibung.', 'Alle sind immer gleich gross.'],
          'Das Losreissen eines ruhenden Körpers braucht meist die grösste Kraft. Rollen geht am leichtesten. Darum sind Räder so nützlich.');
      } },
      { id: 'f2-flaeche', topic: 'Kontaktfläche', make() {
        return mc('Hängt die Gleitreibungskraft bei einem starren Körper von der Grösse der Kontaktfläche ab?', ['Nein, sie hängt nicht von der Kontaktfläche ab.', 'Ja, mit grösserer Fläche wird sie immer viel grösser.', 'Ja, mit kleinerer Fläche wird sie immer viel grösser.', 'Sie ist immer null.'],
          'Das ist eine verbreitete Fehlvorstellung. Bei starren Körpern wie Schlittschuhkufen spielt die Kontaktfläche keine Rolle. Wichtig sind die Beschaffenheit der Flächen und die Anpresskraft.');
      } },
      { id: 'f2-nutzen', topic: 'Reibung nützlich oder störend', make() {
        return mc('Wo ist Reibung erwünscht und wo unerwünscht?', ['Erwünscht bei Schuhsohlen und Bremsen, unerwünscht in Lagern von Maschinen.', 'Reibung ist immer erwünscht.', 'Reibung ist immer unerwünscht.', 'Reibung gibt es nur im Weltall.'],
          'Ohne Reibung könntest du nicht gehen und kein Auto bremsen. In Maschinen führt Reibung dagegen zu Verschleiss und thermischer Energie, die man vermeiden möchte.');
      } },
      { id: 'f2-anfahren', topic: 'Anfahren eines Gegenstands', make() {
        const s = rnd([[8, 5], [10, 6], [12, 7], [6, 4], [9, 5], [15, 9]]), d = s[0] - s[1];
        return num(`Um einen Gegenstand loszureissen, braucht es eine Haftreibungskraft von ${fmt(s[0])} N. Sobald er rutscht, wirkt eine Gleitreibungskraft von ${fmt(s[1])} N. Um wie viele Newton sinkt die nötige Zugkraft?`, 'N', d, 'Ziehe die kleinere Kraft von der grösseren ab.', `${fmt(s[0])} N − ${fmt(s[1])} N = ${fmt(d)} N`);
      } },
      { id: 'f2-masse', topic: 'Reibung und Masse', ext: true, make() {
        const s = rnd([[200, 0.6, 500], [100, 0.4, 300], [250, 1, 750], [300, 0.9, 600], [200, 0.8, 1000]]), f = r2(s[1] * s[2] / s[0]);
        return num(`Bei einer Masse von ${fmt(s[0])} g misst du eine Gleitreibungskraft von ${fmt(s[1])} N. Die Reibungskraft ist proportional zur Masse. Wie gross ist sie bei ${fmt(s[2])} g?`, 'N', f, 'Bei Proportionalität gilt: Doppelte Masse, doppelte Kraft. Rechne mit dem Verhältnis der Massen.', `${fmt(s[2])} g : ${fmt(s[0])} g = ${fmt(r2(s[2] / s[0]))}<br>${fmt(s[1])} N · ${fmt(r2(s[2] / s[0]))} = ${fmt(f)} N`);
      } }
    ]
  },
  {
    id: 'f3', nr: 3, title: 'Kraftpfeile und Gesamtkraft', sub: 'Addieren, Subtrahieren, Kraft und Gegenkraft',
    items: [
      { id: 'f3-pfeil', topic: 'Kraftpfeil', make() {
        return mc('Was zeigt ein Kraftpfeil?', ['Angriffspunkt (Start des Pfeils am Körper), Richtung und Betrag (Länge) der Kraft.', 'Nur die Farbe der Kraft.', 'Nur die Masse des Körpers.', 'Nur den Ort, wo die Kraft endet.'],
          'Der Pfeil beginnt am Angriffspunkt, zeigt in die Richtung der Kraft und ist umso länger, je grösser die Kraft ist.');
      } },
      { id: 'f3-add', topic: 'Kräfte addieren', make() {
        const s = rnd([[120, 80], [150, 90], [200, 100], [60, 40], [250, 150], [300, 120]]), g = s[0] + s[1];
        return num(`Zwei Personen ziehen einen Schlitten in dieselbe Richtung, die eine mit ${fmt(s[0])} N, die andere mit ${fmt(s[1])} N. Wie gross ist die Gesamtkraft?`, 'N', g, 'Kräfte in dieselbe Richtung werden addiert.', `${fmt(s[0])} N + ${fmt(s[1])} N = ${fmt(g)} N`);
      } },
      { id: 'f3-sub', topic: 'Kräfte subtrahieren', make() {
        const s = rnd([[450, 380], [500, 420], [300, 240], [600, 550], [350, 290], [800, 700]]), g = s[0] - s[1];
        return num(`Beim Seilziehen zieht Gruppe A mit ${fmt(s[0])} N nach links und Gruppe B mit ${fmt(s[1])} N nach rechts. Wie gross ist die Gesamtkraft?`, 'N', g, 'Entgegengesetzte Kräfte werden subtrahiert. Die Gesamtkraft zeigt in die Richtung der stärkeren Gruppe.', `${fmt(s[0])} N − ${fmt(s[1])} N = ${fmt(g)} N nach links`);
      } },
      { id: 'f3-konstant', topic: 'Konstante Geschwindigkeit', make() {
        return mc('Ladina schiebt eine Kiste mit gleichbleibender Geschwindigkeit über den Boden. Wie gross ist ihre Schubkraft im Vergleich zur Gleitreibungskraft?', ['Gleich gross.', 'Grösser.', 'Kleiner.', 'Null.'],
          'Bei konstanter Geschwindigkeit ist die Gesamtkraft null. Die Schubkraft hebt die Gleitreibungskraft genau auf.');
      } },
      { id: 'f3-gegen', topic: 'Kraft und Gegenkraft', make() {
        return mc('Was gilt für Kraft und Gegenkraft (actio = reactio)?', ['Sie sind gleich gross, entgegengesetzt gerichtet und greifen an zwei verschiedenen Körpern an.', 'Sie greifen am selben Körper an und heben sich auf.', 'Sie sind gleich gerichtet.', 'Die Gegenkraft ist immer kleiner.'],
          'Weil Kraft und Gegenkraft an verschiedenen Körpern angreifen, heben sie sich nicht auf. Der Apfel zieht die Erde an, so wie die Erde den Apfel anzieht.');
      } },
      { id: 'f3-gleich', topic: 'Gleich starke Gruppen', make() {
        return mc('Zwei gleich starke Gruppen ziehen an einem Seil in entgegengesetzte Richtungen. Was ist die Gesamtkraft auf das Seil?', ['Null. Das Seil bleibt in Ruhe.', 'Das Doppelte einer Gruppe.', 'Die Kraft einer Gruppe.', 'Unendlich gross.'],
          'Die beiden Kräfte sind gleich gross, aber entgegengesetzt gerichtet. Ihre Summe ist null.');
      } }
    ]
  },
  {
    id: 'f4', nr: 4, title: 'Kräfte zerlegen', sub: 'Kräfteparallelogramm',
    items: [
      { id: 'f4-schnur', topic: 'Schlitten ziehen', make() {
        return mc('Du ziehst einen Schlitten mit einer kurzen oder einer langen Schnur. Wann brauchst du mehr Kraft?', ['Mit der kurzen Schnur, weil du dann schräg nach oben ziehen musst.', 'Mit der langen Schnur, immer.', 'Bei beiden gleich viel.', 'Die Schnurlänge spielt nie eine Rolle.'],
          'Mit der kurzen Schnur zeigt die Zugkraft stärker nach oben. Nur ein Teil der Kraft wirkt in Bewegungsrichtung. Du brauchst darum mehr Kraft.');
      } },
      { id: 'f4-faden', topic: 'Faden mit Gewicht', make() {
        return mc('Ein Gewicht hängt an einem Faden zwischen zwei Pultbeinen. Warum reisst der Faden, wenn man die Fadenenden auseinanderzieht?', ['Weil dann in den Fadenstücken grössere Kräfte wirken als die Gewichtskraft allein.', 'Weil der Faden leichter wird.', 'Weil das Gewicht schwerer wird.', 'Weil die Luft den Faden schneidet.'],
          'Beim Auseinanderziehen entstehen zusätzlich waagrechte Kraftanteile. Die Kraft im Faden wächst mit dem Winkel.');
      } },
      { id: 'f4-parallelo', topic: 'Kräfteparallelogramm', make() {
        return mc('Zwei Personen ziehen einen Schlitten in verschiedene Richtungen. Wie findest du die Gesamtkraft?', ['Mit dem Kräfteparallelogramm: Die Diagonale ist die Gesamtkraft.', 'Du addierst immer nur die Längen.', 'Du subtrahierst immer die Längen.', 'Die Gesamtkraft ist immer null.'],
          'Aus den beiden Kraftpfeilen zeichnest du ein Parallelogramm. Die Diagonale vom Angriffspunkt aus ist die Gesamtkraft.');
      } },
      { id: 'f4-kiste', topic: 'Kiste gemeinsam tragen', make() {
        return mc('Zwei Menschen tragen gemeinsam eine Getränkekiste. Wie brauchen sie möglichst wenig Kraft?', ['Beide ziehen möglichst senkrecht nach oben, dann trägt jede Person nur die Hälfte der Gewichtskraft.', 'Beide ziehen möglichst schräg zur Seite.', 'Eine Person trägt alles allein.', 'Sie halten die Kiste möglichst weit weg vom Körper.'],
          'Je grösser der Winkel zwischen den Zugrichtungen, desto grösser werden die Kräfte. Bei senkrechtem Zug ist die Kraft am kleinsten.');
      } },
      { id: 'f4-senkrecht', topic: 'Senkrechte Kräfte', ext: true, make() {
        const t = rnd([[30, 40, 50], [60, 80, 100], [50, 120, 130], [90, 120, 150], [15, 20, 25]]);
        return num(`Zwei Kräfte von ${fmt(t[0])} N und ${fmt(t[1])} N stehen senkrecht aufeinander. Wie gross ist die Gesamtkraft? Tipp: Das Kräfteparallelogramm ist ein Rechteck.`, 'N', t[2], 'Die Gesamtkraft ist die Diagonale des Rechtecks. Sie folgt aus dem Satz des Pythagoras.', `F² = ${fmt(t[0])}² + ${fmt(t[1])}²<br>F = ${fmt(t[2])} N`);
      } },
      { id: 'f4-teilen', topic: 'Kräfte teilen sich auf', make() {
        const s = rnd([[200, 2], [400, 2], [600, 2], [800, 4], [1000, 5], [900, 3]]), f = r2(s[0] / s[1]);
        return num(`Eine Last mit einer Gewichtskraft von ${fmt(s[0])} N hängt senkrecht an ${fmt(s[1])} gleichen Seilen, die sich die Last gleichmässig teilen. Welche Kraft wirkt in einem Seil?`, 'N', f, 'Teile die Gewichtskraft durch die Anzahl der Seile.', `${fmt(s[0])} N : ${fmt(s[1])} = ${fmt(f)} N`);
      } }
    ]
  },
  {
    id: 'f5', nr: 5, title: 'Kraft sparen', sub: 'Schiefe Ebene, Hebel, Flaschenzug',
    items: [
      { id: 'f5-rampe', topic: 'Schiefe Ebene', make() {
        return mc('Warum ist die Strasse auf den Gotthardpass wie eine Schlange gewunden?', ['Eine längere, flachere Strecke braucht weniger Kraft, aber ein längerer Weg.', 'Damit sie schneller ist.', 'Damit es weniger Strassenschilder braucht.', 'Weil Schlangen den Weg zeigen.'],
          'Bei einer schiefen Ebene sparst du Kraft, musst dafür aber einen längeren Weg gehen. Die Serpentinen machen den Anstieg flacher.');
      } },
      { id: 'f5-rampe-num', topic: 'Kraft auf der Rampe', make() {
        const s = rnd([[400, 0.5, 2], [600, 1, 3], [800, 0.6, 2.4], [1000, 0.5, 5], [500, 1, 4], [600, 0.5, 3]]), f = r2(s[0] * s[1] / s[2]);
        return num(`Eine Last mit der Gewichtskraft ${fmt(s[0])} N wird über eine ${fmt(s[2])} m lange Rampe auf eine Höhe von ${fmt(s[1])} m geschoben. Wie gross ist die nötige Kraft, wenn man die Reibung vernachlässigt?`, 'N', f, 'Kraft = Gewichtskraft · Höhe : Länge', `F = ${fmt(s[0])} N · ${fmt(s[1])} m : ${fmt(s[2])} m = ${fmt(f)} N`);
      } },
      { id: 'f5-hebel', topic: 'Hebel', make() {
        return mc('Du willst mit einem Hebel möglichst wenig Kraft brauchen. Was musst du tun?', ['Den Kraftarm im Vergleich zum Lastarm möglichst lang wählen.', 'Den Kraftarm möglichst kurz wählen.', 'Beide Arme gleich lang machen.', 'Den Hebel weglassen.'],
          'Das Hebelgesetz besagt: Kraft mal Kraftarm ist gleich Last mal Lastarm. Ein langer Kraftarm spart Kraft, verlangt aber einen grösseren Weg.');
      } },
      { id: 'f5-flasch', topic: 'Kraft am Flaschenzug', make() {
        const s = rnd([[600, 2], [600, 3], [800, 4], [1000, 5], [900, 3], [1200, 6]]), f = r2(s[0] / s[1]);
        return num(`Eine Last mit der Gewichtskraft ${fmt(s[0])} N hängt an einem Flaschenzug mit ${fmt(s[1])} tragenden Seilstücken. Wie gross ist die Zugkraft, wenn man Reibung und das Gewicht der Rollen vernachlässigt?`, 'N', f, 'Zugkraft = Gewichtskraft : Anzahl tragender Seile', `F = ${fmt(s[0])} N : ${fmt(s[1])} = ${fmt(f)} N`);
      } },
      { id: 'f5-seil', topic: 'Seillänge am Flaschenzug', ext: true, make() {
        const s = rnd([[2, 3], [3, 2], [4, 2.5], [4, 1.5], [5, 2]]), l = r2(s[0] * s[1]);
        return num(`Ein Flaschenzug hat ${fmt(s[0])} tragende Seilstücke. Die Last soll um ${fmt(s[1])} m angehoben werden. Wie viele Meter Seil musst du ziehen?`, 'm', l, 'Seillänge = Anzahl tragender Seile · Hubhöhe', `${fmt(s[0])} · ${fmt(s[1])} m = ${fmt(l)} m`);
      } },
      { id: 'f5-gold', topic: 'Goldene Regel der Mechanik', make() {
        return mc('Was bedeutet die goldene Regel der Mechanik?', ['Was man an Kraft spart, muss man an Weg zugeben. Die Arbeit bleibt gleich.', 'Man spart gleichzeitig Kraft und Weg.', 'Man spart Weg, braucht aber mehr Kraft und mehr Arbeit.', 'Maschinen verbrauchen keine Energie.'],
          'Mit einfachen Maschinen sparst du Kraft, musst aber einen längeren Weg zurücklegen. Das Produkt aus Kraft und Weg, die Arbeit, bleibt gleich. Weil Reibung und das Gewicht von Rollen mitspielen, spart man in der Praxis weniger Kraft als berechnet.');
      } }
    ]
  },
  {
    id: 'f6', nr: 6, title: 'Arbeit und Leistung', sub: 'W = F · s und P = W : t',
    items: [
      { id: 'f6-arbeit', topic: 'Wann wird Arbeit verrichtet?', make() {
        return mc('Nevio trägt einen Rucksack über eine waagrechte Brücke. Warum wird dabei keine Arbeit am Rucksack verrichtet?', ['Weil die Kraft nach oben wirkt, der Rucksack sich aber waagrecht bewegt. Es gibt keine Kraft in Bewegungsrichtung.', 'Weil Nevio nicht müde wird.', 'Weil der Rucksack zu leicht ist.', 'Weil Arbeit nur im Büro stattfindet.'],
          'Physikalische Arbeit wird nur verrichtet, wenn eine Kraft entlang des Wegs wirkt. Beim Treppensteigen wird der Rucksack dagegen angehoben, hier wird Arbeit verrichtet.');
      } },
      { id: 'f6-w', topic: 'Arbeit berechnen', make() {
        const s = rnd([[50, 4], [120, 3], [600, 2], [20, 10], [300, 5], [1000, 3]]), w = s[0] * s[1];
        return num(`Eine Kraft von ${fmt(s[0])} N wirkt entlang eines Wegs von ${fmt(s[1])} m. Wie gross ist die verrichtete Arbeit?`, 'J', w, 'Arbeit = Kraft · Weg', `W = F · s = ${fmt(s[0])} N · ${fmt(s[1])} m = ${fmt(w)} J`);
      } },
      { id: 'f6-p', topic: 'Leistung berechnen', make() {
        const s = rnd([[2400, 12], [3000, 10], [1800, 6], [900, 30], [6000, 20], [4500, 15]]), p = r2(s[0] / s[1]);
        return num(`Bei einer Arbeit von ${fmt(s[0])} J, die in ${fmt(s[1])} s verrichtet wird: Wie gross ist die Leistung?`, 'W', p, 'Leistung = Arbeit : Zeit', `P = W : t = ${fmt(s[0])} J : ${fmt(s[1])} s = ${fmt(p)} W`);
      } },
      { id: 'f6-wpt', topic: 'Arbeit aus Leistung und Zeit', ext: true, make() {
        const s = rnd([[20, 14400], [100, 60], [1200, 120], [60, 3600], [2000, 30]]), w = s[0] * s[1];
        return num(`Ein Gerät hat eine Leistung von ${fmt(s[0])} W und läuft ${fmt(s[1])} s lang. Wie gross ist die umgewandelte Energie beziehungsweise die verrichtete Arbeit?`, 'J', w, 'Arbeit = Leistung · Zeit', `W = P · t = ${fmt(s[0])} W · ${fmt(s[1])} s = ${fmt(w)} J`);
      } },
      { id: 'f6-treppe', topic: 'Leistung beim Treppensteigen', ext: true, make() {
        const s = rnd([[60, 3, 9], [50, 4, 10], [70, 3, 7], [60, 4, 8], [80, 3, 6], [45, 4, 6]]), p = r2(s[0] * 10 * s[1] / s[2]);
        return num(`Eine Person mit einer Masse von ${fmt(s[0])} kg steigt in ${fmt(s[2])} s eine Treppe mit ${fmt(s[1])} m Höhenunterschied hinauf. Rechne mit g = 10 N/kg. Welche Leistung bringt sie auf?`, 'W', p, 'Arbeit = Gewichtskraft · Höhe. Leistung = Arbeit : Zeit.', `F = ${fmt(s[0])} kg · 10 N/kg = ${fmt(s[0] * 10)} N<br>W = ${fmt(s[0] * 10)} N · ${fmt(s[1])} m = ${fmt(s[0] * 10 * s[1])} J<br>P = ${fmt(s[0] * 10 * s[1])} J : ${fmt(s[2])} s = ${fmt(p)} W`);
      } },
      { id: 'f6-zeit', topic: 'Leistung und Zeit', make() {
        return mc('Alexander rennt in 20 s eine Treppe hoch, Livia in 15 s. Beide haben gleiche Masse. Was kannst du sagen?', ['Beide verrichten gleich viel Arbeit, aber Livia hat die grössere Leistung.', 'Alexander hat die grössere Leistung.', 'Livia verrichtet mehr Arbeit.', 'Beide haben dieselbe Leistung.'],
          'Die Arbeit hängt von der Gewichtskraft und der Höhe ab, und die sind gleich. Livia braucht für die gleiche Arbeit weniger Zeit. Darum ist ihre Leistung grösser.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  f1: [
    { h: 'Kräfte und ihre Wirkungen',
      body: `<p>Kräfte erkennst du an ihren <b>Wirkungen</b>: Ein Körper wird <b>verformt</b>, oder seine <b>Bewegung ändert sich</b> (schneller, langsamer, andere Richtung, andere Lage).</p>
        ${merk('Eine Kraft hat <b>Angriffspunkt, Richtung und Betrag</b>. Eine Kraft kommt nie allein vor: Es sind immer zwei Körper beteiligt.')}` },
    { h: 'Die Gewichtskraft',
      body: `<p>Die Kraft der Erde auf einen Körper heisst <b>Gewichtskraft</b>. Sie wirkt zum Erdmittelpunkt hin.</p>
        ${merk('<b>Masse</b> in kg bleibt überall gleich. <b>Gewichtskraft</b> in Newton (N) hängt vom Ort ab.<br>Auf der Erde: <b>F = m · g</b> mit g = 10 N/kg (genauer 9,8 N/kg).')}
        <p>Auf dem Mond ist die Gewichtskraft kleiner (etwa 1,6 N pro Kilogramm). Darum könntest du dort höher springen.</p>` },
    { h: 'Miss die Gewichtskraft',
      body: '<p>Wähle Erde oder Mond und ändere die Masse. Die Feder des Kraftmessers dehnt sich proportional zur Kraft. Das ist ein Modell.</p>', sim: 'kraftmesser' },
    { h: 'Vorgerechnet: Gewichtskraft', worked: {
      given: 'Eine Person hat eine Masse von 60 kg. Wie gross ist ihre Gewichtskraft auf der Erde und auf dem Mond?',
      steps: [['Erde', 'F = 60 kg · 10 N/kg = 600 N'], ['Mond', 'F = 60 kg · 1,6 N/kg = 96 N'], ['Antwort', 'Die Masse bleibt 60 kg, die Gewichtskraft ist auf dem Mond viel kleiner.']] } },
    { h: 'Kurz testen',
      check: { q: 'In welcher Einheit misst du die Gewichtskraft?',
        options: ['Newton (N).', 'Kilogramm (kg).', 'Meter (m).', 'Sekunde (s).'],
        explain: 'Die Gewichtskraft ist eine Kraft und wird wie jede Kraft in Newton gemessen. Die Masse misst man in Kilogramm.' } }
  ],
  f2: [
    { h: 'Drei Arten der Reibung',
      body: `<ul><li><b>Haftreibungskraft:</b> hält einen ruhenden Körper fest.</li>
        <li><b>Gleitreibungskraft:</b> bremst einen rutschenden Körper.</li>
        <li><b>Rollreibungskraft:</b> bremst einen rollenden Körper, ist meist am kleinsten.</li></ul>
        ${merk('In der Regel gilt: Haftreibung &gt; Gleitreibung &gt; Rollreibung. Bei starren Körpern hängt die Gleitreibungskraft <b>nicht</b> von der Kontaktfläche ab.')}` },
    { h: 'Ziehe den Klotz',
      body: '<p>Wähle die Reibungsart und die Masse. Die Werte sind Beispielwerte (Modell). Beobachte, wie die Kräfte von der Masse abhängen.</p>', sim: 'reibung' },
    { h: 'Reibung im Alltag',
      body: `<p>Reibungskräfte können <b>helfen</b> (Schuhsohlen, Bremsen, Griffigkeit der Reifen) oder <b>stören</b> (Lager, Gleitflächen in Maschinen).</p>
        <p>Man verringert sie zum Beispiel mit Rädern, Öl oder glatten Flächen. Die Luftreibung wird in diesem Kapitel nicht behandelt.</p>` },
    { h: 'Vorgerechnet: Reibung und Masse', worked: {
      given: 'Bei 200 g misst du eine Gleitreibungskraft von 0,6 N. Die Kraft ist proportional zur Masse. Wie gross ist sie bei 500 g?',
      steps: [['Verhältnis der Massen', '500 g : 200 g = 2,5'], ['Kraft berechnen', '0,6 N · 2,5 = 1,5 N'], ['Antwort', 'Bei 500 g misst du 1,5 N.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Reibungskraft wirkt, wenn ein Schrank ruhig steht und du ihn noch nicht bewegen kannst?',
        options: ['Die Haftreibungskraft.', 'Die Gleitreibungskraft.', 'Die Rollreibungskraft.', 'Keine.'],
        explain: 'Solange sich der Körper nicht bewegt, hält ihn die Haftreibungskraft fest.' } }
  ],
  f3: [
    { h: 'Der Kraftpfeil',
      body: `<p>Du zeichnest eine Kraft als <b>Kraftpfeil</b>:</p>
        <ul><li>Der Pfeil <b>beginnt</b> am Angriffspunkt (am Körper, nicht daneben).</li>
        <li>Er zeigt in die <b>Richtung</b> der Kraft.</li>
        <li>Seine <b>Länge</b> zeigt den Betrag.</li></ul>
        <p>Benenne immer genau: <b>Welche Kraft wirkt worauf?</b></p>` },
    { h: 'Kräfte addieren und subtrahieren',
      body: `${merk('<b>Gleiche Richtung:</b> Kräfte addieren.<br><b>Entgegengesetzte Richtung:</b> Kräfte subtrahieren. Die Gesamtkraft zeigt in die Richtung der grösseren Kraft.')}
        <p>Ist die Gesamtkraft null, bleibt ein Körper in Ruhe oder bewegt sich mit konstanter Geschwindigkeit.</p>` },
    { h: 'Seilziehen',
      body: '<p>Stelle die Kräfte der beiden Gruppen ein. Der grosse Pfeil zeigt die Gesamtkraft.</p>', sim: 'seilziehen' },
    { h: 'Kraft und Gegenkraft',
      body: `${merk('Zu jeder Kraft gehört eine <b>Gegenkraft</b>: gleich gross, entgegengesetzt gerichtet, aber an einem <b>anderen Körper</b>.')}
        <p>Beispiel: Der Apfel wird von der Erde angezogen, und die Erde wird vom Apfel angezogen. Zwei Kräfte am selben Körper, die sich aufheben (zum Beispiel Gewichtskraft und Haltekraft des Astes am ruhenden Apfel), sind <b>nicht</b> Kraft und Gegenkraft.</p>` },
    { h: 'Vorgerechnet: Seilziehen', worked: {
      given: 'Gruppe A zieht mit 450 N nach links, Gruppe B mit 380 N nach rechts. Wie gross ist die Gesamtkraft?',
      steps: [['Entgegengesetzt', 'Die Kräfte werden subtrahiert.'], ['Rechnung', '450 N − 380 N = 70 N'], ['Antwort', '70 N nach links. Gruppe A gewinnt.']] } },
    { h: 'Kurz testen',
      check: { q: 'Zwei gleich starke Gruppen ziehen am Seil in entgegengesetzte Richtungen. Was geschieht?',
        options: ['Die Gesamtkraft ist null, das Seil bleibt in Ruhe.', 'Das Seil bewegt sich nach links.', 'Das Seil bewegt sich nach rechts.', 'Die Gesamtkraft ist doppelt so gross.'],
        explain: 'Gleich grosse, entgegengesetzte Kräfte heben sich auf.' } }
  ],
  f4: [
    { h: 'Schräg ziehen kostet Kraft',
      body: `<p>Du ziehst einen Schlitten mit einer kurzen Schnur. Du ziehst schräg nach oben, und nur ein Teil deiner Kraft wirkt in Bewegungsrichtung. Mit einer langen Schnur ziehst du flacher und brauchst weniger Kraft.</p>
        <p>Dasselbe Prinzip erklärt, warum ein Faden reisst, wenn du ein Gewicht daran aufhängst und die Fadenenden auseinanderziehst.</p>` },
    { h: 'Das Kräfteparallelogramm',
      body: `${merk('Zwei Kräfte mit verschiedenen Richtungen ergeben eine <b>Gesamtkraft</b>: die Diagonale im <b>Kräfteparallelogramm</b>.')}
        <p>Umgekehrt kannst du eine Kraft in zwei Teilkräfte <b>zerlegen</b>. So bestimmst du zum Beispiel, wie stark ein Seil beansprucht wird, an dem eine Strassenlaterne hängt.</p>` },
    { h: 'Hänge ein Gewicht auf',
      body: '<p>Ein Gewicht von 100 N hängt an zwei Seilen. Vergrössere den Winkel zwischen den Seilen. Das ist ein Modell.</p>', sim: 'parallelo' },
    { h: 'Vorgerechnet: Senkrechte Kräfte', worked: {
      given: 'Zwei Kräfte von 30 N und 40 N stehen senkrecht aufeinander. Wie gross ist die Gesamtkraft?',
      steps: [['Zeichnen', 'Das Kräfteparallelogramm ist ein Rechteck. Die Gesamtkraft ist die Diagonale.'], ['Rechnen', 'F² = 30² + 40² = 900 + 1600 = 2500'], ['Antwort', 'F = 50 N']] } },
    { h: 'Kurz testen',
      check: { q: 'Zwei Personen tragen eine Kiste. Wann brauchen sie am wenigsten Kraft?',
        options: ['Wenn sie senkrecht nach oben ziehen.', 'Wenn sie schräg nach aussen ziehen.', 'Wenn sie die Arme möglichst weit strecken.', 'Es spielt keine Rolle.'],
        explain: 'Bei senkrechtem Zug wirkt die ganze Kraft nach oben. Bei schrägem Zug braucht es grössere Kräfte.' } }
  ],
  f5: [
    { h: 'Einfache Maschinen',
      body: `<p>Mit <b>schiefer Ebene, Hebel und Flaschenzug</b> brauchst du weniger Kraft, um eine Last zu heben.</p>
        ${merk('<b>Goldene Regel der Mechanik:</b> Was du an Kraft sparst, musst du an Weg zugeben. Die Arbeit bleibt gleich.')}` },
    { h: 'Die schiefe Ebene',
      body: `<p>Eine <b>Rampe</b> verlängert den Weg, verkleinert aber die nötige Kraft. Bei einer Rampe der Länge s und der Höhe h gilt ohne Reibung:</p>
        ${merk('<b>F = G · h : s</b><br>Je flacher die Rampe, desto kleiner die Kraft und desto länger der Weg.')}
        <p>Darum haben Rollstuhlrampen eine geringe Steigung, und Passstrassen winden sich in Serpentinen.</p>` },
    { h: 'Spare Kraft',
      body: '<p>Wähle Rampe oder Flaschenzug. Beobachte Kraft, Weg und Arbeit. Das ist ein Modell ohne Reibung.</p>', sim: 'maschine' },
    { h: 'Hebel und Flaschenzug',
      body: `<ul><li><b>Hebel:</b> Kraft · Kraftarm = Last · Lastarm. Ein langer Kraftarm spart Kraft.</li>
        <li><b>Flaschenzug:</b> Mit n tragenden Seilstücken ist die Zugkraft nur etwa G : n, aber du musst n-mal so viel Seil ziehen.</li></ul>
        <p>In der Praxis sparst du etwas weniger Kraft als berechnet, weil es Reibung gibt und die Rollen selbst Gewicht haben. Ein Flaschenzug mit 20 Tragseilen spart darum weniger als das 20-Fache.</p>
        ${warnbox('<b>Sicherheit:</b> Beim Flaschenzug mit Personen nur an einer geprüften Aufhängung arbeiten. Der Haken muss mindestens die dreifache Gewichtskraft tragen.')}` },
    { h: 'Vorgerechnet: Flaschenzug', worked: {
      given: 'Eine Last mit der Gewichtskraft 600 N hängt an einem Flaschenzug mit 3 tragenden Seilstücken. Wie gross sind die Zugkraft und die Seillänge bei einer Hubhöhe von 2 m?',
      steps: [['Zugkraft', 'F = 600 N : 3 = 200 N'], ['Seillänge', 's = 3 · 2 m = 6 m'], ['Arbeit prüfen', '200 N · 6 m = 1200 J und 600 N · 2 m = 1200 J. Die Arbeit ist gleich.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was gilt beim Flaschenzug mit 4 tragenden Seilstücken?',
        options: ['Die Zugkraft ist etwa ein Viertel, das Seil muss 4-mal so lang gezogen werden.', 'Die Zugkraft ist viermal so gross.', 'Man spart Kraft und Weg.', 'Die Arbeit ist viermal so gross.'],
        explain: 'Kraft wird gespart, der Weg wird länger. Die Arbeit bleibt gleich.' } }
  ],
  f6: [
    { h: 'Was ist physikalische Arbeit?',
      body: `<p>Arbeit wird nur verrichtet, wenn eine <b>Kraft entlang des Wegs</b> wirkt.</p>
        ${merk('<b>W = F · s</b><br>Einheit: Joule (J). 1 J = 1 N · 1 m.')}
        <p><b>Energie</b> beschreibt einen <b>Zustand</b> eines Körpers. <b>Arbeit</b> beschreibt einen <b>Prozess</b>. Beide haben die gleiche Einheit. Wenn an einem Körper Arbeit verrichtet wird, nimmt seine Energie zu.</p>` },
    { h: 'Arbeit oder keine Arbeit?',
      body: '<p>Tippe, ob an dem Körper physikalische Arbeit verrichtet wird.</p>', sim: 'arbeit' },
    { h: 'Die Leistung',
      body: `${merk('<b>P = W : t</b> (Arbeit durch Zeit)<br>Einheit: Watt (W). 1 W = 1 J : 1 s')}
        <p>Bei der Leistung spielt die <b>Zeit</b> eine Rolle. Wer dieselbe Treppe schneller hochrennt, verrichtet die gleiche Arbeit, hat aber die grössere Leistung. Watt ist bereits «pro Sekunde», darum sagt man nie «Watt pro Stunde».</p>
        <p>Auch dein Gehirn leistet etwas, auch wenn du nur still dasitzt (rund 20 W).</p>` },
    { h: 'Berechne deine Treppenleistung',
      body: '<p>Stelle Masse, Höhe und Zeit ein. Rechne mit g = 10 N/kg. Das Ergebnis ist ein berechneter Beispielwert, keine Messung.</p>', sim: 'treppe' },
    { h: 'Vorgerechnet: Schachspiel', worked: {
      given: 'Dein Gehirn hat eine Leistung von 20 W. Wie gross ist die Arbeit während eines vierstündigen Schachspiels?',
      steps: [['Zeit in Sekunden', '4 h = 4 · 3600 s = 14 400 s'], ['Rechnung', 'W = P · t = 20 W · 14 400 s = 288 000 J'], ['Antwort', '288 000 J = 288 kJ']] } },
    { h: 'Kurz testen',
      check: { q: 'Zwei Personen steigen die gleiche Treppe hinauf. Person A braucht 20 s, Person B braucht 15 s. Beide haben die gleiche Masse. Was stimmt?',
        options: ['Die Arbeit ist gleich, Person B hat die grössere Leistung.', 'Person A verrichtet mehr Arbeit.', 'Die Leistung ist gleich.', 'Person B verrichtet mehr Arbeit.'],
        explain: 'Gleiche Gewichtskraft und gleiche Höhe ergeben gleiche Arbeit. Person B braucht dafür weniger Zeit und hat die grössere Leistung.' } }
  ]
};
const GOALS = {
  f1: ['Wirkungen von Kräften beschreiben', 'Masse und Gewichtskraft unterscheiden und Gewichtskraft berechnen'],
  f2: ['Haft-, Gleit- und Rollreibung unterscheiden', 'Reibung im Alltag bewerten'],
  f3: ['Kraftpfeile richtig zeichnen', 'Kräfte addieren und subtrahieren'],
  f4: ['Kräfte mit dem Kräfteparallelogramm zerlegen', 'erklären, warum schräges Ziehen mehr Kraft braucht'],
  f5: ['Kraft sparen mit einfachen Maschinen erklären', 'die goldene Regel der Mechanik anwenden'],
  f6: ['Arbeit und Leistung berechnen', 'Arbeit, Energie und Leistung unterscheiden']
};
const LEARN = {
  'f1-wirkung': 'Kräfte und ihre Wirkungen', 'f1-allein': 'Kräfte und ihre Wirkungen', 'f1-masse': 'Die Gewichtskraft', 'f1-gewicht': 'Vorgerechnet: Gewichtskraft', 'f1-mond': 'Miss die Gewichtskraft', 'f1-kraftmesser': 'Miss die Gewichtskraft',
  'f2-arten': 'Drei Arten der Reibung', 'f2-reihe': 'Drei Arten der Reibung', 'f2-flaeche': 'Drei Arten der Reibung', 'f2-nutzen': 'Reibung im Alltag', 'f2-anfahren': 'Ziehe den Klotz', 'f2-masse': 'Vorgerechnet: Reibung und Masse',
  'f3-pfeil': 'Der Kraftpfeil', 'f3-add': 'Kräfte addieren und subtrahieren', 'f3-sub': 'Vorgerechnet: Seilziehen', 'f3-konstant': 'Seilziehen', 'f3-gegen': 'Kraft und Gegenkraft', 'f3-gleich': 'Kraft und Gegenkraft',
  'f4-schnur': 'Schräg ziehen kostet Kraft', 'f4-faden': 'Schräg ziehen kostet Kraft', 'f4-parallelo': 'Das Kräfteparallelogramm', 'f4-kiste': 'Hänge ein Gewicht auf', 'f4-senkrecht': 'Vorgerechnet: Senkrechte Kräfte', 'f4-teilen': 'Hänge ein Gewicht auf',
  'f5-rampe': 'Die schiefe Ebene', 'f5-rampe-num': 'Die schiefe Ebene', 'f5-hebel': 'Hebel und Flaschenzug', 'f5-flasch': 'Vorgerechnet: Flaschenzug', 'f5-seil': 'Vorgerechnet: Flaschenzug', 'f5-gold': 'Einfache Maschinen',
  'f6-arbeit': 'Arbeit oder keine Arbeit?', 'f6-w': 'Was ist physikalische Arbeit?', 'f6-p': 'Die Leistung', 'f6-wpt': 'Vorgerechnet: Schachspiel', 'f6-treppe': 'Berechne deine Treppenleistung', 'f6-zeit': 'Die Leistung'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Feder', pw: 'dehnt sich' },
  { xp: 80, name: 'Hebel', pw: 'spart Kraft' },
  { xp: 200, name: 'Rampe', pw: 'verlängert den Weg' },
  { xp: 380, name: 'Flaschenzug', pw: 'zieht an' },
  { xp: 620, name: 'Kran', pw: 'hebt Lasten' },
  { xp: 920, name: 'Newton', pw: 'kennt alle Kräfte' }
];

/* ---------- Thema: 8_5 Kräfte, Arbeit und Leistung erforschen ---------- */
const TOPIC = {
  id: 'nt8-5', storeKey: 'halingen-nt8-5-v1', other: { title: '9_4 Energie und Leistung erfassen', href: '9_4_Energie_und_Leistung_erfassen.html' },
  title: 'Kräfte, Arbeit und Leistung erforschen', lead: 'Kraft, Weg, Arbeit und Zeit', tag: 'Natur und Technik', cardName: 'Formelkarte',
  tips: ['Welche Kraft wirkt worauf? Zeichne den Kraftpfeil am Körper.', 'Watt ist schon «pro Sekunde».'],
  formulas: [
    ['Gewichtskraft', 'F = m · g', 'g = 10 N/kg auf der Erde'],
    ['Arbeit', 'W = F · s', 'in Joule (J)'],
    ['Leistung', 'P = W : t', 'in Watt (W)'],
    ['Schiefe Ebene', 'F = G · h : s', 'ohne Reibung'],
    ['Flaschenzug', 'F = G : n', 'Seillänge = n · Hubhöhe'],
    ['Hebel', 'F1 · a1 = F2 · a2', 'Kraft mal Kraftarm = Last mal Lastarm']
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
  arbeit(el) {
    sorter(el, [
      { t: 'Nevio trägt einen Rucksack über eine waagrechte Brücke (Arbeit am Rucksack?)', ok: ['nein'], why: 'Die Kraft zeigt nach oben, der Weg ist waagrecht. Es gibt keine Kraft entlang des Wegs.' },
      { t: 'Nevio steigt mit dem Rucksack eine Treppe hinauf (Arbeit am Rucksack?)', ok: ['ja'], why: 'Der Rucksack wird angehoben. Die Kraft wirkt entlang des Wegs nach oben.' },
      { t: 'Du hältst einen schweren Ordner ruhig in der Hand (Arbeit am Ordner?)', ok: ['nein'], why: 'Es gibt keinen Weg. Ohne Weg gibt es keine physikalische Arbeit.' },
      { t: 'Du schiebst eine Kiste 5 m über den Boden (Arbeit an der Kiste?)', ok: ['ja'], why: 'Du schiebst entlang des Wegs. Die Kraft wirkt in Bewegungsrichtung.' },
      { t: 'Du hebst eine Kiste vom Boden auf den Tisch (Arbeit an der Kiste?)', ok: ['ja'], why: 'Die Kraft nach oben und der Weg nach oben haben dieselbe Richtung. Die Energie der Kiste nimmt zu.' },
      { t: 'Ein Satellit kreist im Weltall mit konstanter Geschwindigkeit um die Erde (Arbeit durch die Gewichtskraft?)', ok: ['nein'], why: 'Die Kraft steht immer senkrecht zur Bewegung. In Bewegungsrichtung wirkt keine Kraft.' }
    ], { ja: 'Arbeit wird verrichtet', nein: 'Keine Arbeit' }, 'Wirkt eine Kraft entlang des Wegs?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  kraftmesser(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Ort"><button class="btn sm on" data-o="10">Erde</button><button class="btn sm" data-o="1.6">Mond</button></div>
      <div class="spring" aria-hidden="true"><div class="sp" id="sp"></div><div class="wgt" id="wg"></div></div>
      ${sl('km', 'Masse', 0, 400, 50, 200, 'g')}
      <div class="trio"><div><span class="k">Masse</span><b class="mono" id="t1"></b></div><div><span class="k">Gewichtskraft</span><b class="mono" id="t2"></b></div><div><span class="k">Dehnung</span><b class="mono" id="t3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let g = 10;
    function upd() {
      const m = +$id('km').value, F = r2(m / 1000 * g), dx = F * 10;
      $id('kmv').textContent = fmt(m);
      el.querySelectorAll('[data-o]').forEach(b => b.classList.toggle('on', +b.dataset.o === g));
      $id('t1').textContent = fmt(m) + ' g'; $id('t2').textContent = fmt(F, 2) + ' N'; $id('t3').textContent = fmt(dx, 0) + ' mm';
      $id('sp').style.height = (20 + dx * 1.2) + 'px'; $id('wg').style.width = (14 + m / 14) + 'px';
      $id('ro').innerHTML = `F = m · g = ${fmt(m / 1000, 2)} kg · ${fmt(g)} N/kg = <b>${fmt(F, 2)} N</b><br>Doppelte Masse, doppelte Gewichtskraft, doppelte Dehnung: Das ist eine Proportionalität (Modell: 10 mm pro Newton).`;
    }
    el.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', () => { g = +b.dataset.o; upd(); }));
    $id('km').addEventListener('input', upd); upd();
  },

  reibung(el) {
    const T = { h: ['Haftreibung', 0.5], g: ['Gleitreibung', 0.3], r: ['Rollreibung', 0.02] };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Reibungsart">${Object.keys(T).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-r="${k}">${T[k][0]}</button>`).join('')}</div>
      ${sl('rm', 'Masse des Klotzes', 100, 1000, 100, 500, 'g')}
      <div class="brow"><span class="bname">Reibungskraft</span><div class="btrack"><div class="bfill" id="rb"></div></div><b class="mono bval" id="rv"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let k = 'h';
    function upd() {
      const m = +$id('rm').value, G = m / 1000 * 10, F = r2(G * T[k][1]);
      $id('rmv').textContent = fmt(m);
      el.querySelectorAll('[data-r]').forEach(b => b.classList.toggle('on', b.dataset.r === k));
      $id('rb').style.width = Math.min(100, F / 3 * 100) + '%'; $id('rv').textContent = fmt(F, 2) + ' N';
      $id('ro').innerHTML = `Gewichtskraft ${fmt(G, 1)} N. ${T[k][0]}: <b>${fmt(F, 2)} N</b> (Beispielwert).<br>Mehr Masse, mehr Reibungskraft. Haftreibung &gt; Gleitreibung &gt; Rollreibung.`;
    }
    el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => { k = b.dataset.r; upd(); }));
    $id('rm').addEventListener('input', upd); $id('rb').style.width = '0%'; nf(el, upd);
  },

  seilziehen(el) {
    el.innerHTML = `<div class="sim"><svg viewBox="0 0 320 90" class="lensvg" role="img" aria-label="Seilziehen"><line x1="20" y1="45" x2="300" y2="45" class="rope"/><circle id="knot" cx="160" cy="45" r="9" class="knot"/><line id="aa" x1="150" y1="45" x2="150" y2="45" class="kl ka"/><line id="ab" x1="170" y1="45" x2="170" y2="45" class="kl kb"/><line id="ar" x1="160" y1="75" x2="160" y2="75" class="kl kr"/></svg>
      ${sl('fga', 'Gruppe A (links)', 0, 600, 50, 450, 'N')}${sl('fgb', 'Gruppe B (rechts)', 0, 600, 50, 380, 'N')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const a = +$id('fga').value, b = +$id('fgb').value, s = 0.2, net = a - b;
      $id('fgav').textContent = fmt(a); $id('fgbv').textContent = fmt(b);
      const set = (id, x1, x2) => { $id(id).setAttribute('x1', x1); $id(id).setAttribute('x2', x2); };
      set('aa', 150, 150 - a * s * 0.5); set('ab', 170, 170 + b * s * 0.5);
      set('ar', 160, 160 - net * s * 0.5);
      $id('knot').setAttribute('cx', 160 - Math.max(-20, Math.min(20, net / 12)));
      $id('ro').innerHTML = net === 0 ? `Beide ziehen mit ${fmt(a)} N: Gesamtkraft <b>0 N</b>. Das Seil bleibt in Ruhe.` : `${fmt(Math.max(a, b))} N − ${fmt(Math.min(a, b))} N = <b>${fmt(Math.abs(net))} N</b> nach ${net > 0 ? 'links (Gruppe A gewinnt)' : 'rechts (Gruppe B gewinnt)'}.`;
    }
    $id('fga').addEventListener('input', upd); $id('fgb').addEventListener('input', upd); upd();
  },

  parallelo(el) {
    el.innerHTML = `<div class="sim">${sl('pw', 'Winkel zwischen den Seilen', 0, 160, 20, 60, '°')}
      <div class="trio"><div><span class="k">Gewichtskraft</span><b class="mono">100 N</b></div><div><span class="k">Kraft je Seil</span><b class="mono" id="p1"></b></div><div><span class="k">Verhältnis</span><b class="mono" id="p2"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const w = +$id('pw').value, T = 50 / Math.cos(w / 2 * Math.PI / 180);
      $id('pwv').textContent = fmt(w);
      $id('p1').textContent = fmt(T, 0) + ' N'; $id('p2').textContent = fmt(T / 50, 1) + '-fach';
      $id('ro').innerHTML = w === 0 ? 'Senkrechter Zug: Jedes Seil trägt genau die Hälfte, also <b>50 N</b>.' : `Bei ${fmt(w)}° wirkt in jedem Seil <b>${fmt(T, 0)} N</b>, obwohl das Gewicht nur 100 N hat. Je grösser der Winkel, desto grösser die Kraft im Seil. Ein dünner Faden kann reissen.`;
    }
    $id('pw').addEventListener('input', upd); upd();
  },

  maschine(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Maschine"><button class="btn sm on" data-m="r">Schiefe Ebene</button><button class="btn sm" data-m="f">Flaschenzug</button></div>
      <div id="sl1"></div>
      <div class="trio"><div><span class="k">Kraft</span><b class="mono" id="m1"></b></div><div><span class="k">Weg</span><b class="mono" id="m2"></b></div><div><span class="k">Arbeit</span><b class="mono" id="m3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let mode = 'r';
    function build() {
      $id('sl1').innerHTML = mode === 'r' ? sl('mv', 'Länge der Rampe', 1, 8, 1, 4, 'm') : sl('mv', 'Tragende Seilstücke', 1, 6, 1, 3, '');
      $id('mv').addEventListener('input', upd);
    }
    function upd() {
      const v = +$id('mv').value, G = 600, h = 1;
      $id('mvv').textContent = fmt(v);
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
      let F, s;
      if (mode === 'r') { F = G * h / v; s = v; } else { F = G / v; s = v * h; }
      $id('m1').textContent = fmt(r2(F), 0) + ' N'; $id('m2').textContent = fmt(r2(s), 0) + ' m'; $id('m3').textContent = fmt(r2(F * s), 0) + ' J';
      $id('ro').innerHTML = `${mode === 'r' ? 'Rampe: Last 600 N, Höhe 1 m.' : 'Flaschenzug: Last 600 N, Hubhöhe 1 m.'} Kraft ${fmt(r2(F), 0)} N, Weg ${fmt(r2(s), 0)} m.<br>Arbeit = Kraft · Weg = <b>${fmt(r2(F * s), 0)} J</b>. Sie bleibt immer gleich (Modell ohne Reibung).`;
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; build(); upd(); }));
    build(); upd();
  },

  treppe(el) {
    el.innerHTML = `<div class="sim">${sl('tm', 'Masse', 40, 90, 5, 60, 'kg')}${sl('th', 'Höhenunterschied', 2, 6, 1, 4, 'm')}${sl('tt', 'Zeit', 3, 20, 1, 8, 's')}
      <div class="trio"><div><span class="k">Gewichtskraft</span><b class="mono" id="u1"></b></div><div><span class="k">Arbeit</span><b class="mono" id="u2"></b></div><div><span class="k">Leistung</span><b class="mono" id="u3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const m = +$id('tm').value, h = +$id('th').value, t = +$id('tt').value, F = m * 10, W = F * h, P = W / t;
      $id('tmv').textContent = fmt(m); $id('thv').textContent = fmt(h); $id('ttv').textContent = fmt(t);
      $id('u1').textContent = fmt(F) + ' N'; $id('u2').textContent = fmt(W) + ' J'; $id('u3').textContent = fmt(r2(P), 0) + ' W';
      $id('ro').innerHTML = `W = ${fmt(F)} N · ${fmt(h)} m = ${fmt(W)} J<br>P = ${fmt(W)} J : ${fmt(t)} s = <b>${fmt(r2(P), 0)} W</b><br>Weniger Zeit bei gleicher Arbeit ergibt mehr Leistung.`;
    }
    ['tm', 'th', 'tt'].forEach(id => $id(id).addEventListener('input', upd)); upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt8-5","titel":"Kräfte, Arbeit und Leistung erforschen","kapitel":"NaTech 8, Kapitel 5","audio":"nt8-5"});
