// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_4_Energie_und_Leistung_erfassen.html
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

/* ---------- Inhalt: 9_4 Energie und Leistung erfassen, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_4 (ein Lehrerkommentar liegt nicht vor). Gerechnet wird mit g = 10 N/kg (genauer 9,81 N/kg). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'n1', nr: 1, title: 'Energie und Leistung', sub: 'Formen, Umwandlung und Leistung',
    items: [
      { id: 'n1-formen', topic: 'Energieformen', make() {
        return mc('Welche Energieform hat ein Dachziegel, der auf dem Dach liegt?', ['Lageenergie.', 'Bewegungsenergie.', 'Thermische Energie.', 'Strahlungsenergie.'],
          'Die Lageenergie hängt von der Höhe und der Masse ab. Weitere Energieformen sind Bewegungs-, thermische, chemische, elektrische und Strahlungsenergie.');
      } },
      { id: 'n1-wandel', topic: 'Energieumwandlung', make() {
        return mc('Du fährst mit dem Fahrrad. Welche Energieumwandlung findet statt?', ['Chemische Energie der Nahrung wird in Bewegungsenergie und thermische Energie umgewandelt.', 'Elektrische Energie wird zu chemischer Energie.', 'Strahlungsenergie wird zu Lageenergie.', 'Es wird Energie erzeugt.'],
          'Energie geht nicht verloren und wird nicht aus dem Nichts erzeugt. Sie wird von einer Form in andere Formen umgewandelt.');
      } },
      { id: 'n1-leistung', topic: 'Leistung', make() {
        return mc('Was gibt die Leistung P an?', ['Wie viel Energie in einer bestimmten Zeit umgewandelt oder genutzt wird: P = E : t. Die Einheit ist Watt (1 W = 1 J/s).', 'Wie gross die Kraft ist.', 'Wie lange ein Gerät läuft.', 'Wie schwer ein Gerät ist.'],
          'Ein Lautsprecher mit 24 W nutzt pro Sekunde 24 Joule elektrische Energie.');
      } },
      { id: 'n1-nutzen', topic: 'Energie nutzen statt verbrauchen', make() {
        return mc('Welche Aussage ist fachlich richtig?', ['Wir nutzen Energie und wandeln sie um. Wir verbrauchen sie nicht.', 'Wir verbrauchen Energie, sie ist danach weg.', 'Strom wird im Haushalt verbraucht.', 'Energie lässt sich beliebig erzeugen.'],
          'Auch die Rechnung der Energieversorger bezieht sich auf genutzte elektrische Energie, nicht auf «verbrauchten Strom».');
      } },
      { id: 'n1-koerper', topic: 'Leistung des Körpers', make() {
        return mc('Bei welcher Tätigkeit zeigt dein Körper die grössere Leistung?', ['Beim Sprinten, denn es wird in kurzer Zeit viel Energie umgewandelt.', 'Beim langsamen Gehen.', 'Beim ruhigen Sitzen.', 'Beim Schlafen.'],
          'Bei gleicher Energie ist die Leistung umso grösser, je kürzer die Zeit ist.');
      } },
      { id: 'n1-hub', topic: 'Hubarbeit und Lageenergie', make() {
        return mc('Du hebst einen Gegenstand vom Boden auf den Tisch. Was geschieht mit der Hubarbeit?', ['Sie wird als Lageenergie im Gegenstand gespeichert.', 'Sie verschwindet.', 'Sie wird sofort zu Wärme.', 'Sie wird zu Kraft.'],
          'Lässt du den Gegenstand los, wird die Lageenergie beim Fallen in Bewegungsenergie umgewandelt.');
      } }
    ]
  },
  {
    id: 'n2', nr: 2, title: 'Lage- und Bewegungsenergie', sub: 'E = m · g · h und E = ½ · m · v²',
    items: [
      { id: 'n2-lage-form', topic: 'Von was hängt die Lageenergie ab?', make() {
        return mc('Von welchen beiden Grössen hängt die Lageenergie ab?', ['Von der Masse und der Höhe.', 'Von der Geschwindigkeit und der Zeit.', 'Von der Farbe und der Form.', 'Nur von der Zeit.'],
          'Die Formel lautet E_Lage = m · g · h. Je höher und je schwerer ein Gegenstand ist, desto grösser ist seine Lageenergie.');
      } },
      { id: 'n2-bew-form', topic: 'Von was hängt die Bewegungsenergie ab?', make() {
        return mc('Von welchen beiden Grössen hängt die Bewegungsenergie ab?', ['Von der Masse und der Geschwindigkeit.', 'Von der Höhe und der Masse.', 'Von der Temperatur und der Farbe.', 'Nur von der Höhe.'],
          'Die Formel lautet E_Bew = ½ · m · v². Ein Lastwagen hat bei gleicher Geschwindigkeit eine viel grössere Bewegungsenergie als ein Personenwagen.');
      } },
      { id: 'n2-lage', topic: 'Lageenergie berechnen', make() {
        const s = rnd([[1, 20], [2, 10], [5, 4], [10, 3], [50, 2], [300, 20]]), e = s[0] * 10 * s[1];
        return num(`Ein Gegenstand mit der Masse ${fmt(s[0])} kg befindet sich ${fmt(s[1])} m über dem Boden. Wie gross ist seine Lageenergie? Rechne mit g = 10 N/kg.`, 'J', e, 'E_Lage = m · g · h', `E = ${fmt(s[0])} kg · 10 N/kg · ${fmt(s[1])} m = ${fmt(e)} J`);
      } },
      { id: 'n2-bew', topic: 'Bewegungsenergie berechnen', make() {
        const s = rnd([[2, 3], [4, 5], [10, 2], [1000, 10], [50, 4], [60, 5]]), e = 0.5 * s[0] * s[1] * s[1];
        return num(`Ein Körper mit der Masse ${fmt(s[0])} kg bewegt sich mit der Geschwindigkeit ${fmt(s[1])} m/s. Wie gross ist seine Bewegungsenergie?`, 'J', e, 'E_Bew = ½ · m · v². Quadriere zuerst die Geschwindigkeit.', `E = ½ · ${fmt(s[0])} kg · (${fmt(s[1])} m/s)² = ½ · ${fmt(s[0])} · ${fmt(s[1] * s[1])} = ${fmt(e)} J`);
      } },
      { id: 'n2-v', topic: 'Geschwindigkeit beim Fall', ext: true, make() {
        const s = rnd([[5, 10], [20, 20], [1.25, 5], [45, 30], [80, 40]]), v = s[1];
        return num(`Ein Stein fällt aus ${fmt(s[0])} m Höhe. Wenn keine andere Energieform vorkommt, wird die ganze Lageenergie zu Bewegungsenergie: g · h = ½ · v². Wie schnell ist er unten? Rechne mit g = 10 N/kg.`, 'm/s', v, 'Aus m·g·h = ½·m·v² folgt v² = 2 · g · h. Ziehe dann die Wurzel.', `v² = 2 · 10 · ${fmt(s[0])} = ${fmt(2 * 10 * s[0])}<br>v = ${fmt(v)} m/s`);
      } },
      { id: 'n2-umw', topic: 'Fallende Kugel', make() {
        return mc('Eine Eisenkugel fällt in Knete. Welche Energieumwandlungen laufen ab?', ['Lageenergie wird zu Bewegungsenergie, beim Aufprall zu Verformungsenergie der Knete.', 'Bewegungsenergie wird zu Lageenergie.', 'Es wird nur Strahlungsenergie frei.', 'Es findet keine Umwandlung statt.'],
          'Je grösser die Lageenergie am Anfang, desto tiefer der Abdruck. Eine höhere Kugel oder eine Kugel mit mehr Masse hinterlässt einen tieferen Abdruck.');
      } }
    ]
  },
  {
    id: 'n3', nr: 3, title: 'Wirkungsgrad', sub: 'Wie viel Energie wird nutzbar?',
    items: [
      { id: 'n3-eta', topic: 'Was ist der Wirkungsgrad?', make() {
        return mc('Was sagt der Wirkungsgrad eines Energiewandlers aus?', ['Welcher Anteil der zugeführten Energie in die gewünschte Energieform umgewandelt wird.', 'Wie schwer der Energiewandler ist.', 'Wie lange er läuft.', 'Wie viel er kostet.'],
          'Ein Wirkungsgrad von 0,9 bedeutet: 90 % der zugeführten Energie werden genutzt, 10 % sind unerwünscht (zum Beispiel thermische Energie).');
      } },
      { id: 'n3-nutz', topic: 'Nutzbare Energie', make() {
        const s = rnd([[500, 90], [1000, 45], [200, 25], [800, 50], [600, 85]]), n = r2(s[0] * s[1] / 100);
        return num(`Einem Energiewandler werden ${fmt(s[0])} J zugeführt. Sein Wirkungsgrad beträgt ${fmt(s[1])} %. Wie viel Energie wird in die gewünschte Form umgewandelt?`, 'J', n, 'Nutzenergie = Wirkungsgrad · zugeführte Energie', `${fmt(s[0])} J · ${fmt(s[1])} % = ${fmt(n)} J`);
      } },
      { id: 'n3-eta-num', topic: 'Wirkungsgrad berechnen', make() {
        const s = rnd([[90, 100], [45, 100], [30, 200], [150, 600], [480, 600]]), p = r2(s[0] / s[1] * 100);
        return num(`Einem Gerät werden ${fmt(s[1])} J zugeführt. Davon werden ${fmt(s[0])} J in die gewünschte Energieform umgewandelt. Wie gross ist der Wirkungsgrad in Prozent?`, '%', p, 'Wirkungsgrad = Nutzenergie : zugeführte Energie', `${fmt(s[0])} J : ${fmt(s[1])} J = ${fmt(p / 100)} = ${fmt(p)} %`);
      } },
      { id: 'n3-wind', topic: 'Windenergieanlage', make() {
        return mc('Eine Windenergieanlage hat einen Wirkungsgrad von etwa 45 bis 50 Prozent. Was geschieht mit dem Rest?', ['Er wird durch Reibung in thermische Energie umgewandelt und kann nicht mehr genutzt werden.', 'Er geht aus der Welt verloren.', 'Er wird in Lageenergie des Windes umgewandelt.', 'Er wird zusätzlicher Wind.'],
          'Die Energie bleibt erhalten, ist aber als thermische Energie weniger wertvoll: Energieentwertung.');
      } },
      { id: 'n3-entw', topic: 'Energieentwertung', make() {
        return mc('Wie hängen Wirkungsgrad und Energieentwertung zusammen?', ['Je grösser der Wirkungsgrad, desto kleiner ist die Energieentwertung.', 'Je grösser der Wirkungsgrad, desto grösser ist die Energieentwertung.', 'Es gibt keinen Zusammenhang.', 'Der Wirkungsgrad ist immer 100 %.'],
          'Ein Teil der Energie wird immer in eine unerwünschte Form umgewandelt. Der Wirkungsgrad ist darum immer kleiner als 100 %.');
      } },
      { id: 'n3-perpetuum', topic: 'Perpetuum mobile', make() {
        return mc('Warum kann es kein Perpetuum mobile geben?', ['Bei jeder Umwandlung wird ein Teil der Energie in unerwünschte Formen wie thermische Energie umgewandelt. Die Maschine käme zum Stillstand.', 'Weil niemand eines gebaut hat.', 'Weil Energie sich vermehrt.', 'Weil es zu teuer ist.'],
          'Ein Perpetuum mobile müsste unendlich Energie bereitstellen. Wegen der Energieentwertung ist das unmöglich.');
      } }
    ]
  },
  {
    id: 'n4', nr: 4, title: 'Leistung im Alltag', sub: 'Watt, Kilowattstunde und 2000 Watt',
    items: [
      { id: 'n4-leistung', topic: 'Leistung und Zeit', make() {
        return mc('Ein Wasserkocher hat 2000 W, ein anderer 1000 W. Was gilt für das Aufheizen derselben Wassermenge?', ['Der Kocher mit 2000 W braucht nur halb so lang.', 'Beide brauchen gleich lang.', 'Der Kocher mit 1000 W ist schneller.', 'Die Leistung spielt keine Rolle.'],
          'Eine höhere Leistung bedeutet eine kürzere Zeit, bis das Wasser siedet.');
      } },
      { id: 'n4-zeit', topic: 'Dauer berechnen', make() {
        const p = rnd([500, 1000, 1500, 2000, 3000]), t = r2(336000 / p);
        return num(`Um 1 Liter Wasser von 20 °C auf 100 °C zu erhitzen, sind etwa 336 kJ thermische Energie nötig. Wie lange dauert das mit einem Wasserkocher der Leistung ${fmt(p)} W? Nimm an, die gesamte elektrische Energie wird in thermische Energie umgewandelt.`, 's', t, 'Rechne 336 kJ in Joule um und teile durch die Leistung: t = E : P.', `336 kJ = 336 000 J<br>t = 336 000 J : ${fmt(p)} W = ${fmt(t)} s`);
      } },
      { id: 'n4-kwh', topic: 'Kilowattstunden', make() {
        const s = rnd([[2, 3], [1.5, 2], [0.5, 4], [3, 0.5], [2, 1]]), e = r2(s[0] * s[1]);
        return num(`Ein Gerät mit ${fmt(s[0])} kW Leistung läuft ${fmt(s[1])} Stunden. Wie viel Energie nutzt es in Kilowattstunden?`, 'kWh', e, 'Energie = Leistung · Zeit', `${fmt(s[0])} kW · ${fmt(s[1])} h = ${fmt(e)} kWh`);
      } },
      { id: 'n4-kj', topic: 'kWh in kJ umrechnen', ext: true, make() {
        const n = rnd([1, 2, 3, 5, 10]), k = 3600 * n;
        return num(`Wie viele Kilojoule sind ${fmt(n)} Kilowattstunden? Es gilt 1 kWh = 3600 kJ.`, 'kJ', k, 'Multipliziere mit 3600.', `${fmt(n)} · 3600 kJ = ${fmt(k)} kJ`);
      } },
      { id: 'n4-lampe', topic: 'Energie einer Lampe', make() {
        const s = rnd([[10, 60], [10, 3600], [10, 1], [5, 60], [8, 3600]]), e = s[0] * s[1];
        return num(`Eine LED-Lampe hat die Leistung ${fmt(s[0])} W. Wie viel Energie nutzt sie in ${fmt(s[1])} s?`, 'J', e, 'E = P · t', `${fmt(s[0])} W · ${fmt(s[1])} s = ${fmt(e)} J`);
      } },
      { id: 'n4-2000', topic: '2000-Watt-Gesellschaft', make() {
        const p = rnd([5000, 4000, 6000, 3000]), f = r2(p / 2000);
        return num(`In der 2000-Watt-Gesellschaft nutzt jede Person im Mittel höchstens 2000 W. Eine Person nutzt ${fmt(p)} W. Wie viele Mal so viel ist das?`, '-mal', f, 'Teile durch 2000.', `${fmt(p)} W : 2000 W = ${fmt(f)}`);
      } }
    ]
  },
  {
    id: 'n5', nr: 5, title: 'Energieversorgung', sub: 'Anlagen, Energieträger und Kosten',
    items: [
      { id: 'n5-wasser', topic: 'Wasserenergieanlage', make() {
        return mc('Wie wird in einer Wasserenergieanlage elektrische Energie bereitgestellt?', ['Die Bewegungsenergie des Wassers treibt eine Turbine an, ein Generator wandelt sie in elektrische Energie um.', 'Wasser wird verbrannt.', 'Wasser wird in Wasserstoff zerlegt.', 'Wasser wird erwärmt und verdampft nie.'],
          'Der Energieträger ist das gestaute und fliessende Wasser. Windenergieanlagen funktionieren ähnlich mit bewegter Luft.');
      } },
      { id: 'n5-pv', topic: 'Fotovoltaik und Solarthermie', make() {
        return mc('Was ist der Unterschied zwischen einer Fotovoltaikanlage und einer thermischen Solaranlage?', ['Die Fotovoltaikanlage wandelt Sonnenstrahlung in elektrische Energie um, die thermische Solaranlage in thermische Energie.', 'Beide erzeugen elektrische Energie.', 'Beide erzeugen nur Licht.', 'Es gibt keinen Unterschied.'],
          'Fotovoltaik arbeitet mit Solarzellen, die thermische Solaranlage mit Solarkollektoren.');
      } },
      { id: 'n5-kern', topic: 'Kern- und Kohleenergieanlagen', make() {
        return mc('Wie läuft die Umwandlung in einer Kernenergie- oder Kohleenergieanlage ab?', ['Kernenergie oder chemische Energie wird zuerst in thermische Energie und am Ende in elektrische Energie umgewandelt.', 'Direkt in elektrische Energie.', 'In Bewegungsenergie des Windes.', 'Nur in Lageenergie.'],
          'Energieträger sind Atomkerne (Uran) beziehungsweise fossile Brennstoffe wie Kohle und Erdöl.');
      } },
      { id: 'n5-strom', topic: 'Strom verbrauchen?', make() {
        return mc('Eine Rechnung heisst oft «Rechnung für den verbrauchten Strom». Was ist fachlich richtig?', ['Wir verbrauchen keinen Strom, wir nutzen elektrische Energie.', 'Strom wird wirklich verbraucht.', 'Es wird Strom gekauft und gelagert.', 'Man bezahlt nur den Strom, nicht die Energie.'],
          'Die Energieversorger rechnen die genutzte elektrische Energie in Kilowattstunden ab.');
      } },
      { id: 'n5-rechnung', topic: 'Wofür bezahlt man?', make() {
        return mc('Wofür bezahlst du mit der Energierechnung?', ['Für Rohstoffe und Umwandlung, Wartung der Anlagen und den Transport über Leitungen.', 'Nur für das Papier der Rechnung.', 'Nur für die Sonne.', 'Für nichts.'],
          'Anlagen bauen, Rohstoffe beschaffen, Anlagen unterhalten und Kabel quer durch die Schweiz zu unterhalten kostet Geld.');
      } },
      { id: 'n5-kosten', topic: 'Kosten berechnen', make() {
        const s = rnd([[4, 0.25], [10, 0.2], [8, 0.3], [12, 0.25], [20, 0.25]]), k = r2(s[0] * s[1]);
        return num(`Ein Haushalt nutzt ${fmt(s[0])} kWh elektrische Energie. In diesem Beispiel kostet 1 kWh ${fmt(s[1])} Franken. Wie viel kostet die Energie?`, 'Fr.', k, 'Kosten = Energie in kWh · Preis pro kWh', `${fmt(s[0])} kWh · ${fmt(s[1])} Fr./kWh = ${fmt(k)} Fr.`);
      } }
    ]
  },
  {
    id: 'n6', nr: 6, title: 'Energie bewusst nutzen', sub: 'Verhalten, Stand-by und Bauen',
    items: [
      { id: 'n6-warm', topic: 'Warmwasser sparen', make() {
        return mc('Wie sparst du Energie beim Warmwasser?', ['Duschen statt Vollbad nehmen und Wasserhähne richtig zudrehen.', 'Täglich lange baden.', 'Den Wasserhahn tropfen lassen.', 'Halbvolle Waschmaschinen laufen lassen.'],
          'Zum Erwärmen von kaltem Leitungswasser wird Energie benötigt. Je weniger Warmwasser, desto weniger Energie.');
      } },
      { id: 'n6-standby', topic: 'Stand-by', make() {
        return mc('Leander glaubt, ungenutzte Geräte sollten im Stand-by-Modus bleiben. Hat er recht?', ['Nein. Auch im Stand-by nutzen Geräte Energie. Besser ganz ausschalten oder vom Netz trennen.', 'Ja, im Stand-by wird keine Energie genutzt.', 'Ja, sonst gehen sie kaputt.', 'Es spielt keine Rolle.'],
          'Stand-by-Verluste summieren sich, weil Geräte rund um die Uhr Energie nutzen.');
      } },
      { id: 'n6-fohn', topic: 'Kühlschrank und Föhn', make() {
        return mc('Ein Föhn hat 1500 W, ein Kühlschrank nur 80 bis 180 W. Warum zählt der Kühlschrank trotzdem zu den starken Energienutzern?', ['Weil er Tag und Nacht läuft. Die Energie ergibt sich aus Leistung mal Zeit.', 'Weil er eine höhere Leistung als der Föhn hat.', 'Weil er heiss wird.', 'Weil er nie ausgeschaltet werden darf.'],
          'Der Föhn läuft nur wenige Minuten pro Tag. Der Kühlschrank läuft ständig, deshalb ist die genutzte Energie über den Tag grösser.');
      } },
      { id: 'n6-tag', topic: 'Tagesenergie berechnen', make() {
        const s = rnd([[100, 24], [2000, 0.5], [60, 5], [10, 10], [1500, 1]]), e = r2(s[0] * s[1] / 1000);
        return num(`Ein Gerät mit ${fmt(s[0])} W Leistung läuft ${fmt(s[1])} Stunden. Wie viel Energie nutzt es in kWh?`, 'kWh', e, 'Rechne die Leistung in kW um und multipliziere mit der Zeit.', `${fmt(s[0])} W = ${fmt(s[0] / 1000)} kW<br>${fmt(s[0] / 1000)} kW · ${fmt(s[1])} h = ${fmt(e)} kWh`);
      } },
      { id: 'n6-haus', topic: 'Energiesparhaus', make() {
        return mc('Welche Massnahmen senken die Energienutzung eines Hauses?', ['Bessere Wärmedämmung, effiziente Heizung, gute Lüftung, Sonnenkollektoren und sparsame Beleuchtung.', 'Dünnere Wände.', 'Alle Fenster dauernd offen lassen.', 'Mehr Glühlampen.'],
          'Der Begriff Energiesparhaus ist nicht klar definiert. Bund und Kantone fördern effiziente Technologien und Sanierungen finanziell.');
      } },
      { id: 'n6-umwelt', topic: 'Folgen der Energienutzung', make() {
        return mc('Warum schützt weniger Energienutzung Natur und Klima?', ['Die Bereitstellung hat Folgen: CO₂ beim Verbrennen von Erdöl, radioaktive Abfälle bei Kernenergie, überflutete Berglandschaften bei Stauseen.', 'Sie hat gar keine Folgen.', 'Energie kommt immer aus Wolken.', 'Nur Gasheizungen sind schädlich.'],
          'Jede Form der Energiebereitstellung hat Vor- und Nachteile. Wer weniger Energie nutzt, belastet die Umwelt weniger.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  n1: [
    { h: 'Energie überall',
      body: `<p>Wo etwas bewegt, verbrannt, chemisch umgesetzt, erwärmt oder gekühlt wird, ist <b>Energie</b> nötig. Energie tritt in verschiedenen Formen auf: Lage-, Bewegungs-, thermische, chemische, elektrische, Strahlungs- und Verformungsenergie.</p>
        ${merk('Wir <b>nutzen</b> und <b>wandeln um</b> Energie. Wir <b>verbrauchen</b> sie nicht.')}
        <p>Hebst du einen Gegenstand hoch, leistest du <b>Hubarbeit</b>. Sie wird als Lageenergie im Gegenstand gespeichert.</p>` },
    { h: 'Welche Energieform?',
      body: '<p>Ordne die Beispiele einer Energieform zu.</p>', sim: 'umwandlung' },
    { h: 'Leistung',
      body: `${merk('<b>P = E : t</b><br>Leistung = umgewandelte Energie durch Zeit. Einheit: Watt, <b>1 W = 1 J/s</b>.')}
        <p>Eine hohe Leistung heisst: viel Energie in kurzer Zeit.</p>` },
    { h: 'Vorgerechnet: Leistung und Energie', worked: {
      given: 'Eine LED-Lampe hat 10 W. Wie viel Energie nutzt sie in einer Minute?',
      steps: [['Zeit in Sekunden', '1 min = 60 s'], ['Rechnung', 'E = P · t = 10 W · 60 s = 600 J'], ['Antwort', '600 Joule.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was bedeutet 1 Watt?',
        options: ['1 Joule Energie pro Sekunde.', '1 Joule pro Stunde.', '1 Newton pro Meter.', '1 Kilogramm pro Sekunde.'],
        explain: 'Ein Watt ist die Leistung, wenn in einer Sekunde ein Joule Energie umgewandelt wird.' } }
  ],
  n2: [
    { h: 'Lageenergie',
      body: `<p>Wenn du einen Gegenstand hochhebst, leistest du <b>Hubarbeit</b>. Sie wird als <b>Lageenergie</b> gespeichert. Sie hängt von der Masse und der Höhe ab.</p>
        ${merk('<b>E<sub>Lage</sub> = m · g · h</b><br>Mit g = 10 N/kg (genauer 9,81 N/kg).')}` },
    { h: 'Bewegungsenergie',
      body: `<p>Ein bewegter Gegenstand hat <b>Bewegungsenergie</b>. Sie hängt von der Masse und der Geschwindigkeit ab. Weil die Geschwindigkeit <b>quadriert</b> wird, wächst die Energie schnell: doppelte Geschwindigkeit, vierfache Energie.</p>
        ${merk('<b>E<sub>Bew</sub> = ½ · m · v²</b>')}` },
    { h: 'Lass den Ball fallen',
      body: '<p>Verändere die Höhe. Die Lageenergie wird in Bewegungsenergie umgewandelt. Das Modell vernachlässigt Reibung.</p>', sim: 'fall' },
    { h: 'Vorgerechnet: Lageenergie', worked: {
      given: 'Ein Stein mit 2 kg liegt 10 m über dem Boden. Wie gross ist seine Lageenergie? (g = 10 N/kg)',
      steps: [['Formel', 'E = m · g · h'], ['Rechnung', 'E = 2 kg · 10 N/kg · 10 m = 200 J'], ['Antwort', '200 Joule.']] } },
    { h: 'Vorgerechnet: Bewegungsenergie', worked: {
      given: 'Ein Körper mit 4 kg bewegt sich mit 5 m/s. Wie gross ist seine Bewegungsenergie?',
      steps: [['Geschwindigkeit quadrieren', '5² = 25'], ['Rechnung', 'E = ½ · 4 · 25 = 50 J'], ['Antwort', '50 Joule.']] } },
    { h: 'Kurz testen',
      check: { q: 'Die Geschwindigkeit eines Autos verdoppelt sich. Was geschieht mit seiner Bewegungsenergie?',
        options: ['Sie wird viermal so gross.', 'Sie verdoppelt sich.', 'Sie bleibt gleich.', 'Sie halbiert sich.'],
        explain: 'Die Geschwindigkeit steht im Quadrat in der Formel. 2² = 4.' } }
  ],
  n3: [
    { h: 'Der Wirkungsgrad',
      body: `<p>Eine Energieform lässt sich nie vollständig in die gewünschte Form umwandeln. Ein Teil geht in eine <b>unerwünschte</b> Form, meist thermische Energie.</p>
        ${merk('<b>Wirkungsgrad = Nutzenergie : zugeführte Energie</b><br>Ein Wirkungsgrad von 0,9 (90 %) heisst: 90 % werden genutzt, 10 % sind unerwünscht.')}
        <p>Je grösser der Wirkungsgrad, desto kleiner ist die <b>Energieentwertung</b>.</p>` },
    { h: 'Wie viel bleibt übrig?',
      body: '<p>Verändere den Wirkungsgrad. Von 100 J Zufuhr wird ein Teil genutzt, der Rest wird entwertet. Das ist ein Modell.</p>', sim: 'wirkung' },
    { h: 'Beispiele und Perpetuum mobile',
      body: `<p>Eine <b>Windenergieanlage</b> wandelt etwa 45 bis 50 % der Bewegungsenergie des Winds in elektrische Energie um. Der Rest wird durch Reibung zu thermischer Energie.</p>
        <p>Ein <b>Perpetuum mobile</b> ist eine Maschine, die ewig läuft. Es kann nicht funktionieren, weil bei jeder Umwandlung Energie entwertet wird.</p>` },
    { h: 'Vorgerechnet: Wirkungsgrad', worked: {
      given: 'Einem Gerät werden 600 J zugeführt. Davon werden 150 J genutzt. Wie gross ist der Wirkungsgrad?',
      steps: [['Rechnung', '150 J : 600 J = 0,25'], ['In Prozent', '0,25 = 25 %'], ['Antwort', 'Der Wirkungsgrad beträgt 25 %. 75 % sind unerwünschte Energie.']] } },
    { h: 'Kurz testen',
      check: { q: 'Ein Gerät hat den Wirkungsgrad 0,8. Was bedeutet das?',
        options: ['80 % der zugeführten Energie werden genutzt.', '80 % gehen verloren.', 'Das Gerät läuft 80 s.', 'Es gibt 80 J mehr, als zugeführt wird.'],
        explain: 'Der Wirkungsgrad gibt den genutzten Anteil an. Der Rest wird in unerwünschte Energie umgewandelt.' } }
  ],
  n4: [
    { h: 'Leistung von Geräten',
      body: `<p>Die Leistung steht auf dem Gerät oder in der Anleitung. Ein Lautsprecher mit 24 W nutzt jede Sekunde 24 J. Wasserkocher haben 500 bis 3000 W: Je grösser die Leistung, desto kürzer dauert das Aufheizen.</p>
        ${merk('<b>E = P · t</b> und <b>t = E : P</b>')}` },
    { h: 'Die Kilowattstunde',
      body: `<p>Elektrische Energie wird oft in <b>Kilowattstunden (kWh)</b> angegeben.</p>
        ${merk('<b>1 kWh = 1000 W · 3600 s = 3 600 000 J = 3600 kJ</b><br>Ein Backofen mit 2 kW, der eine Stunde läuft, nutzt 2 kWh = 7200 kJ.')}` },
    { h: 'Rechne mit Leistung und Zeit',
      body: '<p>Stelle Leistung und Dauer eines Geräts ein. Das Modell zeigt Energie in kWh und kJ sowie die Kosten für einen Beispielpreis von 0,25 Fr. pro kWh.</p>', sim: 'leistung' },
    { h: 'Die 2000-Watt-Gesellschaft',
      body: `<p>Im Modell der <b>2000-Watt-Gesellschaft</b> nutzt jede Person im Mittel höchstens 2000 W (2000 J pro Sekunde). In der Schweiz sind es heute etwa 5000 W, also etwa 2,5-mal so viel. Darin steckt alle Energie: Heizen, Licht, Verkehr, Herstellung von Produkten und vieles mehr.</p>` },
    { h: 'Vorgerechnet: Wasserkocher', worked: {
      given: 'Für 1 Liter Wasser von 20 °C auf 100 °C braucht es etwa 336 kJ. Wie lange dauert das mit einem 2000-W-Kocher?',
      steps: [['In Joule umrechnen', '336 kJ = 336 000 J'], ['Rechnung', 't = E : P = 336 000 J : 2000 W = 168 s'], ['Antwort', 'Etwa 168 s, also knapp 3 Minuten.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie viele Kilojoule sind 2 kWh?',
        options: ['7200 kJ', '3600 kJ', '720 kJ', '2000 kJ'],
        explain: '1 kWh = 3600 kJ. Also sind 2 kWh gleich 2 · 3600 kJ = 7200 kJ.' } }
  ],
  n5: [
    { h: 'Energieanlagen',
      body: `<ul><li><b>Wasserenergieanlage:</b> Bewegungsenergie des Wassers → Turbine, Generator → elektrische Energie.</li>
        <li><b>Windenergieanlage:</b> Bewegungsenergie der Luft → elektrische Energie.</li>
        <li><b>Fotovoltaikanlage:</b> Strahlungsenergie → elektrische Energie. Die <b>thermische Solaranlage</b> erzeugt thermische Energie.</li>
        <li><b>Kernenergieanlage:</b> Kernenergie → thermische → elektrische Energie.</li>
        <li><b>Kohle- und Erdölanlage:</b> chemische → thermische → elektrische Energie.</li>
        <li><b>Biomasseanlage:</b> Verbrennung oder Biogas aus Gartenabfall, Mist und Holz.</li></ul>` },
    { h: 'Erneuerbar oder nicht erneuerbar?',
      body: '<p>Ordne die Energieträger zu.</p>', sim: 'anlage' },
    { h: 'Wofür bezahlst du?',
      body: `<p>Die Rechnung des Energieversorgers deckt Beschaffung von Rohstoffen (zum Beispiel Gallium und Indium für Solarzellen), Umwandlung, <b>Wartung</b> der Anlagen und den <b>Transport</b> durch Leitungen ab. Der Preis hängt zum Beispiel vom Ort und von der Zeit ab.</p>
        ${merk('Wir <b>nutzen</b> elektrische Energie. Wir <b>verbrauchen</b> keinen Strom.')}` },
    { h: 'Vorgerechnet: Kosten', worked: {
      given: 'Ein Haushalt nutzt 10 kWh. In diesem Beispiel kostet 1 kWh 0,20 Franken. Wie viel kostet das?',
      steps: [['Formel', 'Kosten = Energie · Preis'], ['Rechnung', '10 kWh · 0,20 Fr./kWh = 2,00 Fr.'], ['Antwort', 'Es kostet 2 Franken. (Beispielpreis; der wirkliche Preis hängt vom Versorger ab.)']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über den Energieträger Wind stimmt?',
        options: ['Er ist erneuerbar und wird in der Windenergieanlage in elektrische Energie umgewandelt.', 'Er ist ein fossiler Brennstoff.', 'Er enthält Atomkerne.', 'Er wird verbrannt.'],
        explain: 'Wind ist bewegte Luft und steht immer wieder zur Verfügung.' } }
  ],
  n6: [
    { h: 'Bewusstes Verhalten',
      body: `<p>Je weniger Energie wir nutzen, desto weniger belasten wir die Umwelt: Verbrennen von Erdöl erzeugt Kohlenstoffdioxid, Kernenergieanlagen erzeugen radioaktive Abfälle, Stauseen überfluten Berglandschaften.</p>
        <ul><li>Wasserhähne richtig zudrehen, Wasserkocher statt Pfanne nutzen, nur die benötigte Menge erwärmen.</li><li>Duschen statt Vollbad. Waschmaschine und Geschirrspüler nicht halbvoll laufen lassen.</li></ul>` },
    { h: 'Spare oder verschwende?',
      body: '<p>Beurteile das Verhalten.</p>', sim: 'sparen' },
    { h: 'Stand-by und Dauerläufer',
      body: `<p>Geräte im <b>Stand-by-Betrieb</b> nutzen weiter Energie. Besser ganz ausschalten. Auch ein Kühlschrank mit nur 100 W nutzt viel Energie, weil er <b>dauernd</b> läuft: Energie = Leistung · Zeit.</p>` },
    { h: 'Energie beim Bauen sparen',
      body: `<p>Gebäude lassen sich energieeffizient bauen und sanieren: gute <b>Wärmedämmung</b>, effiziente <b>Heizung</b>, kluge <b>Lüftung</b>, sparsame <b>Beleuchtung</b>, <b>Sonnenkollektoren</b>. Der Bund und die Kantone unterstützen das mit Fördergeldern.</p>` },
    { h: 'Vorgerechnet: Kühlschrank', worked: {
      given: 'Ein Kühlschrank mit 100 W läuft 24 Stunden. Wie viel Energie nutzt er?',
      steps: [['In kW umrechnen', '100 W = 0,1 kW'], ['Rechnung', '0,1 kW · 24 h = 2,4 kWh'], ['Antwort', '2,4 kWh pro Tag. Ein Föhn mit 1500 W, der 10 Minuten läuft, braucht nur 0,25 kWh.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum ist der Kühlschrank trotz kleiner Leistung ein starker Energienutzer?',
        options: ['Er läuft den ganzen Tag, also ist Leistung mal Zeit gross.', 'Er hat die grösste Leistung im Haushalt.', 'Er wird nie kalt.', 'Er hat keinen Wirkungsgrad.'],
        explain: 'Die genutzte Energie ergibt sich aus Leistung und Zeit. Dauerbetrieb summiert sich.' } }
  ]
};
const GOALS = {
  n1: ['Energieformen und Umwandlungen nennen', 'Leistung als Energie pro Zeit beschreiben'],
  n2: ['Lage- und Bewegungsenergie berechnen', 'Umwandlungen zwischen beiden beschreiben'],
  n3: ['den Wirkungsgrad berechnen', 'Energieentwertung erklären'],
  n4: ['Leistung, Energie und Zeit verknüpfen', 'Kilowattstunden umrechnen'],
  n5: ['Energieanlagen und ihre Energieträger beschreiben', 'Energiekosten berechnen'],
  n6: ['Energiesparmassnahmen beurteilen', 'Dauerverbraucher erkennen']
};
const LEARN = {
  'n1-formen': 'Welche Energieform?', 'n1-wandel': 'Energie überall', 'n1-leistung': 'Leistung', 'n1-nutzen': 'Energie überall', 'n1-koerper': 'Leistung', 'n1-hub': 'Energie überall',
  'n2-lage-form': 'Lageenergie', 'n2-bew-form': 'Bewegungsenergie', 'n2-lage': 'Vorgerechnet: Lageenergie', 'n2-bew': 'Vorgerechnet: Bewegungsenergie', 'n2-v': 'Lass den Ball fallen', 'n2-umw': 'Lass den Ball fallen',
  'n3-eta': 'Der Wirkungsgrad', 'n3-nutz': 'Wie viel bleibt übrig?', 'n3-eta-num': 'Vorgerechnet: Wirkungsgrad', 'n3-wind': 'Beispiele und Perpetuum mobile', 'n3-entw': 'Der Wirkungsgrad', 'n3-perpetuum': 'Beispiele und Perpetuum mobile',
  'n4-leistung': 'Leistung von Geräten', 'n4-zeit': 'Vorgerechnet: Wasserkocher', 'n4-kwh': 'Rechne mit Leistung und Zeit', 'n4-kj': 'Die Kilowattstunde', 'n4-lampe': 'Leistung von Geräten', 'n4-2000': 'Die 2000-Watt-Gesellschaft',
  'n5-wasser': 'Energieanlagen', 'n5-pv': 'Energieanlagen', 'n5-kern': 'Energieanlagen', 'n5-strom': 'Wofür bezahlst du?', 'n5-rechnung': 'Wofür bezahlst du?', 'n5-kosten': 'Vorgerechnet: Kosten',
  'n6-warm': 'Bewusstes Verhalten', 'n6-standby': 'Stand-by und Dauerläufer', 'n6-fohn': 'Stand-by und Dauerläufer', 'n6-tag': 'Vorgerechnet: Kühlschrank', 'n6-haus': 'Energie beim Bauen sparen', 'n6-umwelt': 'Bewusstes Verhalten'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Funke', pw: 'zündet' },
  { xp: 80, name: 'Wasserrad', pw: 'dreht sich' },
  { xp: 200, name: 'Turbine', pw: 'treibt an' },
  { xp: 380, name: 'Generator', pw: 'erzeugt Strom' },
  { xp: 620, name: 'Kraftwerk', pw: 'versorgt alle' },
  { xp: 920, name: 'Energieprofi', pw: 'spart klug' }
];

/* ---------- Thema: 9_4 Energie und Leistung erfassen ---------- */
const TOPIC = {
  id: 'nt9-4', storeKey: 'halingen-nt9-4-v1', other: { title: '7_5 Energie erkunden', href: '7_5_Energie_erkunden.html' },
  title: 'Energie und Leistung erfassen', lead: 'Lage, Bewegung, Wirkungsgrad und Kilowattstunden', tag: 'Natur und Technik', cardName: 'Formelkarte',
  tips: ['Sage «nutzen» und «umwandeln», nicht «verbrauchen».', 'Rechne Watt in Kilowatt um, bevor du kWh ausrechnest.'],
  formulas: [
    ['Lageenergie', 'E = m · g · h', 'g = 10 N/kg'],
    ['Bewegungsenergie', 'E = ½ · m · v²', 'v wird quadriert'],
    ['Wirkungsgrad', 'η = E<sub>nutz</sub> : E<sub>zu</sub>', 'immer kleiner als 100 %'],
    ['Leistung', 'P = E : t', '1 W = 1 J/s'],
    ['Kilowattstunde', '1 kWh = 3600 kJ', 'E = P · t'],
    ['Kosten', 'Kosten = kWh · Preis', 'Beispielpreis 0,25 Fr./kWh']
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
  umwandlung(el) {
    sorter(el, [
      { t: 'Wasser im Stausee hoch in den Bergen', ok: ['la'], why: 'Wegen der Höhe hat das Wasser Lageenergie.' },
      { t: 'Ein fahrender Zug', ok: ['be'], why: 'Ein bewegter Körper hat Bewegungsenergie.' },
      { t: 'Benzin im Tank', ok: ['ch'], why: 'Im Benzin ist chemische Energie gespeichert.' },
      { t: 'Eine heisse Herdplatte', ok: ['th'], why: 'Das ist thermische Energie.' },
      { t: 'Sonnenlicht', ok: ['st'], why: 'Das ist Strahlungsenergie.' },
      { t: 'Eine gespannte Feder', ok: ['ve'], why: 'Eine verformte Feder speichert Verformungsenergie.' }
    ], { la: 'Lageenergie', be: 'Bewegungsenergie', ch: 'Chemische Energie', th: 'Thermische Energie', st: 'Strahlungsenergie', ve: 'Verformungsenergie' }, 'Welche Energieform ist es?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  anlage(el) {
    sorter(el, [
      { t: 'Wasser in einem Stausee', ok: ['er'], why: 'Wasser steht immer wieder zur Verfügung. Es ist erneuerbar.' },
      { t: 'Kohle', ok: ['ne'], why: 'Kohle ist ein fossiler Brennstoff und nicht erneuerbar.' },
      { t: 'Sonnenstrahlung', ok: ['er'], why: 'Die Sonne scheint immer wieder. Sie ist erneuerbar.' },
      { t: 'Uran in Atomkernen', ok: ['ne'], why: 'Uran ist begrenzt vorhanden und nicht erneuerbar.' },
      { t: 'Wind', ok: ['er'], why: 'Wind ist erneuerbar.' },
      { t: 'Erdöl', ok: ['ne'], why: 'Erdöl ist ein fossiler Brennstoff und nicht erneuerbar.' },
      { t: 'Biomasse (zum Beispiel Holz und Gartenabfall)', ok: ['er'], why: 'Biomasse wächst nach und ist erneuerbar.' }
    ], { er: 'Erneuerbar', ne: 'Nicht erneuerbar' }, 'Ist der Energieträger erneuerbar?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  sparen(el) {
    sorter(el, [
      { t: 'Duschen statt ein Vollbad nehmen', ok: ['sp'], why: 'Das braucht weniger Warmwasser.' },
      { t: 'Die Waschmaschine halbvoll laufen lassen', ok: ['ve'], why: 'Besser voll beladen, dann wird Energie besser genutzt.' },
      { t: 'Wasser im Wasserkocher statt in der Pfanne erhitzen', ok: ['sp'], why: 'Der Wasserkocher ist dafür effizienter.' },
      { t: 'Ein Gerät dauernd im Stand-by lassen', ok: ['ve'], why: 'Auch im Stand-by wird Energie genutzt.' },
      { t: 'Die Wärmedämmung des Hauses verbessern', ok: ['sp'], why: 'Weniger Wärme geht verloren.' },
      { t: 'Einen tropfenden Wasserhahn nicht reparieren', ok: ['ve'], why: 'Es geht Warmwasser und damit Energie verloren.' }
    ], { sp: 'Spart Energie', ve: 'Verschwendet Energie' }, 'Spart das Verhalten Energie?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  fall(el) {
    el.innerHTML = `<div class="sim">${sl('fh', 'Höhe des Balls (Start: 20 m)', 0, 20, 2, 20, 'm')}
      <div class="brow"><span class="bname">Lageenergie</span><div class="btrack"><div class="bfill th" id="fa"></div></div><b class="mono bval" id="va"></b></div>
      <div class="brow"><span class="bname">Bewegungsenergie</span><div class="btrack"><div class="bfill" id="fb"></div></div><b class="mono bval" id="vb"></b></div>
      <div class="trio"><div><span class="k">Masse</span><b class="mono">2 kg</b></div><div><span class="k">Geschwindigkeit</span><b class="mono" id="fv"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const h = +$id('fh').value, m = 2, g = 10, tot = m * g * 20, ea = m * g * h, eb = tot - ea, v = Math.sqrt(2 * eb / m);
      $id('fhv').textContent = fmt(h);
      $id('fa').style.width = (ea / tot * 100) + '%'; $id('fb').style.width = (eb / tot * 100) + '%';
      $id('va').textContent = fmt(ea) + ' J'; $id('vb').textContent = fmt(eb) + ' J'; $id('fv').textContent = fmt(r2(v), 1) + ' m/s';
      $id('ro').innerHTML = `E<sub>Lage</sub> = 2 · 10 · ${fmt(h)} = ${fmt(ea)} J. Die Summe beider Energien bleibt <b>${fmt(tot)} J</b>.<br>Bewegungsenergie: ${fmt(eb)} J, also v = ${fmt(r2(v), 1)} m/s. Modell ohne Reibung.`;
    }
    $id('fh').addEventListener('input', upd); $id('fa').style.width = '100%'; $id('fb').style.width = '0%'; nf(el, upd);
  },

  wirkung(el) {
    el.innerHTML = `<div class="sim">${sl('wn', 'Wirkungsgrad', 10, 100, 10, 50, '%')}
      <div class="brow"><span class="bname">Nutzenergie</span><div class="btrack"><div class="bfill" id="wa"></div></div><b class="mono bval" id="va"></b></div>
      <div class="brow"><span class="bname">Entwertet</span><div class="btrack"><div class="bfill th" id="wb"></div></div><b class="mono bval" id="vb"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const p = +$id('wn').value;
      $id('wnv').textContent = fmt(p);
      $id('wa').style.width = p + '%'; $id('wb').style.width = (100 - p) + '%';
      $id('va').textContent = fmt(p) + ' J'; $id('vb').textContent = fmt(100 - p) + ' J';
      $id('ro').innerHTML = `Von 100 J werden bei einem Wirkungsgrad von ${fmt(p)} % <b>${fmt(p)} J</b> genutzt. <b>${fmt(100 - p)} J</b> werden in eine unerwünschte Form (meist thermische Energie) umgewandelt. Modell.`;
    }
    $id('wn').addEventListener('input', upd); $id('wa').style.width = '50%'; $id('wb').style.width = '50%'; nf(el, upd);
  },

  leistung(el) {
    el.innerHTML = `<div class="sim">${sl('lp', 'Leistung', 100, 3000, 100, 1000, 'W')}${sl('lt', 'Dauer', 1, 10, 1, 2, 'h')}
      <div class="trio"><div><span class="k">Energie</span><b class="mono" id="e1"></b></div><div><span class="k">in Kilojoule</span><b class="mono" id="e2"></b></div><div><span class="k">Kosten</span><b class="mono" id="e3"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const P = +$id('lp').value, t = +$id('lt').value, e = P / 1000 * t, kj = e * 3600, k = e * 0.25;
      $id('lpv').textContent = fmt(P); $id('ltv').textContent = fmt(t);
      $id('e1').textContent = fmt(r2(e)) + ' kWh'; $id('e2').textContent = fmt(r2(kj)) + ' kJ'; $id('e3').textContent = fmt(r2(k)) + ' Fr.';
      $id('ro').innerHTML = `${fmt(P)} W = ${fmt(P / 1000)} kW. ${fmt(P / 1000)} kW · ${fmt(t)} h = <b>${fmt(r2(e))} kWh</b> = ${fmt(r2(kj))} kJ.<br>Kosten bei 0,25 Fr. pro kWh (Beispielpreis): ${fmt(r2(k))} Fr.`;
    }
    $id('lp').addEventListener('input', upd); $id('lt').addEventListener('input', upd); upd();
  }
};

/* Audio 9_4: Sprechtexte für Watti (Vorlesen). Clips: audio/nt9-4/<Station>-c<Karte>-w.mp3 */
const AUDIO_W = {
 "n1": [
  "Überall, wo etwas bewegt, erwärmt, gekühlt oder chemisch umgesetzt wird, ist Energie nötig. Es gibt Lageenergie, Bewegungsenergie, thermische, chemische, elektrische, Strahlungs- und Verformungsenergie. Merke dir: Wir nutzen Energie und wandeln sie um. Wir verbrauchen sie nicht. Wenn du etwas hochhebst, leistest du Hubarbeit, und die steckt danach als Lageenergie im Gegenstand.",
  "Jetzt bist du dran. Ordne die Beispiele der passenden Energieform zu, zum Beispiel das Wasser im Stausee oder den fahrenden Zug.",
  "Leistung sagt dir, wie schnell Energie umgewandelt wird. Die Formel lautet: P gleich E geteilt durch t. Leistung ist also umgewandelte Energie durch Zeit. Die Einheit ist Watt, und ein Watt ist ein Joule pro Sekunde. Eine hohe Leistung bedeutet: viel Energie in kurzer Zeit.",
  "Rechnen wir zusammen. Eine LED-Lampe hat zehn Watt. Wie viel Energie nutzt sie in einer Minute? Zuerst rechnen wir die Minute in Sekunden um: sechzig Sekunden. Dann gilt: E gleich P mal t, also zehn Watt mal sechzig Sekunden gleich sechshundert Joule.",
  "Kurz testen. Was bedeutet ein Watt? Wähle die richtige Antwort."
 ],
 "n2": [
  "Wenn du einen Gegenstand hochhebst, leistest du Hubarbeit. Sie wird als Lageenergie gespeichert. Die Lageenergie hängt von der Masse und der Höhe ab. Die Formel: E Lage gleich m mal g mal h. Dabei rechnen wir mit g gleich zehn Newton pro Kilogramm. Genauer sind es neun Komma acht eins.",
  "Ein bewegter Gegenstand hat Bewegungsenergie. Sie hängt von der Masse und der Geschwindigkeit ab. Die Formel: E Bew gleich ein Halb mal m mal v im Quadrat. Weil die Geschwindigkeit quadriert wird, wächst die Energie schnell: Bei doppelter Geschwindigkeit ist die Energie viermal so gross.",
  "Lass den Ball fallen. Schiebe den Regler und beobachte: Die Lageenergie nimmt ab, die Bewegungsenergie nimmt zu. Ihre Summe bleibt gleich, weil wir die Reibung vernachlässigen.",
  "Ein Stein mit zwei Kilogramm liegt zehn Meter über dem Boden. Die Formel: E gleich m mal g mal h. Also zwei Kilogramm mal zehn Newton pro Kilogramm mal zehn Meter. Das sind zweihundert Joule.",
  "Ein Körper mit vier Kilogramm bewegt sich mit fünf Metern pro Sekunde. Zuerst quadrieren wir die Geschwindigkeit: fünf im Quadrat ist fünfundzwanzig. Dann rechnen wir: ein Halb mal vier mal fünfundzwanzig gleich fünfzig Joule.",
  "Kurz testen. Die Geschwindigkeit eines Autos verdoppelt sich. Was geschieht mit seiner Bewegungsenergie? Wähle die richtige Antwort."
 ],
 "n3": [
  "Eine Energieform lässt sich nie ganz in die gewünschte Form umwandeln. Ein Teil wird zu unerwünschter, meist thermischer Energie. Der Wirkungsgrad gibt an, wie viel genutzt wird: Wirkungsgrad gleich Nutzenergie geteilt durch zugeführte Energie. Ein Wirkungsgrad von null Komma neun heisst: Neunzig Prozent werden genutzt, zehn Prozent sind unerwünscht.",
  "Verändere den Wirkungsgrad. Von hundert Joule, die zugeführt werden, wird ein Teil genutzt, der Rest wird entwertet. Das ist ein Modell.",
  "Eine Windenergieanlage wandelt etwa fünfundvierzig bis fünfzig Prozent der Bewegungsenergie des Winds in elektrische Energie um. Der Rest wird durch Reibung zu thermischer Energie. Ein Perpetuum mobile wäre eine Maschine, die ewig läuft. Das kann nicht funktionieren, weil bei jeder Umwandlung Energie entwertet wird.",
  "Einem Gerät werden sechshundert Joule zugeführt. Davon werden hundertfünfzig Joule genutzt. Der Wirkungsgrad ist hundertfünfzig durch sechshundert, also null Komma fünfundzwanzig. Das sind fünfundzwanzig Prozent. Fünfundsiebzig Prozent sind unerwünschte Energie.",
  "Kurz testen. Ein Gerät hat den Wirkungsgrad null Komma acht. Was bedeutet das? Wähle die richtige Antwort."
 ],
 "n4": [
  "Die Leistung steht auf dem Gerät oder in der Anleitung. Ein Lautsprecher mit vierundzwanzig Watt nutzt jede Sekunde vierundzwanzig Joule. Wasserkocher haben fünfhundert bis dreitausend Watt: Je grösser die Leistung, desto kürzer dauert das Aufheizen. Merke dir: E gleich P mal t, und t gleich E geteilt durch P.",
  "Elektrische Energie wird oft in Kilowattstunden angegeben. Eine Kilowattstunde sind tausend Watt mal dreitausendsechshundert Sekunden. Das sind dreimillionensechshunderttausend Joule oder dreitausendsechshundert Kilojoule. Ein Backofen mit zwei Kilowatt, der eine Stunde läuft, nutzt zwei Kilowattstunden. Das sind siebentausendzweihundert Kilojoule.",
  "Stelle Leistung und Dauer ein. Das Modell zeigt dir die Energie in Kilowattstunden und Kilojoule und die Kosten bei einem Beispielpreis von fünfundzwanzig Rappen pro Kilowattstunde.",
  "Im Modell der Zweitausend-Watt-Gesellschaft nutzt jede Person im Mittel höchstens zweitausend Watt. In der Schweiz sind es heute etwa fünftausend Watt, also ungefähr zweieinhalb Mal so viel. Darin steckt alle Energie: Heizen, Licht, Verkehr, die Herstellung von Produkten und vieles mehr.",
  "Ein Liter Wasser soll von zwanzig auf hundert Grad erhitzt werden. Dafür braucht es etwa dreihundertsechsunddreissig Kilojoule. Wie lange dauert das mit einem Kocher von zweitausend Watt? Zuerst in Joule: dreihundertsechsunddreissigtausend Joule. Dann t gleich E durch P: dreihundertsechsunddreissigtausend durch zweitausend sind hundertachtundsechzig Sekunden. Das ist knapp drei Minuten.",
  "Kurz testen. Wie viele Kilojoule sind zwei Kilowattstunden? Wähle die richtige Antwort."
 ],
 "n5": [
  "Es gibt verschiedene Energieanlagen. In einer Wasserenergieanlage treibt das Wasser eine Turbine an, und ein Generator erzeugt elektrische Energie. Eine Windenergieanlage nutzt bewegte Luft. Eine Fotovoltaikanlage wandelt Strahlungsenergie in elektrische Energie um, eine thermische Solaranlage erzeugt Wärme. In Kernenergieanlagen und in Kohle- und Erdölanlagen entsteht zuerst thermische Energie und daraus elektrische Energie. Biomasseanlagen verbrennen zum Beispiel Holz oder nutzen Biogas.",
  "Ordne die Energieträger zu: Sind sie erneuerbar oder nicht erneuerbar? Denke zum Beispiel an Wasser, Kohle, Wind und Uran.",
  "Die Rechnung des Energieversorgers deckt vieles ab: das Beschaffen der Rohstoffe, die Umwandlung, die Wartung der Anlagen und den Transport durch die Leitungen. Der Preis hängt zum Beispiel vom Ort und von der Zeit ab. Merke dir: Wir nutzen elektrische Energie. Wir verbrauchen keinen Strom.",
  "Ein Haushalt nutzt zehn Kilowattstunden. In diesem Beispiel kostet eine Kilowattstunde zwanzig Rappen. Die Kosten sind Energie mal Preis, also zehn Kilowattstunden mal null Komma zwanzig Franken. Das sind zwei Franken. Das ist ein Beispielpreis. Der wirkliche Preis hängt vom Versorger ab.",
  "Kurz testen. Welche Aussage über den Energieträger Wind stimmt? Wähle die richtige Antwort."
 ],
 "n6": [
  "Je weniger Energie wir nutzen, desto weniger belasten wir die Umwelt. Das Verbrennen von Erdöl erzeugt Kohlenstoffdioxid, Kernenergieanlagen erzeugen radioaktive Abfälle, und Stauseen überfluten Berglandschaften. Du kannst Energie sparen: den Wasserhahn richtig zudrehen, einen Wasserkocher statt einer Pfanne nutzen, nur die benötigte Menge erwärmen, duschen statt baden und Waschmaschine und Geschirrspüler nur voll laufen lassen.",
  "Beurteile das Verhalten: Spart es Energie, oder verschwendet es welche?",
  "Geräte im Stand-by-Betrieb nutzen weiter Energie. Besser ist es, sie ganz auszuschalten. Auch ein Kühlschrank mit nur hundert Watt nutzt viel Energie, weil er dauernd läuft. Denn Energie ist Leistung mal Zeit.",
  "Gebäude lassen sich energieeffizient bauen und sanieren: mit guter Wärmedämmung, einer effizienten Heizung, kluger Lüftung, sparsamer Beleuchtung und Sonnenkollektoren. Der Bund und die Kantone unterstützen das mit Fördergeldern.",
  "Ein Kühlschrank mit hundert Watt läuft vierundzwanzig Stunden. Zuerst rechnen wir in Kilowatt um: Hundert Watt sind null Komma eins Kilowatt. Dann null Komma eins Kilowatt mal vierundzwanzig Stunden gleich zwei Komma vier Kilowattstunden pro Tag. Ein Föhn mit fünfzehnhundert Watt, der zehn Minuten läuft, braucht nur null Komma zwei fünf Kilowattstunden.",
  "Kurz testen. Warum ist der Kühlschrank trotz kleiner Leistung ein starker Energienutzer? Wähle die richtige Antwort."
 ]
};
STATIONS.forEach(s => s.lesson.forEach((c, i) => { const w = (AUDIO_W[s.id] || [])[i]; if (w) c.w = w; }));
TOPIC.audio = { dir: 'nt9-4' };


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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-4","titel":"Energie und Leistung erfassen","kapitel":"NaTech 9, Kapitel 4","audio":"nt9-4"});
