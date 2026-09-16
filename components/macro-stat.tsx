import { View, type ViewProps } from 'react-native';

import { Meter, type MeterProps } from '@/components/meter';
import { Text } from '@/components/ui/text';
import { formatNumber } from '@/lib/format';

type MacroStatProps = ViewProps & {
  label: string;
  value: number;
  target: number;
  /** Unité affichée, ex. « g ». */
  unit: string;
  /** Unité lue par le lecteur d'écran, ex. « grammes ». Défaut : `unit`. */
  unitLabel?: string;
  tone?: MeterProps['tone'];
  /** `row` : libellé et valeur sur une ligne. `stacked` : empilés (rangée de macros). */
  layout?: 'row' | 'stacked';
};

/** Protéines / Glucides / Lipides : libellé, valeur sur objectif, jauge. */
export function MacroStat({ label, value, target, unit, unitLabel, tone, layout = 'row', className, ...props }: MacroStatProps) {
  const stacked = layout === 'stacked';
  return (
    <View
      accessible
      accessibilityLabel={`${label}, ${formatNumber(value)} sur ${formatNumber(target)} ${unitLabel ?? unit}`}
      className={['gap-sm', className].filter(Boolean).join(' ')}
      {...props}
    >
      <View className={stacked ? 'gap-xs' : 'flex-row items-end justify-between gap-sm'}>
        <Text variant="label" color="inkSoft">
          {label}
        </Text>
        <View className="flex-row items-end gap-xs">
          <Text variant="heading" tabular>
            {formatNumber(value)}
          </Text>
          <Text variant="caption" color="inkSoft" tabular className="mb-xs">
            {stacked ? unit : `/ ${formatNumber(target)} ${unit}`}
          </Text>
        </View>
      </View>
      <Meter value={value} max={target} tone={tone} importantForAccessibility="no-hide-descendants" />
    </View>
  );
}

export type { MacroStatProps };
