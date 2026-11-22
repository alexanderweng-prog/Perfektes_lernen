// Ergänzungen zum Paket «Elektromotor und Generator» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'm1-pole': {
      1: 'Einzelne Pole gibt es nicht. An der Schnittstelle entstehen sofort neue Pole.',
      2: 'Der Magnetismus steckt im ganzen Material. Beide Stücke bleiben magnetisch.',
      3: 'Jedes Stück bekommt einen Nord- und einen Südpol, nie zwei gleiche.'
    },
    'm1-abstossen': {
      1: 'Anziehen tun sich nur ungleichnamige Pole, also Nord und Süd.',
      2: 'Magnete wirken auch aufeinander, nicht nur auf Eisen.',
      3: 'Dauermagnete brauchen keinen Strom. Sie wirken immer.'
    },
    'm1-oersted': {
      1: 'Genau das Gegenteil hat Oersted gezeigt: Jeder Strom erzeugt ein Magnetfeld.',
      2: 'Der Draht kann aus Kupfer sein. Das Magnetfeld entsteht durch den Strom, nicht durch Eisen.',
      3: 'Strom macht einen Draht eher warm als kalt. Die Beobachtung am Kompass ist der Ausschlag.'
    },
    'm1-einaus': {
      1: 'Ein Elektromagnet ist nicht automatisch stärker. Sein Vorteil ist, dass man ihn schalten kann.',
      2: 'Ein Elektromagnet braucht Strom, also Energie, solange er hält.',
      3: 'Auch ein Elektromagnet zieht nur Eisen, Nickel und Kobalt an, kein Holz oder Plastik.'
    },
    'm1-staerke': {
      1: 'Weniger Windungen schwächen den Magneten. Holz verstärkt das Magnetfeld nicht, Eisen schon.',
      2: 'Weniger Strom macht den Magneten schwächer.',
      3: 'Wärme macht Magnete eher schwächer. Entscheidend sind Windungen, Strom und Eisenkern.'
    },
    'm2-kommutator': {
      1: 'Die Spannung ändert er nicht. Er kehrt nur die Stromrichtung in der Spule um.',
      2: 'Kühlen ist nicht seine Aufgabe. Ohne ihn bliebe der Motor nach einer halben Drehung stehen.',
      3: 'Er bremst nicht, er sorgt im Gegenteil dafür, dass die Spule weiterdreht.'
    },
    'm2-umpolen': {
      1: 'Die Kraft hängt von der Stromrichtung ab. Mit umgekehrtem Strom dreht der Motor anders herum.',
      2: 'Der Motor bekommt weiterhin Strom und dreht, nur in die andere Richtung.',
      3: 'Die Drehzahl hängt von der Spannung ab, nicht von der Polung.'
    },
    'm2-energie': {
      1: 'Das macht ein Generator. Der Motor wandelt umgekehrt elektrische in Bewegungsenergie um.',
      2: 'Wärme entsteht im Motor als Verlust, sie ist nicht die Energiequelle.',
      3: 'Vollständig geht es nie: Reibung und der Widerstand der Spule machen immer einen Teil zu Wärme.'
    },
    'm2-blockiert': {
      1: 'Der Strom sinkt nicht. Ohne Drehung fehlt die Gegenspannung, die den Strom begrenzt.',
      2: 'Der Strom hängt davon ab, wie schnell der Motor dreht. Gebremst nimmt er viel mehr auf.',
      3: 'Ein Motor wird zum Generator, wenn man ihn von aussen antreibt, nicht wenn man ihn bremst.'
    },
    'm3-induktion': {
      1: 'Ruht der Magnet, ändert sich das Magnetfeld nicht. Dann entsteht keine Spannung.',
      2: 'Ein bewegter Magnet erzeugt in einer Spule eine Spannung. Das ist die Induktion.',
      3: 'Die Spannung hängt von der Bewegung ab: schnell = mehr, still = keine.'
    },
    'm3-erhoehen': {
      1: 'Langsamer drehen ändert das Magnetfeld langsamer, die Spannung wird kleiner.',
      2: 'Weniger Windungen ergeben weniger Spannung.',
      3: 'Ohne Magnet ändert sich kein Magnetfeld, dann gibt es keine Spannung.'
    },
    'm3-motorgen': {
      1: 'Motor und Generator sind fast gleich gebaut. Ein gedrehter Motor liefert Spannung.',
      2: 'Kälter wird er nicht. Die Bewegung wird zu elektrischer Energie.',
      3: 'Es braucht keine Batterie: Die Drehung allein erzeugt die Spannung.'
    },
    'm3-kraftwerk': {
      1: 'Energie entsteht nie aus dem Nichts. Sie wird umgewandelt, hier aus Bewegungsenergie.',
      2: 'Wasser, Wind und Beine treiben den Generator an, kein Verbrennungsmotor.',
      3: 'Sie haben keine Batterie als Quelle. Die Spannung kommt aus dem Generator.'
    },
    'm4-waerme': {
      1: 'Energie verschwindet nie. Sie wird zu Wärme, die wir nicht mehr nutzen können.',
      2: 'Ein laufender Motor lädt seine Batterie nicht auf, er entlädt sie.',
      3: 'Magnetismus sammelt sich nicht im Gehäuse. Der Verlust wird zu Wärme.'
    },
    'm5-kraft': {
      1: 'Umgekehrt: Was an Drehzahl verloren geht, wird an Kraft gewonnen.',
      2: 'Die Kraft bleibt nur gleich, wenn auch die Drehzahl gleich bleibt.',
      3: 'Ein Viertel der Drehzahl ergibt die vierfache, nicht die doppelte Kraft.'
    },
    'm5-akkuschrauber': {
      1: 'Das Getriebe macht das Werkzeug langsamer, dafür kräftiger.',
      2: 'Ein Getriebe überträgt nur Bewegung. Laden geht nur mit dem Ladegerät.',
      3: 'Ein Getriebe verhindert keine Erwärmung, Zahnräder erzeugen eher etwas Reibungswärme.'
    },
    'm6-rekuperation': {
      1: 'Energie entsteht nie aus dem Nichts. Die Bewegungsenergie des Autos wird umgewandelt.',
      2: 'Reibung in den Bremsen erzeugt Wärme, keinen Strom.',
      3: 'Ein stehendes Auto hat keine Bewegungsenergie, die man umwandeln könnte.'
    },
    'm6-vergleich': {
      1: 'Der Wirkungsgrad ist sehr unterschiedlich: rund 90 % gegenüber rund 30 %.',
      2: 'Mehr Energie umsetzen heisst nicht effizienter. Entscheidend ist der Anteil, der zu Bewegung wird.',
      3: 'Kein Motor erzeugt Energie. 90 % heisst: 10 % werden zu Wärme.'
    }
  },

  aufgaben: [
    { id: 'm1-staerke-v2', wieVorlage: 'm1-staerke', schwierigkeit: 2,
      ...mc('Du willst deinen Elektromagneten schwächer machen. Was hilft?', 'Die Stromstärke verringern.', [
        ['Mehr Windungen wickeln.', 'Mehr Windungen machen ihn stärker, nicht schwächer.'],
        ['Einen Eisenkern einschieben.', 'Ein Eisenkern verstärkt das Magnetfeld deutlich.'],
        ['Die Spannung erhöhen.', 'Höhere Spannung bedeutet mehr Strom, also einen stärkeren Magneten.']],
        'Die Stärke hängt von Stromstärke, Windungszahl und Kern ab. Weniger Strom heisst schwächerer Magnet.') },
    { id: 'm1-staerke-v3', wieVorlage: 'm1-staerke', typ: 'luecke', schwierigkeit: 2,
      text: 'Ein Elektromagnet wird stärker mit mehr ___, grösserer ___ und einem Kern aus ___.',
      luecken: [['Windungen'], ['Stromstärke', 'Strom'], ['Eisen']],
      erklaerung: 'Windungen, Stromstärke und ein Eisenkern bestimmen die Stärke eines Elektromagneten.' },

    { id: 'm2-energie-v2', wieVorlage: 'm2-energie', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Teil des Gleichstrommotors seine Aufgabe zu.',
      paare: [['Magnet (Stator)', 'liefert das Magnetfeld'], ['Spule (Rotor)', 'dreht sich als Elektromagnet'],
        ['Kommutator', 'kehrt die Stromrichtung um'], ['Schleifkontakte', 'führen den Strom zum drehenden Teil']],
      erklaerung: 'Stator: Magnetfeld. Rotor: drehende Spule. Kommutator: Polwender. Schleifkontakte: Stromzufuhr zum Rotor.' },
    { id: 'm2-energie-v3', wieVorlage: 'm2-energie', schwierigkeit: 2,
      ...mc('Welches Teil des Motors steht still?', 'Der Dauermagnet (Stator).', [
        ['Die Spule (Rotor).', 'Rotor kommt von «rotieren»: Die Spule dreht sich.'],
        ['Der Kommutator.', 'Der Kommutator sitzt auf der Achse und dreht sich mit.'],
        ['Die Achse.', 'Die Achse dreht sich und treibt z. B. ein Rad an.']],
        'Stator kommt von «stehen»: Der Magnet ist fest. Spule, Kommutator und Achse drehen sich.') },

    { id: 'm2-blockiert-v2', wieVorlage: 'm2-blockiert', schwierigkeit: 2,
      ...mc('Dein Modellauto steckt fest, die Räder drehen nicht, der Motor brummt. Was tust du?', 'Sofort ausschalten.', [
        ['Weiterlaufen lassen, er dreht dann schon.', 'Blockiert nimmt der Motor sehr viel Strom auf und kann überhitzen.'],
        ['Den Motor mit der Hand festhalten, damit er nicht wegrutscht.', 'Festhalten blockiert ihn noch mehr. Der Strom steigt weiter.'],
        ['Eine zweite Batterie anschliessen.', 'Mehr Spannung erhöht den Strom zusätzlich. Das macht es schlimmer.']],
        'Ein blockierter Motor zieht viel Strom, wird heiss und kann Wicklung und Batterie beschädigen. Darum sofort ausschalten.') },

    { id: 'm3-spannung-v2', wieVorlage: 'm3-spannung', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const n1 = zufall([40, 50, 80]), U1 = zufall([2, 4]), k = zufall([1.5, 2, 2.5]);
        const n2 = n1 * k, U2 = U1 * k;
        return zahl(`Ein Fahrraddynamo liefert bei ${n1} Umdrehungen pro Sekunde ${U1} V. Wie viel Spannung liefert er bei ${z(n2)} Umdrehungen pro Sekunde? Rechne mit direkter Proportionalität.`,
          U2, 'V', `${z(n2)} : ${n1} = ${z(k)}. Die Spannung wird ${z(k)}-mal so gross: ${U1} V · ${z(k)} = ${z(U2)} V.`, 'Doppelte Drehzahl ergibt doppelte Spannung.');
      } },

    { id: 'm3-energie-v2', wieVorlage: 'm3-energie', schwierigkeit: 3,
      ...mc('Du kurbelst einen Handgenerator. Sobald eine Lampe angeschlossen ist, wird das Kurbeln schwerer. Warum?', 'Die Lampe nimmt Energie auf, und diese Energie musst du beim Kurbeln hineinstecken.', [
        ['Die Lampe macht den Generator schwerer.', 'Die Masse des Generators ändert sich nicht. Es geht um Energie.'],
        ['Der Generator wird durch das Licht gebremst.', 'Licht bremst nicht. Die Energie für das Licht stammt aus deiner Bewegung.'],
        ['Das bildet man sich nur ein.', 'Das ist messbar: Je mehr Strom fliesst, desto grösser ist die Gegenkraft.']],
        'Energie entsteht nicht aus dem Nichts. Je mehr elektrische Energie entnommen wird, desto mehr Bewegungsenergie muss hinein.') },
    { id: 'm3-energie-v3', wieVorlage: 'm3-energie', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const U = zufall([3, 6]), I = zufall([0.2, 0.5, 1]), t = zufall([30, 60, 120]);
        return zahl(`Ein Fahrraddynamo liefert ${U} V und ${z(I)} A. Welche Energie gibt er in ${t} s ab?`, U * I * t, 'J',
          `P = ${U} V · ${z(I)} A = ${z(U * I)} W<br>E = ${z(U * I)} W · ${t} s = ${z(U * I * t)} J`, 'Erst P = U · I, dann E = P · t.');
      } },

    { id: 'm4-waerme-v2', wieVorlage: 'm4-waerme', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne jeder Verlustquelle im Motor zu, wo sie entsteht.',
      paare: [['Widerstand der Spule', 'im Kupferdraht'], ['Reibung', 'in Lagern und Schleifkontakten'], ['Wechselndes Magnetfeld', 'im Eisenkern']],
      erklaerung: 'Drei Hauptursachen: Strom im Draht erwärmt ihn, Reibung in Lagern und an den Kontakten, Verluste im Eisen. Alles wird zu Wärme.' },
    { id: 'm4-waerme-v3', wieVorlage: 'm4-waerme', schwierigkeit: 2,
      ...mc('Ein Motor nimmt 100 W auf und gibt 80 W als Bewegung ab. Was passiert mit den restlichen 20 W?', 'Sie werden zu Wärme.', [
        ['Sie verschwinden.', 'Energie verschwindet nie. Sie wird umgewandelt.'],
        ['Sie fliessen zurück in die Batterie.', 'Ein Motor im Betrieb lädt die Batterie nicht.'],
        ['Sie werden zu Licht.', 'Ein Motor leuchtet nicht. Der Verlust wird zu Wärme.']],
        '100 W − 80 W = 20 W werden zu Wärme. Darum wird der Motor warm.') },

    { id: 'm5-zahnzahl-v2', wieVorlage: 'm5-zahnzahl', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const z1 = zufall([10, 12, 15, 20]), k = zufall([2, 3, 4, 5]), n1 = zufall([600, 1200, 2400]);
        return zahl(`Ein Motorritzel mit ${z1} Zähnen dreht mit ${n1} U/min. Das grosse Rad soll ${k}-mal langsamer drehen. Wie viele Zähne braucht das grosse Rad?`,
          z1 * k, 'Zähne', `${k}-mal langsamer heisst ${k}-mal so viele Zähne: ${z1} · ${k} = ${z1 * k} Zähne.`, 'Drehzahlen verhalten sich umgekehrt wie die Zähnezahlen.');
      } },

    { id: 'm6-reichweite-v2', wieVorlage: 'm6-reichweite', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const E = zufall([400, 500, 625]), proKm = zufall([5, 8, 10]);
        return zahl(`Ein E-Trottinett-Akku speichert ${E} Wh. Pro Kilometer braucht es ${proKm} Wh. Wie viele Kilometer weit kommst du?`, E / proKm, 'km',
          `${E} Wh : ${proKm} Wh/km = ${z(E / proKm)} km`, 'Energie im Akku geteilt durch Energie pro Kilometer.');
      } },
    { id: 'm6-reichweite-v3', wieVorlage: 'm6-reichweite', schwierigkeit: 2,
      ...mc('Warum kommt ein E-Bike im Winter oft weniger weit?', 'Kälte verringert die Energie, die der Akku abgeben kann.', [
        ['Im Winter ist die Strasse länger.', 'Die Strecke ist gleich. Es geht um den Akku.'],
        ['Der Motor wird im Winter stärker.', 'Der Motor wird nicht stärker. Der Akku liefert weniger Energie.'],
        ['Kalte Luft enthält mehr Strom.', 'Luft enthält keinen Strom. Der Akku liefert bei Kälte weniger Energie.']],
        'Akkus liefern bei Kälte weniger Energie. Dazu kommen oft dickere Kleidung, Gegenwind und mehr Rollwiderstand.') },

    { id: 'm6-kv-v2', wieVorlage: 'm6-kv', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const kv = zufall([1700, 2300, 2700]), s = zufall([3, 4, 6]), U = s * 3.7;
        return zahl(`Ein FPV-Motor hat ${kv} kV. Der Akku hat ${s} Zellen zu je 3,7 V. Wie hoch ist die Leerlaufdrehzahl in U/min?`, kv * U, 'U/min',
          `U = ${s} · 3,7 V = ${z(U)} V<br>n = ${kv} · ${z(U)} = ${z(kv * U, 0)} U/min`, 'Zuerst die Akkuspannung (Zellen · 3,7 V), dann kV · Spannung.', { toleranzRel: 0.01 });
      } },
    { id: 'm6-kv-v3', wieVorlage: 'm6-kv', schwierigkeit: 3,
      ...mc('Was bedeutet die Angabe «2300 kV» bei einem Drohnenmotor?', '2300 Umdrehungen pro Minute pro Volt, ohne Last.', [
        ['2300 Kilovolt Spannung.', 'Hier steht kV nicht für Kilovolt. So viel Spannung hätte kein Drohnenakku.'],
        ['2300 Watt Leistung.', 'Leistung hat die Einheit W. kV beschreibt die Drehzahl pro Volt.'],
        ['2300 Umdrehungen pro Sekunde.', 'Die Angabe gilt pro Minute und pro Volt.']],
        'kV = Umdrehungen pro Minute pro Volt ohne Last. Mit dem Propeller dreht der Motor langsamer.') }
  ]
};
