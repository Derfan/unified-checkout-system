import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './Button';

describe('Button Component', () => {
  it('should render with default styles', () => {
    // Arrange
    render(<Button>Click Me</Button>);

    // Act
    const button = screen.getByRole('button', { name: /click me/i });

    // Assert
    expect(button).toBeInTheDocument();
    // Verify default variant (primary) classes exist
    expect(button).toHaveClass('bg-blue-950');
  });

  it('should apply the secondary variant classes', () => {
    // Arrange
    render(<Button variant="secondary">Secondary</Button>);

    // Act
    const button = screen.getByRole('button', { name: /secondary/i });

    // Assert
    expect(button).toHaveClass('bg-purple-600');
  });

  it('should apply adaptive sizing classes', () => {
    // Arrange
    render(<Button size="lg">Large Button</Button>);

    // Act
    const button = screen.getByRole('button', { name: /large button/i });

    // Assert
    expect(button).toHaveClass('h-11');
  });

  it('should trigger onClick when clicked', () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Interactive</Button>);
    const button = screen.getByRole('button', { name: /interactive/i });

    // Act
    fireEvent.click(button);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled and not clickable', () => {
    // Arrange
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const button = screen.getByRole('button', { name: /disabled/i });

    // Act
    fireEvent.click(button);

    // Assert
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-70');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should forward the ref correctly', () => {
    // Arrange
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);

    // Assert
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe('Ref Button');
  });
});
