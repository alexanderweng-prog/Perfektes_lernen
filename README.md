# Lern-Motor

Fachunabhängiger Lern-Motor für kurze, tägliche Wiederholungsblöcke (Sekundarschule Halingen, zuerst NuT).
Konzept: Abrufen statt Wiederlesen, verteilt und gemischt wiederholen, Fading bei Neuem, Zielgenauigkeit ca. 80 %.

Autor: Alexander Weng · Sekundarschule Halingen

## Aufbau

| Ordner | Inhalt |
| --- | --- |
| `motor/` | Lern-Motor ohne Fach- und Oberflächencode: Schülermodell (FSRS), Sitzungsplaner, Bewertung, Belohnungen. Alle Stellschrauben in `motor/einstellungen.js`. |
| `vendor/ts-fsrs/` | FSRS-Bibliothek ts-fsrs 5.4.2 (MIT), unverändert |
| `pakete/` | Inhaltspakete. Die NuT-Pakete werden aus Naturalia erzeugt (`werkzeuge/naturalia-import.mjs`). |
| `app/` | Schüler-App (`index.html`) und Lehrer-Dashboard (`lehrer.html`) |
| `backend/` | Datenbank: Schema, Funktionen, Freigaben (Supabase) |
| `pakete/ergaenzungen/` | Von Claude erstellte Erklärungen zu falschen Antworten und neue Aufgabenvarianten (Entwurf bis zur Freigabe) |
| `docs/` | Bestandsaufnahme, Aufgabenformat, Backend und Datenschutz |
| `test/` | Tests (`npm test`, nur Node, keine Abhängigkeiten) |

## Starten

Statisch, ohne Build. Lokal: `npx serve .` oder `python3 -m http.server`, dann `/app/` öffnen.
Auf GitHub Pages: Repository-Wurzel veröffentlichen, die App liegt unter `/app/`.

- Thema wählen: `app/?paket=leistung` (Liste in `pakete/katalog.js`)
- Nur behandelte Teile freigeben: `app/?paket=leistung&freigabe=s1,s2` (Stationen-IDs). Den Link kann die Lehrperson der Klasse geben.
- Demo aller Aufgabenformate: `app/?paket=demo-formate`

## Naturalia-Inhalte neu übernehmen

```
node werkzeuge/naturalia-import.mjs ../Claude_test/fantasy-lernapp
npm test
```

## Was der Motor macht

- **Schülermodell:** pro Lernziel eine FSRS-Karte (Stabilität, Schwierigkeit, Fälligkeit) plus Zähler richtig/falsch.
- **Wiederholungsblock:** fällige Lernziele zuerst (am stärksten verblasste zuerst), danach höchstens 2 neue. Obergrenze 15 Aufgaben oder 10 Minuten.
- **Interleaving:** aufeinanderfolgende Aufgaben möglichst aus verschiedenen Kompetenzen.
- **Fading:** neues Lernziel = Beispiel → Aufgabe mit Hilfe → Aufgabe ohne Hilfe, mit Abstand dazwischen.
- **Fehler:** gleiches Lernziel kommt nach mindestens 3 anderen Aufgaben nochmals, wenn möglich in anderer Variantengruppe. FSRS plant es kürzer ein.
- **Schwierigkeit:** Niveau 1–5 pro Kind. Über 90 % richtig in den letzten 8 Abrufen → schwerer, unter 65 % → leichter.
- **Sicherheitsabfrage:** bei ca. 30 % der Abrufe nach der Antwort und vor dem Feedback («sicher / unsicher / geraten»). Richtig, aber unsicher zählt für FSRS als «schwer». Falsch und sicher wird als Fehlvorstellung protokolliert.
- **Pausenhinweis:** Fehlerquote der letzten 5 Aufgaben ≥ 60 % und mindestens 30 Prozentpunkte über dem bisherigen Schnitt der Sitzung (frühestens nach 8 Aufgaben). Das Kind entscheidet. Danach zählen Fehler nur noch als «schwer».
- **Belohnung:** XP nur für richtige Abrufe und abgeschlossene Blöcke, Bonus-Trophäe zufällig nach ca. jeder vierten Sitzung, Serie mit einem freien Schultag pro Woche, Wochenende zählt nicht, Unterbruch halbiert statt nullt.
- **Antwortdaten** (Aufgabe, Lernziel, richtig, gewählte Option, Sicherheit, Zeit, nach Pause ja/nein) gehen mit dem Lerncode ans Backend; ohne Konto bleiben sie auf dem Gerät.

Alle Zahlen sind Annahmen und im Pilot anzupassen.

## Ergänzte Inhalte

- 660 Erklärungen zu falschen Antwortoptionen (alle 220 Multiple-Choice-Aufgaben aus Naturalia).
- 138 neue Aufgabenvarianten, sodass jedes der 201 Lernziele mindestens zwei Variantengruppen hat (Multiple Choice, Zahl mit Zufallswerten, Zuordnen, Lückentext, Reihenfolge).
- 56 Fragen zu den Naturalia-Simulationen («Simulation mit Frage», nur im freiwilligen Zusatzblock).
- Alles ist Entwurf, bis eine Lehrperson es im Dashboard unter «Neue Inhalte prüfen» freigibt.

## Simulationen

Die 56 Simulationen aus Naturalia werden mit importiert und je einem Lernziel zugeordnet. Sie erscheinen im Schritt «Beispiel» unter der Lernkarte und im Zusatzblock als «Simulation mit Frage» (höchstens 3 pro Zusatzblock, `zusatzMaxSimulationen`). Antworten dazu zählen für XP und Dashboard, verändern aber den Wiederholungsplan nicht.

## Noch offen

- Pilot mit einer Klasse (4–6 Wochen), danach Parameter in `motor/einstellungen.js` anpassen.
- Kanti-Trainer und Mathe als Pakete.
