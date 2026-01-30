'use client';

import React from 'react';

import { Input, type InputProps } from '../input';

/**
 * Custom formatter for Expiry Date: MM/YY
 */
const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '');
  const trimmed = digits.slice(0, 4);

  return trimmed.length > 2 ? `${trimmed.slice(0, 2)}/${trimmed.slice(2)}` : trimmed;
};

/**
 * ExpiryInput component that formats expiry dates dynamically as the user types.
 */
export const ExpiryInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    event.target.value = formatExpiry(input);
    props?.onChange?.(event);
  };

  return <Input inputMode="numeric" ref={ref} {...props} onChange={handleChange} />;
});

ExpiryInput.displayName = 'ExpiryInput';
