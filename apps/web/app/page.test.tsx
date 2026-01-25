import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home Page', () => {
  it('renders the Turborepo logo', () => {
    render(<Home />);
    const logos = screen.getAllByAltText('Turborepo logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders the getting started text', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
  });

  it('renders the save changes text', () => {
    render(<Home />);
    expect(screen.getByText(/Save and see your changes instantly/i)).toBeInTheDocument();
  });

  it('renders the deploy now button', () => {
    render(<Home />);
    expect(screen.getByText('Deploy now')).toBeInTheDocument();
  });

  it('renders the read our docs link', () => {
    render(<Home />);
    expect(screen.getByText('Read our docs')).toBeInTheDocument();
  });

  it('renders the open alert button', () => {
    render(<Home />);
    expect(screen.getByText('Open alert')).toBeInTheDocument();
  });
});
