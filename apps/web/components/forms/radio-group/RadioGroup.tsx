import React from 'react';

import { RadioButton } from './RadioButton';

export interface RadioGroupProps<T = string> {
  options: Array<{ label: string; value: T }>;
  name?: string;
  value?: T;
  error?: boolean;
}

/**
 * RadioGroup component that renders a group of radio buttons.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, name, value, error }, ref) => {
    return (
      <div ref={ref} role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const selected = option.value === value;

          return (
            <RadioButton
              key={option.value}
              id={id}
              label={option.label}
              value={option.value}
              state={selected ? 'selected' : error ? 'error' : 'default'}
            />
          );
        })}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
