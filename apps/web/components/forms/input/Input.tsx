import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  error?: boolean;
}

/**
 * A basic input component with styling variants.
 * @param props - Input HTML attributes and variant props.
 * @returns A styled input element.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, error, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ state: error ? 'error' : state, className }))}
        disabled={state === 'disabled'}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

const inputVariants = cva('border p-2 rounded transition-colors outline-none', {
  variants: {
    state: {
      default: 'border-gray-300 hover:border-blue-500 focus:border-blue-700',
      error: 'border-red-500 hover:border-red-700 focus:border-red-700',
      disabled: 'bg-gray-100 cursor-not-allowed',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
