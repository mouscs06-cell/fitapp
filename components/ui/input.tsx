import { Platform, TextInput } from 'react-native';

import { cn } from '@/lib/utils';
import { colors, typography } from '@/theme/tokens';

/** Adapté de React Native Reusables : bordure line, rayon md, hauteur control, typo body. */
function Input({ className, style, ...props }: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  const { fontFamily, fontSize, letterSpacing } = typography.body;
  return (
    <TextInput
      className={cn(
        'h-control w-full min-w-0 flex-row items-center rounded-md border border-line bg-surface px-lg text-ink',
        props.editable === false && 'opacity-50',
        Platform.select({ web: 'outline-none' }),
        className
      )}
      placeholderTextColor={colors.inkSoft}
      selectionColor={colors.pine}
      cursorColor={colors.pine}
      // Pas de lineHeight sur un TextInput : il décale le texte verticalement sur iOS.
      style={[{ fontFamily, fontSize, letterSpacing }, style]}
      {...props}
    />
  );
}

export { Input };
