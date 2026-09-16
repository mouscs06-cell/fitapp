import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { createMMKV } from 'react-native-mmkv';

const SESSION_KEY_NAME = 'supabase-session-encryption-key';

/**
 * SecureStore est limité à ~2 Ko par valeur, trop peu pour une session Supabase.
 * On garde donc seulement une clé de chiffrement dans le Keychain / Keystore
 * et la session dans une instance MMKV chiffrée avec cette clé.
 */
function getEncryptionKey() {
  const existing = SecureStore.getItem(SESSION_KEY_NAME);
  if (existing) return existing;
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const key = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  SecureStore.setItem(SESSION_KEY_NAME, key);
  return key;
}

const sessionStorage = createMMKV({ id: 'supabase-auth', encryptionKey: getEncryptionKey() });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('EXPO_PUBLIC_SUPABASE_URL et EXPO_PUBLIC_SUPABASE_ANON_KEY doivent être définies (.env.local).');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => sessionStorage.getString(key) ?? null,
      setItem: (key, value) => sessionStorage.set(key, value),
      removeItem: (key) => {
        sessionStorage.remove(key);
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
