import { DefaultTheme, type Theme } from 'expo-router';

import { radius, semanticColors } from '@/theme/tokens';

/**
 * Convention React Native Reusables : couleurs sémantiques accessibles en JS.
 * Pour le code applicatif, préférer directement `colors` de `@/theme/tokens`.
 */
export const THEME = {
  background: semanticColors.background,
  foreground: semanticColors.foreground,
  card: semanticColors.card,
  popover: semanticColors.popover,
  primary: semanticColors.primary,
  secondary: semanticColors.secondary,
  muted: semanticColors.muted,
  accent: semanticColors.accent,
  destructive: semanticColors.destructive,
  border: semanticColors.border,
  input: semanticColors.input,
  ring: semanticColors.ring,
  radius: radius.sm,
} as const;

/** Thème React Navigation (mode clair uniquement). */
export const NAV_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    background: THEME.background,
    border: THEME.border,
    card: THEME.card,
    notification: THEME.destructive,
    primary: THEME.primary,
    text: THEME.foreground,
  },
};
