// Oberfläche für Schülerinnen und Schüler: Wiederholungsblock am Lektionsbeginn.
// Mit Backend: Anmeldung mit Lerncode, Lernstand auf dem Server. Ohne Backend: Profile nur auf diesem Gerät.

import {
  EINSTELLUNGEN as E, Sitzung, status, zaehleFaellige, freigegebeneLernziele, istNeu,
  aktualisiereSerie, zieheBonus, stufe, fortschrittStufe
} from '../motor/index.js';
import * as K from './konto.js';
import { rpc, backendAktiv } from './backend.js';
import { ergaenze, ladeErgaenzung } from '../pakete/ergaenze.js';
import { KATALOG } from '../pakete/katalog.js';

const PAKETE = [...KATALOG, { id: 'demo-formate', titel: 'Demo: alle Aufgabenformate', kapitel: 'Demo', datei: './demo-formate.js', versteckt: true }];
const SYNC_ALLE = 5; // nach so vielen Antworten im Hintergrund speichern
const PHASE = { faellig: 'Wiederholen', beispiel: 'Neu · Beispiel', mitHilfe: 'Neu · mit Hilfe', neu: 'Neu · ohne Hilfe', nochmals: 'Nochmals, andere Variante', simulation: 'Simulation' };
const STATUS = { neu: 'neu', wackelt: 'wackelt', sitzt: 'sitzt' };

const $app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Speicher ---------- */
const PAKET_KEY = 'lernmotor.paket';
let paket = null, daten = null, sitzung = null, ui = {}, wertung = null, syncFehler = null;

function speichern() { K.speichereDaten(paket.id, daten); K.aktivitaet(); }

async function sync() {
  try { await K.synchronisiere(paket, daten); syncFehler = null; }
  catch (e) { syncFehler = e.message; }
}

// Freigegebene Ergänzungen (von der Lehrperson im Dashboard geprüft). Offline: letzter bekannter Stand.
const FREIGABEN_KEY = 'lernmotor.freigaben.v1';
async function ladeFreigaben() {
  let f = null;
  try { f = JSON.parse(localStorage.getItem(FREIGABEN_KEY) || 'null'); } catch (e) { /* ohne Speicher */ }
  if (backendAktiv()) {
    try { f = await rpc('lm_freigaben'); localStorage.setItem(FREIGABEN_KEY, JSON.stringify(f)); } catch (e) { /* offline: Cache */ }
  }
  return f || {};
}

async function ladePaket(id) {
  const eintrag = PAKETE.find(p => p.id === id) || PAKETE[0];
  const roh = (await import('../pakete/' + eintrag.datei.replace('./', ''))).default;
  paket = ergaenze(roh, await ladeErgaenzung(roh.id), { freigaben: await ladeFreigaben() });
  daten = K.ladeDaten(paket.id);
  try { localStorage.setItem(PAKET_KEY, paket.id); } catch (e) { /* ohne Speicher */ }
  // Freigabe per Adresse, z. B. ?paket=leistung&freigabe=s1,s2 (Lehrperson gibt den Link weiter)
  const q = new URLSearchParams(location.search);
  if (q.get('freigabe')) daten.freigabe = q.get('freigabe').split(',').map(s => `${paket.id}.${s.trim()}`).filter(id => paket.kompetenzen.some(k => k.id === id));
  speichern();
}

/* ---------- Bausteine ---------- */
const kontoChip = () => K.konto ? `<div style="display:flex;align-items:center;gap:8px"><span class="small" style="color:var(--header-muted)">${esc(K.konto.pseudonym)}</span><button class="btn sm" data-act="abmelden">${K.konto.modus === 'schule' ? 'Abmelden' : 'Wechseln'}</button></div>` : '';
const kopf = (titel, lead, extra = '') => `<header class="top"><div class="toprow"><div class="logochip"><img src="logo.png" alt="Sekundarschule Halingen"></div>${extra}</div>
  <h1>${titel}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</header>`;
const fuss = () => `<footer class="foot"><div class="logochip"><img src="logo.png" alt="Sekundarschule Halingen"></div>
  <p class="small">Lern-Motor · Autor: Alexander Weng · Sekundarschule Halingen</p>
  <p class="small">${(K.konto ? K.konto.modus === 'schule' : K.backendAktiv())
    ? 'Gespeichert wird nur dein Pseudonym, deine Klasse und deine Antworten, kein Name. Die Lehrperson sieht nur Klassensummen.'
    : 'Dein Lernstand wird nur auf diesem Gerät im Browser gespeichert.'}</p></footer>`;

function stufeHtml() {
  return `<div class="row"><span class="small">Stufe ${stufe(daten.xp)} · ${daten.xp} XP</span><span class="small">Serie ${daten.serie.wert} ${daten.serie.wert === 1 ? 'Übungstag' : 'Übungstage'}</span></div>
    <div class="xpbar light"><div style="width:${Math.round(fortschrittStufe(daten.xp) * 100)}%"></div></div>`;
}

