import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { PhoneInput } from './PhoneInput';

describe('PhoneInput Component', () => {
  it('should render with default styles', () => {
    // Arrange
    render(<PhoneInput placeholder="Enter phone number" />);

    // Act
    const input = screen.getByPlaceholderText('Enter phone number');

    // Assert
    expect(input).toBeInTheDocument();
    // Verify default state classes exist
    expect(input).toHaveClass('border-gray-300 hover:border-blue-500 focus:border-blue-700');
  });

  it('should apply the error state classes', () => {
    // Arrange
    render(<PhoneInput error placeholder="Error phone input" />);

    // Act
    const input = screen.getByPlaceholderText('Error phone input');

    // Assert
    expect(input).toHaveClass('border-red-500 hover:border-red-700 focus:border-red-700');
  });

  it('should apply the disabled state and be non-interactive', () => {
    // Arrange
    render(<PhoneInput state="disabled" placeholder="Disabled phone input" />);

    // Act
    const input = screen.getByPlaceholderText('Disabled phone input');

    // Assert
    expect(input).toHaveClass('bg-gray-100 cursor-not-allowed');
    expect(input).toBeDisabled();
  });

  it('should forward ref to the input element', () => {
    // Arrange
    const inputRef = createRef<HTMLInputElement>();
    render(<PhoneInput ref={inputRef} placeholder="Ref phone input" />);

    // Act
    const input = screen.getByPlaceholderText('Ref phone input');

    // Assert
    expect(inputRef.current).toBe(input);
  });

  it('should format phone number dynamically as user types', () => {
    // Arrange
    render(<PhoneInput placeholder="Dynamic phone input" />);

    // Act
    const input = screen.getByPlaceholderText('Dynamic phone input') as HTMLInputElement;

    // Simulate user typing a phone number
    fireEvent.change(input, { target: { value: '4915123456789' } });

    // Assert
    expect(input.value).toBe('+49 1512 3456789');
  });
});
