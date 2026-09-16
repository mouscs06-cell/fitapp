import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FormError } from '@/components/form-error';
import { PrimaryButton, type PrimaryButtonProps } from '@/components/primary-button';
import { Text } from '@/components/ui/text';
import { spacing } from '@/theme/tokens';

type OnboardingFrameProps = {
  title: string;
  description?: string;
  /** Erreur d'étape (sélections). Les champs affichent leurs propres erreurs. */
  error?: string | null;
  cta: Pick<PrimaryButtonProps, 'label' | 'onPress' | 'variant'>;
  /** Contenu sous le CTA (ex. lien de développement). */
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * Corps commun des étapes : titre, contenu défilant, erreur, CTA fixé en bas au-dessus du clavier.
 * La barre de progression et le retour sont dans app/onboarding/_layout.tsx (persistants).
 */
export function OnboardingFrame({ title, description, error, cta, footer, children }: OnboardingFrameProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView className="flex-1 bg-bg" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-xl px-xl pt-xl pb-2xl"
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-sm">
          <Text variant="title" role="heading">
            {title}
          </Text>
          {description ? (
            <Text variant="body" color="inkSoft">
              {description}
            </Text>
          ) : null}
        </View>
        {children}
        <FormError message={error} />
      </ScrollView>

      <View className="gap-md border-t border-line bg-bg px-xl pt-lg" style={{ paddingBottom: insets.bottom + spacing.lg }}>
        <PrimaryButton variant="solid" {...cta} />
        {footer}
      </View>
    </KeyboardAvoidingView>
  );
}
