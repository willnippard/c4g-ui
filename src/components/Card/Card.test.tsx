import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  // --- Rendering ---
  it('renders without crashing with default props', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders children in the body slot', () => {
    render(<Card>Body text here</Card>)
    expect(screen.getByText('Body text here')).toBeInTheDocument()
  })

  it('renders header when provided', () => {
    render(<Card header="Card Title">Body</Card>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('does not render header slot when header prop is omitted', () => {
    const { container } = render(<Card>No header</Card>)
    const borderBDivs = container.querySelectorAll('.border-b')
    expect(borderBDivs.length).toBe(0)
  })

  it('renders footer when provided', () => {
    render(<Card footer="Footer info">Body</Card>)
    expect(screen.getByText('Footer info')).toBeInTheDocument()
  })

  it('does not render footer slot when footer prop is omitted', () => {
    const { container } = render(<Card>No footer</Card>)
    const borderTDivs = container.querySelectorAll('.border-t')
    expect(borderTDivs.length).toBe(0)
  })

  it('renders header, body, and footer together', () => {
    render(
      <Card header="Head" footer="Foot">
        Middle
      </Card>,
    )
    expect(screen.getByText('Head')).toBeInTheDocument()
    expect(screen.getByText('Middle')).toBeInTheDocument()
    expect(screen.getByText('Foot')).toBeInTheDocument()
  })

  // --- Accessibility ---
  it('accepts custom className', () => {
    const { container } = render(
      <Card className="my-card">Content</Card>,
    )
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('my-card')
  })

  it('forwards additional HTML attributes', () => {
    render(<Card data-testid="test-card">Content</Card>)
    expect(screen.getByTestId('test-card')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstElementChild?.tagName).toBe('DIV')
  })
})
