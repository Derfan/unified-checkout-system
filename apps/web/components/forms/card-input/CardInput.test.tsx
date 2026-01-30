import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { CardInput } from './CardInput';

describe('CardInput Component', () => {
  it('formats card number as user types', () => {
    const ref = createRef<HTMLInputElement>();
    render(<CardInput ref={ref} placeholder="Enter card number" />);

    const input = screen.getByPlaceholderText('Enter card number') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '1234' } });
    expect(input.value).toBe('1234');

    fireEvent.change(input, { target: { value: '12345678' } });
    expect(input.value).toBe('1234 5678');

    fireEvent.change(input, { target: { value: '123456789012' } });
    expect(input.value).toBe('1234 5678 9012');

    fireEvent.change(input, { target: { value: '1234567890123456' } });
    expect(input.value).toBe('1234 5678 9012 3456');

    // Test exceeding max length
    fireEvent.change(input, { target: { value: '12345678901234567890' } });
    expect(input.value).toBe('1234 5678 9012 3456'); // Should still be max 16 digits formatted
  });
});
