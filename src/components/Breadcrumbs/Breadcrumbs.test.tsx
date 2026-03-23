import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Breadcrumbs } from './Breadcrumbs'

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Current Project' },
]

describe('Breadcrumbs', () => {
  it('renders all items', () => {
    render(<Breadcrumbs items={defaultItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Current Project')).toBeInTheDocument()
  })

  it('renders as a nav element with aria-label', () => {
    render(<Breadcrumbs items={defaultItems} />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
  })

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={defaultItems} />)
    const link = screen.getByText('Home').closest('a')
    expect(link).toHaveAttribute('href', '/')
  })

  it('marks the last item as current page', () => {
    render(<Breadcrumbs items={defaultItems} />)
    expect(screen.getByText('Current Project')).toHaveAttribute('aria-current', 'page')
  })

  it('does not render last item as a link', () => {
    render(<Breadcrumbs items={defaultItems} />)
    expect(screen.getByText('Current Project').closest('a')).toBeNull()
  })

  it('truncates items when more than 4', () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/1' },
      { label: 'Level 2', href: '/2' },
      { label: 'Level 3', href: '/3' },
      { label: 'Current' },
    ]
    render(<Breadcrumbs items={manyItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
    // Middle items should be hidden, replaced by ellipsis
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument()
  })

  it('accepts custom separator', () => {
    render(<Breadcrumbs items={defaultItems} separator=">" />)
    const separators = screen.getAllByText('>')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('forwards className', () => {
    const { container } = render(<Breadcrumbs items={defaultItems} className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Breadcrumbs items={defaultItems} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
