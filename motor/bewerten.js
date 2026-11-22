// Bewertet eine Antwort zu einer Instanz. Ergebnis:
// { gueltig, richtig, punkte (0–1), gewaehlt, erklaerung, loesung }
// gueltig = false heisst: Eingabe nicht auswertbar (z. B. keine Zahl), nichts zählen.

export function bewerte(i, antwort) {
  switch (i.typ) {
    case 'mc': return mc(i, antwort);
    case 'zahl': return zahl(i, antwort);
    case 'luecke': return luecke(i, antwort);
    case 'zuordnen': return zuordnen(i, antwort);
    case 'reihenfolge': return reihenfolge(i, antwort);
    case 'erklaeren': return erklaeren(i, antwort);
    default: throw new Error('Unbekannter Typ ' + i.typ);
  }
}

function ergebnis(punkte, extra) {
  return { gueltig: true, punkte, richtig: punkte >= 1, ...extra };
}

function mc(i, nr) {
  const o = i.optionen.find(x => x.nr === nr);
  if (!o) return { gueltig: false };
  const richtige = i.optionen.find(x => x.richtig);
  // Eigene Erklärung pro falscher Option (Fehlvorstellung), sonst die allgemeine
  const erklaerung = !o.richtig && o.erklaerung ? o.erklaerung + '<br><br>' + i.erklaerung : i.erklaerung;
  return ergebnis(o.richtig ? 1 : 0, { gewaehlt: nr, erklaerung, loesung: richtige.text });
}

// «2,5», «2.5», «1'200», «−3», «2,5 kJ»
export function leseZahl(s) {
  s = String(s ?? '').trim().replace(/−/g, '-');
  const m = /^(-?[\d\s'’ ]*[.,]?\d+)\s*(.*)$/.exec(s);
  if (!m) return null;
  const x = parseFloat(m[1].replace(/[\s'’ ]/g, '').replace(',', '.'));
  return Number.isFinite(x) ? { x, einheit: m[2].trim() } : null;
}

function zahl(i, eingabe) {
  const z = leseZahl(eingabe);
  if (!z) return { gueltig: false, hinweis: 'Gib eine Zahl ein, zum Beispiel 120 oder 2,5.' };
  let faktor = 1;
  if (i.einheitPruefen) {
    const alt = i.einheitenAlternativ || {};
    if (!z.einheit) return { gueltig: false, hinweis: `Gib auch die Einheit an, zum Beispiel ${i.einheit}.` };
    if (gleichEinheit(z.einheit, i.einheit)) faktor = 1;
    else {
      const k = Object.keys(alt).find(e => gleichEinheit(z.einheit, e));
      if (!k) return ergebnis(0, { gewaehlt: eingabe, erklaerung: `Die Einheit «${z.einheit}» passt nicht.<br>${i.erklaerung}`, loesung: `${i.wert} ${i.einheit}`, einheitFalsch: true });
      faktor = alt[k];
    }
  }
  const x = z.x * faktor;
  const tol = Math.max(Math.abs(i.wert) * (i.toleranzRel ?? 0.01), i.toleranzAbs ?? 0, 1e-9);
  const ok = Math.abs(x - i.wert) <= tol;
  return ergebnis(ok ? 1 : 0, { gewaehlt: eingabe, erklaerung: i.erklaerung, loesung: `${i.wert} ${i.einheit || ''}`.trim() });
}

const gleichEinheit = (a, b) => a.replace(/\s/g, '') === String(b).replace(/\s/g, '');

export function normalisiere(s) {
  return String(s ?? '').trim().toLowerCase().replace(/ß/g, 'ss').replace(/\s+/g, ' ');
}

function luecke(i, antworten) {
  if (!Array.isArray(antworten)) return { gueltig: false };
  let ok = 0;
  i.luecken.forEach((akzeptiert, k) => { if (akzeptiert.some(a => normalisiere(a) === normalisiere(antworten[k]))) ok++; });
  return ergebnis(ok / i.luecken.length, { gewaehlt: antworten, erklaerung: i.erklaerung, loesung: i.luecken.map(l => l[0]).join(' · ') });
}

function zuordnen(i, zuordnung) {
  if (!Array.isArray(zuordnung)) return { gueltig: false };
  const ok = i.paare.filter((p, k) => zuordnung[k] === p[1]).length;
  return ergebnis(ok / i.paare.length, { gewaehlt: zuordnung, erklaerung: i.erklaerung, loesung: i.paare.map(p => `${p[0]} → ${p[1]}`).join('<br>') });
}

function reihenfolge(i, folge) {
  if (!Array.isArray(folge) || folge.length !== i.elemente.length) return { gueltig: false };
  const ok = i.elemente.filter((e, k) => folge[k] === e).length;
  return ergebnis(ok / i.elemente.length, { gewaehlt: folge, erklaerung: i.erklaerung, loesung: i.elemente.join(' → ') });
}

// Version 1: keine KI-Bewertung. Das Kind vergleicht mit der Musterantwort und schätzt sich selbst ein.
function erklaeren(i, selbst) {
  const p = { passt: 1, teilweise: 0.5, fehlt: 0 }[selbst];
  if (p === undefined) return { gueltig: false };
  return ergebnis(p, { gewaehlt: selbst, erklaerung: i.erklaerung || '', loesung: i.musterantwort, selbstbewertet: true });
}
