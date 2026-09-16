import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/ui/text';
import { ACTIVITY_OPTIONS, FREQUENCY_OPTIONS, GOAL_OPTIONS, SEX_OPTIONS, labelOf } from '@/features/onboarding/copy';
import { OnboardingFrame } from '@/features/onboarding/onboarding-frame';
import { profileSchema } from '@/features/onboarding/schema';
import { ONBOARDING_STEPS, stepHref, type OnboardingStep } from '@/features/onboarding/steps';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { formatNumber } from '@/lib/format';
import { useOnboardingStore, type OnboardingAnswers } from '@/store/onboarding-store';

type Row = { key: keyof OnboardingAnswers; label: string; value: string; step: OnboardingStep };

function SummaryRow({ row, last }: { row: Row; last: boolean }) {
  const { focusStyle, focusProps } = useFocusRing();
  return (
    <Pressable
      role="button"
      accessibilityLabel={`${row.label} : ${row.value}`}
      accessibilityHint="Modifier cette réponse"
      onPress={() => router.push(stepHref(row.step, true))}
      className={['flex-row items-center justify-between gap-lg rounded-sm py-md', !last && 'border-b border-line']
        .filter(Boolean)
        .join(' ')}
      style={focusStyle}
      {...focusProps}
    >
      <View className="flex-1 gap-xs">
        <Text variant="caption" color="inkSoft">
          {row.label}
        </Text>
        <Text variant="body" tabular>
          {row.value}
        </Text>
      </View>
      <Text variant="label" color="pine">
        Modifier
      </Text>
    </Pressable>
  );
}

export default function SummaryScreen() {
  const answers = useOnboardingStore();
  const { complete, reset } = answers;

  const rows: Row[] = [
    { key: 'goal', label: 'Objectif', value: labelOf(GOAL_OPTIONS, answers.goal), step: 'goal' },
    { key: 'sex', label: 'Sexe', value: labelOf(SEX_OPTIONS, answers.sex), step: 'sex' },
    { key: 'age', label: 'Âge', value: answers.age === null ? '—' : `${formatNumber(answers.age)} ans`, step: 'age' },
    {
      key: 'heightCm',
      label: 'Taille',
      value: answers.heightCm === null ? '—' : `${formatNumber(answers.heightCm)} cm`,
      step: 'body',
    },
    {
      key: 'weightKg',
      label: 'Poids',
      value: answers.weightKg === null ? '—' : `${formatNumber(answers.weightKg, Number.isInteger(answers.weightKg) ? 0 : 1)} kg`,
      step: 'body',
    },
    { key: 'activity', label: 'Activité', value: labelOf(ACTIVITY_OPTIONS, answers.activity), step: 'activity' },
    {
      key: 'frequency',
      label: 'Entraînement',
      value: answers.frequency === null ? '—' : `${labelOf(FREQUENCY_OPTIONS, answers.frequency)} par semaine`,
      step: 'frequency',
    },
  ];

  const profile = profileSchema.safeParse(answers);
  const firstMissing = rows.find((row) => answers[row.key] === null)?.step;

  const handleFinish = () => {
    if (!profile.success) {
      // Ne devrait pas arriver dans le parcours normal (reprise après mise à jour, lien direct…).
      router.push(stepHref(firstMissing ?? ONBOARDING_STEPS[0]));
      return;
    }
    complete();
    router.replace('/program');
  };

  return (
    <OnboardingFrame
      title="Ton programme est prêt"
      description="Vérifie tes réponses. Touche une ligne pour la modifier."
      error={profile.success ? null : 'Complète les réponses manquantes pour voir ton programme.'}
      cta={{ label: 'Voir mon programme', onPress: handleFinish, variant: 'primary' }}
      footer={
        __DEV__ ? (
          <Pressable
            role="button"
            onPress={() => {
              reset();
              router.dismissTo('/onboarding');
            }}
            className="items-center py-sm"
          >
            <Text variant="caption" color="inkSoft">
              Recommencer l’onboarding (dev)
            </Text>
          </Pressable>
        ) : null
      }
    >
      <Card padding="lg" radius="md" className="gap-0 py-sm">
        {rows.map((row, index) => (
          <SummaryRow key={row.key} row={row} last={index === rows.length - 1} />
        ))}
      </Card>
    </OnboardingFrame>
  );
}
