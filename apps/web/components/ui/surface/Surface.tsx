import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {}

/**
 * Surface component that provides a styled container with customizable size and rounded corners.
 * @param className - Additional class names to apply to the surface.
 * @param shadow - Shadow variant of the surface. Default is 'sm'.
 * @param size - Size variant of the surface. Default is 'default'.
 * @param rounded - Rounded corners variant of the surface. Default is 'md'.
 * @param props - Other HTML div attributes.
 * @returns A styled div element.
 */
export const Surface = ({ className, size, shadow, rounded, ...props }: SurfaceProps) => {
  return <div className={cn(surfaceVariants({ size, shadow, rounded, className }))} {...props} />;
};

const surfaceVariants = cva('bg-white', {
  variants: {
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    size: {
      default: 'py-8 px-6',
    },
  },
  defaultVariants: {
    shadow: 'sm',
    size: 'default',
    rounded: 'md',
  },
});
