import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { CvvInput } from './CvvInput';

describe('CvvInput Component', () => {
  it('should render the CVV input correctly', () => {
    render(<CvvInput placeholder="CVV" />);
    const inputElement = screen.getByPlaceholderText('CVV');
    expect(inputElement).toBeInTheDocument();
  });

  it('should format input to only allow 3 or 4 digits', () => {
    render(<CvvInput placeholder="CVV" />);
    const inputElement = screen.getByPlaceholderText('CVV') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: '12a34b' } });
    expect(inputElement.value).toBe('1234');

    fireEvent.change(inputElement, { target: { value: '12345' } });
    expect(inputElement.value).toBe('1234');

    fireEvent.change(inputElement, { target: { value: '12' } });
    expect(inputElement.value).toBe('12');
  });

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<CvvInput placeholder="CVV" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
