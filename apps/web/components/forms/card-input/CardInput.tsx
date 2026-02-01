'use client';

import React from 'react';

import { Input, type InputProps } from '../input';

/**
 * Custom formatter for Credit Card: #### #### #### ####
 */
const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  const trimmed = digits.slice(0, 16);

  return trimmed.match(/.{1,4}/g)?.join(' ') || trimmed;
};

/**
 * CardInput component that formats card numbers dynamically as the user types.
 */
export const CardInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    event.target.value = formatCardNumber(input);
    props?.onChange?.(event);
  };

  return (
    <Input
      inputMode="numeric"
      autoComplete="cc-number"
      ref={ref}
      {...props}
      onChange={handleChange}
    />
  );
});

CardInput.displayName = 'CardInput';
