// Demo-Paket: je eine Aufgabe pro Format. Zeigt Autorinnen und Autoren, wie das Format aussieht.
// Aufruf in der App: app/?paket=demo-formate
const Q = 'Demo';
export default {
  id: 'demo-formate', titel: 'Demo: alle Aufgabenformate', fach: 'Demo', version: 1,
  kompetenzen: [{ id: 'demo.k1', titel: 'Energie und Leistung' }, { id: 'demo.k2', titel: 'Stromkreis' }],
  lernziele: [
    { id: 'demo.einheiten', kompetenz: 'demo.k1', titel: 'Einheiten von Energie und Leistung kennen',
      lernkarte: { titel: 'Einheiten', html: '<p>Energie misst man in <b>Joule (J)</b>, Leistung in <b>Watt (W)</b>. 1 W = 1 J pro Sekunde.</p>' } },
    { id: 'demo.leistung', kompetenz: 'demo.k1', titel: 'Leistung berechnen',
      lernkarte: { titel: 'P = W : t', html: '<p>Leistung = Arbeit : Zeit.</p>' },
      simulationen: [{ id: 'demo-lampe', titel: 'Heizdraht am Netzgerät', html: '<p>Stelle die Spannung ein und lies die Leistung ab.</p>' }] },
    { id: 'demo.stromkreis', kompetenz: 'demo.k2', titel: 'Geschlossenen Stromkreis erklären',
      lernkarte: { titel: 'Stromkreis', html: '<p>Strom fliesst nur in einem geschlossenen Kreis von der Quelle über den Verbraucher zurück zur Quelle.</p>' } }
  ],
  aufgaben: [
    { id: 'demo.a1', lernziel: 'demo.einheiten', typ: 'mc', schwierigkeit: 1, variantengruppe: 'demo.a1', quelle: Q, pruefstatus: 'geprueft',
      text: 'In welcher Einheit misst man Leistung?', erklaerung: 'Leistung misst man in Watt (W).',
      optionen: [
        { text: 'Watt', richtig: true },
        { text: 'Joule', richtig: false, erklaerung: 'Joule ist die Einheit der Energie, nicht der Leistung. Leistung ist Energie pro Zeit.' },
        { text: 'Kilowattstunde', richtig: false, erklaerung: 'kWh ist eine Energieeinheit: Leistung mal Zeit.' }] },
    { id: 'demo.a2', lernziel: 'demo.einheiten', typ: 'luecke', schwierigkeit: 2, variantengruppe: 'demo.a2', quelle: Q, pruefstatus: 'geprueft',
      text: 'Energie misst man in ___, Leistung in ___.', luecken: [['Joule', 'J'], ['Watt', 'W']], erklaerung: 'Energie: Joule (J). Leistung: Watt (W).' },
    { id: 'demo.a3', lernziel: 'demo.einheiten', typ: 'zuordnen', schwierigkeit: 2, variantengruppe: 'demo.a3', quelle: Q, pruefstatus: 'geprueft',
      text: 'Ordne jeder Grösse ihre Einheit zu.', paare: [['Energie', 'Joule'], ['Leistung', 'Watt'], ['Spannung', 'Volt']], erklaerung: 'E in J, P in W, U in V.' },
    { id: 'demo.a4', lernziel: 'demo.leistung', typ: 'zahl', schwierigkeit: 3, variantengruppe: 'demo.a4', quelle: Q, pruefstatus: 'geprueft',
      erzeuge() {
        const t = [2, 4, 5, 10][Math.floor(Math.random() * 4)], P = [50, 100, 200][Math.floor(Math.random() * 3)];
        return { typ: 'zahl', text: `Ein Motor verrichtet in ${t} s eine Arbeit von ${P * t} J. Welche Leistung hat er? Gib die Einheit mit an.`,
          wert: P, einheit: 'W', einheitPruefen: true, einheitenAlternativ: { kW: 1000 }, hilfe: 'P = W : t',
          erklaerung: `P = ${P * t} J : ${t} s = ${P} W` };
      } },
    { id: 'demo.a5', lernziel: 'demo.stromkreis', typ: 'reihenfolge', schwierigkeit: 2, variantengruppe: 'demo.a5', quelle: Q, pruefstatus: 'geprueft',
      text: 'Bringe den Weg des Stroms in die richtige Reihenfolge (ab dem Pluspol).', elemente: ['Pluspol', 'Schalter', 'Lampe', 'Minuspol'],
      erklaerung: 'Technische Stromrichtung: vom Pluspol durch den Kreis zum Minuspol.' },
    { id: 'demo.a6', lernziel: 'demo.stromkreis', typ: 'erklaeren', schwierigkeit: 3, variantengruppe: 'demo.a6', quelle: Q, pruefstatus: 'geprueft',
      text: 'Erkläre in eigenen Worten, warum die Lampe ausgeht, wenn du den Schalter öffnest.',
      musterantwort: 'Der offene Schalter unterbricht den Stromkreis. Ohne geschlossenen Kreis kann kein Strom fliessen, also leuchtet die Lampe nicht.' },

    // Höhere Taxonomiestufen (stufe 4–6, mit stufe_begruendung). Kommen erst, wenn das Lernziel gelernt ist.
    { id: 'demo.h1', lernziel: 'demo.leistung', typ: 'fehler', stufe: 4, schwierigkeit: 3, variantengruppe: 'demo.h1', quelle: Q, pruefstatus: 'geprueft',
      stufe_begruendung: 'Das Kind muss jeden Rechenschritt prüfen und die Art des Fehlers bestimmen, statt nur selbst zu rechnen.',
      text: 'Mia berechnet die Leistung eines Motors, der in 4 s eine Arbeit von 800 J verrichtet. In einer Zeile steckt ein Fehler. Markiere die Zeile und wähle die Fehlerart.',
      zeilen: ['Gegeben: W = 800 J, t = 4 s', 'Formel: P = W : t', 'Einsetzen: P = 800 J · 4 s', 'Ergebnis: P = 3200 W'],
      fehlerarten: ['Wert falsch abgeschrieben', 'falsche Rechenart', 'falsche Einheit', 'verrechnet'], fehlerZeile: 2, fehlerArt: 1,
      erklaerung: 'In Zeile 3 wird multipliziert statt dividiert. Richtig: P = 800 J : 4 s = 200 W.' },
    { id: 'demo.h2', lernziel: 'demo.leistung', typ: 'daten', stufe: 4, schwierigkeit: 3, variantengruppe: 'demo.h2', quelle: Q, pruefstatus: 'geprueft',
      stufe_begruendung: 'Das Kind muss aus Leistung und Zeit selbst die Energie ableiten und Aussagen an den Daten prüfen.',
      text: 'Die Tabelle zeigt drei Geräte. Kreuze alle Aussagen an, die zu den Daten passen.',
      tabelle: { kopf: ['Gerät', 'Leistung', 'Betrieb pro Tag'], zeilen: [['Wasserkocher', '2000 W', '0,1 h'], ['Kühlschrank', '100 W', '24 h'], ['LED-Lampe', '10 W', '5 h']] },
      aussagen: [
        { text: 'Der Wasserkocher braucht pro Tag am meisten Energie.', richtig: false, erklaerung: 'Wasserkocher: 2000 W · 0,1 h = 200 Wh. Der Kühlschrank braucht 100 W · 24 h = 2400 Wh.' },
        { text: 'Der Kühlschrank braucht pro Tag am meisten Energie.', richtig: true },
        { text: 'Die LED-Lampe braucht pro Tag weniger Energie als der Wasserkocher.', richtig: true },
        { text: 'Das Gerät mit der grössten Leistung braucht immer am meisten Energie.', richtig: false, erklaerung: 'Energie = Leistung · Zeit. Eine kleine Leistung über lange Zeit kann mehr Energie brauchen.' }],
      erklaerung: 'Energie = Leistung · Zeit: Wasserkocher 200 Wh, Kühlschrank 2400 Wh, LED-Lampe 50 Wh.' },
    { id: 'demo.h3', lernziel: 'demo.leistung', typ: 'vergleich', stufe: 5, schwierigkeit: 3, variantengruppe: 'demo.h3', quelle: Q, pruefstatus: 'geprueft',
      stufe_begruendung: 'Das Kind beurteilt zwei Vorgehen nach einem Kriterium (Vergleichbarkeit) und begründet sein Urteil.',
      text: 'Zwei Gruppen wollen herausfinden, welches von zwei Kindern beim Treppensteigen die grössere Leistung erbringt. Welches Vorgehen ist besser?',
      varianten: [
        { titel: 'Vorgehen A', html: 'Beide Kinder steigen dieselbe Treppe (3 m hoch). Die Gruppe wiegt beide und misst jeweils die Zeit.' },
        { titel: 'Vorgehen B', html: 'Ein Kind steigt die Treppe im Schulhaus, das andere die Treppe zu Hause. Die Gruppe misst nur die Zeit.' }],
      besser: 0,
      begruendungen: [
        { text: 'nur dort Arbeit und Zeit für beide bekannt und vergleichbar sind', richtig: true },
        { text: 'dort mehr gemessen wird', richtig: false, erklaerung: 'Mehr messen allein macht ein Vorgehen nicht besser. Entscheidend ist, dass alle Grössen für P = W : t bekannt und vergleichbar sind.' },
        { text: 'die Treppe im Schulhaus kürzer ist', richtig: false, erklaerung: 'Die Länge der Treppe spielt keine Rolle. Wichtig ist, dass beide dieselbe Höhe überwinden.' }],
      erklaerung: 'Für P = W : t braucht es die Arbeit (Masse und Höhe) und die Zeit. Bei B fehlen Masse und gleiche Höhe.' },
    { id: 'demo.h4', lernziel: 'demo.leistung', typ: 'versuch', stufe: 6, schwierigkeit: 4, variantengruppe: 'demo.h4', quelle: Q, pruefstatus: 'geprueft',
      stufe_begruendung: 'Das Kind entwirft selbst einen Versuchsplan: Es legt fest, was verändert, gemessen und konstant gehalten wird.',
      text: 'Plane einen Versuch zum Treppensteigen. Wähle eine passende Frage und lege für jede Grösse fest, was mit ihr passiert.',
      fragen: [
        { text: 'Hängt die Leistung beim Treppensteigen von der getragenen Masse ab?', richtig: true },
        { text: 'Ist Treppensteigen gesund?', richtig: false },
        { text: 'Wer ist das stärkste Kind der Klasse?', richtig: false }],
      groessen: [
        { text: 'Masse des Rucksacks', rolle: 'veraendern' },
        { text: 'Zeit für die Treppe', rolle: 'messen' },
        { text: 'Höhe der Treppe', rolle: 'konstant' },
        { text: 'Person, die steigt', rolle: 'konstant' },
        { text: 'Farbe des Rucksacks', rolle: 'egal' }],
      erklaerung: 'Nur die Masse wird verändert, die Zeit gemessen. Höhe und Person bleiben gleich, sonst wüsste man nicht, was die Wirkung hat.' },
    { id: 'demo.h5', lernziel: 'demo.leistung', typ: 'vorhersage', stufe: 4, simulation: 'demo-lampe', schwierigkeit: 3, variantengruppe: 'demo.h5', quelle: Q, pruefstatus: 'geprueft',
      stufe_begruendung: 'Das Kind leitet aus dem Zusammenhang eine Vorhersage ab und prüft sie danach selbst an der Beobachtung.',
      text: 'Ein Heizdraht hängt an einem Netzgerät mit 6 V. Du stellst auf 12 V. Wie verändert sich die Leistung?',
      optionen: [{ text: 'Sie verdoppelt sich.', richtig: false }, { text: 'Sie vervierfacht sich.', richtig: true }, { text: 'Sie bleibt gleich.', richtig: false }],
      erklaerung: 'Doppelte Spannung ergibt doppelten Strom. P = U · I wird deshalb viermal so gross (1,5 W → 6 W).' }
  ],
  // Kleine Simulation für die Vorhersage-Aufgabe: Heizdraht mit festem Widerstand (24 Ω)
  simulationen: {
    'demo-lampe'(el) {
      el.innerHTML = '<label>Spannung <input type="range" min="0" max="12" step="1" value="6" data-u> <b data-uw></b></label><p class="mono" data-p></p>';
      const zeige = () => {
        const U = +el.querySelector('[data-u]').value, I = U / 24;
        el.querySelector('[data-uw]').textContent = U + ' V';
        el.querySelector('[data-p]').textContent = `Strom ${I.toFixed(2)} A · Leistung ${(U * I).toFixed(2)} W`;
      };
      el.querySelector('[data-u]').addEventListener('input', zeige);
      zeige();
    }
  }
};
