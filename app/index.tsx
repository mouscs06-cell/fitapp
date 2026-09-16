import { Redirect } from 'expo-router';

import { useOnboardingStore } from '@/store/onboarding-store';

/** Point d'entrée : onboarding tant qu'il n'est pas terminé, sinon les onglets. */
export default function Index() {
  const completed = useOnboardingStore((state) => state.completed);
  return <Redirect href={completed ? '/today' : '/onboarding'} />;
}
