import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  colors,
  fontFamilies,
  radius,
  spacing,
  typography,
  type ColorToken,
  type TypographyVariant,
} from '@/theme/tokens';

const VARIANT_SAMPLES: Record<TypographyVariant, string> = {
  display: '72,4',
  title: 'Votre semaine',
  heading: 'Programme du jour',
  body: 'Trois séances douces pour relancer l’énergie sans forcer.',
  label: 'Objectif hydratation',
  caption: 'Mis à jour il y a 5 min',
};

/** Couleur de texte lisible sur chaque pastille (contrastes vérifiés dans tokens.ts). */
const SWATCH_INK: Record<ColorToken, ColorToken> = {
  bg: 'ink',
  surface: 'ink',
  ink: 'surface',
  inkSoft: 'surface',
  line: 'ink',
  pine: 'surface',
  sage: 'surface',
  sageFill: 'ink',
  amber: 'surface',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-lg">
      <Text variant="label" color="inkSoft">
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

export default function DesignSystemScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="gap-2xl px-xl"
      contentContainerStyle={{ paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing['2xl'] }}
    >
      <View className="gap-xs">
        <Text variant="title">Design system</Text>
        <Text variant="body" color="inkSoft">
          Échelle typo, palette, espacements et rayons issus de theme/tokens.ts.
        </Text>
      </View>

      <Section title="Typographie">
        {(Object.keys(typography) as TypographyVariant[]).map((variant) => {
          const token = typography[variant];
          return (
            <View key={variant} className="gap-xs border-b border-line pb-lg">
              <Text variant="caption" color="inkSoft">
                {`${variant} · ${fontFamilies[token.family].name} ${token.fontWeight} · ${token.fontSize}/${token.lineHeight} · ${token.letterSpacing}`}
              </Text>
              <Text variant={variant}>{VARIANT_SAMPLES[variant]}</Text>
            </View>
          );
        })}
      </Section>

      <Section title="Chiffres tabulaires">
        <View className="rounded-lg bg-surface p-xl gap-md">
          <Text variant="caption" color="inkSoft">
            Fraunces · les colonnes doivent rester alignées
          </Text>
          <View className="items-end">
            <Text variant="display" color="pine">
              1 111
            </Text>
            <Text variant="display" color="pine">
              8 808
            </Text>
          </View>
          <Text variant="caption" color="inkSoft">
            Hanken Grotesk
          </Text>
          <View className="items-end">
            <Text variant="heading" tabular>
              1 111 kcal
            </Text>
            <Text variant="heading" tabular>
              8 808 kcal
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Palette">
        <View className="gap-sm">
          {(Object.keys(colors) as ColorToken[]).map((token) => (
            <View key={token} className="flex-row items-center gap-lg rounded-md bg-surface p-sm">
              <View
                className="size-control items-center justify-center rounded-sm border border-line"
                style={{ backgroundColor: colors[token] }}
              >
                <Text variant="label" color={SWATCH_INK[token]}>
                  Aa
                </Text>
              </View>
              <View className="flex-1">
                <Text variant="label">{token}</Text>
                <Text variant="caption" color="inkSoft">
                  {colors[token]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Espacement">
        {(Object.keys(spacing) as (keyof typeof spacing)[]).map((token) => (
          <View key={token} className="flex-row items-center gap-lg">
            <View className="w-control">
              <Text variant="label">{token}</Text>
            </View>
            <View className="rounded-sm bg-sage" style={{ width: spacing[token], height: spacing.lg }} />
            <Text variant="caption" color="inkSoft">
              {`${spacing[token]} px`}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Rayons">
        <View className="flex-row flex-wrap gap-lg">
          {(Object.keys(radius) as (keyof typeof radius)[]).map((token) => (
            <View key={token} className="items-center gap-xs">
              <View className="h-control px-2xl border border-line bg-sage-fill" style={{ borderRadius: radius[token] }} />
              <Text variant="caption" color="inkSoft">{`${token} · ${radius[token]}`}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Boutons">
        <View className="gap-sm">
          <Button>
            <Text variant="label">Commencer la séance</Text>
          </Button>
          <Button variant="outline">
            <Text variant="label">Plus tard</Text>
          </Button>
        </View>
      </Section>
    </ScrollView>
  );
}
