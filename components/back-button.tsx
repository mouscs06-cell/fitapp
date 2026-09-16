import { ChevronLeft } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { cn } from '@/lib/utils';
import { colors, iconStroke, sizes } from '@/theme/tokens';

type BackButtonProps = Omit<PressableProps, 'children'> & {
  /** Libellé lu par le lecteur d'écran. */
  label?: string;
};

/** Retour arrière : cible tactile de 48px, icône fine, anneau de focus. */
export function BackButton({
  label = 'Revenir à l’étape précédente',
  className,
  onFocus,
  onBlur,
  ...props
}: BackButtonProps & { className?: string }) {
  const { focusStyle, focusProps } = useFocusRing(onFocus, onBlur);
  return (
    <Pressable
      role="button"
      accessibilityLabel={label}
      hitSlop={sizes['icon-xs']}
      className={cn('size-control items-center justify-center rounded-pill active:bg-sage-fill', className)}
      style={focusStyle}
      {...focusProps}
      {...props}
    >
      <Icon as={ChevronLeft} color={colors.ink} size={sizes.icon} strokeWidth={iconStroke.active} />
    </Pressable>
  );
}
