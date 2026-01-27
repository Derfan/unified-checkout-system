import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TextInput } from './TextInput';

describe('TextInput Component', () => {
  it('should render with default styles', () => {
    // Arrange
    render(<TextInput placeholder="Enter text" />);

    // Act
    const input = screen.getByPlaceholderText('Enter text');

    // Assert
    expect(input).toBeInTheDocument();
    // Verify default state classes exist
    expect(input).toHaveClass('border-gray-300 hover:border-blue-500 focus:border-blue-700');
  });

  it('should apply the error state classes', () => {
    // Arrange
    render(<TextInput state="error" placeholder="Error input" />);

    // Act
    const input = screen.getByPlaceholderText('Error input');

    // Assert
    expect(input).toHaveClass('border-red-500 hover:border-red-700 focus:border-red-700');
  });

  it('should apply the disabled state and be non-interactive', () => {
    // Arrange
    render(<TextInput state="disabled" placeholder="Disabled input" />);

    // Act
    const input = screen.getByPlaceholderText('Disabled input');

    // Assert
    expect(input).toHaveClass('bg-gray-100 cursor-not-allowed');
    expect(input).toBeDisabled();
  });

  it('should forward ref to the input element', () => {
    // Arrange
    const inputRef = createRef<HTMLInputElement>();
    render(<TextInput ref={inputRef} placeholder="Ref input" />);

    // Act
    const input = screen.getByPlaceholderText('Ref input');

    // Assert
    expect(inputRef.current).toBe(input);
  });
});
