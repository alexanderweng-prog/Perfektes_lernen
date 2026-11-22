// Lehrer-Dashboard: nur Gruppendaten. Die Datenbank liefert ausschliesslich Summen und blendet
// Zellen mit weniger als 5 Kindern aus. Hier wird nichts gefiltert oder nachgerechnet, was einzelne Kinder zeigen könnte.
import { rpc, lehrerLogin, backendAktiv } from './backend.js';
import { KATALOG } from '../pakete/katalog.js';
import { ergaenze, ladeErgaenzung } from '../pakete/ergaenze.js';

const $app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = h => String(h ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const pct = x => x == null ? '–' : Math.round(x * 100) + ' %';
const SITZUNG_KEY = 'lernmotor.lehrer.v1'; // sessionStorage: endet mit dem Tab

let sitzung = null; try { sitzung = JSON.parse(sessionStorage.getItem(SITZUNG_KEY) || 'null'); } catch (e) { /* ohne Speicher */ }
let ui = { klassen: null, klasse: null, paketId: KATALOG[0].id, paket: null, daten: null, fehler: null };

const kopf = (extra = '') => `<header class="top"><div class="toprow"><div class="logochip"><img src="logo.png" alt="Sekundarschule Halingen"></div>${extra}</div>
  <h1>Lehrer-Dashboard</h1><p class="lead">Nur Gruppendaten · mindestens 5 Kinder pro Zelle</p></header>`;
const fuss = `<footer class="foot"><p class="small">Lern-Motor · Autor: Alexander Weng · Sekundarschule Halingen</p>
  <p class="small">Einzelne Kinder sind hier nie sichtbar. Zellen mit weniger als 5 Kindern bleiben leer. Export nur als Summen.</p></footer>`;
const fehlerHtml = () => ui.fehler ? `<div class="fb bad"><div class="fbb">${esc(ui.fehler)}</div></div>` : '';

async function aufruf(name, args) {
  if (!sitzung || Date.now() > sitzung.ablauf - 30000) { abmelden('Die Anmeldung ist abgelaufen. Bitte neu anmelden.'); throw new Error('abgelaufen'); }
  try { return await rpc(name, args, sitzung.token); }
  catch (e) { if (e.status === 401) abmelden('Die Anmeldung ist abgelaufen. Bitte neu anmelden.'); throw e; }
}
function abmelden(text) { sitzung = null; try { sessionStorage.removeItem(SITZUNG_KEY); } catch (e) { /* */ } ui = { ...ui, klassen: null, klasse: null, daten: null, fehler: text || null }; render(); }

/* ---------- Ansichten ---------- */
function loginHtml() {
  if (!backendAktiv()) return `${kopf()}<main class="wrap"><div class="stack-v"><section class="card"><p>Kein Backend eingerichtet (app/config.js).</p></section></div></main>`;
  return `${kopf()}<main class="wrap"><div class="stack-v"><section class="card"><div class="tag">Anmelden</div>
    <form data-form="login"><label class="einst" style="display:block">E-Mail<input id="mail" class="txtin" type="email" autocomplete="username"></label>
    <label class="einst" style="display:block;margin-top:8px">Passwort<input id="pw" class="txtin" type="password" autocomplete="current-password"></label>
    <button class="btn btn-primary block" style="margin-top:var(--space-3)">Anmelden</button></form>${fehlerHtml()}
    <p class="small" style="margin-top:var(--space-3)">Konten für Lehrpersonen werden im Supabase-Projekt angelegt (Anleitung in docs/backend.md).</p></section>${fuss}</div></main>`;
}

function klassenHtml() {
  const liste = (ui.klassen || []).map(k => `<li><span><b>${esc(k.name)}</b><br><span class="small">${esc(k.teamname)} · Klassencode <span class="mono">${esc(k.klassencode)}</span> · ${k.mitglieder} Kinder · gelöscht ab ${esc(k.loeschen_ab)}</span></span>
    <span class="btnrow"><button class="btn sm" data-act="oeffnen" data-id="${k.id}">Auswertung</button></span></li>`).join('');
  return `<section class="card"><div class="tag">Meine Klassen</div>
    ${liste ? `<ul class="lzlist">${liste}</ul>` : '<p>Noch keine Klasse.</p>'}
    <form data-form="klasse" class="ansrow" style="margin-top:var(--space-4)"><input id="kname" class="txtin" maxlength="40" placeholder="z. B. 2a NuT" aria-label="Name der Klasse"><button class="btn">Klasse anlegen</button></form>
    <p class="small" style="margin-top:var(--space-3)"><button class="btn sm" data-act="pruefen">Neue Inhalte prüfen und freigeben</button></p>
    <p class="small">Den Klassencode schreiben Sie an die Tafel. Die Kinder geben ihn unter «Neu hier» ein und erhalten ihren persönlichen Lerncode. Den Lerncode sehen nur die Kinder.</p></section>`;
}

const titelLz = id => { const l = ui.paket && ui.paket.lernziele.find(x => x.id === id); return l ? l.titel : id; };
function aufgabeInfo(id, nr) {
  const a = ui.paket && ui.paket.aufgaben.find(x => x.id === id);
  if (!a) return { text: id, option: nr, erkl: '' };
  let roh; try { roh = typeof a.erzeuge === 'function' ? a.erzeuge() : a; } catch (e) { roh = a; }
  const o = roh.optionen && roh.optionen[Number(nr)];
  return { text: strip(roh.text), option: o ? strip(o.text) : nr, erkl: o && o.erklaerung ? strip(o.erklaerung) : strip(roh.erklaerung), lernziel: titelLz(a.lernziel) };
}

function auswertungHtml() {
  const k = ui.klassen.find(x => x.id === ui.klasse), d = ui.daten;
  const pakete = KATALOG.map(p => `<option value="${p.id}" ${p.id === ui.paketId ? 'selected' : ''}>${esc(p.titel)} (${esc(p.kapitel)})</option>`).join('');
  let inhalt = '<p>Lädt …</p>';
  if (d && d.zuKlein) inhalt = `<section class="card"><p>Die Klasse hat erst ${d.mitglieder} Kinder mit Lerncode. Auswertungen gibt es ab ${d.minGruppe} Kindern.</p></section>`;
  else if (d) {
    const leer = t => `<p class="small">${t}</p>`;
    const ue = d.uebersicht == null ? leer(`Erst ${d.aktiv} Kinder haben dieses Thema geübt (mindestens ${d.minGruppe} nötig).`)
      : !d.uebersicht.length ? leer('Noch keine Daten.') : `<ul class="lzlist">${d.uebersicht.map(z => {
        const n = z.sitzt + z.wackelt + z.neu || 1, p = x => (100 * x / n).toFixed(1) + '%';
        return `<li style="display:block"><div class="row"><span>${esc(titelLz(z.lernziel))}</span><span class="small mono">${pct(z.sitzt / n)} sitzt · ${pct(z.wackelt / n)} wackelt</span></div>
          <div class="tri3"><span class="s" style="width:${p(z.sitzt)}"></span><span class="w" style="width:${p(z.wackelt)}"></span><span class="n" style="width:${p(z.neu)}"></span></div></li>`;
      }).join('')}</ul>`;
    const pr = d.problemLernziele.length ? `<ol class="lzlist">${d.problemLernziele.map(z => `<li><span>${esc(titelLz(z.lernziel))}</span><span class="mono small">${pct(z.quote)} ${z.vorwoche == null ? '' : z.quote > z.vorwoche ? '↑' : z.quote < z.vorwoche ? '↓' : '→'} (Vorwoche ${pct(z.vorwoche)})</span></li>`).join('')}</ol>` : leer('Noch zu wenige Antworten in den letzten 7 Tagen.');
    const fv = d.fehlvorstellungen.length ? `<ul class="lzlist">${d.fehlvorstellungen.slice(0, 10).map(z => {
      const i = aufgabeInfo(z.aufgabe, z.option);
      return `<li style="display:block"><p class="small">${esc(i.lernziel || '')}</p><p><b>${esc(i.text)}</b></p>
        <p>Häufigste falsche Antwort (${pct(z.anteil)} der Antworten${z.sicherFalsch ? `, ${z.sicherFalsch}× «sicher»` : ''}): <b>${esc(i.option)}</b></p>
        <p class="small">${esc(i.erkl)}</p></li>`;
    }).join('')}</ul>` : leer('Noch keine Multiple-Choice-Aufgabe mit genug Antworten (28 Tage).');
    const nu = `<p class="bignum">${pct(d.nutzung.woche)}</p><p class="small">der Klasse haben diese Woche mindestens einen Wiederholungsblock gemacht (Vorwoche ${pct(d.nutzung.vorwoche)}).</p>`;
    const sl = d.sitzungslaenge ? `<p>${d.sitzungslaenge.bloecke} Blöcke in 28 Tagen, im Schnitt ${d.sitzungslaenge.aufgabenSchnitt} Aufgaben in ${d.sitzungslaenge.minutenSchnitt} Minuten.</p>
      <p>Pausenhinweis in ${pct(d.sitzungslaenge.anteilPause)} der Blöcke${d.sitzungslaenge.pauseNachSchnitt ? `, im Schnitt nach ${d.sitzungslaenge.pauseNachSchnitt} Aufgaben` : ''}.</p>
      <p class="small">Kommt der Hinweis oft und früh, sind die Blöcke zu lang oder zu schwer.</p>` : leer('Noch zu wenige Blöcke.');
    const qu = d.aufgabenQualitaet.length ? `<ul class="lzlist">${d.aufgabenQualitaet.map(z => `<li><span>${esc(aufgabeInfo(z.aufgabe).text)}<br><span class="small mono">${esc(z.aufgabe)}</span></span><span class="mono">${pct(z.quote)}</span></li>`).join('')}</ul>
      <p class="small">Unter 30 % richtig bei mindestens 5 Kindern. Oft liegt es an der Aufgabe, nicht an der Klasse: bitte prüfen.</p>` : leer('Keine auffälligen Aufgaben.');
    const karte = (titel, html) => `<section class="card"><div class="tag">${titel}</div>${html}</section>`;
    inhalt = karte('Nutzung', nu) + karte('Klassenübersicht pro Lernziel', ue) + karte('Problem-Lernziele (7 Tage)', pr)
      + karte('Häufige Fehlvorstellungen', fv) + karte('Sitzungslänge', sl) + karte('Aufgabenqualität', qu)
      + `<button class="btn block" data-act="csv">Als CSV speichern (nur Summen)</button>`;
  }
  return `<section class="card"><div class="row"><div><div class="tag">${esc(k.teamname)}</div><b>${esc(k.name)}</b> · <span class="small">${k.mitglieder} Kinder · Code <span class="mono">${esc(k.klassencode)}</span></span></div>
      <button class="btn sm" data-act="zurueck">Alle Klassen</button></div>
    <label class="einst" style="display:flex;margin-top:var(--space-3)">Thema <select data-act="paket">${pakete}</select></label></section>
    ${inhalt}
    <details class="card"><summary><span>Klasse löschen</span></summary><p class="small">Löscht die Klasse mit allen Lerncodes und Antworten sofort. Automatisch passiert das am ${esc(k.loeschen_ab)}.</p>
      ${ui.loeschen ? '<div class="btnrow"><button class="btn sm" data-act="loeschenJa">Endgültig löschen</button><button class="btn sm" data-act="loeschenNein">Abbrechen</button></div>' : '<button class="btn sm" data-act="loeschen">Löschen …</button>'}</details>`;
}

/* ---------- Inhalte prüfen (Ergänzungen freigeben) ---------- */
const STATUS_TEXT = { entwurf: 'Entwurf', geprueft: 'freigegeben', zurueckgezogen: 'zurückgezogen' };
function beispielHtml(e) {
  if (e.art === 'erklaerungen') {
    const r = e.aufgabe.erzeuge();
    return `<p><b>${r.text}</b></p><ul class="lzlist">${r.optionen.map((o, i) => `<li style="display:block">${o.richtig ? '✓ ' : '✗ '}${o.text}${!o.richtig ? `<br><span class="small"><b>Neu:</b> ${esc(e.erklaerungen[i] || '— fehlt —')}</span>` : ''}</li>`).join('')}</ul>`;
  }
  const a = e.aufgabe;
  let r; try { r = typeof a.erzeuge === 'function' ? a.erzeuge() : a; } catch (err) { return `<p class="fb bad">Fehler beim Erzeugen: ${esc(err.message)}</p>`; }
  const typ = r.typ || a.typ;
  let antwort = '';
  if (typ === 'mc') antwort = `<ul class="lzlist">${r.optionen.map(o => `<li style="display:block">${o.richtig ? '✓ ' : '✗ '}${o.text}${o.erklaerung ? `<br><span class="small">${esc(o.erklaerung)}</span>` : ''}</li>`).join('')}</ul>`;
  else if (typ === 'zahl') antwort = `<p>Lösung: <b>${Math.round(r.wert * 1000) / 1000} ${esc(r.einheit || '')}</b>${r.hilfe ? `<br><span class="small">Tipp: ${r.hilfe}</span>` : ''}</p>`;
  else if (typ === 'luecke') antwort = `<p>Lösungen: ${r.luecken.map(l => `<b>${esc(l.join(' / '))}</b>`).join(' · ')}</p>`;
  else if (typ === 'zuordnen') antwort = `<ul class="lzlist">${r.paare.map(p => `<li><span>${esc(p[0])}</span><span>→ ${esc(p[1])}</span></li>`).join('')}</ul>`;
  else if (typ === 'reihenfolge') antwort = `<ol class="lzlist">${r.elemente.map(x => `<li>${esc(x)}</li>`).join('')}</ol>`;
  return `<p class="small">${esc(typ)} · Schwierigkeit ${a.schwierigkeit} · neue Variante zu «${esc(e.vorlage.thema || '')}»${typeof a.erzeuge === 'function' ? ' · Zahlen werden zufällig gewählt, hier ein Beispiel' : ''}</p>
    <p><b>${r.text}</b></p>${antwort}<p class="small">Erklärung: ${r.erklaerung || ''}</p>`;
}
function pruefenHtml() {
  const pakete = KATALOG.map(p => `<option value="${p.id}" ${p.id === ui.paketId ? 'selected' : ''}>${esc(p.titel)} (${esc(p.kapitel)})</option>`).join('');
  const p = ui.pruefPaket;
  let liste = '<p>Lädt …</p>';
  if (p) {
    const alle = p.entwuerfe, offen = alle.filter(e => e.status === 'entwurf');
    const zeigen = ui.alleZeigen ? alle : offen;
    const lz = id => (p.lernziele.find(l => l.id === id) || {}).titel || id;
    liste = `<p>${offen.length} von ${alle.length} Einträgen sind noch Entwürfe.</p>
      <div class="btnrow"><button class="btn sm" data-act="alleZeigen">${ui.alleZeigen ? 'Nur Entwürfe zeigen' : 'Alle zeigen'}</button>
      ${offen.length ? (ui.alleBestaetigen ? `<button class="btn sm btn-primary" data-act="alleFreigebenJa">Wirklich alle ${offen.length} freigeben</button><button class="btn sm" data-act="alleFreigebenNein">Abbrechen</button>` : `<button class="btn sm" data-act="alleFreigeben">Alle Entwürfe dieses Themas freigeben …</button>`) : ''}</div>
      ${zeigen.map(e => `<section class="card" style="margin-top:var(--space-3)"><div class="row"><span class="tag">${e.art === 'erklaerungen' ? 'Erklärungen zu falschen Antworten' : 'Neue Aufgabe'} · ${esc(lz(e.aufgabe.lernziel))}</span><span class="chip ${e.status === 'geprueft' ? 'sitzt' : e.status === 'entwurf' ? 'wackelt' : 'neu'}">${STATUS_TEXT[e.status]}</span></div>
        ${beispielHtml(e)}
        <div class="btnrow" style="margin-top:var(--space-3)">
          ${e.status !== 'geprueft' ? `<button class="btn sm btn-primary" data-act="freigabe" data-id="${esc(e.id)}" data-s="geprueft">Freigeben</button>` : ''}
          ${e.status !== 'zurueckgezogen' ? `<button class="btn sm" data-act="freigabe" data-id="${esc(e.id)}" data-s="zurueckgezogen">Zurückziehen</button>` : ''}
          ${e.status !== 'entwurf' ? `<button class="btn sm" data-act="freigabe" data-id="${esc(e.id)}" data-s="entwurf">Wieder Entwurf</button>` : ''}
          ${e.art === 'aufgabe' && typeof e.aufgabe.erzeuge === 'function' ? '<button class="btn sm" data-act="neuRendern">Andere Zahlen</button>' : ''}
        </div></section>`).join('') || '<p>Keine Einträge.</p>'}`;
  }
  return `<section class="card"><div class="row"><div class="tag">Neue Inhalte prüfen</div><button class="btn sm" data-act="zurueck">Zurück</button></div>
    <p class="small">Claude hat Erklärungen zu falschen Antworten und neue Aufgabenvarianten erstellt. Die Kinder sehen nur, was Sie freigeben. Fachliche Fehler bitte zurückziehen.</p>
    <label class="einst" style="display:flex">Thema <select data-act="pruefPaket">${pakete}</select></label></section>${liste}`;
}
async function ladePruefen() {
  ui.pruefPaket = null; render();
  try {
    const eintrag = KATALOG.find(p => p.id === ui.paketId);
    const roh = (await import('../pakete/' + eintrag.datei.replace('./', ''))).default;
    const freigaben = await rpc('lm_freigaben');
    ui.pruefPaket = ergaenze(roh, await ladeErgaenzung(roh.id), { freigaben });
    ui.fehler = null;
  } catch (e) { ui.fehler = e.message; }
  render();
}
async function setzeFreigabe(ids, status) {
  try { await aufruf('lm_freigabe_setzen', { p_eintraege: ids, p_status: status }); await ladePruefen(); }
  catch (e) { ui.fehler = e.message; render(); }
}

function render() {
  if (!sitzung) { $app.innerHTML = loginHtml(); return; }
  const kopfExtra = `<div style="display:flex;gap:8px;align-items:center"><span class="small" style="color:var(--header-muted)">${esc(sitzung.email || '')}</span><button class="btn sm" data-act="abmelden">Abmelden</button></div>`;
  $app.innerHTML = `${kopf(kopfExtra)}<main class="wrap"><div class="stack-v">${fehlerHtml()}${ui.pruefen ? pruefenHtml() : ui.klasse ? auswertungHtml() : ui.klassen ? klassenHtml() : '<p>Lädt …</p>'}${fuss}</div></main>`;
}

async function ladeKlassen() {
  try { ui.klassen = await aufruf('lm_meine_klassen', {}); ui.fehler = null; } catch (e) { ui.fehler = e.message; }
  render();
}
async function ladeAuswertung() {
  ui.daten = null; render();
  try {
    const roh = (await import('../pakete/' + KATALOG.find(p => p.id === ui.paketId).datei.replace('./', ''))).default;
    ui.paket = ergaenze(roh, await ladeErgaenzung(roh.id), { alleFreigeben: true }); // nur zum Nachschlagen von Texten
    ui.daten = await aufruf('lm_dashboard', { p_klasse: ui.klasse, p_paket: ui.paketId }); ui.fehler = null;
  } catch (e) { ui.fehler = e.message; }
  render();
}

function csv() {
  const d = ui.daten, k = ui.klassen.find(x => x.id === ui.klasse), z = [['Ansicht', 'Lernziel/Aufgabe', 'Wert 1', 'Wert 2', 'Wert 3']];
  (d.uebersicht || []).forEach(r => z.push(['Übersicht (Anzahl Kinder sitzt/wackelt/neu)', titelLz(r.lernziel), r.sitzt, r.wackelt, r.neu]));
  d.problemLernziele.forEach(r => z.push(['Problem-Lernziel (Quote, Vorwoche, Kinder)', titelLz(r.lernziel), r.quote, r.vorwoche ?? '', r.kinder]));
  d.fehlvorstellungen.forEach(r => { const i = aufgabeInfo(r.aufgabe, r.option); z.push(['Fehlvorstellung (Option, Anteil, sicher falsch)', i.text, i.option, r.anteil, r.sicherFalsch]); });
  z.push(['Nutzung (diese Woche, Vorwoche)', '', d.nutzung.woche, d.nutzung.vorwoche, '']);
  if (d.sitzungslaenge) z.push(['Sitzungslänge (Anteil Pause, Pause nach, Aufgaben)', '', d.sitzungslaenge.anteilPause, d.sitzungslaenge.pauseNachSchnitt ?? '', d.sitzungslaenge.aufgabenSchnitt]);
  d.aufgabenQualitaet.forEach(r => z.push(['Aufgabenqualität (Quote, Kinder)', aufgabeInfo(r.aufgabe).text, r.quote, r.kinder, '']));
  const text = '﻿' + z.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = `auswertung-${k.name.replace(/[^\w-]+/g, '_')}-${ui.paketId}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

$app.addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target.dataset.form;
  if (f === 'login') {
    try {
      sitzung = await lehrerLogin(document.getElementById('mail').value.trim(), document.getElementById('pw').value);
      try { sessionStorage.setItem(SITZUNG_KEY, JSON.stringify(sitzung)); } catch (err) { /* */ }
      ui.fehler = null; render(); ladeKlassen();
    } catch (err) { ui.fehler = err.message; render(); }
  } else if (f === 'klasse') {
    const n = document.getElementById('kname').value.trim();
    if (!n) return;
    try { await aufruf('lm_klasse_erstellen', { p_name: n }); await ladeKlassen(); } catch (err) { ui.fehler = err.message; render(); }
  }
});
$app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const a = b.dataset.act;
  if (a === 'abmelden') abmelden();
  else if (a === 'pruefen') { ui.pruefen = true; ui.klasse = null; ladePruefen(); }
  else if (a === 'alleZeigen') { ui.alleZeigen = !ui.alleZeigen; render(); }
  else if (a === 'alleFreigeben') { ui.alleBestaetigen = true; render(); }
  else if (a === 'alleFreigebenNein') { ui.alleBestaetigen = false; render(); }
  else if (a === 'alleFreigebenJa') { ui.alleBestaetigen = false; setzeFreigabe(ui.pruefPaket.entwuerfe.filter(x => x.status === 'entwurf').map(x => x.id), 'geprueft'); }
  else if (a === 'freigabe') setzeFreigabe([b.dataset.id], b.dataset.s);
  else if (a === 'neuRendern') render();
  else if (a === 'oeffnen') { ui.klasse = b.dataset.id; ui.loeschen = false; ladeAuswertung(); }
  else if (a === 'zurueck') { ui.klasse = null; ui.daten = null; ui.pruefen = false; ladeKlassen(); }
  else if (a === 'csv') csv();
  else if (a === 'loeschen') { ui.loeschen = true; render(); }
  else if (a === 'loeschenNein') { ui.loeschen = false; render(); }
  else if (a === 'loeschenJa') {
    try { await aufruf('lm_klasse_loeschen', { p_klasse: ui.klasse }); ui.klasse = null; ui.loeschen = false; await ladeKlassen(); }
    catch (err) { ui.fehler = err.message; render(); }
  }
});
$app.addEventListener('change', e => {
  if (e.target.dataset.act === 'paket') { ui.paketId = e.target.value; ladeAuswertung(); }
  if (e.target.dataset.act === 'pruefPaket') { ui.paketId = e.target.value; ladePruefen(); }
});

render();
if (sitzung) ladeKlassen();
