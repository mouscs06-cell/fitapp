import * as React from 'react';
import {
  Text as RNText,
  View,
  useWindowDimensions,
  type Role,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { cn } from '@/lib/utils';
import { colors, fontFamilies, typography, type ColorToken, type TypographyVariant } from '@/theme/tokens';

/**
 * Classes de couleur/état injectées par un parent (ex. Button → texte blanc).
 * La typographie, elle, vient toujours de `variant`.
 */
const TextClassContext = React.createContext<string | undefined>(undefined);

const ROLE: Partial<Record<TypographyVariant, Role>> = {
  title: 'heading',
  heading: 'heading',
};

type TextProps = Omit<React.ComponentProps<typeof RNText>, 'children'> & {
  /** Rôle typographique. Défaut : `body`. */
  variant?: TypographyVariant;
  /** Couleur issue des tokens. Sans cette prop : `ink`, ou la couleur du parent (TextClassContext). */
  color?: ColorToken;
  /**
   * Chiffres à chasse fixe. Défaut : `true` pour `display` (chiffres héro).
   * Hanken Grotesk est déjà tabulaire ; pour Fraunces, chaque chiffre est placé
   * dans une cellule de largeur fixe (la police n'a pas de `tnum`).
   */
  tabular?: boolean;
  children?: React.ReactNode;
};

const DIGIT = /[0-9]/;

/** Dans une cellule tabulaire, l'approche est déjà intégrée à la largeur de cellule. */
const NO_TRACKING: TextStyle = { letterSpacing: 0 }; // tokens-ignore

function variantStyle(variant: TypographyVariant, color: ColorToken | undefined): TextStyle {
  const { fontFamily, fontSize, lineHeight, letterSpacing } = typography[variant];
  return {
    fontFamily,
    fontSize,
    lineHeight,
    letterSpacing,
    ...(color ? { color: colors[color] } : null),
  };
}

function Text({ variant = 'body', color, tabular, className, style, children, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  const { fontScale } = useWindowDimensions();
  const token = typography[variant];
  const family = fontFamilies[token.family];
  const isTabular = tabular ?? variant === 'display';
  const classes = cn('text-foreground', textClass, className);
  // Le style typographique passe après `style` : il ne peut pas être écrasé en dur.
  const typeStyle = variantStyle(variant, color);

  const content = typeof children === 'number' ? String(children) : children;

  if (isTabular && family.tabularDigits === 'emulated' && typeof content === 'string' && DIGIT.test(content)) {
    // Largeur du chiffre le plus large à la taille réellement affichée (Dynamic Type inclus),
    // l'approche négative de la variante resserre les cellules.
    const renderedSize = token.fontSize * Math.min(fontScale, token.maxFontSizeMultiplier);
    const cellWidth = Math.ceil(family.digitWidthEm * renderedSize + token.letterSpacing);
    return (
      <View
        accessible
        accessibilityLabel={content}
        role={ROLE[variant]}
        // Le conteneur ne reçoit que la mise en page (marges, alignement) du style passé.
        style={[{ flexDirection: 'row', alignItems: 'flex-start' }, style as StyleProp<ViewStyle>]}
      >
        {Array.from(content).map((char, index) =>
          DIGIT.test(char) ? (
            <View key={index} style={{ width: cellWidth, alignItems: 'center' }}>
              <RNText
                className={classes}
                style={[typeStyle, NO_TRACKING]}
                maxFontSizeMultiplier={token.maxFontSizeMultiplier}
                importantForAccessibility="no"
                {...props}
              >
                {char}
              </RNText>
            </View>
          ) : (
            <RNText
              key={index}
              className={classes}
              style={typeStyle}
              maxFontSizeMultiplier={token.maxFontSizeMultiplier}
              importantForAccessibility="no"
              {...props}
            >
              {char}
            </RNText>
          )
        )}
      </View>
    );
  }

  return (
    <RNText
      className={classes}
      role={ROLE[variant]}
      maxFontSizeMultiplier={token.maxFontSizeMultiplier}
      style={[style, typeStyle, isTabular && { fontVariant: ['tabular-nums'] }]}
      {...props}
    >
      {content}
    </RNText>
  );
}

export { Text, TextClassContext };
export type { TextProps };
