import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {}

/**
 * Surface component that provides a styled container with customizable size.
 * @param className - Additional class names to apply to the surface.
 * @param shadow - Shadow variant of the surface. Default is 'sm'.
 * @param size - Size variant of the surface. Default is 'default'.
 * @param props - Other HTML div attributes.
 * @returns A styled div element.
 */
export const Surface = ({ className, size, shadow, ...props }: SurfaceProps) => {
  return <div className={cn(surfaceVariants({ size, shadow, className }))} {...props} />;
};

const surfaceVariants = cva('bg-white rounded-md', {
  variants: {
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    size: {
      default: 'py-8 px-6',
    },
  },
  defaultVariants: {
    shadow: 'sm',
    size: 'default',
  },
});
