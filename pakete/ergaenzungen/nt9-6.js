// Ergänzungen zum Paket «Evolution nachvollziehen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'v1-sauerstoff': {
      1: 'Sauerstoff ersetzt keine Pflanzen. Er bildete die schützende Ozonschicht.',
      2: 'Sauerstoff vertrieb kein Wasser. Die Ozonschicht schützte vor Strahlung.',
      3: 'Dinosaurier lebten viel später. Der Sauerstoff bildete zuerst die Ozonschicht.'
    },
    'v1-erste': {
      1: 'Dinosaurier entstanden erst vor etwa 230 Millionen Jahren.',
      2: 'Landpflanzen entstanden erst vor etwa 400 Millionen Jahren.',
      3: 'Den modernen Menschen gibt es erst seit etwa 300 000 Jahren.'
    },
    'v1-pflanzen': {
      1: 'Pflanzen geben bei der Fotosynthese Sauerstoff ab.',
      2: 'Bakterien gibt es bis heute überall.',
      3: 'Die Ozonschicht entstand schon vorher aus dem Sauerstoff im Meer.'
    },
    'v1-aussterben': {
      1: 'Der Sauerstoffgehalt sank, er stieg nicht.',
      2: 'Den Mond gibt es bis heute.',
      3: 'Dinosaurier entstanden erst nach diesem Aussterben.'
    },
    'v1-mensch': {
      1: 'Vor 4,5 Milliarden Jahren entstand die Erde. Den Menschen gibt es viel kürzer.',
      2: 'Vor 700 Millionen Jahren reicherte sich der Sauerstoff an. Menschen gab es noch lange nicht.',
      3: 'Vor 65 Millionen Jahren starben die Dinosaurier aus.'
    },
    'v1-kt4': {
      1: 'Dinosaurier kamen erst später, als es schon Leben an Land gab.',
      2: 'Das Wasser verschwand nicht. Wichtig war der Schutz vor Strahlung.',
      3: 'Der Mensch kam erst ganz am Schluss.'
    },
    'v2-homo': {
      1: 'Das ist eine Analogie.',
      2: 'Homologe Merkmale kommen bei mehreren Arten vor.',
      3: 'Eine Homologie ist kein Fehler, sondern ein Hinweis auf Verwandtschaft.'
    },
    'v2-ana': {
      1: 'Gleicher Aufbau weist auf eine Homologie hin.',
      2: 'Analogien beziehen sich auf die Funktion, nicht auf die Gene.',
      3: 'Ein Merkmal von Vorfahren deutet auf eine Homologie hin.'
    },
    'v2-klad': {
      1: 'Umgekehrt: Die Linien von Säugetieren und Reptilien trennen sich später.',
      2: 'Gerade das Kladogramm zeigt die Verwandtschaft.',
      3: 'Je später sich Linien trennen, desto näher sind sie verwandt.'
    },
    'v2-ast': {
      1: 'Eine Verzweigung zeigt ein neues Merkmal, keinen Streit.',
      2: 'Die Verzweigung hat eine Bedeutung: ein neues gemeinsames Merkmal.',
      3: 'Das Kladogramm zeigt Merkmale, nicht das Alter einzelner Tiere.'
    },
    'v2-merkmal': {
      1: 'Umgekehrt: Mehr gemeinsame Merkmale heisst nähere Verwandtschaft.',
      2: 'Das Aussehen kann täuschen, aber der Körperbau sagt viel aus.',
      3: 'Die Grösse sagt wenig über die Verwandtschaft.'
    },
    'v2-klasse': {
      1: 'Umgekehrt: Eine Klasse umfasst mehrere Arten.',
      2: 'Die Klasse ist die grössere Gruppe, die Art die kleinere.',
      3: 'Eine Klasse ist eine Gruppe von Lebewesen.'
    },
    'v2-kt4': {
      1: 'Homolog wären sie bei gleichem Aufbau.',
      2: 'Ein Kladogramm ist eine Darstellung der Verwandtschaft.',
      3: 'Eine Mutation ist eine Veränderung der Erbinformation.'
    },
    'v3-lamarck': {
      1: 'Zufällige Unterschiede und Auslese erklärten Darwin und Wallace.',
      2: 'Isolation durch Gletscher erklärt die Entstehung neuer Arten, nicht den Giraffenhals.',
      3: 'Kreuzung mit anderen Arten war nicht Lamarcks Erklärung.'
    },
    'v3-wider': {
      1: 'Giraffen haben lange Hälse. Lamarcks Erklärung dafür stimmt aber nicht.',
      2: 'Das Alter von Lamarck spielt keine Rolle.',
      3: 'Die Anzahl der Giraffen spielt keine Rolle.'
    },
    'v3-darwin': {
      1: 'Strecken verlängert den Hals nicht vererbbar. Das war Lamarcks Idee.',
      2: 'Wünsche verändern das Erbgut nicht.',
      3: 'Die Natur plant nicht. Sie wählt aus, was zufällig vorhanden ist.'
    },
    'v3-gene': {
      1: 'Gene sind sehr wichtig. Sie erklären heute, woher die Unterschiede kommen.',
      2: 'Die Theorie ist anerkannt und durch die Genetik bestätigt.',
      3: 'Darwin untersuchte auch Tiere, zum Beispiel Finken.'
    },
    'v3-origin': {
      1: 'Wallace entwickelte die Theorie unabhängig mit.',
      2: 'Darwin war sogar älter als Wallace.',
      3: 'Wallace lebte noch, als Darwins Buch erschien.'
    },
    'v3-kt5': {
      1: 'Alle drei gingen davon aus, dass sich Arten verändern.',
      2: 'Sie waren sich nicht einig, wie sich Arten verändern.',
      3: 'Der Unterschied liegt in der Erklärung, nicht bei Pflanzen.'
    },
    'v4-vari': {
      1: 'Die Ernährung verändert die Erbanlagen nicht.',
      2: 'Die Luft verändert die Erbanlagen nicht.',
      3: 'Innerhalb einer Art unterscheiden sich die Lebewesen.'
    },
    'v4-mut': {
      1: 'Mutationen in Körperzellen werden nicht an Kinder weitergegeben.',
      2: 'Mutationen in Geschlechtszellen können weitergegeben werden.',
      3: 'Das gilt für alle Lebewesen mit geschlechtlicher Fortpflanzung.'
    },
    'v4-fit': {
      1: '«Fit» heisst hier «passend», nicht «stark».',
      2: 'Die Grösse ist nicht entscheidend, sondern die Anpassung.',
      3: 'Nicht alle überleben. Die besser angepassten überleben eher.'
    },
    'v4-natur': {
      1: 'Wenn Menschen auswählen, ist das künstliche Selektion.',
      2: 'Zufälliges Sterben ist ein Zufallseffekt, keine Selektion.',
      3: 'Wachstum ist keine Selektion.'
    },
    'v4-kunst': {
      1: 'Das Überleben der Angepassten in der Natur ist natürliche Selektion.',
      2: 'Zufälliges Aussterben ist ein Zufallseffekt.',
      3: 'Eine Mutation ist eine Veränderung der Erbinformation, keine Auswahl.'
    },
    'v4-kt5': {
      1: 'Die braunen Käfer werden häufiger gefressen. Ihr Anteil sinkt.',
      2: 'Die braunen Käfer werden eher gefressen.',
      3: 'Die Auslese durch Vögel verändert die Anteile.'
    },
    'v5-sex': {
      1: 'Auslese durch Fressfeinde ist natürliche Selektion.',
      2: 'Auslese durch Klima ist natürliche Selektion.',
      3: 'Auslese durch Züchter ist künstliche Selektion.'
    },
    'v5-zufall': {
      1: 'Bei Katastrophen entscheidet oft der Zufall, wer überlebt.',
      2: 'Zufallseffekte gibt es bei allen Lebewesen.',
      3: 'Zufall und Selektion wirken beide.'
    },
    'v5-iso': {
      1: 'Mutationen allein bilden keine neue Art. Es braucht Isolation.',
      2: 'Wandern allein trennt die Gruppen nicht.',
      3: 'Häufigere Paarung mischt das Erbgut, statt Arten zu trennen.'
    },
    'v5-raum': {
      1: 'Spechte und Frösche können sich nicht kreuzen.',
      2: 'Neue Arten entstehen über viele Generationen, nicht in einer Nacht.',
      3: 'Spechte werden nicht gezüchtet.'
    },
    'v5-jahr': {
      1: 'Sie leben oft am gleichen Ort. Getrennt sind sie durch die Zeit.',
      2: 'Sie sehen ähnlich aus, paaren sich aber zu verschiedenen Zeiten.',
      3: 'Frösche sind Tiere, Amphibien.'
    },
    'v5-kt5': {
      1: 'Mutationen gibt es genug. Es fehlt die Trennung.',
      2: 'Arten verändern sich, aber ohne Isolation entstehen keine neuen.',
      3: 'Pflanzen haben damit nichts zu tun.'
    },
    'v6-frosch': {
      1: 'Wollen und Strecken ändern das Erbgut nicht. Das war Lamarcks Idee.',
      2: 'Baden verändert die Erbanlagen nicht.',
      3: 'Spannhäute sind Haut der Frösche.'
    },
    'v6-hirsch': {
      1: 'Jäger spielen für die Entstehung des Geweihs keine Rolle.',
      2: 'Ein grosses Geweih bremst eher beim Laufen.',
      3: 'Geweihgrösse wird vererbt.'
    },
    'v6-spezial': {
      1: 'Sie haben sich in viele Arten aufgespalten.',
      2: 'Verschiedene Arten fressen verschiedenes Futter.',
      3: 'Darwinfinken und Kärpflinge leben heute noch.'
    },
    'v6-ind': {
      1: 'Ein einzelnes Lebewesen verändert seine Erbanlagen nicht.',
      2: 'Die Umwelt verändert sich auch, aber Evolution betrifft die Arten.',
      3: 'Evolution betrifft alle Lebewesen.'
    },
    'v6-stamm': {
      1: 'Wissenschaft ist offen für neue Daten.',
      2: 'Stammbäume beruhen auf Forschung, nicht auf Erfindung.',
      3: 'Stammbäume werden mit neuen Erkenntnissen verbessert.'
    },
    'v6-kt3': {
      1: 'Wünsche verändern das Erbgut nicht.',
      2: 'Innerhalb einer Art gibt es Unterschiede (Variabilität).',
      3: 'Evolution dauert viele Generationen.'
    },
    'v6-faktoren': {
      1: 'Mutation allein genügt nicht. Es braucht auch Selektion und Isolation.',
      2: 'Isolation allein genügt nicht. Es braucht auch Variabilität und Selektion.',
      3: 'Der Wille verändert das Erbgut nicht.'
    }
  },

  aufgaben: [
    { id: 'v1-mensch-v2', wieVorlage: 'v1-mensch', typ: 'reihenfolge', schwierigkeit: 3,
      text: 'Bringe die Ereignisse in die zeitliche Reihenfolge (das älteste zuerst).',
      elemente: ['Entstehung der Erde', 'erste Urbakterien', 'erste Landpflanzen', 'Aussterben der Dinosaurier', 'moderner Mensch'],
      erklaerung: 'Erde vor 4,5 Mrd. Jahren, Urbakterien vor 3,7 Mrd., Landpflanzen vor 400 Mio., Dinosaurier ausgestorben vor 65 Mio., Mensch seit etwa 300 000 Jahren.' },

    { id: 'v2-homo-v2', wieVorlage: 'v2-homo', schwierigkeit: 3,
      ...mc('Der Arm des Menschen und die Flosse des Wals haben denselben Knochenaufbau. Was zeigt das?', 'Eine Homologie: Beide stammen von einem gemeinsamen Vorfahren.', [
        ['Eine Analogie, weil beide schwimmen können.', 'Analog wären sie bei gleicher Funktion und verschiedenem Aufbau. Hier ist der Aufbau gleich.'],
        ['Dass der Wal vom Menschen abstammt.', 'Beide haben einen gemeinsamen Vorfahren. Der eine stammt nicht vom anderen ab.'],
        ['Reinen Zufall ohne Bedeutung.', 'Derselbe Knochenaufbau bei vielen Säugetieren ist ein Hinweis auf Verwandtschaft.']],
        'Gleicher Aufbau trotz verschiedener Funktion spricht für einen gemeinsamen Ursprung.') },

    { id: 'v2-ana-v2', wieVorlage: 'v2-ana', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Homologie oder Analogie?',
      paare: [['Arm des Menschen und Flügel der Fledermaus', 'Homologie'], ['Flügel von Vogel und Schmetterling', 'Analogie'], ['Flosse des Wals und Vorderbein des Pferds', 'Homologie'], ['Grabschaufel von Maulwurf und Maulwurfsgrille', 'Analogie']],
      erklaerung: 'Homologie: gleicher Aufbau, gemeinsamer Ursprung. Analogie: gleiche Funktion, verschiedener Aufbau.' },

    { id: 'v3-origin-v2', wieVorlage: 'v3-origin', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Wer erklärte die Evolution wie?',
      paare: [['Erworbene Eigenschaften werden vererbt.', 'Lamarck'], ['Zufällige Unterschiede und natürliche Auslese', 'Darwin und Wallace']],
      erklaerung: 'Die Theorie von Darwin und Wallace ist anerkannt. Lamarcks Theorie gilt als widerlegt.' },

    { id: 'v4-kunst-v2', wieVorlage: 'v4-kunst', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Welcher Evolutionsfaktor wirkt?',
      paare: [['Gut getarnte Birkenspanner werden seltener gefressen.', 'natürliche Selektion'], ['Ein Züchter vermehrt nur die grössten Erdbeeren.', 'künstliche Selektion'], ['Weibchen wählen Männchen mit bunten Federn.', 'sexuelle Selektion'], ['Bei einem Waldbrand überleben zufällig einige Tiere.', 'Zufallseffekt']],
      erklaerung: 'Selektion wählt nach Merkmalen aus. Beim Zufallseffekt spielen die Merkmale keine Rolle.' },

    { id: 'v5-jahr-v2', wieVorlage: 'v5-jahr', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Wodurch sind die Gruppen getrennt?',
      paare: [['Gletscher trennen eine Spechtart.', 'räumliche Isolation'], ['Grasfrosch paart sich im März, Wasserfrosch im Mai.', 'zeitliche Isolation'], ['Finken fressen verschiedenes Futter.', 'Spezialisierung']],
      erklaerung: 'Wird der Austausch von Erbmaterial unterbunden, entwickeln sich die Gruppen zu verschiedenen Arten.' },

    { id: 'v6-faktoren-v2', wieVorlage: 'v6-faktoren', typ: 'reihenfolge', schwierigkeit: 3,
      text: 'Bringe die Schritte einer Evolutionserklärung in die richtige Reihenfolge.',
      elemente: ['Ein Merkmal kommt in verschiedenen Ausprägungen vor.', 'Eine Ausprägung bringt einen Vorteil.', 'Diese Lebewesen haben mehr Nachkommen.', 'Mit der Zeit wird die Ausprägung häufiger.'],
      erklaerung: 'Variabilität, Vorteil, mehr Nachkommen, Veränderung der Häufigkeit: So erklärst du jede Anpassung.' }
  ]
};
