// Sitzung: plant den Wiederholungsblock (bzw. den freiwilligen Zusatzblock) und führt durch die Aufgaben.
// - Fällige Lernziele zuerst (am stärksten verblasste zuerst), danach wenige neue.
// - Interleaving: aufeinanderfolgende Aufgaben möglichst aus verschiedenen Kompetenzen.
// - Neues Lernziel: Beispiel → Aufgabe mit Hilfe → Aufgabe ohne Hilfe (Fading), mit Abstand dazwischen.
// - Falsch gelöst: gleiches Lernziel kommt später in der Sitzung nochmals, möglichst in anderer Variante.
// - Pausenhinweis, wenn die Fehlerquote deutlich über dem eigenen Schnitt der Sitzung liegt.

import { EINSTELLUNGEN as E } from './einstellungen.js';
import { instanz, mischen } from './format.js';
import { bewerte } from './bewerten.js';
import { istNeu, istFaellig, abrufWahrscheinlichkeit, verbuche, eintrag } from './schuelermodell.js';

export function freigegebeneLernziele(paket, freigabe) {
  const ok = freigabe && freigabe.length ? new Set(freigabe) : null;
  const mitAufgabe = new Set(paket.aufgaben.filter(a => a.pruefstatus === 'geprueft').map(a => a.lernziel));
  return paket.lernziele.filter(l => (!ok || ok.has(l.kompetenz)) && mitAufgabe.has(l.id));
}

// Reihenfolge nach Kompetenzen verzahnen (A1 B1 C1 A2 B2 …), innerhalb einer Kompetenz die Reihenfolge behalten
export function verzahne(liste, schluessel) {
  const gruppen = new Map();
  for (const x of liste) { const k = schluessel(x); if (!gruppen.has(k)) gruppen.set(k, []); gruppen.get(k).push(x); }
  const out = [], g = [...gruppen.values()];
  for (let r = 0; out.length < liste.length; r++) for (const a of g) if (a[r] !== undefined) out.push(a[r]);
  return out;
}

export function zaehleFaellige(paket, modell, { jetzt = new Date(), freigabe } = {}) {
  return freigegebeneLernziele(paket, freigabe).filter(l => istFaellig(modell, l.id, jetzt)).length;
}

// Aufgaben mit Simulation kommen nur im Zusatzblock (Phase «simulation»), alle anderen nur ausserhalb
export function waehleAufgabe(paket, lernzielId, niveau, { ohneGruppen = [], zufall = Math.random, simulation = false } = {}) {
  const geprueft = paket.aufgaben.filter(a => a.lernziel === lernzielId && a.pruefstatus === 'geprueft');
  const passend = geprueft.filter(a => !!a.simulation === simulation);
  const alle = passend.length ? passend : geprueft;
  const andere = alle.filter(a => !ohneGruppen.includes(a.variantengruppe));
  const pool = andere.length ? andere : alle;
  const abstand = a => Math.abs(a.schwierigkeit - niveau);
  const best = Math.min(...pool.map(abstand));
  const kandidaten = pool.filter(a => abstand(a) === best);
  return kandidaten[Math.floor(zufall() * kandidaten.length)];
}

export class Sitzung {
  constructor(paket, modell, { art = 'block', freigabe = null, uhr = () => new Date(), zufall = Math.random, id } = {}) {
    this.paket = paket; this.modell = modell; this.art = art; this.uhr = uhr; this.zufall = zufall;
    this.id = id || uhr().getTime().toString(36) + Math.floor(zufall() * 1e6).toString(36);
    this.start = uhr();
    this.kompetenzVon = new Map(paket.lernziele.map(l => [l.id, l.kompetenz]));
    this.pos = 0;              // gezeigte Schritte
    this.aufgabenZahl = 0;     // gezeigte Aufgaben (ohne Beispiele)
    this.ergebnisse = [];      // erste Antworten, für Pausenhinweis
    this.protokoll = [];       // Antwortdaten (später fürs Backend)
    this.xp = 0;
    this.nachPause = false; this.pauseHinweisNach = null; this.beendet = false; this.aktuell = null;
    this.nochmalsGeplant = new Set();
    this.gruppenInSitzung = new Map(); // Lernziel → benutzte Variantengruppen
    this.offen = this.plane(freigabe);
    // geschätzte Zahl Aufgaben: fällige + pro neuem Lernziel zwei (mit Hilfe, ohne Hilfe)
    this.geplant = this.offen.filter(s => s.phase === 'faellig').length + 2 * this.offen.filter(s => s.phase === 'beispiel').length;
  }

