import { Check, type LucideIcon } from 'lucide-react-native';
import { Pressable, View, type PressableProps } from 'react-native';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { useHaptics } from '@/hooks/use-haptics';
import { cn } from '@/lib/utils';
import { colors, iconStroke, sizes } from '@/theme/tokens';

type SelectableCardProps = Omit<PressableProps, 'children' | 'onPress'> & {
  title: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  /** `single` : choix unique (radio). `multiple` : cases à cocher. */
  mode?: 'single' | 'multiple';
};

/** Bordure pine de 2px sans décaler la mise en page : bordure de 1px + ombre intérieure de 1px. */
const SELECTED_STYLE = {
  boxShadow: [{ offsetX: 0, offsetY: 0, blurRadius: 0, spreadDistance: 1, color: colors.pine, inset: true }],
};

export function SelectableCard({
  title,
  description,
  icon,
  selected,
  onSelect,
  mode = 'single',
  disabled,
  onFocus,
  onBlur,
  ...props
}: SelectableCardProps) {
  const haptics = useHaptics();
  const { focusStyle, focusProps } = useFocusRing(onFocus, onBlur);

  const handlePress = () => {
    haptics.selection();
    onSelect();
  };

  return (
    <Pressable
      role={mode === 'single' ? 'radio' : 'checkbox'}
      accessibilityState={{ checked: selected, selected, disabled: !!disabled }}
      accessibilityLabel={description ? `${title}, ${description}` : title}
      disabled={disabled}
      onPress={handlePress}
      className={cn('rounded-md', disabled && 'opacity-50')}
      style={focusStyle}
      {...focusProps}
      {...props}
    >
      <Card
        className={cn(
          'flex-row items-center gap-lg rounded-md p-lg',
          selected && 'border-pine bg-sage-fill'
        )}
        style={selected ? SELECTED_STYLE : undefined}
      >
        {icon ? (
          <View className="size-control items-center justify-center rounded-sm bg-bg">
            <Icon as={icon} color={colors.pine} strokeWidth={iconStroke.regular} size={sizes.icon} />
          </View>
        ) : null}
        <View className="flex-1 gap-xs">
          <Text variant="label">{title}</Text>
          {description ? (
            <Text variant="caption" color="inkSoft">
              {description}
            </Text>
          ) : null}
        </View>
        <View
          className={cn(
            'size-icon items-center justify-center border',
            mode === 'single' ? 'rounded-full' : 'rounded-sm',
            // inkSoft : 5,9:1 sur surface, le contrôle reste repérable (WCAG 1.4.11 : 3:1 minimum)
            selected ? 'border-pine bg-pine' : 'border-ink-soft bg-surface'
          )}
        >
          {selected ? (
            <Icon as={Check} color={colors.surface} strokeWidth={iconStroke.active} size={sizes['icon-xs']} />
          ) : null}
        </View>
      </Card>
    </Pressable>
  );
}

export type { SelectableCardProps };
