# Gemeinsames Aufgabenformat (Schritt 2)

Ein Fach ist ein **Inhaltspaket**: eine JavaScript-Datei in `pakete/`, die ein Objekt exportiert. Der Motor liest nur dieses Format. Beispiel mit allen Typen: `pakete/demo-formate.js`. Prüfen: `npm test` (prüft alle Pakete im Katalog).

JavaScript statt JSON, weil Rechenaufgaben bei jedem Aufruf neue Zahlen erzeugen sollen (`erzeuge()`). Reine Wissensfragen können als statische Objekte geschrieben werden; so lässt sich ein Stapel von Claude erzeugter Aufgaben auch als JSON einfügen.

## Paket

```js
export default {
  id: 'leistung', titel: 'Leistung', fach: 'NuT', version: 1,
  kompetenzen: [{ id: 'leistung.s1', titel: 'Arbeit und Lageenergie', lehrplan: 'NT.?' /* optional, LP21-Code */ }],
  lernziele: [{
    id: 'leistung.s1.hubarbeit', kompetenz: 'leistung.s1', titel: 'Hubarbeit berechnen',
    lernkarte: { titel: '…', html: '<p>…</p>', beispiel: { given: 'Aufgabe', steps: [['Schritt', 'Rechnung'], …] } } // optional
  }],
  aufgaben: [ /* siehe unten */ ]
};
```

Hierarchie: Kompetenz → Lernziel → Aufgabe. Die Lehrperson wertet später auf Kompetenz- und Lernziel-Ebene aus.

## Aufgabe: Mindestfelder

| Feld | Bedeutung |
| --- | --- |
| `id` | eindeutig im Paket, ändert sich nie (Antwortdaten hängen daran) |
| `lernziel` | Lernziel-ID |
| `typ` | `mc`, `zahl`, `luecke`, `zuordnen`, `reihenfolge`, `erklaeren` |
| `text` | Aufgabentext (HTML erlaubt) |
| richtige Antwort(en) | je nach Typ, siehe unten |
| `erklaerung` | kurze Erklärung, warum; wird nach jeder Antwort gezeigt |
| `schwierigkeit` | 1–5 |
| `variantengruppe` | Aufgaben derselben Gruppe sind «gleicher Wortlaut». Nach einem Fehler wählt der Motor wenn möglich eine andere Gruppe. |
| `quelle` | z. B. «NaTech 8, Kapitel 5» |
| `pruefstatus` | `entwurf`, `geprueft`, `zurueckgezogen`. **Nur `geprueft` kommt in Umlauf.** |
| `hilfe` | optional: Tipp für den Fading-Schritt «mit Hilfe» |

Statt der Antwortfelder kann eine Aufgabe `erzeuge()` haben, das ein Objekt mit `typ`, `text`, Antwortfeldern und `erklaerung` zurückgibt.

## Typen

| Typ | Antwortfelder | Bewertung |
| --- | --- | --- |
| `mc` | `optionen: [{ text, richtig, erklaerung? }]`, genau eine richtig | `erklaerung` an einer falschen Option = Erklärung der Fehlvorstellung, wird bei dieser Wahl zusätzlich gezeigt. Gespeichert wird der Index der gewählten Option (für «häufige Fehlvorstellungen»). |
| `zahl` | `wert`, `einheit`, `toleranzRel` (Standard 0.01), `toleranzAbs`, `einheitPruefen`, `einheitenAlternativ: { kJ: 1000 }` | Komma, Punkt, Hochkomma als Tausendertrennung. Mit `einheitPruefen` muss das Kind die Einheit eintippen; Alternativen werden umgerechnet. |
| `luecke` | Text mit `___`, `luecken: [['Joule', 'J'], …]` | mehrere akzeptierte Schreibweisen, Gross/Klein egal, Teilpunkte |
| `zuordnen` | `paare: [['Energie', 'Joule'], …]` | Teilpunkte |
| `reihenfolge` | `elemente` in richtiger Reihenfolge | Teilpunkte (richtige Position) |
| `erklaeren` | `musterantwort` | Version 1 ohne KI: Kind schreibt, sieht die Musterantwort und schätzt selbst ein (passt / teilweise / fehlt) |
| Simulation mit Frage | beliebige Aufgabe mit Feld `simulation: '<id>'` | Die Simulation des Pakets (`paket.simulationen[id]`) erscheint über der Frage. Nur im Zusatzblock. |

## Ablauf für neue Aufgaben

1. Claude erzeugt einen Stapel im Format oben mit `pruefstatus: 'entwurf'`.
2. Du prüfst fachlich und setzt `geprueft`.
3. `npm test` muss grün sein (prüft Pflichtfelder, genau eine richtige MC-Option, Lückenzahl, erzeugende Aufgaben 20-mal).

## Ergänzungen zu bestehenden Paketen

Die Naturalia-Pakete werden aus Naturalia erzeugt und nicht von Hand geändert. Zusätzliche Inhalte stehen in `pakete/ergaenzungen/<paket>.js`:

```js
export default {
  // Erklärung pro falscher Option: Vorlage → { Index der Option in Naturalia (0 = richtig): Text }
  erklaerungen: { 's1-richtung': { 1: '…', 2: '…', 3: '…' } },
  // Neue Varianten: wieVorlage bestimmt das Lernziel
  aufgaben: [{ id: 's3-mensch-v2', wieVorlage: 's3-mensch', typ: 'zuordnen', schwierigkeit: 2, text: '…', paare: [[…]], erklaerung: '…' }]
};
```

`pakete/ergaenze.js` fügt sie zur Laufzeit ein. Freigabe-IDs: `<paket>.<aufgabe>` und `<paket>.<vorlage>#erklaerungen`. Freigegeben wird im Dashboard; der Status liegt in der Tabelle `lernmotor.freigaben`. `node werkzeuge/inhaltsluecken.mjs <paket>` zeigt, wo noch Varianten oder Erklärungen fehlen.
