import type { ActivityLevel, Goal, Sex, TrainingFrequency } from '@/features/onboarding/schema';

/** Textes de l'onboarding : tutoiement, sentence case, verbes actifs. */

export const GOAL_OPTIONS: readonly { value: Goal; label: string; description: string }[] = [
  { value: 'gain', label: 'Prise de masse', description: 'Gagner du muscle progressivement' },
  { value: 'loss', label: 'Perte de poids', description: 'Perdre du gras en gardant ton énergie' },
  { value: 'maintain', label: 'Maintien', description: 'Rester en forme et stable' },
];

export const SEX_OPTIONS: readonly { value: Sex; label: string }[] = [
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
  { value: 'other', label: 'Autre' },
];

export const ACTIVITY_OPTIONS: readonly { value: ActivityLevel; label: string; description: string }[] = [
  { value: 'sedentary', label: 'Sédentaire', description: 'Surtout assis, peu de marche' },
  { value: 'light', label: 'Léger', description: 'Marche ou tâches actives quelques fois par semaine' },
  { value: 'moderate', label: 'Modéré', description: 'Debout ou en mouvement une bonne partie de la journée' },
  { value: 'intense', label: 'Intense', description: 'Travail physique ou sport presque tous les jours' },
];

export const FREQUENCY_OPTIONS: readonly { value: TrainingFrequency; label: string; description: string }[] = [
  { value: 2, label: '2 séances', description: 'Pour reprendre en douceur' },
  { value: 3, label: '3 séances', description: 'Un bon rythme pour progresser' },
  { value: 4, label: '4 séances', description: 'Un équilibre entre progrès et récupération' },
  { value: 5, label: '5 séances', description: 'Pour progresser rapidement' },
  { value: 6, label: '6 séances', description: 'Pour un engagement soutenu' },
];

export const labelOf = <T>(options: readonly { value: T; label: string }[], value: T | null) =>
  options.find((option) => option.value === value)?.label ?? '—';
