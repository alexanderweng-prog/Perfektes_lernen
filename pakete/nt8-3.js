// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/8_3_Funktionen_des_Koerpers_analysieren.html
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

/* ---------- Inhalt: 8_3 Funktionen des Körpers analysieren, 6 Stationen ----------
   Station 4 enthält zusätzlich das Unterkapitel 3.7 (sexuell übertragbare Infektionen) nach dem Lehrerkommentar. */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'h1', nr: 1, title: 'Gesundheit und Ernährung', sub: 'Hauptnährstoffe und Energie',
    items: [
      { id: 'h1-dim', topic: 'Dimensionen der Gesundheit', make() {
        return mc('Was gehört alles zur Gesundheit?', ['Körperliches, geistiges und soziales Wohlergehen.', 'Nur die Abwesenheit von Krankheit.', 'Nur Sport und Ernährung.', 'Nur das Gewicht.'],
          'Gesundheit ist mehr als nicht krank zu sein. Dazu gehören das körperliche, das geistige (psychische) und das soziale Wohlergehen.');
      } },
      { id: 'h1-schutz', topic: 'Schutz- und Risikofaktoren', make() {
        return mc('Was ist ein Schutzfaktor für die Gesundheit?', ['Ausreichend Bewegung und Schlaf.', 'Dauerhafter Stress ohne Pausen.', 'Rauchen.', 'Mobbing.'],
          'Schutzfaktoren unterstützen die Gesundheit, zum Beispiel Bewegung, Schlaf, gute Beziehungen und Verzicht auf Suchtmittel. Risikofaktoren erhöhen die Gefahr für Erkrankungen.');
      } },
      { id: 'h1-nahr', topic: 'Hauptnährstoffe', make() {
        return mc('Welche drei Hauptnährstoffgruppen kennst du?', ['Kohlenhydrate, Fette und Proteine.', 'Vitamine, Salz und Wasser.', 'Zucker, Salz und Pfeffer.', 'Eisen, Kalk und Gold.'],
          'Kohlenhydrate (zum Beispiel Stärke und Zucker) liefern vor allem Energie. Fette liefern Energie und sind Bausteine. Proteine (Eiweisse) sind vor allem Baustoffe für den Körper.');
      } },
      { id: 'h1-energie', topic: 'Energie im Körper', make() {
        return mc('Welche Formulierung ist fachlich passend?', ['Der Körper benötigt Energie und wandelt sie um, zum Beispiel in Bewegungsenergie und thermische Energie.', 'Der Körper verbraucht Energie, sie ist dann weg.', 'Der Körper braucht Energie und lässt sie verschwinden.', 'Energie wird im Körper aufgegessen.'],
          'Energie geht nicht verloren. Die mit der Nahrung aufgenommene chemische Energie wird umgewandelt, zum Beispiel in thermische Energie (Körpertemperatur) oder in Bewegungsenergie.');
      } },
      { id: 'h1-umsatz', topic: 'Energieumsatz', ext: true, make() {
        const s = rnd([[7000, 3000], [6500, 2500], [8000, 4000], [6000, 3500], [7500, 2000]]), g = s[0] + s[1];
        return num(`Der Grundumsatz einer Person beträgt in einem Beispiel ${fmt(s[0])} kJ pro Tag, der Leistungsumsatz ${fmt(s[1])} kJ. Wie gross ist der Gesamtumsatz?`, 'kJ', g, 'Gesamtumsatz = Grundumsatz + Leistungsumsatz', `${fmt(s[0])} kJ + ${fmt(s[1])} kJ = ${fmt(g)} kJ`);
      } },
      { id: 'h1-ausgew', topic: 'Ausgewogene Ernährung', make() {
        return mc('Was gehört zu einer ausgewogenen Ernährung nach der Ernährungspyramide?', ['Viel Gemüse, Obst und Wasser, mässig tierische Produkte und nur wenig Süsses und Fettiges.', 'Fast nur Süsses.', 'Nur Fleisch.', 'Möglichst gar nichts essen.'],
          'Die Ernährungspyramide zeigt, was du reichlich essen sollst (unten) und was nur sparsam (oben). Es geht um Vielfalt, nicht um Verbote.');
      } }
    ]
  },
  {
    id: 'h2', nr: 2, title: 'Nährstoffe nachweisen', sub: 'Experimente mit Lebensmitteln',
    items: [
      { id: 'h2-staerke', topic: 'Stärkenachweis', make() {
        return mc('Womit weist du Stärke nach und welches Ergebnis siehst du?', ['Mit Lugol-Lösung. Sie färbt sich blauviolett.', 'Mit Wasser. Es wird rot.', 'Mit Essig. Es wird blau.', 'Mit Salz. Es sprudelt.'],
          'Lugol-Lösung ist der Nachweis für Stärke. Ein blauvioletter Farbumschlag zeigt, dass Stärke vorhanden ist.');
      } },
      { id: 'h2-zucker', topic: 'Zuckernachweis', make() {
        return mc('Wie kannst du Traubenzucker in einem Lebensmittel nachweisen?', ['Mit einem Traubenzucker-Teststreifen.', 'Mit einem Thermometer.', 'Mit einem Lineal.', 'Mit einer Waage.'],
          'Teststreifen für Traubenzucker ändern ihre Farbe, wenn Zucker vorhanden ist. Eine Alternative ist die Fehling-Probe mit rotem Niederschlag.');
      } },
      { id: 'h2-kontrolle', topic: 'Kontrollversuch', make() {
        return mc('Warum machst du bei Nährstoffnachweisen auch einen Versuch mit reinem Wasser?', ['Als Kontrollversuch: Nur so kannst du Farben und Veränderungen vergleichen.', 'Damit der Versuch länger dauert.', 'Weil Wasser immer Stärke enthält.', 'Weil man das so macht, ohne Grund.'],
          'Der Kontrollversuch zeigt, wie der Nachweis ohne den Nährstoff aussieht. Erst der Vergleich macht ein positives Ergebnis sichtbar.');
      } },
      { id: 'h2-aceton', topic: 'Sicherheit mit Aceton', make() {
        return mc('Aceton ist leicht entzündlich. Wie dampfst du es ab?', ['Auf einer Heizplatte, nicht über der Gasbrennerflamme.', 'Über der offenen Flamme.', 'Gar nicht, man trinkt es.', 'Mit einem Feuerzeug.'],
          'Weil Aceton leicht entzündlich ist, darf es nie über einer Flamme abgedampft werden. Auf der Heizplatte besteht kein offenes Feuer.');
      } },
      { id: 'h2-fett', topic: 'Fettanteil berechnen', make() {
        const s = rnd([[5, 1.5], [5, 2], [10, 3], [4, 1], [20, 6]]), p = r2(s[1] / s[0] * 100);
        return num(`Aus ${fmt(s[0])} g Kartoffelchips (Beispiel) werden ${fmt(s[1])} g Fett extrahiert. Wie viel Prozent der Chips sind Fett?`, '%', p, 'Fettanteil = Fett : Probe · 100 %', `${fmt(s[1])} g : ${fmt(s[0])} g · 100 % = ${fmt(p)} %`);
      } },
      { id: 'h2-extraktion', topic: 'Extraktion', make() {
        return mc('Was bedeutet Extrahieren?', ['Einen Stoff mit einem Lösungsmittel aus einem Gemisch herauslösen, zum Beispiel Fett aus Chips mit Aceton.', 'Etwas in Wasser auflösen und wegschütten.', 'Etwas erhitzen, bis es schwarz wird.', 'Etwas filtern, ohne Lösungsmittel.'],
          'Beim Extrahieren löst ein geeignetes Lösungsmittel einen Stoff aus dem Gemisch. Danach kann man das Lösungsmittel abdampfen und den Stoff untersuchen.');
      } }
    ]
  },
  {
    id: 'h3', nr: 3, title: 'Der Weg der Nahrung', sub: 'Verdauung und Stoffwechsel',
    items: [
      { id: 'h3-weg', topic: 'Reihenfolge der Verdauungsorgane', make() {
        return mc('Welche Reihenfolge entspricht dem Weg der Nahrung?', ['Mund, Speiseröhre, Magen, Zwölffingerdarm, Dünndarm, Dickdarm, Mastdarm.', 'Magen, Mund, Dünndarm, Speiseröhre, Dickdarm.', 'Mund, Dünndarm, Speiseröhre, Magen, Dickdarm.', 'Speiseröhre, Mund, Magen, Mastdarm, Dünndarm.'],
          'Die Verdauung ist ein Zusammenspiel vieler Organe. Sie läuft nicht nur im Magen ab, sondern beginnt schon im Mund.');
      } },
      { id: 'h3-speichel', topic: 'Speichel', make() {
        return mc('Du gibst Speichel zu einer mit Lugol angefärbten Stärkelösung. Was beobachtest du?', ['Die Färbung verschwindet, weil das Enzym im Speichel die Stärke abbaut.', 'Die Lösung wird dunkler.', 'Nichts ändert sich.', 'Die Lösung wird zu Wasser.'],
          'Im Speichel steckt ein Enzym, das Stärke in kleinere Zucker-Bausteine zerlegt. Darum färbt sich die Lösung nicht mehr blauviolett.');
      } },
      { id: 'h3-galle', topic: 'Galle', make() {
        return mc('Was bewirkt die Galle bei der Verdauung?', ['Sie hilft, Fette zu verdauen, indem sie Fett und Wasser vermischt.', 'Sie zerlegt Stärke.', 'Sie bildet Salzsäure.', 'Sie transportiert Sauerstoff.'],
          'Galle (aus der Leber) gelangt in den Zwölffingerdarm. Sie hilft, Fette fein zu verteilen, sodass sie besser abgebaut werden können.');
      } },
      { id: 'h3-oberfl', topic: 'Oberflächenvergrösserung', make() {
        return mc('Warum ist die Innenwand des Dünndarms stark gefaltet?', ['Die grosse Oberfläche nimmt mehr Nährstoffe auf, ähnlich wie ein Frotteetuch mehr Wasser saugt als ein Leinentuch.', 'Damit er weniger Platz braucht und Nährstoffe verloren gehen.', 'Damit der Darm kürzer wird.', 'Das hat keinen Grund.'],
          'Mit einer grossen Oberfläche können viele Nährstoffe gleichzeitig in das Blut gelangen. Das Frotteetuch-Modell zeigt dieses Prinzip.');
      } },
      { id: 'h3-stoffwechsel', topic: 'Vier Stoffwechselvorgänge', make() {
        return mc('Welche vier zentralen Stoffwechselvorgänge gibt es?', ['Aufnahme, Transport, Umwandlung und Abgabe.', 'Essen, Schlafen, Laufen und Sprechen.', 'Kauen, Schlucken, Verdauen und Ausscheiden.', 'Atmen, Denken, Fühlen und Sehen.'],
          'Bei der Verdauung sind das zum Beispiel: Aufnahme von Nährstoffen im Darm, Transport mit dem Blut, Umwandlung in der Leber und Abgabe von Unverdaulichem.');
      } },
      { id: 'h3-portion', topic: 'Energie einer Portion', make() {
        const s = rnd([[1500, 40], [2000, 25], [1000, 150], [400, 250], [1800, 50]]), e = r2(s[0] * s[1] / 100);
        return num(`Ein Lebensmittel enthält pro 100 g ${fmt(s[0])} kJ (Beispielwert). Wie viel Energie steckt in ${fmt(s[1])} g?`, 'kJ', e, 'Teile die Masse durch 100 und multipliziere mit dem Energiegehalt pro 100 g.', `${fmt(s[1])} g : 100 g · ${fmt(s[0])} kJ = ${fmt(e)} kJ`);
      } }
    ]
  },
  {
    id: 'h4', nr: 4, title: 'Krankheitserreger und Infektionen', sub: 'Viren, Bakterien, Pilze und STI',
    items: [
      { id: 'h4-arten', topic: 'Arten von Erregern', make() {
        return mc('Welche häufigen Krankheitserreger unterscheidest du?', ['Viren, Bakterien und Pilze.', 'Nur Viren.', 'Nur Bakterien.', 'Tiere und Pflanzen.'],
          'Viren, Bakterien und Pilze können Krankheiten auslösen. Die Immunantwort fällt je nach Erreger unterschiedlich aus.');
      } },
      { id: 'h4-bakt', topic: 'Nützliche Bakterien', make() {
        return mc('Sind alle Bakterien schädlich?', ['Nein. Es gibt auch nützliche, zum Beispiel bei der Joghurtherstellung oder im Darm.', 'Ja, alle sind gefährlich.', 'Nein, Bakterien gibt es nicht im Körper.', 'Ja, aber nur im Wasser.'],
          'Viele Bakterien sind harmlos oder sogar nützlich. Nur einige wenige Arten lösen Krankheiten aus.');
      } },
      { id: 'h4-pilz', topic: 'Pilze', make() {
        return mc('Welche Aussage über Pilze stimmt?', ['Das Reich der Pilze reicht von einzelligen Hefepilzen bis zu mehrzelligen Pilzen mit Fruchtkörpern. Typisch sind Zellfäden.', 'Hefepilze gehören nicht zu den Pilzen.', 'Alle Pilze sind einzellig.', 'Pilze haben keine Zellen.'],
          'Beim Mikroskopieren von Schimmelpilz erkennst du die typischen Zellfäden. Hefepilze sind einzellig, aber trotzdem Pilze.');
      } },
      { id: 'h4-hemm', topic: 'Hemmhof', make() {
        return mc('Um ein Filterpapierchen auf dem Hefe-Nährboden bleibt ein heller Ring ohne Wachstum. Was zeigt das?', ['Die Substanz hemmt das Wachstum der Hefepilze: Es ist ein Hemmhof.', 'Die Hefe wächst dort besonders gut.', 'Der Nährboden ist leer.', 'Das Papier ist aufgelöst.'],
          'Der Hemmhof zeigt, dass die Substanz im Papierchen das Wachstum der Pilze verhindert. So kann man testen, ob ein Mittel wirkt.');
      } },
      { id: 'h4-vergleich', topic: 'Viren und Bakterien', make() {
        return mc('Was unterscheidet Viren von Bakterien?', ['Viren sind viel kleiner und vermehren sich nur in Wirtszellen. Bakterien sind eigene Zellen und teilen sich selbst.', 'Viren sind grösser als Bakterien.', 'Bakterien brauchen immer eine Wirtszelle.', 'Es gibt keinen Unterschied.'],
          'Weil Viren und Bakterien sich so verschieden vermehren, fällt auch die Immunantwort unterschiedlich aus.');
      } },
      { id: 'h4-teilung', topic: 'Bakterien teilen sich', ext: true, make() {
        const n0 = rnd([1, 2, 5, 10]), t = rnd([60, 90, 120, 150]), r = n0 * Math.pow(2, t / 30);
        return num(`Zu Beginn sind ${fmt(n0)} Bakterien vorhanden. In diesem Beispiel teilen sie sich alle 30 Minuten und verdoppeln dadurch ihre Zahl. Wie viele Bakterien sind es nach ${fmt(t)} Minuten?`, 'Bakterien', r, 'Zähle, wie oft sich die Bakterien in dieser Zeit teilen. Bei jeder Teilung verdoppelt sich die Zahl.', `${fmt(t)} min : 30 min = ${fmt(t / 30)} Teilungen<br>${fmt(n0)} · 2<sup>${fmt(t / 30)}</sup> = ${fmt(r)}`);
      } },
      { id: 'h4-sti', topic: 'Sexuell übertragbare Infektionen', make() {
        return mc('Was sind sexuell übertragbare Infektionen (STI)?', ['Infektionen, die bei sexuellen Kontakten übertragen werden und durch Bakterien, Viren oder Pilze ausgelöst werden. Beispiele sind HIV, Chlamydien, Genitalherpes und HPV.', 'Infektionen, die nur durch Händeschütteln übertragen werden.', 'Erkrankungen, die nur Erwachsene betreffen können.', 'Infektionen, die immer sofort Beschwerden machen.'],
          'STI können durch Bakterien, Viren oder Pilze verursacht werden. Manche, zum Beispiel Chlamydien, werden bei Jugendlichen in den letzten Jahren häufiger diagnostiziert.');
      } },
      { id: 'h4-risiko', topic: 'Risiko wahrnehmen', make() {
        return mc('Warum sollte man das Risiko einer STI ernst nehmen?', ['Viele Jugendliche unterschätzen es. Auch wer sein Gegenüber gut kennt, kann sich anstecken, und die Zahl der diagnostizierten Infektionen bei Jugendlichen steigt.', 'Weil Ansteckung nur bei Fremden möglich ist.', 'Weil STI immer harmlos sind.', 'Weil STI nur in anderen Ländern vorkommen.'],
          'Eine Infektion kann auch ohne Anzeichen vorhanden sein. Darum sind Schutz und Tests wichtig.');
      } },
      { id: 'h4-schutz', topic: 'Schutz vor STI', make() {
        return mc('Wie kann man sich vor einer Ansteckung mit STI schützen?', ['Mit den Regeln von Safer Sex, zum Beispiel mit Kondom oder Femidom (Kondom für die Frau).', 'Mit der Pille.', 'Mit sofortigem Duschen nach dem Kontakt.', 'Gar nicht, es geht nicht.'],
          'Safer Sex senkt das Risiko deutlich. Wie man es im Detail richtig macht, erklären Fachstellen für Sexualaufklärung.');
      } },
      { id: 'h4-pille', topic: 'Pille und STI', make() {
        return mc('Welche Aussage über die Pille ist richtig?', ['Die Pille schützt nicht vor STI.', 'Die Pille schützt auch vor STI.', 'Die Pille schützt nur vor Viren.', 'Die Pille schützt vor HIV, aber vor nichts sonst.'],
          'Die Pille ist ein Verhütungsmittel, kein Schutz vor Ansteckung. Ein verbreiteter Irrtum ist, dass sie auch vor STI schützt.');
      } },
      { id: 'h4-oral', topic: 'Weitere Übertragungswege', make() {
        return mc('Kann man sich beim Oralsex mit einer STI anstecken?', ['Ja, auch dabei ist eine Ansteckung möglich.', 'Nein, dabei kann nichts passieren.', 'Nur wenn man Medikamente nimmt.', 'Nur bei Erwachsenen.'],
          'Auch Vorstellungen wie «Ich bin oben, dann ist das Risiko kleiner» oder «Ich dusche danach» schützen nicht vor einer Ansteckung.');
      } },
      { id: 'h4-hiv', topic: 'HI-Virus und Immunsystem', make() {
        return mc('Wie wirkt das HI-Virus auf den Körper?', ['Es befällt T-Helferzellen des Immunsystems und schwächt dadurch die Abwehr.', 'Es zerstört nur die Haut.', 'Es wirkt nur auf die Knochen.', 'Es macht das Immunsystem stärker.'],
          'T-Helferzellen steuern die Abwehr. Sind sie befallen, kann der Körper Erreger schlechter bekämpfen.');
      } },
      { id: 'h4-info', topic: 'Information und Beratung', make() {
        return mc('Wo kannst du dich zu Sexualität, Schutz und Tests informieren?', ['Bei Fachstellen für Sexualaufklärung, in Arztpraxen, bei Beratungs- und Teststellen und mit seriösen, altersgemässen Medien.', 'Nur in sozialen Medien.', 'Nirgends, darüber spricht man nicht.', 'Nur bei Freunden.'],
          'Es gibt vielfältige Beziehungsformen und Arten, Sexualität zu leben. Gute Fachstellen beantworten Fragen respektvoll und ohne Stereotype.');
      } }
    ]
  },
  {
    id: 'h5', nr: 5, title: 'Immunsystem und Blutgruppen', sub: 'Antigen und Antikörper',
    items: [
      { id: 'h5-schluessel', topic: 'Schlüssel-Schloss-Prinzip', make() {
        return mc('Wie funktioniert die Antigen-Antikörper-Reaktion?', ['Nach dem Schlüssel-Schloss-Prinzip: Ein Antikörper passt genau zu einem bestimmten Antigen.', 'Jeder Antikörper passt zu jedem Antigen.', 'Antikörper sind Stoffe, die Erreger auffressen.', 'Antigene bilden Antikörper.'],
          'Antigene sind Merkmale auf Erregern oder Fremdstoffen. Ein Antikörper passt wie ein Schlüssel nur zu einem Antigen.');
      } },
      { id: 'h5-abwehr', topic: 'Abwehr statt Kampf', make() {
        return mc('Welches Wort passt fachlich besser als «Kampf» gegen Viren?', ['Abwehr.', 'Krieg.', 'Schlacht.', 'Angriff.'],
          'Die Immunantwort beruht auf dem Schlüssel-Schloss-Prinzip und nicht auf einem Kampf. Darum sagt man besser «Abwehr».');
      } },
      { id: 'h5-unspez', topic: 'Spezifisch und unspezifisch', make() {
        return mc('Was ist der Unterschied zwischen unspezifischer und spezifischer Immunantwort?', ['Die unspezifische richtet sich gegen alle Erreger (zum Beispiel Fresszellen). Die spezifische richtet sich gegen einen bestimmten Erreger (zum Beispiel B-Zellen mit Antikörpern).', 'Beide sind genau gleich.', 'Die unspezifische gibt es nur nach einer Impfung.', 'Die spezifische richtet sich gegen alles.'],
          'Die unspezifische Abwehr reagiert sofort allgemein. Die spezifische Abwehr braucht etwas Zeit, richtet sich genau gegen den Erreger und bildet Gedächtniszellen.');
      } },
      { id: 'h5-gruppe', topic: 'Blutgruppe A', make() {
        return mc('Eine Person hat die Blutgruppe A. Was gilt?', ['Ihre roten Blutzellen tragen das Antigen A, im Blutplasma sind Antikörper gegen B.', 'Ihre roten Blutzellen tragen das Antigen B, im Plasma sind Antikörper gegen A.', 'Sie hat keine Antigene.', 'Sie hat Antikörper gegen A.'],
          'Das Immunsystem bildet keine Antikörper gegen eigene Antigene. Bei Blutgruppe A gibt es darum Antikörper gegen B.');
      } },
      { id: 'h5-spender', topic: 'Spender und Empfänger', make() {
        return mc('Welche Blutgruppe gilt für rote Blutzellen als Universalspender und welche als Universalempfänger?', ['Blutgruppe 0 ist Universalspender, Blutgruppe AB ist Universalempfänger.', 'Blutgruppe AB ist Universalspender, Blutgruppe 0 ist Universalempfänger.', 'Blutgruppe A für beides.', 'Blutgruppe B für beides.'],
          '0-Blut trägt keine Antigene A oder B. Daher lösen die Blutzellen bei niemandem eine Reaktion aus. AB hat keine Antikörper und verträgt alle Blutgruppen.');
      } },
      { id: 'h5-allergie', topic: 'Allergie', make() {
        return mc('Was ist eine Allergie?', ['Eine Überreaktion des Immunsystems auf eigentlich harmlose Stoffe.', 'Eine Infektion mit Bakterien.', 'Eine Mangelkrankheit.', 'Eine Verletzung.'],
          'Bei einer Allergie reagiert das Immunsystem zu stark auf Stoffe wie Pollen. Der Körper behandelt sie, als wären sie gefährliche Erreger.');
      } }
    ]
  },
  {
    id: 'h6', nr: 6, title: 'Impfen, Krebs und Medikamente', sub: 'Vorbeugen und richtig handeln',
    items: [
      { id: 'h6-aktiv', topic: 'Schutzimpfung', make() {
        return mc('Was geschieht bei einer Schutzimpfung (aktive Immunisierung)?', ['Der Körper bildet selbst Antikörper und Gedächtniszellen und ist danach lange geschützt.', 'Der Körper bekommt fertige Antikörper und ist nur kurz geschützt.', 'Der Körper bekommt Medikamente gegen Bakterien.', 'Der Körper wird krank.'],
          'Der Impfstoff enthält abgeschwächte oder abgetötete Erreger oder Teile davon. Das Immunsystem lernt sie kennen und bildet Gedächtniszellen.');
      } },
      { id: 'h6-passiv', topic: 'Heilimpfung', make() {
        return mc('Warum führt eine Heilimpfung (passive Immunisierung) nicht zu langem Schutz?', ['Weil der Körper keine eigenen Gedächtniszellen bildet, die fertigen Antikörper werden abgebaut.', 'Weil sie keine Antikörper enthält.', 'Weil sie nur bei Kindern wirkt.', 'Weil sie immer Nebenwirkungen hat.'],
          'Bei der Heilimpfung erhält man fertige Antikörper. Sie helfen sofort, aber nur kurze Zeit. Sie ersetzt eine Schutzimpfung nicht.');
      } },
      { id: 'h6-grippe', topic: 'Grippeimpfung', make() {
        return mc('Die Grippeimpfung wird jedes Jahr neu entwickelt. Was gilt?', ['Sie ist eine Schutzimpfung, die jährlich nötig ist, weil sich die Grippeviren stark verändern.', 'Sie ist eine Heilimpfung.', 'Sie wirkt ein Leben lang.', 'Sie schützt gegen alle Krankheiten.'],
          'Die Antigene der Grippeviren ändern sich jedes Jahr. Der Impfstoff muss darum angepasst und die Impfung wiederholt werden.');
      } },
      { id: 'h6-krebs', topic: 'Krebs', make() {
        return mc('Wie entsteht Krebs und was ist der Unterschied zwischen gutartigen und bösartigen Tumoren?', ['Körperzellen teilen sich unkontrolliert. Bösartige Tumoren wachsen in umliegendes Gewebe ein und können Tochtergeschwülste bilden.', 'Krebs ist immer ansteckend.', 'Gutartige Tumoren breiten sich im ganzen Körper aus.', 'Krebs entsteht nur im Alter.'],
          'Krebs beginnt mit veränderten Zellen, die sich ungebremst teilen. Auch junge Menschen können erkranken. Früherkennung und Therapie haben viele Verläufe verbessert.');
      } },
      { id: 'h6-risiko', topic: 'Krebsrisiko senken', make() {
        return mc('Was kannst du tun, um das Risiko für bestimmte Krebsarten zu verringern?', ['Nicht rauchen, Sonnenschutz nutzen und Vorsorgeuntersuchungen wahrnehmen.', 'Nichts, Krebs ist immer reines Schicksal.', 'Viel rauchen, damit der Körper sich daran gewöhnt.', 'Nie zum Arzt gehen.'],
          'Bei manchen Krebsarten lässt sich das Risiko senken. Es gibt aber keine Garantie. Auch gesundheitsbewusste Menschen können erkranken.');
      } },
      { id: 'h6-medi', topic: 'Umgang mit Medikamenten', make() {
        return mc('Wie gehst du richtig mit Medikamenten um?', ['Beipackzettel lesen, bei Unsicherheit Ärztin, Arzt oder Apotheke fragen und nicht ohne Grund regelmässig einnehmen.', 'Beipackzettel wegwerfen.', 'Jeden Abend eine Beruhigungstablette nehmen, um gut zu schlafen.', 'Mehr nehmen, damit es schneller wirkt.'],
          'Medikamente haben Wirkungen und Nebenwirkungen. Besonders Beruhigungs- und Schlafmittel können abhängig machen.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  h1: [
    { h: 'Gesundheit hat drei Seiten',
      body: `${merk('Gesundheit umfasst das <b>körperliche</b>, das <b>geistige</b> und das <b>soziale</b> Wohlergehen.')}
        <p><b>Schutzfaktoren</b> (zum Beispiel Bewegung, Schlaf, gute Beziehungen, Verzicht auf Suchtmittel) unterstützen die Gesundheit. <b>Risikofaktoren</b> (zum Beispiel Rauchen, dauernder Stress, Mobbing) erhöhen das Risiko für Beschwerden.</p>` },
    { h: 'Die Hauptnährstoffe',
      body: `<ul><li><b>Kohlenhydrate:</b> Stärke und Zucker, liefern vor allem Energie.</li>
        <li><b>Fette:</b> liefern Energie und sind Baustoffe.</li>
        <li><b>Proteine:</b> Eiweisse, Baustoffe für Muskeln, Haut und mehr.</li></ul>
        <p>Die Ernährungspyramide hilft dir, die Lebensmittel nach Menge einzuordnen.</p>` },
    { h: 'Energie und Umsatz',
      body: `${merk('Sage <b>«benötigt»</b> und <b>«umgewandelt»</b>, nicht «verbraucht». Die Energie aus der Nahrung wird zum Beispiel in thermische Energie und Bewegungsenergie umgewandelt.')}
        <p><b>Grundumsatz</b> ist die Energie, die der Körper in Ruhe benötigt. <b>Leistungsumsatz</b> kommt durch Bewegung dazu. Zusammen ergeben sie den <b>Gesamtumsatz</b>. Die Zahlen hängen von Person und Tätigkeit ab.</p>` },
    { h: 'Vorgerechnet: Gesamtumsatz', worked: {
      given: 'In einem Beispiel beträgt der Grundumsatz 7000 kJ pro Tag und der Leistungsumsatz 3000 kJ. Wie gross ist der Gesamtumsatz?',
      steps: [['Formel', 'Gesamtumsatz = Grundumsatz + Leistungsumsatz'], ['Rechnung', '7000 kJ + 3000 kJ = 10 000 kJ'], ['Antwort', 'Der Gesamtumsatz beträgt in diesem Beispiel 10 000 kJ pro Tag.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wozu gehören Schlaf und Bewegung?',
        options: ['Zu den Schutzfaktoren für die Gesundheit.', 'Zu den Risikofaktoren.', 'Zu den Hauptnährstoffen.', 'Zu den Krankheitserregern.'],
        explain: 'Bewegung und ausreichend Schlaf unterstützen das körperliche und geistige Wohlergehen. Sie sind Schutzfaktoren.' } }
  ],
  h2: [
    { h: 'Nährstoffe nachweisen',
      body: `<ul><li><b>Stärke:</b> Lugol-Lösung färbt blauviolett.</li>
        <li><b>Traubenzucker:</b> Teststreifen ändert die Farbe.</li>
        <li><b>Fett:</b> Fettfleck auf Papier, der durchscheint.</li>
        <li><b>Protein:</b> zum Beispiel Eiklar mit Essig (es gerinnt).</li></ul>
        ${merk('Mache immer einen <b>Kontrollversuch</b> mit reinem Wasser. Nur im Vergleich siehst du, ob der Nachweis positiv ist.')}` },
    { h: 'Welcher Nachweis?',
      body: '<p>Ordne jeder Beobachtung den passenden Nährstoff zu.</p>', sim: 'nachweis' },
    { h: 'Fett extrahieren',
      body: `<p>Beim Extrahieren löst ein Lösungsmittel (zum Beispiel Aceton) das Fett aus den zerkleinerten Chips. Nach dem Abdampfen bleibt das Fett zurück.</p>
        ${warnbox('<b>Sicherheit:</b> Aceton ist leicht entzündlich. Dampfe es auf einer Heizplatte ab, nie über einer Flamme. Arbeite nur mit Schutzbrille und nach Anweisung der Lehrperson.')}` },
    { h: 'Vorgerechnet: Fettanteil', worked: {
      given: 'Aus 5 g Kartoffelchips (Beispiel) werden 1,5 g Fett extrahiert. Wie viel Prozent sind Fett?',
      steps: [['Formel', 'Anteil = Fett : Probe · 100 %'], ['Rechnung', '1,5 g : 5 g = 0,3'], ['Antwort', '0,3 · 100 % = 30 %. Die Chips bestehen in diesem Beispiel zu 30 % aus Fett.']] } },
    { h: 'Kurz testen',
      check: { q: 'Du gibst Lugol-Lösung auf eine Kartoffelscheibe. Sie wird blauviolett. Was zeigt das?',
        options: ['Es ist Stärke vorhanden.', 'Es ist Fett vorhanden.', 'Es ist Eiweiss vorhanden.', 'Es ist nur Wasser vorhanden.'],
        explain: 'Der blauviolette Farbumschlag mit Lugol-Lösung ist der Nachweis für Stärke.' } }
  ],
  h3: [
    { h: 'Der Weg der Nahrung',
      body: '<p>Die Nahrung durchläuft viele Organe. Tippe auf «Weiter» und folge ihr von Mund bis Mastdarm.</p>', sim: 'verdauung' },
    { h: 'Enzyme, Säure und Galle',
      body: `<ul><li><b>Mund:</b> Ein Enzym im Speichel zerlegt Stärke.</li>
        <li><b>Magen:</b> Salzsäure und das Enzym Pepsin greifen Proteine an.</li>
        <li><b>Zwölffingerdarm:</b> Galle (aus der Leber) hilft bei den Fetten, der Bauchspeichel enthält Verdauungsenzyme.</li></ul>
        <p>Die Nährstoffe werden in ihre Bausteine zerlegt (Proteine in Aminosäuren, Fette in Fettsäuren und Glycerin, Kohlenhydrate in Zucker).</p>` },
    { h: 'Oberfläche vergrössern',
      body: `${merk('Die Innenwand des Dünndarms hat viele Falten. Die <b>grosse Oberfläche</b> lässt mehr Nährstoffe gleichzeitig ins Blut übergehen.')}
        <p>Im Modell saugt ein <b>Frotteetuch</b> mehr Wasser auf als ein glattes Leinentuch. Das Modell hat Grenzen: Der Darm ist lebendig und bewegt sich.</p>` },
    { h: 'Vorgerechnet: Energie einer Portion', worked: {
      given: 'Ein Lebensmittel enthält pro 100 g 1500 kJ (Beispielwert). Wie viel Energie steckt in 40 g?',
      steps: [['Masse in Verhältnis setzen', '40 g : 100 g = 0,4'], ['Rechnung', '0,4 · 1500 kJ = 600 kJ'], ['Antwort', 'In 40 g stecken 600 kJ.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wo beginnt die Verdauung?',
        options: ['Schon im Mund, durch das Enzym im Speichel.', 'Erst im Magen.', 'Erst im Dünndarm.', 'Im Dickdarm.'],
        explain: 'Die Verdauung beginnt im Mund: Der Speichel beginnt, Stärke zu zerlegen.' } }
  ],
  h4: [
    { h: 'Viren, Bakterien und Pilze',
      body: `<ul><li><b>Viren:</b> viel kleiner als Bakterien, vermehren sich nur in Wirtszellen.</li>
        <li><b>Bakterien:</b> einzellige Lebewesen. Es gibt viele nützliche (Joghurt, Darm).</li>
        <li><b>Pilze:</b> einzellig (Hefe) bis mehrzellig, typisch sind Zellfäden.</li></ul>` },
    { h: 'Pilze untersuchen',
      body: `<p>Unter dem Mikroskop siehst du bei Schimmelpilz die <b>Zellfäden</b>. Auf einem Hefe-Nährboden zeigt ein <b>Hemmhof</b> um ein Filterpapierchen, dass eine Substanz das Wachstum hemmt.</p>
        ${warnbox('<b>Sicherheit:</b> In der Schule werden keine Bakterien auf Nährböden gezüchtet. Für Hefepilze gibt es spezielle Nährböden. Wasche dir nach dem Arbeiten die Hände.')}` },
    { h: 'Sexuell übertragbare Infektionen (STI)',
      body: `<p>STI werden bei sexuellen Kontakten übertragen. Sie können durch <b>Bakterien</b>, <b>Viren</b> oder <b>Pilze</b> ausgelöst werden, zum Beispiel HIV, Chlamydien, Genitalherpes und HPV. Viele Jugendliche unterschätzen das Risiko. Eine Ansteckung ist auch bei Menschen möglich, die man gut kennt.</p>
        ${merk('<b>Schutz:</b> Safer Sex, zum Beispiel mit <b>Kondom</b> oder <b>Femidom</b>. Die <b>Pille</b> schützt nicht vor STI. Das HI-Virus befällt die <b>T-Helferzellen</b> und schwächt das Immunsystem.')}` },
    { h: 'Stimmt das?',
      body: '<p>Beurteile die Aussagen zum Schutz vor STI.</p>', sim: 'sti' },
    { h: 'Information und Beratung',
      body: `<p>Fragen zu Sexualität, Schutz und Tests klärst du am besten mit <b>Fachstellen für Sexualaufklärung</b>, in der Arztpraxis oder bei <b>Beratungs- und Teststellen</b>. Es gibt viele Formen von Beziehungen und Arten, Sexualität zu leben. Gute Beratung ist respektvoll und frei von Stereotypen.</p>
        ${warnbox('Frage nach, wenn etwas unklar ist. Hole dir Rat bei einer Vertrauensperson, in der Arztpraxis oder bei einer Beratungsstelle, wenn du unsicher bist.')}` },
    { h: 'Bakterien vermehren sich',
      body: '<p>Stelle die Zeit ein. In diesem Beispiel verdoppeln sich die Bakterien alle 30 Minuten. Das ist ein Modell mit Beispielwerten.</p>', sim: 'wachstum' },
    { h: 'Vorgerechnet: Teilung', worked: {
      given: 'Zu Beginn sind 5 Bakterien vorhanden. Sie verdoppeln sich alle 30 Minuten. Wie viele sind es nach 90 Minuten?',
      steps: [['Teilungen zählen', '90 min : 30 min = 3 Teilungen'], ['Rechnung', '5 · 2 · 2 · 2 = 5 · 8 = 40'], ['Antwort', 'Nach 90 Minuten sind es 40 Bakterien.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum wird die Immunantwort bei Viren und Bakterien anders?',
        options: ['Weil sie sich verschieden vermehren: Viren in Wirtszellen, Bakterien durch Teilung.', 'Weil Viren grösser sind.', 'Weil Bakterien keine Zellen sind.', 'Weil es keinen Unterschied gibt.'],
        explain: 'Die verschiedene Vermehrung führt dazu, dass das Immunsystem unterschiedlich abwehren muss.' } }
  ],
  h5: [
    { h: 'Das Immunsystem',
      body: `<p>Das Immunsystem wehrt Erreger ab. Sage <b>«Abwehr»</b>, nicht «Kampf».</p>
        <ul><li><b>Unspezifische Abwehr:</b> richtet sich gegen alle Erreger, zum Beispiel Fresszellen.</li>
        <li><b>Spezifische Abwehr:</b> richtet sich gegen einen bestimmten Erreger. B-Zellen bilden Antikörper, T-Zellen helfen oder zerstören befallene Zellen, Gedächtniszellen merken sich den Erreger.</li></ul>
        ${merk('Ein <b>Antikörper</b> passt wie ein Schlüssel zu einem bestimmten <b>Antigen</b>: das <b>Schlüssel-Schloss-Prinzip</b>.')}` },
    { h: 'Spezifisch oder unspezifisch?',
      body: '<p>Ordne die Vorgänge einer Abwehrart zu.</p>', sim: 'immun' },
    { h: 'Blutgruppen im ABO-System',
      body: `<ul><li><b>A:</b> Antigen A, Antikörper gegen B.</li>
        <li><b>B:</b> Antigen B, Antikörper gegen A.</li>
        <li><b>AB:</b> Antigene A und B, keine Antikörper (Universalempfänger).</li>
        <li><b>0:</b> keine Antigene, Antikörper gegen A und B (Universalspender für rote Blutzellen).</li></ul>
        <p>In der Schule wird nur mit Kunstblut gearbeitet, nicht mit echtem Blut von Lernenden.</p>` },
    { h: 'Blutspende testen',
      body: '<p>Wähle Spender und Empfänger. Du siehst, ob die Blutgruppen zusammenpassen. Das ist ein Modell.</p>', sim: 'blut' },
    { h: 'Kurz testen',
      check: { q: 'Welche Blutgruppe kann als Spender für rote Blutzellen an alle Blutgruppen gegeben werden?',
        options: ['Blutgruppe 0.', 'Blutgruppe AB.', 'Blutgruppe A.', 'Blutgruppe B.'],
        explain: 'Blutgruppe 0 trägt weder Antigen A noch Antigen B. Die Antikörper der Empfänger finden also nichts, woran sie sich binden.' } }
  ],
  h6: [
    { h: 'Impfen',
      body: `<ul><li><b>Schutzimpfung (aktive Immunisierung):</b> Der Körper bildet selbst Antikörper und Gedächtniszellen. Der Schutz hält lange.</li>
        <li><b>Heilimpfung (passive Immunisierung):</b> Der Körper bekommt fertige Antikörper. Sie wirken sofort, aber nur kurz.</li></ul>
        <p>Die Grippeimpfung ist eine Schutzimpfung, die jährlich neu entwickelt wird, weil sich die Grippeviren verändern.</p>` },
    { h: 'Aktiv oder passiv?',
      body: '<p>Ordne die Beispiele einer Impfart zu.</p>', sim: 'impf' },
    { h: 'Krebs',
      body: `<p>Bei Krebs teilen sich veränderte Körperzellen unkontrolliert. <b>Gutartige</b> Tumoren wachsen langsam und bleiben begrenzt. <b>Bösartige</b> Tumoren dringen in umliegendes Gewebe ein und können sich im Körper ausbreiten.</p>
        <p>Das Risiko sinkt bei manchen Krebsarten, wenn du nicht rauchst, dich vor starker Sonne schützt und Vorsorgeuntersuchungen wahrnimmst. Krebs ist nicht einfach Schicksal, aber auch gesundheitsbewusste Menschen können erkranken.</p>` },
    { h: 'Medikamente',
      body: `${merk('Kein Medikament wirkt <b>ohne Nebenwirkung</b>. Lies den Beipackzettel und frage bei Unsicherheit in der Apotheke oder bei der Ärztin oder dem Arzt.')}
        <p>Besonders Beruhigungs- und Schlafmittel sowie manche Schmerzmittel können abhängig machen. Nimm Medikamente nicht ohne Grund regelmässig ein.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Wie wirkt eine Heilimpfung (passive Immunisierung)?',
        options: ['Sie gibt fertige Antikörper, die schnell wirken, aber nur kurz.', 'Sie bildet Gedächtniszellen für lebenslangen Schutz.', 'Sie tötet alle Bakterien im Körper.', 'Sie ersetzt eine Schutzimpfung vollständig.'],
        explain: 'Fertige Antikörper helfen sofort, werden aber abgebaut. Es entstehen keine eigenen Gedächtniszellen.' } }
  ]
};
const GOALS = {
  h1: ['Dimensionen der Gesundheit nennen', 'Hauptnährstoffe und Energieumsatz beschreiben'],
  h2: ['Nährstoffe mit Nachweisen untersuchen', 'einen Kontrollversuch begründen'],
  h3: ['den Weg der Nahrung beschreiben', 'die Verdauungsschritte den Stoffwechselvorgängen zuordnen'],
  h4: ['Viren, Bakterien und Pilze unterscheiden', 'Experimente mit Pilzen auswerten', 'sich vor sexuell übertragbaren Infektionen schützen und informieren'],
  h5: ['die Antigen-Antikörper-Reaktion erklären', 'Blutgruppen und Spenderregeln anwenden'],
  h6: ['Schutz- und Heilimpfung unterscheiden', 'Krebs und Medikamente verantwortungsvoll beurteilen']
};
const LEARN = {
  'h1-dim': 'Gesundheit hat drei Seiten', 'h1-schutz': 'Gesundheit hat drei Seiten', 'h1-nahr': 'Die Hauptnährstoffe', 'h1-energie': 'Energie und Umsatz', 'h1-umsatz': 'Vorgerechnet: Gesamtumsatz', 'h1-ausgew': 'Die Hauptnährstoffe',
  'h2-staerke': 'Nährstoffe nachweisen', 'h2-zucker': 'Nährstoffe nachweisen', 'h2-kontrolle': 'Nährstoffe nachweisen', 'h2-aceton': 'Fett extrahieren', 'h2-fett': 'Vorgerechnet: Fettanteil', 'h2-extraktion': 'Fett extrahieren',
  'h3-weg': 'Der Weg der Nahrung', 'h3-speichel': 'Enzyme, Säure und Galle', 'h3-galle': 'Enzyme, Säure und Galle', 'h3-oberfl': 'Oberfläche vergrössern', 'h3-stoffwechsel': 'Der Weg der Nahrung', 'h3-portion': 'Vorgerechnet: Energie einer Portion',
  'h4-arten': 'Viren, Bakterien und Pilze', 'h4-bakt': 'Viren, Bakterien und Pilze', 'h4-pilz': 'Pilze untersuchen', 'h4-hemm': 'Pilze untersuchen', 'h4-vergleich': 'Viren, Bakterien und Pilze', 'h4-teilung': 'Vorgerechnet: Teilung',
  'h4-sti': 'Sexuell übertragbare Infektionen (STI)', 'h4-risiko': 'Sexuell übertragbare Infektionen (STI)', 'h4-schutz': 'Sexuell übertragbare Infektionen (STI)', 'h4-pille': 'Stimmt das?', 'h4-oral': 'Stimmt das?', 'h4-hiv': 'Sexuell übertragbare Infektionen (STI)', 'h4-info': 'Information und Beratung',
  'h5-schluessel': 'Das Immunsystem', 'h5-abwehr': 'Das Immunsystem', 'h5-unspez': 'Spezifisch oder unspezifisch?', 'h5-gruppe': 'Blutgruppen im ABO-System', 'h5-spender': 'Blutspende testen', 'h5-allergie': 'Das Immunsystem',
  'h6-aktiv': 'Impfen', 'h6-passiv': 'Impfen', 'h6-grippe': 'Aktiv oder passiv?', 'h6-krebs': 'Krebs', 'h6-risiko': 'Krebs', 'h6-medi': 'Medikamente'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Zelle', pw: 'fängt an' },
  { xp: 80, name: 'Gewebe', pw: 'verbindet sich' },
  { xp: 200, name: 'Organ', pw: 'übernimmt Aufgaben' },
  { xp: 380, name: 'Organsystem', pw: 'arbeitet zusammen' },
  { xp: 620, name: 'Immunzelle', pw: 'wehrt ab' },
  { xp: 920, name: 'Körper-Profi', pw: 'kennt die Zusammenhänge' }
];

/* ---------- Thema: 8_3 Funktionen des Körpers analysieren ---------- */
const TOPIC = {
  id: 'nt8-3', storeKey: 'halingen-nt8-3-v1', other: { title: '7_3 Reize und Sinne untersuchen', href: '7_3_Reize_und_Sinne_untersuchen.html' },
  title: 'Funktionen des Körpers analysieren', lead: 'Ernährung, Verdauung und Abwehr', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Sage «benötigt» und «umgewandelt», nicht «verbraucht».', 'Sage «Abwehr» statt «Kampf».'],
  formulas: [
    ['Hauptnährstoffe', 'Kohlenhydrate, Fette', 'Proteine'],
    ['Nachweise', 'Stärke: Lugol (blauviolett)', 'Zucker: Teststreifen'],
    ['Stoffwechsel', 'Aufnahme, Transport', 'Umwandlung, Abgabe'],
    ['Erreger', 'Viren, Bakterien, Pilze', 'Hemmhof zeigt Wirkung'],
    ['Immunsystem', 'Antigen + Antikörper', 'Schlüssel-Schloss-Prinzip'],
    ['Impfung', 'aktiv: Schutz lange', 'passiv: Schutz kurz']
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
  nachweis(el) {
    sorter(el, [
      { t: 'Lugol-Lösung färbt sich blauviolett', ok: ['st'], why: 'Das ist der Nachweis für Stärke.' },
      { t: 'Der Teststreifen ändert seine Farbe', ok: ['zu'], why: 'Ein Traubenzucker-Teststreifen zeigt Zucker an.' },
      { t: 'Auf dem Papier bleibt ein Fleck, der durchscheint', ok: ['fe'], why: 'Das ist die Fettfleck-Probe.' },
      { t: 'Eiklar gerinnt mit Essig', ok: ['pr'], why: 'Eiweisse (Proteine) gerinnen und werden fest.' },
      { t: 'Beim Abdampfen des Lösungsmittels bleibt eine ölige Schicht zurück', ok: ['fe'], why: 'Das extrahierte Fett bleibt zurück.' },
      { t: 'Nach der Fehling-Probe entsteht ein roter Niederschlag', ok: ['zu'], why: 'Die Fehling-Probe weist Einfachzucker nach.' }
    ], { st: 'Stärke', zu: 'Traubenzucker', fe: 'Fett', pr: 'Protein' }, 'Welchen Nährstoff zeigt die Beobachtung?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  immun(el) {
    sorter(el, [
      { t: 'Eine Fresszelle nimmt einen Erreger auf', ok: ['un'], why: 'Fresszellen reagieren allgemein auf viele Erreger.' },
      { t: 'B-Zellen bilden passende Antikörper', ok: ['sp'], why: 'Die Antikörper passen nur zu einem bestimmten Antigen.' },
      { t: 'Gedächtniszellen merken sich einen Erreger', ok: ['sp'], why: 'Sie sorgen dafür, dass der Körper den Erreger später schneller erkennt.' },
      { t: 'Die Haut und Schleimhäute halten Erreger fern', ok: ['un'], why: 'Diese Barrieren wirken gegen alle Erreger.' },
      { t: 'T-Killerzellen zerstören befallene Körperzellen', ok: ['sp'], why: 'Sie erkennen bestimmte Antigene auf befallenen Zellen.' }
    ], { un: 'Unspezifisch', sp: 'Spezifisch' }, 'Richtet sich die Abwehr gegen alle Erreger oder gegen einen bestimmten?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  impf(el) {
    sorter(el, [
      { t: 'Impfung gegen Masern im Kindesalter', ok: ['ak'], why: 'Der Körper bildet selbst Antikörper und Gedächtniszellen.' },
      { t: 'Spritze mit fertigen Antikörpern nach einer Ansteckung', ok: ['pa'], why: 'Das sind fertige Antikörper: passive Immunisierung.' },
      { t: 'Grippeimpfung im Herbst', ok: ['ak'], why: 'Das ist eine Schutzimpfung. Sie muss jährlich wiederholt werden.' },
      { t: 'Heilimpfung (Heilserum)', ok: ['pa'], why: 'Sie wirkt schnell, schützt aber nur kurz.' },
      { t: 'Auffrischungsimpfung gegen Starrkrampf', ok: ['ak'], why: 'Sie erinnert das Immunsystem an den Erreger. Es ist eine aktive Immunisierung.' }
    ], { ak: 'Aktiv (Schutzimpfung)', pa: 'Passiv (Heilimpfung)' }, 'Bildet der Körper selbst Antikörper oder bekommt er fertige?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  sti(el) {
    sorter(el, [
      { t: 'Liam: «Ich dusche nach dem Geschlechtsverkehr immer sofort. So kann ich mich nicht mit einer STI anstecken.»', ok: ['fa'], why: 'Duschen schützt nicht vor einer Ansteckung.' },
      { t: 'Emma: «Ich bin beim Geschlechtsverkehr immer oben. So ist die Chance für eine Ansteckung geringer.»', ok: ['fa'], why: 'Die Position hat keinen Einfluss auf das Ansteckungsrisiko.' },
      { t: 'Leon: «Ich habe nur Sex mit Personen, die ich gut kenne. Da kann ich mich nicht anstecken.»', ok: ['fa'], why: 'Auch bei Menschen, die man gut kennt, ist eine Ansteckung möglich.' },
      { t: 'Sofia: «Beim Oralsex kann ich mich nicht mit einer STI anstecken.»', ok: ['fa'], why: 'Auch dabei ist eine Ansteckung möglich.' },
      { t: 'Mia: «Eine Scheidenpilz-Infektion kann ich auch bekommen, wenn ich keinen Geschlechtsverkehr habe.»', ok: ['ja'], why: 'Das stimmt. Pilzinfektionen können auch ohne Geschlechtsverkehr entstehen.' },
      { t: 'Noah: «Ich ziehe immer zwei Kondome an. Das ist sicherer.»', ok: ['fa'], why: 'Zwei Kondome sind nicht sicherer. Durch die Reibung können sie leichter reissen. Ein richtig angewendetes Kondom genügt.' }
    ], { ja: 'Stimmt', fa: 'Stimmt nicht' }, 'Ist die Aussage richtig?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  verdauung(el) {
    const S = [
      ['Mund', 'Zähne zerkleinern die Nahrung. Das Enzym im Speichel beginnt, Stärke zu zerlegen.'],
      ['Speiseröhre', 'Wellenförmige Muskelbewegungen (Peristaltik) schieben den Nahrungsbrei zum Magen, auch im Handstand.'],
      ['Magen', 'Salzsäure und das Enzym Pepsin greifen Proteine an.'],
      ['Zwölffingerdarm', 'Galle aus der Leber hilft bei den Fetten. Der Bauchspeichel enthält weitere Enzyme.'],
      ['Dünndarm', 'Die Nährstoffe werden in ihre Bausteine zerlegt und über die grosse Oberfläche ins Blut aufgenommen.'],
      ['Dickdarm', 'Dem unverdaulichen Rest wird Wasser entzogen.'],
      ['Mastdarm', 'Hier werden die unverdaulichen Reste gesammelt und abgegeben.']
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

  wachstum(el) {
    el.innerHTML = `<div class="sim">${sl('wt', 'Zeit', 0, 180, 30, 0, 'min')}
      <div class="trio"><div><span class="k">Teilungen</span><b class="mono" id="w1"></b></div><div><span class="k">Bakterien</span><b class="mono" id="w2"></b></div></div>
      <div class="cubes" id="wc" aria-hidden="true"></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const t = +$id('wt').value, n = Math.round(t / 30), b = Math.pow(2, n);
      $id('wtv').textContent = fmt(t); $id('w1').textContent = String(n); $id('w2').textContent = fmt(b);
      const c = $id('wc'); c.innerHTML = '';
      for (let i = 0; i < Math.min(b, 64); i++) { const d = document.createElement('i'); d.className = 'cube bew'; c.appendChild(d); }
      $id('ro').innerHTML = `Start: 1 Bakterium. Nach ${fmt(t)} min: ${n} Teilungen, also 2<sup>${n}</sup> = <b>${fmt(b)}</b> Bakterien. Die Zahl verdoppelt sich immer wieder (Beispielwerte, Modell).`;
    }
    $id('wt').addEventListener('input', upd); upd();
  },

  blut(el) {
    const G = { A: { ag: ['A'], ak: ['B'] }, B: { ag: ['B'], ak: ['A'] }, AB: { ag: ['A', 'B'], ak: [] }, '0': { ag: [], ak: ['A', 'B'] } };
    const keys = Object.keys(G);
    el.innerHTML = `<div class="sim"><p class="small">Spender</p><div class="seg3" role="group" aria-label="Spender">${keys.map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-s="${k}">${k}</button>`).join('')}</div>
      <p class="small">Empfänger</p><div class="seg3" role="group" aria-label="Empfänger">${keys.map((k, i) => `<button class="btn sm${i ? '' : ' on'}" data-e="${k}">${k}</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let s = 'A', e = 'A';
    function upd() {
      el.querySelectorAll('[data-s]').forEach(b => b.classList.toggle('on', b.dataset.s === s));
      el.querySelectorAll('[data-e]').forEach(b => b.classList.toggle('on', b.dataset.e === e));
      const bad = G[s].ag.filter(a => G[e].ak.includes(a));
      const names = x => x.length ? x.join(' und ') : 'keine';
      $id('ro').innerHTML = `Spender ${s}: Antigene ${names(G[s].ag)}.<br>Empfänger ${e}: Antikörper gegen ${names(G[e].ak)}.<br>` + (bad.length
        ? `<b>Nicht verträglich:</b> Die Antikörper des Empfängers passen zum Antigen ${bad.join(' und ')} des Spenders. Die roten Blutzellen verklumpen.`
        : '<b>Verträglich:</b> Die Antikörper des Empfängers finden kein passendes Antigen.');
    }
    el.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => { s = b.dataset.s; upd(); }));
    el.querySelectorAll('[data-e]').forEach(b => b.addEventListener('click', () => { e = b.dataset.e; upd(); }));
    upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt8-3","titel":"Funktionen des Körpers analysieren","kapitel":"NaTech 8, Kapitel 3","audio":"nt8-3"});
