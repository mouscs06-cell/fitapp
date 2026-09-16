/**
 * Design tokens — source unique de vérité.
 *
 * Consommé par :
 *  - components/ui/text.tsx (typographie via la prop `variant`)
 *  - tailwind.config.ts (classes NativeWind : bg-surface, p-lg, rounded-md…)
 *  - scripts/generate-theme-css.mjs → global.css (variables des composants RNR)
 *  - lib/theme.ts (Skia, Victory, Reanimated, navigation)
 *
 * Fichier sans import ni syntaxe TS non effaçable : il est lu par Tailwind (jiti)
 * et par Node (type stripping). Après modification des couleurs : `npm run theme`.
 */

/* ------------------------------------------------------------------ */
/* Couleurs — mode clair uniquement                                    */
/* ------------------------------------------------------------------ */

/** Valeurs issues de la maquette validée (AujourdhuiScreen). */
export const colors = {
  bg: '#ECE8DF', // fond d'écran — avoine chaud
  surface: '#F7F4EE', // cartes, feuilles — papier surélevé
  ink: '#23261F', // texte principal — 12,6:1 sur bg
  inkSoft: '#5C5F54', // texte secondaire — 5,3:1 sur bg
  line: '#23261F17', // bordures et séparateurs — ink à 9 % (décoratif)
  pine: '#38583F', // action principale, chiffres clés — 7,3:1 avec surface
  sage: '#B9C4B2', // piste des jauges, fonds doux (jamais du texte)
  sageFill: '#7C9079', // vert moyen — remplissages secondaires, contours d'état
  amber: '#C6873F', // CTA rare (texte ink dessus, 5,1:1)
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Correspondance avec les noms attendus par React Native Reusables.
 * Aucune nouvelle valeur : uniquement des références aux tokens ci-dessus.
 */
export const semanticColors = {
  background: colors.bg,
  foreground: colors.ink,
  card: colors.surface,
  cardForeground: colors.ink,
  popover: colors.surface,
  popoverForeground: colors.ink,
  primary: colors.pine,
  primaryForeground: colors.surface,
  secondary: colors.sageFill,
  secondaryForeground: colors.ink,
  muted: colors.sageFill,
  mutedForeground: colors.inkSoft,
  accent: colors.sageFill,
  accentForeground: colors.ink,
  destructive: colors.ink, // amber est réservé au CTA : pas de couleur d'erreur dédiée
  destructiveForeground: colors.surface,
  border: colors.line,
  input: colors.line,
  ring: colors.pine,
  chart1: colors.pine,
  chart2: colors.sage,
  chart3: colors.amber,
  chart4: colors.inkSoft,
  chart5: colors.line,
} as const;

/* ------------------------------------------------------------------ */
/* Typographie                                                         */
/* ------------------------------------------------------------------ */

/**
 * En React Native, une graisse = un fichier de police : `fontFamily` pointe
 * vers le fichier chargé (theme/fonts.ts) et `fontWeight` est informatif,
 * jamais appliqué (sinon rendu faux sur Android).
 *
 * Chiffres tabulaires :
 *  - Hanken Grotesk : chiffres à chasse fixe par défaut (0–9 = 0.56 em), rien à faire.
 *  - Fraunces : aucune fonctionnalité `tnum` (ni Google Fonts, ni fichiers officiels)
 *    et chiffres proportionnels → émulés par <Text> avec une cellule de
 *    `digitWidthEm` × taille (largeur du chiffre le plus large, « 0 »).
 */
export const fontFamilies = {
  fraunces: {
    name: 'Fraunces',
    role: 'Gros chiffres héro uniquement',
    tabularDigits: 'emulated',
    digitWidthEm: 0.662, // Fraunces_500Medium : avance max 1324 / 2000 upm
  },
  hanken: {
    name: 'Hanken Grotesk',
    role: 'Tout le reste',
    tabularDigits: 'native',
    digitWidthEm: 0.56,
  },
} as const;

export type FontFamilyKey = keyof typeof fontFamilies;

export const typography = {
  display: {
    family: 'fraunces',
    fontFamily: 'Fraunces_500Medium',
    fontWeight: '500',
    fontSize: 62,
    lineHeight: 64,
    letterSpacing: -0.6,
    maxFontSizeMultiplier: 1.2,
  },
  title: {
    family: 'hanken',
    fontFamily: 'HankenGrotesk_600SemiBold',
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.4,
    maxFontSizeMultiplier: 1.4,
  },
  heading: {
    family: 'hanken',
    fontFamily: 'HankenGrotesk_600SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.2,
    maxFontSizeMultiplier: 1.6,
  },
  body: {
    family: 'hanken',
    fontFamily: 'HankenGrotesk_400Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    maxFontSizeMultiplier: 2,
  },
  label: {
    family: 'hanken',
    fontFamily: 'HankenGrotesk_500Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    maxFontSizeMultiplier: 2,
  },
  caption: {
    family: 'hanken',
    fontFamily: 'HankenGrotesk_400Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    maxFontSizeMultiplier: 2,
  },
} as const;

export type TypographyVariant = keyof typeof typography;

/* ------------------------------------------------------------------ */
/* Espacement, rayons, dimensions                                      */
/* ------------------------------------------------------------------ */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
} as const;

export type SpacingToken = keyof typeof spacing;

export const radius = {
  sm: 12,
  md: 16,
  lg: 24,
  pill: 99,
} as const;

export type RadiusToken = keyof typeof radius;

/** Dimensions de contrôles (hauteur/largeur), distinctes de l'espacement. */
export const sizes = {
  'icon-xs': 12,
  'icon-sm': 16,
  icon: 20,
  'control-sm': 40,
  control: 48,
  avatar: 40,
  'tab-bar': 64,
} as const;

export type SizeToken = keyof typeof sizes;

/* ------------------------------------------------------------------ */
/* Élévation, composants, mouvement                                    */
/* ------------------------------------------------------------------ */

/** Ombres au format `boxShadow` (New Architecture). Teinte ink, jamais de noir pur. */
export const shadows = {
  warm: [
    { offsetX: 0, offsetY: 1, blurRadius: 2, color: '#2A201A0D' },
    { offsetX: 0, offsetY: 8, blurRadius: 24, color: '#2A201A0F' },
  ],
} as const;

/** Anneau de focus clavier, dessiné en `boxShadow` (ne décale pas la mise en page). */
export const focusRing = {
  width: 3,
  color: colors.pine,
} as const;

/** Hauteurs de la barre Meter. */
export const meter = {
  thin: 5,
  regular: 6,
  thick: 8,
} as const;

export type MeterHeight = keyof typeof meter;

/** Préréglages de l'anneau de progression. */
export const ring = {
  sm: { size: 48, stroke: 4 },
  md: { size: 96, stroke: 8 },
  lg: { size: 160, stroke: 12 },
} as const;

export type RingPreset = keyof typeof ring;

/** Épaisseur de trait des icônes lucide. */
export const iconStroke = {
  regular: 1.5,
  active: 2.25,
} as const;

/** Durées en ms. Toute animation respecte « Réduire les animations ». */
export const motion = {
  press: 120,
  fill: 700,
  countUp: 900,
} as const;
