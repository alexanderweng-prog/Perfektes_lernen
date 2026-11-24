// Ergänzungen zum Paket «Chemische Reaktionen erforschen» (Entwurf bis zur Freigabe im Dashboard)
import { zufall, z, mc, zahl } from './hilfen.js';

export default {
  erklaerungen: {
    'q1-dreieck': {
      1: 'Wasser löscht ein Feuer. Es braucht Brennstoff, Sauerstoff und Hitze.',
      2: 'Hitze allein genügt nicht. Ohne Brennstoff und Sauerstoff brennt nichts.',
      3: 'Stickstoff brennt nicht und fördert das Feuer nicht. Es fehlen Brennstoff und Hitze.'
    },
    'q1-ghs': {
      1: 'Ein Gefahrensymbol warnt immer vor einer Gefahr.',
      2: 'Ätzend hat ein eigenes Symbol mit einer zerfressenen Hand.',
      3: 'GHS-Symbole sagen nichts über das Alter. Sie warnen vor Gefahren.'
    },
    'q1-loeschen': {
      1: 'Kühlen ist die Wirkung von Wasser. Die Decke schneidet den Sauerstoff ab.',
      2: 'Der Brennstoff bleibt unter der Decke. Es fehlt der Sauerstoff.',
      3: 'Die Löschdecke erstickt das Feuer. Es wird schwächer, nicht heisser.'
    },
    'q1-brandfall': {
      1: 'Zuerst meldest du den Brand. Gelöscht wird nur, wenn es sicher ist.',
      2: 'Im Brandfall nie den Aufzug benutzen. Er kann stecken bleiben.',
      3: 'Offene Türen und Fenster bringen Sauerstoff zum Feuer. Türen schliesst man.'
    },
    'q1-oxid': {
      1: 'Nur Wasserstoff ergibt mit Sauerstoff Wasser. Allgemein entsteht ein Oxid.',
      2: 'Edelgase reagieren nicht und entstehen nicht bei Reaktionen mit Sauerstoff.',
      3: 'Bei einer chemischen Reaktion entsteht immer ein neuer Stoff.'
    },
    'q1-rosten': {
      1: 'Rosten ist langsam und ohne Flamme. Ein Feuer ist schnell.',
      2: 'Beim Rosten entsteht ein neuer Stoff, das Eisenoxid. Es ist ein chemischer Vorgang.',
      3: 'Rosten braucht Sauerstoff, und meist auch Wasser.'
    },
    'q1-kt5': {
      1: 'Sauerstoff entfernt zum Beispiel die Löschdecke.',
      2: 'Den Brennstoff entfernst du, indem du ihn wegnimmst.',
      3: 'Wasser entfernt die Hitze: Es kühlt unter die Zündtemperatur.'
    },
    'q2-elektro': {
      1: 'Umgekehrt: Wasserstoff entsteht am Minuspol, Sauerstoff am Pluspol.',
      2: 'Das Wasser wird zerlegt, nicht verdampft.',
      3: 'Es entsteht doppelt so viel Wasserstoff wie Sauerstoff, passend zur Formel H₂O.'
    },
    'q2-nachweis': {
      1: 'Die Glimmspanprobe zeigt nur Sauerstoff an. Wasserstoff erkennst du mit der Knallgasprobe.',
      2: 'Lugol weist Stärke nach, Essig weist gar nichts nach.',
      3: 'Ein Thermometer misst nur die Temperatur.'
    },
    'q2-brandfoerdernd': {
      1: 'Brandfördernde Stoffe machen das Feuer stärker, sie löschen es nicht.',
      2: 'Sie brennen nicht unbedingt selbst, aber sie geben Sauerstoff ab.',
      3: 'Gerade weil sie Sauerstoff enthalten und abgeben, fördern sie den Brand.'
    },
    'q2-pfeil': {
      1: 'Umgekehrt: Der Pfeil zeigt von den Ausgangsstoffen zu den Produkten.',
      2: 'Metalle und Nichtmetalle können auf beiden Seiten stehen.',
      3: 'Wasser kann Ausgangsstoff oder Produkt sein. Links stehen immer die Ausgangsstoffe.'
    },
    'q2-kt5': {
      1: 'Links 2 O, rechts nur 1 O. Die Gleichung ist nicht ausgeglichen.',
      2: 'Links 4 O, rechts 2 O. Die Sauerstoffatome stimmen nicht.',
      3: 'Links 4 O, rechts 1 O. Auch die H-Atome müssen übereinstimmen.'
    },
    'q2-gleichung': {
      1: 'Es geht nicht um das Aussehen, sondern um die Erhaltung der Atome.',
      2: 'Atome vermehren sich nicht. Sie werden nur neu angeordnet.',
      3: 'Die Zahl der Moleküle kann sich ändern. Gleich bleibt die Zahl der Atome.'
    },
    'q3-thermit': {
      1: 'Umgekehrt: Aluminium nimmt den Sauerstoff vom Eisenoxid.',
      2: 'Bei der Thermit-Reaktion gibt es kein Wasser.',
      3: 'Die Reaktion ist heftig und so heiss, dass das Eisen flüssig wird.'
    },
    'q3-reduktion': {
      1: 'Das Oxid gibt den Sauerstoff ab. Das Reduktionsmittel nimmt ihn auf.',
      2: 'Ein Reduktionsmittel hat mit Löschen nichts zu tun.',
      3: 'Reduktionsmittel können fest sein, zum Beispiel Aluminium oder Kohle.'
    },
    'q3-erz': {
      1: 'Schmelzen allein trennt den Sauerstoff nicht ab. Man braucht Kohle als Reduktionsmittel.',
      2: 'Wasser nimmt den Sauerstoff nicht weg.',
      3: 'Eisen kommt im Erz vor, nicht in der Luft.'
    },
    'q3-edel': {
      1: 'Gold ist ein festes Metall.',
      2: 'Umgekehrt: Gold ist edler als Eisen.',
      3: 'Gold findet man als reines Metall, zum Beispiel als Nuggets.'
    },
    'q3-zeit': {
      1: 'Aluminium gab es immer, aber nur in Verbindungen. Es war schwer zu gewinnen.',
      2: 'Aluminium ist ein Leichtmetall. Der Grund ist seine feste Bindung zum Sauerstoff.',
      3: 'Umgekehrt: Kupfer ist edler. Darum liess es sich früher gewinnen.'
    },
    'q3-kt4': {
      1: 'Gold bindet Sauerstoff kaum. Es ist ein Edelmetall.',
      2: 'Kupfer bindet Sauerstoff schwächer als Aluminium.',
      3: 'Silber ist ein Edelmetall und bindet Sauerstoff kaum.'
    },
    'q4-aktiv': {
      1: 'Die frei werdende Energie ist etwas anderes. Die Aktivierungsenergie muss man zuerst zuführen.',
      2: 'Die Energie der Produkte liegt am Ende der Reaktion. Die Aktivierungsenergie kommt am Anfang.',
      3: 'Viele Reaktionen brauchen Aktivierungsenergie, nicht nur Feuer.'
    },
    'q4-exo': {
      1: 'Das ist eine endotherme Reaktion.',
      2: 'Bei jeder chemischen Reaktion wird Energie umgesetzt.',
      3: 'Exotherme Reaktionen gibt es überall, zum Beispiel beim Feuer.'
    },
    'q4-endo': {
      1: 'Das ist eine exotherme Reaktion.',
      2: 'Jede Reaktion hat Ausgangsstoffe.',
      3: 'Endotherme Reaktionen explodieren nicht. Ohne Energiezufuhr hören sie auf.'
    },
    'q4-kt4': {
      1: 'Bei einer exothermen Reaktion wird Energie frei, hier wird sie zugeführt.',
      2: 'Es entstehen neue Stoffe: Wasserstoff und Sauerstoff.',
      3: 'Hier wird dauernd elektrische Energie zugeführt.'
    },
    'q4-diagramm': {
      1: 'Bei endothermen Reaktionen liegen die Produkte höher.',
      2: 'Die Höhe der Produkte zeigt, ob Energie frei wird, nicht ob die Reaktion abläuft.',
      3: 'Das Diagramm zeigt ja die Produkte. Sie liegen nur tiefer.'
    },
    'q5-aufbau': {
      1: 'Im Kern sitzen die Protonen. Die Elektronen bewegen sich aussen.',
      2: 'Protonen sind positiv, Elektronen negativ geladen.',
      3: 'Ein Atom enthält Ladungen. Insgesamt ist es aber neutral.'
    },
    'q5-edelgas': {
      1: 'Helium ist sehr leicht und reagiert trotzdem nicht. Die Masse ist nicht der Grund.',
      2: 'Die Temperatur ist nicht der Grund. Ihre Elektronen sind stabil angeordnet.',
      3: 'Edelgase bestehen aus Atomen, zum Beispiel Helium und Neon.'
    },
    'q5-ionen': {
      1: 'Ein Anion entsteht, wenn ein Atom Elektronen aufnimmt.',
      2: 'Das Atom wird zum Ion, nicht zum Edelgas.',
      3: 'Das Element bleibt gleich. Die Zahl der Protonen ändert sich nicht.'
    },
    'q5-salz': {
      1: 'Kochsalz besteht aus Ionen, nicht aus ungeladenen Molekülen.',
      2: 'Ein Metallgitter gibt es bei Metallen. Salze bilden ein Ionengitter.',
      3: 'Kochsalz ist bei Raumtemperatur fest.'
    },
    'q5-leit': {
      1: 'Feste Salze leiten nicht, weil die Ionen im Gitter festsitzen.',
      2: 'Gelöst oder geschmolzen leiten Salze sehr wohl.',
      3: 'Auch heiss leitet ein festes Salz nicht. Es muss schmelzen.'
    },
    'q5-kt4': {
      1: 'Es geht nicht um weich oder hart, sondern um den Aufbau des Gitters.',
      2: 'Salze enthalten kein Gas.',
      3: 'Metalle bestehen aus positiven Atomrümpfen. Entscheidend sind die beweglichen Elektronen.'
    },
    'q6-oxid': {
      1: 'Umgekehrt: Nichtmetalloxide ergeben saure, Metalloxide basische Lösungen.',
      2: 'Die Lösungen sind sauer oder basisch, nicht neutral.',
      3: 'Salze entstehen bei der Neutralisation, nicht beim Lösen eines Oxids.'
    },
    'q6-saeure': {
      1: 'Umgekehrt: Die Säure gibt H⁺ ab, die Base nimmt es auf.',
      2: 'Säuren können fest, flüssig oder gasförmig sein.',
      3: 'Basen gibt es auch gelöst, zum Beispiel Natronlauge.'
    },
    'q6-kt5': {
      1: 'Salz bleibt aus den übrigen Ionen zurück. H⁺ und OH⁻ werden zu Wasser.',
      2: 'Sauerstoff entsteht dabei nicht.',
      3: 'Edelgase entstehen nicht bei Reaktionen.'
    },
    'q6-skala': {
      1: 'pH 7 ist neutral, zum Beispiel reines Wasser.',
      2: 'pH 0 ist stark sauer. Stark basisch ist pH 14.',
      3: 'Der pH-Wert zeigt gerade, wie viele Wasserstoff-Ionen vorhanden sind.'
    },
    'q6-neutral': {
      1: 'Bei der Neutralisation entsteht kein Feuer. Die Lösung wird etwas warm.',
      2: 'Es entstehen Wasser und gelöste Salz-Ionen.',
      3: 'Natrium bleibt als Ion gelöst. Reines Natrium entsteht nicht.'
    },
    'q6-essig': {
      1: 'Das Schäumen ist eine Reaktion von Säure und Kalk, kein Zeichen von Alter.',
      2: 'Die Temperatur ist nicht der Grund. Die Säure löst den Kalk.',
      3: 'Wasser schäumt nicht auf Stein. Es entsteht ein Gas.'
    }
  },

  aufgaben: [
    { id: 'q1-loeschen-v2', wieVorlage: 'q1-loeschen', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Welche Seite des Feuerdreiecks entfernst du?',
      paare: [['mit Wasser löschen', 'Hitze'], ['Löschdecke darüberlegen', 'Sauerstoff'], ['Holz aus dem Feuer nehmen', 'Brennstoff']],
      erklaerung: 'Ein Feuer erlischt, wenn eine der drei Seiten fehlt.' },

    { id: 'q1-brandfall-v2', wieVorlage: 'q1-brandfall', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Bringe das Verhalten im Brandfall in die richtige Reihenfolge.',
      elemente: ['Brand melden (Notruf 118)', 'Gefährdete Personen mitnehmen und in Sicherheit bringen', 'Türen schliessen und dem Rettungsweg folgen', 'Löschversuch nur, wenn es sicher ist'],
      erklaerung: 'Zuerst melden, dann retten und flüchten. Gelöscht wird nur ohne Gefahr.' },

    { id: 'q2-pfeil-v2', wieVorlage: 'q2-pfeil', typ: 'luecke', schwierigkeit: 2,
      text: 'In der Gleichung 2 H₂O → 2 H₂ + O₂ ist Wasser der ___. Wasserstoff und Sauerstoff sind die ___.',
      luecken: [['Ausgangsstoff', 'Edukt'], ['Produkte']],
      erklaerung: 'Links vom Pfeil stehen die Ausgangsstoffe, rechts die Produkte.' },

    { id: 'q2-gleichung-v2', wieVorlage: 'q2-gleichung', schwierigkeit: 3,
      ...mc('Welche Zahl gehört in die Lücke? ___ Mg + O₂ → 2 MgO', '2', [
        ['1', 'Rechts stehen 2 Mg-Atome. Links braucht es darum auch 2.'],
        ['3', 'Dann wären links 3 Mg-Atome, rechts nur 2.'],
        ['4', 'Dann wären links 4 Mg-Atome, rechts nur 2.']],
        'Rechts: 2 Mg und 2 O. Links: 2 Mg und O₂ = 2 O. Jetzt stimmt die Gleichung.') },

    { id: 'q3-zeit-v2', wieVorlage: 'q3-zeit', typ: 'reihenfolge', schwierigkeit: 2,
      text: 'Ordne die Metalle danach, wann die Menschen sie gewinnen konnten (zuerst oben).',
      elemente: ['Kupfer (Bronzezeit)', 'Eisen (Eisenzeit)', 'Aluminium (vor rund 100 Jahren)'],
      erklaerung: 'Je fester ein Metall den Sauerstoff bindet, desto später konnte man es aus dem Oxid gewinnen.' },

    { id: 'q4-aktiv-v2', wieVorlage: 'q4-aktiv', schwierigkeit: 3,
      ...mc('Ein Streichholz brennt erst, wenn du es anreibst. Warum?', 'Das Anreiben liefert die Aktivierungsenergie. Danach läuft die Reaktion von selbst weiter.', [
        ['Beim Anreiben entsteht der Brennstoff.', 'Der Brennstoff ist schon im Streichholzkopf.'],
        ['Das Anreiben entfernt die Luft.', 'Ohne Luft könnte es gar nicht brennen.'],
        ['Streichhölzer brennen nur bei Kälte.', 'Die Temperatur der Umgebung ist nicht entscheidend.']],
        'Viele Reaktionen brauchen einen Anstoss. Danach liefert die exotherme Reaktion selbst genug Energie.') },

    { id: 'q5-ionen-v2', wieVorlage: 'q5-ionen', typ: 'zuordnen', schwierigkeit: 3,
      text: 'Was entsteht?',
      paare: [['Ein Natrium-Atom gibt ein Elektron ab.', 'Kation'], ['Ein Chlor-Atom nimmt ein Elektron auf.', 'Anion'], ['Ein Neon-Atom bleibt, wie es ist.', 'unverändert (Edelgas)']],
      erklaerung: 'Metall-Atome geben Elektronen ab und werden positiv. Nichtmetall-Atome nehmen Elektronen auf und werden negativ.' },

    { id: 'q6-skala-v2', wieVorlage: 'q6-skala', typ: 'zuordnen', schwierigkeit: 2,
      text: 'Ordne den pH-Wert zu.',
      paare: [['Zitronensaft, pH 2', 'sauer'], ['reines Wasser, pH 7', 'neutral'], ['Seifenlauge, pH 10', 'basisch']],
      erklaerung: 'pH unter 7 ist sauer, pH 7 neutral, pH über 7 basisch.' }
  ]
};
