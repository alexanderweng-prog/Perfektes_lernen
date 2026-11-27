// Ergänzungen zum Paket «Leistung» (von Claude erstellt, Prüfstatus: Entwurf bis zur Freigabe im Dashboard)
// erklaerungen: Vorlage → { Index der falschen Option in Naturalia: Erklärung der Fehlvorstellung }
// aufgaben: neue Varianten; wieVorlage bestimmt das Lernziel
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    's1-richtung': {
      1: 'Schwer allein reicht nicht. Arbeit im physikalischen Sinn braucht einen Weg in Richtung der Kraft.',
      2: 'Schwitzen zeigt, dass dein Körper Energie umsetzt (Muskeln halten). Das ist aber keine Hubarbeit am Koffer.',
      3: 'Das stimmt so nicht: Hebst du den Koffer hoch, verrichtest du sehr wohl Hubarbeit. Nur beim waagrechten Tragen nicht.'
    },
    's1-goldene': {
      1: 'Die Arbeit lässt sich mit einer schiefen Ebene nicht verringern. Was du an Kraft sparst, musst du an Weg zugeben.',
      2: 'Halbe Kraft und halber Weg ergäben nur einen Viertel der Arbeit. Die Arbeit bleibt aber gleich, also wird der Weg länger.',
      3: 'Der Weg wird zwar doppelt so lang, aber die Kraft ist halb so gross. W = F · s bleibt deshalb gleich.'
    },
    's2-def': {
      1: 'Das ist die Energie oder Arbeit selbst. Leistung sagt, wie schnell diese Energie umgewandelt wird.',
      2: 'Das ist die Kraft (Einheit Newton). Leistung hat die Einheit Watt.',
      3: 'Das ist die Geschwindigkeit. Leistung ist Energie pro Zeit, nicht Weg pro Zeit.'
    },
    's2-vergleich': {
      1: 'Gleiche Masse und gleiche Höhe ergeben gleich viel Hubarbeit, egal wie schnell man ist.',
      2: 'Gleiche Arbeit heisst nicht gleiche Leistung. Wer die Arbeit in kürzerer Zeit schafft, leistet mehr.',
      3: 'Länger arbeiten heisst bei gleicher Arbeit weniger Leistung. P = W : t wird kleiner, wenn t grösser wird.'
    },
    's3-einheit': {
      1: 'Joule mal Sekunde ergibt keine Leistung. Leistung ist Energie geteilt durch Zeit.',
      2: 'Newton pro Meter ist keine Leistungseinheit. Newton mal Meter wäre Joule, also Energie.',
      3: 'Kilogramm pro Sekunde beschreibt einen Massenstrom, keine Leistung.'
    },
    's3-mensch': {
      1: '2 W ist die Leistung einer kleinen LED-Lampe. Ein Mensch schafft beim Treppensteigen ein Vielfaches davon.',
      2: '20 000 W sind 20 kW, das ist die Leistung eines kleinen Automotors. So viel schafft kein Mensch.',
      3: '2 000 000 W sind 2 MW, etwa eine grosse Windturbine. Das ist zehntausendmal zu viel.'
    },
    's4-typenschild': {
      1: 'Watt ist keine Speichergrösse. 2000 W heisst: pro Sekunde werden 2000 J umgewandelt.',
      2: 'Watt ist keine Zeitangabe. Wie lange das Wasser braucht, hängt von der Wassermenge ab.',
      3: 'Die Spannung steht in Volt (V) und beträgt 230 V. W ist das Zeichen für Watt, die Leistung.'
    },
    's4-verdoppeln': {
      1: 'Wenn I grösser wird, muss auch P = U · I grösser werden.',
      2: 'Halbiert würde P nur, wenn U oder I halbiert würden.',
      3: 'Viermal so gross würde P nur, wenn U und I beide verdoppelt würden.'
    },
    's4-sicherheit': {
      1: 'Lämpchen können durchbrennen, das ist aber nicht der Grund. 230 V kann für Menschen lebensgefährlich sein.',
      2: 'Messen kann man auch bei 230 V, dafür braucht es aber spezielle Geräte und Fachwissen. Der Grund ist die Gefahr.',
      3: 'Die Steckdose funktioniert. Gerade deshalb ist sie für Schülerversuche zu gefährlich.'
    },
    's5-einheit': {
      1: 'Die Leistung hat die Einheit kW. Erst kW mal Stunden ergibt eine Energie.',
      2: 'Die Spannung hat die Einheit Volt.',
      3: 'Die Zeit steckt in der Einheit (h), aber kWh als Ganzes ist Leistung mal Zeit, also Energie.'
    },
    's5-fall': {
      1: 'Grosse Leistung heisst nur: schnell viel Energie. Der Föhn läuft aber nur 5 Minuten, der Laptop 3 Stunden.',
      2: 'Rechne beide aus: Föhn 0,15 kWh, Laptop 0,18 kWh. Das ist nicht gleich.',
      3: 'Die Energie hängt nur von Leistung und Zeit ab: E = P · t. Den Preis braucht es erst für die Kosten.'
    },
    's6-def': {
      1: 'Umgekehrt ergäbe sich ein Wert über 100 %. Die Nutzenergie gehört in den Zähler.',
      2: 'Nutzenergie mal Zeit ergibt keine sinnvolle Grösse. Der Wirkungsgrad ist ein Anteil, ein Verhältnis zweier Energien.',
      3: 'Leistung durch Zeit ergibt keinen Wirkungsgrad. Verglichen werden Nutzenergie und zugeführte Energie.'
    },
    's6-verlust': {
      1: 'Energie verschwindet nie (Energieerhaltung). Sie wird nur in eine Form umgewandelt, die wir nicht nutzen können.',
      2: 'Eine Lampe speichert kein Licht. Licht, das nicht abgestrahlt wird, gibt es nicht.',
      3: 'Spannung ist keine Energieform. Der Rest der Energie wird zu Wärme.'
    },
    's6-ueber100': {
      1: 'Auch das beste Gerät kann keine Energie erzeugen. Mehr als 100 % ist darum unmöglich.',
      2: 'Die Energieerhaltung gilt für alle Geräte, auch für elektrische.',
      3: 'Ohne Reibung wären es höchstens 100 %, nie mehr. Reibung macht den Wirkungsgrad nur kleiner.'
    }
  },

  aufgaben: [
    // s3-mensch: Leistungen einordnen
    { id: 's3-mensch-v2', wieVorlage: 's3-mensch', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Gerät seine ungefähre Leistung zu.',
      paare: [['LED-Lampe', 'etwa 5 W'], ['Laptop', 'etwa 60 W'], ['Föhn', 'etwa 2 kW'], ['Auto', 'etwa 100 kW']],
      erklaerung: 'LED-Lampen brauchen nur wenige Watt, ein Laptop einige Dutzend Watt. Geräte, die heizen (Föhn), brauchen Kilowatt. Automotoren liegen bei rund 100 kW.' },
    { id: 's3-mensch-v3', wieVorlage: 's3-mensch', schwierigkeit: 2,
      ...mc('Welches Gerät hat die grösste Leistung?', 'Ein Wasserkocher', [
        ['Ein Handy-Ladegerät', 'Ein Ladegerät liefert nur etwa 5–20 W. Ein Wasserkocher braucht rund 2000 W.'],
        ['Eine LED-Lampe', 'LED-Lampen brauchen nur wenige Watt.'],
        ['Ein Laptop', 'Ein Laptop braucht etwa 30–90 W. Geräte, die Wasser erhitzen, brauchen viel mehr.']],
        'Geräte, die heizen, haben grosse Leistungen. Ein Wasserkocher hat etwa 2000 W, ein Laptop nur rund 60 W.') },

    // s4-strom: Föhn (I = P : U), neue Formulierung
    { id: 's4-strom-v2', wieVorlage: 's4-strom', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const [geraet, P] = zufall([['Staubsauger', 920], ['Bügeleisen', 2300], ['Mikrowelle', 1150], ['Toaster', 690]]);
        const I = P / 230;
        return zahl(`Ein ${geraet} nimmt an der Steckdose (230 V) eine Leistung von ${z(P)} W auf. Wie gross ist die Stromstärke?`, I, 'A',
          `I = P : U = ${z(P)} W : 230 V = ${z(I, 2)} A`, 'Stelle P = U · I nach I um: I = P : U.');
      } },

    // s4-typenschild
    { id: 's4-typenschild-v2', wieVorlage: 's4-typenschild', schwierigkeit: 2,
      ...mc('Auf einem Netzteil steht «12 V, 2 A». Was bedeuten die 12 V?', 'Die Spannung, die das Netzteil abgibt.', [
        ['Die Leistung des Netzteils.', 'Die Leistung hat die Einheit Watt. Hier wären es P = 12 V · 2 A = 24 W.'],
        ['Die Stromstärke, die fliesst.', 'Die Stromstärke steht in Ampere (A), hier 2 A.'],
        ['Die Energie, die das Netzteil speichert.', 'Ein Netzteil speichert keine Energie, und Energie hätte die Einheit J oder kWh.']],
        'V steht für Volt, die Einheit der Spannung. A ist die Stromstärke. Aus beiden folgt die Leistung P = U · I = 24 W.') },
    { id: 's4-typenschild-v3', wieVorlage: 's4-typenschild', typ: 'luecke', schwierigkeit: 2,
      text: 'Auf einem Typenschild steht «230 V, 1500 W». Die ___ beträgt 230 V, die ___ beträgt 1500 W.',
      luecken: [['Spannung'], ['Leistung', 'elektrische Leistung']],
      erklaerung: 'Volt (V) ist die Einheit der Spannung, Watt (W) die Einheit der Leistung.' },

    // s4-verdoppeln: Leistungs-Fläche
    { id: 's4-verdoppeln-v2', wieVorlage: 's4-verdoppeln', schwierigkeit: 3,
      ...mc('Die Stromstärke bleibt gleich, die Spannung wird halbiert. Was passiert mit der Leistung?', 'Sie wird halbiert.', [
        ['Sie bleibt gleich.', 'P = U · I: Wird ein Faktor kleiner, wird auch das Produkt kleiner.'],
        ['Sie wird doppelt so gross.', 'Die Spannung wird kleiner, nicht grösser. Also sinkt die Leistung.'],
        ['Sie wird ein Viertel so gross.', 'Ein Viertel ergäbe sich nur, wenn U und I beide halbiert würden.']],
        'P = U · I. Bleibt I gleich und wird U halbiert, wird auch P halbiert.') },
    { id: 's4-verdoppeln-v3', wieVorlage: 's4-verdoppeln', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const U = zufall([6, 12, 24]), I = zufall([0.5, 1, 2]), k = zufall([2, 3]);
        return zahl(`Eine Lampe an ${U} V nimmt ${z(I)} A auf. Nun wird die Stromstärke bei gleicher Spannung ${k === 2 ? 'verdoppelt' : 'verdreifacht'}. Wie gross ist die neue Leistung?`,
          U * I * k, 'W', `Vorher: P = ${U} V · ${z(I)} A = ${z(U * I)} W. Mit ${k}-facher Stromstärke: P = ${U} V · ${z(I * k)} A = ${z(U * I * k)} W.`, 'P = U · I');
      } },

    // s4-sicherheit
    { id: 's4-sicherheit-v2', wieVorlage: 's4-sicherheit', schwierigkeit: 1,
      ...mc('Du willst den Energiebedarf eines Föhns (230 V) messen. Wie gehst du vor?', 'Mit einem Energiekostenmessgerät und zusammen mit der Lehrperson.', [
        ['Ich schliesse das Multimeter direkt an die Steckdose an.', 'Lebensgefährlich: Schulmultimeter sind nicht für 230 V gedacht.'],
        ['Ich öffne den Föhn und messe innen.', 'Nie ein 230-V-Gerät öffnen. Innen liegen offene Kontakte.'],
        ['Ich messe mit nassen Händen, damit der Kontakt besser ist.', 'Nasse Haut leitet besser, das macht einen Stromschlag gefährlicher.']],
        'An 230 V misst man nur mit einem Energiekostenmessgerät zwischen Steckdose und Gerät und unter Aufsicht.') },

    // s5-kosten: Gaming-PC
    { id: 's5-kosten-v2', wieVorlage: 's5-kosten', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const [g, P] = zufall([['Eine Spielkonsole', 200], ['Ein Fernseher', 100], ['Eine Heizdecke', 50], ['Ein Gaming-PC', 500]]);
        const t = zufall([3, 4, 5, 6]), preis = zufall([20, 25, 30]);
        const E = P / 1000 * t, k = E * preis;
        return zahl(`${g} mit ${P} W läuft ${t} Stunden. 1 kWh kostet ${preis} Rappen. Was kostet das in Rappen?`, k, 'Rappen',
          `P = ${P} W = ${z(P / 1000)} kW<br>E = ${z(P / 1000)} kW · ${t} h = ${z(E)} kWh<br>Kosten = ${z(E)} kWh · ${preis} Rp./kWh = ${z(k)} Rappen`,
          'Zuerst W in kW umrechnen, dann E = P · t in kWh, dann mal Preis.');
      } },

    // s5-standby
    { id: 's5-standby-v2', wieVorlage: 's5-standby', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const P = zufall([2, 4, 5, 8]);
        const E = P / 1000 * 8760;
        return zahl(`Ein Router braucht dauernd ${P} W, Tag und Nacht, ein ganzes Jahr (8760 h). Wie viele kWh sind das pro Jahr?`, E, 'kWh',
          `E = ${z(P / 1000)} kW · 8760 h = ${z(E)} kWh`, 'W in kW umrechnen (geteilt durch 1000), dann mal 8760 h.', { toleranzRel: 0.02 });
      } },
    { id: 's5-standby-v3', wieVorlage: 's5-standby', schwierigkeit: 2,
      ...mc('Warum lohnt es sich, Geräte ganz auszuschalten statt im Standby zu lassen?', 'Kleine Leistung über sehr lange Zeit ergibt viel Energie.', [
        ['Im Standby ist die Leistung grösser als im Betrieb.', 'Im Standby ist die Leistung klein. Das Problem ist die lange Zeit.'],
        ['Im Standby wird keine Energie gebraucht, es lohnt sich nicht.', 'Auch im Standby fliesst Strom, oft einige Watt, das ganze Jahr.'],
        ['Weil das Gerät sonst explodiert.', 'Standby ist nicht gefährlich, es kostet nur Energie und Geld.']],
        'E = P · t: Ein paar Watt mal 8760 Stunden im Jahr ergeben schnell 20–80 kWh.') },

    // s5-fall
    { id: 's5-fall-v2', wieVorlage: 's5-fall', schwierigkeit: 3,
      ...mc('Ein Wasserkocher (2000 W) läuft 3 Minuten. Eine LED-Lampe (10 W) brennt 10 Stunden. Wer braucht mehr Energie?',
        'Beide brauchen gleich viel: je 0,1 kWh.', [
          ['Der Wasserkocher, weil er mehr Leistung hat.', 'Rechne: 2 kW · 0,05 h = 0,1 kWh. LED: 0,01 kW · 10 h = 0,1 kWh. Gleich viel.'],
          ['Die LED, weil sie länger läuft.', 'Die LED läuft länger, hat aber nur 10 W. Beide kommen auf 0,1 kWh.'],
          ['Das kann man nicht berechnen.', 'Doch: E = P · t, mit P in kW und t in h.']],
        'Wasserkocher: 2 kW · (3 : 60) h = 0,1 kWh. LED: 0,01 kW · 10 h = 0,1 kWh. Beide gleich viel.') },

    // s6-ueber100
    { id: 's6-ueber100-v2', wieVorlage: 's6-ueber100', schwierigkeit: 2,
      ...mc('Welcher Wirkungsgrad ist für einen echten Elektromotor möglich?', '90 %', [
        ['100 %', '100 % ginge nur ohne jede Reibung und Erwärmung. Bei echten Motoren entsteht immer etwas Wärme.'],
        ['110 %', 'Über 100 % ist unmöglich: Der Motor würde mehr Energie abgeben, als er bekommt.'],
        ['150 %', 'Über 100 % ist unmöglich. Das widerspricht der Energieerhaltung.']],
        'Gute Elektromotoren erreichen um die 90 %. Ein Rest wird immer zu Wärme. Mehr als 100 % gibt es nie.') },
    { id: 's6-ueber100-v3', wieVorlage: 's6-ueber100', typ: 'luecke', schwierigkeit: 2,
      text: 'Ein Wirkungsgrad über 100 % ist unmöglich, weil Energie nicht ___ werden kann. Das nennt man Energie___.',
      luecken: [['erzeugt', 'hergestellt', 'gemacht'], ['erhaltung']],
      erklaerung: 'Energie kann nur umgewandelt, nicht erzeugt werden (Energieerhaltung). Darum ist die Nutzenergie höchstens so gross wie die zugeführte Energie.' },

    // s6-kocher: Wasserkocher, neue Formulierung
    { id: 's6-kocher-v2', wieVorlage: 's6-kocher', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const P = zufall([1000, 1500, 2000]), t = zufall([60, 120, 180]), eta = zufall([0.6, 0.7, 0.8, 0.9]);
        const Ezu = P * t, En = Ezu * eta;
        return zahl(`Ein Tauchsieder mit ${P} W läuft ${t} s. Er hat einen Wirkungsgrad von ${z(eta * 100)} %. Wie viele Kilojoule Wärme nimmt das Wasser auf?`,
          En / 1000, 'kJ', `E_zu = ${P} W · ${t} s = ${z(Ezu)} J = ${z(Ezu / 1000)} kJ<br>E_nutz = ${z(eta)} · ${z(Ezu / 1000)} kJ = ${z(En / 1000)} kJ`,
          'Zuerst die zugeführte Energie E = P · t, dann mal den Wirkungsgrad.');
      } },

    /* ---------- Pilot höhere Taxonomiestufen (Auftrag 4): Entwurf bis zur Freigabe ---------- */

    // Lernziel «Wer ist schneller oben?»: Stufe 4, 5 und Versuchsplanung (Stufe 6)
    { id: 'p4-treppe-daten', wieVorlage: 's2-vergleich', typ: 'daten', stufe: 4, schwierigkeit: 3,
      stufe_begruendung: 'Das Kind muss aus Masse, Höhe und Zeit selbst Arbeit und Leistung ableiten und Aussagen an diesen Werten prüfen; die Tabelle liefert die Antwort nicht direkt.',
      text: 'Vier Kinder steigen dieselbe 3 m hohe Treppe hoch (g = 10 N/kg). Kreuze alle Aussagen an, die zu den Daten passen.',
      tabelle: { kopf: ['Kind', 'Masse', 'Zeit'], zeilen: [['Lea', '50 kg', '10 s'], ['Tim', '60 kg', '12 s'], ['Noah', '40 kg', '6 s'], ['Mira', '60 kg', '10 s']] },
      aussagen: [
        { text: 'Noah hat die grösste Leistung, obwohl er am wenigsten Arbeit verrichtet.', richtig: true },
        { text: 'Tim und Mira verrichten gleich viel Arbeit.', richtig: true },
        { text: 'Lea hat eine grössere Leistung als Tim, weil sie schneller oben ist.', richtig: false,
          erklaerung: 'Lea ist schneller, hebt aber weniger Masse. Beide kommen auf 150 W.' },
        { text: 'Wer mehr Masse hat, hat immer die grössere Leistung.', richtig: false,
          erklaerung: 'Noah hat die kleinste Masse und trotzdem die grösste Leistung, weil er sehr schnell ist.' }],
      erklaerung: 'W = m · g · h und P = W : t. Lea: 1500 J, 150 W. Tim: 1800 J, 150 W. Noah: 1200 J, 200 W. Mira: 1800 J, 180 W.' },
    { id: 'p5-treppe-urteil', wieVorlage: 's2-vergleich', typ: 'vergleich', stufe: 5, schwierigkeit: 3,
      stufe_begruendung: 'Das Kind beurteilt zwei Schlussfolgerungen anhand des Kriteriums P = W : t und muss das Urteil begründen, statt selbst nur zu rechnen.',
      text: 'Lea (50 kg) und Tim (60 kg) steigen dieselbe 3 m hohe Treppe in je 12 s hoch. Zwei Kinder beurteilen das Ergebnis. Welche Beurteilung ist besser?',
      varianten: [
        { titel: 'Beurteilung A', html: '«Beide haben die gleiche Leistung, weil sie gleich schnell oben sind.»' },
        { titel: 'Beurteilung B', html: '«Tim hat die grössere Leistung.»' }],
      besser: 1,
      begruendungen: [
        { text: 'die Leistung nur von der Zeit abhängt', richtig: false,
          erklaerung: 'Leistung = Arbeit : Zeit. Gleiche Zeit ergibt nur dann gleiche Leistung, wenn auch die Arbeit gleich ist.' },
        { text: 'schwerere Personen immer schneller sind', richtig: false,
          erklaerung: 'Das sagt die Aufgabe nicht: Beide brauchen 12 s. Entscheidend ist die Arbeit.' },
        { text: 'die Leistung von der Arbeit und der Zeit abhängt, nicht nur von der Zeit', richtig: true }],
      erklaerung: 'Tim hebt mehr Masse auf dieselbe Höhe: W = 1800 J statt 1500 J. In 12 s ergibt das 150 W statt 125 W.' },
    { id: 'p6-treppe-versuch', wieVorlage: 's2-vergleich', typ: 'versuch', stufe: 6, schwierigkeit: 4,
      stufe_begruendung: 'Das Kind entwirft selbst einen Versuchsplan und muss festlegen, was verändert, gemessen und konstant gehalten wird.',
      text: 'Plane einen Versuch zum Treppensteigen. Wähle eine Frage, die sich mit einem Versuch beantworten lässt, und lege für jede Grösse fest, was mit ihr passiert.',
      fragen: [
        { text: 'Ist Rennen auf der Treppe gefährlich?', richtig: false },
        { text: 'Ist meine Leistung beim Treppensteigen grösser, wenn ich renne statt gehe?', richtig: true },
        { text: 'Welche Treppe im Schulhaus ist die schönste?', richtig: false }],
      groessen: [
        { text: 'Art des Steigens (gehen oder rennen)', rolle: 'veraendern' },
        { text: 'Zeit für die Treppe', rolle: 'messen' },
        { text: 'Höhe der Treppe', rolle: 'konstant' },
        { text: 'Masse der Person (gleiche Person, gleicher Rucksack)', rolle: 'konstant' },
        { text: 'Farbe der Schuhe', rolle: 'egal' }],
      erklaerung: 'Verändert wird nur die Art des Steigens, gemessen wird die Zeit. Höhe und Masse bleiben gleich, dann ist die Arbeit gleich und P = W : t hängt nur noch von der Zeit ab.' },

    // Lernziel «Viel Leistung heisst nicht viel Energie»: Stufe 4 und 5
    { id: 'p4-geraete-daten', wieVorlage: 's5-fall', typ: 'daten', stufe: 4, schwierigkeit: 3,
      stufe_begruendung: 'Das Kind muss aus Leistung und Laufzeit die Energie erst ableiten und Aussagen prüfen, die Leistung und Energie verwechseln.',
      text: 'Die Tabelle zeigt vier Geräte in einer Familie. Kreuze alle Aussagen an, die zu den Daten passen.',
      tabelle: { kopf: ['Gerät', 'Leistung', 'Laufzeit pro Woche'], zeilen: [['Föhn', '1800 W', '10 min'], ['Laptop', '60 W', '10 h'], ['Spielkonsole', '150 W', '6 h'], ['Wasserkocher', '2000 W', '30 min']] },
      aussagen: [
        { text: 'Der Wasserkocher braucht pro Woche am meisten Energie.', richtig: true },
        { text: 'Der Föhn braucht mehr Energie als der Laptop, weil er die grössere Leistung hat.', richtig: false,
          erklaerung: 'Föhn: 1800 W · 1/6 h = 300 Wh. Laptop: 60 W · 10 h = 600 Wh. Die lange Laufzeit macht den Unterschied.' },
        { text: 'Die Spielkonsole braucht pro Woche dreimal so viel Energie wie der Föhn.', richtig: true },
        { text: 'Das Gerät mit der kleinsten Leistung braucht am wenigsten Energie.', richtig: false,
          erklaerung: 'Der Laptop hat die kleinste Leistung, braucht aber mit 600 Wh mehr als der Föhn (300 Wh).' }],
      erklaerung: 'E = P · t: Föhn 300 Wh, Laptop 600 Wh, Spielkonsole 900 Wh, Wasserkocher 1000 Wh.' },
    { id: 'p5-spartipp', wieVorlage: 's5-fall', typ: 'vergleich', stufe: 5, schwierigkeit: 3,
      stufe_begruendung: 'Das Kind beurteilt zwei Spartipps nach der eingesparten Energie und muss eine fachlich tragfähige Begründung von einer Fehlvorstellung unterscheiden.',
      text: 'Zwei Spartipps für jeden Schultag. Welcher spart pro Tag mehr Energie?',
      varianten: [
        { titel: 'Spartipp A', html: 'Den Föhn (1800 W) nur noch 5 statt 10 Minuten laufen lassen.' },
        { titel: 'Spartipp B', html: 'Den Laptop (60 W) nach der Schule ausschalten statt ihn 6 Stunden laufen zu lassen.' }],
      besser: 1,
      begruendungen: [
        { text: 'ein Gerät mit kleiner Leistung immer weniger Energie braucht', richtig: false,
          erklaerung: 'Das ist die typische Verwechslung von Leistung und Energie. B spart mehr, weil die eingesparte Zeit viel länger ist.' },
        { text: 'die eingesparte Energie (Leistung mal eingesparte Zeit) grösser ist', richtig: true },
        { text: 'der Föhn sowieso nur kurz läuft', richtig: false,
          erklaerung: 'Kurz allein reicht nicht als Grund. Man muss Leistung und Zeit zusammen betrachten: A spart 1800 W · 5 min = 150 Wh.' }],
      erklaerung: 'A spart 1800 W · 1/12 h = 150 Wh. B spart 60 W · 6 h = 360 Wh. B spart also mehr als doppelt so viel.' },

    // Lernziel «Nutzen und Verlust» (Wirkungsgrad): Stufe 4 und 5
    { id: 'p4-eta-fehler', wieVorlage: 's6-def', typ: 'fehler', stufe: 4, schwierigkeit: 3,
      stufe_begruendung: 'Das Kind muss einen fremden Lösungsweg Schritt für Schritt prüfen und die Ursache des Fehlers bestimmen, nicht nur ein Ergebnis berechnen.',
      text: 'Jonas berechnet den Wirkungsgrad eines Elektromotors. Dem Motor werden 400 J zugeführt, er gibt 100 J Nutzenergie ab. Finde die Zeile, in der der Fehler entsteht, und wähle die Fehlerart.',
      zeilen: ['Gegeben: E_zu = 400 J, E_nutz = 100 J', 'Formel: η = E_nutz : E_zu', 'Einsetzen: η = 400 J : 100 J', 'Ergebnis: η = 4 = 400 %'],
      fehlerarten: ['Werte vertauscht eingesetzt', 'falsche Formel', 'verrechnet', 'falsche Einheit'], fehlerZeile: 2, fehlerArt: 0,
      erklaerung: 'In Zeile 3 sind Nutzenergie und zugeführte Energie vertauscht. Richtig: η = 100 J : 400 J = 0,25 = 25 %. Ein Wirkungsgrad über 100 % ist unmöglich, das ist ein guter Hinweis auf einen Fehler.' },
    { id: 'p5-lampe', wieVorlage: 's6-def', typ: 'vergleich', stufe: 5, schwierigkeit: 3,
      stufe_begruendung: 'Das Kind beurteilt zwei Lampen nach dem Wirkungsgrad und wählt die Begründung, die Energieentwertung richtig beschreibt.',
      text: 'Für eine Leselampe stehen zwei etwa gleich helle Lampen zur Auswahl. Welche ist die bessere Wahl?',
      varianten: [
        { titel: 'LED-Lampe', html: '8 W, Wirkungsgrad etwa 30 %' },
        { titel: 'Glühlampe', html: '50 W, Wirkungsgrad etwa 5 %' }],
      besser: 0,
      begruendungen: [
        { text: 'sie weniger Watt hat und deshalb weniger blendet', richtig: false,
          erklaerung: 'Beide sind etwa gleich hell. Watt sagt, wie viel Energie pro Sekunde zugeführt wird, nicht wie hell eine Lampe ist.' },
        { text: 'bei ihr keine Energie verloren geht', richtig: false,
          erklaerung: 'Auch bei der LED wird ein grosser Teil zu Wärme. Energie geht nie verloren, sie wird entwertet.' },
        { text: 'sie für dasselbe Licht viel weniger Energie braucht, weil weniger davon als Wärme entwertet wird', richtig: true }],
      erklaerung: 'Licht pro Sekunde: LED 8 W · 0,30 ≈ 2,4 W, Glühlampe 50 W · 0,05 = 2,5 W, also etwa gleich hell. Die LED braucht dafür nur etwa einen Sechstel der Energie.' }
  ]
};
