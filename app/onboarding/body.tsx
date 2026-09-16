import { useState } from 'react';
import { View } from 'react-native';

import { NumberField } from '@/components/number-field';
import { OnboardingFrame } from '@/features/onboarding/onboarding-frame';
import { firstError, heightFieldSchema, toFieldText, weightFieldSchema } from '@/features/onboarding/schema';
import { useStepNavigation } from '@/features/onboarding/use-step-navigation';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function BodyScreen() {
  const storedHeight = useOnboardingStore((state) => state.heightCm);
  const storedWeight = useOnboardingStore((state) => state.weightKg);
  const setBody = useOnboardingStore((state) => state.setBody);
  const { goNext, ctaLabel } = useStepNavigation('body');

  const [heightText, setHeightText] = useState(toFieldText(storedHeight));
  const [weightText, setWeightText] = useState(toFieldText(storedWeight));
  const [submitted, setSubmitted] = useState(false);

  const height = heightFieldSchema.safeParse(heightText);
  const weight = weightFieldSchema.safeParse(weightText);

  const handleContinue = () => {
    setSubmitted(true);
    if (!height.success || !weight.success) return;
    setBody({ heightCm: height.data, weightKg: weight.data });
    goNext();
  };

  return (
    <OnboardingFrame
      title="Ta taille et ton poids"
      description="Ils servent à calculer tes besoins et à suivre ta progression."
      cta={{ label: ctaLabel, onPress: handleContinue }}
    >
      <View className="gap-xl">
        <NumberField
          label="Taille"
          unit="cm"
          unitLabel="centimètres"
          value={heightText}
          onChangeText={setHeightText}
          error={submitted ? firstError(height) : null}
          maxLength={3}
          autoFocus
        />
        <NumberField
          label="Poids"
          unit="kg"
          unitLabel="kilos"
          decimal
          value={weightText}
          onChangeText={setWeightText}
          error={submitted ? firstError(weight) : null}
          maxLength={5}
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />
      </View>
    </OnboardingFrame>
  );
}
