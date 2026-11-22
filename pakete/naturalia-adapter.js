// Übersetzt ein Naturalia-Kapitel (STATIONS mit Aufgabenvorlagen und Lernkarten) ins gemeinsame Paketformat.
// Zuordnung:
//   Station (Quest)                 → Kompetenz
//   Lernkarte, auf die Vorlagen verweisen (t.learn) → Lernziel (die Lernkarte dient als Einführung)
//   Aufgabenvorlage (make)          → Aufgabe; jede Vorlage ist eine Variantengruppe, make() liefert neue Zahlen

const slug = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

export function ausNaturalia({ STATIONS, TOPIC }, { id, titel, kapitel, pruefstatus = 'geprueft' }) {
  const kompetenzen = [], lernziele = [], aufgaben = [];
  for (const s of STATIONS) {
    const kId = `${id}.${s.id}`;
    kompetenzen.push({ id: kId, titel: s.title, untertitel: s.sub || '', ziele: s.goals || [], kapitel });
    const lzVon = new Map();
    for (const t of s.items) {
      const h = t.learn || s.title;
      if (!lzVon.has(h)) {
        const karte = (s.lesson || []).find(c => c.h === h) || null;
        const lId = `${kId}.${slug(h)}`;
        lzVon.set(h, lId);
        lernziele.push({
          id: lId, kompetenz: kId, titel: h.replace(/^Vorgerechnet:\s*/, ''), themen: [],
          lernkarte: karte ? { titel: karte.h, html: karte.body || '', beispiel: karte.worked || null } : null
        });
      }
      const lz = lernziele.find(l => l.id === lzVon.get(h));
      lz.themen.push(t.topic);
      const probe = t.make();
      aufgaben.push({
        id: `${id}.${t.id}`, lernziel: lz.id, typ: probe.type === 'num' ? 'zahl' : probe.type,
        // Schätzung: Begriffsfrage 2, Rechnung 3, Erweiterung 4 (Annahme, im Pilot über Fehlerquoten prüfen)
        schwierigkeit: t.ext ? 4 : probe.type === 'num' ? 3 : 2,
        variantengruppe: `${id}.${t.id}`, thema: t.topic,
        quelle: `${kapitel} · ${TOPIC.title} · Quest ${s.nr}`,
        pruefstatus,
        erzeuge: () => wandle(t.make())
      });
    }
  }
  return { id, titel, fach: 'NuT', version: 1, kompetenzen, lernziele, aufgaben, formeln: TOPIC.formulas || [] };
}

function wandle(d) {
  if (d.type === 'mc') {
    return { typ: 'mc', text: d.q, erklaerung: d.explain, optionen: d.options.map((text, i) => ({ text, richtig: i === 0 })) };
  }
  if (d.type === 'num') {
    return { typ: 'zahl', text: d.q, wert: d.ans, einheit: d.unit, hilfe: d.hint, erklaerung: d.explain,
      toleranzRel: d.tolRel, toleranzAbs: d.tolAbs };
  }
  throw new Error('Naturalia-Typ nicht unterstützt: ' + d.type);
}
