import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  // --- Rendering ---
  it('renders without crashing with default props', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders children text', () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders all variant types without errors', () => {
    const variants = ['primary', 'accent', 'muted'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>Badge</Badge>)
      expect(screen.getByText('Badge')).toBeInTheDocument()
      unmount()
    })
  })

  it('defaults to primary variant', () => {
    const { container } = render(<Badge>Default</Badge>)
    const span = container.querySelector('span')
    expect(span?.className).toContain('bg-primary')
  })

  it('applies accent variant classes', () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>)
    const span = container.querySelector('span')
    expect(span?.className).toContain('bg-accent')
  })

  it('applies muted variant classes', () => {
    const { container } = render(<Badge variant="muted">Muted</Badge>)
    const span = container.querySelector('span')
    expect(span?.className).toContain('bg-muted')
  })

  // --- Accessibility ---
  it('renders as a span element', () => {
    const { container } = render(<Badge>Inline</Badge>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(
      <Badge className="custom-class">Custom</Badge>,
    )
    const span = container.querySelector('span')
    expect(span?.className).toContain('custom-class')
  })

  it('forwards additional HTML attributes', () => {
    render(<Badge data-testid="my-badge">Test</Badge>)
    expect(screen.getByTestId('my-badge')).toBeInTheDocument()
  })
})
