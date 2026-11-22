// Ergänzungen zum Paket «Reize und Sinne untersuchen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'r1-geschmack': {
      1: 'Es gibt mehr: auch salzig, bitter und umami.',
      2: 'Scharf ist ein Schmerzempfinden, heiss eine Temperatur. Beides sind keine Geschmacksrichtungen.',
      3: 'Salzig ist nur eine von fünf Geschmacksrichtungen.'
    },
    'r1-aroma': {
      1: 'Sie unterscheiden sich: Das Aroma braucht den Geruchssinn, der Geschmack nur den Mund.',
      2: 'Die Augen beeinflussen die Erwartung, das Aroma entsteht aber mit der Nase.',
      3: 'Geschmack entsteht im Mund. Die Nase liefert den Geruch für das Aroma.'
    },
    'r1-zunge': {
      1: 'Die Zungenkarte ist widerlegt. Alle Geschmacksrichtungen werden überall auf der Zunge wahrgenommen.',
      2: 'Auch für Salz gilt: Es gibt keine eigene Zone dafür.',
      3: 'Auch bei Kindern gibt es keine Zungenkarte.'
    },
    'r1-scharf': {
      1: 'Scharf ist keine Geschmacksrichtung. Es wird über Schmerz- und Wärmesinneszellen wahrgenommen.',
      2: 'Chili riecht zwar, die Schärfe spürst du aber als Schmerz im Mund.',
      3: 'Scharf hat nichts mit Hören zu tun.'
    },
    'r1-nase': {
      1: 'Die Zunge funktioniert weiter: Süss und sauer schmeckst du noch.',
      2: 'Die Temperatur des Getränks ändert sich nicht durch das Zuhalten der Nase.',
      3: 'Die Augen helfen beim Erkennen, das Aroma kommt aber vom Geruchssinn.'
    },
    'r1-sinne': {
      1: 'Mit den Augen allein siehst du kein Auto hinter einer Hausecke. Das Gehör hilft mit.',
      2: 'Hören ist wichtig: Oft hörst du ein Fahrzeug, bevor du es siehst.',
      3: 'Es geht nicht ums Tempo, sondern darum, alle Sinne zu nutzen.'
    },
    'r2-schema': {
      1: 'Das ist umgekehrt. Zuerst kommt der Reiz, die Reaktion kommt am Schluss.',
      2: 'Das Gehirn verarbeitet erst, was das Sinnesorgan aufgenommen hat.',
      3: 'Der Muskel reagiert erst, nachdem Sinnesorgan, Nerven und Gehirn beteiligt waren.'
    },
    'r2-reflex': {
      1: 'Bei einem Reflex entscheidest du nicht bewusst. Er läuft automatisch ab.',
      2: 'Reflexe sind angeboren, man muss sie nicht lernen.',
      3: 'Reflexe sind schnell, weil sie nicht über das Gehirn laufen.'
    },
    'r2-schnell': {
      1: 'Die Stärke des Reizes ist nicht entscheidend. Der kürzere Nervenweg macht den Reflex schnell.',
      2: 'Beim Reflex ist das Gehirn gar nicht beteiligt.',
      3: 'Im Rückenmark liegen Nervenzellen, keine Muskeln.'
    },
    'r2-herdplatte': {
      1: 'Du hast die Hand weggezogen, bevor du nachdenken konntest. Das ist nicht bewusst.',
      2: 'Diese Schutzreaktion ist angeboren, nicht gelernt.',
      3: 'Der Reiz ist die Hitze der Herdplatte.'
    },
    'r2-bewusst': {
      1: 'Der Lidschlag bei Staub ist ein Reflex, du entscheidest ihn nicht.',
      2: 'Die Pupille reagiert automatisch auf Licht, das steuerst du nicht willentlich.',
      3: 'Den Herzschlag steuerst du nicht bewusst.'
    },
    'r3-richtung': {
      1: 'Beide Ohren hören. Entscheidend ist der Unterschied zwischen den Ohren.',
      2: 'Das Gehirn rät nicht, es vergleicht Zeit und Lautstärke an beiden Ohren.',
      3: 'Auch mit geschlossenen Augen erkennst du die Richtung, dank der beiden Ohren.'
    },
    'r3-schall': {
      1: 'Schall ist kein Wind. Die Luft strömt nicht zu dir, sie schwingt nur.',
      2: 'Schall und Licht sind verschiedene Dinge. Schall braucht einen Stoff wie Luft.',
      3: 'Schall braucht einen Stoff. Im luftleeren Raum gibt es keinen Schall.'
    },
    'r3-teilchen': {
      1: 'Die Teilchen bleiben ungefähr an ihrem Ort. Nur die Schwingung wandert weiter.',
      2: 'Kein Teilchen fliegt von der Quelle bis zu dir. Die Schwingung wird weitergegeben.',
      3: 'Licht hat damit nichts zu tun. Die Luftteilchen geben die Schwingung weiter.'
    },
    'r3-kerze': {
      1: 'Ein Lautsprecher bläst keinen Wind. Die Luft schwingt hin und her.',
      2: 'Eine Flamme kann nicht hören. Sie wird von der schwingenden Luft bewegt.',
      3: 'Die Wärme bewegt die Flamme nicht im Takt der Musik.'
    },
    'r4-weg': {
      1: 'Die Hörschnecke liegt ganz innen. Der Schall kommt zuerst bei der Ohrmuschel an.',
      2: 'Vor dem Trommelfell liegen Ohrmuschel und Gehörgang.',
      3: 'Die Ohrmuschel kommt zuerst, nicht der Gehörgang.'
    },
    'r4-schnecke': {
      1: 'Verschiedene Tonhöhen reizen verschiedene Stellen der Hörschnecke.',
      2: 'Das Trommelfell schwingt nur mit. Die Tonhöhe wird in der Hörschnecke unterschieden.',
      3: 'Der Gehörgang leitet den Schall nur weiter.'
    },
    'r4-riss': {
      1: 'Die Ohrmuschel ist unverletzt. Das Problem ist das Trommelfell.',
      2: 'Das Gehirn ist nicht betroffen, nur die Übertragung im Ohr.',
      3: 'Die Hörschnecke verändert ihre Grösse nicht.'
    },
    'r4-haerchen': {
      1: 'Betroffen sind die Sinneshärchen in der Hörschnecke, nicht das Trommelfell.',
      2: 'Die Ohrmuschel bleibt. Der Schaden liegt tief im Innenohr.',
      3: 'Die Ohren werden nicht grösser. Sinneshärchen sterben ab.'
    },
    'r4-schutz': {
      1: 'Nahe an den Lautsprechern ist es am lautesten und am gefährlichsten.',
      2: 'Die Ohren erholen sich nicht immer. Abgestorbene Sinneshärchen wachsen nicht nach.',
      3: 'Lauter heisst gefährlicher für die Hörschnecke.'
    },
    'r5-konvex': {
      1: 'Die konkave Linse lässt Strahlen auseinanderlaufen.',
      2: 'Konvexe Linsen bündeln Licht, zum Beispiel eine Lupe.',
      3: 'Auch Linsen können bündeln. Die konvexe Linse ist eine Sammellinse.'
    },
    'r5-konkav': {
      1: 'Bündeln tut die konvexe Linse.',
      2: 'Eine Linse ändert die Richtung der Lichtstrahlen.',
      3: 'Linsen erzeugen kein Licht, sie lenken es nur.'
    },
    'r5-brennweite': {
      1: 'Die Dicke beeinflusst die Brennweite, ist aber nicht dasselbe.',
      2: 'Die Brennweite ist ein Abstand, keine Breite des Lichts.',
      3: 'Die Farbe hat mit der Brennweite nichts zu tun.'
    },
    'r5-bild': {
      1: 'Die Pupille ist nur die Öffnung, durch die das Licht hineinfällt.',
      2: 'Die Iris regelt die Pupillengrösse. Das Bild entsteht weiter hinten.',
      3: 'Das Augenlid schützt das Auge. Ein Bild entsteht dort nicht.'
    },
    'r5-akkom': {
      1: 'Für die Ferne wird die Linse flacher, für die Nähe stärker gewölbt.',
      2: 'Die Linse bleibt im Auge, sie ändert nur ihre Form.',
      3: 'Die Linse passt sich an. Nur so siehst du nah und fern scharf.'
    },
    'r6-kurz': {
      1: 'Das beschreibt die Weitsichtigkeit. Bei Kurzsichtigkeit liegt das Bild vor der Netzhaut.',
      2: 'Dann wäre das Auge normalsichtig.',
      3: 'Das Bild entsteht im Auge, nur an der falschen Stelle.'
    },
    'r6-weit': {
      1: 'Das beschreibt die Kurzsichtigkeit.',
      2: 'Dann wäre das Auge normalsichtig.',
      3: 'Die Linse bricht das Licht. Das Bild entsteht dahinter.'
    },
    'r6-dunkel': {
      1: 'Die Farben sind noch da. Unser Auge kann sie bei wenig Licht nur nicht wahrnehmen.',
      2: 'Das Gehirn arbeitet weiter, nur die Zapfen für Farben sind kaum aktiv.',
      3: 'Die Augen bleiben offen. Die Stäbchen sehen weiter, aber nur Hell und Dunkel.'
    },
    'r6-fleck': {
      1: 'Der blinde Fleck liegt auf der Netzhaut, nicht auf der Hornhaut.',
      2: 'Die Linse ist durchsichtig. Der blinde Fleck liegt hinten auf der Netzhaut.',
      3: 'Es ist kein Fehler: Dort verlässt der Sehnerv das Auge.'
    },
    'r6-pupille': {
      1: 'Grösser wird die Pupille bei wenig Licht.',
      2: 'Die Pupille bleibt immer da, sie ändert nur ihre Grösse.',
      3: 'Die Pupille ändert ihre Grösse, nicht ihre Farbe.'
    },
    'r6-fisch': {
      1: 'In trübem Wasser sehen Fische schlecht. Darum hilft das Seitenlinienorgan.',
      2: 'Fische haben keine Ohren an der Oberfläche. Sie spüren Wasserbewegungen.',
      3: 'Fische bemerken Bewegungen sehr gut, mit dem Seitenlinienorgan.'
    }
  },

  aufgaben: [
    { id: 'r1-nase-v2', wieVorlage: 'r1-nase', schwierigkeit: 2,
      ...mc('Warum schmeckt Essen bei Schnupfen fade?', 'Die verstopfte Nase nimmt keine Gerüche wahr, das Aroma fehlt.', [
        ['Die Zunge ist krank.', 'Die Zunge funktioniert weiterhin. Es fehlt der Geruch.'],
        ['Das Essen hat weniger Salz.', 'Das Essen ist gleich. Deine Wahrnehmung ändert sich.'],
        ['Man hat bei Schnupfen keinen Hunger.', 'Hunger beeinflusst nicht, wie Essen schmeckt. Der Geruch schon.']],
        'Das Aroma entsteht mit dem Geruchssinn. Ist die Nase verstopft, bleiben nur süss, sauer, salzig, bitter und umami.') },

    { id: 'r1-sinne-v2', wieVorlage: 'r1-sinne', typ: 'zuordnen', schwierigkeit: 1,
      text: 'Ordne jedem Sinnesorgan seinen Sinn zu.',
      paare: [['Auge', 'Sehen'], ['Ohr', 'Hören'], ['Nase', 'Riechen'], ['Zunge', 'Schmecken'], ['Haut', 'Tasten']],
      erklaerung: 'Jedes Sinnesorgan nimmt bestimmte Reize auf. Zusammen ergeben sie ein Bild der Umwelt.' },

    { id: 'r2-herdplatte-v2', wieVorlage: 'r2-herdplatte', schwierigkeit: 2,
      ...mc('Du trittst barfuss auf einen spitzen Stein und ziehst den Fuss sofort zurück. Welcher Weg nimmt die Information?', 'Sinneszellen in der Haut → Nerv → Rückenmark → Nerv → Beinmuskel.', [
        ['Haut → Gehirn → Entscheidung → Beinmuskel.', 'Beim Reflex wird im Rückenmark umgeschaltet, das Gehirn entscheidet nicht.'],
        ['Fuss → Herz → Beinmuskel.', 'Das Herz leitet keine Nervensignale.'],
        ['Der Muskel reagiert ohne Nerven.', 'Ohne Nerven bekommt der Muskel keinen Befehl.']],
        'Ein Schutzreflex läuft über das Rückenmark. Das ist kürzer und damit schneller als der Weg über das Gehirn.') },

    { id: 'r2-bewusst-v2', wieVorlage: 'r2-bewusst', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Bewusste Reaktion oder Reflex? Ordne zu.',
      paare: [['Du hebst die Hand, um dich zu melden', 'bewusste Reaktion'], ['Du blinzelst bei einem Windstoss', 'Reflex'],
        ['Du fängst einen zugeworfenen Ball', 'bewusste Reaktion'], ['Du hustest, weil du dich verschluckt hast', 'Reflex']],
      erklaerung: 'Bewusste Reaktionen entscheidest du über das Gehirn. Reflexe laufen automatisch ab und schützen den Körper.' },

    { id: 'r3-richtung-v2', wieVorlage: 'r3-richtung', schwierigkeit: 2,
      ...mc('Du hältst dir ein Ohr zu. Was passiert mit dem Richtungshören?', 'Es wird schlechter, weil das Gehirn die beiden Ohren nicht mehr vergleichen kann.', [
        ['Es wird besser, weil weniger Lärm stört.', 'Für die Richtung braucht das Gehirn beide Ohren zum Vergleich.'],
        ['Es bleibt gleich gut.', 'Mit einem Ohr fehlt der Unterschied zwischen links und rechts.'],
        ['Man hört gar nichts mehr.', 'Mit einem Ohr hörst du weiter, nur die Richtung wird unsicher.']],
        'Die Richtung erkennt das Gehirn am Zeit- und Lautstärkeunterschied zwischen beiden Ohren.') },

    { id: 'r3-schall-v2', wieVorlage: 'r3-schall', schwierigkeit: 3,
      ...mc('Warum hört man im Weltall keinen Schall?', 'Dort gibt es keine Luft, deren Teilchen die Schwingung weitergeben könnten.', [
        ['Weil es dort zu kalt ist.', 'Kälte verhindert Schall nicht. Es fehlt ein Stoff, der schwingt.'],
        ['Weil es dort zu dunkel ist.', 'Schall hat nichts mit Licht zu tun.'],
        ['Weil Raumanzüge alles abdichten.', 'Auch ohne Raumanzug gäbe es keinen Schall: Es fehlt die Luft.']],
        'Schall braucht einen Stoff wie Luft, Wasser oder Holz. Im luftleeren Raum kann er sich nicht ausbreiten.') },
    { id: 'r3-schall-v3', wieVorlage: 'r3-schall', typ: 'luecke', schwierigkeit: 2,
      text: 'Schall entsteht, wenn ein Körper ___. Die Luftteilchen geben die ___ weiter, bleiben aber an ihrem Ort.',
      luecken: [['schwingt', 'vibriert'], ['Schwingung', 'Schwingungen']],
      erklaerung: 'Eine Schallquelle schwingt. Die Luftteilchen geben die Schwingung weiter, ohne selbst mitzuwandern.' },

    { id: 'r4-woche-v2', wieVorlage: 'r4-woche', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const proTag = zufall([30, 45, 60, 90]), tage = zufall([4, 5, 6, 7]);
        return zahl(`Du hörst an ${tage} Tagen je ${proTag} Minuten laute Musik. Wie viele Stunden sind das?`, proTag * tage / 60, 'h',
          `${proTag} min · ${tage} = ${proTag * tage} min = ${z(proTag * tage / 60)} h`, 'Erst die Minuten zusammenzählen, dann durch 60 teilen.', { toleranzRel: 0.02 });
      } },

    { id: 'r5-reihe-v2', wieVorlage: 'r5-reihe', schwierigkeit: 2,
      ...mc('Drei konvexe Linsen haben die Brennweiten 5 cm, 15 cm und 25 cm. Welche bündelt das Licht am stärksten?', 'Die Linse mit 5 cm.', [
        ['Die Linse mit 25 cm.', 'Je länger die Brennweite, desto schwächer bündelt die Linse.'],
        ['Die Linse mit 15 cm.', 'Am stärksten bündelt die Linse mit der kürzesten Brennweite.'],
        ['Alle gleich stark.', 'Verschiedene Brennweiten bedeuten verschieden starke Linsen.']],
        'Kurze Brennweite = stark gewölbte Linse = starke Bündelung.') },
    { id: 'r5-reihe-v3', wieVorlage: 'r5-reihe', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const a = zufall([8, 12, 16]), b = a + zufall([4, 10, 14]);
        return zahl(`Eine Lupe hat eine Brennweite von ${a} cm, eine zweite von ${b} cm. Wie gross ist der Unterschied in cm?`, b - a, 'cm',
          `${b} cm − ${a} cm = ${b - a} cm`, 'Grössere minus kleinere Brennweite.');
      } },

    { id: 'r6-fisch-v2', wieVorlage: 'r6-fisch', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Tier seinen besonderen Sinn zu.',
      paare: [['Fledermaus', 'Echoortung mit Ultraschall'], ['Fisch', 'Seitenlinienorgan'], ['Hund', 'sehr guter Geruchssinn'], ['Biene', 'sieht UV-Licht']],
      erklaerung: 'Viele Tiere nehmen Reize wahr, die wir nicht bemerken: Ultraschall, Wasserbewegungen, schwache Gerüche oder UV-Licht.' }
  ]
};
