// Ergänzungen zum Paket «Stoffkreisläufe erkunden» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    's1-begrenzt': {
      1: 'Aus dem Weltall kommen kaum Stoffe dazu. Die Stoffe kreisen.',
      2: 'Stoffe vermehren sich nicht. Sie werden immer wieder verwendet.',
      3: 'Alle Lebewesen brauchen Stoffe, zum Beispiel Wasser und Kohlenstoff.'
    },
    's1-akteure': {
      1: 'Ohne sie gäbe es keinen Stoffkreislauf.',
      2: 'Alle drei sind nötig, damit sich der Kreislauf schliesst.',
      3: 'Destruenten zersetzen Abgestorbenes. Sie erzeugen nichts aus dem Nichts.'
    },
    's1-roh': {
      1: 'Rohstoffe stammen aus natürlichen Kreisläufen.',
      2: 'In Fabriken werden Rohstoffe verarbeitet, nicht erzeugt.',
      3: 'Auch Wasser, Gestein und Erze sind Rohstoffe.'
    },
    's1-wert': {
      1: 'Wertstoffe sind Stoffe, die man wiederverwerten kann, nicht unbedingt teure.',
      2: 'Wertstoffe sind zum Beispiel Papier, Glas oder Kunststoff.',
      3: 'Wertstoffe werden gerade wiederverwendet.'
    },
    's1-wasser': {
      1: 'Es gibt mehrere Kreisläufe, zum Beispiel auch für Gestein und Kohlenstoff.',
      2: 'In der Natur gibt es viele Kreisläufe.',
      3: 'Die Sonne ist kein Stoffkreislauf. Sie liefert Energie.'
    },
    's1-kt3': {
      1: 'Stoffe vermehren sich nicht.',
      2: 'Aus dem Weltall kommt kaum etwas dazu.',
      3: 'Alle Lebewesen brauchen Stoffe.'
    },
    's1-sack': {
      1: 'Eine Sackgasse ist kein Kreislauf, sondern ein Ende.',
      2: 'In natürlichen Kreisläufen kommen die Stoffe zurück.',
      3: 'In einer Sackgasse bleiben Stoffe liegen, sie fehlen nicht.'
    },
    's2-gleich': {
      1: 'Es passiert viel, aber Aufnahme und Abgabe gleichen sich aus.',
      2: 'Kohlenstoff verschwindet nicht. Er wechselt den Speicher.',
      3: 'Es gibt mehrere Speicher: Atmosphäre, Ozeane, Gestein, Lebewesen.'
    },
    's2-mensch': {
      1: 'Die Atmung gehört zum natürlichen Gleichgewicht.',
      2: 'Wasser ist hier nicht der Grund.',
      3: 'Der Mensch bringt zusätzlichen Kohlenstoff in die Atmosphäre.'
    },
    's2-speicher': {
      1: 'Umgekehrt: Gestein ist ein Speicher, Fotosynthese ein Fluss.',
      2: 'Fotosynthese und Atmung sind Flüsse, keine Speicher.',
      3: 'Gestein und Ozeane sind Speicher.'
    },
    's2-foto': {
      1: 'Fotosynthese nimmt Kohlenstoff auf.',
      2: 'Atmung gibt Kohlenstoff ab.',
      3: 'Landlebewesen nehmen Kohlenstoff auf und geben ihn ab.'
    },
    's2-kt4': {
      1: 'Fotosynthese gehört zum natürlichen Kreislauf.',
      2: 'Der Gasaustausch der Ozeane ist natürlich.',
      3: 'Die Atmung der Pflanzen ist natürlich.'
    },
    's3-treib': {
      1: 'Sauerstoff und Stickstoff sind keine Treibhausgase.',
      2: 'Staub ist kein Gas. Die wichtigen Treibhausgase sind CO₂, Methan und Wasserdampf.',
      3: 'Treibhausgase gibt es, und sie halten die Erde warm.'
    },
    's3-natuerlich': {
      1: 'Ohne Treibhauseffekt wäre es viel kälter, nicht heisser.',
      2: 'Ohne den natürlichen Treibhauseffekt wäre es viel kälter.',
      3: 'Es wären etwa −18 °C, nicht 0 °C.'
    },
    's3-mensch': {
      1: 'Die Wissenschaft zeigt klar menschliche Ursachen.',
      2: 'Die Konzentrationen werden seit Jahrzehnten gemessen.',
      3: 'Die Gase stammen von der Erde, vor allem aus Verbrennung.'
    },
    's3-kt5': {
      1: 'Lautstärke ist kein Beleg.',
      2: 'Eine Schlagzeile allein genügt nicht.',
      3: 'Daten sind gerade die wichtigsten Belege.'
    },
    's3-quelle': {
      1: 'Oft geteilt heisst nicht richtig.',
      2: 'Was gefällt, ist nicht unbedingt wahr.',
      3: 'Überschriften können täuschen.'
    },
    's3-falsch': {
      1: 'Natürliche Schwankungen schliessen menschliche Ursachen nicht aus.',
      2: 'Das Klima hat sich früher natürlich verändert.',
      3: 'Die Klimaänderung ist gemessen und belegt.'
    },
    's4-roh': {
      1: 'Holz ist der Rohstoff für Papier. Kunststoffe kommen meist aus Erdöl.',
      2: 'Sand ist der Rohstoff für Glas.',
      3: 'Wasser ist kein Rohstoff für Kunststoff.'
    },
    's4-recycl': {
      1: 'Die Farbe ist nicht der Grund. Es geht um die Kunststoffart.',
      2: 'Das Alter spielt keine Rolle.',
      3: 'Die Codes helfen beim Sortieren.'
    },
    's4-abbau': {
      1: 'Kunststoffe verrotten in der Natur kaum.',
      2: 'Kunststoffe zerfallen in kleine Stücke, lösen sich aber nicht auf.',
      3: 'Kunststoffe schaden Tieren, sie sind keine Nährstoffe.'
    },
    's4-co2': {
      1: 'Die Idee stellt neue Kunststoffe her, sie vernichtet keine.',
      2: 'Wasserstoff ist ein Ausgangsstoff dieser Methode.',
      3: 'Die Idee soll Erdöl ersetzen, nicht mehr davon brauchen.'
    },
    's4-verbot': {
      1: 'Ein Verbot hätte grosse Folgen, weil Kunststoffe fast überall stecken.',
      2: 'Kunststoffabfälle sind ein echtes Problem.',
      3: 'Alle können etwas beitragen, zum Beispiel durch weniger Abfall.'
    },
    's4-kt4': {
      1: 'Kunststoffe sind verschieden.',
      2: 'Kunststoffe lösen sich nicht in Wasser.',
      3: 'Kunststoffe haben Recycling-Codes.'
    },
    's5-erz': {
      1: 'Nur Gold kommt fast nur rein vor. Die meisten Metalle liegen als Verbindungen vor.',
      2: 'Metalle stecken vor allem in Gesteinen.',
      3: 'Metalle stecken vor allem in Gesteinen.'
    },
    's5-uran': {
      1: 'Uran ist radioaktiv und giftig.',
      2: 'Uran ist ein festes Metall.',
      3: 'Uran wird vor allem in Kernenergieanlagen genutzt.'
    },
    's5-kobalt': {
      1: 'Kunststoffe brauchen kein Kobalt.',
      2: 'Kobalt ist ein Metall und gehört nicht ins Brot.',
      3: 'Der grösste Teil geht in Akkus und Batterien.'
    },
    's5-tantal': {
      1: 'Papier wird aus Holz gemacht.',
      2: 'Tantal ist kein Treibstoff.',
      3: 'Tantal ist vor allem für Elektronik wichtig.'
    },
    's5-kt4': {
      1: 'Verpackungen bestehen meist aus Kunststoff, Papier oder Glas.',
      2: 'Kobalt ist ein Metall und gehört nicht ins Brot.',
      3: 'Papier wird aus Holz gemacht.'
    },
    's6-fakt': {
      1: 'Baumwolle ist eine Pflanzenfaser.',
      2: 'Aus Erdöl werden Kunstfasern wie Polyester hergestellt.',
      3: 'Baumwolle wächst auf Feldern.'
    },
    's6-klima': {
      1: 'Baumwolle braucht Wärme.',
      2: 'Dauerregen schadet der Baumwolle.',
      3: 'Baumwolle braucht viel Licht.'
    },
    's6-mono': {
      1: 'In Monokulturen sinkt die Vielfalt.',
      2: 'Monokulturen brauchen viel Pflege und Pestizide.',
      3: 'Gerade in Monokulturen breiten sich Schädlinge aus.'
    },
    's6-bio': {
      1: 'Bio-Baumwolle bringt meist geringere Erträge.',
      2: 'Es gibt Unterschiede beim Aufwand, Ertrag und Einsatz von Chemikalien.',
      3: 'Bio-Anbau verzichtet weitgehend auf chemische Pestizide.'
    },
    's6-kt4': {
      1: 'Monokulturen senken die Artenvielfalt.',
      2: 'Baumwolle braucht viel Wasser.',
      3: 'In Monokulturen treten viele Schädlinge auf.'
    }
  },

  aufgaben: [
    { id: 's1-sack-v2', wieVorlage: 's1-sack', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Kreislauf oder Sackgasse?',
      paare: [['Laub wird von Destruenten zersetzt.', 'Kreislauf'], ['Eine Plastikflasche liegt im Meer.', 'Sackgasse'], ['Altpapier wird zu neuem Papier.', 'Kreislauf'], ['Kunststoff wird auf einer Deponie vergraben.', 'Sackgasse']],
      erklaerung: 'In einer Sackgasse kommen die Stoffe nicht mehr in einen nutzbaren Kreislauf zurück.' },

    { id: 's2-zusatz-v2', wieVorlage: 's2-zusatz', schwierigkeit: 3,
      erzeuge: () => {
        const ab = zufall([82, 85, 90, 95]), auf = zufall([78, 80]);
        const j = zufall([5, 10, 20]);
        return zahl(`In einem Modell werden pro Jahr ${ab} Gt Kohlenstoff an die Atmosphäre abgegeben und ${auf} Gt aufgenommen. Wie viele Gt kommen in ${j} Jahren zusätzlich in die Atmosphäre?`,
          (ab - auf) * j, 'Gt', `Pro Jahr: ${ab} − ${auf} = ${ab - auf} Gt. In ${j} Jahren: ${ab - auf} · ${j} = ${(ab - auf) * j} Gt.`, 'Zuerst den Überschuss pro Jahr berechnen.');
      } },

    { id: 's3-mensch-v2', wieVorlage: 's3-mensch', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Woher stammt das zusätzliche Treibhausgas vor allem?',
      paare: [['Kohlenstoffdioxid', 'Verbrennung von Erdöl, Kohle und Erdgas'], ['Methan', 'Viehhaltung, Reisfelder und Erdgaslecks']],
      erklaerung: 'Beide Gase haben stark zugenommen, vor allem durch menschliche Aktivitäten.' },

    { id: 's5-erz-v2', wieVorlage: 's5-erz', schwierigkeit: 2,
      ...mc('Warum muss man Eisen erst aus Erz gewinnen, Gold aber nicht?', 'Eisen bildet leicht Verbindungen, Gold kaum.', [
        ['Gold ist schwerer als Eisen.', 'Die Masse ist nicht der Grund. Gold reagiert kaum mit anderen Stoffen.'],
        ['Eisen gibt es nur im Weltall.', 'Eisen ist sehr häufig auf der Erde, aber in Verbindungen.'],
        ['Gold wird in Fabriken hergestellt.', 'Gold kommt in der Natur als reines Metall vor.']],
        'Fast alle Metalle liegen in Erzen als Verbindungen vor. Gold ist ein Edelmetall und reagiert kaum.') }
  ]
};
