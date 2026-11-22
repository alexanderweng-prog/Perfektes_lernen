// Gemeinsames Aufgabenformat (siehe docs/aufgabenformat.md).
// Der Motor kennt kein Fach. Er liest nur Pakete in diesem Format.

export const TYPEN = ['mc', 'zahl', 'luecke', 'zuordnen', 'reihenfolge', 'erklaeren'];
export const PRUEFSTATUS = ['entwurf', 'geprueft', 'zurueckgezogen'];

// Eine Aufgabe ist entweder statisch (Felder direkt) oder hat erzeuge(), das bei jedem Aufruf
// eine neue Variante liefert (z. B. andere Zahlen). Beides ergibt eine «Instanz».
export function instanz(aufgabe, zufall = Math.random) {
  const roh = typeof aufgabe.erzeuge === 'function' ? aufgabe.erzeuge() : aufgabe;
  const i = { ...roh, aufgabeId: aufgabe.id, lernziel: aufgabe.lernziel, typ: roh.typ || aufgabe.typ };
  if (i.typ === 'mc') {
    // Originalindex merken: das Dashboard wertet die gewählte Option über diesen Index aus
    i.optionen = mischen(roh.optionen.map((o, nr) => ({ ...o, nr })), zufall);
  }
  if (i.typ === 'zuordnen') i.rechtsGemischt = mischen(roh.paare.map(p => p[1]), zufall);
  if (i.typ === 'reihenfolge') i.gemischt = mischen(roh.elemente.slice(), zufall);
  return i;
}

export function mischen(a, zufall = Math.random) {
  a = a.slice();
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(zufall() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}

// Prüft ein Paket. Gibt eine Liste von Fehlern zurück (leer = in Ordnung).
// Erzeugende Aufgaben werden mehrfach ausgeführt, damit kaputte Varianten auffallen.
export function pruefePaket(paket, { durchlaeufe = 20 } = {}) {
  const f = [];
  if (!paket || !paket.id) return ['Paket ohne id'];
  const kIds = new Set((paket.kompetenzen || []).map(k => k.id));
  const lIds = new Set();
  for (const l of paket.lernziele || []) {
    if (!l.id || !l.titel) f.push(`Lernziel ohne id/titel: ${JSON.stringify(l).slice(0, 60)}`);
    if (lIds.has(l.id)) f.push(`Lernziel doppelt: ${l.id}`);
    lIds.add(l.id);
    if (!kIds.has(l.kompetenz)) f.push(`Lernziel ${l.id}: unbekannte Kompetenz ${l.kompetenz}`);
  }
  const aIds = new Set();
  const proLernziel = new Map();
  for (const a of paket.aufgaben || []) {
    const wo = `Aufgabe ${a.id}`;
    if (!a.id) { f.push('Aufgabe ohne id'); continue; }
    if (aIds.has(a.id)) f.push(`${wo}: id doppelt`);
    aIds.add(a.id);
    if (!lIds.has(a.lernziel)) f.push(`${wo}: unbekanntes Lernziel ${a.lernziel}`);
    if (!TYPEN.includes(a.typ)) f.push(`${wo}: unbekannter Typ ${a.typ}`);
    if (!(a.schwierigkeit >= 1 && a.schwierigkeit <= 5)) f.push(`${wo}: Schwierigkeit muss 1–5 sein`);
    if (!a.variantengruppe) f.push(`${wo}: Variantengruppe fehlt`);
    if (!a.quelle) f.push(`${wo}: Quelle fehlt`);
    if (!PRUEFSTATUS.includes(a.pruefstatus)) f.push(`${wo}: Prüfstatus ${a.pruefstatus} ungültig`);
    if (a.simulation && !(paket.simulationen && typeof paket.simulationen[a.simulation] === 'function')) f.push(`${wo}: Simulation ${a.simulation} fehlt im Paket`);
    if (a.pruefstatus === 'geprueft' && !a.simulation) proLernziel.set(a.lernziel, (proLernziel.get(a.lernziel) || 0) + 1);
    const n = typeof a.erzeuge === 'function' ? durchlaeufe : 1;
    for (let k = 0; k < n; k++) {
      let i;
      try { i = instanz(a); } catch (e) { f.push(`${wo}: Fehler beim Erzeugen: ${e.message}`); break; }
      const fehler = pruefeInstanz(i);
      if (fehler) { f.push(`${wo}: ${fehler}`); break; }
    }
  }
  for (const id of lIds) if (!proLernziel.get(id)) f.push(`Lernziel ${id}: keine geprüfte Aufgabe`);
  return f;
}

function pruefeInstanz(i) {
  if (!i.text) return 'Aufgabentext fehlt';
  if (!i.erklaerung && i.typ !== 'erklaeren') return 'Erklärung fehlt';
  switch (i.typ) {
    case 'mc': {
      const r = i.optionen.filter(o => o.richtig).length;
      if (i.optionen.length < 2) return 'MC braucht mind. 2 Optionen';
      if (r !== 1) return `MC braucht genau 1 richtige Option (hat ${r})`;
      if (new Set(i.optionen.map(o => o.text)).size !== i.optionen.length) return 'MC-Optionen doppelt';
      return null;
    }
    case 'zahl':
      if (!Number.isFinite(i.wert)) return 'Zahl: wert fehlt oder ist keine Zahl';
      return null;
    case 'luecke': {
      const n = (i.text.match(/___/g) || []).length;
      if (!n || n !== (i.luecken || []).length) return 'Lückentext: Anzahl ___ und luecken stimmt nicht überein';
      return null;
    }
    case 'zuordnen': return (i.paare || []).length >= 2 ? null : 'Zuordnen braucht mind. 2 Paare';
    case 'reihenfolge': return (i.elemente || []).length >= 2 ? null : 'Reihenfolge braucht mind. 2 Elemente';
    case 'erklaeren': return i.musterantwort ? null : 'Erklären braucht eine Musterantwort';
    default: return `unbekannter Typ ${i.typ}`;
  }
}
