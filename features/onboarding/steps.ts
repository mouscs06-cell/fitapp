import type { Href } from 'expo-router';

/** Étapes comptées dans la progression (la bienvenue n'en fait pas partie). */
export const ONBOARDING_STEPS = ['goal', 'sex', 'age', 'body', 'activity', 'frequency', 'summary'] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

/** `fromSummary` : l'étape revient au récapitulatif après enregistrement. */
export const stepHref = (step: OnboardingStep, fromSummary = false): Href =>
  fromSummary ? `/onboarding/${step}?from=summary` : `/onboarding/${step}`;

/** Position 1-indexée de l'étape, ou 0 hors étapes (bienvenue). */
export function stepNumber(segment: string | undefined) {
  return ONBOARDING_STEPS.indexOf(segment as OnboardingStep) + 1;
}

export function nextStep(step: OnboardingStep): OnboardingStep {
  const index = ONBOARDING_STEPS.indexOf(step);
  return ONBOARDING_STEPS[Math.min(index + 1, ONBOARDING_STEPS.length - 1)] ?? 'summary';
}
