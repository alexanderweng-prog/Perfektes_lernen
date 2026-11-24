// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/7_4_Bewegungen_erkunden.html
// Nicht von Hand ändern. Simulationen (SIMS) werden im Browser mit simulationen[id](element) gestartet.
import { ausNaturalia } from './naturalia-adapter.js';

/* ---------- Hilfsfunktionen ---------- */
const G = 10; // Ortsfaktor in N/kg (Annahme: Sek-Standard)
let RNG = Math.random; // wird für die Challenge kurz durch einen Seed-Generator ersetzt
const rnd = a => a[Math.floor(RNG() * a.length)];
function seeded(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = (() => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return (h ^= h >>> 16) >>> 0; })();
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const NICK_A = ['Blitz', 'Funke', 'Turbo', 'Watt', 'Joule', 'Volt', 'Ampere', 'Kilo', 'Dynamo', 'Magnet'];
const NICK_B = ['Fuchs', 'Adler', 'Luchs', 'Falke', 'Dachs', 'Otter', 'Uhu', 'Igel'];
const newNick = () => NICK_A[Math.floor(Math.random() * NICK_A.length)] + '-' + NICK_B[Math.floor(Math.random() * NICK_B.length)];
const shuffle = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(RNG() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
function fmt(n, d) {
  d = d === undefined ? 3 : d;
  const f = Math.pow(10, d);
  n = Math.round(n * f) / f;
  const neg = n < 0;
  let [i, fr] = Math.abs(n).toString().split('.');
  if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F');
  return (neg ? '\u2212' : '') + i + (fr ? ',' + fr : '');
}
const num = (q, unit, ans, hint, explain, o) =>
  Object.assign({ type: 'num', q, unit, ans, hint, explain, tolRel: 0.01, tolAbs: 0 }, o || {});
// MC: options[0] ist die richtige Antwort, gemischt wird beim Anzeigen
const mc = (q, options, explain) => ({ type: 'mc', q, options, explain });

/* ---------- Diagramme als SVG (Datendarstellung) ---------- */
const fmtn = n => String(Math.round(n * 100) / 100).replace('.', ',');
function chart(o) {
  const W = o.w || 320, H = o.h || 210, L = 50, R = 14, T = 14, B = 42, pw = W - L - R, ph = H - T - B;
  const X = x => (L + x / o.xmax * pw).toFixed(1), Y = y => (T + ph - y / o.ymax * ph).toFixed(1);
  let g = '';
  for (let x = 0; x <= o.xmax + 1e-9; x += o.xstep) g += `<line class="gr" x1="${X(x)}" y1="${T}" x2="${X(x)}" y2="${T + ph}"/><text class="tk" x="${X(x)}" y="${T + ph + 15}" text-anchor="middle">${fmtn(x)}</text>`;
  for (let y = 0; y <= o.ymax + 1e-9; y += o.ystep) g += `<line class="gr" x1="${L}" y1="${Y(y)}" x2="${L + pw}" y2="${Y(y)}"/><text class="tk" x="${L - 6}" y="${(+Y(y) + 4).toFixed(1)}" text-anchor="end">${fmtn(y)}</text>`;
  g += `<line class="ax" x1="${L}" y1="${T + ph}" x2="${L + pw}" y2="${T + ph}"/><line class="ax" x1="${L}" y1="${T}" x2="${L}" y2="${T + ph}"/>`;
  g += `<text class="lb" x="${L + pw / 2}" y="${H - 6}" text-anchor="middle">${o.xlabel}</text><text class="lb" transform="translate(13 ${T + ph / 2}) rotate(-90)" text-anchor="middle">${o.ylabel}</text>`;
  (o.curves || []).forEach((c, i) => { g += `<polyline class="cv${i ? ' ln' + (i + 1) : ''}" points="${c.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}"/>`; });
  if (o.fit) g += `<line class="fit" x1="${X(o.fit[0][0])}" y1="${Y(o.fit[0][1])}" x2="${X(o.fit[1][0])}" y2="${Y(o.fit[1][1])}"/>`;
  (o.pts || []).forEach(p => { g += `<circle class="pt" cx="${X(p[0])}" cy="${Y(p[1])}" r="4.5"/>`; });
  if (o.marker) g += `<circle class="mk" id="${o.marker}" cx="${X(0)}" cy="${Y(0)}" r="6"/>`;
  const data = o.pts ? ` data-pts="${o.pts.map(p => p.join(',')).join(';')}"` : '';
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.alt || 'Diagramm'}"${data}>${g}</svg>`;
}
// Kleine Diagramme ohne Zahlen für Antwortmöglichkeiten
function mini(kind) {
  const L = 16, B = 78, W = 100, H = 64;
  const F = {
    lin: x => x, par: x => x * x, decel: x => 1 - (1 - x) * (1 - x), flat: () => 0.35,
    hor: () => 0.55, up: x => x, down: x => 1 - x,
    trap: x => (x < 0.25 ? x / 0.25 * 0.8 : x < 0.75 ? 0.8 : (1 - x) / 0.25 * 0.8),
    trapR: x => (x < 0.25 ? 0.8 - x / 0.25 * 0.8 : x < 0.75 ? 0 : (x - 0.75) / 0.25 * 0.8),
    tri: x => (x < 0.5 ? x * 1.6 : (1 - x) * 1.6)
  }[kind];
  const pts = []; for (let i = 0; i <= 20; i++) { const x = i / 20; pts.push((L + x * W).toFixed(1) + ',' + (B - F(x) * H).toFixed(1)); }
  return `<svg class="mini" viewBox="0 0 124 92" aria-hidden="true"><line class="ax" x1="${L}" y1="${B}" x2="${L + W + 4}" y2="${B}"/><line class="ax" x1="${L}" y1="${B + 4}" x2="${L}" y2="6"/><polyline class="cv" points="${pts.join(' ')}"/></svg>`;
}
const tbl = (head, rows) => `<table class="dtab"><tr><th>${head[0]}</th>${rows[0].map(c => `<td>${c}</td>`).join('')}</tr><tr><th>${head[1]}</th>${rows[1].map(c => `<td>${c}</td>`).join('')}</tr></table>`;

