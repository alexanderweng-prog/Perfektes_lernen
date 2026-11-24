// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/7_1_Naturwissenschaften_erkunden.html
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

/* ---------- Inhalt: 7_1 Naturwissenschaften erkunden, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 'w1', nr: 1, title: 'Naturwissenschaften im Alltag', sub: 'Gebiete und Pseudowissenschaft',
    items: [
      { id: 'w1-gebiete', topic: 'Gebiete der Naturwissenschaften', make() {
        return mc('Welche drei klassischen Gebiete gehören zu den Naturwissenschaften?', ['Biologie, Chemie und Physik.', 'Geschichte, Geografie und Mathematik.', 'Astrologie, Esoterik und Chemie.', 'Sport, Musik und Biologie.'],
          'Die klassische Einteilung der Naturwissenschaften lautet Biologie, Chemie und Physik.');
      } },
      { id: 'w1-ueberschnitt', topic: 'Gebiete überschneiden sich', make() {
        return mc('Wieso lässt sich ein Beispiel oft nicht eindeutig einem Gebiet zuordnen?', ['Weil sich Biologie, Chemie und Physik überschneiden.', 'Weil man sich bei der Einteilung nicht auskennt.', 'Weil jedes Beispiel nur zur Chemie gehört.', 'Weil es eigentlich nur ein einziges Gebiet gibt.'],
          'Die Einteilung in Biologie, Chemie und Physik ist hilfreich. Die Gebiete überschneiden sich aber. Zum Beispiel gehört die Gärung bei der Hefe zur Biologie und zur Chemie.');
      } },
      { id: 'w1-astro', topic: 'Astronomie und Astrologie', make() {
        return mc('Welches Gebiet gehört zu den Naturwissenschaften?', ['Astronomie (Erforschung der Sterne und Planeten).', 'Astrologie (Deutung der Sternzeichen).', 'Beide.', 'Keines von beiden.'],
          'Die Astronomie untersucht Himmelskörper mit Beobachtungen und Messungen. Die Astrologie deutet Sternzeichen. Sie erfüllt wichtige Kriterien einer Naturwissenschaft nicht und zählt zu den Pseudowissenschaften.');
      } },
      { id: 'w1-zukunft', topic: 'Wissenschaftliche Aussagen', make() {
        return mc('Beurteile die Aussage: «In den Sternen kann man sehen, was in der Zukunft passiert.»', ['Keine wissenschaftliche Aussage, denn sie lässt sich nicht durch Beobachtungen oder Experimente überprüfen.', 'Eine wissenschaftliche Aussage, denn es gibt viele Sterne.', 'Eine wissenschaftliche Aussage, denn sie steht in Zeitungen.', 'Eine wissenschaftliche Aussage, denn viele Leute glauben daran.'],
          'Eine wissenschaftliche Aussage muss sich mit Beobachtungen oder Experimenten prüfen lassen. Dass viele Leute daran glauben oder dass etwas gedruckt ist, reicht dafür nicht.');
      } },
      { id: 'w1-luca', topic: 'Aussage mit Beobachtungen belegen', make() {
        return mc('Luca sagt: «Rauchen kann Lungenkrebs verursachen. Das weiss man, weil die meisten Lungenkrebspatienten Raucher sind oder waren.» Wie beurteilst du das?', ['Es ist eine wissenschaftliche Aussage, denn sie stützt sich auf Beobachtungen bei vielen Patienten.', 'Es ist keine wissenschaftliche Aussage, denn Luca ist kein Arzt.', 'Es ist keine wissenschaftliche Aussage, denn Rauchen ist verboten.', 'Es ist nur eine Meinung, denn Zahlen zählen nicht.'],
          'Luca stützt sich auf Beobachtungen bei vielen Patienten. Wichtig ist die Formulierung: Die Beobachtungen zeigen, dass Rauchen Lungenkrebs verursachen kann. Falsch wäre die Behauptung, dass es ihn immer verursacht.');
      } },
      { id: 'w1-anna', topic: 'Einzelne Messung genügt nicht', make() {
        return mc('Anna sagt: «Schnecken brauchen 30 Minuten für 1 Meter. Das ist so, denn ich habe es einmal gemessen.» Wie beurteilst du das?', ['Keine wissenschaftliche Aussage, denn sie beruht auf einer einzigen Messung bei einer Schnecke.', 'Eine wissenschaftliche Aussage, denn Anna hat gemessen.', 'Eine wissenschaftliche Aussage, denn Schnecken sind langsam.', 'Eine wissenschaftliche Aussage, denn 30 Minuten ist eine genaue Zahl.'],
          'Eine einzelne Messung bei einer einzigen Schnecke genügt nicht. Man müsste mehrmals und bei mehreren Schnecken messen. Erst dann lässt sich eine Aussage belegen.');
      } }
    ]
  },
  {
    id: 'w2', nr: 2, title: 'Der Weg zur Erkenntnis', sub: 'Frage, Vermutung, Experiment',
    items: [
      { id: 'w2-beobachtung', topic: 'Beobachtung', make() {
        return mc('Was ist eine naturwissenschaftliche Beobachtung?', ['Das, was du mit den Sinnen oder mit Messgeräten feststellst, zum Beispiel «der kurze Draht wird warm».', 'Eine Erklärung, warum etwas passiert.', 'Eine Vermutung vor dem Versuch.', 'Eine Meinung, die dir gefällt.'],
          'Eine Beobachtung hält fest, was du wahrnimmst oder misst. Erklärungen und Vermutungen sind etwas anderes.');
      } },
      { id: 'w2-vermutung', topic: 'Vermutung', make() {
        return mc('Was ist eine Vermutung (Hypothese)?', ['Eine begründete Annahme, die du mit einem Experiment überprüfen kannst.', 'Ein Ergebnis, das du schon sicher kennst.', 'Eine Frage, die niemand beantworten kann.', 'Eine Zeichnung des Versuchsaufbaus.'],
          'Mit einer Vermutung sagst du voraus, wie ein Versuch ausgehen könnte. Das Experiment zeigt dann, ob sie stimmt. Du bestätigst oder widerlegst sie.');
      } },
      { id: 'w2-reihenfolge', topic: 'Experimentierprozess', make() {
        return mc('Welche Reihenfolge passt zum Experimentierprozess?', [
          'Forschungsfrage, Vermutung, Plan, Durchführung mit Beobachtungen, Auswertung, Antwort.',
          'Durchführung, Auswertung, Vermutung, Forschungsfrage, Plan, Antwort.',
          'Antwort, Plan, Vermutung, Durchführung, Forschungsfrage, Auswertung.',
          'Plan, Antwort, Durchführung, Forschungsfrage, Auswertung, Vermutung.'],
          'Du beginnst mit der Forschungsfrage und schreibst deine Vermutung auf. Dann planst du das Experiment, führst es durch und dokumentierst die Beobachtungen. Zuletzt wertest du aus, beantwortest die Frage und bestätigst oder widerlegst deine Vermutung.');
      } },
      { id: 'w2-draht', topic: 'Erkenntnis aus dem Drahtversuch', make() {
        return mc('Du hältst Drähte verschiedener Länge zwischen die Pole einer Batterie. Welche Erkenntnis ziehst du?', ['Je länger der Draht, desto weniger warm wird er.', 'Je länger der Draht, desto wärmer wird er.', 'Die Länge hat keinen Einfluss.', 'Nur dicke Drähte werden warm.'],
          'Im Versuch wird ein kurzer Draht wärmer als ein langer Draht mit gleichem Durchmesser. Warum das so ist, ist hier noch nicht die Frage. Es geht um das Phänomen und seine Anwendung.');
      } },
      { id: 'w2-heizung', topic: 'Erkenntnis anwenden', make() {
        return mc('Du baust eine Handheizung aus Draht und Batterie. Was ist wichtig?', ['Die Drahtlänge vorher testen, denn der Draht darf nicht zu heiss werden, und die Schlaufen dürfen sich nicht berühren.', 'Möglichst einen sehr kurzen Draht verwenden, damit er richtig heiss wird.', 'Die Drahtschlaufen fest aneinanderdrücken.', 'Den Draht mit Heftklammern an der Unterlage befestigen.'],
          'Die Länge muss zum Zweck passen: warm, aber nicht zu heiss. Berühren sich unlackierte Schlaufen, entsteht eine Abkürzung für den Strom. Heftklammern können zwei Schlaufen verbinden.');
      } },
      { id: 'w2-sicher', topic: 'Sicherheit beim Drahtversuch', make() {
        return mc('Du schliesst einen Draht an die Batterie an. Was beachtest du?', ['Nur kurz einschalten und eine feuerfeste Unterlage verwenden, denn Draht und Kabel können heiss werden.', 'Nichts, bei einer Batterie ist alles ungefährlich.', 'Den Draht möglichst lange halten, damit er warm wird.', 'Den Draht in der Hand halten, um die Wärme zu spüren.'],
          'Auch eine kleine Batterie kann einen Draht stark erwärmen. Schalte nur kurz ein, arbeite auf einer feuerfesten Unterlage und berühre den Draht nicht dauerhaft. Billige Kabel können sich selbst erhitzen.');
      } }
    ]
  },
  {
    id: 'w3', nr: 3, title: 'Erfindungen und Entdeckungen', sub: 'Wie sie das Leben verändern',
    items: [
      { id: 'w3-unterschied', topic: 'Entdeckung und Erfindung', make() {
        return mc('Was ist der Unterschied zwischen einer Entdeckung und einer Erfindung?', ['Eine Entdeckung findet etwas, das schon da ist. Eine Erfindung ist etwas Neues, das Menschen entwickeln.', 'Eine Entdeckung ist immer ein Zufall, eine Erfindung nie.', 'Es gibt keinen Unterschied.', 'Eine Erfindung findet etwas, das schon da ist.'],
          'Ein Beispiel: Man entdeckt eine Naturerscheinung oder einen Stoff. Man erfindet ein Gerät oder ein Verfahren.');
      } },
      { id: 'w3-einfluss', topic: 'Bedeutung von Erfindungen', make() {
        return mc('Worauf kommt es bei Erfindungen und Entdeckungen vor allem an?', ['Zu beurteilen, wie sie das Leben der Menschen verändert haben.', 'Möglichst viele Jahreszahlen auswendig zu lernen.', 'Die Namen aller Erfinder aufzuzählen.', 'Nur an die Jahre zu denken, in denen sie gemacht wurden.'],
          'Wichtig ist nicht das Auswendiglernen, sondern die Frage, welchen Einfluss eine Erfindung auf die Gesellschaft und auf den Alltag hat.');
      } },
      { id: 'w3-zufall', topic: 'Zufällige Entdeckungen', make() {
        return mc('Welche Aussage über Entdeckungen und Erfindungen stimmt?', ['Nicht alle Errungenschaften entstanden durch ein geplantes Vorgehen. Manche wurden durch Zufall gemacht.', 'Alle Erfindungen sind sorgfältig geplant worden.', 'Zufälle spielen in der Wissenschaft keine Rolle.', 'Zufällige Erfindungen haben nie etwas verändert.'],
          'Manche Errungenschaften entstanden zufällig und haben das Leben trotzdem nachhaltig verändert. Wer aufmerksam beobachtet, erkennt solche Zufälle.');
      } },
      { id: 'w3-heizgeraete', topic: 'Leben mit und ohne Technik', make() {
        return mc('Wie haben elektrische Heizgeräte das Leben der Menschen verändert?', ['Sie machen Wärme einfach und auf Knopfdruck verfügbar. Früher musste man dafür Brennstoffe sammeln und Feuer machen.', 'Sie haben das Leben nicht verändert.', 'Sie machen die Wärme teurer und komplizierter.', 'Sie wurden nur für Wissenschaftler erfunden.'],
          'Die Erkenntnis über die Wärmewirkung des Stroms wird in vielen Geräten genutzt. Das macht den Alltag einfacher und zeigt, wie Erkenntnisse zu Nützlichem werden.');
      } },
      { id: 'w3-vorurteil', topic: 'Vorurteile über Naturwissenschaften', make() {
        return mc('Ein Vorurteil lautet: «Biologie ist gesund und gut, Chemie ist giftig und explosiv.» Wie beurteilst du das?', ['Das stimmt so nicht. Jedes Gebiet hat nützliche und gefährliche Seiten.', 'Das stimmt: Chemie ist immer gefährlich.', 'Das stimmt: Biologie ist immer harmlos.', 'Das gilt nur für die Physik.'],
          'Medikamente und Putzmittel sind Chemie, Krankheitserreger gehören zur Biologie. Auf die Anwendung kommt es an, nicht auf das Gebiet.');
      } },
      { id: 'w3-jahre', topic: 'Zeitgefühl für Erfindungen', ext: true, make() {
        const y = rnd([1843, 1886, 1895, 1942, 1960, 1962]), d = 2026 - y;
        return num(`Eine wichtige Erfindung stammt aus dem Jahr ${y}. Wie viele Jahre ist das her, gerechnet bis zum Jahr 2026?`, 'Jahre', d, 'Rechne 2026 minus das Jahr der Erfindung.', `2026 − ${y} = ${d} Jahre`);
      } }
    ]
  },
  {
    id: 'w4', nr: 4, title: 'Das Mikroskop', sub: 'Gesamtvergrösserung',
    items: [
      { id: 'w4-gesamt', topic: 'Gesamtvergrösserung berechnen', make() {
        const o = rnd([10, 15]), b = rnd([4, 10, 40]), g = o * b;
        return num(`Ein Mikroskop hat ein Okular mit ${fmt(o)}-facher und ein Objektiv mit ${fmt(b)}-facher Vergrösserung. Wie gross ist die Gesamtvergrösserung?`, '-fach', g, 'Multipliziere die Vergrösserung von Okular und Objektiv.', `Gesamtvergrösserung = Okular · Objektiv = ${fmt(o)} · ${fmt(b)} = ${fmt(g)}`);
      } },
      { id: 'w4-okular', topic: 'Teile des Mikroskops', make() {
        return mc('Durch welches Teil des Mikroskops schaust du hinein?', ['Durch das Okular.', 'Durch das Objektiv.', 'Durch den Objekttisch.', 'Durch den Grobtrieb.'],
          'Das Okular ist die Linse, durch die du schaust. Das Objektiv ist die Linse nahe am Präparat.');
      } },
      { id: 'w4-revolver', topic: 'Objektivrevolver', make() {
        return mc('Wozu dient der Objektivrevolver?', ['Zum Wechseln der Objektive und damit der Vergrösserung.', 'Zum Scharfstellen des Bildes.', 'Zum Beleuchten des Präparats.', 'Zum Festhalten des Objektträgers.'],
          'Im Objektivrevolver sitzen mehrere Objektive mit verschiedener Vergrösserung. Du drehst ihn, bis das gewünschte Objektiv einrastet.');
      } },
      { id: 'w4-bild', topic: 'Bildgrösse berechnen', ext: true, make() {
        const s = rnd([[0.05, 40], [0.1, 100], [0.02, 400], [0.05, 100], [0.1, 40], [0.01, 400]]), b = s[0] * s[1];
        return num(`Eine Zelle ist ${fmt(s[0])} mm lang. Du betrachtest sie mit ${fmt(s[1])}-facher Gesamtvergrösserung. Wie lang erscheint sie im Bild?`, 'mm', b, 'Bildgrösse = wirkliche Grösse · Vergrösserung.', `${fmt(s[0])} mm · ${fmt(s[1])} = ${fmt(b)} mm`);
      } },
      { id: 'w4-vergr', topic: 'Vergrösserung bestimmen', ext: true, make() {
        const s = rnd([[6, 0.03], [8, 0.02], [4, 0.1], [10, 0.1], [12, 0.06], [9, 0.045]]), v = s[0] / s[1];
        return num(`Ein Objekt ist ${fmt(s[1])} mm lang. Im Bild erscheint es ${fmt(s[0])} mm lang. Wie gross ist die Vergrösserung?`, '-fach', v, 'Vergrösserung = Bildgrösse : wirkliche Grösse.', `${fmt(s[0])} mm : ${fmt(s[1])} mm = ${fmt(v)}`);
      } },
      { id: 'w4-fehler', topic: 'Fehlersuche am Mikroskop', make() {
        return mc('Du siehst im Mikroskop nichts. Was prüfst du zuerst?', ['Ob das Licht eingeschaltet ist, das Objektiv eingerastet ist und das Präparat unter dem Objektiv liegt.', 'Ob die Schulstunde schon lange dauert.', 'Ob das Okular rot ist.', 'Ob du ein anderes Mikroskop brauchst.'],
          'Typische Fehler: Das Mikroskop ist nicht an den Strom angeschlossen, das Objektiv ist nicht eingerastet, das Präparat liegt nicht unter dem Objektiv oder ist zu dick, das Bild ist unscharf.');
      } }
    ]
  },
  {
    id: 'w5', nr: 5, title: 'Zellen beobachten', sub: 'Wasserpest und Zwiebelhaut',
    items: [
      { id: 'w5-anzahl', topic: 'Zellgrösse und Anzahl', make() {
        const z = rnd([0.01, 0.02, 0.05, 0.1, 0.04, 0.025]), n = 1 / z;
        return num(`Eine Zelle ist ${fmt(z)} mm lang. Wie viele solche Zellen passen nebeneinander auf 1 mm?`, 'Zellen', Math.round(n), 'Teile die Strecke 1 mm durch die Länge einer Zelle.', `1 mm : ${fmt(z)} mm = ${fmt(Math.round(n))} Zellen`);
      } },
      { id: 'w5-bestehen', topic: 'Lebewesen und Zellen', make() {
        return mc('Welche Aussage stimmt?', ['Alle Lebewesen bestehen aus mindestens einer Zelle.', 'Lebewesen besitzen Zellen wie Körperteile.', 'Nur Pflanzen bestehen aus Zellen.', 'Zellen gibt es nur unter dem Mikroskop.'],
          'Alles Lebendige besteht aus mindestens einer Zelle. Zellen sind die kleinste Einheit der Lebewesen. Sie sind nicht einfach «Körperteile», die Lebewesen besitzen.');
      } },
      { id: 'w5-plasma', topic: 'Bewegung in Wasserpestzellen', make() {
        return mc('Was kannst du in Zellen der Wasserpest unter dem Mikroskop beobachten?', ['Die Blattgrünkörner bewegen sich (Plasmaströmung).', 'Die Zellen wandern aus dem Blatt heraus.', 'Die Zellen leuchten im Dunkeln.', 'Die Zellen sind völlig leer.'],
          'In lebenden Wasserpestzellen strömt das Zellinnere. Dabei werden die grünen Blattgrünkörner mitbewegt. Das ist ein Phänomen, das du beobachten und beschreiben kannst.');
      } },
      { id: 'w5-salz', topic: 'Zwiebelhautzellen in Salzwasser', make() {
        return mc('Du legst Zwiebelhautzellen in Salzwasser. Was beobachtest du?', ['Die roten Flächen in den Zellen werden kleiner.', 'Die Zellen werden grösser und platzen.', 'Nichts ändert sich.', 'Die Zellen verschwinden.'],
          'Im Salzwasser ziehen sich die roten Flächen in den Zellen zusammen. Gibst du wieder reines Wasser dazu, werden sie wieder grösser. Salz kann also Pflanzen beeinflussen. Das erklärt, warum Streusalz im Winter Pflanzen schaden kann.');
      } },
      { id: 'w5-zeichnung', topic: 'Naturwissenschaftliche Zeichnung', make() {
        return mc('Was gehört auf eine naturwissenschaftliche Zeichnung?', ['Ein Titel und die verwendete Gesamtvergrösserung.', 'Nur eine bunte Verzierung.', 'Nur dein Name, sonst nichts.', 'Das Datum des letzten Schultags.'],
          'Eine naturwissenschaftliche Zeichnung hält genau fest, was du siehst. Dazu gehören zum Beispiel ein Titel und die Angabe der verwendeten Gesamtvergrösserung.');
      } },
      { id: 'w5-licht', topic: 'Einfluss von Licht', ext: true, make() {
        return mc('Du siehst die Bewegung der Blattgrünkörner in der Wasserpest kaum. Was kannst du versuchen?', ['Die Pflanze vorher mit einer Lampe beleuchten, denn Licht regt die Bewegung an.', 'Die Pflanze im Dunkeln lassen.', 'Die Pflanze kochen.', 'Mehr Salz zugeben.'],
          'Die Bewegung der Blattgrünkörner wird durch Licht angeregt. Besonders gut siehst du sie bei frisch gekauften Pflanzen.');
      } }
    ]
  },
  {
    id: 'w6', nr: 6, title: 'Vom Samen zur Pflanze', sub: 'Quellung, Keimung, Kontrollexperiment',
    items: [
      { id: 'w6-teile', topic: 'Aufbau eines Samens', make() {
        return mc('Woraus besteht ein Bohnensamen?', ['Aus Samenhaut, Keimblättern und der jungen Pflanze (Keimling).', 'Nur aus Wasser.', 'Aus Wurzel, Stamm und Krone.', 'Aus Blüte und Frucht.'],
          'Aussen schützt die Samenhaut. Im Inneren liegen die Keimblätter mit Nährstoffen und die junge Pflanze, die später auskeimt.');
      } },
      { id: 'w6-quellung', topic: 'Quellung', make() {
        return mc('Was geschieht bei der Quellung eines Samens?', ['Der Samen nimmt Wasser auf, wird grösser und schwerer.', 'Der Samen trocknet aus.', 'Der Samen verliert Nährstoffe.', 'Der Samen wird kleiner.'],
          'Bei der Quellung nimmt der Samen Wasser auf. Danach beginnt die Keimung: Die junge Pflanze wächst aus dem Samen.');
      } },
      { id: 'w6-kontrolle', topic: 'Kontrollexperiment', make() {
        return mc('Mathis vermutet, dass Kürbissamen im Dunkeln nicht wachsen. Wie prüfst du das?', ['Du stellst zwei gleiche Gruppen auf. Eine steht hell und eine dunkel, sonst ist alles gleich.', 'Du stellst nur eine Gruppe ins Dunkle.', 'Du giesst eine Gruppe mit Salzwasser.', 'Du fragst deine Nachbarin nach ihrer Meinung.'],
          'Du brauchst einen Vergleich: Eine Gruppe im Hellen (Kontrolle) und eine im Dunkeln. Nur das Licht darf sich unterscheiden.');
      } },
      { id: 'w6-fair', topic: 'Fairer Vergleich', make() {
        return mc('Du untersuchst den Einfluss von Salz auf Kressesamen. Was bedeutet «fairer Vergleich»?', ['Alle Schälchen stehen etwa gleich hell und bekommen etwa gleich viel Wasser. Nur der Salzgehalt ist verschieden.', 'Jedes Schälchen bekommt eine andere Wassermenge.', 'Ein Schälchen steht am Fenster, eines im Keller.', 'Alle Schälchen bekommen gleich viel Salz.'],
          'Bei einem fairen Vergleich unterscheidet sich nur die Grösse, die du untersuchst (hier das Salz). Alle anderen Bedingungen müssen möglichst gleich sein.');
      } },
      { id: 'w6-ohne', topic: 'Schälchen ohne Salz', make() {
        return mc('Warum gehört zum Kressesalz-Versuch ein Schälchen ohne Salz?', ['Als Kontrollexperiment. Nur im Vergleich siehst du, was das Salz bewirkt.', 'Damit mehr Kresse wächst.', 'Damit der Versuch länger dauert.', 'Damit niemand Salz nachfüllen muss.'],
          'Ohne ein Schälchen ohne Salz kannst du nicht beurteilen, ob die Kresse wegen des Salzes schlechter wächst. Das Schälchen ohne Salz zeigt, wie sie normalerweise wächst.');
      } },
      { id: 'w6-wasser', topic: 'Wasseraufnahme beim Quellen', make() {
        const s = rnd([[1.5, 3.0], [2.0, 3.8], [1.8, 3.4], [1.6, 3.5], [2.2, 4.0], [1.2, 2.6]]), d = Math.round((s[1] - s[0]) * 10) / 10;
        return num(`Ein Bohnensamen wiegt trocken ${fmt(s[0], 1)} g. Nach dem Quellen wiegt er ${fmt(s[1], 1)} g. Wie viel Wasser hat er aufgenommen?`, 'g', d, 'Das aufgenommene Wasser ist der Unterschied der beiden Massen.', `${fmt(s[1], 1)} g − ${fmt(s[0], 1)} g = ${fmt(d, 1)} g`);
      } }
    ]
  }
];

/* ---------- Lerninhalt: Lektionskarten pro Station ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  w1: [
    { h: 'Naturwissenschaften im Alltag',
      body: `<p>Naturwissenschaften und Technik stecken in deinem Alltag: im Handy, in Medikamenten, im Essen und im Wetterbericht.</p>
        ${merk('<b>Biologie:</b> Lebewesen<br><b>Chemie:</b> Stoffe und ihre Umwandlungen<br><b>Physik:</b> Kräfte, Energie, Licht, Strom, Bewegung')}
        <p>Die Gebiete überschneiden sich. Ein Beispiel ist die Hefe, die einen Teig aufgehen lässt: Sie ist ein Lebewesen (Biologie) und baut Stoffe um (Chemie).</p>` },
    { h: 'Ordne die Beispiele zu',
      body: '<p>Tippe bei jedem Beispiel auf das passende Gebiet. Manchmal passt mehr als eins. Und manche Beispiele gehören gar nicht zu den Naturwissenschaften.</p>', sim: 'gebiete' },
    { h: 'Was ist Naturwissenschaft?',
      body: `<p>Naturwissenschaften untersuchen die Natur mit <b>Beobachtungen, Messungen und Experimenten</b>. Ihre Aussagen müssen sich überprüfen lassen.</p>
        ${merk('Echte Naturwissenschaft: Astronomie, Chemie.<br>Keine Naturwissenschaft (Pseudowissenschaft): Astrologie, Alchemie, Esoterik.')}
        <p>Pseudowissenschaften erfüllen wichtige Kriterien nicht. Ihre Aussagen lassen sich zum Beispiel nicht überprüfen.</p>` },
    { h: 'Vorgerechnet: Wissenschaftlich oder nicht?', worked: {
      given: 'Anna sagt: «Schnecken brauchen 30 Minuten für 1 Meter. Das ist so, denn ich habe es einmal gemessen.» Ist das eine wissenschaftliche Aussage?',
      steps: [['Woher stammt die Aussage?', 'Sie beruht auf einer einzigen Messung bei einer einzigen Schnecke.'], ['Lässt sie sich überprüfen?', 'Ja, aber dafür müsste man mehrmals und bei mehreren Schnecken messen.'], ['Antwort', 'Das ist noch keine wissenschaftliche Aussage. Eine Messung allein genügt nicht.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage ist eine wissenschaftliche Aussage?',
        options: ['Eisen rostet in feuchter Luft. Das zeigen viele Versuche.', 'Sternzeichen bestimmen, wie dein Tag verläuft.', 'Geister wohnen in alten Häusern.', 'Wer eine Glückszahl trägt, besteht jeden Test.'],
        explain: 'Die Aussage über das Rosten stützt sich auf Versuche, die sich wiederholen lassen. Die anderen Aussagen lassen sich nicht überprüfen.' } }
  ],
  w2: [
    { h: 'Der Weg zur Erkenntnis',
      body: `<p>Naturwissenschaftler gewinnen Erkenntnisse in einem festen Ablauf, dem <b>Experimentierprozess</b>:</p>
        <ol><li>Forschungsfrage formulieren</li><li>Vermutung aufschreiben</li><li>Experiment planen</li><li>Durchführen und Beobachtungen festhalten</li><li>Auswerten</li><li>Frage beantworten und Vermutung bestätigen oder widerlegen</li></ol>
        ${merk('<b>Beobachtung:</b> was du feststellst.<br><b>Vermutung:</b> was du erwartest.<br><b>Experiment:</b> ein geplanter Versuch zur Prüfung.<br>Die <b>Untersuchungsbedingungen</b> müssen kontrolliert und gleich sein.')}` },
    { h: 'Das Experiment: Drähte werden warm',
      body: `<p>Du hältst Drähte unterschiedlicher Länge zwischen die beiden Pole einer Batterie. Der Draht wird warm.</p>
        ${warnbox('<b>Sicherheit:</b> Schalte nur kurz ein und arbeite auf einer feuerfesten Unterlage. Prüfe vorher, dass die Kabel gut sind, denn schlechte Kabel können selbst heiss werden. Berühre den Draht nicht dauerhaft.')}` },
    { h: 'Ändere die Drahtlänge',
      body: '<p>Das Modell zeigt, wie warm der Draht relativ wird. Es sind keine Messwerte. Beobachte, was bei langen und kurzen Drähten passiert.</p>', sim: 'draht' },
    { h: 'Vorgerechnet: Vom Versuch zur Anwendung', worked: {
      given: 'Du möchtest wissen, wie die Länge eines Drahts seine Erwärmung beeinflusst. Wie gehst du vor?',
      steps: [['Forschungsfrage', 'Wie hängt es von der Länge des Drahts ab, wie warm er an der Batterie wird?'], ['Vermutung', 'Je kürzer der Draht, desto wärmer wird er.'], ['Planung und Durchführung', 'Drähte gleicher Dicke, aber verschiedener Länge nacheinander kurz an die Batterie halten und die Wärme beobachten.'], ['Auswertung', 'Der kurze Draht wird wärmer als der lange.'], ['Antwort', 'Die Vermutung ist bestätigt. Die Erkenntnis lässt sich für eine Handheizung nutzen.']] } },
    { h: 'Aus Erkenntnis wird eine Anwendung',
      body: `<p>Mit der Erkenntnis kannst du etwas Nützliches bauen, zum Beispiel eine <b>Hand- oder Fussheizung</b>.</p>
        <ul><li>Teste vorher die Drahtlänge. Der Draht darf nicht zu heiss werden.</li>
        <li>Die Drahtschlaufen dürfen sich nicht berühren, wenn der Draht keine Lackschicht hat.</li>
        <li>Verwende keine Heftklammern: Sie können zwei Schlaufen verbinden.</li></ul>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Kollege sagt: «Ich vermute, dass dickere Drähte langsamer warm werden.» Was ist das?',
        options: ['Eine Vermutung, die man mit einem Experiment prüfen kann.', 'Eine Beobachtung.', 'Ein Messergebnis.', 'Eine Forschungsfrage.'],
        explain: 'Die Aussage sagt voraus, wie ein Versuch ausgehen könnte. Das ist eine Vermutung. Mit einem Experiment prüfst du, ob sie stimmt.' } }
  ],
  w3: [
    { h: 'Entdeckung oder Erfindung?',
      body: `<p>Eine <b>Entdeckung</b> findet etwas, das schon da war, zum Beispiel einen Stoff oder eine Naturerscheinung. Eine <b>Erfindung</b> ist etwas Neues, das Menschen entwickeln, zum Beispiel ein Gerät.</p>
        <p>Naturwissenschaftliche Erkenntnisse führen oft zu Erfindungen. Aus der Erkenntnis über die Wärmewirkung des Stroms entstanden viele Geräte, die du täglich nutzt.</p>` },
    { h: 'Wie Erfindungen das Leben verändern',
      body: `<p>Überlege dir, wie dein Alltag ohne eine Erfindung aussähe. Wie konnte man früher über grosse Distanzen sprechen? Wie bewegten sich die Menschen vor 200 Jahren fort?</p>
        ${merk('Es geht nicht ums Auswendiglernen von Jahreszahlen. Wichtig ist, den <b>Einfluss</b> einer Erfindung auf das Leben abzuschätzen.')}
        <p>Auch negative Seiten dürfen dabei zur Sprache kommen, ohne die Naturwissenschaften schlechtzumachen.</p>` },
    { h: 'Zufälle verändern viel',
      body: `<p>Nicht alle Entdeckungen und Erfindungen sind geplant. Manche entstanden durch Zufall, und trotzdem haben sie die Welt verändert.</p>
        ${merk('Wer genau beobachtet, erkennt auch unerwartete Ergebnisse als Chance.')}
        <p>Mit dem Suchbegriff «Zufallserfindungen» findest du viele Beispiele.</p>` },
    { h: 'Vorgerechnet: Wie lange ist das her?', worked: {
      given: 'Eine Erfindung stammt aus dem Jahr 1886. Wie viele Jahre ist das her, gerechnet bis zum Jahr 2026?',
      steps: [['Rechnung', '2026 − 1886 = 140'], ['Antwort', 'Die Erfindung ist 140 Jahre alt. So lange gibt es schon die Dinge, die darauf aufbauen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum vermeidet man es, Erfindungen einfach auswendig zu lernen?',
        options: ['Weil man solche Informationen leicht nachschlagen kann. Wichtiger ist, ihren Einfluss zu beurteilen.', 'Weil Erfindungen unwichtig sind.', 'Weil alle Erfindungen Zufall waren.', 'Weil sich Jahreszahlen nie ändern.'],
        explain: 'Informationen sind überall verfügbar. Wertvoll ist, wenn du beurteilen kannst, wie eine Erfindung die Gesellschaft und das tägliche Leben beeinflusst hat.' } }
  ],
  w4: [
    { h: 'Das Mikroskop im Überblick',
      body: `<p>Mit dem Mikroskop siehst du Dinge, die für das blosse Auge zu klein sind.</p>
        <ul><li><b>Okular:</b> die Linse, durch die du schaust.</li>
        <li><b>Objektiv:</b> die Linse nahe am Präparat. Mehrere Objektive sitzen im <b>Objektivrevolver</b>.</li>
        <li><b>Objekttisch:</b> hier liegt der Objektträger mit dem Präparat.</li>
        <li><b>Grob- und Feintrieb:</b> zum Scharfstellen.</li>
        <li><b>Lichtquelle:</b> beleuchtet das Präparat.</li></ul>
        <p>Das Mikroskop kombiniert mehrere Linsen und vergrössert deshalb stärker als eine Lupe.</p>` },
    { h: 'So vergrössert das Mikroskop',
      body: `<p>Okular und Objektiv vergrössern nacheinander. Die Vergrösserungen werden multipliziert.</p>
        ${merk('<b>Gesamtvergrösserung = Vergrösserung Okular · Vergrösserung Objektiv</b><br>Bildgrösse = wirkliche Grösse · Gesamtvergrösserung')}
        <p>Auf dem Mikroskop stehen die Vergrösserungen als Zahl mit «x», zum Beispiel 4x, 10x oder 40x. Andere Zahlen mit Komma, zum Beispiel 0.25, geben das Auflösungsvermögen an (numerische Apertur).</p>` },
    { h: 'Stelle die Vergrösserung ein',
      body: '<p>Wähle Okular und Objektiv. Beobachte, wie gross eine 0,05 mm lange Zelle im Bild erscheint.</p>', sim: 'mikro' },
    { h: 'Vorgerechnet: Gesamtvergrösserung', worked: {
      given: 'Das Okular vergrössert 10-fach, das Objektiv 40-fach. Wie lang erscheint eine Zelle von 0,05 mm im Bild?',
      steps: [['Gesamtvergrösserung', '10 · 40 = 400'], ['Bildgrösse', '0,05 mm · 400 = 20 mm'], ['Antwort', 'Die Zelle erscheint 20 mm lang, also 2 cm.']] } },
    { h: 'Fehlersuche',
      body: `<p>Wenn du nichts siehst, suche systematisch:</p>
        <ul><li>Ist das Mikroskop eingeschaltet oder an den Strom angeschlossen?</li>
        <li>Ist das Objektiv richtig eingerastet?</li>
        <li>Liegt das Präparat unter dem Objektiv?</li>
        <li>Ist das Präparat zu dick?</li>
        <li>Ist das Bild nur unscharf? Dann scharf stellen.</li></ul>` },
    { h: 'Kurz testen',
      check: { q: 'Das Okular vergrössert 10-fach, das Objektiv 4-fach. Wie gross ist die Gesamtvergrösserung?',
        options: ['40-fach', '14-fach', '2,5-fach', '400-fach'],
        explain: 'Gesamtvergrösserung = 10 · 4 = 40.' } }
  ],
  w5: [
    { h: 'Zellen: die kleinste Einheit der Lebewesen',
      body: `<p>Alles Lebendige besteht aus mindestens einer <b>Zelle</b>. Eine typische Zelle ist etwa 0,01 bis 0,1 mm lang. Es gibt aber auch viel grössere, zum Beispiel das Hühnerei.</p>
        ${merk('Lebewesen <b>bestehen aus</b> Zellen. Sie «haben» nicht einfach Zellen wie Körperteile.<br>Zellen sind die <b>kleinste Einheit</b> der Lebewesen.')}
        <p>Zellen sehen nicht alle gleich aus. Die Zellen der Wasserpest und der Zwiebelhaut sind eckig. Es gibt aber auch rundliche Zellen, zum Beispiel Blutzellen.</p>` },
    { h: 'Beobachte Zellen',
      body: '<p>Wähle Wasserpest oder Zwiebelhaut. Das Bild ist ein Modell und zeigt die Phänomene vereinfacht.</p>', sim: 'zelle' },
    { h: 'So mikroskopierst du',
      body: `<ol><li>Gib einen Tropfen Wasser auf den Objektträger.</li>
        <li>Lege das Objekt hinein und decke es vorsichtig mit einem Deckglas ab.</li>
        <li>Beginne mit der kleinsten Vergrösserung, stelle scharf und wechsle dann zu stärkeren Objektiven.</li>
        <li>Bei der Zwiebelhaut brauchst du ein dünnes Häutchen. Ein zu dickes Präparat lässt sich nicht gut ansehen.</li></ol>
        ${warnbox('<b>Umwelt:</b> Die Wasserpest ist eine invasive Pflanze, die sich in Schweizer Gewässern stark ausbreitet. Entsorge die Blättchen im Abfall.')}` },
    { h: 'Die naturwissenschaftliche Zeichnung',
      body: `<p>Du hältst deine Beobachtung mit einer <b>naturwissenschaftlichen Zeichnung</b> fest. Sie zeigt genau, was du siehst.</p>
        ${merk('Gehört dazu: ein <b>Titel</b> und die verwendete <b>Gesamtvergrösserung</b>.')}
        <p>Vergleiche Zeichnungen, zum Beispiel von Zwiebelzellen in Wasser und in Salzwasser. Daraus kannst du Vermutungen ableiten, was in den Zellen passiert ist.</p>` },
    { h: 'Vorgerechnet: Wie viele Zellen?', worked: {
      given: 'Eine Zwiebelzelle ist 0,05 mm lang. Wie viele solche Zellen liegen nebeneinander auf 1 mm?',
      steps: [['Rechnung', '1 mm : 0,05 mm = 20'], ['Antwort', 'Auf 1 mm passen etwa 20 Zellen. Darum siehst du sie nur unter dem Mikroskop.']] } },
    { h: 'Kurz testen',
      check: { q: 'Zwiebelhautzellen liegen in Salzwasser. Was beobachtest du?',
        options: ['Die roten Flächen in den Zellen werden kleiner.', 'Die Zellen werden grösser.', 'Es ändert sich nichts.', 'Die Zellen färben sich blau.'],
        explain: 'Im Salzwasser ziehen sich die roten Flächen zusammen. Mit reinem Wasser werden sie wieder grösser.' } }
  ],
  w6: [
    { h: 'Aufbau eines Samens',
      body: `<p>Ein Samen enthält eine junge Pflanze mit Vorrat. Beim Bohnensamen unterscheidest du:</p>
        <ul><li><b>Samenhaut:</b> schützt den Samen.</li>
        <li><b>Keimblätter:</b> enthalten Nährstoffe.</li>
        <li><b>junge Pflanze (Keimling):</b> wächst später aus dem Samen.</li></ul>
        <p>Samen gibt es in vielen Grössen, zum Beispiel im Vogelfutter oder in Früchten.</p>` },
    { h: 'Quellung und Keimung',
      body: `<p>Damit ein Samen auskeimt, braucht er Wasser.</p>
        ${merk('<b>Quellung:</b> Der Samen nimmt Wasser auf und wird grösser und schwerer.<br><b>Keimung:</b> Die junge Pflanze wächst aus dem Samen.')}
        <p>Gib den Feuerbohnen nicht zu viel Wasser, sonst beginnen sie zu faulen.</p>` },
    { h: 'Das Salz-Experiment mit Kresse',
      body: `<p>Du untersuchst, wie Salz die Keimung und das Wachstum von Kressesamen beeinflusst.</p>
        ${merk('Dazu brauchst du ein <b>Kontrollexperiment</b>: Mindestens ein Schälchen ohne Salz wird mit einem Schälchen mit Salz verglichen.<br>Der Vergleich muss <b>fair</b> sein: gleich hell, gleich viel Wasser. Nur das Salz ist verschieden.')}
        <p>Schon wenig Salz kann die Keimung stoppen. Bewährt haben sich drei Schälchen: ohne Salz, mit einem halben Kaffeelöffel und mit zwei Kaffeelöffeln Salz, jeweils in einem halben Liter Wasser.</p>` },
    { h: 'Beobachte die Kresse',
      body: '<p>Das Modell zeigt Beispielwerte, keine echten Messungen. Schiebe die Tage vor und vergleiche die drei Schälchen.</p>', sim: 'keimung' },
    { h: 'Vorgerechnet: Quellung', worked: {
      given: 'Ein Bohnensamen wiegt trocken 1,5 g und nach dem Quellen 3,0 g. Wie viel Wasser hat er aufgenommen?',
      steps: [['Rechnung', '3,0 g − 1,5 g = 1,5 g'], ['Antwort', 'Der Samen hat 1,5 g Wasser aufgenommen. Das ist so viel, wie er vorher wog.']] } },
    { h: 'Kurz testen',
      check: { q: 'Laura pflanzt Bohnen in zwei Töpfe: Topf 2 ist abgedeckt, Topf 1 nicht. Alles andere ist gleich. Welche Forschungsfrage prüft sie?',
        options: ['Beeinflusst die Abdeckung die Keimung und das Wachstum?', 'Wie schwer sind Bohnen?', 'Welche Bohne ist die schönste?', 'Wie warm ist es im Zimmer?'],
        explain: 'Nur die Abdeckung unterscheidet die beiden Töpfe. Laura untersucht also, ob sie die Keimung und das Wachstum beeinflusst.' } }
  ]
};
const GOALS = {
  w1: ['die Gebiete der Naturwissenschaften nennen und zuordnen', 'wissenschaftliche von nicht wissenschaftlichen Aussagen unterscheiden'],
  w2: ['den Experimentierprozess beschreiben', 'eine Erkenntnis aus einem Versuch für eine Anwendung nutzen'],
  w3: ['den Einfluss von Erfindungen auf den Alltag beurteilen', 'erklären, dass Zufälle in der Forschung eine Rolle spielen'],
  w4: ['die wichtigsten Teile des Mikroskops benennen', 'die Gesamtvergrösserung berechnen'],
  w5: ['Phänomene in Zellen beobachten und beschreiben', 'eine naturwissenschaftliche Zeichnung richtig anfertigen'],
  w6: ['den Aufbau eines Samens und die Keimung beschreiben', 'ein Experiment mit Kontrolle und fairem Vergleich planen']
};
const LEARN = {
  'w1-gebiete': 'Naturwissenschaften im Alltag', 'w1-ueberschnitt': 'Naturwissenschaften im Alltag', 'w1-astro': 'Was ist Naturwissenschaft?', 'w1-zukunft': 'Was ist Naturwissenschaft?', 'w1-luca': 'Vorgerechnet: Wissenschaftlich oder nicht?', 'w1-anna': 'Vorgerechnet: Wissenschaftlich oder nicht?',
  'w2-beobachtung': 'Der Weg zur Erkenntnis', 'w2-vermutung': 'Der Weg zur Erkenntnis', 'w2-reihenfolge': 'Vorgerechnet: Vom Versuch zur Anwendung', 'w2-draht': 'Ändere die Drahtlänge', 'w2-heizung': 'Aus Erkenntnis wird eine Anwendung', 'w2-sicher': 'Das Experiment: Drähte werden warm',
  'w3-unterschied': 'Entdeckung oder Erfindung?', 'w3-einfluss': 'Wie Erfindungen das Leben verändern', 'w3-zufall': 'Zufälle verändern viel', 'w3-heizgeraete': 'Wie Erfindungen das Leben verändern', 'w3-vorurteil': 'Wie Erfindungen das Leben verändern', 'w3-jahre': 'Vorgerechnet: Wie lange ist das her?',
  'w4-gesamt': 'So vergrössert das Mikroskop', 'w4-okular': 'Das Mikroskop im Überblick', 'w4-revolver': 'Das Mikroskop im Überblick', 'w4-bild': 'Vorgerechnet: Gesamtvergrösserung', 'w4-vergr': 'Vorgerechnet: Gesamtvergrösserung', 'w4-fehler': 'Fehlersuche',
  'w5-anzahl': 'Vorgerechnet: Wie viele Zellen?', 'w5-bestehen': 'Zellen: die kleinste Einheit der Lebewesen', 'w5-plasma': 'Beobachte Zellen', 'w5-salz': 'Beobachte Zellen', 'w5-zeichnung': 'Die naturwissenschaftliche Zeichnung', 'w5-licht': 'So mikroskopierst du',
  'w6-teile': 'Aufbau eines Samens', 'w6-quellung': 'Quellung und Keimung', 'w6-kontrolle': 'Das Salz-Experiment mit Kresse', 'w6-fair': 'Das Salz-Experiment mit Kresse', 'w6-ohne': 'Das Salz-Experiment mit Kresse', 'w6-wasser': 'Vorgerechnet: Quellung'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Neugierig', pw: 'staunt' },
  { xp: 80, name: 'Beobachterin', pw: 'schaut genau hin' },
  { xp: 200, name: 'Forscher', pw: 'stellt Fragen' },
  { xp: 380, name: 'Experimentatorin', pw: 'plant Versuche' },
  { xp: 620, name: 'Auswerter', pw: 'zieht Schlüsse' },
  { xp: 920, name: 'Entdeckerin', pw: 'findet Neues' }
];

/* ---------- Thema: 7_1 Naturwissenschaften erkunden ---------- */
const TOPIC = {
  id: 'nt7-1', storeKey: 'halingen-nt7-1-v1', other: { title: '7_4 Bewegungen erkunden', href: '7_4_Bewegungen_erkunden.html' },
  title: 'Naturwissenschaften erkunden', lead: 'Beobachten, vermuten, experimentieren', tag: 'Natur und Technik',
  tips: ['Eine Vermutung wird mit einem Experiment geprüft.', 'Ohne Vergleichsschälchen kein Kontrollexperiment.'],
  cardName: 'Merkkarte',
  formulas: [
    ['Experimentierprozess', 'Frage, Vermutung, Plan', 'Durchführen, Auswerten, Antwort'],
    ['Kontrollexperiment', 'nur eine Grösse ändern', 'alles andere gleich (fairer Vergleich)'],
    ['Zelle', 'kleinste Einheit der Lebewesen', 'etwa 0,01 bis 0,1 mm lang'],
    ['Gesamtvergrösserung', 'Okular · Objektiv', 'Bildgrösse = Objekt · Vergrösserung'],
    ['Samen', 'Samenhaut, Keimblätter, Keimling', 'Quellung, dann Keimung']
  ]
};

