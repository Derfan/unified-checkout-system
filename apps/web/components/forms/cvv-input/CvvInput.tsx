'use client';

import React from 'react';

import { Input, type InputProps } from '../input';

/**
 * Custom formatter for CVV: ### or ####
 */
const formatCVV = (value: string) => {
  const digits = value.replace(/\D/g, '');

  return digits.slice(0, 4);
};

/**
 * CardInput component that formats card numbers dynamically as the user types.
 */
export const CvvInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    event.target.value = formatCVV(input);
    props?.onChange?.(event);
  };

  return (
    <Input
      inputMode="numeric"
      autoComplete="cc-csc"
      maxLength={4}
      ref={ref}
      {...props}
      onChange={handleChange}
    />
  );
});

CvvInput.displayName = 'CvvInput';
