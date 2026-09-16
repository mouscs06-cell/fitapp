import { useCallback, useMemo, useState } from 'react';
import type { NativeSyntheticEvent, TargetedEvent, ViewStyle } from 'react-native';

import { focusRing } from '@/theme/tokens';

type FocusHandler = ((event: NativeSyntheticEvent<TargetedEvent>) => void) | null | undefined;

const FOCUS_STYLE: ViewStyle = {
  boxShadow: [{ offsetX: 0, offsetY: 0, blurRadius: 0, spreadDistance: focusRing.width, color: focusRing.color }],
};

/**
 * Suit le focus clavier d'un Pressable (iOS Full Keyboard Access, clavier Android, Tab sur le web)
 * et fournit l'anneau à appliquer. Les handlers existants du composant sont préservés.
 */
export function useFocusRing(onFocus?: FocusHandler, onBlur?: FocusHandler) {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  return useMemo(
    () => ({
      focused,
      focusStyle: focused ? FOCUS_STYLE : undefined,
      focusProps: { onFocus: handleFocus, onBlur: handleBlur },
    }),
    [focused, handleFocus, handleBlur]
  );
}
