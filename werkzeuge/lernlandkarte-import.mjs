#!/usr/bin/env node
// Erzeugt aus den Kapiteln der NuT-Lernlandkarte (Repository Claude_test, Ordner nut-lernlandkarte) Inhaltspakete.
// Aufruf: node werkzeuge/lernlandkarte-import.mjs <Pfad zu nut-lernlandkarte>
// Übernommen wird der Skriptteil von «Hilfsfunktionen» bis vor «Speicher»: Hilfsfunktionen, Stationen, Lernkarten,
// Thema, Simulationen und deren Hilfsfunktionen. Alles danach (Spielstand, Darstellung, Klassenwertung) braucht der Lern-Motor nicht.
// Sprechtexte (MP3) aus audio/<id>/ kopiert man nach audio/<id>/ im Lern-Motor (siehe README).
// Die erzeugten Dateien nicht von Hand ändern, sondern das Kapitel in der Lernlandkarte ändern und neu importieren.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { KAPITEL, katalogDatei } from './kapitel.mjs';

const QUELLE = process.argv[2];
if (!QUELLE) { console.error('Pfad zu nut-lernlandkarte fehlt'); process.exit(1); }
const ZIEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'pakete');

for (const [id, titel, kapitel, quelle, datei] of KAPITEL.filter(k => k[3] === 'lernlandkarte')) {
  const html = readFileSync(join(QUELLE, datei), 'utf8');
  const s = html.indexOf('/* ---------- Hilfsfunktionen'), e = html.indexOf('/* ---------- Speicher');
  if (s < 0 || e < s) throw new Error(`${datei}: Abschnitte «Hilfsfunktionen» und «Speicher» nicht gefunden`);
  const code = html.slice(s, e);
  if (!code.includes(`id: '${id}'`)) throw new Error(`${datei}: TOPIC.id ist nicht ${id}`);
  writeFileSync(join(ZIEL, `${id}.js`), `// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/${datei}
// Nicht von Hand ändern. Simulationen (SIMS) werden im Browser mit simulationen[id](element) gestartet.
import { ausNaturalia } from './naturalia-adapter.js';

${code}
export default ausNaturalia({ STATIONS, TOPIC, SIMS }, ${JSON.stringify({ id, titel, kapitel, audio: existsSync(join(QUELLE, 'audio', id)) ? id : null })});
`);
  console.log('geschrieben: pakete/' + id + '.js');
}
writeFileSync(join(ZIEL, 'katalog.js'), katalogDatei());
