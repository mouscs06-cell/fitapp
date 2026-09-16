import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

import type { ActivityLevel, Goal, Sex, TrainingFrequency } from '@/features/onboarding/schema';
import { onboardingStorage } from '@/lib/mmkv';

type OnboardingAnswers = {
  goal: Goal | null;
  sex: Sex | null;
  age: number | null;
  heightCm: number | null;
  weightKg: number | null;
  activity: ActivityLevel | null;
  frequency: TrainingFrequency | null;
};

type OnboardingState = OnboardingAnswers & {
  completed: boolean;
  setGoal: (goal: Goal) => void;
  setSex: (sex: Sex) => void;
  setAge: (age: number) => void;
  setBody: (body: { heightCm: number; weightKg: number }) => void;
  setActivity: (activity: ActivityLevel) => void;
  setFrequency: (frequency: TrainingFrequency) => void;
  complete: () => void;
  reset: () => void;
};

const EMPTY_ANSWERS: OnboardingAnswers = {
  goal: null,
  sex: null,
  age: null,
  heightCm: null,
  weightKg: null,
  activity: null,
  frequency: null,
};

const mmkvStorage: StateStorage = {
  getItem: (name) => onboardingStorage.getString(name) ?? null,
  setItem: (name, value) => onboardingStorage.set(name, value),
  removeItem: (name) => {
    onboardingStorage.remove(name);
  },
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...EMPTY_ANSWERS,
      completed: false,
      setGoal: (goal) => set({ goal }),
      setSex: (sex) => set({ sex }),
      setAge: (age) => set({ age }),
      setBody: ({ heightCm, weightKg }) => set({ heightCm, weightKg }),
      setActivity: (activity) => set({ activity }),
      setFrequency: (frequency) => set({ frequency }),
      complete: () => set({ completed: true }),
      reset: () => set({ ...EMPTY_ANSWERS, completed: false }),
    }),
    {
      name: 'onboarding',
      version: 1,
      storage: createJSONStorage(() => mmkvStorage),
      // Les actions ne sont pas sérialisées.
      partialize: ({ goal, sex, age, heightCm, weightKg, activity, frequency, completed }) => ({
        goal,
        sex,
        age,
        heightCm,
        weightKg,
        activity,
        frequency,
        completed,
      }),
    }
  )
);

export type { OnboardingAnswers };
