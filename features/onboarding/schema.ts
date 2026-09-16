import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Valeurs possibles                                                   */
/* ------------------------------------------------------------------ */

export const GOALS = ['gain', 'loss', 'maintain'] as const;
export const SEXES = ['male', 'female', 'other'] as const;
export const ACTIVITY_LEVELS = ['sedentary', 'light', 'moderate', 'intense'] as const;
export const TRAINING_FREQUENCIES = [2, 3, 4, 5, 6] as const;

export type Goal = (typeof GOALS)[number];
export type Sex = (typeof SEXES)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];
export type TrainingFrequency = (typeof TRAINING_FREQUENCIES)[number];

export const AGE = { min: 18, max: 90 } as const;
export const HEIGHT_CM = { min: 120, max: 230 } as const;
export const WEIGHT_KG = { min: 35, max: 250 } as const;

/* ------------------------------------------------------------------ */
/* Messages : tutoiement, dire quoi corriger, jamais d'excuse          */
/* ------------------------------------------------------------------ */

export const MESSAGES = {
  goal: 'Choisis un objectif pour continuer.',
  sex: 'Choisis une réponse pour continuer.',
  ageEmpty: 'Indique ton âge.',
  ageInvalid: 'Indique ton âge en chiffres, par exemple 34.',
  ageInteger: 'Indique ton âge en années, sans décimale.',
  ageMin: `Le programme est réservé aux personnes de ${AGE.min} ans et plus.`,
  ageMax: `Indique un âge de ${AGE.max} ans maximum.`,
  height: `Indique ta taille en centimètres, entre ${HEIGHT_CM.min} et ${HEIGHT_CM.max}.`,
  weight: `Indique ton poids en kilos, entre ${WEIGHT_KG.min} et ${WEIGHT_KG.max}.`,
  weightDecimal: 'Indique ton poids avec une seule décimale, par exemple 72,5.',
  activity: 'Choisis ton niveau d’activité pour continuer.',
  frequency: 'Choisis un nombre de séances pour continuer.',
} as const;

/* ------------------------------------------------------------------ */
/* Saisie texte → nombre                                               */
/* ------------------------------------------------------------------ */

/** « 72,5 » → 72.5 ; chaîne vide → null ; saisie invalide → NaN. */
export function parseDecimal(input: string): number | null {
  const trimmed = input.trim().replace(',', '.');
  if (trimmed === '') return null;
  return /^\d+(\.\d+)?$/.test(trimmed) ? Number(trimmed) : Number.NaN;
}

/** Nombre → texte du champ, avec la virgule française. */
export function toFieldText(value: number | null) {
  return value === null ? '' : String(value).replace('.', ',');
}

/* ------------------------------------------------------------------ */
/* Schémas par étape                                                   */
/* ------------------------------------------------------------------ */

export const goalSchema = z.enum(GOALS, { error: MESSAGES.goal });
export const sexSchema = z.enum(SEXES, { error: MESSAGES.sex });
export const activitySchema = z.enum(ACTIVITY_LEVELS, { error: MESSAGES.activity });
export const frequencySchema = z
  .number({ error: MESSAGES.frequency })
  .refine((n): n is TrainingFrequency => (TRAINING_FREQUENCIES as readonly number[]).includes(n), {
    error: MESSAGES.frequency,
  });

export const ageSchema = z
  .number({ error: MESSAGES.ageEmpty })
  .int({ error: MESSAGES.ageInteger })
  .min(AGE.min, { error: MESSAGES.ageMin })
  .max(AGE.max, { error: MESSAGES.ageMax });

export const heightSchema = z
  .number({ error: MESSAGES.height })
  .int({ error: MESSAGES.height })
  .min(HEIGHT_CM.min, { error: MESSAGES.height })
  .max(HEIGHT_CM.max, { error: MESSAGES.height });

export const weightSchema = z
  .number({ error: MESSAGES.weight })
  .min(WEIGHT_KG.min, { error: MESSAGES.weight })
  .max(WEIGHT_KG.max, { error: MESSAGES.weight })
  // Une décimale au plus (tolérance aux arrondis flottants).
  .refine((n) => Math.abs(n * 10 - Math.round(n * 10)) < 1e-9, { error: MESSAGES.weightDecimal });

/** Champ texte → nombre validé. Vide et saisie non numérique ont chacun leur message. */
const numberField = (schema: z.ZodType<number, number>, messages: { empty: string; invalid: string }) =>
  z
    .string()
    .refine((text) => parseDecimal(text) !== null, { error: messages.empty })
    .refine((text) => !Number.isNaN(parseDecimal(text)), { error: messages.invalid, abort: true })
    .transform((text) => parseDecimal(text) as number)
    .pipe(schema);

export const ageFieldSchema = numberField(ageSchema, { empty: MESSAGES.ageEmpty, invalid: MESSAGES.ageInvalid });
export const heightFieldSchema = numberField(heightSchema, { empty: MESSAGES.height, invalid: MESSAGES.height });
export const weightFieldSchema = numberField(weightSchema, { empty: MESSAGES.weight, invalid: MESSAGES.weight });

/** Profil complet : utilisé au récapitulatif. */
export const profileSchema = z.object({
  goal: goalSchema,
  sex: sexSchema,
  age: ageSchema,
  heightCm: heightSchema,
  weightKg: weightSchema,
  activity: activitySchema,
  frequency: frequencySchema,
});

export type OnboardingProfile = z.infer<typeof profileSchema>;

/** Premier message d'erreur d'un résultat zod, ou null si valide. */
export function firstError(result: { success: boolean; error?: z.ZodError }) {
  return result.success ? null : (result.error?.issues[0]?.message ?? null);
}
