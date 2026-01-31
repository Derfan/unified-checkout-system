import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Divider } from './Divider';

describe('Divider Component', () => {
  it('should render horizontal divider without label', () => {
    // Arrange
    render(<Divider />);

    // Act
    const divider = screen.getByRole('separator');

    // Assert
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('relative', 'flex', 'items-center');
    expect(divider.querySelector('span')).toBeNull();
  });

  it('should render horizontal divider with label', () => {
    // Arrange
    render(<Divider label="Section Label" />);

    // Act
    const divider = screen.getByRole('separator');
    const label = screen.getByText('Section Label');

    // Assert
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('relative', 'flex', 'items-center');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(
      'mx-4',
      'shrink',
      'text-xs',
      'font-semibold',
      'uppercase',
      'tracking-wider',
      'text-slate-400',
    );
  });

  it('should render vertical divider', () => {
    // Arrange
    render(<Divider orientation="vertical" />);

    // Act
    const divider = screen.getByRole('separator');

    // Assert
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('inline-block', 'w-px', 'self-stretch', 'border-slate-200');
  });
});
