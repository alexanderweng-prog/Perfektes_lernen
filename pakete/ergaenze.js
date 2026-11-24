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
    let vorlage = null, lernziel = null;
    if (n.simulation) {
      const lz = paket.lernziele.find(l => (l.simulationen || []).some(s => s.id === n.simulation));
      if (!lz) throw new Error(`Ergänzung ${n.id}: Simulation ${n.simulation} gibt es im Paket ${paket.id} nicht`);
      lernziel = lz.id;
      vorlage = { thema: 'Simulation ' + lz.simulationen.find(s => s.id === n.simulation).titel, lernziel };
    } else {
      vorlage = paket.aufgaben.find(a => vorlageId(a) === n.wieVorlage);
      if (!vorlage) throw new Error(`Ergänzung ${n.id}: Vorlage ${n.wieVorlage} gibt es im Paket ${paket.id} nicht`);
      lernziel = vorlage.lernziel;
    }
    const id = `${paket.id}.${n.id}`;
    const { wieVorlage, ...rest } = n;
    const a = { ...rest, id, lernziel, variantengruppe: id, quelle: QUELLE_ERGAENZUNG, pruefstatus: status(id) };
    if (!a.typ && typeof a.erzeuge !== 'function') throw new Error(`Ergänzung ${n.id}: typ fehlt`);
    if (!a.typ) a.typ = a.erzeuge().typ;
    aufgaben.push(a);
    entwuerfe.push({ id, art: 'aufgabe', aufgabe: a, vorlage, status: a.pruefstatus });
  }
  return { ...paket, aufgaben, entwuerfe };
}


export async function ladeErgaenzung(paketId) {
  const eintrag = KATALOG.find(k => k.id === paketId);
  if (!eintrag) return null;
  let erg = null, sim = [], kt = {};
  if (eintrag.ergaenzung) try { erg = (await import(`./ergaenzungen/${paketId}.js`)).default; } catch (e) { /* keine Ergänzung */ }
  try { sim = (await import('./ergaenzungen/simulationen.js')).default[paketId] || []; } catch (e) { /* keine Simulationsfragen */ }
  try { sim = sim.concat((await import('./ergaenzungen/simulationen-lernlandkarte.js')).default[paketId] || []); } catch (e) { /* keine */ }
  try { kt = (await import('./ergaenzungen/kurztests.js')).default[paketId] || {}; } catch (e) { /* keine Erklärungen zu «Kurz testen» */ }
  if (!erg && !sim.length && !Object.keys(kt).length) return null;
  return { erklaerungen: { ...((erg && erg.erklaerungen) || {}), ...kt }, aufgaben: [...((erg && erg.aufgaben) || []), ...sim] };
}
