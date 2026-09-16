import { GOAL_OPTIONS } from '@/features/onboarding/copy';
import { ChoiceStep } from '@/features/onboarding/choice-step';
import { goalSchema } from '@/features/onboarding/schema';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function GoalScreen() {
  const goal = useOnboardingStore((state) => state.goal);
  const setGoal = useOnboardingStore((state) => state.setGoal);
  return (
    <ChoiceStep
      step="goal"
      title="Quel est ton objectif ?"
      options={GOAL_OPTIONS}
      value={goal}
      onChange={setGoal}
      schema={goalSchema}
    />
  );
}
