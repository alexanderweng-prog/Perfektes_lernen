// Ergänzungen zum Paket «Kräfte, Arbeit und Leistung erforschen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'f1-wirkung': {
      1: 'Erwärmen kann bei Reibung vorkommen, die Hauptwirkungen sind aber Verformung und Bewegungsänderung.',
      2: 'Leuchten ist keine Wirkung einer Kraft.',
      3: 'Kräfte haben sichtbare Wirkungen: Ein Ball fliegt, eine Feder dehnt sich.'
    },
    'f1-allein': {
      1: 'Jede Kraft hat einen Partner. Es sind immer zwei Körper beteiligt.',
      2: 'Zu jeder Kraft gehört eine Gegenkraft auf den anderen Körper.',
      3: 'Kräfte kommen paarweise vor, nicht zu dritt.'
    },
    'f1-masse': {
      1: 'Die Masse misst man in kg, die Gewichtskraft in Newton. Das sind verschiedene Grössen.',
      2: 'Das ist vertauscht.',
      3: 'Die Masse bleibt überall gleich. Auf dem Mond ist nur die Gewichtskraft kleiner.'
    },
    'f1-kraftmesser': {
      1: 'Ein Kraftmesser misst eine Kraft in Newton, keine Masse in kg.',
      2: 'Ein Kraftmesser misst Kräfte, keine Temperatur.',
      3: 'Ein Kraftmesser funktioniert überall, er zeigt auf dem Mond nur eine kleinere Gewichtskraft.'
    },
    'f2-arten': {
      1: 'Gleitreibung wirkt erst, wenn der Schrank rutscht.',
      2: 'Rollreibung wirkt, wenn etwas rollt. Der Schrank steht still.',
      3: 'Es wirkt eine Kraft, sonst würde sich der Schrank beim Schieben bewegen.'
    },
    'f2-reihe': {
      1: 'Das ist umgekehrt. Rollen geht am leichtesten.',
      2: 'Die Haftreibung ist meist am grössten, nicht am kleinsten.',
      3: 'Die drei Reibungsarten sind verschieden gross.'
    },
    'f2-flaeche': {
      1: 'Eine verbreitete Fehlvorstellung: Bei starren Körpern ändert die Fläche die Reibung kaum.',
      2: 'Auch eine kleinere Fläche ändert die Gleitreibung bei starren Körpern nicht.',
      3: 'Gleitreibung ist nicht null, sonst würde alles endlos rutschen.'
    },
    'f2-nutzen': {
      1: 'In Maschinen ist Reibung unerwünscht, weil sie Verschleiss und Wärme bringt.',
      2: 'Ohne Reibung könntest du nicht gehen und nicht bremsen.',
      3: 'Reibung gibt es überall, wo sich Flächen berühren.'
    },
    'f3-pfeil': {
      1: 'Die Farbe eines Pfeils ist frei gewählt und hat keine Bedeutung.',
      2: 'Der Pfeil zeigt die Kraft, nicht die Masse.',
      3: 'Wichtig ist der Anfang, der Angriffspunkt am Körper, dazu Richtung und Länge.'
    },
    'f3-konstant': {
      1: 'Wäre sie grösser, würde die Kiste schneller werden.',
      2: 'Wäre sie kleiner, würde die Kiste langsamer werden.',
      3: 'Ohne Schubkraft würde die Reibung die Kiste bremsen.'
    },
    'f3-gegen': {
      1: 'Sie greifen an verschiedenen Körpern an. Darum heben sie sich nicht auf.',
      2: 'Sie sind entgegengesetzt gerichtet.',
      3: 'Kraft und Gegenkraft sind immer gleich gross.'
    },
    'f3-gleich': {
      1: 'Die Kräfte zeigen in entgegengesetzte Richtungen und heben sich auf.',
      2: 'Gegeneinander wirkende gleiche Kräfte ergeben null, nicht die Kraft einer Gruppe.',
      3: 'Die Gesamtkraft ist null, das Seil bleibt in Ruhe.'
    },
    'f4-schnur': {
      1: 'Mit der langen Schnur ziehst du flacher, also mehr in Bewegungsrichtung.',
      2: 'Die Schnurlänge verändert den Winkel und damit die nötige Kraft.',
      3: 'Die Länge spielt über den Zugwinkel eine Rolle.'
    },
    'f4-faden': {
      1: 'Der Faden wird nicht leichter. Die Kräfte im Faden werden grösser.',
      2: 'Das Gewicht bleibt gleich. Der Winkel macht die Fadenkräfte grösser.',
      3: 'Luft schneidet keinen Faden.'
    },
    'f4-parallelo': {
      1: 'Addieren geht nur, wenn beide Kräfte in dieselbe Richtung zeigen.',
      2: 'Subtrahieren geht nur bei genau entgegengesetzten Kräften.',
      3: 'Die Gesamtkraft ist nur null, wenn sich die Kräfte genau aufheben.'
    },
    'f4-kiste': {
      1: 'Schräg ziehen braucht mehr Kraft, weil sich die Kräfte teilweise aufheben.',
      2: 'Zu zweit braucht jede Person nur die Hälfte, wenn beide senkrecht ziehen.',
      3: 'Weit weg vom Körper ist unbequem und hilft nichts für die Kraft.'
    },
    'f5-rampe': {
      1: 'Die gewundene Strasse ist länger und damit nicht schneller.',
      2: 'Die Strassenschilder sind nicht der Grund.',
      3: 'Die Form erinnert an eine Schlange, der Grund ist aber die flachere Steigung.'
    },
    'f5-hebel': {
      1: 'Ein kurzer Kraftarm verlangt mehr Kraft.',
      2: 'Bei gleich langen Armen sparst du keine Kraft.',
      3: 'Ohne Hebel sparst du keine Kraft.'
    },
    'f5-gold': {
      1: 'Kraft und Weg zugleich sparen geht nicht, sonst entstünde Energie aus dem Nichts.',
      2: 'Die Arbeit bleibt gleich (ohne Reibung), sie wird nicht grösser.',
      3: 'Maschinen wandeln Energie um. Reibung macht einen Teil zu Wärme.'
    },
    'f6-arbeit': {
      1: 'Müdigkeit ist kein Mass für physikalische Arbeit.',
      2: 'Auch bei schwerem Rucksack: Ohne Kraft in Bewegungsrichtung keine Arbeit.',
      3: 'Physikalische Arbeit hat nichts mit Berufsarbeit zu tun.'
    },
    'f6-zeit': {
      1: 'Alexander braucht länger. Bei gleicher Arbeit heisst das weniger Leistung.',
      2: 'Gleiche Masse und gleiche Höhe ergeben gleich viel Arbeit.',
      3: 'Gleiche Arbeit in verschiedener Zeit ergibt verschiedene Leistung.'
    }
  },

  aufgaben: [
    { id: 'f1-masse-v2', wieVorlage: 'f1-masse', schwierigkeit: 2,
      ...mc('Eine Astronautin hat auf der Erde 60 kg Masse. Welche Masse hat sie auf dem Mond?', '60 kg', [
        ['10 kg', 'Die Masse ändert sich nicht. Nur die Gewichtskraft ist auf dem Mond etwa sechsmal kleiner.'],
        ['96 N', 'Das ist ungefähr ihre Gewichtskraft auf dem Mond, nicht ihre Masse.'],
        ['0 kg', 'Auch im All hat ein Körper seine Masse.']],
        'Die Masse bleibt überall gleich. Die Gewichtskraft hängt vom Ort ab.') },
    { id: 'f1-masse-v3', wieVorlage: 'f1-masse', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jeder Grösse ihre Einheit und Eigenschaft zu.',
      paare: [['Masse', 'Kilogramm, überall gleich'], ['Gewichtskraft', 'Newton, hängt vom Ort ab']],
      erklaerung: 'Masse in kg bleibt gleich. Die Gewichtskraft in N ist auf dem Mond kleiner als auf der Erde.' },

    { id: 'f1-gewicht-v2', wieVorlage: 'f1-gewicht', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const F = zufall([20, 35, 150, 800]);
        return zahl(`Ein Körper hat eine Gewichtskraft von ${F} N. Rechne mit g = 10 N/kg. Wie gross ist seine Masse?`, F / 10, 'kg',
          `m = F : g = ${F} N : 10 N/kg = ${z(F / 10)} kg`, 'Stelle F = m · g nach m um.');
      } },

    { id: 'f2-nutzen-v2', wieVorlage: 'f2-nutzen', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ist die Reibung hier erwünscht oder unerwünscht?',
      paare: [['Profil der Velopneus', 'erwünscht'], ['Kugellager im Velorad', 'unerwünscht'], ['Sand auf vereister Strasse', 'erwünscht'], ['Schlittschuhkufen auf dem Eis', 'unerwünscht']],
      erklaerung: 'Wo man Halt braucht (Pneus, Sand), ist Reibung erwünscht. Wo etwas leicht laufen soll (Lager, Kufen), stört sie.' },

    { id: 'f2-anfahren-v2', wieVorlage: 'f2-anfahren', schwierigkeit: 2,
      ...mc('Du schiebst ein schweres Sofa. Wann brauchst du am meisten Kraft?', 'Beim Losschieben, solange es noch steht.', [
        ['Wenn es schon rutscht.', 'Rutscht es, wirkt die kleinere Gleitreibung.'],
        ['Immer gleich viel.', 'Haftreibung ist meist grösser als Gleitreibung.'],
        ['Erst kurz vor dem Anhalten.', 'Zum Anhalten brauchst du nicht zu schieben, die Reibung bremst.']],
        'Die Haftreibung ist meist grösser als die Gleitreibung. Losreissen braucht am meisten Kraft.') },

    { id: 'f2-masse-v2', wieVorlage: 'f2-masse', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const m1 = zufall([100, 200, 400]), F1 = zufall([0.4, 0.5, 0.8]), k = zufall([2, 3]);
        return zahl(`Ein Klotz mit ${m1} g hat eine Gleitreibungskraft von ${z(F1)} N. Du legst so viel dazu, dass er ${k}-mal so schwer ist. Wie gross ist jetzt die Gleitreibungskraft?`,
          F1 * k, 'N', `${k}-fache Masse, also ${k}-fache Reibung: ${z(F1)} N · ${k} = ${z(F1 * k)} N`, 'Reibungskraft und Masse sind proportional.');
      } },

    { id: 'f3-pfeil-v2', wieVorlage: 'f3-pfeil', schwierigkeit: 2,
      ...mc('Zwei Kraftpfeile zeigen in dieselbe Richtung. Pfeil A ist 2 cm lang, Pfeil B 6 cm. Was bedeutet das?', 'Kraft B ist dreimal so gross wie Kraft A.', [
        ['Kraft B ist dreimal so weit weg.', 'Die Länge zeigt die Grösse der Kraft, nicht einen Abstand.'],
        ['Kraft A ist grösser, weil der Pfeil kürzer ist.', 'Längerer Pfeil heisst grössere Kraft.'],
        ['Beide Kräfte sind gleich gross.', 'Verschieden lange Pfeile zeigen verschieden grosse Kräfte.']],
        'Die Länge des Kraftpfeils steht für den Betrag der Kraft.') },

    { id: 'f3-add-v2', wieVorlage: 'f3-add', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const a = zufall([40, 70, 90]), b = zufall([30, 50, 120]), c = zufall([20, 60]);
        return zahl(`Drei Kinder ziehen ein Floss in dieselbe Richtung: mit ${a} N, ${b} N und ${c} N. Wie gross ist die Gesamtkraft?`, a + b + c, 'N',
          `${a} N + ${b} N + ${c} N = ${a + b + c} N`, 'Gleiche Richtung: Kräfte addieren.');
      } },

    { id: 'f3-sub-v2', wieVorlage: 'f3-sub', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const r = zufall([300, 450, 500]), l = r - zufall([20, 50, 80]);
        return zahl(`Ein Hund zieht an der Leine mit ${r} N nach vorn, du ziehst mit ${l} N zurück. Wie gross ist die Gesamtkraft?`, r - l, 'N',
          `${r} N − ${l} N = ${r - l} N in Richtung des Hundes`, 'Entgegengesetzte Kräfte: subtrahieren.');
      } },

    { id: 'f3-konstant-v2', wieVorlage: 'f3-konstant', schwierigkeit: 3,
      ...mc('Ein Fallschirmspringer sinkt mit konstanter Geschwindigkeit. Was gilt für die Kräfte?', 'Luftwiderstand und Gewichtskraft sind gleich gross.', [
        ['Die Gewichtskraft ist grösser.', 'Dann würde er immer schneller.'],
        ['Der Luftwiderstand ist grösser.', 'Dann würde er langsamer werden.'],
        ['Es wirken gar keine Kräfte.', 'Die Gewichtskraft wirkt immer. Sie wird nur vom Luftwiderstand ausgeglichen.']],
        'Bei konstanter Geschwindigkeit ist die Gesamtkraft null: Die Kräfte heben sich auf.') },

    { id: 'f4-parallelo-v2', wieVorlage: 'f4-parallelo', schwierigkeit: 3,
      ...mc('Zwei Personen ziehen mit je 100 N an einem Schlitten, im rechten Winkel zueinander. Wie gross ist die Gesamtkraft?', 'Etwa 141 N.', [
        ['200 N', '200 N ergäbe sich nur, wenn beide in dieselbe Richtung ziehen.'],
        ['0 N', 'Null wäre es nur, wenn sie genau gegeneinander ziehen.'],
        ['100 N', 'Die Diagonale im Quadrat ist länger als eine Seite.']],
        'Das Kräfteparallelogramm ist ein Quadrat. Die Diagonale ist etwa 1,41-mal so lang wie eine Seite: rund 141 N.') },

    { id: 'f4-senkrecht-v2', wieVorlage: 'f4-senkrecht', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const [a, b, c] = zufall([[30, 40, 50], [60, 80, 100], [90, 120, 150], [50, 120, 130]]);
        return zahl(`Zwei Kräfte von ${a} N und ${b} N stehen senkrecht aufeinander. Wie gross ist die Gesamtkraft?`, c, 'N',
          `Im Rechteck ist die Diagonale √(${a}² + ${b}²) = √${a * a + b * b} = ${c} N`, 'Satz des Pythagoras im Kräfterechteck.');
      } },

    { id: 'f5-hebel-v2', wieVorlage: 'f5-hebel', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const L = zufall([200, 300, 600]), a = zufall([0.2, 0.3]), b = zufall([1, 1.2, 1.5]);
        return zahl(`Mit einem Hebel hebst du eine Last von ${L} N. Der Lastarm ist ${z(a)} m lang, der Kraftarm ${z(b)} m. Welche Kraft brauchst du?`, L * a / b, 'N',
          `F · ${z(b)} m = ${L} N · ${z(a)} m, also F = ${z(L * a / b)} N`, 'Hebelgesetz: Kraft · Kraftarm = Last · Lastarm.', { toleranzRel: 0.02 });
      } },
    { id: 'f5-hebel-v3', wieVorlage: 'f5-hebel', schwierigkeit: 2,
      ...mc('Warum ist der Griff einer Schubkarre weit vom Rad entfernt?', 'Ein langer Kraftarm spart Kraft beim Anheben.', [
        ['Damit die Schubkarre schöner aussieht.', 'Der Grund ist das Hebelgesetz.'],
        ['Damit man weniger weit gehen muss.', 'Der Griff ändert nicht, wie weit du gehst.'],
        ['Damit die Last schwerer wird.', 'Die Last bleibt gleich, nur die nötige Kraft wird kleiner.']],
        'Das Rad ist der Drehpunkt. Je weiter weg der Griff, desto länger der Kraftarm, desto weniger Kraft.') },

    { id: 'f5-gold-v2', wieVorlage: 'f5-gold', typ: 'luecke', schwierigkeit: 2,
      text: 'Goldene Regel der Mechanik: Was man an ___ spart, muss man an ___ zugeben.',
      luecken: [['Kraft'], ['Weg']],
      erklaerung: 'Die Arbeit W = F · s bleibt gleich. Weniger Kraft heisst längerer Weg.' },

    { id: 'f6-arbeit-v2', wieVorlage: 'f6-arbeit', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Wird am Gegenstand Arbeit verrichtet? Ordne zu.',
      paare: [['Eine Kiste auf ein Regal heben', 'ja'], ['Einen Koffer ruhig in der Hand halten', 'nein'],
        ['Einen Wagen über den Platz schieben', 'ja'], ['Eine Tasche waagrecht durch den Gang tragen', 'nein']],
      erklaerung: 'Arbeit wird nur verrichtet, wenn die Kraft entlang des Wegs wirkt. Halten oder waagrecht Tragen ist keine Arbeit am Gegenstand.' },

    { id: 'f6-w-v2', wieVorlage: 'f6-w', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const W = zufall([300, 600, 1200]), s = zufall([3, 4, 5, 6]);
        return zahl(`Beim Schieben eines Wagens über ${s} m wird eine Arbeit von ${W} J verrichtet. Wie gross war die Schubkraft?`, W / s, 'N',
          `F = W : s = ${W} J : ${s} m = ${z(W / s)} N`, 'Stelle W = F · s nach F um.', { toleranzRel: 0.02 });
      } },

    { id: 'f6-wpt-v2', wieVorlage: 'f6-wpt', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const P = zufall([60, 100, 500]), t = zufall([30, 60, 300]);
        return zahl(`Ein Gerät mit ${P} W läuft ${t} s. Wie viel Energie wandelt es um? Gib das Ergebnis in Kilojoule an.`, P * t / 1000, 'kJ',
          `E = P · t = ${P} W · ${t} s = ${P * t} J = ${z(P * t / 1000)} kJ`, 'E = P · t, dann durch 1000 für kJ.');
      } },

    { id: 'f6-treppe-v2', wieVorlage: 'f6-treppe', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const m = zufall([45, 50, 70]), h = zufall([3, 6, 9]), t = zufall([5, 6, 10]);
        return zahl(`Du hast eine Masse von ${m} kg und rennst in ${t} s ${h} m hoch (g = 10 N/kg). Welche Leistung bringst du auf?`, m * 10 * h / t, 'W',
          `W = ${m} kg · 10 N/kg · ${h} m = ${m * 10 * h} J<br>P = ${m * 10 * h} J : ${t} s = ${z(m * 10 * h / t)} W`, 'Zuerst die Hubarbeit, dann durch die Zeit.', { toleranzRel: 0.02 });
      } }
  ]
};
