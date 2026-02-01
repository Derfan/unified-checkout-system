import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ExpiryInput } from './ExpiryInput';

describe('ExpiryInput Component', () => {
  it('formats expiry date as user types', () => {
    const ref = createRef<HTMLInputElement>();
    render(<ExpiryInput ref={ref} placeholder="MM/YY" />);

    const input = screen.getByPlaceholderText('MM/YY') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '1' } });
    expect(input.value).toBe('1');

    fireEvent.change(input, { target: { value: '12' } });
    expect(input.value).toBe('12');

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('12/3');

    fireEvent.change(input, { target: { value: '1234' } });
    expect(input.value).toBe('12/34');

    // Test exceeding max length
    fireEvent.change(input, { target: { value: '12345' } });
    expect(input.value).toBe('12/34'); // Should still be max 4 digits formatted
  });
});
