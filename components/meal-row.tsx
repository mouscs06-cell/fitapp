import { Check, ChevronRight } from 'lucide-react-native';
import { Pressable, View, type PressableProps } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';
import { colors, iconStroke, sizes } from '@/theme/tokens';

type MealRowProps = Omit<PressableProps, 'children'> & {
  name: string;
  kcal: number;
  /** Repas déjà pris : case cochée pine. */
  done?: boolean;
};

export function MealRow({ name, kcal, done = false, onFocus, onBlur, className, ...props }: MealRowProps) {
  const { focusStyle, focusProps } = useFocusRing(onFocus, onBlur);

  return (
    <Pressable
      role="button"
      accessibilityLabel={`${name}, ${formatNumber(kcal)} kilocalories, ${done ? 'fait' : 'à venir'}`}
      accessibilityHint="Ouvre le détail du repas"
      className={cn(
        'flex-row items-center gap-lg rounded-md border border-line bg-surface p-lg active:bg-sage/40',
        className
      )}
      style={focusStyle}
      {...focusProps}
      {...props}
    >
      <View
        className={cn(
          'size-2xl items-center justify-center rounded-sm',
          // sageFill : 3,1:1 sur surface, la case vide reste repérable.
          done ? 'bg-pine' : 'border-2 border-sage-fill'
        )}
      >
        {done ? <Icon as={Check} color={colors.surface} size={sizes['icon-sm']} strokeWidth={iconStroke.active} /> : null}
      </View>

      <View className="flex-1 gap-xs">
        <Text variant="label">{name}</Text>
        <Text variant="caption" color="inkSoft" tabular>
          {`${formatNumber(kcal)} kcal`}
        </Text>
      </View>

      <Icon as={ChevronRight} color={colors.inkSoft} size={sizes.icon} strokeWidth={iconStroke.regular} />
    </Pressable>
  );
}

export type { MealRowProps };
