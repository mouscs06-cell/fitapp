import { Dumbbell, Flame } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { MacroStat } from '@/components/macro-stat';
import { MealRow } from '@/components/meal-row';
import { Meter } from '@/components/meter';
import { PrimaryButton } from '@/components/primary-button';
import { ScreenHeader } from '@/components/screen-header';
import { StatNumber } from '@/components/stat-number';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { GOAL_OPTIONS, labelOf } from '@/features/onboarding/copy';
import { TODAY_MOCK } from '@/features/today/mock';
import { formatNumber } from '@/lib/format';
import { colors, iconStroke, sizes, spacing } from '@/theme/tokens';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const { firstName, goal, calories, macros, workout, meals } = TODAY_MOCK;
  const remaining = Math.max(calories.target - calories.consumed, 0);

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="gap-xl px-xl"
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
    >
      <ScreenHeader name={firstName} onAvatarPress={() => {}} className="px-0 pb-0" />

      <Text variant="title" role="heading">
        {`Bonjour, ${firstName}`}
      </Text>

      {/* Carte héro : objectif calorique du jour */}
      <Card padding="xl" radius="lg" className="gap-lg">
        <View className="flex-row items-center justify-between gap-md">
          <View className="flex-row items-center gap-sm">
            <Icon as={Flame} color={colors.pine} size={sizes['icon-sm']} strokeWidth={iconStroke.active} />
            <Text variant="label" color="pine">
              {labelOf(GOAL_OPTIONS, goal)}
            </Text>
          </View>
          <Text variant="caption" color="inkSoft" tabular>
            {`${formatNumber(remaining)} restantes`}
          </Text>
        </View>

        <View className="gap-xs">
          <StatNumber value={calories.target} unit="kcal" unitLabel="kilocalories" />
          <Text variant="caption" color="inkSoft">
            objectif du jour
          </Text>
        </View>

        <Meter
          value={calories.consumed}
          max={calories.target}
          height="thick"
          accessibilityLabel="Calories consommées"
        />

        <View className="flex-row gap-xl border-t border-line pt-lg">
          {macros.map((macro) => (
            <View key={macro.key} className="flex-1">
              <MacroStat
                layout="stacked"
                label={macro.label}
                value={macro.value}
                target={macro.target}
                unit="g"
                unitLabel="grammes"
              />
            </View>
          ))}
        </View>
      </Card>

      {/* Entraînement du jour */}
      <Card variant="accent" padding="lg" radius="lg" className="flex-row items-center gap-lg">
        <View className="size-control items-center justify-center rounded-md bg-surface/15">
          <Icon as={Dumbbell} color={colors.surface} size={sizes.icon} strokeWidth={iconStroke.regular} />
        </View>
        <View className="flex-1 gap-xs">
          <Text variant="heading">{workout.title}</Text>
          <Text variant="caption" color="sage" tabular>
            {`${formatNumber(workout.minutes)} min · ${formatNumber(workout.exercises)} exercices`}
          </Text>
        </View>
        <PrimaryButton
          label="Commencer"
          size="sm"
          block={false}
          onPress={() => {}}
          accessibilityHint={`Démarre la séance ${workout.title}`}
        />
      </Card>

      {/* Repas du jour */}
      <View className="gap-md">
        <Text variant="label" role="heading">
          Repas du jour
        </Text>
        <View className="gap-sm">
          {meals.map((meal) => (
            <MealRow key={meal.id} name={meal.name} kcal={meal.kcal} done={meal.done} onPress={() => {}} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
