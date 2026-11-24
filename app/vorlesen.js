// Vorlesen: aufgenommene Sprechtexte (MP3) oder Browser-Stimme (Web Speech API, deutsch).
// Aussprache-Regeln (speechClean, speechChunks) unverändert aus der NuT-Lernlandkarte übernommen.

const SP_SUB = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
const SP_UNITS = { 'kWh': 'Kilowattstunden', 'kJ': 'Kilojoule', 'kW': 'Kilowatt', 'MW': 'Megawatt', 'mW': 'Milliwatt', 'W': 'Watt', 'J': 'Joule', 'kN': 'Kilonewton', 'N': 'Newton', 'kV': 'Kilovolt', 'mV': 'Millivolt', 'V': 'Volt', 'mA': 'Milliampere', 'A': 'Ampere', 'kΩ': 'Kiloohm', 'Ω': 'Ohm', 'kHz': 'Kilohertz', 'Hz': 'Hertz', 'hPa': 'Hektopascal', 'Pa': 'Pascal', 'mol': 'Mol', 'kg': 'Kilogramm', 'mg': 'Milligramm', 'g': 'Gramm', 'km/h': 'Kilometer pro Stunde', 'm/s': 'Meter pro Sekunde', 'km': 'Kilometer', 'dm': 'Dezimeter', 'cm': 'Zentimeter', 'mm': 'Millimeter', 'm': 'Meter', 'mL': 'Milliliter', 'ml': 'Milliliter', 'L': 'Liter', 'min': 'Minuten', 's': 'Sekunden', 'h': 'Stunden', 'kcal': 'Kilokalorien' };
const SP_UNIT_RE = new RegExp('(\\d(?:[.,]\\d+)?)\\s*(' + Object.keys(SP_UNITS).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')).join('|') + ')(?![A-Za-zÄÖÜäöüß0-9])', 'g');
export function speechClean(html) {
  let t = String(html || '');
  t = t.replace(/<\s*br\s*\/?>/gi, '. ').replace(/<\/(p|li|div|h\d|tr)>/gi, '. ').replace(/<\/(td|th)>/gi, ', ');
  t = t.replace(/<sub>\s*([0-9]+)\s*<\/sub>/gi, (m, d) => ' ' + [...d].map(x => SP_SUB[+x]).join(' ') + ' ');
  t = t.replace(/<sup>\s*([^<]*)<\/sup>/gi, (m, d) => ' hoch ' + d.replace(/[−-]/g, 'minus ').replace(/\+/g, 'plus ') + ' ');
  t = t.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, 'und').replace(/&lt;/g, ' kleiner als ').replace(/&gt;/g, ' grösser als ').replace(/&[a-z]+;/g, ' ');
  t = t.replace(/(km|dm|cm|mm|m)²/g, (m, u) => 'Quadrat' + ({ km: 'kilometer', dm: 'dezimeter', cm: 'zentimeter', mm: 'millimeter', m: 'meter' })[u]).replace(/(km|dm|cm|mm|m)³/g, (m, u) => 'Kubik' + ({ km: 'kilometer', dm: 'dezimeter', cm: 'zentimeter', mm: 'millimeter', m: 'meter' })[u]);
  t = t.replace(/(^|[^\d,.])1\/(\d+)\b/g, (m, p, d) => p + ({ 2: 'ein Halb', 3: 'ein Drittel', 4: 'ein Viertel', 5: 'ein Fünftel', 6: 'ein Sechstel', 8: 'ein Achtel', 10: 'ein Zehntel' }[d] || ('1 geteilt durch ' + d))).replace(/(\d+)\/(\d+)/g, '$1 geteilt durch $2');
  t = t.replace(/[₀-₉]+/g, m => ' ' + [...m].map(ch => SP_SUB[ch.charCodeAt(0) - 0x2080]).join(' ') + ' ');
  t = t.replace(/⁻([¹²³⁰⁴-⁹])/g, ' hoch minus $1').replace(/⁻/g, ' minus ').replace(/⁺/g, ' plus ');
  t = t.replace(/[¹²³⁰⁴-⁹]+/g, m => ' hoch ' + [...m].map(ch => ({ '¹': 'eins', '²': 'zwei', '³': 'drei', '⁰': 'null', '⁴': 'vier', '⁵': 'fünf', '⁶': 'sechs', '⁷': 'sieben', '⁸': 'acht', '⁹': 'neun' }[ch] || '')).join(' ') + ' ');
  t = t.replace(/°\s*C/g, ' Grad Celsius').replace(/°/g, ' Grad ');
  t = t.replace(SP_UNIT_RE, (m, n, u) => { let w = SP_UNITS[u]; if (n === '1') w = ({ Sekunden: 'Sekunde', Minuten: 'Minute', Stunden: 'Stunde', Kilowattstunden: 'Kilowattstunde' })[w] || w; return n + ' ' + w; });
  t = t.replace(/\bkm\/h\b/g, 'Kilometer pro Stunde').replace(/\bm\/s\b/g, 'Meter pro Sekunde');
  t = t.replace(/Ω/g, ' Ohm ');
  t = t.replace(/\bMrd\./g, 'Milliarden').replace(/\bMio\./g, 'Millionen').replace(/\bTsd\./g, 'Tausend').replace(/\bbzw\./g, 'beziehungsweise').replace(/\bz\. ?B\./g, 'zum Beispiel').replace(/\busw\./g, 'und so weiter').replace(/\bca\./g, 'circa');
  t = t.replace(/(^|[\s(])\+(\d)/g, '$1plus $2');
  t = t.replace(/\b(Newton|N)\s*\/\s*kg\b/g, 'Newton pro Kilogramm').replace(/\b(Joule|J)\s*\/\s*s\b/g, 'Joule pro Sekunde');
  t = t.replace(/ρ/g, ' Rho ').replace(/(Gramm|Kilogramm|g|kg)\s*\/\s*(Kubik\w+|Milliliter|Liter|cm³)/g, (m, a, b) => ({ g: 'Gramm', kg: 'Kilogramm' }[a] || a) + ' pro ' + b).replace(/\bMasse\s*:\s*Volumen/g, 'Masse geteilt durch Volumen');
  t = t.replace(/\s*\((J|kJ|kWh|kcal|W|kW|N|V|A)\)/g, '');
  t = t.replace(/\bkcal\b/g, 'Kilokalorien').replace(/\bkJ\b/g, 'Kilojoule').replace(/\bkWh\b/g, 'Kilowattstunden').replace(/(^|[\s(,])J(?=[\s,.;)]|$)/g, '$1Joule');
  t = t.replace(/(\d)\s*[–-]\s*(\d)/g, '$1 bis $2').replace(/ ½ /g, ' ein Halb ').replace(/½/g, ' ein Halb ').replace(/¼/g, ' ein Viertel ').replace(/¾/g, ' drei Viertel ');
  t = t.replace(/[·×]/g, ' mal ').replace(/[^.]*[→⟶][^.]*/g, seg => /Ausgangsstoff|Reaktion|Schema|Produkt|erbrenn|reagier/.test(seg) ? seg.replace(/[→⟶]/g, ' reagieren zu ') : (seg.indexOf(' + ') >= 0 ? seg.replace(/[→⟶]/g, ' ergibt ') : seg.replace(/[→⟶]/g, ' dann '))).replace(/↔/g, ' entspricht ').replace(/⇌/g, ' im Gleichgewicht mit ').replace(/α'/g, 'Alpha Strich').replace(/α/g, 'Alpha').replace(/β/g, 'Beta').replace(/γ/g, 'Gamma').replace(/Δ/g, 'Delta ').replace(/≈/g, ' ungefähr ').replace(/≠/g, ' ungleich ').replace(/≤/g, ' kleiner oder gleich ').replace(/≥/g, ' grösser oder gleich ').replace(/±/g, ' plus minus ');
  t = t.replace(/\s=\s/g, ' gleich ').replace(/=/g, ' gleich ').replace(/\s\+\s/g, ' plus ').replace(/\s[−–]\s/g, ' minus ').replace(/−/g, ' minus ').replace(/%/g, ' Prozent');
  t = t.replace(/\(\s*NT\.[^)]*\)/g, ' ');
  t = t.replace(/[★☆✓✔✗✘•▶►◆■□]/g, ' ').replace(/(\S)\s+:\s+(?=\d)/g, '$1 geteilt durch ').replace(/(gleich)\s+([A-Za-zÄÖÜäöü0-9]{1,4})\s+:\s+([A-Za-zÄÖÜäöü0-9]{1,4})(?=[\s.,;)]|$)/g, '$1 $2 geteilt durch $3').replace(/(^|[\s(])([A-Za-zÄÖÜäöü0-9]{1,4})\s+:\s+([A-Za-zÄÖÜäöü0-9]{1,4})(?=[\s.,;)]|$)(?!\s*(?:=|gleich))/g, '$1$2 geteilt durch $3').replace(/\.\s*!\s+/g, '. ').replace(/(^|\s)!\s+/g, ' ').replace(/(\d)\.(\d)/g, '$1,$2');
  t = t.replace(/[«»„“”"]/g, ' ').replace(/\s+/g, ' ').replace(/\s+([.,;:!?)])/g, '$1').replace(/([.!?:])(\s*[.,;:])+/g, '$1').replace(/^[\s.]+/, '').trim();
  return t;
}
function speechChunks(text) {
  const sents = text.match(/.+?[.!?](?=\s|$)\s*|.+$/g) || [text], out = [];
  let cur = '';
  sents.forEach(s => { if (cur && (cur + s).length > 200) { out.push(cur.trim()); cur = ''; } cur += s; });
  if (cur.trim()) out.push(cur.trim());
  return out;
}

const AUD = { el: null, tok: 0, an: false, beiAenderung: null };
export const vorlesenLaeuft = () => AUD.an;
export const vorlesenMoeglich = () => typeof window !== 'undefined' && (!!window.speechSynthesis || typeof Audio !== 'undefined');

function setze(an) { AUD.an = an; if (AUD.beiAenderung) AUD.beiAenderung(an); }

export function stoppeVorlesen() {
  AUD.tok++;
  if (AUD.el) { try { AUD.el.pause(); } catch (e) { /* egal */ } AUD.el = null; }
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* egal */ }
  if (AUD.an) setze(false);
}

