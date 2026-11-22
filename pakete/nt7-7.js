// AUTOMATISCH ERZEUGT mit werkzeuge/naturalia-import.mjs aus fantasy-lernapp/src/chapters/nt7-7.js
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
const NICK_A = ['Runen', 'Sternen', 'Nebel', 'Donner', 'Silber', 'Glut', 'Mond', 'Frost', 'Schatten', 'Kristall'];
const NICK_B = ['Greif', 'Drache', 'Phönix', 'Einhorn', 'Wolf', 'Rabe', 'Eule', 'Golem'];
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


/* ---------- Inhalt: 7_7 Chemische Reaktionen untersuchen, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const STATIONS = [
  {
    id: 'c1', nr: 1, title: 'Chemische Reaktion oder nicht?', sub: 'Ausgangsstoffe und Produkte',
    items: [
      { id: 'c1-ei', topic: 'Chemische Reaktion erkennen', make() {
        return mc('Welcher Vorgang ist eine chemische Reaktion?', ['Ein Spiegelei braten.', 'Schokolade schmelzen.', 'Wasser gefrieren lassen.', 'Wachs schmelzen.'],
          'Beim Braten verändert sich das Eiweiss dauerhaft: Es entstehen neue Stoffe mit anderen Eigenschaften. Schmelzen und Gefrieren sind nur Änderungen des Aggregatzustands. Dabei bleibt der Stoff derselbe.');
      } },
      { id: 'c1-merkmal', topic: 'Merkmal einer Reaktion', make() {
        return mc('Woran erkennst du eine chemische Reaktion?', ['Es entstehen neue Stoffe mit anderen Eigenschaften.', 'Der Stoff wird nur kälter oder wärmer.', 'Der Stoff ändert nur seine Form.', 'Der Stoff wird in Wasser aufgelöst.'],
          'Bei einer chemischen Reaktion werden aus Ausgangsstoffen Produkte mit neuen Eigenschaften. Das Auflösen eines Salzes in Wasser oder eine Änderung des Aggregatzustands sind keine chemischen Reaktionen.');
      } },
      { id: 'c1-feuer', topic: 'Was ist Feuer?', make() {
        return mc('Was ist das Feuer einer brennenden Kerze?', ['Kein Stoff. Es zeigt, dass chemische Energie in thermische Energie und Strahlungsenergie umgewandelt wird.', 'Ein neuer Stoff, der bei der Reaktion entsteht.', 'Ein Gas, das aus dem Docht kommt.', 'Ein Ausgangsstoff der Reaktion.'],
          'Feuer ist kein Stoff. Es ist ein Zeichen dafür, dass bei der Reaktion Energie umgewandelt wird, hier in thermische Energie und Strahlungsenergie.');
      } },
      { id: 'c1-schema', topic: 'Reaktionsschema', make() {
        return mc('Welches Reaktionsschema passt zum Brennen einer Kerze?', ['Wachs und Sauerstoff werden zu Kohlenstoffdioxid und Wasser (Wasserdampf).', 'Kohlenstoffdioxid und Wasser werden zu Wachs und Sauerstoff.', 'Wachs wird zu Wachs.', 'Sauerstoff wird zu Feuer.'],
          'Im Reaktionsschema stehen links die Ausgangsstoffe, rechts die Produkte: Wachs und Sauerstoff → Kohlenstoffdioxid und Wasser. Die Energie wird als Wärme und Licht abgegeben.');
      } },
      { id: 'c1-holz', topic: 'Ausgangsstoffe beim Verbrennen', make() {
        return mc('Holz verbrennt im Ofen. Welche Ausgangsstoffe reagieren?', ['Holz und Sauerstoff aus der Luft.', 'Nur Holz.', 'Holz und Stickstoff.', 'Nur Sauerstoff.'],
          'Zum Verbrennen braucht es Holz und Sauerstoff aus der Luft. Das ist ein Grund, warum ein Feuer ohne Luftzufuhr erlischt.');
      } },
      { id: 'c1-kalk', topic: 'Kalk entfernen', make() {
        return mc('Du entfernst Kalk mit Essig. Was für ein Vorgang ist das?', ['Eine chemische Reaktion: Kalk und Essig reagieren zu neuen Stoffen.', 'Nur ein Lösungsvorgang ohne neue Stoffe.', 'Ein Schmelzvorgang.', 'Ein Gefriervorgang.'],
          'Kalk und Essig reagieren miteinander. Dabei entstehen neue Stoffe, zum Beispiel ein Gas, das du als Bläschen siehst. Die Kalkablagerung selbst entsteht durch physikalisch-chemische Prozesse.');
      } }
    ]
  },
  {
    id: 'c2', nr: 2, title: 'Eigenschaften und Massenerhaltung', sub: 'Aktivierung, Tempo, Energie, retour',
    items: [
      { id: 'c2-masse', topic: 'Masse der Produkte', make() {
        const s = rnd([[24, 16], [2, 16], [12, 32], [40, 16], [4, 32], [6, 16]]), p = s[0] + s[1];
        return num(`Bei einer chemischen Reaktion reagieren ${fmt(s[0])} g von Stoff A mit ${fmt(s[1])} g von Stoff B. Alle Stoffe bleiben im geschlossenen Gefäss. Wie viel Masse haben die Produkte zusammen?`, 'g', p, 'Bei chemischen Reaktionen geht keine Masse verloren. Die Masse der Produkte ist so gross wie die der Ausgangsstoffe.', `${fmt(s[0])} g + ${fmt(s[1])} g = ${fmt(p)} g`);
      } },
      { id: 'c2-fehlt', topic: 'Fehlende Masse', ext: true, make() {
        const s = rnd([[44, 12], [40, 24], [18, 2], [56, 40], [36, 4], [30, 6]]), f = s[0] - s[1];
        return num(`Bei einer Reaktion entstehen ${fmt(s[0])} g Produkt. Ein Ausgangsstoff hatte ${fmt(s[1])} g. Wie viel Masse hatte der andere Ausgangsstoff?`, 'g', f, 'Die Masse aller Ausgangsstoffe ist gleich der Masse der Produkte. Ziehe die bekannte Masse ab.', `${fmt(s[0])} g − ${fmt(s[1])} g = ${fmt(f)} g`);
      } },
      { id: 'c2-erhalt', topic: 'Massenerhaltung', make() {
        return mc('Was gilt bei einer chemischen Reaktion im abgeschlossenen System?', ['Die Masse aller Ausgangsstoffe ist gleich der Masse aller Produkte.', 'Die Produkte sind immer leichter.', 'Die Produkte sind immer schwerer.', 'Es gehen Teilchen verloren.'],
          'Bei einer chemischen Reaktion gehen keine Teilchen verloren. Sie ordnen sich neu an. Darum bleibt die Gesamtmasse gleich, solange nichts aus dem System entweicht oder hinzukommt.');
      } },
      { id: 'c2-eisen', topic: 'Eisenwolle verbrennt', make() {
        return mc('Eisenwolle verbrennt auf einer Waage und ist danach schwerer. Wie erklärst du das?', ['Sauerstoff aus der Luft hat sich mit dem Eisen verbunden und trägt zur Masse des Produkts bei.', 'Beim Verbrennen entsteht Masse aus dem Nichts.', 'Das Eisen hat Wasser aufgenommen.', 'Die Waage ist kaputt.'],
          'Der Sauerstoff war vor der Reaktion in der Luft und belastete beide Waagschalen gleich. Nach der Reaktion ist er im Produkt Eisenoxid gebunden und wiegt dort mit.');
      } },
      { id: 'c2-eigenschaften', topic: 'Vier Eigenschaften', make() {
        return mc('Welche vier Eigenschaften beschreiben eine chemische Reaktion?', ['Aktivierung, Geschwindigkeit, Energiebilanz und Umkehrbarkeit.', 'Farbe, Geruch, Preis und Gewicht.', 'Name, Alter, Ort und Zeit.', 'Hitze, Kälte, Licht und Dunkelheit.'],
          'Eine Reaktion läuft von selbst (spontan) oder muss gestartet werden (initiiert), sie ist schnell oder langsam, sie gibt Energie ab oder benötigt Energie und sie ist einfach oder retour (umkehrbar).');
      } },
      { id: 'c2-holz', topic: 'Wohin ist das Holz?', make() {
        return mc('Beim Verbrennen von Holz bleibt nur wenig leichte Asche übrig. Wo ist der Rest?', ['Zum grossen Teil als Gase, zum Beispiel Kohlenstoffdioxid, in der Luft.', 'Er ist verschwunden.', 'Er ist in den Boden gesickert.', 'Er hat sich in Wärme verwandelt und wiegt nichts.'],
          'Aus dem schwarzen Feststoff Kohlenstoff wird das unsichtbare Gas Kohlenstoffdioxid. Es entweicht aus dem offenen System. Würdest du alles auffangen, wäre die Masse gleich geblieben.');
      } }
    ]
  },
  {
    id: 'c3', nr: 3, title: 'Energie bei chemischen Reaktionen', sub: 'Würfelmodell und Aktivierungsenergie',
    items: [
      { id: 'c3-aktiv', topic: 'Spontan oder initiiert', make() {
        return mc('Eisen rostet von selbst. Ein Streichholz muss zuerst angerieben werden. Wie nennt man diese Unterschiede?', ['Rosten ist spontan, das Streichholz brennt nach dem Anreiben, weil die Reaktion initiiert wird.', 'Beide Reaktionen sind spontan.', 'Beide Reaktionen sind initiiert.', 'Streichhölzer reagieren nicht.'],
          'Eine Reaktion ist spontan, wenn sie von selbst startet. Initiiert heisst: Sie braucht einen Anstoss, die Aktivierungsenergie, zum Beispiel Reibung oder eine Flamme.');
      } },
      { id: 'c3-abgeben', topic: 'Energie abgeben', make() {
        const s = rnd([[8, 5], [10, 6], [9, 4], [12, 7], [7, 3], [6, 2]]), d = s[0] - s[1];
        return num(`Bei einer Reaktion haben die Ausgangsstoffe ${fmt(s[0])} Energiewürfel chemische Energie und die Produkte ${fmt(s[1])} Würfel. Die übrigen Würfel gehen an die Umgebung. Wie viele Würfel gibt die Reaktion ab?`, 'Würfel', d, 'Die Gesamtzahl der Würfel bleibt gleich. Was die Produkte weniger haben, geht an die Umgebung.', `${fmt(s[0])} − ${fmt(s[1])} = ${fmt(d)} Würfel werden an die Umgebung abgegeben.`);
      } },
      { id: 'c3-aufnehmen', topic: 'Energie benötigen', ext: true, make() {
        const s = rnd([[4, 7], [5, 8], [3, 6], [6, 9], [2, 5], [4, 6]]), d = s[1] - s[0];
        return num(`Die Ausgangsstoffe haben ${fmt(s[0])} Energiewürfel chemische Energie, die Produkte ${fmt(s[1])} Würfel. Wie viele Würfel muss die Reaktion aus der Umgebung aufnehmen?`, 'Würfel', d, 'Die Produkte haben mehr Würfel. Der Unterschied kommt aus der Umgebung.', `${fmt(s[1])} − ${fmt(s[0])} = ${fmt(d)} Würfel werden aufgenommen.`);
      } },
      { id: 'c3-wachs', topic: 'Kerzenflamme', make() {
        return mc('Eine Kerze brennt. Welcher Vorgang ist nur eine physikalische Änderung?', ['Das Schmelzen des Wachses.', 'Das Verbrennen des Wachsdampfs.', 'Das Entstehen von Kohlenstoffdioxid.', 'Das Abgeben von Licht und Wärme durch die Reaktion.'],
          'Wachs schmilzt, ohne dass sich der Stoff ändert. Das ist nur ein Wechsel des Aggregatzustands. Erst der Wachsdampf verbrennt in einer chemischen Reaktion mit Sauerstoff.');
      } },
      { id: 'c3-kupfer', topic: 'Kupferblech im Feuer', make() {
        return mc('Ein Kupferblech wird in der Flamme erhitzt und dunkel. Was ist passiert?', ['Kupfer hat mit Sauerstoff aus der Luft zu Kupferoxid reagiert.', 'Das Kupfer ist geschmolzen.', 'Das Kupfer hat Wasser aufgenommen.', 'Das Kupfer ist nur schmutzig geworden.'],
          'Der dunkle Belag ist ein neuer Stoff: Kupferoxid. Er entsteht aus Kupfer und Sauerstoff.');
      } },
      { id: 'c3-kschema', topic: 'Reaktionsschema Kupfer', make() {
        return mc('Welches Reaktionsschema beschreibt das Erhitzen von Kupfer an der Luft?', ['Kupfer und Sauerstoff werden zu Kupferoxid.', 'Kupferoxid wird zu Kupfer und Wasser.', 'Kupfer wird zu Gold.', 'Sauerstoff und Wasser werden zu Kupfer.'],
          'Links stehen die Ausgangsstoffe Kupfer und Sauerstoff, rechts das Produkt Kupferoxid. Die Reaktion muss gestartet werden (initiiert) und läuft schnell.');
      } }
    ]
  },
  {
    id: 'c4', nr: 4, title: 'Fotosynthese', sub: 'Aus Licht wird chemische Energie',
    items: [
      { id: 'c4-atmung', topic: 'Pflanzen atmen auch', make() {
        return mc('Welche Aussage über Pflanzen stimmt?', ['Pflanzen betreiben Fotosynthese und atmen zusätzlich wie alle Lebewesen.', 'Pflanzen atmen nicht, sie betreiben nur Fotosynthese.', 'Pflanzen ernähren sich nur aus dem Boden.', 'Pflanzen brauchen weder Licht noch Luft.'],
          'Pflanzen atmen und betreiben Fotosynthese. Die Fotosynthese braucht Licht, die Atmung läuft immer. Ihre Nährstoffe stellen sie selbst her.');
      } },
      { id: 'c4-schema', topic: 'Reaktionsschema Fotosynthese', make() {
        return mc('Welches Reaktionsschema beschreibt die Fotosynthese?', ['Kohlenstoffdioxid und Wasser werden mit Licht zu Traubenzucker und Sauerstoff.', 'Traubenzucker und Sauerstoff werden zu Kohlenstoffdioxid und Wasser.', 'Wasser wird zu Sauerstoff.', 'Sauerstoff und Licht werden zu Wasser.'],
          'Die Ausgangsstoffe sind Kohlenstoffdioxid und Wasser. Mit Strahlungsenergie entstehen Traubenzucker (chemische Energie) und Sauerstoff.');
      } },
      { id: 'c4-energie', topic: 'Energieumwandlung', make() {
        return mc('Welche Energieumwandlung geschieht bei der Fotosynthese?', ['Strahlungsenergie wird in chemische Energie umgewandelt.', 'Chemische Energie wird in Strahlungsenergie umgewandelt.', 'Bewegungsenergie wird in Lageenergie umgewandelt.', 'Schallenergie wird in elektrische Energie umgewandelt.'],
          'Die Pflanze speichert die Energie des Lichts in Traubenzucker. Darum ist die Sonne die wichtigste Energiequelle fast aller Lebewesen.');
      } },
      { id: 'c4-blasen', topic: 'Wasserpest im Mineralwasser', make() {
        return mc('Wasserpest bildet in Mineralwasser mehr Bläschen als in abgekochtem Wasser. Wie erklärst du das?', ['Mineralwasser enthält mehr Kohlenstoffdioxid, einen Ausgangsstoff der Fotosynthese.', 'Mineralwasser enthält mehr Sauerstoff.', 'Abgekochtes Wasser ist zu warm.', 'Die Wasserpest braucht Salz.'],
          'Ohne Kohlenstoffdioxid kann die Fotosynthese kaum ablaufen. Die Bläschen sind Sauerstoff, ein Produkt der Fotosynthese. Mehr Bläschen heisst: Die Fotosynthese läuft stärker.');
      } },
      { id: 'c4-minute', topic: 'Bläschen pro Minute', make() {
        const s = rnd([[30, 5], [24, 4], [45, 5], [18, 3], [60, 6], [50, 10]]), r = s[0] / s[1];
        return num(`An einer Wasserpest siehst du in ${fmt(s[1])} Minuten ${fmt(s[0])} Bläschen aufsteigen. Wie viele Bläschen sind das pro Minute?`, 'pro min', r, 'Teile die Anzahl der Bläschen durch die Zeit.', `${fmt(s[0])} : ${fmt(s[1])} = ${fmt(r)} Bläschen pro Minute`);
      } },
      { id: 'c4-diff', topic: 'Vergleich der Wasserqualitäten', ext: true, make() {
        const s = rnd([[24, 15], [30, 12], [28, 9], [36, 18], [20, 11], [32, 14]]), d = s[0] - s[1];
        return num(`In Mineralwasser bildet die Wasserpest ${fmt(s[0])} Bläschen pro Minute, in Leitungswasser ${fmt(s[1])}. Wie viele Bläschen mehr sind es im Mineralwasser?`, 'pro min', d, 'Ziehe die kleinere von der grösseren Zahl ab.', `${fmt(s[0])} − ${fmt(s[1])} = ${fmt(d)} Bläschen pro Minute mehr`);
      } }
    ]
  },
  {
    id: 'c5', nr: 5, title: 'Elemente und Verbindungen', sub: 'Atome nach Dalton',
    items: [
      { id: 'c5-element', topic: 'Was ist ein Element?', make() {
        return mc('Was ist ein Element?', ['Ein Reinstoff, der nur aus Atomen einer Sorte besteht.', 'Feuer, Wasser, Erde oder Luft.', 'Ein Gemisch aus mehreren Stoffen.', 'Ein Stoff, der immer ein Gas ist.'],
          'In der Chemie ist ein Element ein Stoff aus Atomen einer einzigen Sorte, zum Beispiel Sauerstoff oder Eisen. Die vier «Elemente» der alten Griechen sind keine Elemente im heutigen Sinn.');
      } },
      { id: 'c5-verb', topic: 'Was ist eine Verbindung?', make() {
        return mc('Was ist eine Verbindung?', ['Ein Reinstoff aus Atomen verschiedener Elemente, zum Beispiel Wasser.', 'Ein Stoff aus gleichen Atomen.', 'Ein Gemisch, das man filtern kann.', 'Ein Stoff, der nur aus Metallen besteht.'],
          'In einer Verbindung sind Atome verschiedener Elemente fest verbunden. Wasser besteht aus Wasserstoff und Sauerstoff, Kochsalz aus Natrium und Chlor.');
      } },
      { id: 'c5-ordnen', topic: 'Element erkennen', make() {
        return mc('Welcher dieser Stoffe ist ein Element?', ['Sauerstoff.', 'Wasser.', 'Kochsalz.', 'Kohlenstoffdioxid.'],
          'Sauerstoff besteht nur aus Sauerstoffatomen. Wasser, Kochsalz und Kohlenstoffdioxid bestehen aus Atomen verschiedener Elemente und sind Verbindungen.');
      } },
      { id: 'c5-dalton', topic: 'Daltons Atommodell', make() {
        return mc('Was besagt das Atommodell von Dalton?', ['Stoffe bestehen aus Atomen. Atome eines Elements sind gleich, Atome verschiedener Elemente unterscheiden sich, zum Beispiel in der Masse.', 'Atome sind beliebig teilbar und alle gleich.', 'Es gibt nur ein einziges Element.', 'Atome entstehen und verschwinden bei Reaktionen.'],
          'In Daltons Modell sind Atome die kleinsten Teilchen eines Elements. Bei Reaktionen ordnen sie sich neu an, aber sie gehen nicht verloren.');
      } },
      { id: 'c5-wasser', topic: 'Atome in Wassermolekülen', make() {
        const n = rnd([2, 3, 4, 5, 10, 20]), a = 3 * n;
        return num(`Ein Wassermolekül besteht aus 2 Wasserstoffatomen und 1 Sauerstoffatom. Wie viele Atome haben ${fmt(n)} Wassermoleküle zusammen?`, 'Atome', a, 'Zähle zuerst die Atome in einem Molekül und multipliziere mit der Anzahl.', `Ein Molekül: 2 + 1 = 3 Atome<br>${fmt(n)} · 3 = ${fmt(a)} Atome`);
      } },
      { id: 'c5-co2', topic: 'Atome in Kohlenstoffdioxid', ext: true, make() {
        const n = rnd([2, 3, 4, 5, 10, 25]), a = 2 * n;
        return num(`Ein Kohlenstoffdioxid-Molekül besteht aus 1 Kohlenstoffatom und 2 Sauerstoffatomen. Wie viele Sauerstoffatome stecken in ${fmt(n)} solchen Molekülen?`, 'Atome', a, 'Pro Molekül sind es 2 Sauerstoffatome.', `${fmt(n)} · 2 = ${fmt(a)} Sauerstoffatome`);
      } }
    ]
  },
  {
    id: 'c6', nr: 6, title: 'Das Periodensystem', sub: 'Ordnung der Elemente',
    items: [
      { id: 'c6-ordnung', topic: 'Aufbau des PSE', make() {
        return mc('Nach welchen Prinzipien ist das Periodensystem der Elemente aufgebaut?', ['Nach der Masse der Atome und nach gleichen Eigenschaften der Elemente.', 'Nach der Farbe der Elemente.', 'Nach dem Alphabet der Namen.', 'Nach dem Entdeckungsjahr allein.'],
          'Mendelejew und Meyer ordneten die Elemente nach steigender Masse. Elemente mit ähnlichen Eigenschaften kamen untereinander in dieselbe Gruppe.');
      } },
      { id: 'c6-gallium', topic: 'Mendelejews Vorhersage', make() {
        return mc('Was war an Mendelejews Periodensystem besonders?', ['Er sagte Elemente voraus, die noch nicht entdeckt waren, zum Beispiel Gallium.', 'Er hatte schon alle Elemente entdeckt.', 'Er ordnete die Elemente nach der Farbe.', 'Er erfand die Atome.'],
          'Mendelejew liess Lücken frei und sagte die Eigenschaften der fehlenden Elemente voraus. Als Gallium entdeckt wurde, passten sie zu seiner Vorhersage.');
      } },
      { id: 'c6-gruppen', topic: 'Gruppen und Perioden', make() {
        return mc('Wie heissen im Periodensystem die Spalten und die Zeilen?', ['Die Spalten heissen Gruppen, die Zeilen Perioden.', 'Die Spalten heissen Perioden, die Zeilen Gruppen.', 'Beide heissen Gruppen.', 'Beide heissen Perioden.'],
          'Elemente in einer Gruppe (Spalte) haben ähnliche Eigenschaften. Die Perioden (Zeilen) laufen von links nach rechts mit steigender Masse.');
      } },
      { id: 'c6-stoffe', topic: 'Metalle, Salze, molekulare Stoffe', make() {
        return mc('Kochsalz besteht aus dem Metall Natrium und dem Nichtmetall Chlor. Zu welcher Stoffgruppe gehört es?', ['Zu den Salzen. Salze bestehen aus Metallen und Nichtmetallen.', 'Zu den Metallen.', 'Zu den molekularen Stoffen, die nur aus Nichtmetallen bestehen.', 'Zu den Edelgasen.'],
          'Metalle bestehen aus Metallen, Salze aus Metallen und Nichtmetallen, molekulare Stoffe nur aus Nichtmetallen. Diese Unterschiede erklären die verschiedenen Schmelz- und Siedepunkte.');
      } },
      { id: 'c6-jahre', topic: 'Zeitspanne der Forschung', make() {
        const F = [['Helium wurde im Sonnenspektrum entdeckt', 1868], ['Mendelejew veröffentlichte sein Periodensystem', 1869], ['Henry Moseley bestätigte die Ordnung der Elemente', 1913]];
        const p = rnd([[0, 2], [1, 2], [0, 1]]), x = F[p[0]], y = F[p[1]], d = y[1] - x[1];
        return num(`${x[0]} (${fmt(x[1])}). ${y[0]} (${fmt(y[1])}). Wie viele Jahre liegen dazwischen?`, 'Jahre', d, 'Ziehe die frühere von der späteren Jahreszahl ab.', `${fmt(y[1])} − ${fmt(x[1])} = ${fmt(d)} Jahre`);
      } },
      { id: 'c6-neu', topic: 'Zahl der Elemente', ext: true, make() {
        if (rnd([0, 1])) return num('Zu Mendelejews Zeit kannte man 64 Elemente. Heute kennt man 118. Wie viele Elemente sind seither dazugekommen?', 'Elemente', 54, 'Ziehe die damalige Zahl von der heutigen ab.', '118 − 64 = 54 Elemente');
        return num('Von den 64 damals bekannten Elementen sollst du 58 anordnen. Wie viele bleiben übrig?', 'Elemente', 6, 'Ziehe die Zahl der geordneten Elemente von 64 ab.', '64 − 58 = 6 Elemente');
      } }
    ]
  }
];

/* ---------- Lerninhalt: Lektionskarten pro Station ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  c1: [
    { h: 'Chemische Reaktionen im Alltag',
      body: `<p>Chemische Reaktionen laufen überall ab: beim Braten, Backen, Verbrennen, beim Rosten und in deinem Körper. Es sind nicht nur Explosionen oder giftige Dämpfe. Auch langsame Vorgänge wie das Rosten von Eisen sind echte Chemie.</p>
        ${merk('Bei einer <b>chemischen Reaktion</b> entstehen aus <b>Ausgangsstoffen</b> neue Stoffe, die <b>Produkte</b>. Die Eigenschaften der Stoffe ändern sich.')}
        <p>Schmelzen, Gefrieren und das Auflösen von Salz in Wasser sind keine chemischen Reaktionen. Dort bleibt der Stoff derselbe.</p>` },
    { h: 'Reaktion oder nicht?',
      body: '<p>Tippe bei jedem Vorgang, ob es eine chemische Reaktion ist. Beobachte, was sich ändert.</p>', sim: 'reaktion' },
    { h: 'Das Reaktionsschema',
      body: `<p>Du beschreibst eine chemische Reaktion mit einem <b>Reaktionsschema in Worten</b>:</p>
        ${merk('<b>Ausgangsstoffe → Produkte</b><br>Beispiel: Wachs und Sauerstoff → Kohlenstoffdioxid und Wasser')}
        <p>Das Feuer steht nicht im Schema. Feuer ist kein Stoff, sondern zeigt, dass chemische Energie in thermische Energie und Strahlungsenergie umgewandelt wird.</p>` },
    { h: 'Vorgerechnet: Reaktion beschreiben', worked: {
      given: 'Holz verbrennt im Ofen. Beschreibe die Reaktion mit einem Reaktionsschema.',
      steps: [['Ausgangsstoffe suchen', 'Holz und Sauerstoff aus der Luft.'], ['Produkte suchen', 'Asche, Kohlenstoffdioxid und Wasserdampf.'], ['Schema aufschreiben', 'Holz und Sauerstoff → Asche, Kohlenstoffdioxid und Wasserdampf'], ['Energie nicht vergessen', 'Chemische Energie wird in thermische Energie und Strahlungsenergie umgewandelt.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welcher Vorgang ist keine chemische Reaktion?',
        options: ['Wasser gefriert zu Eis.', 'Ein Brot wird gebacken.', 'Eine Kerze brennt.', 'Eisen rostet.'],
        explain: 'Beim Gefrieren ändert sich nur der Aggregatzustand. Der Stoff Wasser bleibt derselbe. Backen, Verbrennen und Rosten sind chemische Reaktionen.' } }
  ],
  c2: [
    { h: 'Vier Eigenschaften von Reaktionen',
      body: `<p>Chemische Reaktionen unterscheiden sich in vier Punkten:</p>
        <ul><li><b>Aktivierung:</b> spontan (von selbst) oder initiiert (braucht einen Anstoss).</li>
        <li><b>Geschwindigkeit:</b> schnell oder langsam.</li>
        <li><b>Energiebilanz:</b> Energie abgeben oder Energie benötigen.</li>
        <li><b>Umkehrbarkeit:</b> einfach oder retour (rückwärts möglich).</li></ul>` },
    { h: 'Massenerhaltung',
      body: `${merk('<b>Bei einer chemischen Reaktion gehen keine Teilchen verloren.</b> Die Masse aller Ausgangsstoffe ist gleich der Masse aller Produkte.')}
        <p>Das gilt, wenn nichts aus dem System entweicht und nichts hinzukommt. Man nennt das <b>Systemgrenze</b>.</p>` },
    { h: 'Wiege die Stoffe',
      body: '<p>Wähle eine Reaktion. Schalte um, ob das System geschlossen oder offen ist, und sieh, was die Waage anzeigt.</p>', sim: 'masse' },
    { h: 'Vorgerechnet: Masse der Produkte', worked: {
      given: '24 g Magnesium reagieren mit 16 g Sauerstoff. Welche Masse haben die Produkte?',
      steps: [['Massenerhaltung anwenden', 'Masse der Produkte = Masse der Ausgangsstoffe'], ['Rechnung', '24 g + 16 g = 40 g'], ['Antwort', 'Das Produkt, Magnesiumoxid, hat 40 g.']] } },
    { h: 'Sicherheit',
      body: warnbox('<b>Beim Experimentieren mit Feuer:</b> Haare zusammenbinden, Schutzbrille tragen, auf feuerfester Unterlage arbeiten. Nimm nicht zu viele Streichhölzer in ein Reagenzglas. Den Gasbrenner bedient die Lehrperson.') },
    { h: 'Kurz testen',
      check: { q: 'Beim Verbrennen von Eisenwolle auf einer Waage wird die Eisenwolle schwerer. Was ist der Grund?',
        options: ['Sauerstoff aus der Luft wird im Produkt gebunden.', 'Aus dem Nichts entsteht Masse.', 'Das Eisen saugt Wasser auf.', 'Die Luft drückt auf die Waage.'],
        explain: 'Das Produkt Eisenoxid enthält den Sauerstoff, der vorher in der Luft war. Darum ist es schwerer.' } }
  ],
  c3: [
    { h: 'Energie bei Reaktionen',
      body: `<p>Bei jeder chemischen Reaktion wird auch Energie umgewandelt. Mit den Energiewürfeln kannst du die <b>chemische Energie</b> der Stoffe zählen.</p>
        ${merk('Haben die Produkte <b>weniger</b> Würfel als die Ausgangsstoffe, geht der Rest an die Umgebung: Die Reaktion <b>gibt Energie ab</b>.<br>Haben sie <b>mehr</b>, muss die Reaktion Energie <b>aus der Umgebung aufnehmen</b>.')}` },
    { h: 'Zähle die Würfel',
      body: '<p>Wähle eine Reaktion und beobachte die Würfel. Das ist ein Modell mit Beispielwerten.</p>', sim: 'chemwuerfel' },
    { h: 'Aktivierungsenergie',
      body: `<p>Manche Reaktionen laufen von selbst (<b>spontan</b>), zum Beispiel das Rosten von Eisen. Andere brauchen einen Anstoss (<b>initiiert</b>): Ein Streichholz muss angerieben werden.</p>
        ${merk('Den Anstoss nennt man <b>Aktivierungsenergie</b>. Danach kann die Reaktion von selbst weiterlaufen und selbst Energie abgeben.')}` },
    { h: 'Die Chemie der Kerzenflamme',
      body: `<p>Bei einer Kerze laufen mehrere Vorgänge nacheinander ab:</p>
        <ol><li>Das Wachs schmilzt (nur physikalisch).</li><li>Das flüssige Wachs steigt im Docht auf und verdampft.</li><li>Der Wachsdampf verbrennt mit Sauerstoff (chemische Reaktion).</li></ol>
        <p>Beim Kupferblech in der Flamme entsteht das schwarze Kupferoxid: Kupfer und Sauerstoff → Kupferoxid.</p>` },
    { h: 'Vorgerechnet: Energiewürfel', worked: {
      given: 'Die Ausgangsstoffe haben 8 Würfel chemische Energie, die Produkte 5 Würfel. Was geschieht mit dem Rest?',
      steps: [['Gesamtzahl bleibt gleich', 'Es gibt weiterhin 8 Würfel.'], ['Rechnung', '8 − 5 = 3'], ['Antwort', '3 Würfel gehen an die Umgebung, als thermische Energie und Strahlungsenergie. Die Reaktion gibt Energie ab.']] } },
    { h: 'Kurz testen',
      check: { q: 'Eine Reaktion läuft nur, wenn man sie anzündet, danach brennt sie von selbst weiter. Wie heisst diese Eigenschaft?',
        options: ['Sie ist initiiert und braucht Aktivierungsenergie.', 'Sie ist spontan.', 'Sie ist retour.', 'Sie ist langsam und benötigt Energie.'],
        explain: 'Eine Reaktion, die einen Anstoss braucht, ist initiiert. Der Anstoss ist die Aktivierungsenergie.' } }
  ],
  c4: [
    { h: 'Die Fotosynthese',
      body: `<p>In grünen Pflanzen läuft die Fotosynthese ab, eine chemische Reaktion in den Zellen:</p>
        ${merk('Kohlenstoffdioxid + Wasser → (mit Licht) → Traubenzucker + Sauerstoff')}
        <p>Die Reaktion braucht <b>Strahlungsenergie</b>. Sie ist also initiiert. Die Energie wird in Traubenzucker gespeichert, als chemische Energie.</p>` },
    { h: 'Pflanzen atmen auch',
      body: `<p>Oft hört man: «Pflanzen betreiben Fotosynthese statt zu atmen.» Das stimmt nicht.</p>
        ${merk('Pflanzen betreiben <b>Fotosynthese</b> (nur mit Licht) und <b>atmen</b> (immer) wie alle Lebewesen. Sie ernähren sich nicht aus dem Boden, sondern stellen ihre Nährstoffe selbst her.')}
        <p>Die Sonne ist die Energiequelle fast aller Lebewesen.</p>` },
    { h: 'Experimentiere mit Wasserpest',
      body: '<p>Wähle Wasser und Licht. Die Wasserpest bildet Bläschen aus Sauerstoff. Das ist ein Modell mit Beispielwerten.</p>', sim: 'foto' },
    { h: 'Vorgerechnet: Bläschen zählen', worked: {
      given: 'An einer Wasserpest siehst du in 5 Minuten 30 Bläschen. Wie viele sind es pro Minute?',
      steps: [['Rechnung', '30 : 5 = 6'], ['Antwort', '6 Bläschen pro Minute. Zähle mehrmals und bilde den Mittelwert, dann wird das Ergebnis genauer.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was brauchst du für ein gutes Fotosynthese-Experiment mit Wasserpest?',
        options: ['Kohlenstoffdioxid im Wasser und genug Licht.', 'Salzwasser und Dunkelheit.', 'Nur kochendes Wasser.', 'Nur Dunkelheit.'],
        explain: 'Kohlenstoffdioxid und Licht sind Voraussetzungen der Fotosynthese. Du kannst auch die Temperatur und die Lichtfarbe untersuchen.' } }
  ],
  c5: [
    { h: 'Element oder Verbindung?',
      body: `<p>Ein <b>Element</b> besteht nur aus Atomen einer Sorte (Sauerstoff, Eisen, Gold). Eine <b>Verbindung</b> enthält Atome verschiedener Elemente, die fest verbunden sind (Wasser, Kochsalz).</p>
        ${merk('Element: nur eine Atomsorte.<br>Verbindung: mehrere Atomsorten in festem Verhältnis.<br>Gemisch (zum Beispiel Luft): mehrere Stoffe, die sich trennen lassen.')}` },
    { h: 'Ordne die Stoffe zu',
      body: '<p>Tippe bei jedem Stoff, ob es ein Element, eine Verbindung oder ein Gemisch ist.</p>', sim: 'stoffe' },
    { h: 'Daltons Atommodell',
      body: `<p>John Dalton stellte sich vor, dass alle Stoffe aus kleinsten Teilchen bestehen, den <b>Atomen</b>.</p>
        <ul><li>Atome eines Elements sind gleich.</li>
        <li>Atome verschiedener Elemente unterscheiden sich, zum Beispiel in ihrer Masse. Wasserstoff ist das leichteste.</li>
        <li>Bei chemischen Reaktionen ordnen sich Atome neu an. Sie gehen nicht verloren.</li></ul>
        <p>Heute weiss man mehr über Atome, aber Daltons Grundidee ist die Basis der Chemie.</p>` },
    { h: 'Vorgerechnet: Atome zählen', worked: {
      given: 'Ein Wassermolekül besteht aus 2 Wasserstoffatomen und 1 Sauerstoffatom. Wie viele Atome sind es in 5 Wassermolekülen?',
      steps: [['Atome pro Molekül', '2 + 1 = 3'], ['Für 5 Moleküle', '5 · 3 = 15'], ['Antwort', '15 Atome, davon 10 Wasserstoff- und 5 Sauerstoffatome.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über Wasser ist richtig?',
        options: ['Wasser ist eine Verbindung aus Wasserstoff und Sauerstoff.', 'Wasser ist ein Element.', 'Wasser ist ein Gemisch aus Luft und Erde.', 'Wasser besteht aus nur einer Atomsorte.'],
        explain: 'Wasser enthält Atome von zwei Elementen. Es ist deshalb eine Verbindung.' } }
  ],
  c6: [
    { h: 'Wie das Periodensystem entstand',
      body: `<p>Im 19. Jahrhundert kannte man viele Elemente und suchte Ordnung. Zuerst fand man <b>Triaden</b> (Dreiergruppen) mit ähnlichen Eigenschaften. Dann ordneten Dmitri Mendelejew und Lothar Meyer die Elemente nach der Masse und nach ihren Eigenschaften.</p>
        ${merk('Mendelejew sagte Elemente voraus, die noch fehlten, zum Beispiel <b>Gallium</b>. Später wurde es gefunden und passte zur Vorhersage.')}
        <p>Die Edelgase waren damals noch unbekannt. Helium wurde 1868 im Sonnenspektrum entdeckt. 1913 bestätigte Henry Moseley die Ordnung mit der Röntgenspektrometrie.</p>` },
    { h: 'Aufbau des Periodensystems',
      body: `<ul><li>Die senkrechten Spalten heissen <b>Gruppen</b>. Ihre Elemente haben ähnliche Eigenschaften.</li>
        <li>Die waagrechten Zeilen heissen <b>Perioden</b>.</li>
        <li>Zu jedem Element stehen Name, Symbol und weitere Angaben, zum Beispiel die Masse.</li>
        <li>Es gibt Metalle, Nichtmetalle und Edelgase.</li></ul>` },
    { h: 'Erkunde die ersten 18 Elemente',
      body: '<p>Tippe auf ein Element. Die Tabelle zeigt einen Ausschnitt des Periodensystems. Die Massen sind gerundet.</p>', sim: 'pse' },
    { h: 'Metalle, Salze, molekulare Stoffe',
      body: `${merk('<b>Metalle</b> bestehen aus Metallen.<br><b>Salze</b> bestehen aus Metallen und Nichtmetallen.<br><b>Molekulare Stoffe</b> bestehen nur aus Nichtmetallen.')}
        <p>Beispiele: Eisen (Metall), Kochsalz aus Natrium und Chlor (Salz), Wasser aus Wasserstoff und Sauerstoff (molekular). Diese Unterschiede erklären die Schmelz- und Siedepunkte. Die genaue Erklärung folgt in NaTech 8.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Was haben die Elemente einer Gruppe im Periodensystem gemeinsam?',
        options: ['Sie haben ähnliche Eigenschaften.', 'Sie haben dieselbe Masse.', 'Sie wurden am selben Tag entdeckt.', 'Sie haben denselben Namen.'],
        explain: 'Elemente einer Gruppe stehen in derselben Spalte und zeigen ähnliches Verhalten.' } }
  ]
};
const GOALS = {
  c1: ['chemische Reaktionen von physikalischen Vorgängen unterscheiden', 'Reaktionen mit einem Reaktionsschema beschreiben'],
  c2: ['die vier Eigenschaften einer Reaktion nennen', 'die Massenerhaltung anwenden'],
  c3: ['Energie bei Reaktionen mit dem Würfelmodell beschreiben', 'spontane und initiierte Reaktionen unterscheiden'],
  c4: ['die Fotosynthese als chemische Reaktion beschreiben', 'Einflüsse auf die Fotosynthese untersuchen'],
  c5: ['Elemente und Verbindungen unterscheiden', 'das Atommodell nach Dalton beschreiben'],
  c6: ['die Entstehung des Periodensystems beschreiben', 'dem Periodensystem Angaben zu Elementen entnehmen']
};
const LEARN = {
  'c1-ei': 'Chemische Reaktionen im Alltag', 'c1-merkmal': 'Chemische Reaktionen im Alltag', 'c1-feuer': 'Das Reaktionsschema', 'c1-schema': 'Das Reaktionsschema', 'c1-holz': 'Vorgerechnet: Reaktion beschreiben', 'c1-kalk': 'Reaktion oder nicht?',
  'c2-masse': 'Vorgerechnet: Masse der Produkte', 'c2-fehlt': 'Vorgerechnet: Masse der Produkte', 'c2-erhalt': 'Massenerhaltung', 'c2-eisen': 'Wiege die Stoffe', 'c2-eigenschaften': 'Vier Eigenschaften von Reaktionen', 'c2-holz': 'Wiege die Stoffe',
  'c3-aktiv': 'Aktivierungsenergie', 'c3-abgeben': 'Vorgerechnet: Energiewürfel', 'c3-aufnehmen': 'Energie bei Reaktionen', 'c3-wachs': 'Die Chemie der Kerzenflamme', 'c3-kupfer': 'Die Chemie der Kerzenflamme', 'c3-kschema': 'Die Chemie der Kerzenflamme',
  'c4-atmung': 'Pflanzen atmen auch', 'c4-schema': 'Die Fotosynthese', 'c4-energie': 'Die Fotosynthese', 'c4-blasen': 'Experimentiere mit Wasserpest', 'c4-minute': 'Vorgerechnet: Bläschen zählen', 'c4-diff': 'Vorgerechnet: Bläschen zählen',
  'c5-element': 'Element oder Verbindung?', 'c5-verb': 'Element oder Verbindung?', 'c5-ordnen': 'Ordne die Stoffe zu', 'c5-dalton': 'Daltons Atommodell', 'c5-wasser': 'Vorgerechnet: Atome zählen', 'c5-co2': 'Vorgerechnet: Atome zählen',
  'c6-ordnung': 'Wie das Periodensystem entstand', 'c6-gallium': 'Wie das Periodensystem entstand', 'c6-gruppen': 'Aufbau des Periodensystems', 'c6-stoffe': 'Metalle, Salze, molekulare Stoffe', 'c6-jahre': 'Wie das Periodensystem entstand', 'c6-neu': 'Wie das Periodensystem entstand'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Atom', pw: 'fängt an' },
  { xp: 80, name: 'Molekül', pw: 'verbindet sich' },
  { xp: 200, name: 'Reagenzglas', pw: 'mischt Stoffe' },
  { xp: 380, name: 'Brenner', pw: 'zündet an' },
  { xp: 620, name: 'Labor', pw: 'forscht gründlich' },
  { xp: 920, name: 'Periodensystem', pw: 'kennt alle Elemente' }
];

/* ---------- Thema: 7_7 Chemische Reaktionen untersuchen ---------- */
const TOPIC = {
  id: 'nt7-7', storeKey: 'halingen-nt7-7-v1', other: { title: '7_5 Energie erkunden', href: '7_5_Energie_erkunden.html' },
  title: 'Chemische Reaktionen untersuchen', lead: 'Aus Stoffen werden neue Stoffe', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Feuer ist kein Stoff.', 'Bei Reaktionen gehen keine Teilchen verloren.'],
  formulas: [
    ['Reaktionsschema', 'Ausgangsstoffe → Produkte', 'neue Stoffe, neue Eigenschaften'],
    ['Massenerhaltung', 'Masse vorher = Masse nachher', 'im abgeschlossenen System'],
    ['Eigenschaften', 'spontan/initiiert, schnell/langsam', 'Energie abgeben/benötigen, einfach/retour'],
    ['Fotosynthese', 'Kohlenstoffdioxid + Wasser → Traubenzucker + Sauerstoff', 'mit Licht'],
    ['Stoffgruppen', 'Metall, Salz, molekular', 'Element: eine Atomsorte, Verbindung: mehrere']
  ]
};

