// Erklärungen zu den falschen Antworten der «Kurz testen»-Fragen aus den Naturalia-Lernkarten.
// Schlüssel: Paket → Vorlage (<Station>-kt<Kartennummer>) → { Index der Option in Naturalia (0 = richtig): Text }
// Von Claude erstellt, Entwurf bis zur Freigabe im Dashboard (Freigabe-ID «<paket>.<vorlage>#erklaerungen»).

export default {
  leistung: {
    's1-kt5': {
      1: 'Die Arbeit bleibt gleich. Die Kiste kommt gleich hoch, also braucht es gleich viel Arbeit, egal auf welchem Weg.',
      2: 'Der Weg wird länger, nicht kürzer: 4 m statt 1 m. Das ist der Preis für die kleinere Kraft.',
      3: 'Die Kiste liegt am Ende gleich hoch wie beim direkten Heben. Darum hat sie gleich viel Lageenergie.'
    },
    's2-kt4': {
      1: 'Beide heben dieselbe Last gleich hoch. Die Arbeit ist darum gleich gross, nur die Zeit ist verschieden.',
      2: 'Die Arbeit ist gleich, aber die Zeit nicht. Wer dieselbe Arbeit in kürzerer Zeit schafft, hat mehr Leistung.',
      3: 'Umgekehrt: Der zweite Kran braucht doppelt so lange. Er hat nur die halbe Leistung.'
    },
    's3-kt4': {
      1: 'Du hast mit 100 multipliziert. Kilo heisst aber 1000: 2,5 kW = 2500 W.',
      2: 'Du hast mit 10 multipliziert. Kilo heisst 1000, also 2,5 · 1000 = 2500 W.',
      3: 'Hier ist das Komma um eine Stelle zu weit gerutscht. 2,5 · 1000 = 2500, nicht 25 000.'
    },
    's4-kt5': {
      1: 'Du hast 12 durch 2 geteilt. Die Leistung ist aber Spannung mal Stromstärke: 12 V · 2 A = 24 W.',
      2: 'Du hast 12 und 2 addiert. Spannung und Stromstärke werden multipliziert: P = U · I.',
      3: 'Du hast 2 von 12 subtrahiert. Richtig ist P = U · I = 12 V · 2 A = 24 W.'
    },
    's5-kt5': {
      1: '100 W sind 0,1 kW, nicht 1 kW. Also 0,1 kW · 10 h = 1 kWh.',
      2: 'Du hast die 10 Stunden vergessen. 0,1 kW · 10 h = 1 kWh.',
      3: 'Du hast 100 W · 10 h = 1000 Wh gerechnet, aber dann Wh mit kWh verwechselt. 1000 Wh = 1 kWh.'
    },
    's6-kt4': {
      1: 'Du hast aufgenommen durch abgegeben geteilt. Richtig ist Nutzen durch Aufwand: 400 J : 500 J. Über 100 % ist unmöglich.',
      2: '20 % ist der Anteil, der als Wärme verloren geht (100 J von 500 J). Gefragt ist der genutzte Anteil.',
      3: 'Kein Gerät gibt mehr Energie ab, als es aufnimmt. Der Wirkungsgrad ist immer kleiner als 100 %.'
    }
  },
  motor: {
    'm1-kt4': {
      1: 'Ein Eisenkern verstärkt das Magnetfeld der Spule deutlich. Er macht den Elektromagneten stärker.',
      2: 'Mehr Windungen bedeuten ein stärkeres Magnetfeld, nicht ein schwächeres.',
      3: 'Mehr Strom verstärkt das Magnetfeld. Gefragt war, was ihn schwächer macht.'
    },
    'm2-kt5': {
      1: 'Die Kraft auf die Spule hängt von der Stromrichtung ab. Kehrt der Strom um, kehrt auch die Drehrichtung um.',
      2: 'Der Stromkreis ist weiterhin geschlossen. Der Motor läuft, nur in die andere Richtung.',
      3: 'Die Spannung bleibt gleich gross, also auch die Drehzahl. Nur die Richtung ändert sich.'
    },
    'm3-kt5': {
      1: 'Je schneller sich das Magnetfeld in der Spule ändert, desto grösser ist die Spannung. Die Drehzahl spielt also eine Rolle.',
      2: 'Schneller drehen gibt mehr Spannung, nicht weniger. Das merkst du beim Velodynamo: Schneller fahren, helleres Licht.',
      3: 'Null Spannung gibt es nur, wenn der Generator stillsteht.'
    },
    'm4-kt4': {
      1: '25 % ist der Anteil, der als Wärme verloren geht (50 W von 200 W). Gefragt ist der genutzte Anteil.',
      2: 'Du hast aufgenommen durch abgegeben geteilt. Richtig ist abgegeben durch aufgenommen: 150 W : 200 W = 75 %.',
      3: '150 W ist mehr als die Hälfte von 200 W. Rechne nach: 150 : 200 = 0,75.'
    },
    'm5-kt4': {
      1: 'Man kann nicht gleichzeitig Kraft und Drehzahl gewinnen. Was man an Kraft gewinnt, verliert man an Drehzahl.',
      2: 'Das grosse Rad hat mehr Zähne. Für eine ganze Umdrehung braucht es mehrere Umdrehungen des kleinen Rads.',
      3: 'Das gilt umgekehrt, wenn ein grosses Rad ein kleines antreibt. Hier treibt das kleine Rad das grosse an.'
    },
    'm6-kt5': {
      1: 'Du hast 12 und 5 addiert. Die Energie ist Spannung mal Ladung: 12 V · 5 Ah = 60 Wh.',
      2: 'Du hast 12 durch 5 geteilt. Richtig ist multiplizieren: 12 V · 5 Ah = 60 Wh.',
      3: 'Hier ist eine Null zu viel. 12 · 5 = 60, also 60 Wh.'
    }
  },
  'nt7-1': {
    'w1-kt4': {
      1: 'Die Aussage lässt sich nicht mit einem wiederholbaren Versuch prüfen. Darum ist sie nicht wissenschaftlich.',
      2: 'Geister kann man weder messen noch beobachten. Eine wissenschaftliche Aussage muss sich überprüfen lassen.',
      3: 'Das lässt sich leicht widerlegen: Mit Glückszahl fallen Leute trotzdem durch. Ein Versuch stützt die Aussage nicht.'
    },
    'w2-kt5': {
      1: 'Eine Beobachtung beschreibt, was du gesehen hast. Hier sagt jemand voraus, was passieren könnte.',
      2: 'Ein Messergebnis wäre eine Zahl aus einem Versuch. Der Versuch wurde hier noch gar nicht gemacht.',
      3: 'Eine Forschungsfrage endet mit einem Fragezeichen, zum Beispiel «Werden dickere Drähte langsamer warm?». Hier wird bereits eine Antwort vermutet.'
    },
    'w3-kt4': {
      1: 'Erfindungen sind wichtig, sie haben unser Leben stark verändert. Es geht darum, diesen Einfluss zu verstehen.',
      2: 'Viele Erfindungen entstanden durch gezielte Forschung. Ausserdem erklärt das nicht, warum Auswendiglernen wenig bringt.',
      3: 'Dass Jahreszahlen fest sind, wäre eher ein Grund, sie zu lernen. Der eigentliche Grund: Man kann sie nachschlagen.'
    },
    'w4-kt5': {
      1: 'Du hast addiert. Die Vergrösserungen werden multipliziert: 10 · 4 = 40.',
      2: 'Du hast geteilt. Das Objektiv vergrössert das Bild, das Okular vergrössert es nochmals: 10 · 4 = 40.',
      3: 'Hier ist eine Null zu viel. 10 · 4 = 40.'
    },
    'w5-kt5': {
      1: 'Salzwasser zieht Wasser aus den Zellen heraus. Darum schrumpfen die roten Flächen, statt grösser zu werden.',
      2: 'Unter dem Mikroskop siehst du deutlich, dass sich die roten Flächen zusammenziehen.',
      3: 'Das Salzwasser enthält keinen Farbstoff. Die rote Farbe der Zellen bleibt, nur die Fläche wird kleiner.'
    },
    'w6-kt5': {
      1: 'Das Gewicht der Bohnen wird nicht verglichen. Der einzige Unterschied zwischen den Töpfen ist die Abdeckung.',
      2: '«Schön» kann man nicht messen. Eine Forschungsfrage muss sich mit einem Versuch beantworten lassen.',
      3: 'Beide Töpfe stehen im selben Zimmer. Die Zimmertemperatur unterscheidet sie also nicht.'
    }
  },
  'nt7-3': {
    'r1-kt4': {
      1: 'Die Zunge funktioniert beim Schnupfen ganz normal. Was fehlt, ist der Geruch.',
      2: 'Der Geschmack entsteht in Mund und Nase, nicht im Magen.',
      3: 'Auch mit geschlossenen Augen schmeckt Essen normal. Der Geruchssinn ist hier entscheidend.'
    },
    'r2-kt4': {
      1: 'Reflexe laufen gerade ohne Nachdenken ab. Darum sind sie so schnell.',
      2: 'Reflexe sind angeboren, zum Beispiel das Zurückziehen der Hand von der heissen Herdplatte.',
      3: 'Reflexe wirken immer, auch im Wachzustand, zum Beispiel der Lidschlussreflex.'
    },
    'r3-kt4': {
      1: 'Beim Schall wandert keine Luft von der Quelle zum Ohr. Die Teilchen schwingen nur hin und her und stossen ihre Nachbarn an.',
      2: 'Licht und Schall sind verschieden. Schall braucht Teilchen, zum Beispiel Luft. Deshalb kommt der Donner später als der Blitz.',
      3: 'Schall ist keine Wärme. Er breitet sich in alle Richtungen aus, nicht nur nach oben.'
    },
    'r4-kt4': {
      1: 'Eine Salbe erreicht das Innenohr nicht. Die zerstörten Sinneshärchen lassen sich nicht heilen.',
      2: 'Schlaf erholt das Ohr nur nach leichter Überlastung. Zerstörte Sinneshärchen wachsen auch im Schlaf nicht nach.',
      3: 'Die Ohren gewöhnen sich nicht an Lärm. Lauteres Hören zerstört noch mehr Sinneshärchen.'
    },
    'r5-kt4': {
      1: 'Flacher wird die Linse beim Blick in die Ferne. Für Nahes muss sie das Licht stärker brechen.',
      2: 'Die Linse bleibt im Auge. Sie ändert nur ihre Form durch den Ziliarmuskel.',
      3: 'Ohne Anpassung wäre das Bild unscharf. Die Linse muss ihre Wölbung ändern.'
    },
    'r6-kt4': {
      1: 'Eine konvexe Linse (Sammellinse) hilft bei Weitsichtigkeit. Beim kurzsichtigen Auge liegt das Bild schon vor der Netzhaut.',
      2: 'Ohne Korrektur bleibt das Bild von fernen Dingen unscharf. Eine Brille oder Kontaktlinse hilft.',
      3: 'Ein Spiegel lenkt Licht zurück und kann den Sehfehler nicht korrigieren.'
    }
  },
  'nt7-4': {
    'b1-kt5': {
      1: 'Beschleunigt heisst, die Geschwindigkeit ändert sich. Schnell sein allein reicht dafür nicht.',
      2: 'Verzögert heisst, der Zug wird langsamer. Wie lange er fährt, spielt dafür keine Rolle.',
      3: 'Der Zug fährt mit 150 km/h, er steht also nicht. «Gleich schnell» heisst nicht «still».'
    },
    'b2-kt5': {
      1: 'Du hast Zeit durch Weg gerechnet. Die Geschwindigkeit ist Weg durch Zeit: 100 m : 20 s = 5 m/s.',
      2: 'Du hast multipliziert. Richtig ist teilen: 100 m : 20 s = 5 m/s.',
      3: 'Du hast subtrahiert. Weg und Zeit werden geteilt: 100 : 20 = 5.'
    },
    'b3-kt4': {
      1: 'Du hast durch 3,6 geteilt. Von m/s nach km/h multiplizierst du mit 3,6.',
      2: 'm/s und km/h sind verschiedene Einheiten. Die Zahl ändert sich beim Umrechnen.',
      3: 'Du hast mit 10 multipliziert. Der Umrechnungsfaktor ist 3,6: 5 · 3,6 = 18.'
    },
    'b4-kt4': {
      1: 'Es fehlen Formelzeichen und Einheit. Ohne Einheit weiss man nicht, ob Sekunden oder Minuten gemeint sind.',
      2: 'Das ist nur die Einheit. Es fehlt, welche Grösse gemessen wird.',
      3: '«x» sagt nicht, was gemessen wird. Eine Achse braucht Grösse und Einheit.'
    },
    'b5-kt4': {
      1: 'Steiler heisst mehr Weg pro Sekunde, also schneller. Der langsamere Läufer hat die flachere Gerade.',
      2: 'Gleich steil wären die Geraden nur bei gleicher Geschwindigkeit.',
      3: 'Eine waagrechte Gerade bedeutet: Der Weg ändert sich nicht, der Läufer steht still.'
    },
    'b6-kt5': {
      1: 'Eine steigende Gerade bedeutet: Das Auto wird schneller. Beim Bremsen nimmt die Geschwindigkeit ab.',
      2: 'Eine waagrechte Linie bedeutet gleichbleibende Geschwindigkeit. Beim Bremsen ändert sie sich.',
      3: 'Eine immer steiler werdende Kurve zeigt immer stärkeres Beschleunigen. Gleichmässiges Bremsen ergibt eine fallende Gerade.'
    }
  },
  'nt7-5': {
    'e1-kt4': {
      1: 'Umgekehrt: Je höher das Wasser liegt, desto tiefer kann es fallen, und desto mehr Lageenergie hat es.',
      2: 'Die Temperatur hat mit der Lageenergie nichts zu tun. Entscheidend sind Masse und Höhe.',
      3: 'Die Lageenergie hängt direkt von der Höhe ab. Darum baut man Stauseen hoch in die Berge.'
    },
    'e2-kt4': {
      1: 'Das ist umgekehrt, so arbeitet eine Lampe. Die Solarzelle nimmt Licht auf und gibt elektrische Energie ab.',
      2: 'Lageenergie wird zu Bewegungsenergie, wenn etwas herunterfällt, zum Beispiel bei der Achterbahn.',
      3: 'Chemische Energie steckt zum Beispiel in einer Batterie. Eine Solarzelle wird mit Licht betrieben.'
    },
    'e3-kt4': {
      1: 'Energie verschwindet nie. Sie bleibt erhalten, ist aber als Wärme in der Umgebung kaum noch nutzbar.',
      2: 'Entwertung heisst hier nicht Geldwert. Es geht darum, wie gut sich die Energie noch nutzen lässt.',
      3: 'Energie wird ständig umgewandelt, zum Beispiel in der Lampe von elektrischer in Strahlungsenergie und Wärme.'
    },
    'e4-kt4': {
      1: 'Kilo heisst 1000, nicht 10. 3 kJ = 3 · 1000 J = 3000 J.',
      2: 'Du hast geteilt statt multipliziert. Von kJ nach J wird die Zahl grösser: 3 · 1000 = 3000.',
      3: 'Kilo heisst 1000, nicht 100. 3 kJ = 3000 J.'
    },
    'e5-kt4': {
      1: 'Fell erzeugt keine Energie. Die Energie kommt aus der Nahrung, das Fell hält sie nur länger im Körper.',
      2: 'Kälte ist keine Energieform, die angezogen wird. Es fliesst thermische Energie vom Warmen ins Kalte, und das Fell bremst das.',
      3: 'Das Fell ist zwar schwer, aber seine Aufgabe ist die Isolation gegen Wärmeverlust.'
    },
    'e6-kt5': {
      1: 'Energie nimmt nicht ab. Sie wird umgewandelt, die Gesamtmenge bleibt gleich.',
      2: 'Im Alltag sagt man «Energie verbrauchen». Physikalisch wird sie aber nur umgewandelt, oft in Wärme.',
      3: 'Hält etwas an, ist die Bewegungsenergie zum Beispiel durch Reibung zu Wärme geworden. Sie ist nicht verschwunden.'
    }
  },
  'nt7-7': {
    'c1-kt4': {
      1: 'Beim Backen entstehen neue Stoffe, zum Beispiel die braune Kruste. Das lässt sich nicht rückgängig machen.',
      2: 'Wachs reagiert mit Sauerstoff zu Kohlenstoffdioxid und Wasser. Es entstehen neue Stoffe.',
      3: 'Aus Eisen und Sauerstoff entsteht Rost, ein neuer Stoff mit anderen Eigenschaften.'
    },
    'c2-kt5': {
      1: 'Masse entsteht nie aus dem Nichts. Die zusätzliche Masse kommt vom Sauerstoff aus der Luft.',
      2: 'Beim Verbrennen ist kein Wasser im Spiel. Das Eisen verbindet sich mit Sauerstoff.',
      3: 'Der Luftdruck ist vorher und nachher gleich. Er erklärt nicht, warum die Waage mehr anzeigt.'
    },
    'c3-kt5': {
      1: 'Eine spontane Reaktion startet von selbst, ohne Anzünden. Hier braucht es einen Anstoss.',
      2: '«Retour» ist kein Fachbegriff für Reaktionen. Gesucht ist der Begriff für eine Reaktion, die einen Anstoss braucht.',
      3: 'Die Reaktion brennt danach von selbst weiter. Sie gibt also Energie ab und läuft nicht langsam.'
    },
    'c4-kt4': {
      1: 'Ohne Licht findet keine Fotosynthese statt. Salzwasser schadet der Süsswasserpflanze zusätzlich.',
      2: 'In kochendem Wasser stirbt die Pflanze ab. Ausserdem enthält es kaum noch gelöstes Kohlenstoffdioxid.',
      3: 'Die Pflanze braucht Licht als Energiequelle. Im Dunkeln entstehen keine Sauerstoffbläschen.'
    },
    'c5-kt4': {
      1: 'Ein Element besteht aus nur einer Atomsorte. Wasser enthält zwei Atomsorten, Wasserstoff und Sauerstoff.',
      2: 'Wasser ist ein Reinstoff, kein Gemisch. Es enthält weder Luft noch Erde.',
      3: 'Die Formel H₂O zeigt zwei Atomsorten: Wasserstoff (H) und Sauerstoff (O).'
    },
    'c6-kt4': {
      1: 'Die Masse steigt innerhalb einer Gruppe von oben nach unten. Die Elemente haben also nicht dieselbe Masse.',
      2: 'Die Elemente einer Gruppe wurden zu ganz verschiedenen Zeiten entdeckt.',
      3: 'Jedes Element hat seinen eigenen Namen, zum Beispiel Lithium, Natrium und Kalium in der ersten Gruppe.'
    }
  },
  'nt8-1': {
    'k1-kt4': {
      1: 'Mit nur einem Kabel fehlt der Rückweg zur Batterie. Der Stromkreis ist offen.',
      2: 'Ein offener Schalter unterbricht den Stromkreis. Die Lampe bleibt dunkel.',
      3: 'Eine Lampe allein leuchtet auch. Wichtig ist, dass der Stromkreis geschlossen ist.'
    },
    'k2-kt4': {
      1: 'In der Serieschaltung gibt es nur einen Stromweg. Fehlt eine Lampe, ist er unterbrochen, und alle gehen aus.',
      2: 'In der Parallelschaltung hat jede Lampe ihren eigenen Stromweg. Die anderen leuchten weiter.',
      3: 'Es geht um eine Schaltung mit mehreren Lampen. In der Parallelschaltung leuchten die übrigen weiter.'
    },
    'k3-kt4': {
      1: 'Ein grösserer Widerstand bremst den Strom stärker. Die Stromstärke wird kleiner, nicht grösser.',
      2: 'Nach I = U : R hängt die Stromstärke vom Widerstand ab. Ändert sich R, ändert sich auch I.',
      3: 'Stromstärke und Spannung sind verschiedene Grössen. Die eine kann nicht zur anderen werden.'
    },
    'k4-kt4': {
      1: 'Gleich viel Spannung liegt nur an gleichen Lampen. Hier liegen an der ersten 4 V, es bleiben 9 V − 4 V = 5 V.',
      2: 'Du hast addiert. Die Teilspannungen ergeben zusammen 9 V, also bleiben 9 V − 4 V = 5 V.',
      3: 'Die 9 V teilen sich auf beide Lampen auf. An der zweiten liegt nur der Rest: 5 V.'
    },
    'k5-kt4': {
      1: 'Die magnetische Wirkung nutzt zum Beispiel ein Elektromotor. Ein Toaster soll heiss werden.',
      2: 'Die chemische Wirkung nutzt man zum Beispiel beim Laden eines Akkus. Der Toaster nutzt heisse Drähte.',
      3: 'Sobald Strom fliesst, hat er immer eine Wirkung. Beim Toaster ist es die Wärmewirkung.'
    },
    'k6-kt4': {
      1: 'Aufladen ändert nur, wie lange die Batterie hält. Die Stromrichtung bleibt gleich.',
      2: 'Kühlen ändert die Stromrichtung nicht. Die Drehrichtung bleibt gleich.',
      3: 'Ein zusätzliches Kabel ändert nichts an der Stromrichtung durch den Motor.'
    }
  },
  'nt8-5': {
    'f1-kt4': {
      1: 'In Kilogramm misst man die Masse. Die Gewichtskraft ist eine Kraft und wird in Newton gemessen.',
      2: 'Meter ist die Einheit der Länge, nicht der Kraft.',
      3: 'Sekunde ist die Einheit der Zeit, nicht der Kraft.'
    },
    'f2-kt4': {
      1: 'Die Gleitreibung wirkt erst, wenn der Schrank schon rutscht. Hier steht er noch still.',
      2: 'Rollreibung gibt es bei Rädern und Rollen. Der Schrank steht direkt auf dem Boden.',
      3: 'Es wirkt eine Kraft, sonst würde sich der Schrank beim Schieben bewegen. Das ist die Haftreibungskraft.'
    },
    'f3-kt5': {
      1: 'Die Kräfte sind gleich gross. Keine Seite zieht stärker, darum bewegt sich das Seil nicht.',
      2: 'Das Seil bewegt sich nur, wenn eine Seite stärker zieht. Hier sind beide gleich stark.',
      3: 'Entgegengesetzte Kräfte werden voneinander abgezogen, nicht addiert. Gleich grosse heben sich auf.'
    },
    'f4-kt4': {
      1: 'Beim schrägen Ziehen wirkt nur ein Teil der Kraft nach oben. Man braucht dann mehr Kraft.',
      2: 'Je weiter die Arme gespreizt sind, desto schräger ziehen sie, und desto mehr Kraft braucht es.',
      3: 'Die Richtung spielt eine grosse Rolle. Nur der senkrechte Anteil der Kraft trägt die Kiste.'
    },
    'f5-kt5': {
      1: 'Der Flaschenzug spart Kraft, er braucht nicht mehr davon. Die Kraft verteilt sich auf 4 Seilstücke.',
      2: 'Man spart nie Kraft und Weg zugleich. Für weniger Kraft muss man mehr Seil ziehen.',
      3: 'Die Arbeit bleibt gleich: ein Viertel der Kraft mal den vierfachen Weg.'
    },
    'f6-kt5': {
      1: 'Beide heben die gleiche Masse gleich hoch. Die Arbeit ist darum gleich, egal wie lange es dauert.',
      2: 'Die Arbeit ist gleich, aber B braucht weniger Zeit. Darum hat B die grössere Leistung.',
      3: 'Die Arbeit hängt von Gewichtskraft und Höhe ab, nicht von der Zeit. Beide verrichten gleich viel Arbeit.'
    }
  }
};
