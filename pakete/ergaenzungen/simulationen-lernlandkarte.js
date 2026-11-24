// Fragen zu den Simulationen der NuT-Lernlandkarte («Simulation mit Frage», nur im freiwilligen Zusatzblock).
// Von Claude erstellt, Entwurf bis zur Freigabe im Dashboard. Das Feld simulation nennt die Simulation des Pakets.
import { mc } from './hilfen.js';

const S = (simulation, schwierigkeit, frage, richtig, falsche, erklaerung) =>
  ({ id: 'sim-' + simulation, simulation, schwierigkeit, ...mc('Probiere die Simulation aus. ' + frage, richtig, falsche, erklaerung) });

export default {
  'nt7-2': [
    S('organe', 2, 'Welches Organ filtert das Blut und bildet Urin?', 'Die Nieren.', [
      ['Die Leber.', 'Die Leber ist die Entgiftungsstation, Urin bildet sie nicht.'],
      ['Das Herz.', 'Das Herz pumpt das Blut, es filtert es nicht.'],
      ['Der Dickdarm.', 'Der Dickdarm entzieht der Nahrung Wasser und entsorgt Feststoffe.']],
      'Die Nieren arbeiten wie eine Kläranlage: Sie filtern das Blut und bilden Urin.'),
    S('knochen', 2, 'Wähle «In Essig». Warum wird der Knochen biegsam?', 'Die Säure löst die harten Kristalle auf, nur die elastischen Proteine bleiben.', [
      ['Der Essig zerstört die Proteine.', 'Die Proteine werden beim Ausbrennen zerstört. Dann wird der Knochen brüchig.'],
      ['Der Knochen saugt Wasser auf und quillt.', 'Entscheidend ist, dass die Kristalle (Calciumphosphat) aufgelöst werden.'],
      ['Der Essig macht den Knochen härter.', 'Ohne die harten Kristalle wird der Knochen weich, nicht härter.']],
      'Harte Kristalle und elastische Proteine machen den Knochen zusammen hart und belastbar.'),
    S('gegenspieler', 2, 'Wähle «Bein» und «Strecken». Welcher Muskel ist angespannt?', 'Der Kniestrecker.', [
      ['Der Kniebeuger.', 'Der Kniebeuger ist angespannt, wenn das Bein gebeugt wird.'],
      ['Beide gleich stark.', 'Gegenspieler arbeiten abwechselnd: Einer zieht, der andere wird gedehnt.'],
      ['Keiner, das Bein streckt sich von selbst.', 'Jede Bewegung braucht einen Muskel, der zieht.']],
      'Ein Muskel kann nur ziehen. Darum braucht jedes Gelenk einen Beuger und einen Strecker.'),
    S('nachweis', 2, 'Kalkwasser wird trüb. Welches Gas ist nachgewiesen?', 'Kohlenstoffdioxid.', [
      ['Sauerstoff.', 'Sauerstoff weist man mit dem glimmenden Holzspan nach.'],
      ['Stickstoff.', 'Stickstoff trübt Kalkwasser nicht.'],
      ['Wasserdampf.', 'Wasserdampf trübt Kalkwasser nicht.']],
      'Kalkwasser wird trüb mit Kohlenstoffdioxid. Ein glimmender Span flammt in Sauerstoff auf.'),
    S('stoffwechsel', 3, '«Nährstoffe gelangen im Darm ins Blut.» Welcher Stoffwechselvorgang ist das?', 'Aufnahme.', [
      ['Transport.', 'Transport ist, wenn das Blut die Stoffe zu den Zellen bringt.'],
      ['Umwandlung.', 'Umgewandelt werden die Stoffe erst in den Zellen.'],
      ['Abgabe.', 'Abgegeben werden Abfallstoffe, zum Beispiel beim Ausatmen.']],
      'Aufnahme, Transport, Umwandlung, Abgabe: Im Darm werden die Nährstoffe aufgenommen.'),
    S('atmung', 2, 'Wähle «Einatmen». Was macht das Zwerchfell?', 'Es flacht ab, der Brustraum wird grösser.', [
      ['Es wölbt sich nach oben.', 'Das passiert beim Ausatmen.'],
      ['Es bleibt unverändert.', 'Das Zwerchfell ist der wichtigste Atemmuskel und bewegt sich bei jedem Atemzug.'],
      ['Es pumpt Luft in die Lunge.', 'Das Zwerchfell vergrössert den Brustraum. Die Luft strömt dann von selbst ein.']],
      'Wird der Brustraum grösser, sinkt der Druck in der Lunge, und Luft strömt ein. Die Lunge ist passiv.'),
    S('lunge', 3, 'Wie viel Mal grösser ist im Modell die Oberfläche der Lunge als die eines Ballons mit 6 L?', 'Etwa 600-mal.', [
      ['Etwa 6-mal.', 'Die Lunge hat etwa 100 m², der Ballon nur etwa 1/6 m².'],
      ['Gleich gross, weil das Volumen gleich ist.', 'Gleiches Volumen heisst nicht gleiche Oberfläche. Die Lunge ist fein verzweigt.'],
      ['Etwa 60-mal.', '100 m² : 1/6 m² ergibt 600, nicht 60.']],
      'Die feinen Lungenbläschen ergeben etwa einen halben Tennisplatz Oberfläche für den Gasaustausch.'),
    S('blut', 2, 'Welcher Bestandteil des Bluts verschliesst Wunden?', 'Die Blutplättchen.', [
      ['Die roten Blutzellen.', 'Rote Blutzellen transportieren Sauerstoff.'],
      ['Die weissen Blutzellen.', 'Weisse Blutzellen wehren Krankheitserreger ab.'],
      ['Das Blutplasma.', 'Das Plasma transportiert gelöste Stoffe.']],
      'Blutplättchen verschliessen Wunden zusammen mit dem Protein Fibrin.'),
    S('gefaess', 2, 'Welches Gefäss hat Klappen und führt das Blut zum Herzen?', 'Die Vene.', [
      ['Die Arterie.', 'Arterien führen vom Herzen weg und haben eine kräftige Wand.'],
      ['Die Kapillare.', 'Kapillaren sind sehr dünn und dienen dem Stoffaustausch.'],
      ['Die Luftröhre.', 'Die Luftröhre führt Luft, kein Blut.']],
      'Die Klappen in den Venen verhindern, dass das Blut zurückfliesst.'),
    S('herz', 3, 'Verfolge das Blut Schritt für Schritt. Wohin pumpt die rechte Kammer das Blut?', 'In die Lunge.', [
      ['In den Körper.', 'In den Körper pumpt die linke Kammer.'],
      ['In den linken Vorhof.', 'Zwischen rechter Kammer und linkem Vorhof liegt die Lunge.'],
      ['Zurück in den rechten Vorhof.', 'Die Herzklappen lassen das Blut nur in eine Richtung fliessen.']],
      'Rechte Herzhälfte: zur Lunge. Linke Herzhälfte: in den Körper.'),
    S('zyklus', 2, 'Stelle Tag 14 ein. Was geschieht etwa in der Mitte des Zyklus?', 'Der Eisprung.', [
      ['Die Menstruation.', 'Die Menstruation findet in diesem Beispiel an den Tagen 1 bis 5 statt.'],
      ['Der Aufbau beginnt.', 'Der Aufbau der Schleimhaut kommt vor dem Eisprung.'],
      ['Nichts.', 'In der Zyklusmitte verlässt die reife Eizelle den Eierstock.']],
      'Das Beispiel hat 28 Tage. Die Dauer ist von Person zu Person verschieden.'),
    S('verhuetung', 2, 'Welche Aussage stimmt?', 'Das Kondom schützt auch vor sexuell übertragbaren Infektionen.', [
      ['Die Pille schützt auch vor sexuell übertragbaren Infektionen.', 'Die Pille verhindert nur eine Schwangerschaft.'],
      ['Die Pille nimmt man nach Bedarf kurz vorher.', 'Die Pille wirkt nur bei regelmässiger Einnahme nach Plan.'],
      ['Zungenküsse können zu einer Schwangerschaft führen.', 'Beim Küssen treffen keine Spermien auf eine Eizelle.']],
      'Nur das Kondom schützt zusätzlich vor sexuell übertragbaren Infektionen.')
  ],
  'nt7-6': [
    S('regeln', 2, 'Welches Verhalten im Labor ist richtig?', 'Du fächelst dir den Geruch eines Stoffes zu.', [
      ['Du trinkst aus einem sauberen Becherglas.', 'Im Labor wird weder gegessen noch getrunken.'],
      ['Du gibst nicht gebrauchte Reste zurück ins Vorratsgefäss.', 'Gebrauchte Stoffe gehören nie ins Vorratsgefäss zurück.'],
      ['Du nimmst die Schutzbrille ab, wenn es heiss wird.', 'Die Schutzbrille bleibt dauernd auf.']],
      'Zufächeln ist die sichere Art, an einem Stoff zu riechen.'),
    S('brenner', 2, 'Stelle die Luftzufuhr auf 10. Wie ist die Flamme?', 'Blau, rauschend und heisser.', [
      ['Gelb, leuchtend und russend.', 'So ist die Flamme bei wenig Luft.'],
      ['Sie geht aus.', 'Mit mehr Luft brennt das Gas vollständiger, die Flamme bleibt.'],
      ['Grösser und kühler.', 'Mit viel Luft wird die Flamme kleiner und heisser.']],
      'Mit mehr Luft verbrennt das Gas vollständig. Die heisseste Stelle liegt über dem Innenkegel.'),
    S('ghs', 2, 'Was bedeutet eine Flamme über einem Kreis?', 'Brandfördernd: Der Stoff kann Sauerstoff abgeben.', [
      ['Hochentzündlich.', 'Hochentzündlich zeigt eine Flamme ohne Kreis.'],
      ['Ätzend.', 'Ätzend zeigt eine Hand und eine Metallplatte mit Tropfen.'],
      ['Gas unter Druck.', 'Gas unter Druck zeigt eine Gasflasche.']],
      'Brandfördernde Stoffe geben Sauerstoff ab und machen ein Feuer heftiger.'),
    S('dichte', 2, 'Stelle die Dichte auf 0,6 g/cm³. Was macht der Körper im Wasser?', 'Er schwimmt.', [
      ['Er sinkt.', 'Er sinkt nur, wenn seine Dichte grösser als 1 g/cm³ ist.'],
      ['Er schwebt.', 'Schweben würde er nur bei genau 1 g/cm³.'],
      ['Er löst sich auf.', 'Ob sich etwas löst, hängt nicht von der Dichte ab.']],
      'Ist die Dichte kleiner als die von Wasser (1 g/cm³), schwimmt der Körper.'),
    S('zustand', 2, 'Stelle 120 °C ein. In welchem Zustand ist das Wasser?', 'Gasförmig (Wasserdampf).', [
      ['Flüssig.', 'Flüssig ist Wasser zwischen 0 °C und 100 °C.'],
      ['Fest.', 'Fest ist Wasser unter 0 °C.'],
      ['Fest und flüssig gleichzeitig.', 'Das gilt am Schmelzpunkt bei 0 °C.']],
      'Wasser siedet bei 100 °C. Darüber ist es gasförmig, die Teilchen sind weit auseinander.'),
    S('trenn', 2, 'Welches Verfahren trennt den Alkohol aus Rotwein?', 'Destillation.', [
      ['Filtration.', 'Alkohol und Wasser laufen beide durch den Filter.'],
      ['Adsorption.', 'Adsorption bindet Farbstoffe an Aktivkohle.'],
      ['Chromatografie.', 'Chromatografie trennt Farbstoffe auf Papier.']],
      'Alkohol verdampft bei tieferer Temperatur als Wasser. Darum trennt man ihn durch Destillation.'),
    S('gemisch', 3, 'Was sind Wassertröpfchen in der Luft?', 'Nebel.', [
      ['Rauch.', 'Rauch sind Feststoffteilchen in einem Gas.'],
      ['Emulsion.', 'Eine Emulsion ist Flüssigkeit in Flüssigkeit.'],
      ['Suspension.', 'Eine Suspension ist ein Feststoff in einer Flüssigkeit.']],
      'Nebel: Flüssigkeit in einem Gas. Rauch: Feststoff in einem Gas.'),
    S('teilchen', 2, 'Wähle «gasförmig». Wie verhalten sich die Teilchen?', 'Sie sind weit auseinander und sehr schnell.', [
      ['Sie sind dicht gepackt und geordnet.', 'So sind sie im festen Zustand.'],
      ['Sie sind nah beieinander und gleiten aneinander vorbei.', 'So sind sie im flüssigen Zustand.'],
      ['Sie stehen still.', 'Teilchen bewegen sich immer, im Gas besonders schnell.']],
      'Im Gas füllen die Teilchen den ganzen Raum.')
  ],
  'nt8-2': [
    S('oeko', 2, 'Welches Beispiel ist ein belebter Faktor?', 'Bakterien im Boden.', [
      ['Sonnenlicht.', 'Licht ist ein unbelebter Faktor.'],
      ['Die Strömung eines Bachs.', 'Die Strömung gehört zum unbelebten Lebensraum.'],
      ['Die Wassertemperatur.', 'Die Temperatur ist ein unbelebter Faktor.']],
      'Belebte Faktoren sind Lebewesen, auch winzige wie Bakterien.'),
    S('rollen', 2, 'Welche Rolle haben Pilze, die Totholz zersetzen?', 'Destruent.', [
      ['Produzent.', 'Produzenten stellen mit Licht Nährstoffe her, zum Beispiel Pflanzen und Algen.'],
      ['Konsument.', 'Konsumenten fressen andere Lebewesen.'],
      ['Gar keine.', 'Ohne Destruenten würde sich Abgestorbenes anhäufen.']],
      'Destruenten bauen Abgestorbenes ab und schliessen den Stoffkreislauf.'),
    S('flasche', 3, 'Fülle das Glas zu 90 % mit Erde. Warum gedeiht der Flaschengarten schlechter?', 'Es bleibt zu wenig Luft für die Kreisläufe.', [
      ['Die Pflanzen finden keinen Halt.', 'Das passiert bei sehr wenig Erde.'],
      ['Es kommt kein Licht mehr hinein.', 'Das Licht kommt durch das Glas, auch bei viel Erde.'],
      ['Die Erde fault sofort.', 'Faulen kommt von zu viel Wasser.']],
      'Im geschlossenen Flaschengarten müssen Luft, Wasser und Erde im Gleichgewicht sein.'),
    S('netz', 3, 'Lass die Fische aussterben. Wer verliert seine einzige Nahrung?', 'Der Reiher.', [
      ['Die Libellenlarve.', 'Die Libellenlarve frisst Wasserflöhe und Schnecken, nicht Fische.'],
      ['Die Algen.', 'Algen sind Produzenten und fressen niemanden.'],
      ['Niemand.', 'Im vereinfachten Netz frisst der Reiher nur Fische.']],
      'Fällt eine Art aus, trifft das alle, die von ihr leben. Wer mehrere Nahrungsquellen hat, ist weniger gefährdet.'),
    S('bach', 3, 'Vergleiche bei km 6 den naturnahen und den verbauten Bach. Was stellst du fest?', 'Der naturnahe Bach hat schon wieder mehr Sauerstoff und weniger Nährstoffe.', [
      ['Beide sind gleich.', 'Der verbaute Bach reinigt sich viel langsamer.'],
      ['Der verbaute Bach ist sauberer.', 'Ohne naturnahes Bett fehlen die Lebewesen, die das Wasser reinigen.'],
      ['Bei km 6 gibt es gar keinen Sauerstoff mehr.', 'Der Sauerstoff sinkt nach der Einleitung, erholt sich aber wieder.']],
      'Ein naturnahes Bett bietet den Mikroorganismen Lebensraum. Darum reinigt sich der Bach schneller.')
  ],
  'nt8-3': [
    S('nachweis', 2, 'Auf dem Papier bleibt ein durchscheinender Fleck. Welcher Nährstoff ist nachgewiesen?', 'Fett.', [
      ['Stärke.', 'Stärke weist man mit Lugol-Lösung nach (blauviolett).'],
      ['Traubenzucker.', 'Zucker zeigt ein Teststreifen oder die Fehling-Probe.'],
      ['Protein.', 'Proteine gerinnen, zum Beispiel Eiklar mit Essig.']],
      'Die Fettfleck-Probe: Fett macht Papier durchscheinend.'),
    S('verdauung', 2, 'Folge der Nahrung. Wo werden die Nährstoffe ins Blut aufgenommen?', 'Im Dünndarm.', [
      ['Im Magen.', 'Im Magen greifen Salzsäure und Pepsin die Proteine an. Aufgenommen wird später.'],
      ['Im Dickdarm.', 'Im Dickdarm wird dem Rest vor allem Wasser entzogen.'],
      ['In der Speiseröhre.', 'Die Speiseröhre schiebt den Brei nur zum Magen.']],
      'Der Dünndarm hat eine riesige Oberfläche. Darüber gelangen die Nährstoffe ins Blut.'),
    S('sti', 2, 'Welche Aussage stimmt?', 'Eine Pilzinfektion kann auch ohne Geschlechtsverkehr entstehen.', [
      ['Duschen nach dem Geschlechtsverkehr schützt vor einer Ansteckung.', 'Duschen schützt nicht vor einer STI.'],
      ['Mit Personen, die man gut kennt, kann man sich nicht anstecken.', 'Auch bei bekannten Personen ist eine Ansteckung möglich.'],
      ['Beim Oralsex ist keine Ansteckung möglich.', 'Auch dabei ist eine Ansteckung möglich.']],
      'Viele Vorstellungen über Schutz sind falsch. Schutz bieten Kondom oder Femidom.'),
    S('wachstum', 2, 'Stelle 90 Minuten ein. Wie viele Bakterien sind es aus einem einzigen?', '8.', [
      ['3.', '90 Minuten sind 3 Teilungen. Die Zahl verdoppelt sich jedes Mal: 2 · 2 · 2.'],
      ['6.', 'Die Zahl wird nicht addiert, sondern verdoppelt: 1, 2, 4, 8.'],
      ['90.', 'Es zählt die Zahl der Teilungen, nicht die Minuten.']],
      'Alle 30 Minuten verdoppelt sich die Zahl: 2³ = 8.'),
    S('immun', 3, 'Was gehört zur unspezifischen Abwehr?', 'Haut und Schleimhäute halten Erreger fern.', [
      ['B-Zellen bilden passende Antikörper.', 'Antikörper passen nur zu einem bestimmten Antigen. Das ist spezifisch.'],
      ['Gedächtniszellen merken sich einen Erreger.', 'Das Gedächtnis gehört zur spezifischen Abwehr.'],
      ['T-Killerzellen erkennen bestimmte Antigene.', 'Sie erkennen bestimmte Erreger. Das ist spezifisch.']],
      'Die unspezifische Abwehr wirkt gegen alle Erreger, die spezifische gegen einen bestimmten.'),
    S('blut', 3, 'Spender A, Empfänger B. Ist das verträglich?', 'Nein, die Antikörper gegen A des Empfängers verklumpen die Blutzellen.', [
      ['Ja, beide haben eine Blutgruppe.', 'Entscheidend ist, ob die Antikörper des Empfängers zu den Antigenen des Spenders passen.'],
      ['Ja, B ist Universalempfänger.', 'Universalempfänger ist AB, nicht B.'],
      ['Nur wenn wenig Blut gegeben wird.', 'Schon kleine Mengen führen zum Verklumpen.']],
      'Blutgruppe B hat Antikörper gegen A. Die A-Blutzellen des Spenders verklumpen.'),
    S('impf', 2, 'Eine Spritze mit fertigen Antikörpern nach einer Ansteckung: Welche Impfart ist das?', 'Passiv (Heilimpfung).', [
      ['Aktiv (Schutzimpfung).', 'Bei der Schutzimpfung bildet der Körper selbst Antikörper.'],
      ['Gar keine Impfung.', 'Auch die Gabe fertiger Antikörper heisst Impfung (Heilimpfung).'],
      ['Eine Auffrischung.', 'Eine Auffrischung ist eine aktive Impfung.']],
      'Fertige Antikörper wirken schnell, aber nur kurz. Es entstehen keine Gedächtniszellen.')
  ],
  'nt8-4': [
    S('feuer', 2, 'Klicke auf «CO₂-Löscher oder Löschdecke». Welche Seite des Feuerdreiecks fehlt danach?', 'Der Sauerstoff.', [
      ['Die Hitze.', 'Die Hitze entfernst du mit Wasser.'],
      ['Der Brennstoff.', 'Den Brennstoff entfernst du, indem du ihn wegnimmst.'],
      ['Keine, das Feuer brennt weiter.', 'Fehlt eine Seite des Feuerdreiecks, geht das Feuer aus.']],
      'Löschdecke und CO₂-Löscher schneiden das Feuer vom Sauerstoff ab.'),
    S('elektrolyse', 2, 'Schiebe die Zeit auf 5 min. Wie viel Gas entsteht auf jeder Seite?', '10 mL Wasserstoff und 5 mL Sauerstoff.', [
      ['5 mL Wasserstoff und 10 mL Sauerstoff.', 'Umgekehrt: Am Minuspol entsteht doppelt so viel Wasserstoff.'],
      ['Gleich viel von beiden.', 'Wasser ist H₂O: doppelt so viele H- wie O-Atome, also doppelt so viel Wasserstoff.'],
      ['Nur Wasserdampf.', 'Das Wasser wird zerlegt, nicht verdampft.']],
      '2 H₂O → 2 H₂ + O₂. Es entsteht doppelt so viel Wasserstoff wie Sauerstoff.'),
    S('bilanz', 3, 'Wähle «Eisen rostet». Welche Zahlen gleichen die Gleichung Fe + O₂ → Fe₂O₃ aus?', '4 Fe + 3 O₂ → 2 Fe₂O₃', [
      ['2 Fe + 3 O₂ → 2 Fe₂O₃', 'Rechts stehen 4 Fe-Atome, links nur 2.'],
      ['4 Fe + 2 O₂ → 2 Fe₂O₃', 'Rechts stehen 6 O-Atome, links nur 4.'],
      ['Fe + O₂ → Fe₂O₃', 'Links 1 Fe und 2 O, rechts 2 Fe und 3 O: nicht ausgeglichen.']],
      'Links und rechts: 4 Fe und 6 O. Bei Reaktionen gehen keine Atome verloren.'),
    S('energie', 3, 'Wähle «Exotherm». Was zeigt die Kurve am Ende?', 'Die Produkte haben weniger Energie als die Ausgangsstoffe, die Differenz wird frei.', [
      ['Die Produkte haben mehr Energie.', 'Das ist bei der endothermen Reaktion so.'],
      ['Die Aktivierungsenergie bestimmt, wie viel Energie frei wird.', 'Die Aktivierungsenergie ist nur der Anstoss. Frei wird die Differenz zwischen Anfang und Ende.'],
      ['Die Energie bleibt immer gleich hoch.', 'Bei der exothermen Reaktion liegt das Ende tiefer als der Anfang.']],
      'Im Modell: Ausgangsstoffe 100 kJ, Produkte 50 kJ. Es werden 50 kJ frei.'),
    S('ionen', 2, 'Was wird aus einem Sauerstoff-Atom, das zwei Elektronen aufnimmt?', 'Ein Anion mit der Ladung 2−.', [
      ['Ein Kation mit der Ladung 2+.', 'Wer Elektronen aufnimmt, wird negativ, nicht positiv.'],
      ['Es bleibt ein Atom.', 'Mit zusätzlichen Elektronen ist es geladen, also ein Ion.'],
      ['Ein Edelgas.', 'Es erreicht die Edelgaskonfiguration, bleibt aber Sauerstoff.']],
      'Nichtmetall-Atome nehmen Elektronen auf und werden zu Anionen.'),
    S('oxid', 2, 'Magnesium verbrennt, das Oxid wird in Wasser gelöst. Welche Lösung entsteht?', 'Eine basische Lösung.', [
      ['Eine saure Lösung.', 'Sauer werden Lösungen von Nichtmetalloxiden, zum Beispiel von Schwefel.'],
      ['Eine neutrale Lösung.', 'Metalloxide ergeben basische Lösungen.'],
      ['Gar keine Lösung.', 'Magnesiumoxid löst sich ein wenig und macht das Wasser basisch.']],
      'Metalloxid in Wasser: basisch. Nichtmetalloxid in Wasser: sauer.'),
    S('neutral', 2, 'Stelle 10 mL Salzsäure und 10 mL Natronlauge ein. Wie ist die Lösung?', 'Neutral.', [
      ['Sauer.', 'Sauer bleibt sie nur, wenn mehr Säure als Lauge da ist.'],
      ['Basisch.', 'Basisch bleibt sie nur, wenn mehr Lauge als Säure da ist.'],
      ['Sie explodiert.', 'Die Neutralisation ist harmlos. Es entstehen Wasser und Salz-Ionen.']],
      'Bei gleichen Mengen reagieren alle H⁺ und OH⁻ zu Wasser. Beim Eindampfen bleibt Kochsalz zurück.')
  ],
  'nt9-1': [
    S('phaenomen', 2, 'Ein Strohhalm sieht im Wasserglas geknickt aus. Welches Phänomen ist das?', 'Brechung.', [
      ['Reflexion.', 'Bei der Reflexion wird Licht zurückgeworfen, zum Beispiel am Spiegel.'],
      ['Totalreflexion.', 'Totalreflexion braucht einen grossen Winkel, zum Beispiel in Glasfasern.'],
      ['Eine optische Täuschung ohne Ursache.', 'Die Ursache ist klar: Das Licht wird zwischen Wasser und Luft gebrochen.']],
      'Beim Übergang zwischen Wasser und Luft ändert das Licht seine Richtung.'),
    S('reflex', 2, 'Stelle den Einfallswinkel auf 30°. Wie gross ist der Winkel zwischen den beiden Strahlen?', '60°.', [
      ['30°.', '30° ist der Reflexionswinkel. Zusammen mit dem Einfallswinkel sind es 60°.'],
      ['90°.', 'Das wäre bei 45° Einfallswinkel.'],
      ['15°.', 'Die Winkel werden addiert, nicht halbiert.']],
      'Einfallswinkel = Reflexionswinkel. Der Winkel zwischen den Strahlen ist doppelt so gross.'),
    S('spiegelbild', 2, 'Stelle 3 m ein. Wie weit bist du von deinem Spiegelbild entfernt?', '6 m.', [
      ['3 m.', '3 m bis zum Spiegel, und das Bild steht noch einmal 3 m dahinter.'],
      ['1,5 m.', 'Das Bild ist weiter weg als der Spiegel, nicht näher.'],
      ['0 m.', 'Das Bild liegt hinter dem Spiegel, nicht bei dir.']],
      'Das Spiegelbild steht gleich weit hinter dem Spiegel wie du davor.'),
    S('brechung', 3, 'Wähle «Wasser → Luft» und erhöhe den Winkel stark. Was geschieht ab etwa 50°?', 'Das Licht wird total reflektiert, es tritt nicht mehr in die Luft aus.', [
      ['Das Licht wird zum Lot hin gebrochen.', 'Von Wasser in Luft wird es vom Lot weg gebrochen.'],
      ['Nichts ändert sich.', 'Ab einem Grenzwinkel (bei Wasser etwa 49°) gibt es keinen gebrochenen Strahl mehr.'],
      ['Das Licht verschwindet.', 'Das Licht verschwindet nicht, es wird vollständig zurückgeworfen.']],
      'Totalreflexion tritt beim Übergang vom dichteren in den dünneren Stoff bei grossem Winkel auf.'),
    S('abbildung', 3, 'Stelle den Gegenstand auf 0,5 f. Welches Bild entsteht?', 'Ein vergrössertes, aufrechtes, virtuelles Bild, wie bei der Lupe.', [
      ['Ein verkleinertes, umgekehrtes Bild.', 'Das entsteht, wenn der Gegenstand weit weg ist, wie bei der Kamera.'],
      ['Gar kein Bild.', 'Kein Bild entsteht genau im Brennpunkt (f).'],
      ['Ein gleich grosses, umgekehrtes Bild.', 'Das entsteht bei 2 f.']],
      'Innerhalb der Brennweite wirkt die konvexe Linse als Lupe.'),
    S('farbmisch', 2, 'Stelle Rot und Blau auf 100 %, Grün auf 0 %. Welche Farbe siehst du?', 'Magenta.', [
      ['Gelb.', 'Gelb entsteht aus Rot und Grün.'],
      ['Cyan.', 'Cyan entsteht aus Grün und Blau.'],
      ['Weiss.', 'Für Weiss braucht es alle drei Farben gleich stark.']],
      'Additive Farbmischung: Rot + Blau = Magenta.')
  ],
  'nt9-2': [
    S('modelle', 2, 'Zu welchem Modell gehört: «Winziger positiver Kern, drumherum fast nur leerer Raum»?', 'Rutherford.', [
      ['Dalton.', 'Dalton stellte sich massive, homogene Kugeln vor.'],
      ['Thomson.', 'Thomson beschrieb einen positiven «Teig» mit Elektronen wie Rosinen.'],
      ['Bohr.', 'Bohr fügte die Kreisbahnen der Elektronen hinzu.']],
      'Rutherford schloss aus dem Goldfolienversuch auf einen winzigen Kern.'),
    S('streu', 3, 'Was zeigt das Verhältnis von etwa 1 abgelenkten zu 8000 beschossenen Teilchen?', 'Der Atomkern ist winzig im Vergleich zum ganzen Atom.', [
      ['Das Atom ist eine massive Kugel.', 'Dann würden fast alle Teilchen abprallen.'],
      ['Die Goldfolie hat Löcher.', 'Die Folie ist dicht. Das Atom selbst besteht fast nur aus leerem Raum.'],
      ['Die Elektronen lenken die Teilchen ab.', 'Elektronen sind viel zu leicht, um Alpha-Teilchen abzulenken.']],
      'Fast alle Teilchen gehen durch, nur sehr wenige treffen auf den winzigen, massiven Kern.'),
    S('atombau', 3, 'Stelle 8 Protonen, 8 Neutronen und 10 Elektronen ein. Was entsteht?', 'Ein Sauerstoff-Ion mit der Ladung 2−.', [
      ['Ein neutrales Sauerstoff-Atom.', 'Neutral wäre es mit 8 Elektronen. Hier sind es 2 mehr.'],
      ['Ein Neon-Atom.', 'Das Element bestimmen die Protonen: 8 Protonen sind Sauerstoff.'],
      ['Ein Sauerstoff-Ion mit der Ladung 2+.', 'Mehr Elektronen als Protonen heisst negative Ladung.']],
      'Die Protonen bestimmen das Element, der Unterschied zu den Elektronen die Ladung.'),
    S('ionbindung', 3, 'Wähle «Calcium + Chlor». Welche Formel entsteht?', 'CaCl₂', [
      ['CaCl', 'Calcium gibt 2 Elektronen ab, Chlor nimmt nur 1 auf. Es braucht also 2 Chlor.'],
      ['Ca₂Cl', 'Es braucht mehr Chlor- als Calcium-Ionen, nicht umgekehrt.'],
      ['CaCl₃', 'Ca²⁺ wird durch zwei Cl⁻ ausgeglichen, nicht durch drei.']],
      'Ca²⁺ und zwei Cl⁻: Insgesamt ist das Salz ungeladen.'),
    S('redox', 2, 'Mg → Mg²⁺ + 2 e⁻: Was ist das?', 'Eine Oxidation.', [
      ['Eine Reduktion.', 'Reduktion heisst Elektronen aufnehmen. Hier werden sie abgegeben.'],
      ['Eine Kernreaktion.', 'Es ändern sich nur Elektronen in der Hülle, nicht der Kern.'],
      ['Gar keine Reaktion.', 'Das Atom wird zum Ion. Das ist eine Teilreaktion.']],
      'Elektronen abgeben heisst Oxidation, Elektronen aufnehmen heisst Reduktion.'),
    S('halbwert', 2, 'Wähle Kohlenstoff-14 und stelle 2 Halbwertszeiten ein. Wie viel ist von 64 g übrig?', '16 g nach 11 460 Jahren.', [
      ['32 g.', '32 g bleiben nach einer Halbwertszeit.'],
      ['0 g.', 'Die Menge halbiert sich, sie wird aber nie ganz null.'],
      ['16 g nach 16 Tagen.', 'Das gilt für radioaktives Iod. Kohlenstoff-14 hat 5730 Jahre Halbwertszeit.']],
      'Bei jeder Halbwertszeit halbiert sich die Menge: 64, 32, 16 g.'),
    S('kern', 2, 'In der Sonne verschmelzen Wasserstoff-Kerne zu Helium. Was ist das?', 'Kernfusion.', [
      ['Kernspaltung.', 'Bei der Kernspaltung wird ein grosser Kern zerlegt.'],
      ['Eine chemische Reaktion.', 'Chemische Reaktionen betreffen die Hülle. Hier verschmelzen Kerne.'],
      ['Eine Verbrennung.', 'Eine Verbrennung ist eine chemische Reaktion mit Sauerstoff.']],
      'Kleine Kerne verschmelzen: Kernfusion. Grosse Kerne zerfallen: Kernspaltung.')
  ],
  'nt9-3': [
    S('ledsim', 3, 'Stelle 9 V und 200 Ω ein. Was passiert mit der LED?', 'Sie geht kaputt, weil die Stromstärke über 20 mA steigt.', [
      ['Sie leuchtet normal.', 'Bei 9 V und 200 Ω fliessen (9 − 2) V : 200 Ω = 35 mA. Das ist zu viel.'],
      ['Sie bleibt dunkel.', 'Dunkel bleibt sie bei falscher Polung oder zu kleiner Spannung.'],
      ['Sie leuchtet schwach.', 'Schwach leuchtet sie bei sehr grossem Widerstand.']],
      'Eine rote LED verträgt etwa 20 mA. Ein grösserer Vorwiderstand senkt die Stromstärke.'),
    S('halbl', 2, 'Wähle «reiner Halbleiter» und erhöhe Temperatur oder Licht. Was geschieht?', 'Es gibt mehr frei bewegliche Ladungsträger.', [
      ['Es gibt weniger Ladungsträger.', 'Wärme und Licht lösen Elektronen. Es werden mehr.'],
      ['Nichts.', 'Halbleiter reagieren stark auf Temperatur und Licht.'],
      ['Der Halbleiter wird zum Isolator.', 'Er leitet besser, nicht schlechter.']],
      'Mit Wärme oder Licht lösen sich Elektronen. Dotierung liefert schon bei Zimmertemperatur Ladungsträger.'),
    S('dotier', 2, 'Phosphor (5 Aussenelektronen) wird in Silizium eingebaut. Welche Dotierung ist das?', 'n-Dotierung (freie Elektronen).', [
      ['p-Dotierung (Löcher).', 'Löcher entstehen mit Fremdatomen, die weniger als 4 Aussenelektronen haben.'],
      ['Keine Dotierung.', 'Ein eingebautes Fremdatom ist eine Dotierung.'],
      ['Eine Diode.', 'Eine Diode entsteht erst aus p- und n-dotierten Schichten zusammen.']],
      'Mehr als vier Aussenelektronen: Ein Elektron bleibt frei beweglich.'),
    S('diode', 2, 'Eine LED ist mit vertauschten Polen angeschlossen. Fliesst Strom?', 'Nein, sie sperrt.', [
      ['Ja, aber schwächer.', 'In Sperrrichtung fliesst praktisch kein Strom.'],
      ['Ja, gleich stark.', 'Eine Diode lässt den Strom nur in einer Richtung durch.'],
      ['Ja, und sie leuchtet in einer anderen Farbe.', 'Die Farbe hängt vom Material ab, nicht von der Richtung.']],
      'Durchlassrichtung: Anode an Plus. In Sperrrichtung fliesst kein Strom.'),
    S('foto', 2, 'Erhöhe die Lichtstärke. Was geschieht?', 'Der Widerstand sinkt, die Stromstärke steigt, die LED leuchtet heller.', [
      ['Der Widerstand steigt, die LED wird dunkler.', 'Umgekehrt: Bei mehr Licht wird der Widerstand kleiner.'],
      ['Der Fotowiderstand erzeugt Strom.', 'Er ist ein passiver Sensor und liefert keinen Strom.'],
      ['Nichts ändert sich.', 'Der Fotowiderstand reagiert auf Licht.']],
      'Je mehr Licht, desto kleiner der Widerstand und desto grösser die Stromstärke.'),
    S('sensoren', 2, 'Eine Fitness-App zählt deine Schritte. Welcher Sensor ist das?', 'Der Beschleunigungssensor.', [
      ['Der Helligkeitssensor.', 'Er misst das Licht der Umgebung.'],
      ['Das Magnetometer.', 'Es misst das Erdmagnetfeld für den Kompass.'],
      ['Der Näherungssensor.', 'Er erkennt, ob etwas nahe am Bildschirm ist.']],
      'Bei jedem Schritt wird das Gerät kurz beschleunigt. Das misst der Beschleunigungssensor.')
  ],
  'nt9-4': [
    S('umwandlung', 2, 'Welche Energieform hat eine gespannte Feder?', 'Verformungsenergie.', [
      ['Lageenergie.', 'Lageenergie hat ein Körper wegen seiner Höhe.'],
      ['Thermische Energie.', 'Thermische Energie hat zum Beispiel eine heisse Herdplatte.'],
      ['Chemische Energie.', 'Chemische Energie steckt in Stoffen wie Benzin.']],
      'Eine verformte Feder speichert Energie und gibt sie beim Entspannen wieder ab.'),
    S('fall', 3, 'Stelle die Höhe auf 0 m. Wie viel Bewegungsenergie hat der 2-kg-Ball aus 20 m Höhe?', '400 J.', [
      ['0 J.', 'Unten ist die Lageenergie null. Sie wurde ganz zu Bewegungsenergie.'],
      ['200 J.', 'Lageenergie oben: 2 kg · 10 N/kg · 20 m = 400 J, nicht 200 J.'],
      ['40 J.', 'Du musst auch mit g = 10 N/kg multiplizieren: 2 · 10 · 20 = 400.']],
      'Ohne Reibung wird die ganze Lageenergie zu Bewegungsenergie. Der Ball ist unten 20 m/s schnell.'),
    S('wirkung', 2, 'Stelle 30 % ein. Wie viel Energie von 100 J wird entwertet?', '70 J.', [
      ['30 J.', '30 J werden genutzt. Der Rest wird entwertet.'],
      ['0 J.', 'Bei 30 % wird der grösste Teil entwertet.'],
      ['100 J.', 'Ein Teil wird ja genutzt, nämlich 30 J.']],
      'Genutzt + entwertet = zugeführt. Meist wird der Rest zu thermischer Energie.'),
    S('leistung', 3, 'Stelle 2000 W und 3 h ein. Wie viel Energie nutzt das Gerät?', '6 kWh.', [
      ['6000 kWh.', '2000 W sind 2 kW. 2 kW · 3 h = 6 kWh.'],
      ['0,6 kWh.', '2 kW · 3 h = 6 kWh, nicht 0,6.'],
      ['2000 kWh.', 'Die Leistung muss mit der Zeit multipliziert und in kW umgerechnet werden.']],
      'E = P · t. Bei 0,25 Fr. pro kWh kostet das 1,50 Fr.'),
    S('anlage', 2, 'Welcher Energieträger ist nicht erneuerbar?', 'Erdöl.', [
      ['Wind.', 'Wind steht immer wieder zur Verfügung.'],
      ['Biomasse.', 'Holz und Gartenabfälle wachsen nach.'],
      ['Sonnenstrahlung.', 'Die Sonne scheint immer wieder.']],
      'Fossile Brennstoffe und Uran sind begrenzt. Wasser, Sonne, Wind und Biomasse sind erneuerbar.'),
    S('sparen', 2, 'Welches Verhalten spart Energie?', 'Wasser im Wasserkocher statt in der Pfanne erhitzen.', [
      ['Die Waschmaschine halbvoll laufen lassen.', 'Besser voll beladen, dann wird die Energie besser genutzt.'],
      ['Ein Gerät dauernd im Stand-by lassen.', 'Auch im Stand-by wird Energie genutzt.'],
      ['Einen tropfenden Hahn nicht reparieren.', 'Es geht Warmwasser und damit Energie verloren.']],
      'Der Wasserkocher gibt die Wärme direkt ans Wasser ab und ist dafür effizienter.')
  ],
  'nt9-5': [
    S('begriffe', 2, 'Was ist ein Abschnitt der DNA mit dem Bauplan für ein Protein?', 'Ein Gen.', [
      ['Ein Chromosom.', 'Ein Chromosom ist ein ganzer Faden mit sehr vielen Genen.'],
      ['Ein Protein.', 'Das Protein wird nach dem Bauplan hergestellt. Der Bauplan ist das Gen.'],
      ['Der Zellkern.', 'Im Zellkern liegen die Chromosomen mit den Genen.']],
      'Zellkern → Chromosomen → DNA → Gene. Gene enthalten die Baupläne für Proteine.'),
    S('mitose', 2, 'Verfolge die Teilung. Wie viele Chromosomen hat jede menschliche Tochterzelle am Schluss?', '46.', [
      ['23.', '23 Chromosomen haben nur Geschlechtszellen. Bei der Mitose bleibt die Zahl gleich.'],
      ['92.', '92 Chromatiden gibt es nur kurz vor der Trennung.'],
      ['Je nach Zelle verschieden.', 'Alle Körperzellen eines Menschen haben 46 Chromosomen.']],
      'Weil die Chromosomen vorher verdoppelt werden, haben beide Tochterzellen alle Erbinformationen.'),
    S('teilung', 2, 'Stelle 5 Teilungsrunden ein. Wie viele Zellen sind es?', '32.', [
      ['10.', 'Die Zahl wird verdoppelt, nicht um 2 erhöht: 2, 4, 8, 16, 32.'],
      ['25.', '2⁵ = 32, nicht 5².'],
      ['5.', 'Nach jeder Runde verdoppelt sich die Zahl.']],
      'Nach n Teilungsrunden gibt es 2ⁿ Zellen.'),
    S('dnapaar', 2, 'Welche Base gehört im Gegenstrang zu G?', 'C.', [
      ['T.', 'T gehört zu A.'],
      ['A.', 'A gehört zu T.'],
      ['G.', 'Gleiche Basen paaren sich nicht.']],
      'A paart sich mit T, G mit C.'),
    S('mutation', 2, 'UV-Strahlung der Sonne schädigt die DNA. Welche Ursache ist das?', 'Physikalisch.', [
      ['Chemisch.', 'Chemische Ursachen sind Stoffe, zum Beispiel aus Abgasen.'],
      ['Biologisch.', 'Biologische Ursachen sind zum Beispiel bestimmte Viren.'],
      ['Kopierfehler.', 'Ein Kopierfehler entsteht in der Zelle bei der Verdopplung.']],
      'Strahlung wie UV- und Röntgenstrahlen sind physikalische Ursachen von Mutationen.'),
    S('codon', 3, 'Stelle 2 Basen pro Codewort ein. Warum reicht das nicht?', 'Es gibt nur 16 Möglichkeiten, aber 20 Aminosäuren.', [
      ['Es gibt zu viele Möglichkeiten.', '4² = 16 ist weniger als 20.'],
      ['Es gibt nur 8 Möglichkeiten.', '4 · 4 = 16, nicht 4 · 2.'],
      ['Es reicht doch.', '16 Codewörter genügen nicht für 20 Aminosäuren.']],
      'Mit drei Basen gibt es 4³ = 64 Möglichkeiten. Das reicht für alle 20 Aminosäuren.'),
    S('ethik', 3, '«Künftige Risiken müssen rechtzeitig bedacht werden.» Zu welcher Wertvorstellung gehört das?', 'Verantwortung.', [
      ['Menschenwürde.', 'Zur Menschenwürde gehört zum Beispiel die Selbstbestimmung.'],
      ['Glück.', 'Beim Glück geht es darum, Nutzen und Schmerz aller Betroffenen abzuwägen.'],
      ['Zu keiner.', 'Das Vorausdenken von Risiken ist der Kern der Verantwortung.']],
      'Menschenwürde, Verantwortung und Glück helfen, ethische Fragen der Gentechnik abzuwägen.')
  ],
  'nt9-6': [
    S('zeitstrahl', 2, 'Schiebe den Regler auf 700 Millionen Jahre. Was geschah damals?', 'Sauerstoff reicherte sich stark an, die Ozonschicht entstand.', [
      ['Die Erde entstand.', 'Die Erde entstand vor etwa 4500 Millionen Jahren.'],
      ['Die ersten Landpflanzen entstanden.', 'Landpflanzen gibt es seit etwa 400 Millionen Jahren.'],
      ['Die Dinosaurier starben aus.', 'Das war vor etwa 65 Millionen Jahren.']],
      'Die Ozonschicht schützt vor Strahlung und machte Leben an Land möglich.'),
    S('homolog', 3, 'Die Flossen von Hai und Wal: Homologie oder Analogie?', 'Analogie: gleiche Funktion, verschiedener Aufbau.', [
      ['Homologie, weil beide schwimmen.', 'Homologie heisst gleicher Aufbau. Hai (Fisch) und Wal (Säugetier) haben verschieden gebaute Flossen.'],
      ['Homologie, weil beide im Meer leben.', 'Der Lebensraum entscheidet nicht. Es zählt der Aufbau.'],
      ['Weder noch.', 'Gleiche Funktion bei verschiedenem Aufbau ist eine Analogie.']],
      'Analogien zeigen keine nahe Verwandtschaft. Sie entstehen durch Anpassung an dieselbe Aufgabe.'),
    S('giraffe', 2, '«Bei knapper Nahrung überleben die Giraffen mit langem Hals eher.» Zu welcher Theorie gehört das?', 'Darwin und Wallace.', [
      ['Lamarck.', 'Lamarck meinte, die Giraffen hätten ihre Hälse durch Strecken verlängert.'],
      ['Zu beiden.', 'Lamarck kannte keine Auslese. Er glaubte an die Vererbung erworbener Eigenschaften.'],
      ['Zu keiner.', 'Das ist die natürliche Selektion nach Darwin und Wallace.']],
      'Zufällige Unterschiede und natürliche Auslese: Das ist die Theorie von Darwin und Wallace.'),
    S('faktor', 2, 'Ein Gletscher trennt zwei Gruppen einer Art. Welcher Evolutionsfaktor ist das?', 'Isolation.', [
      ['Natürliche Selektion.', 'Bei der Selektion überleben besser angepasste Lebewesen. Hier werden Gruppen getrennt.'],
      ['Zufallseffekt.', 'Ein Zufallseffekt tötet zufällig Tiere, zum Beispiel eine Überschwemmung.'],
      ['Variabilität.', 'Variabilität entsteht durch Rekombination und Mutation.']],
      'Getrennte Gruppen tauschen kein Erbmaterial mehr aus und können sich zu neuen Arten entwickeln.'),
    S('selektion', 3, 'Schiebe auf 6 Generationen. Was geschieht mit dem Anteil der grünen Käfer?', 'Er steigt stark, die grünen werden viel häufiger.', [
      ['Er sinkt.', 'Die Vögel fressen vor allem braune Käfer. Die grünen überleben eher.'],
      ['Er bleibt bei 50 %.', 'Die Auslese verändert die Anteile in jeder Generation.'],
      ['Alle Käfer werden braun.', 'Die braunen werden häufiger gefressen und damit seltener.']],
      'Besser getarnte Käfer überleben eher und haben mehr Nachkommen.'),
    S('isolation', 3, 'Grasfrosch und Wasserfrosch paaren sich zu verschiedenen Zeiten. Welche Isolation ist das?', 'Jahreszeitliche Isolation.', [
      ['Räumliche Isolation.', 'Räumlich wäre die Trennung durch einen Gletscher oder Fluss.'],
      ['Spezialisierung.', 'Spezialisierung heisst Anpassung an verschiedene Nahrung oder Lebensräume.'],
      ['Gar keine Isolation.', 'Weil sie sich nie paaren, sind sie getrennt.']],
      'Der Grasfrosch paart sich im März, der Wasserfrosch im Mai und Juni.')
  ],
  'nt9-7': [
    S('zeiger', 2, 'Im Nadelwald wachsen viele Heidelbeeren. Was zeigt das an?', 'Sauren Boden.', [
      ['Nährstoffreichen Boden.', 'Nährstoffreichen Boden zeigt zum Beispiel der Wiesenkerbel an.'],
      ['Versiegelten Boden.', 'Auf versiegeltem Boden wachsen keine Pflanzen.'],
      ['Basischen Boden.', 'Heidelbeeren meiden basischen Boden.']],
      'Nadeln senken den pH-Wert. Heidelbeeren zeigen sauren Boden an.'),
    S('bodenbau', 2, 'Welcher Bestandteil macht knapp die Hälfte des Bodens aus?', 'Gesteinsbruchstücke.', [
      ['Humus.', 'Humus ist nur ein kleiner Rest, etwa 5 %.'],
      ['Wasser.', 'Wasser macht etwa ein Viertel aus.'],
      ['Luft.', 'Luft macht etwa ein Viertel aus.']],
      'Etwa 45 % Gestein, je etwa 25 % Wasser und Luft, etwa 5 % Humus.'),
    S('boden', 3, 'Stelle die Verdichtung auf 100 %. Was passiert?', 'Der Boden speichert nur noch etwa 10 % Wasser, Regen fliesst oberflächlich ab.', [
      ['Der Boden speichert mehr Wasser.', 'Verdichtung drückt die Hohlräume zusammen. Es passt weniger Wasser hinein.'],
      ['Nichts ändert sich.', 'Die Wasserspeicherfähigkeit sinkt deutlich.'],
      ['Der Boden bleibt im Idealbereich.', '10 % liegt unter dem Idealbereich von 15 bis 40 %.']],
      'Verdichtete Böden speichern wenig Wasser. Das trägt zu Hochwasser bei.'),
    S('versiegel', 3, 'Stelle 100 % Versiegelung ein. Was geschieht mit dem Regenwasser?', 'Mehr fliesst an der Oberfläche ab, weniger versickert.', [
      ['Mehr versickert ins Grundwasser.', 'Durch Beton und Asphalt kann kein Wasser versickern.'],
      ['Alles verdunstet.', 'Die Verdunstung sinkt sogar ein wenig.'],
      ['Nichts ändert sich.', 'Versiegelung verändert die Verteilung des Wassers stark.']],
      'Versiegelung führt zu weniger Grundwasser und häufigeren Überschwemmungen.'),
    S('gruende', 2, 'Eine Autobahn trennt zwei Waldstücke. Welcher Grund für den Artenrückgang ist das?', 'Verinselung.', [
      ['Übernutzung.', 'Übernutzung heisst, mehr zu entnehmen, als nachwächst.'],
      ['Fremde Arten.', 'Fremde Arten sind eingeschleppte Tiere und Pflanzen.'],
      ['Verschmutzung.', 'Verschmutzung kommt zum Beispiel von Pestiziden und Dünger.']],
      'Zerschnittene Lebensräume werden für viele Arten zu klein.'),
    S('permakultur', 2, '«Das Schaf liefert Milch und Wolle, mäht und düngt das Gras.» Welcher Grundsatz ist das?', 'Vernetzung fördern.', [
      ['Von der Natur lernen.', 'Das heisst, bewährte Abläufe der Natur nachzuahmen.'],
      ['Kreisläufe ermöglichen.', 'Das heisst, Stoffe, Wasser und Energie aus der Nähe zu beziehen.'],
      ['Vielfalt ermöglichen.', 'Das heisst, sinnvolle Gemeinschaften von Tieren und Pflanzen zu bilden.']],
      'Ein Element erfüllt mehrere Aufgaben: Das ist Vernetzung.')
  ],
  'nt9-8': [
    S('kreislauf', 2, 'Ein Elektrogerät landet im Hausmüll. Ist das ein Kreislauf oder eine Sackgasse?', 'Eine Sackgasse: Die Metalle gehen verloren.', [
      ['Ein Kreislauf.', 'Im Hausmüll werden die Metalle nicht zurückgewonnen.'],
      ['Ein Kreislauf, weil Müll verbrannt wird.', 'Beim Verbrennen gehen die Metalle als Rohstoffe verloren.'],
      ['Weder noch.', 'Die Rohstoffe kommen nicht zurück. Das ist eine Sackgasse.']],
      'Elektrogeräte gehören ins Recycling, damit die Metalle wieder genutzt werden.'),
    S('ckreis', 3, 'Stelle die Verbrennung auf 0. Was zeigt das Modell?', 'Aufnahme und Abgabe sind im Gleichgewicht, es kommt kein zusätzlicher Kohlenstoff dazu.', [
      ['Der Kohlenstoff in der Atmosphäre steigt trotzdem stark.', 'Ohne Verbrennung gleichen sich Aufnahme und Abgabe im Modell aus.'],
      ['Die Fotosynthese hört auf.', 'Fotosynthese und Atmung laufen weiter und sind etwa gleich gross.'],
      ['Der Ozean gibt viel Kohlenstoff ab.', 'Im Modell nimmt der Ozean eher Kohlenstoff auf.']],
      'Die Verbrennung fossiler Energieträger bringt zusätzlichen Kohlenstoff in die Atmosphäre.'),
    S('treibhaus', 2, 'Welches Gas ist kein wichtiges Treibhausgas?', 'Sauerstoff (O₂).', [
      ['Methan (CH₄).', 'Methan ist ein Treibhausgas. Seine Konzentration hat sich verdoppelt.'],
      ['Kohlenstoffdioxid (CO₂).', 'CO₂ ist ein wichtiges Treibhausgas.'],
      ['Wasserdampf.', 'Wasserdampf ist hauptverantwortlich für den natürlichen Treibhauseffekt.']],
      'Wasserdampf, CO₂ und Methan speichern thermische Energie in der Atmosphäre.'),
    S('quelle', 3, 'Welche Aussage ist eine wissenschaftliche Erkenntnis?', 'Die CO₂-Konzentration ist in den letzten 100 Jahren um mehr als ein Viertel gestiegen.', [
      ['Der Klimaschwindel ist eine grosse Panikmache.', 'Das ist eine Behauptung ohne Belege.'],
      ['Klimaforschenden geht es vor allem um Ruhm.', 'Das ist eine Unterstellung ohne Belege.'],
      ['Weil sich das Klima schon immer verändert hat, ist nichts menschengemacht.', 'Natürliche Schwankungen schliessen menschliche Ursachen nicht aus.']],
      'Erkenntnisse beruhen auf Messungen und Belegen. Frage immer: Wer sagt das, und gibt es Belege?'),
    S('rohstoff', 2, 'Welcher Rohstoff wächst nach?', 'Baumwolle.', [
      ['Kobalt.', 'Metalle werden aus Erzen gewonnen und wachsen nicht nach.'],
      ['Erdöl.', 'Erdöl bildet sich nicht in menschlichen Zeiträumen neu.'],
      ['Uran.', 'Uran ist nicht nachwachsend.']],
      'Nachwachsende Rohstoffe entstehen in menschlichen Zeiträumen wieder, zum Beispiel Baumwolle und Holz.'),
    S('wassersim', 2, 'Stelle 5 T-Shirts ein. Wie viel Wasser kann für die Baumwolle höchstens nötig sein?', '10 000 Liter (10 m³).', [
      ['2000 Liter.', '2000 Liter gelten für ein T-Shirt. Hier sind es fünf.'],
      ['1000 Liter.', 'Pro T-Shirt sind es bis zu 2000 Liter.'],
      ['100 000 Liter.', '5 · 2000 L = 10 000 L, nicht 100 000.']],
      'Bis zu 2000 Liter pro T-Shirt. Die Menge hängt vom Anbaugebiet ab.')
  ]
};
