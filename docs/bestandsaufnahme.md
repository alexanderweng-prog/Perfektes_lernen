# Bestandsaufnahme (Schritt 1)

Stand 22.11.2026. Grundlage: die beiden Repositories, auf die Claude Code Zugriff hat.

| Repository | App | Datenformat der Aufgaben | Vorhandene Lernlogik | Speicherort Lernstand |
| --- | --- | --- | --- | --- |
| `Claude_test` / `fantasy-lernapp` | **Naturalia** (alle NuT-Apps als eine App: 7_1, 7_3, 7_4, 7_5, 7_7, 8_1, 8_5, Vertiefung Leistung, Vertiefung Motor) | Pro Kapitel `src/chapters/<id>.js`: 6 Stationen × 6 Aufgabenvorlagen. Jede Vorlage hat `make()`, das bei jedem Aufruf neue Zahlen erzeugt. Typen nur Multiple Choice (`mc`, richtige Option an Stelle 0) und Zahl (`num`, Toleranz 1 %, Einheit fest angezeigt). Lernkarten pro Station, Worked Examples (`worked`), Simulationen (`SIMS`). | Leitner-Karteikasten pro Vorlage: Boxen 0–4, Abstände 0/1/3/7/14 Tage. Falsch → Box 0 und am Rundenende nochmals. «Erinnerungsquelle» = gemischte Runde aus fälligen Vorlagen (6 Aufgaben). Stationen schalten sich nacheinander frei. | `localStorage` pro Kapitel. Klassen-/Schulwertung und Duell über Supabase (`supabase_setup.sql`, nur XP pro Woche, keine Antwortdaten). Lernstand für die Lehrperson per verschlüsseltem QR-Code (`pruefen.html`). |
| `Claude_test` / `flow-trainer` | **Flow-Trainer** (Mathe, adaptiv) | Generatoren pro Thema, Schwierigkeit 0–100 | Elo/Rasch-Modell pro Thema (Können θ), Zielwahrscheinlichkeit 80 %, bei Fehlerserie leichter, bei Erfolgsserie schwerer, jede 7. Aufgabe Herausforderung. Pausenhinweis vorhanden. | `localStorage` (`flowtrainer.v1`) |
| `Claude_test` / `kanti-trainer`, `kanti-site` | **Kanti-Trainer** Mathe (Aufnahmeprüfung) | 9 Generatoren (`genRechnen`, `genBrueche`, …) | Gleiches Elo-Modell wie Flow-Trainer, dazu Fehlerheft mit Boxen (fällig/offen), Lernplan bis zum Prüfungsdatum, Probeprüfung 45 Min. | `localStorage` (`kantitrainer.v1`), Export per QR-Code |
| `Perfektes_lernen` | war leer | – | – | – |

**Nicht in diesen Repositories:** Kanti-Trainer Deutsch (Leseverstehen), Mathe-Lernapp 3. Zyklus als eigene App, Word-Lern-App, die erwähnte «Lernplattform mit fester Engine». Dazu kann ich nichts sagen. `kanti-trainer/` enthält dieselbe Datei dreimal (`index.html`, `Kanti-Trainer.html`, `kanti-trainer.html`), `kanti-site/index.html` ist identisch mit `kanti-trainer/index.html`.

## Was das für den Lern-Motor heisst

- **Naturalia passt fast direkt.** Die Kapitel haben schon eine gemeinsame Struktur. Ein Adapter (`pakete/naturalia-adapter.js`) übersetzt alle 9 Kapitel ohne Formatfehler ins neue Format: 201 Lernziele, 324 Aufgabenvorlagen. Die Kapitel-Dateien bleiben in Naturalia die Quelle, `werkzeuge/naturalia-import.mjs` erzeugt die Pakete neu.
- **Lücke 1 (erledigt, Entwürfe): zu wenig Varianten.** 110 von 201 Lernzielen haben nur eine Aufgabenvorlage. Bei 72 davon ist es eine Multiple-Choice-Frage ohne Zufallsanteil. Wird so ein Lernziel falsch gelöst, kommt es im selben Wortlaut wieder. Das Konzept will «andere Aufgabenvariante». Hier braucht es Inhalt, nicht Code.
- **Lücke 2 (erledigt, Entwürfe): keine Fehlvorstellungs-Erklärungen.** Keine der 220 MC-Aufgaben hat eine Erklärung pro falscher Option. Das Format kann es (`optionen[].erklaerung`), die Inhalte fehlen. Für die Dashboard-Ansicht «häufige Fehlvorstellungen» ist das der wichtigste Inhalt.
- **Lücke 3 (bewusst weggelassen): keine Lehrplan-Codes.** Die Kapitel sind nach NaTech gegliedert, nicht nach NT.1–NT.9. Die Hierarchie im Paket ist daher Kapitel → Station (Kompetenz) → Lernziel. Die Zuordnung zu den LP21-Codes kann ich nicht zuverlässig machen, das musst du ergänzen (Feld `lehrplan` an der Kompetenz).
- **Schwierigkeit 1–5** ist bei den importierten Aufgaben geschätzt (Begriffsfrage 2, Rechnung 3, Erweiterung 4). Die Fehlerquoten aus dem Pilot sollten das korrigieren.
- **Flow- und Kanti-Trainer** haben bereits ein gutes Schwierigkeitsmodell (Elo), aber keinen Wiederholungsplaner pro Lernziel ausser dem Fehlerheft. Sie können später als Pakete mit erzeugenden Aufgaben auf den Motor (Schritt 8).
