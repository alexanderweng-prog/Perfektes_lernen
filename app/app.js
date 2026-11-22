// Oberfläche für Schülerinnen und Schüler: Wiederholungsblock am Lektionsbeginn.
// Version 1 ohne Backend: Lernstand und Antwortdaten bleiben im Browser (localStorage).

import {
  EINSTELLUNGEN as E, Sitzung, leeresModell, status, zaehleFaellige, freigegebeneLernziele, istNeu,
  aktualisiereSerie, leereSerie, zieheBonus, stufe, fortschrittStufe
} from '../motor/index.js';
import { KATALOG } from '../pakete/katalog.js';

const PAKETE = [...KATALOG, { id: 'demo-formate', titel: 'Demo: alle Aufgabenformate', kapitel: 'Demo', datei: './demo-formate.js', versteckt: true }];
const MAX_PROTOKOLL = 3000;
const PHASE = { faellig: 'Wiederholen', beispiel: 'Neu · Beispiel', mitHilfe: 'Neu · mit Hilfe', neu: 'Neu · ohne Hilfe', nochmals: 'Nochmals, andere Variante' };
const STATUS = { neu: 'neu', wackelt: 'wackelt', sitzt: 'sitzt' };

const $app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Speicher ---------- */
const lies = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const schreib = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* privater Modus: nur im Speicher */ } };
const PROFIL_KEY = 'lernmotor.profil.v1';
const datenKey = id => 'lernmotor.v1.' + id;

let profil = lies(PROFIL_KEY) || { paket: 'leistung', xp: 0, serie: leereSerie(), bonus: [] };
let paket = null, daten = null, sitzung = null, ui = {};

function neueDaten(id) { return { modell: leeresModell(id), freigabe: [], sitzungen: [], protokoll: [] }; }
function speichern() {
  if (daten.protokoll.length > MAX_PROTOKOLL) daten.protokoll = daten.protokoll.slice(-MAX_PROTOKOLL);
  schreib(datenKey(paket.id), daten); schreib(PROFIL_KEY, profil);
}

async function ladePaket(id) {
  const eintrag = PAKETE.find(p => p.id === id) || PAKETE[0];
  paket = (await import('../pakete/' + eintrag.datei.replace('./', ''))).default;
  daten = lies(datenKey(paket.id)) || neueDaten(paket.id);
  profil.paket = paket.id;
  // Freigabe per Adresse, z. B. ?paket=leistung&freigabe=s1,s2 (Lehrperson gibt den Link weiter)
  const q = new URLSearchParams(location.search);
  if (q.get('freigabe')) daten.freigabe = q.get('freigabe').split(',').map(s => `${paket.id}.${s.trim()}`).filter(id => paket.kompetenzen.some(k => k.id === id));
  speichern();
}

/* ---------- Bausteine ---------- */
const kopf = (titel, lead, extra = '') => `<header class="top"><div class="toprow"><div class="logochip"><img src="logo.png" alt="Sekundarschule Halingen"></div>${extra}</div>
  <h1>${titel}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</header>`;
const fuss = () => `<footer class="foot"><div class="logochip"><img src="logo.png" alt="Sekundarschule Halingen"></div>
  <p class="small">Lern-Motor · Autor: Alexander Weng · Sekundarschule Halingen</p>
  <p class="small">Dein Lernstand wird nur auf diesem Gerät im Browser gespeichert.</p></footer>`;

