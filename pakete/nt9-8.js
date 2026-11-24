// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/9_8_Stoffkreislaeufe_erkunden.html
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

/* ---------- Inhalt: 9_8 Stoffkreisläufe erkunden, 6 Stationen mit je 6 Aufgabenvorlagen ----------
   Quelle: Themenbuch 9_8 (ein Lehrerkommentar liegt nicht vor). Aussagen zum Klima folgen dem Themenbuch (wissenschaftliche Erkenntnisse). */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 's1', nr: 1, title: 'Kreisläufe in der Natur', sub: 'Begrenzte Stoffe, Kreisläufe, Sackgassen',
    items: [
      { id: 's1-begrenzt', topic: 'Begrenzte Stoffe', make() {
        return mc('Warum funktioniert das Leben auf der Erde trotz begrenzter Mengen an Stoffen?', ['Weil Stoffkreisläufe dafür sorgen, dass alle Stoffe immer wieder neu zur Verfügung stehen.', 'Weil ständig neue Stoffe aus dem Weltall kommen.', 'Weil Stoffe sich vermehren.', 'Weil Lebewesen keine Stoffe brauchen.'],
          'Auf der Erde kommen kaum neue Stoffe hinzu, und kaum Stoffe gehen vollständig verloren. Die Stoffe auf der Erde sind alles, was wir haben.');
      } },
      { id: 's1-akteure', topic: 'Produzenten, Konsumenten, Destruenten', make() {
        return mc('Welche Rolle spielen Produzenten, Konsumenten und Destruenten im Stoffkreislauf?', ['Produzenten bauen Stoffe auf, Konsumenten nutzen sie, Destruenten zersetzen Abgestorbenes und führen Stoffe zurück.', 'Sie haben keine Rolle.', 'Nur Konsumenten sind wichtig.', 'Destruenten erzeugen neue Stoffe aus dem Nichts.'],
          'So schliesst sich der Kreislauf: Aus Abgestorbenem werden wieder Stoffe, die Pflanzen aufnehmen können.');
      } },
      { id: 's1-roh', topic: 'Rohstoffe aus Kreisläufen', make() {
        return mc('Wie hängen Rohstoffe und Stoffkreisläufe zusammen?', ['Der Mensch entnimmt den natürlichen Kreisläufen Rohstoffe, zum Beispiel Wasser, Gestein, Erze, Holz oder fossile Brennstoffe.', 'Rohstoffe haben mit Kreisläufen nichts zu tun.', 'Rohstoffe entstehen in Fabriken.', 'Nur Pflanzen sind Rohstoffe.'],
          'Natürliche Kreisläufe sind zum Beispiel der Wasserkreislauf und der Gesteinskreislauf.');
      } },
      { id: 's1-sack', topic: 'Kreislauf oder Sackgasse', make() {
        return mc('Was ist eine Sackgasse im Stoffkreislauf?', ['Ein Weg, bei dem Stoffe nicht mehr in einen nutzbaren Kreislauf zurückkommen, zum Beispiel Kunststoffabfälle in der Umwelt.', 'Ein besonders schneller Kreislauf.', 'Ein natürlicher Kreislauf.', 'Ein Kreislauf ohne Stoffe.'],
          'Kunststoffe werden in der Natur kaum abgebaut. Darum bleiben sie lange erhalten.');
      } },
      { id: 's1-wert', topic: 'Wertstoffe', make() {
        return mc('Was sind Wertstoffe?', ['Stoffe, die recycelt werden können, zum Beispiel Kunststoff, Papier, Metall und Holz.', 'Stoffe, die teuer sind.', 'Stoffe, die nur aus Gold bestehen.', 'Stoffe, die man nie verwenden darf.'],
          'Recyclistinnen und Recyclisten sammeln und sortieren Wertstoffe und bereiten sie so auf, dass sie wiederverwendet werden können.');
      } },
      { id: 's1-wasser', topic: 'Weitere Kreisläufe', make() {
        return mc('Welche Kreisläufe kennst du in der Natur?', ['Zum Beispiel den Wasserkreislauf, den Gesteinskreislauf und den Kohlenstoff-Kreislauf.', 'Nur den Wasserkreislauf.', 'Keine.', 'Nur den Kreislauf der Sonne.'],
          'In allen Kreisläufen wechseln Stoffe zwischen verschiedenen Speichern.');
      } }
    ]
  },
  {
    id: 's2', nr: 2, title: 'Der Kohlenstoff-Kreislauf', sub: 'Speicher, Flüsse und Gleichgewicht',
    items: [
      { id: 's2-gleich', topic: 'Dynamisches Gleichgewicht', make() {
        return mc('Was bedeutet «dynamisches Gleichgewicht» beim Kohlenstoff?', ['Kohlenstoff-Verbindungen wechseln ständig zwischen den Speichern, und Aufnahme und Abgabe sind in etwa gleich gross.', 'Es passiert nichts.', 'Kohlenstoff verschwindet.', 'Es gibt nur einen Speicher.'],
          'Die Landlebewesen nehmen durch Fotosynthese etwa gleich viel Kohlenstoff auf, wie sie durch Atmung und Verwesung abgeben. Auch der Gasaustausch zwischen Ozean und Atmosphäre ist ungefähr ausgeglichen.');
      } },
      { id: 's2-speicher', topic: 'Speicher und Flüsse', make() {
        return mc('Welche Beispiele sind Speicher und welche sind Flüsse?', ['Speicher: Gestein, Ozeane, Atmosphäre. Flüsse: Fotosynthese, Atmung, Gasaustausch, Verbrennung.', 'Speicher: Fotosynthese. Flüsse: Gestein.', 'Alles sind Speicher.', 'Alles sind Flüsse.'],
          'Zum Beispiel enthält die Atmosphäre etwa 830 Gt Kohlenstoff, die Ozeane etwa 38 000 Gt. Die Fotosynthese nimmt pro Jahr etwa 120 Gt auf.');
      } },
      { id: 's2-mensch', topic: 'Eingriffe des Menschen', make() {
        return mc('Wodurch hat der Mensch das Gleichgewicht der Kohlenstoff-Flüsse durcheinandergebracht?', ['Vor allem durch die Verbrennung fossiler Energieträger sowie durch Abholzung und Brandrodung.', 'Durch Atmen.', 'Durch Wasser.', 'Gar nicht.'],
          'Dadurch gelangt zusätzlich Kohlenstoff in Form von Kohlenstoffdioxid in die Atmosphäre.');
      } },
      { id: 's2-diff', topic: 'Überschuss berechnen', make() {
        const s = rnd([[130, 120], [140, 130], [90, 80], [85, 80], [125, 120]]), d = s[0] - s[1];
        return num(`In einem Beispiel werden pro Jahr ${fmt(s[0])} Gt Kohlenstoff in die Atmosphäre abgegeben und ${fmt(s[1])} Gt aufgenommen. Wie gross ist der Überschuss in der Atmosphäre?`, 'Gt', d, 'Ziehe die Aufnahme von der Abgabe ab.', `${fmt(s[0])} Gt − ${fmt(s[1])} Gt = ${fmt(d)} Gt pro Jahr`);
      } },
      { id: 's2-zusatz', topic: 'Zusätzlicher Kohlenstoff', make() {
        const n = rnd([2, 5, 10, 20, 50]), g = 10 * n;
        return num(`Durch die Verbrennung fossiler Energieträger gelangen pro Jahr etwa 10 Gt Kohlenstoff zusätzlich in die Atmosphäre. Wie viele Gt sind das in ${fmt(n)} Jahren, wenn die Menge gleich bleibt?`, 'Gt', g, 'Multipliziere die jährliche Menge mit der Anzahl Jahre.', `10 Gt · ${fmt(n)} = ${fmt(g)} Gt`);
      } },
      { id: 's2-foto', topic: 'Fotosynthese und Atmung', make() {
        return mc('Welche Flüsse gehören zu den Landlebewesen?', ['Fotosynthese nimmt Kohlenstoff aus der Atmosphäre auf, Atmung und Verwesung geben ihn wieder ab.', 'Fotosynthese gibt Kohlenstoff ab.', 'Atmung nimmt Kohlenstoff auf.', 'Es gibt keine Flüsse.'],
          'Beide Flüsse sind etwa gleich gross. Darum bleibt die Menge in der Atmosphäre ohne Eingriffe fast gleich.');
      } }
    ]
  },
  {
    id: 's3', nr: 3, title: 'Treibhauseffekt und Klima', sub: 'Erkenntnisse und Fehlinformationen',
    items: [
      { id: 's3-treib', topic: 'Treibhausgase', make() {
        return mc('Was sind wichtige Treibhausgase und was bewirken sie?', ['Wasserdampf, Kohlenstoffdioxid und Methan. Sie speichern thermische Energie in der Atmosphäre. Je mehr davon vorhanden sind, desto wärmer wird es.', 'Sauerstoff und Stickstoff. Sie kühlen die Erde.', 'Nur Staub.', 'Treibhausgase gibt es nicht.'],
          'Diese Gase kommen auch natürlich vor. Wasserdampf ist hauptverantwortlich für den natürlichen Treibhauseffekt.');
      } },
      { id: 's3-natuerlich', topic: 'Natürlicher Treibhauseffekt', make() {
        return mc('Wie wäre die Temperatur auf der Erde ohne den natürlichen Treibhauseffekt?', ['Etwa −18 °C, also viel kälter.', 'Etwa 100 °C.', 'Gleich wie heute.', 'Genau 0 °C.'],
          'Der natürliche Treibhauseffekt ist lebenswichtig. Problematisch ist der zusätzliche, menschengemachte Effekt.');
      } },
      { id: 's3-mensch', topic: 'Menschengemachte Klimastörung', make() {
        return mc('Was weiss die Wissenschaft über die Ursache des Anstiegs von Kohlenstoffdioxid und Methan?', ['Die Ursachen sind überwiegend menschliche Aktivitäten. Sie verursachen einen zusätzlichen Treibhauseffekt.', 'Sie sind ausschliesslich natürlich.', 'Sie sind nicht messbar.', 'Sie stammen aus dem Weltall.'],
          'Die Konzentration von Kohlenstoffdioxid in der Atmosphäre ist in den letzten 100 Jahren um mehr als ein Viertel gestiegen, die von Methan hat sich verdoppelt.');
      } },
      { id: 's3-viertel', topic: 'Anstieg berechnen', make() {
        const b = rnd([280, 320, 400, 200, 240]), z = b / 4;
        return num(`Die Konzentration eines Gases steigt um ein Viertel. Der Ausgangswert in diesem Beispiel beträgt ${fmt(b)} ppm. Wie viele ppm kommen dazu?`, 'ppm', z, 'Ein Viertel ist die Zahl geteilt durch 4.', `${fmt(b)} ppm : 4 = ${fmt(z)} ppm`);
      } },
      { id: 's3-quelle', topic: 'Quellen prüfen', make() {
        return mc('Wie prüfst du, ob eine Informationsquelle vertrauenswürdig ist?', ['Ich frage, wer sie veröffentlicht, ob sie Belege nennt, ob mit dem Thema Interessen verbunden sein könnten, und vergleiche mehrere Quellen.', 'Ich glaube alles, was oft geteilt wird.', 'Ich glaube nur, was mir gefällt.', 'Ich verlasse mich nur auf die Überschrift.'],
          'Auch Webseiten von Organisationen können Interessen vertreten. Darum liest man nicht nur die Adresse, sondern auch die Inhalte und vergleicht.');
      } },
      { id: 's3-falsch', topic: 'Irreführende Aussagen', make() {
        return mc('Jemand sagt: «Das Klima hat sich schon immer verändert.» Was ist dazu fachlich richtig?', ['Das stimmt zwar, führt aber in die Irre: Die heutige Störung ist überwiegend menschengemacht.', 'Das stimmt, also ist nichts menschengemacht.', 'Das ist komplett falsch, das Klima änderte sich nie.', 'Es gibt keine Klimaänderung.'],
          'Eine Aussage kann einen richtigen Kern haben und trotzdem falsche Schlüsse nahelegen. Darum prüft man Belege und Zusammenhänge.');
      } }
    ]
  },
  {
    id: 's4', nr: 4, title: 'Kunststoffe', sub: 'Woher und wohin?',
    items: [
      { id: 's4-roh', topic: 'Herkunft der Kunststoffe', make() {
        return mc('Woraus werden Kunststoffe vor allem hergestellt?', ['Aus fossilen Rohstoffen wie Erdöl, Kohle und Erdgas.', 'Aus Holz.', 'Aus Sand.', 'Aus Wasser.'],
          'Kunststoff steckt in fast allen Alltagsgegenständen. Es gibt viele Kunststoffarten mit unterschiedlichen Eigenschaften.');
      } },
      { id: 's4-recycl', topic: 'Recycling-Codes', make() {
        return mc('Warum haben Kunststoffe verschiedene Recycling-Codes?', ['Weil sich unterschiedliche Kunststoffarten nicht zusammen recyceln lassen.', 'Weil sie verschiedene Farben haben.', 'Weil sie verschieden alt sind.', 'Zur Dekoration.'],
          'Sortenreines Sammeln und Sortieren ist wichtig für gutes Recycling.');
      } },
      { id: 's4-abbau', topic: 'Abbau in der Natur', make() {
        return mc('Was ist ein Problem von Kunststoffabfällen?', ['Sie werden in der Natur kaum abgebaut und finden sich überall auf der Welt.', 'Sie verrotten sofort.', 'Sie lösen sich im Wasser vollständig auf.', 'Sie sind nützliche Nährstoffe.'],
          'Plastikmüll ist besonders langlebig und bildet riesige Müllsammlungen in den Meeren.');
      } },
      { id: 's4-co2', topic: 'Kunststoff aus Kohlenstoffdioxid', make() {
        return mc('Warum ist die Idee interessant, Kunststoffe aus Kohlenstoffdioxid und Wasserstoff herzustellen?', ['Sie liefert einen Ersatz für Erdöl als Ausgangsstoff und nutzt das Treibhausgas Kohlenstoffdioxid.', 'Sie vernichtet alle Kunststoffe.', 'Sie braucht kein Wasserstoff.', 'Sie erhöht den Erdölverbrauch.'],
          'So könnten zwei Probleme zugleich angegangen werden. Ob die Methode im grossen Mass funktioniert, muss man prüfen.');
      } },
      { id: 's4-rec-num', topic: 'Recycelte Menge', make() {
        const s = rnd([[200, 40], [500, 10], [1000, 14], [250, 20], [80, 25]]), r = r2(s[0] * s[1] / 100);
        return num(`Von ${fmt(s[0])} kg Kunststoff werden ${fmt(s[1])} % für das Recycling gesammelt. Wie viele Kilogramm sind das?`, 'kg', r, 'Berechne den Prozentsatz der Gesamtmenge.', `${fmt(s[0])} kg · ${fmt(s[1])} % = ${fmt(r)} kg`);
      } },
      { id: 's4-verbot', topic: 'Abwägen', make() {
        return mc('Juno möchte alle Kunststoffe verbieten. Welche Aussage zeigt eine begründete Abwägung?', ['Kunststoffe sind in fast allen Alltagsgegenständen. Ein vollständiges Verbot hätte grosse Folgen. Wichtiger sind weniger Abfall, besseres Recycling und neue Ausgangsstoffe.', 'Verbote lösen alles sofort.', 'Es gibt kein Problem.', 'Niemand soll sich darum kümmern.'],
          'Bei Fragen ohne einfache Antwort wägst du Vorteile, Nachteile und Folgen gegeneinander ab und begründest.');
      } }
    ]
  },
  {
    id: 's5', nr: 5, title: 'Metall-Rohstoffe', sub: 'Uran, Kobalt und Tantal',
    items: [
      { id: 's5-erz', topic: 'Erze', make() {
        return mc('Wie kommen Metalle in der Natur vor?', ['Fast alle als Verbindungen in Gesteinen, den Erzen. Nur Gold kommt fast nur als reines Element vor.', 'Alle als reine Elemente.', 'Nur im Wasser.', 'Nur in Pflanzen.'],
          'Gesteine, die besonders viele Metallverbindungen enthalten, heissen Erze.');
      } },
      { id: 's5-uran', topic: 'Uran', make() {
        return mc('Was gilt für Uran?', ['Es ist radioaktiv und giftig (es schädigt die Nieren). Es wird für Kernspaltung in Kernenergieanlagen genutzt.', 'Es ist harmlos.', 'Es ist ein Gas.', 'Es wird nur für Schmuck genutzt.'],
          'Uran kommt in geringen Mengen in den meisten Böden vor. Mit Phosphatdünger kann es ins Trinkwasser gelangen.');
      } },
      { id: 's5-kobalt', topic: 'Kobalt', make() {
        return mc('Wofür wird Kobalt vor allem verwendet und woher kommt es?', ['Für Akkus und Batterien. Oft wird es als Nebenprodukt beim Kupfer- oder Nickelabbau gewonnen.', 'Für Kunststoffe.', 'Für Brot.', 'Nur für Münzen.'],
          'Ein Handy-Akku enthält knapp zehn Gramm Kobalt, der Akku eines Elektroautos etwa zehn Kilogramm.');
      } },
      { id: 's5-tantal', topic: 'Tantal', make() {
        return mc('Wofür ist Tantal wichtig?', ['Für Kondensatoren in elektronischen Geräten. Es ist ungiftig und wird deshalb auch für medizinische Implantate genutzt.', 'Für Papier.', 'Für Treibstoff.', 'Nur für Schmuck.'],
          'Tantal gibt es ungefähr zehnmal weniger als Kobalt. Es kommt in Erzen vor, die Coltan heissen.');
      } },
      { id: 's5-akku', topic: 'Kobalt in Akkus', make() {
        const k = rnd([1, 2, 5, 10]), n = k * 1000 / 10;
        return num(`Ein Handy-Akku enthält knapp 10 g Kobalt. Wie viele Handy-Akkus enthalten zusammen ${fmt(k)} kg Kobalt? Es gilt 1 kg = 1000 g.`, 'Akkus', n, 'Rechne die Kilogramm in Gramm um und teile durch 10 g.', `${fmt(k)} kg = ${fmt(k * 1000)} g<br>${fmt(k * 1000)} g : 10 g = ${fmt(n)} Akkus`);
      } },
      { id: 's5-uran-num', topic: 'Uran-Isotope', ext: true, make() {
        const n = rnd([1000, 2000, 5000, 10000]), a = r2(n * 0.7 / 100);
        return num(`Natururan besteht zu 0,7 % aus dem Isotop Uran-235. Wie viele von ${fmt(n)} Uran-Atomen sind Uran-235?`, 'Atome', a, 'Berechne 0,7 % der Gesamtzahl.', `${fmt(n)} · 0,7 % = ${fmt(a)} Atome`);
      } }
    ]
  },
  {
    id: 's6', nr: 6, title: 'Baumwolle und die Folgen', sub: 'Lebenslauf eines Rohstoffs',
    items: [
      { id: 's6-fakt', topic: 'Die Baumwollpflanze', make() {
        return mc('Was weisst du über Baumwolle?', ['Die Samenhaare der Baumwollpflanze werden als Textilfasern genutzt. Etwa ein Drittel aller Textilfasern ist aus Baumwolle.', 'Sie ist ein Metall.', 'Sie wird aus Erdöl hergestellt.', 'Sie wächst nur im Wasser.'],
          'Die Samenhaare dienen der Pflanze, damit der Wind die Samen verbreitet und die Samen besser keimen.');
      } },
      { id: 's6-klima', topic: 'Anbaubedingungen', make() {
        return mc('Welche Bedingungen mag die Baumwolle natürlicherweise?', ['Warme Temperaturen über 30 °C, hohe Lichtintensität, geringe Luftfeuchtigkeit und feuchten Boden.', 'Kälte und Schnee.', 'Dauerregen.', 'Dunkelheit.'],
          'Weil viele Anbaugebiete nicht ideal liegen, müssen drei Viertel des weltweiten Baumwollanbaus künstlich bewässert werden.');
      } },
      { id: 's6-bewaess', topic: 'Bewässerter Anbau', make() {
        const n = rnd([400, 800, 1000, 2000, 600]), b = n * 3 / 4;
        return num(`Drei Viertel des Baumwollanbaus werden künstlich bewässert. Wie viele von ${fmt(n)} Hektar sind das?`, 'ha', b, 'Teile durch 4 und multipliziere mit 3.', `${fmt(n)} ha : 4 · 3 = ${fmt(b)} ha`);
      } },
      { id: 's6-wasser', topic: 'Wasser für T-Shirts', make() {
        const n = rnd([2, 3, 5, 10]), w = 2000 * n;
        return num(`Für die Baumwolle eines T-Shirts können bis zu 2000 Liter Wasser nötig sein. Wie viele Liter sind es höchstens für ${fmt(n)} T-Shirts?`, 'Liter', w, 'Multipliziere mit der Anzahl T-Shirts.', `2000 L · ${fmt(n)} = ${fmt(w)} L`);
      } },
      { id: 's6-mono', topic: 'Monokultur und Pestizide', make() {
        return mc('Welche Probleme entstehen bei Baumwoll-Monokulturen?', ['Die Biodiversität sinkt, Unkraut wächst leichter, und es werden viele Pestizide eingesetzt. Schädlinge werden mit der Zeit resistent.', 'Die Biodiversität steigt.', 'Es braucht keine Pflege.', 'Es gibt keine Schädlinge.'],
          'Baumwolle ist das landwirtschaftliche Produkt, bei dem am meisten Chemikalien eingesetzt werden. Auch gentechnisch veränderte Pflanzen schützen nur eine begrenzte Zeit.');
      } },
      { id: 's6-bio', topic: 'Biologischer Anbau', make() {
        return mc('Wie unterscheidet sich biologisch angebaute Baumwolle von konventioneller?', ['Biologischer Anbau erfordert meist mehr Aufwand und bringt geringere Erträge, schont aber Umwelt und Menschen.', 'Bio-Baumwolle bringt immer höhere Erträge.', 'Es gibt keinen Unterschied.', 'Bio-Baumwolle braucht mehr Pestizide.'],
          'Jede Wahl hat Vor- und Nachteile. Wer Rohstoffe nutzt, sollte Folgen für Umwelt und Gesellschaft mitdenken.');
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  s1: [
    { h: 'Die Natur arbeitet im Kreislauf',
      body: `<p>Stoffe auf der Erde sind <b>begrenzt</b>. Es kommen kaum neue dazu, und es geht kaum etwas ganz verloren. Alle Lebewesen nutzen Stoffe. Das geht nur, weil <b>Stoffkreisläufe</b> sie immer wieder neu zur Verfügung stellen.</p>
        ${merk('<b>Produzenten</b> bauen Stoffe auf, <b>Konsumenten</b> nutzen sie, <b>Destruenten</b> zersetzen Abgestorbenes und führen es in den Kreislauf zurück.')}` },
    { h: 'Kreislauf oder Sackgasse?',
      body: '<p>Ordne die Beispiele zu.</p>', sim: 'kreislauf' },
    { h: 'Rohstoffe und Wertstoffe',
      body: `<p>Der Mensch entnimmt den Kreisläufen <b>Rohstoffe</b>, zum Beispiel Wasser, Erze, Holz, Erdöl. Stoffe, die recycelt werden können, heissen <b>Wertstoffe</b>: Kunststoff, Papier, Metall, Holz.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Warum geht den Lebewesen auf der Erde der Stoff nicht aus?',
        options: ['Weil Stoffkreisläufe sie immer wieder zur Verfügung stellen.', 'Weil Stoffe sich vermehren.', 'Weil sie aus dem Weltall kommen.', 'Weil Lebewesen keine Stoffe brauchen.'],
        explain: 'Die Stoffe wechseln zwischen den verschiedenen Speichern und werden von Lebewesen weiterverarbeitet.' } }
  ],
  s2: [
    { h: 'Speicher und Flüsse',
      body: `<p>Kohlenstoff ist in verschiedenen <b>Speichern</b>: Atmosphäre (etwa 830 Gt), Ozeane (etwa 38 000 Gt), Gestein, Boden und Lebewesen, fossile Energieträger. Zwischen ihnen fliesst Kohlenstoff in <b>Flüssen</b>: Fotosynthese (etwa 120 Gt pro Jahr), Atmung und Verwesung (etwa 120 Gt pro Jahr), Gasaustausch zwischen Ozean und Atmosphäre (etwa 80 Gt in beide Richtungen).</p>
        <p>1 Gt (Gigatonne) sind 1 Milliarde Tonnen.</p>` },
    { h: 'Das Gleichgewicht',
      body: `${merk('Ohne Eingriffe des Menschen herrscht ein <b>dynamisches Gleichgewicht</b>: Aufnahme und Abgabe sind etwa gleich gross.')}
        <p>Der Mensch stört es durch die <b>Verbrennung</b> fossiler Energieträger (etwa 10 Gt pro Jahr), <b>Abholzung</b> und <b>Brandrodung</b>.</p>` },
    { h: 'Stelle das Gleichgewicht ein',
      body: '<p>Verändere die Verbrennung fossiler Energieträger. Das Modell zeigt den zusätzlichen Kohlenstoff in der Atmosphäre, wenn alles andere gleich bleibt. Das ist stark vereinfacht.</p>', sim: 'ckreis' },
    { h: 'Vorgerechnet: Überschuss', worked: {
      given: 'In einem Beispiel werden pro Jahr 130 Gt in die Atmosphäre abgegeben und 120 Gt aufgenommen. Wie gross ist der Überschuss?',
      steps: [['Rechnung', '130 − 120 = 10'], ['Antwort', '10 Gt pro Jahr bleiben zusätzlich in der Atmosphäre.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welcher Fluss zählt zu den vom Menschen verursachten Störungen?',
        options: ['Die Verbrennung fossiler Energieträger.', 'Die Fotosynthese.', 'Der Gasaustausch der Ozeane.', 'Die Atmung der Pflanzen.'],
        explain: 'Verbrennung, Abholzung und Brandrodung bringen zusätzlichen Kohlenstoff in die Atmosphäre.' } }
  ],
  s3: [
    { h: 'Treibhausgase',
      body: `<p>Wasserdampf, Kohlenstoffdioxid (CO₂) und Methan (CH₄) können thermische Energie in der Atmosphäre speichern. Je mehr davon vorhanden ist, desto wärmer wird es. Ohne den <b>natürlichen Treibhauseffekt</b> wäre es auf der Erde etwa −18 °C kalt.</p>` },
    { h: 'Treibhausgas oder nicht?',
      body: '<p>Ordne die Gase zu.</p>', sim: 'treibhaus' },
    { h: 'Die menschengemachte Klimastörung',
      body: `<p>Die Konzentration von Kohlenstoffdioxid ist in den letzten 100 Jahren um <b>mehr als ein Viertel</b> gestiegen, die von Methan hat sich <b>verdoppelt</b>. Die Ursachen sind überwiegend menschliche Aktivitäten. Sie verursachen einen <b>zusätzlichen Treibhauseffekt</b>.</p>` },
    { h: 'Erkenntnis oder Fehlinformation?',
      body: '<p>Prüfe die Aussagen. Frage immer: Wer sagt das? Gibt es Belege? Passt es zum Stand der Forschung?</p>', sim: 'quelle' },
    { h: 'Vorgerechnet: Anstieg', worked: {
      given: 'Eine Konzentration von 280 ppm steigt um ein Viertel. Um wie viele ppm?',
      steps: [['Ein Viertel', '280 : 4'], ['Rechnung', '280 : 4 = 70'], ['Antwort', 'Um 70 ppm auf 350 ppm (Beispielwerte).']] } },
    { h: 'Kurz testen',
      check: { q: 'Wie prüfst du eine Information über das Klima?',
        options: ['Ich suche Belege und vergleiche mehrere vertrauenswürdige Quellen.', 'Ich glaube die lauteste Meinung.', 'Ich verlasse mich auf eine einzelne Schlagzeile.', 'Ich ignoriere alle Daten.'],
        explain: 'Zuverlässige Information erkennst du an Belegen, Transparenz und dem Vergleich mehrerer Quellen.' } }
  ],
  s4: [
    { h: 'Woraus Kunststoff besteht',
      body: `<p>Kunststoffe werden vor allem aus <b>fossilen Rohstoffen</b> (Erdöl, Kohle, Erdgas) hergestellt. Es gibt viele Kunststoffarten mit Recycling-Codes. Unterschiedliche Arten lassen sich <b>nicht zusammen</b> recyceln.</p>` },
    { h: 'Probleme und Ideen',
      body: `<ul><li>Kunststoffe werden in der Natur <b>kaum abgebaut</b>. Abfälle finden sich überall.</li><li>Recycling ist schwierig.</li><li>Eine Idee: Kunststoffe aus <b>Kohlenstoffdioxid und Wasserstoff</b> herstellen. Das ersetzt Erdöl und nutzt ein Treibhausgas.</li></ul>
        <p>Ein vollständiges Verbot hätte grosse Folgen, weil Kunststoffe in fast allen Alltagsgegenständen stecken. Darum wägst du Vorteile und Nachteile ab.</p>` },
    { h: 'Nachwachsend oder nicht?',
      body: '<p>Ordne Rohstoffe ein. Nachwachsende Rohstoffe können in menschlichen Zeiträumen wieder entstehen.</p>', sim: 'rohstoff' },
    { h: 'Vorgerechnet: Recycling', worked: {
      given: 'Von 200 kg Kunststoff werden 40 % für das Recycling gesammelt. Wie viele kg sind das?',
      steps: [['Rechnung', '200 kg · 0,4 = 80 kg'], ['Antwort', '80 kg.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum können verschiedene Kunststoffarten nicht zusammen recycelt werden?',
        options: ['Weil sie unterschiedliche Eigenschaften haben.', 'Weil sie alle gleich sind.', 'Weil sie sich in Wasser lösen.', 'Weil sie keine Codes haben.'],
        explain: 'Darum gibt es Recycling-Codes. Sortenreines Sammeln ist wichtig.' } }
  ],
  s5: [
    { h: 'Erze',
      body: `<p>Fast alle Metalle liegen in Gesteinen als <b>Verbindungen</b> vor. Gesteine mit besonders vielen Metallverbindungen heissen <b>Erze</b>. Gold kommt fast nur als reines Element vor.</p>` },
    { h: 'Uran, Kobalt und Tantal',
      body: `<ul><li><b>Uran:</b> radioaktiv und giftig. Genutzt wird es für Kernspaltung in Kernenergieanlagen. Natururan ist zu 99,3 % Uran-238 und zu 0,7 % Uran-235.</li>
        <li><b>Kobalt:</b> Hauptsächlich für Akkus und Batterien. Ein Handy-Akku enthält knapp 10 g, ein Elektroauto-Akku etwa 10 kg.</li>
        <li><b>Tantal:</b> in Kondensatoren und medizinischen Implantaten. Es gibt etwa zehnmal weniger Tantal als Kobalt.</li></ul>` },
    { h: 'Vorgerechnet: Kobalt', worked: {
      given: 'Ein Handy-Akku enthält knapp 10 g Kobalt. Wie viele Akkus lassen sich mit 2 kg Kobalt füllen?',
      steps: [['Umrechnen', '2 kg = 2000 g'], ['Rechnung', '2000 g : 10 g = 200'], ['Antwort', 'Etwa 200 Akkus.']] } },
    { h: 'Wirkung auf Umwelt und Gesellschaft',
      body: `<p>Jeder Rohstoff hat einen <b>Lebenslauf</b>: Gewinnung, Verarbeitung, Nutzung, Entsorgung oder Recycling. Dabei gibt es Folgen für Umwelt (zum Beispiel Eingriffe in Landschaften und Gewässer) und Gesellschaft (zum Beispiel Arbeitsbedingungen). Um sie zu bewerten, recherchiert man gut belegte Quellen.</p>` },
    { h: 'Kurz testen',
      check: { q: 'Wofür wird Kobalt vor allem genutzt?',
        options: ['Für Akkus und Batterien.', 'Für Verpackungen.', 'Für Brot.', 'Für Papier.'],
        explain: 'Der grösste Teil des Kobalts dient der Herstellung von Akkus und Batterien.' } }
  ],
  s6: [
    { h: 'Baumwolle als Rohstoff',
      body: `<p>Baumwolle ist ein <b>nachwachsender Rohstoff</b>. Ihre Samenhaare werden zu Textilfasern. Etwa ein Drittel aller Textilfasern ist aus Baumwolle. Sie gedeiht bei über 30 °C, viel Licht, geringer Luftfeuchtigkeit und feuchtem Boden.</p>` },
    { h: 'Wasser und Chemikalien',
      body: '<p>Stelle die Anzahl T-Shirts ein und sieh, wie viel Wasser für die Baumwolle nötig sein kann (bis zu 2000 Liter pro T-Shirt).</p>', sim: 'wassersim' },
    { h: 'Folgen des Anbaus',
      body: `<ul><li>Drei Viertel des Anbaus müssen <b>künstlich bewässert</b> werden.</li><li><b>Monokulturen</b> senken die Biodiversität. Baumwolle ist das Produkt mit dem höchsten Chemikalieneinsatz.</li><li>Schädlinge werden <b>resistent</b>. Auch gentechnisch veränderte Pflanzen helfen nicht dauerhaft.</li><li><b>Bio-Anbau</b> bringt meist weniger Ertrag, schont aber Umwelt und Menschen.</li></ul>` },
    { h: 'Vorgerechnet: Wasser', worked: {
      given: 'Für ein T-Shirt können bis zu 2000 Liter Wasser nötig sein. Wie viele Liter sind es höchstens für 5 T-Shirts?',
      steps: [['Rechnung', '2000 L · 5 = 10 000 L'], ['Antwort', 'Bis zu 10 000 Liter.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was ist ein Nachteil von Baumwoll-Monokulturen?',
        options: ['Sie senken die Biodiversität und brauchen viele Pestizide.', 'Sie erhöhen die Artenvielfalt.', 'Sie brauchen kein Wasser.', 'Sie haben keine Schädlinge.'],
        explain: 'Wird immer dieselbe Frucht angebaut, sinkt die Vielfalt, und unerwünschte Unkräuter wachsen leichter.' } }
  ]
};
const GOALS = {
  s1: ['Stoffkreisläufe und Sackgassen unterscheiden', 'Rohstoffe und Wertstoffe erklären'],
  s2: ['Speicher und Flüsse des Kohlenstoffs beschreiben', 'Eingriffe des Menschen erklären'],
  s3: ['den Treibhauseffekt erklären', 'Erkenntnisse von Fehlinformationen unterscheiden'],
  s4: ['Herkunft und Probleme von Kunststoffen beschreiben', 'Lösungsansätze abwägen'],
  s5: ['Metall-Rohstoffe und ihre Nutzung beschreiben', 'den Lebenslauf eines Rohstoffs erkennen'],
  s6: ['Folgen des Baumwollanbaus beschreiben', 'Vor- und Nachteile von Anbaumethoden abwägen']
};
const LEARN = {
  's1-begrenzt': 'Die Natur arbeitet im Kreislauf', 's1-akteure': 'Die Natur arbeitet im Kreislauf', 's1-roh': 'Rohstoffe und Wertstoffe', 's1-sack': 'Kreislauf oder Sackgasse?', 's1-wert': 'Rohstoffe und Wertstoffe', 's1-wasser': 'Rohstoffe und Wertstoffe',
  's2-gleich': 'Das Gleichgewicht', 's2-speicher': 'Speicher und Flüsse', 's2-mensch': 'Das Gleichgewicht', 's2-diff': 'Vorgerechnet: Überschuss', 's2-zusatz': 'Stelle das Gleichgewicht ein', 's2-foto': 'Speicher und Flüsse',
  's3-treib': 'Treibhausgase', 's3-natuerlich': 'Treibhausgase', 's3-mensch': 'Die menschengemachte Klimastörung', 's3-viertel': 'Vorgerechnet: Anstieg', 's3-quelle': 'Erkenntnis oder Fehlinformation?', 's3-falsch': 'Erkenntnis oder Fehlinformation?',
  's4-roh': 'Woraus Kunststoff besteht', 's4-recycl': 'Woraus Kunststoff besteht', 's4-abbau': 'Probleme und Ideen', 's4-co2': 'Probleme und Ideen', 's4-rec-num': 'Vorgerechnet: Recycling', 's4-verbot': 'Probleme und Ideen',
  's5-erz': 'Erze', 's5-uran': 'Uran, Kobalt und Tantal', 's5-kobalt': 'Uran, Kobalt und Tantal', 's5-tantal': 'Uran, Kobalt und Tantal', 's5-akku': 'Vorgerechnet: Kobalt', 's5-uran-num': 'Uran, Kobalt und Tantal',
  's6-fakt': 'Baumwolle als Rohstoff', 's6-klima': 'Baumwolle als Rohstoff', 's6-bewaess': 'Folgen des Anbaus', 's6-wasser': 'Vorgerechnet: Wasser', 's6-mono': 'Folgen des Anbaus', 's6-bio': 'Folgen des Anbaus'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Rohstoff', pw: 'wartet auf Verwendung' },
  { xp: 80, name: 'Kreislauf', pw: 'dreht sich' },
  { xp: 200, name: 'Wertstoff', pw: 'wird wiederverwendet' },
  { xp: 380, name: 'Recyclinganlage', pw: 'sortiert klug' },
  { xp: 620, name: 'Klimaprofi', pw: 'prüft Quellen' },
  { xp: 920, name: 'Kreislaufmeister', pw: 'schliesst Kreisläufe' }
];

/* ---------- Thema: 9_8 Stoffkreisläufe erkunden ---------- */
const TOPIC = {
  id: 'nt9-8', storeKey: 'halingen-nt9-8-v1', other: { title: '9_7 Land-Ökosysteme erforschen', href: '9_7_Land_Oekosysteme_erforschen.html' },
  title: 'Stoffkreisläufe erkunden', lead: 'Kohlenstoff, Klima, Kunststoffe und Rohstoffe', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Nach Kreislauf oder Sackgasse fragen.', 'Quellen prüfen: Wer sagt das, und mit welchen Belegen?'],
  formulas: [
    ['Kreislauf', 'Produzenten, Konsumenten', 'Destruenten'],
    ['Kohlenstoff', 'Speicher und Flüsse', 'Einheit Gt = Milliarde Tonnen'],
    ['Treibhausgase', 'Wasserdampf, CO₂, Methan', 'ohne Effekt: −18 °C'],
    ['Kunststoff', 'aus fossilen Rohstoffen', 'Arten nicht zusammen recycelbar'],
    ['Metalle', 'als Erze im Gestein', 'Gold fast rein'],
    ['Rohstoff', 'Lebenslauf bewerten', 'Folgen für Umwelt und Gesellschaft']
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
  kreislauf(el) {
    sorter(el, [
      { t: 'Pflanzen nehmen Kohlenstoffdioxid auf, Lebewesen atmen es wieder aus.', ok: ['kr'], why: 'Der Kohlenstoff wechselt zwischen den Speichern: ein Kreislauf.' },
      { t: 'Kunststoffabfälle bleiben jahrzehntelang in der Natur liegen.', ok: ['sa'], why: 'Sie werden kaum abgebaut: eine Sackgasse.' },
      { t: 'Altpapier wird zu neuem Papier verarbeitet.', ok: ['kr'], why: 'Der Wertstoff Papier wird wiederverwendet.' },
      { t: 'Laub wird von Destruenten zu Humus zersetzt.', ok: ['kr'], why: 'Die Stoffe stehen den Pflanzen wieder zur Verfügung.' },
      { t: 'Ein Elektrogerät landet im Hausmüll, die Metalle gehen verloren.', ok: ['sa'], why: 'Die Rohstoffe kommen nicht zurück in einen Kreislauf.' }
    ], { kr: 'Kreislauf', sa: 'Sackgasse' }, 'Schliesst sich der Kreis?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  treibhaus(el) {
    sorter(el, [
      { t: 'Wasserdampf', ok: ['ja'], why: 'Wasserdampf ist hauptverantwortlich für den natürlichen Treibhauseffekt.' },
      { t: 'Kohlenstoffdioxid (CO₂)', ok: ['ja'], why: 'CO₂ ist ein wichtiges Treibhausgas.' },
      { t: 'Methan (CH₄)', ok: ['ja'], why: 'Methan ist ein Treibhausgas, dessen Konzentration sich verdoppelt hat.' },
      { t: 'Sauerstoff (O₂)', ok: ['ne'], why: 'Sauerstoff gehört nicht zu den wichtigen Treibhausgasen.' },
      { t: 'Stickstoff (N₂)', ok: ['ne'], why: 'Stickstoff speichert kaum thermische Energie in der Atmosphäre und gehört nicht zu den wichtigen Treibhausgasen.' }
    ], { ja: 'Treibhausgas', ne: 'Kein wichtiges Treibhausgas' }, 'Speichert das Gas thermische Energie in der Atmosphäre?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  quelle(el) {
    sorter(el, [
      { t: 'Je mehr Treibhausgase in der Atmosphäre sind, desto wärmer wird es.', ok: ['er'], why: 'Das ist eine wissenschaftliche Erkenntnis.' },
      { t: 'Der Klimaschwindel ist eine grosse Panikmache.', ok: ['fe'], why: 'Das ist eine Behauptung ohne Belege und widerspricht dem Stand der Forschung.' },
      { t: 'Die Konzentration von CO₂ ist in den letzten 100 Jahren um mehr als ein Viertel gestiegen.', ok: ['er'], why: 'Das ist eine gemessene Erkenntnis.' },
      { t: 'Klimawissenschaftlern geht es vor allem darum, berühmt zu werden.', ok: ['fe'], why: 'Das ist eine Unterstellung ohne Belege, keine wissenschaftliche Aussage.' },
      { t: 'Das Klima hat sich schon immer verändert (also ist die heutige Störung nicht menschengemacht).', ok: ['fe'], why: 'Der erste Teil stimmt, der Schluss führt aber in die Irre. Die heutige Störung ist überwiegend menschengemacht.' },
      { t: 'Ohne den natürlichen Treibhauseffekt wäre es auf der Erde etwa −18 °C kalt.', ok: ['er'], why: 'Das ist eine wissenschaftliche Erkenntnis.' }
    ], { er: 'Erkenntnis', fe: 'Fehlinformation oder irreführend' }, 'Ist die Aussage belegt?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  rohstoff(el) {
    sorter(el, [
      { t: 'Baumwolle', ok: ['na'], why: 'Baumwolle ist ein nachwachsender Rohstoff.' },
      { t: 'Kobalt', ok: ['ni'], why: 'Metalle werden aus Erzen gewonnen und wachsen nicht nach.' },
      { t: 'Erdöl', ok: ['ni'], why: 'Erdöl ist ein fossiler Rohstoff, der sich nicht in menschlichen Zeiträumen neu bildet.' },
      { t: 'Holz', ok: ['na'], why: 'Holz wächst nach, wenn nicht mehr geschlagen wird, als nachwächst.' },
      { t: 'Uran', ok: ['ni'], why: 'Uran ist nicht nachwachsend.' },
      { t: 'Tantal', ok: ['ni'], why: 'Tantal wird aus Erzen (Coltan) gewonnen.' }
    ], { na: 'Nachwachsend', ni: 'Nicht nachwachsend' }, 'Wächst der Rohstoff nach?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  ckreis(el) {
    el.innerHTML = `<div class="sim">${sl('cv', 'Verbrennung fossiler Energieträger', 0, 20, 5, 10, 'Gt/Jahr')}
      <div class="brow"><span class="bname">Land (Fotosynthese − Atmung)</span><div class="btrack"><div class="bfill" id="c1"></div></div><b class="mono bval" id="v1"></b></div>
      <div class="brow"><span class="bname">Ozean (Gasaustausch)</span><div class="btrack"><div class="bfill" id="c2"></div></div><b class="mono bval" id="v2"></b></div>
      <div class="brow"><span class="bname">Zusätzlich durch Verbrennung</span><div class="btrack"><div class="bfill th" id="c3"></div></div><b class="mono bval" id="v3"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const v = +$id('cv').value;
      $id('cvv').textContent = fmt(v);
      $id('c1').style.width = '0%'; $id('c2').style.width = '0%'; $id('c3').style.width = (v / 20 * 100) + '%';
      $id('v1').textContent = '120 − 120 = 0'; $id('v2').textContent = '80 − 80 = 0'; $id('v3').textContent = '+' + fmt(v) + ' Gt';
      $id('ro').innerHTML = v === 0 ? 'Ohne Verbrennung ist das Gleichgewicht ausgeglichen: Alle Flüsse heben sich auf.' : `Das Gleichgewicht von Land und Ozean bleibt in diesem Modell ausgeglichen. Durch die Verbrennung kommen pro Jahr <b>${fmt(v)} Gt</b> zusätzlich in die Atmosphäre (Atmosphäre insgesamt etwa 830 Gt). Stark vereinfachtes Modell.`;
    }
    $id('cv').addEventListener('input', upd); nf(el, upd);
  },

  wassersim(el) {
    el.innerHTML = `<div class="sim">${sl('wt', 'Anzahl T-Shirts', 1, 10, 1, 1, '')}
      <div class="trio"><div><span class="k">Höchstens</span><b class="mono" id="w1"></b></div><div><span class="k">in m³</span><b class="mono" id="w2"></b></div></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const n = +$id('wt').value, l = 2000 * n;
      $id('wtv').textContent = String(n);
      $id('w1').textContent = fmt(l) + ' L'; $id('w2').textContent = fmt(l / 1000) + ' m³';
      $id('ro').innerHTML = `Für die Baumwolle von ${n} T-Shirt${n > 1 ? 's' : ''} können bis zu <b>${fmt(l)} Liter</b> Wasser nötig sein (1 m³ = 1000 L). Das ist ein Höchstwert, die Menge hängt vom Anbaugebiet ab.`;
    }
    $id('wt').addEventListener('input', upd); upd();
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt9-8","titel":"Stoffkreisläufe erkunden","kapitel":"NaTech 9, Kapitel 8","audio":"nt9-8"});
