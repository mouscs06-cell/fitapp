/**
 * Garde-fou : aucune couleur, taille ou typo en dur hors de theme/.
 * Usage : npm run lint:tokens
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIRS = ['app', 'components', 'features', 'store', 'hooks'];

const RULES = [
  { name: 'couleur hex en dur', pattern: /['"`]#[0-9a-fA-F]{3,8}['"`]/ },
  { name: 'couleur rgb/hsl en dur', pattern: /['"`]\s*(rgba?|hsla?)\(/ },
  {
    name: 'valeur typo/espacement/rayon en dur dans un style',
    pattern:
      /(?<![.\w])(fontSize|lineHeight|letterSpacing|fontWeight|fontFamily|padding\w*|margin\w*|gap|rowGap|columnGap|borderRadius|top|bottom|left|right)\s*:\s*['"]?-?\d/,
  },
  { name: 'fontFamily en dur', pattern: /\bfontFamily\s*:\s*['"]/ },
  { name: 'valeur arbitraire Tailwind (px/rem/#)', pattern: /\b[\w:-]+-\[[^\]]*(\d(px|rem)|#)[^\]]*\]/ },
  {
    name: 'classe typo (utiliser <Text variant>)',
    pattern: /className=\{?[^}\n]*\b(text-(xs|sm|base|lg|xl|2xl)|font-(display|sans|bold|semibold|medium)|leading-|tracking-)/,
    skip: (file) => file.startsWith('components/ui/'),
  },
];

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|jsx?)$/.test(entry)) files.push(path);
  }
};
for (const dir of DIRS) {
  try {
    walk(join(ROOT, dir));
  } catch {}
}

const problems = [];
for (const path of files) {
  const file = relative(ROOT, path);
  readFileSync(path, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      if (line.includes('tokens-ignore')) return;
      for (const rule of RULES) {
        if (rule.skip?.(file)) continue;
        if (rule.pattern.test(line)) problems.push(`${file}:${index + 1}  ${rule.name}\n    ${line.trim()}`);
      }
    });
}

if (problems.length) {
  console.error(`✖ ${problems.length} valeur(s) hors tokens :\n\n${problems.join('\n')}`);
  process.exit(1);
}
console.log(`✔ ${files.length} fichiers — aucune valeur en dur hors tokens.`);
