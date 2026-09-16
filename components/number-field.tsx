import { useId } from 'react';
import { View, type TextInputProps } from 'react-native';

import { FormError } from '@/components/form-error';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type NumberFieldProps = Omit<TextInputProps, 'value' | 'onChangeText' | 'keyboardType'> & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  /** Unité affichée en suffixe, ex. « kg ». */
  unit: string;
  /** Unité lue par le lecteur d'écran, ex. « kilogrammes ». */
  unitLabel?: string;
  decimal?: boolean;
  error?: string | null;
};

export function NumberField({
  label,
  value,
  onChangeText,
  unit,
  unitLabel,
  decimal = false,
  error,
  ...props
}: NumberFieldProps) {
  const labelId = useId();
  return (
    <View className="gap-sm">
      <Text variant="label" nativeID={labelId}>
        {label}
      </Text>
      <View className="flex-row items-center gap-md">
        <Input
          value={value}
          onChangeText={onChangeText}
          keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
          inputMode={decimal ? 'decimal' : 'numeric'}
          accessibilityLabel={`${label}, en ${unitLabel ?? unit}`}
          aria-labelledby={labelId}
          aria-invalid={!!error}
          className={cn('flex-1', error && 'border-2 border-ink')}
          {...props}
        />
        <Text variant="body" color="inkSoft" importantForAccessibility="no">
          {unit}
        </Text>
      </View>
      <FormError message={error} />
    </View>
  );
}
