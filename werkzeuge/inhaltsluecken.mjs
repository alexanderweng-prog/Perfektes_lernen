#!/usr/bin/env node
// Listet pro Paket: MC-Vorlagen (für Erklärungen pro falscher Option) und Lernziele mit nur einer Vorlage.
// Aufruf: node werkzeuge/inhaltsluecken.mjs <paketId> [--kurz]
const id = process.argv[2];
const p = (await import(`../pakete/${id}.js`)).default;
const strip = h => String(h).replace(/<br\s*\/?>/g, ' / ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const vorlage = a => a.id.slice(p.id.length + 1);
console.log(`# ${p.id}: ${p.titel}`);
for (const l of p.lernziele) {
  const as = p.aufgaben.filter(a => a.lernziel === l.id);
  console.log(`\n## LZ ${l.id.slice(p.id.length + 1)} «${l.titel}» (${as.length} Vorlage${as.length > 1 ? 'n' : ''})${as.length === 1 ? ' [BRAUCHT VARIANTE]' : ''}`);
  if (as.length === 1 && l.lernkarte && !process.argv.includes('--kurz')) console.log('Lernkarte: ' + strip(l.lernkarte.html).slice(0, 400));
  for (const a of as) {
    const i = a.erzeuge();
    if (i.typ === 'mc') console.log(`- ${vorlage(a)} MC: ${strip(i.text)}\n  ${i.optionen.map((o, k) => `[${k}${k === 0 ? '✓' : ''}] ${strip(o.text)}`).join('\n  ')}\n  Erkl: ${strip(i.erklaerung).slice(0, 250)}`);
    else console.log(`- ${vorlage(a)} ZAHL: ${strip(i.text)} → ${i.wert} ${i.einheit}`);
  }
}
