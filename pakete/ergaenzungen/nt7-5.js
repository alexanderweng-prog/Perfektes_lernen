// Ergänzungen zum Paket «Energie erkunden» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'e1-spann': {
      1: 'Das gespannte Gummiband ruht. Bewegungsenergie entsteht erst beim Loslassen.',
      2: 'Ein Gummiband macht beim Spannen kaum Geräusche. Die Energie steckt in der Spannung.',
      3: 'Strahlungsenergie ist Licht oder Wärmestrahlung, nicht die Spannung im Gummi.'
    },
    'e1-bewegung': {
      1: 'Lageenergie hängt von der Höhe ab. Der Ball rollt auf dem Boden.',
      2: 'Spannenergie hat ein gespannter Körper, zum Beispiel eine Feder.',
      3: 'Chemische Energie steckt in Stoffen wie Nahrung oder Benzin, nicht in der Bewegung.'
    },
    'e1-nahrung': {
      1: 'Nahrung macht keinen Schall. Die Energie steckt in den Stoffen.',
      2: 'Ein ruhendes Brot hat keine Bewegungsenergie.',
      3: 'Strahlungsenergie ist Licht. In Nahrung ist sie chemisch gespeichert.'
    },
    'e1-stausee': {
      1: 'Umgekehrt: Je höher das Wasser, desto mehr Lageenergie.',
      2: 'Gleich viel Wasser, aber verschiedene Höhe: Der höhere See hat mehr Lageenergie.',
      3: 'Hoch gelegenes Wasser hat Lageenergie. Das nutzen Wasserkraftwerke.'
    },
    'e1-eigenschaft': {
      1: 'Energie ist kein Stoff. Man trägt nur Energieträger, zum Beispiel eine Batterie.',
      2: 'Energie ist keine Flüssigkeit, sondern eine Eigenschaft.',
      3: 'Wir essen Energieträger wie Brot. Die Energie selbst ist kein Stoff.'
    },
    'e1-sprache': {
      1: 'Energie wird nicht verbraucht, sondern umgewandelt. «Verbraucht» klingt, als wäre sie danach weg.',
      2: 'Energie kann nicht kaputtgehen. Sie bleibt erhalten.',
      3: 'Aufessen kann man Energieträger, nicht die Energie selbst.'
    },
    'e2-achterbahn': {
      1: 'Beim Hinunterrollen verliert der Wagen Höhe, also nimmt die Lageenergie ab.',
      2: 'Die Gesamtenergie kann nicht zunehmen. Was die eine Form gewinnt, verliert die andere.',
      3: 'Energie verschwindet nie. Sie wird umgewandelt.'
    },
    'e2-solar': {
      1: 'Das ist umgekehrt, so arbeitet eine Lampe.',
      2: 'Eine Solarzelle hebt nichts hoch. Sie macht aus Licht Strom.',
      3: 'Eine Solarzelle nutzt Licht, keine chemische Energie, und macht keinen Schall.'
    },
    'e2-generator': {
      1: 'Die Reihenfolge stimmt nicht. Der Generator braucht zuerst Bewegungsenergie.',
      2: 'Eine Batterie liefert elektrische, keine Lageenergie.',
      3: 'Ein Generator liefert elektrische Energie, keine chemische.'
    },
    'e2-pfeil': {
      1: 'Die Dicke zeigt die Energiemenge. Teilt sich die Energie auf, werden die Pfeile dünner.',
      2: 'Ein einzelner Pfeil am Ende kann dünner sein. Alle zusammen sind so dick wie der Anfangspfeil.',
      3: 'Die Dicke ist wichtig: Sie zeigt, wie viel Energie in welche Form geht.'
    },
    'e2-taschenlampe': {
      1: 'In einer Taschenlampe fällt nichts herunter, und sie soll leuchten, nicht tönen.',
      2: 'Am Anfang steht die chemische Energie der Batterie, nicht Strahlung.',
      3: 'Eine Batterie speichert chemische Energie, keine Spannenergie.'
    },
    'e3-thermisch': {
      1: 'Energie wird nie vernichtet. Ein Teil wird nur zu thermischer Energie.',
      2: 'Bei einer Umwandlung ändert sich gerade die Form.',
      3: 'Es kann nie mehr Energie werden. Energie wird nicht erzeugt.'
    },
    'e3-verlust': {
      1: 'Die Energie ist nicht neu, sie war vorher in einer anderen Form da.',
      2: 'Es kommt keine Energie dazu. Ein Teil wird nur in eine schlecht nutzbare Form umgewandelt.',
      3: 'Den Begriff gibt es so nicht. Gemeint ist Verlustenergie.'
    },
    'e3-warm': {
      1: 'Energie entsteht nie aus dem Nichts. Die Wärme kommt aus der elektrischen Energie.',
      2: 'Wärme ist kein Stoff. Es ist Energie, die umgewandelt wurde.',
      3: 'Auch im Dunkeln wird ein Laptop warm. Der Grund ist die elektrische Energie.'
    },
    'e3-lampen': {
      1: 'Wärme ist bei einer Lampe unerwünscht. Mehr Wärme heisst weniger Licht pro Energie.',
      2: 'Die Glühlampe wandelt viel mehr Energie in Wärme um. Das ist nicht gleich gut.',
      3: 'Auch eine LED-Lampe braucht elektrische Energie, aber weniger für dasselbe Licht.'
    },
    'e3-ball': {
      1: 'Energie verschwindet nicht. Sie wird zu thermischer Energie.',
      2: 'Der Boden wird nicht höher. Er wird nur minimal wärmer.',
      3: 'Dann würde der Ball höher springen, nicht weniger hoch.'
    },
    'e4-joule': {
      1: 'Watt ist die Einheit der Leistung, also Energie pro Zeit.',
      2: 'm/s ist die Einheit der Geschwindigkeit.',
      3: 'Newton ist die Einheit der Kraft.'
    },
    'e4-traeger': {
      1: 'Energie ist kein Stoff, den man essen kann.',
      2: 'Wasser liefert keine nutzbare Nahrungsenergie.',
      3: 'Wir nehmen Energieträger auf. Der Körper wandelt ihre chemische Energie um.'
    },
    'e4-speicher': {
      1: 'Wasser ist kein Brennstoff. Seine Energie kommt von der Höhe.',
      2: 'Ein ruhender See macht keinen Schall.',
      3: 'Spannenergie hat eine gespannte Feder, nicht Wasser.'
    },
    'e5-begriff': {
      1: '«Wärmeenergie» ist eine Vereinfachung. In der Sek sagen wir thermische Energie.',
      2: 'Kälte ist keine eigene Energieform. Kalt heisst: wenig thermische Energie.',
      3: 'Wärme ist kein Stoff. Den Begriff «Hitzestoff» gibt es in der Physik nicht.'
    },
    'e5-leitung': {
      1: 'Strömung gibt es in Flüssigkeiten und Gasen. Im festen Löffel ist es Leitung.',
      2: 'Strahlung braucht keinen Kontakt. Hier wird die Energie durch den Löffel weitergegeben.',
      3: 'Der Griff wird nicht von selbst heiss. Die Energie kommt aus der Suppe.'
    },
    'e5-stroemung': {
      1: 'Leitung passiert in Feststoffen. Hier bewegt sich die Luft selbst.',
      2: 'Strahlung braucht keine Luftbewegung. Hier steigt die warme Luft auf.',
      3: 'Schall transportiert keine thermische Energie im Raum.'
    },
    'e5-strahlung': {
      1: 'Leitung braucht einen Stoff. Zwischen Sonne und Erde ist fast leerer Raum.',
      2: 'Strömung braucht ein Gas oder eine Flüssigkeit, die sich bewegt.',
      3: 'Schall kann sich im leeren Raum nicht ausbreiten.'
    },
    'e5-thermos': {
      1: 'Schwarze Flächen nehmen Strahlung besonders gut auf und geben sie ab. Das wäre schlecht.',
      2: 'Löcher würden die Wärme hinauslassen.',
      3: 'Salz hilft nicht gegen Wärmestrahlung.'
    },
    'e5-isolation': {
      1: 'Eine Isolation erzeugt keine Energie. Sie bremst nur den Transport.',
      2: 'Eine Jacke macht nicht warm, sie hält die Körperwärme zurück.',
      3: 'Kälte lässt sich nicht verwandeln. Die Isolation bremst nur den Transport von warm nach kalt.'
    },
    'e6-erhaltung': {
      1: 'Die Energie wird nicht weniger, sie wird nur schlechter nutzbar.',
      2: 'Energie entsteht nie. Sie wird nur umgewandelt.',
      3: 'Auch nach dem Ausschalten ist die Energie da, als thermische Energie im Raum.'
    },
    'e6-batterie': {
      1: 'Energie verschwindet nie. Sie wurde in andere Formen umgewandelt.',
      2: 'Energie kann nicht vernichtet werden.',
      3: 'Die Energie ist im Raum verteilt, meist als thermische Energie. Sie ist nicht weg, aber kaum nutzbar.'
    },
    'e6-schieben': {
      1: 'Das ist vertauscht: Drehen ändert die Form, Schieben den Ort.',
      2: 'Transport und Umwandlung sind verschieden.',
      3: 'Im Modell wird nie ein Würfel vernichtet oder erzeugt.'
    },
    'e6-modell': {
      1: 'Die Würfel sind nur ein Modell. Energie besteht nicht aus Würfeln.',
      2: 'Energiewürfel sind eine Denkhilfe, man kann sie nicht kaufen.',
      3: 'Das Modell gilt für alle Energieumwandlungen.'
    }
  },

  aufgaben: [
    { id: 'e1-stausee-v2', wieVorlage: 'e1-stausee', schwierigkeit: 2,
      ...mc('Du trägst einen Rucksack in den 3. Stock, deine Kollegin denselben Rucksack in den 5. Stock. Welcher Rucksack hat oben mehr Lageenergie?', 'Der im 5. Stock.', [
        ['Der im 3. Stock.', 'Je höher, desto mehr Lageenergie. Der 5. Stock ist höher.'],
        ['Beide gleich viel.', 'Gleiche Masse, aber verschiedene Höhe ergibt verschiedene Lageenergie.'],
        ['Keiner, ein ruhender Rucksack hat keine Energie.', 'Er bewegt sich nicht, hat aber wegen seiner Höhe Lageenergie.']],
        'Lageenergie wächst mit der Höhe (und der Masse).') },

    { id: 'e1-eigenschaft-v2', wieVorlage: 'e1-eigenschaft', schwierigkeit: 2,
      ...mc('Woran erkennst du, dass Energie im Spiel ist?', 'Daran, dass sich etwas verändert: etwas bewegt sich, wird warm, leuchtet oder tönt.', [
        ['Daran, dass man sie in einer Flasche sieht.', 'Energie ist kein Stoff, man kann sie nicht abfüllen.'],
        ['Nur daran, dass Strom fliesst.', 'Auch ohne Strom spielt Energie eine Rolle, zum Beispiel beim Fallen oder Heizen.'],
        ['Daran, dass etwas schwer ist.', 'Die Masse allein zeigt keine Veränderung.']],
        'Immer wenn sich etwas verändert, spielt Energie eine Rolle.') },

    { id: 'e1-sprache-v2', wieVorlage: 'e1-sprache', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jeder Alltagsaussage die fachlich passende Formulierung zu.',
      paare: [['Der Akku ist leer.', 'Die chemische Energie wurde umgewandelt.'], ['Die Heizung verbraucht Energie.', 'Die Heizung wandelt Energie in thermische Energie um.'],
        ['Die Energie ist weg.', 'Die Energie ist in der Umgebung verteilt.']],
      erklaerung: 'Energie wird nicht verbraucht und verschwindet nicht. Sie wird umgewandelt und verteilt sich.' },

    { id: 'e2-achterbahn-v2', wieVorlage: 'e2-achterbahn', schwierigkeit: 2,
      ...mc('Ein Kind schaukelt. Wo hat es am meisten Bewegungsenergie?', 'Am tiefsten Punkt.', [
        ['Am höchsten Punkt.', 'Oben steht die Schaukel kurz still. Dort ist die Lageenergie am grössten.'],
        ['Überall gleich viel.', 'Die Geschwindigkeit ändert sich, also auch die Bewegungsenergie.'],
        ['Nur beim Anschubsen.', 'Auch ohne Anschubsen wird Lageenergie unten zu Bewegungsenergie.']],
        'Unten ist die Schaukel am schnellsten: Die Lageenergie wurde zu Bewegungsenergie.') },
    { id: 'e2-achterbahn-v3', wieVorlage: 'e2-achterbahn', typ: 'luecke', schwierigkeit: 2,
      text: 'Ein Wagen rollt die Achterbahn hinunter. Dabei wird ___energie in ___energie umgewandelt.',
      luecken: [['Lage'], ['Bewegungs']],
      erklaerung: 'Beim Hinunterrollen nimmt die Lageenergie ab und die Bewegungsenergie zu.' },

    { id: 'e2-taschenlampe-v2', wieVorlage: 'e2-taschenlampe', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe die Energieumwandlungskette eines Wasserkraftwerks in die richtige Reihenfolge.',
      elemente: ['Lageenergie des Wassers', 'Bewegungsenergie des Wassers', 'Generator', 'elektrische Energie'],
      erklaerung: 'Das Wasser fliesst hinunter, dreht die Turbine und damit den Generator. Daraus wird elektrische Energie.' },
    { id: 'e2-taschenlampe-v3', wieVorlage: 'e2-taschenlampe', schwierigkeit: 2,
      ...mc('Welche Kette gehört zu einem Velodynamo, der eine Lampe speist?', 'Bewegungsenergie, elektrische Energie, Strahlungsenergie.', [
        ['Chemische Energie, elektrische Energie, Strahlungsenergie.', 'Ein Dynamo hat keine Batterie. Die Energie kommt von deinen Beinen über das Rad.'],
        ['Strahlungsenergie, elektrische Energie, Bewegungsenergie.', 'Das ist umgekehrt.'],
        ['Lageenergie, Schallenergie, Strahlungsenergie.', 'Der Dynamo nutzt die Drehung des Rads, nicht die Höhe.']],
        'Das Rad dreht den Dynamo (Bewegungsenergie), der macht elektrische Energie, die Lampe Licht.') },

    { id: 'e2-wuerfel-v2', wieVorlage: 'e2-wuerfel', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const gesamt = zufall([12, 16, 20]), therm = zufall([2, 3, 4]);
        return zahl(`Eine Murmel startet oben mit ${gesamt} Würfeln Lageenergie. Unten sind ${therm} Würfel zu thermischer Energie geworden. Wie viele Würfel Bewegungsenergie hat sie unten?`,
          gesamt - therm, 'Würfel', `${gesamt} − ${therm} = ${gesamt - therm} Würfel`, 'Die Zahl der Würfel bleibt gleich (Energieerhaltung).');
      } },

    { id: 'e3-lampen-v2', wieVorlage: 'e3-lampen', schwierigkeit: 2,
      ...mc('Welche Lampe ist am sparsamsten, wenn alle gleich hell leuchten?', 'Die Lampe, die am wenigsten warm wird.', [
        ['Die Lampe, die am wärmsten wird.', 'Wärme ist bei einer Lampe Verlust. Mehr Wärme heisst mehr Energie für dasselbe Licht.'],
        ['Die schwerste Lampe.', 'Das Gewicht sagt nichts über den Energiebedarf.'],
        ['Alle sind gleich sparsam.', 'Gleich hell heisst nicht gleicher Energiebedarf. Es kommt auf die Verluste an.']],
        'Je weniger thermische Energie entsteht, desto mehr der elektrischen Energie wird zu Licht.') },

    { id: 'e3-ball-v2', wieVorlage: 'e3-ball', schwierigkeit: 2,
      ...mc('Du reibst deine Hände kräftig aneinander. Was passiert mit der Bewegungsenergie?', 'Sie wird zu thermischer Energie: Die Hände werden warm.', [
        ['Sie verschwindet.', 'Energie verschwindet nie, sie wird umgewandelt.'],
        ['Sie wird zu Lageenergie.', 'Die Hände werden nicht höher. Sie werden warm.'],
        ['Sie wird zu chemischer Energie in der Haut.', 'Durch Reiben entstehen keine neuen Stoffe, nur Wärme.']],
        'Durch Reibung wird Bewegungsenergie zu thermischer Energie.') },

    { id: 'e3-licht-v2', wieVorlage: 'e3-licht', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const zu = zufall([10, 20]), licht = zufall([2, 3, 4]);
        return zahl(`Einer Glühlampe werden ${zu} Energiewürfel zugeführt. Nur ${licht} werden zu Licht. Wie viele Würfel werden zu thermischer Energie?`, zu - licht, 'Würfel',
          `${zu} − ${licht} = ${zu - licht} Würfel`, 'Zugeführte Würfel minus Licht-Würfel.');
      } },

    { id: 'e4-portion-v2', wieVorlage: 'e4-portion', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const pro100 = zufall([200, 350, 1500, 2200]), g = zufall([30, 50, 250]);
        return zahl(`Pro 100 g enthält ein Lebensmittel ${pro100} kJ. Du isst ${g} g. Wie viel Energie ist das?`, pro100 * g / 100, 'kJ',
          `${pro100} kJ : 100 · ${g} = ${pro100 * g / 100} kJ`, 'Zuerst pro 1 g ausrechnen, dann mal die Menge.');
      } },

    { id: 'e5-begriff-v2', wieVorlage: 'e5-begriff', schwierigkeit: 3,
      ...mc('Was ist der Unterschied zwischen thermischer Energie und Wärme?', 'Thermische Energie hat ein Körper. Wärme ist der Transport dieser Energie von warm nach kalt.', [
        ['Es gibt keinen Unterschied.', 'Fachlich schon: Energie ist eine Eigenschaft, Wärme ein Transport.'],
        ['Wärme ist ein Stoff, thermische Energie nicht.', 'Beides ist kein Stoff.'],
        ['Thermische Energie gibt es nur bei heissen Körpern.', 'Auch kalte Körper haben thermische Energie, nur weniger.']],
        'Ein Körper hat thermische Energie. Wärme nennt man den Übergang dieser Energie von einem wärmeren zu einem kälteren Körper.') },

    { id: 'e5-isolation-v2', wieVorlage: 'e5-isolation', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Die Thermosflasche bremst alle drei Transportwege. Ordne zu.',
      paare: [['Wärmeleitung', 'luftleerer Raum zwischen den Wänden'], ['Wärmeströmung', 'dicht schliessender Deckel'], ['Wärmestrahlung', 'verspiegelte Wände']],
      erklaerung: 'Ohne Luft gibt es keine Leitung, der Deckel verhindert Strömung, Spiegel werfen Strahlung zurück.' }
  ]
};
