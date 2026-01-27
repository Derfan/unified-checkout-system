import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Surface } from './Surface';

describe('Surface Component', () => {
  it('should render with default styles', () => {
    // Arrange
    render(<Surface>Test Surface</Surface>);

    // Act
    const surface = screen.getByText('Test Surface');

    // Assert
    expect(surface).toBeInTheDocument();
    expect(surface).toHaveClass('py-8', 'px-6');
  });

  it('should accept additional class names', () => {
    // Arrange
    render(<Surface className="custom-class">Custom Class Surface</Surface>);

    // Act
    const surface = screen.getByText('Custom Class Surface');

    // Assert
    expect(surface).toHaveClass('custom-class');
  });

  it('should forward HTML div attributes', () => {
    // Arrange
    render(
      <Surface id="test-surface" data-test="surface">
        Attribute Surface
      </Surface>,
    );

    // Act
    const surface = screen.getByText('Attribute Surface');

    // Assert
    expect(surface).toHaveAttribute('id', 'test-surface');
    expect(surface).toHaveAttribute('data-test', 'surface');
  });
});
