import { ACTIVITY_OPTIONS } from '@/features/onboarding/copy';
import { ChoiceStep } from '@/features/onboarding/choice-step';
import { activitySchema } from '@/features/onboarding/schema';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function ActivityScreen() {
  const activity = useOnboardingStore((state) => state.activity);
  const setActivity = useOnboardingStore((state) => state.setActivity);
  return (
    <ChoiceStep
      step="activity"
      title="Quel est ton niveau d’activité au quotidien ?"
      description="Compte ta journée hors séances de sport."
      options={ACTIVITY_OPTIONS}
      value={activity}
      onChange={setActivity}
      schema={activitySchema}
    />
  );
}
