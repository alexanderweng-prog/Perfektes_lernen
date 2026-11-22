// Ergänzungen zum Paket «Stromkreise untersuchen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'k1-geschlossen': {
      1: 'In einem offenen Stromkreis fliesst kein Strom. Die Lampe bleibt dunkel.',
      2: 'Ein Kabel reicht nicht. Der Strom braucht einen Hin- und einen Rückweg.',
      3: 'Die Temperatur der Lampe ist nicht entscheidend. Der Kreis muss geschlossen sein.'
    },
    'k1-kabel': {
      1: 'Luft leitet praktisch keinen Strom. Der Rückweg verläuft im Kabel.',
      2: 'In einem offenen Kreis fliesst kein Strom, die Lampe würde nicht leuchten.',
      3: 'Im Kabel liegen mehrere isolierte Kupferleiter.'
    },
    'k1-schalter': {
      1: 'Ein Schalter erzeugt keinen Strom, und eine Sicherung speichert keinen.',
      2: 'Schalter und Sicherung verstärken nichts. Sie öffnen oder schliessen den Kreis.',
      3: 'Beide sind wichtig: zum Bedienen und zum Schutz vor Überlastung.'
    },
    'k1-verbrauch': {
      1: 'Hinter der Lampe fliesst gleich viel Strom wie davor. Man kann das mit einem Messgerät zeigen.',
      2: 'Die Batterie wird leer, weil ihre chemische Energie umgewandelt wird, nicht weil Strom verbraucht wird.',
      3: 'Die Aussage ist fachlich falsch: Strom und Energie werden verwechselt.'
    },
    'k1-fehler': {
      1: 'Ein eingestecktes Gerät zu öffnen ist lebensgefährlich.',
      2: 'Am Kabel kratzen kann einen Stromschlag auslösen und das Kabel beschädigen.',
      3: 'Wiederholtes Einschalten löst das Problem nicht und kann gefährlich sein.'
    },
    'k1-stecker': {
      1: 'Ein ungeprüfter Stecker kann einen Kurzschluss oder Stromschlag verursachen.',
      2: 'Offene Drähte sind gefährlich, sie können sich berühren oder berührt werden.',
      3: 'Bei 230 V muss jeder Anschluss geprüft werden.'
    },
    'k2-raus': {
      1: 'In der Serieschaltung gibt es nur einen Weg. Fehlt eine Lampe, ist der Kreis offen.',
      2: 'In der Serieschaltung geht die andere Lampe aus.',
      3: 'In der Parallelschaltung leuchtet die andere weiter, weil sie ihren eigenen Weg hat.'
    },
    'k2-par-u': {
      1: 'In der Parallelschaltung bekommt jede Lampe die volle Spannung der Batterie.',
      2: 'Die Spannung kann nicht grösser werden als die der Batterie.',
      3: 'Die Lampe ist weiterhin direkt an der Batterie angeschlossen.'
    },
    'k2-leiste': {
      1: 'Gerade weil sie parallel geschaltet sind, laufen die Geräte unabhängig.',
      2: 'Bei Parallelschaltung teilt sich die Spannung nicht auf, jedes Gerät bekommt 230 V.',
      3: 'Das ist Absicht: Jedes Gerät braucht die volle Netzspannung.'
    },
    'k2-hell': {
      1: 'In Serie teilen sich die Lampen die Spannung. Sie leuchten schwächer, nicht heller.',
      2: 'Die zweite Lampe erhöht den Widerstand, die Stromstärke sinkt.',
      3: 'Die Masse der Batterie ändert sich nicht.'
    },
    'k3-einheiten': {
      1: 'Volt ist die Einheit der Spannung, Ampère die der Stromstärke.',
      2: 'Ohm gehört zum Widerstand, Volt zur Spannung.',
      3: 'Joule ist die Einheit der Energie.'
    },
    'k3-sprache': {
      1: 'Spannung und Stromstärke sind verschiedene Grössen. «Stromspannung» vermischt sie.',
      2: 'Strom wird nicht verbraucht, er fliesst im Kreis weiter.',
      3: 'Energie ist eine eigene Grösse. Spannung und Stromstärke sind etwas anderes.'
    },
    'k3-ohm': {
      1: 'R = U : I definiert nur den Widerstand. Ohmsches Gesetz heisst: R bleibt konstant.',
      2: 'Es gilt für Bauteile wie einen Konstantandraht, nicht nur für Batterien.',
      3: 'Es gilt auch bei Gleichstrom.'
    },
    'k4-knoten': {
      1: 'Die Spannung am Knoten ist nicht null. Die Regel betrifft die Stromstärken.',
      2: 'Am Knoten geht kein Strom verloren.',
      3: 'Der Strom teilt sich auf, er verdoppelt sich nicht.'
    },
    'k4-leiste': {
      1: 'Jedes zusätzliche Gerät braucht seinen eigenen Strom. Die Summe wird grösser.',
      2: 'Die Ströme der einzelnen Geräte addieren sich in der Zuleitung.',
      3: 'Solange Geräte laufen, fliesst Strom in der Zuleitung.'
    },
    'k4-masche': {
      1: 'In einer geschlossenen Masche fliesst Strom.',
      2: 'Stromstärken und Spannungen sind verschiedene Grössen und lassen sich nicht addieren.',
      3: 'Die Widerstände können beliebig sein.'
    },
    'k4-messen': {
      1: 'Das ist vertauscht. Für die Stromstärke muss der Strom durch das Messgerät fliessen.',
      2: 'Die Spannung misst man über dem Bauteil, also parallel.',
      3: 'Die Stromstärke misst man in Serie, sonst fliesst der Strom nicht durch das Messgerät.'
    },
    'k5-vier': {
      1: 'Es gibt mehr Wirkungen: auch Licht, chemische und magnetische Wirkung.',
      2: 'Schall entsteht höchstens indirekt (Lautsprecher, über die magnetische Wirkung).',
      3: 'Strom hat deutlich sichtbare Wirkungen, zum Beispiel Licht und Wärme.'
    },
    'k5-draht': {
      1: 'Umgekehrt: Der kurze Draht hat weniger Widerstand, es fliesst mehr Strom.',
      2: 'Die Länge macht einen Unterschied.',
      3: 'Beide werden warm, aber verschieden stark.'
    },
    'k5-lampen': {
      1: 'LED-Lampen werden kaum warm. Sie wandeln viel Energie in Licht um.',
      2: 'Leuchtstofflampen werden wärmer als LED, aber viel weniger heiss als Glühlampen.',
      3: 'Die Lampen unterscheiden sich stark in der Wärme, die sie abgeben.'
    },
    'k5-galvanisieren': {
      1: 'Waschen braucht keinen Strom. Beim Galvanisieren setzt sich Metall ab.',
      2: 'Der Gegenstand bleibt fest. Es kommt eine dünne Schicht dazu.',
      3: 'Magnetisch wird er dadurch nicht. Es ist die chemische Wirkung des Stroms.'
    },
    'k5-oersted': {
      1: 'Der Draht kann aus Kupfer sein. Die Wirkung kommt vom Strom.',
      2: 'Die Nadel ist ein Magnet. Sie reagiert auf das Magnetfeld des Stroms.',
      3: 'Der Kompass funktioniert richtig. Er zeigt das Magnetfeld des Stroms.'
    },
    'k5-lautsprecher': {
      1: 'Ohne Magnete könnte sich die Membran nicht bewegen.',
      2: 'Es braucht zusätzlich die Spule als Elektromagnet.',
      3: 'Ein Lautsprecher hat zwei: die Spule und den Permanentmagneten.'
    },
    'k6-motor': {
      1: 'Das macht ein Generator.',
      2: 'Ein Motor hebt nichts an und erzeugt keinen Schall als Ziel.',
      3: 'Ein Motor nutzt elektrische, nicht chemische Energie, und dreht sich.'
    },
    'k6-fehler': {
      1: 'Das Wetter hat nichts mit dem Stromkreis im Motor zu tun.',
      2: 'Gold ist nicht nötig. Prüfe Kontakte, Batterie und Rotor.',
      3: 'Selbst gebaute Motoren haben oft kleine Fehler. Systematisch suchen hilft.'
    },
    'k6-generator': {
      1: 'Das ist ein Motor.',
      2: 'Energie entsteht nie aus dem Nichts. Der Generator wandelt Bewegungsenergie um.',
      3: 'Ein Generator speichert nichts, er wandelt um.'
    },
    'k6-gen-klein': {
      1: 'Jeder Motor kann als Generator arbeiten, nur liefern einfache Motoren wenig Spannung.',
      2: 'Wäre die Lampe zu hell, würde sie leuchten. Es fehlt Spannung.',
      3: 'Luft spielt hier keine Rolle.'
    },
    'k6-richtung': {
      1: 'Die Temperatur der Batterie ändert die Drehrichtung nicht.',
      2: 'Schütteln ändert nichts an der Stromrichtung.',
      3: 'Die Richtung lässt sich ändern, indem man den Strom umkehrt.'
    },
    'k6-geraet': {
      1: 'Eine Glühlampe hat keine beweglichen Teile. Sie nutzt die Licht- und Wärmewirkung.',
      2: 'Ein Toaster ohne Gebläse nutzt nur die Wärmewirkung.',
      3: 'Eine Taschenlampe nutzt nur die Lichtwirkung.'
    }
  },

  aufgaben: [
    { id: 'k2-raus-v2', wieVorlage: 'k2-raus', schwierigkeit: 2,
      ...mc('In einem Zimmer brennen drei Lampen. Eine geht kaputt, die anderen leuchten weiter. Wie sind sie geschaltet?', 'Parallel.', [
        ['In Serie.', 'In Serie würden alle ausgehen, weil der einzige Weg unterbrochen ist.'],
        ['Gar nicht, jede hat eine eigene Batterie.', 'Die Lampen hängen am selben Netz, nur in getrennten Zweigen.'],
        ['Das lässt sich nicht sagen.', 'Doch: Nur bei Parallelschaltung leuchten die anderen weiter.']],
        'In der Parallelschaltung hat jede Lampe ihren eigenen Stromweg.') },
    { id: 'k2-raus-v3', wieVorlage: 'k2-raus', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Eigenschaften der richtigen Schaltung zu.',
      paare: [['Nur ein Weg für den Strom', 'Serieschaltung'], ['Jede Lampe hat die volle Spannung', 'Parallelschaltung'],
        ['Fällt eine Lampe aus, gehen alle aus', 'Serieschaltung'], ['Steckdosen im Haus', 'Parallelschaltung']],
      erklaerung: 'Serie: ein Weg, Spannung wird aufgeteilt. Parallel: eigene Wege, volle Spannung für jedes Gerät.' },

    { id: 'k2-spannung-v2', wieVorlage: 'k2-spannung', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const n = zufall([3, 4, 6]), U = zufall([12, 24]);
        return zahl(`${n} gleiche Lampen sind in Serie an ${U} V angeschlossen. Welche Spannung liegt an jeder Lampe?`, U / n, 'V',
          `${U} V : ${n} = ${z(U / n)} V`, 'In Serie teilt sich die Spannung auf. Gleiche Lampen bekommen gleich viel.');
      } },

    { id: 'k2-hell-v2', wieVorlage: 'k2-hell', schwierigkeit: 3,
      ...mc('Zu einer Lampe wird eine zweite gleiche Lampe parallel geschaltet. Die Batterie bleibt gleich. Wie hell leuchtet die erste Lampe?', 'Gleich hell wie vorher.', [
        ['Schwächer, weil sich der Strom aufteilt.', 'Jede Lampe bekommt ihren eigenen Strom. Die Batterie liefert insgesamt mehr.'],
        ['Heller.', 'Die Spannung an der Lampe bleibt gleich, darum auch die Helligkeit.'],
        ['Sie geht aus.', 'Die erste Lampe bleibt direkt an der Batterie angeschlossen.']],
        'Parallel liegt an jeder Lampe die volle Batteriespannung. Die Batterie wird aber schneller leer.') },

    { id: 'k3-strom-v2', wieVorlage: 'k3-strom', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const R = zufall([10, 20, 30, 60]), U = zufall([3, 6, 12]);
        return zahl(`Eine Spannung von ${U} V liegt an einem Widerstand von ${R} Ω. Wie gross ist die Stromstärke?`, U / R, 'A',
          `I = U : R = ${U} V : ${R} Ω = ${z(U / R)} A`, 'Stelle R = U : I nach I um: I = U : R.', { toleranzRel: 0.02 });
      } },

    { id: 'k4-i3-v2', wieVorlage: 'k4-i3', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const a = zufall([0.2, 0.3, 0.4]), b = zufall([0.1, 0.25, 0.5]);
        return zahl(`Zwei Leitungen führen ${z(a)} A und ${z(b)} A zu einem Knoten. Nur eine Leitung führt weg. Wie gross ist der Strom darin?`, a + b, 'A',
          `${z(a)} A + ${z(b)} A = ${z(a + b)} A`, 'Knotenregel: Was hineinfliesst, fliesst hinaus.');
      } },

    { id: 'k4-messen-v2', wieVorlage: 'k4-messen', schwierigkeit: 3,
      ...mc('Du willst die Spannung an einer Lampe messen. Wie schliesst du das Voltmeter an?', 'Parallel zur Lampe, an ihre beiden Anschlüsse.', [
        ['In Serie, in den Stromkreis eingefügt.', 'In Serie misst man die Stromstärke, nicht die Spannung.'],
        ['Nur an einen Anschluss der Lampe.', 'Spannung ist ein Unterschied zwischen zwei Punkten. Es braucht beide Anschlüsse.'],
        ['Direkt zwischen die Pole, ohne Lampe.', 'Dann misst du die Batteriespannung, nicht die an der Lampe.']],
        'Spannung misst man immer zwischen zwei Punkten, also parallel zum Bauteil.') },

    { id: 'k5-vier-v2', wieVorlage: 'k5-vier', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Gerät die Wirkung des Stroms zu, die es vor allem nutzt.',
      paare: [['Toaster', 'Wärmewirkung'], ['LED-Lampe', 'Lichtwirkung'], ['Elektromagnet am Kran', 'magnetische Wirkung'], ['Akku laden', 'chemische Wirkung']],
      erklaerung: 'Strom kann heizen, leuchten lassen, magnetisch wirken und chemische Vorgänge antreiben.' },

    { id: 'k5-galvanisieren-v2', wieVorlage: 'k5-galvanisieren', schwierigkeit: 3,
      ...mc('Wobei nutzt man die chemische Wirkung des Stroms?', 'Beim Laden eines Handy-Akkus.', [
        ['Beim Toasten von Brot.', 'Der Toaster nutzt die Wärmewirkung.'],
        ['Bei einer Taschenlampe.', 'Die Taschenlampe nutzt die Lichtwirkung.'],
        ['Bei einem Türgong.', 'Der Gong nutzt die magnetische Wirkung.']],
        'Beim Laden treibt der Strom chemische Vorgänge im Akku an. Beim Entladen laufen sie rückwärts.') },

    { id: 'k6-richtung-v2', wieVorlage: 'k6-richtung', schwierigkeit: 2,
      ...mc('Ein Spielzeugauto soll rückwärts fahren. Was macht der Schalter dafür im Inneren?', 'Er kehrt die Stromrichtung im Motor um.', [
        ['Er schaltet einen zweiten Motor ein.', 'Ein Motor reicht. Umkehr der Stromrichtung genügt.'],
        ['Er macht die Batterie stärker.', 'Mehr Spannung macht schneller, nicht rückwärts.'],
        ['Er dreht die Räder von Hand.', 'Der Motor dreht die Räder, nur andersherum.']],
        'Mit umgekehrtem Strom wechseln die Magnetpole der Spule, und der Motor dreht in die andere Richtung.') },

    { id: 'k6-geraet-v2', wieVorlage: 'k6-geraet', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Elektromotor oder nicht? Ordne zu.',
      paare: [['Ventilator', 'mit Elektromotor'], ['Wasserkocher', 'ohne Elektromotor'], ['Bohrmaschine', 'mit Elektromotor'], ['LED-Lampe', 'ohne Elektromotor']],
      erklaerung: 'Ein Elektromotor steckt überall dort, wo sich etwas dreht: Ventilator, Bohrmaschine, Mixer.' }
  ]
};
