import { Image, type ImageProps } from 'expo-image';
import { Pressable, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { formatLongDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { sizes, spacing } from '@/theme/tokens';

type ScreenHeaderProps = ViewProps & {
  title?: string;
  /** Défaut : aujourd'hui. */
  date?: Date;
  /** Prénom et nom : initiales en repli et libellé accessible. */
  name: string;
  /** Photo (URI distante, `require()` local…). Sans photo : initiales. */
  avatar?: ImageProps['source'];
  onAvatarPress?: () => void;
  /** Ajoute la marge de sécurité haute (désactiver dans la galerie). */
  withSafeArea?: boolean;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function Avatar({ name, source }: { name: string; source?: ImageProps['source'] }) {
  return (
    <View className="size-avatar items-center justify-center overflow-hidden rounded-full bg-sage-fill">
      {source ? (
        // expo-image ne gère pas className : dimensions depuis les tokens.
        <Image
          source={source}
          contentFit="cover"
          style={{ width: sizes.avatar, height: sizes.avatar }}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Text variant="label" color="pine">
          {initials(name)}
        </Text>
      )}
    </View>
  );
}

export function ScreenHeader({
  title,
  date = new Date(),
  name,
  avatar,
  onAvatarPress,
  withSafeArea = true,
  className,
  style,
  ...props
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const { focusStyle, focusProps } = useFocusRing();

  return (
    <View
      className={cn('flex-row items-center justify-between gap-lg px-xl pb-lg', className)}
      style={[{ paddingTop: (withSafeArea ? insets.top : 0) + spacing.lg }, style]}
      {...props}
    >
      <View className="flex-1 gap-xs">
        <Text variant="label" color="inkSoft">
          {formatLongDate(date)}
        </Text>
        {title ? <Text variant="title">{title}</Text> : null}
      </View>

      {onAvatarPress ? (
        <Pressable
          role="button"
          accessibilityLabel="Profil"
          accessibilityHint={`Ouvre le profil de ${name}`}
          onPress={onAvatarPress}
          className="rounded-full"
          style={focusStyle}
          {...focusProps}
        >
          <Avatar name={name} source={avatar} />
        </Pressable>
      ) : (
        <View accessible role="img" accessibilityLabel={`Avatar de ${name}`}>
          <Avatar name={name} source={avatar} />
        </View>
      )}
    </View>
  );
}

export type { ScreenHeaderProps };
