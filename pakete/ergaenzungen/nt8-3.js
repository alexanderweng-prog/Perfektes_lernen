// Ergänzungen zum Paket «Funktionen des Körpers analysieren» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'h1-dim': {
      1: 'Gesundheit ist mehr als nicht krank zu sein. Auch geistiges und soziales Wohlergehen gehören dazu.',
      2: 'Sport und Ernährung helfen, decken aber nur einen Teil ab. Dazu kommen Psyche und Beziehungen.',
      3: 'Das Gewicht sagt wenig über die Gesundheit. Sie hat körperliche, geistige und soziale Seiten.'
    },
    'h1-schutz': {
      1: 'Dauerstress ohne Pausen ist ein Risikofaktor.',
      2: 'Rauchen schadet der Gesundheit und ist ein Risikofaktor.',
      3: 'Mobbing schadet vor allem dem geistigen und sozialen Wohlergehen.'
    },
    'h1-nahr': {
      1: 'Vitamine, Salz und Wasser sind wichtig, gehören aber nicht zu den drei Hauptnährstoffen.',
      2: 'Zucker gehört zu den Kohlenhydraten. Salz und Pfeffer sind keine Hauptnährstoffe.',
      3: 'Eisen und Kalk sind Mineralstoffe. Gold ist kein Nährstoff.'
    },
    'h1-ausgew': {
      1: 'Süsses steht in der Pyramide ganz oben: nur wenig davon.',
      2: 'Nur Fleisch ist einseitig. Gemüse, Obst und Getreide gehören dazu.',
      3: 'Ohne Essen fehlen dem Körper Energie und Baustoffe.'
    },
    'h1-energie': {
      1: 'Energie ist nicht weg. Sie wird umgewandelt, zum Beispiel in thermische Energie.',
      2: 'Energie verschwindet nie. Sie wechselt nur die Form.',
      3: 'Energie ist kein Stoff, den man essen kann. Sie steckt in den Nährstoffen.'
    },
    'h1-kt4': {
      1: 'Risikofaktoren schaden der Gesundheit, zum Beispiel Rauchen.',
      2: 'Hauptnährstoffe sind Kohlenhydrate, Fette und Proteine.',
      3: 'Krankheitserreger sind Viren, Bakterien und Pilze.'
    },
    'h2-staerke': {
      1: 'Wasser ist kein Nachweismittel. Für Stärke braucht es Lugol-Lösung.',
      2: 'Essig zeigt keine Stärke an. Lugol-Lösung färbt sich blauviolett.',
      3: 'Salz reagiert nicht mit Stärke. Der Nachweis gelingt mit Lugol-Lösung.'
    },
    'h2-zucker': {
      1: 'Ein Thermometer misst die Temperatur, keinen Zucker.',
      2: 'Ein Lineal misst Längen.',
      3: 'Die Waage zeigt die Masse, nicht ob Zucker enthalten ist.'
    },
    'h2-kontrolle': {
      1: 'Der Kontrollversuch dient dem Vergleich, nicht der Länge.',
      2: 'Reines Wasser enthält keine Stärke. Darum taugt es als Vergleich.',
      3: 'Der Grund ist der Vergleich: Erst daran erkennst du ein positives Ergebnis.'
    },
    'h2-aceton': {
      1: 'Über der Flamme kann sich Aceton entzünden. Darum nimmst du die Heizplatte.',
      2: 'Aceton ist gesundheitsschädlich. Im Labor wird nie etwas getrunken.',
      3: 'Ein Feuerzeug ist eine offene Flamme. Aceton kann sich entzünden.'
    },
    'h2-extraktion': {
      1: 'Beim Extrahieren behältst du den gelösten Stoff. Er wird nicht weggeschüttet.',
      2: 'Verkohlen ist kein Extrahieren. Man löst einen Stoff mit einem Lösungsmittel heraus.',
      3: 'Filtern trennt nach Teilchengrösse. Beim Extrahieren braucht es ein Lösungsmittel.'
    },
    'h2-kt4': {
      1: 'Fett weist man mit der Fettfleckprobe nach.',
      2: 'Lugol-Lösung zeigt Stärke an, nicht Eiweiss.',
      3: 'Wasser allein färbt Lugol nicht blauviolett.'
    },
    'h3-weg': {
      1: 'Die Nahrung beginnt im Mund, nicht im Magen.',
      2: 'Nach dem Mund kommt die Speiseröhre, dann der Magen.',
      3: 'Die Nahrung kommt zuerst in den Mund und erst ganz am Schluss in den Mastdarm.'
    },
    'h3-stoffwechsel': {
      1: 'Schlafen und Sprechen sind keine Stoffwechselvorgänge.',
      2: 'Das sind Schritte der Verdauung. Die vier Vorgänge gelten für alle Stoffe.',
      3: 'Denken, Fühlen und Sehen sind keine Stoffwechselvorgänge.'
    },
    'h3-speichel': {
      1: 'Die Stärke wird abgebaut. Darum wird die Lösung heller, nicht dunkler.',
      2: 'Das Enzym im Speichel wirkt. Die Färbung verschwindet nach einiger Zeit.',
      3: 'Die Stärke wird in Zucker zerlegt, nicht in Wasser.'
    },
    'h3-galle': {
      1: 'Stärke zerlegen Enzyme im Speichel und im Dünndarm.',
      2: 'Salzsäure bildet der Magen.',
      3: 'Sauerstoff transportiert das Blut.'
    },
    'h3-oberfl': {
      1: 'Die Falten sorgen dafür, dass Nährstoffe aufgenommen werden, nicht verloren gehen.',
      2: 'Die Falten machen den Darm nicht kürzer. Sie vergrössern die Oberfläche.',
      3: 'Der Grund ist die grosse Oberfläche für die Aufnahme der Nährstoffe.'
    },
    'h3-kt4': {
      1: 'Im Mund beginnt das Enzym im Speichel schon, Stärke zu zerlegen.',
      2: 'Vor dem Dünndarm wird schon im Mund und im Magen verdaut.',
      3: 'Im Dickdarm wird vor allem Wasser entzogen. Die Verdauung beginnt viel früher.'
    },
    'h4-arten': {
      1: 'Auch Bakterien und Pilze können krank machen.',
      2: 'Auch Viren und Pilze können krank machen.',
      3: 'Die häufigsten Erreger sind Viren, Bakterien und Pilze.'
    },
    'h4-bakt': {
      1: 'Viele Bakterien sind nützlich, zum Beispiel im Darm oder im Joghurt.',
      2: 'Im Darm leben sehr viele Bakterien. Sie helfen bei der Verdauung.',
      3: 'Bakterien gibt es überall. Nur wenige sind schädlich.'
    },
    'h4-vergleich': {
      1: 'Umgekehrt: Viren sind viel kleiner als Bakterien.',
      2: 'Bakterien teilen sich selbst. Viren brauchen eine Wirtszelle.',
      3: 'Viren und Bakterien unterscheiden sich in Grösse und Vermehrung.'
    },
    'h4-pilz': {
      1: 'Hefepilze sind einzellige Pilze.',
      2: 'Viele Pilze sind mehrzellig, zum Beispiel Schimmel- und Speisepilze.',
      3: 'Pilze bestehen aus Zellen, typisch sind Zellfäden.'
    },
    'h4-hemm': {
      1: 'Der Ring ist hell, weil dort keine Hefe wächst.',
      2: 'Der Nährboden ist überall gleich. Die Substanz im Papier hemmt das Wachstum.',
      3: 'Das Papier ist noch da. Der helle Ring entsteht durch die Substanz darin.'
    },
    'h4-kt7': {
      1: 'Viren sind kleiner als Bakterien.',
      2: 'Bakterien sind eigene Zellen.',
      3: 'Weil sie sich verschieden vermehren, wehrt das Immunsystem sie verschieden ab.'
    },
    'h4-sti': {
      1: 'STI werden bei sexuellen Kontakten übertragen, nicht beim Händeschütteln.',
      2: 'STI können alle betreffen, die sexuelle Kontakte haben, auch Jugendliche.',
      3: 'Viele STI verlaufen lange ohne Beschwerden. Darum sind Tests wichtig.'
    },
    'h4-risiko': {
      1: 'Auch wer sein Gegenüber gut kennt, kann sich anstecken.',
      2: 'Unbehandelt können STI ernste Folgen haben.',
      3: 'STI kommen überall vor, auch in der Schweiz.'
    },
    'h4-schutz': {
      1: 'Die Pille verhindert nur eine Schwangerschaft, nicht eine Ansteckung.',
      2: 'Duschen schützt nicht vor einer Ansteckung.',
      3: 'Schutz ist möglich: Kondom oder Femidom senken das Risiko deutlich.'
    },
    'h4-hiv': {
      1: 'HIV befällt Zellen des Immunsystems, nicht die Haut.',
      2: 'HIV befällt T-Helferzellen des Immunsystems.',
      3: 'Umgekehrt: HIV schwächt das Immunsystem.'
    },
    'h4-pille': {
      1: 'Ein verbreiteter Irrtum: Die Pille schützt nicht vor STI.',
      2: 'Die Pille schützt vor keinem Erreger.',
      3: 'Auch vor HIV schützt die Pille nicht. Dafür braucht es Kondom oder Femidom.'
    },
    'h4-oral': {
      1: 'Auch beim Oralsex ist eine Ansteckung möglich.',
      2: 'Medikamente spielen hier keine Rolle. Eine Ansteckung ist möglich.',
      3: 'Das Alter spielt keine Rolle. Das Risiko besteht für alle.'
    },
    'h4-info': {
      1: 'In sozialen Medien steht oft Falsches. Fachstellen geben verlässliche Auskunft.',
      2: 'Darüber zu sprechen ist wichtig. Fachstellen helfen respektvoll weiter.',
      3: 'Freunde wissen oft nicht genau Bescheid. Besser sind Fachstellen und Arztpraxen.'
    },
    'h5-schluessel': {
      1: 'Ein Antikörper passt nur zu einem bestimmten Antigen, wie ein Schlüssel zu einem Schloss.',
      2: 'Antikörper binden an Erreger. Auffressen tun die Fresszellen.',
      3: 'Antikörper bilden die B-Zellen. Antigene sind Merkmale auf den Erregern.'
    },
    'h5-abwehr': {
      1: '«Krieg» ist eine Kampfmetapher. Fachlich passt «Abwehr» besser.',
      2: '«Schlacht» ist eine Kampfmetapher. Fachlich passt «Abwehr».',
      3: 'Der Körper greift nicht an, er wehrt ab.'
    },
    'h5-allergie': {
      1: 'Eine Infektion kommt von Erregern. Bei einer Allergie reagiert der Körper auf harmlose Stoffe.',
      2: 'Bei einer Mangelkrankheit fehlt etwas. Eine Allergie ist eine Überreaktion.',
      3: 'Eine Allergie ist keine Verletzung, sondern eine Reaktion des Immunsystems.'
    },
    'h5-unspez': {
      1: 'Die unspezifische Abwehr wirkt gegen alles, die spezifische gegen einen bestimmten Erreger.',
      2: 'Die unspezifische Abwehr ist immer da, auch ohne Impfung.',
      3: 'Umgekehrt: Die spezifische Abwehr richtet sich gegen einen bestimmten Erreger.'
    },
    'h5-gruppe': {
      1: 'Das wäre Blutgruppe B.',
      2: 'Ohne Antigene wäre es Blutgruppe 0.',
      3: 'Gegen eigene Antigene bildet der Körper keine Antikörper.'
    },
    'h5-spender': {
      1: 'Umgekehrt: 0 ist Spender, AB ist Empfänger.',
      2: 'Blutgruppe A kann nicht an B geben, weil das Plasma von B Antikörper gegen A enthält.',
      3: 'Blutgruppe B kann nicht an A geben.'
    },
    'h5-kt4': {
      1: 'AB-Blutzellen tragen beide Antigene und lösen bei A, B und 0 eine Reaktion aus.',
      2: 'A-Blutzellen lösen bei B und 0 eine Reaktion aus.',
      3: 'B-Blutzellen lösen bei A und 0 eine Reaktion aus.'
    },
    'h6-aktiv': {
      1: 'Das ist die Heilimpfung (passive Immunisierung).',
      2: 'Medikamente gegen Bakterien sind Antibiotika, keine Impfung.',
      3: 'Der Impfstoff enthält abgeschwächte Erreger oder Teile davon. Der Körper erkrankt nicht.'
    },
    'h6-passiv': {
      1: 'Sie enthält gerade fertige Antikörper.',
      2: 'Sie wirkt auch bei Erwachsenen.',
      3: 'Der Grund für den kurzen Schutz ist das Fehlen von Gedächtniszellen.'
    },
    'h6-grippe': {
      1: 'Die Grippeimpfung ist eine Schutzimpfung: Der Körper bildet selbst Antikörper.',
      2: 'Weil sich die Viren verändern, muss man jedes Jahr neu impfen.',
      3: 'Sie schützt nur gegen die Grippeviren dieses Jahres.'
    },
    'h6-krebs': {
      1: 'Krebs ist nicht ansteckend.',
      2: 'Umgekehrt: Bösartige Tumoren breiten sich aus, gutartige nicht.',
      3: 'Auch junge Menschen können an Krebs erkranken.'
    },
    'h6-risiko': {
      1: 'Bei manchen Krebsarten lässt sich das Risiko senken, zum Beispiel durch Nichtrauchen.',
      2: 'Rauchen erhöht das Krebsrisiko stark. Der Körper gewöhnt sich nicht daran.',
      3: 'Vorsorgeuntersuchungen helfen, Krebs früh zu erkennen.'
    },
    'h6-medi': {
      1: 'Im Beipackzettel stehen Dosis und Nebenwirkungen. Er gehört aufbewahrt.',
      2: 'Beruhigungs- und Schlafmittel können abhängig machen.',
      3: 'Mehr nehmen kann gefährlich sein. Die Dosis ist genau festgelegt.'
    },
    'h6-kt4': {
      1: 'Gedächtniszellen entstehen nur bei der Schutzimpfung.',
      2: 'Antikörper töten nicht alle Bakterien. Sie binden an einen bestimmten Erreger.',
      3: 'Sie wirkt nur kurz und ersetzt keine Schutzimpfung.'
    }
  },

  aufgaben: [
    { id: 'h1-energie-v2', wieVorlage: 'h1-energie', typ: 'luecke', schwierigkeit: 2,
      text: 'In Ruhe benötigt der Körper den ___umsatz. Durch Bewegung kommt der ___umsatz dazu. Zusammen ergeben sie den Gesamtumsatz.',
      luecken: [['Grund'], ['Leistungs']],
      erklaerung: 'Grundumsatz + Leistungsumsatz = Gesamtumsatz. Die Energie wird umgewandelt, nicht verbraucht.' },

    { id: 'h3-oberfl-v2', wieVorlage: 'h3-oberfl', schwierigkeit: 3,
      ...mc('Welches Modell zeigt am besten, warum der Dünndarm Falten hat?', 'Ein Frotteetuch saugt mehr Wasser auf als ein glattes Leinentuch.', [
        ['Ein Ballon wird beim Aufblasen grösser.', 'Der Ballon zeigt das Volumen, nicht die Oberfläche von Falten.'],
        ['Ein Schwamm wird nass schwerer.', 'Die Masse ist hier nicht entscheidend. Es geht um die grosse Oberfläche.'],
        ['Ein Rohr leitet Wasser weiter.', 'Ein glattes Rohr hat gerade keine vergrösserte Oberfläche.']],
        'Mehr Oberfläche heisst: mehr Nährstoffe gleichzeitig ins Blut. Das Modell hat Grenzen, denn der Darm lebt und bewegt sich.') },

    { id: 'h4-info-v2', wieVorlage: 'h4-info', schwierigkeit: 2,
      ...mc('Eine Kollegin hat eine Frage zu Tests auf sexuell übertragbare Infektionen. Was rätst du ihr?', 'Sich bei einer Beratungs- und Teststelle oder in einer Arztpraxis zu informieren.', [
        ['Im Internet die erstbeste Antwort zu glauben.', 'Im Internet steht viel Falsches. Fachstellen geben verlässliche Antworten.'],
        ['Abzuwarten, ob Beschwerden kommen.', 'Viele Infektionen machen lange keine Beschwerden. Ein Test schafft Klarheit.'],
        ['Niemandem davon zu erzählen.', 'Fachstellen beraten vertraulich und respektvoll.']],
        'Fachstellen, Arztpraxen sowie Beratungs- und Teststellen beantworten Fragen vertraulich.') },

    { id: 'h5-unspez-v2', wieVorlage: 'h5-unspez', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne den Vorgang der Abwehrart zu.',
      paare: [['Fresszellen nehmen jeden Erreger auf.', 'unspezifisch'], ['B-Zellen bilden passende Antikörper.', 'spezifisch'], ['Gedächtniszellen erkennen einen Erreger wieder.', 'spezifisch'], ['Die Haut hält Erreger ab.', 'unspezifisch']],
      erklaerung: 'Die unspezifische Abwehr wirkt sofort gegen alles. Die spezifische richtet sich gegen einen bestimmten Erreger und hat ein Gedächtnis.' },

    { id: 'h5-gruppe-v2', wieVorlage: 'h5-gruppe', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne der Blutgruppe die Antikörper im Plasma zu.',
      paare: [['A', 'gegen B'], ['B', 'gegen A'], ['AB', 'keine'], ['0', 'gegen A und B']],
      erklaerung: 'Gegen eigene Antigene bildet der Körper keine Antikörper. Darum hat AB keine, 0 dagegen beide.' },

    { id: 'h6-grippe-v2', wieVorlage: 'h6-grippe', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne das Beispiel der Impfart zu.',
      paare: [['Masernimpfung im Kindesalter', 'Schutzimpfung (aktiv)'], ['Antikörper nach einem Schlangenbiss', 'Heilimpfung (passiv)'], ['jährliche Grippeimpfung', 'Schutzimpfung (aktiv)']],
      erklaerung: 'Bei der Schutzimpfung bildet der Körper selbst Antikörper und Gedächtniszellen. Bei der Heilimpfung bekommt er fertige Antikörper.' }
  ]
};
