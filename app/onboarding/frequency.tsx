import { FREQUENCY_OPTIONS } from '@/features/onboarding/copy';
import { ChoiceStep } from '@/features/onboarding/choice-step';
import { frequencySchema } from '@/features/onboarding/schema';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function FrequencyScreen() {
  const frequency = useOnboardingStore((state) => state.frequency);
  const setFrequency = useOnboardingStore((state) => state.setFrequency);
  return (
    <ChoiceStep
      step="frequency"
      title="Combien de séances par semaine veux-tu faire ?"
      options={FREQUENCY_OPTIONS}
      value={frequency}
      onChange={setFrequency}
      schema={frequencySchema}
    />
  );
}
