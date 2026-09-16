import { router, Stack, useSegments } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { Meter } from '@/components/meter';
import { ONBOARDING_STEPS, stepNumber } from '@/features/onboarding/steps';
import { colors, spacing } from '@/theme/tokens';

/** En-tête persistant : la barre reste en place et s'anime d'une étape à l'autre. */
function ProgressHeader() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const current = stepNumber(segments[segments.length - 1]);

  // Bienvenue : pas de progression affichée.
  if (current === 0) return <View className="bg-bg" style={{ height: insets.top }} />;

  return (
    <View
      className="flex-row items-center gap-md bg-bg pr-xl pl-sm"
      style={{ paddingTop: insets.top + spacing.xs }}
    >
      <BackButton onPress={() => router.back()} />
      <Meter
        className="flex-1"
        value={current}
        max={ONBOARDING_STEPS.length}
        height="thin"
        accessibilityLabel={`Étape ${current} sur ${ONBOARDING_STEPS.length}`}
      />
    </View>
  );
}

export default function OnboardingLayout() {
  return (
    <View className="flex-1 bg-bg">
      <ProgressHeader />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          contentStyle: { backgroundColor: colors.bg },
        }}
      />
    </View>
  );
}
