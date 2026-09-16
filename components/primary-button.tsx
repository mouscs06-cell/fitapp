import { ActivityIndicator, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { useHaptics } from '@/hooks/use-haptics';
import { cn } from '@/lib/utils';
import { colors } from '@/theme/tokens';

type PrimaryButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'children' | 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
  /**
   * `primary` : fond amber — moments clés uniquement (lancer, conclure), usage rare.
   * `solid` : fond pine — action principale courante (« Continuer »).
   * `secondary` : contour pine sur fond transparent.
   */
  variant?: 'primary' | 'solid' | 'secondary';
  loading?: boolean;
  size?: 'default' | 'sm';
  /** Pleine largeur (défaut). `false` pour un bouton inséré dans une rangée. */
  block?: boolean;
};

const BUTTON_VARIANT = {
  primary: 'cta',
  solid: 'default',
  secondary: 'outline-pine',
} as const;

export function PrimaryButton({
  label,
  variant = 'primary',
  loading = false,
  size = 'default',
  block = true,
  disabled,
  onPressIn,
  onFocus,
  onBlur,
  className,
  style,
  ...props
}: PrimaryButtonProps) {
  const haptics = useHaptics();
  const { focusStyle, focusProps } = useFocusRing(onFocus, onBlur);
  const isOutline = variant === 'secondary';
  const inactive = disabled || loading;

  const handlePressIn = (event: GestureResponderEvent) => {
    haptics.impact('medium');
    onPressIn?.(event);
  };

  return (
    <Button
      variant={BUTTON_VARIANT[variant]}
      disabled={inactive}
      onPressIn={handlePressIn}
      accessibilityLabel={label}
      accessibilityState={{ disabled: inactive, busy: loading }}
      size={size}
      className={cn(block && 'w-full', className)}
      style={[focusStyle, style]}
      {...focusProps}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.ink : isOutline ? colors.pine : colors.surface} accessibilityElementsHidden />
      ) : (
        <Text variant="label">{label}</Text>
      )}
    </Button>
  );
}

export type { PrimaryButtonProps };