/* ---------- Simulationen ---------- */
const SIMS = {
  gebiete(el) {
    const items = [
      { t: 'Wasserpestzellen unter dem Mikroskop', ok: ['bio'], why: 'Zellen von Lebewesen gehören zur Biologie.' },
      { t: 'Ein Eisennagel rostet in feuchter Luft', ok: ['che'], why: 'Beim Rosten verändert sich ein Stoff. Das ist Chemie.' },
      { t: 'Ein Regenbogen entsteht', ok: ['phy'], why: 'Die Brechung von Licht ist ein Thema der Physik.' },
      { t: 'Hefe lässt einen Teig aufgehen', ok: ['bio', 'che'], why: 'Die Hefe ist ein Lebewesen (Biologie) und baut Stoffe um (Chemie). Die Gebiete überschneiden sich.' },
      { t: 'Das Horoskop sagt deine Zukunft voraus', ok: ['none'], why: 'Das ist Astrologie. Ihre Aussagen lassen sich nicht überprüfen. Sie ist keine Naturwissenschaft.' },
      { t: 'Aus den Linien der Hand die Zukunft lesen', ok: ['none'], why: 'Das lässt sich nicht mit Beobachtungen oder Experimenten prüfen. Es ist keine Naturwissenschaft.' }
    ];
    const names = { bio: 'Biologie', che: 'Chemie', phy: 'Physik', none: 'Keine Naturwissenschaft' };
    el.innerHTML = `<div class="sim"><p class="small" id="gn" aria-live="polite"></p><p class="gcard" id="gc"></p>
      <div class="gbtns" id="gb">${Object.keys(names).map(k => `<button class="btn sm" data-g="${k}">${names[k]}</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p>
      <button class="btn btn-primary block" id="nx" hidden>Weiter zum nächsten Beispiel</button></div>`;
    let i = 0, score = 0, done = false;
    function show() {
      done = false; $id('nx').hidden = true;
      if (i >= items.length) {
        $id('gn').textContent = ''; $id('gc').textContent = 'Geschafft!'; $id('gb').hidden = true;
        $id('ro').innerHTML = `<b>${score} von ${items.length}</b> beim ersten Tipp richtig. Du kannst unten mit «Weiter» zur nächsten Karte.`;
        const again = document.createElement('button'); again.className = 'btn sm'; again.textContent = 'Nochmals spielen';
        again.addEventListener('click', () => { i = 0; score = 0; $id('gb').hidden = false; again.remove(); show(); });
        $id('ro').appendChild(document.createElement('br')); $id('ro').appendChild(again); return;
      }
      $id('gn').textContent = 'Beispiel ' + (i + 1) + ' von ' + items.length;
      $id('gc').textContent = items[i].t; $id('ro').textContent = 'Tippe auf das passende Gebiet.';
      el.querySelectorAll('[data-g]').forEach(b => { b.classList.remove('good', 'bad'); });
    }
    el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => {
      if (i >= items.length) return;          // Spiel ist zu Ende
      if (done) { show(); return; }           // ein weiterer Tipp geht einfach zum nächsten Beispiel
      done = true;
      const it = items[i], ok = it.ok.includes(b.dataset.g);
      if (ok) score++;
      el.querySelectorAll('[data-g]').forEach(x => { if (it.ok.includes(x.dataset.g)) x.classList.add('good'); else if (x === b) x.classList.add('bad'); });
      $id('ro').innerHTML = (ok ? '<b>Richtig.</b> ' : '<b>Nicht ganz.</b> ') + it.why + (ok ? '' : ` Passend: ${it.ok.map(k => names[k]).join(' und ')}.`);
      i++;
      const nx = $id('nx'); nx.hidden = false; nx.textContent = i >= items.length ? 'Ergebnis ansehen' : 'Weiter zum nächsten Beispiel';
      if (nx.scrollIntoView) nx.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }));
    $id('nx').addEventListener('click', show);
    show();
  },

  draht(el) {
    el.innerHTML = `<div class="sim"><div class="wirevis" aria-hidden="true"><div class="batt2"></div><div class="wire" id="wire"></div></div>
      <div class="brow"><span class="bname">Wärme</span><div class="btrack"><div class="bfill" id="bw"></div></div><b class="mono bval" id="vw"></b></div>
      ${sl('wl', 'Drahtlänge', 10, 100, 10, 50, 'cm')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const L = +$id('wl').value, rel = Math.min(100, 1000 / L); // Modell: ungefähr umgekehrt proportional
      $id('wlv').textContent = fmt(L);
      $id('wire').style.width = (20 + L * 0.8) + '%';
      $id('wire').style.background = `rgb(${Math.round(120 + 1.35 * rel)}, ${Math.round(90 - 0.5 * rel)}, 60)`;
      $id('bw').style.width = rel + '%'; $id('vw').textContent = Math.round(rel) + ' %';
      $id('ro').innerHTML = `Modell: Bei ${fmt(L)} cm wird der Draht relativ <b>${rel > 60 ? 'sehr warm' : rel > 25 ? 'warm' : 'nur wenig warm'}</b>.<br>Je länger der Draht, desto weniger warm.`;
    }
    $id('wl').addEventListener('input', upd); $id('bw').style.width = '0%'; nf(el, upd); $id('wlv').textContent = '50';
  },

  mikro(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Okular">${[10, 15].map((o, i) => `<button class="btn sm${i ? '' : ' on'}" data-o="${o}">Okular ${o}x</button>`).join('')}</div>
      <div class="seg3" role="group" aria-label="Objektiv">${[4, 10, 40].map((o, i) => `<button class="btn sm${i ? '' : ' on'}" data-b="${o}">Objektiv ${o}x</button>`).join('')}</div>
      <div class="field" aria-hidden="true"><div class="cells" id="cells"></div></div>
      <div class="trio"><div><span class="k">Okular</span><b class="mono" id="m1"></b></div><div><span class="k">Objektiv</span><b class="mono" id="m2"></b></div><div><span class="k">Gesamt</span><b class="mono" id="m3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let o = 10, b = 4;
    function upd() {
      const g = o * b, img = 0.05 * g;
      el.querySelectorAll('[data-o]').forEach(x => x.classList.toggle('on', +x.dataset.o === o));
      el.querySelectorAll('[data-b]').forEach(x => x.classList.toggle('on', +x.dataset.b === b));
      $id('m1').textContent = o + 'x'; $id('m2').textContent = b + 'x'; $id('m3').textContent = g + 'x';
      $id('cells').style.setProperty('--cs', Math.max(6, Math.min(140, g / 4)) + 'px');
      $id('ro').innerHTML = `Gesamtvergrösserung = ${o} · ${b} = <b>${g}</b><br>Eine Zelle von 0,05 mm erscheint ${fmt(img, 1)} mm lang.`;
    }
    el.querySelectorAll('[data-o]').forEach(x => x.addEventListener('click', () => { o = +x.dataset.o; upd(); }));
    el.querySelectorAll('[data-b]').forEach(x => x.addEventListener('click', () => { b = +x.dataset.b; upd(); }));
    upd();
  },

  zelle(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Präparat"><button class="btn sm on" data-z="w">Wasserpest</button><button class="btn sm" data-z="z">Zwiebelhaut</button></div>
      <div id="zw"><div class="cellbox" aria-hidden="true"><div class="cdots" id="dots"></div></div>
        <label class="chk"><input type="checkbox" id="licht"> Mit Licht beleuchten</label></div>
      <div id="zz" hidden><div class="cellbox onion" aria-hidden="true"><div class="proto" id="proto"></div></div>
        <div class="seg3" role="group" aria-label="Lösung"><button class="btn sm on" data-s="0">Wasser</button><button class="btn sm" data-s="1">wenig Salz</button><button class="btn sm" data-s="2">viel Salz</button><button class="btn sm" data-s="-1">Wasser zugeben</button></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    const dots = $id('dots'); const N = 10;
    for (let i = 0; i < N; i++) { const d = document.createElement('i'); dots.appendChild(d); }
    let mode = 'w', raf = 0, phase = 0, speed = 0.002, salt = 0;
    function place() {
      const ds = dots.querySelectorAll('i');
      ds.forEach((d, i) => {
        const p = ((phase + i / N) % 1) * 4, w = 100, h = 56; let x = 0, y = 0;
        if (p < 1) { x = p * w; y = 0; } else if (p < 2) { x = w; y = (p - 1) * h; } else if (p < 3) { x = (3 - p) * w; y = h; } else { x = 0; y = (4 - p) * h; }
        d.style.left = x + '%'; d.style.top = (y / h * 100) + '%';
      });
    }
    function loop() { if (!el.isConnected) return; phase = (phase + speed) % 1; place(); raf = requestAnimationFrame(loop); }
    function info() {
      if (mode === 'w') $id('ro').innerHTML = $id('licht').checked ? 'Mit Licht strömt das Zellinnere schneller. Die Blattgrünkörner bewegen sich <b>schneller</b>.' : 'Das Zellinnere strömt langsam. Die Blattgrünkörner bewegen sich mit.';
      else $id('ro').innerHTML = salt === 0 ? 'In Wasser füllt die rote Fläche fast die ganze Zelle.' : salt === 3 ? 'Mit reinem Wasser wird die rote Fläche wieder <b>grösser</b>.' : 'Im Salzwasser wird die rote Fläche <b>kleiner</b>. Je mehr Salz, desto kleiner.';
    }
    function setProto(s) { const k = s === 0 ? 0.9 : s === 1 ? 0.62 : s === 2 ? 0.38 : 0.9; $id('proto').style.width = (k * 92) + '%'; $id('proto').style.height = (k * 82) + '%'; }
    el.querySelectorAll('[data-z]').forEach(b => b.addEventListener('click', () => {
      mode = b.dataset.z; el.querySelectorAll('[data-z]').forEach(x => x.classList.toggle('on', x === b));
      $id('zw').hidden = mode !== 'w'; $id('zz').hidden = mode !== 'z'; info();
    }));
    $id('licht').addEventListener('change', () => { speed = $id('licht').checked ? 0.006 : 0.002; info(); });
    el.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => {
      const s = +b.dataset.s; salt = s === -1 ? 3 : s; setProto(s);
      el.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); info();
    }));
    setProto(0); info(); place();
    if (!reduced()) raf = requestAnimationFrame(loop);
  },

  keimung(el) {
    const dishes = [['Ohne Salz', 8], ['Wenig Salz', 5], ['Viel Salz', 1]];
    el.innerHTML = `<div class="sim">${dishes.map((d, i) => brow(d[0], 'kd' + i, 'kv' + i)).join('')}
      ${sl('kt', 'Tag', 0, 5, 1, 0, '')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const t = +$id('kt').value; $id('ktv').textContent = String(t);
      dishes.forEach((d, i) => { const h = d[1] * t; $id('kd' + i).style.width = Math.min(100, h / 40 * 100) + '%'; $id('kv' + i).textContent = h + ' mm'; });
      $id('ro').innerHTML = t === 0 ? 'Tag 0: Die Samen sind frisch angesät.' : `Tag ${t}: Ohne Salz wächst die Kresse am besten. Mit viel Salz kaum. <br>Das Schälchen ohne Salz ist die <b>Kontrolle</b>. Das ist ein Modell mit Beispielwerten.`;
    }
    $id('kt').addEventListener('input', upd); dishes.forEach((d, i) => { $id('kd' + i).style.width = '0%'; });
    nf(el, upd); $id('ktv').textContent = '0';
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-1","titel":"Naturwissenschaften erkunden","kapitel":"NaTech 7, Kapitel 1","audio":"nt7-1"});
