# Backend, Login und Dashboard (Schritte 5 und 6)

Supabase-Projekt «Leistungs App» (Region eu-west-1, Irland). Der Lern-Motor liegt dort im eigenen Schema `lernmotor`. Die Naturalia-Tabellen (`players`, `challenge_results`, `lw_*`) bleiben unberührt.

## Einrichten

1. SQL ausführen, in dieser Reihenfolge: `backend/schema.sql`, dann `backend/freigaben.sql` (Supabase → SQL Editor, oder Claude über den Supabase-Connector). Beide Skripte lassen sich mehrfach ausführen.
2. Konto für Lehrpersonen anlegen: Supabase → **Authentication** → **Users** → **Add user** (E-Mail + Passwort, «Auto confirm»).
3. Danach öffentliche Registrierung ausschalten: **Authentication** → **Sign In / Providers** → **Allow new users to sign up** aus. Sonst könnte sich jemand mit dem öffentlichen Schlüssel ein Konto anlegen und eigene Klassen erstellen. Auf fremde Klassen hätte er trotzdem keinen Zugriff.
4. Die App braucht nur URL und öffentlichen Schlüssel in `app/config.js` (bereits eingetragen).

## Ablauf in der Klasse

1. Lehrperson: `app/lehrer.html` → anmelden → «Klasse anlegen». Es entsteht ein Klassencode, z. B. `K7QM2`, und ein Zufallsname für die Klassenwertung, z. B. «Team Wal».
2. Kinder: `app/` → «Neu hier: Klassencode eingeben». Jedes Kind bekommt einen persönlichen **Lerncode** (z. B. `tiger-mond-segel-4821`) und ein Pseudonym. Den Lerncode schreibt es ins Heft. Niemand sonst kennt ihn, auch die Lehrperson nicht.
3. Auf jedem Gerät: Lerncode eingeben. Der Lernstand kommt vom Server.

## Gemeinsame Geräte

- Beim Anmelden ist «Gemeinsames Gerät» vorausgewählt.
- Nach jedem Block erscheint «Fertig und abmelden». Nach 20 Minuten ohne Aktivität wird automatisch abgemeldet (`ABMELDEN_NACH_MINUTEN` in `app/config.js`).
- Beim Abmelden werden Lerncode und Lernstand dieses Kindes vom Gerät gelöscht. Sind noch nicht alle Antworten auf dem Server (kein Internet), warnt die App vorher.
- Ohne Backend (oder «Ohne Konto üben») gibt es mehrere lokale Profile pro Gerät («Wer übt?»). Diese zählen nicht für die Klasse.

## Datenschutz: was wo liegt

| Daten | Wo | Wer sieht es |
| --- | --- | --- |
| Klassenname (z. B. «2a NuT») | Server | nur die Lehrperson dieser Klasse |
| Pseudonym, Hash des Lerncodes, Klasse | Server | niemand direkt; das Kind sieht sein Pseudonym |
| Lernstand pro Thema (FSRS-Karten, XP, Serie) | Server + Gerät | nur das Kind (über seinen Lerncode) |
| Antworten (Aufgabe, richtig/falsch, gewählte Option, Sicherheit, Zeit) | Server | niemand einzeln; das Dashboard bekommt nur Summen |
| Klarnamen, E-Mail von Kindern | nirgends | – |

- Alle Tabellen sind gegen direkten Zugriff gesperrt (Row Level Security ohne Policies, Schema nicht über die API erreichbar). Zugriff nur über die Funktionen `lm_*`, die selbst prüfen, wer was darf.
- **Mindestgruppengrösse 5** wird in der Datenbank erzwungen (`lernmotor.min_gruppe()`): Klassen mit weniger als 5 Kindern bekommen gar keine Auswertung; jede Zeile im Dashboard beruht auf mindestens 5 verschiedenen Kindern. Ich habe das so ausgelegt: Eine Zelle (Lernziel, Aufgabe) erscheint nur, wenn mindestens 5 Kinder dazu geantwortet haben.
- Keine Filter nach Geschlecht oder Ähnlichem, kein Export von Einzeldaten. CSV nur mit Summen.
- **Löschen:** Kinder können unter Einstellungen «Meine Daten löschen» wählen. Lehrpersonen können eine Klasse sofort löschen. Automatisch: Klassen am `loeschen_ab`-Datum (Standard 31. Juli), dazu Kinder, die über 400 Tage inaktiv waren. Das erledigt ein nächtlicher Job (pg_cron, 03:17 UTC).
- Der Lerncode hat rund 34 Bit Zufall (3 Wörter aus 128 + 4 Ziffern). Wer Codes durchprobieren wollte, bräuchte bei hunderten Kindern im Schnitt Wochen bis Monate. Eine Sperre nach Fehlversuchen gibt es nicht, weil der Server Kinder nicht unterscheiden kann, ohne IP-Adressen zu speichern. Geschützt wären dabei nur Lernstände unter Pseudonym.

## Funktionen (API)

| Funktion | Wer | Zweck |
| --- | --- | --- |
| `lm_registrieren(klassencode)` | Kind | neuer Lerncode + Pseudonym |
| `lm_anmelden(code)` | Kind | Pseudonym, Team, Lernstand |
| `lm_sync(code, paket, daten, status, antworten, sitzungen)` | Kind | Lernstand und neue Antworten speichern |
| `lm_daten_loeschen(code)` | Kind | alle eigenen Daten löschen |
| `lm_klassenwertung(code)` | Kind | Anteil pro Klasse mit Block diese Woche (Klassen ≥ 5 Kinder, nur Teamnamen) |
| `lm_freigaben()` | alle | welche Ergänzungen freigegeben sind |
| `lm_klasse_erstellen(name)`, `lm_meine_klassen()`, `lm_klasse_loeschen(id)` | Lehrperson | Klassen verwalten |
| `lm_dashboard(klasse, paket)` | Lehrperson | sechs aggregierte Ansichten |
| `lm_freigabe_setzen(eintraege, status)` | Lehrperson | Ergänzungen freigeben/zurückziehen |

## Bekannte Grenzen

- Übt ein Kind gleichzeitig auf zwei Geräten im selben Thema, gewinnt der zuletzt gespeicherte Lernstand. Die Antworten gehen nicht verloren, nur die Planung des einen Geräts.
- Die Klassenwertung zählt nur Kinder mit Lerncode. Kinder im Modus «Ohne Konto» zählen nicht.
