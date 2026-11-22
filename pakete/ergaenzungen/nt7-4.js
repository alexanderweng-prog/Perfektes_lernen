// Ergänzungen zum Paket «Bewegungen erkunden» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

const tabelle = (zeiten, wege) => `<table class="dtab"><tr><th>Zeit t in s</th>${zeiten.map(t => `<td>${t}</td>`).join('')}</tr><tr><th>Weg s in m</th>${wege.map(s => `<td>${s}</td>`).join('')}</tr></table>`;

export default {
  erklaerungen: {
    'b1-zug': {
      1: 'Gleichförmig hiesse: gleiches Tempo. Der Zug wird aber schneller.',
      2: 'Verzögert hiesse: langsamer werden. Der Zug wird schneller.',
      3: 'Auch auf Schienen bewegt sich der Zug. Die Schienen geben nur die Richtung vor.'
    },
    'b1-bremsen': {
      1: 'Beschleunigt hiesse: schneller werden. Beim Bremsen wird das Auto langsamer.',
      2: 'Gleichförmig hiesse: gleiches Tempo. Beim Bremsen nimmt das Tempo ab.',
      3: 'Das Auto hat eine Geschwindigkeit, bis es steht. Sie nimmt nur ab.'
    },
    'b1-velo': {
      1: 'Das Velo wird nicht schneller, es bleibt bei 18 km/h.',
      2: 'Das Velo wird nicht langsamer.',
      3: 'Gleichförmige Bewegungen gibt es auch im Alltag, zum Beispiel beim gleichmässigen Velofahren.'
    },
    'b1-kombi': {
      1: 'Im Alltag folgen die Bewegungsarten meist aufeinander: losfahren, fahren, bremsen.',
      2: 'Jede Fahrt beginnt mit Beschleunigen und endet mit Verzögern.',
      3: 'Jedes Anfahren ist eine beschleunigte Bewegung, auch beim Velo oder Bus.'
    },
    'b1-begriff': {
      1: 'Schnell sein heisst nicht beschleunigen. Ein schnelles Auto mit konstantem Tempo beschleunigt nicht.',
      2: 'Ein langer Weg sagt nichts über die Beschleunigung.',
      3: 'Bleibt die Geschwindigkeit gleich, ist die Bewegung gleichförmig.'
    },
    'b1-richtung': {
      1: 'Die Masse sagt nichts darüber, wohin und wie schnell sich etwas bewegt.',
      2: 'Die Farbe hat mit der Bewegung nichts zu tun.',
      3: 'Die Temperatur beschreibt keine Bewegung.'
    },
    'b2-einheit': {
      1: 'Der Schrägstrich bedeutet «pro», also geteilt durch, nicht mal.',
      2: 'km steht für Kilometer, nicht für Kilogramm.',
      3: 'Einheiten mit verschiedenen Grössen kann man nicht addieren.'
    },
    'b2-vergleich': {
      1: 'Jan braucht weniger Zeit, läuft aber auch weniger weit. Man muss die Geschwindigkeit berechnen.',
      2: 'Rechne nach: Jan etwa 6,2 m/s, Marco etwa 6,9 m/s. Das ist nicht gleich.',
      3: 'Doch, mit v = s : t lassen sich verschiedene Strecken vergleichen.'
    },
    'b3-herleitung': {
      1: 'Ein Meter hat 100 Zentimeter. Der Faktor kommt von 3600 Sekunden pro Stunde.',
      2: 'Eine Stunde hat 60 Minuten oder 3600 Sekunden.',
      3: 'Der Faktor ist begründet: 3600 m pro Stunde sind 3,6 km pro Stunde.'
    },
    'b3-schneller': {
      1: '60 km/h sind etwa 17 m/s, also weniger als 20 m/s.',
      2: '20 m/s sind 72 km/h, nicht 60 km/h.',
      3: 'Vergleichen geht, wenn du zuerst in dieselbe Einheit umrechnest.'
    },
    'b4-achsen': {
      1: 'Der Weg kommt auf die senkrechte Achse (y-Achse).',
      2: 'Im Zeit-Weg-Diagramm wird die Geschwindigkeit nicht als Achse aufgetragen. Sie zeigt sich in der Steilheit.',
      3: 'Es gibt eine feste Regel: Zeit auf die x-Achse, Weg auf die y-Achse.'
    },
    'b4-skala': {
      1: 'Fehlt die 15, sind die Abstände ungleich. Das verzerrt das Diagramm.',
      2: 'Nur Anfang und Ende reichen nicht, um Werte genau einzutragen.',
      3: 'Die Abstände wachsen immer mehr. Für eine normale Skala müssen sie gleich gross sein.'
    },
    'b4-wiederholung': {
      1: 'Die erste Messung ist nicht falsch, nur ungenau wie jede Messung.',
      2: 'Es geht nicht um die Dauer, sondern um ein zuverlässigeres Ergebnis.',
      3: 'Man nimmt nicht den kleinsten Wert, sondern den Mittelwert aller Messungen.'
    },
    'b5-erkennen': {
      1: 'Diese Kurve wird immer steiler. Das zeigt eine beschleunigte Bewegung.',
      2: 'Eine waagrechte Linie im Zeit-Weg-Diagramm heisst: Der Weg ändert sich nicht, also Stillstand.',
      3: 'Diese Kurve wird immer flacher. Das zeigt eine verzögerte Bewegung.'
    },
    'b5-vt': {
      1: 'Eine ansteigende Gerade im Zeit-Geschwindigkeits-Diagramm zeigt eine beschleunigte Bewegung.',
      2: 'Eine fallende Gerade zeigt eine verzögerte Bewegung.',
      3: 'Eine immer steilere Kurve hiesse, dass die Geschwindigkeit immer schneller zunimmt.'
    },
    'b5-doppelt': {
      1: 'Flacher hiesse langsamer. Der schnellere Läufer legt pro Sekunde mehr Weg zurück.',
      2: 'Verschiedene Geschwindigkeiten ergeben verschieden steile Geraden.',
      3: 'Bei gleichbleibendem Tempo bleibt es eine Gerade, nur steiler.'
    },
    'b5-tabelle': {
      1: 'Bei einer beschleunigten Bewegung würde der Weg pro Sekunde wachsen. Hier sind es immer 6 m.',
      2: 'Bei einer verzögerten Bewegung würde der Weg pro Sekunde kleiner. Hier bleibt er bei 6 m.',
      3: 'Der Weg nimmt zu, also bewegt sich der Körper.'
    },
    'b6-st': {
      1: 'Eine Gerade zeigt eine gleichförmige Bewegung, keine beschleunigte.',
      2: 'Diese Kurve wird immer flacher. Das ist eine verzögerte Bewegung.',
      3: 'Eine waagrechte Linie heisst Stillstand.'
    },
    'b6-vt-beschl': {
      1: 'Eine waagrechte Linie zeigt eine gleichbleibende Geschwindigkeit.',
      2: 'Eine fallende Gerade zeigt eine verzögerte Bewegung.',
      3: 'Bei gleichmässiger Beschleunigung steigt die Geschwindigkeit gleichmässig, also als Gerade.'
    },
    'b6-vt-verz': {
      1: 'Eine ansteigende Gerade zeigt eine beschleunigte Bewegung.',
      2: 'Eine waagrechte Linie zeigt eine gleichförmige Bewegung.',
      3: 'Eine ansteigende Kurve hiesse, dass die Geschwindigkeit zunimmt.'
    },
    'b6-tabelle': {
      1: 'Gleichförmig hiesse: in jeder Sekunde gleich viel Weg. Hier wird der Weg pro Sekunde kleiner.',
      2: 'Beschleunigt hiesse: Der Weg pro Sekunde wird grösser. Hier wird er kleiner (7, 5, 3, 1 m).',
      3: 'Der Weg nimmt noch zu, also bewegt sich der Körper.'
    },
    'b6-geschichte': {
      1: 'Dieses Diagramm beginnt schnell, wird langsamer, steht und fährt wieder an. Das ist umgekehrt.',
      2: 'Hier fehlt der Teil mit gleichbleibendem Tempo in der Mitte.',
      3: 'Eine waagrechte Linie hiesse: die ganze Zeit gleiches Tempo, ohne Anfahren und Bremsen.'
    }
  },

  aufgaben: [
    { id: 'b1-kombi-v2', wieVorlage: 'b1-kombi', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Ein Bus fährt von einer Haltestelle zur nächsten. Bringe die Bewegungsarten in die richtige Reihenfolge.',
      elemente: ['beschleunigt (anfahren)', 'gleichförmig (fahren)', 'verzögert (bremsen)'],
      erklaerung: 'Aus dem Stand wird zuerst beschleunigt, dann gleichförmig gefahren und zum Halten verzögert.' },

    { id: 'b1-begriff-v2', wieVorlage: 'b1-begriff', schwierigkeit: 3,
      ...mc('Ein Flugzeug fliegt mit gleichbleibenden 900 km/h geradeaus. Beschleunigt es?', 'Nein, die Geschwindigkeit bleibt gleich.', [
        ['Ja, weil es sehr schnell ist.', 'Schnell ist nicht dasselbe wie beschleunigt. Es ändert sein Tempo nicht.'],
        ['Ja, weil es einen grossen Weg zurücklegt.', 'Ein grosser Weg heisst nicht, dass das Tempo zunimmt.'],
        ['Ja, weil die Triebwerke laufen.', 'Die Triebwerke halten das Tempo nur gegen den Luftwiderstand.']],
        'Beschleunigen heisst, dass die Geschwindigkeit zunimmt. Bei gleichem Tempo ist die Bewegung gleichförmig.') },

    { id: 'b1-richtung-v2', wieVorlage: 'b1-richtung', schwierigkeit: 2,
      ...mc('Zwei Autos fahren gleich schnell, eines nach Norden, eines nach Süden. Haben sie dieselbe Bewegung?', 'Nein, die Richtung ist verschieden.', [
        ['Ja, weil sie gleich schnell sind.', 'Zur Bewegung gehört auch die Richtung.'],
        ['Ja, wenn sie gleich schwer sind.', 'Die Masse beschreibt die Bewegung nicht.'],
        ['Das kann man nicht sagen.', 'Doch: Gleiche Geschwindigkeit, aber verschiedene Richtung heisst verschiedene Bewegung.']],
        'Eine Bewegung beschreibst du mit Richtung und Geschwindigkeit.') },

    { id: 'b2-vergleich-v2', wieVorlage: 'b2-vergleich', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const s = zufall([60, 80, 100]), t = zufall([10, 12.5, 16]);
        return zahl(`Mira läuft ${s} m in ${z(t)} s. Wie gross ist ihre Geschwindigkeit in m/s?`, s / t, 'm/s', `v = ${s} m : ${z(t)} s = ${z(s / t, 2)} m/s`, 'v = s : t', { toleranzRel: 0.02 });
      } },
    { id: 'b2-vergleich-v3', wieVorlage: 'b2-vergleich', schwierigkeit: 3,
      ...mc('Velo A fährt 30 km in 1,5 h. Velo B fährt 24 km in 1 h. Welches ist schneller?', 'Velo B: 24 km/h gegenüber 20 km/h.', [
        ['Velo A, weil es weiter fährt.', 'Velo A fährt weiter, braucht aber auch mehr Zeit: 30 : 1,5 = 20 km/h.'],
        ['Beide gleich schnell.', 'A: 20 km/h, B: 24 km/h. Das ist verschieden.'],
        ['Das lässt sich nicht vergleichen.', 'Mit v = s : t kannst du beide vergleichen.']],
        'A: 30 km : 1,5 h = 20 km/h. B: 24 km : 1 h = 24 km/h. B ist schneller.') },

    { id: 'b2-mittel-v2', wieVorlage: 'b2-mittel', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const s1 = zufall([20, 30]), s2 = zufall([20, 40]), t1 = zufall([1, 2]), t2 = zufall([1, 2]);
        return zahl(`Ein Wanderer läuft zuerst ${s1} km in ${t1} h, nach der Pause noch ${s2} km in ${t2} h. Wie gross ist seine Durchschnittsgeschwindigkeit ohne die Pause?`,
          (s1 + s2) / (t1 + t2), 'km/h', `Gesamtweg ${s1 + s2} km, Gesamtzeit ${t1 + t2} h. v = ${s1 + s2} km : ${t1 + t2} h = ${z((s1 + s2) / (t1 + t2), 2)} km/h`,
          'Gesamtweg durch Gesamtzeit, nicht die beiden Geschwindigkeiten mitteln.', { toleranzRel: 0.02 });
      } },

    { id: 'b3-tempo-v2', wieVorlage: 'b3-tempo', schwierigkeit: 3,
      ...mc('Ein Auto legt in einer Tempo-30-Zone 15 m in 1 s zurück. Hält es sich an das Tempo?', 'Nein: 15 m/s sind 54 km/h.', [
        ['Ja: 15 ist weniger als 30.', 'Achtung Einheiten: 15 m/s sind nicht 15 km/h. Mal 3,6 gerechnet sind es 54 km/h.'],
        ['Ja: 15 m/s sind etwa 4 km/h.', 'Von m/s zu km/h rechnet man mal 3,6, nicht geteilt durch 3,6.'],
        ['Das lässt sich nicht sagen.', 'Doch: 15 m/s · 3,6 = 54 km/h.']],
        '15 m/s · 3,6 = 54 km/h. Das ist fast doppelt so schnell wie erlaubt.') },

    { id: 'b3-rasen-v2', wieVorlage: 'b3-rasen', typ: 'zahl', schwierigkeit: 4,
      erzeuge() {
        const s = zufall([40, 80, 120]), v1 = 80, v2 = zufall([100, 120]);
        const d = (s / v1 - s / v2) * 60;
        return zahl(`Eine Strecke ist ${s} km lang. Wie viele Minuten sparst du, wenn du mit ${v2} km/h statt mit ${v1} km/h fährst?`, d, 'min',
          `t₁ = ${s} : ${v1} = ${z(s / v1)} h, t₂ = ${s} : ${v2} = ${z(s / v2)} h<br>Unterschied: ${z(s / v1 - s / v2)} h = ${z(d, 1)} min`,
          'Für beide Geschwindigkeiten t = s : v berechnen, dann die Differenz in Minuten.', { toleranzRel: 0.02 });
      } },

    { id: 'b4-wiederholung-v2', wieVorlage: 'b4-wiederholung', schwierigkeit: 2,
      ...mc('Drei Gruppen messen dieselbe Fallzeit und erhalten 1,2 s, 1,3 s und 1,1 s. Was schliesst du daraus?', 'Das ist normal: Jede Messung ist etwas ungenau. Der Mittelwert ist 1,2 s.', [
        ['Zwei Gruppen haben falsch gemessen.', 'Kleine Unterschiede sind Messungenauigkeiten, keine Fehler.'],
        ['Man muss den grössten Wert nehmen.', 'Man nimmt den Mittelwert, nicht den grössten Wert.'],
        ['Die Fallzeit ändert sich jedes Mal.', 'Die Fallzeit bleibt gleich, nur die Messung schwankt.']],
        'Messungenauigkeiten gehören zu jeder Messung. Mit dem Mittelwert wird das Ergebnis zuverlässiger.') },

    { id: 'b4-mittelwert-v2', wieVorlage: 'b4-mittelwert', typ: 'zahl', schwierigkeit: 2,
      erzeuge() {
        const m = zufall([4.5, 6.2, 8.0, 12.4]), a = zufall([0.2, 0.3, 0.4]);
        const werte = [m - a, m + a / 2, m + a / 2];
        return zahl(`Vier Messungen für dieselbe Strecke: ${werte.map(w => z(w, 2) + ' s').join(', ')} und ${z(m, 2)} s. Wie gross ist der Mittelwert?`, m, 's',
          `(${werte.map(w => z(w, 2)).join(' + ')} + ${z(m, 2)}) : 4 = ${z(m, 2)} s`, 'Alle Werte addieren und durch die Anzahl teilen.', { toleranzAbs: 0.01 });
      } },

    { id: 'b5-tabelle-v2', wieVorlage: 'b5-tabelle', schwierigkeit: 2,
      erzeuge() {
        const v = zufall([3, 4, 5]);
        return mc(`${tabelle([0, 1, 2, 3, 4], [0, v, 2 * v, 3 * v, 4 * v])}Welche Bewegungsart zeigt diese Tabelle?`, 'Eine gleichförmige Bewegung.', [
          ['Eine beschleunigte Bewegung.', `Der Weg pro Sekunde wächst nicht, er bleibt bei ${v} m.`],
          ['Eine verzögerte Bewegung.', `Der Weg pro Sekunde nimmt nicht ab, er bleibt bei ${v} m.`],
          ['Stillstand.', 'Der Weg nimmt zu, also bewegt sich der Körper.']],
          `In jeder Sekunde kommen ${v} m dazu. Gleiche Wege in gleichen Zeiten: gleichförmig.`);
      } },
    { id: 'b5-tabelle-v3', wieVorlage: 'b5-tabelle', schwierigkeit: 3,
      ...mc(`${tabelle([0, 1, 2, 3, 4], [0, 1, 4, 9, 16])}Welche Bewegungsart zeigt diese Tabelle?`, 'Eine beschleunigte Bewegung.', [
        ['Eine gleichförmige Bewegung.', 'Der Weg pro Sekunde ist nicht gleich: 1, 3, 5, 7 m.'],
        ['Eine verzögerte Bewegung.', 'Der Weg pro Sekunde wird grösser, nicht kleiner.'],
        ['Stillstand.', 'Der Weg nimmt zu.']],
        'Der Weg pro Sekunde wächst: 1, 3, 5, 7 m. Das ist eine beschleunigte Bewegung.') },

    { id: 'b5-tabelle-v-v2', wieVorlage: 'b5-tabelle-v', typ: 'zahl', schwierigkeit: 3,
      erzeuge() {
        const v = zufall([1.5, 3, 4, 6]);
        return zahl(`${tabelle([0, 2, 4, 6], [0, 2 * v, 4 * v, 6 * v].map(x => z(x)))}Die Tabelle zeigt eine gleichförmige Bewegung. Wie gross ist die Geschwindigkeit?`, v, 'm/s',
          `In 2 s kommen ${z(2 * v)} m dazu: v = ${z(2 * v)} m : 2 s = ${z(v)} m/s`, 'Achtung: Die Zeit springt in 2-s-Schritten.');
      } },

    { id: 'b6-vt-verz-v2', wieVorlage: 'b6-vt-verz', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne jeder Bewegung die Form ihres Zeit-Geschwindigkeits-Diagramms zu.',
      paare: [['gleichförmig', 'waagrechte Linie'], ['beschleunigt', 'ansteigende Gerade'], ['verzögert', 'fallende Gerade']],
      erklaerung: 'Im Zeit-Geschwindigkeits-Diagramm sieht man direkt, ob die Geschwindigkeit gleich bleibt, zunimmt oder abnimmt.' },

    { id: 'b6-tabelle-v2', wieVorlage: 'b6-tabelle', schwierigkeit: 3,
      ...mc(`${tabelle([0, 1, 2, 3, 4], [0, 9, 16, 21, 24])}Welche Bewegungsart zeigt diese Tabelle?`, 'Eine verzögerte Bewegung.', [
        ['Eine gleichförmige Bewegung.', 'Der Weg pro Sekunde ist nicht gleich: 9, 7, 5, 3 m.'],
        ['Eine beschleunigte Bewegung.', 'Die Weg-Werte werden grösser, aber der Zuwachs pro Sekunde wird kleiner. Schau auf die Differenzen.'],
        ['Stillstand.', 'Der Weg nimmt noch zu.']],
        'Zuwachs pro Sekunde: 9, 7, 5, 3 m. Er wird kleiner, also ist die Bewegung verzögert.') },

    { id: 'b6-geschichte-v2', wieVorlage: 'b6-geschichte', schwierigkeit: 3,
      ...mc('Ein Lift fährt los, fährt dann gleichmässig und bremst im 5. Stock bis zum Halt. Wie sieht sein Zeit-Geschwindigkeits-Diagramm aus?', 'Erst ansteigend, dann waagrecht, dann fallend (wie ein Trapez).', [
        ['Nur eine waagrechte Linie.', 'Dann würde der Lift nie anfahren und nie bremsen.'],
        ['Erst fallend, dann waagrecht, dann ansteigend.', 'Das ist genau umgekehrt: Beim Losfahren steigt die Geschwindigkeit.'],
        ['Eine ansteigende Gerade.', 'Dann würde der Lift immer schneller und nie bremsen.']],
        'Anfahren: Geschwindigkeit steigt. Fahren: bleibt gleich. Bremsen: sinkt auf null. Das ergibt ein Trapez.') },

    { id: 'b6-abstand-v2', wieVorlage: 'b6-abstand', schwierigkeit: 3,
      ...mc('Warum muss der Abstand zum Vorderfahrzeug bei höherer Geschwindigkeit grösser sein?', 'Weil man in der Reaktionszeit und beim Bremsen mehr Weg zurücklegt.', [
        ['Weil schnelle Autos länger sind.', 'Die Länge des Autos spielt keine Rolle. Es geht um den Weg pro Sekunde.'],
        ['Das gilt nur bei Regen.', 'Bei Regen braucht es noch mehr Abstand, die Regel gilt aber immer.'],
        ['Er muss nicht grösser sein.', 'Doch: Bei doppeltem Tempo fährst du in 2 s doppelt so weit.']],
        'In 2 s legst du bei höherem Tempo mehr Meter zurück. Darum wächst der nötige Abstand mit der Geschwindigkeit.') }
  ]
};
