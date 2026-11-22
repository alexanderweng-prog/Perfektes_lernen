// Alle Stellschrauben des Motors an einem Ort.
// Jeder Wert mit «Annahme» ist geschätzt und im Pilot anhand der Daten anzupassen.

export const EINSTELLUNGEN = Object.freeze({
  // Wiederholungsplaner (FSRS)
  zielBehalten: 0.9,          // gewünschte Abrufwahrscheinlichkeit bei Fälligkeit (FSRS-Standard)
  maxIntervallTage: 365,      // Annahme: länger als ein Schuljahr bringt im Unterricht nichts

  // Wiederholungsblock
  blockMaxAufgaben: 15,       // Annahme: 15–20 Aufgaben bzw. ca. 10 Minuten
  blockMaxMinuten: 10,        // Annahme
  blockMaxNeueLernziele: 2,   // Annahme: ein neues Lernziel kostet drei Schritte (Beispiel, mit Hilfe, ohne Hilfe)
  zusatzMaxNeueLernziele: 3,  // freiwilliger Zusatzblock: Neues …
  zusatzMaxSimulationen: 3,   // … und Simulationen mit Frage (nur im Zusatzblock, Annahme)

  // Fading und Fehler
  abstandFading: 2,           // mind. so viele andere Aufgaben zwischen den Fading-Schritten
  abstandNachFehler: 3,       // falsch gelöst: gleiches Lernziel kommt frühestens nach 3 anderen Aufgaben wieder

  // Schwierigkeit (Zielgenauigkeit ca. 80 %)
  zielGenauigkeit: 0.8,       // Annahme
  bandOben: 0.9,              // darüber: Schwierigkeit steigt
  bandUnten: 0.65,            // deutlich darunter: Schwierigkeit sinkt
  fensterNiveau: 8,           // so viele letzte Antworten zählen
  schrittNiveau: 0.5,
  startNiveau: 2,

  // Sicherheitsabfrage
  anteilSicherheitsfrage: 0.3, // Annahme: bei ca. jeder dritten Abrufaufgabe

  // Pausenhinweis (Vergleich mit dem eigenen Schnitt der Sitzung)
  pauseFenster: 5,            // Vorschlag: Fehlerquote der letzten 5 Aufgaben …
  pauseMinAufgaben: 8,        // … frühestens nach 8 Aufgaben
  pauseMinQuote: 0.6,         // … mindestens 3 von 5 falsch …
  pauseUeberSchnitt: 0.3,     // … und mindestens 30 Prozentpunkte über dem bisherigen Schnitt
  // Nach dem Hinweis zählen Fehler schwächer: «falsch» wird für FSRS als «schwer» gewertet (Annahme)

  // Lernstand-Anzeige
  sitztAbStabilitaetTage: 7,  // Annahme: «sitzt», wenn die Erinnerung mind. eine Woche hält

  // Belohnungen
  xp: { faellig: 10, neu: 8, mitHilfe: 4, nochmals: 3, simulation: 5, blockFertig: 20 },
  bonusWahrscheinlichkeit: 0.25 // variable Belohnung nach einer Sitzung
});
