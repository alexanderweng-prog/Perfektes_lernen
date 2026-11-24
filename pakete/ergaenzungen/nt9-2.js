// Ergänzungen zum Paket «Atommodelle nutzen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'a1-element': {
      1: 'Es sind 118 Elemente. Ein Element besteht aus einer einzigen Atomsorte.',
      2: 'Es sind 118 Elemente. Ein Gemisch besteht aus mehreren Stoffen, ein Element aus einer Atomsorte.',
      3: 'Es sind 118 Elemente, und viele davon sind fest, zum Beispiel Eisen oder Gold.'
    },
    'a1-modell': {
      1: 'In ein Atom kann man nicht hineinfotografieren. Ein Modell ist eine Vorstellung.',
      2: 'Kein Modell zeigt die Wirklichkeit genau. Modelle werden immer wieder verbessert.',
      3: 'Ein Atommodell ist eine Vorstellung, kein Gerät.'
    },
    'a1-dalton': {
      1: 'Das ist das Rosinenkuchenmodell von Thomson.',
      2: 'Kreisbahnen um einen Kern kamen erst mit Bohr.',
      3: 'Den leeren Raum im Atom entdeckte Rutherford. Dalton dachte an volle Kugeln.'
    },
    'a1-thomson': {
      1: 'Den winzigen Kern mit leerem Raum beschrieb Rutherford.',
      2: 'Feste Bahnen beschrieb Bohr.',
      3: 'Im Rosinenkuchenmodell ist das Atom insgesamt neutral.'
    },
    'a1-reihe': {
      1: 'Bohr kam nach Rutherford. Dalton war der Erste.',
      2: 'Rutherford kam nach Dalton und Thomson.',
      3: 'Das Orbitalmodell ist das neuste. Dalton steht am Anfang.'
    },
    'a1-kt4': {
      1: 'Alle Forschenden untersuchten dieselben Atome. Ihre Erkenntnisse wurden besser.',
      2: 'Die Atome bleiben gleich. Unser Wissen über sie hat sich verändert.',
      3: 'Modelle sind nicht falsch, sondern vereinfacht. Neuere erklären mehr.'
    },
    'a2-gold': {
      1: 'Massive Kugeln hätten die Teilchen aufgehalten.',
      2: 'Die Folie ist nicht durchsichtig. Die Atome bestehen aber fast nur aus leerem Raum.',
      3: 'Die Alpha-Teilchen wurden mit einem Schirm nachgewiesen. Entscheidend ist, dass fast alle hindurchgingen.'
    },
    'a2-kern': {
      1: 'Elektronen sind viel zu leicht, um Alpha-Teilchen abzulenken.',
      2: 'Die Folie war ganz. Die Ablenkung zeigt den Kern.',
      3: 'Gerade die abgelenkten Teilchen zeigen, dass es einen Kern gibt.'
    },
    'a2-kt4': {
      1: 'Die meisten Teilchen gingen hindurch. Das Atom ist also nicht massiv.',
      2: 'Elektronen sind in der Hülle vorhanden.',
      3: 'Ein Atom ist insgesamt neutral. Der Kern ist positiv.'
    },
    'a2-bohr': {
      1: 'Massive Kugeln waren die Vorstellung von Dalton.',
      2: 'Bohr behielt den Kern von Rutherford bei.',
      3: 'Bei Bohr bewegen sich die Elektronen auf Bahnen.'
    },
    'a2-zustand': {
      1: 'Umgekehrt: Im angeregten Zustand hat das Atom mehr Energie.',
      2: 'Beim Wechsel auf eine äussere Bahn nimmt das Atom Energie auf.',
      3: 'Das Elektron ist weiter aussen, aber vorhanden.'
    },
    'a2-schalen': {
      1: 'Es gibt mehrere Schalen mit Elektronen.',
      2: 'Elektronen gibt es in den Schalen um den Kern.',
      3: 'Im Kern sitzen Protonen und Neutronen.'
    },
    'a3-teilchen': {
      1: 'Elektronen sind in der Hülle, nicht im Kern.',
      2: 'Neutronen sind ungeladen.',
      3: 'Protonen sitzen im Kern.'
    },
    'a3-ordnung': {
      1: 'Die Zahl der Neutronen kann bei einem Element verschieden sein (Isotope).',
      2: 'Die Ordnungszahl ist eine Anzahl, keine Masse.',
      3: 'Die Zahl der Schalen entspricht der Periode, nicht der Ordnungszahl.'
    },
    'a3-kt5': {
      1: 'Neutral wäre es mit 11 Elektronen.',
      2: 'Es hat weniger Elektronen als Protonen. Darum ist es positiv.',
      3: 'Isotope unterscheiden sich in den Neutronen, nicht in den Elektronen.'
    },
    'a3-isotop': {
      1: 'Mit verschieden vielen Protonen wären es verschiedene Elemente.',
      2: 'Ionen unterscheiden sich in den Elektronen. Isotope in den Neutronen.',
      3: 'Isotope sind Atome, keine Moleküle.'
    },
    'a3-schalen': {
      1: 'Die Zahlen beschreiben die Elektronen in den Schalen, nicht Protonen und Neutronen.',
      2: 'Es geht um die Elektronen eines einzigen Atoms.',
      3: 'Drei Zahlen heissen drei Schalen.'
    },
    'a4-edel': {
      1: 'Edelgase reagieren fast nie, weil ihre äusserste Schale voll ist.',
      2: 'Atome geben nur so viele Elektronen ab, bis die äusserste Schale voll ist.',
      3: 'Auch Nichtmetalle erreichen die Edelgaskonfiguration, zum Beispiel durch Aufnahme von Elektronen.'
    },
    'a4-ion': {
      1: 'Teilen zwei Nichtmetalle Elektronen, ist das eine Elektronenpaarbindung.',
      2: 'Edelgase reagieren fast nie.',
      3: 'Bei einer Bindung werden Elektronen übertragen oder geteilt.'
    },
    'a4-paar': {
      1: 'Wenn Metalle Elektronen abgeben, entsteht eine Ionenbindung.',
      2: 'Wenn sich Ionen anziehen, ist das eine Ionenbindung.',
      3: 'Elektronenpaarbindungen gibt es überall, zum Beispiel im Wasser.'
    },
    'a4-kt5': {
      1: 'Ionenbindungen entstehen zwischen Metall und Nichtmetall.',
      2: 'Metallbindungen gibt es zwischen Metall-Atomen.',
      3: 'Gemeinsam genutzte Elektronen bilden eine Bindung.'
    },
    'a4-nacl': {
      1: 'Umgekehrt: Natrium gibt ein Elektron ab, Chlor nimmt es auf.',
      2: 'Es entstehen Ionen, keine neutralen Atome.',
      3: 'Die Reaktion ist sehr heftig.'
    },
    'a4-gruppe': {
      1: 'Gruppe 1 hat ein Aussenelektron. Sie gibt es ab.',
      2: 'Gruppe 17 hat sieben Aussenelektronen. Sie nimmt eines auf.',
      3: 'Es werden nur so viele Elektronen abgegeben oder aufgenommen, bis die Schale voll ist.'
    },
    'a5-oxi': {
      1: 'Das ist eine Reduktion.',
      2: 'Bei der Oxidation werden Elektronen abgegeben.',
      3: 'Verdampfen ist ein physikalischer Vorgang.'
    },
    'a5-red': {
      1: 'Das ist eine Oxidation.',
      2: 'Reduktion heisst hier: Elektronen aufnehmen, nicht kleiner werden.',
      3: 'Abkühlen ist keine chemische Teilreaktion.'
    },
    'a5-redox': {
      1: 'Oxidation und Reduktion laufen immer zusammen ab.',
      2: 'Ohne Oxidation gibt es keine Elektronen für die Reduktion.',
      3: 'Es werden Elektronen übertragen, also Teilchen.'
    },
    'a5-kt4': {
      1: 'Das passiert bei der Elektrolyse.',
      2: 'Lage- und Bewegungsenergie spielen keine Rolle.',
      3: 'Die Brennstoffzelle wandelt chemische in elektrische Energie um.'
    },
    'a5-strom': {
      1: 'Strom sind bewegte Elektronen. Bei Redoxreaktionen werden Elektronen übertragen.',
      2: 'Batterie und Brennstoffzelle zeigen: Redoxreaktionen liefern auch Strom.',
      3: 'Auch Elektrolyse und Galvanisierung nutzen Strom.'
    },
    'a5-brenn': {
      1: 'Das ist die Elektrolyse, der umgekehrte Vorgang.',
      2: 'Es entsteht vor allem elektrische Energie.',
      3: 'Kochsalz entsteht aus Natrium und Chlor.'
    },
    'a6-radio': {
      1: 'Radioaktivität betrifft den Atomkern, nicht die Elektronen.',
      2: 'Chemische Reaktionen betreffen die Hülle. Radioaktivität den Kern.',
      3: 'Nur instabile Kerne sind radioaktiv.'
    },
    'a6-hwz': {
      1: 'Nach einer Halbwertszeit ist erst die Hälfte zerfallen.',
      2: 'Die Halbwertszeit gehört zu einem radioaktiven Stoff, nicht zum Menschen.',
      3: 'Die Halbwertszeit ist eine feste Eigenschaft des Stoffs.'
    },
    'a6-spalt': {
      1: 'Das Verschmelzen ist die Kernfusion.',
      2: 'Elektronen betreffen die Hülle. Gespalten wird der Kern.',
      3: 'Lösen ist ein chemischer Vorgang.'
    },
    'a6-fusion': {
      1: 'Spaltung grosser Kerne ist die Kernspaltung.',
      2: 'Moleküle zerlegen ist eine chemische Reaktion.',
      3: 'Die Fusion betrifft den Kern, nicht die Hülle.'
    },
    'a6-nutz': {
      1: 'Chemische Reaktionen betreffen die Hülle.',
      2: 'Unfälle und Waffen zeigen, dass Kernenergie gefährlich sein kann.',
      3: 'Auf der Erde gibt es Kernkraftwerke und Anwendungen in der Medizin.'
    },
    'a6-kt5': {
      1: 'Die Hälfte bleibt nach einer Halbwertszeit, also nach 8 Tagen.',
      2: 'Ein Viertel bleibt nach zwei Halbwertszeiten, also nach 16 Tagen.',
      3: 'Die Menge halbiert sich immer wieder, wird aber nie ganz null.'
    }
  },

  aufgaben: [
    { id: 'a1-reihe-v2', wieVorlage: 'a1-reihe', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne die Beschreibung dem Atommodell zu.',
      paare: [['volle, homogene Kugel', 'Dalton'], ['positive Masse mit Elektronen wie Rosinen', 'Thomson'], ['winziger Kern, sonst leerer Raum', 'Rutherford'], ['Elektronen auf festen Kreisbahnen', 'Bohr']],
      erklaerung: 'Jedes Modell brachte etwas Neues: Kugel, Elektronen, Kern, Bahnen.' },

    { id: 'a3-schalen-v2', wieVorlage: 'a3-schalen', schwierigkeit: 3,
      erzeuge: () => {
        const [name, n] = zufall([['Magnesium', 12], ['Aluminium', 13], ['Silicium', 14], ['Phosphor', 15], ['Schwefel', 16], ['Chlor', 17]]);
        return zahl(`${name} hat ${n} Elektronen. Wie viele davon sind in der äussersten Schale? Die innerste Schale fasst 2, die zweite 8.`,
          n - 10, 'Elektronen', `${n} = 2 + 8 + ${n - 10}. Die Konfiguration ist 2/8/${n - 10}.`, 'Fülle zuerst die innerste Schale mit 2, dann die zweite mit 8.');
      } },

    { id: 'a4-edel-v2', wieVorlage: 'a4-edel', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Wie erreicht das Atom die Edelgaskonfiguration?',
      paare: [['Natrium (1 Aussenelektron)', '1 Elektron abgeben'], ['Chlor (7 Aussenelektronen)', '1 Elektron aufnehmen'], ['Magnesium (2 Aussenelektronen)', '2 Elektronen abgeben'], ['Neon (8 Aussenelektronen)', 'hat sie schon']],
      erklaerung: 'Atome geben ab oder nehmen auf, was am wenigsten Elektronen braucht, bis die äusserste Schale voll ist.' },

    { id: 'a4-ion-v2', wieVorlage: 'a4-ion', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Welche Bindung entsteht?',
      paare: [['Natrium und Chlor', 'Ionenbindung'], ['Wasserstoff und Wasserstoff', 'Elektronenpaarbindung'], ['Magnesium und Sauerstoff', 'Ionenbindung'], ['Wasserstoff und Sauerstoff', 'Elektronenpaarbindung']],
      erklaerung: 'Metall + Nichtmetall: Ionenbindung. Nur Nichtmetalle: Elektronenpaarbindung.' },

    { id: 'a4-paar-v2', wieVorlage: 'a4-paar', schwierigkeit: 2,
      ...mc('Was entsteht bei einer Elektronenpaarbindung?', 'Ein Molekül, zum Beispiel H₂ oder H₂O.', [
        ['Ein Ionengitter.', 'Ein Ionengitter entsteht bei der Ionenbindung.'],
        ['Ein Metallgitter.', 'Ein Metallgitter entsteht bei Metallen.'],
        ['Ein Edelgas.', 'Die Atome erreichen die Edelgaskonfiguration, werden aber nicht zum Edelgas.']],
        'Nichtmetall-Atome teilen Elektronen. So entsteht ein Molekül.') },

    { id: 'a5-redox-v2', wieVorlage: 'a5-redox', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Oxidation oder Reduktion?',
      paare: [['Cu → Cu²⁺ + 2 e⁻', 'Oxidation'], ['O + 2 e⁻ → O²⁻', 'Reduktion'], ['Na → Na⁺ + e⁻', 'Oxidation'], ['Cl + e⁻ → Cl⁻', 'Reduktion']],
      erklaerung: 'Elektronen abgeben heisst Oxidation, Elektronen aufnehmen heisst Reduktion.' },

    { id: 'a6-radio-v2', wieVorlage: 'a6-radio', schwierigkeit: 2,
      ...mc('Woher kommt die natürliche Strahlung, der wir alle ausgesetzt sind?', 'Aus dem Weltall und aus der Erde, zum Beispiel vom Edelgas Radon.', [
        ['Nur aus Kernkraftwerken.', 'Natürliche Strahlung gibt es auch ohne Kraftwerke.'],
        ['Aus Handys und WLAN.', 'Das sind elektromagnetische Wellen, keine radioaktive Strahlung.'],
        ['Es gibt keine natürliche Strahlung.', 'Strahlung aus Weltall und Erde ist überall vorhanden.']],
        'Kosmische Strahlung kommt aus dem Weltall, terrestrische aus dem Boden.') },

    { id: 'a6-hwz-v2', wieVorlage: 'a6-hwz', schwierigkeit: 3,
      erzeuge: () => {
        const [stoff, t] = zufall([['Iod-131', 8], ['ein Stoff A', 5], ['ein Stoff B', 10], ['ein Stoff C', 3]]);
        const n = zufall([2, 3, 4]), start = zufall([80, 160, 320]);
        return zahl(`${stoff[0].toUpperCase() + stoff.slice(1)} hat eine Halbwertszeit von ${t} Tagen. Von ${start} g sind nach ${n * t} Tagen noch wie viele Gramm vorhanden?`,
          start / 2 ** n, 'g', `${n * t} Tage sind ${n} Halbwertszeiten. ${start} g halbiert ${n}-mal ergibt ${z(start / 2 ** n)} g.`, 'Wie viele Halbwertszeiten sind vergangen?');
      } },

    { id: 'a6-halb-v2', wieVorlage: 'a6-halb', typ: 'luecke', schwierigkeit: 2,
      text: 'Nach einer Halbwertszeit ist noch die ___ vorhanden, nach zwei Halbwertszeiten noch ein ___.',
      luecken: [['Hälfte', 'halbe Menge'], ['Viertel']],
      erklaerung: 'Bei jeder Halbwertszeit halbiert sich die Menge noch einmal: 1/2, 1/4, 1/8 …' }
  ]
};
