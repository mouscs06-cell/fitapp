import '../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { configureRevenueCat } from '@/lib/revenuecat';
import { queryClient } from '@/lib/query-client';
import { NAV_THEME } from '@/lib/theme';
import { appFonts } from '@/theme/fonts';

// Le splash natif reste affiché tant que Fraunces et Hanken Grotesk ne sont pas chargées.
SplashScreen.preventAutoHideAsync();
configureRevenueCat();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(appFonts);

  useEffect(() => {
    if (fontError) console.error('[fonts] Échec du chargement des polices', fontError);
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={NAV_THEME}>
          <BottomSheetModalProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }} />
            <PortalHost />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
