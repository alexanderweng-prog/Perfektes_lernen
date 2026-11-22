// Führt ein Paket mit seinen Ergänzungen zusammen (pakete/ergaenzungen/<id>.js).
// Ergänzungen sind Entwürfe, bis eine Lehrperson sie im Dashboard freigibt (Tabelle «freigaben» im Backend).
// Freigabe-IDs: «<paket>.<aufgabe>» für neue Aufgaben, «<paket>.<vorlage>#erklaerungen» für Erklärungen pro Option.

import { KATALOG } from './katalog.js';

export const QUELLE_ERGAENZUNG = 'Ergänzung Claude, Nov. 2026';

export function ergaenze(paket, erg, { freigaben = {}, alleFreigeben = false } = {}) {
  if (!erg) return { ...paket, entwuerfe: [] };
  const status = id => alleFreigeben ? 'geprueft' : (freigaben[id] || 'entwurf');
  const vorlageId = a => a.id.slice(paket.id.length + 1);
  const entwuerfe = [];

  const aufgaben = paket.aufgaben.map(a => {
    const erk = erg.erklaerungen && erg.erklaerungen[vorlageId(a)];
    if (!erk) return a;
    const fid = `${paket.id}.${vorlageId(a)}#erklaerungen`;
    entwuerfe.push({ id: fid, art: 'erklaerungen', aufgabe: a, erklaerungen: erk, status: status(fid) });
    if (status(fid) !== 'geprueft') return a;
    const orig = a.erzeuge;
    return { ...a, erzeuge: () => {
      const r = orig();
      return { ...r, optionen: r.optionen.map((o, i) => (!o.richtig && erk[i] ? { ...o, erklaerung: erk[i] } : o)) };
    } };
  });

  for (const n of erg.aufgaben || []) {
    const vorlage = paket.aufgaben.find(a => vorlageId(a) === n.wieVorlage);
    if (!vorlage) throw new Error(`Ergänzung ${n.id}: Vorlage ${n.wieVorlage} gibt es im Paket ${paket.id} nicht`);
    const id = `${paket.id}.${n.id}`;
    const { wieVorlage, ...rest } = n;
    const a = { ...rest, id, lernziel: vorlage.lernziel, variantengruppe: id, quelle: QUELLE_ERGAENZUNG, pruefstatus: status(id) };
    if (!a.typ && typeof a.erzeuge !== 'function') throw new Error(`Ergänzung ${n.id}: typ fehlt`);
    if (!a.typ) a.typ = a.erzeuge().typ;
    aufgaben.push(a);
    entwuerfe.push({ id, art: 'aufgabe', aufgabe: a, vorlage, status: a.pruefstatus });
  }
  return { ...paket, aufgaben, entwuerfe };
}


export async function ladeErgaenzung(paketId) {
  if (!KATALOG.some(k => k.id === paketId)) return null;
  try { return (await import(`./ergaenzungen/${paketId}.js`)).default; }
  catch (e) { return null; }
}
