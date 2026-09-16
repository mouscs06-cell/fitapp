import { Canvas, Group, Path, Skia, vec } from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import {
  Easing,
  ReduceMotion,
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, motion, ring, type ColorToken, type RingPreset } from '@/theme/tokens';

type RingProps = ViewProps & {
  /** Avancement entre 0 et 1. */
  progress: number;
  preset?: RingPreset;
  /** Remplace la taille du préréglage. */
  size?: number;
  /** Remplace l'épaisseur du préréglage. */
  stroke?: number;
  color?: ColorToken;
  trackColor?: ColorToken;
  /** Contenu centré (ex. StatNumber). */
  children?: React.ReactNode;
  /** Nom lu par le lecteur d'écran, ex. « Objectif de pas ». */
  accessibilityLabel?: string;
};

export function Ring({
  progress,
  preset = 'md',
  size,
  stroke,
  color = 'pine',
  trackColor = 'sageFill',
  children,
  style,
  ...props
}: RingProps) {
  const diameter = size ?? ring[preset].size;
  const strokeWidth = stroke ?? ring[preset].stroke;
  const clamped = Math.min(Math.max(progress, 0), 1);

  const reducedMotion = useReducedMotion();
  const end = useSharedValue(reducedMotion ? clamped : 0);

  useEffect(() => {
    end.value = reducedMotion
      ? clamped
      : withTiming(clamped, {
          duration: motion.fill,
          easing: Easing.out(Easing.cubic),
          reduceMotion: ReduceMotion.System,
        });
  }, [clamped, reducedMotion, end]);

  // Un trait à extrémité arrondie de longueur nulle dessinerait un point : on le masque à 0.
  const arcOpacity = useDerivedValue(() => (end.value > 0.001 ? 1 : 0));

  const path = useMemo(() => {
    const circle = Skia.Path.Make();
    circle.addCircle(diameter / 2, diameter / 2, (diameter - strokeWidth) / 2);
    return circle;
  }, [diameter, strokeWidth]);

  return (
    <View
      role="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[{ width: diameter, height: diameter }, style]}
      {...props}
    >
      <Canvas style={{ width: diameter, height: diameter }}>
        {/* Départ à 12 h, sens horaire */}
        <Group transform={[{ rotate: -Math.PI / 2 }]} origin={vec(diameter / 2, diameter / 2)}>
          <Path path={path} style="stroke" strokeWidth={strokeWidth} color={colors[trackColor]} />
          <Path
            path={path}
            style="stroke"
            strokeWidth={strokeWidth}
            strokeCap="round"
            color={colors[color]}
            start={0}
            end={end}
            opacity={arcOpacity}
          />
        </Group>
      </Canvas>
      {children ? (
        <View
          className="absolute inset-0 items-center justify-center"
          importantForAccessibility="no-hide-descendants"
          accessibilityElementsHidden
        >
          {children}
        </View>
      ) : null}
    </View>
  );
}

export type { RingProps };
