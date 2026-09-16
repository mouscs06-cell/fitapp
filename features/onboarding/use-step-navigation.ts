import { router, useLocalSearchParams } from 'expo-router';

import { nextStep, stepHref, type OnboardingStep } from '@/features/onboarding/steps';

/**
 * Avance à l'étape suivante, ou revient au récapitulatif si l'étape a été ouverte
 * depuis « Modifier » (`?from=summary`).
 */
export function useStepNavigation(step: OnboardingStep) {
  const { from } = useLocalSearchParams<{ from?: string }>();
  return {
    goNext: () => (from === 'summary' ? router.back() : router.push(stepHref(nextStep(step)))),
    ctaLabel: from === 'summary' ? 'Enregistrer' : 'Continuer',
  };
}