/* ---------- Simulationen ---------- */
function sorter(el, items, names, intro, endText) {
  el.innerHTML = `<div class="sim"><p class="small" id="gn" aria-live="polite"></p><p class="gcard" id="gc"></p>
    <div class="gbtns" id="gb">${Object.keys(names).map(k => `<button class="btn sm" data-g="${k}">${names[k]}</button>`).join('')}</div>
    <p class="readout" id="ro" aria-live="polite"></p>
    <button class="btn btn-primary block" id="nx" hidden>Weiter zum nächsten Beispiel</button></div>`;
  let i = 0, score = 0, done = false;
  function show() {
    done = false; $id('nx').hidden = true;
    if (i >= items.length) {
      $id('gn').textContent = ''; $id('gc').textContent = 'Geschafft!'; $id('gb').hidden = true;
      $id('ro').innerHTML = `<b>${score} von ${items.length}</b> beim ersten Tipp richtig. ${endText}`;
      const again = document.createElement('button'); again.className = 'btn sm'; again.textContent = 'Nochmals spielen';
      again.addEventListener('click', () => { i = 0; score = 0; $id('gb').hidden = false; again.remove(); show(); });
      $id('ro').appendChild(document.createElement('br')); $id('ro').appendChild(again); return;
    }
    $id('gn').textContent = 'Beispiel ' + (i + 1) + ' von ' + items.length;
    $id('gc').textContent = items[i].t; $id('ro').textContent = intro;
    el.querySelectorAll('[data-g]').forEach(b => b.classList.remove('good', 'bad'));
  }
  el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => {
    if (i >= items.length) return;
    if (done) { show(); return; }
    done = true;
    const it = items[i], ok = it.ok.includes(b.dataset.g);
    if (ok) score++;
    el.querySelectorAll('[data-g]').forEach(x => { if (it.ok.includes(x.dataset.g)) x.classList.add('good'); else if (x === b) x.classList.add('bad'); });
    $id('ro').innerHTML = (ok ? '<b>Richtig.</b> ' : '<b>Nicht ganz.</b> ') + it.why;
    i++;
    const nx = $id('nx'); nx.hidden = false; nx.textContent = i >= items.length ? 'Ergebnis ansehen' : 'Weiter zum nächsten Beispiel';
    if (nx.scrollIntoView) nx.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }));
  $id('nx').addEventListener('click', show);
  show();
}
const PSE = [
  ['H', 'Wasserstoff', 1, 1, 'n', 1, 1], ['He', 'Helium', 2, 4, 'e', 1, 18],
  ['Li', 'Lithium', 3, 7, 'm', 2, 1], ['Be', 'Beryllium', 4, 9, 'm', 2, 2], ['B', 'Bor', 5, 11, 'h', 2, 13], ['C', 'Kohlenstoff', 6, 12, 'n', 2, 14], ['N', 'Stickstoff', 7, 14, 'n', 2, 15], ['O', 'Sauerstoff', 8, 16, 'n', 2, 16], ['F', 'Fluor', 9, 19, 'n', 2, 17], ['Ne', 'Neon', 10, 20, 'e', 2, 18],
  ['Na', 'Natrium', 11, 23, 'm', 3, 1], ['Mg', 'Magnesium', 12, 24, 'm', 3, 2], ['Al', 'Aluminium', 13, 27, 'm', 3, 13], ['Si', 'Silicium', 14, 28, 'h', 3, 14], ['P', 'Phosphor', 15, 31, 'n', 3, 15], ['S', 'Schwefel', 16, 32, 'n', 3, 16], ['Cl', 'Chlor', 17, 35.5, 'n', 3, 17], ['Ar', 'Argon', 18, 40, 'e', 3, 18]
];
const SIMS = {
  reaktion(el) {
    sorter(el, [
      { t: 'Ein Spiegelei braten', ok: ['ja'], why: 'Das Eiweiss verändert sich dauerhaft, es entstehen neue Eigenschaften.' },
      { t: 'Schokolade schmelzen', ok: ['nein'], why: 'Nur der Aggregatzustand ändert sich. Der Stoff bleibt derselbe.' },
      { t: 'Eine Kerze brennen lassen', ok: ['ja'], why: 'Der Wachsdampf reagiert mit Sauerstoff zu neuen Stoffen.' },
      { t: 'Wasser gefrieren lassen', ok: ['nein'], why: 'Eis ist weiterhin Wasser. Es ändert sich nur der Zustand.' },
      { t: 'Brot backen', ok: ['ja'], why: 'Im Teig laufen chemische Reaktionen ab, es entstehen neue Stoffe.' },
      { t: 'Salz in Wasser auflösen', ok: ['nein'], why: 'Das Salz bleibt Salz. Das Auflösen ist keine chemische Reaktion.' }
    ], { ja: 'Chemische Reaktion', nein: 'Keine chemische Reaktion' }, 'Entstehen neue Stoffe mit neuen Eigenschaften?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  stoffe(el) {
    sorter(el, [
      { t: 'Sauerstoff', ok: ['el'], why: 'Er besteht nur aus Sauerstoffatomen.' },
      { t: 'Wasser', ok: ['ve'], why: 'Wasser enthält Wasserstoff und Sauerstoff, zwei Elemente.' },
      { t: 'Eisen', ok: ['el'], why: 'Eisen besteht nur aus Eisenatomen.' },
      { t: 'Kochsalz', ok: ['ve'], why: 'Kochsalz enthält Natrium und Chlor.' },
      { t: 'Luft', ok: ['ge'], why: 'Luft ist ein Gemisch aus mehreren Gasen. Man kann sie auftrennen.' },
      { t: 'Kohlenstoffdioxid', ok: ['ve'], why: 'Es enthält Kohlenstoff und Sauerstoff.' },
      { t: 'Gold', ok: ['el'], why: 'Reines Gold besteht nur aus Goldatomen.' }
    ], { el: 'Element', ve: 'Verbindung', ge: 'Gemisch' }, 'Ein Element, eine Verbindung oder ein Gemisch?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  masse(el) {
    const R = {
      mg: { n: 'Magnesium + Sauerstoff', a: 24, b: 16, p: 40, name: 'Magnesiumoxid', mode: 'fest+gas' },
      c: { n: 'Kohlenstoff + Sauerstoff', a: 12, b: 32, p: 44, name: 'Kohlenstoffdioxid', mode: 'fest+gas>gas' },
      fe: { n: 'Eisen + Sauerstoff', a: 56, b: 16, p: 72, name: 'Eisenoxid', mode: 'fest+gas' }
    };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Reaktion">${Object.keys(R).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-r="${k}">${R[k].n}</button>`).join('')}</div>
      <label class="chk"><input type="checkbox" id="offen"> System offen (Gas kann entweichen oder dazukommen)</label>
      <div class="trio"><div><span class="k">Vorher</span><b class="mono" id="m1"></b></div><div><span class="k">Nachher (Waage)</span><b class="mono" id="m2"></b></div><div><span class="k">Produkt</span><b class="mono" id="m3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let k = 'mg';
    function upd() {
      const r = R[k], open = $id('offen').checked;
      el.querySelectorAll('[data-r]').forEach(b => b.classList.toggle('on', b.dataset.r === k));
      let before = r.a + (open ? 0 : r.b), after, why;
      if (!open) { after = r.p; why = 'Das System ist geschlossen: Nichts kommt hinzu, nichts entweicht. Vorher und nachher stimmt die Masse überein.'; }
      else if (k === 'mg' || k === 'fe') { after = r.p; why = 'Das Metall nimmt Sauerstoff aus der Luft auf. Das Produkt ist schwerer als das Metall allein.'; }
      else if (k === 'c') { after = 0; why = 'Das entstehende Gas Kohlenstoffdioxid entweicht. Die Waage zeigt weniger an, obwohl die Gesamtmasse gleich bleibt.'; }
      else { after = r.p; why = ''; }
      $id('m1').textContent = fmt(before) + ' g'; $id('m2').textContent = fmt(after) + ' g'; $id('m3').textContent = r.name + ' ' + fmt(r.p) + ' g';
      $id('ro').innerHTML = `${r.a} g + ${r.b} g = <b>${r.p} g</b> Produkt.<br>${why}`;
    }
    el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => { k = b.dataset.r; upd(); }));
    $id('offen').addEventListener('change', upd); upd();
  },

  chemwuerfel(el) {
    const R = {
      kerze: { n: 'Kerze brennt', a: 8, p: 3, t: 'Die Reaktion gibt Energie ab: 5 Würfel gehen als thermische Energie und Strahlungsenergie an die Umgebung.' },
      rost: { n: 'Eisen rostet', a: 6, p: 4, t: 'Die Reaktion läuft langsam und gibt wenig Energie ab: 2 Würfel gehen an die Umgebung.' },
      foto: { n: 'Fotosynthese', a: 3, p: 8, t: 'Die Reaktion benötigt Energie: 5 Würfel kommen aus dem Licht (Strahlungsenergie).' }
    };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Reaktion">${Object.keys(R).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-r="${k}">${R[k].n}</button>`).join('')}</div>
      <p class="small">Ausgangsstoffe</p><div class="cubes" id="c1" aria-hidden="true"></div>
      <p class="small">Produkte</p><div class="cubes" id="c2" aria-hidden="true"></div>
      <p class="small">Umgebung</p><div class="cubes" id="c3" aria-hidden="true"></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function row(id, n, cls) { const c = $id(id); c.innerHTML = ''; for (let i = 0; i < n; i++) { const d = document.createElement('i'); d.className = 'cube ' + cls; c.appendChild(d); } }
    function set(k) {
      const r = R[k]; el.querySelectorAll('[data-r]').forEach(b => b.classList.toggle('on', b.dataset.r === k));
      row('c1', r.a, 'lage'); row('c2', r.p, 'lage'); row('c3', Math.abs(r.a - r.p), r.a > r.p ? 'therm' : 'bew');
      $id('ro').innerHTML = `Ausgangsstoffe: <b>${r.a}</b> Würfel, Produkte: <b>${r.p}</b> Würfel.<br>${r.t}<br>Beispielwerte (Modell).`;
    }
    el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => set(b.dataset.r)));
    set('kerze');
  },

  foto(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Wasser"><button class="btn sm on" data-w="2">Mineralwasser</button><button class="btn sm" data-w="1">Leitungswasser</button><button class="btn sm" data-w="0.1">Abgekochtes Wasser</button></div>
      <div class="plant" aria-hidden="true"><div class="bubbles" id="bb"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="trio"><div><span class="k">Wasser</span><b class="mono" id="f1"></b></div><div><span class="k">Licht</span><b class="mono" id="f2"></b></div><div><span class="k">Bläschen</span><b class="mono" id="f3"></b></div></div>
      ${sl('lt', 'Lichtstärke', 0, 100, 10, 60, '%')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let w = 2;
    function upd() {
      const L = +$id('lt').value, rate = Math.round(12 * w * L / 100);
      $id('ltv').textContent = fmt(L);
      el.querySelectorAll('[data-w]').forEach(b => b.classList.toggle('on', +b.dataset.w === w));
      $id('f1').textContent = w === 2 ? 'Mineral' : w === 1 ? 'Leitung' : 'abgekocht'; $id('f2').textContent = L + ' %'; $id('f3').textContent = rate + ' pro min';
      const dur = rate > 0 ? Math.max(0.6, 8 / rate * 1.2) : 0;
      $id('bb').style.setProperty('--bd', dur + 's'); $id('bb').classList.toggle('on', rate > 0 && !reduced());
      $id('ro').innerHTML = `Mehr Kohlenstoffdioxid im Wasser und mehr Licht ergeben mehr Bläschen (Sauerstoff). Beispielwerte, keine Messungen.`;
    }
    el.querySelectorAll('[data-w]').forEach(b => b.addEventListener('click', () => { w = +b.dataset.w; upd(); }));
    $id('lt').addEventListener('input', upd); upd();
  },

  pse(el) {
    const cls = { m: 'Metall', n: 'Nichtmetall', e: 'Edelgas', h: 'Halbmetall' };
    const rows = [1, 2, 3].map(r => '<tr>' + Array.from({ length: 18 }, (_, k) => {
      const i = PSE.findIndex(e => e[5] === r && e[6] === k + 1);
      if (i < 0) return '<td></td>';
      const e = PSE[i];
      return `<td><button class="el ${e[4]}" data-i="${i}" aria-label="${e[1]}"><b>${e[0]}</b><small>${e[2]}</small></button></td>`;
    }).join('') + '</tr>').join('');
    el.innerHTML = `<div class="sim"><div class="pscroll"><table class="pse" aria-label="Periodensystem, Ausschnitt">${rows}</table></div>
      <p class="small"><span class="lgd m"></span>Metall <span class="lgd n"></span>Nichtmetall <span class="lgd h"></span>Halbmetall <span class="lgd e"></span>Edelgas</p>
      <p class="readout" id="ro" aria-live="polite">Tippe auf ein Element. Wische seitwärts, wenn die Tabelle breiter ist als der Bildschirm.</p></div>`;
    el.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => {
      const e = PSE[+b.dataset.i];
      el.querySelectorAll('.el').forEach(x => x.classList.toggle('sel', x === b));
      $id('ro').innerHTML = `<b>${e[1]} (${e[0]})</b><br>Ordnungszahl ${e[2]}, Masse etwa ${fmt(e[3], 1)}<br>${cls[e[4]]}, Periode ${e[5]}, Spalte ${e[6]}`;
    }));
  }
};




export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-7","titel":"Chemische Reaktionen untersuchen","kapitel":"NaTech 7, Kapitel 7"});
