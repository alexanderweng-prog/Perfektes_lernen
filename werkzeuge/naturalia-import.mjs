#!/usr/bin/env node
// Erzeugt aus den Naturalia-Kapiteln (Repository Claude_test, Ordner fantasy-lernapp/src) Inhaltspakete.
// Aufruf: node werkzeuge/naturalia-import.mjs <Pfad zu fantasy-lernapp>
// Ergebnis: pakete/<id>.js pro Kapitel und pakete/katalog.js
// Die erzeugten Dateien nicht von Hand ändern, sondern das Kapitel in Naturalia ändern und neu importieren.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const QUELLE = process.argv[2];
if (!QUELLE) { console.error('Pfad zu fantasy-lernapp fehlt'); process.exit(1); }
const ZIEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'pakete');

// id, Titel, NaTech-Kapitel
const KAPITEL = [
  ['leistung', 'Leistung', 'Vertiefung Leistung'],
  ['motor', 'Elektromotor und Generator', 'Vertiefung Motor'],
  ['nt7-1', 'Naturwissenschaften erkunden', 'NaTech 7, Kapitel 1'],
  ['nt7-3', 'Reize und Sinne untersuchen', 'NaTech 7, Kapitel 3'],
  ['nt7-4', 'Bewegungen erkunden', 'NaTech 7, Kapitel 4'],
  ['nt7-5', 'Energie erkunden', 'NaTech 7, Kapitel 5'],
  ['nt7-7', 'Chemische Reaktionen untersuchen', 'NaTech 7, Kapitel 7'],
  ['nt8-1', 'Stromkreise untersuchen', 'NaTech 8, Kapitel 1'],
  ['nt8-5', 'Kräfte, Arbeit und Leistung erforschen', 'NaTech 8, Kapitel 5']
];

const hilfen = readFileSync(join(QUELLE, 'src/helpers.js'), 'utf8');
// Hilfsfunktionen der Naturalia-Engine, die die Simulationen brauchen ($id, sl, brow, nf, reduced, tween …)
const engine = readFileSync(join(QUELLE, 'src/engine.js'), 'utf8');
const simHilfen = engine.slice(0, engine.indexOf('/* ---------- Speicher'));
for (const [id, titel, kapitel] of KAPITEL) {
  const kapitelCode = readFileSync(join(QUELLE, `src/chapters/${id}.js`), 'utf8');
  const out = `// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs aus fantasy-lernapp/src/chapters/${id}.js
// Nicht von Hand ändern. Simulationen (SIMS) werden im Browser mit simulationen[id](element) gestartet.
import { ausNaturalia } from './naturalia-adapter.js';

${hilfen}
${simHilfen}
${kapitelCode}

export default ausNaturalia({ STATIONS, TOPIC, SIMS }, ${JSON.stringify({ id, titel, kapitel })});
`;
  writeFileSync(join(ZIEL, `${id}.js`), out);
  console.log('geschrieben: pakete/' + id + '.js');
}
const katalog = `// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs
export const KATALOG = ${JSON.stringify(KAPITEL.map(([id, titel, kapitel]) => ({ id, titel, kapitel, datei: `./${id}.js` })), null, 2)};
`;
writeFileSync(join(ZIEL, 'katalog.js'), katalog);
