import React from 'react';

import { ErrorMessage } from './ErrorMessage';
import { Label } from './Label';

import type { InputProps } from '../Input';
import { cn } from '../../../styles/utils';

export interface FormFieldProps {
  label: string;
  children: React.ReactElement<InputProps>;
  id?: string;
  errorMessage?: string;
  className?: string;
}

/**
 * A form field component that includes a label, input, and error message.
 * @param label - The text for the label.
 * @param children - The input element (e.g., TextInput).
 * @param id - The id for the input element.
 * @param errorMessage - An optional error message to display.
 * @param className - Additional class names for styling.
 * @returns A styled form field element.
 */
export const FormField = ({ id, errorMessage, children, label, className }: FormFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-y-0.5', className)}>
      <Label htmlFor={id}>{label}</Label>

      {React.cloneElement(children, {
        id,
        error: !!errorMessage,
      })}

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </div>
  );
};
