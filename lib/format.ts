/**
 * Formatage des nombres affichés.
 * `fr-FR` sépare les milliers par une espace fine insécable (U+202F), absente de Fraunces
 * et de Hanken Grotesk : on la remplace par l'espace insécable (U+00A0), présente dans les deux.
 */
const formatters = new Map<number, Intl.NumberFormat>();

export function formatNumber(value: number, decimals = 0) {
  let formatter = formatters.get(decimals);
  if (!formatter) {
    formatter = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formatters.set(decimals, formatter);
  }
  return formatter.format(value).replace(/ /g, ' ');
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

/** « Mardi 15 septembre » */
export function formatLongDate(date: Date) {
  const label = dateFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}
