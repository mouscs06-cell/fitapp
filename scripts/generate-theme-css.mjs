/**
 * Génère global.css à partir de theme/tokens.ts (source unique de vérité).
 * Usage : npm run theme
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { radius, semanticColors } from '../theme/tokens.ts';

const toKebab = (key) => key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

/** #RRGGBB → "H S% L%" (canaux HSL attendus par `hsl(var(--x) / <alpha-value>)`) */
function hexToHslChannels(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const round = (n) => Math.round(n * 100) / 100;
  return `${round(h)} ${round(s * 100)}% ${round(l * 100)}%`;
}

const variables = [
  `    --radius: ${radius.sm}px;`,
  ...Object.entries(semanticColors).map(
    ([key, hex]) => `    --${toKebab(key)}: ${hexToHslChannels(hex)}; /* ${hex} */`
  ),
].join('\n');

const css = `/* Fichier généré par scripts/generate-theme-css.mjs — ne pas modifier à la main.
   Source : theme/tokens.ts → npm run theme */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${variables}
  }
}
`;

writeFileSync(fileURLToPath(new URL('../global.css', import.meta.url)), css);
console.log('global.css généré depuis theme/tokens.ts');
