import { View } from 'react-native';

import { TextClassContext } from '@/components/ui/text';
import { Card as BaseCard } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SpacingToken } from '@/theme/tokens';

// Classes littérales : Tailwind ne génère que les classes écrites en entier.
const PADDING: Record<SpacingToken, string> = {
  xs: 'p-xs',
  sm: 'p-sm',
  md: 'p-md',
  lg: 'p-lg',
  xl: 'p-xl',
  '2xl': 'p-2xl',
};

const RADIUS = {
  md: 'rounded-md',
  lg: 'rounded-lg',
} as const;

type CardProps = React.ComponentProps<typeof View> & {
  /** `surface` : fond clair bordé. `accent` : fond pine, texte clair. */
  variant?: 'surface' | 'accent';
  padding?: SpacingToken;
  radius?: keyof typeof RADIUS;
};

export function Card({ variant = 'surface', padding = 'xl', radius = 'lg', className, children, ...props }: CardProps) {
  const isAccent = variant === 'accent';
  return (
    <BaseCard
      className={cn(
        'gap-md',
        PADDING[padding],
        RADIUS[radius],
        isAccent && 'border-pine bg-pine',
        className
      )}
      {...props}
    >
      {isAccent ? <TextClassContext.Provider value="text-surface">{children}</TextClassContext.Provider> : children}
    </BaseCard>
  );
}

export type { CardProps };
