// Ergänzungen zum Paket «Gewässer-Ökosysteme erforschen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'g1-merkmale': {
      1: 'Lebewesen allein sind noch kein Ökosystem. Es braucht auch den Lebensraum und die Wechselwirkungen.',
      2: 'Ohne Lebewesen gibt es kein Ökosystem. Boden, Luft und Wasser sind nur der Lebensraum.',
      3: 'Auch Pflanzen, Pilze, der Lebensraum und alle Wechselwirkungen gehören dazu.'
    },
    'g1-faktoren': {
      1: 'Licht lebt nicht. Es ist ein unbelebter Faktor.',
      2: 'Tiere sind Lebewesen und damit belebte Faktoren.',
      3: 'Licht, Temperatur und Wasser sind unbelebte Faktoren. Beide Arten wirken im Ökosystem.'
    },
    'g1-rollen': {
      1: 'Aus Licht Nährstoffe herstellen, das tun die Produzenten, also Pflanzen und Algen.',
      2: 'Lebende Tiere fressen die Konsumenten. Destruenten bauen Abgestorbenes ab.',
      3: 'Ohne Destruenten würden sich tote Pflanzen und Tiere anhäufen. Sie schliessen den Stoffkreislauf.'
    },
    'g1-energie': {
      1: 'Energie wird nicht recycelt. Sie wird am Ende zu thermischer Energie, die Lebewesen nicht mehr nutzen können.',
      2: 'Umgekehrt: Stoffe bleiben im Kreislauf. Die nutzbare Energie nimmt ab und muss als Licht nachkommen.',
      3: 'Weder Stoffe noch Energie werden neu erzeugt. Stoffe kreisen, Energie kommt laufend als Sonnenlicht dazu.'
    },
    'g1-flasche': {
      1: 'Das wäre ein isoliertes System. Durch das Glas kommt aber Licht hinein.',
      2: 'Umgekehrt: Stoffe bleiben drin, nur Energie wird ausgetauscht.',
      3: 'Bei Stoff- und Energieaustausch spricht man von einem offenen System, wie bei den meisten natürlichen Ökosystemen.'
    },
    'g1-kt6': {
      1: 'Im Flaschengarten bleiben die Stoffe im Gefäss. Offen sind die meisten natürlichen Ökosysteme.',
      2: 'Ohne Energie wäre kein Leben möglich. Licht gelangt durch das Glas hinein.',
      3: 'Ein Flaschengarten wird nicht gegossen. Das Wasser kreist im geschlossenen Gefäss.'
    },
    'g2-netz': {
      1: 'Umgekehrt: Die meisten Tiere fressen mehrere Arten. Darum ist es ein Netz.',
      2: 'Nahrungsbeziehungen gibt es überall, nicht nur im Wasser.',
      3: 'Die Grösse spielt keine Rolle. Ein Netz zeigt die vielen Verbindungen zwischen den Arten.'
    },
    'g2-amphibien': {
      1: 'Die meisten Amphibien leben ausserhalb der Laichzeit an Land, zum Beispiel im Wald.',
      2: 'Zum Laichen gehen sie ans Wasser, und die Kaulquappen leben darin.',
      3: 'Im Winter ruhen viele Amphibien an Land. Ans Wasser gehen sie im Frühling zum Laichen.'
    },
    'g2-bio': {
      1: 'Biodiversität heisst Vielfalt, also viele Arten.',
      2: 'Umgekehrt: Je grösser die Vielfalt, desto stabiler ist ein Ökosystem in der Regel.',
      3: 'Die Vielfalt betrifft alle Lebewesen: Pflanzen, Pilze, Mikroorganismen und Tiere.'
    },
    'g2-exkursion': {
      1: 'Tiere bleiben am Weiher. Du untersuchst sie kurz und setzt sie wieder aus.',
      2: 'Lärm vertreibt die Tiere. Ruhe und Geduld bringen mehr Beobachtungen.',
      3: 'Niedertreten zerstört Lebensräume. Du bewegst dich vorsichtig.'
    },
    'g2-sicher': {
      1: 'Gewässer können gefährlich sein, zum Beispiel wegen Tiefe oder Strömung.',
      2: 'Allein ist es gefährlich. Eine Aufsichtsperson mit Rettungsausbildung ist nötig.',
      3: 'Ins Wasser springt man nicht. Du hältst dich an die Anweisungen der Lehrperson.'
    },
    'g2-kt5': {
      1: 'Der Platzbedarf ist nicht der Grund. Wichtig ist, dass andere Arten einen Ausfall ausgleichen können.',
      2: 'Gefressen wird auch bei hoher Vielfalt. Das gehört zum Nahrungsnetz.',
      3: 'Alle Tiere müssen fressen. Viele Arten machen das Netz stabiler.'
    },
    'g3-klar': {
      1: 'Viele Schadstoffe sind unsichtbar. Klares Wasser kann belastet sein.',
      2: 'Auch Quellwasser kann belastet sein. Seine Qualität hängt von Boden und Umgebung ab.',
      3: 'Trübung kommt oft von harmlosen Schwebstoffen. Braunes Moorwasser ist meist unbedenklich.'
    },
    'g3-naehr': {
      1: 'Gemeint sind Mineralsalze wie Nitrat und Phosphat. Zu viel davon schadet den Gewässern.',
      2: 'Giftstoffe sind keine Nährstoffe. Nährstoffe brauchen Pflanzen zum Wachsen.',
      3: 'Nährstoffe kommen in jedem Gewässer vor. Pflanzen und Algen brauchen sie.'
    },
    'g3-mikro': {
      1: 'Steine sind gross und sichtbar. Mikroverunreinigungen sind winzige Mengen gelöster Stoffe.',
      2: 'Schlamm ist sichtbar. Mikroverunreinigungen sieht man nicht.',
      3: 'Algen sind Lebewesen. Mikroverunreinigungen sind Stoffe wie Medikamente.'
    },
    'g3-truebung': {
      1: 'Öl bildet eher einen Film. Trübung kommt meist von Schwebstoffen, Bakterien oder Algen.',
      2: 'Fische trüben das Wasser kaum. Die Trübung kommt von feinen Teilchen.',
      3: 'Nach einem Regen ist ein Bach oft trüb. Trübung ist also häufig.'
    },
    'g3-krabbel': {
      1: 'Viele Larven brauchen sauberes Wasser. Ihr Vorkommen ist ein gutes Zeichen.',
      2: 'Gerade in vergiftetem Wasser fehlen diese Tiere.',
      3: 'Welche Tiere vorkommen, verrät viel über die Wasserqualität.'
    },
    'g3-wirkung': {
      1: '«Je mehr, desto mehr» zeigt ein Pluszeichen. Hier steht ein Minus.',
      2: 'Ein Pfeil im Wirkungsdiagramm zeigt immer einen Zusammenhang.',
      3: 'Das Minus sagt, dass es weniger Larven gibt, nicht keine.'
    },
    'g3-kt4': {
      1: 'Auch klares Wasser kann unsichtbare Schadstoffe enthalten.',
      2: 'Braunes Moorwasser ist meist unbedenklich.',
      3: 'Viele Larven zeigen gerade gute Wasserqualität an.'
    },
    'g4-leit': {
      1: 'Leitorganismen lenken nichts. Ihr Vorkommen zeigt die Wasserqualität an.',
      2: 'Es sind meist Tiere, zum Beispiel Insektenlarven. Sie zeigen die Qualität an, statt das Wasser zu reinigen.',
      3: 'Die Tageszeit spielt keine Rolle. Entscheidend ist, welches Wasser sie vertragen.'
    },
    'g4-kt4': {
      1: 'Beton nimmt den Lebewesen den Lebensraum. Die Selbstreinigung wird schlechter.',
      2: 'Viel Abwasser überlastet den Bach.',
      3: 'Pflanzen bieten Lebensraum für die Mikroorganismen, die das Wasser reinigen.'
    },
    'g4-gefaelle2': {
      1: 'Umgekehrt: Je steiler, desto schneller fliesst das Wasser.',
      2: 'Das Gefälle ist sogar der wichtigste Faktor für die Fliessgeschwindigkeit.',
      3: 'Die Breite spielt mit, aber das Gefälle ist entscheidend.'
    },
    'g4-pflanzen': {
      1: 'Über die Wurzeln kommen Wasser und Mineralsalze. Der Kohlenstoff stammt aus dem Kohlenstoffdioxid.',
      2: 'Licht liefert die Energie, aber keine Stoffe.',
      3: 'Pflanzen sind Produzenten. Sie fressen keine Tiere.'
    },
    'g4-selbst': {
      1: 'In einem Betonkanal fehlen Lebensräume. Er reinigt sich schlecht.',
      2: 'Viel Abwasser überlastet den Bach.',
      3: 'Die Selbstreinigung leisten Lebewesen, vor allem Mikroorganismen.'
    },
    'g4-abwasser': {
      1: 'Abwasser enthält keinen reinen Sauerstoff. Sein Abbau verbraucht Sauerstoff.',
      2: 'Nicht die Fische, sondern die Mikroorganismen verbrauchen beim Abbau viel Sauerstoff.',
      3: 'Kälteres Wasser kann sogar mehr Sauerstoff lösen. Der Grund ist der Abbau.'
    },
    'g5-faktoren': {
      1: 'Die Temperatur ist unbelebt, also ein abiotischer Faktor.',
      2: 'Leitorganismen sind Lebewesen, also biotische Faktoren.',
      3: 'Temperatur, Strömung und pH-Wert sind abiotisch.'
    },
    'g5-steine': {
      1: 'In der Mitte reisst die Strömung kleine Tiere mit. Sie verstecken sich unter Steinen.',
      2: 'An der Oberfläche leben nur wenige Arten, zum Beispiel Wasserläufer.',
      3: 'Die Leitorganismen sind Larven, die im Wasser leben.'
    },
    'g5-mehrmals': {
      1: 'Es geht um zuverlässige Werte, nicht um Spass.',
      2: 'Der Grund ist klar: Einzelne Messungen können zufällig abweichen.',
      3: 'Messgeräte gehen vom Messen nicht kaputt. Mehrere Messungen machen das Ergebnis zuverlässiger.'
    },
    'g5-ph': {
      1: 'Rechnen ist erlaubt. Hier ist das Messverfahren aber zu grob für einen Mittelwert.',
      2: 'Das Papier zeigt verschiedene Farben. Es hat nur wenige Stufen.',
      3: 'Bei Temperaturen ist ein Mittelwert sinnvoll. Beim groben pH-Papier nicht.'
    },
    'g5-kt4': {
      1: 'An der Oberfläche reisst die Strömung kleine Tiere weg.',
      2: 'Das Netz ist nur das Werkzeug. Die Tiere leben unter Steinen.',
      3: 'Leitorganismen leben im Wasser, nicht in der Wiese.'
    },
    'g6-renat': {
      1: 'Auch Menschen profitieren, zum Beispiel durch besseren Hochwasserschutz.',
      2: 'Ein naturnaher Bach fliesst eher langsamer, weil er Kurven und Hindernisse hat.',
      3: 'Es gibt Nachteile wie den Platzbedarf, aber auch viele Vorteile.'
    },
    'g6-kippt': {
      1: 'Das Kippen kommt von zu vielen Nährstoffen, nicht von zu wenigen.',
      2: 'Beim Kippen fehlt Sauerstoff, und es sterben Fische.',
      3: 'Kippen hat nichts mit Gefrieren zu tun. Es geht um Sauerstoffmangel.'
    },
    'g6-virt': {
      1: 'Virtuell heisst hier: unsichtbar im Produkt enthalten, nicht im Computer.',
      2: 'Wasser aus dem Hahn nutzt du direkt. Virtuelles Wasser steckt in Produkten.',
      3: 'Verdunsten ist ein Teil des Wasserkreislaufs. Virtuelles Wasser wurde zur Herstellung gebraucht.'
    },
    'g6-nutzen': {
      1: 'Wasser verschwindet nicht. Es bleibt im Wasserkreislauf.',
      2: 'Wasser gibt es, aber nicht überall genug sauberes.',
      3: 'Wir nutzen Wasser täglich zum Trinken, Kochen und Waschen.'
    },
    'g6-kt4': {
      1: 'Virtuell heisst hier: unsichtbar im Produkt, nicht im Computer.',
      2: 'Wasser aus dem Hahn nutzt du direkt.',
      3: 'Verdunsten ist Teil des Wasserkreislaufs. Virtuelles Wasser steckt in Produkten.'
    }
  },

  aufgaben: [
    { id: 'g1-merkmale-v2', wieVorlage: 'g1-merkmale', schwierigkeit: 2,
      ...mc('Ist ein Maisfeld ein Ökosystem?', 'Ja. Auch vom Menschen gemachte Systeme haben Lebensraum, Lebewesen und Wechselwirkungen.', [
        ['Nein, nur unberührte Natur ist ein Ökosystem.', 'Auch Städte und Äcker sind Ökosysteme, wenn auch vom Menschen geprägt.'],
        ['Nein, weil dort nur eine Pflanzenart wächst.', 'Auf einem Feld leben auch Insekten, Würmer, Pilze und Mikroorganismen.'],
        ['Ja, aber nur im Sommer.', 'Ein Ökosystem besteht das ganze Jahr, auch wenn es sich verändert.']],
        'Ein Ökosystem braucht Lebensraum, Lebewesen und Wechselwirkungen. Das trifft auch auf ein Feld zu.') },

    { id: 'g1-faktoren-v2', wieVorlage: 'g1-faktoren', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ist es ein unbelebter oder ein belebter Faktor?',
      paare: [['Wassertemperatur', 'unbelebt'], ['Wasserpflanzen', 'belebt'], ['Lichtmenge', 'unbelebt'], ['Fische', 'belebt']],
      erklaerung: 'Unbelebte (abiotische) Faktoren sind zum Beispiel Licht, Temperatur und Wasser. Belebte (biotische) Faktoren sind die Lebewesen.' },

    { id: 'g1-flasche-v2', wieVorlage: 'g1-flasche', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne das System der Beschreibung zu.',
      paare: [['offen', 'Stoff- und Energieaustausch'], ['geschlossen', 'nur Energieaustausch'], ['isoliert', 'kein Austausch']],
      erklaerung: 'Ein Flaschengarten ist geschlossen: Licht kommt hinein, Stoffe bleiben drin. Ein Weiher ist offen.' },

    { id: 'g2-netz-v2', wieVorlage: 'g2-netz', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Lebewesen im Weiher ihrer Rolle zu.',
      paare: [['Algen', 'Produzent'], ['Wasserfloh', 'Konsument'], ['Bakterien im Schlamm', 'Destruent']],
      erklaerung: 'Produzenten stellen Nährstoffe her, Konsumenten fressen andere Lebewesen, Destruenten bauen Abgestorbenes ab.' },

    { id: 'g3-klar-v2', wieVorlage: 'g3-klar', schwierigkeit: 2,
      ...mc('Ein Bach ist nach einem Gewitter braun und trüb. Was stimmt?', 'Die Trübung kommt wahrscheinlich von Schwebstoffen aus der Erosion. Ob das Wasser belastet ist, zeigt erst eine Messung.', [
        ['Das Wasser ist sicher vergiftet.', 'Trübung kommt oft von harmloser Erde. Gift erkennt man nicht am Aussehen.'],
        ['Das Wasser ist sicher sauber, weil es Regenwasser ist.', 'Regen kann auch Dünger und Schadstoffe ins Wasser spülen.'],
        ['Trübes Wasser gibt es nur bei Kläranlagen.', 'Auch Regen und Erosion trüben das Wasser.']],
        'Am Aussehen allein kann man die Wasserqualität nicht beurteilen.') },

    { id: 'g4-leit-v2', wieVorlage: 'g4-leit', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Was zeigt der Fund an?',
      paare: [['viele Steinfliegenlarven', 'sauberes, sauerstoffreiches Wasser'], ['fast nur rote Zuckmückenlarven', 'belastetes, sauerstoffarmes Wasser']],
      erklaerung: 'Steinfliegenlarven brauchen viel Sauerstoff. Rote Zuckmückenlarven kommen auch in belastetem Wasser zurecht.' },

    { id: 'g5-tempo-v2', wieVorlage: 'g5-tempo', schwierigkeit: 3,
      erzeuge: () => {
        const s = zufall([5, 10, 15, 20]), t = zufall([10, 20, 25, 40, 50]);
        return zahl(`Ein Korken treibt auf dem Bach ${s} m in ${t} s. Wie gross ist die Fliessgeschwindigkeit?`, s / t, 'm/s',
          `v = s : t = ${s} m : ${t} s = ${z(s / t)} m/s.`, 'Geschwindigkeit = Weg : Zeit');
      } },

    { id: 'g6-renat-v2', wieVorlage: 'g6-renat', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Eigenschaft dem Bach zu.',
      paare: [['gerade Betonrinne, schnelle Strömung', 'verbaut'], ['Kurven, Kies und Ufergehölz', 'renaturiert']],
      erklaerung: 'Ein renaturierter Bach bietet Lebensräume, reinigt sich besser und kann Hochwasser besser aufnehmen.' },

    { id: 'g6-kippt-v2', wieVorlage: 'g6-kippt', typ: 'reihenfolge', schwierigkeit: 3,
      text: 'Bringe die Wirkungskette beim Kippen eines Sees in die richtige Reihenfolge.',
      elemente: ['Zu viele Nährstoffe gelangen in den See.', 'Algen wachsen stark.', 'Die Algen sterben ab.', 'Der Abbau verbraucht Sauerstoff.', 'Fische sterben, der See kippt.'],
      erklaerung: 'Gegenmassnahmen setzen bei den Nährstoffen an, zum Beispiel weniger Dünger oder bessere Kläranlagen.' }
  ]
};
