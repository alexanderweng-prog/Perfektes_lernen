// Ergänzungen zum Paket «Optische Phänomene erkunden» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'o1-sehen': {
      1: 'Das Auge sendet kein Licht aus. Es empfängt Licht.',
      2: 'Auch ruhende Gegenstände siehst du, wenn sie Licht reflektieren.',
      3: 'Im Dunkeln fehlt das Licht. Dann siehst du nicht leuchtende Gegenstände nicht.'
    },
    'o1-quelle': {
      1: 'Umgekehrt: Die Sonne leuchtet selbst, der Baum reflektiert.',
      2: 'Ein Baum leuchtet nicht selbst, sonst sähe man ihn auch nachts.',
      3: 'Die Sonne ist eine Lichtquelle. Sie sendet selbst Licht aus.'
    },
    'o1-gerade': {
      1: 'Licht breitet sich geradlinig aus. Darum entstehen scharfe Schatten.',
      2: 'Die Sonne leuchtet weiter. Der Mond schiebt sich nur davor.',
      3: 'Die Erde dreht sich gleichmässig. Der Mond wirft seinen Schatten auf die Erde.'
    },
    'o1-fisch': {
      1: 'Der Fisch ist nicht dort, wo er erscheint. Er liegt tiefer.',
      2: 'Umgekehrt: Der Fisch erscheint angehoben, er liegt also tiefer.',
      3: 'Die Brechung verschiebt den scheinbaren Ort. Darum spielt es eine Rolle.'
    },
    'o1-kt4': {
      1: 'Ein Baum ist keine Lichtquelle.',
      2: 'Das Auge sendet keine Strahlen aus. Es empfängt Licht.',
      3: 'Im Dunkeln siehst du den Baum gerade nicht.'
    },
    'o1-linsen': {
      1: 'Umgekehrt: Konvexe Linsen sammeln, konkave streuen.',
      2: 'Linsen brechen das Licht und ändern so seine Richtung.',
      3: 'Linsen lassen das Licht durch und lenken es nur um.'
    },
    'o1-taeuschung': {
      1: 'Die Augen funktionieren richtig. Die Täuschung entsteht im Gehirn.',
      2: 'Mit dem Massstab siehst du, dass sie wirklich parallel sind.',
      3: 'Der Massstab zeigt die Wirklichkeit. Getäuscht wird die Wahrnehmung.'
    },
    'o2-gesetz': {
      1: 'Beide Winkel sind gleich gross, nicht doppelt.',
      2: 'Der Einfallswinkel kann jeden Wert zwischen 0° und 90° haben.',
      3: 'Nur bei senkrechtem Einfall geht der Strahl senkrecht zurück.'
    },
    'o2-virtuell': {
      1: 'Ein Bild auf einem Schirm wäre ein reelles Bild.',
      2: 'Ein virtuelles Bild kann man gerade nicht berühren.',
      3: 'Spiegelbilder entstehen bei Licht, nicht im Dunkeln.'
    },
    'o2-krumm': {
      1: 'Umgekehrt: Der Wölbspiegel streut, der Hohlspiegel sammelt.',
      2: 'Beide sind gekrümmt. Ein ebener Spiegel ist flach.',
      3: 'Spiegel werfen das Licht zurück, sie verschlucken es nicht.'
    },
    'o2-kt5': {
      1: '2 m ist der Abstand zum Spiegel. Das Bild steht noch einmal 2 m dahinter.',
      2: 'Das Bild steht gleich weit hinter dem Spiegel wie du davor.',
      3: 'Das Bild liegt hinter dem Spiegel, nicht bei dir.'
    },
    'o3-dicht': {
      1: 'Vom Lot weg wird der Strahl beim Übergang von Wasser in Luft gebrochen.',
      2: 'Nur bei senkrechtem Einfall bleibt die Richtung gleich.',
      3: 'Totalreflexion gibt es nur beim Übergang vom dichteren in den dünneren Stoff.'
    },
    'o3-weg': {
      1: 'Zum Lot hin wird der Strahl beim Übergang von Luft in Wasser gebrochen.',
      2: 'Bei schrägem Einfall wird der Strahl gebrochen.',
      3: 'Der Strahl wird gebrochen, nicht zu einem Spiegel.'
    },
    'o3-senkrecht': {
      1: 'Bei senkrechtem Einfall gibt es keine Richtungsänderung.',
      2: 'Totalreflexion braucht einen grossen Einfallswinkel, nicht 0°.',
      3: 'Das Licht läuft weiter, es verschwindet nicht.'
    },
    'o3-hebung': {
      1: 'Das Wasser drückt den Boden nicht hoch. Es ist eine optische Täuschung.',
      2: 'Der Boden ist so tief wie vorher. Er erscheint nur höher.',
      3: 'Das Auge vergrössert nicht. Die Brechung verschiebt den scheinbaren Ort.'
    },
    'o3-speer': {
      1: 'Der Fisch erscheint höher, als er ist. Sie muss tiefer zielen.',
      2: 'Die Jahreszeit spielt keine Rolle. Die Brechung gilt immer.',
      3: 'Durch die Brechung gibt es einen Unterschied zwischen scheinbarem und wirklichem Ort.'
    },
    'o3-kt4': {
      1: 'Beim Übergang in den dichteren Stoff wird der Winkel kleiner.',
      2: 'Nur bei senkrechtem Einfall sind beide gleich.',
      3: 'Der Brechungswinkel ist kleiner als der Einfallswinkel.'
    },
    'o4-total': {
      1: 'Bei Totalreflexion wird das Licht zurückgeworfen, nicht verschluckt.',
      2: 'Bei der Totalreflexion wird das ganze Licht reflektiert. Nichts geht durch.',
      3: 'Das Licht ändert seine Richtung: Es wird vollständig zurückgeworfen.'
    },
    'o4-muenze': {
      1: 'Die Münze löst sich nicht auf. Ihr Licht kommt nur nicht zu deinem Auge.',
      2: 'Das Glas ist durchsichtig. Das Licht wird an der Grenzfläche zurückgeworfen.',
      3: 'Die Temperatur spielt keine Rolle.'
    },
    'o4-richtung': {
      1: 'In diese Richtung wird der Strahl zum Lot hin gebrochen. Dann gibt es immer einen gebrochenen Strahl.',
      2: 'Totalreflexion braucht einen Mindestwinkel.',
      3: 'Bei senkrechtem Einfall gibt es keine Totalreflexion.'
    },
    'o4-glas': {
      1: 'Die Glasfaser ist voll. Das Licht läuft im Glaskern.',
      2: 'Das Licht wird zurückgeworfen, nicht neu erzeugt.',
      3: 'Licht fliesst nicht. Es wird immer wieder total reflektiert.'
    },
    'o4-fata': {
      1: 'Wenn du näher kommst, ist die Pfütze weg. Es ist ein Spiegelbild des Himmels.',
      2: 'Die Strasse ist keine Lichtquelle.',
      3: 'Die Pfütze hat eine physikalische Ursache: die Totalreflexion in heisser Luft.'
    },
    'o4-diamant': {
      1: 'Ein Diamant leuchtet nicht selbst. Er lenkt Licht um.',
      2: 'Die Farben kommen aus dem weissen Licht, nicht aus Farbe.',
      3: 'Im Dunkeln funkelt ein Diamant nicht. Er braucht Licht.'
    },
    'o4-kt4': {
      1: 'Von Luft in Wasser wird der Strahl zum Lot hin gebrochen. Totalreflexion ist dann unmöglich.',
      2: 'Bei senkrechtem Einfall gibt es keine Totalreflexion.',
      3: 'Totalreflexion gibt es, zum Beispiel in Glasfasern.'
    },
    'o5-brenn': {
      1: 'Der Brennpunkt liegt ausserhalb der Linse, dort wo sich die Strahlen treffen.',
      2: 'Die Brennweite ist der Abstand zum Brennpunkt, nicht der Durchmesser.',
      3: 'Brennpunkt und Brennweite sind ein Punkt und ein Abstand.'
    },
    'o5-lupe': {
      1: 'Eine Lupe ist eine konvexe Linse. Konkave Linsen verkleinern.',
      2: 'Der Gegenstand muss nah sein, innerhalb der Brennweite.',
      3: 'Eine Lupe vergrössert, wenn der Gegenstand nah genug ist.'
    },
    'o5-abbild': {
      1: 'Vergrössert und aufrecht ist das Bild bei der Lupe, wenn der Gegenstand nahe ist.',
      2: 'Gleich gross ist das Bild nur bei doppelter Brennweite.',
      3: 'Auf einem Schirm entsteht ein scharfes, umgekehrtes Bild.'
    },
    'o5-kamera': {
      1: 'Eine Kamera braucht ein Objektiv mit Linsen.',
      2: 'Der Bildschirm zeigt das Bild nur an. Entscheidend sind Objektiv und Sensor.',
      3: 'Die Blende regelt die Lichtmenge. Gespeichert wird im Speichermedium.'
    },
    'o5-auge': {
      1: 'Die Netzhaut entspricht dem Bildsensor, die Pupille der Blende.',
      2: 'Auge und Kamera bilden beide mit einer Linse ab.',
      3: 'Das Auge hat eine Linse hinter der Pupille.'
    },
    'o5-geraet': {
      1: 'Die meisten dieser Geräte arbeiten mit Linsen.',
      2: 'Ohne Licht gibt es kein Bild.',
      3: 'Eine Lupe oder ein einfaches Fernrohr braucht keinen Strom.'
    },
    'o5-kt4': {
      1: 'Wie weit die Kamera scharf sieht, hängt vom Objektiv ab, nicht von der Blende.',
      2: 'Die Farben erfasst der Bildsensor.',
      3: 'Wie viele Bilder gespeichert werden, hängt vom Speicher ab.'
    },
    'o6-add': {
      1: 'Magenta entsteht aus Rot und Blau.',
      2: 'Cyan entsteht aus Grün und Blau.',
      3: 'Für Weiss braucht es alle drei: Rot, Grün und Blau.'
    },
    'o6-weiss': {
      1: 'Umgekehrt: Bei starker Anregung aller Zapfen siehst du Weiss.',
      2: 'Rot und Grün ergeben Gelb. Für Weiss braucht es noch Blau.',
      3: 'Weiss und Schwarz entstehen im Auge: alle Zapfen oder keiner angeregt.'
    },
    'o6-rgb': {
      1: 'Das sind die Farben beim Drucken. Ein Bildschirm leuchtet in Rot, Grün und Blau.',
      2: 'Ein Prisma zerlegt Licht. Ein Bildschirm mischt Licht.',
      3: 'Die Pixel leuchten selbst. Sie sind nicht gemalt.'
    },
    'o6-prisma': {
      1: 'Rot wird am wenigsten gebrochen, Blau am stärksten.',
      2: 'Wenn alle gleich gebrochen würden, entstünde kein Spektrum.',
      3: 'Das Prisma färbt nicht. Die Farben stecken schon im weissen Licht.'
    },
    'o6-kt4': {
      1: 'Gelb entsteht aus Rot und Grün.',
      2: 'Magenta entsteht aus Rot und Blau.',
      3: 'Für Weiss braucht es noch Rot dazu.'
    },
    'o6-zapfen': {
      1: 'Es gibt drei Zapfenarten, je für Rot, Grün und Blau.',
      2: 'Drei Zapfenarten genügen. Alle anderen Farben entstehen durch Mischen.',
      3: 'Auch der Mensch hat Zapfen in der Netzhaut.'
    },
    'o6-stoerung': {
      1: 'Nur Schwarzweiss zu sehen ist sehr selten. Meist fehlt nur eine Zapfenart.',
      2: 'Die Netzhaut ist vorhanden. Es fehlt eine Zapfenart.',
      3: 'Das Gehirn arbeitet normal. Die Ursache liegt in den Zapfen.'
    }
  },

  aufgaben: [
    { id: 'o2-gesetz-v2', wieVorlage: 'o2-gesetz', schwierigkeit: 3,
      erzeuge: () => {
        const a = zufall([20, 25, 30, 35, 50, 55, 60, 70]);
        return zahl(`Ein Lichtstrahl trifft unter ${a}° zur Spiegeloberfläche auf (Winkel zwischen Strahl und Spiegel). Wie gross ist der Reflexionswinkel α' zum Lot?`,
          90 - a, '°', `Einfallswinkel zum Lot: 90° − ${a}° = ${90 - a}°. Reflexionswinkel = Einfallswinkel = ${90 - a}°.`, 'Die Winkel misst man zum Lot, nicht zum Spiegel.');
      } },

    { id: 'o2-abstand-v2', wieVorlage: 'o2-abstand', schwierigkeit: 2,
      erzeuge: () => {
        const d = zufall([0.5, 1.5, 2, 2.5, 3, 4]);
        return zahl(`Eine Katze sitzt ${z(d)} m vor einem Spiegel. Wie weit ist sie von ihrem Spiegelbild entfernt?`, 2 * d, 'm',
          `Das Bild steht ${z(d)} m hinter dem Spiegel. ${z(d)} m + ${z(d)} m = ${z(2 * d)} m.`, 'Das Bild steht gleich weit hinter dem Spiegel wie die Katze davor.');
      } },

    { id: 'o2-virtuell-v2', wieVorlage: 'o2-virtuell', schwierigkeit: 2,
      ...mc('Du hebst vor dem Spiegel die rechte Hand. Welche Hand hebt dein Spiegelbild?', 'Die Hand auf derselben Seite, sie wirkt wie die linke.', [
        ['Die Hand auf der anderen Seite.', 'Der Spiegel vertauscht vorne und hinten, nicht links und rechts.'],
        ['Gar keine.', 'Das Spiegelbild macht jede Bewegung mit.'],
        ['Beide Hände.', 'Das Spiegelbild bewegt nur eine Hand, die auf derselben Seite.']],
        'Jeder Punkt wird geradeaus hinter den Spiegel abgebildet. Darum wirkt die rechte Hand im Bild wie eine linke.') },

    { id: 'o4-richtung-v2', wieVorlage: 'o4-richtung', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ist Totalreflexion möglich?',
      paare: [['Luft → Wasser, grosser Winkel', 'nein'], ['Wasser → Luft, grosser Winkel', 'ja'], ['Wasser → Luft, senkrecht', 'nein']],
      erklaerung: 'Totalreflexion braucht den Übergang vom dichteren in den dünneren Stoff und einen grossen Einfallswinkel.' },

    { id: 'o4-glas-v2', wieVorlage: 'o4-glas', schwierigkeit: 2,
      ...mc('Wofür nutzt man Glasfasern?', 'Für schnelles Internet und um in der Medizin ins Körperinnere zu leuchten.', [
        ['Um Fenster durchsichtig zu machen.', 'Fenster brauchen keine Totalreflexion.'],
        ['Um Strom zu leiten.', 'Glas leitet keinen Strom. Glasfasern leiten Licht.'],
        ['Um Wasser zu filtern.', 'Glasfasern leiten Licht, sie filtern nichts.']],
        'Mit Lichtsignalen in Glasfasern lassen sich grosse Datenmengen übertragen.') },

    { id: 'o5-abbild-v2', wieVorlage: 'o5-abbild', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Wo steht der Gegenstand vor der konvexen Linse?',
      paare: [['weit weg, mehr als doppelte Brennweite', 'verkleinertes, umgekehrtes Bild'], ['zwischen einfacher und doppelter Brennweite', 'vergrössertes, umgekehrtes Bild'], ['innerhalb der Brennweite', 'vergrössertes, aufrechtes virtuelles Bild (Lupe)']],
      erklaerung: 'Die Bildart hängt davon ab, wie weit der Gegenstand von der Linse entfernt ist.' }
  ]
};
