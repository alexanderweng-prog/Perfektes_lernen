// Fragen zu den Naturalia-Simulationen («Simulation mit Frage»), nur im freiwilligen Zusatzblock.
// Von Claude erstellt, Entwurf bis zur Freigabe im Dashboard. Das Feld simulation nennt die Simulation des Pakets.
import { mc } from './hilfen.js';

const S = (simulation, schwierigkeit, frage, richtig, falsche, erklaerung) =>
  ({ id: 'sim-' + simulation, simulation, schwierigkeit, ...mc('Probiere die Simulation aus. ' + frage, richtig, falsche, erklaerung) });

export default {
  leistung: [
    S('hub', 2, 'Du verdoppelst die Masse, die Höhe bleibt gleich. Was passiert mit der Arbeit?', 'Sie wird doppelt so gross.', [
      ['Sie bleibt gleich.', 'W = m · g · h: Wird m doppelt so gross, wird auch W doppelt so gross.'],
      ['Sie wird viermal so gross.', 'Viermal so gross würde sie nur, wenn Masse und Höhe verdoppelt würden.'],
      ['Sie wird halbiert.', 'Mehr Masse braucht mehr Arbeit, nicht weniger.']],
      'Die Hubarbeit ist proportional zur Masse und zur Höhe.'),
    S('ramp', 3, 'Vergleiche die 2-m-Strecke (senkrecht) mit der 8-m-Rampe. Was bleibt gleich?', 'Die Arbeit (800 J).', [
      ['Die Kraft.', 'Die Kraft sinkt bei der langen Rampe auf einen Viertel.'],
      ['Der Weg.', 'Der Weg wird viermal so lang.'],
      ['Nichts bleibt gleich.', 'Die Arbeit bleibt immer 800 J, das ist die Goldene Regel.']],
      'Was du an Kraft sparst, musst du an Weg zugeben. Die Arbeit bleibt gleich.'),
    S('runner', 2, 'Stelle für Anna 10 s und für Ben 20 s ein. Was stellst du fest?', 'Beide verrichten 1800 J, Anna hat die doppelte Leistung.', [
      ['Anna verrichtet mehr Arbeit.', 'Gleiche Masse und gleiche Höhe ergeben gleich viel Arbeit.'],
      ['Ben hat die grössere Leistung, weil er länger läuft.', 'Mehr Zeit für dieselbe Arbeit bedeutet weniger Leistung.'],
      ['Beide haben dieselbe Leistung.', 'Die Zeiten sind verschieden, also auch die Leistung.']],
      'P = W : t. Anna braucht die halbe Zeit, also hat sie die doppelte Leistung.'),
    S('scale', 2, 'Etwa wie viele Male mehr Leistung als ein Mensch (200 W) hat ein Föhn?', 'Etwa 9-mal so viel.', [
      ['Etwa gleich viel.', 'Ein Föhn hat rund 1800 W, ein Mensch kurzzeitig rund 200 W.'],
      ['Etwa 100-mal so viel.', 'Das wäre ein Automotor in der Grössenordnung. Der Föhn liegt bei rund 1800 W.'],
      ['Weniger als ein Mensch.', 'Der Föhn leistet deutlich mehr als ein Mensch.']],
      '1800 W : 200 W = 9. Die Skala ist gestaucht, darum wirken die Balken ähnlicher, als sie sind.'),
    S('convert', 2, 'Stelle 1 kW ein. Wie viele Watt sind das?', '1000 W', [
      ['100 W', 'Kilo heisst Tausend, nicht Hundert.'],
      ['10 W', 'Kilo heisst Tausend.'],
      ['735 W', '735 W entsprechen etwa 1 PS, nicht 1 kW.']],
      '1 kW = 1000 W. 1 PS ist etwa 735 W.'),
    S('pui', 3, 'Verdopple die Spannung und halbiere die Stromstärke. Was passiert mit der Leistung?', 'Sie bleibt gleich.', [
      ['Sie wird doppelt so gross.', 'Die Stromstärke wird gleichzeitig halbiert. Die Fläche U · I bleibt gleich.'],
      ['Sie wird halbiert.', 'Die Spannung wird gleichzeitig verdoppelt. Das gleicht sich aus.'],
      ['Sie wird viermal so gross.', 'Viermal so gross würde P nur, wenn U und I beide verdoppelt würden.']],
      'P = U · I. Doppelt mal halb ergibt dasselbe Produkt: Die Rechteckfläche bleibt gleich.'),
    S('meter', 3, 'Stelle 1000 W und 2 h ein. Was zeigt der Zähler?', '2 kWh', [
      ['2000 kWh', 'Zuerst W in kW umrechnen: 1000 W = 1 kW. 1 kW · 2 h = 2 kWh.'],
      ['0,5 kWh', 'Leistung und Zeit werden multipliziert, nicht geteilt.'],
      ['1000 kWh', 'Watt muss durch 1000 geteilt werden, um kW zu erhalten.']],
      'E = P · t = 1 kW · 2 h = 2 kWh.'),
    S('vergleich', 3, 'Lass den Föhn 5 Minuten und den Laptop 3 Stunden laufen. Wer braucht mehr Energie?', 'Der Laptop.', [
      ['Der Föhn, weil er mehr Leistung hat.', 'Der Föhn läuft nur kurz: 1,8 kW · 1/12 h = 0,15 kWh. Der Laptop kommt auf 0,18 kWh.'],
      ['Beide gleich viel.', '0,15 kWh und 0,18 kWh sind nicht gleich.'],
      ['Das lässt sich nicht vergleichen.', 'Mit E = P · t lassen sich beide vergleichen.']],
      'Viel Leistung heisst nicht automatisch viel Energie. Es kommt auch auf die Zeit an.'),
    S('eta', 2, 'Stelle 25 % ein. Wie viele Joule von 100 J werden zu Wärme (Verlust)?', '75 J', [
      ['25 J', '25 J sind die Nutzenergie. Der Rest ist Verlust.'],
      ['100 J', 'Nur der Teil, der nicht genutzt wird, ist Verlust.'],
      ['125 J', 'Mehr als 100 J kann nicht herauskommen.']],
      'Von 100 J werden 25 J genutzt, 75 J werden zu Wärme. Zusammen bleibt es 100 J.')
  ],

  motor: [
    S('magnet', 2, 'Was passiert, wenn du den Eisenkern entfernst?', 'Der Magnet wird deutlich schwächer.', [
      ['Der Magnet wird stärker.', 'Der Eisenkern verstärkt das Magnetfeld. Ohne ihn wird es schwächer.'],
      ['Nichts ändert sich.', 'Der Kern hat einen grossen Einfluss auf die Stärke.'],
      ['Der Magnet wirkt gar nicht mehr.', 'Auch ohne Kern erzeugt die stromdurchflossene Spule ein Magnetfeld, nur schwächer.']],
      'Windungen, Stromstärke und Eisenkern bestimmen die Stärke eines Elektromagneten.'),
    S('motor', 2, 'Stelle 0 V ein. Was macht der Motor?', 'Er steht still.', [
      ['Er dreht langsam weiter.', 'Ohne Spannung fliesst kein Strom, also gibt es keine Kraft.'],
      ['Er dreht rückwärts.', 'Rückwärts dreht er nur bei vertauschter Polung und Spannung.'],
      ['Er dreht mit voller Drehzahl.', 'Die Drehzahl hängt von der Spannung ab. Bei 0 V ist sie 0.']],
      'Die Leerlaufdrehzahl ist proportional zur Spannung: 500 U/min pro Volt.'),
    S('generator', 2, 'Kurble schneller. Was passiert mit der Lampe?', 'Sie leuchtet heller, weil die Spannung steigt.', [
      ['Sie wird dunkler.', 'Schneller kurbeln heisst schnellere Änderung des Magnetfelds und mehr Spannung.'],
      ['Nichts ändert sich.', 'Die Spannung hängt von der Drehzahl ab.'],
      ['Sie geht aus.', 'Aus geht sie nur, wenn du aufhörst zu kurbeln.']],
      'Die Spannung eines Generators steigt mit der Drehzahl.'),
    S('motorflow', 3, 'Stelle den Wirkungsgrad auf 50 %. Was gilt für die Wärme?', 'Sie ist gleich gross wie die abgegebene Leistung.', [
      ['Es entsteht keine Wärme.', 'Bei 50 % wird die Hälfte der aufgenommenen Leistung zu Wärme.'],
      ['Die Wärme ist grösser als die aufgenommene Leistung.', 'Der Verlust kann nie grösser sein als das, was hineingeht.'],
      ['Die Wärme ist doppelt so gross wie die abgegebene Leistung.', 'Bei 50 % sind Nutzleistung und Verlust gleich gross.']],
      'Aufgenommen = abgegeben + Wärme. Bei 50 % teilt sich die Leistung je zur Hälfte auf.'),
    S('gear', 3, 'Das treibende Rad hat 10 Zähne, das angetriebene 40. Wie schnell dreht das angetriebene Rad im Vergleich?', 'Viermal langsamer.', [
      ['Viermal schneller.', 'Das grosse Rad braucht mehr Zähne pro Umdrehung, darum dreht es langsamer.'],
      ['Gleich schnell.', 'Verschiedene Zähnezahlen ergeben verschiedene Drehzahlen.'],
      ['Doppelt so langsam.', '40 : 10 = 4, also viermal langsamer.']],
      'Die Drehzahlen verhalten sich umgekehrt wie die Zähnezahlen: 40 : 10 = 4.'),
    S('runtime', 3, 'Verdopple die Motorleistung. Was passiert mit der Laufzeit?', 'Sie wird halbiert.', [
      ['Sie wird verdoppelt.', 'Mehr Leistung braucht die Energie schneller auf.'],
      ['Sie bleibt gleich.', 'Die Energie im Akku bleibt gleich, wird aber schneller umgewandelt.'],
      ['Sie wird viermal kürzer.', 'Doppelte Leistung ergibt halbe, nicht viertel Laufzeit.']],
      'Laufzeit = gespeicherte Energie : Leistung.')
  ],

  'nt7-1': [
    S('gebiete', 1, 'Zu welchem Gebiet gehört «Ein Regenbogen entsteht»?', 'Physik', [
      ['Biologie', 'Ein Regenbogen hat nichts mit Lebewesen zu tun.'],
      ['Chemie', 'Es entstehen keine neuen Stoffe. Licht wird nur gebrochen.'],
      ['Gar nicht zu den Naturwissenschaften', 'Die Lichtbrechung lässt sich beobachten und messen. Das ist Naturwissenschaft.']],
      'Die Brechung von Licht ist ein Thema der Physik.'),
    S('draht', 2, 'Welcher Draht wird im Modell am wärmsten?', 'Der kürzeste (10 cm).', [
      ['Der längste (100 cm).', 'Der lange Draht wird am wenigsten warm.'],
      ['Alle gleich warm.', 'Die Länge hat einen deutlichen Einfluss.'],
      ['Der mittellange (50 cm).', 'Je kürzer, desto wärmer: Der kürzeste wird am wärmsten.']],
      'Bei gleicher Batterie und gleicher Dicke wird ein kurzer Draht wärmer als ein langer.'),
    S('mikro', 2, 'Wähle Okular 10x und Objektiv 40x. Wie lang erscheint die 0,05 mm lange Zelle im Bild?', '20 mm', [
      ['2 mm', 'Gesamtvergrösserung 400-fach: 0,05 mm · 400 = 20 mm.'],
      ['50 mm', 'Rechne 0,05 mm · 400.'],
      ['0,05 mm', 'Das ist die wirkliche Grösse, nicht die Bildgrösse.']],
      'Gesamtvergrösserung 10 · 40 = 400. Bildgrösse = 0,05 mm · 400 = 20 mm.'),
    S('zelle', 2, 'Schalte bei der Wasserpest das Licht ein. Was ändert sich?', 'Die Blattgrünkörner bewegen sich schneller.', [
      ['Die Zellen werden grösser.', 'Licht verändert die Grösse der Zellen nicht, aber die Plasmaströmung.'],
      ['Die Blattgrünkörner bleiben stehen.', 'Licht regt die Bewegung an.'],
      ['Die Zellen werden rot.', 'Rot sind die Zwiebelhautzellen. Wasserpest bleibt grün.']],
      'Licht regt die Plasmaströmung an. Dabei werden die Blattgrünkörner mitbewegt.'),
    S('keimung', 2, 'Schiebe auf Tag 5. In welchem Schälchen ist die Kresse am grössten?', 'Im Schälchen ohne Salz.', [
      ['Im Schälchen mit viel Salz.', 'Salz hemmt das Wachstum der Kresse.'],
      ['In allen gleich gross.', 'Die Schälchen unterscheiden sich deutlich.'],
      ['Im Schälchen mit wenig Salz.', 'Auch wenig Salz hemmt etwas. Am besten wächst sie ohne Salz.']],
      'Das Schälchen ohne Salz ist die Kontrolle. Im Vergleich sieht man, dass Salz schadet.')
  ],

  'nt7-3': [
    S('sinne', 1, 'Welches Sinnesorgan nimmt den Duft von frischem Popcorn wahr?', 'Die Nase.', [
      ['Die Zunge.', 'Die Zunge schmeckt. Düfte nimmt die Nase wahr.'],
      ['Die Haut.', 'Die Haut nimmt Druck, Wärme und Schmerz wahr, keine Düfte.'],
      ['Das Ohr.', 'Das Ohr nimmt Schall wahr.']],
      'Düfte werden mit dem Geruchssinn in der Nase wahrgenommen.'),
    S('reflex', 2, 'Wie ordnest du «Bei Staub schliesst sich das Augenlid» ein?', 'Reflex.', [
      ['Bewusste Reaktion.', 'Das Lid schliesst sich, bevor du darüber nachdenkst.'],
      ['Gelernte Reaktion.', 'Der Lidschlussreflex ist angeboren.'],
      ['Gar keine Reaktion.', 'Der Staub ist ein Reiz, das Schliessen die Reaktion.']],
      'Der Lidschluss ist ein angeborener Schutzreflex.'),
    S('schall', 2, 'Mach den Ton lauter. Was ändert sich bei den Luftteilchen?', 'Sie schwingen weiter hin und her.', [
      ['Sie fliegen schneller zum Ohr.', 'Die Teilchen wandern nicht zum Ohr. Sie schwingen nur hin und her.'],
      ['Die Verdichtungen liegen näher beieinander.', 'Das passiert bei einem höheren Ton, nicht bei einem lauteren.'],
      ['Sie hören auf zu schwingen.', 'Lauter heisst stärkere Schwingung.']],
      'Lautstärke: wie weit die Teilchen schwingen. Tonhöhe: wie dicht die Verdichtungen aufeinander folgen.'),
    S('ohr', 2, 'Welcher Teil kommt direkt nach dem Trommelfell?', 'Die Gehörknöchelchen.', [
      ['Die Hörschnecke.', 'Die Hörschnecke kommt erst nach den Gehörknöchelchen.'],
      ['Der Gehörgang.', 'Der Gehörgang liegt vor dem Trommelfell.'],
      ['Die Ohrmuschel.', 'Die Ohrmuschel ist ganz aussen.']],
      'Ohrmuschel, Gehörgang, Trommelfell, Gehörknöchelchen, Hörschnecke, Hörnerv.'),
    S('linse', 2, 'Wähle konvex und erhöhe die Wölbung. Was passiert mit dem Brennpunkt?', 'Er rückt näher an die Linse.', [
      ['Er rückt weiter weg.', 'Stärkere Wölbung bricht stärker, die Brennweite wird kürzer.'],
      ['Er verschwindet.', 'Eine konvexe Linse hat immer einen Brennpunkt.'],
      ['Er bleibt gleich.', 'Die Wölbung beeinflusst die Brennweite.']],
      'Stärker gewölbte Sammellinsen haben eine kürzere Brennweite.'),
    S('auge', 3, 'Wähle «kurzsichtig». Welche Brille macht das Bild scharf?', 'Eine konkave Linse (Zerstreuungslinse).', [
      ['Eine konvexe Linse (Sammellinse).', 'Die Sammellinse verschiebt das Bild noch weiter nach vorn. Sie hilft bei Weitsichtigkeit.'],
      ['Gar keine Brille.', 'Ohne Brille entsteht das Bild vor der Netzhaut.'],
      ['Eine dunkle Sonnenbrille.', 'Eine Sonnenbrille verändert die Lage des Bildes nicht.']],
      'Bei Kurzsichtigkeit liegt das Bild vor der Netzhaut. Eine Zerstreuungslinse schiebt es zurück.')
  ],

  'nt7-4': [
    S('cart', 2, 'Wähle «beschleunigt». Wie verändern sich die Abstände der Punkte?', 'Sie werden immer grösser.', [
      ['Sie bleiben gleich.', 'Gleiche Abstände zeigen eine gleichförmige Bewegung.'],
      ['Sie werden immer kleiner.', 'Kleiner werdende Abstände zeigen eine verzögerte Bewegung.'],
      ['Es gibt keine Abstände.', 'Der Wagen bewegt sich, also gibt es Abstände zwischen den Punkten.']],
      'Beschleunigt: In jeder Sekunde wird mehr Weg zurückgelegt.'),
    S('speed', 2, 'Stelle 100 m in 20 s ein. Wie gross ist die Geschwindigkeit?', '5 m/s', [
      ['2000 m/s', 'Weg und Zeit werden geteilt, nicht multipliziert.'],
      ['0,2 m/s', 'Das ist Zeit durch Weg. Richtig ist Weg durch Zeit.'],
      ['20 m/s', 'v = 100 m : 20 s = 5 m/s.']],
      'v = s : t = 100 m : 20 s = 5 m/s.'),
    S('convert3', 2, 'Stelle 10 m/s ein. Wie viele km/h sind das?', '36 km/h', [
      ['10 km/h', 'm/s und km/h sind nicht gleich. Man rechnet mal 3,6.'],
      ['2,8 km/h', 'Von m/s zu km/h rechnet man mal 3,6, nicht geteilt.'],
      ['360 km/h', '10 · 3,6 = 36, nicht 360.']],
      '10 m/s · 3,6 = 36 km/h.'),
    S('trend', 3, 'Erhöhe die Messwiederholungen. Was passiert mit den Punkten?', 'Sie liegen näher an der Trendgeraden.', [
      ['Sie streuen stärker.', 'Mit mehr Wiederholungen mitteln sich Ungenauigkeiten aus.'],
      ['Sie verschwinden.', 'Die Punkte bleiben, sie werden nur zuverlässiger.'],
      ['Die Gerade wird steiler.', 'Die Geschwindigkeit des Läufers ändert sich nicht.']],
      'Mehr Messungen und Mittelwerte verringern die Messungenauigkeit.'),
    S('twoRunners', 2, 'A läuft mit 6 m/s, B mit 2 m/s. Welche Gerade ist steiler?', 'Die von A.', [
      ['Die von B.', 'Je schneller, desto mehr Weg pro Sekunde, desto steiler.'],
      ['Beide gleich steil.', 'Verschiedene Geschwindigkeiten ergeben verschiedene Steigungen.'],
      ['Keine ist eine Gerade.', 'Bei gleichförmiger Bewegung entstehen Geraden.']],
      'Die Steigung im Zeit-Weg-Diagramm ist die Geschwindigkeit.'),
    S('lab', 3, 'Wähle «verzögert». Wie sieht die Kurve im Zeit-Weg-Diagramm aus?', 'Sie wird immer flacher.', [
      ['Sie wird immer steiler.', 'Immer steiler wird sie bei einer beschleunigten Bewegung.'],
      ['Eine Gerade.', 'Eine Gerade zeigt eine gleichförmige Bewegung.'],
      ['Eine waagrechte Linie.', 'Waagrecht hiesse Stillstand.']],
      'Verzögert: Pro Sekunde kommt immer weniger Weg dazu, die Kurve flacht ab.')
  ],

  'nt7-5': [
    S('formen', 1, 'Welche Energieform hat ein Apfel, der oben am Baum hängt?', 'Lageenergie.', [
      ['Bewegungsenergie.', 'Der Apfel hängt still. Bewegungsenergie hat er erst beim Fallen.'],
      ['Elektrische Energie.', 'Ein Apfel liefert keinen Strom.'],
      ['Schallenergie.', 'Ein hängender Apfel macht kein Geräusch.']],
      'Wegen seiner Höhe hat der Apfel Lageenergie. Als Nahrung enthält er zusätzlich chemische Energie.'),
    S('kette', 2, 'Was steht bei jedem Gerät am Ende der Kette zusätzlich zur Nutzenergie?', 'Thermische Energie.', [
      ['Lageenergie.', 'Bei fast jeder Umwandlung entsteht thermische Energie, nicht Lageenergie.'],
      ['Nichts, alles wird genutzt.', 'Kein Gerät nutzt die Energie zu 100 %.'],
      ['Neue Energie.', 'Energie entsteht nie neu. Sie wird nur umgewandelt.']],
      'Ein Teil der Energie wird immer zu thermischer Energie (Energieentwertung).'),
    S('wuerfel', 2, 'Schiebe den Regler bis 100 %. Was gilt für die Zahl der Würfel?', 'Sie bleibt gleich, nur die Formen ändern sich.', [
      ['Es werden mehr Würfel.', 'Energie entsteht nicht neu.'],
      ['Es werden weniger Würfel.', 'Energie geht nicht verloren, ein Teil wird nur thermisch.'],
      ['Alle Würfel verschwinden.', 'Energie bleibt erhalten.']],
      'Energieerhaltung: Die Gesamtzahl bleibt gleich. Lage wird zu Bewegung und thermischer Energie.'),
    S('speicher', 2, 'Stelle 50 g und 1500 kJ pro 100 g ein. Wie viel Energie ist das?', '750 kJ', [
      ['1500 kJ', '1500 kJ gelten für 100 g. 50 g sind die Hälfte.'],
      ['3000 kJ', 'Bei 50 g ist es weniger als bei 100 g.'],
      ['75 kJ', '1500 : 2 = 750, nicht 75.']],
      '50 g sind die Hälfte von 100 g, also 1500 kJ : 2 = 750 kJ.'),
    S('waerme', 2, 'Welcher Transportweg funktioniert auch im leeren Raum?', 'Wärmestrahlung.', [
      ['Wärmeleitung.', 'Leitung braucht Teilchen, die ihre Bewegung weitergeben.'],
      ['Wärmeströmung.', 'Strömung braucht ein Gas oder eine Flüssigkeit.'],
      ['Keiner.', 'Strahlung braucht keinen Stoff. So erreicht uns die Sonne.']],
      'Wärmestrahlung braucht keinen Stoff. Leitung und Strömung schon.')
  ],

  'nt7-7': [
    S('reaktion', 2, 'Ist «Wasser gefrieren lassen» eine chemische Reaktion?', 'Nein, es ändert sich nur der Aggregatzustand.', [
      ['Ja, weil sich etwas verändert.', 'Nicht jede Veränderung ist eine Reaktion. Wasser bleibt Wasser.'],
      ['Ja, weil es kalt wird.', 'Eine Temperaturänderung allein macht keine Reaktion. Es entsteht kein neuer Stoff.'],
      ['Ja, weil Eis ein neuer Stoff ist.', 'Eis ist Wasser in festem Zustand, kein neuer Stoff.']],
      'Eine chemische Reaktion bildet neue Stoffe. Beim Gefrieren bleibt der Stoff gleich.'),
    S('masse', 3, 'Wähle «Kohlenstoff + Sauerstoff» und öffne das System. Was zeigt die Waage danach?', 'Weniger, weil das Gas entweicht.', [
      ['Mehr, weil ein neuer Stoff entsteht.', 'Neue Stoffe entstehen aus den alten Atomen, zusätzliche Masse kommt nicht dazu.'],
      ['Gleich viel, egal ob offen oder geschlossen.', 'Gleich bleibt es nur im geschlossenen System.'],
      ['Null.', 'Es entweicht nur das Gas, der Rest bleibt auf der Waage.']],
      'Im offenen System entweicht Gas. Darum scheint die Masse abzunehmen.'),
    S('chemwuerfel', 3, 'Wähle «Kerze brennt». Haben die Produkte mehr oder weniger Würfel chemische Energie als die Ausgangsstoffe?', 'Weniger, der Rest geht an die Umgebung.', [
      ['Mehr.', 'Eine Verbrennung gibt Energie ab, die Produkte haben weniger.'],
      ['Gleich viele.', 'Ein Teil der Energie wird als Wärme und Licht abgegeben.'],
      ['Gar keine.', 'Die Produkte haben weniger, aber nicht null.']],
      'Verbrennungen geben Energie an die Umgebung ab. Die Würfel gehen nicht verloren, sie wechseln nur den Ort.'),
    S('foto', 2, 'Stelle das Licht auf 0 %. Was passiert mit den Bläschen?', 'Es entstehen keine oder kaum Bläschen.', [
      ['Es entstehen mehr Bläschen.', 'Ohne Licht läuft keine Fotosynthese, also kein Sauerstoff.'],
      ['Es bleibt gleich wie bei Licht.', 'Die Fotosynthese braucht Licht.'],
      ['Die Bläschen werden zu Kohlenstoffdioxid.', 'Die Bläschen sind Sauerstoff. Ohne Licht entstehen sie nicht.']],
      'Fotosynthese braucht Licht. Ohne Licht entsteht kein Sauerstoff.'),
    S('stoffe', 2, 'Ist Luft ein Element, eine Verbindung oder ein Gemisch?', 'Ein Gemisch.', [
      ['Ein Element.', 'Luft besteht aus mehreren Stoffen, vor allem Stickstoff und Sauerstoff.'],
      ['Eine Verbindung.', 'Die Gase in der Luft sind nur gemischt, nicht fest verbunden.'],
      ['Gar kein Stoff.', 'Luft ist ein Stoff, ein Gemisch aus Gasen.']],
      'Luft ist ein Gemisch aus Stickstoff, Sauerstoff, Argon und etwas Kohlenstoffdioxid.'),
    S('pse', 2, 'Tippe auf Natrium und auf Lithium. Was haben sie gemeinsam?', 'Sie stehen in derselben Spalte (Gruppe).', [
      ['Sie haben dieselbe Masse.', 'Natrium ist deutlich schwerer als Lithium.'],
      ['Sie stehen in derselben Periode.', 'Lithium steht in Periode 2, Natrium in Periode 3.'],
      ['Sie sind beide Gase.', 'Beide sind Metalle.']],
      'Elemente einer Gruppe (Spalte) haben ähnliche Eigenschaften.')
  ],

  'nt8-1': [
    S('kreis', 1, 'Baue eine Unterbrechung ein. Was macht die Lampe?', 'Sie geht aus.', [
      ['Sie leuchtet schwächer.', 'Bei einer Unterbrechung fliesst gar kein Strom mehr.'],
      ['Sie leuchtet heller.', 'Ohne geschlossenen Kreis fliesst kein Strom.'],
      ['Sie leuchtet gleich weiter.', 'Die Lampe braucht einen geschlossenen Kreis.']],
      'Strom fliesst nur im geschlossenen Stromkreis.'),
    S('serpar', 3, 'Wähle Serie mit 3 Lampen und schraube eine heraus. Was passiert?', 'Alle Lampen gehen aus.', [
      ['Die anderen leuchten heller.', 'In Serie ist der einzige Weg unterbrochen.'],
      ['Die anderen leuchten gleich weiter.', 'Das passiert nur in der Parallelschaltung.'],
      ['Nur eine Lampe geht aus.', 'In Serie hängen alle am selben Weg.']],
      'In der Serieschaltung gibt es nur einen Stromweg.'),
    S('ohm', 2, 'Verdopple den Widerstand bei gleicher Spannung. Was passiert mit der Stromstärke?', 'Sie wird halbiert.', [
      ['Sie wird verdoppelt.', 'Mehr Widerstand hemmt den Strom stärker.'],
      ['Sie bleibt gleich.', 'I = U : R ändert sich, wenn R sich ändert.'],
      ['Sie wird null.', 'Der Strom wird kleiner, aber nicht null.']],
      'I = U : R. Doppelter Widerstand, halbe Stromstärke.'),
    S('knoten', 3, 'Wähle Parallel. Was gilt für den Gesamtstrom?', 'Er ist die Summe der beiden Zweigströme.', [
      ['Er ist gleich wie in jedem Zweig.', 'Im Knoten teilt sich der Strom auf. Zusammen ergeben die Zweige den Gesamtstrom.'],
      ['Er ist die Differenz der Zweigströme.', 'Die Zweigströme werden addiert, nicht subtrahiert.'],
      ['Er ist null.', 'Es fliesst Strom, solange der Kreis geschlossen ist.']],
      'Knotenregel: Zufliessend = abfliessend. Der Gesamtstrom ist die Summe der Zweige.'),
    S('wirkung', 1, 'Welche Wirkung des Stroms nutzt ein Toaster?', 'Die Wärmewirkung.', [
      ['Die Lichtwirkung.', 'Die Drähte glühen zwar etwas, der Toaster soll aber Brot rösten, also heizen.'],
      ['Die magnetische Wirkung.', 'Zum Rösten braucht es Wärme, keinen Magneten.'],
      ['Die chemische Wirkung.', 'Der Strom löst im Toaster keine chemischen Vorgänge aus. Das Brot bräunt durch die Hitze.']],
      'Toaster, Bügeleisen und Wasserkocher nutzen die Wärmewirkung.'),
    S('motorgen', 2, 'Schalte auf Generator. In welche Richtung wird umgewandelt?', 'Von Bewegungsenergie in elektrische Energie.', [
      ['Von elektrischer Energie in Bewegungsenergie.', 'Das ist der Motor.'],
      ['Von Wärme in Bewegung.', 'Ein Generator nutzt Bewegung, nicht Wärme.'],
      ['Gar nicht, er speichert nur.', 'Ein Generator wandelt um, er speichert nichts.']],
      'Motor und Generator arbeiten in entgegengesetzte Richtungen.')
  ],

  'nt8-5': [
    S('kraftmesser', 2, 'Hänge 200 g an und wechsle von der Erde auf den Mond. Was passiert?', 'Die Feder dehnt sich weniger, weil die Gewichtskraft kleiner ist.', [
      ['Die Masse wird kleiner.', 'Die Masse bleibt 200 g. Nur die Gewichtskraft ändert sich.'],
      ['Die Feder dehnt sich stärker.', 'Auf dem Mond ist die Gewichtskraft etwa sechsmal kleiner.'],
      ['Nichts ändert sich.', 'Der Kraftmesser misst die Gewichtskraft, und die hängt vom Ort ab.']],
      'Auf dem Mond wirken etwa 1,6 N pro kg statt 10 N pro kg.'),
    S('reibung', 2, 'Verdopple die Masse. Was passiert mit der Reibungskraft?', 'Sie wird etwa doppelt so gross.', [
      ['Sie bleibt gleich.', 'Mehr Masse drückt stärker auf die Unterlage.'],
      ['Sie wird halbiert.', 'Mehr Masse heisst mehr Reibung, nicht weniger.'],
      ['Sie wird null.', 'Reibung verschwindet nicht durch mehr Masse.']],
      'Die Reibungskraft ist im Modell proportional zur Masse.'),
    S('seilziehen', 1, 'Stelle beide Gruppen auf gleich viel Kraft. Was passiert?', 'Die Gesamtkraft ist null, das Seil bleibt in Ruhe.', [
      ['Das Seil bewegt sich nach links.', 'Gleich grosse Kräfte in entgegengesetzte Richtung heben sich auf.'],
      ['Die Gesamtkraft ist doppelt so gross.', 'Gegeneinander werden Kräfte subtrahiert.'],
      ['Das Seil reisst immer.', 'Ob es reisst, hängt von der Seilstärke ab. Die Gesamtkraft ist null.']],
      'Entgegengesetzte Kräfte werden subtrahiert. Gleich gross ergibt 0 N.'),
    S('parallelo', 3, 'Vergrössere den Winkel zwischen den Seilen. Was passiert mit der Kraft in jedem Seil?', 'Sie wird grösser.', [
      ['Sie wird kleiner.', 'Je flacher die Seile, desto grösser müssen ihre Kräfte sein, um das Gewicht zu halten.'],
      ['Sie bleibt immer 50 N.', '50 N gilt nur, wenn beide Seile senkrecht hängen.'],
      ['Sie wird null.', 'Die Seile halten weiterhin 100 N Gewicht.']],
      'Bei 120° trägt jedes Seil schon 100 N. Bei grösserem Winkel noch mehr.'),
    S('maschine', 3, 'Wähle den Flaschenzug mit 3 tragenden Seilstücken. Was gilt?', 'Ein Drittel der Kraft, aber der dreifache Seilweg.', [
      ['Ein Drittel der Kraft bei gleichem Weg.', 'Kraft sparen kostet Weg. Die Arbeit bleibt gleich.'],
      ['Dreifache Kraft, ein Drittel Weg.', 'Das ist umgekehrt.'],
      ['Weniger Kraft und weniger Arbeit.', 'Die Arbeit bleibt gleich (ohne Reibung).']],
      'Goldene Regel: Kraft · Weg bleibt gleich.'),
    S('arbeit', 2, 'Wird am Ordner Arbeit verrichtet, wenn du ihn ruhig in der Hand hältst?', 'Nein, der Ordner bewegt sich nicht.', [
      ['Ja, weil es anstrengend ist.', 'Anstrengung ist kein Mass für physikalische Arbeit. Es braucht einen Weg.'],
      ['Ja, weil eine Kraft wirkt.', 'Kraft allein reicht nicht. Arbeit = Kraft · Weg.'],
      ['Nur wenn der Ordner schwer ist.', 'Auch ein schwerer Ordner, der ruht, bekommt keine Arbeit.']],
      'Physikalische Arbeit braucht eine Kraft entlang eines Wegs.'),
    S('treppe', 3, 'Halbiere die Zeit, sonst bleibt alles gleich. Was passiert mit der Leistung?', 'Sie wird doppelt so gross.', [
      ['Sie wird halbiert.', 'Weniger Zeit für dieselbe Arbeit heisst mehr Leistung.'],
      ['Sie bleibt gleich.', 'Die Leistung hängt von der Zeit ab.'],
      ['Die Arbeit wird doppelt so gross.', 'Die Arbeit hängt nur von Masse und Höhe ab, nicht von der Zeit.']],
      'P = W : t. Halbe Zeit, doppelte Leistung.')
  ]
};
