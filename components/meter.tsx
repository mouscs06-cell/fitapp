import { useEffect } from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, meter, motion, type ColorToken, type MeterHeight } from '@/theme/tokens';

const TONES = {
  /** Progression principale : pine sur piste sage (4,4:1). */
  default: { fill: 'pine', track: 'sage' },
  /** Progression secondaire sur une carte : vert moyen sur la surface (3,1:1). */
  soft: { fill: 'sageFill', track: 'surface' },
} as const satisfies Record<string, { fill: ColorToken; track: ColorToken }>;

type MeterProps = Omit<ViewProps, 'children'> & {
  value: number;
  max?: number;
  height?: MeterHeight;
  /** `default` : pine sur sage. `soft` : sageFill sur surface. */
  tone?: keyof typeof TONES;
  fill?: ColorToken;
  track?: ColorToken;
  /** Nom lu par le lecteur d'écran, ex. « Hydratation ». */
  accessibilityLabel?: string;
};

export function Meter({
  value,
  max = 100,
  height = 'regular',
  tone = 'default',
  fill,
  track,
  style,
  ...props
}: MeterProps) {
  const reducedMotion = useReducedMotion();
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const progress = useSharedValue(reducedMotion ? ratio : 0);

  useEffect(() => {
    progress.value = reducedMotion
      ? ratio
      : withTiming(ratio, {
          duration: motion.fill,
          easing: Easing.out(Easing.cubic),
          reduceMotion: ReduceMotion.System,
        });
  }, [ratio, reducedMotion, progress]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  const trackHeight = meter[height];
  const fillColor = colors[fill ?? TONES[tone].fill];
  const trackColor = colors[track ?? TONES[tone].track];

  return (
    <View
      role="progressbar"
      accessibilityValue={{ min: 0, max, now: Math.min(Math.max(value, 0), max) }}
      className="w-full overflow-hidden rounded-pill"
      style={[{ height: trackHeight, backgroundColor: trackColor }, style]}
      {...props}
    >
      <Animated.View className="h-full rounded-pill" style={[{ backgroundColor: fillColor }, fillStyle]} />
    </View>
  );
}

export type { MeterProps };
