/**
 * Footer component tests
 *
 * Testing stack:
 * - Framework: Jest or Vitest (whichever the repository chooses to install)
 * - Library: React Testing Library
 * - Matchers: @testing-library/jest-dom (imported in this file)
 *
 * Notes:
 * - This repository currently shows no explicit Jest/Vitest dependencies.
 *   When enabling tests, install either:
 *     - Jest + ts-jest + @testing-library/react + @testing-library/jest-dom
 *       or
 *     - Vitest + @testing-library/react + @testing-library/jest-dom
 * - These tests aim to validate the public interface and visible content,
 *   focusing on elements highlighted in the recent changes.
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../Footer'

// Render helper with a Router wrapper for <Link> components
const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )

describe('Footer', () => {
  beforeAll(() => {
    // Freeze time so the dynamic copyright year is stable
    const fixedDate = new Date('2025-08-21T12:00:00Z')
    const g: any = globalThis as any
    g.jest?.useFakeTimers()
    g.jest?.setSystemTime(fixedDate)
    g.vi?.useFakeTimers()
    g.vi?.setSystemTime(fixedDate)
  })

  afterAll(() => {
    const g: any = globalThis as any
    g.jest?.useRealTimers()
    g.vi?.useRealTimers()
  })

  it('renders a footer landmark with id "footer" and core styling classes', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveAttribute('id', 'footer')
    expect(footer.className).toEqual(expect.stringContaining('bg-primary'))
    expect(footer.className).toEqual(expect.stringContaining('text-white'))
  })

  it('shows the company logo image with correct alt and src', () => {
    renderFooter()
    const logo = screen.getByAltText('Al Arabia Carpets Logo') as HTMLImageElement
    expect(logo).toBeInTheDocument()
    expect(logo.getAttribute('src')).toBe('/lovable-uploads/green-white-logo.png')
    expect(logo.className).toEqual(expect.stringContaining('h-12'))
    expect(logo.className).toEqual(expect.stringContaining('w-12'))
  })

  it('displays brand heading and description', () => {
    renderFooter()
    expect(screen.getByText('Al Arabia Carpets')).toBeInTheDocument()
    expect(
      screen.getByText(/Premium home furnishing solutions in Qatar\./i)
    ).toBeInTheDocument()
  })

  it('renders "Quick Links" navigation with four internal links and expected hrefs/order', () => {
    renderFooter()

    const quickLinksHeading = screen.getByRole('heading', { name: /Quick Links/i })
    const quickLinksSection = (quickLinksHeading.closest('div') ||
      quickLinksHeading.parentElement) as HTMLElement

    const nav = within(quickLinksSection).getByRole('navigation')
    const links = within(nav).getAllByRole('link')

    const expected = [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
    ]

    expect(links).toHaveLength(expected.length)
    expected.forEach((item, idx) => {
      const link = links[idx] as HTMLAnchorElement
      expect(link).toHaveTextContent(new RegExp(`^${item.name}$`))
      expect(link.getAttribute('href')).toBe(item.href)
      expect(link.className).toEqual(expect.stringContaining('hover:text-accent-DEFAULT'))
    })
  })

  it('quick links are client-side routes (no http/https scheme)', () => {
    renderFooter()

    const quickLinksHeading = screen.getByRole('heading', { name: /Quick Links/i })
    const quickLinksSection = (quickLinksHeading.closest('div') ||
      quickLinksHeading.parentElement) as HTMLElement

    const nav = within(quickLinksSection).getByRole('navigation')
    const links = within(nav).getAllByRole('link') as HTMLAnchorElement[]

    links.forEach(link => {
      const href = link.getAttribute('href') || ''
      expect(href.startsWith('/')).toBe(true)
      expect(href.startsWith('http')).toBe(false)
    })
  })

  it('renders "Contact Us" section with WhatsApp external link and address', () => {
    renderFooter()

    const contactHeading = screen.getByRole('heading', { name: /Contact Us/i })
    const contactSection = (contactHeading.closest('div') ||
      contactHeading.parentElement) as HTMLElement

    const waLink = within(contactSection).getByRole('link', {
      name: /WhatsApp:\s*\+974 5551 2858/i,
    }) as HTMLAnchorElement

    expect(waLink).toBeInTheDocument()
    expect(waLink).toHaveAttribute('href', 'https://wa.me/+97455512858')
    expect(waLink).toHaveAttribute('target', '_blank')

    const rel = waLink.getAttribute('rel') || ''
    expect(rel).toEqual(expect.stringContaining('noopener'))
    expect(rel).toEqual(expect.stringContaining('noreferrer'))

    // Icons (lucide) should render as SVGs within the link
    const svgCount = waLink.querySelectorAll('svg').length
    expect(svgCount).toBeGreaterThanOrEqual(1)

    // Address
    expect(within(contactSection).getByText('Al Mansoura St, Doha, Qatar')).toBeInTheDocument()
  })

  it('shows the current year and rights notice', () => {
    renderFooter()
    expect(
      screen.getByText(/©\s*2025\s*Al Arabia Carpets\. All rights reserved\./i)
    ).toBeInTheDocument()
  })

  it('contains container and grid layout elements (structure smoke test)', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer.querySelector('.container')).not.toBeNull()
    expect(footer.querySelector('.grid')).not.toBeNull()
  })
})