  plane(freigabe) {
    const jetzt = this.uhr();
    const lz = freigegebeneLernziele(this.paket, freigabe);
    const offen = [];
    let platz = Infinity, maxNeu = E.zusatzMaxNeueLernziele;
    if (this.art === 'block') {
      const faellig = lz.filter(l => istFaellig(this.modell, l.id, jetzt))
        .sort((a, b) => abrufWahrscheinlichkeit(this.modell, a.id, jetzt) - abrufWahrscheinlichkeit(this.modell, b.id, jetzt))
        .slice(0, E.blockMaxAufgaben);
      for (const l of verzahne(faellig, l => l.kompetenz)) offen.push({ lernziel: l.id, phase: 'faellig', bereitAb: 0 });
      platz = E.blockMaxAufgaben - offen.length;
      maxNeu = E.blockMaxNeueLernziele;
    }
    const neu = lz.filter(l => istNeu(this.modell, l.id)).slice(0, Math.min(maxNeu, Math.floor(platz / 2)));
    const versatz = offen.length ? 1 : 0; // mit Abrufen beginnen, nicht mit Text
    neu.forEach((l, k) => {
      offen.push({ lernziel: l.id, phase: 'beispiel', bereitAb: versatz + k * 3, folgt: 'mitHilfe' });
    });
    if (this.art === 'zusatz') {
      // Simulationen mit Frage: bevorzugt Lernziele, die das Kind schon kennt, sonst die neuen dieser Runde
      const mitSim = new Set(this.paket.aufgaben.filter(a => a.simulation && a.pruefstatus === 'geprueft').map(a => a.lernziel));
      const kandidaten = lz.filter(l => mitSim.has(l.id));
      const bekannt = kandidaten.filter(l => !istNeu(this.modell, l.id));
      const auswahl = [...mischen(bekannt, this.zufall), ...kandidaten.filter(l => neu.includes(l))].slice(0, E.zusatzMaxSimulationen);
      auswahl.forEach((l, k) => offen.push({ lernziel: l.id, phase: 'simulation', bereitAb: neu.includes(l) ? 99 : 1 + k * 2 }));
    }
    return offen;
  }

  get fertig() { return this.beendet || !this.offen.some(s => s.bereitAb !== null); }

  // Nächster Schritt oder null (Sitzung zu Ende)
  naechster() {
    if (this.beendet) return null;
    if (this.art === 'block' && (this.aufgabenZahl >= E.blockMaxAufgaben || (this.uhr() - this.start) > E.blockMaxMinuten * 60000)) {
      this.beendet = true; return null;
    }
    const bereit = this.offen.filter(s => s.bereitAb !== null);
    if (!bereit.length) { this.beendet = true; return null; }
    const jetztBereit = bereit.filter(s => s.bereitAb <= this.pos);
    const kandidaten = jetztBereit.length ? jetztBereit : [bereit.reduce((a, b) => (b.bereitAb < a.bereitAb ? b : a))];
    // Vorrang: andere Kompetenz als zuletzt (Interleaving), darin Fading-/Nochmals-Schritte vor fälligen
    const letzte = this.aktuell && this.aktuell.schritt;
    const istAnders = s => !letzte || (s.lernziel !== letzte.lernziel && this.kompetenzVon.get(s.lernziel) !== this.kompetenzVon.get(letzte.lernziel));
    const zeitkritisch = s => s.phase !== 'faellig';
    const nachBereit = (a, b) => a.bereitAb - b.bereitAb;
    const schritt = [
      kandidaten.filter(s => istAnders(s) && zeitkritisch(s)).sort(nachBereit),
      kandidaten.filter(s => istAnders(s) && !zeitkritisch(s)),
      kandidaten.filter(zeitkritisch).sort(nachBereit),
      kandidaten
    ].find(l => l.length)[0];
    this.offen.splice(this.offen.indexOf(schritt), 1);

    const benutzt = this.gruppenInSitzung.get(schritt.lernziel) || [];
    const e = eintrag(this.modell, schritt.lernziel);
    const ohneGruppen = [...benutzt, ...(e && e.letzteGruppe ? [e.letzteGruppe] : [])];
    const aufgabe = waehleAufgabe(this.paket, schritt.lernziel, this.modell.niveau, { ohneGruppen, zufall: this.zufall, simulation: schritt.phase === 'simulation' });
    this.gruppenInSitzung.set(schritt.lernziel, [...benutzt, aufgabe.variantengruppe]);
    const abruf = schritt.phase === 'faellig' || schritt.phase === 'neu';
    this.aktuell = {
      schritt, aufgabe, instanz: instanz(aufgabe, this.zufall), seit: this.uhr(),
      lernziel: this.paket.lernziele.find(l => l.id === schritt.lernziel),
      zeigeHilfe: schritt.phase === 'mitHilfe',
      fragSicherheit: abruf && this.zufall() < E.anteilSicherheitsfrage
    };
    this.pos++;
    if (schritt.phase !== 'beispiel') this.aufgabenZahl++;
    return this.aktuell;
  }

