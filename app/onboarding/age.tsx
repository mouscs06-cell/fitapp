import { useState } from 'react';

import { NumberField } from '@/components/number-field';
import { OnboardingFrame } from '@/features/onboarding/onboarding-frame';
import { ageFieldSchema, firstError, toFieldText } from '@/features/onboarding/schema';
import { useStepNavigation } from '@/features/onboarding/use-step-navigation';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function AgeScreen() {
  const storedAge = useOnboardingStore((state) => state.age);
  const setAge = useOnboardingStore((state) => state.setAge);
  const { goNext, ctaLabel } = useStepNavigation('age');

  const [text, setText] = useState(toFieldText(storedAge));
  const [submitted, setSubmitted] = useState(false);
  const result = ageFieldSchema.safeParse(text);

  const handleContinue = () => {
    setSubmitted(true);
    if (!result.success) return;
    setAge(result.data);
    goNext();
  };

  return (
    <OnboardingFrame title="Quel âge as-tu ?" cta={{ label: ctaLabel, onPress: handleContinue }}>
      <NumberField
        label="Âge"
        unit="ans"
        value={text}
        onChangeText={setText}
        error={submitted ? firstError(result) : null}
        maxLength={2}
        autoFocus
        returnKeyType="done"
        onSubmitEditing={handleContinue}
      />
    </OnboardingFrame>
  );
}
