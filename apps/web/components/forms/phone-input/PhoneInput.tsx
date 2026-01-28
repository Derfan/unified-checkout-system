'use client';

import React from 'react';

import { Input, type InputProps } from '../input';
import { formatDynamicPhone } from './utils';

export const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    event.target.value = formatDynamicPhone(input);
    props?.onChange?.(event);
  };

  return <Input type="tel" inputMode="tel" ref={ref} {...props} onChange={handleChange} />;
});

PhoneInput.displayName = 'PhoneInput';
