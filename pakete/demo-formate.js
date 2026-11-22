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
      lernkarte: { titel: 'P = W : t', html: '<p>Leistung = Arbeit : Zeit.</p>' } },
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
      musterantwort: 'Der offene Schalter unterbricht den Stromkreis. Ohne geschlossenen Kreis kann kein Strom fliessen, also leuchtet die Lampe nicht.' }
  ]
};
