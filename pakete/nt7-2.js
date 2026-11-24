// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/7_2_Den_Koerper_analysieren.html
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

/* ---------- Inhalt: 7_2 Den Körper analysieren, 6 Stationen ----------
   Quelle: Lehrerkommentar zu Kapitel 2 «Den Körper analysieren» (eigene Formulierungen). Zu Verhütung nur sachliche Inhalte aus dem Kommentar. */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'k1', nr: 1, title: 'Organe, Knochen und Muskeln', sub: 'Bau und Funktion',
    items: [
      { id: 'k1-organ', topic: 'Brauchst du alle Organe?', make() {
        return mc('Brauchst du alle deine Organe wirklich?', ['Die meisten Organe sind nötig, um mittelfristig zu überleben. Mit einer einzigen Niere kann man aber leben.', 'Du brauchst nur Herz und Gehirn.', 'Alle Organe kann man weglassen.', 'Kein Organ ist wichtig.'],
          'Es ist schwierig, eine feste Rangliste der Organe aufzustellen. Alle sind lebensnotwendig, und das Zusammenspiel zählt.');
      } },
      { id: 'k1-muskel', topic: 'Aufbau der Muskeln', make() {
        return mc('Woraus bestehen Muskeln?', ['Aus Muskelfasern und Proteinen.', 'Nur aus Wasser.', 'Aus Calciumphosphat.', 'Aus Knorpel.'],
          'Ein Muskel besteht aus Bündeln von Muskelfasern, diese wiederum aus Muskelproteinen.');
      } },
      { id: 'k1-knochen', topic: 'Knochen leben', make() {
        return mc('Warum sind Knochen mehr als nur Stützen?', ['Knochen leben und werden ständig auf- und abgebaut. Sie bestehen aus harten Kristallen (Calciumphosphat) und elastischen Proteinen.', 'Knochen sind tote Materie.', 'Knochen bestehen nur aus Kalk.', 'Knochen verändern sich nie.'],
          'Knochen schützen auch Organe (Gehirn, Herz, Lunge) und bilden Blutzellen.');
      } },
      { id: 'k1-versuch', topic: 'Knochenversuche', make() {
        return mc('Ein Hühnerknochen liegt tagelang in Essig. Was beobachtest du?', ['Die harten Kristalle lösen sich auf, der Knochen wird biegsam.', 'Der Knochen wird härter.', 'Der Knochen leuchtet.', 'Nichts passiert.'],
          'Wird ein Knochen dagegen ausgebrannt, werden die elastischen Proteine zerstört. Er wird brüchig.');
      } },
      { id: 'k1-sehne', topic: 'Sehnen und Bänder', make() {
        return mc('Wie unterscheiden sich Sehnen und Bänder?', ['Sehnen verbinden Muskeln mit Knochen. Bänder halten das Gelenk zusammen und begrenzen seine Beweglichkeit.', 'Beides ist dasselbe.', 'Bänder verbinden Muskeln mit Muskeln.', 'Sehnen schützen nur die Haut.'],
          'Eine Sehne reicht über das Gelenk hinaus und verbindet so zwei Knochen mit dem Muskel.');
      } },
      { id: 'k1-gegen', topic: 'Gegenspielerprinzip', make() {
        return mc('Wie funktioniert das Gegenspielerprinzip beim Arm?', ['Ein Muskel kann nur ziehen. Beuger und Strecker arbeiten gegeneinander: Wenn der eine sich zusammenzieht, wird der andere gedehnt.', 'Ein Muskel kann ziehen und stossen.', 'Nur ein Muskel bewegt den Arm.', 'Muskeln arbeiten nie zusammen.'],
          'Der Muskel, der die Bewegung ausführt, heisst Agonist, sein Gegenspieler Antagonist. Beim Bein sind es Kniestrecker und Kniebeuger.');
      } },
      { id: 'k1-modell', topic: 'Modellgrenzen', make() {
        return mc('Im Modell des Ellenbogens mit Ballonen sind die Verhältnisse beim Gegenspielerprinzip vertauscht. Was lernst du daraus?', ['Jedes Modell hat Grenzen. Man muss prüfen, was es richtig zeigt und was nicht.', 'Modelle sind immer richtig.', 'Modelle sind nutzlos.', 'Man darf keine Modelle bauen.'],
          'Das Modell zeigt den Aufbau recht gut. Zur Erklärung der Funktionsweise versagt es teilweise.');
      } }
    ]
  },
  {
    id: 'k2', nr: 2, title: 'Stoffwechsel', sub: 'Weshalb musst du atmen und essen?',
    items: [
      { id: 'k2-vier', topic: 'Vier Stoffwechselvorgänge', make() {
        return mc('Welche vier zentralen Stoffwechselvorgänge gibt es?', ['Aufnahme, Transport, Umwandlung und Abgabe.', 'Essen, Schlafen, Atmen und Trinken.', 'Kauen, Schlucken, Verdauen und Ausscheiden.', 'Wachsen, Bewegen, Fühlen und Denken.'],
          'Diese vier Vorgänge laufen in allen Lebewesen ab. Sie werden an Atmung, Blut, Herz-Kreislauf und Entsorgung vertieft.');
      } },
      { id: 'k2-atmen', topic: 'Warum stirbt man ohne Atmen?', make() {
        return mc('Warum stirbt man, wenn man nicht atmet?', ['Die Zellen brauchen Sauerstoff, um aus Nährstoffen Energie zu gewinnen. Ohne Sauerstoff sterben sie, zuerst die Gehirnzellen.', 'Weil die Lunge austrocknet.', 'Weil das Herz keine Luft mehr hat.', 'Weil das Blut gefriert.'],
          'Die Wirkungskette: Aufnahme von Sauerstoff, Transport mit dem Blut, Umwandlung in den Zellen, Abgabe von Kohlenstoffdioxid.');
      } },
      { id: 'k2-umwand', topic: 'Stoffumwandlung', make() {
        return mc('Was passiert bei der Stoffumwandlung in den Zellen?', ['Stoffe werden auseinandergenommen und neu zusammengesetzt. Sauerstoff wird nicht einfach in Kohlenstoffdioxid «verwandelt».', 'Stoffe lösen sich in nichts auf.', 'Stoffe werden zu Energie.', 'Stoffe verschwinden im Körper.'],
          'Im Alltag sagt man, man «verliere» Pfunde. In Wirklichkeit verlassen Stoffe den Körper als Atemgase, Urin und Kot.');
      } },
      { id: 'k2-energie', topic: 'Energie und Stoffe', make() {
        return mc('Welche Aussage stimmt?', ['Energie ist kein Stoff. Nährstoffe sind Energieträger.', 'Energie ist ein Stoff.', 'Sauerstoff ist Energie.', 'Wasser ist Energie.'],
          'Die Nährstoffe liefern die Energie für Muskeln, Gehirn und das Warmhalten des Körpers.');
      } },
      { id: 'k2-nachweis', topic: 'Nachweis der Gase', make() {
        return mc('Wie weist du Sauerstoff und Kohlenstoffdioxid nach?', ['Sauerstoff mit der Glimmspanprobe, Kohlenstoffdioxid mit Kalkwasser (es wird trüb).', 'Beide mit Kalkwasser.', 'Beide mit der Glimmspanprobe.', 'Mit pH-Papier.'],
          'In Kohlenstoffdioxid erlischt zudem eine brennende Kerze. Mit Kalkwasser kannst du CO₂ in der Atemluft nachweisen.');
      } },
      { id: 'k2-luft', topic: 'Sauerstoff in der Luft', make() {
        const v = rnd([100, 200, 500, 1000, 2000]), o = r2(v * 21 / 100);
        return num(`Luft besteht zu etwa 21 % aus Sauerstoff. Wie viele Millilitern Sauerstoff stecken ungefähr in ${fmt(v)} mL Luft?`, 'mL', o, 'Berechne 21 % der Luftmenge.', `${fmt(v)} mL · 21 % = ${fmt(o)} mL`);
      } },
      { id: 'k2-abgabe', topic: 'Abgabe', make() {
        return mc('Welche Organe geben Stoffe aus dem Körper ab?', ['Die Lunge (Kohlenstoffdioxid), die Nieren (flüssige Abfallstoffe als Urin) und der Darm (feste Reste).', 'Nur der Darm.', 'Nur das Herz.', 'Nur die Haut.'],
          'Wasser wird zum Beispiel auch als Wasserdampf in der Atemluft und durch die Haut abgegeben.');
      } }
    ]
  },
  {
    id: 'k3', nr: 3, title: 'Atmung und Lunge', sub: 'Wie gelangt der Sauerstoff ins Blut?',
    items: [
      { id: 'k3-weg', topic: 'Weg der Luft', make() {
        return mc('Welcher Weg der Luft ist richtig?', ['Nase oder Mund, Rachenraum, Kehlkopf, Luftröhre, Bronchien, Lungenbläschen.', 'Mund, Speiseröhre, Magen, Lunge.', 'Nase, Magen, Bronchien, Herz.', 'Mund, Luftröhre, Herz, Lunge.'],
          'Der Kehlkopfdeckel verschliesst beim Schlucken die Luftröhre. Der Weg der Luft und der Weg der Nahrung sind getrennt.');
      } },
      { id: 'k3-bewegung', topic: 'Atembewegungen', make() {
        return mc('Wer sorgt dafür, dass Luft in die Lunge ein- und ausströmt?', ['Muskeln wie das Zwerchfell und die Zwischenrippenmuskeln verändern die Druckverhältnisse. Die Lunge selbst ist passiv.', 'Die Lunge pumpt selbst.', 'Das Herz zieht die Luft an.', 'Die Luftröhre bewegt sich.'],
          'Es gibt zwei Arten zu atmen: die Bauchatmung und die Brustatmung.');
      } },
      { id: 'k3-austausch', topic: 'Gasaustausch', make() {
        return mc('Was passiert in den Lungenbläschen?', ['Das Blut nimmt Sauerstoff aus der Luft auf und gibt Kohlenstoffdioxid an die Luft ab.', 'Das Blut gibt Sauerstoff ab und nimmt Stickstoff auf.', 'Es wird Nahrung aufgenommen.', 'Es wird Urin gebildet.'],
          'Die Lungenbläschen sind von feinen Blutgefässen (Kapillaren) umgeben. Die Wände sind sehr dünn.');
      } },
      { id: 'k3-oberfl', topic: 'Oberflächenvergrösserung', make() {
        return mc('Warum hat die Lunge eine so grosse Oberfläche?', ['Damit viel Sauerstoff gleichzeitig ins Blut übertreten kann.', 'Damit sie mehr Platz braucht.', 'Damit sie schwerer wird.', 'Damit sie schöner aussieht.'],
          'Die Lungenoberfläche entspricht etwa einem halben Tennisplatz. Bei Resorption und Gasaustausch hilft eine grosse Oberfläche.');
      } },
      { id: 'k3-faktor', topic: 'Oberflächen vergleichen', make() {
        const b = rnd([0.5, 0.25, 0.2, 0.1]), f = r2(100 / b);
        return num(`Eine Lunge hat bei 6 L Volumen eine Oberfläche von 100 m². Ein Ballon mit demselben Volumen hat in diesem Beispiel nur ${fmt(b)} m². Wie viel Mal grösser ist die Oberfläche der Lunge?`, '-mal', f, 'Teile die Oberfläche der Lunge durch die des Ballons.', `100 m² : ${fmt(b)} m² = ${fmt(f)}`);
      } },
      { id: 'k3-minute', topic: 'Luft pro Minute', make() {
        const s = rnd([[0.4, 15], [0.5, 16], [0.5, 12], [0.6, 20], [0.5, 20]]), l = r2(s[0] * s[1]);
        return num(`In einem Beispiel werden bei jedem Atemzug ${fmt(s[0])} Liter Luft eingeatmet. Es sind ${fmt(s[1])} Atemzüge pro Minute. Wie viele Liter Luft sind das pro Minute?`, 'Liter', l, 'Multipliziere das Atemzugvolumen mit der Anzahl Atemzüge.', `${fmt(s[0])} L · ${fmt(s[1])} = ${fmt(l)} L`);
      } },
      { id: 'k3-ml', topic: 'Lungenvolumen umrechnen', ext: true, make() {
        const x = rnd([3.5, 4, 4.5, 5, 6]), m = x * 1000;
        return num(`Die grösste Luftmenge, die ein Mensch aus- und einatmen kann (Vitalkapazität), beträgt in einem Beispiel ${fmt(x)} L. Wie viele Millilitern sind das? Es gilt 1 L = 1000 mL.`, 'mL', m, 'Multipliziere mit 1000.', `${fmt(x)} L · 1000 = ${fmt(m)} mL`);
      } }
    ]
  },
  {
    id: 'k4', nr: 4, title: 'Blut und Kreislauf', sub: 'Transport im Körper',
    items: [
      { id: 'k4-aufgaben', topic: 'Aufgaben des Bluts', make() {
        return mc('Welche Aufgaben hat das Blut?', ['Transport von Stoffen, Abwehr von Krankheitserregern und gleichbleibende Bedingungen im Körper (zum Beispiel Temperatur).', 'Nur Transport von Nahrung.', 'Nur Abwehr.', 'Es hat keine Aufgabe.'],
          'Das Blut transportiert Sauerstoff, Kohlenstoffdioxid, Nährstoffe, Abfallstoffe und Wärme.');
      } },
      { id: 'k4-rot', topic: 'Rote Blutzellen', make() {
        return mc('Was zeichnet rote Blutzellen aus?', ['Sie enthalten das rote Protein Hämoglobin, das Sauerstoff bindet. Sie haben keinen Zellkern.', 'Sie wehren Erreger ab.', 'Sie sorgen für die Gerinnung.', 'Sie haben einen grossen Zellkern.'],
          'Das Hämoglobin gibt dem Blut seine rote Farbe, nicht die Flüssigkeit. Man spricht besser von Blutzellen als von Blutkörperchen.');
      } },
      { id: 'k4-weiss', topic: 'Weisse Blutzellen', make() {
        return mc('Was weisst du über weisse Blutzellen?', ['Sie wehren Krankheitserreger ab. Es gibt etwa 1000-mal weniger weisse als rote.', 'Sie transportieren Sauerstoff.', 'Sie sind häufiger als rote.', 'Sie kommen nicht im Blut vor.'],
          'Weisse Blutzellen haben einen Zellkern und lassen sich im Mikroskop nur gefärbt gut erkennen.');
      } },
      { id: 'k4-plaett', topic: 'Blutplättchen und Gerinnung', make() {
        return mc('Warum verblutest du bei einer kleinen Wunde nicht?', ['Blutplättchen und das Protein Fibrin verschliessen die Wunde: Die Blutgerinnung.', 'Das Blut trocknet einfach.', 'Das Herz hört auf zu schlagen.', 'Die Haut wächst sofort zu.'],
          'Das Blutplasma macht mehr als die Hälfte des Bluts aus und besteht hauptsächlich aus Wasser.');
      } },
      { id: 'k4-weisse', topic: 'Verhältnis der Blutzellen', make() {
        const n = rnd([5000, 20000, 100000, 1000000, 50000]), w = r2(n / 1000);
        return num(`Im Blut gibt es etwa 1000-mal mehr rote als weisse Blutzellen. Wie viele weisse Blutzellen gehören zu ${fmt(n)} roten?`, 'Zellen', w, 'Teile die Zahl der roten durch 1000.', `${fmt(n)} : 1000 = ${fmt(w)}`);
      } },
      { id: 'k4-gefaess', topic: 'Blutgefässe', make() {
        return mc('Wie unterscheiden sich Arterien, Venen und Kapillaren?', ['Arterien führen vom Herzen weg (kräftige Wand), Venen zum Herzen zurück (mit Klappen), Kapillaren sind sehr dünn und ermöglichen den Stoffaustausch.', 'Alle sind gleich.', 'Arterien führen immer sauerstoffarmes Blut.', 'Kapillaren sind die dicksten Gefässe.'],
          'Die Kapillaren verbinden Arterien und Venen. Blutgefässe sind keine Sackgassen.');
      } },
      { id: 'k4-lauf', topic: 'Zwei Kreisläufe', make() {
        return mc('Welche zwei Kreisläufe hat der Mensch?', ['Den Lungenkreislauf und den Körperkreislauf.', 'Den Nierenkreislauf und den Leberkreislauf.', 'Nur einen einzigen Kreislauf.', 'Den Magenkreislauf und den Darmkreislauf.'],
          'Im Lungenkreislauf nimmt das Blut Sauerstoff auf, im Körperkreislauf gibt es ihn an die Zellen ab.');
      } },
      { id: 'k4-herz', topic: 'Das Herz als Pumpe', make() {
        return mc('Wie ist das Herz aufgebaut?', ['Zwei Vorhöfe und zwei Kammern. Herzklappen sorgen dafür, dass das Blut nur in eine Richtung fliesst.', 'Ein hohler Sack ohne Trennung.', 'Zwei Kammern, eine für jeden Kreislauf, ohne Vorhöfe.', 'Es besteht nur aus Gefässen.'],
          'Die rechte Seite pumpt Blut zur Lunge, die linke Seite in den Körper.');
      } }
    ]
  },
  {
    id: 'k5', nr: 5, title: 'Herzinfarkt und Entsorgung', sub: 'Vorbeugen, Niere, Leber und Darm',
    items: [
      { id: 'k5-infarkt', topic: 'Was ist ein Herzinfarkt?', make() {
        return mc('Was geschieht bei einem Herzinfarkt?', ['Ein Herzkranzgefäss ist verstopft. Ein Teil des Herzmuskels bekommt zu wenig Sauerstoff und Nährstoffe und stirbt ab.', 'Das Herz bleibt immer sofort stehen.', 'Das Blut gefriert.', 'Die Lunge fällt aus.'],
          'Ein Herzinfarkt ist nicht dasselbe wie ein Herzstillstand. Es kommt zu einer Kette von Ursachen und Wirkungen.');
      } },
      { id: 'k5-thrombose', topic: 'Thrombose', make() {
        return mc('Was ist eine Thrombose?', ['Ein Blutgerinnsel, das ein Blutgefäss verstopft. Die Blutgerinnung selbst ist lebenswichtig.', 'Ein Bruch eines Knochens.', 'Eine Entzündung des Magens.', 'Ein Muskelriss.'],
          'Ein Thrombus kann ein Gefäss verschliessen. Wenn das ein Herzkranzgefäss ist, kann ein Infarkt die Folge sein.');
      } },
      { id: 'k5-vorbeugen', topic: 'Vorbeugen', make() {
        return mc('Wie kann man Herz-Kreislauf-Erkrankungen vorbeugen?', ['Mit einem gesunden Lebensstil: Bewegung, ausgewogene Ernährung und Verzicht auf Rauchen.', 'Mit möglichst viel Ruhe und Fett.', 'Mit Rauchen.', 'Gar nicht.'],
          'Prävention bedeutet, Krankheiten vorzubeugen. Auch Wissen über Risikofaktoren gehört dazu.');
      } },
      { id: 'k5-niere', topic: 'Niere', make() {
        return mc('Was leisten die Nieren?', ['Sie filtern das Blut, entfernen Abfallstoffe und überschüssiges Wasser und bilden daraus den Urin, wie eine Kläranlage.', 'Sie pumpen das Blut.', 'Sie verdauen Fett.', 'Sie nehmen Sauerstoff auf.'],
          'Der Urin gelangt über die Harnleiter in die Harnblase. Wie gelb er ist, hängt auch davon ab, wie viel du getrunken hast.');
      } },
      { id: 'k5-leber', topic: 'Leber', make() {
        return mc('Welche Aufgabe hat die Leber?', ['Sie ist die Entgiftungsstation: Gifte wie Alkohol und Drogen werden unschädlich gemacht. Sie bildet auch die Gallenflüssigkeit.', 'Sie pumpt Blut.', 'Sie nimmt Sauerstoff auf.', 'Sie lagert Knochen.'],
          'Die Gallenflüssigkeit hilft bei der Aufnahme von Fetten aus der Nahrung. Starker Alkoholkonsum schädigt die Leber.');
      } },
      { id: 'k5-darm', topic: 'Dickdarm', make() {
        return mc('Was geschieht im Dickdarm?', ['Dem Rest der Nahrung wird Wasser entzogen. Die Feststoffe werden als Kot entsorgt. Viele Darmbakterien sind nützlich.', 'Hier wird Sauerstoff aufgenommen.', 'Hier entsteht Urin.', 'Hier wird Blut gefiltert.'],
          'Bakterien im Dickdarm helfen bei der Verdauung und bilden einige lebenswichtige Vitamine.');
      } },
      { id: 'k5-lunge', topic: 'Lunge als Entsorgungsorgan', make() {
        return mc('Welche Abfallstoffe gibt die Lunge ab?', ['Kohlenstoffdioxid und Wasserdampf.', 'Urin.', 'Kot.', 'Galle.'],
          'Die Lunge nimmt Sauerstoff auf und entsorgt gasförmige Abfallstoffe.');
      } }
    ]
  },
  {
    id: 'k6', nr: 6, title: 'Schwangerschaft und Verhütung', sub: 'Zyklus, Methoden und Verantwortung',
    items: [
      { id: 'k6-befruchtung', topic: 'Befruchtung', make() {
        return mc('Was ist eine Befruchtung?', ['Ein Spermium vereinigt sich mit einer Eizelle. Daraus kann ein Embryo entstehen.', 'Eine Eizelle teilt sich ohne Spermium.', 'Zwei Spermien vereinigen sich.', 'Eine Eizelle wird zum Spermium.'],
          'Eizellen entstehen in den Eierstöcken, Spermien in den Hoden. Die Eizelle wandert durch den Eileiter zur Gebärmutter.');
      } },
      { id: 'k6-zyklus', topic: 'Menstruationszyklus', make() {
        return mc('Was geschieht im Menstruationszyklus?', ['Die Gebärmutterschleimhaut baut sich auf, ein Eisprung findet statt. Ohne Befruchtung wird die Schleimhaut abgestossen: Es kommt zur Menstruationsblutung.', 'Der Zyklus verläuft bei allen gleich.', 'Die Blutung hat keinen Zusammenhang mit Hormonen.', 'Der Zyklus beginnt mit dem Eisprung und hört dann auf.'],
          'Die Zyklusdauer ist individuell verschieden. Die Hormone Östrogen und Progesteron steuern die Vorgänge.');
      } },
      { id: 'k6-zyklus-num', topic: 'Eisprung im Zyklus', make() {
        const z = rnd([26, 28, 30, 32, 35]), t = z - 14;
        return num(`In einem Beispiel dauert ein Zyklus ${fmt(z)} Tage. Der Eisprung findet etwa 14 Tage vor der nächsten Menstruation statt. Am wievielten Tag des Zyklus ist er in diesem Beispiel? (Das ist keine Verhütungsmethode.)`, 'Tag', t, 'Ziehe 14 Tage von der Zyklusdauer ab.', `${fmt(z)} − 14 = ${fmt(t)}`);
      } },
      { id: 'k6-pille', topic: 'Die Pille', make() {
        return mc('Wie wirkt die Pille und wie nimmt man sie ein?', ['Sie verhindert mit Hormonen den Eisprung. Man nimmt sie regelmässig nach einem Plan ein, nicht erst nach Bedarf.', 'Man nimmt sie nur vor dem Geschlechtsverkehr.', 'Sie schützt auch vor sexuell übertragbaren Infektionen.', 'Sie wirkt nach einer Stunde.'],
          'Die «Pille danach» ist eine Notfallmassnahme und keine regelmässige Verhütungsmethode.');
      } },
      { id: 'k6-kondom', topic: 'Schutz vor Infektionen', make() {
        return mc('Welche Verhütungsmethode schützt auch vor sexuell übertragbaren Infektionen?', ['Das Kondom.', 'Die Pille.', 'Die Hormonspirale.', 'Das Verhütungspflaster.'],
          'Andere Mittel wie Pille, Spiralen, Ring oder Pflaster verhindern nur eine Schwangerschaft.');
      } },
      { id: 'k6-lebens', topic: 'Wahl der Methode', make() {
        return mc('Wovon hängt die Wahl der Verhütungsmethode ab?', ['Von der Lebenssituation, zum Beispiel feste Beziehung oder wechselnde Partner, und von den persönlichen Bedürfnissen.', 'Nur vom Preis.', 'Nur von der Werbung.', 'Von nichts, es gibt eine für alle.'],
          'Jede Methode hat Vorteile und Nachteile, Risiken und Nebenwirkungen. Darum informiert man sich gut.');
      } },
      { id: 'k6-verantw', topic: 'Verantwortung', make() {
        return mc('Wer ist für Verhütung verantwortlich?', ['Beide Partner gemeinsam. Selbstbestimmung und gegenseitige Rücksichtnahme sind wichtig.', 'Nur die Frau.', 'Nur der Mann.', 'Niemand.'],
          'Verhütung ist eine gemeinsame Angelegenheit von Frauen und Männern. Normen, die für alle gelten, gibt es nicht.');
      } },
      { id: 'k6-quelle', topic: 'Gute Informationsquellen', make() {
        return mc('Wo findest du gute Informationen zu Verhütung?', ['Bei Fachstellen und seriösen Seiten wie feel-ok.ch, spiz.ch, sex-i.ch oder verhuetungsinfo.ch.', 'In irgendwelchen Foren.', 'Nur bei Freunden.', 'Nirgends.'],
          'Auch Sexualpädagoginnen und -pädagogen sowie Beratungsstellen helfen weiter.');
      } },
      { id: 'k6-mythos', topic: 'Voraussetzung für eine Schwangerschaft', make() {
        return mc('Was ist nötig, damit eine Schwangerschaft entstehen kann?', ['Ein Spermium und eine Eizelle müssen aufeinandertreffen. Küssen allein führt nicht zu einer Schwangerschaft.', 'Küssen allein genügt.', 'Es genügt, im selben Raum zu sein.', 'Eine Eizelle allein genügt.'],
          'Solche Vorstellungen sind weit verbreitet. Gutes Wissen schützt vor Verunsicherung.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  k1: [
    { h: 'Der Mensch: mehr als Haut und Knochen',
      body: `<p>Dein Körper besteht aus vielen <b>Organen</b>, die zusammenarbeiten. Es ist schwierig zu sagen, welches am wichtigsten ist: Die meisten sind lebensnotwendig. Mit einer einzigen Niere kann man aber leben.</p>`,  },
    { h: 'Welches Organ macht was?',
      body: '<p>Ordne die Aufgabe dem Organ zu.</p>', sim: 'organe' },
    { h: 'Muskeln, Knochen und Gelenke',
      body: `<ul><li><b>Muskeln</b> bestehen aus Muskelfasern und Proteinen.</li><li><b>Knochen</b> leben und werden auf- und abgebaut. Harte Kristalle (Calciumphosphat) und elastische Proteine machen sie fest und zugleich belastbar.</li><li><b>Sehnen</b> verbinden Muskeln mit Knochen. <b>Bänder</b> halten das Gelenk zusammen.</li></ul>` },
    { h: 'Was passiert mit dem Knochen?',
      body: '<p>Wähle eine Behandlung und beobachte den Knochen.</p>', sim: 'knochen' },
    { h: 'Das Gegenspielerprinzip',
      body: `${merk('Ein Muskel kann nur <b>ziehen</b>. Darum arbeiten <b>Beuger und Strecker</b> als Gegenspieler: Zieht sich der eine zusammen, wird der andere gedehnt.')}
        <p>Verändere die Stellung des Arms und sieh, welcher Muskel angespannt ist.</p>`, sim: 'gegenspieler' },
    { h: 'Kurz testen',
      check: { q: 'Beim Beugen des Arms zieht sich der Beuger zusammen. Was geschieht mit dem Strecker?',
        options: ['Er wird gedehnt und ist entspannt.', 'Er zieht sich ebenfalls zusammen.', 'Er verschwindet.', 'Er wird zum Knochen.'],
        explain: 'Beuger und Strecker sind Gegenspieler. Der eine arbeitet, der andere wird gedehnt.' } }
  ],
  k2: [
    { h: 'Weshalb musst du atmen und essen?',
      body: `<p>Deine Zellen brauchen <b>Energie</b>. Sie gewinnen sie aus Nährstoffen und Sauerstoff. Ohne Sauerstoff sterben Zellen, zuerst die des Gehirns.</p>
        ${merk('Vier zentrale <b>Stoffwechselvorgänge</b>: <b>Aufnahme</b>, <b>Transport</b>, <b>Umwandlung</b>, <b>Abgabe</b>.')}` },
    { h: 'Welcher Vorgang?',
      body: '<p>Ordne die Beispiele einem der vier Vorgänge zu.</p>', sim: 'stoffwechsel' },
    { h: 'Umwandlung in den Zellen',
      body: `<p>In den Zellen werden Stoffe <b>auseinandergenommen und neu zusammengesetzt</b>. Sauerstoff wird nicht einfach in Kohlenstoffdioxid «verwandelt». Energie ist kein Stoff. Die Nährstoffe sind Energieträger.</p>` },
    { h: 'Gase nachweisen',
      body: '<p>Ordne die Beobachtung dem Gas zu.</p>', sim: 'nachweis' },
    { h: 'Vorgerechnet: Sauerstoff in der Luft', worked: {
      given: 'Luft besteht zu etwa 21 % aus Sauerstoff. Wie viel Sauerstoff steckt in 500 mL Luft?',
      steps: [['Prozent', '21 % = 0,21'], ['Rechnung', '500 mL · 0,21 = 105 mL'], ['Antwort', 'Etwa 105 mL Sauerstoff.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welches ist der letzte der vier Stoffwechselvorgänge?',
        options: ['Abgabe.', 'Aufnahme.', 'Transport.', 'Umwandlung.'],
        explain: 'Zuerst Aufnahme, dann Transport, Umwandlung und zuletzt Abgabe von Abfallstoffen.' } }
  ],
  k3: [
    { h: 'Der Weg der Luft',
      body: `<p>Nase oder Mund → Rachenraum → Kehlkopf → Luftröhre → Bronchien → <b>Lungenbläschen</b>. Beim Schlucken verschliesst der Kehlkopfdeckel die Luftröhre. Luft- und Nahrungsweg sind getrennt.</p>` },
    { h: 'Einatmen und Ausatmen',
      body: '<p>Wähle Einatmen oder Ausatmen. Das Modell zeigt Zwerchfell und Brustkorb.</p>', sim: 'atmung' },
    { h: 'Gasaustausch und Oberfläche',
      body: `<p>In den Lungenbläschen tritt Sauerstoff ins Blut über, und Kohlenstoffdioxid wird abgegeben. Die Lunge hat bei 6 L Volumen etwa <b>100 m²</b> Oberfläche, ein Ballon mit gleichem Volumen nur etwa <b>1/6 m²</b>.</p>
        ${merk('<b>Grosse Oberfläche</b> heisst: viel Austausch gleichzeitig.')}` },
    { h: 'Vergleiche die Oberflächen',
      body: '<p>Die Balken zeigen Lunge und Ballon. Das ist ein Modell mit den Werten aus dem Kommentar.</p>', sim: 'lunge' },
    { h: 'Vorgerechnet: Luft pro Minute', worked: {
      given: 'Bei jedem Atemzug werden 0,5 Liter Luft eingeatmet. Es sind 16 Atemzüge pro Minute. Wie viel Luft ist das pro Minute?',
      steps: [['Rechnung', '0,5 L · 16 = 8 L'], ['Antwort', '8 Liter pro Minute (Beispielwerte).']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Muskeln verändern bei der Atmung die Druckverhältnisse?',
        options: ['Das Zwerchfell und die Zwischenrippenmuskeln.', 'Die Lunge selbst.', 'Der Herzmuskel.', 'Die Armmuskeln.'],
        explain: 'Die Lunge strömt nur passiv. Die Atemmuskeln sorgen für die Druckunterschiede.' } }
  ],
  k4: [
    { h: 'Aus was besteht Blut?',
      body: `<ul><li><b>Blutplasma:</b> über die Hälfte, hauptsächlich Wasser. Transportiert Stoffe.</li><li><b>Rote Blutzellen:</b> mit Hämoglobin, transportieren Sauerstoff. Ohne Zellkern.</li><li><b>Weisse Blutzellen:</b> Abwehr. Etwa 1000-mal weniger als rote.</li><li><b>Blutplättchen:</b> Blutgerinnung.</li></ul>` },
    { h: 'Wer macht was im Blut?',
      body: '<p>Ordne die Aufgabe dem Bestandteil zu.</p>', sim: 'blut' },
    { h: 'Gefässe und Kreisläufe',
      body: `<p>Es gibt den <b>Lungenkreislauf</b> und den <b>Körperkreislauf</b>. Blutgefässe: <b>Arterien</b> (vom Herzen weg), <b>Venen</b> (zum Herzen, mit Klappen), <b>Kapillaren</b> (dünn, Stoffaustausch).</p>` },
    { h: 'Arterie, Vene oder Kapillare?',
      body: '<p>Ordne die Beschreibung dem Gefäss zu.</p>', sim: 'gefaess' },
    { h: 'Das Herz',
      body: '<p>Verfolge den Weg des Bluts durch Herz und Körper in einzelnen Schritten.</p>', sim: 'herz' },
    { h: 'Vorgerechnet: Blutzellen', worked: {
      given: 'Es gibt etwa 1000-mal mehr rote als weisse Blutzellen. Wie viele weisse gehören zu 20 000 roten?',
      steps: [['Rechnung', '20 000 : 1000 = 20'], ['Antwort', '20 weisse Blutzellen.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Gefässe führen das Blut zum Herzen zurück?',
        options: ['Die Venen.', 'Die Arterien.', 'Die Kapillaren.', 'Die Bronchien.'],
        explain: 'Venen führen zum Herzen, Arterien vom Herzen weg.' } }
  ],
  k5: [
    { h: 'Der Herzinfarkt',
      body: `<p>Ein Herzkranzgefäss wird durch ein Blutgerinnsel (<b>Thrombus</b>) oder Ablagerungen verstopft. Der betroffene Teil des Herzmuskels bekommt zu wenig Sauerstoff und Nährstoffe und <b>stirbt ab</b>. Vorbeugen hilft: Bewegung, ausgewogene Ernährung, nicht rauchen.</p>` },
    { h: 'Die Entsorgungssysteme',
      body: `<ul><li><b>Lunge:</b> Kohlenstoffdioxid und Wasserdampf.</li><li><b>Niere:</b> filtert das Blut, bildet Urin, ähnlich einer Kläranlage.</li><li><b>Leber:</b> Entgiftung, bildet Galle.</li><li><b>Dickdarm:</b> entsorgt Feststoffe als Kot.</li></ul>
        ${warnbox('Viel Alkohol und Drogen belasten die Leber stark.')}` },
    { h: 'Wer entsorgt was?',
      body: '<p>Ordne zu, welches Organ die Aufgabe übernimmt.</p>', sim: 'organe' },
    { h: 'Kurz testen',
      check: { q: 'Welches Organ filtert das Blut und bildet Urin?',
        options: ['Die Niere.', 'Die Leber.', 'Die Lunge.', 'Der Dickdarm.'],
        explain: 'Die Nieren sind die Kläranlage des Körpers.' } }
  ],
  k6: [
    { h: 'Befruchtung und Zyklus',
      body: `<p>Für eine Schwangerschaft muss ein <b>Spermium</b> auf eine <b>Eizelle</b> treffen (Befruchtung). Im <b>Menstruationszyklus</b> baut sich die Gebärmutterschleimhaut auf, es kommt zum Eisprung. Ohne Befruchtung wird die Schleimhaut abgestossen: <b>Menstruation</b>. Die Zyklusdauer ist von Person zu Person verschieden.</p>` },
    { h: 'Der Zyklus im Überblick',
      body: '<p>Wähle einen Tag im Zyklus. Das ist ein Beispiel mit etwa 28 Tagen. Wirkliche Zyklen sind verschieden lang.</p>', sim: 'zyklus' },
    { h: 'Verhütungsmethoden',
      body: `<p>Verhütungsmittel sind zum Beispiel <b>Kondom</b>, <b>Pille</b>, <b>Hormonspirale</b>, <b>Kupferspirale</b>, <b>Verhütungsring</b> und <b>Verhütungspflaster</b>. Die <b>Pille</b> verhindert mit Hormonen den Eisprung und wird nach Plan eingenommen. Die «Pille danach» ist ein Notfallmittel.</p>
        ${merk('Nur das <b>Kondom</b> schützt zusätzlich vor sexuell übertragbaren Infektionen.')}` },
    { h: 'Stimmt das?',
      body: '<p>Beurteile die Aussagen zu Verhütung und Schwangerschaft.</p>', sim: 'verhuetung' },
    { h: 'Verantwortung und Information',
      body: `<p>Verhütung ist eine <b>gemeinsame Angelegenheit</b> beider Geschlechter. Es zählen <b>Selbstbestimmung</b> und <b>gegenseitige Rücksichtnahme</b>. Die Wahl der Methode hängt von der Lebenssituation ab. Gute Informationen findest du bei Fachstellen und auf seriösen Seiten wie feel-ok.ch, spiz.ch, sex-i.ch oder verhuetungsinfo.ch.</p>` },
    { h: 'Vorgerechnet: Eisprung', worked: {
      given: 'Ein Zyklus dauert in einem Beispiel 28 Tage. Der Eisprung findet etwa 14 Tage vor der nächsten Menstruation statt. An welchem Tag?',
      steps: [['Rechnung', '28 − 14 = 14'], ['Antwort', 'Am 14. Tag (Beispiel). Das ist keine Verhütungsmethode, weil Zyklen unterschiedlich sind.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über die Pille stimmt?',
        options: ['Sie verhindert den Eisprung und wird nach Plan eingenommen.', 'Sie schützt auch vor Infektionen.', 'Sie wird erst nach Bedarf genommen.', 'Sie wirkt sofort nach der ersten Einnahme.'],
        explain: 'Die Pille wirkt über Hormone und muss regelmässig eingenommen werden. Vor Infektionen schützt sie nicht.' } }
  ]
};
const GOALS = {
  k1: ['Bau und Funktion von Muskeln, Knochen und Gelenken beschreiben', 'das Gegenspielerprinzip erklären'],
  k2: ['die vier Stoffwechselvorgänge nennen', 'Sauerstoff und Kohlenstoffdioxid nachweisen'],
  k3: ['den Weg der Luft und den Gasaustausch beschreiben', 'die Bedeutung der grossen Oberfläche erklären'],
  k4: ['Blutbestandteile und Gefässe unterscheiden', 'den Bau des Herzens und die zwei Kreisläufe beschreiben'],
  k5: ['den Herzinfarkt erklären und Vorbeugung nennen', 'Aufgaben der Entsorgungsorgane beschreiben'],
  k6: ['den Menstruationszyklus und die Befruchtung beschreiben', 'Verhütungsmethoden sachlich vergleichen']
};
const LEARN = {
  'k1-organ': 'Der Mensch: mehr als Haut und Knochen', 'k1-muskel': 'Muskeln, Knochen und Gelenke', 'k1-knochen': 'Muskeln, Knochen und Gelenke', 'k1-versuch': 'Was passiert mit dem Knochen?', 'k1-sehne': 'Muskeln, Knochen und Gelenke', 'k1-gegen': 'Das Gegenspielerprinzip', 'k1-modell': 'Das Gegenspielerprinzip',
  'k2-vier': 'Weshalb musst du atmen und essen?', 'k2-atmen': 'Weshalb musst du atmen und essen?', 'k2-umwand': 'Umwandlung in den Zellen', 'k2-energie': 'Umwandlung in den Zellen', 'k2-nachweis': 'Gase nachweisen', 'k2-luft': 'Vorgerechnet: Sauerstoff in der Luft', 'k2-abgabe': 'Welcher Vorgang?',
  'k3-weg': 'Der Weg der Luft', 'k3-bewegung': 'Einatmen und Ausatmen', 'k3-austausch': 'Gasaustausch und Oberfläche', 'k3-oberfl': 'Gasaustausch und Oberfläche', 'k3-faktor': 'Vergleiche die Oberflächen', 'k3-minute': 'Vorgerechnet: Luft pro Minute', 'k3-ml': 'Vorgerechnet: Luft pro Minute',
  'k4-aufgaben': 'Aus was besteht Blut?', 'k4-rot': 'Aus was besteht Blut?', 'k4-weiss': 'Aus was besteht Blut?', 'k4-plaett': 'Wer macht was im Blut?', 'k4-weisse': 'Vorgerechnet: Blutzellen', 'k4-gefaess': 'Arterie, Vene oder Kapillare?', 'k4-lauf': 'Gefässe und Kreisläufe', 'k4-herz': 'Das Herz',
  'k5-infarkt': 'Der Herzinfarkt', 'k5-thrombose': 'Der Herzinfarkt', 'k5-vorbeugen': 'Der Herzinfarkt', 'k5-niere': 'Die Entsorgungssysteme', 'k5-leber': 'Die Entsorgungssysteme', 'k5-darm': 'Wer entsorgt was?', 'k5-lunge': 'Die Entsorgungssysteme',
  'k6-befruchtung': 'Befruchtung und Zyklus', 'k6-zyklus': 'Der Zyklus im Überblick', 'k6-zyklus-num': 'Vorgerechnet: Eisprung', 'k6-pille': 'Verhütungsmethoden', 'k6-kondom': 'Stimmt das?', 'k6-lebens': 'Verantwortung und Information', 'k6-verantw': 'Verantwortung und Information', 'k6-quelle': 'Verantwortung und Information', 'k6-mythos': 'Stimmt das?'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Zelle', pw: 'fängt klein an' },
  { xp: 80, name: 'Muskel', pw: 'zieht an' },
  { xp: 200, name: 'Lungenbläschen', pw: 'tauscht Gase' },
  { xp: 380, name: 'Blutzelle', pw: 'transportiert' },
  { xp: 620, name: 'Herz', pw: 'pumpt' },
  { xp: 920, name: 'Körperprofi', pw: 'kennt die Zusammenhänge' }
];

/* ---------- Thema: 7_2 Den Körper analysieren ---------- */
const TOPIC = {
  id: 'nt7-2', storeKey: 'halingen-nt7-2-v1', other: { title: '8_3 Funktionen des Körpers analysieren', href: '8_3_Funktionen_des_Koerpers_analysieren.html' },
  title: 'Den Körper analysieren', lead: 'Bewegung, Stoffwechsel, Atmung und Kreislauf', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Stoffe werden nicht verwandelt, sondern umgebaut.', 'Muskeln können nur ziehen: Gegenspieler!'],
  formulas: [
    ['Stoffwechsel', 'Aufnahme, Transport', 'Umwandlung, Abgabe'],
    ['Bewegung', 'Beuger und Strecker', 'Gegenspielerprinzip'],
    ['Luft', 'ca. 21 % Sauerstoff', 'Nachweis: Glimmspan'],
    ['Lunge', 'grosse Oberfläche', '≈ 100 m² bei 6 L'],
    ['Blut', 'Plasma, rote, weisse Zellen', 'Blutplättchen'],
    ['Kreislauf', 'Lungen- und Körperkreislauf', 'Arterien, Venen, Kapillaren']
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
  organe(el) {
    sorter(el, [
      { t: 'Sie pumpt das Blut durch den Körper.', ok: ['he'], why: 'Das ist das Herz.' },
      { t: 'Hier tauscht das Blut Sauerstoff und Kohlenstoffdioxid mit der Luft aus.', ok: ['lu'], why: 'Das passiert in den Lungenbläschen der Lunge.' },
      { t: 'Sie filtern das Blut und bilden Urin, wie eine Kläranlage.', ok: ['ni'], why: 'Das sind die Nieren.' },
      { t: 'Sie ist die Entgiftungsstation des Körpers.', ok: ['le'], why: 'Das ist die Leber.' },
      { t: 'Er entzieht dem Rest der Nahrung Wasser und entsorgt Feststoffe.', ok: ['di'], why: 'Das ist der Dickdarm.' }
    ], { he: 'Herz', lu: 'Lunge', ni: 'Nieren', le: 'Leber', di: 'Dickdarm' }, 'Welches Organ ist gemeint?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  stoffwechsel(el) {
    sorter(el, [
      { t: 'Sauerstoff gelangt in der Lunge ins Blut.', ok: ['au'], why: 'Das ist die Aufnahme.' },
      { t: 'Das Blut bringt Nährstoffe und Sauerstoff zu den Zellen.', ok: ['tr'], why: 'Das ist der Transport.' },
      { t: 'In den Zellen entsteht aus Nährstoffen und Sauerstoff Energie.', ok: ['um'], why: 'Das ist die Umwandlung.' },
      { t: 'Kohlenstoffdioxid wird ausgeatmet.', ok: ['ab'], why: 'Das ist die Abgabe.' },
      { t: 'Nährstoffe gelangen im Darm ins Blut.', ok: ['au'], why: 'Auch das ist Aufnahme.' },
      { t: 'Die Niere scheidet Abfallstoffe mit dem Urin aus.', ok: ['ab'], why: 'Das ist die Abgabe.' }
    ], { au: 'Aufnahme', tr: 'Transport', um: 'Umwandlung', ab: 'Abgabe' }, 'Welcher Stoffwechselvorgang?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  nachweis(el) {
    sorter(el, [
      { t: 'Ein glimmender Holzspan flammt auf.', ok: ['o2'], why: 'Das ist die Glimmspanprobe: Sauerstoff.' },
      { t: 'Kalkwasser wird trüb.', ok: ['co'], why: 'Das ist der Nachweis für Kohlenstoffdioxid.' },
      { t: 'Eine brennende Kerze erlischt in einem Gefäss.', ok: ['co'], why: 'Kohlenstoffdioxid unterstützt die Verbrennung nicht.' },
      { t: 'Ein glimmender Span brennt in einem Gefäss mit viel Gas besonders hell.', ok: ['o2'], why: 'Sauerstoff fördert die Verbrennung.' }
    ], { o2: 'Sauerstoff', co: 'Kohlenstoffdioxid' }, 'Welches Gas wird nachgewiesen?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  blut(el) {
    sorter(el, [
      { t: 'Sie enthalten Hämoglobin und transportieren Sauerstoff.', ok: ['ro'], why: 'Das sind die roten Blutzellen.' },
      { t: 'Sie wehren Krankheitserreger ab.', ok: ['we'], why: 'Das sind die weissen Blutzellen.' },
      { t: 'Sie verschliessen Wunden zusammen mit Fibrin.', ok: ['pl'], why: 'Das sind die Blutplättchen.' },
      { t: 'Er besteht hauptsächlich aus Wasser und transportiert gelöste Stoffe.', ok: ['pa'], why: 'Das ist das Blutplasma.' }
    ], { ro: 'Rote Blutzellen', we: 'Weisse Blutzellen', pl: 'Blutplättchen', pa: 'Blutplasma' }, 'Welcher Bestandteil des Bluts?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  gefaess(el) {
    sorter(el, [
      { t: 'Sie führt das Blut vom Herzen weg und hat eine kräftige Wand.', ok: ['ar'], why: 'Das ist eine Arterie.' },
      { t: 'Sie führt das Blut zum Herzen zurück und hat Klappen.', ok: ['ve'], why: 'Das ist eine Vene.' },
      { t: 'Sie ist sehr dünn und ermöglicht den Stoffaustausch mit den Zellen.', ok: ['ka'], why: 'Das ist eine Kapillare.' },
      { t: 'Sie verbindet Arterien und Venen.', ok: ['ka'], why: 'Das sind die Kapillaren.' }
    ], { ar: 'Arterie', ve: 'Vene', ka: 'Kapillare' }, 'Um welches Gefäss handelt es sich?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  verhuetung(el) {
    sorter(el, [
      { t: 'Die Pille schützt auch vor sexuell übertragbaren Infektionen.', ok: ['fa'], why: 'Das stimmt nicht. Nur das Kondom schützt zusätzlich vor Infektionen.' },
      { t: 'Das Kondom schützt auch vor sexuell übertragbaren Infektionen.', ok: ['ri'], why: 'Das stimmt.' },
      { t: 'Die Pille nimmt man nach Bedarf kurz vor dem Geschlechtsverkehr.', ok: ['fa'], why: 'Die Pille wird regelmässig nach einem Plan eingenommen.' },
      { t: 'Für Verhütung sind beide Partner gemeinsam verantwortlich.', ok: ['ri'], why: 'Verhütung ist eine gemeinsame Angelegenheit.' },
      { t: 'Zungenküsse können zu einer Schwangerschaft führen.', ok: ['fa'], why: 'Dafür müssen Spermium und Eizelle aufeinandertreffen. Küssen reicht nicht.' },
      { t: 'Die «Pille danach» ist eine Notfallmassnahme, keine regelmässige Methode.', ok: ['ri'], why: 'Das stimmt.' }
    ], { ri: 'Stimmt', fa: 'Stimmt nicht' }, 'Ist die Aussage richtig?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  knochen(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Behandlung"><button class="btn sm on" data-b="u">Unbehandelt</button><button class="btn sm" data-b="e">In Essig</button><button class="btn sm" data-b="a">Ausgebrannt</button></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    const T = {
      u: 'Der Knochen ist <b>hart und belastbar</b>: Harte Kristalle (Calciumphosphat) und elastische Proteine arbeiten zusammen.',
      e: 'Die Säure löst die <b>harten Kristalle</b> auf. Der Knochen wird <b>biegsam</b>, weil nur die Proteine übrig bleiben (mehrere Tage, bei Speiseessig mindestens drei bis vier).',
      a: 'Beim Ausbrennen werden die <b>elastischen Proteine</b> zerstört. Der Knochen wird <b>brüchig</b>. Mache dies nur mit Anleitung der Lehrperson.'
    };
    el.querySelectorAll('[data-b]').forEach(b => b.addEventListener('click', () => {
      el.querySelectorAll('[data-b]').forEach(x => x.classList.toggle('on', x === b)); $id('ro').innerHTML = T[b.dataset.b];
    }));
    $id('ro').innerHTML = T.u;
  },

  gegenspieler(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Gelenk"><button class="btn sm on" data-g="a">Arm</button><button class="btn sm" data-g="b">Bein</button></div>
      <div class="seg3" role="group" aria-label="Stellung"><button class="btn sm on" data-s="1">Beugen</button><button class="btn sm" data-s="2">Strecken</button></div>
      <div class="brow"><span class="bname" id="n1">Beuger</span><div class="btrack"><div class="bfill" id="m1"></div></div><b class="mono bval" id="v1"></b></div>
      <div class="brow"><span class="bname" id="n2">Strecker</span><div class="btrack"><div class="bfill th" id="m2"></div></div><b class="mono bval" id="v2"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let g = 'a', s = '1';
    function upd() {
      el.querySelectorAll('[data-g]').forEach(b => b.classList.toggle('on', b.dataset.g === g));
      el.querySelectorAll('[data-s]').forEach(b => b.classList.toggle('on', b.dataset.s === s));
      const beug = g === 'a' ? 'Armbeuger (Bizeps)' : 'Kniebeuger', streck = g === 'a' ? 'Armstrecker (Trizeps)' : 'Kniestrecker';
      $id('n1').textContent = beug; $id('n2').textContent = streck;
      $id('m1').style.width = (s === '1' ? 90 : 25) + '%'; $id('m2').style.width = (s === '1' ? 25 : 90) + '%';
      $id('v1').textContent = s === '1' ? 'angespannt' : 'gedehnt'; $id('v2').textContent = s === '1' ? 'gedehnt' : 'angespannt';
      $id('ro').innerHTML = `Beim <b>${s === '1' ? 'Beugen' : 'Strecken'}</b> zieht sich der ${s === '1' ? 'Beuger' : 'Strecker'} zusammen. Sein Gegenspieler wird gedehnt. Ein Muskel kann nur ziehen.`;
    }
    el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => { g = b.dataset.g; upd(); }));
    el.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => { s = b.dataset.s; upd(); }));
    $id('m1').style.width = '0%'; $id('m2').style.width = '0%'; nf(el, upd);
  },

  atmung(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Atmung"><button class="btn sm on" data-a="e">Einatmen</button><button class="btn sm" data-a="a">Ausatmen</button></div>
      <div class="trio"><div><span class="k">Zwerchfell</span><b class="mono" id="a1"></b></div><div><span class="k">Brustkorb</span><b class="mono" id="a2"></b></div><div><span class="k">Lunge</span><b class="mono" id="a3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function set(k) {
      el.querySelectorAll('[data-a]').forEach(b => b.classList.toggle('on', b.dataset.a === k));
      const e = k === 'e';
      $id('a1').textContent = e ? 'flacht ab' : 'wölbt sich'; $id('a2').textContent = e ? 'hebt sich' : 'senkt sich'; $id('a3').textContent = e ? 'grösser' : 'kleiner';
      $id('ro').innerHTML = e ? 'Die Atemmuskeln vergrössern den Brustraum. Der Druck in der Lunge sinkt, und <b>Luft strömt ein</b>.' : 'Der Brustraum wird kleiner. Der Druck in der Lunge steigt, und <b>Luft strömt aus</b>. Die Lunge selbst bewegt sich nur passiv.';
    }
    el.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', () => set(b.dataset.a)));
    set('e');
  },

  lunge(el) {
    el.innerHTML = `<div class="sim"><div class="brow"><span class="bname">Ballon (6 L)</span><div class="btrack"><div class="bfill" id="l1" style="width:1%"></div></div><b class="mono bval">≈ 1/6 m²</b></div>
      <div class="brow"><span class="bname">Lunge (6 L)</span><div class="btrack"><div class="bfill th" id="l2" style="width:100%"></div></div><b class="mono bval">≈ 100 m²</b></div>
      <p class="readout">Die Lunge hat bei gleichem Volumen etwa <b>600-mal</b> mehr Oberfläche als ein Ballon (100 : 1/6 = 600). Das entspricht etwa einem halben Tennisplatz und ermöglicht viel Gasaustausch.</p></div>`;
  },

  herz(el) {
    const S = [
      ['Rechter Vorhof', 'Sauerstoffarmes Blut aus dem Körper strömt über die Venen in den rechten Vorhof.'],
      ['Rechte Kammer', 'Die rechte Kammer pumpt das Blut in die Lungenarterie.'],
      ['Lunge', 'In der Lunge gibt das Blut Kohlenstoffdioxid ab und nimmt Sauerstoff auf.'],
      ['Linker Vorhof', 'Das sauerstoffreiche Blut fliesst über die Lungenvene in den linken Vorhof.'],
      ['Linke Kammer', 'Die linke Kammer pumpt das Blut mit viel Kraft in die Hauptschlagader.'],
      ['Körper', 'Über Arterien und Kapillaren gibt das Blut Sauerstoff und Nährstoffe an die Zellen ab und nimmt Abfallstoffe auf. Venen bringen es zurück.']
    ];
    el.innerHTML = `<div class="sim"><div class="ohrchain" aria-hidden="true">${S.map((s, i) => `<span class="ostep" data-i="${i}">${s[0]}</span>`).join('<b>→</b>')}</div>
      <p class="readout" id="ro" aria-live="polite"></p><button class="btn btn-primary block" id="on">Weiter</button></div>`;
    let i = 0;
    function show() {
      el.querySelectorAll('.ostep').forEach((x, k) => x.classList.toggle('on', k === i));
      $id('ro').innerHTML = `<b>${S[i][0]}:</b> ${S[i][1]}`;
      $id('on').textContent = i === S.length - 1 ? 'Nochmals von vorn' : 'Weiter';
    }
    $id('on').addEventListener('click', () => { i = (i + 1) % S.length; show(); });
    show();
  },

  zyklus(el) {
    el.innerHTML = `<div class="sim">${sl('zk', 'Tag im Zyklus', 1, 28, 1, 1, '')}
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const t = +$id('zk').value; $id('zkv').textContent = String(t);
      let s;
      if (t <= 5) s = '<b>Menstruation:</b> Die Gebärmutterschleimhaut wird mit etwas Blut abgestossen.';
      else if (t < 13) s = '<b>Aufbau:</b> Unter dem Einfluss von Östrogen baut sich die Gebärmutterschleimhaut neu auf. Im Eierstock reift eine Eizelle.';
      else if (t <= 15) s = '<b>Eisprung (etwa Zyklusmitte):</b> Die reife Eizelle verlässt den Eierstock und wandert durch den Eileiter.';
      else s = '<b>Zweite Zyklushälfte:</b> Die Schleimhaut ist bereit für eine befruchtete Eizelle. Bleibt die Befruchtung aus, sinken die Hormone, und die Menstruation beginnt wieder.';
      $id('ro').innerHTML = s + '<br>Beispiel mit 28 Tagen. Die Zyklusdauer ist von Person zu Person verschieden.';
    }
    $id('zk').addEventListener('input', upd); upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt7-2","titel":"Den Körper analysieren","kapitel":"NaTech 7, Kapitel 2","audio":"nt7-2"});
