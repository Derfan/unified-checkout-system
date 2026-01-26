import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByText('Click Me');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'bg-blue-950 text-white font-bold px-4 py-2 rounded transition-colors active:bg-blue-700',
    );
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click Me</Button>);

    const buttonElement = screen.getByText('Click Me');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'bg-purple-600 text-white font-bold px-4 py-2 rounded transition-colors active:bg-purple-400',
    );
  });

  it('renders with tertiary variant', () => {
    render(<Button variant="tertiary">Click Me</Button>);

    const buttonElement = screen.getByText('Click Me');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'text-gray-500 font-bold px-4 py-2 rounded transition-colors active:bg-gray-200 active:text-gray-700',
    );
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByText('Click Me');

    buttonElement.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