/* ---------- Inhalt: Bewegungen erkunden, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 'b1', nr: 1, title: 'Bewegungen beschreiben', sub: 'gleichförmig, beschleunigt, verzögert',
    items: [
      { id: 'b1-zug', topic: 'Beschleunigte Bewegung erkennen', make() {
        return mc('Ein Zug fährt aus dem Bahnhof und wird dabei immer schneller. Welche Bewegung ist das?', ['Eine beschleunigte Bewegung.', 'Eine gleichförmige Bewegung.', 'Eine verzögerte Bewegung.', 'Gar keine Bewegung, weil der Zug auf Schienen fährt.'],
          'Nimmt die Geschwindigkeit zu, ist die Bewegung beschleunigt.');
      } },
      { id: 'b1-bremsen', topic: 'Verzögerte Bewegung erkennen', make() {
        return mc('Ein Auto rollt auf eine rote Ampel zu und bremst bis zum Stillstand. Welche Bewegung ist das?', ['Eine verzögerte Bewegung.', 'Eine beschleunigte Bewegung.', 'Eine gleichförmige Bewegung.', 'Eine Bewegung ohne Geschwindigkeit.'],
          'Nimmt die Geschwindigkeit ab, ist die Bewegung verzögert.');
      } },
      { id: 'b1-velo', topic: 'Gleichförmige Bewegung erkennen', make() {
        return mc('Ein Velo fährt auf einer geraden, flachen Strasse mit gleichbleibenden 18 km/h. Welche Bewegung ist das?', ['Eine gleichförmige Bewegung.', 'Eine beschleunigte Bewegung.', 'Eine verzögerte Bewegung.', 'Eine Bewegung, die es nur im Labor gibt.'],
          'Bleibt die Geschwindigkeit gleich, ist die Bewegung gleichförmig.');
      } },
      { id: 'b1-kombi', topic: 'Bewegungen im Alltag', make() {
        return mc('Wie kommen die drei Bewegungsarten im Alltag meistens vor?', [
          'Meist kombiniert: erst beschleunigen, dann gleichförmig fahren, am Ende verzögern.',
          'Jede Bewegungsart kommt für sich allein vor.',
          'Es gibt im Alltag nur gleichförmige Bewegungen.',
          'Beschleunigte Bewegungen gibt es nur auf Achterbahnen.'],
          'Aus dem Stillstand muss man zuerst beschleunigen, bevor eine gleichförmige Bewegung möglich ist. Zum Anhalten wird verzögert. Im Alltag treten die Bewegungsarten darum meist nacheinander auf.');
      } },
      { id: 'b1-begriff', topic: 'Beschleunigung verstehen', make() {
        return mc('Was bedeutet «beschleunigt» in der Physik?', [
          'Die Geschwindigkeit nimmt in jeder Zeitspanne zu.',
          'Der Körper bewegt sich sehr schnell.',
          'Der Körper legt einen grossen Weg zurück.',
          'Die Geschwindigkeit bleibt gleich.'],
          'Beschleunigung und Geschwindigkeit sind nicht dasselbe. Eine Beschleunigung ist eine Zunahme der Geschwindigkeit pro Zeit. Ein Auto kann sehr schnell sein, ohne zu beschleunigen.');
      } },
      { id: 'b1-richtung', topic: 'Bewegungen beschreiben', make() {
        return mc('Womit lässt sich eine Bewegung beschreiben?', [
          'Mit der Richtung und der Geschwindigkeit.',
          'Nur mit der Masse des Körpers.',
          'Nur mit der Farbe des Körpers.',
          'Nur mit der Temperatur.'],
          'Zu einer Bewegung gehören die Richtung und die Geschwindigkeit. Ob sie gleichförmig, beschleunigt oder verzögert ist, sagt dir, wie sich die Geschwindigkeit ändert.');
      } }
    ]
  },
  {
    id: 'b2', nr: 2, title: 'Geschwindigkeit berechnen', sub: 'v = s : t',
    items: [
      { id: 'b2-v', topic: 'Geschwindigkeit berechnen', make() {
        const s = rnd([[60, 10], [100, 20], [150, 30], [200, 25], [90, 15], [120, 16]]); const v = s[0] / s[1];
        return num(`Ein Läufer legt ${fmt(s[0])} m in ${fmt(s[1])} s zurück. Wie gross ist seine Geschwindigkeit?`, 'm/s', v, 'Geschwindigkeit = Weg : Zeit.', `v = s : t = ${fmt(s[0])} m : ${fmt(s[1])} s = ${fmt(v)} m/s`);
      } },
      { id: 'b2-s', topic: 'Weg berechnen', make() {
        const s = rnd([[4, 12], [5, 20], [8, 15], [3, 40], [6, 25], [10, 9]]); const w = s[0] * s[1];
        return num(`Ein Velo fährt mit einer gleichbleibenden Geschwindigkeit von ${fmt(s[0])} m/s. Welchen Weg legt es in ${fmt(s[1])} s zurück?`, 'm', w, 'Stelle v = s : t nach s um: s = v · t.', `s = v · t = ${fmt(s[0])} m/s · ${fmt(s[1])} s = ${fmt(w)} m`);
      } },
      { id: 'b2-t', topic: 'Zeit berechnen', make() {
        const s = rnd([[100, 5], [60, 4], [150, 10], [120, 6], [90, 3], [200, 8]]); const t = s[0] / s[1];
        return num(`Eine Schülerin joggt mit ${fmt(s[1])} m/s. Wie lange braucht sie für ${fmt(s[0])} m?`, 's', t, 'Stelle v = s : t nach t um: t = s : v.', `t = s : v = ${fmt(s[0])} m : ${fmt(s[1])} m/s = ${fmt(t)} s`);
      } },
      { id: 'b2-vergleich', topic: 'Geschwindigkeiten vergleichen', make() {
        return mc('Jan braucht für 80 m 13 s. Marco braucht für 100 m 14,5 s. Wer war schneller?', [
          'Marco: Er hat etwa 6,9 m/s, Jan nur etwa 6,2 m/s.',
          'Jan, weil er weniger Zeit gebraucht hat.',
          'Beide gleich schnell.',
          'Das kann man nicht sagen, weil die Strecken verschieden sind.'],
          'Weg und Zeit sind verschieden, also rechnest du die Geschwindigkeiten aus. Jan: 80 m : 13 s ≈ 6,15 m/s. Marco: 100 m : 14,5 s ≈ 6,90 m/s. Marco ist schneller.');
      } },
      { id: 'b2-einheit', topic: 'Einheit der Geschwindigkeit', make() {
        return mc('Was bedeutet die Einheit km/h?', ['Kilometer pro Stunde (Kilometer geteilt durch Stunde).', 'Kilometer mal Stunde.', 'Kilogramm pro Stunde.', 'Kilometer plus Stunde.'],
          'km/h heisst «Kilometer pro Stunde», also km : h. Im Alltag sagt man oft «Stundenkilometer». Das kann zur falschen Vorstellung «km mal h» führen.');
      } },
      { id: 'b2-mittel', topic: 'Durchschnittsgeschwindigkeit', make() {
        const s = rnd([[36, 2], [45, 3], [60, 4], [30, 2], [90, 3], [24, 2]]); const v = s[0] / s[1];
        return num(`Lea fährt mit dem Velo ${fmt(s[0])} km in ${fmt(s[1])} h. Wie gross ist ihre Durchschnittsgeschwindigkeit?`, 'km/h', v, 'Durchschnittsgeschwindigkeit = gesamter Weg : gesamte Zeit.', `v = s : t = ${fmt(s[0])} km : ${fmt(s[1])} h = ${fmt(v)} km/h`);
      } }
    ]
  },
  {
    id: 'b3', nr: 3, title: 'Einheiten umrechnen', sub: 'm/s ↔ km/h: · 3,6',
    items: [
      { id: 'b3-kmh', topic: 'm/s in km/h umrechnen', make() {
        const v = rnd([5, 10, 15, 20, 25, 30]), k = v * 3.6;
        return num(`Ein Sprinter läuft mit ${fmt(v)} m/s. Wie viele km/h sind das?`, 'km/h', k, 'Von m/s zu km/h rechnest du mal 3,6.', `${fmt(v)} m/s · 3,6 = ${fmt(k)} km/h`);
      } },
      { id: 'b3-ms', topic: 'km/h in m/s umrechnen', make() {
        const v = rnd([5, 10, 15, 20, 25, 30]), k = v * 3.6;
        return num(`Ein Auto fährt mit ${fmt(k)} km/h. Wie viele m/s sind das?`, 'm/s', v, 'Von km/h zu m/s rechnest du geteilt durch 3,6.', `${fmt(k)} km/h : 3,6 = ${fmt(v)} m/s`);
      } },
      { id: 'b3-herleitung', topic: 'Warum 3,6?', make() {
        return mc('Warum rechnet man bei m/s und km/h mit dem Faktor 3,6?', [
          'Weil 1 m/s in einer Stunde 3600 m sind, das sind 3,6 km.',
          'Weil ein Meter 3,6 Zentimeter hat.',
          'Weil eine Stunde 36 Minuten hat.',
          'Das ist eine Regel ohne Begründung.'],
          'Bei 1 m/s legst du in 1 s einen Meter zurück. In einer Stunde (3600 s) sind das 3600 m, also 3,6 km. Darum gilt 1 m/s = 3,6 km/h.');
      } },
      { id: 'b3-tempo', topic: 'Geschwindigkeit messen und umrechnen', make() {
        const s = rnd([[40, 4], [100, 10], [150, 10], [200, 10], [30, 2], [100, 8]]); const v = s[0] / s[1], k = v * 3.6;
        return num(`Ein Auto legt ${fmt(s[0])} m in ${fmt(s[1])} s zurück. Wie schnell fährt es in km/h?`, 'km/h', k, 'Zuerst v in m/s berechnen, dann mal 3,6.', `v = ${fmt(s[0])} m : ${fmt(s[1])} s = ${fmt(v)} m/s<br>v = ${fmt(v)} m/s · 3,6 = ${fmt(k)} km/h`, { tolRel: 0.015 });
      } },
      { id: 'b3-schneller', topic: 'Einheiten vergleichen', make() {
        return mc('Was ist schneller: 20 m/s oder 60 km/h?', ['20 m/s (das sind 72 km/h).', '60 km/h (das sind etwa 17 m/s).', 'Beide sind gleich schnell.', 'Das lässt sich nicht vergleichen.'],
          'Rechne in dieselbe Einheit um: 20 m/s · 3,6 = 72 km/h. Das ist mehr als 60 km/h.');
      } },
      { id: 'b3-rasen', topic: 'Lohnt sich schnelleres Fahren?', ext: true, make() {
        const s = rnd([[30, 100, 120], [60, 100, 120], [60, 60, 120], [90, 90, 120], [50, 100, 125], [120, 100, 120]]);
        const d = (s[0] / s[1] - s[0] / s[2]) * 60;
        return num(`Du fährst eine Strecke von ${fmt(s[0])} km. Wie viele Minuten sparst du, wenn du mit ${fmt(s[2])} km/h statt mit ${fmt(s[1])} km/h fährst?`, 'min', d, 'Berechne beide Fahrzeiten mit t = s : v in Stunden, rechne in Minuten um und bilde die Differenz.',
          `t₁ = ${fmt(s[0])} km : ${fmt(s[1])} km/h = ${fmt(s[0] / s[1], 3)} h = ${fmt(s[0] / s[1] * 60)} min<br>t₂ = ${fmt(s[0])} km : ${fmt(s[2])} km/h = ${fmt(s[0] / s[2], 3)} h = ${fmt(s[0] / s[2] * 60)} min<br>Differenz: ${fmt(s[0] / s[1] * 60)} min − ${fmt(s[0] / s[2] * 60)} min = ${fmt(d)} min`);
      } }
    ]
  },
  {
    id: 'b4', nr: 4, title: 'Zeit-Weg-Diagramm', sub: 'Achsen, Punkte, Trendgerade',
    items: [
      { id: 'b4-ablesen', topic: 'Weg im Diagramm ablesen', make() {
        const v = rnd([2, 3, 4, 5]), ta = rnd([2, 3, 4, 5, 6]), pts = [0, 1, 2, 3, 4, 5, 6].map(t => [t, v * t]);
        const ch = chart({ xmax: 6, ymax: 30, xstep: 1, ystep: 5, xlabel: 'Zeit t in s', ylabel: 'Weg s in m', pts, curves: [pts], alt: 'Zeit-Weg-Diagramm einer Bewegung' });
        return num(`${ch}Das Diagramm zeigt die Bewegung eines Rollbretts. Wie weit ist es nach ${fmt(ta)} s gekommen?`, 'm', v * ta, `Suche ${ta} s auf der Zeitachse und gehe nach oben bis zum Punkt.`, `Bei t = ${fmt(ta)} s liegt der Punkt bei s = ${fmt(v * ta)} m.`);
      } },
      { id: 'b4-vdiagramm', topic: 'Geschwindigkeit aus dem Diagramm', make() {
        const v = rnd([2, 3, 4, 5]), pts = [0, 1, 2, 3, 4, 5, 6].map(t => [t, v * t]);
        const ch = chart({ xmax: 6, ymax: 30, xstep: 1, ystep: 5, xlabel: 'Zeit t in s', ylabel: 'Weg s in m', pts, curves: [pts], alt: 'Zeit-Weg-Diagramm einer gleichförmigen Bewegung' });
        return num(`${ch}Das Diagramm zeigt eine gleichförmige Bewegung. Wie gross ist die Geschwindigkeit?`, 'm/s', v, 'Lies einen Punkt ab, zum Beispiel bei t = 4 s, und rechne v = s : t.', `Bei t = 4 s ist s = ${fmt(v * 4)} m.<br>v = s : t = ${fmt(v * 4)} m : 4 s = ${fmt(v)} m/s`);
      } },
      { id: 'b4-achsen', topic: 'Achsen beschriften', make() {
        return mc('Welche Grösse trägst du bei einem Zeit-Weg-Diagramm auf der waagrechten Achse (x-Achse) ab?', ['Die Zeit t, beschriftet mit «Zeit t in s».', 'Den Weg s, beschriftet mit «Weg s in m».', 'Die Geschwindigkeit v.', 'Das ist egal, Hauptsache die Punkte stimmen.'],
          'Bei einem Zeit-Weg-Diagramm liegt die Zeit auf der x-Achse und der Weg auf der y-Achse. Beschriftet wird immer mit Grösse und Einheit, zum Beispiel «Weg s in m».');
      } },
      { id: 'b4-skala', topic: 'Achsen skalieren', make() {
        return mc('Deine Messwerte gehen bis 24 m. Welche Skala der Weg-Achse ist sinnvoll?', [
          '0, 5, 10, 15, 20, 25 (immer gleiche Abstände)',
          '0, 5, 10, 20, 25 (die 15 fehlt)',
          '0 und 24 (nur Anfang und Ende)',
          '1, 2, 4, 8, 16, 32'],
          'Eine Skala beginnt bei null, deckt alle Werte ab und hat immer gleich grosse Schritte. Sonst wird das Diagramm verzerrt.');
      } },
      { id: 'b4-wiederholung', topic: 'Messwiederholung', make() {
        return mc('Warum misst man eine Zeit mehrmals und bildet den Mittelwert?', [
          'Damit sich Messungenauigkeiten verringern.',
          'Weil die erste Messung immer falsch ist.',
          'Damit der Versuch länger dauert.',
          'Weil man den kleinsten Wert nehmen muss.'],
          'Messungenauigkeiten gibt es bei jeder Messung. Sie sind kein Zeichen dafür, dass etwas falsch gemacht wurde. Mit mehreren Messungen und dem Mittelwert wird das Ergebnis zuverlässiger.');
      } },
      { id: 'b4-mittelwert', topic: 'Mittelwert bilden', make() {
        const base = rnd([8, 9.5, 12, 14, 15.5]), dev = rnd([[-0.4, 0.1, 0.3], [-0.3, 0.2, 0.1], [0.5, -0.2, -0.3], [-0.6, 0.4, 0.2]]);
        const m = dev.map(d => Math.round((base + d) * 10) / 10);
        return num(`Drei Zeitmessungen für dieselbe Strecke: ${m.map(x => fmt(x, 1)).join(' s, ')} s. Wie gross ist der Mittelwert?`, 's', base, 'Addiere die drei Werte und teile durch 3.', `(${m.map(x => fmt(x, 1)).join(' + ')}) s : 3 = ${fmt(m[0] + m[1] + m[2], 1)} s : 3 = ${fmt(base, 1)} s`);
      } }
    ]
  },
  {
    id: 'b5', nr: 5, title: 'Gleichförmige Bewegung', sub: 'Gerade im s-t, waagrecht im v-t',
    items: [
      { id: 'b5-erkennen', topic: 'Zeit-Weg-Diagramm erkennen', make() {
        return mc('Welches Zeit-Weg-Diagramm gehört zu einer gleichförmigen Bewegung?', [mini('lin'), mini('par'), mini('flat'), mini('decel')],
          'Bei einer gleichförmigen Bewegung wächst der Weg in gleichen Zeiten um gleich viel. Im Zeit-Weg-Diagramm entsteht eine ansteigende Gerade.');
      } },
      { id: 'b5-vt', topic: 'Zeit-Geschwindigkeits-Diagramm', make() {
        return mc('Wie sieht das Zeit-Geschwindigkeits-Diagramm einer gleichförmigen Bewegung aus?', ['Eine waagrechte Linie.', 'Eine ansteigende Gerade.', 'Eine fallende Gerade.', 'Eine Kurve, die immer steiler wird.'],
          'Die Geschwindigkeit bleibt gleich. Darum zeigt das Zeit-Geschwindigkeits-Diagramm eine waagrechte Linie.');
      } },
      { id: 'b5-doppelt', topic: 'Steilheit der Geraden', make() {
        return mc('Ein zweiter Läufer ist doppelt so schnell wie der erste. Was gilt für seine Gerade im Zeit-Weg-Diagramm?', [
          'Sie ist steiler.', 'Sie ist flacher.', 'Sie ist gleich steil.', 'Sie ist keine Gerade mehr.'],
          'Je schneller, desto mehr Weg pro Sekunde. Die Gerade steigt also steiler an. Bei doppelter Geschwindigkeit ist sie doppelt so steil.');
      } },
      { id: 'b5-tabelle', topic: 'Bewegungsart aus Tabelle', make() {
        const v = rnd([2, 3, 5, 6, 8]);
        return mc(`${tbl(['Zeit t in s', 'Weg s in m'], [[0, 1, 2, 3, 4], [0, v, 2 * v, 3 * v, 4 * v]])}Welche Bewegungsart zeigt diese Tabelle?`, ['Eine gleichförmige Bewegung.', 'Eine beschleunigte Bewegung.', 'Eine verzögerte Bewegung.', 'Stillstand.'],
          `In jeder Sekunde nimmt der Weg um gleich viel zu (${fmt(v)} m). Das ist eine gleichförmige Bewegung.`);
      } },
      { id: 'b5-tabelle-v', topic: 'Geschwindigkeit aus Tabelle', make() {
        const v = rnd([2, 3, 4, 5, 6, 8]);
        return num(`${tbl(['Zeit t in s', 'Weg s in m'], [[0, 1, 2, 3, 4], [0, v, 2 * v, 3 * v, 4 * v]])}Die Tabelle zeigt eine gleichförmige Bewegung. Wie gross ist die Geschwindigkeit?`, 'm/s', v, 'Wähle eine Spalte, zum Beispiel t = 4 s, und rechne v = s : t.', `v = s : t = ${fmt(4 * v)} m : 4 s = ${fmt(v)} m/s`);
      } },
      { id: 'b5-halb', topic: 'Zweiter Läufer', ext: true, make() {
        const s = rnd([[4, 0.5, 5], [6, 0.5, 8], [8, 0.5, 10], [10, 0.5, 4], [4, 3, 5], [3, 3, 10], [5, 3, 4]]);
        const vb = s[0] * s[1], w = vb * s[2];
        return num(`Läufer A bewegt sich gleichförmig mit ${fmt(s[0])} m/s. Läufer B ist ${s[1] === 0.5 ? 'halb' : 'dreimal'} so schnell. Wie weit kommt B in ${fmt(s[2])} s?`, 'm', w, 'Berechne zuerst die Geschwindigkeit von B, dann s = v · t.',
          `v(B) = ${fmt(s[0])} m/s · ${fmt(s[1])} = ${fmt(vb)} m/s<br>s = v · t = ${fmt(vb)} m/s · ${fmt(s[2])} s = ${fmt(w)} m`);
      } }
    ]
  },
  {
    id: 'b6', nr: 6, title: 'Beschleunigt und verzögert', sub: 'Parabel, Gerade, flacher',
    items: [
      { id: 'b6-st', topic: 'Beschleunigung im Zeit-Weg-Diagramm', make() {
        return mc('Welches Zeit-Weg-Diagramm gehört zu einer beschleunigten Bewegung?', [mini('par'), mini('lin'), mini('decel'), mini('flat')],
          'Bei einer beschleunigten Bewegung legt der Körper in jeder Sekunde mehr Weg zurück. Die Kurve im Zeit-Weg-Diagramm wird immer steiler.');
      } },
      { id: 'b6-vt-beschl', topic: 'Beschleunigung im Zeit-Geschwindigkeits-Diagramm', make() {
        return mc('Wie sieht das Zeit-Geschwindigkeits-Diagramm einer beschleunigten Bewegung aus?', ['Eine ansteigende Gerade.', 'Eine waagrechte Linie.', 'Eine fallende Gerade.', 'Eine Kurve, die immer flacher wird.'],
          'Die Geschwindigkeit nimmt gleichmässig zu. Im Zeit-Geschwindigkeits-Diagramm entsteht eine ansteigende Gerade.');
      } },
      { id: 'b6-vt-verz', topic: 'Verzögerung im Zeit-Geschwindigkeits-Diagramm', make() {
        return mc('Wie sieht das Zeit-Geschwindigkeits-Diagramm einer verzögerten Bewegung aus?', ['Eine fallende Gerade.', 'Eine ansteigende Gerade.', 'Eine waagrechte Linie.', 'Eine Kurve, die immer steiler ansteigt.'],
          'Bei einer verzögerten Bewegung nimmt die Geschwindigkeit gleichmässig ab. Im Zeit-Geschwindigkeits-Diagramm fällt die Gerade.');
      } },
      { id: 'b6-tabelle', topic: 'Bewegungsart aus Zeit-Weg-Tabelle', make() {
        const b = rnd([0, 1]);
        const rows = b ? [[0, 1, 2, 3, 4], [0, 1, 4, 9, 16]] : [[0, 1, 2, 3, 4], [0, 7, 12, 15, 16]];
        return mc(`${tbl(['Zeit t in s', 'Weg s in m'], rows)}Welche Bewegungsart zeigt diese Tabelle?`, [b ? 'Eine beschleunigte Bewegung.' : 'Eine verzögerte Bewegung.', 'Eine gleichförmige Bewegung.', b ? 'Eine verzögerte Bewegung.' : 'Eine beschleunigte Bewegung.', 'Stillstand.'],
          b ? 'Der Weg pro Sekunde wird immer grösser: 1 m, 3 m, 5 m, 7 m. Das ist eine beschleunigte Bewegung.'
            : 'Der Weg pro Sekunde wird immer kleiner: 7 m, 5 m, 3 m, 1 m. Das ist eine verzögerte Bewegung.');
      } },
      { id: 'b6-geschichte', topic: 'Diagramm zu einer Geschichte', make() {
        return mc('Eine Velofahrerin fährt los, rollt dann mit gleichem Tempo und bremst zum Schluss bis zum Stillstand. Welches Zeit-Geschwindigkeits-Diagramm passt?', [mini('trap'), mini('trapR'), mini('tri'), mini('hor')],
          'Zuerst nimmt die Geschwindigkeit zu (ansteigend), dann bleibt sie gleich (waagrecht), am Ende nimmt sie ab (fallend). Das ergibt eine Form wie ein Trapez.');
      } },
      { id: 'b6-abstand', topic: 'Zwei-Sekunden-Regel', ext: true, make() {
        const v = rnd([36, 54, 72, 90, 108]), d = v / 3.6 * 2;
        return num(`Du fährst mit ${fmt(v)} km/h. Nach der Zwei-Sekunden-Regel soll dein Abstand zum Vorderfahrzeug so gross sein, wie du in 2 s zurücklegst. Wie viele Meter sind das?`, 'm', d, 'Rechne die Geschwindigkeit zuerst in m/s um (: 3,6) und multipliziere mit 2 s.',
          `v = ${fmt(v)} km/h : 3,6 = ${fmt(v / 3.6)} m/s<br>s = v · t = ${fmt(v / 3.6)} m/s · 2 s = ${fmt(d)} m`);
      } }
    ]
  }
];

/* ---------- Lerninhalt: Lektionskarten pro Station ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;
const tri = (top, l, r) => `<div class="tri" role="img" aria-label="Formeldreieck: oben ${top}, unten ${l} und ${r}"><div class="tri-top mono">${top}</div><div class="tri-row"><div class="mono">${l}</div><div class="mono">${r}</div></div></div>`;

const LESSONS = {
  b1: [
    { h: 'Bewegungen darstellen',
      body: `<p>Eine Bewegung kannst du auf verschiedene Arten festhalten:</p>
        <ul><li><b>Bewegungsprotokoll:</b> Du schreibst auf, wann du dich wohin bewegt hast.</li>
        <li><b>Bewegungsbild:</b> Du zeichnest den Weg auf einer Karte ein.</li>
        <li><b>Diagramm:</b> Du trägst Weg und Zeit in ein Koordinatensystem ein.</li></ul>
        <p>Ein Schrittzähler und ein Routenplaner helfen dir, die zurückgelegten Strecken zu prüfen. In den nächsten Stationen lernst du die Darstellung im Diagramm genauer kennen.</p>` },
    { h: 'Drei Arten von Bewegung',
      body: `<p>Du unterscheidest drei Bewegungsarten:</p>
        ${merk('<b>Gleichförmig:</b> Die Geschwindigkeit bleibt gleich.<br><b>Beschleunigt:</b> Die Geschwindigkeit nimmt zu.<br><b>Verzögert:</b> Die Geschwindigkeit nimmt ab.')}
        <p>Beispiele: Ein Zug, der aus dem Bahnhof fährt, ist beschleunigt. Ein Velo, das mit gleichem Tempo rollt, ist gleichförmig. Ein Auto, das an einer Ampel bremst, ist verzögert.</p>` },
    { h: 'Schau dir die Bewegungen an',
      body: '<p>Der Wagen fährt 5 Sekunden lang. Die Punkte zeigen, wo er nach 1, 2, 3, 4 und 5 Sekunden war. Vergleiche die Abstände der Punkte bei den drei Bewegungsarten.</p>', sim: 'cart' },
    { h: 'Im Alltag kommt alles zusammen',
      body: `<p>Im Alltag treten die drei Bewegungsarten selten allein auf. Ein Beispiel ist ein Veloparcours: Du startest aus dem Stillstand und beschleunigst. Dann rollst du mit ungefähr gleichem Tempo. Vor einer Kurve bremst du, deine Bewegung ist dann verzögert.</p>
        ${merk('Aus dem Stillstand muss man zuerst beschleunigen. Zum Anhalten wird verzögert.')}
        <p>Oft gibt es dazu keine einzige richtige Lösung: Es kommt darauf an, was die Fahrerin gerade macht (treten, rollen lassen, bremsen).</p>` },
    { h: 'Beschleunigung ist nicht Geschwindigkeit',
      body: `<p>Viele verwechseln die beiden Begriffe. Sie sind aber verschieden:</p>
        ${merk('<b>Geschwindigkeit:</b> wie schnell sich ein Körper bewegt.<br><b>Beschleunigung:</b> wie stark sich die Geschwindigkeit pro Zeit ändert.')}
        <p>Ein Zug kann mit 150 km/h gleichförmig fahren. Dann ist er schnell, aber nicht beschleunigt.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Zug fährt mit gleichbleibenden 150 km/h. Welche Aussage stimmt?',
        options: ['Er bewegt sich gleichförmig und ist nicht beschleunigt.', 'Er ist beschleunigt, weil er schnell ist.', 'Er ist verzögert, weil er lange fährt.', 'Er steht, weil er gleich schnell bleibt.'],
        explain: 'Bleibt die Geschwindigkeit gleich, ist die Bewegung gleichförmig, egal wie gross die Geschwindigkeit ist.' } }
  ],
  b2: [
    { h: 'Wie schnell?',
      body: `<p>Die Geschwindigkeit sagt, wie viel Weg ein Körper pro Zeit zurücklegt.</p>
        ${merk('<b><i>v</i> = <i>s</i> : <i>t</i></b><br>Geschwindigkeit = Weg : Zeit<br>Einheiten: m/s oder km/h')}
        <p>Das Formelzeichen <i>v</i> kommt vom lateinischen Wort <i>velocitas</i>, <i>s</i> von <i>spatium</i> (Weg) und <i>t</i> von <i>tempus</i> (Zeit). Formelzeichen schreibt man schräg, Einheiten gerade.</p>
        ${warnbox('Im Alltag sagt man «Stundenkilometer». Gemeint ist aber <b>Kilometer pro Stunde</b> (km : h), nicht km mal h.')}` },
    { h: 'Probiere es aus',
      body: '<p>Stelle Weg und Zeit ein. Der Läufer rennt die Strecke in der gewählten Zeit. Vergleiche die Geschwindigkeiten.</p>', sim: 'speed' },
    { h: 'Formeln umstellen',
      body: `<p>Mit dem Formeldreieck findest du die richtige Formel. Decke die gesuchte Grösse ab.</p>
        ${tri('s', 'v', 't')}
        <ul><li>Gesucht <i>v</i>: <i>v</i> = <i>s</i> : <i>t</i></li><li>Gesucht <i>s</i>: <i>s</i> = <i>v</i> · <i>t</i></li><li>Gesucht <i>t</i>: <i>t</i> = <i>s</i> : <i>v</i></li></ul>` },
    { h: 'Vorgerechnet: Wer ist schneller?', worked: {
      given: 'Jan braucht für 80 m 13 s. Marco braucht für 100 m 14,5 s. Wer war schneller?',
      steps: [['Beide Geschwindigkeiten berechnen', 'Weg und Zeit sind verschieden, darum vergleichst du die Geschwindigkeiten.'], ['Jan', 'v = 80 m : 13 s ≈ 6,15 m/s'], ['Marco', 'v = 100 m : 14,5 s ≈ 6,90 m/s'], ['Antwort', 'Marco war schneller.']] } },
    { h: 'Durchschnittsgeschwindigkeit',
      body: `<p>Meistens bewegt sich ein Körper nicht die ganze Zeit gleich schnell. Dann rechnest du mit dem gesamten Weg und der gesamten Zeit. Das Ergebnis ist die <b>Durchschnittsgeschwindigkeit</b>.</p>
        <p><b>Beispiel:</b> Lea fährt 36 km in 2 h.<br><i>v</i> = 36 km : 2 h = 18 km/h</p>
        <p>Ein Sprinter muss nach dem Start zuerst beschleunigen. Seine Höchstgeschwindigkeit ist deshalb grösser als seine Durchschnittsgeschwindigkeit über die ganze Strecke.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Läufer legt 100 m in 20 s zurück. Wie gross ist seine (durchschnittliche) Geschwindigkeit?',
        options: ['5 m/s', '0,2 m/s', '2000 m/s', '80 m/s'],
        explain: '<i>v</i> = <i>s</i> : <i>t</i> = 100 m : 20 s = 5 m/s.' } }
  ],
  b3: [
    { h: 'Zwei Einheiten, ein Faktor',
      body: `<p>Geschwindigkeiten gibt man in <b>m/s</b> oder in <b>km/h</b> an. Zwischen den beiden Einheiten rechnest du mit dem Faktor 3,6.</p>
        ${merk('m/s → km/h: <b>mal 3,6</b><br>km/h → m/s: <b>geteilt durch 3,6</b>')}
        <p>Warum? 1 m/s bedeutet 1 m pro Sekunde. In einer Stunde (3600 s) sind das 3600 m. 3600 m sind 3,6 km. Also gilt 1 m/s = 3,6 km/h.</p>` },
    { h: 'Rechne um',
      body: '<p>Schiebe den Regler und sieh dir dieselbe Geschwindigkeit in beiden Einheiten an. Tippe auf Beispiele aus dem Alltag.</p>', sim: 'convert3' },
    { h: 'Vorgerechnet: Tempo 30 oder 50?', worked: {
      given: 'Ein Auto legt auf einer geraden Strecke 50 m in 5 s zurück. Wie schnell fährt es in km/h?',
      steps: [['Geschwindigkeit in m/s', 'v = s : t = 50 m : 5 s = 10 m/s'], ['In km/h umrechnen', '10 m/s · 3,6 = 36 km/h'], ['Antwort', 'Das Auto fährt mit 36 km/h. Das ist mehr als Tempo 30.']] } },
    { h: 'Vorgerechnet: Lohnt sich das Rasen?', worked: {
      given: 'Eine Strecke ist 30 km lang. Wie viele Minuten sparst du, wenn du mit 120 km/h statt mit 100 km/h fährst?',
      steps: [['Fahrzeit bei 100 km/h', 't = s : v = 30 km : 100 km/h = 0,3 h = 18 min'], ['Fahrzeit bei 120 km/h', 't = 30 km : 120 km/h = 0,25 h = 15 min'], ['Differenz', '18 min − 15 min = 3 min'], ['Antwort', 'Du sparst nur 3 Minuten. Dafür steigt der Anhalteweg stark.']] } },
    { h: 'Kurz testen',
      check: { q: 'Ein Velo fährt mit 5 m/s. Wie viele km/h sind das?',
        options: ['18 km/h', '1,4 km/h', '5 km/h', '50 km/h'],
        explain: '5 m/s · 3,6 = 18 km/h.' } }
  ],
  b4: [
    { h: 'Messen und Messungenauigkeit',
      body: `<p>Wenn du eine Zeit mit der Stoppuhr misst, schwanken die Werte. Das ist normal und heisst <b>Messungenauigkeit</b>. Es bedeutet nicht, dass du etwas falsch gemacht hast.</p>
        ${merk('Messe mehrmals und bilde den <b>Mittelwert</b>: alle Werte addieren und durch die Anzahl der Messungen teilen. So wird das Ergebnis zuverlässiger.')}
        <p>Ursachen sind zum Beispiel deine Reaktionszeit beim Drücken der Stoppuhr oder ungenaues Ablesen.</p>` },
    { h: 'Wie sich Wiederholungen auswirken',
      body: '<p>Die Punkte zeigen Messwerte eines Läufers mit 2 m/s. Erhöhe die Zahl der Messwiederholungen und beobachte die Punkte. Die gestrichelte Linie ist die Trendgerade.</p>', sim: 'trend' },
    { h: 'So zeichnest du ein Zeit-Weg-Diagramm',
      body: `<p>Beachte diese Schritte:</p>
        <ol><li>Die <b>Zeit</b> kommt auf die waagrechte Achse (x-Achse), der <b>Weg</b> auf die senkrechte (y-Achse).</li>
        <li>Beschrifte beide Achsen mit Grösse und Einheit, zum Beispiel «Weg <i>s</i> in m».</li>
        <li>Wähle eine Skala, die bei 0 beginnt und alle Werte abdeckt. Die Schritte sind immer gleich gross.</li>
        <li>Trage die Punkte ein.</li>
        <li>Zeichne eine <b>Trendgerade</b>, die möglichst nahe an allen Punkten verläuft.</li></ol>` },
    { h: 'Vorgerechnet: Mittelwert', worked: {
      given: 'Du stoppst dreimal dieselbe Strecke: 12,1 s, 11,6 s und 12,3 s. Wie gross ist der Mittelwert?',
      steps: [['Werte addieren', '12,1 s + 11,6 s + 12,3 s = 36,0 s'], ['Durch die Anzahl teilen', '36,0 s : 3 = 12,0 s'], ['Antwort', 'Der Mittelwert beträgt 12,0 s.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was ist die richtige Beschriftung der Zeitachse in einem Zeit-Weg-Diagramm?',
        options: ['Zeit t in s', 'Zeit', 'Sekunden', 'x'],
        explain: 'Achsen werden mit Grösse und Einheit beschriftet, hier «Zeit t in s».' } }
  ],
  b5: [
    { h: 'Gleichförmig: gleiche Wege in gleichen Zeiten',
      body: `<p>Bei einer gleichförmigen Bewegung bleibt die Geschwindigkeit gleich. Der Körper legt in jeder Sekunde gleich viel Weg zurück.</p>
        ${merk('Zeit-Weg-Diagramm: eine <b>ansteigende Gerade</b>.<br>Zeit-Geschwindigkeits-Diagramm: eine <b>waagrechte Linie</b>.')}
        <p>Je schneller der Körper ist, desto steiler steigt die Gerade im Zeit-Weg-Diagramm.</p>` },
    { h: 'Zwei Läufer im Vergleich',
      body: '<p>Stelle die Geschwindigkeit von Läufer A und B ein. Beobachte, wie sich die Geraden unterscheiden.</p>', sim: 'twoRunners' },
    { h: 'Vorgerechnet: Geschwindigkeit aus einer Tabelle', worked: {
      given: 'Eine Tabelle zeigt: nach 1 s ist der Weg 5 m, nach 2 s 10 m, nach 3 s 15 m, nach 4 s 20 m. Welche Bewegung ist das und wie schnell ist sie?',
      steps: [['Wegzunahme pro Sekunde prüfen', 'Jede Sekunde kommen 5 m dazu. Die Wegzunahme ist immer gleich.'], ['Bewegungsart', 'Das ist eine gleichförmige Bewegung.'], ['Geschwindigkeit', 'v = s : t = 20 m : 4 s = 5 m/s'], ['Antwort', 'Gleichförmige Bewegung mit 5 m/s.']] } },
    { h: 'Woran erkennst du eine gleichförmige Bewegung?',
      body: `<p>Du kannst es auf drei Arten prüfen:</p>
        <ul><li><b>Tabelle:</b> Die Wegzunahme pro Sekunde ist immer gleich.</li>
        <li><b>Zeit-Weg-Diagramm:</b> Die Punkte liegen auf einer Geraden.</li>
        <li><b>Zeit-Geschwindigkeits-Diagramm:</b> Die Linie verläuft waagrecht.</li></ul>
        <p>Auch bei einem Zug oder Auto kannst du so prüfen, ob sie sich gleichförmig bewegen: Du misst die Zeit an gleich weit entfernten Punkten.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Ein Läufer ist halb so schnell wie ein anderer. Wie unterscheidet sich seine Gerade im Zeit-Weg-Diagramm?',
        options: ['Sie ist flacher.', 'Sie ist steiler.', 'Sie ist gleich steil.', 'Sie ist waagrecht.'],
        explain: 'Wer halb so schnell ist, legt pro Sekunde nur halb so viel Weg zurück. Seine Gerade steigt also flacher an.' } }
  ],
  b6: [
    { h: 'Beschleunigt: immer schneller',
      body: `<p>Bei einer beschleunigten Bewegung nimmt die Geschwindigkeit zu. In jeder Sekunde legt der Körper mehr Weg zurück als in der Sekunde davor.</p>
        ${merk('Zeit-Weg-Diagramm: eine Kurve, die <b>immer steiler</b> wird.<br>Zeit-Geschwindigkeits-Diagramm: eine <b>ansteigende Gerade</b>.')}` },
    { h: 'Verzögert: immer langsamer',
      body: `<p>Bei einer verzögerten Bewegung nimmt die Geschwindigkeit ab. In jeder Sekunde legt der Körper weniger Weg zurück.</p>
        ${merk('Zeit-Weg-Diagramm: eine Kurve, die <b>immer flacher</b> wird.<br>Zeit-Geschwindigkeits-Diagramm: eine <b>fallende Gerade</b>.')}
        <p>Eine verzögerte Bewegung gleicht einer beschleunigten Bewegung. Nur nimmt die Geschwindigkeit ab, statt zu.</p>` },
    { h: 'Vergleiche die drei Bewegungen',
      body: '<p>Wähle eine Bewegungsart und starte. Der Punkt wandert gleichzeitig durch beide Diagramme. Alle drei Bewegungen legen in 5 Sekunden 10 m zurück.</p>', sim: 'lab' },
    { h: 'Tabelle richtig lesen', worked: {
      given: 'Zeit-Weg-Tabelle: nach 1 s ist der Weg 1 m, nach 2 s 4 m, nach 3 s 9 m, nach 4 s 16 m. Welche Bewegungsart ist das?',
      steps: [['Wegzunahme pro Sekunde', '0 → 1 m: 1 m, 1 → 4 m: 3 m, 4 → 9 m: 5 m, 9 → 16 m: 7 m'], ['Vergleichen', 'Die Wegzunahme wird in jeder Sekunde grösser.'], ['Antwort', 'Das ist eine beschleunigte Bewegung.']] } },
    { h: 'Genügend Abstand im Strassenverkehr',
      body: `<p>Wer bremst, steht nicht sofort. Der Weg bis zum Stillstand setzt sich aus zwei Teilen zusammen:</p>
        ${merk('<b>Reaktionsweg:</b> der Weg, den das Fahrzeug zurücklegt, bis der Fahrer reagiert.<br><b>Bremsweg:</b> der Weg, den das Fahrzeug beim Bremsen zurücklegt (verzögerte Bewegung).')}
        <p>Als Faustregel gilt die <b>Zwei-Sekunden-Regel</b>: Halte so viel Abstand, wie du in 2 Sekunden zurücklegst.</p>
        <p><b>Beispiel:</b> Bei 72 km/h sind das 72 : 3,6 = 20 m/s. In 2 s legst du 40 m zurück. Der Abstand sollte also mindestens 40 m betragen.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Wie sieht das Zeit-Geschwindigkeits-Diagramm eines Autos aus, das gleichmässig bremst?',
        options: ['Eine fallende Gerade.', 'Eine ansteigende Gerade.', 'Eine waagrechte Linie.', 'Eine Kurve, die immer steiler ansteigt.'],
        explain: 'Beim gleichmässigen Bremsen nimmt die Geschwindigkeit gleichmässig ab. Die Gerade fällt.' } }
  ]
};
const lc = (id, h) => LESSONS[id].find(c => c.h === h);
const GOALS = {
  b1: ['gleichförmige, beschleunigte und verzögerte Bewegungen unterscheiden', 'Geschwindigkeit und Beschleunigung auseinanderhalten'],
  b2: ['die Geschwindigkeit mit v = s : t berechnen', 'Weg und Zeit bestimmen und Geschwindigkeiten vergleichen'],
  b3: ['zwischen m/s und km/h umrechnen', 'Geschwindigkeiten im Alltag einordnen'],
  b4: ['ein Zeit-Weg-Diagramm erstellen und ablesen', 'erklären, warum man Messungen wiederholt'],
  b5: ['gleichförmige Bewegungen in Diagrammen und Tabellen erkennen (NT.5.1.a)', 'die Steilheit der Geraden mit der Geschwindigkeit verbinden'],
  b6: ['beschleunigte und verzögerte Bewegungen in Diagrammen erkennen (NT.5.1.f)', 'Diagramme einer Geschichte zuordnen']
};
const LEARN = {
  'b1-zug': 'Drei Arten von Bewegung', 'b1-bremsen': 'Drei Arten von Bewegung', 'b1-velo': 'Drei Arten von Bewegung', 'b1-kombi': 'Im Alltag kommt alles zusammen', 'b1-begriff': 'Beschleunigung ist nicht Geschwindigkeit', 'b1-richtung': 'Bewegungen darstellen',
  'b2-v': 'Wie schnell?', 'b2-s': 'Formeln umstellen', 'b2-t': 'Formeln umstellen', 'b2-vergleich': 'Vorgerechnet: Wer ist schneller?', 'b2-einheit': 'Wie schnell?', 'b2-mittel': 'Durchschnittsgeschwindigkeit',
  'b3-kmh': 'Zwei Einheiten, ein Faktor', 'b3-ms': 'Zwei Einheiten, ein Faktor', 'b3-herleitung': 'Zwei Einheiten, ein Faktor', 'b3-tempo': 'Vorgerechnet: Tempo 30 oder 50?', 'b3-schneller': 'Zwei Einheiten, ein Faktor', 'b3-rasen': 'Vorgerechnet: Lohnt sich das Rasen?',
  'b4-ablesen': 'So zeichnest du ein Zeit-Weg-Diagramm', 'b4-vdiagramm': 'So zeichnest du ein Zeit-Weg-Diagramm', 'b4-achsen': 'So zeichnest du ein Zeit-Weg-Diagramm', 'b4-skala': 'So zeichnest du ein Zeit-Weg-Diagramm', 'b4-wiederholung': 'Messen und Messungenauigkeit', 'b4-mittelwert': 'Vorgerechnet: Mittelwert',
  'b5-erkennen': 'Gleichförmig: gleiche Wege in gleichen Zeiten', 'b5-vt': 'Gleichförmig: gleiche Wege in gleichen Zeiten', 'b5-doppelt': 'Zwei Läufer im Vergleich', 'b5-tabelle': 'Woran erkennst du eine gleichförmige Bewegung?', 'b5-tabelle-v': 'Vorgerechnet: Geschwindigkeit aus einer Tabelle', 'b5-halb': 'Zwei Läufer im Vergleich',
  'b6-st': 'Beschleunigt: immer schneller', 'b6-vt-beschl': 'Beschleunigt: immer schneller', 'b6-vt-verz': 'Verzögert: immer langsamer', 'b6-tabelle': 'Tabelle richtig lesen', 'b6-geschichte': 'Vergleiche die drei Bewegungen', 'b6-abstand': 'Genügend Abstand im Strassenverkehr'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Schnecke', pw: 'sehr langsam' },
  { xp: 80, name: 'Fussgänger', pw: 'ca. 5 km/h' },
  { xp: 200, name: 'Velo', pw: 'ca. 20 km/h' },
  { xp: 380, name: 'Auto', pw: 'ca. 50 km/h' },
  { xp: 620, name: 'Schnellzug', pw: 'ca. 200 km/h' },
  { xp: 920, name: 'Flugzeug', pw: 'ca. 900 km/h' }
];

/* ---------- Thema: Bewegungen erkunden ---------- */
const TOPIC = {
  id: 'nt7-4', storeKey: 'halingen-nt7-4-v1', other: { title: '7_1 Naturwissenschaften erkunden', href: '7_1_Naturwissenschaften_erkunden.html' },
  title: 'Bewegungen erkunden', lead: 'Wie schnell, wie gleichmässig, wie lange?', tag: 'Natur und Technik',
  tips: ['Beschleunigt heisst nicht schnell, sondern: immer schneller.', 'Zeit auf die x-Achse, Weg auf die y-Achse.'],
  formulas: [
    ['Geschwindigkeit', 'v = s : t', 's = v \u00B7 t,  t = s : v'],
    ['Umrechnen', 'm/s \u00B7 3,6 = km/h', 'km/h : 3,6 = m/s'],
    ['Mittelwert', '(Summe der Werte) : Anzahl', 'Messungen wiederholen'],
    ['Gleichförmig', 's-t: Gerade', 'v-t: waagrechte Linie'],
    ['Beschleunigt', 's-t: immer steiler', 'v-t: ansteigende Gerade'],
    ['Verzögert', 's-t: immer flacher', 'v-t: fallende Gerade'],
    ['Zwei-Sekunden-Regel', 'Abstand = v \u00B7 2 s', 'v in m/s']
  ]
};

