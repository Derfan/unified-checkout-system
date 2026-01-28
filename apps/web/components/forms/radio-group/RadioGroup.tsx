import React from 'react';

import { RadioButton } from './RadioButton';

export interface RadioGroupProps<T = string> {
  options: Array<{ label: string; value: T }>;
  name?: string;
  value?: T;
  error?: boolean;
  onChange?: (value: T) => void;
  onBlur?: () => void;
}

/**
 * RadioGroup component that renders a group of radio buttons.
 * @param props - RadioGroup properties including options, name, value, and error state.
 * @returns A div element containing radio buttons.
 */
export const RadioGroup = ({ options, name, value, error, onChange, onBlur }: RadioGroupProps) => {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            state={selected ? 'selected' : error ? 'error' : 'default'}
            name={name}
            onChange={() => onChange?.(option.value)}
            onBlur={onBlur}
          />
        );
      })}
    </div>
  );
};
