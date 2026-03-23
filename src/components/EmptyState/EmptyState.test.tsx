import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No results found" />)
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('renders the title as an h3', () => {
    render(<EmptyState title="No results" />)
    expect(screen.getByText('No results').tagName).toBe('H3')
  })

  it('renders description when provided', () => {
    render(
      <EmptyState title="No results" description="Try adjusting your filters" />,
    )
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    const { container } = render(<EmptyState title="No results" />)
    expect(container.querySelector('p')).toBeNull()
  })

  it('renders action slot when provided', () => {
    render(
      <EmptyState title="No results" action={<button>Retry</button>} />,
    )
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    render(
      <EmptyState
        title="No results"
        icon={<span data-testid="custom-icon">Icon</span>}
      />,
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders default icon when no icon provided', () => {
    const { container } = render(<EmptyState title="No results" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <EmptyState title="No results" className="custom" />,
    )
    expect(container.firstElementChild?.className).toContain('custom')
  })

  it('applies size sm', () => {
    const { container } = render(
      <EmptyState title="No results" size="sm" />,
    )
    expect(container.firstElementChild?.className).toContain('py-8')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <EmptyState
          title="No results found"
          description="Try a different search"
        />,
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