// teile: [{ audio: 'nt7-2/k1-c0-w.mp3' | null, text: 'HTML oder Text' }], nacheinander abgespielt.
// MP3 fehlt oder lässt sich nicht abspielen: Browser-Stimme liest den Text.
export function lies(teile, { basis = '../audio/', beiAenderung = null } = {}) {
  stoppeVorlesen();
  AUD.beiAenderung = beiAenderung;
  const mein = AUD.tok, liste = teile.filter(t => t && (t.audio || t.text));
  let k = 0;
  setze(true);
  const fertig = () => { if (mein === AUD.tok) { AUD.el = null; setze(false); } };
  const weiter = () => {
    if (mein !== AUD.tok) return;
    if (k >= liste.length) return fertig();
    const t = liste[k++];
    const sprich = () => {
      if (mein !== AUD.tok) return;
      const text = speechClean(t.text || '');
      if (!text || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return weiter();
      const stuecke = speechChunks(text); let j = 0;
      const naechstes = () => {
        if (mein !== AUD.tok) return;
        if (j >= stuecke.length) return weiter();
        try { const u = new SpeechSynthesisUtterance(stuecke[j++]); u.lang = 'de-DE'; u.onend = naechstes; u.onerror = weiter; window.speechSynthesis.speak(u); } catch (e) { weiter(); }
      };
      naechstes();
    };
    if (!t.audio) return sprich();
    try {
      const a = new Audio(basis + t.audio); AUD.el = a; a.onended = weiter; a.onerror = sprich;
      const p = a.play(); if (p && p.catch) p.catch(sprich);
    } catch (e) { sprich(); }
  };
  weiter();
}
