import type { Config } from 'tailwindcss';
import { hairlineWidth } from 'nativewind/theme';

import { colors, radius, sizes, spacing, typography } from './theme/tokens';

/**
 * Toutes les valeurs viennent de theme/tokens.ts. Les échelles sont remplacées
 * (pas étendues) : une classe hors tokens (`p-5`, `text-red-500`…) n'est pas générée.
 *
 * La typographie passe par <Text variant>, pas par des classes.
 */
const px = (value: number) => `${value}px`;

const mapValues = <T, R>(record: Record<string, T>, fn: (value: T, key: string) => R) =>
  Object.fromEntries(Object.entries(record).map(([key, value]) => [key, fn(value, key)]));

const toKebab = (key: string) => key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

/** Couleurs RNR via variables CSS (global.css) pour l'opacité (`bg-primary/80`). */
const cssVar = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const spacingScale = { 0: '0px', px: '1px', ...mapValues(spacing, px) };
const sizeScale = { ...spacingScale, ...mapValues(sizes, px) };

/** Tailles standard des composants RNR non encore adaptés → notre échelle. */
const fontSizeFrom = (variant: keyof typeof typography): [string, { lineHeight: string }] => {
  const { fontSize, lineHeight } = typography[variant];
  return [px(fontSize), { lineHeight: px(lineHeight) }];
};

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Tokens : bg-bg, bg-surface, text-ink, text-ink-soft, border-line, bg-pine, bg-sage-fill…
      ...Object.fromEntries(Object.entries(colors).map(([key, hex]) => [toKebab(key), hex])),
      // Noms attendus par React Native Reusables
      background: cssVar('background'),
      foreground: cssVar('foreground'),
      card: { DEFAULT: cssVar('card'), foreground: cssVar('card-foreground') },
      popover: { DEFAULT: cssVar('popover'), foreground: cssVar('popover-foreground') },
      primary: { DEFAULT: cssVar('primary'), foreground: cssVar('primary-foreground') },
      secondary: { DEFAULT: cssVar('secondary'), foreground: cssVar('secondary-foreground') },
      muted: { DEFAULT: cssVar('muted'), foreground: cssVar('muted-foreground') },
      accent: { DEFAULT: cssVar('accent'), foreground: cssVar('accent-foreground') },
      destructive: { DEFAULT: cssVar('destructive'), foreground: cssVar('destructive-foreground') },
      border: cssVar('border'),
      input: cssVar('input'),
      ring: cssVar('ring'),
      chart: mapValues({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, (_, n) => cssVar(`chart-${n}`)),
    },
    spacing: spacingScale,
    borderRadius: { none: '0px', DEFAULT: px(radius.sm), ...mapValues(radius, px), full: '9999px' },
    fontFamily: {
      display: [typography.display.fontFamily],
      sans: [typography.body.fontFamily],
    },
    fontSize: {
      xs: fontSizeFrom('caption'),
      sm: fontSizeFrom('label'),
      base: fontSizeFrom('body'),
      lg: fontSizeFrom('heading'),
      xl: fontSizeFrom('heading'),
      '2xl': fontSizeFrom('title'),
    },
    extend: {
      height: sizeScale,
      width: sizeScale,
      size: sizeScale,
      minHeight: sizeScale,
      minWidth: sizeScale,
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
