import { router } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { Text } from '@/components/ui/text';
import { stepHref } from '@/features/onboarding/steps';
import { spacing } from '@/theme/tokens';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 justify-between bg-bg px-xl" style={{ paddingBottom: insets.bottom + spacing.lg }}>
      <View className="flex-1 justify-center gap-md">
        <Text variant="title" role="heading">
          Construisons ton programme
        </Text>
        <Text variant="body" color="inkSoft">
          Réponds à sept questions. On adapte ensuite tes séances et ta nutrition.
        </Text>
      </View>
      <PrimaryButton label="Commencer" onPress={() => router.push(stepHref('goal'))} />
    </View>
  );
}