/* ---------- Startseite ---------- */
function startHtml() {
  const jetzt = new Date();
  const lz = freigegebeneLernziele(paket, daten.freigabe);
  const faellig = zaehleFaellige(paket, daten.modell, { jetzt, freigabe: daten.freigabe });
  const neu = lz.filter(l => istNeu(daten.modell, l.id)).length;
  const zaehl = { neu: 0, wackelt: 0, sitzt: 0 };
  lz.forEach(l => zaehl[status(daten.modell, l.id, jetzt)]++);
  const block = faellig || neu
    ? `<div class="kpis"><div><b>${faellig}</b><span class="small">fällig</span></div><div><b>${neu}</b><span class="small">neu</span></div><div><b>${daten.serie.wert}</b><span class="small">Serie</span></div></div>
       <p style="margin:var(--space-3) 0">${faellig ? 'Zuerst kommen die fälligen Lernziele, danach höchstens ' + E.blockMaxNeueLernziele + ' neue.' : 'Heute ist nichts fällig. Du lernst ' + Math.min(neu, E.blockMaxNeueLernziele) + ' neue Lernziele kennen.'}</p>
       <button class="btn btn-primary block" data-act="block">Wiederholungsblock starten</button>
       <p class="small">Höchstens ${E.blockMaxAufgaben} Aufgaben oder ca. ${E.blockMaxMinuten} Minuten. Kürzer ist auch gut.</p>`
    : `<p><b>Alles erledigt.</b> Heute ist nichts fällig. Die Lernziele kommen von selbst zurück, wenn sie zu verblassen drohen.</p>`;
  const proKompetenz = paket.kompetenzen.map(k => {
    const ls = lz.filter(l => l.kompetenz === k.id);
    if (!ls.length) return '';
    const z = { neu: 0, wackelt: 0, sitzt: 0 };
    const li = ls.map(l => { const s = status(daten.modell, l.id, jetzt); z[s]++; return `<li><span>${esc(l.titel)}</span><span class="chip ${s}">${STATUS[s]}</span></li>`; }).join('');
    const p = n => (100 * n / ls.length).toFixed(1) + '%';
    return `<details class="card"><summary><span>${esc(k.titel)}</span><span class="small mono">${z.sitzt}/${ls.length} sitzt</span></summary>
      <div class="tri3" aria-hidden="true"><span class="s" style="width:${p(z.sitzt)}"></span><span class="w" style="width:${p(z.wackelt)}"></span><span class="n" style="width:${p(z.neu)}"></span></div>
      <ul class="lzlist">${li}</ul></details>`;
  }).join('');
  const optionen = PAKETE.filter(p => !p.versteckt || p.id === paket.id).map(p => `<option value="${p.id}" ${p.id === paket.id ? 'selected' : ''}>${esc(p.titel)} (${esc(p.kapitel)})</option>`).join('');
  const freigabe = paket.kompetenzen.map(k => `<label><input type="checkbox" data-act="freigabe" value="${k.id}" ${!daten.freigabe.length || daten.freigabe.includes(k.id) ? 'checked' : ''}> ${esc(k.titel)}</label>`).join('');
  const bonus = daten.bonus.length ? `<p class="small">Bonus-Trophäen: ${daten.bonus.map(b => `<span title="${esc(b.name)}">${b.icon}</span>`).join(' ')}</p>` : '';
  const wertungHtml = wertung && wertung.length ? `<section class="card"><div class="tag">Klassenduell diese Woche</div>
      <p class="small">Gewertet wird, welcher Anteil der Klasse den Wiederholungsblock gemacht hat.</p>
      <ol class="lzlist">${wertung.slice(0, 8).map(w => `<li${w.eigene ? ' style="font-weight:800"' : ''}><span>${esc(w.team)}${w.eigene ? ' (deine Klasse)' : ''}</span><span class="mono">${Math.round((w.anteil || 0) * 100)} %</span></li>`).join('')}</ol></section>` : '';
  const syncHtml = syncFehler ? `<div class="fb warn"><div class="fbb">Noch nicht gespeichert: ${esc(syncFehler)} Das wird nachgeholt.</div></div>` : '';
  return `${kopf('Wiederholungsblock', esc(paket.titel), kontoChip())}
  <main class="wrap"><div class="stack-v">
    ${syncHtml}<section class="card">${stufeHtml()}${block}</section>
    ${wertungHtml}
    <section class="card"><div class="tag">Dein Lernstand</div>
      <div class="kpis" style="margin-top:var(--space-3)"><div><b>${zaehl.sitzt}</b><span class="small">sitzt</span></div><div><b>${zaehl.wackelt}</b><span class="small">wackelt</span></div><div><b>${zaehl.neu}</b><span class="small">neu</span></div></div>${bonus}</section>
    ${proKompetenz}
    <details class="card einst"><summary><span>Einstellungen</span><span class="small">Thema, Freigabe, Daten</span></summary>
      <label>Thema <select data-act="paket">${optionen}</select></label>
      <p class="small" style="margin-top:var(--space-3)">Im Unterricht schon behandelt (nur diese Teile kommen dran):</p>${freigabe}
      <div class="btnrow" style="margin-top:var(--space-3)">${ui.loeschen ? '<button class="btn sm" data-act="loeschenJa">Ja, alles löschen</button><button class="btn sm" data-act="loeschenNein">Abbrechen</button>' : '<button class="btn sm" data-act="loeschen">Meine Daten löschen</button>'}</div>
    </details>
    ${fuss()}
  </div></main>`;
}

