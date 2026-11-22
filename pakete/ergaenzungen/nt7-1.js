// Ergänzungen zum Paket «Naturwissenschaften erkunden» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'w1-gebiete': {
      1: 'Geschichte und Geografie sind Gesellschaftswissenschaften, Mathematik ist eine Formalwissenschaft.',
      2: 'Astrologie und Esoterik lassen sich nicht mit Experimenten prüfen. Sie sind keine Naturwissenschaften.',
      3: 'Sport und Musik gehören nicht dazu. Nur Biologie stimmt.'
    },
    'w1-ueberschnitt': {
      1: 'Es liegt nicht am Unwissen. Viele Vorgänge betreffen wirklich mehrere Gebiete gleichzeitig.',
      2: 'Viele Beispiele gehören zu Biologie oder Physik, oft zu mehreren Gebieten zugleich.',
      3: 'Es gibt mehrere Gebiete. Sie überschneiden sich aber, darum ist die Zuordnung nicht immer eindeutig.'
    },
    'w1-astro': {
      1: 'Astrologie deutet Sternzeichen. Ihre Aussagen lassen sich nicht mit Experimenten bestätigen.',
      2: 'Nur die Astronomie misst und beobachtet überprüfbar. Die Astrologie nicht.',
      3: 'Die Astronomie ist eine Naturwissenschaft: Sie beobachtet und misst Himmelskörper.'
    },
    'w1-zukunft': {
      1: 'Wie viele Sterne es gibt, sagt nichts darüber, ob eine Aussage überprüfbar ist.',
      2: 'Was gedruckt ist, ist deshalb nicht bewiesen. Entscheidend ist die Überprüfbarkeit.',
      3: 'Viele Menschen können sich irren. Eine Aussage wird nicht durch Glauben wissenschaftlich.'
    },
    'w1-luca': {
      1: 'Wer etwas sagt, ist nicht entscheidend. Wichtig ist, ob sich die Aussage auf Beobachtungen stützt.',
      2: 'Ob etwas erlaubt ist, hat nichts damit zu tun, ob eine Aussage wissenschaftlich ist.',
      3: 'Gerade Beobachtungen und Zahlen von vielen Patienten machen die Aussage wissenschaftlich.'
    },
    'w1-anna': {
      1: 'Gemessen hat Anna, aber nur einmal bei einer Schnecke. Das reicht nicht für eine allgemeine Aussage.',
      2: 'Dass Schnecken langsam sind, belegt nicht die genaue Zahl. Dafür braucht es viele Messungen.',
      3: 'Eine genaue Zahl aus einer einzigen Messung ist noch kein Beleg.'
    },
    'w2-beobachtung': {
      1: 'Eine Erklärung sagt, warum etwas passiert. Die Beobachtung hält nur fest, was passiert.',
      2: 'Die Vermutung kommt vor dem Versuch. Die Beobachtung entsteht während des Versuchs.',
      3: 'Eine Beobachtung hängt nicht davon ab, ob sie dir gefällt.'
    },
    'w2-vermutung': {
      1: 'Ein sicheres Ergebnis ist keine Vermutung mehr. Die Vermutung wird erst geprüft.',
      2: 'Eine Vermutung beantwortet eine Frage vorläufig. Sie soll prüfbar sein.',
      3: 'Die Zeichnung des Aufbaus gehört zur Planung, nicht zur Vermutung.'
    },
    'w2-reihenfolge': {
      1: 'Die Durchführung kommt erst nach Frage, Vermutung und Plan.',
      2: 'Die Antwort steht am Schluss, nicht am Anfang.',
      3: 'Am Anfang steht die Forschungsfrage, nicht der Plan.'
    },
    'w2-draht': {
      1: 'Es ist umgekehrt: Der kurze Draht wird wärmer.',
      2: 'Die Länge hat einen deutlichen Einfluss. Der kurze Draht wird wärmer.',
      3: 'Auch dünne Drähte werden warm. Untersucht wurde hier die Länge.'
    },
    'w2-heizung': {
      1: 'Ein sehr kurzer Draht wird zu heiss. Das ist gefährlich.',
      2: 'Berühren sich die Schlaufen, nimmt der Strom eine Abkürzung. Das ist gefährlich.',
      3: 'Heftklammern aus Metall können zwei Schlaufen verbinden und eine Abkürzung bilden.'
    },
    'w2-sicher': {
      1: 'Auch eine Batterie kann einen Draht stark erhitzen.',
      2: 'Lange einschalten macht den Draht gefährlich heiss.',
      3: 'Halte den Draht nicht dauerhaft in der Hand, du kannst dich verbrennen.'
    },
    'w3-unterschied': {
      1: 'Auch Erfindungen können durch Zufall entstehen, und Entdeckungen können geplant sein.',
      2: 'Es gibt einen Unterschied: Entdecken heisst finden, erfinden heisst etwas Neues bauen.',
      3: 'Das ist vertauscht. Etwas Vorhandenes findet man durch eine Entdeckung.'
    },
    'w3-einfluss': {
      1: 'Jahreszahlen helfen bei der Einordnung. Wichtiger ist aber die Wirkung auf das Leben.',
      2: 'Namen allein sagen nichts darüber, was die Erfindung bewirkt hat.',
      3: 'Die Jahre sind nicht das Wichtigste. Es zählt, was sich für die Menschen verändert hat.'
    },
    'w3-heizgeraete': {
      1: 'Sie haben den Alltag stark verändert: Wärme ist auf Knopfdruck da.',
      2: 'Sie machen Wärme einfacher verfügbar, nicht komplizierter.',
      3: 'Heizgeräte stehen in fast jedem Haushalt, nicht nur bei Wissenschaftlern.'
    },
    'w3-vorurteil': {
      1: 'Chemie steckt auch in Medikamenten, Seife und Nahrung. Sie ist nicht immer gefährlich.',
      2: 'Auch Biologie hat gefährliche Seiten, zum Beispiel Krankheitserreger oder Giftpflanzen.',
      3: 'Das Vorurteil betrifft Biologie und Chemie. Physik ändert daran nichts.'
    },
    'w3-zufall': {
      1: 'Manche Erfindungen entstanden durch Zufall, zum Beispiel Entdeckungen bei misslungenen Versuchen.',
      2: 'Zufälle spielen eine Rolle, wenn jemand genau hinschaut und sie erkennt.',
      3: 'Manche Zufallserfindungen haben das Leben stark verändert.'
    },
    'w4-okular': {
      1: 'Das Objektiv ist die Linse unten, nahe am Präparat.',
      2: 'Auf den Objekttisch legst du den Objektträger. Hindurchschauen kannst du nicht.',
      3: 'Mit dem Grobtrieb stellst du scharf. Hindurchschauen kannst du nicht.'
    },
    'w4-revolver': {
      1: 'Scharf stellst du mit Grob- und Feintrieb.',
      2: 'Beleuchtet wird von unten mit der Lampe.',
      3: 'Den Objektträger halten die Klemmen auf dem Objekttisch.'
    },
    'w4-fehler': {
      1: 'Die Dauer der Stunde hat nichts damit zu tun. Prüfe Licht, Objektiv und Präparat.',
      2: 'Die Farbe des Okulars spielt keine Rolle.',
      3: 'Meist liegt es nicht am Mikroskop, sondern an einem einfachen Fehler. Erst systematisch prüfen.'
    },
    'w5-bestehen': {
      1: 'Lebewesen «haben» Zellen nicht wie Körperteile. Sie bestehen aus Zellen.',
      2: 'Auch Tiere, Menschen, Pilze und Bakterien bestehen aus Zellen.',
      3: 'Manche Zellen sieht man ohne Mikroskop, zum Beispiel das Hühnerei.'
    },
    'w5-plasma': {
      1: 'Die Zellen bleiben im Blatt. Was sich bewegt, ist das Zellinnere.',
      2: 'Wasserpestzellen leuchten nicht. Sie sind grün wegen der Blattgrünkörner.',
      3: 'Die Zellen sind gefüllt, zum Beispiel mit Blattgrünkörnern.'
    },
    'w5-salz': {
      1: 'Im Salzwasser verlieren die Zellen Wasser. Sie werden nicht grösser.',
      2: 'Es ändert sich etwas: Die roten Flächen ziehen sich zusammen.',
      3: 'Die Zellen bleiben da. Nur ihr Inhalt zieht sich zusammen.'
    },
    'w5-zeichnung': {
      1: 'Verzierungen gehören nicht dazu. Die Zeichnung soll genau zeigen, was du siehst.',
      2: 'Dein Name reicht nicht. Titel und Vergrösserung sind nötig.',
      3: 'Das Datum des letzten Schultags hat keinen Bezug zur Beobachtung.'
    },
    'w5-licht': {
      1: 'Im Dunkeln bewegen sich die Blattgrünkörner weniger. Licht regt sie an.',
      2: 'Kochen tötet die Zellen. Dann gibt es keine Bewegung mehr.',
      3: 'Salz verändert die Zellen, regt die Bewegung aber nicht an.'
    },
    'w6-teile': {
      1: 'Ein Samen enthält etwas Wasser, besteht aber aus Samenhaut, Keimblättern und Keimling.',
      2: 'Wurzel, Stamm und Krone hat ein Baum, nicht ein Samen.',
      3: 'Blüte und Frucht gehören zur Pflanze. Der Samen sitzt in der Frucht.'
    },
    'w6-quellung': {
      1: 'Beim Quellen nimmt der Samen Wasser auf, er trocknet nicht aus.',
      2: 'Die Nährstoffe bleiben in den Keimblättern. Dazu kommt Wasser.',
      3: 'Der Samen wird grösser, weil er Wasser aufnimmt.'
    },
    'w6-kontrolle': {
      1: 'Ohne Vergleichsgruppe im Hellen weisst du nicht, ob das Licht der Grund ist.',
      2: 'Salzwasser bringt eine zweite Veränderung. Dann ist der Vergleich nicht mehr fair.',
      3: 'Eine Meinung ersetzt kein Experiment.'
    },
    'w6-fair': {
      1: 'Verschiedene Wassermengen verfälschen den Vergleich. Nur das Salz darf sich unterscheiden.',
      2: 'Fenster und Keller sind unterschiedlich hell. Dann weisst du nicht, ob Licht oder Salz wirkt.',
      3: 'Wenn alle gleich viel Salz bekommen, kannst du den Einfluss des Salzes nicht sehen.'
    },
    'w6-ohne': {
      1: 'Es geht nicht um mehr Kresse, sondern um einen Vergleich.',
      2: 'Die Dauer ändert sich dadurch nicht.',
      3: 'Das Salzfüllen spielt keine Rolle. Das Schälchen ohne Salz dient als Vergleich.'
    }
  },

  aufgaben: [
    { id: 'w2-reihenfolge-v2', wieVorlage: 'w2-reihenfolge', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe die Schritte des Experimentierens in die richtige Reihenfolge.',
      elemente: ['Forschungsfrage', 'Vermutung', 'Plan', 'Durchführung und Beobachtung', 'Auswertung', 'Antwort'],
      erklaerung: 'Frage → Vermutung → Plan → Durchführung mit Beobachtungen → Auswertung → Antwort auf die Frage.' },
    { id: 'w2-reihenfolge-v3', wieVorlage: 'w2-reihenfolge', schwierigkeit: 2,
      ...mc('Was machst du direkt nach der Forschungsfrage?', 'Eine Vermutung aufschreiben.', [
        ['Das Experiment durchführen.', 'Vorher brauchst du eine Vermutung und einen Plan.'],
        ['Die Antwort aufschreiben.', 'Die Antwort kommt erst nach der Auswertung.'],
        ['Die Ergebnisse auswerten.', 'Auswerten kannst du erst, wenn es Ergebnisse gibt.']],
        'Nach der Frage schreibst du deine Vermutung auf. Erst dann planst du das Experiment.') },

    { id: 'w2-draht-v2', wieVorlage: 'w2-draht', schwierigkeit: 2,
      ...mc('Du willst prüfen, ob die Drahtlänge die Erwärmung beeinflusst. Was musst du gleich lassen?', 'Drahtsorte, Drahtdicke und Batterie.', [
        ['Nichts, du kannst alles ändern.', 'Änderst du mehreres gleichzeitig, weisst du nicht, was die Ursache ist.'],
        ['Die Drahtlänge.', 'Die Länge willst du gerade verändern und untersuchen.'],
        ['Nur die Farbe der Kabel.', 'Die Farbe ist egal. Dicke, Sorte und Batterie beeinflussen aber das Ergebnis.']],
        'Nur die untersuchte Grösse (Länge) wird verändert. Alles andere bleibt gleich: fairer Vergleich.') },

    { id: 'w2-heizung-v2', wieVorlage: 'w2-heizung', schwierigkeit: 2,
      ...mc('Deine Draht-Handheizung wird zu heiss. Was änderst du?', 'Einen längeren Draht verwenden.', [
        ['Einen kürzeren Draht verwenden.', 'Kürzere Drähte werden noch wärmer.'],
        ['Die Schlaufen enger zusammendrücken.', 'Berührende Schlaufen bilden eine Abkürzung. Dann wird es noch heisser.'],
        ['Eine zweite Batterie dazuschalten.', 'Mehr Spannung macht den Draht noch wärmer.']],
        'Je länger der Draht, desto weniger warm wird er. Darum hilft ein längerer Draht.') },

    { id: 'w2-sicher-v2', wieVorlage: 'w2-sicher', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jeder Sicherheitsregel ihren Grund zu.',
      paare: [['Nur kurz einschalten', 'der Draht wird sonst sehr heiss'], ['Feuerfeste Unterlage', 'der Tisch soll nicht verbrennen'],
        ['Kabel vorher prüfen', 'schlechte Kabel werden selbst heiss']],
      erklaerung: 'Draht und Kabel können sich stark erwärmen. Darum kurz einschalten, feuerfest arbeiten und gute Kabel verwenden.' },

    { id: 'w3-unterschied-v2', wieVorlage: 'w3-unterschied', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Entdeckung oder Erfindung? Ordne zu.',
      paare: [['Der Wasserkocher', 'Erfindung'], ['Die Zellen in Lebewesen', 'Entdeckung'], ['Das Mikroskop', 'Erfindung'], ['Die Plasmaströmung in Zellen', 'Entdeckung']],
      erklaerung: 'Geräte werden erfunden. Was es in der Natur schon gibt (Zellen, Plasmaströmung), wird entdeckt.' },
    { id: 'w3-unterschied-v3', wieVorlage: 'w3-unterschied', schwierigkeit: 2,
      ...mc('Ist die Wärmewirkung des elektrischen Stroms eine Entdeckung oder eine Erfindung?', 'Eine Entdeckung: Es ist eine Naturerscheinung.', [
        ['Eine Erfindung, weil Strom aus der Steckdose kommt.', 'Die Steckdose ist erfunden, die Wärmewirkung gab es schon vorher.'],
        ['Beides gleichzeitig.', 'Die Naturerscheinung wird entdeckt, ein Gerät, das sie nutzt, wird erfunden.'],
        ['Weder noch.', 'Es ist eine Naturerscheinung, die man entdeckt hat.']],
        'Die Wärmewirkung ist eine Naturerscheinung: entdeckt. Ein Föhn, der sie nutzt, ist eine Erfindung.') },

    { id: 'w3-zufall-v2', wieVorlage: 'w3-zufall', schwierigkeit: 2,
      ...mc('Was braucht es, damit aus einem Zufall eine Entdeckung wird?', 'Jemanden, der genau beobachtet und das Unerwartete ernst nimmt.', [
        ['Viel Glück, sonst nichts.', 'Glück allein reicht nicht. Man muss das Unerwartete auch bemerken.'],
        ['Einen teuren Versuchsaufbau.', 'Viele Zufallsentdeckungen geschahen mit einfachen Mitteln.'],
        ['Dass man das Ergebnis vorher schon kennt.', 'Dann wäre es kein Zufall.']],
        'Zufälle passieren oft. Zur Entdeckung werden sie erst, wenn jemand genau hinschaut.') },

    { id: 'w3-jahre-v2', wieVorlage: 'w3-jahre', typ: 'zahl', schwierigkeit: 1,
      erzeuge() {
        const [was, jahr] = zufall([['Das erste Mikroskop mit zwei Linsen wurde um', 1590], ['Die Glühlampe wurde verbessert um', 1880], ['Der erste Elektromotor lief um', 1834], ['Der Föhn kam auf den Markt um', 1900]]);
        return zahl(`${was} ${jahr}. Wie viele Jahre ist das bis 2026 her?`, 2026 - jahr, 'Jahre', `2026 − ${jahr} = ${2026 - jahr} Jahre`, 'Rechne 2026 minus Jahr.');
      } },

    { id: 'w4-gesamt-v2', wieVorlage: 'w4-gesamt', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const ok = zufall([5, 10, 15]), ob = zufall([4, 10, 40]), G = ok * ob;
        return zahl(`Du willst ${G}-fach vergrössern. Das Okular vergrössert ${ok}-fach. Welche Vergrösserung muss das Objektiv haben?`, ob, '-fach',
          `Gesamt = Okular · Objektiv, also Objektiv = ${G} : ${ok} = ${ob}-fach`, 'Gesamtvergrösserung geteilt durch Okular.');
      } },
    { id: 'w4-gesamt-v3', wieVorlage: 'w4-gesamt', schwierigkeit: 2,
      ...mc('Okular 10x, Objektiv 40x. Wie gross ist die Gesamtvergrösserung?', '400-fach', [
        ['50-fach', 'Die Vergrösserungen werden multipliziert, nicht addiert.'],
        ['4-fach', 'Die Vergrösserungen werden multipliziert, nicht geteilt.'],
        ['40-fach', 'Das ist nur das Objektiv. Das Okular vergrössert zusätzlich.']],
        'Gesamtvergrösserung = 10 · 40 = 400-fach.') },

    { id: 'w4-fehler-v2', wieVorlage: 'w4-fehler', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Problem am Mikroskop die passende Lösung zu.',
      paare: [['Alles bleibt dunkel', 'Licht einschalten'], ['Das Bild ist verschwommen', 'mit dem Feintrieb scharf stellen'],
        ['Man sieht nur einen halben Kreis', 'Objektiv richtig einrasten'], ['Man sieht nichts vom Objekt', 'Präparat unter das Objektiv schieben']],
      erklaerung: 'Die häufigsten Fehler lassen sich schnell beheben, wenn du der Reihe nach prüfst.' },

    { id: 'w5-anzahl-v2', wieVorlage: 'w5-anzahl', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const l = zufall([0.02, 0.05, 0.025]), s = zufall([1, 2, 5]);
        return zahl(`Eine Zelle ist ${z(l)} mm lang. Wie viele solche Zellen passen nebeneinander auf ${s} mm?`, s / l, 'Zellen',
          `${s} mm : ${z(l)} mm = ${z(s / l)} Zellen`, 'Strecke geteilt durch die Länge einer Zelle.');
      } },

    { id: 'w5-bestehen-v2', wieVorlage: 'w5-bestehen', schwierigkeit: 2,
      ...mc('Welches Lebewesen besteht aus nur einer einzigen Zelle?', 'Ein Bakterium.', [
        ['Eine Ameise.', 'Auch kleine Tiere bestehen aus sehr vielen Zellen.'],
        ['Ein Grashalm.', 'Pflanzen bestehen aus vielen Zellen.'],
        ['Ein Pilz im Wald.', 'Die Pilze im Wald bestehen aus unzähligen Zellen.']],
        'Bakterien sind Einzeller. Pflanzen, Tiere und Waldpilze sind Vielzeller.') },
    { id: 'w5-bestehen-v3', wieVorlage: 'w5-bestehen', typ: 'luecke', schwierigkeit: 1,
      text: 'Alle Lebewesen bestehen aus mindestens einer ___. Sie ist die kleinste ___ des Lebens.',
      luecken: [['Zelle'], ['Einheit']],
      erklaerung: 'Zellen sind die kleinste Einheit der Lebewesen.' },

    { id: 'w5-zeichnung-v2', wieVorlage: 'w5-zeichnung', schwierigkeit: 2,
      ...mc('Wie zeichnest du, was du unter dem Mikroskop siehst?', 'So genau, wie du es siehst, mit Titel und Vergrösserung.', [
        ['So, wie es im Buch aussieht.', 'Die Zeichnung soll deine eigene Beobachtung zeigen.'],
        ['Möglichst farbig und mit Fantasie ergänzt.', 'Ergänzungen aus der Fantasie verfälschen die Beobachtung.'],
        ['Ohne Titel, damit es schneller geht.', 'Ohne Titel weiss später niemand, was gezeichnet ist.']],
        'Eine naturwissenschaftliche Zeichnung zeigt genau das Beobachtete und hat Titel und Gesamtvergrösserung.') },

    { id: 'w5-licht-v2', wieVorlage: 'w5-licht', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe die Schritte beim Mikroskopieren in die richtige Reihenfolge.',
      elemente: ['Wassertropfen auf den Objektträger geben', 'Objekt hineinlegen', 'Deckglas auflegen', 'mit kleinster Vergrösserung scharf stellen', 'stärkeres Objektiv wählen'],
      erklaerung: 'Präparat vorbereiten, dann immer mit der kleinsten Vergrösserung beginnen und erst danach stärker vergrössern.' },
    { id: 'w5-licht-v3', wieVorlage: 'w5-licht', schwierigkeit: 2,
      ...mc('Mit welcher Vergrösserung beginnst du beim Mikroskopieren?', 'Mit der kleinsten.', [
        ['Mit der grössten, dann sieht man am meisten.', 'Bei grosser Vergrösserung ist der Ausschnitt klein, du findest das Objekt schwer.'],
        ['Das spielt keine Rolle.', 'Doch: Mit der kleinsten findest du das Objekt am leichtesten.'],
        ['Mit der mittleren.', 'Begonnen wird mit der kleinsten Vergrösserung.']],
        'Mit kleiner Vergrösserung siehst du einen grossen Ausschnitt und findest das Objekt. Dann wechselst du zu stärkeren Objektiven.') },

    { id: 'w6-teile-v2', wieVorlage: 'w6-teile', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Teil des Bohnensamens seine Aufgabe zu.',
      paare: [['Samenhaut', 'schützt den Samen'], ['Keimblätter', 'enthalten Nährstoffe'], ['Keimling', 'wächst zur neuen Pflanze heran']],
      erklaerung: 'Die Samenhaut schützt, die Keimblätter liefern Nahrung, der Keimling ist die junge Pflanze.' },

    { id: 'w6-quellung-v2', wieVorlage: 'w6-quellung', typ: 'luecke', schwierigkeit: 2,
      text: 'Zuerst nimmt der Samen Wasser auf, das heisst ___. Danach wächst die junge Pflanze heraus, das heisst ___.',
      luecken: [['Quellung', 'Quellen'], ['Keimung', 'Keimen']],
      erklaerung: 'Erst die Quellung (Wasseraufnahme), dann die Keimung (die junge Pflanze wächst).' },
    { id: 'w6-quellung-v3', wieVorlage: 'w6-quellung', schwierigkeit: 2,
      ...mc('Du giesst Feuerbohnen sehr viel. Was kann passieren?', 'Die Samen beginnen zu faulen.', [
        ['Sie keimen besonders schnell.', 'Zu viel Wasser schadet. Die Samen bekommen zu wenig Luft und faulen.'],
        ['Nichts, Samen brauchen nur Wasser.', 'Samen brauchen Wasser, aber nicht zu viel.'],
        ['Sie werden kleiner.', 'Die Samen quellen, werden aber nicht kleiner. Bei zu viel Wasser faulen sie.']],
        'Samen brauchen Wasser zum Quellen, aber zu viel Wasser lässt sie faulen.') },

    { id: 'w6-wasser-v2', wieVorlage: 'w6-wasser', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const tr = zufall([1.5, 2, 2.5, 3]), auf = zufall([1.2, 1.5, 1.8, 2.1]);
        return zahl(`Eine Erbse nimmt beim Quellen ${z(auf)} g Wasser auf. Trocken wog sie ${z(tr)} g. Wie schwer ist sie nach dem Quellen?`, tr + auf, 'g',
          `${z(tr)} g + ${z(auf)} g = ${z(tr + auf)} g`, 'Trockengewicht plus aufgenommenes Wasser.');
      } }
  ]
};
