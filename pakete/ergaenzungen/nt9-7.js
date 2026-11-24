// Ergänzungen zum Paket «Land-Ökosysteme erforschen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'l1-ohne': {
      1: 'Ohne Bewirtschaftung wachsen die meisten Wiesen wieder zu Wald zu.',
      2: 'Die Schweiz hat genug Niederschlag für Wald. Eine Wüste entstünde nicht.',
      3: 'Die meisten Wiesen hat der Mensch geschaffen. Ohne ihn gäbe es viel weniger.'
    },
    'l1-zeiger': {
      1: '«Zeigen» heisst hier: Sie zeigen Eigenschaften des Bodens an, nicht Wege.',
      2: 'Zeigerpflanzen gibt es auch auf Wiesen, zum Beispiel den Wiesenkerbel.',
      3: 'Zeigerpflanzen haben Wurzeln wie andere Pflanzen.'
    },
    'l1-kerbel': {
      1: 'Saurer Boden wird zum Beispiel von der Heidelbeere angezeigt.',
      2: 'Auf versiegeltem Boden wächst gar nichts.',
      3: 'Der Kerbel braucht Wasser und Nährstoffe.'
    },
    'l1-heidel': {
      1: 'Die Heidelbeere meidet basischen Boden.',
      2: 'Auf versiegeltem Boden wächst nichts.',
      3: 'Nährstoffreichen Boden zeigt der Wiesenkerbel an.'
    },
    'l1-rand': {
      1: 'Es geht nicht nur um Schönheit, sondern um Lebensraum und Schutz.',
      2: 'Ein gestufter Waldrand hat mehr Arten, nicht weniger.',
      3: 'Gerade Sträucher machen den gestuften Waldrand aus.'
    },
    'l1-wald': {
      1: 'Der Wald hat viele Funktionen, zum Beispiel Schutz vor Lawinen.',
      2: 'Der Wald dämpft Lärm eher.',
      3: 'Der Wald speichert Wasser und vermindert Hochwasser.'
    },
    'l1-kt4': {
      1: 'Sauren Boden zeigt die Heidelbeere an.',
      2: 'Der Kerbel zeigt Nährstoffe an, nicht Trockenheit.',
      3: 'Auf versiegeltem Boden wächst nichts.'
    },
    'l2-teile': {
      1: 'Dazu kommen Luft und etwas Humus.',
      2: 'Humus ist nur ein kleiner Teil. Den grössten Teil bilden Gesteinsbruchstücke.',
      3: 'Neben Steinen enthält Boden Wasser, Luft und Humus.'
    },
    'l2-kt4': {
      1: 'Verdichtung bringt keinen zusätzlichen Humus.',
      2: 'Verdichtung drückt die Luft aus den Hohlräumen.',
      3: 'Verdichtete Böden sind weniger fruchtbar.'
    },
    'l2-funk': {
      1: 'Der Boden hat viele Funktionen, zum Beispiel für Nahrung und Wasser.',
      2: 'Der Boden speichert und reinigt Wasser und ist Lebensraum.',
      3: 'Ohne Boden gäbe es keine Landwirtschaft.'
    },
    'l2-bildung': {
      1: 'Boden bildet sich über Tausende von Jahren.',
      2: 'Dünger liefert Nährstoffe, bildet aber keinen Boden.',
      3: 'Bauarbeiten zerstören Boden eher.'
    },
    'l2-humus': {
      1: 'Chemische Dünger liefern Nährstoffe, aber keinen Humus.',
      2: 'Schwere Maschinen verdichten den Boden.',
      3: 'Versiegeln zerstört den Boden.'
    },
    'l2-verdicht': {
      1: 'Weniger Hohlräume heisst weniger Wasser.',
      2: 'In verdichtetem Boden haben Regenwürmer weniger Platz.',
      3: 'Verdichtung hat Folgen, zum Beispiel Hochwasser.'
    },
    'l3-kt5': {
      1: 'Unter pH 2 ist es viel zu sauer.',
      2: 'Über pH 11 ist es viel zu basisch.',
      3: 'pH 0 ist extrem sauer.'
    },
    'l3-bereich': {
      1: 'Unter 5 % trocknet der Boden schnell aus.',
      2: 'Über 80 % wäre der Boden ständig nass.',
      3: 'Kein Boden speichert 100 % Wasser.'
    },
    'l3-klasse': {
      1: 'Humusarm wäre unter 2 %. Hier sind es 5 %.',
      2: 'Mässig humushaltig ist 2 bis 4 %. Hier sind es 5 %.',
      3: 'Sehr humusreich wäre über 8 %.'
    },
    'l3-ph': {
      1: 'Unter pH 2 ist es viel zu sauer.',
      2: 'Über pH 12 ist es viel zu basisch.',
      3: 'pH 14 ist extrem basisch.'
    },
    'l3-daten': {
      1: 'pH 4,5 ist zu sauer, 12 % Wasser zu wenig.',
      2: 'pH 4,5 ist sauer, nicht basisch.',
      3: 'Mit den Idealbereichen kann man die Werte gut beurteilen.'
    },
    'l4-arten': {
      1: 'Siedlungen haben oft mehr Arten als intensiv genutzte Felder.',
      2: 'Ein Laub-Mischwald hat meist mehr Arten.',
      3: 'In Städten leben viele Pflanzen und Tiere.'
    },
    'l4-gruende': {
      1: 'In Siedlungen werden weniger Pestizide eingesetzt.',
      2: 'Siedlungen haben viele verschiedene Lebensräume.',
      3: 'In Siedlungen wird nicht gejagt.'
    },
    'l4-allein': {
      1: 'Eine Stadt braucht Nahrung, Wasser und Energie von aussen.',
      2: 'Städte erzeugen nicht alles selbst, zum Beispiel kaum Nahrung.',
      3: 'In Städten gibt es Lebewesen. Sie sind aber auf Zufuhr angewiesen.'
    },
    'l4-versiegel': {
      1: 'Versiegelte Flächen lassen kein Wasser versickern. Es gibt weniger Grundwasser.',
      2: 'Unter Beton können Bodenlebewesen nicht leben.',
      3: 'Versiegelung hat viele Folgen.'
    },
    'l4-grund': {
      1: 'Niemand will Böden zerstören. Sie werden für Bauten gebraucht.',
      2: 'Die Bevölkerung wächst.',
      3: 'Pflanzen brauchen Boden, nicht Beton.'
    },
    'l4-kt5': {
      1: 'Eine Stadt hat viele Bewohner.',
      2: 'Auch in der Stadt gibt es Boden.',
      3: 'Auch grosse Städte brauchen andere Ökosysteme.'
    },
    'l5-div': {
      1: 'Es zählen auch Pflanzen, Ökosysteme und Erbanlagen.',
      2: 'Es zählen auch Tiere, Ökosysteme und Erbanlagen.',
      3: 'Die Grösse eines Waldes ist nur ein Teil.'
    },
    'l5-leben': {
      1: 'Hecken und Moore sind wertvolle Lebensräume.',
      2: 'Magerwiesen sind artenreich.',
      3: 'Mehr Wildnis schafft Lebensraum.'
    },
    'l5-fremd': {
      1: 'Manche fremde Arten verdrängen heimische.',
      2: 'Viele fremde Arten breiten sich stark aus.',
      3: 'Fremde Arten wirken auf das Ökosystem, nicht auf die Sonne.'
    },
    'l5-nachhalt': {
      1: 'So viel wie möglich zu nutzen, führt zu Übernutzung.',
      2: 'Nachhaltig heisst nutzen, aber nur so viel, wie nachwächst.',
      3: 'Der Preis sagt nichts über Nachhaltigkeit.'
    },
    'l5-insel': {
      1: 'Gemeint sind nicht Inseln im Meer, sondern zerschnittene Lebensräume.',
      2: 'Verinselung führt zu weniger Arten.',
      3: 'Verinselung ist eine Gefahr für Arten, kein Schutz.'
    },
    'l5-kt5': {
      1: 'Fremde Arten sind eingeschleppte Pflanzen und Tiere.',
      2: 'Die Klimastörung betrifft das Klima.',
      3: 'Übernutzung betrifft Fische, nicht Strassen.'
    },
    'l6-reuss': {
      1: 'Der Fluss wurde nicht zugeschüttet, sondern das Ufer naturnah gestaltet.',
      2: 'Es wurde kein Kraftwerk gebaut.',
      3: 'Der See blieb bestehen.'
    },
    'l6-gewinner': {
      1: 'Die Kosten sind nicht der Grund.',
      2: 'Viele Gruppen profitieren.',
      3: 'Auch die Natur profitiert.'
    },
    'l6-perma': {
      1: 'Permakultur verzichtet möglichst auf Kunstdünger.',
      2: 'Permakultur ist eine Form der Landwirtschaft.',
      3: 'Permakultur ist eine Landwirtschaft, kein Verein.'
    },
    'l6-milpa': {
      1: 'Die drei Pflanzen helfen einander.',
      2: 'Sie wachsen gerade zusammen.',
      3: 'Der Kürbis schützt den Boden.'
    },
    'l6-kt4': {
      1: 'Es sind drei Pflanzen.',
      2: 'Milpa braucht wenig Pestizide.',
      3: 'Die Pflanzen wachsen im Boden.'
    },
    'l6-vernetz': {
      1: '«Von der Natur lernen» heisst, natürliche Systeme nachzuahmen.',
      2: '«Kreisläufe ermöglichen» heisst, Stoffe wiederzuverwenden.',
      3: '«Vielfalt ermöglichen» heisst, viele Arten zu fördern.'
    },
    'l6-persp': {
      1: 'Lust ist kein guter Grund. Es braucht Argumente.',
      2: 'Verschiedene Standpunkte helfen bei der Entscheidung.',
      3: 'Auch Natur und Lebensqualität zählen.'
    }
  },

  aufgaben: [
    { id: 'l1-ohne-v2', wieVorlage: 'l1-ohne', schwierigkeit: 2,
      ...mc('Ein Bauer hört auf, eine Wiese im Mittelland zu mähen. Was geschieht über Jahrzehnte?', 'Zuerst wachsen Sträucher, dann wird die Fläche wieder zu Wald.', [
        ['Die Wiese bleibt für immer eine Wiese.', 'Ohne Mähen wachsen Sträucher und Bäume ein.'],
        ['Sie wird zur Wüste.', 'Im Mittelland regnet es genug für Wald.'],
        ['Sie wird zum See.', 'Ohne Wasserzufluss entsteht kein See.']],
        'Die meisten Wiesen gibt es nur, weil sie gemäht oder beweidet werden.') },

    { id: 'l1-zeiger-v2', wieVorlage: 'l1-zeiger', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Was zeigt die Pflanze an?',
      paare: [['Wiesenkerbel', 'viele Nährstoffe'], ['Heidelbeere', 'saurer Boden']],
      erklaerung: 'Zeigerpflanzen verraten Eigenschaften des Standorts wie Nährstoffe oder pH-Wert.' },

    { id: 'l2-teile-v2', wieVorlage: 'l2-teile', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Wie gross ist der Anteil im Boden ungefähr?',
      paare: [['Gesteinsbruchstücke', 'knapp die Hälfte'], ['Wasser', 'etwa ein Viertel'], ['Luft', 'etwa ein Viertel'], ['Humus', 'kleiner Rest']],
      erklaerung: 'Humus ist nur ein kleiner Teil, aber für die Fruchtbarkeit sehr wichtig.' },

    { id: 'l3-bereich-v2', wieVorlage: 'l3-bereich', schwierigkeit: 3,
      erzeuge: () => {
        const v = zufall([200, 400, 500]), w = zufall([20, 40, 60, 100, 150]);
        const p = w / v * 100;
        return zahl(`${v} mL Boden speichern ${w} mL Wasser. Wie gross ist die Wasserspeicherfähigkeit in Prozent?`, p, '%',
          `${w} : ${v} = ${z(w / v)} = ${z(p)} %. ${p >= 15 && p <= 40 ? 'Das liegt im guten Bereich für Pflanzen.' : 'Das liegt ausserhalb des guten Bereichs von 15 bis 40 %.'}`, 'Wasser durch Boden teilen und mal 100 nehmen.');
      } },

    { id: 'l3-humus-v2', wieVorlage: 'l3-humus', schwierigkeit: 3,
      erzeuge: () => {
        const m = zufall([20, 25, 50, 100]), h = zufall([1, 2, 3, 4]);
        return zahl(`Eine Bodenprobe von ${m} g enthält ${h} g Humus. Wie gross ist der Humusgehalt in Prozent?`, h / m * 100, '%',
          `${h} g : ${m} g = ${z(h / m)} = ${z(h / m * 100)} %.`, 'Humus durch Gesamtmasse teilen, mal 100.');
      } },

    { id: 'l4-allein-v2', wieVorlage: 'l4-allein', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Was fliesst in die Stadt hinein, was hinaus?',
      paare: [['Nahrung', 'Zufuhr'], ['Abwasser', 'Abfuhr'], ['Energie', 'Zufuhr'], ['Abfälle', 'Abfuhr']],
      erklaerung: 'Die Stoff- und Energieflüsse einer Stadt reichen weit in andere Ökosysteme hinaus.' },

    { id: 'l5-div-v2', wieVorlage: 'l5-div', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Zu welcher Ebene der Biodiversität gehört das Beispiel?',
      paare: [['Wald, Moor und Magerwiese', 'Vielfalt der Ökosysteme'], ['Fuchs, Dachs und Igel', 'Vielfalt der Arten'], ['verschiedene Apfelsorten', 'Vielfalt der Erbanlagen']],
      erklaerung: 'Biodiversität umfasst Ökosysteme, Arten und die Erbanlagen innerhalb der Arten.' },

    { id: 'l5-nachhalt-v2', wieVorlage: 'l5-nachhalt', schwierigkeit: 3,
      ...mc('In einem Wald wachsen pro Jahr 500 m³ Holz nach. Welche Nutzung ist nachhaltig?', 'Höchstens 500 m³ pro Jahr ernten.', [
        ['1000 m³ pro Jahr ernten.', 'Dann wird mehr genommen, als nachwächst. Der Wald schrumpft.'],
        ['Alles auf einmal ernten.', 'Dann ist der Wald weg und wächst lange nicht nach.'],
        ['Gar nichts ernten.', 'Nachhaltig heisst nutzen, aber nur so viel, wie nachwächst.']],
        'Nachhaltig nutzt man so viel, wie natürlich wieder nachwächst.') },

    { id: 'l5-insel-v2', wieVorlage: 'l5-insel', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Welcher Grund für den Artenrückgang ist es?',
      paare: [['Eine Autobahn zerschneidet einen Wald.', 'Verinselung'], ['Ausgesetzte Schildkröten fressen heimische Tiere.', 'fremde Arten'], ['Eine Hecke weicht einem Acker.', 'Zerstörung von Lebensräumen'], ['Es wird mehr gefischt, als nachwächst.', 'Übernutzung']],
      erklaerung: 'Mehrere Ursachen wirken zusammen. Viele davon lassen sich durch unser Verhalten beeinflussen.' },

    { id: 'l6-perma-v2', wieVorlage: 'l6-perma', schwierigkeit: 2,
      ...mc('Was passt zur Permakultur?', 'Mist und Kompost statt Kunstdünger.', [
        ['Grosse Felder mit nur einer Pflanzenart.', 'Permakultur setzt auf Vielfalt.'],
        ['Möglichst viele Pestizide.', 'Permakultur verzichtet möglichst auf Pestizide.'],
        ['Schwere Maschinen auf allen Flächen.', 'Schwere Maschinen verdichten den Boden. Permakultur meidet sie.']],
        'Permakultur ahmt die Kreisläufe der Natur nach.') }
  ]
};
