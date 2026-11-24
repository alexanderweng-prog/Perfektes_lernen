// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/7_6_Arbeiten_im_Labor.html
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

/* ---------- Inhalt: 7_6 Arbeiten im Labor, 6 Stationen ----------
   Quelle: Lehrerkommentar zu Kapitel 6 «Arbeiten im Labor» (eigene Formulierungen). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'r1', nr: 1, title: 'Stoffe und Laborregeln', sub: 'Sicher arbeiten',
    items: [
      { id: 'r1-stoff', topic: 'Stoff und Gegenstand', make() {
        return mc('Was ist der Unterschied zwischen einem Stoff und einem Gegenstand?', ['Ein Gegenstand (zum Beispiel ein Wecker) besteht aus Stoffen (zum Beispiel Metall und Glas).', 'Stoffe sind nur Kleiderstoffe.', 'Gegenstände bestehen aus nichts.', 'Es gibt keinen Unterschied.'],
          'Im Alltag meint «Stoff» oft Kleiderstoff. In der Chemie sind Stoffe die Materialien, aus denen Gegenstände bestehen.');
      } },
      { id: 'r1-chemie', topic: 'Womit sich die Chemie befasst', make() {
        return mc('Womit beschäftigt sich die Chemie?', ['Mit allen Stoffen, auch mit natürlichen. Künstliche Stoffe sind nicht dasselbe wie chemische Stoffe.', 'Nur mit künstlich hergestellten Stoffen.', 'Nur mit Giftstoffen.', 'Nur mit Stoffen aus dem Labor.'],
          'Auch Luft, Wasser und Holz sind Stoffe. Die Welt der Stoffe ist keine Welt voller Gefahren.');
      } },
      { id: 'r1-schutz', topic: 'Schutzbrille und Haare', make() {
        return mc('Wie schützt du dich beim Experimentieren?', ['Ich trage immer eine Schutzbrille und binde lange Haare zusammen.', 'Ich trage die Brille nur beim Brenner.', 'Ich lasse lange Haare offen.', 'Ich arbeite ohne Schutz, wenn es schnell geht.'],
          'Die Schutzbrille wird dauernd getragen, nicht nur bei gefährlich scheinenden Versuchen.');
      } },
      { id: 'r1-essen', topic: 'Essen und Trinken', make() {
        return mc('Du bist im Labor durstig. Was gilt?', ['Im Labor wird nicht gegessen und nicht getrunken. Pause machst du ausserhalb.', 'Aus sauberen Bechergläsern darfst du trinken.', 'Du darfst Stoffe probieren, wenn sie gut riechen.', 'Du darfst essen, wenn du fertig bist.'],
          'Chemikalien können gesundheitsschädlich sein. Darum schmeckst du nie an Stoffen.');
      } },
      { id: 'r1-geruch', topic: 'Gerüche prüfen', make() {
        return mc('Wie prüfst du den Geruch eines Stoffes?', ['Ich fächle den Dampf vorsichtig mit der Hand zur Nase und rieche nie direkt am Gefäss.', 'Ich halte die Nase direkt über das Gefäss.', 'Ich atme tief ein.', 'Ich rieche nie an etwas.'],
          'Auch gebrauchte Stoffe gibst du nie in das Vorratsgefäss zurück, aus dem sie stammen.');
      } },
      { id: 'r1-anleit', topic: 'Anleitung lesen', make() {
        return mc('Was gehört zu sicherem Arbeiten, bevor du beginnst?', ['Die Anleitung genau lesen, die Gefahrensymbole der Stoffe beachten und den Arbeitsplatz ordnen.', 'Sofort losarbeiten.', 'Nur zuschauen, wie andere es machen.', 'Alle Chemikalien ausprobieren.'],
          'Auch scheinbar harmlose Stoffe aus dem Haushalt können gefährlich werden. Kenntnis der Gefahr hilft, sie abzuwenden.');
      } }
    ]
  },
  {
    id: 'r2', nr: 2, title: 'Gasbrenner und Chemikalien', sub: 'Heizen, Symbole und Abfälle',
    items: [
      { id: 'r2-unterlage', topic: 'Unterlage und Lüftung', make() {
        return mc('Worauf achtest du bei der Arbeit mit dem Gasbrenner?', ['Auf eine wärmefeste, asbestfreie Unterlage (mindestens 45 cm × 45 cm), gute Lüftung und höchstens acht Brenner gleichzeitig im Zimmer.', 'Der Brenner steht direkt auf dem Pult.', 'Ein Brenner genügt für das ganze Zimmer ohne Lüftung.', 'Haare dürfen offen sein.'],
          'Weil Brandgefahr besteht, braucht die Lehrperson eine gute Übersicht. Darum arbeitest du oft in Dreiergruppen.');
      } },
      { id: 'r2-flamme', topic: 'Flammen unterscheiden', make() {
        return mc('Was unterscheidet die leuchtende von der nicht leuchtenden (rauschenden) Flamme?', ['Die leuchtende Flamme hat wenig Luft, russt und ist weniger heiss. Die rauschende Flamme hat mehr Luft und ist heisser.', 'Die leuchtende Flamme ist heisser.', 'Beide sind gleich heiss.', 'Die Luftzufuhr spielt keine Rolle.'],
          'Mit der Luftregulierung stellst du die Flamme ein. Die heisseste Stelle liegt über dem Innenkegel.');
      } },
      { id: 'r2-flaeche', topic: 'Grösse der Unterlage', ext: true, make() {
        const s = rnd([[45, 45], [40, 60], [50, 50], [60, 60], [45, 60]]), a = s[0] * s[1];
        return num(`Eine wärmefeste Unterlage ist ${fmt(s[0])} cm lang und ${fmt(s[1])} cm breit. Wie gross ist die Fläche?`, 'cm²', a, 'Fläche = Länge · Breite', `${fmt(s[0])} cm · ${fmt(s[1])} cm = ${fmt(a)} cm²`);
      } },
      { id: 'r2-ghs', topic: 'Gefahrensymbole', make() {
        return mc('Welche Gefahrensymbole (GHS) sind in der Schule besonders wichtig?', ['Hochentzündlich, brandfördernd, Gas unter Druck, ätzend und umweltgefährlich.', 'Nur das Symbol «giftig».', 'Gar keine.', 'Nur Symbole auf Lebensmitteln.'],
          'GHS heisst Globally Harmonized System. Giftige und krebserzeugende Stoffe dürfen im Schulunterricht nicht verwendet werden.');
      } },
      { id: 'r2-abfall', topic: 'Abfälle', make() {
        return mc('Wohin gehören Abfälle aus dem Experimentieren?', ['In die dafür vorgesehenen Behälter: Lösungsmittel, Schwermetalllösungen und Glasbruch getrennt.', 'In den Hausmüll.', 'In den Abfluss.', 'Alles in einen Behälter.'],
          'Leere Gaskartuschen gehören in den Metallabfall. Beachte die Hinweise der Lehrperson.');
      } },
      { id: 'r2-notfall', topic: 'Im Notfall', make() {
        return mc('Was tust du im Notfall mit Chemikalien?', ['Sofort die Lehrperson rufen. Bei ätzenden Stoffen auf Haut oder Auge lange mit viel Wasser spülen. Tox Info Suisse hat die Nummer 145.', 'Abwarten, ob es von selbst vergeht.', 'Nichts melden.', 'Die Stoffe trinken, um sie zu verdünnen.'],
          'Im Ernstfall muss sofort korrekt gehandelt werden. Darum kennst du die Abläufe vorher.');
      } }
    ]
  },
  {
    id: 'r3', nr: 3, title: 'Laborgeräte und Messen', sub: 'Volumen und Masse',
    items: [
      { id: 'r3-glas', topic: 'Glas und Kunststoff', make() {
        return mc('Wie gehst du mit Glas- und Kunststoffgeräten um?', ['Glas ist hitzebeständig, aber zerbrechlich. Kunststoffgeräte erhitzt du nicht über dem Brenner.', 'Beide kann man direkt in die Flamme halten.', 'Kunststoff ist hitzebeständiger als Glas.', 'Glas geht nie kaputt.'],
          'Glasgeräte reinigst du mit passenden Bürsten und behandelst sie sorgfältig.');
      } },
      { id: 'r3-skala', topic: 'Skalen', make() {
        return mc('Wie unterscheiden sich die Skalen bei Messzylinder und Pipette?', ['Beim Messzylinder steigt die Skala von unten nach oben. Bei Pipette und Bürette läuft sie von oben nach unten.', 'Alle Skalen laufen von oben nach unten.', 'Bei Messzylinder und Pipette sind sie gleich.', 'Eine Skala gibt es nur bei der Waage.'],
          'Beim Ablesen beachtest du den Meniskus, also die Wölbung der Flüssigkeitsoberfläche, und schaust waagrecht darauf.');
      } },
      { id: 'r3-pipette', topic: 'Pipettieren', make() {
        return mc('Wie füllst du eine Messpipette?', ['Immer mit Peleusball oder anderer Pipettierhilfe, nie mit dem Mund.', 'Mit dem Mund ansaugen.', 'Mit dem Finger ansaugen.', 'Gar nicht, man giesst direkt.'],
          'Das Ansaugen mit dem Mund ist gefährlich, weil Flüssigkeit in den Mund gelangen kann.');
      } },
      { id: 'r3-masse', topic: 'Masse und Gewicht', make() {
        return mc('Welcher Begriff ist in den Naturwissenschaften richtig, wenn du mit der Waage misst?', ['Masse.', 'Gewicht.', 'Volumen.', 'Dichte.'],
          'Im Alltag sagt man oft Gewicht. Eine Waage zeigt aber die Masse, in Gramm oder Kilogramm. Eine Waage hat eine Maximallast und eine bestimmte Genauigkeit.');
      } },
      { id: 'r3-ml', topic: 'Millilitern in Liter', make() {
        const n = rnd([250, 500, 750, 100, 1500, 50]), l = r2(n / 1000);
        return num(`Ein Becherglas fasst ${fmt(n)} mL. Wie viele Liter sind das?`, 'L', l, '1 L = 1000 mL', `${fmt(n)} mL : 1000 = ${fmt(l)} L`);
      } },
      { id: 'r3-cm3', topic: 'Liter in Kubikzentimeter', make() {
        const l = rnd([0.5, 1, 1.5, 2, 3]), c = l * 1000;
        return num(`Ein Gefäss fasst ${fmt(l)} Liter. Wie viele Kubikzentimeter (cm³) sind das? Es gilt 1 L = 1000 cm³.`, 'cm³', c, 'Multipliziere mit 1000.', `${fmt(l)} L · 1000 = ${fmt(c)} cm³`);
      } }
    ]
  },
  {
    id: 'r4', nr: 4, title: 'Stoffeigenschaften', sub: 'Dichte, Magnetismus und Zustände',
    items: [
      { id: 'r4-magnet', topic: 'Magnetismus', make() {
        return mc('Welche Stoffe werden von einem Magneten angezogen?', ['Eisen, Nickel und Kobalt (zum Beispiel Münzen aus reinem Nickel).', 'Alle Metalle.', 'Kupfer und Aluminium.', 'Alle festen Stoffe.'],
          'Nicht jedes Metall ist magnetisch. Du untersuchst Stoffe (Materialien), nicht Gegenstände.');
      } },
      { id: 'r4-ph', topic: 'pH-Wert messen', make() {
        return mc('Wie untersuchst du mit pH-Papier einen Feststoff oder ein Gas?', ['Man befeuchtet das pH-Papier und hält es ins Gas oder streicht über die Oberfläche des Feststoffs.', 'Gar nicht möglich.', 'Man taucht den Feststoff in das trockene Papier.', 'Man erhitzt das Papier.'],
          'Der pH-Wert kann eigentlich nur bei Flüssigkeiten gemessen werden. Bei Gasen und Feststoffen hilft das befeuchtete Papier.');
      } },
      { id: 'r4-dichte', topic: 'Dichte und Schwimmen', make() {
        return mc('Ein Körper hat eine kleinere Dichte als Wasser (1 g/cm³). Was geschieht?', ['Er schwimmt auf dem Wasser.', 'Er sinkt zu Boden.', 'Er löst sich auf.', 'Er schmilzt.'],
          'Die Dichte gibt an, wie viel Masse in einem bestimmten Volumen steckt. Körper mit grösserer Dichte als Wasser sinken.');
      } },
      { id: 'r4-dichte-num', topic: 'Dichte berechnen', make() {
        const s = rnd([[54, 20], [100, 50], [78, 10], [27, 10], [160, 20], [45, 50]]), d = r2(s[0] / s[1]);
        return num(`Ein Quader hat die Masse ${fmt(s[0])} g und das Volumen ${fmt(s[1])} cm³. Wie gross ist seine Dichte?`, 'g/cm³', d, 'Dichte = Masse : Volumen', `ρ = ${fmt(s[0])} g : ${fmt(s[1])} cm³ = ${fmt(d)} g/cm³`);
      } },
      { id: 'r4-masse-num', topic: 'Masse aus der Dichte', ext: true, make() {
        const s = rnd([[2.7, 10], [7.8, 5], [0.7, 20], [1, 50], [8.9, 10]]), m = r2(s[0] * s[1]);
        return num(`Ein Stoff hat die Dichte ${fmt(s[0])} g/cm³. Welche Masse hat ${fmt(s[1])} cm³ davon?`, 'g', m, 'Masse = Dichte · Volumen', `m = ${fmt(s[0])} g/cm³ · ${fmt(s[1])} cm³ = ${fmt(m)} g`);
      } },
      { id: 'r4-uebergang', topic: 'Zustandsänderungen', make() {
        return mc('Wie heisst der Übergang von flüssig zu gasförmig und der von gasförmig zu flüssig?', ['Verdampfen und Kondensieren.', 'Schmelzen und Erstarren.', 'Erstarren und Schmelzen.', 'Sublimieren und Resublimieren.'],
          'Weitere Namen: Schmelzen (fest zu flüssig), Erstarren (flüssig zu fest), Sublimieren (fest zu gasförmig), Resublimieren (gasförmig zu fest). Wasser schmilzt bei 0 °C und siedet bei 100 °C.');
      } }
    ]
  },
  {
    id: 'r5', nr: 5, title: 'Trennverfahren', sub: 'Im Labor und im Alltag',
    items: [
      { id: 'r5-filter', topic: 'Filtration', make() {
        return mc('Wie funktioniert die Filtration?', ['Ein Filter hält feste Teilchen zurück, die zu gross für die Poren sind (Rückstand). Die Flüssigkeit läuft als Filtrat hindurch.', 'Der Filter löst die Feststoffe auf.', 'Der Filter hält Flüssigkeit zurück.', 'Man erhitzt das Gemisch.'],
          'So trennst du zum Beispiel Sand und Salzwasser. Etwas Salzwasser bleibt im Filterpapier hängen.');
      } },
      { id: 'r5-extrakt', topic: 'Extraktion', make() {
        return mc('Beim Teekochen lösen sich Stoffe aus den Teeblättern. Wie heisst dieser Vorgang?', ['Extraktion.', 'Destillation.', 'Chromatografie.', 'Filtration.'],
          'Im heissen Wasser lösen sich einige Bestandteile, wasserunlösliche bleiben im Teebeutel. Die Teilchen bewegen sich bei höherer Temperatur schneller, darum verteilt sich der Tee schneller.');
      } },
      { id: 'r5-destill', topic: 'Destillation', make() {
        return mc('Wie trennt man bei der Destillation Wasser und Ethanol aus Rotwein?', ['Man erhitzt vorsichtig. Der Stoff mit dem tieferen Siedepunkt verdampft zuerst und wird danach wieder abgekühlt (Destillat).', 'Man kühlt auf −50 °C.', 'Man filtert durch Papier.', 'Man schüttelt kräftig.'],
          'Der Rotwein wird nicht über etwa 85 °C erhitzt. Die Destillation von Erdöl ist nur ein Demonstrationsexperiment der Lehrperson.');
      } },
      { id: 'r5-adsorp', topic: 'Adsorption', make() {
        return mc('Wie entfärbst du mit Aktivkohle ein Getränk wie Cola?', ['Die Farbstoffe lagern sich an der Aktivkohle an (Adsorption). Danach filtriert man die Kohle ab.', 'Man verdampft das Getränk.', 'Man kühlt es ab.', 'Man rührt Zucker ein.'],
          'Für gute Ergebnisse braucht man frische Aktivkohle. Wärmen hilft zusätzlich.');
      } },
      { id: 'r5-chrom', topic: 'Chromatografie', make() {
        return mc('Wie funktioniert die Chromatografie mit Filzstiftfarben?', ['Das Laufmittel (Wasser) saugt sich im Papier hoch und nimmt die Farbstoffe verschieden weit mit. So werden sie getrennt.', 'Die Farben verdampfen.', 'Die Farben werden gefiltert.', 'Das Papier verbrennt.'],
          'Laboranten trennen so zum Beispiel Blattfarbstoffe. Dunkle, braune und schwarze Stifte eignen sich besonders.');
      } },
      { id: 'r5-alltag', topic: 'Trennverfahren im Alltag', make() {
        return mc('Wo kommen Trennverfahren im Alltag vor?', ['In der Waschmaschine, in der Kläranlage, bei der Abfalltrennung und beim Kaffee- und Teekochen.', 'Nur im Labor.', 'Nur in der Industrie.', 'Nirgends.'],
          'In der Kläranlage werden viele Stoffe aus dem Abwasser entfernt, bevor es in ein Gewässer gelangt.');
      } },
      { id: 'r5-anteil', topic: 'Anteil im Gemisch', make() {
        const s = rnd([[50, 45], [40, 30], [80, 60], [100, 85], [20, 15]]), p = r2(s[1] / s[0] * 100);
        return num(`Aus ${fmt(s[0])} g Steinsalz-Gemisch bleiben nach dem Lösen und Filtrieren ${fmt(s[0] - s[1])} g Sand zurück. Wie viel Prozent des Gemischs sind Salz?`, '%', p, 'Salzmasse = Gemisch − Sand. Dann Salz : Gemisch · 100 %.', `Salz: ${fmt(s[0])} g − ${fmt(s[0] - s[1])} g = ${fmt(s[1])} g<br>${fmt(s[1])} g : ${fmt(s[0])} g · 100 % = ${fmt(p)} %`);
      } },
      { id: 'r5-diff', topic: 'Siedepunkte', ext: true, make() {
        const s = rnd([[100, 78], [100, 65], [100, 56], [100, 80]]), d = s[0] - s[1];
        return num(`Wasser siedet bei ${fmt(s[0])} °C, ein anderer Stoff bei ${fmt(s[1])} °C (Beispielwert). Um wie viele Grad liegen die Siedepunkte auseinander?`, '°C', d, 'Ziehe den kleineren vom grösseren Wert ab. Der Stoff mit dem tieferen Siedepunkt verdampft zuerst.', `${fmt(s[0])} °C − ${fmt(s[1])} °C = ${fmt(d)} °C`);
      } }
    ]
  },
  {
    id: 'r6', nr: 6, title: 'Gemische und Teilchenmodell', sub: 'Reinstoffe, Teilchen und Erklärungen',
    items: [
      { id: 'r6-rein', topic: 'Reinstoff und Gemisch', make() {
        return mc('Was ist ein Reinstoff und was ein Gemisch?', ['Ein Reinstoff besteht nur aus einer Sorte Stoff. Ein Gemisch besteht aus mehreren Reinstoffen.', 'Ein Gemisch besteht aus einem Stoff.', 'Beides ist dasselbe.', 'Ein Reinstoff ist immer flüssig.'],
          'Ein Reinstoff hat ganz bestimmte Stoffeigenschaften. Ein Gemisch lässt sich durch Trennverfahren trennen.');
      } },
      { id: 'r6-homogen', topic: 'Homogen und heterogen', make() {
        return mc('Wann nennt man ein Gemisch heterogen?', ['Wenn man die einzelnen Reinstoffe mit blossem Auge oder der Lupe erkennen kann.', 'Wenn man nichts erkennen kann.', 'Wenn es flüssig ist.', 'Wenn es heiss ist.'],
          'Bei einem homogenen Gemisch (zum Beispiel Salzwasser) sind die einzelnen Stoffe nicht erkennbar.');
      } },
      { id: 'r6-art', topic: 'Gemischarten', make() {
        return mc('Ordne richtig zu: Sand in Wasser, Öl in Wasser, Salz in Wasser.', ['Suspension, Emulsion, Lösung.', 'Lösung, Suspension, Emulsion.', 'Emulsion, Lösung, Suspension.', 'Nebel, Rauch, Schaum.'],
          'Suspension: Feststoff in Flüssigkeit. Emulsion: Flüssigkeit in Flüssigkeit. Lösung: homogenes Gemisch. Rauch: Feststoff in Gas. Nebel: Flüssigkeit in Gas.');
      } },
      { id: 'r6-fest', topic: 'Teilchen im festen Zustand', make() {
        return mc('Wie stellst du dir die Teilchen in einem festen Stoff im Teilchenmodell vor?', ['Dicht gepackt und geordnet, sie schwingen an ihrem Platz.', 'Weit auseinander und sehr schnell.', 'Ungeordnet und frei beweglich.', 'Sie fehlen.'],
          'In Flüssigkeiten sind die Teilchen nahe beieinander, aber ungeordnet und beweglich. In Gasen sind sie weit auseinander und sehr schnell.');
      } },
      { id: 'r6-kontrakt', topic: 'Volumenkontraktion', make() {
        return mc('Du mischst 50 mL Wasser und 50 mL Ethanol. Das Volumen ist kleiner als 100 mL. Wie erklärst du das mit dem Teilchenmodell?', ['Die Teilchen verschiedener Grösse ordnen sich ineinander und füllen Lücken.', 'Ein Teil verdunstet immer.', 'Die Teilchen verschwinden.', 'Das Gefäss wird kleiner.'],
          'Das Modell mit Erbsen und Reis oder Senfkörnern zeigt es: Kleine Teilchen füllen die Lücken zwischen grossen.');
      } },
      { id: 'r6-loesung', topic: 'Masse einer Lösung', make() {
        const s = rnd([[20, 180], [10, 90], [30, 270], [5, 95], [50, 450]]), m = s[0] + s[1];
        return num(`In ${fmt(s[1])} g Wasser werden ${fmt(s[0])} g Salz gelöst. Welche Masse hat die Lösung?`, 'g', m, 'Die Masse bleibt beim Lösen erhalten.', `${fmt(s[0])} g + ${fmt(s[1])} g = ${fmt(m)} g`);
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  r1: [
    { h: 'Stoffe und Gegenstände',
      body: `<p>Ein <b>Gegenstand</b> (zum Beispiel ein Wecker) besteht aus <b>Stoffen</b> (Metall, Glas). Die Chemie beschäftigt sich mit <b>allen</b> Stoffen, auch mit natürlichen. Die Welt der Stoffe ist keine Welt voller Gefahren.</p>` },
    { h: 'Die wichtigsten Laborregeln',
      body: `<ul><li>Immer <b>Schutzbrille</b> tragen, lange Haare zusammenbinden.</li><li>Nicht <b>essen und trinken</b>, nichts probieren.</li><li>Gerüche nur vorsichtig <b>zufächeln</b>.</li><li>Anleitung genau lesen, Gefahrensymbole beachten.</li><li>Gebrauchte Stoffe nie ins Vorratsgefäss zurückgeben.</li></ul>
        ${warnbox('Auch scheinbar harmlose Gegenstände aus dem Haushalt können gefährlich werden, zum Beispiel heisses Wachs, das mit Wasser in Kontakt kommt.')}` },
    { h: 'Richtig oder falsch?',
      body: '<p>Beurteile das Verhalten im Labor.</p>', sim: 'regeln' },
    { h: 'Kurz testen',
      check: { q: 'Wann trägst du im Labor die Schutzbrille?',
        options: ['Dauernd, solange im Labor gearbeitet wird.', 'Nur beim Brenner.', 'Nur bei Säuren.', 'Nie, wenn es schnell geht.'],
        explain: 'Die Schutzbrille schützt die Augen bei jedem Versuch. Sie wird dauernd getragen.' } }
  ],
  r2: [
    { h: 'Der Gasbrenner',
      body: `<p>Mit dem Gasbrenner erhitzt du Stoffe. Du brauchst eine <b>wärmefeste, asbestfreie Unterlage</b> (mindestens 45 cm × 45 cm oder 40 cm × 60 cm), gute <b>Lüftung</b>, Schutzbrille und zusammengebundene Haare. Höchstens acht Brenner gleichzeitig im Zimmer.</p>
        <p>Kartuschenbrenner dürfen nur aufrecht verwendet werden. Leere Kartuschen gehören in den Metallabfall.</p>` },
    { h: 'Stelle die Flamme ein',
      body: '<p>Verändere die Luftzufuhr und beobachte die Flamme. Das Bild ist ein vereinfachtes Modell.</p>', sim: 'brenner' },
    { h: 'Gefahrensymbole (GHS)',
      body: `<p>Das <b>Globally Harmonized System (GHS)</b> kennzeichnet gefährliche Stoffe weltweit. In der Schule sind vor allem diese Symbole wichtig: <b>hochentzündlich</b>, <b>brandfördernd</b>, <b>Gas unter Druck</b>, <b>ätzend</b> und <b>umweltgefährlich</b>. Giftige Stoffe und solche mit krebserzeugender Wirkung dürfen im Schulunterricht nicht verwendet werden.</p>` },
    { h: 'Welches Symbol?',
      body: '<p>Ordne die Beschreibung dem Symbol zu.</p>', sim: 'ghs' },
    { h: 'Abfälle und Notfall',
      body: `<p>Abfälle werden getrennt: <b>Lösungsmittel</b>, <b>Schwermetalllösungen</b> und <b>Glasbruch</b> kommen in eigene Behälter. Im Notfall rufst du sofort die Lehrperson. Ätzende Flüssigkeiten auf Haut oder Auge werden lange mit viel Wasser gespült. <b>Tox Info Suisse: 145.</b></p>` },
    { h: 'Vorgerechnet: Unterlage', worked: {
      given: 'Eine Unterlage ist 45 cm lang und 60 cm breit. Wie gross ist die Fläche?',
      steps: [['Formel', 'Fläche = Länge · Breite'], ['Rechnung', '45 cm · 60 cm = 2700 cm²'], ['Antwort', '2700 cm².']] } },
    { h: 'Kurz testen',
      check: { q: 'Welches Symbol zeigt, dass ein Stoff leicht brennen kann?',
        options: ['Hochentzündlich.', 'Ätzend.', 'Umweltgefährlich.', 'Gas unter Druck.'],
        explain: 'Das Symbol «hochentzündlich» zeigt eine Flamme. Eine Flamme über einem Kreis bedeutet dagegen brandfördernd.' } }
  ],
  r3: [
    { h: 'Laborgeräte',
      body: `<p><b>Glasgeräte</b> sind hitzebeständig, aber zerbrechlich. <b>Kunststoffgeräte</b> sind nicht zerbrechlich, aber nicht hitzebeständig. Häufig werden Geräte kombiniert, zum Beispiel bei der Destillation.</p>` },
    { h: 'Volumen messen',
      body: `<ul><li>Beim <b>Messzylinder</b> steigt die Skala von unten nach oben, bei <b>Pipette</b> und <b>Bürette</b> läuft sie von oben nach unten.</li><li>Lies den <b>Meniskus</b> waagrecht ab.</li><li>Mit einer Messpipette nie mit dem Mund ansaugen: <b>Peleusball</b> benutzen.</li></ul>
        ${merk('1 L = 1000 mL = 1000 cm³')}` },
    { h: 'Masse messen',
      body: `<p>Mit der Waage misst du die <b>Masse</b>, nicht das «Gewicht». Beachte die <b>Maximallast</b> und die Genauigkeit. Präzisionswaagen brauchen einen ruhigen Stand und keinen Luftzug. Trage sie nur waagrecht.</p>` },
    { h: 'Vorgerechnet: Einheiten', worked: {
      given: 'Ein Becherglas fasst 750 mL. Wie viele Liter sind das?',
      steps: [['Umrechnung', '1 L = 1000 mL'], ['Rechnung', '750 : 1000 = 0,75'], ['Antwort', '0,75 L.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Einheit hat die Masse?',
        options: ['Gramm oder Kilogramm.', 'Liter.', 'Newton pro Gramm.', 'Grad Celsius.'],
        explain: 'Die Masse misst du in Gramm oder Kilogramm. Das Volumen in Millilitern oder Litern.' } }
  ],
  r4: [
    { h: 'Stoffeigenschaften',
      body: `<p>Reine Stoffe haben ganz bestimmte Eigenschaften, an denen man sie erkennt: <b>Magnetismus</b>, <b>Dichte</b>, <b>Härte</b>, <b>Wasserlöslichkeit</b>, <b>elektrische Leitfähigkeit</b>, <b>Wärmeleitfähigkeit</b>, <b>pH-Wert</b>, <b>Brennbarkeit</b>, Schmelz- und Siedetemperatur.</p>
        <p>Du untersuchst <b>Stoffe</b> (Materialien), nicht Gegenstände.</p>` },
    { h: 'Schwimmt es?',
      body: '<p>Verändere die Dichte des Körpers und vergleiche mit Wasser. Das ist ein Modell.</p>', sim: 'dichte' },
    { h: 'Dichte berechnen',
      body: `${merk('<b>Dichte = Masse : Volumen</b> (g/cm³). Wasser: 1 g/cm³. Ist die Dichte kleiner, schwimmt der Körper.')}` },
    { h: 'Aggregatzustände',
      body: '<p>Verändere die Temperatur von Wasser und sieh den Zustand. Wasser schmilzt bei 0 °C und siedet bei 100 °C.</p>', sim: 'zustand' },
    { h: 'Vorgerechnet: Dichte', worked: {
      given: 'Ein Quader hat die Masse 54 g und das Volumen 20 cm³. Wie gross ist die Dichte?',
      steps: [['Formel', 'ρ = m : V'], ['Rechnung', '54 g : 20 cm³ = 2,7 g/cm³'], ['Antwort', '2,7 g/cm³. Der Körper sinkt im Wasser.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie heisst der Übergang von fest zu flüssig?',
        options: ['Schmelzen.', 'Erstarren.', 'Verdampfen.', 'Kondensieren.'],
        explain: 'Fest zu flüssig heisst Schmelzen. Flüssig zu fest heisst Erstarren.' } }
  ],
  r5: [
    { h: 'Gemische trennen',
      body: `<p>Ein Gemisch trennst du, indem du verschiedene Eigenschaften der Stoffe ausnutzt:</p>
        <ul><li><b>Filtration:</b> grosse Teilchen bleiben im Filter (Rückstand), die Flüssigkeit läuft als Filtrat durch.</li><li><b>Extraktion:</b> Stoffe werden mit einem Lösungsmittel herausgelöst (Tee, Kaffee).</li><li><b>Destillation:</b> der Stoff mit dem tieferen Siedepunkt verdampft zuerst (Destillat).</li><li><b>Adsorption:</b> Stoffe lagern sich an Aktivkohle an.</li><li><b>Chromatografie:</b> Farbstoffe wandern im Papier unterschiedlich weit.</li></ul>` },
    { h: 'Welches Verfahren?',
      body: '<p>Ordne dem Gemisch das passende Trennverfahren zu.</p>', sim: 'trenn' },
    { h: 'Trennverfahren im Alltag',
      body: `<p>Auch zu Hause und in der Umwelt werden Stoffe getrennt: in der <b>Waschmaschine</b>, in der <b>Kläranlage</b> (ARA), bei der <b>Abfalltrennung</b> und bei der <b>Kaffeezubereitung</b>. Das Recycling von Wertstoffen schont Ressourcen.</p>` },
    { h: 'Vorgerechnet: Salzanteil', worked: {
      given: 'Aus 50 g Steinsalz-Gemisch bleiben nach dem Lösen und Filtrieren 5 g Sand zurück. Wie viel Prozent sind Salz?',
      steps: [['Salzmasse', '50 g − 5 g = 45 g'], ['Anteil', '45 g : 50 g = 0,9'], ['Antwort', '90 % des Gemischs sind Salz.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welches Trennverfahren nutzt die unterschiedlichen Siedepunkte?',
        options: ['Destillation.', 'Filtration.', 'Chromatografie.', 'Adsorption.'],
        explain: 'Bei der Destillation verdampft der Stoff mit dem tieferen Siedepunkt zuerst.' } }
  ],
  r6: [
    { h: 'Reinstoffe und Gemische',
      body: `<p>Ein <b>Reinstoff</b> besteht aus einer Stoffsorte, ein <b>Gemisch</b> aus mehreren. <b>Heterogen</b>: Man erkennt die Bestandteile. <b>Homogen</b>: Man erkennt sie nicht.</p>` },
    { h: 'Gemischarten',
      body: '<p>Ordne die Beispiele einer Gemischart zu.</p>', sim: 'gemisch' },
    { h: 'Das Teilchenmodell',
      body: `<p>Im <b>Teilchenmodell</b> stellst du dir Stoffe aus kleinen Kugeln vor. Das Modell erklärt, warum Stoffe fest, flüssig oder gasförmig sind.</p>
        ${merk('<b>Fest:</b> geordnet, dicht, schwingen.<br><b>Flüssig:</b> dicht, ungeordnet, beweglich.<br><b>Gasförmig:</b> weit auseinander, sehr schnell.<br>Höhere Temperatur: Die Teilchen bewegen sich schneller.')}` },
    { h: 'Schau auf die Teilchen',
      body: '<p>Wähle den Zustand und sieh das Teilchenbild. Das Modell zeichnet die Teilchen als Kugeln.</p>', sim: 'teilchen' },
    { h: 'Phänomene erklären',
      body: `<ul><li><b>Wäsche trocknet:</b> Wasserteilchen lösen sich von der Wäsche und verteilen sich in der Luft.</li><li><b>Zucker löst sich:</b> Zuckerteilchen verteilen sich zwischen den Wasserteilchen.</li><li><b>Filtration:</b> Die Poren sind kleiner als die Sandkörner, aber grösser als die Wasserteilchen.</li><li><b>Volumenkontraktion:</b> 50 mL Wasser und 50 mL Ethanol ergeben weniger als 100 mL, weil die Teilchen Lücken füllen.</li></ul>` },
    { h: 'Vorgerechnet: Lösung', worked: {
      given: 'In 180 g Wasser werden 20 g Salz gelöst. Welche Masse hat die Lösung?',
      steps: [['Regel', 'Die Masse bleibt erhalten.'], ['Rechnung', '180 g + 20 g = 200 g'], ['Antwort', '200 g.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie sind die Teilchen in einem Gas angeordnet?',
        options: ['Weit auseinander und sehr schnell.', 'Geordnet und dicht.', 'Dicht, aber ungeordnet.', 'Sie bewegen sich nie.'],
        explain: 'In Gasen haben die Teilchen grosse Abstände und bewegen sich frei und schnell.' } }
  ]
};
const GOALS = {
  r1: ['Stoffe und Gegenstände unterscheiden', 'Laborregeln einhalten'],
  r2: ['den Gasbrenner sicher bedienen', 'Gefahrensymbole (GHS) deuten'],
  r3: ['Volumen und Masse richtig messen', 'Einheiten umrechnen'],
  r4: ['Stoffeigenschaften bestimmen', 'Dichte berechnen'],
  r5: ['Trennverfahren benennen und anwenden', 'Trennverfahren im Alltag erkennen'],
  r6: ['Reinstoffe und Gemische unterscheiden', 'Phänomene mit dem Teilchenmodell erklären']
};
const LEARN = {
  'r1-stoff': 'Stoffe und Gegenstände', 'r1-chemie': 'Stoffe und Gegenstände', 'r1-schutz': 'Die wichtigsten Laborregeln', 'r1-essen': 'Die wichtigsten Laborregeln', 'r1-geruch': 'Die wichtigsten Laborregeln', 'r1-anleit': 'Richtig oder falsch?',
  'r2-unterlage': 'Der Gasbrenner', 'r2-flamme': 'Stelle die Flamme ein', 'r2-flaeche': 'Vorgerechnet: Unterlage', 'r2-ghs': 'Gefahrensymbole (GHS)', 'r2-abfall': 'Abfälle und Notfall', 'r2-notfall': 'Abfälle und Notfall',
  'r3-glas': 'Laborgeräte', 'r3-skala': 'Volumen messen', 'r3-pipette': 'Volumen messen', 'r3-masse': 'Masse messen', 'r3-ml': 'Vorgerechnet: Einheiten', 'r3-cm3': 'Volumen messen',
  'r4-magnet': 'Stoffeigenschaften', 'r4-ph': 'Stoffeigenschaften', 'r4-dichte': 'Schwimmt es?', 'r4-dichte-num': 'Vorgerechnet: Dichte', 'r4-masse-num': 'Dichte berechnen', 'r4-uebergang': 'Aggregatzustände',
  'r5-filter': 'Gemische trennen', 'r5-extrakt': 'Gemische trennen', 'r5-destill': 'Gemische trennen', 'r5-adsorp': 'Gemische trennen', 'r5-chrom': 'Welches Verfahren?', 'r5-alltag': 'Trennverfahren im Alltag', 'r5-anteil': 'Vorgerechnet: Salzanteil', 'r5-diff': 'Gemische trennen',
  'r6-rein': 'Reinstoffe und Gemische', 'r6-homogen': 'Reinstoffe und Gemische', 'r6-art': 'Gemischarten', 'r6-fest': 'Das Teilchenmodell', 'r6-kontrakt': 'Phänomene erklären', 'r6-loesung': 'Vorgerechnet: Lösung'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Laborneuling', pw: 'trägt die Brille' },
  { xp: 80, name: 'Brennerprofi', pw: 'zündet sicher' },
  { xp: 200, name: 'Messkünstler', pw: 'liest genau ab' },
  { xp: 380, name: 'Stoffdetektiv', pw: 'erkennt Stoffe' },
  { xp: 620, name: 'Trennmeister', pw: 'trennt Gemische' },
  { xp: 920, name: 'Laborführerschein', pw: 'arbeitet sicher' }
];

/* ---------- Thema: 7_6 Arbeiten im Labor ---------- */
const TOPIC = {
  id: 'nt7-6', storeKey: 'halingen-nt7-6-v1', other: { title: '7_7 Chemische Reaktionen untersuchen', href: '7_7_Chemische_Reaktionen_untersuchen.html' },
  title: 'Arbeiten im Labor', lead: 'Sicherheit, Messen, Stoffe und Trennverfahren', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Schutzbrille dauernd tragen.', 'Du untersuchst Stoffe, nicht Gegenstände.'],
  formulas: [
    ['Dichte', 'ρ = m : V', 'Wasser: 1 g/cm³'],
    ['Volumen', '1 L = 1000 mL', '= 1000 cm³'],
    ['Wasser', 'schmilzt bei 0 °C', 'siedet bei 100 °C'],
    ['Trennen', 'Filtration, Extraktion', 'Destillation, Adsorption, Chromatografie'],
    ['Gemische', 'homogen / heterogen', 'Reinstoff: eine Stoffsorte'],
    ['Teilchenmodell', 'fest: geordnet', 'gasförmig: weit, schnell']
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
  regeln(el) {
    sorter(el, [
      { t: 'Du bindest lange Haare zusammen, bevor du den Brenner anzündest.', ok: ['ri'], why: 'Das schützt vor Verbrennungen.' },
      { t: 'Du trinkst im Labor aus einem sauberen Becherglas.', ok: ['fa'], why: 'Im Labor wird weder gegessen noch getrunken.' },
      { t: 'Du fächelst dir den Geruch eines Stoffes zu.', ok: ['ri'], why: 'So riechst du vorsichtig.' },
      { t: 'Du gibst nicht gebrauchte Reste zurück ins Vorratsgefäss.', ok: ['fa'], why: 'Gebrauchte Stoffe gehören nie ins Vorratsgefäss zurück.' },
      { t: 'Du liest die Anleitung, bevor du anfängst.', ok: ['ri'], why: 'Genaues Lesen gehört zu sicherem Arbeiten.' },
      { t: 'Du nimmst die Schutzbrille ab, wenn es heiss wird.', ok: ['fa'], why: 'Die Schutzbrille bleibt dauernd auf.' }
    ], { ri: 'Richtig', fa: 'Falsch' }, 'Ist das Verhalten richtig?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  ghs(el) {
    sorter(el, [
      { t: 'Eine Flamme', ok: ['he'], why: 'Das Symbol zeigt hochentzündliche Stoffe, zum Beispiel Benzin.' },
      { t: 'Eine Flamme über einem Kreis', ok: ['br'], why: 'Das ist brandfördernd: Der Stoff kann Sauerstoff abgeben.' },
      { t: 'Eine Gasflasche', ok: ['gd'], why: 'Das Symbol heisst Gas unter Druck.' },
      { t: 'Eine Hand und eine Metallplatte, auf die Tropfen fallen', ok: ['ae'], why: 'Das ist ätzend: Der Stoff zerstört Haut und Metall.' },
      { t: 'Ein abgestorbener Baum und ein toter Fisch', ok: ['um'], why: 'Das ist umweltgefährlich.' }
    ], { he: 'Hochentzündlich', br: 'Brandfördernd', gd: 'Gas unter Druck', ae: 'Ätzend', um: 'Umweltgefährlich' }, 'Welche Bedeutung hat das Symbol?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  trenn(el) {
    sorter(el, [
      { t: 'Sand und Wasser', ok: ['fi'], why: 'Der Sand bleibt im Filter hängen: Filtration.' },
      { t: 'Wirkstoffe aus Teeblättern', ok: ['ex'], why: 'Mit heissem Wasser lösen sie sich heraus: Extraktion.' },
      { t: 'Alkohol aus Rotwein', ok: ['de'], why: 'Der Alkohol verdampft bei tieferer Temperatur: Destillation.' },
      { t: 'Farbstoff aus Cola', ok: ['ad'], why: 'Aktivkohle bindet den Farbstoff: Adsorption.' },
      { t: 'Die Farben eines Filzstifts', ok: ['ch'], why: 'Auf dem Papier wandern sie verschieden weit: Chromatografie.' }
    ], { fi: 'Filtration', ex: 'Extraktion', de: 'Destillation', ad: 'Adsorption', ch: 'Chromatografie' }, 'Welches Trennverfahren passt?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  gemisch(el) {
    sorter(el, [
      { t: 'Sand in Wasser', ok: ['su'], why: 'Ein Feststoff in einer Flüssigkeit: Suspension.' },
      { t: 'Öl in Wasser', ok: ['em'], why: 'Flüssigkeit in Flüssigkeit: Emulsion.' },
      { t: 'Salz in Wasser', ok: ['lo'], why: 'Ein homogenes Gemisch: Lösung.' },
      { t: 'Staubteilchen in der Luft (Rauch)', ok: ['ra'], why: 'Ein Feststoff in einem Gas: Rauch.' },
      { t: 'Wassertröpfchen in der Luft', ok: ['ne'], why: 'Eine Flüssigkeit in einem Gas: Nebel.' },
      { t: 'Kochsalz und Sand, beide trocken', ok: ['ge'], why: 'Feststoffe untereinander: Gemenge.' }
    ], { su: 'Suspension', em: 'Emulsion', lo: 'Lösung', ra: 'Rauch', ne: 'Nebel', ge: 'Gemenge' }, 'Welche Gemischart ist es?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  brenner(el) {
    el.innerHTML = `<div class="sim">${sl('bl', 'Luftzufuhr', 0, 10, 1, 0, '')}
      <div class="flamebox" aria-hidden="true"><div class="flame on" id="bf"></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const l = +$id('bl').value, f = $id('bf');
      $id('blv').textContent = String(l);
      f.style.height = (70 - l * 3) + 'px'; f.style.background = l < 4 ? 'var(--pop-yellow)' : 'var(--pop-cyan)'; f.style.opacity = l < 4 ? '1' : '.85';
      $id('ro').innerHTML = l < 4 ? '<b>Leuchtende Flamme:</b> wenig Luft, gelb, sie russt und ist weniger heiss.' : l < 8 ? '<b>Übergang:</b> Mit mehr Luft wird die Flamme kleiner und blauer.' : '<b>Rauschende Flamme:</b> viel Luft, blau, sie rauscht und ist heisser. Die heisseste Stelle liegt über dem Innenkegel.';
    }
    $id('bl').addEventListener('input', upd); upd();
  },

  dichte(el) {
    el.innerHTML = `<div class="sim">${sl('dd', 'Dichte des Körpers', 1, 80, 1, 27, '× 0,1 g/cm³')}
      <div class="brow"><span class="bname">Wasser (1 g/cm³)</span><div class="btrack"><div class="bfill" id="dw" style="width:12%"></div></div><b class="mono bval">1</b></div>
      <div class="brow"><span class="bname">Körper</span><div class="btrack"><div class="bfill th" id="dk"></div></div><b class="mono bval" id="dv"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const d = +$id('dd').value / 10;
      $id('ddv').textContent = fmt(d, 1);
      $id('dk').style.width = Math.min(100, d / 8 * 100) + '%'; $id('dw').style.width = (1 / 8 * 100) + '%'; $id('dv').textContent = fmt(d, 1);
      $id('ro').innerHTML = d < 1 ? `Dichte ${fmt(d, 1)} g/cm³ ist kleiner als 1 g/cm³: Der Körper <b>schwimmt</b>.` : d === 1 ? 'Gleiche Dichte wie Wasser: Der Körper <b>schwebt</b>.' : `Dichte ${fmt(d, 1)} g/cm³ ist grösser als 1 g/cm³: Der Körper <b>sinkt</b>.`;
    }
    $id('dd').addEventListener('input', upd); nf(el, upd);
  },

  zustand(el) {
    el.innerHTML = `<div class="sim">${sl('zt', 'Temperatur von Wasser', -20, 120, 10, 20, '°C')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const t = +$id('zt').value;
      $id('ztv').textContent = fmt(t);
      let s;
      if (t < 0) s = '<b>Fest</b> (Eis). Die Teilchen sind geordnet und schwingen an ihrem Platz.';
      else if (t === 0) s = '<b>Schmelzpunkt:</b> Eis und Wasser sind gleichzeitig vorhanden. Fest und flüssig stehen im Gleichgewicht.';
      else if (t < 100) s = '<b>Flüssig.</b> Die Teilchen sind nahe beieinander, aber ungeordnet und beweglich.';
      else if (t === 100) s = '<b>Siedepunkt:</b> Das Wasser beginnt zu verdampfen.';
      else s = '<b>Gasförmig</b> (Wasserdampf, unsichtbar). Die Teilchen sind weit auseinander und sehr schnell.';
      $id('ro').innerHTML = s + ' Wasser schmilzt bei 0 °C und siedet bei 100 °C.';
    }
    $id('zt').addEventListener('input', upd); upd();
  },

  teilchen(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Zustand"><button class="btn sm on" data-z="f">fest</button><button class="btn sm" data-z="l">flüssig</button><button class="btn sm" data-z="g">gasförmig</button></div>
      <div class="cubes" id="tc" aria-hidden="true"></div><p class="readout" id="ro" aria-live="polite"></p></div>`;
    const T = {
      f: ['Fest: Die Teilchen sind dicht gepackt und geordnet. Sie schwingen an ihrem Platz.', 36, 'lage'],
      l: ['Flüssig: Die Teilchen sind nahe beieinander, aber ungeordnet. Sie gleiten aneinander vorbei.', 30, 'bew'],
      g: ['Gasförmig: Die Teilchen sind weit auseinander und sehr schnell. Sie füllen den ganzen Raum.', 10, 'bew']
    };
    function set(k) {
      el.querySelectorAll('[data-z]').forEach(b => b.classList.toggle('on', b.dataset.z === k));
      const c = $id('tc'); c.innerHTML = '';
      for (let i = 0; i < T[k][1]; i++) { const d = document.createElement('i'); d.className = 'cube ' + T[k][2]; if (k === 'g') d.style.margin = '10px'; c.appendChild(d); }
      $id('ro').textContent = T[k][0];
    }
    el.querySelectorAll('[data-z]').forEach(b => b.addEventListener('click', () => set(b.dataset.z)));
    set('f');
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-6","titel":"Arbeiten im Labor","kapitel":"NaTech 7, Kapitel 6","audio":"nt7-6"});
