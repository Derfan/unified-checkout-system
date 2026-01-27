import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

/**
 * A customizable button component with variant and size options.
 * @param variant - The visual style of the button (primary, secondary, tertiary).
 * @param size - The size of the button (default, sm, lg).
 * @param props - Additional button HTML attributes.
 * @returns A styled button element.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Button.displayName = 'Button';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-950 text-white active:bg-blue-700',
        secondary: 'bg-purple-600 text-white active:bg-purple-400',
        tertiary: 'text-gray-500 active:bg-gray-200 active:text-gray-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);
