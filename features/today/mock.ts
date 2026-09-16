/**
 * DONNÉES FICTIVES — écran Aujourd'hui.
 *
 * Reprises telles quelles de la maquette validée (AujourdhuiScreen), uniquement
 * pour construire l'interface. Aucune de ces valeurs n'est calculée ni médicale.
 * À remplacer par le calcul réel (profil d'onboarding) et Supabase.
 */
import type { Goal } from '@/features/onboarding/schema';

export type Macro = { key: 'protein' | 'carbs' | 'fat'; label: string; value: number; target: number };

export type Meal = { id: string; name: string; kcal: number; done: boolean };

export type TodayMock = {
  firstName: string;
  goal: Goal;
  calories: { target: number; consumed: number };
  macros: Macro[];
  workout: { title: string; minutes: number; exercises: number };
  meals: Meal[];
};

export const TODAY_MOCK: TodayMock = {
  firstName: 'Mouss',
  goal: 'gain',
  calories: { target: 2840, consumed: 1630 },
  macros: [
    { key: 'protein', label: 'Protéines', value: 182, target: 210 },
    { key: 'carbs', label: 'Glucides', value: 264, target: 360 },
    { key: 'fat', label: 'Lipides', value: 71, target: 90 },
  ],
  workout: { title: 'Haut du corps', minutes: 52, exercises: 6 },
  meals: [
    { id: 'breakfast', name: 'Petit-déjeuner', kcal: 640, done: true },
    { id: 'lunch', name: 'Déjeuner', kcal: 990, done: true },
    { id: 'dinner', name: 'Dîner', kcal: 0, done: false },
  ],
};
