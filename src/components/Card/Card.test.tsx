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

  it('renders header as an h3 element', () => {
    render(<Card header="Heading">Body</Card>)
    const heading = screen.getByText('Heading')
    expect(heading.tagName).toBe('H3')
  })

  it('does not render header slot when header prop is omitted', () => {
    const { container } = render(<Card>No header</Card>)
    const card = container.firstElementChild as HTMLElement
    // Only the content div should exist (no media, no header inside it)
    expect(card.children.length).toBe(1)
  })

  it('renders footer when provided', () => {
    render(<Card footer="Footer info">Body</Card>)
    expect(screen.getByText('Footer info')).toBeInTheDocument()
  })

  it('does not render footer slot when footer prop is omitted', () => {
    const { container } = render(<Card>No footer</Card>)
    const card = container.firstElementChild as HTMLElement
    // Only content div, no media wrapper
    expect(card.children.length).toBe(1)
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

  // --- Media slot ---
  it('renders media area when provided', () => {
    render(
      <Card media={<img src="/test.jpg" alt="test" />}>
        Content
      </Card>,
    )
    expect(screen.getByAltText('test')).toBeInTheDocument()
  })

  it('does not render media wrapper when media prop is omitted', () => {
    const { container } = render(<Card>No media</Card>)
    const card = container.firstElementChild as HTMLElement
    // Only the content div should exist
    expect(card.children.length).toBe(1)
  })

  it('renders media, header, body, and footer together', () => {
    render(
      <Card
        media={<img src="/test.jpg" alt="project" />}
        header="Title"
        footer="Action"
      >
        Description
      </Card>,
    )
    expect(screen.getByAltText('project')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  // --- Size presets ---
  it('applies sm size config', () => {
    const { container } = render(<Card size="sm">Small</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('rounded-lg')
  })

  it('applies md size config by default', () => {
    const { container } = render(<Card>Medium</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('rounded-xl')
  })

  it('applies lg size config', () => {
    const { container } = render(<Card size="lg">Large</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('rounded-2xl')
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
