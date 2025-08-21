/**
 * Contact page unit tests
 *
 * Testing framework/libraries:
 * - Jest
 * - React Testing Library (@testing-library/react)
 * - @testing-library/jest-dom for extended matchers
 *
 * If using Vitest instead of Jest:
 * - Replace `jest.mock` with `vi.mock`
 * - Import describe/test/expect from 'vitest'
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock child components to isolate the Contact page and make structure assertions stable
jest.mock('@/components/Navbar', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Mock Navbar</div>,
}));
jest.mock('@/components/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Mock Footer</div>,
}));
jest.mock('@/components/WhatsappButton', () => ({
  __esModule: true,
  default: () => <div data-testid="whatsapp-button">Mock WhatsApp</div>,
}));
jest.mock('@/components/ContactSection', () => ({
  __esModule: true,
  default: () => <section data-testid="contact-section">Mock ContactSection</section>,
}));

// Import the page under test (assumes src/pages/Contact.tsx)
import Contact from './Contact';

describe('pages/Contact', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  test('renders hero heading and description text', () => {
    render(<Contact />);

    const heading = screen.getByRole('heading', { name: /contact us/i, level: 1 });
    expect(heading).toBeInTheDocument();

    // Be resilient to punctuation/casing variations
    expect(
      screen.getByText(/we'?d love to hear from you.*reach out via whatsapp, email, or visit us in doha/i)
    ).toBeInTheDocument();
  });

  test('renders main structure with Navbar, main, Footer, and WhatsApp button in correct order', () => {
    const { container } = render(<Contact />);

    const navbar = screen.getByTestId('navbar');
    const main = screen.getByRole('main');
    const footer = screen.getByTestId('footer');
    const whatsapp = screen.getByTestId('whatsapp-button');

    expect(navbar).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(whatsapp).toBeInTheDocument();

    // Validate visual order in the DOM: Navbar -> main -> Footer -> WhatsApp
    expect(Boolean(navbar.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(Boolean(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(Boolean(footer.compareDocumentPosition(whatsapp) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);

    // Root container sanity check for layout classes
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).not.toBeNull();
    if (root) {
      expect(root).toHaveClass('min-h-screen');
      expect(root).toHaveClass('flex');
      expect(root).toHaveClass('flex-col');
    }
  });

  test('exposes a single main landmark and a single h1 for accessibility', () => {
    render(<Contact />);

    // one main region
    const mains = screen.getAllByRole('main');
    expect(mains).toHaveLength(1);

    // single h1
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  test('hero wrapper uses expected Tailwind utility classes', () => {
    render(<Contact />);

    const main = screen.getByRole('main');
    // The first direct div inside main is the hero wrapper
    const hero = main.querySelector('div');
    expect(hero).not.toBeNull();
    if (hero instanceof HTMLElement) {
      expect(hero).toHaveClass('bg-primary');
      expect(hero).toHaveClass('text-white');
      expect(hero).toHaveClass('py-12');
    }
  });

  test('renders ContactSection inside main after the hero', () => {
    render(<Contact />);

    const main = screen.getByRole('main');
    const hero = main.querySelector('div');
    const contactSection = screen.getByTestId('contact-section');

    expect(contactSection).toBeInTheDocument();

    if (hero && contactSection) {
      // ContactSection should follow the hero wrapper in the DOM
      expect(Boolean(hero.compareDocumentPosition(contactSection) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    }
  });

  test('smoke: renders without throwing', () => {
    expect(() => render(<Contact />)).not.toThrow();
  });
});