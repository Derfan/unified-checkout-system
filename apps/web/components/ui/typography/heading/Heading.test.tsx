import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Heading } from './Heading';

describe('Heading Component', () => {
  it('should render with default styles', () => {
    // Arrange
    render(<Heading>Test Heading</Heading>);

    // Act
    const heading = screen.getByText('Test Heading');

    // Assert
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass(
      'text-2xl',
      'md:text-3xl',
      'lg:text-4xl',
      'font-bold',
      'tracking-tight',
      'text-blue-950',
      'text-left',
    );
  });

  it('should render with specified level and alignment', () => {
    // Arrange
    render(
      <Heading level="h3" align="center">
        Centered H3 Heading
      </Heading>,
    );

    // Act
    const heading = screen.getByText('Centered H3 Heading');

    // Assert
    expect(heading.tagName).toBe('H3');
    expect(heading).toHaveClass('text-lg', 'md:text-xl', 'text-center');
  });

  it('should render with a different HTML tag when "as" prop is provided', () => {
    // Arrange
    render(
      <Heading level="h2" as="h4">
        H4 Heading Styled as H2
      </Heading>,
    );

    // Act
    const heading = screen.getByText('H4 Heading Styled as H2');

    // Assert
    expect(heading.tagName).toBe('H4');
    expect(heading).toHaveClass('text-xl', 'md:text-2xl');
  });

  it('should accept additional class names', () => {
    // Arrange
    render(<Heading className="custom-class">Custom Class Heading</Heading>);

    // Act
    const heading = screen.getByText('Custom Class Heading');

    // Assert
    expect(heading).toHaveClass('custom-class');
  });
});
