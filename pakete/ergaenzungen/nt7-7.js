// Ergänzungen zum Paket «Chemische Reaktionen untersuchen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'c1-ei': {
      1: 'Geschmolzene Schokolade wird beim Abkühlen wieder fest. Es entsteht kein neuer Stoff.',
      2: 'Eis ist immer noch Wasser. Nur der Aggregatzustand ändert sich.',
      3: 'Flüssiges Wachs ist immer noch Wachs. Das ist eine physikalische Änderung.'
    },
    'c1-merkmal': {
      1: 'Eine Temperaturänderung allein zeigt noch keine Reaktion. Entscheidend sind neue Stoffe.',
      2: 'Ein Stoff, der nur seine Form ändert, bleibt derselbe Stoff.',
      3: 'Beim Lösen bleibt der Stoff erhalten. Dampft das Wasser ab, ist er wieder da.'
    },
    'c1-feuer': {
      1: 'Feuer ist kein Stoff. Die Produkte sind Kohlenstoffdioxid und Wasser.',
      2: 'Aus dem Docht kommt Wachsdampf. Das Leuchten selbst ist kein Stoff.',
      3: 'Die Ausgangsstoffe sind Wachs und Sauerstoff. Feuer zeigt die Energieumwandlung.'
    },
    'c1-schema': {
      1: 'Das ist rückwärts. Links stehen Wachs und Sauerstoff, rechts die Produkte.',
      2: 'Beim Brennen entstehen neue Stoffe. Das Wachs verschwindet.',
      3: 'Feuer ist kein Stoff und kann nicht in einem Reaktionsschema stehen.'
    },
    'c1-holz': {
      1: 'Ohne Sauerstoff brennt Holz nicht. Darum erstickt ein Feuer ohne Luft.',
      2: 'Stickstoff ist zwar in der Luft, reagiert beim Brennen aber kaum.',
      3: 'Sauerstoff allein brennt nicht. Es braucht einen Brennstoff, hier Holz.'
    },
    'c1-kalk': {
      1: 'Es entstehen neue Stoffe, zum Beispiel ein Gas, das sprudelt. Das ist mehr als Lösen.',
      2: 'Kalk schmilzt bei Raumtemperatur nicht.',
      3: 'Beim Entkalken gefriert nichts.'
    },
    'c2-erhalt': {
      1: 'Im abgeschlossenen System bleibt die Masse gleich. Leichter scheint es nur, wenn Gas entweicht.',
      2: 'Schwerer scheint es nur, wenn ein Stoff aus der Luft dazukommt, zum Beispiel Sauerstoff.',
      3: 'Atome gehen bei Reaktionen nicht verloren, sie ordnen sich nur neu an.'
    },
    'c2-eisen': {
      1: 'Masse entsteht nie aus dem Nichts. Sie kommt vom Sauerstoff aus der Luft.',
      2: 'Beim Verbrennen nimmt Eisen Sauerstoff auf, nicht Wasser.',
      3: 'Die Waage misst richtig. Der Sauerstoff aus der Luft wiegt im Produkt mit.'
    },
    'c2-holz': {
      1: 'Masse verschwindet nicht. Sie entweicht als Gase in die Luft.',
      2: 'Die Gase gehen in die Luft, nicht in den Boden.',
      3: 'Energie hat keine Masse, die man mit der Waage messen könnte. Die fehlende Masse steckt in den Gasen.'
    },
    'c2-eigenschaften': {
      1: 'Farbe und Geruch können Hinweise sein, Preis und Gewicht beschreiben aber keine Reaktion.',
      2: 'Name, Alter, Ort und Zeit beschreiben keine chemische Reaktion.',
      3: 'Hitze und Licht können auftreten, sind aber keine der vier Eigenschaften.'
    },
    'c3-aktiv': {
      1: 'Das Streichholz brennt nicht von selbst. Es braucht einen Anstoss.',
      2: 'Rosten startet von selbst, es braucht keinen Anstoss.',
      3: 'Streichhölzer reagieren, sobald sie angerieben werden.'
    },
    'c3-wachs': {
      1: 'Beim Verbrennen entstehen neue Stoffe. Das ist eine chemische Reaktion.',
      2: 'Kohlenstoffdioxid ist ein neuer Stoff, also eine chemische Reaktion.',
      3: 'Licht und Wärme stammen aus der chemischen Reaktion des Wachsdampfs.'
    },
    'c3-kupfer': {
      1: 'Kupfer schmilzt erst bei über 1000 °C. Der dunkle Belag ist ein neuer Stoff.',
      2: 'Kupfer reagiert mit dem Sauerstoff der Luft, nicht mit Wasser.',
      3: 'Der Belag lässt sich nicht abwischen wie Schmutz. Es ist ein neuer Stoff: Kupferoxid.'
    },
    'c3-kschema': {
      1: 'Das ist rückwärts, und Wasser ist hier gar nicht beteiligt.',
      2: 'Aus Kupfer kann nie Gold werden. Atome eines Elements bleiben erhalten.',
      3: 'Kupfer ist ein Ausgangsstoff, kein Produkt.'
    },
    'c4-atmung': {
      1: 'Auch Pflanzen atmen, Tag und Nacht. Fotosynthese gibt es nur bei Licht.',
      2: 'Aus dem Boden nehmen Pflanzen Wasser und Mineralstoffe auf. Die Nährstoffe stellen sie selbst her.',
      3: 'Pflanzen brauchen Licht für die Fotosynthese und Luft für Kohlenstoffdioxid und Atmung.'
    },
    'c4-schema': {
      1: 'Das ist die Zellatmung, also umgekehrt.',
      2: 'Wasser allein reicht nicht. Es braucht auch Kohlenstoffdioxid, und es entsteht Traubenzucker.',
      3: 'Sauerstoff ist ein Produkt der Fotosynthese, kein Ausgangsstoff.'
    },
    'c4-energie': {
      1: 'Das ist umgekehrt. Die Pflanze speichert Lichtenergie.',
      2: 'Bei der Fotosynthese wird nichts angehoben. Licht wird chemisch gespeichert.',
      3: 'Schall und Strom spielen bei der Fotosynthese keine Rolle.'
    },
    'c4-blasen': {
      1: 'Die Bläschen sind Sauerstoff. Den bildet die Pflanze selbst. Mineralwasser liefert Kohlenstoffdioxid.',
      2: 'Abgekochtes Wasser ist ausgekühlt. Das Kochen hat aber das Kohlenstoffdioxid ausgetrieben.',
      3: 'Wasserpest braucht kein Salz. Entscheidend ist das Kohlenstoffdioxid.'
    },
    'c5-element': {
      1: 'Das ist die Lehre der alten Griechen, nicht der heutige Begriff in der Chemie.',
      2: 'Ein Gemisch besteht aus mehreren Stoffen. Ein Element ist ein Reinstoff.',
      3: 'Elemente können fest, flüssig oder gasförmig sein, zum Beispiel Eisen oder Quecksilber.'
    },
    'c5-verb': {
      1: 'Ein Stoff aus gleichen Atomen ist ein Element.',
      2: 'Eine Verbindung ist ein Reinstoff, kein Gemisch.',
      3: 'Verbindungen gibt es aus allen Elementen, zum Beispiel Wasser ganz ohne Metall.'
    },
    'c5-ordnen': {
      1: 'Wasser besteht aus Wasserstoff und Sauerstoff. Das ist eine Verbindung.',
      2: 'Kochsalz besteht aus Natrium und Chlor. Das ist eine Verbindung.',
      3: 'Kohlenstoffdioxid besteht aus Kohlenstoff und Sauerstoff. Das ist eine Verbindung.'
    },
    'c5-dalton': {
      1: 'Bei Dalton sind Atome nicht teilbar, und Atome verschiedener Elemente sind verschieden.',
      2: 'Es gibt viele verschiedene Elemente.',
      3: 'Atome bleiben erhalten. Bei Reaktionen ordnen sie sich nur neu an.'
    },
    'c6-ordnung': {
      1: 'Viele Elemente haben ähnliche Farben. Die Farbe ist kein Ordnungsprinzip.',
      2: 'Die Namen sind in jeder Sprache anders. Geordnet wird nach Masse und Eigenschaften.',
      3: 'Das Entdeckungsjahr sagt nichts über die Eigenschaften.'
    },
    'c6-gallium': {
      1: 'Er kannte nicht alle Elemente. Gerade darum liess er Lücken frei.',
      2: 'Er ordnete nach Masse und Eigenschaften, nicht nach Farbe.',
      3: 'Atome wurden schon vor ihm beschrieben, zum Beispiel von Dalton.'
    },
    'c6-gruppen': {
      1: 'Das ist vertauscht: Spalten sind Gruppen, Zeilen sind Perioden.',
      2: 'Spalten und Zeilen haben verschiedene Namen.',
      3: 'Spalten und Zeilen haben verschiedene Namen.'
    },
    'c6-stoffe': {
      1: 'Ein Metall besteht nur aus Metallatomen. Kochsalz enthält auch das Nichtmetall Chlor.',
      2: 'Molekulare Stoffe bestehen nur aus Nichtmetallen. Natrium ist ein Metall.',
      3: 'Edelgase sind Elemente wie Helium. Kochsalz ist eine Verbindung.'
    }
  },

  aufgaben: [
    { id: 'c1-holz-v2', wieVorlage: 'c1-holz', typ: 'luecke', schwierigkeit: 2,
      text: 'Reaktionsschema: Holz + ___ → Kohlenstoffdioxid + ___',
      luecken: [['Sauerstoff'], ['Wasser', 'Wasserdampf']],
      erklaerung: 'Holz reagiert mit Sauerstoff. Es entstehen vor allem Kohlenstoffdioxid und Wasser (und Asche).' },
    { id: 'c1-holz-v3', wieVorlage: 'c1-holz', schwierigkeit: 2,
      ...mc('Warum erlischt eine Kerze, wenn du ein Glas darüberstülpst?', 'Der Sauerstoff im Glas wird aufgebraucht.', [
        ['Das Glas kühlt die Flamme ab.', 'Das Glas wird eher warm. Es fehlt der Sauerstoff.'],
        ['Das Wachs geht aus.', 'Es ist noch genug Wachs da. Es fehlt der zweite Ausgangsstoff.'],
        ['Das Glas drückt die Flamme aus.', 'Das Glas berührt die Flamme nicht.']],
        'Zum Brennen braucht es Sauerstoff. Ist er im Glas aufgebraucht, hört die Reaktion auf.') },

    { id: 'c1-kalk-v2', wieVorlage: 'c1-kalk', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Chemische Reaktion oder nicht? Ordne zu.',
      paare: [['Brot toasten', 'chemische Reaktion'], ['Zucker in Tee auflösen', 'keine chemische Reaktion'],
        ['Eisen rostet', 'chemische Reaktion'], ['Butter schmilzt', 'keine chemische Reaktion']],
      erklaerung: 'Bei einer chemischen Reaktion entstehen neue Stoffe (Toast, Rost). Lösen und Schmelzen ändern den Stoff nicht.' },

    { id: 'c2-erhalt-v2', wieVorlage: 'c2-erhalt', schwierigkeit: 3,
      ...mc('Brausetablette und Wasser reagieren in einer fest verschlossenen Flasche. Was zeigt die Waage danach?', 'Gleich viel wie vorher.', [
        ['Weniger, weil Gas entsteht.', 'Das Gas bleibt in der verschlossenen Flasche und wiegt mit.'],
        ['Mehr, weil Bläschen entstehen.', 'Es kommt nichts von aussen dazu.'],
        ['Null, weil sich die Tablette auflöst.', 'Die Stoffe sind noch da, nur verändert.']],
        'Im abgeschlossenen System bleibt die Gesamtmasse gleich. Ohne Deckel würde das Gas entweichen.') },

    { id: 'c2-eigenschaften-v2', wieVorlage: 'c2-eigenschaften', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne jeder Eigenschaft von Reaktionen das passende Begriffspaar zu.',
      paare: [['Aktivierung', 'spontan oder initiiert'], ['Geschwindigkeit', 'schnell oder langsam'],
        ['Energiebilanz', 'gibt Energie ab oder nimmt Energie auf'], ['Umkehrbarkeit', 'einfach oder retour']],
      erklaerung: 'Mit diesen vier Eigenschaften lässt sich jede chemische Reaktion beschreiben.' },

    { id: 'c3-aktiv-v2', wieVorlage: 'c3-aktiv', schwierigkeit: 2,
      ...mc('Ein Gasherd brennt erst, wenn du einen Funken machst. Wozu dient der Funke?', 'Er liefert die Aktivierungsenergie, damit die Reaktion startet.', [
        ['Er ist der Brennstoff.', 'Der Brennstoff ist das Gas. Der Funke startet nur.'],
        ['Er liefert den Sauerstoff.', 'Sauerstoff kommt aus der Luft.'],
        ['Er hat keine Aufgabe.', 'Ohne Funke startet die Reaktion nicht: Sie ist initiiert.']],
        'Initiierte Reaktionen brauchen einen Anstoss, die Aktivierungsenergie. Danach laufen sie von selbst weiter.') },

    { id: 'c3-abgeben-v2', wieVorlage: 'c3-abgeben', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const prod = zufall([2, 3, 4]), ab = zufall([5, 6, 8]);
        return zahl(`Eine Reaktion gibt ${ab} Energiewürfel an die Umgebung ab. Die Produkte haben danach ${prod} Würfel chemische Energie. Wie viele Würfel hatten die Ausgangsstoffe?`,
          prod + ab, 'Würfel', `${prod} + ${ab} = ${prod + ab} Würfel`, 'Energie geht nicht verloren: Produkte plus abgegebene Energie.');
      } },

    { id: 'c3-aufnehmen-v2', wieVorlage: 'c3-aufnehmen', schwierigkeit: 3,
      ...mc('Ein Kühlpack wird beim Drücken kalt. Was sagt das über die Reaktion?', 'Sie nimmt thermische Energie aus der Umgebung auf.', [
        ['Sie erzeugt Kälte.', 'Kälte ist keine Energieform. Die Reaktion entzieht der Umgebung Energie.'],
        ['Sie gibt Energie ab.', 'Dann würde das Pack warm, wie ein Wärmekissen.'],
        ['Es findet keine Reaktion statt.', 'Doch, es entstehen neue Stoffe, und dafür wird Energie aufgenommen.']],
        'Reaktionen, die Energie aufnehmen, kühlen ihre Umgebung ab.') },

    { id: 'c4-atmung-v2', wieVorlage: 'c4-atmung', schwierigkeit: 3,
      ...mc('Eine Pflanze steht die ganze Nacht im Dunkeln. Was läuft in ihr ab?', 'Nur die Atmung.', [
        ['Nur die Fotosynthese.', 'Die Fotosynthese braucht Licht. Im Dunkeln läuft sie nicht.'],
        ['Fotosynthese und Atmung.', 'Ohne Licht keine Fotosynthese.'],
        ['Gar nichts.', 'Die Pflanze lebt und atmet weiter.']],
        'Atmung läuft immer, Fotosynthese nur bei Licht.') },

    { id: 'c4-blasen-v2', wieVorlage: 'c4-blasen', schwierigkeit: 3,
      ...mc('Du stellst die Wasserpest näher an die Lampe. Was erwartest du?', 'Mehr Bläschen, weil mehr Licht die Fotosynthese verstärkt.', [
        ['Weniger Bläschen, weil es wärmer wird.', 'Mehr Licht bedeutet mehr Fotosynthese und damit mehr Sauerstoff.'],
        ['Gleich viele Bläschen.', 'Die Lichtmenge beeinflusst die Fotosynthese.'],
        ['Die Bläschen werden zu Kohlenstoffdioxid.', 'Die Bläschen sind Sauerstoff, ein Produkt der Fotosynthese.']],
        'Licht liefert die Energie für die Fotosynthese. Mehr Licht, mehr Sauerstoffbläschen.') },

    { id: 'c5-ordnen-v2', wieVorlage: 'c5-ordnen', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Element oder Verbindung? Ordne zu.',
      paare: [['Eisen', 'Element'], ['Wasser', 'Verbindung'], ['Helium', 'Element'], ['Kochsalz', 'Verbindung']],
      erklaerung: 'Elemente bestehen aus einer Atomsorte (Eisen, Helium). Verbindungen aus mehreren (Wasser, Kochsalz).' },

    { id: 'c5-dalton-v2', wieVorlage: 'c5-dalton', schwierigkeit: 3,
      ...mc('Wie erklärt Daltons Modell, dass die Masse bei einer Reaktion gleich bleibt?', 'Die Atome bleiben erhalten und werden nur neu angeordnet.', [
        ['Neue Atome entstehen genau so viele, wie verschwinden.', 'Bei Dalton verschwinden keine Atome und es entstehen keine neuen.'],
        ['Die Atome werden bei der Reaktion leichter.', 'Atome eines Elements haben immer dieselbe Masse.'],
        ['Dalton konnte das nicht erklären.', 'Doch: Gerade die Erhaltung der Atome erklärt die Massenerhaltung.']],
        'Atome gehen nicht verloren. Darum ist die Masse der Produkte gleich der Masse der Ausgangsstoffe.') },

    { id: 'c6-gruppen-v2', wieVorlage: 'c6-gruppen', schwierigkeit: 3,
      ...mc('Lithium, Natrium und Kalium stehen in derselben Spalte. Was folgt daraus?', 'Sie haben ähnliche Eigenschaften (gleiche Gruppe).', [
        ['Sie haben dieselbe Masse.', 'Innerhalb einer Gruppe nimmt die Masse nach unten zu.'],
        ['Sie wurden im selben Jahr entdeckt.', 'Die Spalten haben nichts mit dem Entdeckungsjahr zu tun.'],
        ['Sie gehören zur selben Periode.', 'Eine Periode ist eine Zeile, nicht eine Spalte.']],
        'Elemente einer Gruppe (Spalte) verhalten sich chemisch ähnlich, zum Beispiel reagieren alle drei heftig mit Wasser.') },

    { id: 'c6-stoffe-v2', wieVorlage: 'c6-stoffe', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne jedem Stoff seine Stoffgruppe zu.',
      paare: [['Kupfer', 'Metall'], ['Kochsalz', 'Salz'], ['Wasser', 'molekularer Stoff']],
      erklaerung: 'Metalle nur aus Metallatomen, Salze aus Metall und Nichtmetall, molekulare Stoffe nur aus Nichtmetallen.' }
  ]
};
