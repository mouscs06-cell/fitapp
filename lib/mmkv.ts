import { createMMKV } from 'react-native-mmkv';

/** Stockage local rapide et synchrone (préférences, cache UI, persistance zustand). */
export const storage = createMMKV({ id: 'app' });

/** Réponses de l'onboarding (persistées pour reprendre le flux après fermeture de l'app). */
export const onboardingStorage = createMMKV({ id: 'onboarding' });
