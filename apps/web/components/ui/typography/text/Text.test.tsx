import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Text } from './Text';

describe('Text Component', () => {
  it('should render with default styles', () => {
    // Arrange
    render(<Text>Test Text</Text>);

    // Act
    const paragraph = screen.getByText('Test Text');

    // Assert
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
    expect(paragraph).toHaveClass('text-base', 'md:text-lg', 'text-blue-900', 'text-left');
  });

  it('should render with specified size and alignment', () => {
    // Arrange
    render(
      <Text size="lg" align="center">
        Centered Large Text
      </Text>,
    );

    // Act
    const paragraph = screen.getByText('Centered Large Text');

    // Assert
    expect(paragraph).toHaveClass('text-lg', 'md:text-xl', 'text-center');
  });

  it('should accept additional class names', () => {
    // Arrange
    render(<Text className="custom-class">Text with Custom Class</Text>);

    // Act
    const paragraph = screen.getByText('Text with Custom Class');

    // Assert
    expect(paragraph).toHaveClass('custom-class');
  });
});
