// Ergänzungen zum Paket «Arbeiten im Labor» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'r1-stoff': {
      1: 'In der Chemie meint «Stoff» jedes Material, zum Beispiel Metall, Glas oder Wasser.',
      2: 'Jeder Gegenstand besteht aus Stoffen, ein Wecker zum Beispiel aus Metall, Glas und Kunststoff.',
      3: 'Der Gegenstand ist das Ding, der Stoff das Material, aus dem es besteht.'
    },
    'r1-chemie': {
      1: 'Auch natürliche Stoffe wie Wasser, Holz und Luft gehören zur Chemie.',
      2: 'Die Chemie untersucht alle Stoffe, nicht nur giftige.',
      3: 'Die Chemie untersucht Stoffe überall, auch im Alltag und in der Natur.'
    },
    'r1-schutz': {
      1: 'Die Schutzbrille trägst du dauernd. Auch bei harmlos scheinenden Versuchen kann etwas ins Auge spritzen.',
      2: 'Offene Haare können Feuer fangen oder in Chemikalien hängen. Binde sie zusammen.',
      3: 'Gerade wenn es schnell gehen soll, passieren Unfälle. Schutz gilt immer.'
    },
    'r1-essen': {
      1: 'Auch saubere Laborgefässe können Reste von Chemikalien enthalten. Im Labor trinkst du nie.',
      2: 'Ein guter Geruch heisst nicht, dass ein Stoff ungefährlich ist. Du probierst nie Stoffe.',
      3: 'Im Labor wird gar nicht gegessen, auch nicht nach dem Versuch. Pause machst du draussen.'
    },
    'r1-geruch': {
      1: 'Direkt am Gefäss atmest du zu viel Dampf ein. Fächle ihn mit der Hand zur Nase.',
      2: 'Tief einatmen ist gefährlich. Rieche vorsichtig und fächle den Dampf zu.',
      3: 'Riechen ist erlaubt, wenn die Lehrperson es sagt. Dann fächelst du den Dampf zu.'
    },
    'r1-anleit': {
      1: 'Ohne Anleitung kennst du die Gefahren nicht. Lies zuerst und ordne den Arbeitsplatz.',
      2: 'Du arbeitest selbst. Zuschauen ersetzt nicht das genaue Lesen der Anleitung.',
      3: 'Du verwendest nur die Stoffe aus der Anleitung. Ausprobieren ist gefährlich.'
    },
    'r1-kt3': {
      1: 'Nicht nur beim Brenner: Spritzer gibt es bei vielen Versuchen.',
      2: 'Auch andere Stoffe können in die Augen spritzen. Die Brille bleibt immer auf.',
      3: 'Schnelle Versuche sind nicht ungefährlicher. Die Brille trägst du dauernd.'
    },
    'r2-unterlage': {
      1: 'Ohne wärmefeste Unterlage kann das Pult Feuer fangen.',
      2: 'Brenner verbrauchen Sauerstoff und geben Abgase ab. Es braucht gute Lüftung.',
      3: 'Offene Haare können Feuer fangen. Binde sie zusammen.'
    },
    'r2-flamme': {
      1: 'Umgekehrt: Die leuchtende Flamme hat zu wenig Luft und ist kühler. Die rauschende Flamme ist heisser.',
      2: 'Mit mehr Luft verbrennt das Gas vollständiger. Darum ist die rauschende Flamme heisser.',
      3: 'Mit der Luftzufuhr stellst du die Flamme ein. Mehr Luft gibt eine heissere Flamme.'
    },
    'r2-kt6': {
      1: 'Das Symbol «ätzend» zeigt eine zerfressene Hand und Oberfläche.',
      2: '«Umweltgefährlich» zeigt einen toten Baum und Fisch.',
      3: '«Gas unter Druck» zeigt eine Gasflasche.'
    },
    'r2-ghs': {
      1: 'Giftige Stoffe dürfen im Schulunterricht gar nicht verwendet werden.',
      2: 'Auch in der Schule gibt es gefährliche Stoffe. Die Symbole zeigen, welche Gefahr droht.',
      3: 'GHS-Symbole stehen auf Chemikalien und Haushaltsprodukten, nicht auf Lebensmitteln.'
    },
    'r2-abfall': {
      1: 'Chemikalien gehören nicht in den Hausmüll. Sie werden getrennt entsorgt.',
      2: 'Chemikalien im Abfluss belasten das Abwasser und die Gewässer.',
      3: 'Verschiedene Abfälle können miteinander reagieren. Darum trennt man sie.'
    },
    'r2-notfall': {
      1: 'Abwarten kann schwere Schäden verursachen. Hilf sofort und rufe die Lehrperson.',
      2: 'Jeder Unfall wird gemeldet, damit richtig geholfen werden kann.',
      3: 'Man trinkt nie Chemikalien. Bei Vergiftung rufst du Tox Info Suisse unter 145 an.'
    },
    'r3-glas': {
      1: 'Kunststoff schmilzt in der Flamme. Nur Glasgeräte darf man erhitzen.',
      2: 'Umgekehrt: Glas ist hitzebeständig, Kunststoff nicht.',
      3: 'Glas ist zerbrechlich. Du gehst sorgfältig damit um.'
    },
    'r3-skala': {
      1: 'Beim Messzylinder steigt die Skala von unten nach oben.',
      2: 'Beim Messzylinder läuft die Skala von unten nach oben, bei der Pipette von oben nach unten.',
      3: 'Messzylinder, Pipette und Bürette haben alle eine Skala für das Volumen.'
    },
    'r3-pipette': {
      1: 'Mit dem Mund kann Flüssigkeit in den Mund gelangen. Das ist gefährlich.',
      2: 'Mit dem Finger kann man nicht ansaugen. Man braucht eine Pipettierhilfe wie den Peleusball.',
      3: 'Eine Pipette füllt man durch Ansaugen mit einer Pipettierhilfe, nicht durch Giessen.'
    },
    'r3-masse': {
      1: 'Im Alltag sagt man «Gewicht». In den Naturwissenschaften ist das Gewicht eine Kraft in Newton.',
      2: 'Das Volumen misst man mit dem Messzylinder in Millilitern.',
      3: 'Die Dichte berechnet man aus Masse und Volumen. Die Waage zeigt nur die Masse.'
    },
    'r3-kt4': {
      1: 'Liter ist eine Einheit für das Volumen.',
      2: 'Newton pro Gramm gibt es nicht als Masseneinheit. Die Masse misst man in Gramm oder Kilogramm.',
      3: 'Grad Celsius ist die Einheit der Temperatur.'
    },
    'r4-magnet': {
      1: 'Kupfer, Aluminium und Gold sind Metalle, werden aber nicht angezogen.',
      2: 'Kupfer und Aluminium sind nicht magnetisch.',
      3: 'Holz, Glas oder Kunststoff sind fest, aber nicht magnetisch.'
    },
    'r4-ph': {
      1: 'Es geht mit einem Trick: Man befeuchtet das pH-Papier.',
      2: 'Trockenes Papier zeigt nichts an. Es muss befeuchtet werden.',
      3: 'Erhitzen zerstört das Papier. Man befeuchtet es stattdessen.'
    },
    'r4-dichte': {
      1: 'Körper mit grösserer Dichte als Wasser sinken. Hier ist die Dichte kleiner.',
      2: 'Ob sich etwas löst, hängt nicht von der Dichte ab.',
      3: 'Schmelzen hängt von der Temperatur ab, nicht von der Dichte.'
    },
    'r4-kt5': {
      1: 'Erstarren ist der Übergang von flüssig zu fest.',
      2: 'Verdampfen ist der Übergang von flüssig zu gasförmig.',
      3: 'Kondensieren ist der Übergang von gasförmig zu flüssig.'
    },
    'r4-uebergang': {
      1: 'Schmelzen und Erstarren sind die Übergänge zwischen fest und flüssig.',
      2: 'Erstarren und Schmelzen betreffen fest und flüssig, nicht gasförmig.',
      3: 'Sublimieren ist der direkte Übergang von fest zu gasförmig.'
    },
    'r5-filter': {
      1: 'Der Filter löst nichts auf. Er hält grosse Teilchen zurück.',
      2: 'Die Flüssigkeit läuft durch. Zurück bleiben die festen Teilchen.',
      3: 'Bei der Filtration erhitzt man nicht. Man giesst das Gemisch durch den Filter.'
    },
    'r5-extrakt': {
      1: 'Bei der Destillation verdampft man einen Stoff und kühlt ihn wieder ab.',
      2: 'Die Chromatografie trennt Farbstoffe auf Papier.',
      3: 'Bei der Filtration hält ein Filter feste Teilchen zurück. Beim Tee lösen sich Stoffe heraus.'
    },
    'r5-destill': {
      1: 'Abkühlen trennt Wasser und Ethanol nicht. Man nutzt die verschiedenen Siedepunkte.',
      2: 'Wasser und Ethanol sind ineinander gelöst und laufen beide durch den Filter.',
      3: 'Schütteln mischt nur weiter. Getrennt wird durch Verdampfen und Abkühlen.'
    },
    'r5-adsorp': {
      1: 'Beim Verdampfen bleibt der Farbstoff zurück, das Getränk ist dann weg.',
      2: 'Abkühlen ändert die Farbe nicht.',
      3: 'Zucker entfärbt nichts. Die Farbstoffe lagern sich an der Aktivkohle an.'
    },
    'r5-chrom': {
      1: 'Die Farben verdampfen nicht. Sie wandern mit dem Wasser verschieden weit im Papier.',
      2: 'Gelöste Farbstoffe laufen durch einen Filter. Getrennt werden sie durch das Laufmittel.',
      3: 'Das Papier bleibt ganz. Das Wasser saugt sich darin hoch.'
    },
    'r5-alltag': {
      1: 'Trennverfahren gibt es auch zu Hause, zum Beispiel beim Kaffeefilter.',
      2: 'Auch im Alltag trennt man Stoffe, zum Beispiel in der Waschmaschine und in der Kläranlage.',
      3: 'Beim Kaffee- und Teekochen, beim Waschen und beim Recycling werden Stoffe getrennt.'
    },
    'r5-kt4': {
      1: 'Die Filtration nutzt die Teilchengrösse, nicht den Siedepunkt.',
      2: 'Die Chromatografie nutzt, wie weit Farbstoffe mitgenommen werden.',
      3: 'Bei der Adsorption lagern sich Stoffe an der Oberfläche der Aktivkohle an.'
    },
    'r6-rein': {
      1: 'Umgekehrt: Ein Gemisch besteht aus mehreren Stoffen.',
      2: 'Ein Reinstoff hat feste Eigenschaften, ein Gemisch lässt sich trennen.',
      3: 'Reinstoffe gibt es fest, flüssig und gasförmig, zum Beispiel Eisen, Wasser und Sauerstoff.'
    },
    'r6-homogen': {
      1: 'Wenn man nichts erkennen kann, ist das Gemisch homogen.',
      2: 'Auch Flüssigkeiten können homogen sein, zum Beispiel Salzwasser.',
      3: 'Die Temperatur entscheidet nicht. Es geht darum, ob man die Bestandteile sieht.'
    },
    'r6-art': {
      1: 'Sand in Wasser ist keine Lösung: Der Sand bleibt als Feststoff sichtbar.',
      2: 'Sand ist ein Feststoff. Feststoff in Flüssigkeit heisst Suspension, nicht Emulsion.',
      3: 'Nebel, Rauch und Schaum enthalten ein Gas. Hier geht es um Gemische mit Wasser.'
    },
    'r6-fest': {
      1: 'So sind die Teilchen in einem Gas angeordnet.',
      2: 'So sind die Teilchen in einer Flüssigkeit angeordnet.',
      3: 'Jeder Stoff besteht aus Teilchen, auch ein fester.'
    },
    'r6-kontrakt': {
      1: 'Der Effekt tritt sofort auf, auch in einem geschlossenen Gefäss.',
      2: 'Teilchen verschwinden nicht. Die Masse bleibt gleich, nur das Volumen wird kleiner.',
      3: 'Das Gefäss verändert sich nicht. Die Teilchen rücken enger zusammen.'
    },
    'r6-kt6': {
      1: 'So sind die Teilchen in einem festen Stoff angeordnet.',
      2: 'So sind die Teilchen in einer Flüssigkeit angeordnet.',
      3: 'Teilchen bewegen sich immer. Im Gas sogar besonders schnell.'
    }
  },

  aufgaben: [
    { id: 'r2-unterlage-v2', wieVorlage: 'r2-unterlage', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe die Schritte vor dem Anzünden eines Gasbrenners in eine sinnvolle Reihenfolge.',
      elemente: ['Schutzbrille aufsetzen und Haare zusammenbinden', 'Brenner auf die wärmefeste Unterlage stellen', 'Luftzufuhr schliessen', 'Gas öffnen und sofort anzünden'],
      erklaerung: 'Zuerst schützt du dich, dann stellst du den Brenner sicher auf. Mit geschlossener Luftzufuhr zündest du an.' },

    { id: 'r2-flamme-v2', wieVorlage: 'r2-flamme', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Beschreibung der Flamme zu.',
      paare: [['wenig Luft, gelb, russt', 'leuchtende Flamme'], ['viel Luft, bläulich, heiss', 'rauschende Flamme']],
      erklaerung: 'Mit mehr Luft verbrennt das Gas vollständig. Die rauschende Flamme ist heisser und russt nicht.' },

    { id: 'r2-ghs-v2', wieVorlage: 'r2-ghs', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne das Gefahrensymbol der Bedeutung zu.',
      paare: [['Flamme', 'hochentzündlich'], ['Flamme über einem Kreis', 'brandfördernd'], ['zerfressene Hand', 'ätzend'], ['Gasflasche', 'Gas unter Druck']],
      erklaerung: 'Die GHS-Symbole stehen in roten Rauten. Sie zeigen weltweit gleich, welche Gefahr droht.' },

    { id: 'r3-glas-v2', wieVorlage: 'r3-glas', schwierigkeit: 2,
      ...mc('Du willst eine Flüssigkeit über dem Brenner erhitzen. Welches Gefäss nimmst du?', 'Ein Becherglas aus Glas.', [
        ['Einen Kunststoffbecher.', 'Kunststoff ist nicht hitzebeständig und schmilzt.'],
        ['Einen Messzylinder aus Kunststoff.', 'Messgeräte erhitzt man nie, und Kunststoff schmilzt.'],
        ['Ein Trinkglas aus der Küche.', 'Trinkgläser sind nicht für die Flamme gebaut und können springen.']],
        'Laborglas ist hitzebeständig. Kunststoffgeräte erhitzt man nicht.') },

    { id: 'r3-masse-v2', wieVorlage: 'r3-masse', typ: 'luecke', schwierigkeit: 2,
      text: 'Mit der Waage misst du die ___. Die Einheit ist Gramm oder ___.',
      luecken: [['Masse'], ['Kilogramm', 'kg']],
      erklaerung: 'Die Waage zeigt die Masse. Das «Gewicht» ist in den Naturwissenschaften eine Kraft in Newton.' },

    { id: 'r4-dichte-v2', wieVorlage: 'r4-dichte', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Wasser hat die Dichte 1 g/cm³. Schwimmt der Körper oder sinkt er?',
      paare: [['Holz, 0,6 g/cm³', 'schwimmt'], ['Eisen, 7,9 g/cm³', 'sinkt'], ['Eis, 0,9 g/cm³', 'schwimmt'], ['Glas, 2,5 g/cm³', 'sinkt']],
      erklaerung: 'Ist die Dichte kleiner als die von Wasser, schwimmt der Körper. Ist sie grösser, sinkt er.' },

    { id: 'r4-masse-num-v2', wieVorlage: 'r4-masse-num', schwierigkeit: 3,
      erzeuge: () => {
        const m = zufall([20, 30, 40, 60, 80]), v = zufall([20, 25, 40, 50]);
        return zahl(`Ein Körper hat die Masse ${m} g und das Volumen ${v} cm³. Wie gross ist seine Dichte?`, m / v, 'g/cm³',
          `Dichte = Masse : Volumen = ${m} g : ${v} cm³ = ${z(m / v)} g/cm³. ${m / v < 1 ? 'Er schwimmt in Wasser.' : m / v > 1 ? 'Er sinkt in Wasser.' : 'Er schwebt in Wasser.'}`,
          'Dichte = Masse : Volumen');
      } },

    { id: 'r4-uebergang-v2', wieVorlage: 'r4-uebergang', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne den Übergang dem Namen zu.',
      paare: [['fest → flüssig', 'Schmelzen'], ['flüssig → fest', 'Erstarren'], ['flüssig → gasförmig', 'Verdampfen'], ['gasförmig → flüssig', 'Kondensieren']],
      erklaerung: 'Wasser schmilzt bei 0 °C und siedet bei 100 °C.' },

    { id: 'r5-chrom-v2', wieVorlage: 'r5-chrom', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne dem Gemisch das passende Trennverfahren zu.',
      paare: [['Sand in Wasser', 'Filtration'], ['Wasser und Ethanol', 'Destillation'], ['Farbstoffe eines Filzstifts', 'Chromatografie'], ['Farbstoff in Cola', 'Adsorption']],
      erklaerung: 'Jedes Verfahren nutzt einen anderen Unterschied: Teilchengrösse, Siedepunkt, Wanderung im Papier oder Anlagerung an Aktivkohle.' },

    { id: 'r5-alltag-v2', wieVorlage: 'r5-alltag', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Welches Trennverfahren steckt dahinter?',
      paare: [['Kaffeefilter', 'Filtration'], ['Tee ziehen lassen', 'Extraktion'], ['Kohlefilter in der Dunstabzugshaube', 'Adsorption']],
      erklaerung: 'Viele Trennverfahren aus dem Labor nutzt man auch im Alltag.' },

    { id: 'r6-art-v2', wieVorlage: 'r6-art', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne das Beispiel der Gemischart zu.',
      paare: [['Salatsauce aus Öl und Essig', 'Emulsion'], ['Lehm in Wasser', 'Suspension'], ['Zuckerwasser', 'Lösung'], ['Rauch', 'Feststoff in Gas']],
      erklaerung: 'Emulsion: Flüssigkeit in Flüssigkeit. Suspension: Feststoff in Flüssigkeit. Lösung: homogenes Gemisch.' },

    { id: 'r6-fest-v2', wieVorlage: 'r6-fest', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Anordnung der Teilchen dem Aggregatzustand zu.',
      paare: [['dicht, geordnet, schwingen am Platz', 'fest'], ['dicht, ungeordnet, beweglich', 'flüssig'], ['weit auseinander, sehr schnell', 'gasförmig']],
      erklaerung: 'Je höher die Temperatur, desto schneller bewegen sich die Teilchen.' },

    { id: 'r6-kontrakt-v2', wieVorlage: 'r6-kontrakt', schwierigkeit: 3,
      ...mc('Warum trocknet nasse Wäsche an der Luft, auch ohne Sieden?', 'Wasserteilchen lösen sich von der Wäsche und verteilen sich in der Luft.', [
        ['Das Wasser verschwindet einfach.', 'Wasser verschwindet nicht. Seine Teilchen sind danach in der Luft.'],
        ['Die Wäsche saugt das Wasser auf.', 'Dann wäre sie weiter nass. Die Teilchen verlassen die Wäsche.'],
        ['Wasser verdunstet nur bei 100 °C.', 'Bei 100 °C siedet Wasser. Verdunsten geht bei jeder Temperatur, nur langsamer.']],
        'Im Teilchenmodell bewegen sich die Teilchen ständig. Einige sind schnell genug, um die Flüssigkeit zu verlassen.') }
  ]
};
