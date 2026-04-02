import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { SideNavBar } from './SideNavBar'

const defaultItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/projects' },
]

describe('SideNavBar', () => {
  // --- Rendering ---
  it('renders without crashing with required props', () => {
    render(<SideNavBar items={defaultItems} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<SideNavBar items={defaultItems} title="Code4Good" />)
    expect(screen.getByText('Code4Good')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(
      <SideNavBar
        items={defaultItems}
        title="Code4Good"
        subtitle="Volunteer Portal"
      />,
    )
    expect(screen.getByText('Volunteer Portal')).toBeInTheDocument()
  })

  it('renders brandIcon when provided', () => {
    render(
      <SideNavBar
        items={defaultItems}
        brandIcon={<span data-testid="brand-icon">B</span>}
      />,
    )
    expect(screen.getByTestId('brand-icon')).toBeInTheDocument()
  })

  it('does not render brand section when no brand props provided', () => {
    const { container } = render(<SideNavBar items={defaultItems} />)
    const heading = container.querySelector('h2')
    expect(heading).not.toBeInTheDocument()
  })

  it('renders item icons when provided', () => {
    const items = [
      {
        label: 'Home',
        href: '/',
        icon: <span data-testid="home-icon">H</span>,
      },
    ]
    render(<SideNavBar items={items} />)
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
  })

  it('renders footer links when provided', () => {
    const footerLinks = [{ label: 'Settings', href: '/settings' }]
    render(<SideNavBar items={defaultItems} footerLinks={footerLinks} />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders footer action button when provided', () => {
    const footerAction = { label: 'Log Out', onClick: () => {} }
    render(<SideNavBar items={defaultItems} footerAction={footerAction} />)
    expect(screen.getByText('Log Out')).toBeInTheDocument()
  })

  it('does not render footer section when no footer props provided', () => {
    const { container } = render(<SideNavBar items={defaultItems} />)
    const borderTDivs = container.querySelectorAll('.border-t')
    expect(borderTDivs.length).toBe(0)
  })

  // --- Accessibility ---
  it('uses aside landmark element', () => {
    render(<SideNavBar items={defaultItems} />)
    const aside = document.querySelector('aside')
    expect(aside).toBeInTheDocument()
  })

  it('contains a nav element with aria-label', () => {
    render(<SideNavBar items={defaultItems} />)
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Side')
  })

  it('sets aria-current="page" on active items', () => {
    const items = [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Projects', href: '/projects' },
    ]
    render(<SideNavBar items={items} />)
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByText('Projects').closest('a')).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('nav items render with correct href', () => {
    render(<SideNavBar items={defaultItems} />)
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute(
      'href',
      '/dashboard',
    )
  })

  it('has focus-visible styles on nav items', () => {
    render(<SideNavBar items={defaultItems} />)
    const link = screen.getByText('Dashboard').closest('a')
    expect(link?.className).toContain('focus-visible')
  })

  it('footer links render with correct href', () => {
    const footerLinks = [{ label: 'Help', href: '/help' }]
    render(<SideNavBar items={defaultItems} footerLinks={footerLinks} />)
    expect(screen.getByText('Help').closest('a')).toHaveAttribute(
      'href',
      '/help',
    )
  })

  // --- Interaction ---
  it('calls footerAction.onClick when footer button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <SideNavBar
        items={defaultItems}
        footerAction={{ label: 'Sign Out', onClick }}
      />,
    )
    await user.click(screen.getByText('Sign Out'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('SideNavBar accessibility', () => {
  it('has no accessibility violations', async () => {
    const items = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Projects', href: '/projects' },
    ]
    const { container } = render(<SideNavBar items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
