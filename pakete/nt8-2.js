// AUTOMATISCH ERZEUGT mit werkzeuge/lernlandkarte-import.mjs aus nut-lernlandkarte/8_2_Gewaesser_Oekosysteme_erforschen.html
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

/* ---------- Inhalt: 8_2 Gewässer-Ökosysteme erforschen, 6 Stationen mit je 6 Aufgabenvorlagen ---------- */
const r2 = x => Math.round(x * 1000) / 1000;
const STATIONS = [
  {
    id: 'g1', nr: 1, title: 'Ökosystem und Flaschengarten', sub: 'Lebensraum, Lebewesen, Wechselwirkungen',
    items: [
      { id: 'g1-merkmale', topic: 'Merkmale eines Ökosystems', make() {
        return mc('Welche drei Hauptmerkmale hat ein Ökosystem?', ['Lebensraum, Lebewesen und Wechselwirkungen.', 'Nur Pflanzen, Tiere und Pilze.', 'Boden, Luft und Wasser, ohne Lebewesen.', 'Nur Tiere und ihre Nahrung.'],
          'Ein Ökosystem besteht aus dem Lebensraum (unbelebte Faktoren), den Lebewesen (belebte Faktoren) und den Wechselwirkungen zwischen beiden. Auch vom Menschen gemachte Systeme wie Städte oder Äcker sind Ökosysteme.');
      } },
      { id: 'g1-faktoren', topic: 'Belebte und unbelebte Faktoren', make() {
        return mc('Welche Aussage ist richtig?', ['Licht, Temperatur und Wasser sind unbelebte Faktoren. Pflanzen und Tiere sind belebte Faktoren.', 'Licht ist ein belebter Faktor.', 'Tiere sind unbelebte Faktoren.', 'Es gibt nur belebte Faktoren.'],
          'Unbelebte (abiotische) Faktoren sind zum Beispiel Licht, Temperatur und Wasser. Belebte (biotische) Faktoren sind die Lebewesen.');
      } },
      { id: 'g1-rollen', topic: 'Produzenten, Konsumenten, Destruenten', make() {
        return mc('Welche Aufgabe haben Destruenten in einem Ökosystem?', ['Sie bauen Abgestorbenes ab. Mikroorganismen wandeln einen grossen Teil in Kohlenstoffdioxid und Wasser um.', 'Sie stellen aus Licht Nährstoffe her.', 'Sie fressen nur lebende Tiere.', 'Sie haben keine Aufgabe.'],
          'Produzenten (Pflanzen, Algen) stellen Nährstoffe her. Konsumenten fressen andere Lebewesen. Destruenten bauen Abgestorbenes ab und führen Stoffe in den Kreislauf zurück.');
      } },
      { id: 'g1-energie', topic: 'Stoffkreislauf und Energie', make() {
        return mc('Was gilt für Stoffe und Energie in einem Ökosystem?', ['Stoffe laufen im Kreislauf. Energie fliesst in einer Einbahnstrasse: Ein grosser Teil wird zu thermischer Energie und ist für Lebewesen nicht mehr nutzbar.', 'Energie wird wie Stoffe immer wieder recycelt.', 'Stoffe gehen im Ökosystem verloren, Energie nicht.', 'Beides wird immer wieder neu erzeugt.'],
          'Das ist eine häufige Fehlvorstellung: Energie ist kein Stoff und kann nicht recycelt werden. Sie wird in thermische Energie umgewandelt und geht dem System als nutzbare Energie verloren.');
      } },
      { id: 'g1-flasche', topic: 'Flaschengarten als System', make() {
        return mc('Der Flaschengarten ist ein geschlossenes System. Was bedeutet das?', ['Es findet nur Energieaustausch mit der Umgebung statt, aber kein Stoffaustausch.', 'Es findet weder Stoff- noch Energieaustausch statt.', 'Es findet nur Stoffaustausch statt.', 'Es findet Stoff- und Energieaustausch statt.'],
          'Licht (Energie) gelangt durch das Glas hinein, Stoffe bleiben im Gefäss. Natürliche Ökosysteme sind meistens offene Systeme, die mit der Umgebung Stoffe und Energie austauschen.');
      } },
      { id: 'g1-erde', topic: 'Erde im Flaschengarten', ext: true, make() {
        const v = rnd([1, 1.5, 2, 3, 4]), e = v / 2;
        return num(`Ein Glas für einen Flaschengarten fasst ${fmt(v)} Liter. Höchstens die Hälfte soll mit Erde gefüllt werden, damit genug Luft bleibt. Wie viele Liter Erde sind das höchstens?`, 'Liter', e, 'Die Hälfte des Volumens ist die Erde.', `${fmt(v)} L : 2 = ${fmt(e)} L`);
      } }
    ]
  },
  {
    id: 'g2', nr: 2, title: 'Weiher und Nahrungsnetz', sub: 'Wer frisst wen?',
    items: [
      { id: 'g2-netz', topic: 'Nahrungsnetz statt Nahrungskette', make() {
        return mc('Warum spricht man besser von einem Nahrungsnetz als von einer Nahrungskette?', ['Weil die Nahrungsbeziehungen vielfach vernetzt sind und dadurch stabiler sind als eine lineare Kette.', 'Weil Tiere nur eine einzige Nahrung fressen.', 'Weil Ketten nur im Wasser vorkommen.', 'Weil Netze kleiner sind.'],
          'Eine Kette stellt Nahrungsbeziehungen zu einfach und linear dar. In Wirklichkeit fressen die meisten Tiere mehrere Arten und werden von mehreren gefressen.');
      } },
      { id: 'g2-amphibien', topic: 'Amphibien', make() {
        return mc('Leben Frösche, Kröten und Molche immer im Wasser?', ['Nein. Die meisten leben meist in feuchter Umgebung und gehen im Frühling zum Laichen ans Wasser. Nur die Grünfrösche leben meist im Wasser.', 'Ja, alle Amphibien leben immer im Wasser.', 'Nein, sie leben nie im Wasser.', 'Ja, aber nur im Winter.'],
          'Eine verbreitete Vorstellung ist, dass Amphibien immer im Wasser leben. Viele Arten halten sich ausserhalb der Laichzeit zum Beispiel im Laub des Waldes oder in feuchten Wiesen auf.');
      } },
      { id: 'g2-bio', topic: 'Biodiversität', make() {
        return mc('Was bedeutet Biodiversität und warum ist sie wichtig?', ['Biodiversität ist die Vielfalt des Lebens. Je grösser sie ist, desto stabiler ist ein Ökosystem in der Regel.', 'Biodiversität bedeutet, dass es nur eine Art gibt.', 'Je kleiner die Vielfalt, desto stabiler das System.', 'Sie ist nur für Tiere wichtig.'],
          'Mit vielen Arten gibt es viele Nahrungsbeziehungen. Fällt eine Art aus, können andere ihre Aufgabe oft übernehmen. Die Vielfalt macht ein Ökosystem widerstandsfähiger.');
      } },
      { id: 'g2-exkursion', topic: 'Verhalten am Weiher', make() {
        return mc('Wie verhältst du dich bei einer Weiher-Exkursion?', ['Zuerst nur beobachten, Tiere nur kurz in einer flachen Schale untersuchen und behutsam behandeln.', 'Möglichst viele Tiere fangen und mitnehmen.', 'Laut sein, damit die Tiere herauskommen.', 'Alles niedertreten, um besser zu sehen.'],
          'Ruhiges Verhalten und Geduld führen zu mehr Beobachtungserfolg. Wer Amphibien berühren möchte, trägt zum Wohl der Tiere Plastikhandschuhe.');
      } },
      { id: 'g2-sicher', topic: 'Sicherheit am Wasser', make() {
        return mc('Was ist bei einem Besuch an einem Gewässer sicherheitsrelevant?', ['Je nach Grösse und Tiefe muss eine Lehrperson oder Begleitperson eine Rettungsschwimmer-Ausbildung haben.', 'Nichts, Gewässer sind immer ungefährlich.', 'Man darf nur allein hingehen.', 'Man muss ins Wasser springen.'],
          'Weiher und Bäche können gefährlich sein. Die Aufsichtsperson muss Rettungsmassnahmen beherrschen. Halte dich an die Anweisungen.');
      } },
      { id: 'g2-arten', topic: 'Artenvielfalt vergleichen', ext: true, make() {
        const s = rnd([[12, 20], [8, 15], [10, 24], [15, 18], [6, 14]]), d = s[1] - s[0];
        return num(`In einem naturnahen Weiher findest du ${fmt(s[1])} verschiedene Arten, in einem verbauten Weiher ${fmt(s[0])} Arten. Wie viele Arten mehr hat der naturnahe Weiher?`, 'Arten', d, 'Ziehe die kleinere Zahl von der grösseren ab.', `${fmt(s[1])} − ${fmt(s[0])} = ${fmt(d)} Arten mehr`);
      } }
    ]
  },
  {
    id: 'g3', nr: 3, title: 'Unsichtbares im Wasser', sub: 'Nährstoffe, Mikroverunreinigungen, Trübung',
    items: [
      { id: 'g3-klar', topic: 'Klares Wasser', make() {
        return mc('Ist klares Wasser automatisch gutes Trinkwasser?', ['Nein. Viele Inhaltsstoffe sind unsichtbar. Klares Wasser kann belastet sein, und trübes Wasser ist nicht zwingend schlecht.', 'Ja, was klar ist, ist immer sauber.', 'Ja, aber nur bei Quellwasser.', 'Nein, aber trübes Wasser ist immer giftig.'],
          'Eine Trübung kann durch harmlose Schwebstoffe (zum Beispiel nach Erosion) entstehen. Braunes Moorwasser ist oft unbedenklich. Gefährliche Stoffe sind oft unsichtbar.');
      } },
      { id: 'g3-naehr', topic: 'Nährstoffe', make() {
        return mc('Was sind Nährstoffe im Wasser und wann werden sie zum Problem?', ['Mineralsalze wie Nitrat. Zu viel davon, zum Beispiel durch Dünger, belastet Gewässer.', 'Nur Zucker. Sie sind nie ein Problem.', 'Giftstoffe aus Fabriken.', 'Sie kommen im Wasser nicht vor.'],
          'Pflanzen und Algen brauchen Nährstoffe. Gelangt zu viel davon ins Wasser (Überdüngung), wachsen Algen übermässig und das Gewässer kann kippen.');
      } },
      { id: 'g3-mikro', topic: 'Mikroverunreinigungen', make() {
        return mc('Was sind Mikroverunreinigungen?', ['Kleinste Mengen von Stoffen wie Medikamenten oder Pflanzenschutzmitteln im Wasser.', 'Grosse Steine im Bach.', 'Sichtbarer Schlamm.', 'Algen an der Oberfläche.'],
          'Mikroverunreinigungen sind unsichtbar und kommen in sehr kleinen Mengen vor. Sie gelangen zum Beispiel aus Medikamenten und aus der Landwirtschaft ins Wasser.');
      } },
      { id: 'g3-truebung', topic: 'Trübung', make() {
        return mc('Woher kann eine Trübung im Wasser kommen?', ['Von zermahlenen Steinen oder von Bakterien und Algen.', 'Nur von Öl.', 'Nur von Fischen.', 'Trübung kommt nie vor.'],
          'Trübes Wasser kann Schwebstoffe aus Gestein enthalten, aber auch Bakterien und Algen. Man braucht Messungen, um die Qualität zu beurteilen.');
      } },
      { id: 'g3-krabbel', topic: 'Krabbeltiere als Zeiger', make() {
        return mc('Du entdeckst Insektenlarven und andere Krabbeltiere im Bach und findest das ekelhaft. Was sagt das über das Wasser?', ['Oft sind gerade sie Zeigerarten für gute Wasserqualität.', 'Das Wasser ist immer verschmutzt.', 'Das Wasser ist immer vergiftet.', 'Es sagt gar nichts.'],
          'Viele dieser Tiere brauchen sauberes, sauerstoffreiches Wasser. Darum zeigen sie, dass das Gewässer in einem guten Zustand ist.');
      } },
      { id: 'g3-wirkung', topic: 'Wirkungsdiagramm', make() {
        return mc('In einem Wirkungsdiagramm steht zwischen «Pestizide» und «Insektenlarven» ein Minuszeichen. Was bedeutet das?', ['Je mehr Pestizide, desto weniger Insektenlarven.', 'Je mehr Pestizide, desto mehr Insektenlarven.', 'Beide hängen nicht zusammen.', 'Es gibt keine Insektenlarven.'],
          'Ein Pluszeichen bedeutet «je mehr, desto mehr». Ein Minuszeichen bedeutet «je mehr, desto weniger».');
      } }
    ]
  },
  {
    id: 'g4', nr: 4, title: 'Bäche und Selbstreinigung', sub: 'Leitorganismen und Fliessgewässer',
    items: [
      { id: 'g4-leit', topic: 'Leitorganismen', make() {
        return mc('Was sind Leitorganismen?', ['Tiere, deren Vorkommen etwas über die Wasserqualität verrät (Zeigerorganismen, Bioindikatoren).', 'Tiere, die den Bach lenken.', 'Pflanzen, die Wasser reinigen.', 'Tiere, die nur nachts leben.'],
          'Manche Arten vertragen nur sauberes Wasser, andere kommen auch mit Verschmutzung zurecht. Wer weiss, welche Arten wo vorkommen, kann die Wasserqualität einschätzen.');
      } },
      { id: 'g4-gefaelle', topic: 'Gefälle', make() {
        const s = rnd([[100, 2], [60, 3], [150, 5], [80, 2], [200, 4]]), g = s[0] / s[1];
        return num(`Ein Bach fällt auf einer Strecke von ${fmt(s[1])} km um ${fmt(s[0])} m. Wie gross ist das Gefälle in Metern pro Kilometer?`, 'm/km', g, 'Teile den Höhenunterschied durch die Strecke.', `${fmt(s[0])} m : ${fmt(s[1])} km = ${fmt(g)} m/km`);
      } },
      { id: 'g4-gefaelle2', topic: 'Gefälle und Strömung', make() {
        return mc('Wie hängen Gefälle und Fliessgeschwindigkeit zusammen?', ['Je grösser das Gefälle, desto schneller fliesst der Bach in der Regel.', 'Je grösser das Gefälle, desto langsamer fliesst er.', 'Das Gefälle hat keinen Einfluss.', 'Nur die Breite zählt.'],
          'Im steilen Oberlauf fliesst das Wasser schnell und nimmt viel Sauerstoff auf. Im flachen Unterlauf fliesst es langsamer.');
      } },
      { id: 'g4-selbst', topic: 'Selbstreinigung', make() {
        return mc('Was braucht ein Bach, damit er sich selbst reinigen kann?', ['Ein möglichst naturnahes Flussbett sowie intakte Pflanzen und Tiere.', 'Einen betonierten Kanal.', 'Möglichst viel Abwasser.', 'Keine Lebewesen.'],
          'Selbstreinigung leisten Lebewesen, vor allem Mikroorganismen. Ein naturnahes Bett mit Steinen und Pflanzen bietet ihnen Lebensraum und bremst die Strömung.');
      } },
      { id: 'g4-abwasser', topic: 'Abwasser im Bach', make() {
        return mc('Nach einer Abwassereinleitung sinkt im Bach zuerst der Sauerstoffgehalt. Was ist der Grund?', ['Mikroorganismen bauen die Stoffe ab und brauchen dabei viel Sauerstoff.', 'Das Abwasser enthält reinen Sauerstoff.', 'Die Fische atmen weniger.', 'Der Bach wird kälter.'],
          'Der Abbau der Nährstoffe verbraucht Sauerstoff. Weiter unten im Bach erholt sich der Gehalt wieder, wenn die Belastung abgebaut ist.');
      } },
      { id: 'g4-pflanzen', topic: 'Was Pflanzen aufnehmen', make() {
        return mc('Woher nehmen Pflanzen den grössten Teil ihrer Baustoffe?', ['Als Kohlenstoffdioxid aus der Luft (bei Wasserpflanzen aus dem Wasser).', 'Fast nur aus dem Boden über die Wurzeln.', 'Aus dem Licht allein.', 'Aus den Tieren.'],
          'Viele glauben, Pflanzen würden ihre Baustoffe hauptsächlich über die Wurzeln aufnehmen. Der Kohlenstoff stammt aber aus dem Kohlenstoffdioxid.');
      } }
    ]
  },
  {
    id: 'g5', nr: 5, title: 'Fliessgewässer untersuchen', sub: 'Daten sammeln und auswerten',
    items: [
      { id: 'g5-faktoren', topic: 'Abiotisch oder biotisch', make() {
        return mc('Welche Aussage zu Messgrössen am Bach ist richtig?', ['Strömungsgeschwindigkeit und Wassertemperatur sind abiotische Faktoren. Leitorganismen sind biotische Faktoren.', 'Die Wassertemperatur ist ein biotischer Faktor.', 'Leitorganismen sind abiotisch.', 'Alle Faktoren sind biotisch.'],
          'Abiotische Faktoren sind unbelebt (Temperatur, Strömung, pH-Wert, Sauerstoff). Biotische Faktoren betreffen die Lebewesen, zum Beispiel Leitorganismen wie Eintagsfliegenlarven.');
      } },
      { id: 'g5-steine', topic: 'Wo findest du Leitorganismen?', make() {
        return mc('Wo suchst du Leitorganismen im Bach am besten?', ['Unter und zwischen Steinen, denn viele leben versteckt wegen der Strömung.', 'Frei schwimmend in der Mitte.', 'Auf der Wasseroberfläche.', 'Nur in der Luft darüber.'],
          'In Fliessgewässern halten sich viele Kleintiere unter Steinen auf. Ein Netz fängt deshalb nur einen Teil.');
      } },
      { id: 'g5-mehrmals', topic: 'Mehrmals messen', make() {
        return mc('Warum misst du an einem Bach mehrmals und systematisch?', ['Weil einzelne Messungen ungenau sein können und sich mit mehreren Messungen zuverlässigere Werte ergeben.', 'Weil es mehr Spass macht.', 'Weil eine Messung nie genügt, ohne Grund.', 'Weil Messgeräte sonst kaputtgehen.'],
          'Eine einzelne Messung kann zufällig abweichen. Mehrere Messungen an verschiedenen Stellen zeigen, wie genau die Werte sind.');
      } },
      { id: 'g5-ph', topic: 'pH-Wert mit Papier', make() {
        return mc('Du bestimmst den pH-Wert mit pH-Papier. Warum ist ein Mittelwert hier nicht sinnvoll?', ['Das Papier zeigt nur grobe Stufen. Besser ist es, den besten Wert zu bestimmen, der am häufigsten oder am genauesten abgelesen wurde.', 'Weil man pH-Werte nie berechnen darf.', 'Weil das Papier alle Werte gleich zeigt.', 'Mittelwerte sind immer falsch.'],
          'pH-Papier hat eine grobe Skala. Ein Mittelwert würde eine Genauigkeit vortäuschen, die das Messverfahren gar nicht hat.');
      } },
      { id: 'g5-tempo', topic: 'Fliessgeschwindigkeit', make() {
        const t = rnd([20, 10, 25, 5, 40, 8]), v = r2(10 / t);
        return num(`Ein Schwimmkörper legt auf dem Bach 10 m in ${fmt(t)} s zurück. Wie gross ist die Fliessgeschwindigkeit?`, 'm/s', v, 'Geschwindigkeit = Strecke : Zeit', `v = 10 m : ${fmt(t)} s = ${fmt(v)} m/s`);
      } },
      { id: 'g5-mittel', topic: 'Mittelwert von Messungen', ext: true, make() {
        const s = rnd([[10, 12, 14], [11, 12, 13], [8, 9, 13], [15, 16, 17], [9, 12, 12]]), m = r2((s[0] + s[1] + s[2]) / 3);
        return num(`Du misst an drei Stellen im Bach die Wassertemperatur: ${fmt(s[0])} °C, ${fmt(s[1])} °C und ${fmt(s[2])} °C. Wie gross ist der Mittelwert?`, '°C', m, 'Addiere die drei Werte und teile durch 3.', `(${fmt(s[0])} + ${fmt(s[1])} + ${fmt(s[2])}) : 3 = ${fmt(m)} °C`);
      } }
    ]
  },
  {
    id: 'g6', nr: 6, title: 'Menschen und Gewässer', sub: 'Renaturierung, Überdüngung, Trinkwasser',
    items: [
      { id: 'g6-renat', topic: 'Renaturierung', make() {
        return mc('Welchen Nutzen hat die Renaturierung eines verbauten Bachs?', ['Sie verbessert die Selbstreinigung, hilft gegen Hochwasser und erhöht die Biodiversität.', 'Sie nützt nur den Tieren.', 'Sie macht den Bach schneller.', 'Sie hat nur Nachteile.'],
          'Umweltschutz ist auch Menschenschutz: Ein naturnaher Bach kann Hochwasser besser aufnehmen und reinigt sich besser. Nachteile wie der Platzbedarf müssen mitbedacht werden.');
      } },
      { id: 'g6-kippt', topic: 'Wenn ein See kippt', make() {
        return mc('Wie läuft die Wirkungskette beim Kippen eines Sees ab?', ['Zu viele Nährstoffe, starkes Algenwachstum, Algen sterben ab, der Abbau verbraucht Sauerstoff, Fische sterben.', 'Zu wenig Nährstoffe, die Algen verschwinden, der See wird klarer, alles ist gut.', 'Mehr Sauerstoff, mehr Fische, weniger Algen.', 'Der See friert immer zu.'],
          'Überdüngung führt zu Sauerstoffmangel beim Abbau abgestorbener Algen. Dahinter steckt meist ein Zuviel an Nährstoffen, nicht nur industrielle Gifte.');
      } },
      { id: 'g6-virt', topic: 'Virtuelles Wasser', make() {
        return mc('Was ist virtuelles Wasser?', ['Wasser, das wir durch unseren Konsum indirekt verwenden, zum Beispiel bei der Herstellung von Produkten.', 'Wasser aus dem Computer.', 'Wasser, das aus dem Hahn kommt.', 'Wasser, das verdunstet.'],
          'In vielen Produkten steckt viel Wasser, das bei der Herstellung gebraucht wurde. Es kommt nicht aus deinem Wasserhahn, gehört aber zu deinem Wasserverbrauch.');
      } },
      { id: 'g6-nutzen', topic: 'Wasser nutzen statt verbrauchen', make() {
        return mc('Warum ist «Wasser nutzen» besser als «Wasser verbrauchen»?', ['Weil Wasser bei der Nutzung fast nie verloren geht. Es durchläuft den Wasserkreislauf.', 'Weil Wasser immer verschwindet.', 'Weil es kein Wasser gibt.', 'Weil man Wasser nie nutzen kann.'],
          'Wasser wird nach der Nutzung nicht chemisch zerstört. Es ist aber vielleicht nicht mehr als Trinkwasser nutzbar und kann regional trotzdem knapp werden.');
      } },
      { id: 'g6-woche', topic: 'Wassernutzung berechnen', make() {
        const l = rnd([200, 300, 350, 400, 450, 500]), w = l * 7;
        return num(`Eine Familie nutzt in einem Beispiel ${fmt(l)} Liter Wasser pro Tag. Wie viele Liter sind das in einer Woche?`, 'Liter', w, 'Eine Woche hat 7 Tage.', `${fmt(l)} L · 7 = ${fmt(w)} L`);
      } },
      { id: 'g6-zehntel', topic: 'Zugang zu Trinkwasser', ext: true, make() {
        const n = rnd([80, 500, 2000, 5000, 120, 60]), z = r2(n / 10);
        return num(`Weltweit hat etwa jede zehnte Person keinen Zugang zu Trinkwasser. Wie viele von ${fmt(n)} Personen wären das ungefähr?`, 'Personen', z, 'Ein Zehntel ist die Zahl geteilt durch 10.', `${fmt(n)} : 10 = ${fmt(z)}`);
      } }
    ]
  }
];

