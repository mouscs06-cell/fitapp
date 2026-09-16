import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const apiKey = Platform.select({
  ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
});

/** À appeler une fois au démarrage, puis `Purchases.logIn(userId)` après l'auth Supabase. */
export function configureRevenueCat() {
  if (!apiKey) {
    if (__DEV__) console.warn('[RevenueCat] Clé API absente pour cette plateforme — abonnements désactivés.');
    return;
  }
  if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.configure({ apiKey });
}
