import { SEX_OPTIONS } from '@/features/onboarding/copy';
import { ChoiceStep } from '@/features/onboarding/choice-step';
import { sexSchema } from '@/features/onboarding/schema';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function SexScreen() {
  const sex = useOnboardingStore((state) => state.sex);
  const setSex = useOnboardingStore((state) => state.setSex);
  return (
    <ChoiceStep
      step="sex"
      title="Quel est ton sexe ?"
      description="Il sert à estimer tes besoins énergétiques."
      options={SEX_OPTIONS}
      value={sex}
      onChange={setSex}
      schema={sexSchema}
    />
  );
}