function stufeHtml() {
  return `<div class="row"><span class="small">Stufe ${stufe(profil.xp)} · ${profil.xp} XP</span><span class="small">Serie ${profil.serie.wert} ${profil.serie.wert === 1 ? 'Übungstag' : 'Übungstage'}</span></div>
    <div class="xpbar light"><div style="width:${Math.round(fortschrittStufe(profil.xp) * 100)}%"></div></div>`;
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
    ? `<div class="kpis"><div><b>${faellig}</b><span class="small">fällig</span></div><div><b>${neu}</b><span class="small">neu</span></div><div><b>${profil.serie.wert}</b><span class="small">Serie</span></div></div>
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
  const bonus = profil.bonus.length ? `<p class="small">Bonus-Trophäen: ${profil.bonus.map(b => `<span title="${esc(b.name)}">${b.icon}</span>`).join(' ')}</p>` : '';
  return `${kopf('Wiederholungsblock', esc(paket.titel))}
  <main class="wrap"><div class="stack-v">
    <section class="card">${stufeHtml()}${block}</section>
    <section class="card"><div class="tag">Dein Lernstand</div>
      <div class="kpis" style="margin-top:var(--space-3)"><div><b>${zaehl.sitzt}</b><span class="small">sitzt</span></div><div><b>${zaehl.wackelt}</b><span class="small">wackelt</span></div><div><b>${zaehl.neu}</b><span class="small">neu</span></div></div>${bonus}</section>
    ${proKompetenz}
    <details class="card einst"><summary><span>Einstellungen</span><span class="small">Thema, Freigabe</span></summary>
      <label>Thema <select data-act="paket">${optionen}</select></label>
      <p class="small" style="margin-top:var(--space-3)">Im Unterricht schon behandelt (nur diese Teile kommen dran):</p>${freigabe}
      <div class="btnrow" style="margin-top:var(--space-3)">${ui.loeschen ? '<button class="btn sm" data-act="loeschenJa">Wirklich alles löschen</button><button class="btn sm" data-act="loeschenNein">Abbrechen</button>' : '<button class="btn sm" data-act="loeschen">Lernstand dieses Themas löschen</button>'}</div>
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

function beispielHtml(a) {
  const k = a.lernziel.lernkarte, i = a.instanz;
  const worked = k && k.beispiel ? `<div class="worked"><div class="wgiven">${k.beispiel.given}</div><ol class="wsteps">${k.beispiel.steps.map(s => `<li><div><b>${s[0]}</b><br>${s[1]}</div></li>`).join('')}</ol></div>` : '';
  const loes = i.typ === 'mc' ? `<p><b>Richtig:</b> ${i.optionen.find(o => o.richtig).text}</p>` : i.typ === 'zahl' ? '' : `<p><b>Lösung:</b> ${esc(i.musterantwort || '')}</p>`;
  return `<div class="tag">Neu: ${esc(a.lernziel.titel)}</div>
    ${k && k.html ? `<div class="lbody">${k.html}</div>` : ''}${worked}
    <div class="worked"><div class="wgiven"><b>Vorgerechnet:</b> ${i.text}</div>${loes}<div class="lbody">${i.erklaerung || ''}</div></div>
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
    inhalt = `<section class="card"><p class="small">${esc(a.lernziel.titel)}</p><div class="q">${a.instanz.text}</div>
      ${a.zeigeHilfe ? hilfeHtml(a) : ''}${eingabeHtml(a, fertig || ui.frageSicherheit)}${sicherheit}${fb}${erg}</section>`;
  }
  return `${kopf(sitzung.art === 'block' ? 'Wiederholungsblock' : 'Zusatzblock', '', `<button class="btn sm" data-act="ende">Beenden</button>`)}
    <main class="wrap"><div class="stack-v">${oben}${inhalt}</div></main>`;
}

function endeHtml() {
  const z = ui.zusammenfassung;
  const jetzt = new Date();
  const neuUebrig = freigegebeneLernziele(paket, daten.freigabe).filter(l => istNeu(daten.modell, l.id)).length;
  const titel = z.art === 'block' ? (z.abgebrochenNachPause ? 'Gute Entscheidung: Pause.' : 'Block abgeschlossen.') : 'Zusatzblock fertig.';
  return `${kopf(titel, '')}
  <main class="wrap"><div class="stack-v">
    <section class="card"><p class="bignum">+${z.xp} XP</p>
      <p>${z.abrufe ? `${z.richtig} von ${z.abrufe} Abrufen richtig.` : 'Heute nur Beispiele angeschaut.'}${z.blockXp ? ` Dazu ${z.blockXp} XP für den abgeschlossenen Block.` : ''}</p>
      ${stufeHtml()}</section>
    ${ui.bonus ? `<section class="card"><div class="bonus">${ui.bonus.icon}</div><p><b>Bonus-Trophäe: ${esc(ui.bonus.name)}</b></p><p class="small">Bonus-Trophäen kommen ab und zu, einfach so.</p></section>` : ''}
    <section class="card"><div class="tag">Fällig beim nächsten Mal</div><p>${zaehleFaellige(paket, daten.modell, { jetzt: new Date(+jetzt + 86400000), freigabe: daten.freigabe })} Lernziele bis morgen.</p></section>
    ${neuUebrig ? `<section class="card"><p><b>Noch Lust?</b> Der Zusatzblock bringt nur Neues. Freiwillig.</p><button class="btn block" data-act="zusatz">Zusatzblock: Neues lernen</button></section>` : ''}
    <button class="btn btn-primary block" data-act="start">Zur Übersicht</button>
    ${fuss()}
  </div></main>`;
}

function render() {
  $app.innerHTML = ui.seite === 'runde' ? rundeHtml() : ui.seite === 'ende' ? endeHtml() : startHtml();
  const f = document.getElementById('ein') || document.querySelector('[data-luecke]');
  if (f && !f.disabled) f.focus({ preventScroll: true });
  const w = document.getElementById('weiterBtn');
  if (w) w.focus({ preventScroll: true });
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
  ui = { seite: 'runde', frageSicherheit: false, sicherheitNoetig: a.fragSicherheit };
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
  daten.protokoll.push(sitzung.protokoll[sitzung.protokoll.length - 1]);
  profil.xp += r.xp;
  ui.pauseFolgt = r.pauseHinweis;
  speichern();
  render();
}

function beende() {
  const z = sitzung.abschliessen();
  profil.xp += z.blockXp;
  if (z.abrufe) profil.serie = aktualisiereSerie(profil.serie, new Date());
  const bonus = zieheBonus(z);
  if (bonus) profil.bonus = [...profil.bonus, { ...bonus, am: z.ende }].slice(-30);
  daten.modell = sitzung.modell;
  daten.sitzungen = [...daten.sitzungen, z].slice(-200);
  speichern();
  ui = { seite: 'ende', zusammenfassung: z, bonus };
  sitzung = null;
  render(); scrollTo(0, 0);
}

$app.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b || b.disabled) return;
  const act = b.dataset.act;
  if (act === 'block') starteSitzung('block');
  else if (act === 'zusatz') starteSitzung('zusatz');
  else if (act === 'start') { ui = {}; render(); }
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
  else if (act === 'loeschen') { ui.loeschen = true; render(); }
  else if (act === 'loeschenNein') { ui.loeschen = false; render(); }
  else if (act === 'loeschenJa') { daten = neueDaten(paket.id); ui = {}; speichern(); render(); }
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
  if (ui.ergebnis || ui.frageSicherheit) return;
  ui.eingabe = sammleEingabe(); antwortFest(ui.eingabe);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && ui.seite === 'runde' && ui.ergebnis && document.activeElement?.id !== 'weiterBtn') { e.preventDefault(); document.getElementById('weiterBtn')?.click(); }
});

(async () => {
  const q = new URLSearchParams(location.search);
  try { await ladePaket(q.get('paket') || profil.paket); }
  catch (err) { $app.innerHTML = `<main class="wrap"><p>Das Thema konnte nicht geladen werden: ${esc(err.message)}</p></main>`; return; }
  render();
})();
