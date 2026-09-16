import { CircleAlert } from 'lucide-react-native';
import { useEffect } from 'react';
import { AccessibilityInfo, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { colors, iconStroke, sizes } from '@/theme/tokens';

type FormErrorProps = {
  message: string | null | undefined;
  /** Désactive l'annonce (ex. si un champ l'annonce déjà). */
  announce?: boolean;
};

/**
 * Message d'erreur : icône + texte ink (amber est réservé au CTA).
 * Annoncé au lecteur d'écran à chaque nouveau message.
 */
export function FormError({ message, announce = true }: FormErrorProps) {
  useEffect(() => {
    if (message && announce) AccessibilityInfo.announceForAccessibility(message);
  }, [message, announce]);

  if (!message) return null;

  return (
    <View className="flex-row items-start gap-sm" accessibilityLiveRegion="polite">
      <Icon as={CircleAlert} color={colors.ink} size={sizes.icon} strokeWidth={iconStroke.active} />
      <Text variant="label" className="flex-1">
        {message}
      </Text>
    </View>
  );
}
