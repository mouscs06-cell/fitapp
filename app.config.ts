import type { ExpoConfig } from 'expo/config';

import { colors } from './theme/tokens.ts';

const config: ExpoConfig = {
  name: 'App',
  slug: 'App',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'app',
  userInterfaceStyle: 'light',
  ios: {
    icon: './assets/expo.icon'
  },
  android: {
    adaptiveIcon: {
      backgroundColor: colors.bg,
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png'
    },
    predictiveBackGestureEnabled: false
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: colors.bg,
        image: './assets/images/splash-icon.png',
        imageWidth: 76
      }
    ],
    'expo-secure-store',
    'expo-font',
    'expo-image'
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true
  }
};

export default config;
