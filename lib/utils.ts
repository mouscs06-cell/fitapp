import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { colors, radius, sizes, spacing } from '@/theme/tokens';

const toKebab = (key: string) => key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

/**
 * tailwind-merge doit connaître nos échelles nommées, sinon il confond
 * par exemple `text-ink-soft` (couleur) et une taille, ou ignore `p-lg`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: Object.keys(colors).map(toKebab),
      spacing: Object.keys(spacing),
      borderRadius: Object.keys(radius),
    },
    classGroups: {
      h: [{ h: Object.keys(sizes) }],
      w: [{ w: Object.keys(sizes) }],
      size: [{ size: Object.keys(sizes) }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
