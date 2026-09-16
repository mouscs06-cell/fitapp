import { View } from 'react-native';

import { Text, TextClassContext, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { shadows } from '@/theme/tokens';

/** Adapté de React Native Reusables : surface, bordure line, rayons et espacements tokens, ombre chaude. */
function Card({ className, style, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-ink">
      <View
        className={cn('flex flex-col gap-lg rounded-lg border border-line bg-surface py-xl', className)}
        style={[{ boxShadow: [...shadows.warm] }, style]}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-xs px-xl', className)} {...props} />;
}

function CardTitle(props: Omit<TextProps, 'variant'>) {
  return <Text variant="heading" {...props} />;
}

function CardDescription(props: Omit<TextProps, 'variant'>) {
  return <Text variant="body" color="inkSoft" {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('px-xl', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-xl', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
