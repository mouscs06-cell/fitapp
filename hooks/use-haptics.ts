import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { Platform } from 'react-native';

const IMPACT = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
} as const;

/** Retour haptique discret. Sans effet sur le web ; les échecs (appareil sans moteur) sont ignorés. */
export function useHaptics() {
  return useMemo(() => {
    const enabled = Platform.OS !== 'web';
    return {
      impact: (strength: keyof typeof IMPACT = 'light') => {
        if (enabled) Haptics.impactAsync(IMPACT[strength]).catch(() => {});
      },
      selection: () => {
        if (enabled) Haptics.selectionAsync().catch(() => {});
      },
    };
  }, []);
}
