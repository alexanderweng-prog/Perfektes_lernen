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

import { KAPITEL as ALLE, katalogDatei } from './kapitel.mjs';
const KAPITEL = ALLE.filter(k => k[3] === 'naturalia');

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
writeFileSync(join(ZIEL, 'katalog.js'), katalogDatei());