/* ---------- Simulationen ---------- */
// Modelle für den Wagen (5 s, 10 m): gleichförmig, beschleunigt, verzögert
const MOVES = {
  g: { name: 'Gleichförmig', s: t => 2 * t, v: () => 2 },
  b: { name: 'Beschleunigt', s: t => 0.4 * t * t, v: t => 0.8 * t },
  z: { name: 'Verzögert', s: t => 4 * t - 0.4 * t * t, v: t => 4 - 0.8 * t }
};
const SIMS = {
  cart(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Bewegungsart">${Object.keys(MOVES).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-m="${k}">${MOVES[k].name}</button>`).join('')}</div>
      <div class="track" aria-hidden="true"><div class="marks" id="marks"></div><div class="car" id="car"></div></div>
      <button class="btn btn-primary sm" id="go">Start</button>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let m = 'g', raf = 0;
    function setMode(k) {
      m = k; cancelAnimationFrame(raf);
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === k));
      const mk = $id('marks'); mk.innerHTML = ''; const parts = [];
      for (let t = 1; t <= 5; t++) { const d = document.createElement('i'); d.style.left = (MOVES[k].s(t) / 10 * 100) + '%'; d.textContent = t; mk.appendChild(d); parts.push(fmt(MOVES[k].s(t) - MOVES[k].s(t - 1), 1)); }
      $id('car').style.left = '0%';
      $id('ro').innerHTML = `Weg pro Sekunde: <b>${parts.join(' m, ')} m</b><br>${k === 'g' ? 'Die Abstände sind gleich.' : k === 'b' ? 'Die Abstände werden grösser: immer schneller.' : 'Die Abstände werden kleiner: immer langsamer.'}`;
    }
    function run() {
      cancelAnimationFrame(raf); const t0 = performance.now(), car = $id('car');
      if (reduced()) { car.style.left = '100%'; return; }
      (function step(now) {
        if (!el.isConnected) return;
        const t = Math.min(5, (now - t0) / 800); car.style.left = (MOVES[m].s(t) / 10 * 100) + '%';
        if (t < 5) raf = requestAnimationFrame(step);
      })(t0);
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.m)));
    $id('go').addEventListener('click', run);
    setMode('g');
  },

  speed(el) {
    el.innerHTML = `<div class="sim"><div class="track" aria-hidden="true"><div class="car runner" id="car"></div></div>
      <div class="trio"><div><span class="k">Geschwindigkeit</span><b class="mono" id="o1"></b></div><div><span class="k">in km/h</span><b class="mono" id="o2"></b></div><div><span class="k">Zeit</span><b class="mono" id="o3"></b></div></div>
      ${sl('ws', 'Weg', 10, 200, 10, 100, 'm')}${sl('wt', 'Zeit', 2, 40, 2, 20, 's')}
      <button class="btn btn-primary sm" id="go">Läufer starten</button>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let raf = 0;
    function upd() {
      const s = +$id('ws').value, t = +$id('wt').value, v = s / t;
      $id('wsv').textContent = fmt(s); $id('wtv').textContent = fmt(t);
      $id('o1').textContent = fmt(v, 2) + ' m/s'; $id('o2').textContent = fmt(v * 3.6, 1) + ' km/h'; $id('o3').textContent = fmt(t) + ' s';
      $id('ro').innerHTML = `v = s : t = ${fmt(s)} m : ${fmt(t)} s = <b>${fmt(v, 2)} m/s</b>`;
    }
    function run() {
      cancelAnimationFrame(raf); const t = +$id('wt').value, t0 = performance.now(), car = $id('car');
      if (reduced()) { car.style.left = '100%'; return; }
      (function step(now) {
        if (!el.isConnected) return;
        const p = Math.min(1, (now - t0) / (t * 100)); car.style.left = (p * 100) + '%';
        if (p < 1) raf = requestAnimationFrame(step);
      })(t0);
    }
    $id('ws').addEventListener('input', upd); $id('wt').addEventListener('input', upd); $id('go').addEventListener('click', run);
    $id('car').style.left = '0%'; upd();
  },

  convert3(el) {
    const refs = [['Zu Fuss', 5], ['Velo', 20], ['Tempo 30', 30], ['Tempo 50', 50], ['Landstrasse', 80], ['Autobahn', 120]];
    el.innerHTML = `<div class="sim"><div class="trio"><div><span class="k">in m/s</span><b class="mono" id="c1"></b></div><div><span class="k">mal 3,6</span><b class="mono" id="c2">\u00B7 3,6</b></div><div><span class="k">in km/h</span><b class="mono" id="c3"></b></div></div>
      ${sl('cv', 'Geschwindigkeit', 0, 40, 0.1, 10, 'm/s')}
      <div class="chips" role="group" aria-label="Beispiele">${refs.map(r => `<button class="btn sm" data-k="${r[1]}">${r[0]}, ${r[1]} km/h</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const v = +$id('cv').value;
      $id('cvv').textContent = fmt(v, 1); $id('c1').textContent = fmt(v, 1) + ' m/s'; $id('c3').textContent = fmt(v * 3.6, 1) + ' km/h';
      $id('ro').innerHTML = `${fmt(v, 1)} m/s \u00B7 3,6 = <b>${fmt(v * 3.6, 1)} km/h</b><br>${fmt(v * 3.6, 1)} km/h : 3,6 = ${fmt(v, 1)} m/s`;
    }
    $id('cv').addEventListener('input', upd);
    el.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { $id('cv').value = (+b.dataset.k / 3.6).toFixed(1); upd(); }));
    upd();
  },

  trend(el) {
    const noise = [0.9, -1.2, 0.8, -0.6, 1.1, -0.9];
    el.innerHTML = `<div class="sim"><div id="tc"></div>
      <label class="chk"><input type="checkbox" id="fitc" checked> Trendgerade zeigen</label>
      ${sl('rep', 'Messwiederholungen', 1, 5, 1, 1, 'mal')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const n = +$id('rep').value, show = $id('fitc').checked;
      $id('repv').textContent = String(n);
      const pts = [1, 2, 3, 4, 5, 6].map(t => [t, Math.max(0, 2 * t + noise[t - 1] / Math.sqrt(n))]);
      const slope = pts.reduce((a, p) => a + p[0] * p[1], 0) / pts.reduce((a, p) => a + p[0] * p[0], 0);
      $id('tc').innerHTML = chart({ xmax: 6, ymax: 16, xstep: 1, ystep: 2, xlabel: 'Zeit t in s', ylabel: 'Weg s in m', pts, fit: show ? [[0, 0], [6, slope * 6]] : null, alt: 'Messpunkte mit Trendgerade' });
      $id('ro').innerHTML = `Aus der Trendgeraden: <i>v</i> ≈ <b>${fmt(slope, 2)} m/s</b> (der wahre Wert ist 2 m/s).<br>Mit mehr Wiederholungen liegen die Punkte näher an der Geraden.`;
    }
    $id('rep').addEventListener('input', upd); $id('fitc').addEventListener('change', upd);
    upd();
  },

  twoRunners(el) {
    el.innerHTML = `<div class="sim"><div id="rc"></div>
      <p class="small"><span class="lg a">A</span> violett &nbsp; <span class="lg b">B</span> rosa</p>
      ${sl('va', 'Geschwindigkeit A', 1, 8, 1, 4, 'm/s')}${sl('vb', 'Geschwindigkeit B', 1, 8, 1, 2, 'm/s')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const a = +$id('va').value, b = +$id('vb').value;
      $id('vav').textContent = String(a); $id('vbv').textContent = String(b);
      $id('rc').innerHTML = chart({ xmax: 10, ymax: 80, xstep: 2, ystep: 10, xlabel: 'Zeit t in s', ylabel: 'Weg s in m', curves: [[[0, 0], [10, a * 10]], [[0, 0], [10, b * 10]]], alt: 'Zeit-Weg-Diagramm zweier Läufer' });
      $id('ro').innerHTML = `A: ${a} m/s, B: ${b} m/s. ${b < a ? 'B ist langsamer, seine Gerade ist <b>flacher</b>.' : b > a ? 'B ist schneller, seine Gerade ist <b>steiler</b>.' : 'Beide sind gleich schnell, die Geraden liegen übereinander.'}`;
    }
    $id('va').addEventListener('input', upd); $id('vb').addEventListener('input', upd);
    upd();
  },

  lab(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Bewegungsart">${Object.keys(MOVES).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-m="${k}">${MOVES[k].name}</button>`).join('')}</div>
      <div class="track" aria-hidden="true"><div class="car" id="car"></div></div>
      <div id="lc"></div><button class="btn btn-primary sm" id="go">Start</button>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let m = 'g', raf = 0;
    const GX = t => 50 + t / 5 * 256, GY = (y, ym) => 14 + 154 - y / ym * 154;
    function setMode(k) {
      m = k; cancelAnimationFrame(raf);
      el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === k));
      const ts = []; for (let t = 0; t <= 5.0001; t += 0.25) ts.push(t);
      $id('lc').innerHTML = chart({ xmax: 5, ymax: 10, xstep: 1, ystep: 2, xlabel: 'Zeit t in s', ylabel: 'Weg s in m', curves: [ts.map(t => [t, MOVES[k].s(t)])], marker: 'm1', alt: 'Zeit-Weg-Diagramm' })
        + chart({ xmax: 5, ymax: 4, xstep: 1, ystep: 1, xlabel: 'Zeit t in s', ylabel: 'Geschwindigkeit v in m/s', curves: [ts.map(t => [t, MOVES[k].v(t)])], marker: 'm2', alt: 'Zeit-Geschwindigkeits-Diagramm' });
      $id('car').style.left = '0%';
      $id('ro').innerHTML = k === 'g' ? 'Zeit-Weg: <b>Gerade</b>. Zeit-Geschwindigkeits: <b>waagrechte Linie</b>.' : k === 'b' ? 'Zeit-Weg: Kurve, die <b>immer steiler</b> wird. Zeit-Geschwindigkeits: <b>ansteigende Gerade</b>.' : 'Zeit-Weg: Kurve, die <b>immer flacher</b> wird. Zeit-Geschwindigkeits: <b>fallende Gerade</b>.';
    }
    function mark(t) {
      const a = $id('m1'), b = $id('m2');
      if (a) { a.setAttribute('cx', GX(t)); a.setAttribute('cy', GY(MOVES[m].s(t), 10)); }
      if (b) { b.setAttribute('cx', GX(t)); b.setAttribute('cy', GY(MOVES[m].v(t), 4)); }
      $id('car').style.left = (MOVES[m].s(t) / 10 * 100) + '%';
    }
    function run() {
      cancelAnimationFrame(raf); const t0 = performance.now();
      if (reduced()) { mark(5); return; }
      (function step(now) {
        if (!el.isConnected) return;
        const t = Math.min(5, (now - t0) / 800); mark(t);
        if (t < 5) raf = requestAnimationFrame(step);
      })(t0);
    }
    el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.m)));
    $id('go').addEventListener('click', run);
    setMode('g');
  }
};


const INTERVALS = [0, 1, 3, 7, 14]; // Tage bis zur nächsten Wiederholung je Box
const ROUND_SIZE = 6;

/* ---------- Interaktive Simulationen (nur Geometrie, keine Illustrationen) ---------- */
const $id = id => document.getElementById(id);
const nextFrame = f => requestAnimationFrame(() => requestAnimationFrame(f));
const nf = (host, f) => nextFrame(() => { if (host.isConnected) f(); });
const reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const sl = (id, label, min, max, step, val, unit) =>
  `<label class="sl"><span class="sll">${label}: <b class="mono" id="${id}v"></b> ${unit}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
const brow = (name, id, vid) =>
  `<div class="brow"><span class="bname">${name}</span><div class="btrack"><div class="bfill" id="${id}"></div></div><b class="mono bval" id="${vid}"></b></div>`;
// Zahl weich hochzählen lassen
function tween(from, to, ms, cb) {
  if (reduced() || from === to) { cb(to); return; }
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / ms);
    cb(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-4","titel":"Bewegungen erkunden","kapitel":"NaTech 7, Kapitel 4","audio":"nt7-4"});
