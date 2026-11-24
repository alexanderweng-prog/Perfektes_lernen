// Alle Kapitel des Lern-Motors: id, Titel, Lehrmittel-Kapitel, Quelle.
// naturalia: Claude_test/fantasy-lernapp/src/chapters/<id>.js (werkzeuge/naturalia-import.mjs)
// lernlandkarte: Claude_test/nut-lernlandkarte/<datei> (werkzeuge/lernlandkarte-import.mjs)
// Die 7 Kapitel, die in beiden vorkommen, sind inhaltlich gleich. Sie kommen aus der Lernlandkarte, weil nur dort die Sprechtexte (Vorlesen) sind.
export const KAPITEL = [
  ['nt7-1', 'Naturwissenschaften erkunden', 'NaTech 7, Kapitel 1', 'lernlandkarte', '7_1_Naturwissenschaften_erkunden.html'],
  ['nt7-2', 'Den Körper analysieren', 'NaTech 7, Kapitel 2', 'lernlandkarte', '7_2_Den_Koerper_analysieren.html'],
  ['nt7-3', 'Reize und Sinne untersuchen', 'NaTech 7, Kapitel 3', 'lernlandkarte', '7_3_Reize_und_Sinne_untersuchen.html'],
  ['nt7-4', 'Bewegungen erkunden', 'NaTech 7, Kapitel 4', 'lernlandkarte', '7_4_Bewegungen_erkunden.html'],
  ['nt7-5', 'Energie erkunden', 'NaTech 7, Kapitel 5', 'lernlandkarte', '7_5_Energie_erkunden.html'],
  ['nt7-6', 'Arbeiten im Labor', 'NaTech 7, Kapitel 6', 'lernlandkarte', '7_6_Arbeiten_im_Labor.html'],
  ['nt7-7', 'Chemische Reaktionen untersuchen', 'NaTech 7, Kapitel 7', 'lernlandkarte', '7_7_Chemische_Reaktionen_untersuchen.html'],
  ['nt8-1', 'Stromkreise untersuchen', 'NaTech 8, Kapitel 1', 'lernlandkarte', '8_1_Stromkreise_untersuchen.html'],
  ['nt8-2', 'Gewässer-Ökosysteme erforschen', 'NaTech 8, Kapitel 2', 'lernlandkarte', '8_2_Gewaesser_Oekosysteme_erforschen.html'],
  ['nt8-3', 'Funktionen des Körpers analysieren', 'NaTech 8, Kapitel 3', 'lernlandkarte', '8_3_Funktionen_des_Koerpers_analysieren.html'],
  ['nt8-4', 'Chemische Reaktionen erforschen', 'NaTech 8, Kapitel 4', 'lernlandkarte', '8_4_Chemische_Reaktionen_erforschen.html'],
  ['nt8-5', 'Kräfte, Arbeit und Leistung erforschen', 'NaTech 8, Kapitel 5', 'lernlandkarte', '8_5_Kraefte_Arbeit_und_Leistung_erforschen.html'],
  ['nt9-1', 'Optische Phänomene erkunden', 'NaTech 9, Kapitel 1', 'lernlandkarte', '9_1_Optische_Phaenomene_erkunden.html'],
  ['nt9-2', 'Atommodelle nutzen', 'NaTech 9, Kapitel 2', 'lernlandkarte', '9_2_Atommodelle_nutzen.html'],
  ['nt9-3', 'Elektronische Schaltungen untersuchen', 'NaTech 9, Kapitel 3', 'lernlandkarte', '9_3_Elektronische_Schaltungen_untersuchen.html'],
  ['nt9-4', 'Energie und Leistung erfassen', 'NaTech 9, Kapitel 4', 'lernlandkarte', '9_4_Energie_und_Leistung_erfassen.html'],
  ['nt9-5', 'Genetik und Gentechnik verstehen', 'NaTech 9, Kapitel 5', 'lernlandkarte', '9_5_Genetik_und_Gentechnik_verstehen.html'],
  ['nt9-6', 'Evolution nachvollziehen', 'NaTech 9, Kapitel 6', 'lernlandkarte', '9_6_Evolution_nachvollziehen.html'],
  ['nt9-7', 'Land-Ökosysteme erforschen', 'NaTech 9, Kapitel 7', 'lernlandkarte', '9_7_Land_Oekosysteme_erforschen.html'],
  ['nt9-8', 'Stoffkreisläufe erkunden', 'NaTech 9, Kapitel 8', 'lernlandkarte', '9_8_Stoffkreislaeufe_erkunden.html'],
  ['leistung', 'Leistung', 'Vertiefung Leistung', 'naturalia'],
  ['motor', 'Elektromotor und Generator', 'Vertiefung Motor', 'naturalia']
];

import { existsSync } from 'node:fs';

// ergaenzung: true, wenn pakete/ergaenzungen/<id>.js existiert (die App lädt nur dann, ohne 404 im Browser)
export function katalogDatei() {
  return `// AUTOMATISCH ERZEUGT aus werkzeuge/kapitel.mjs (naturalia-import.mjs oder lernlandkarte-import.mjs)
export const KATALOG = ${JSON.stringify(KAPITEL.map(([id, titel, kapitel]) => ({ id, titel, kapitel, datei: `./${id}.js`, ergaenzung: existsSync(new URL(`../pakete/ergaenzungen/${id}.js`, import.meta.url)) })), null, 2)};
`;
}
