// Kleine Hilfen für Ergänzungsaufgaben mit Zufallszahlen
export const zufall = a => a[Math.floor(Math.random() * a.length)];
export const z = (n, d = 3) => {
  const f = 10 ** d, r = Math.round(n * f) / f;
  return String(r).replace('-', '−').replace('.', ',');
};
// MC-Kurzform: erste Option richtig, jede falsche Option mit Erklärung [Text, Erklärung]
export const mc = (text, richtig, falsche, erklaerung) => ({
  typ: 'mc', text, erklaerung,
  optionen: [{ text: richtig, richtig: true }, ...falsche.map(([t, e]) => ({ text: t, richtig: false, erklaerung: e }))]
});
export const zahl = (text, wert, einheit, erklaerung, hilfe, extra = {}) => ({ typ: 'zahl', text, wert, einheit, erklaerung, hilfe, ...extra });
