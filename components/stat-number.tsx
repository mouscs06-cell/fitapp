import { useEffect, useState } from 'react';
import { View, type ViewProps } from 'react-native';
import {
  Easing,
  ReduceMotion,
  useAnimatedReaction,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { Text } from '@/components/ui/text';
import { formatNumber } from '@/lib/format';
import { motion, type ColorToken } from '@/theme/tokens';

type StatNumberProps = ViewProps & {
  value: number;
  /** Unité affichée en petit, ex. « kg ». */
  unit?: string;
  /** Unité lue par le lecteur d'écran, ex. « kilogrammes ». Défaut : `unit`. */
  unitLabel?: string;
  decimals?: number;
  color?: ColorToken;
  /** Anime le compteur au montage et à chaque changement de valeur. */
  animate?: boolean;
};

/** Gros chiffre héro (Fraunces, chiffres tabulaires) avec count-up. */
export function StatNumber({
  value,
  unit,
  unitLabel,
  decimals = 0,
  color = 'ink',
  animate = true,
  className,
  ...props
}: StatNumberProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;
  const [displayed, setDisplayed] = useState(shouldAnimate ? 0 : value);
  const current = useSharedValue(shouldAnimate ? 0 : value);
  const factor = 10 ** decimals;

  // Ne repasse côté React que lorsque la valeur arrondie change (pas à chaque frame).
  useAnimatedReaction(
    () => Math.round(current.value * factor) / factor,
    (rounded, previous) => {
      if (rounded !== previous) scheduleOnRN(setDisplayed, rounded);
    },
    [factor]
  );

  useEffect(() => {
    if (!shouldAnimate) {
      current.value = value;
      setDisplayed(value);
      return;
    }
    current.value = withTiming(value, {
      duration: motion.countUp,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [value, shouldAnimate, current]);

  const finalLabel = [formatNumber(value, decimals), unitLabel ?? unit].filter(Boolean).join(' ');

  return (
    <View
      accessible
      accessibilityLabel={finalLabel}
      className={['flex-row items-end gap-xs', className].filter(Boolean).join(' ')}
      {...props}
    >
      <Text variant="display" color={color}>
        {formatNumber(displayed, decimals)}
      </Text>
      {unit ? (
        // Aligne approximativement l'unité sur la ligne de base du chiffre.
        <Text variant="label" color="inkSoft" className="mb-md">
          {unit}
        </Text>
      ) : null}
    </View>
  );
}

export type { StatNumberProps };
