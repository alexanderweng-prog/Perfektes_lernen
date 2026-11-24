// Ergänzungen zum Paket «Genetik und Gentechnik verstehen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

const PARTNER = { A: 'T', T: 'A', G: 'C', C: 'G' };

export default {
  erklaerungen: {
    'g1-erbinfo': {
      1: 'Die Zellwand gibt Form und Halt. Sie enthält keine Erbinformationen.',
      2: 'Jede Zelle hat die gesamten Erbinformationen, nicht nur die Geschlechtszellen.',
      3: 'Die Erbinformationen liegen im Zellkern, nicht in der Zellflüssigkeit.'
    },
    'g1-46': {
      1: 'Die Hälfte stammt vom Vater. Zusammen sind es 46.',
      2: '92 Chromosomen hat eine Zelle nur kurz vor der Teilung als Chromatiden. Körperzellen haben 46.',
      3: '23 kommen von der Mutter, 23 vom Vater.'
    },
    'g1-genetik': {
      1: 'Das Wetter erforscht die Meteorologie.',
      2: 'Planeten erforscht die Astronomie.',
      3: 'Metalle erforscht die Chemie.'
    },
    'g1-zwilling': {
      1: 'Zweieiige Zwillinge sind auch gleich alt und sehen trotzdem verschieden aus.',
      2: 'Eineiige Zwillinge haben die gleichen Gene, nicht verschiedene.',
      3: 'Die Kleidung erklärt nicht, warum Gesicht und Körper gleich aussehen.'
    },
    'g1-gen': {
      1: 'Ein Chromosom enthält sehr viele Gene.',
      2: 'Eine Zelle enthält Tausende von Genen.',
      3: 'Das Merkmal ist das Ergebnis. Das Gen ist der Bauplan dafür.'
    },
    'g1-kt4': {
      1: 'Es kommen auch 23 vom Vater dazu.',
      2: '92 sind zu viele. Es sind 23 Paare.',
      3: 'Es sind 46 Chromosomen.'
    },
    'g2-mitose': {
      1: 'Ohne Kopie hätte nur eine Tochterzelle alle Erbinformationen.',
      2: 'Die Erbinformationen bleiben vollständig erhalten.',
      3: 'Geschlechtszellen entstehen durch eine andere Teilung, die Meiose.'
    },
    'g2-chromatid': {
      1: 'Das 2-Chromatiden-Chromosom besteht aus zwei identischen Hälften.',
      2: 'Ein Chromatid ist eine Hälfte eines verdoppelten Chromosoms.',
      3: 'Chromatiden gibt es bei allen Lebewesen mit Zellkern.'
    },
    'g2-diff': {
      1: 'Differenzieren heisst spezialisieren, nicht schneller teilen.',
      2: 'Die Erbinformationen bleiben vollständig in jeder Zelle.',
      3: 'Tierzellen bleiben Tierzellen. Sie spezialisieren sich nur.'
    },
    'g2-alle': {
      1: 'Jede Körperzelle enthält alle Erbinformationen.',
      2: 'Jeder Zellkern enthält die gesamten Erbinformationen.',
      3: 'Das gilt für alle Zellen, unabhängig vom Alter.'
    },
    'g2-streck': {
      1: 'Pflanzen wachsen auch, indem sich Zellen strecken.',
      2: 'Fotosynthese liefert Stoffe und Energie, ist aber kein Wachstum.',
      3: 'Pflanzen wachsen durch Zellteilung und Streckung.'
    },
    'g2-kt5': {
      1: 'Die Grösse ist nicht der Grund. Es geht um die Erbinformationen.',
      2: 'Differenzierung ist etwas anderes als Teilung.',
      3: 'Kopieren braucht Energie. Der Grund ist die vollständige Erbinformation.'
    },
    'g3-bau': {
      1: 'Eiweiss, Wasser und Fett sind keine DNA-Bausteine.',
      2: 'Proteine werden nach der DNA gebaut, sind aber nicht ihr Baustein.',
      3: 'Chromosomen bestehen aus DNA, nicht umgekehrt.'
    },
    'g3-paar': {
      1: 'A passt nur zu T, G nur zu C.',
      2: 'A passt nur zu T, G nur zu C.',
      3: 'Nur zwei Paarungen sind möglich: A–T und G–C.'
    },
    'g3-helix': {
      1: '«Doppel» meint die zwei Stränge der DNA, nicht zwei Chromosomen.',
      2: 'Die DNA ist viel länger als eine Zelle, etwa 2 Meter, aber stark aufgewickelt.',
      3: 'Die Doppelhelix ist ein Molekül in einer Zelle.'
    },
    'g3-kt5': {
      1: 'Das ist derselbe Strang. Der Gegenstrang hat zu jeder Base den Partner.',
      2: 'A passt zu T, nicht zu C.',
      3: 'U (Uracil) kommt in der DNA nicht vor. Zu A gehört T.'
    },
    'g3-gegen': {
      1: 'Die Reihenfolge ist durcheinander. Gehe Base für Base durch: A→T, T→A, G→C, C→G.',
      2: 'Das ist der Ausgangsstrang selbst.',
      3: 'U (Uracil) kommt in der DNA nicht vor. Zu A gehört T.'
    },
    'g3-kopie': {
      1: 'Die DNA wird nicht zerstört. Sie wird als Vorlage genutzt.',
      2: 'Die Stränge müssen getrennt werden, damit jede Hälfte als Vorlage dient.',
      3: 'Proteine entstehen nach der Anleitung der DNA, aber nicht bei der Verdopplung.'
    },
    'g4-mut': {
      1: 'Bei der Zellteilung bleibt die Erbinformation normalerweise gleich.',
      2: 'Ein neues Protein kann eine Folge sein, ist aber nicht die Mutation.',
      3: 'Eine Mutation ist eine Veränderung, keine Zellart.'
    },
    'g4-ursache': {
      1: 'Es gibt viele Ursachen, zum Beispiel Strahlung und Chemikalien.',
      2: 'Auch Strahlung, Viren und Kopierfehler können Mutationen auslösen.',
      3: 'Kälte gehört nicht zu den bekannten Ursachen.'
    },
    'g4-folge': {
      1: 'Die meisten Mutationen bleiben ohne Auswirkung.',
      2: 'Manche Mutationen sind schädlich, zum Beispiel als Auslöser von Krebs.',
      3: 'Manche Mutationen haben Folgen, gute oder schlechte.'
    },
    'g4-zuecht': {
      1: 'Wasser lässt eine Pflanze besser wachsen, ändert aber nicht ihre Erbanlagen.',
      2: 'Zellteilung allein verändert die Erbinformation nicht.',
      3: 'Züchtung braucht keine Gentechnik. Man wählt Pflanzen über viele Generationen aus.'
    },
    'g4-keim': {
      1: 'Eine Mutation in einer Hautzelle bleibt in der Haut.',
      2: 'Auch Muskelzellen geben nichts an Kinder weiter.',
      3: 'Mutationen in Geschlechtszellen können vererbt werden.'
    },
    'g4-kt5': {
      1: 'Hautzellen werden nicht an Kinder weitergegeben.',
      2: 'Knochenzellen werden nicht an Kinder weitergegeben.',
      3: 'Blutzellen werden nicht an Kinder weitergegeben.'
    },
    'g5-protein': {
      1: 'Gene werden in der Zelle abgelesen, nicht gegessen.',
      2: 'Proteine entstehen in der Zellflüssigkeit nach der Anleitung des Gens.',
      3: 'Die DNA bleibt im Zellkern. Nur eine Kopie des Gens verlässt ihn.'
    },
    'g5-merkmal': {
      1: 'Gene sind der Bauplan, Merkmale das Ergebnis.',
      2: 'Die Erbinformationen trägt die DNA, nicht die Proteine.',
      3: 'Merkmale hängen von Genen und Umwelt ab.'
    },
    'g5-triplett': {
      1: 'Mit nur 4 Basen gäbe es nur 4 Codewörter, zu wenige für 20 Aminosäuren.',
      2: 'Drei Basen codieren für eine Aminosäure, nicht zwei für ein Protein.',
      3: 'Die DNA enthält einen Code: je drei Basen für eine Aminosäure.'
    },
    'g5-universell': {
      1: 'Lebewesen haben verschiedene DNA. Gleich ist nur der Code.',
      2: 'Die Gene sind verschieden. Gleich ist, was die Tripletts bedeuten.',
      3: 'Der Code ist seit Milliarden Jahren gleich.'
    },
    'g5-kt5': {
      1: 'Mit einer Base gäbe es nur 4 Codewörter.',
      2: 'Mit zwei Basen gäbe es nur 16 Codewörter, zu wenige für 20 Aminosäuren.',
      3: 'Es sind drei, ein Triplett.'
    },
    'g6-gvo': {
      1: 'GVO heisst gentechnisch veränderter Organismus.',
      2: 'GVO heisst gentechnisch veränderter Organismus.',
      3: 'GVO heisst gentechnisch veränderter Organismus.'
    },
    'g6-insulin': {
      1: 'Die Bakterien stellen Insulin her, das gereinigt wird. Niemand isst sie.',
      2: 'Bestrahlen erzeugt zufällige Mutationen, kein gezieltes Insulin-Gen.',
      3: 'Seit 1982 wird menschliches Insulin mit Bakterien hergestellt.'
    },
    'g6-crispr': {
      1: 'CRISPR/Cas9 ist ein Werkzeug zum Schneiden der DNA, kein Medikament.',
      2: 'Ein Mikroskop vergrössert. CRISPR/Cas9 schneidet DNA.',
      3: 'CRISPR/Cas9 ist ein Werkzeug der Gentechnik.'
    },
    'g6-werte': {
      1: 'Geld und Macht sind keine ethischen Werte.',
      2: 'Das sind keine ethischen Werte.',
      3: 'Das sind persönliche Merkmale, keine ethischen Werte.'
    },
    'g6-chance': {
      1: 'Es gibt auch Risiken und offene Fragen.',
      2: 'Es gibt auch Chancen, zum Beispiel Medikamente.',
      3: 'Gentechnik ist erlaubt, aber durch Gesetze geregelt.'
    },
    'g6-recht': {
      1: 'Gesetze gelten. Sie müssen aber an neue Möglichkeiten angepasst werden.',
      2: 'Gentechnik gibt es und wird angewendet.',
      3: 'Die Gesetze betreffen Menschen, Tiere und Pflanzen.'
    },
    'g6-kt4': {
      1: 'Die Gesetze werden angewendet.',
      2: 'Gentechnik gibt es und wird angewendet.',
      3: 'Sie gelten auch für Menschen und Tiere.'
    }
  },

  aufgaben: [
    { id: 'g1-gen-v2', wieVorlage: 'g1-gen', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Ordne vom Grössten zum Kleinsten.',
      elemente: ['Zelle', 'Zellkern', 'Chromosom', 'Gen'],
      erklaerung: 'Die Zelle enthält den Zellkern. Darin liegen die Chromosomen aus DNA, und ein Gen ist ein Abschnitt davon.' },

    { id: 'g3-bau-v2', wieVorlage: 'g3-bau', typ: 'luecke', schwierigkeit: 2,
      text: 'Die vier Basen der DNA heissen Adenin, Cytosin, ___ und ___.',
      luecken: [['Guanin', 'G'], ['Thymin', 'T']],
      erklaerung: 'Abgekürzt: A, C, G und T. A paart sich mit T, G mit C.' },

    { id: 'g3-gegen-v2', wieVorlage: 'g3-gegen', schwierigkeit: 3,
      erzeuge: () => {
        let s, g, rueck, quer;
        do {
          s = Array.from({ length: 6 }, () => zufall(['A', 'T', 'G', 'C'])).join('');
          g = [...s].map(b => PARTNER[b]).join('');
          rueck = [...g].reverse().join('');
          quer = [...s].map(b => ({ A: 'C', C: 'A', T: 'G', G: 'T' })[b]).join('');
        } while (new Set([s, g, rueck, quer]).size < 4);
        return mc(`Ein DNA-Strang lautet ${s}. Wie lautet der Gegenstrang?`, g, [
          [s, 'Das ist der Ausgangsstrang. Zu jeder Base gehört ihr Partner.'],
          [rueck, 'Die Reihenfolge ist umgedreht. Der Gegenstrang liegt Base für Base gegenüber.'],
          [quer, 'A passt zu T und G zu C, nicht A zu C.']],
          `A paart sich mit T, G mit C. Darum lautet der Gegenstrang ${g}.`);
      } },

    { id: 'g3-kopie-v2', wieVorlage: 'g3-kopie', typ: 'reihenfolge', schwierigkeit: 3,
      text: 'Bringe die Schritte der DNA-Verdopplung in die richtige Reihenfolge.',
      elemente: ['Ein Enzym trennt die Basenpaare.', 'Die zwei Einzelstränge liegen frei.', 'Neue Bausteine lagern sich nach den Paarungsregeln an.', 'Es gibt zwei gleiche Doppelstränge.'],
      erklaerung: 'Jeder alte Strang dient als Vorlage. So entstehen zwei identische Kopien.' },

    { id: 'g4-mut-v2', wieVorlage: 'g4-mut', schwierigkeit: 2,
      ...mc('Wogegen schützt Sonnencreme im Zusammenhang mit Mutationen?', 'Gegen UV-Strahlen, die Mutationen in Hautzellen auslösen können.', [
        ['Gegen Viren.', 'Sonnencreme filtert Strahlung, sie hält keine Viren ab.'],
        ['Gegen Kopierfehler bei der Zellteilung.', 'Kopierfehler entstehen in der Zelle, Sonnencreme wirkt aussen.'],
        ['Gegen alle Mutationen.', 'Sie schützt nur vor UV-Strahlen, nicht vor anderen Ursachen.']],
        'UV-Strahlen können die DNA in Hautzellen verändern. Solche Mutationen können Hautkrebs auslösen.') },

    { id: 'g4-ursache-v2', wieVorlage: 'g4-ursache', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Ordne die Ursache der Mutation zu.',
      paare: [['Stoffe aus Abgasen', 'chemisch'], ['UV- und Röntgenstrahlen', 'physikalisch'], ['bestimmte Viren', 'biologisch'], ['Fehler beim Kopieren der DNA', 'in der Zelle selbst']],
      erklaerung: 'Mutationen können von aussen ausgelöst werden oder in der Zelle selbst entstehen.' },

    { id: 'g4-keim-v2', wieVorlage: 'g4-keim', schwierigkeit: 2,
      erzeuge: () => {
        const n = zufall([8, 14, 24, 38, 46, 48]);
        return zahl(`Die Körperzellen einer Art haben ${n} Chromosomen. Wie viele hat eine Spermienzelle dieser Art?`, n / 2, 'Chromosomen',
          `Geschlechtszellen haben ein Chromosom pro Paar, also ${n} : 2 = ${n / 2}.`, 'Geschlechtszellen haben die Hälfte.');
      } },

    { id: 'g5-protein-v2', wieVorlage: 'g5-protein', typ: 'reihenfolge', schwierigkeit: 3,
      text: 'Bringe die Schritte vom Gen zum Protein in die richtige Reihenfolge.',
      elemente: ['Startsignal', 'Kopie des Gens entsteht', 'Kopie verlässt den Zellkern', 'Übersetzung in eine Aminosäurekette', 'Kette faltet sich zum Protein'],
      erklaerung: 'Die DNA bleibt im Zellkern. Gebaut wird das Protein in der Zellflüssigkeit.' },

    { id: 'g5-merkmal-v2', wieVorlage: 'g5-merkmal', schwierigkeit: 3,
      ...mc('Bei einer Blume fehlt das Enzym, das den roten Farbstoff herstellt. Welche Farbe hat die Blüte?', 'Weiss.', [
        ['Rot, wie die anderen.', 'Ohne Enzym entsteht kein roter Farbstoff.'],
        ['Blau.', 'Ein fehlendes Enzym erzeugt keinen anderen Farbstoff.'],
        ['Die Blume blüht nicht.', 'Die Blüte entsteht, ihr fehlt nur die Farbe.']],
        'Das Gen liefert den Bauplan für das Enzym. Fehlt das Enzym, fehlt der rote Farbstoff.') },

    { id: 'g6-crispr-v2', wieVorlage: 'g6-crispr', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne den Begriff der Erklärung zu.',
      paare: [['GVO', 'gentechnisch veränderter Organismus'], ['Plasmid', 'kleiner DNA-Ring von Bakterien'], ['CRISPR/Cas9', 'Genschere zum Schneiden der DNA']],
      erklaerung: 'Diese Werkzeuge und Begriffe gehören zur Gentechnik.' }
  ]
};
