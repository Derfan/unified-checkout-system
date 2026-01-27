import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof textInputVariants> {
  error?: boolean;
}

/**
 * A customizable text input component with state options.
 * @param state - The visual state of the input (default, error, disabled).
 * @param props - Additional input HTML attributes.
 * @returns A styled text input element.
 */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, state, error, ...props }, ref) => {
    return (
      <input
        type="text"
        className={cn(textInputVariants({ state: error ? 'error' : state, className }))}
        disabled={state === 'disabled'}
        ref={ref}
        {...props}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

const textInputVariants = cva('border p-2 rounded transition-colors', {
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