  // Nach einem Beispiel (keine Antwort)
  weiter() {
    const s = this.aktuell.schritt;
    if (s.phase === 'beispiel') this.offen.push({ lernziel: s.lernziel, phase: 'mitHilfe', bereitAb: this.pos + E.abstandFading });
  }

  // Antwort auf den aktuellen Schritt. Gibt die Bewertung plus Zusatzinfos zurück.
  antworte(antwort, sicherheit = null) {
    const a = this.aktuell;
    const b = bewerte(a.instanz, antwort);
    if (!b.gueltig) return b;
    const s = a.schritt, jetzt = this.uhr();
    const zaehltFuerPlaner = s.phase === 'faellig' || s.phase === 'neu';
    this.modell = verbuche(this.modell, s.lernziel, { punkte: b.punkte, sicherheit, nachPause: this.nachPause, zaehltFuerPlaner }, jetzt);
    const e = this.modell.lernziele[s.lernziel];
    this.modell.lernziele[s.lernziel] = { ...e, letzteGruppe: a.aufgabe.variantengruppe };

    // Fading weiterführen
    if (s.phase === 'mitHilfe') this.offen.push({ lernziel: s.lernziel, phase: 'neu', bereitAb: this.pos + E.abstandFading });
    // Falsch: später nochmals, andere Variante. Höchstens einmal pro Lernziel und Sitzung.
    if (!b.richtig && s.phase !== 'nochmals' && s.phase !== 'mitHilfe' && !this.nochmalsGeplant.has(s.lernziel)) {
      this.nochmalsGeplant.add(s.lernziel);
      this.offen.push({ lernziel: s.lernziel, phase: 'nochmals', bereitAb: this.pos + E.abstandNachFehler });
    }

    const xp = b.richtig ? (E.xp[s.phase] ?? 0) : 0;
    this.xp += xp;
    this.protokoll.push({
      sitzung: this.id, aufgabe: a.aufgabe.id, lernziel: s.lernziel, variantengruppe: a.aufgabe.variantengruppe,
      typ: a.instanz.typ, phase: s.phase, richtig: b.richtig, punkte: b.punkte,
      gewaehlt: typeof b.gewaehlt === 'number' ? b.gewaehlt : JSON.stringify(b.gewaehlt ?? null).slice(0, 200),
      sicherheit, nachPause: this.nachPause, zeit: jetzt.toISOString(), dauerMs: jetzt - a.seit
    });

    let pauseHinweis = false;
    if (s.phase !== 'mitHilfe') {
      this.ergebnisse.push(b.richtig);
      if (this.pauseHinweisNach === null && pauseNoetig(this.ergebnisse)) { this.pauseHinweisNach = this.ergebnisse.length; pauseHinweis = true; }
    }
    return { ...b, xp, fehlvorstellung: !b.richtig && sicherheit === 'sicher', pauseHinweis };
  }

  // Das Kind entscheidet nach dem Pausenhinweis selbst
  nachPausenhinweis(aufhoeren) {
    if (aufhoeren) { this.beendet = true; this.abgebrochenNachPause = true; } else this.nachPause = true;
  }

  // Abschluss: XP für den Block, Zusammenfassung
  abschliessen() {
    this.beendet = true;
    const richtig = this.ergebnisse.filter(Boolean).length;
    const blockXp = this.art === 'block' && this.aufgabenZahl > 0 ? E.xp.blockFertig : 0;
    this.xp += blockXp;
    return {
      id: this.id, art: this.art, start: this.start.toISOString(), ende: this.uhr().toISOString(),
      aufgaben: this.aufgabenZahl, abrufe: this.ergebnisse.length, richtig, xp: this.xp, blockXp,
      pauseHinweisNach: this.pauseHinweisNach, abgebrochenNachPause: !!this.abgebrochenNachPause
    };
  }
}

// Fehlerquote der letzten N Aufgaben deutlich über dem eigenen bisherigen Schnitt in dieser Sitzung
export function pauseNoetig(ergebnisse) {
  const n = ergebnisse.length, f = E.pauseFenster;
  if (n < E.pauseMinAufgaben) return false;
  const zuletzt = ergebnisse.slice(-f), vorher = ergebnisse.slice(0, -f);
  const qZuletzt = zuletzt.filter(x => !x).length / f;
  const qVorher = vorher.filter(x => !x).length / vorher.length;
  return qZuletzt >= E.pauseMinQuote && qZuletzt - qVorher >= E.pauseUeberSchnitt;
}
