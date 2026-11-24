// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/8_4_Chemische_Reaktionen_erforschen.html
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

/* ---------- Inhalt: 8_4 Chemische Reaktionen erforschen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 8_4 (ein Lehrerkommentar liegt nicht vor). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'q1', nr: 1, title: 'Feuer und Verbrennung', sub: 'Reaktionen mit Sauerstoff',
    items: [
      { id: 'q1-dreieck', topic: 'Feuerdreieck', make() {
        return mc('Was braucht ein Feuer, damit es brennt?', ['Brennstoff, Sauerstoff und Hitze.', 'Nur Brennstoff und Wasser.', 'Nur Hitze.', 'Sauerstoff und Stickstoff.'],
          'Das Feuerdreieck zeigt die drei Bedingungen: Brennstoff, Sauerstoff (aus der Luft) und Hitze, zum Beispiel durch ein Zündholz oder einen Blitz.');
      } },
      { id: 'q1-loeschen', topic: 'Feuer löschen', make() {
        return mc('Wie wirkt eine Löschdecke?', ['Sie verhindert, dass Sauerstoff zum Brennstoff gelangt.', 'Sie kühlt den Brennstoff stark ab.', 'Sie entfernt den Brennstoff.', 'Sie macht das Feuer heisser.'],
          'Zum Löschen entfernst du eine Seite des Feuerdreiecks. Wasser senkt die Hitze, ein Kohlenstoffdioxidlöscher verdrängt den Sauerstoff, eine Löschdecke hält den Sauerstoff fern.');
      } },
      { id: 'q1-brandfall', topic: 'Verhalten im Brandfall', make() {
        return mc('Was ist im Brandfall die richtige Reihenfolge?', ['Brand melden, in Sicherheit bringen, dann Löschversuche unternehmen.', 'Zuerst löschen, dann melden.', 'Aufzug benutzen und flüchten.', 'Türen und Fenster weit öffnen und abwarten.'],
          'Zuerst meldest du den Brand (Wer, Was, Wie viele, Wo). Dann bringst du dich und andere in Sicherheit, ohne den Aufzug zu benutzen. Erst danach versuchst du zu löschen, wenn es sicher ist.');
      } },
      { id: 'q1-oxid', topic: 'Oxide', make() {
        return mc('Was entsteht, wenn ein Stoff mit Sauerstoff reagiert?', ['Ein Oxid, eine sauerstoffhaltige Verbindung.', 'Immer reines Wasser.', 'Ein Edelgas.', 'Nichts Neues.'],
          'Aus Kohle entsteht Kohlenstoffdioxid, aus Eisen entstehen Eisenoxide. Bei wenig Sauerstoff entsteht aus Kohle auch giftiges Kohlenstoffmonoxid.');
      } },
      { id: 'q1-rosten', topic: 'Rosten', make() {
        return mc('Was ist das Rosten von Eisen?', ['Eine langsame chemische Reaktion mit Sauerstoff. Es entstehen Eisenoxide.', 'Eine schnelle Reaktion mit Flamme.', 'Ein physikalischer Vorgang ohne neue Stoffe.', 'Eine Reaktion ohne Sauerstoff.'],
          'Ein Feuer ist eine schnelle Reaktion mit Flammenerscheinung, Rosten ist langsam. Beide nehmen Sauerstoff auf und bilden Oxide.');
      } },
      { id: 'q1-ghs', topic: 'Sicherheit', make() {
        return mc('Was bedeutet das GHS-Symbol «entzündlich» und was tust du beim Arbeiten?', ['Der Stoff kann leicht brennen. Du hältst ihn von Zündquellen fern und arbeitest mit Vorsicht.', 'Der Stoff ist ungefährlich.', 'Der Stoff ist ätzend.', 'Der Stoff ist nur für Kinder erlaubt.'],
          'Leicht entzündliche Stoffe (zum Beispiel Brennsprit oder Aceton) gehören nie in die Nähe offener Flammen. Beachte die Gefahrensymbole auf den Gefässen.');
      } }
    ]
  },
  {
    id: 'q2', nr: 2, title: 'Sauerstoff abgeben', sub: 'Elektrolyse und Reaktionsgleichungen',
    items: [
      { id: 'q2-elektro', topic: 'Elektrolyse von Wasser', make() {
        return mc('Was entsteht bei der Elektrolyse von Wasser?', ['Wasserstoff am Minuspol (doppelt so viel Gas) und Sauerstoff am Pluspol.', 'Sauerstoff am Minuspol und Wasserstoff am Pluspol.', 'Nur Wasserdampf.', 'Gleich viel Wasserstoff und Sauerstoff.'],
          'Mit elektrischem Strom wird Wasser in seine Bestandteile zerlegt. Auf der Seite des Minuspols entsteht doppelt so viel Gas wie auf der Seite des Pluspols.');
      } },
      { id: 'q2-nachweis', topic: 'Gasnachweise', make() {
        return mc('Wie weist du Wasserstoff und wie Sauerstoff nach?', ['Wasserstoff mit der Knallgasprobe, Sauerstoff mit der Glimmspanprobe.', 'Beide mit der Glimmspanprobe.', 'Wasserstoff mit Lugol, Sauerstoff mit Essig.', 'Beide mit einem Thermometer.'],
          'Wasserstoff reagiert in der Knallgasprobe mit einem Knall. Ein glimmender Span flammt in Sauerstoff wieder auf.');
      } },
      { id: 'q2-pfeil', topic: 'Reaktionsgleichung', make() {
        return mc('Was steht in einer Reaktionsgleichung links und rechts vom Reaktionspfeil?', ['Links die Ausgangsstoffe, rechts die Produkte.', 'Links die Produkte, rechts die Ausgangsstoffe.', 'Links Metalle, rechts Nichtmetalle.', 'Links Wasser, rechts alle anderen Stoffe.'],
          'Statt eines Gleichheitszeichens steht ein Reaktionspfeil, der von den Ausgangsstoffen zu den Produkten zeigt. Beispiel: 2 H₂O → 2 H₂ + O₂.');
      } },
      { id: 'q2-atome', topic: 'Atome zählen', make() {
        const s = rnd([[2, 'H₂O', 'H', 2, 1], [3, 'H₂O', 'O', 1, 3], [2, 'H₂', 'H', 2, 2], [4, 'CO₂', 'O', 2, 4], [3, 'Fe₂O₃', 'O', 3, 3], [2, 'Fe₂O₃', 'Fe', 2, 2], [5, 'O₂', 'O', 2, 5]]), a = s[0] * s[3];
        return num(`Wie viele ${s[2]}-Atome sind in ${fmt(s[0])} ${s[1]} enthalten?`, 'Atome', a, 'Multipliziere den Faktor vor der Formel mit der tiefgestellten Zahl hinter dem Elementsymbol.', `${fmt(s[0])} · ${fmt(s[3])} = ${fmt(a)} ${s[2]}-Atome`);
      } },
      { id: 'q2-gleichung', topic: 'Gleichung ausgleichen', make() {
        return mc('Warum muss eine Reaktionsgleichung ausgeglichen sein?', ['Weil bei einer Reaktion keine Atome verloren gehen oder neu entstehen. Links und rechts muss es gleich viele Atome jeder Sorte geben.', 'Weil sie sonst nicht schön aussieht.', 'Weil Atome sich bei Reaktionen vermehren.', 'Weil immer gleich viele Moleküle entstehen.'],
          'Atome ordnen sich neu an. Darum müssen die Atomzahlen links und rechts übereinstimmen. Dazu setzt du Zahlen (Koeffizienten) vor die Formeln.');
      } },
      { id: 'q2-brandfoerdernd', topic: 'Brandfördernde Stoffe', make() {
        return mc('Was sind brandfördernde Stoffe?', ['Stoffe, aus denen sich Sauerstoff leicht abspalten lässt. Dadurch kann ein Feuer stärker brennen.', 'Stoffe, die Feuer löschen.', 'Stoffe, die nicht brennen.', 'Stoffe ohne Sauerstoff.'],
          'Bei brandfördernden Oxiden besteht Brandgefahr, weil sie den Sauerstoff abgeben. Sie sind mit einem eigenen GHS-Symbol gekennzeichnet.');
      } }
    ]
  },
  {
    id: 'q3', nr: 3, title: 'Sauerstoff tauschen', sub: 'Thermit, Erze und Reduktionsmittel',
    items: [
      { id: 'q3-thermit', topic: 'Thermit-Reaktion', make() {
        return mc('Was geschieht bei der Thermit-Reaktion?', ['Aluminium nimmt den Sauerstoff vom Eisenoxid auf. Es entstehen Eisen und Aluminiumoxid.', 'Eisen nimmt den Sauerstoff vom Aluminiumoxid auf.', 'Wasser wird zersetzt.', 'Es findet keine Reaktion statt.'],
          'Aluminium hat stärkere Bindungskräfte zum Sauerstoff als Eisen. Die Reaktion liefert so viel Hitze, dass das Eisen flüssig wird und Schienen verschweisst werden können.');
      } },
      { id: 'q3-reduktion', topic: 'Reduktionsmittel', make() {
        return mc('Was ist ein Reduktionsmittel?', ['Ein Stoff, der einem Oxid den Sauerstoff wegnimmt.', 'Ein Stoff, der Sauerstoff abgibt.', 'Ein Stoff, der Feuer löscht.', 'Ein Stoff, der immer ein Gas ist.'],
          'Das Reduktionsmittel nimmt den Sauerstoff auf. Aus dem Oxid entsteht dabei das Metall. Zum Beispiel ist Aluminium bei der Thermit-Reaktion das Reduktionsmittel.');
      } },
      { id: 'q3-erz', topic: 'Metalle aus Erz', make() {
        return mc('Wie wird im Hochofen aus Eisenerz Eisen gewonnen?', ['Eisenoxid wird mit Kohle gezündet. Die Kohle nimmt den Sauerstoff auf, es entstehen Eisen und Kohlenstoffdioxid.', 'Eisenerz wird nur geschmolzen.', 'Eisenerz wird mit Wasser vermischt.', 'Eisen wird aus der Luft gewonnen.'],
          'Unedle Metalle kommen nur in Oxiden und anderen Verbindungen vor. Um das Metall zu erhalten, muss man dem Oxid den Sauerstoff wegnehmen.');
      } },
      { id: 'q3-edel', topic: 'Edle Metalle', make() {
        return mc('Warum findet man Gold in der Natur elementar, Eisen aber nur in Verbindungen?', ['Gold ist ein edles Metall und reagiert kaum mit Sauerstoff. Eisen ist unedel und bildet leicht Oxide.', 'Gold ist ein Gas.', 'Eisen ist edler als Gold.', 'Beide kommen nur in Verbindungen vor.'],
          'Je schlechter ein Metall Sauerstoff aufnimmt, desto edler ist es. Darum findet man Gold rein, während Eisen, Aluminium und die meisten anderen Metalle in Erzen vorkommen.');
      } },
      { id: 'q3-zeit', topic: 'Metalle in der Menschheitsgeschichte', make() {
        return mc('Warum konnten Menschen zuerst Kupfer, später Eisen und erst vor rund hundert Jahren Aluminium nutzen?', ['Je stärker ein Metall den Sauerstoff bindet, desto schwieriger ist es, aus dem Oxid das Metall zu gewinnen.', 'Weil es früher kein Aluminium gab.', 'Weil Aluminium zu schwer ist.', 'Weil Kupfer unedler als Aluminium ist.'],
          'Aluminium bindet Sauerstoff besonders fest. Man braucht dafür technische Verfahren wie die Elektrolyse. Kupfer lässt sich dagegen verhältnismässig leicht aus dem Oxid gewinnen.');
      } },
      { id: 'q3-gesamt', topic: 'Masse bei der Reaktion', ext: true, make() {
        const s = rnd([[160, 54], [320, 108], [80, 27], [240, 81]]), g = s[0] + s[1];
        return num(`In einem Beispiel reagieren ${fmt(s[0])} g Eisenoxid mit ${fmt(s[1])} g Aluminium vollständig. Welche Masse haben alle Produkte zusammen?`, 'g', g, 'Die Masse bleibt bei einer chemischen Reaktion erhalten.', `${fmt(s[0])} g + ${fmt(s[1])} g = ${fmt(g)} g`);
      } }
    ]
  },
  {
    id: 'q4', nr: 4, title: 'Energie bei Reaktionen', sub: 'exotherm, endotherm, Energiediagramm',
    items: [
      { id: 'q4-aktiv', topic: 'Aktivierungsenergie', make() {
        return mc('Was ist die Aktivierungsenergie?', ['Die Energie, die zugeführt werden muss, damit eine Reaktion startet. Die Ausgangsstoffe werden dadurch reaktionsbereit.', 'Die Energie, die bei der Reaktion frei wird.', 'Die Energie der Produkte.', 'Eine Energie, die es nur bei Feuer gibt.'],
          'Bei der Thermit-Reaktion braucht es zuerst thermische Energie. Danach läuft die Reaktion von selbst weiter und gibt viel Energie ab.');
      } },
      { id: 'q4-exo', topic: 'Exotherme Reaktion', make() {
        return mc('Was ist eine exotherme Reaktion?', ['Eine Reaktion, bei der Energie frei wird: Die Produkte haben weniger chemische Energie als die Ausgangsstoffe.', 'Eine Reaktion, bei der dauernd Energie zugeführt werden muss.', 'Eine Reaktion ohne Energieumsatz.', 'Eine Reaktion, die nur im Wasser abläuft.'],
          'Bei der Thermit-Reaktion bleibt Energie «übrig». Sie wird als Strahlungsenergie und thermische Energie abgegeben.');
      } },
      { id: 'q4-endo', topic: 'Endotherme Reaktion', make() {
        return mc('Was ist eine endotherme Reaktion? Nenne ein Beispiel.', ['Eine Reaktion, bei der dauernd Energie zugeführt werden muss, zum Beispiel die Elektrolyse von Wasser.', 'Eine Reaktion, die Energie freisetzt, zum Beispiel Feuer.', 'Eine Reaktion ohne Ausgangsstoffe.', 'Eine Reaktion, die immer explodiert.'],
          'Bei der Elektrolyse hören die Gasbläschen auf, wenn der Strom abgestellt wird. Die Produkte haben mehr chemische Energie als die Ausgangsstoffe.');
      } },
      { id: 'q4-frei', topic: 'Frei werdende Energie', make() {
        const s = rnd([[500, 200], [800, 300], [600, 350], [900, 400], [450, 150]]), f = s[0] - s[1];
        return num(`In einem Energiediagramm haben die Ausgangsstoffe ${fmt(s[0])} kJ chemische Energie und die Produkte ${fmt(s[1])} kJ. Wie viel Energie wird bei der Reaktion frei?`, 'kJ', f, 'Frei wird der Unterschied zwischen den Energien der Ausgangsstoffe und der Produkte.', `${fmt(s[0])} kJ − ${fmt(s[1])} kJ = ${fmt(f)} kJ`);
      } },
      { id: 'q4-max', topic: 'Höchster Punkt im Diagramm', ext: true, make() {
        const s = rnd([[500, 100], [800, 150], [600, 50], [900, 200], [450, 120]]), m = s[0] + s[1];
        return num(`Die Ausgangsstoffe einer Reaktion haben ${fmt(s[0])} kJ. Es wird eine Aktivierungsenergie von ${fmt(s[1])} kJ zugeführt. Wie viel Energie haben die Stoffe im reaktionsbereiten Zustand?`, 'kJ', m, 'Der reaktionsbereite Zustand liegt um die Aktivierungsenergie höher als die Ausgangsstoffe.', `${fmt(s[0])} kJ + ${fmt(s[1])} kJ = ${fmt(m)} kJ`);
      } },
      { id: 'q4-diagramm', topic: 'Diagramm lesen', make() {
        return mc('Im Energiediagramm sind die Produkte tiefer als die Ausgangsstoffe. Was bedeutet das?', ['Die Reaktion ist exotherm: Es wird Energie frei.', 'Die Reaktion ist endotherm.', 'Die Reaktion läuft nicht ab.', 'Es entsteht kein Produkt.'],
          'Die y-Achse zeigt die Energiemenge, die x-Achse die Zeit. Ein tieferes Niveau der Produkte bedeutet, dass Energie an die Umgebung abgegeben wurde.');
      } }
    ]
  },
  {
    id: 'q5', nr: 5, title: 'Atome, Ionen und Bindungen', sub: 'Salze, Metalle und Moleküle',
    items: [
      { id: 'q5-aufbau', topic: 'Aufbau eines Atoms', make() {
        return mc('Welche Aussage über den Aufbau eines Atoms stimmt im Modell?', ['Im Atomkern sitzen positiv geladene Protonen. Aussen bewegen sich negativ geladene Elektronen.', 'Im Kern sitzen Elektronen.', 'Protonen sind negativ geladen.', 'Ein Atom hat keine Ladungen.'],
          'Die äussersten Elektronen sind für chemische Vorgänge verantwortlich. Bei Reaktionen werden sie zwischen Atomen hin- und hergeschoben.');
      } },
      { id: 'q5-edelgas', topic: 'Edelgase', make() {
        return mc('Warum gehen Edelgase keine chemischen Reaktionen ein?', ['Ihre Atome nehmen keine Elektronen auf und geben keine ab.', 'Weil sie zu schwer sind.', 'Weil sie zu heiss sind.', 'Weil sie keine Atome haben.'],
          'Edelgase stehen in der 18. Gruppe des Periodensystems. Sie eignen sich zum Beispiel für Leuchtstoffröhren.');
      } },
      { id: 'q5-ionen', topic: 'Kationen und Anionen', make() {
        return mc('Was entsteht, wenn ein Metall-Atom Elektronen abgibt?', ['Ein positiv geladenes Ion (Kation).', 'Ein negativ geladenes Ion (Anion).', 'Ein Edelgas.', 'Ein neues Element.'],
          'Metall-Atome geben ihre äussersten Elektronen ab und werden zu Kationen. Nichtmetall-Atome nehmen Elektronen auf und werden zu Anionen.');
      } },
      { id: 'q5-salz', topic: 'Salze', make() {
        return mc('Wie ist Kochsalz (Natriumchlorid) aufgebaut?', ['Als Gitter aus positiven Natrium-Ionen und negativen Chlorid-Ionen, die sich abwechseln.', 'Als Molekül aus einem Na- und einem Cl-Atom, ohne Ladung.', 'Als Metallgitter.', 'Als Gas.'],
          'Die gegensätzlich geladenen Ionen ziehen sich an. Stoffe, die so aufgebaut sind, heissen Salze. Sie haben hohe Schmelzpunkte und sind spröde.');
      } },
      { id: 'q5-leit', topic: 'Leitfähigkeit', make() {
        return mc('Wann leitet ein Salz den elektrischen Strom?', ['Wenn es geschmolzen oder in Wasser gelöst ist, weil sich die Ionen dann bewegen können.', 'Immer, auch fest.', 'Nie.', 'Nur wenn es heiss ist, egal ob fest.'],
          'Feste Salze leiten nicht, weil die Ionen im Gitter eingebunden sind. Metalle leiten immer, weil ihre Elektronen frei beweglich sind.');
      } },
      { id: 'q5-anionen', topic: 'Ladungsausgleich', ext: true, make() {
        const s = rnd([[1, 1], [2, 1], [3, 1], [2, 2]]), n = s[0] / s[1];
        return num(`Ein Kation hat die Ladung ${fmt(s[0])}+, ein Anion die Ladung ${fmt(s[1])}−. Wie viele Anionen braucht es für ein Kation, damit das Salz insgesamt ungeladen ist?`, 'Anionen', n, 'Die positive und die negative Gesamtladung müssen gleich gross sein.', `${fmt(s[0])} : ${fmt(s[1])} = ${fmt(n)} Anionen pro Kation`);
      } }
    ]
  },
  {
    id: 'q6', nr: 6, title: 'Säuren, Basen und pH-Wert', sub: 'Neutralisation',
    items: [
      { id: 'q6-oxid', topic: 'Saure und basische Lösungen', make() {
        return mc('Was entsteht, wenn ein Nichtmetalloxid bzw. ein Metalloxid in Wasser gelöst wird?', ['Nichtmetalloxid: saure Lösung. Metalloxid: basische Lösung.', 'Nichtmetalloxid: basische Lösung. Metalloxid: saure Lösung.', 'Beide ergeben immer neutrale Lösungen.', 'Beide ergeben Salze.'],
          'Aus Schwefel entsteht Schwefeldioxid, in Wasser gelöst ist es sauer. Aus Magnesium entsteht Magnesiumoxid, in Wasser gelöst ist es basisch.');
      } },
      { id: 'q6-saeure', topic: 'Definition nach Brønsted', make() {
        return mc('Was ist eine Säure und was ist eine Base nach Brønsted?', ['Eine Säure kann Wasserstoff-Ionen abgeben. Eine Base kann Wasserstoff-Ionen aufnehmen.', 'Eine Säure nimmt Wasserstoff-Ionen auf. Eine Base gibt sie ab.', 'Säuren sind immer Gase.', 'Basen sind immer fest.'],
          'Das Wasserstoff-Ion H⁺ besteht nur aus dem Atomkern und heisst auch Proton. Salzsäure (HCl) gibt H⁺ ab, Ammoniak (NH₃) nimmt es auf.');
      } },
      { id: 'q6-ph', topic: 'Der pH-Wert', make() {
        const s = rnd([[3, 5], [2, 3], [1, 4], [6, 7], [4, 7], [2, 5]]), f = Math.pow(10, Math.abs(s[1] - s[0]));
        return num(`Lösung A hat den pH-Wert ${fmt(s[0])}, Lösung B den pH-Wert ${fmt(s[1])}. Wie oft mehr Wasserstoff-Ionen enthält die Lösung mit dem kleineren pH-Wert? Jeder pH-Schritt bedeutet den Faktor 10.`, '-mal', f, 'Rechne 10 hoch dem Unterschied der pH-Werte.', `Unterschied: ${fmt(Math.abs(s[1] - s[0]))}<br>10<sup>${fmt(Math.abs(s[1] - s[0]))}</sup> = ${fmt(f)}`);
      } },
      { id: 'q6-skala', topic: 'pH-Skala', make() {
        return mc('Welche Aussage zum pH-Wert ist richtig?', ['pH 7 ist neutral, kleinere Werte sind sauer, grössere sind basisch.', 'pH 7 ist stark sauer.', 'pH 0 ist stark basisch.', 'Der pH-Wert hat nichts mit Wasserstoff-Ionen zu tun.'],
          'Der pH-Wert liegt zwischen 0 und 14. Reines Wasser hat pH 7. Mit pH-Papier oder einem Indikator wie Rotkraut-Saft kannst du ihn bestimmen.');
      } },
      { id: 'q6-neutral', topic: 'Neutralisation', make() {
        return mc('Was geschieht bei der Neutralisation von Salzsäure mit Natronlauge?', ['Wasserstoff-Ionen und Hydroxid-Ionen reagieren zu Wasser. Es bleiben gelöste Salz-Ionen, aus denen beim Eindampfen Kochsalz entsteht.', 'Es entsteht Feuer.', 'Beide Lösungen verschwinden ohne Rest.', 'Es entsteht reines Natrium.'],
          'Die Säure gibt H⁺ ab, die Base nimmt H⁺ auf. Dieser Vorgang läuft im Wasser ab. Salz entsteht, wenn man die neutrale Lösung eindampft.');
      } },
      { id: 'q6-essig', topic: 'Essig und Kalk', make() {
        return mc('Du putzt einen Natursteintisch mit Essigreiniger. Es schäumt. Was bedeutet das?', ['Die Säure im Essig reagiert mit dem Kalk im Stein. Dabei entsteht unter anderem ein Gas.', 'Der Reiniger ist abgelaufen.', 'Der Tisch ist zu kalt.', 'Das ist nur Wasser.'],
          'Säuren lösen Kalk auf. Darum eignet sich Essigreiniger nicht für Natursteine mit Kalk. Das Schäumen zeigt, dass eine chemische Reaktion abläuft.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  q1: [
    { h: 'Stoffliche und energetische Veränderung',
      body: `<p>Bei chemischen Reaktionen gibt es immer <b>stoffliche</b> und <b>energetische</b> Veränderungen. Aus Ausgangsstoffen entstehen neue Stoffe, und Energie wird frei oder benötigt.</p>
        <p>Chemische Reaktionen findest du im Haushalt, in der Natur und im Labor.</p>` },
    { h: 'Das Feuerdreieck',
      body: `${merk('Ein Feuer braucht <b>Brennstoff, Sauerstoff und Hitze</b>. Fehlt eines davon, geht das Feuer aus.')}
        <p>Löschen heisst: Eine Seite entfernen. Wasser senkt die Hitze, ein Kohlenstoffdioxidlöscher verdrängt den Sauerstoff, eine Löschdecke hält den Sauerstoff fern, eine Schneise im Wald entfernt den Brennstoff.</p>
        ${warnbox('<b>Gefahrensymbol «entzündlich»:</b> Leicht entzündliche Stoffe (zum Beispiel Brennsprit oder Aceton) gehören nie in die Nähe offener Flammen. Beachte die GHS-Symbole auf den Gefässen.')}` },
    { h: 'Lösche das Feuer',
      body: '<p>Schalte die drei Bedingungen ein und aus. Wähle ein Löschmittel und sieh, welche Seite des Feuerdreiecks fehlt.</p>', sim: 'feuer' },
    { h: 'Verhalten im Brandfall',
      body: `<ol><li><b>Brand melden:</b> Wer meldet? Was ist passiert? Wie viele sind betroffen? Wo? Dann auf Rückfragen warten.</li>
        <li><b>In Sicherheit bringen:</b> gefährdete Personen mitnehmen, Türen schliessen, Rettungsweg folgen, Aufzug nicht benutzen.</li>
        <li><b>Löschversuche</b> nur, wenn es sicher ist.</li></ol>
        ${warnbox('<b>Notrufe in der Schweiz:</b> 118 Feuerwehr, 117 Polizei, 144 Sanität, 112 europaweit. Prüfe die Nummern im Schulhaus nach.')}` },
    { h: 'Oxide und Rosten',
      body: `<p>Wenn ein Stoff mit Sauerstoff reagiert, entsteht ein <b>Oxid</b>. Kohle gibt Kohlenstoffdioxid, bei wenig Sauerstoff auch Kohlenstoffmonoxid. Eisen gibt Eisenoxide.</p>
        ${merk('<b>Feuer</b> ist eine schnelle Reaktion mit Flamme. <b>Rosten</b> ist eine langsame Reaktion. Beide nehmen Sauerstoff auf.')}` },
    { h: 'Kurz testen',
      check: { q: 'Mit Wasser löschst du ein Feuer. Welche Seite des Feuerdreiecks entfernst du?',
        options: ['Die Hitze.', 'Den Sauerstoff.', 'Den Brennstoff.', 'Keine.'],
        explain: 'Wasser kühlt den Brennstoff ab. Die Temperatur sinkt unter die Zündtemperatur.' } }
  ],
  q2: [
    { h: 'Elektrolyse von Wasser',
      body: `<p>Mit elektrischem Strom kann Wasser in seine Bestandteile zerlegt werden. Am Minuspol entsteht <b>Wasserstoff</b> (doppelt so viel Gas), am Pluspol <b>Sauerstoff</b>.</p>
        <ul><li><b>Knallgasprobe:</b> weist Wasserstoff nach.</li><li><b>Glimmspanprobe:</b> weist Sauerstoff nach.</li></ul>
        ${warnbox('<b>Sicherheit:</b> Die verdünnte Schwefelsäure im Wasser ist ätzend. Schutzbrille tragen. Verwende nicht Kochsalz anstelle von Schwefelsäure: Es entsteht dann ein giftiges Gas mit stechendem Geruch.')}
        <p>Oxide, aus denen sich Sauerstoff leicht abspalten lässt, heissen <b>brandfördernd</b>. Sie erhalten ein eigenes GHS-Symbol.</p>` },
    { h: 'Zerlege das Wasser',
      body: '<p>Schiebe die Zeit nach vorne. Beobachte, wie viel Gas auf jeder Seite entsteht. Das ist ein Modell mit Beispielwerten.</p>', sim: 'elektrolyse' },
    { h: 'Die Reaktionsgleichung',
      body: `<p>Im Unterschied zum Reaktionsschema in Worten benutzt du jetzt Formeln. Statt «=» steht ein <b>Reaktionspfeil</b>:</p>
        ${merk('2 H₂O → 2 H₂ + O₂<br>links: Ausgangsstoff, rechts: Produkte')}
        <p>Die Zahl vor der Formel (Koeffizient) gilt für die ganze Formel. Die tiefgestellte Zahl gilt nur für das Elementsymbol davor.</p>` },
    { h: 'Gleichungen ausgleichen',
      body: '<p>Wähle eine Reaktion und setze die Zahlen vor den Formeln. Links und rechts müssen gleich viele Atome stehen.</p>', sim: 'bilanz' },
    { h: 'Vorgerechnet: Atome zählen', worked: {
      given: 'Wie viele Sauerstoffatome sind in 3 Fe₂O₃ enthalten?',
      steps: [['Atome pro Formel', 'Fe₂O₃ hat 3 Sauerstoffatome.'], ['Faktor beachten', '3 · 3 = 9'], ['Antwort', '9 Sauerstoffatome.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Gleichung ist ausgeglichen?',
        options: ['2 H₂ + O₂ → 2 H₂O', 'H₂ + O₂ → H₂O', '2 H₂ + 2 O₂ → 2 H₂O', 'H₂ + 2 O₂ → H₂O'],
        explain: 'Links: 4 H und 2 O. Rechts: 4 H und 2 O. Nur diese Gleichung hat auf beiden Seiten gleich viele Atome.' } }
  ],
  q3: [
    { h: 'Die Thermit-Reaktion',
      body: `<p>Thermit besteht aus <b>Eisenoxid und Aluminium</b>. Nach der Zündung nimmt das Aluminium den Sauerstoff vom Eisenoxid auf:</p>
        ${merk('Eisenoxid + Aluminium → Eisen + Aluminiumoxid')}
        <p>Dabei wird so viel Hitze frei, dass das Eisen flüssig wird. Damit schweisst man Eisenbahnschienen. Der Stoff, der den Sauerstoff aufnimmt, heisst <b>Reduktionsmittel</b>.</p>` },
    { h: 'Metalle aus Erz',
      body: `<p>Edle Metalle wie Gold findest du in der Natur rein. <b>Unedle Metalle</b> kommen nur in Oxiden und anderen Verbindungen vor. Im Erz steckt neben Gestein ein Oxid.</p>
        <p>Im <b>Hochofen</b> wird Eisenoxid mit Kohle gezündet. Die Kohle nimmt den Sauerstoff auf: Eisenoxid + Kohle → Eisen + Kohlenstoffdioxid.</p>` },
    { h: 'Metalle und Geschichte',
      body: `<p>Die Reihenfolge Steinzeit, Bronzezeit (Kupfer), Eisenzeit und erst später Aluminium hängt damit zusammen, wie fest ein Metall den Sauerstoff bindet.</p>
        ${merk('Je fester ein Metall den Sauerstoff bindet, desto schwerer ist es, das Metall aus dem Oxid zu gewinnen.')}
        ${warnbox('<b>Sicherheit:</b> Gemische, bei denen ein Stoff Sauerstoff abspaltet und ein anderer ihn leicht aufnimmt, können explosionsgefährlich sein. Solche Versuche nur nach Anleitung der Lehrperson.')}` },
    { h: 'Vorgerechnet: Masse', worked: {
      given: 'In einem Beispiel reagieren 160 g Eisenoxid mit 54 g Aluminium vollständig. Welche Masse haben die Produkte?',
      steps: [['Massenerhaltung', 'Die Masse bleibt bei einer chemischen Reaktion gleich.'], ['Rechnung', '160 g + 54 g = 214 g'], ['Antwort', 'Alle Produkte zusammen haben 214 g.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welches Metall bindet den Sauerstoff am stärksten?',
        options: ['Aluminium (stärker als Eisen und Kupfer).', 'Gold.', 'Kupfer.', 'Silber.'],
        explain: 'Aluminium nimmt den Sauerstoff von Eisenoxid auf. Gold und Silber binden Sauerstoff kaum, deshalb gelten sie als edel.' } }
  ],
  q4: [
    { h: 'Aktivierungsenergie',
      body: `<p>Viele Reaktionen starten erst, wenn man <b>Aktivierungsenergie</b> zuführt. Danach können die Ausgangsstoffe reagieren. Manche Reaktionen laufen schon bei Raumtemperatur an (zum Beispiel können sich Putzlappen mit Leinöl selbst entzünden).</p>` },
    { h: 'Exotherm und endotherm',
      body: `${merk('<b>Exotherm:</b> Energie wird frei. Die Produkte haben weniger chemische Energie als die Ausgangsstoffe.<br><b>Endotherm:</b> Energie muss dauernd zugeführt werden. Die Produkte haben mehr chemische Energie.')}
        <p>Beispiele: Thermit-Reaktion und Feuer sind exotherm. Die Elektrolyse von Wasser ist endotherm.</p>` },
    { h: 'Das Energiediagramm',
      body: '<p>Wähle exotherm oder endotherm und verändere die Aktivierungsenergie. Die Kurve zeigt die Energie der Stoffe im Verlauf der Zeit. Das ist ein Modell mit Beispielwerten.</p>', sim: 'energie' },
    { h: 'Vorgerechnet: Frei werdende Energie', worked: {
      given: 'Die Ausgangsstoffe haben 500 kJ chemische Energie, die Produkte 200 kJ. Wie viel Energie wird frei?',
      steps: [['Vergleichen', 'Die Produkte haben weniger Energie: exotherm.'], ['Rechnung', '500 kJ − 200 kJ = 300 kJ'], ['Antwort', '300 kJ werden als thermische Energie und Strahlungsenergie frei.']] } },
    { h: 'Kurz testen',
      check: { q: 'Bei der Elektrolyse von Wasser muss dauernd Strom zugeführt werden. Welche Art von Reaktion ist das?',
        options: ['Eine endotherme Reaktion.', 'Eine exotherme Reaktion.', 'Keine Reaktion.', 'Eine Reaktion ohne Energie.'],
        explain: 'Bei einer endothermen Reaktion fliesst dauernd Energie in die Reaktion hinein.' } }
  ],
  q5: [
    { h: 'Wie sieht ein Atom aus?',
      body: `<p>Im Modell hat ein Atom einen Kern mit positiv geladenen <b>Protonen</b>. Aussen bewegen sich negativ geladene <b>Elektronen</b>. Die äussersten Elektronen entscheiden darüber, wie sich Atome verbinden.</p>
        <p><b>Edelgase</b> (18. Gruppe) geben keine Elektronen ab und nehmen keine auf. Sie reagieren nicht.</p>` },
    { h: 'Kationen und Anionen',
      body: '<p>Ordne die Vorgänge zu: Wird daraus ein Kation, ein Anion, oder bleibt das Atom unverändert?</p>', sim: 'ionen' },
    { h: 'Drei Arten der Bindung',
      body: `<ul><li><b>Salze:</b> Metall + Nichtmetall. Kationen und Anionen bilden ein Gitter (zum Beispiel Kochsalz: Na⁺ und Cl⁻).</li>
        <li><b>Metalle:</b> Metall-Kationen mit frei beweglichen Elektronen dazwischen.</li>
        <li><b>Moleküle:</b> Nichtmetall-Atome teilen sich Elektronen (zum Beispiel Methan, Wasser).</li></ul>
        <p>Weil sich gleich geladene Ionen abstossen, sind Salze <b>spröde</b>. Metalle sind <b>verformbar</b> und leiten Strom. Feste Salze leiten den Strom nicht, geschmolzene oder gelöste Salze schon.</p>` },
    { h: 'Vorgerechnet: Ladungsausgleich', worked: {
      given: 'Ein Calcium-Ion hat die Ladung 2+, ein Chlorid-Ion die Ladung 1−. Wie viele Chlorid-Ionen braucht es für ein Calcium-Ion?',
      steps: [['Ladungen vergleichen', '2+ muss durch 2 · 1− ausgeglichen werden.'], ['Rechnung', '2 : 1 = 2'], ['Antwort', 'Es braucht 2 Chlorid-Ionen pro Calcium-Ion.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum lassen sich Metalle verformen, Salze aber nicht?',
        options: ['Im Metallgitter passen sich die Elektronen an. Im Salzgitter rutschen gleich geladene Ionen nebeneinander und stossen sich ab.', 'Weil Metalle weicher sind.', 'Weil Salze Gas enthalten.', 'Weil Metalle keine Ionen haben.'],
        explain: 'Beim Verformen bleibt das Metallgitter zusammen. Beim Salz bricht das Gitter, weil sich gleiche Ladungen abstossen.' } }
  ],
  q6: [
    { h: 'Saure und basische Lösungen',
      body: `${merk('<b>Nichtmetalloxid</b> in Wasser gelöst: <b>saure</b> Lösung.<br><b>Metalloxid</b> in Wasser gelöst: <b>basische</b> Lösung.')}
        <p>Nach Brønsted gilt: <b>Säuren geben H⁺-Ionen ab, Basen nehmen H⁺-Ionen auf.</b> Beispiele: Salzsäure HCl, Schwefelsäure H₂SO₄, Natronlauge NaOH, Ammoniak NH₃.</p>
        ${warnbox('<b>Sicherheit:</b> Viele saure und basische Lösungen sind ätzend. Schutzbrille und Handschuhe tragen.')}` },
    { h: 'Saure oder basische Lösung?',
      body: '<p>Welche Lösung entsteht, wenn das Verbrennungsprodukt in Wasser gelöst wird?</p>', sim: 'oxid' },
    { h: 'Der pH-Wert',
      body: `<p>Der pH-Wert (0 bis 14) sagt, wie sauer oder basisch eine Lösung ist. Er zeigt die Anzahl Wasserstoff-Ionen.</p>
        ${merk('<b>pH 7</b> ist neutral. <b>pH &lt; 7</b> ist sauer, <b>pH &gt; 7</b> ist basisch.<br>Jeder pH-Schritt bedeutet den Faktor 10 bei den Wasserstoff-Ionen.')}
        <p>Mit pH-Papier oder einem Indikator wie Rotkraut-Saft kannst du den pH-Wert abschätzen.</p>` },
    { h: 'Neutralisation',
      body: '<p>Stelle Menge an Salzsäure und Natronlauge (gleiche Konzentration) ein. Beobachte, was übrig bleibt. Das ist ein Modell.</p>', sim: 'neutral' },
    { h: 'Vorgerechnet: pH-Faktor', worked: {
      given: 'Lösung A hat pH 3, Lösung B pH 5. Wie oft mehr Wasserstoff-Ionen hat A?',
      steps: [['Unterschied', '5 − 3 = 2 pH-Schritte'], ['Faktor', '10² = 100'], ['Antwort', 'A enthält 100-mal mehr Wasserstoff-Ionen als B.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wasserstoff-Ionen und Hydroxid-Ionen treffen aufeinander. Was entsteht?',
        options: ['Wasser.', 'Salz.', 'Sauerstoff.', 'Ein Edelgas.'],
        explain: 'H⁺ und OH⁻ reagieren zu H₂O. Das ist der Kern der Neutralisation.' } }
  ]
};
const GOALS = {
  q1: ['das Feuerdreieck anwenden', 'sich im Brandfall richtig verhalten'],
  q2: ['die Elektrolyse von Wasser beschreiben', 'Reaktionsgleichungen lesen und ausgleichen'],
  q3: ['Sauerstofftauschreaktionen erklären', 'Reduktionsmittel erkennen'],
  q4: ['exotherme und endotherme Reaktionen unterscheiden', 'Energiediagramme interpretieren'],
  q5: ['Ionen und Bindungsarten unterscheiden', 'Eigenschaften mit dem Teilchenmodell erklären'],
  q6: ['Säuren, Basen und den pH-Wert beschreiben', 'die Neutralisation erklären']
};
const LEARN = {
  'q1-dreieck': 'Das Feuerdreieck', 'q1-loeschen': 'Lösche das Feuer', 'q1-brandfall': 'Verhalten im Brandfall', 'q1-oxid': 'Oxide und Rosten', 'q1-rosten': 'Oxide und Rosten', 'q1-ghs': 'Das Feuerdreieck',
  'q2-elektro': 'Elektrolyse von Wasser', 'q2-nachweis': 'Elektrolyse von Wasser', 'q2-pfeil': 'Die Reaktionsgleichung', 'q2-atome': 'Vorgerechnet: Atome zählen', 'q2-gleichung': 'Gleichungen ausgleichen', 'q2-brandfoerdernd': 'Elektrolyse von Wasser',
  'q3-thermit': 'Die Thermit-Reaktion', 'q3-reduktion': 'Die Thermit-Reaktion', 'q3-erz': 'Metalle aus Erz', 'q3-edel': 'Metalle aus Erz', 'q3-zeit': 'Metalle und Geschichte', 'q3-gesamt': 'Vorgerechnet: Masse',
  'q4-aktiv': 'Aktivierungsenergie', 'q4-exo': 'Exotherm und endotherm', 'q4-endo': 'Exotherm und endotherm', 'q4-frei': 'Vorgerechnet: Frei werdende Energie', 'q4-max': 'Das Energiediagramm', 'q4-diagramm': 'Das Energiediagramm',
  'q5-aufbau': 'Wie sieht ein Atom aus?', 'q5-edelgas': 'Wie sieht ein Atom aus?', 'q5-ionen': 'Kationen und Anionen', 'q5-salz': 'Drei Arten der Bindung', 'q5-leit': 'Drei Arten der Bindung', 'q5-anionen': 'Vorgerechnet: Ladungsausgleich',
  'q6-oxid': 'Saure und basische Lösungen', 'q6-saeure': 'Saure und basische Lösungen', 'q6-ph': 'Vorgerechnet: pH-Faktor', 'q6-skala': 'Der pH-Wert', 'q6-neutral': 'Neutralisation', 'q6-essig': 'Neutralisation'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Zündholz', pw: 'zündet' },
  { xp: 80, name: 'Flamme', pw: 'brennt' },
  { xp: 200, name: 'Hochofen', pw: 'gewinnt Metalle' },
  { xp: 380, name: 'Ion', pw: 'trägt Ladung' },
  { xp: 620, name: 'Salzgitter', pw: 'hält zusammen' },
  { xp: 920, name: 'Edelgas', pw: 'bleibt gelassen' }
];

/* ---------- Thema: 8_4 Chemische Reaktionen erforschen ---------- */
const TOPIC = {
  id: 'nt8-4', storeKey: 'halingen-nt8-4-v1', other: { title: '7_7 Chemische Reaktionen untersuchen', href: '7_7_Chemische_Reaktionen_untersuchen.html' },
  title: 'Chemische Reaktionen erforschen', lead: 'Sauerstoff, Energie, Ionen und Säuren', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Links die Ausgangsstoffe, rechts die Produkte.', 'Atome gehen nicht verloren: Gleichungen ausgleichen.'],
  formulas: [
    ['Feuerdreieck', 'Brennstoff, Sauerstoff, Hitze', 'Löschen: eine Seite entfernen'],
    ['Wasser zerlegen', '2 H₂O → 2 H₂ + O₂', 'Knallgas- und Glimmspanprobe'],
    ['Energie', 'exotherm: Energie wird frei', 'endotherm: Energie wird zugeführt'],
    ['Ionen', 'Metall: Kation (+)', 'Nichtmetall: Anion (−)'],
    ['pH-Wert', '7 neutral, &lt; 7 sauer', '&gt; 7 basisch, Faktor 10 pro Schritt'],
    ['Neutralisation', 'H⁺ + OH⁻ → H₂O', 'Eindampfen: Salz']
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
const SIMS = {
  ionen(el) {
    sorter(el, [
      { t: 'Ein Natrium-Atom gibt ein Elektron ab', ok: ['ka'], why: 'Metall-Atome geben Elektronen ab und werden zu positiv geladenen Kationen.' },
      { t: 'Ein Chlor-Atom nimmt ein Elektron auf', ok: ['an'], why: 'Nichtmetall-Atome nehmen Elektronen auf und werden zu negativ geladenen Anionen.' },
      { t: 'Ein Magnesium-Atom gibt zwei Elektronen ab', ok: ['ka'], why: 'Es entsteht ein Kation mit der Ladung 2+.' },
      { t: 'Ein Sauerstoff-Atom nimmt zwei Elektronen auf', ok: ['an'], why: 'Es entsteht ein Anion mit der Ladung 2−.' },
      { t: 'Ein Argon-Atom (Edelgas)', ok: ['ed'], why: 'Edelgase nehmen keine Elektronen auf und geben keine ab.' },
      { t: 'Ein Calcium-Atom gibt zwei Elektronen ab', ok: ['ka'], why: 'Calcium ist ein Metall. Es wird zum Kation.' }
    ], { ka: 'Kation (positiv)', an: 'Anion (negativ)', ed: 'Bleibt Atom' }, 'Was entsteht aus dem Atom?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  oxid(el) {
    sorter(el, [
      { t: 'Schwefel verbrennt, das Oxid wird in Wasser gelöst', ok: ['sa'], why: 'Schwefeldioxid ist ein Nichtmetalloxid. Die Lösung ist sauer.' },
      { t: 'Magnesium verbrennt, das Oxid wird in Wasser gelöst', ok: ['ba'], why: 'Magnesiumoxid ist ein Metalloxid. Die Lösung ist basisch.' },
      { t: 'Kohlenstoff verbrennt, das Gas wird in Wasser gelöst', ok: ['sa'], why: 'Kohlenstoffdioxid in Wasser ergibt Kohlensäure, eine saure Lösung.' },
      { t: 'Natrium verbrennt, das Oxid wird in Wasser gelöst', ok: ['ba'], why: 'Natrium ist ein Metall. Die Lösung des Oxids ist basisch.' },
      { t: 'Phosphor verbrennt, das Oxid wird in Wasser gelöst', ok: ['sa'], why: 'Phosphor ist ein Nichtmetall. Es entsteht Phosphorsäure, eine saure Lösung.' },
      { t: 'Calcium verbrennt, das Oxid wird in Wasser gelöst', ok: ['ba'], why: 'Calcium ist ein Metall. Es entsteht Kalkwasser, eine basische Lösung.' }
    ], { sa: 'Saure Lösung', ba: 'Basische Lösung' }, 'Saure oder basische Lösung?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  feuer(el) {
    el.innerHTML = `<div class="sim"><div class="flamebox" aria-hidden="true"><div class="flame" id="fl"></div></div>
      <label class="chk"><input type="checkbox" id="cb" checked> Brennstoff vorhanden</label>
      <label class="chk"><input type="checkbox" id="co" checked> Sauerstoff vorhanden</label>
      <label class="chk"><input type="checkbox" id="ch" checked> Hitze vorhanden</label>
      <div class="seg3" role="group" aria-label="Löschmittel"><button class="btn sm" data-l="h">Wasser</button><button class="btn sm" data-l="o">CO₂-Löscher oder Löschdecke</button><button class="btn sm" data-l="b">Brennstoff entfernen</button><button class="btn sm" data-l="r">Neu entzünden</button></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const b = $id('cb').checked, o = $id('co').checked, h = $id('ch').checked, on = b && o && h;
      $id('fl').classList.toggle('on', on);
      const miss = []; if (!b) miss.push('Brennstoff'); if (!o) miss.push('Sauerstoff'); if (!h) miss.push('Hitze');
      $id('ro').innerHTML = on ? 'Alle drei Seiten des Feuerdreiecks sind da: Das Feuer brennt.' : `Das Feuer ist aus. Es fehlt: <b>${miss.join(' und ')}</b>.`;
    }
    ['cb', 'co', 'ch'].forEach(id => $id(id).addEventListener('change', upd));
    el.querySelectorAll('[data-l]').forEach(x => x.addEventListener('click', () => {
      const k = x.dataset.l;
      if (k === 'h') $id('ch').checked = false; else if (k === 'o') $id('co').checked = false; else if (k === 'b') $id('cb').checked = false; else { $id('cb').checked = true; $id('co').checked = true; $id('ch').checked = true; }
      upd();
    }));
    upd();
  },

  elektrolyse(el) {
    el.innerHTML = `<div class="sim">${sl('et', 'Zeit', 0, 10, 1, 0, 'min')}
      <div class="brow"><span class="bname">Wasserstoff (Minuspol)</span><div class="btrack"><div class="bfill th" id="eh"></div></div><b class="mono bval" id="vh"></b></div>
      <div class="brow"><span class="bname">Sauerstoff (Pluspol)</span><div class="btrack"><div class="bfill" id="eo"></div></div><b class="mono bval" id="vo"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const t = +$id('et').value, h = 2 * t, o = t;
      $id('etv').textContent = fmt(t);
      $id('eh').style.width = (h / 20 * 100) + '%'; $id('eo').style.width = (o / 20 * 100) + '%';
      $id('vh').textContent = h + ' mL'; $id('vo').textContent = o + ' mL';
      $id('ro').innerHTML = t === 0 ? 'Noch läuft kein Strom lange genug.' : `Nach ${fmt(t)} min: ${h} mL Wasserstoff und ${o} mL Sauerstoff. Es entsteht <b>doppelt so viel</b> Wasserstoff wie Sauerstoff (Beispielwerte).<br>2 H₂O → 2 H₂ + O₂`;
    }
    $id('et').addEventListener('input', upd); $id('eh').style.width = '0%'; $id('eo').style.width = '0%'; nf(el, upd);
  },

  bilanz(el) {
    const R = {
      w: { n: 'Wasser entsteht', L: [['H₂', { H: 2 }], ['O₂', { O: 2 }]], P: [['H₂O', { H: 2, O: 1 }]], ok: [2, 1, 2] },
      m: { n: 'Magnesium verbrennt', L: [['Mg', { Mg: 1 }], ['O₂', { O: 2 }]], P: [['MgO', { Mg: 1, O: 1 }]], ok: [2, 1, 2] },
      c: { n: 'Methan verbrennt', L: [['CH₄', { C: 1, H: 4 }], ['O₂', { O: 2 }]], P: [['CO₂', { C: 1, O: 2 }], ['H₂O', { H: 2, O: 1 }]], ok: [1, 2, 1, 2] },
      f: { n: 'Eisen rostet', L: [['Fe', { Fe: 1 }], ['O₂', { O: 2 }]], P: [['Fe₂O₃', { Fe: 2, O: 3 }]], ok: [4, 3, 2] }
    };
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Reaktion">${Object.keys(R).map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-r="${k}">${R[k].n}</button>`).join('')}</div>
      <div class="eq" id="eq"></div><p class="readout" id="ro" aria-live="polite"></p></div>`;
    let k = 'w', c = [];
    function draw() {
      const r = R[k], terms = r.L.concat(r.P), nL = r.L.length;
      const cell = (t, i) => `<span class="term"><button class="btn sm" data-d="${i}" aria-label="weniger">−</button><b class="mono">${c[i]}</b><button class="btn sm" data-u="${i}" aria-label="mehr">+</button> ${t[0]}</span>`;
      $id('eq').innerHTML = terms.map((t, i) => (i === nL ? '<span class="arr">→</span>' : (i ? '<span class="arr">+</span>' : '')) + cell(t, i)).join('');
      const L = {}, P = {};
      r.L.forEach((t, i) => { for (const e in t[1]) L[e] = (L[e] || 0) + c[i] * t[1][e]; });
      r.P.forEach((t, i) => { for (const e in t[1]) P[e] = (P[e] || 0) + c[nL + i] * t[1][e]; });
      const els = [...new Set(Object.keys(L).concat(Object.keys(P)))], bal = els.every(e => (L[e] || 0) === (P[e] || 0));
      $id('ro').innerHTML = els.map(e => `${e}: links ${L[e] || 0}, rechts ${P[e] || 0}`).join('<br>') + `<br><b>${bal ? 'Ausgeglichen!' : 'Noch nicht ausgeglichen.'}</b>`;
      el.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.d; c[i] = Math.max(1, c[i] - 1); draw(); }));
      el.querySelectorAll('[data-u]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.u; c[i] = Math.min(9, c[i] + 1); draw(); }));
    }
    function set(key) { k = key; c = R[k].L.concat(R[k].P).map(() => 1); el.querySelectorAll('[data-r]').forEach(b => b.classList.toggle('on', b.dataset.r === k)); draw(); }
    el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => set(b.dataset.r)));
    set('w');
  },

  energie(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Reaktionsart"><button class="btn sm on" data-t="x">Exotherm</button><button class="btn sm" data-t="n">Endotherm</button></div>
      ${sl('ea', 'Aktivierungsenergie', 10, 50, 10, 30, 'kJ')}
      <svg viewBox="0 0 300 150" class="lensvg" role="img" aria-label="Energiediagramm"><line x1="20" y1="10" x2="20" y2="140" class="ax"/><line x1="20" y1="140" x2="290" y2="140" class="ax"/><polyline id="pl" points="" class="eline"/></svg>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let t = 'x';
    function upd() {
      const a = +$id('ea').value, S = t === 'x' ? 100 : 50, E = t === 'x' ? 50 : 100;       // Energieniveau (höher = mehr Energie)
      const y = v => 140 - v;
      $id('ea' + 'v').textContent = fmt(a);
      $id('pl').setAttribute('points', `20,${y(S)} 70,${y(S)} 130,${y(S + a)} 200,${y(E)} 280,${y(E)}`);
      el.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('on', b.dataset.t === t));
      const d = Math.abs(S - E);
      $id('ro').innerHTML = `Ausgangsstoffe: ${S} kJ. Produkte: ${E} kJ. Aktivierungsenergie: ${fmt(a)} kJ.<br>` + (t === 'x' ? `Die Reaktion gibt <b>${d} kJ</b> ab (exotherm).` : `Die Reaktion benötigt <b>${d} kJ</b> (endotherm).`) + ' Beispielwerte (Modell).';
    }
    el.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => { t = b.dataset.t; upd(); }));
    $id('ea').addEventListener('input', upd); upd();
  },

  neutral(el) {
    el.innerHTML = `<div class="sim">${sl('na', 'Salzsäure (sauer)', 0, 20, 2, 10, 'mL')}${sl('nb', 'Natronlauge (basisch)', 0, 20, 2, 10, 'mL')}
      <div class="trio"><div><span class="k">Lösung</span><b class="mono" id="n1"></b></div><div><span class="k">H⁺ übrig</span><b class="mono" id="n2"></b></div><div><span class="k">OH⁻ übrig</span><b class="mono" id="n3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const a = +$id('na').value, b = +$id('nb').value, d = a - b, w = Math.min(a, b);
      $id('nav').textContent = fmt(a); $id('nbv').textContent = fmt(b);
      $id('n1').textContent = d > 0 ? 'sauer' : d < 0 ? 'basisch' : 'neutral';
      $id('n2').textContent = String(Math.max(0, d) / 2); $id('n3').textContent = String(Math.max(0, -d) / 2);
      $id('ro').innerHTML = `${w / 2} Teilchenpaare H⁺ und OH⁻ reagieren zu Wasser. ` + (d === 0 && a > 0 ? 'Die Lösung ist <b>neutral</b>. Beim Eindampfen bleibt festes Kochsalz zurück.' : d > 0 ? 'Es bleibt Säure übrig: Die Lösung ist sauer.' : d < 0 ? 'Es bleibt Base übrig: Die Lösung ist basisch.' : 'Es ist noch nichts vorhanden.') + ' Modell mit Beispielwerten.';
    }
    $id('na').addEventListener('input', upd); $id('nb').addEventListener('input', upd); upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt8-4","titel":"Chemische Reaktionen erforschen","kapitel":"NaTech 8, Kapitel 4","audio":"nt8-4"});