/* ---------- Lerninhalt ---------- */
const merk = h => `<div class="merk"><span class="mk" aria-hidden="true">\u2605</span><div>${h}</div></div>`;
const warnbox = h => `<div class="merk warn"><span class="mk" aria-hidden="true">!</span><div>${h}</div></div>`;

const LESSONS = {
  g1: [
    { h: 'Was ist ein Ökosystem?',
      body: `<p>Ein Ökosystem hat drei Hauptmerkmale:</p>
        ${merk('<b>Lebensraum</b> (unbelebte Faktoren) + <b>Lebewesen</b> (belebte Faktoren) + <b>Wechselwirkungen</b> (Stoff- und Energieflüsse)')}
        <p>Auch vom Menschen gemachte Systeme wie Städte und Äcker sind Ökosysteme.</p>` },
    { h: 'Belebt oder unbelebt?',
      body: '<p>Tippe, ob es sich um einen unbelebten oder einen belebten Faktor handelt.</p>', sim: 'oeko' },
    { h: 'Produzenten, Konsumenten, Destruenten',
      body: `<ul><li><b>Produzenten:</b> stellen mit Licht Nährstoffe her (Pflanzen, Algen).</li>
        <li><b>Konsumenten:</b> fressen andere Lebewesen.</li>
        <li><b>Destruenten:</b> bauen Abgestorbenes ab (Mikroorganismen wandeln viel davon in Kohlenstoffdioxid und Wasser um).</li></ul>
        ${merk('<b>Stoffe</b> laufen im Kreislauf. <b>Energie</b> fliesst in einer Einbahnstrasse und wird grösstenteils zu nicht mehr nutzbarer thermischer Energie.')}` },
    { h: 'Wer ist was?',
      body: '<p>Ordne die Lebewesen einer Rolle zu.</p>', sim: 'rollen' },
    { h: 'Der Flaschengarten',
      body: `<p>Im Flaschengarten legst du ein Ökosystem im Kleinen an. Er ist ein <b>geschlossenes System</b>: Nur Energie (Licht) kommt hinein, Stoffe bleiben drin.</p>
        <p>Probiere aus, wie die Einstellungen das Gedeihen verändern. Das ist ein Modell mit Beispielwerten.</p>`, sim: 'flasche' },
    { h: 'Vorgerechnet: Erde im Glas', worked: {
      given: 'Ein Glas für einen Flaschengarten fasst 3 Liter. Höchstens die Hälfte soll mit Erde gefüllt werden. Wie viel Erde ist das höchstens?',
      steps: [['Regel', 'Höchstens die Hälfte, damit genug Luft für die Kreisläufe bleibt.'], ['Rechnung', '3 L : 2 = 1,5 L'], ['Antwort', 'Höchstens 1,5 Liter Erde. Ganz unten kommt eine Kiesschicht, damit der Boden nicht dauernd durchnässt ist.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was ist ein Flaschengarten?',
        options: ['Ein geschlossenes System: Energie kann hinein, Stoffe bleiben im Gefäss.', 'Ein offenes System, in dem Stoffe ständig ausgetauscht werden.', 'Ein System ohne Energie.', 'Ein Garten mit Wasserhahn.'],
        explain: 'Licht gelangt durch das Glas. Stoffe zirkulieren innen. Natürliche Ökosysteme sind meistens offene Systeme.' } }
  ],
  g2: [
    { h: 'Das Nahrungsnetz im Weiher',
      body: `<p>In einem Weiher leben Produzenten (Algen, Wasserpflanzen), Konsumenten (Wasserflöhe, Libellenlarven, Fische) und Destruenten.</p>
        ${merk('Sage <b>Nahrungsnetz</b> statt Nahrungskette: Fast alle Tiere fressen mehrere Arten und werden von mehreren gefressen.')}` },
    { h: 'Was passiert, wenn eine Art fehlt?',
      body: '<p>Tippe auf ein Lebewesen, um es aussterben zu lassen. Du siehst, wer Nahrung verliert. Das Netz ist vereinfacht.</p>', sim: 'netz' },
    { h: 'Biodiversität',
      body: `${merk('<b>Biodiversität</b> ist die Vielfalt des Lebens. Je grösser sie ist, desto stabiler ist ein Ökosystem in der Regel.')}
        <p>Viele Amphibien leben nicht immer im Wasser. Sie wandern im Frühjahr zum Laichen zu den Gewässern. Nur Grünfrösche bleiben meist im Wasser.</p>` },
    { h: 'Am Weiher',
      body: `<ul><li>Zuerst nur beobachten, noch keine Tiere fangen.</li>
        <li>Ruhig bleiben, nicht alles niedertreten.</li>
        <li>Tiere nur kurz in einer flachen Schale untersuchen und behutsam behandeln.</li>
        <li>Amphibien nur mit Plastikhandschuhen berühren.</li></ul>
        ${warnbox('<b>Sicherheit:</b> Je nach Grösse und Tiefe braucht es eine Aufsichtsperson mit Rettungsschwimmer-Ausbildung.')}` },
    { h: 'Vorgerechnet: Artenvielfalt', worked: {
      given: 'Im naturnahen Weiher findest du 20 Arten, im verbauten Weiher 12 Arten. Wie gross ist der Unterschied?',
      steps: [['Rechnung', '20 − 12 = 8'], ['Antwort', 'Der naturnahe Weiher hat 8 Arten mehr. Er hat die grössere Biodiversität und ist darum in der Regel stabiler.']] } },
    { h: 'Kurz testen',
      check: { q: 'Warum ist eine hohe Biodiversität gut für ein Ökosystem?',
        options: ['Weil bei vielen Arten ein Ausfall besser ausgeglichen werden kann.', 'Weil viele Arten viel Platz brauchen.', 'Weil dann niemand mehr gefressen wird.', 'Weil Tiere dann nicht mehr fressen.'],
        explain: 'Viele Nahrungsbeziehungen machen das Netz widerstandsfähiger. Fällt eine Art aus, können andere ihre Rolle teilweise übernehmen.' } }
  ],
  g3: [
    { h: 'Klar heisst nicht sauber',
      body: `<p>Viele Inhaltsstoffe im Wasser sind <b>unsichtbar</b>. Klares Wasser kann belastet sein. Trübes Wasser ist nicht zwingend schlecht: Eine Trübung kommt oft von harmlosen Schwebstoffen oder von Moorwasser (braun, aber unbedenklich).</p>
        <p>Auch Quellwasser ist nicht automatisch das beste Trinkwasser. Seine Qualität hängt vom Boden und von der Nutzung der Umgebung ab.</p>` },
    { h: 'Nährstoffe, Mikroverunreinigungen, Trübung',
      body: `<ul><li><b>Nährstoffe</b> (Mineralsalze wie Nitrat): kommen zum Beispiel aus Dünger.</li>
        <li><b>Mikroverunreinigungen:</b> kleinste Mengen von Medikamenten, Pflanzenschutzmitteln und so weiter.</li>
        <li><b>Trübung:</b> zermahlene Steine, Bakterien oder Algen.</li></ul>
        ${merk('Insektenlarven und andere Krabbeltiere sind oft <b>Zeiger</b> für gute Wasserqualität.')}` },
    { h: 'Wirkungsdiagramm',
      body: `<p>Mit einem Wirkungsdiagramm zeigst du Zusammenhänge:</p>
        ${merk('<b>+</b> bedeutet «je mehr, desto mehr».<br><b>−</b> bedeutet «je mehr, desto weniger».')}
        <p>Beispiel: Intensive Landwirtschaft → (+) Nährstoffe im Wasser → (+) Algen → (−) Sauerstoff.</p>` },
    { h: 'Beispiel durchdacht: Welches Glas?', worked: {
      given: 'Drei Gläser stehen vor dir: klar, leicht trüb und braun gefärbt. Aus welchem würdest du trinken?',
      steps: [['Aussehen reicht nicht', 'Das Aussehen sagt wenig über unsichtbare Stoffe.'], ['Mögliche Gründe', 'Trübung: harmlose Schwebstoffe. Braun: vielleicht Moorwasser. Klar: kann trotzdem belastet sein.'], ['Antwort', 'Ohne Messung oder Aufbereitung lässt sich das nicht beurteilen. Klar bedeutet nicht sicher.']] } },
    { h: 'Kurz testen',
      check: { q: 'Welche Aussage über Wasserqualität stimmt?',
        options: ['Man kann sie nicht allein am Aussehen erkennen.', 'Klares Wasser ist immer sauber.', 'Braunes Wasser ist immer giftig.', 'Wasser mit Larven ist immer schlecht.'],
        explain: 'Viele wichtige Stoffe sind unsichtbar. Darum misst man und nutzt Leitorganismen.' } }
  ],
  g4: [
    { h: 'Leitorganismen',
      body: `<p>Manche Wassertiere zeigen mit ihrem Vorkommen, wie gut das Wasser ist. Man nennt sie <b>Leitorganismen</b>, Zeigerorganismen oder Bioindikatoren.</p>
        <p>Viele Larven von Eintags-, Stein- und Köcherfliegen brauchen sauberes, sauerstoffreiches Wasser. Sie zeigen deshalb gute Qualität an.</p>` },
    { h: 'Gefälle, Sauerstoff, Nährstoffe',
      body: `<ul><li>Je grösser das <b>Gefälle</b>, desto schneller fliesst ein Bach.</li>
        <li>Fliessendes Wasser nimmt viel <b>Sauerstoff</b> auf.</li>
        <li><b>Nährstoffe</b> nehmen im Verlauf zu, wenn Abwasser oder Dünger eingeleitet wird.</li></ul>
        <p>Pflanzen beziehen ihre Baustoffe zum grössten Teil aus Kohlenstoffdioxid, nicht aus dem Boden.</p>` },
    { h: 'Selbstreinigung im Bach',
      body: '<p>Bei km 3 wird Abwasser eingeleitet. Wandere am Bach entlang. Wähle einen naturnahen oder verbauten Bach und beobachte Nährstoffe und Sauerstoff. Das ist ein Modell mit Beispielwerten.</p>', sim: 'bach' },
    { h: 'Vorgerechnet: Gefälle', worked: {
      given: 'Ein Bach fällt auf 2 km um 100 m. Wie gross ist das Gefälle?',
      steps: [['Formel', 'Gefälle = Höhenunterschied : Strecke'], ['Rechnung', '100 m : 2 km = 50 m/km'], ['Antwort', 'Das Gefälle beträgt 50 m pro Kilometer. Der Bach fliesst relativ schnell.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was braucht ein Bach, damit er sich selbst reinigen kann?',
        options: ['Ein naturnahes Bett und intakte Lebewesen.', 'Mehr Beton.', 'Möglichst viel Abwasser.', 'Keine Pflanzen.'],
        explain: 'Selbstreinigung leisten Lebewesen, vor allem Mikroorganismen. Ein naturnahes Bett bietet ihnen Raum und bremst die Strömung.' } }
  ],
  g5: [
    { h: 'Daten am Bach sammeln',
      body: `<p>Bei einer Felduntersuchung sammelst du Daten über:</p>
        <ul><li><b>abiotische Faktoren:</b> Strömungsgeschwindigkeit, Wassertemperatur, pH-Wert, Sauerstoff, Nitrat.</li>
        <li><b>biotische Faktoren:</b> Leitorganismen wie Eintagsfliegenlarven.</li></ul>
        <p>Leitorganismen sitzen meist <b>unter Steinen</b>. Ein Netz allein genügt nicht.</p>
        ${warnbox('<b>Sicherheit:</b> Je nach Grösse, Tiefe und Strömung braucht die Aufsichtsperson eine Rettungsschwimmer-Ausbildung.')}` },
    { h: 'Mehrmals messen',
      body: `${merk('Miss <b>mehrmals</b> und <b>systematisch</b>. Vergleiche Ergebnisse und diskutiere die Messgenauigkeit.')}
        <p>Beim Mittelwert bildest du das arithmetische Mittel. Bei Messungen mit groben Skalen, zum Beispiel pH-Papier, gibst du besser den besten Wert an.</p>` },
    { h: 'Vorgerechnet: Fliessgeschwindigkeit', worked: {
      given: 'Ein Schwimmkörper legt auf dem Bach 10 m in 20 s zurück. Wie gross ist die Fliessgeschwindigkeit?',
      steps: [['Formel', 'v = s : t'], ['Rechnung', 'v = 10 m : 20 s = 0,5 m/s'], ['Antwort', 'Der Bach fliesst mit 0,5 m/s. Wiederhole die Messung mehrmals und bilde den Mittelwert.']] } },
    { h: 'Vorgerechnet: Mittelwert', worked: {
      given: 'Du misst an drei Stellen im Bach 10 °C, 12 °C und 14 °C. Wie gross ist der Mittelwert?',
      steps: [['Addieren', '10 + 12 + 14 = 36'], ['Teilen', '36 : 3 = 12'], ['Antwort', 'Der Mittelwert beträgt 12 °C.']] } },
    { h: 'Kurz testen',
      check: { q: 'Wo findest du Leitorganismen im Bach?',
        options: ['Meist unter und zwischen Steinen.', 'Frei schwimmend an der Oberfläche.', 'Nur im Netz.', 'Im Sand der Wiese.'],
        explain: 'Die Strömung zwingt viele Kleintiere, sich unter Steinen zu verstecken.' } }
  ],
  g6: [
    { h: 'Verbaut oder renaturiert',
      body: `<p>Früher wurden viele Bäche <b>kanalisiert</b>. Heute werden viele <b>renaturiert</b>. Renaturierung verbessert die Selbstreinigung, hilft gegen Hochwasser und erhöht die Biodiversität.</p>
        ${merk('<b>Umweltschutz ist auch Menschenschutz.</b> Vorteile und Nachteile sieht man je nach Sichtweise verschieden: Landwirtschaft, Trinkwasserversorgung, Badegäste.')}` },
    { h: 'Wenn ein See kippt',
      body: `<p>Gelangt zu viel Dünger in einen See, läuft eine <b>Kettenreaktion</b> ab:</p>
        <ol><li>Zu viele Nährstoffe</li><li>Algen wachsen stark</li><li>Algen sterben ab</li><li>Der Abbau verbraucht Sauerstoff</li><li>Fische sterben, der See «kippt»</li></ol>
        <p>Gegenmassnahmen setzen bei den Nährstoffen an, zum Beispiel weniger Dünger oder bessere Kläranlagen.</p>` },
    { h: 'Wasser und Trinkwasser',
      body: `<ul><li><b>Wasser wird nicht verbraucht, sondern genutzt.</b> Es durchläuft den Wasserkreislauf.</li>
        <li>Nur etwa 0,01 % der Wassermenge der Erde sind Wasser in Flüssen, Seen und Sümpfen.</li>
        <li>In der Schweiz stammen etwa 40 % des Trinkwassers aus Quellen. Der Rest kommt vor allem aus Grund- und Seewasser.</li>
        <li>Etwa jede zehnte Person weltweit hat keinen Zugang zu Trinkwasser.</li>
        <li><b>Virtuelles Wasser:</b> Wasser, das wir durch unseren Konsum indirekt verwenden.</li></ul>
        <p>Eine einfache Methode zur Trinkwasseraufbereitung ist <b>SODIS</b>: Klare Flaschen mit Wasser liegen sechs Stunden an der Sonne. Das UV-Licht tötet Krankheitserreger ab.</p>` },
    { h: 'Vorgerechnet: Wasserbedarf', worked: {
      given: 'Eine Familie nutzt in einem Beispiel 400 Liter Wasser pro Tag. Wie viele Liter sind das in einer Woche?',
      steps: [['Rechnung', '400 L · 7 = 2800 L'], ['Antwort', '2800 Liter pro Woche. Dazu kommt virtuelles Wasser, das in den gekauften Produkten steckt.']] } },
    { h: 'Kurz testen',
      check: { q: 'Was bedeutet virtuelles Wasser?',
        options: ['Wasser, das wir durch den Konsum von Produkten indirekt verwenden.', 'Wasser, das nur im Computer existiert.', 'Wasser aus dem Wasserhahn.', 'Wasser, das verdunstet.'],
        explain: 'Bei der Herstellung vieler Produkte wird viel Wasser gebraucht. Dieses Wasser nennt man virtuelles Wasser.' } }
  ]
};
const GOALS = {
  g1: ['die Merkmale eines Ökosystems nennen', 'Produzenten, Konsumenten und Destruenten unterscheiden'],
  g2: ['ein Nahrungsnetz beschreiben', 'Biodiversität erklären'],
  g3: ['unsichtbare Stoffe im Wasser nennen', 'Wirkungsdiagramme lesen'],
  g4: ['Leitorganismen und Selbstreinigung erklären', 'den Einfluss von Gefälle beschreiben'],
  g5: ['abiotische und biotische Daten unterscheiden', 'Messungen planen und auswerten'],
  g6: ['Renaturierung und Überdüngung beurteilen', 'Wassernutzung und Trinkwasser beschreiben']
};
const LEARN = {
  'g1-merkmale': 'Was ist ein Ökosystem?', 'g1-faktoren': 'Belebt oder unbelebt?', 'g1-rollen': 'Produzenten, Konsumenten, Destruenten', 'g1-energie': 'Produzenten, Konsumenten, Destruenten', 'g1-flasche': 'Der Flaschengarten', 'g1-erde': 'Vorgerechnet: Erde im Glas',
  'g2-netz': 'Das Nahrungsnetz im Weiher', 'g2-amphibien': 'Biodiversität', 'g2-bio': 'Biodiversität', 'g2-exkursion': 'Am Weiher', 'g2-sicher': 'Am Weiher', 'g2-arten': 'Vorgerechnet: Artenvielfalt',
  'g3-klar': 'Klar heisst nicht sauber', 'g3-naehr': 'Nährstoffe, Mikroverunreinigungen, Trübung', 'g3-mikro': 'Nährstoffe, Mikroverunreinigungen, Trübung', 'g3-truebung': 'Nährstoffe, Mikroverunreinigungen, Trübung', 'g3-krabbel': 'Nährstoffe, Mikroverunreinigungen, Trübung', 'g3-wirkung': 'Wirkungsdiagramm',
  'g4-leit': 'Leitorganismen', 'g4-gefaelle': 'Vorgerechnet: Gefälle', 'g4-gefaelle2': 'Gefälle, Sauerstoff, Nährstoffe', 'g4-selbst': 'Selbstreinigung im Bach', 'g4-abwasser': 'Selbstreinigung im Bach', 'g4-pflanzen': 'Gefälle, Sauerstoff, Nährstoffe',
  'g5-faktoren': 'Daten am Bach sammeln', 'g5-steine': 'Daten am Bach sammeln', 'g5-mehrmals': 'Mehrmals messen', 'g5-ph': 'Mehrmals messen', 'g5-tempo': 'Vorgerechnet: Fliessgeschwindigkeit', 'g5-mittel': 'Vorgerechnet: Mittelwert',
  'g6-renat': 'Verbaut oder renaturiert', 'g6-kippt': 'Wenn ein See kippt', 'g6-virt': 'Wasser und Trinkwasser', 'g6-nutzen': 'Wasser und Trinkwasser', 'g6-woche': 'Vorgerechnet: Wasserbedarf', 'g6-zehntel': 'Wasser und Trinkwasser'
};
STATIONS.forEach(s => {
  s.lesson = LESSONS[s.id]; s.goals = GOALS[s.id];
  s.items.forEach(t => { t.learn = LEARN[t.id]; if (!s.lesson.some(c => c.h === t.learn)) throw new Error('Lernkarte fehlt: ' + t.id); });
});

const LEVELS = [
  { xp: 0, name: 'Wassertropfen', pw: 'fängt klein an' },
  { xp: 80, name: 'Bach', pw: 'fliesst' },
  { xp: 200, name: 'Weiher', pw: 'blüht auf' },
  { xp: 380, name: 'See', pw: 'bleibt klar' },
  { xp: 620, name: 'Fluss', pw: 'verbindet' },
  { xp: 920, name: 'Ozean', pw: 'trägt alles' }
];

/* ---------- Thema: 8_2 Gewässer-Ökosysteme erforschen ---------- */
const TOPIC = {
  id: 'nt8-2', storeKey: 'halingen-nt8-2-v1', other: { title: '7_7 Chemische Reaktionen untersuchen', href: '7_7_Chemische_Reaktionen_untersuchen.html' },
  title: 'Gewässer-Ökosysteme erforschen', lead: 'Weiher, Bach und Trinkwasser', tag: 'Natur und Technik', cardName: 'Merkkarte',
  tips: ['Sage Nahrungsnetz statt Nahrungskette.', 'Klares Wasser ist nicht automatisch sauber.'],
  formulas: [
    ['Ökosystem', 'Lebensraum + Lebewesen', '+ Wechselwirkungen'],
    ['Rollen', 'Produzenten, Konsumenten', 'Destruenten'],
    ['Stoffe und Energie', 'Stoffe im Kreislauf', 'Energie: Einbahnstrasse'],
    ['Biodiversität', 'Vielfalt des Lebens', 'mehr Vielfalt, mehr Stabilität'],
    ['Leitorganismen', 'Zeigerarten', 'zeigen die Wasserqualität an'],
    ['Messen', 'mehrmals und systematisch', 'Mittelwert oder bester Wert']
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
  oeko(el) {
    sorter(el, [
      { t: 'Sonnenlicht', ok: ['un'], why: 'Licht ist ein unbelebter Faktor.' },
      { t: 'Wassertemperatur', ok: ['un'], why: 'Die Temperatur ist ein unbelebter Faktor.' },
      { t: 'Eine Libellenlarve', ok: ['be'], why: 'Tiere gehören zu den belebten Faktoren.' },
      { t: 'Die Strömung eines Bachs', ok: ['un'], why: 'Die Strömung gehört zum Lebensraum, sie ist unbelebt.' },
      { t: 'Algen im Weiher', ok: ['be'], why: 'Algen sind Lebewesen, und zwar Produzenten.' },
      { t: 'Bakterien im Boden', ok: ['be'], why: 'Bakterien sind Lebewesen, zum Beispiel Destruenten.' }
    ], { un: 'Unbelebt', be: 'Belebt' }, 'Ist es ein unbelebter oder belebter Faktor?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },
  rollen(el) {
    sorter(el, [
      { t: 'Wasserpflanze', ok: ['pr'], why: 'Pflanzen stellen mit Licht Nährstoffe her. Sie sind Produzenten.' },
      { t: 'Libellenlarve (frisst Wasserflöhe)', ok: ['ko'], why: 'Sie frisst andere Lebewesen. Sie ist Konsument.' },
      { t: 'Bakterien, die Laub abbauen', ok: ['de'], why: 'Sie bauen Abgestorbenes ab. Sie sind Destruenten.' },
      { t: 'Algen', ok: ['pr'], why: 'Algen betreiben Fotosynthese und sind Produzenten.' },
      { t: 'Hecht', ok: ['ko'], why: 'Der Hecht frisst andere Tiere. Er ist Konsument.' },
      { t: 'Pilze, die Totholz zersetzen', ok: ['de'], why: 'Sie zersetzen Abgestorbenes. Sie sind Destruenten.' }
    ], { pr: 'Produzent', ko: 'Konsument', de: 'Destruent' }, 'Welche Rolle hat das Lebewesen?', 'Du kannst unten mit «Weiter» zur nächsten Karte.');
  },

  netz(el) {
    const O = {
      alg: { n: 'Algen', eats: [] }, pfl: { n: 'Wasserpflanze', eats: [] },
      flo: { n: 'Wasserfloh', eats: ['alg'] }, sch: { n: 'Schnecke', eats: ['alg', 'pfl'] },
      lib: { n: 'Libellenlarve', eats: ['flo', 'sch'] }, fis: { n: 'Fisch', eats: ['flo', 'sch', 'lib'] },
      rei: { n: 'Reiher', eats: ['fis'] }
    };
    el.innerHTML = `<div class="sim"><div class="gbtns" id="nb">${Object.keys(O).map(k => `<button class="btn sm" data-o="${k}" aria-pressed="false">${O[k].n}</button>`).join('')}</div>
      <p class="readout" id="ro" aria-live="polite"></p><button class="btn sm" id="nr">Zurücksetzen</button></div>`;
    const gone = new Set();
    function upd() {
      // Kaskade: ein Konsument ohne Nahrung stirbt ebenfalls
      const dead = new Set(gone); let ch = true;
      while (ch) { ch = false; Object.keys(O).forEach(k => { if (!dead.has(k) && O[k].eats.length && O[k].eats.every(x => dead.has(x))) { dead.add(k); ch = true; } }); }
      el.querySelectorAll('[data-o]').forEach(b => { const k = b.dataset.o; b.classList.toggle('bad', dead.has(k)); b.classList.toggle('good', !dead.has(k) && O[k].eats.length > 0 && O[k].eats.some(x => dead.has(x))); b.setAttribute('aria-pressed', String(gone.has(k))); });
      const hurt = Object.keys(O).filter(k => !dead.has(k) && O[k].eats.some(x => dead.has(x))).map(k => O[k].n);
      const auto = [...dead].filter(k => !gone.has(k)).map(k => O[k].n);
      $id('ro').innerHTML = !gone.size ? 'Tippe auf ein Lebewesen, um es aussterben zu lassen. Rot = ausgestorben, grün = verliert Nahrung.'
        : `Ausgestorben: <b>${[...gone].map(k => O[k].n).join(', ')}</b>.<br>${auto.length ? 'Verlieren alle Nahrung und sterben ebenfalls: <b>' + auto.join(', ') + '</b>.<br>' : ''}${hurt.length ? 'Verlieren eine Nahrungsquelle: ' + hurt.join(', ') + '.' : 'Alle anderen haben noch Nahrung.'}<br>Je vernetzter das Netz, desto stabiler (Modell).`;
    }
    el.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', () => { const k = b.dataset.o; if (gone.has(k)) gone.delete(k); else gone.add(k); upd(); }));
    $id('nr').addEventListener('click', () => { gone.clear(); upd(); });
    upd();
  },

  bach(el) {
    el.innerHTML = `<div class="sim"><div class="seg3" role="group" aria-label="Bachtyp"><button class="btn sm on" data-t="n">Naturnaher Bach</button><button class="btn sm" data-t="v">Verbauter Bach</button></div>
      ${sl('bk', 'Ort am Bach', 0, 10, 1, 0, 'km')}
      <div class="brow"><span class="bname">Nährstoffe</span><div class="btrack"><div class="bfill th" id="bn"></div></div><b class="mono bval" id="vn"></b></div>
      <div class="brow"><span class="bname">Sauerstoff</span><div class="btrack"><div class="bfill" id="bo"></div></div><b class="mono bval" id="vo"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    let t = 'n';
    function upd() {
      const x = +$id('bk').value, k = t === 'n' ? 0.55 : 0.18;
      let N = 10, O = 90;
      if (x >= 3) { const f = Math.exp(-(x - 3) * k); N = 10 + 80 * f; O = 90 - 50 * f; }
      $id('bkv').textContent = fmt(x);
      el.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('on', b.dataset.t === t));
      $id('bn').style.width = N + '%'; $id('bo').style.width = O + '%'; $id('vn').textContent = Math.round(N) + ' %'; $id('vo').textContent = Math.round(O) + ' %';
      const st = x < 3 ? 'Oberhalb der Einleitung: sauber, viel Sauerstoff.' : x === 3 ? 'Hier fliesst Abwasser ein: viele Nährstoffe, wenig Sauerstoff.' : (O > 80 ? 'Der Bach hat sich weitgehend selbst gereinigt.' : 'Der Bach erholt sich noch.');
      $id('ro').innerHTML = `${st}<br>${t === 'n' ? 'Ein naturnaher Bach mit Steinen und Pflanzen reinigt sich schneller.' : 'Im verbauten Bach dauert die Selbstreinigung viel länger.'} Beispielwerte (Modell).`;
    }
    el.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => { t = b.dataset.t; upd(); }));
    $id('bk').addEventListener('input', upd); $id('bn').style.width = '0%'; $id('bo').style.width = '0%'; nf(el, upd);
  },

  flasche(el) {
    el.innerHTML = `<div class="sim">${sl('fe', 'Erde im Glas', 10, 90, 10, 40, '%')}${sl('fw', 'Zusätzliches Wasser', 0, 10, 1, 2, '')}${sl('fl', 'Licht und Wärme', 0, 10, 1, 4, '')}
      <div class="brow"><span class="bname">Gedeihen</span><div class="btrack"><div class="bfill" id="fh"></div></div><b class="mono bval" id="fv"></b></div>
      <p class="readout" id="ro" aria-live="polite"></p></div>`;
    function upd() {
      const e = +$id('fe').value, w = +$id('fw').value, l = +$id('fl').value;
      $id('fev').textContent = fmt(e); $id('fwv').textContent = fmt(w); $id('flv').textContent = fmt(l);
      const tips = []; let s = 100;
      if (e > 50) { s -= (e - 50); tips.push('Zu viel Erde: Es bleibt zu wenig Luft für die Kreisläufe.'); }
      if (e < 20) { s -= 20; tips.push('Sehr wenig Erde: Die Pflanzen finden kaum Halt.'); }
      if (w > 5) { s -= (w - 5) * 8; tips.push('Zu viel Wasser: Der Boden fault.'); }
      if (w < 1) { s -= 15; tips.push('Sehr trocken: Es entsteht kaum Wasserkreislauf.'); }
      if (l > 7) { s -= (l - 7) * 10; tips.push('Zu viel Licht und Wärme setzt den Pflanzen zu.'); }
      if (l < 2) { s -= 25; tips.push('Zu wenig Licht: Die Fotosynthese läuft kaum.'); }
      s = Math.max(0, Math.min(100, s));
      $id('fh').style.width = s + '%'; $id('fv').textContent = Math.round(s) + ' %';
      $id('ro').innerHTML = tips.length ? tips.join('<br>') : 'Gute Mischung: nicht mehr als die Hälfte Erde, wenig Wasser, halbschattiger Platz. Das ist ein Modell mit Beispielwerten.';
    }
    ['fe', 'fw', 'fl'].forEach(id => $id(id).addEventListener('input', upd)); $id('fh').style.width = '0%'; nf(el, upd);
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


export default ausNaturalia({ STATIONS, TOPIC, SIMS }, {"id":"nt8-2","titel":"Gewässer-Ökosysteme erforschen","kapitel":"NaTech 8, Kapitel 2","audio":"nt8-2"});
