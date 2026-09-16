import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';

import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

/** Adapté de React Native Reusables : dimensions, rayons et couleurs 100 % tokens. */
const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-sm rounded-pill',
    Platform.select({
      web: 'focus-visible:ring-ring/50 outline-none transition-all focus-visible:ring-2 disabled:pointer-events-none',
    })
  ),
  {
    variants: {
      variant: {
        default: cn('bg-pine active:bg-pine/90', Platform.select({ web: 'hover:bg-pine/90' })),
        cta: cn('bg-amber active:bg-amber/90', Platform.select({ web: 'hover:bg-amber/90' })),
        destructive: cn('bg-ink active:bg-ink/90', Platform.select({ web: 'hover:bg-ink/90' })),
        'outline-pine': cn(
          'border border-pine bg-transparent active:bg-sage-fill',
          Platform.select({ web: 'hover:bg-sage-fill' })
        ),
        outline: cn(
          'border-line bg-surface active:bg-sage-fill border',
          Platform.select({ web: 'hover:bg-sage-fill' })
        ),
        secondary: cn('bg-sage-fill active:bg-sage-fill/80', Platform.select({ web: 'hover:bg-sage-fill/80' })),
        ghost: cn('active:bg-sage-fill', Platform.select({ web: 'hover:bg-sage-fill' })),
        link: '',
      },
      size: {
        default: 'h-control px-xl',
        sm: 'h-control-sm px-lg',
        icon: 'size-control',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/** Couleur du texte enfant ; la typographie vient de <Text variant="label">. */
const buttonTextVariants = cva(Platform.select({ web: 'pointer-events-none transition-colors' }), {
  variants: {
    variant: {
      default: 'text-surface',
      cta: 'text-ink', // amber clair : le texte doit être sombre (5,1:1)
      destructive: 'text-surface',
      'outline-pine': 'text-pine',
      outline: 'text-ink',
      secondary: 'text-ink',
      ghost: 'text-ink',
      link: cn('text-pine group-active:underline', Platform.select({ web: 'hover:underline' })),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant })}>
      <Pressable
        className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
