// Ergänzungen zum Paket «Energie und Leistung erfassen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'n1-formen': {
      1: 'Der Ziegel liegt still. Bewegungsenergie hätte er erst beim Fallen.',
      2: 'Thermische Energie hat jeder Körper, entscheidend ist hier aber die Höhe.',
      3: 'Strahlungsenergie ist zum Beispiel Licht. Der Ziegel hat Energie wegen seiner Höhe.'
    },
    'n1-wandel': {
      1: 'Beim Velofahren ist keine elektrische Energie im Spiel. Die Energie kommt aus der Nahrung.',
      2: 'Die Energie kommt aus der Nahrung, nicht direkt aus der Sonne.',
      3: 'Energie wird nie erzeugt, sondern nur umgewandelt.'
    },
    'n1-nutzen': {
      1: 'Energie ist danach nicht weg. Sie liegt in anderer Form vor, oft als thermische Energie.',
      2: 'Im Haushalt wird elektrische Energie genutzt und umgewandelt, nicht verbraucht.',
      3: 'Energie lässt sich nur umwandeln, nicht aus dem Nichts erzeugen.'
    },
    'n1-hub': {
      1: 'Die Energie verschwindet nicht. Sie steckt als Lageenergie im Gegenstand.',
      2: 'Solange der Gegenstand oben liegt, bleibt die Energie als Lageenergie gespeichert.',
      3: 'Kraft ist keine Energie. Die Hubarbeit wird zu Lageenergie.'
    },
    'n1-leistung': {
      1: 'Die Kraft misst man in Newton. Die Leistung ist Energie pro Zeit.',
      2: 'Die Laufzeit allein ist keine Leistung. Leistung ist Energie pro Zeit.',
      3: 'Die Masse sagt nichts über die Leistung.'
    },
    'n1-koerper': {
      1: 'Beim langsamen Gehen wird in der gleichen Zeit weniger Energie umgewandelt.',
      2: 'Im Sitzen ist die Leistung klein, nur der Grundumsatz.',
      3: 'Im Schlaf ist die Leistung des Körpers am kleinsten.'
    },
    'n1-kt4': {
      1: 'Pro Stunde wäre viel weniger. 1 W ist 1 J pro Sekunde.',
      2: 'Newton pro Meter ist keine Leistung.',
      3: 'Kilogramm pro Sekunde ist ein Massenstrom, keine Leistung.'
    },
    'n2-lage-form': {
      1: 'Geschwindigkeit gehört zur Bewegungsenergie.',
      2: 'Farbe und Form spielen keine Rolle.',
      3: 'Die Zeit kommt in der Formel nicht vor.'
    },
    'n2-bew-form': {
      1: 'Masse und Höhe bestimmen die Lageenergie.',
      2: 'Temperatur und Farbe spielen keine Rolle.',
      3: 'Die Höhe gehört zur Lageenergie.'
    },
    'n2-kt5': {
      1: 'Die Geschwindigkeit steht im Quadrat. Doppelte Geschwindigkeit heisst vierfache Energie.',
      2: 'Mehr Geschwindigkeit heisst mehr Energie.',
      3: 'Schneller bedeutet mehr Energie, nicht weniger.'
    },
    'n2-umw': {
      1: 'Beim Fallen wird Lageenergie zu Bewegungsenergie, nicht umgekehrt.',
      2: 'Es wird kaum Licht frei. Die Energie verformt die Knete.',
      3: 'Die Kugel bewegt sich und verformt die Knete. Es wird Energie umgewandelt.'
    },
    'n3-eta': {
      1: 'Die Masse hat nichts mit dem Wirkungsgrad zu tun.',
      2: 'Die Laufzeit hat nichts mit dem Wirkungsgrad zu tun.',
      3: 'Der Preis hat nichts mit dem Wirkungsgrad zu tun.'
    },
    'n3-entw': {
      1: 'Umgekehrt: Ein hoher Wirkungsgrad heisst wenig Entwertung.',
      2: 'Der Wirkungsgrad gibt genau an, wie viel nicht entwertet wird.',
      3: 'Kein Gerät erreicht 100 %. Immer wird ein Teil entwertet.'
    },
    'n3-kt4': {
      1: '80 % werden genutzt, nur 20 % werden entwertet.',
      2: 'Der Wirkungsgrad hat keine Zeiteinheit.',
      3: 'Kein Gerät gibt mehr Energie ab, als es aufnimmt.'
    },
    'n3-wind': {
      1: 'Energie geht nicht verloren. Sie wird als thermische Energie an die Umgebung abgegeben.',
      2: 'Der Wind hat keine Lageenergie. Der Rest wird durch Reibung zu thermischer Energie.',
      3: 'Die Anlage erzeugt keinen Wind. Der Rest wird zu thermischer Energie.'
    },
    'n3-perpetuum': {
      1: 'Viele haben es versucht. Es geht grundsätzlich nicht, wegen der Energieentwertung.',
      2: 'Energie vermehrt sich nie. Sie wird nur umgewandelt.',
      3: 'Es geht nicht um Geld. Es ist physikalisch unmöglich.'
    },
    'n4-leistung': {
      1: 'Mit doppelter Leistung wird pro Sekunde doppelt so viel Energie umgewandelt.',
      2: 'Umgekehrt: Der stärkere Kocher ist schneller.',
      3: 'Die Leistung bestimmt, wie schnell das Wasser heiss wird.'
    },
    'n4-kt5': {
      1: '3600 kJ sind 1 kWh. Hier sind es 2 kWh.',
      2: '1 kWh ist 3600 kJ, nicht 360 kJ.',
      3: 'kWh und kJ sind verschiedene Einheiten. Man muss mit 3600 multiplizieren.'
    },
    'n5-wasser': {
      1: 'Wasser brennt nicht. Seine Bewegungsenergie treibt die Turbine an.',
      2: 'In der Wasserenergieanlage wird kein Wasser zerlegt.',
      3: 'In einer Wasserenergieanlage wird das Wasser nicht erhitzt.'
    },
    'n5-pv': {
      1: 'Die thermische Solaranlage erwärmt Wasser, sie liefert keinen Strom.',
      2: 'Beide nehmen Licht auf, keine erzeugt Licht.',
      3: 'Die eine liefert elektrische, die andere thermische Energie.'
    },
    'n5-kern': {
      1: 'Der Umweg über thermische Energie und Dampf ist nötig.',
      2: 'Wind spielt dort keine Rolle.',
      3: 'Lageenergie spielt bei diesen Anlagen keine Rolle.'
    },
    'n5-strom': {
      1: 'Der Strom fliesst im Kreis zurück. Genutzt wird die elektrische Energie.',
      2: 'Elektrische Energie wird im Moment genutzt, in dem sie bereitgestellt wird.',
      3: 'Umgekehrt: Man bezahlt die genutzte Energie in kWh.'
    },
    'n5-rechnung': {
      1: 'Das Papier kostet fast nichts. Bezahlt werden Anlagen, Rohstoffe und Leitungen.',
      2: 'Die Sonne schickt keine Rechnung. Bezahlt wird die Bereitstellung.',
      3: 'Bau, Betrieb und Transport kosten Geld.'
    },
    'n5-kt4': {
      1: 'Fossile Brennstoffe sind zum Beispiel Kohle, Erdöl und Erdgas.',
      2: 'Atomkerne sind der Energieträger der Kernenergie.',
      3: 'Wind ist bewegte Luft und wird nicht verbrannt.'
    },
    'n6-warm': {
      1: 'Ein Vollbad braucht viel mehr Warmwasser als eine Dusche.',
      2: 'Ein tropfender Hahn verschwendet Wasser und Energie.',
      3: 'Halbvolle Maschinen brauchen fast gleich viel Energie wie volle.'
    },
    'n6-umwelt': {
      1: 'Jede Energiebereitstellung hat Folgen für die Umwelt.',
      2: 'Energie kommt aus verschiedenen Quellen, nicht aus Wolken.',
      3: 'Auch andere Arten der Bereitstellung haben Nachteile.'
    },
    'n6-standby': {
      1: 'Auch im Stand-by nutzen Geräte Energie, rund um die Uhr.',
      2: 'Geräte gehen vom Ausschalten nicht kaputt.',
      3: 'Stand-by-Verluste summieren sich übers Jahr.'
    },
    'n6-fohn': {
      1: 'Der Föhn hat die höhere Leistung. Entscheidend ist die lange Laufzeit des Kühlschranks.',
      2: 'Der Kühlschrank wird innen kalt. Wichtig ist seine Laufzeit.',
      3: 'Man kann ihn ausschalten. Der Grund ist der Dauerbetrieb.'
    },
    'n6-kt5': {
      1: 'Der Föhn oder der Backofen haben eine viel grössere Leistung.',
      2: 'Er wird innen kalt. Wichtig ist, dass er ständig läuft.',
      3: 'Jedes Gerät hat einen Wirkungsgrad. Entscheidend ist die Laufzeit.'
    },
    'n6-haus': {
      1: 'Dünnere Wände dämmen schlechter.',
      2: 'Dauernd offene Fenster lassen die Wärme hinaus.',
      3: 'Glühlampen nutzen viel mehr Energie als LED-Lampen.'
    }
  },

  aufgaben: [
    { id: 'n1-formen-v2', wieVorlage: 'n1-formen', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne das Beispiel der Energieform zu.',
      paare: [['ein rollender Ball', 'Bewegungsenergie'], ['ein Apfel am Baum', 'Lageenergie'], ['Benzin im Tank', 'chemische Energie'], ['Sonnenlicht', 'Strahlungsenergie']],
      erklaerung: 'Energie tritt in verschiedenen Formen auf und kann von einer Form in eine andere umgewandelt werden.' },

    { id: 'n2-lage-form-v2', wieVorlage: 'n2-lage-form', schwierigkeit: 3,
      ...mc('Ein Buch wird vom Tisch ins doppelt so hohe Regal gestellt. Wie ändert sich seine Lageenergie gegenüber dem Boden?', 'Sie verdoppelt sich.', [
        ['Sie vervierfacht sich.', 'Die Höhe steht nicht im Quadrat. Doppelte Höhe heisst doppelte Energie.'],
        ['Sie bleibt gleich.', 'Die Lageenergie hängt direkt von der Höhe ab.'],
        ['Sie halbiert sich.', 'Höher heisst mehr Lageenergie, nicht weniger.']],
        'E = m · g · h. Die Höhe steht einfach in der Formel, also doppelte Höhe, doppelte Energie.') },

    { id: 'n2-bew-form-v2', wieVorlage: 'n2-bew-form', schwierigkeit: 3,
      erzeuge: () => {
        const m = zufall([2, 4, 10, 50]), v = zufall([2, 3, 4, 5, 6]);
        return zahl(`Ein Körper mit ${m} kg bewegt sich mit ${v} m/s. Wie gross ist seine Bewegungsenergie?`, 0.5 * m * v * v, 'J',
          `E = ½ · ${m} kg · (${v} m/s)² = ${z(0.5 * m * v * v)} J.`, 'E = ½ · m · v². Zuerst v quadrieren.');
      } },

    { id: 'n2-lage-v2', wieVorlage: 'n2-lage', schwierigkeit: 3,
      erzeuge: () => {
        const m = zufall([2, 5, 20, 50, 70]), h = zufall([2, 3, 5, 10]);
        return zahl(`Eine Person hebt einen Gegenstand mit ${m} kg auf ${h} m Höhe. Wie gross ist die Lageenergie? Rechne mit g = 10 N/kg.`, m * 10 * h, 'J',
          `E = m · g · h = ${m} kg · 10 N/kg · ${h} m = ${m * 10 * h} J.`, 'E = m · g · h');
      } },

    { id: 'n3-nutz-v2', wieVorlage: 'n3-nutz', schwierigkeit: 3,
      erzeuge: () => {
        const e = zufall([200, 500, 1000, 2000]), p = zufall([20, 30, 40, 60, 90]);
        return zahl(`Einem Gerät werden ${e} J zugeführt. Sein Wirkungsgrad beträgt ${p} %. Wie viel Energie wird entwertet (nicht genutzt)?`, e * (100 - p) / 100, 'J',
          `Genutzt: ${p} % von ${e} J = ${e * p / 100} J. Entwertet: ${e} J − ${e * p / 100} J = ${e * (100 - p) / 100} J.`, 'Entwertet wird der Rest bis 100 %.');
      } },

    { id: 'n4-kwh-v2', wieVorlage: 'n4-kwh', schwierigkeit: 3,
      erzeuge: () => {
        const p = zufall([500, 1000, 1500, 2000, 2500]), t = zufall([0.5, 1, 2, 3]);
        return zahl(`Ein Gerät mit ${p} W läuft ${z(t)} Stunden. Wie viel Energie nutzt es in kWh?`, p / 1000 * t, 'kWh',
          `${p} W = ${z(p / 1000)} kW. E = ${z(p / 1000)} kW · ${z(t)} h = ${z(p / 1000 * t)} kWh.`, 'Zuerst W in kW umrechnen, dann mit den Stunden multiplizieren.');
      } },

    { id: 'n4-kj-v2', wieVorlage: 'n4-kj', schwierigkeit: 2,
      erzeuge: () => {
        const k = zufall([2, 3, 5, 0.5, 1.5]);
        return zahl(`Wie viele Kilojoule sind ${z(k)} kWh? Es gilt 1 kWh = 3600 kJ.`, k * 3600, 'kJ', `${z(k)} · 3600 kJ = ${z(k * 3600)} kJ.`, 'Mit 3600 multiplizieren.');
      } },

    { id: 'n4-2000-v2', wieVorlage: 'n4-2000', schwierigkeit: 2,
      ...mc('Was bedeutet «2000 Watt» in der 2000-Watt-Gesellschaft?', 'Jede Person nutzt im Mittel höchstens 2000 J pro Sekunde, für alles zusammen.', [
        ['Jede Person darf nur ein Gerät mit 2000 W haben.', 'Gemeint ist der ganze Energiebedarf einer Person: Heizen, Verkehr, Produkte und mehr.'],
        ['Jeder Haushalt hat 2000 W Strom.', 'Gemeint ist der Bedarf pro Person, und nicht nur Strom.'],
        ['Die Schweiz nutzt heute 2000 W pro Person.', 'Heute sind es etwa 5000 W pro Person, rund 2,5-mal so viel.']],
        'Die 2000 W sind ein Mittelwert über alle Energie, die eine Person nutzt.') },

    { id: 'n6-haus-v2', wieVorlage: 'n6-haus', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne die Massnahme ihrer Wirkung zu.',
      paare: [['Wärmedämmung', 'weniger Wärme geht nach aussen'], ['Sonnenkollektoren', 'Wasser wird mit Sonnenenergie erwärmt'], ['LED-Lampen', 'weniger Energie für Licht']],
      erklaerung: 'Viele kleine Massnahmen senken zusammen den Energiebedarf eines Hauses.' }
  ]
};