/* ---------- Aufgaben ---------- */
function eingabeHtml(a, gesperrt) {
  const i = a.instanz, d = gesperrt ? 'disabled' : '';
  switch (i.typ) {
    case 'mc': return `<div class="opts">${i.optionen.map((o, k) => {
      let cls = '';
      if (ui.auswahl === o.nr) cls += ' gewaehlt';
      if (ui.ergebnis) cls += o.richtig ? ' ok' : ui.auswahl === o.nr ? ' no' : '';
      return `<button class="opt${cls}" data-act="mc" data-nr="${o.nr}" ${d}><span class="ltr">${'ABCDEF'[k]}</span><span>${o.text}</span></button>`;
    }).join('')}</div>`;
    case 'zahl': return `<form class="ansrow" data-act="form"><input id="ein" class="numin" inputmode="decimal" autocomplete="off" aria-label="Antwort" value="${esc(ui.eingabe || '')}" ${d}>${i.einheit && !i.einheitPruefen ? `<span class="unitl mono" style="align-self:center">${esc(i.einheit)}</span>` : ''}<button class="btn btn-primary" ${d}>Prüfen</button></form>`;
    case 'luecke': {
      let k = 0;
      const t = i.text.replace(/___/g, () => `<input class="txtin" style="width:auto;min-width:8em" data-luecke="${k}" value="${esc((ui.eingabe || [])[k++] || '')}" aria-label="Lücke ${k}" ${d}>`);
      return `<p class="lbody">${t}</p><button class="btn btn-primary block" data-act="pruefen" ${d}>Prüfen</button>`;
    }
    case 'zuordnen': return i.paare.map((p, k) => `<div class="zrow"><span>${p[0]}</span><select class="txtin" data-zuordnung="${k}" ${d}><option value="">wählen …</option>${i.rechtsGemischt.map(r => `<option ${(ui.eingabe || [])[k] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select></div>`).join('') + `<button class="btn btn-primary block" data-act="pruefen" ${d}>Prüfen</button>`;
    case 'reihenfolge': {
      const f = ui.eingabe || i.gemischt;
      ui.eingabe = f;
      return f.map((e, k) => `<div class="rrow"><span>${e}</span><button class="btn sm" data-act="hoch" data-k="${k}" ${d || (k === 0 ? 'disabled' : '')} aria-label="nach oben">↑</button><button class="btn sm" data-act="runter" data-k="${k}" ${d || (k === f.length - 1 ? 'disabled' : '')} aria-label="nach unten">↓</button></div>`).join('') + `<button class="btn btn-primary block" data-act="pruefen" ${d}>Prüfen</button>`;
    }
    case 'erklaeren':
      if (!ui.musterGezeigt) return `<textarea id="ein" class="txtin" aria-label="Deine Erklärung">${esc(ui.eingabe || '')}</textarea><button class="btn btn-primary block" data-act="muster">Mit Musterantwort vergleichen</button>`;
      return `<p class="small">Deine Erklärung:</p><p>${esc(ui.eingabe || '–')}</p><div class="hilfe"><b>Musterantwort</b><br>${i.musterantwort}</div>
        <p><b>Wie gut passt deine Erklärung?</b></p><div class="sicher"><button class="btn" data-act="selbst" data-v="passt" ${d}>passt</button><button class="btn" data-act="selbst" data-v="teilweise" ${d}>teilweise</button><button class="btn" data-act="selbst" data-v="fehlt" ${d}>fehlt</button></div>`;
    default: return '<p>Dieser Aufgabentyp wird noch nicht angezeigt.</p>';
  }
}

// Simulationen aus Naturalia. Pro Bildschirm läuft genau eine (sie nutzen feste Element-IDs).
function simHtml(lz, id) {
  const sims = lz.simulationen || [];
  const s = sims.find(x => x.id === id) || sims[0];
  if (!s) return '';
  const knoepfe = sims.length > 1 ? `<div class="btnrow" role="group" aria-label="Simulation wählen">${sims.map(x => `<button class="btn sm${x.id === s.id ? ' btn-primary' : ''}" data-act="simWahl" data-sim="${x.id}">${esc(x.titel)}</button>`).join('')}</div>` : '';
  return `<div class="simbox"><div class="tag">Simulation: ${esc(s.titel)}</div>${s.html ? `<div class="lbody">${s.html}</div>` : ''}${knoepfe}<div class="simhost" data-sim="${s.id}"></div></div>`;
}

function beispielHtml(a) {
  const k = a.lernziel.lernkarte, i = a.instanz;
  const worked = k && k.beispiel ? `<div class="worked"><div class="wgiven">${k.beispiel.given}</div><ol class="wsteps">${k.beispiel.steps.map(s => `<li><div><b>${s[0]}</b><br>${s[1]}</div></li>`).join('')}</ol></div>` : '';
  const loes = i.typ === 'mc' ? `<p><b>Richtig:</b> ${i.optionen.find(o => o.richtig).text}</p>` : i.typ === 'zahl' ? '' : `<p><b>Lösung:</b> ${esc(i.musterantwort || '')}</p>`;
  return `<div class="tag">Neu: ${esc(a.lernziel.titel)}</div>
    ${k && k.html ? `<div class="lbody">${k.html}</div>` : ''}${worked}
    <div class="worked"><div class="wgiven"><b>Vorgerechnet:</b> ${i.text}</div>${loes}<div class="lbody">${i.erklaerung || ''}</div></div>
    ${simHtml(a.lernziel, ui.simWahl)}
    <p class="small">Lies das Beispiel genau. Gleich kommt eine ähnliche Aufgabe.</p>
    <button class="btn btn-primary block" data-act="weiter">Verstanden, weiter</button>`;
}

function hilfeHtml(a) {
  const i = a.instanz, k = a.lernziel.lernkarte;
  const inhalt = i.hilfe ? `<b>Tipp:</b> ${i.hilfe}` : k && k.html ? k.html : '';
  return inhalt ? `<div class="hilfe">${inhalt}</div>` : '';
}

function rundeHtml() {
  const a = sitzung.aktuell;
  const n = sitzung.aufgabenZahl, gesamt = Math.max(n, Math.min(sitzung.art === 'block' ? E.blockMaxAufgaben : 99, sitzung.geplant));
  const balken = `<div class="xpbar light"><div style="width:${Math.round(100 * n / Math.max(1, gesamt))}%"></div></div>`;
  const oben = `<div class="row"><span class="tag">${PHASE[a.schritt.phase]}</span><span class="small mono">${n} / ${gesamt}</span></div>${balken}`;
  let inhalt;
  if (ui.pause) {
    inhalt = `<section class="card pausecard"><p><b>Kurze Pause?</b></p><p>Die letzten Aufgaben gingen deutlich schwerer als vorher in dieser Runde. Das ist normal, wenn der Kopf müde wird. Eine Pause bringt jetzt wahrscheinlich mehr als weiterüben.</p>
      <div class="btnrow"><button class="btn btn-primary" data-act="pauseJa">Pause machen</button><button class="btn" data-act="pauseNein">Weitermachen</button></div></section>`;
  } else if (a.schritt.phase === 'beispiel') {
    inhalt = `<section class="card">${beispielHtml(a)}</section>`;
  } else {
    const fertig = !!ui.ergebnis;
    const sicherheit = ui.frageSicherheit && !fertig
      ? `<div class="hilfe"><p><b>Wie sicher bist du?</b></p><div class="sicher"><button class="btn" data-act="sicher" data-v="sicher">sicher</button><button class="btn" data-act="sicher" data-v="unsicher">unsicher</button><button class="btn" data-act="sicher" data-v="geraten">geraten</button></div></div>` : '';
    const fb = ui.warnung ? `<div class="fb warn"><div class="fbb">${esc(ui.warnung)}</div></div>` : '';
    const erg = fertig ? `<div class="fb ${ui.ergebnis.richtig ? 'good' : ui.ergebnis.punkte > 0 ? 'warn' : 'bad'}">
        <div class="fbt">${ui.ergebnis.richtig ? 'Richtig.' : ui.ergebnis.punkte > 0 ? 'Teilweise richtig.' : 'Nicht ganz.'}${ui.ergebnis.xp ? ` <span class="mono">+${ui.ergebnis.xp} XP</span>` : ''}</div>
        <div class="fbb">${ui.ergebnis.richtig ? '' : `Richtig wäre: <b>${ui.ergebnis.loesung}</b><br>`}${ui.ergebnis.erklaerung || ''}${!ui.ergebnis.richtig ? '<br><br>Dieses Lernziel kommt bald nochmals, in anderer Form.' : ''}</div></div>
        <button class="btn btn-primary block" data-act="weiter" id="weiterBtn">Weiter</button>` : '';
    const simZuerst = a.aufgabe.simulation ? simHtml({ simulationen: (a.lernziel.simulationen || []).filter(x => x.id === a.aufgabe.simulation) }) : '';
    inhalt = `<section class="card"><p class="small">${esc(a.lernziel.titel)}</p>${simZuerst}<div class="q">${a.instanz.text}</div>
      ${a.zeigeHilfe ? hilfeHtml(a) : ''}${eingabeHtml(a, fertig || ui.frageSicherheit)}${sicherheit}${fb}${erg}</section>`;
  }
  return `${kopf(sitzung.art === 'block' ? 'Wiederholungsblock' : 'Zusatzblock', '', `<button class="btn sm" data-act="ende">Beenden</button>`)}
    <main class="wrap"><div class="stack-v">${oben}${inhalt}</div></main>`;
}

function endeHtml() {
  const z = ui.zusammenfassung;
  const jetzt = new Date();
  const neuUebrig = freigegebeneLernziele(paket, daten.freigabe).filter(l => istNeu(daten.modell, l.id)).length
    + paket.aufgaben.filter(x => x.simulation && x.pruefstatus === 'geprueft').length;
  const titel = z.art === 'block' ? (z.abgebrochenNachPause ? 'Gute Entscheidung: Pause.' : 'Block abgeschlossen.') : 'Zusatzblock fertig.';
  return `${kopf(titel, '')}
  <main class="wrap"><div class="stack-v">
    <section class="card"><p class="bignum">+${z.xp} XP</p>
      <p>${z.abrufe ? `${z.richtig} von ${z.abrufe} Abrufen richtig.` : 'Heute nur Beispiele angeschaut.'}${z.blockXp ? ` Dazu ${z.blockXp} XP für den abgeschlossenen Block.` : ''}</p>
      ${stufeHtml()}</section>
    ${ui.bonus ? `<section class="card"><div class="bonus">${ui.bonus.icon}</div><p><b>Bonus-Trophäe: ${esc(ui.bonus.name)}</b></p><p class="small">Bonus-Trophäen kommen ab und zu, einfach so.</p></section>` : ''}
    <section class="card"><div class="tag">Fällig beim nächsten Mal</div><p>${zaehleFaellige(paket, daten.modell, { jetzt: new Date(+jetzt + 86400000), freigabe: daten.freigabe })} Lernziele bis morgen.</p></section>
    ${neuUebrig && !ui.speichert ? `<section class="card"><p><b>Noch Lust?</b> Der Zusatzblock bringt Neues und Simulationen. Freiwillig.</p><button class="btn block" data-act="zusatz">Zusatzblock starten</button></section>` : ''}
    ${ui.speichert ? '<p class="small">Wird gespeichert …</p>' : syncFehler ? `<div class="fb warn"><div class="fbb">Noch nicht gespeichert: ${esc(syncFehler)}</div></div>` : K.konto.modus === 'schule' ? '<p class="small">Gespeichert.</p>' : ''}
    ${K.konto.geteilt
      ? `<button class="btn btn-primary block" data-act="abmelden" ${ui.speichert ? 'disabled' : ''}>Fertig und abmelden</button><p class="small">Gemeinsames Gerät: Melde dich ab, damit das nächste Kind mit seinem eigenen Lernstand übt.</p><button class="btn block" data-act="start">Zur Übersicht</button>`
      : '<button class="btn btn-primary block" data-act="start">Zur Übersicht</button>'}
    ${fuss()}
  </div></main>`;
}

function render() {
  const laufend = $app.querySelector('.simhost[data-sim]');
  $app.innerHTML = !K.konto ? anmeldeHtml() : ui.seite === 'runde' ? rundeHtml() : ui.seite === 'ende' ? endeHtml() : startHtml();
  starteSimulation(laufend);
  const f = document.getElementById('ein') || document.querySelector('[data-luecke]');
  if (f && !f.disabled) f.focus({ preventScroll: true });
  const w = document.getElementById('weiterBtn');
  if (w) w.focus({ preventScroll: true });
}

// Läuft dieselbe Simulation schon, wird sie übernommen (Regler bleiben stehen), sonst neu gestartet
function starteSimulation(laufend) {
  const host = $app.querySelector('.simhost[data-sim]');
  if (!host || !paket || !paket.simulationen) return;
  const id = host.dataset.sim;
  if (laufend && laufend.dataset.sim === id && laufend.dataset.schritt === String(ui.simSchritt)) { host.replaceWith(laufend); return; }
  host.dataset.schritt = String(ui.simSchritt);
  try { paket.simulationen[id](host); } catch (e) { host.innerHTML = '<p class="small">Die Simulation konnte nicht gestartet werden.</p>'; }
}

/* ---------- Ablauf ---------- */
function starteSitzung(art) {
  sitzung = new Sitzung(paket, daten.modell, { art, freigabe: daten.freigabe });
  ui = { seite: 'runde' };
  naechste();
}

function naechste() {
  const a = sitzung.naechster();
  if (!a) return beende();
  ui = { seite: 'runde', frageSicherheit: false, sicherheitNoetig: a.fragSicherheit, simSchritt: sitzung.pos };
  render(); scrollTo(0, 0);
}

function sammleEingabe() {
  const i = sitzung.aktuell.instanz;
  if (i.typ === 'zahl' || i.typ === 'erklaeren') { const el = document.getElementById('ein'); return el ? el.value : ui.eingabe; }
  if (i.typ === 'luecke') return [...document.querySelectorAll('[data-luecke]')].map(x => x.value);
  if (i.typ === 'zuordnen') return [...document.querySelectorAll('[data-zuordnung]')].map(x => x.value);
  return ui.eingabe;
}

// Antwort steht fest → evtl. zuerst Sicherheit abfragen → dann bewerten
function antwortFest(antwort) {
  ui.antwort = antwort;
  if (ui.sicherheitNoetig && !ui.sicherheit) {
    // Probe, ob die Eingabe auswertbar ist, bevor die Sicherheit abgefragt wird
    if (sitzung.aktuell.instanz.typ === 'zahl' && !/\d/.test(String(antwort))) { ui.warnung = 'Gib eine Zahl ein, zum Beispiel 120 oder 2,5.'; return render(); }
    ui.frageSicherheit = true; ui.warnung = null; return render();
  }
  werte();
}

function werte() {
  const r = sitzung.antworte(ui.antwort, ui.sicherheit || null);
  if (!r.gueltig) { ui.warnung = r.hinweis || 'Bitte gib eine Antwort ein.'; ui.frageSicherheit = false; ui.sicherheit = null; return render(); }
  ui.ergebnis = r; ui.frageSicherheit = false; ui.warnung = null;
  daten.modell = sitzung.modell;
  daten.ausstehend.antworten.push(sitzung.protokoll[sitzung.protokoll.length - 1]);
  daten.xp += r.xp;
  ui.pauseFolgt = r.pauseHinweis;
  speichern();
  if (daten.ausstehend.antworten.length >= SYNC_ALLE) sync();
  render();
}

async function beende() {
  const z = sitzung.abschliessen();
  daten.xp += z.blockXp;
  if (z.abrufe) daten.serie = aktualisiereSerie(daten.serie, new Date());
  const bonus = zieheBonus(z);
  if (bonus) daten.bonus = [...daten.bonus, { ...bonus, am: z.ende }].slice(-30);
  daten.modell = sitzung.modell;
  daten.sitzungen = [...daten.sitzungen, z].slice(-200);
  daten.ausstehend.sitzungen.push(z);
  speichern();
  ui = { seite: 'ende', zusammenfassung: z, bonus, speichert: K.konto.modus === 'schule' };
  sitzung = null;
  render(); scrollTo(0, 0);
  if (K.konto.modus === 'schule') { await sync(); ui.speichert = false; render(); }
}

$app.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b || b.disabled) return;
  const act = b.dataset.act;
  if (act === 'block') starteSitzung('block');
  else if (act === 'zusatz') starteSitzung('zusatz');
  else if (act === 'start') { ui = {}; render(); ladeWertung(); }
  else if (act === 'abmelden') abmelden(false);
  else if (act === 'abmeldenTrotzdem') abmelden(true);
  else if (act === 'anmelden') anmeldenKlick();
  else if (act === 'registrieren') registrierenKlick();
  else if (act === 'codeNotiert') anmeldenMitCode(ui.neu.lerncode, true);
  else if (act === 'zeigeNeu') { ui = { seite: 'login', neuForm: true }; render(); }
  else if (act === 'zeigeLogin') { ui = { seite: 'login' }; render(); }
  else if (act === 'lokal') { ui = { seite: 'login', lokal: true }; render(); }
  else if (act === 'profil') { K.lokalWaehlen(K.lokaleProfile().find(p => p.id === b.dataset.id)); oeffne(); }
  else if (act === 'profilNeu') { const n = document.getElementById('pname').value; if (n.trim()) { K.lokalWaehlen(K.lokalesProfilNeu(n)); oeffne(); } }
  else if (act === 'mc') { ui.auswahl = +b.dataset.nr; antwortFest(+b.dataset.nr); }
  else if (act === 'pruefen') { ui.eingabe = sammleEingabe(); antwortFest(ui.eingabe); }
  else if (act === 'muster') { ui.eingabe = sammleEingabe(); ui.musterGezeigt = true; render(); }
  else if (act === 'selbst') antwortFest(b.dataset.v);
  else if (act === 'hoch' || act === 'runter') {
    const k = +b.dataset.k, j = act === 'hoch' ? k - 1 : k + 1, f = ui.eingabe.slice();
    [f[k], f[j]] = [f[j], f[k]]; ui.eingabe = f; render();
  }
  else if (act === 'sicher') { ui.sicherheit = b.dataset.v; werte(); }
  else if (act === 'weiter') {
    if (sitzung.aktuell.schritt.phase === 'beispiel') { sitzung.weiter(); return naechste(); }
    if (ui.pauseFolgt) { ui.pause = true; ui.pauseFolgt = false; return render(); }
    naechste();
  }
  else if (act === 'pauseJa') { sitzung.nachPausenhinweis(true); beende(); }
  else if (act === 'pauseNein') { sitzung.nachPausenhinweis(false); ui.pause = false; naechste(); }
  else if (act === 'ende') beende();
  else if (act === 'simWahl') { ui.simWahl = b.dataset.sim; render(); }
  else if (act === 'loeschen') { ui.loeschen = true; render(); }
  else if (act === 'loeschenNein') { ui.loeschen = false; render(); }
  else if (act === 'loeschenJa') loeschen();
});
$app.addEventListener('change', async e => {
  const t = e.target;
  if (t.dataset.act === 'paket') { await ladePaket(t.value); ui = {}; render(); }
  if (t.dataset.act === 'freigabe') {
    const an = [...document.querySelectorAll('[data-act="freigabe"]')].filter(x => x.checked).map(x => x.value);
    daten.freigabe = an.length === paket.kompetenzen.length ? [] : an;
    speichern(); render();
  }
});
$app.addEventListener('submit', e => {
  e.preventDefault();
  if (!K.konto) { if (e.target.dataset.form === 'neu') registrierenKlick(); else if (e.target.dataset.form === 'profil') document.querySelector('[data-act="profilNeu"]').click(); else anmeldenKlick(); return; }
  if (ui.ergebnis || ui.frageSicherheit) return;
  ui.eingabe = sammleEingabe(); antwortFest(ui.eingabe);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && ui.seite === 'runde' && ui.ergebnis && document.activeElement?.id !== 'weiterBtn') { e.preventDefault(); document.getElementById('weiterBtn')?.click(); }
});

async function oeffne() {
  const q = new URLSearchParams(location.search);
  let wunsch = q.get('paket');
  if (!wunsch) { try { wunsch = localStorage.getItem(PAKET_KEY); } catch (e) { /* ohne Speicher */ } }
  try { await ladePaket(wunsch || 'leistung'); }
  catch (err) { $app.innerHTML = `<main class="wrap"><p>Das Thema konnte nicht geladen werden: ${esc(err.message)}</p></main>`; return; }
  ui = {}; render();
  if (K.konto && K.konto.modus === 'schule' && (daten.ausstehend.antworten.length || daten.ausstehend.sitzungen.length)) { await sync(); render(); }
  ladeWertung();
}

async function ladeWertung() {
  try { wertung = await K.klassenwertung(); } catch (e) { wertung = null; }
  if (K.konto && !ui.seite) render();
}

/* ---------- Anmelden ---------- */
function anmeldeHtml() {
  const fehler = ui.fehler ? `<div class="fb bad"><div class="fbb">${esc(ui.fehler)}</div></div>` : '';
  const geteilt = `<label class="einst" style="display:flex;gap:8px;align-items:center;margin:var(--space-3) 0"><input type="checkbox" id="geteilt" ${ui.geteilt === false ? '' : 'checked'}> Gemeinsames Gerät (z. B. Schul-iPad): nach dem Üben abmelden</label>`;
  let inhalt;
  if (ui.neu) {
    inhalt = `<section class="card"><div class="tag">Dein Lerncode</div>
      <p class="bignum mono" style="font-size:var(--text-xl);word-break:break-word">${esc(ui.neu.lerncode)}</p>
      <p><b>Schreib diesen Code jetzt in dein Heft.</b> Mit ihm kommst du auf jedem Gerät an deinen Lernstand. Ohne Code geht das nicht, auch die Lehrperson kann ihn nicht nachschauen.</p>
      <p class="small">Dein Name in der App: <b>${esc(ui.neu.pseudonym)}</b> · Klasse: ${esc(ui.neu.team)}</p>
      <button class="btn btn-primary block" data-act="codeNotiert">Ich habe ihn aufgeschrieben</button></section>`;
  } else if (ui.lokal || !K.backendAktiv()) {
    const profile = K.lokaleProfile();
    inhalt = `<section class="card"><div class="tag">Wer übt?</div>
      ${profile.length ? `<div class="opts" style="margin-top:var(--space-3)">${profile.map(p => `<button class="opt" data-act="profil" data-id="${p.id}"><span>${esc(p.pseudonym)}</span></button>`).join('')}</div>` : ''}
      <form data-form="profil" class="ansrow" style="margin-top:var(--space-4)"><input id="pname" class="txtin" maxlength="30" placeholder="Spitzname (kein echter Name)" aria-label="Spitzname"><button type="button" class="btn" data-act="profilNeu">Neu</button></form>
      <p class="small">Ohne Konto bleibt der Lernstand nur auf diesem Gerät und zählt nicht für die Klasse.</p>
      ${K.backendAktiv() ? '<button class="btn sm" data-act="zeigeLogin">Zurück zur Anmeldung</button>' : ''}</section>`;
  } else if (ui.neuForm) {
    inhalt = `<section class="card"><div class="tag">Neu hier</div>
      <form data-form="neu"><p>Gib den Klassencode ein, den deine Lehrperson an die Tafel schreibt.</p>
      <input id="kcode" class="numin" style="width:100%;text-transform:uppercase" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="z. B. K7QM2" aria-label="Klassencode">
      <button class="btn btn-primary block" style="margin-top:var(--space-3)" data-act="registrieren" type="button" ${ui.laedt ? 'disabled' : ''}>Lerncode erhalten</button></form>
      ${fehler}<button class="btn sm" style="margin-top:var(--space-3)" data-act="zeigeLogin">Ich habe schon einen Lerncode</button></section>`;
  } else {
    inhalt = `<section class="card"><div class="tag">Anmelden</div>
      <form data-form="login"><p>Gib deinen Lerncode ein, z. B. <span class="mono">tiger-mond-segel-4821</span>.</p>
      <input id="lcode" class="numin" style="width:100%;font-size:var(--text-md)" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Lerncode">
      ${geteilt}
      <button class="btn btn-primary block" data-act="anmelden" type="button" ${ui.laedt ? 'disabled' : ''}>Anmelden</button></form>
      ${fehler}
      <div class="btnrow" style="margin-top:var(--space-3)"><button class="btn sm" data-act="zeigeNeu">Neu hier: Klassencode eingeben</button><button class="btn sm" data-act="lokal">Ohne Konto üben</button></div></section>`;
  }
  return `${kopf('Wiederholungsblock', 'Kurz üben, damit es sitzt.')}<main class="wrap"><div class="stack-v">${inhalt}${fuss()}</div></main>`;
}

async function anmeldenMitCode(code, geteilt) {
  ui.laedt = true; ui.fehler = null; render();
  try { await K.anmelden(code, geteilt); await oeffne(); }
  catch (e) { ui.laedt = false; ui.fehler = e.message; ui.neu = null; render(); }
}
function anmeldenKlick() {
  const code = (document.getElementById('lcode') || {}).value || '';
  const geteilt = (document.getElementById('geteilt') || {}).checked;
  if (!code.trim()) { ui.fehler = 'Gib deinen Lerncode ein.'; return render(); }
  anmeldenMitCode(code, geteilt);
}
async function registrierenKlick() {
  const kc = ((document.getElementById('kcode') || {}).value || '').trim();
  if (!kc) { ui.fehler = 'Gib den Klassencode ein.'; return render(); }
  ui.laedt = true; ui.fehler = null; render();
  try { ui.neu = await K.registrieren(kc); ui.laedt = false; render(); }
  catch (e) { ui.laedt = false; ui.fehler = e.message; render(); }
}

async function abmelden(trotzdem) {
  if (K.konto.modus === 'schule' && !trotzdem) {
    await sync();
    if (syncFehler) {
      ui = { seite: ui.seite }; render();
      $app.querySelector('main .stack-v').insertAdjacentHTML('afterbegin', `<div class="fb warn"><div class="fbb">Deine letzten Antworten sind noch nicht auf dem Server (${esc(syncFehler)}). Wenn du dich jetzt abmeldest, gehen sie verloren.</div><div class="btnrow" style="margin-top:8px"><button class="btn sm" data-act="abmeldenTrotzdem">Trotzdem abmelden</button><button class="btn sm" data-act="start">Abbrechen</button></div></div>`);
      return;
    }
  }
  await K.abmelden({ trotzdem: true });
  paket = null; daten = null; wertung = null; syncFehler = null;
  ui = { seite: 'login' }; render(); scrollTo(0, 0);
}

async function loeschen() {
  try { await K.meineDatenLoeschen(); }
  catch (e) { ui.loeschen = false; syncFehler = e.message; return render(); }
  paket = null; daten = null; wertung = null;
  ui = { seite: 'login' }; render();
}

// Gemeinsame Geräte: nach Inaktivität abmelden (auch wenn der Tab offen bleibt)
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && K.konto && K.konto.geteilt) {
    const vorher = K.konto;
    await K.pruefeAblauf();
    if (!K.konto && vorher) { paket = null; daten = null; ui = { seite: 'login' }; render(); }
  }
});

(async () => {
  await K.pruefeAblauf();
  if (!K.konto) { ui = { seite: 'login' }; render(); return; }
  await oeffne();
})();
