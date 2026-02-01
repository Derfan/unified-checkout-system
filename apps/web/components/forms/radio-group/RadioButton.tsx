import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof radioButtonVariants> {
  label: string;
}

/**
 * RadioButton component that represents a single radio button.
 * @param props - RadioButton properties including id, label, value, state, and className.
 * @returns A label element containing a radio input and its label.
 */
export const RadioButton = React.forwardRef<HTMLLabelElement, RadioButtonProps>(
  ({ id, label, state, className, ...props }, ref) => {
    return (
      <label ref={ref} id={id} className={cn(radioButtonVariants({ state, className }))}>
        <input type="radio" className="sr-only" {...props} />

        <span>{label}</span>
      </label>
    );
  },
);

RadioButton.displayName = 'RadioButton';

const radioButtonVariants = cva(
  'flex-1 text-center border p-2 rounded transition-colors cursor-pointer',
  {
    variants: {
      state: {
        default: 'border-gray-300 hover:border-blue-500 focus:border-blue-700',
        selected: 'border-blue-700 bg-blue-100',
        error: 'border-red-500 hover:border-red-700 focus:border-red-700',
        disabled: 'bg-gray-100 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);
