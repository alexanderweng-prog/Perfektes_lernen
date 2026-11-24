// Ergänzungen zum Paket «Elektronische Schaltungen untersuchen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'e1-led': {
      1: 'LED ist englisch: Light Emitting Diode, also Licht aussendende Diode.',
      2: 'Eine LED ist kein Draht, sondern eine Diode, die leuchtet.',
      3: 'Eine LED ist ein Bauteil, das leuchtet, kein Drucker.'
    },
    'e1-anode': {
      1: 'Umgekehrt: Die Kathode gehört an den Minuspol.',
      2: 'Eine LED leitet nur in einer Richtung. Darum ist es nicht egal.',
      3: 'Mit beiden Anschlüssen am Pluspol ist der Stromkreis nicht geschlossen.'
    },
    'e1-richtung': {
      1: 'In Sperrrichtung fliesst kein Strom, also leuchtet die LED gar nicht.',
      2: 'Bei kleiner Spannung passiert in Sperrrichtung einfach nichts.',
      3: 'Die Farbe hängt vom Material ab. In Sperrrichtung leuchtet die LED gar nicht.'
    },
    'e1-blau': {
      1: 'Blaues Licht ist nicht wärmer. Wichtig war, dass man damit weisses Licht erzeugen kann.',
      2: 'Blaue LEDs waren lange schwierig herzustellen. Wichtig ist der Nutzen für weisses Licht.',
      3: 'Blaue LEDs machten weisse LEDs und helle Bildschirme möglich.'
    },
    'e1-rgb': {
      1: 'Jeder Bildpunkt kann jede Farbe zeigen, weil drei Chips verschieden hell leuchten.',
      2: 'Die Farben entstehen durch Mischen von Licht, nicht durch Malen.',
      3: 'Ein Prisma zerlegt Licht. Der Bildschirm mischt Rot, Grün und Blau.'
    },
    'e1-kt4': {
      1: 'Falsch herum fliesst gar kein Strom.',
      2: 'Ohne Strom bleibt die LED einfach aus.',
      3: 'Die Farbe hängt vom Material ab, nicht von der Richtung.'
    },
    'e2-fest': {
      1: 'Einen Widerstand zum Drehen nennt man Potenziometer.',
      2: 'Ein Widerstand hat immer einen Widerstandswert.',
      3: 'Licht gibt zum Beispiel eine LED ab.'
    },
    'e2-vor': {
      1: 'Er macht die LED nicht heller, sondern schützt sie.',
      2: 'Die Farbe hängt vom Material der LED ab.',
      3: 'Ein Widerstand speichert keine Energie. Er begrenzt die Stromstärke.'
    },
    'e2-serie': {
      1: 'In der Serieschaltung teilt sich die Spannung auf.',
      2: 'In der Serieschaltung ist die Stromstärke überall gleich.',
      3: 'Der Stromkreis ist geschlossen, also fliesst Strom.'
    },
    'e2-gross': {
      1: 'Ein grösserer Widerstand bremst den Strom stärker. Beides wird kleiner.',
      2: 'Auch die Stromstärke wird kleiner.',
      3: 'Der Widerstand beeinflusst Stromstärke und Spannung an der LED.'
    },
    'e2-kt4': {
      1: 'Ein grösserer Widerstand bremst den Strom stärker.',
      2: 'Nach I = U : R ändert sich I, wenn R sich ändert.',
      3: 'Die Stromstärke wird kleiner, aber nicht negativ.'
    },
    'e3-leiter': {
      1: 'Die Temperatur ist nicht der Grund. Es geht um frei bewegliche Elektronen.',
      2: 'Die Oberfläche spielt keine Rolle. Im Glas sind die Elektronen fest gebunden.',
      3: 'Kunststoff besteht aus Atomen, aber seine Elektronen sind nicht frei beweglich.'
    },
    'e3-halb': {
      1: 'Halbleiter leiten viel schlechter als Metalle.',
      2: 'Bei Zimmertemperatur leiten sie ein wenig.',
      3: 'Im Licht leiten sie besser, nicht schlechter.'
    },
    'e3-loch': {
      1: 'Ein «Loch» ist eine Stelle, an der ein Elektron fehlt, kein echtes Loch.',
      2: 'Ein Loch ist ein fehlendes Elektron, nicht ein zusätzliches.',
      3: 'Neutronen sitzen im Kern und spielen hier keine Rolle.'
    },
    'e3-eigen': {
      1: 'Leitung durch Fremdatome entsteht bei der Dotierung.',
      2: 'Es geht um die Leitung im Halbleiter selbst.',
      3: 'Eigenleitung findet im Material statt, nicht im Vakuum.'
    },
    'e3-si': {
      1: 'Silizium ist ein Halbmetall, kein Edelgas.',
      2: 'Silizium leitet viel schlechter als Kupfer.',
      3: 'Silizium ist das zweithäufigste Element der Erdkruste.'
    },
    'e3-kt4': {
      1: 'Mit Licht leitet ein Halbleiter besser.',
      2: 'Er wird zu einem besseren Leiter, nicht zum Isolator.',
      3: 'Licht löst Elektronen. Die Leitfähigkeit steigt.'
    },
    'e3-licht': {
      1: 'Das Licht wirkt direkt auf die Elektronen im Halbleiter.',
      2: 'Die Atome bleiben im Gitter. Es lösen sich nur Elektronen.',
      3: 'Die Spannung bleibt gleich. Mehr freie Ladungsträger lassen mehr Strom fliessen.'
    },
    'e4-dot': {
      1: 'Beim Dotieren wird nichts geschmolzen. Man ersetzt einzelne Atome.',
      2: 'Dotieren hat nichts mit Farbe zu tun.',
      3: 'Dotieren heisst, Fremdatome einzubauen.'
    },
    'e4-p': {
      1: 'Mehr als vier Aussenelektronen ergeben eine n-Dotierung.',
      2: 'Neutronen spielen beim Dotieren keine Rolle.',
      3: 'Erhitzen erhöht die Eigenleitung, ist aber keine Dotierung.'
    },
    'e4-n': {
      1: 'Weniger als vier Aussenelektronen ergeben eine p-Dotierung.',
      2: 'Protonen werden nicht entfernt. Man baut Fremdatome ein.',
      3: 'Abkühlen ist keine Dotierung.'
    },
    'e4-diode': {
      1: 'Eine Diode sperrt den Strom in einer Richtung.',
      2: 'Verstärken kann ein Transistor, nicht eine Diode.',
      3: 'Spannung speichert ein Kondensator.'
    },
    'e4-trans': {
      1: 'Transistoren speichern kein Licht.',
      2: 'Funk senden Antennen. Transistoren schalten und verstärken.',
      3: 'Temperatur messen Sensoren.'
    },
    'e4-kt5': {
      1: 'p-Dotierung entsteht mit Atomen mit weniger als vier Aussenelektronen.',
      2: 'Das Ersetzen durch ein Fremdatom ist eine Dotierung.',
      3: 'Löcher entstehen bei der p-Dotierung.'
    },
    'e5-sensor': {
      1: 'Ein Kabel leitet nur Strom. Ein Sensor erfasst etwas aus der Umwelt.',
      2: 'Ein Bildschirm gibt etwas aus. Ein Sensor nimmt etwas auf.',
      3: 'Eine Batterie liefert Energie.'
    },
    'e5-mess': {
      1: 'Sensoren messen das Wetter, sie machen es nicht.',
      2: 'Sensoren erzeugen keine Blitze.',
      3: 'Sensoren messen, sie färben nichts.'
    },
    'e5-passiv': {
      1: 'Umgekehrt: Bei mehr Licht wird der Widerstand kleiner.',
      2: 'Ein Fotowiderstand ist passiv. Er erzeugt keinen Strom.',
      3: 'Er reagiert gerade auf Licht.'
    },
    'e5-aktiv': {
      1: 'Eine Solarzelle braucht keine Batterie. Sie liefert selbst Strom.',
      2: 'Sie hat Anschlüsse, über die der Strom fliesst.',
      3: 'Eine Solarzelle nimmt Licht auf, sie leuchtet nicht.'
    },
    'e5-kt4': {
      1: 'Das wäre ein aktiver Sensor wie die Solarzelle.',
      2: 'Bei Licht leitet er besser, nicht schlechter.',
      3: 'Er reagiert gerade auf Licht.'
    },
    'e5-phone': {
      1: 'Ein Barometer misst den Luftdruck.',
      2: 'Das Mikrofon nimmt den Schall auf.',
      3: 'Der GPS-Empfänger bestimmt den Ort.'
    },
    'e5-bew': {
      1: 'Ein Taschenrechner braucht keinen Bewegungssensor.',
      2: 'Brotmesser haben keine Elektronik.',
      3: 'Kerzen haben keine Elektronik.'
    },
    'e6-poti': {
      1: 'Einen festen Wert hat ein Festwiderstand.',
      2: 'Licht misst ein Fotowiderstand.',
      3: 'Eine Batterie liefert Energie, ein Poti verändert den Widerstand.'
    },
    'e6-klein': {
      1: 'Mit zu kleinem Widerstand fliesst zu viel Strom. Die LED leuchtet kurz stark und geht kaputt.',
      2: 'Die Farbe hängt vom Material ab.',
      3: 'Es fliesst zu viel Strom, und die LED geht kaputt.'
    },
    'e6-kt4': {
      1: 'Es fliesst zu viel Strom, nicht zu wenig.',
      2: 'Eine Batterie wird so nicht geladen.',
      3: 'Die zu grosse Stromstärke zerstört die LED.'
    },
    'e6-trans': {
      1: 'Licht gibt die LED ab, nicht der Transistor.',
      2: 'Ein Transistor speichert nichts.',
      3: 'Die Energie kommt weiterhin aus der Batterie.'
    },
    'e6-plan': {
      1: 'Ein Schaltplan zeigt die Verbindungen, nicht das Aussehen.',
      2: 'Rechnen musst du selbst, zum Beispiel mit R = U : I.',
      3: 'Schaltpläne sind Werkzeuge zum Bauen und Prüfen von Schaltungen.'
    }
  },

  aufgaben: [
    { id: 'e1-led-v2', wieVorlage: 'e1-led', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Elektronik arbeitet ähnlich wie der Mensch. Ordne zu.',
      paare: [['Sensor', 'Sinnesorgan'], ['Mikroprozessor', 'Gehirn'], ['Motor oder LED', 'Muskel (Reaktion)']],
      erklaerung: 'Elektronische Schaltungen nehmen Informationen auf, verarbeiten sie und lösen eine Reaktion aus.' },

    { id: 'e2-fest-v2', wieVorlage: 'e2-fest', typ: 'luecke', schwierigkeit: 2,
      text: 'Das Formelzeichen des Widerstands ist ___, die Einheit ist ___.',
      luecken: [['R'], ['Ohm', 'Ω']],
      erklaerung: 'Der Wert eines Festwiderstands ist als Farbcode aufgedruckt.' },

    { id: 'e2-gross-v2', wieVorlage: 'e2-gross', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Was passiert mit der LED?',
      paare: [['Vorwiderstand viel zu klein', 'geht kaputt'], ['Vorwiderstand passend', 'leuchtet normal'], ['Vorwiderstand viel zu gross', 'leuchtet schwach oder gar nicht']],
      erklaerung: 'Der Vorwiderstand bestimmt die Stromstärke. Eine rote LED verträgt höchstens etwa 20 mA.' },

    { id: 'e3-licht-v2', wieVorlage: 'e3-licht', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Wie verändert sich die Leitfähigkeit eines Halbleiters?',
      paare: [['wärmer', 'leitet besser'], ['mehr Licht', 'leitet besser'], ['sehr kalt', 'leitet fast nicht']],
      erklaerung: 'Wärme und Licht lösen Elektronen von den Atomen. Es gibt dann mehr freie Ladungsträger.' },

    { id: 'e4-diode-v2', wieVorlage: 'e4-diode', schwierigkeit: 2,
      ...mc('Du setzt die Batterien in ein Gerät mit Schutzdiode falsch herum ein. Was passiert?', 'Die Diode sperrt den Strom, das Gerät bleibt aus und wird nicht beschädigt.', [
        ['Das Gerät läuft rückwärts.', 'Die Diode lässt in der falschen Richtung keinen Strom durch.'],
        ['Das Gerät geht kaputt.', 'Genau davor schützt die Diode.'],
        ['Die Batterie wird geladen.', 'Ohne Strom wird nichts geladen.']],
        'Eine Diode lässt den Strom nur in eine Richtung durch. Darum schützt sie Geräte vor falsch eingesetzten Batterien.') },

    { id: 'e6-poti-v2', wieVorlage: 'e6-poti', schwierigkeit: 2,
      ...mc('Wo findest du ein Potenziometer?', 'Im Lautstärkeregler einer Musikanlage.', [
        ['In einer Glühbirne.', 'Eine Glühbirne hat keinen Regler.'],
        ['In einem Kabel.', 'Ein Kabel hat keinen veränderbaren Widerstand.'],
        ['In einer Batterie.', 'Eine Batterie liefert Spannung, sie regelt nichts.']],
        'Mit einem Poti lässt sich ein Widerstand durch Drehen oder Schieben verändern, zum Beispiel für die Lautstärke.') },

    { id: 'e6-poti-num-v2', wieVorlage: 'e6-poti-num', schwierigkeit: 3,
      erzeuge: () => {
        const r = zufall([1, 2, 5, 10]), p = zufall([20, 25, 50, 60, 75, 80]);
        return zahl(`Ein Poti hat den Gesamtwiderstand ${r} kΩ. Der Schleifer steht bei ${p} % der Länge. Wie gross ist der Widerstand bis zum Schleifer?`,
          r * p / 100, 'kΩ', `${p} % von ${r} kΩ = ${z(r * p / 100)} kΩ.`, 'Der Widerstand wächst gleichmässig mit der Länge.');
      } },

    { id: 'e6-strom-v2', wieVorlage: 'e6-strom', schwierigkeit: 3,
      erzeuge: () => {
        const [u, r] = zufall([[5, 150], [6, 400], [9, 350], [9, 700], [12, 500]]);
        const i = (u - 2) / r * 1000;
        return zahl(`Eine LED (2 V, Beispielwert) wird mit einem Vorwiderstand von ${r} Ω an ${u} V betrieben. Wie gross ist die Stromstärke in mA?`,
          i, 'mA', `Am Widerstand liegen ${u} V − 2 V = ${u - 2} V. I = ${u - 2} V : ${r} Ω = ${z(i)} mA.`, 'Zuerst die Spannung am Widerstand berechnen, dann I = U : R.');
      } }
  ]
};
