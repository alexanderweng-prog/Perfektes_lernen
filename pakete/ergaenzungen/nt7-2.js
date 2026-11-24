// Ergänzungen zum Paket «Den Körper analysieren» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'k1-organ': {
      1: 'Ohne Lunge, Leber oder Nieren überlebt man auch nicht lange. Fast alle Organe sind lebensnotwendig.',
      2: 'Ohne Organe gibt es keinen Stoffwechsel. Der Körper braucht ihr Zusammenspiel.',
      3: 'Die meisten Organe sind lebensnotwendig. Schwierig ist nur, eine Rangliste aufzustellen.'
    },
    'k1-muskel': {
      1: 'Muskeln enthalten viel Wasser, aber ihre Arbeit leisten die Muskelfasern aus Proteinen.',
      2: 'Calciumphosphat macht die Knochen hart, nicht die Muskeln.',
      3: 'Knorpel überzieht die Gelenkflächen. Muskeln bestehen aus Muskelfasern.'
    },
    'k1-knochen': {
      1: 'Knochen enthalten lebende Zellen. Sie werden ständig auf- und abgebaut und können heilen.',
      2: 'Neben den harten Kristallen enthalten Knochen elastische Proteine. Ohne sie wären sie brüchig.',
      3: 'Knochen werden ständig umgebaut. Darum heilt ein Bruch, und Training stärkt die Knochen.'
    },
    'k1-sehne': {
      1: 'Sehnen und Bänder haben verschiedene Aufgaben: Sehnen verbinden Muskel und Knochen, Bänder halten das Gelenk.',
      2: 'Bänder verbinden Knochen mit Knochen im Gelenk. Muskeln hängen über Sehnen am Knochen.',
      3: 'Sehnen haben mit der Haut nichts zu tun. Sie übertragen die Kraft des Muskels auf den Knochen.'
    },
    'k1-versuch': {
      1: 'Der Essig löst die harten Kristalle auf. Ohne sie wird der Knochen weich, nicht härter.',
      2: 'Im Essig leuchtet nichts. Der Knochen verliert seine Härte und lässt sich biegen.',
      3: 'Der Essig löst das Calciumphosphat. Nach einigen Tagen ist der Knochen deutlich biegsamer.'
    },
    'k1-gegen': {
      1: 'Muskeln können nur ziehen, nicht stossen. Deshalb braucht jede Bewegung einen Gegenspieler.',
      2: 'Ein Muskel allein könnte den Arm nur beugen. Zum Strecken braucht es den Gegenspieler.',
      3: 'Beuger und Strecker arbeiten immer zusammen: Der eine zieht, der andere wird gedehnt.'
    },
    'k1-modell': {
      1: 'Kein Modell zeigt alles richtig. Hier sind die Verhältnisse beim Gegenspielerprinzip sogar vertauscht.',
      2: 'Das Modell zeigt den Aufbau recht gut. Nützlich ist es, solange man seine Grenzen kennt.',
      3: 'Modelle sind wichtig zum Verstehen. Man muss nur prüfen, was sie richtig zeigen.'
    },
    'k1-kt5': {
      1: 'Wenn sich beide zusammenziehen, blockiert der Arm. Der Strecker muss nachgeben und wird gedehnt.',
      2: 'Der Strecker bleibt, er wird beim Beugen nur gedehnt.',
      3: 'Muskeln und Knochen sind verschiedene Gewebe. Ein Muskel wird nie zum Knochen.'
    },
    'k2-vier': {
      1: 'Schlafen ist kein Stoffwechselvorgang. Die vier Vorgänge beschreiben, was mit den Stoffen geschieht.',
      2: 'Das sind Schritte der Verdauung. Die vier Stoffwechselvorgänge gelten für alle Stoffe, auch für Sauerstoff.',
      3: 'Das sind Merkmale von Lebewesen, keine Stoffwechselvorgänge.'
    },
    'k2-atmen': {
      1: 'Die Lunge trocknet nicht aus. Das Problem ist, dass die Zellen keinen Sauerstoff mehr bekommen.',
      2: 'Das Herz braucht keine Luft, sondern Sauerstoff aus dem Blut, wie alle Zellen.',
      3: 'Das Blut gefriert nicht. Ohne Sauerstoff können die Zellen keine Energie gewinnen.'
    },
    'k2-umwand': {
      1: 'Stoffe verschwinden nie. Sie werden umgebaut und verlassen den Körper zum Beispiel als Atemgase.',
      2: 'Stoffe werden nicht zu Energie. Beim Umbau wird Energie frei, die Stoffe bleiben als neue Stoffe erhalten.',
      3: 'Die Stoffe verlassen den Körper wieder, als Kohlenstoffdioxid, Wasser, Urin und Kot.'
    },
    'k2-energie': {
      1: 'Energie kann man nicht wiegen oder anfassen. Sie steckt in Stoffen wie den Nährstoffen.',
      2: 'Sauerstoff ist ein Stoff. Er wird gebraucht, um die Energie aus den Nährstoffen freizusetzen.',
      3: 'Wasser ist ein Stoff und liefert dem Körper keine Energie.'
    },
    'k2-nachweis': {
      1: 'Kalkwasser zeigt nur Kohlenstoffdioxid an. Für Sauerstoff braucht es die Glimmspanprobe.',
      2: 'Die Glimmspanprobe zeigt nur Sauerstoff an: Der Span flammt auf. Kohlenstoffdioxid weist man mit Kalkwasser nach.',
      3: 'pH-Papier zeigt, ob etwas sauer oder basisch ist. Es weist keine Gase nach.'
    },
    'k2-kt5': {
      1: 'Die Aufnahme kommt zuerst, zum Beispiel beim Einatmen.',
      2: 'Der Transport kommt an zweiter Stelle: Das Blut bringt die Stoffe zu den Zellen.',
      3: 'Die Umwandlung in den Zellen kommt vor der Abgabe der Abfallstoffe.'
    },
    'k2-abgabe': {
      1: 'Der Darm gibt nur die festen Reste ab. Auch Lunge und Nieren geben Stoffe ab.',
      2: 'Das Herz pumpt das Blut, es gibt keine Stoffe nach aussen ab.',
      3: 'Die Haut gibt etwas Wasser ab. Die wichtigsten Abgabeorgane sind aber Lunge, Nieren und Darm.'
    },
    'k3-weg': {
      1: 'Das ist der Weg der Nahrung. Luft gelangt über die Luftröhre in die Lunge.',
      2: 'Luft gelangt nie in den Magen und nicht ins Herz. Ihr Weg führt über die Luftröhre in die Lunge.',
      3: 'Die Luft geht nicht durchs Herz. Von der Luftröhre geht sie über die Bronchien in die Lungenbläschen.'
    },
    'k3-bewegung': {
      1: 'Die Lunge hat keine Muskeln. Sie folgt den Bewegungen von Zwerchfell und Brustkorb.',
      2: 'Das Herz pumpt Blut, keine Luft. Für die Atmung sorgen die Atemmuskeln.',
      3: 'Die Luftröhre ist ein starres Rohr mit Knorpelspangen. Sie bewegt die Luft nicht.'
    },
    'k3-austausch': {
      1: 'Umgekehrt: Das Blut nimmt Sauerstoff auf. Stickstoff wird nicht aufgenommen.',
      2: 'Nahrung wird im Darm aufgenommen. In den Lungenbläschen werden Gase ausgetauscht.',
      3: 'Urin bilden die Nieren. In den Lungenbläschen werden Sauerstoff und Kohlenstoffdioxid ausgetauscht.'
    },
    'k3-oberfl': {
      1: 'Die Lunge ist stark gefaltet und braucht wenig Platz. Wichtig ist die grosse Fläche für den Gasaustausch.',
      2: 'Das Gewicht spielt keine Rolle. Je grösser die Fläche, desto mehr Sauerstoff gelangt ins Blut.',
      3: 'Das Aussehen ist unwichtig. Die grosse Oberfläche dient dem Gasaustausch.'
    },
    'k3-kt5': {
      1: 'Die Lunge ist passiv. Sie hat keine eigenen Muskeln.',
      2: 'Der Herzmuskel pumpt Blut. Für die Atmung sorgen Zwerchfell und Zwischenrippenmuskeln.',
      3: 'Die Armmuskeln bewegen die Arme. Sie haben mit der Atmung nichts zu tun.'
    },
    'k4-aufgaben': {
      1: 'Das Blut transportiert auch Sauerstoff, Abfallstoffe und Wärme. Es wehrt zudem Erreger ab.',
      2: 'Abwehr ist nur eine Aufgabe. Das Blut transportiert auch Stoffe und Wärme.',
      3: 'Ohne Blut kommen kein Sauerstoff und keine Nährstoffe zu den Zellen.'
    },
    'k4-rot': {
      1: 'Erreger abwehren ist die Aufgabe der weissen Blutzellen.',
      2: 'Für die Gerinnung sorgen die Blutplättchen.',
      3: 'Rote Blutzellen haben keinen Zellkern. So haben sie mehr Platz für Hämoglobin.'
    },
    'k4-weiss': {
      1: 'Sauerstoff transportieren die roten Blutzellen mit dem Hämoglobin.',
      2: 'Es gibt etwa 1000-mal weniger weisse als rote Blutzellen.',
      3: 'Weisse Blutzellen sind ein Teil des Bluts und wandern von dort ins Gewebe.'
    },
    'k4-kt6': {
      1: 'Arterien führen das Blut vom Herzen weg.',
      2: 'Kapillaren verbinden Arterien und Venen. Zum Herzen zurück führen die Venen.',
      3: 'Bronchien gehören zur Lunge und führen Luft, kein Blut.'
    },
    'k4-plaett': {
      1: 'Das Blut trocknet nicht einfach. Blutplättchen und Fibrin bilden einen Pfropfen, der die Wunde schliesst.',
      2: 'Das Herz schlägt weiter. Die Blutgerinnung schliesst die Wunde.',
      3: 'Die Haut braucht Tage, bis sie zuwächst. Zuerst verschliesst die Blutgerinnung die Wunde.'
    },
    'k4-gefaess': {
      1: 'Die Gefässe sind verschieden gebaut: Arterien haben kräftige Wände, Venen Klappen, Kapillaren dünne Wände.',
      2: 'Die Lungenarterie führt sauerstoffarmes Blut, die Körperarterien sauerstoffreiches. «Immer» stimmt also nicht.',
      3: 'Kapillaren sind die feinsten Gefässe. Ihre dünne Wand ermöglicht den Stoffaustausch.'
    },
    'k4-lauf': {
      1: 'Nieren und Leber werden vom Körperkreislauf versorgt. Einen eigenen Kreislauf haben sie nicht.',
      2: 'Es sind zwei: Der Lungenkreislauf nimmt Sauerstoff auf, der Körperkreislauf versorgt die Zellen.',
      3: 'Magen und Darm gehören zum Körperkreislauf. Die zwei Kreisläufe sind Lungen- und Körperkreislauf.'
    },
    'k4-herz': {
      1: 'Das Herz ist durch eine Scheidewand in eine rechte und eine linke Hälfte getrennt.',
      2: 'Zu jeder Kammer gehört ein Vorhof. Das Herz hat zwei Vorhöfe und zwei Kammern.',
      3: 'Das Herz ist ein Hohlmuskel. Es pumpt das Blut durch die Gefässe.'
    },
    'k5-infarkt': {
      1: 'Ein Herzinfarkt ist nicht dasselbe wie ein Herzstillstand. Meist schlägt das Herz weiter.',
      2: 'Das Blut gefriert nicht. Ein verstopftes Herzkranzgefäss lässt einen Teil des Herzmuskels absterben.',
      3: 'Beim Herzinfarkt ist das Herz betroffen, nicht die Lunge.'
    },
    'k5-thrombose': {
      1: 'Ein Knochenbruch ist eine Fraktur. Eine Thrombose betrifft die Blutgefässe.',
      2: 'Eine Magenentzündung heisst Gastritis. Eine Thrombose ist ein Blutgerinnsel.',
      3: 'Ein Muskelriss ist eine Verletzung des Muskels. Bei der Thrombose verstopft ein Gerinnsel ein Gefäss.'
    },
    'k5-vorbeugen': {
      1: 'Bewegungsmangel und viel Fett gehören zu den Risikofaktoren.',
      2: 'Rauchen schädigt die Gefässe und erhöht das Risiko stark.',
      3: 'Man kann viel tun: Bewegung, ausgewogene Ernährung und nicht rauchen senken das Risiko.'
    },
    'k5-niere': {
      1: 'Das Blut pumpt das Herz. Die Nieren filtern es.',
      2: 'Fett wird im Darm mithilfe der Galle verdaut.',
      3: 'Sauerstoff nimmt die Lunge auf.'
    },
    'k5-leber': {
      1: 'Das Blut pumpt das Herz.',
      2: 'Sauerstoff nimmt die Lunge auf.',
      3: 'Die Leber lagert keine Knochen. Sie macht Gifte unschädlich und bildet Gallenflüssigkeit.'
    },
    'k5-lunge': {
      1: 'Urin bilden die Nieren.',
      2: 'Kot gibt der Darm ab.',
      3: 'Galle bildet die Leber. Sie hilft bei der Verdauung von Fett.'
    },
    'k5-darm': {
      1: 'Sauerstoff nimmt die Lunge auf.',
      2: 'Urin entsteht in den Nieren.',
      3: 'Das Blut filtern die Nieren.'
    },
    'k5-kt3': {
      1: 'Die Leber entgiftet das Blut, Urin bildet sie aber nicht.',
      2: 'Die Lunge gibt Kohlenstoffdioxid ab, keinen Urin.',
      3: 'Der Dickdarm entzieht der Nahrung Wasser und bildet Kot.'
    },
    'k6-befruchtung': {
      1: 'Ohne Spermium entsteht beim Menschen kein Embryo. Für die Befruchtung braucht es beide Zellen.',
      2: 'Zwei Spermien können sich nicht vereinigen. Ein Spermium muss auf eine Eizelle treffen.',
      3: 'Eizelle und Spermium sind verschiedene Zellen. Die eine wird nicht zur anderen.'
    },
    'k6-zyklus': {
      1: 'Die Zyklusdauer ist von Person zu Person verschieden.',
      2: 'Die Hormone Östrogen und Progesteron steuern den Zyklus, auch die Blutung.',
      3: 'Der Eisprung liegt etwa in der Mitte des Zyklus, und der Zyklus wiederholt sich.'
    },
    'k6-kt6': {
      1: 'Vor Infektionen schützt nur das Kondom.',
      2: 'Die Pille wirkt nur, wenn man sie regelmässig nach Plan einnimmt.',
      3: 'Die Pille wirkt erst nach regelmässiger Einnahme zuverlässig.'
    },
    'k6-pille': {
      1: 'Die Pille wirkt nur bei regelmässiger Einnahme nach Plan, nicht vor einem einzelnen Mal.',
      2: 'Vor sexuell übertragbaren Infektionen schützt nur das Kondom.',
      3: 'Die Pille wirkt über den Hormonhaushalt und braucht regelmässige Einnahme.'
    },
    'k6-kondom': {
      1: 'Die Pille verhindert nur eine Schwangerschaft, nicht eine Infektion.',
      2: 'Die Hormonspirale verhindert nur eine Schwangerschaft.',
      3: 'Das Pflaster wirkt mit Hormonen und schützt nicht vor Infektionen.'
    },
    'k6-mythos': {
      1: 'Beim Küssen treffen keine Spermien auf eine Eizelle. Darum entsteht keine Schwangerschaft.',
      2: 'Ohne dass ein Spermium auf eine Eizelle trifft, gibt es keine Schwangerschaft.',
      3: 'Eine Eizelle allein entwickelt sich beim Menschen nicht weiter. Es braucht ein Spermium.'
    },
    'k6-lebens': {
      1: 'Der Preis spielt eine Rolle, entscheidend sind aber Lebenssituation und Bedürfnisse.',
      2: 'Werbung ist keine gute Grundlage. Besser informiert man sich bei Fachstellen.',
      3: 'Jede Methode hat Vor- und Nachteile. Welche passt, ist individuell.'
    },
    'k6-verantw': {
      1: 'Verhütung ist eine gemeinsame Aufgabe beider Partner.',
      2: 'Verhütung geht beide an, nicht nur den Mann.',
      3: 'Beide Partner tragen Verantwortung und sprechen sich ab.'
    },
    'k6-quelle': {
      1: 'In Foren steht oft Falsches. Fachstellen geben geprüfte Informationen.',
      2: 'Freunde wissen oft nicht genau Bescheid. Besser sind Fachstellen und seriöse Seiten.',
      3: 'Es gibt gute Informationen, zum Beispiel bei Fachstellen und Beratungsstellen.'
    }
  },

  aufgaben: [
    { id: 'k1-organ-v2', wieVorlage: 'k1-organ', schwierigkeit: 2,
      ...mc('Mit welchem Organ kann man auch dann leben, wenn man nur noch eines davon hat?', 'Mit einer einzigen Niere.', [
        ['Mit einem halben Herzen.', 'Das Herz braucht beide Hälften: Eine pumpt zur Lunge, die andere in den Körper.'],
        ['Ohne Leber.', 'Ohne Leber kann man nicht leben. Sie entgiftet den Körper.'],
        ['Ohne Gehirn.', 'Das Gehirn steuert den ganzen Körper. Ohne Gehirn ist kein Leben möglich.']],
        'Der Mensch hat zwei Nieren. Eine einzige kann die Arbeit allein schaffen. Darum kann man eine Niere spenden.') },

    { id: 'k1-versuch-v2', wieVorlage: 'k1-versuch', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne die Behandlung des Knochens dem Ergebnis zu.',
      paare: [['in Essig einlegen', 'Kristalle lösen sich, der Knochen wird biegsam'], ['ausbrennen', 'Proteine werden zerstört, der Knochen wird brüchig']],
      erklaerung: 'Knochen bestehen aus harten Kristallen und elastischen Proteinen. Essig löst die Kristalle, Feuer zerstört die Proteine.' },

    { id: 'k2-nachweis-v2', wieVorlage: 'k2-nachweis', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Beobachtung dem Gas zu.',
      paare: [['Ein glimmender Span flammt auf.', 'Sauerstoff'], ['Kalkwasser wird trüb.', 'Kohlenstoffdioxid'], ['Eine Kerzenflamme erlischt.', 'Kohlenstoffdioxid (kein Sauerstoff)']],
      erklaerung: 'Sauerstoff weist man mit der Glimmspanprobe nach, Kohlenstoffdioxid mit Kalkwasser. In Kohlenstoffdioxid erlischt eine Flamme.' },

    { id: 'k2-abgabe-v2', wieVorlage: 'k2-abgabe', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne jedem Beispiel den Stoffwechselvorgang zu.',
      paare: [['Einatmen', 'Aufnahme'], ['Das Blut bringt Sauerstoff zu den Zellen.', 'Transport'], ['Die Zellen bauen Nährstoffe um.', 'Umwandlung'], ['Ausatmen von Kohlenstoffdioxid', 'Abgabe']],
      erklaerung: 'Aufnahme, Transport, Umwandlung und Abgabe laufen in dieser Reihenfolge ab.' },

    { id: 'k3-weg-v2', wieVorlage: 'k3-weg', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe die Stationen auf dem Weg der Luft in die richtige Reihenfolge.',
      elemente: ['Nase oder Mund', 'Rachenraum', 'Kehlkopf', 'Luftröhre', 'Bronchien', 'Lungenbläschen'],
      erklaerung: 'Nase oder Mund → Rachenraum → Kehlkopf → Luftröhre → Bronchien → Lungenbläschen.' },

    { id: 'k3-bewegung-v2', wieVorlage: 'k3-bewegung', schwierigkeit: 3,
      ...mc('Was geschieht beim Einatmen?', 'Das Zwerchfell zieht sich zusammen und flacht ab. Der Brustraum wird grösser, Luft strömt ein.', [
        ['Das Zwerchfell wölbt sich nach oben, und der Brustraum wird kleiner.', 'Das passiert beim Ausatmen. Dann wird die Luft hinausgedrückt.'],
        ['Die Lunge zieht sich zusammen und saugt Luft an.', 'Die Lunge hat keine Muskeln. Sie folgt dem Brustraum.'],
        ['Der Magen drückt Luft in die Lunge.', 'Der Magen hat mit der Atmung nichts zu tun.']],
        'Beim Einatmen vergrössern Zwerchfell und Zwischenrippenmuskeln den Brustraum. Die Lunge dehnt sich mit, und Luft strömt ein.') },

    { id: 'k3-faktor-v2', wieVorlage: 'k3-faktor', schwierigkeit: 3,
      erzeuge: () => {
        const klein = zufall([0.5, 1, 2, 4, 5]), gross = zufall([50, 100]);
        return zahl(`Ein Modell A hat eine Oberfläche von ${z(klein)} m², ein stark gefaltetes Modell B mit demselben Volumen ${z(gross)} m². Wie viel Mal grösser ist die Oberfläche von B?`,
          gross / klein, '-mal', `${z(gross)} m² : ${z(klein)} m² = ${z(gross / klein)}. Faltung vergrössert die Oberfläche, ohne mehr Platz zu brauchen.`, 'Teile die grössere Fläche durch die kleinere.');
      } },

    { id: 'k4-plaett-v2', wieVorlage: 'k4-plaett', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Aufgabe dem Bestandteil des Bluts zu.',
      paare: [['rote Blutzellen', 'Sauerstoff transportieren'], ['weisse Blutzellen', 'Krankheitserreger abwehren'], ['Blutplättchen', 'Wunden verschliessen'], ['Blutplasma', 'Nährstoffe und Wärme transportieren']],
      erklaerung: 'Jeder Bestandteil hat eine Hauptaufgabe. Das Plasma ist der flüssige Teil und besteht hauptsächlich aus Wasser.' },

    { id: 'k4-gefaess-v2', wieVorlage: 'k4-gefaess', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Beschreibung dem Blutgefäss zu.',
      paare: [['führt vom Herzen weg, kräftige Wand', 'Arterie'], ['führt zum Herzen, hat Klappen', 'Vene'], ['sehr dünn, Stoffaustausch', 'Kapillare']],
      erklaerung: 'Arterien führen vom Herzen weg, Venen zum Herzen. Die Kapillaren verbinden beide.' },

    { id: 'k4-lauf-v2', wieVorlage: 'k4-lauf', typ: 'luecke', schwierigkeit: 2,
      text: 'Im ___ nimmt das Blut Sauerstoff auf. Im ___ gibt es den Sauerstoff an die Zellen ab.',
      luecken: [['Lungenkreislauf'], ['Körperkreislauf']],
      erklaerung: 'Lungenkreislauf: Herz → Lunge → Herz. Körperkreislauf: Herz → Körper → Herz.' },

    { id: 'k4-herz-v2', wieVorlage: 'k4-herz', typ: 'reihenfolge', schwierigkeit: 3,
      text: 'Verfolge das Blut ab dem Körper. Bringe die Stationen in die richtige Reihenfolge.',
      elemente: ['Körpervenen', 'rechter Vorhof', 'rechte Kammer', 'Lunge', 'linker Vorhof', 'linke Kammer', 'Körperarterie'],
      erklaerung: 'Die rechte Herzhälfte pumpt das Blut zur Lunge, die linke in den Körper.' },

    { id: 'k6-befruchtung-v2', wieVorlage: 'k6-befruchtung', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne zu: Wo entsteht oder geschieht was?',
      paare: [['Eizellen', 'Eierstöcke'], ['Spermien', 'Hoden'], ['Weg der Eizelle zur Gebärmutter', 'Eileiter']],
      erklaerung: 'Eizellen reifen in den Eierstöcken, Spermien entstehen in den Hoden. Die Eizelle wandert durch den Eileiter.' },

    { id: 'k6-zyklus-v2', wieVorlage: 'k6-zyklus', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe die Vorgänge im Zyklus ohne Befruchtung in die richtige Reihenfolge.',
      elemente: ['Die Gebärmutterschleimhaut baut sich auf.', 'Eisprung', 'Die Eizelle wird nicht befruchtet.', 'Die Schleimhaut wird abgestossen (Menstruation).'],
      erklaerung: 'Ohne Befruchtung wird die aufgebaute Schleimhaut abgestossen. Dann beginnt ein neuer Zyklus.' },

    { id: 'k6-pille-v2', wieVorlage: 'k6-pille', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Aussage dem Verhütungsmittel zu.',
      paare: [['schützt auch vor Infektionen', 'Kondom'], ['verhindert mit Hormonen den Eisprung, Einnahme nach Plan', 'Pille'], ['Notfallmittel, keine regelmässige Verhütung', '«Pille danach»']],
      erklaerung: 'Nur das Kondom schützt zusätzlich vor sexuell übertragbaren Infektionen. Die «Pille danach» ist ein Notfallmittel.' }
  ]
};
