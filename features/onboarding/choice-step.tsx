import { useState } from 'react';
import { View } from 'react-native';
import type { z } from 'zod';

import { SelectableCard } from '@/components/selectable-card';
import { firstError } from '@/features/onboarding/schema';
import { OnboardingFrame } from '@/features/onboarding/onboarding-frame';
import type { OnboardingStep } from '@/features/onboarding/steps';
import { useStepNavigation } from '@/features/onboarding/use-step-navigation';

type ChoiceStepProps<T extends string | number> = {
  step: OnboardingStep;
  title: string;
  description?: string;
  options: readonly { value: T; label: string; description?: string }[];
  value: T | null;
  onChange: (value: T) => void;
  schema: z.ZodType<T>;
};

/** Étape à choix unique : cartes sélectionnables, validation au tap sur « Continuer ». */
export function ChoiceStep<T extends string | number>({
  step,
  title,
  description,
  options,
  value,
  onChange,
  schema,
}: ChoiceStepProps<T>) {
  const { goNext, ctaLabel } = useStepNavigation(step);
  const [submitted, setSubmitted] = useState(false);
  // Calculée à chaque rendu : l'erreur disparaît dès qu'une réponse est choisie.
  const error = submitted ? firstError(schema.safeParse(value)) : null;

  const handleContinue = () => {
    setSubmitted(true);
    if (schema.safeParse(value).success) goNext();
  };

  return (
    <OnboardingFrame title={title} description={description} error={error} cta={{ label: ctaLabel, onPress: handleContinue }}>
      <View role="radiogroup" accessibilityLabel={title} className="gap-sm">
        {options.map((option) => (
          <SelectableCard
            key={String(option.value)}
            title={option.label}
            description={option.description}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </View>
    </OnboardingFrame>
  );
}
