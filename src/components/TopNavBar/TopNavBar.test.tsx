import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { TopNavBar } from './TopNavBar'
import type { TopNavLink } from './TopNavBar'

describe('TopNavBar', () => {
  // --- Rendering ---
  it('renders without crashing with default props', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Code4Good')).toBeInTheDocument()
  })

  it('renders custom brand text', () => {
    render(<TopNavBar brand="MyBrand" />)
    expect(screen.getByText('MyBrand')).toBeInTheDocument()
  })

  it('renders brand as ReactNode', () => {
    render(<TopNavBar brand={<span data-testid="logo">Logo</span>} />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders default action button label', () => {
    render(<TopNavBar />)
    const buttons = screen.getAllByText('Sign In')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders custom action button label', () => {
    render(<TopNavBar actionLabel="Get Started" />)
    const buttons = screen.getAllByText('Get Started')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders links when provided', () => {
    const links: TopNavLink[] = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ]
    render(<TopNavBar links={links} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('does not render links section when links array is empty', () => {
    const { container } = render(<TopNavBar links={[]} />)
    const linkContainer = container.querySelector('ul')
    expect(linkContainer).not.toBeInTheDocument()
  })

  // --- Accessibility ---
  it('uses nav landmark element', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has aria-label on the nav element', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Main',
    )
  })

  it('sets aria-current="page" on active links', () => {
    const links: TopNavLink[] = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
    ]
    render(<TopNavBar links={links} />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByText('About').closest('a')).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('links render with correct href', () => {
    const links: TopNavLink[] = [{ label: 'Docs', href: '/docs' }]
    render(<TopNavBar links={links} />)
    expect(screen.getByText('Docs').closest('a')).toHaveAttribute(
      'href',
      '/docs',
    )
  })

  it('has focus-visible styles on links', () => {
    const links: TopNavLink[] = [{ label: 'Link', href: '/link' }]
    render(<TopNavBar links={links} />)
    const link = screen.getByText('Link').closest('a')
    expect(link?.className).toContain('focus-visible')
  })

  it('has focus-visible styles on action button', () => {
    render(<TopNavBar />)
    const buttons = screen.getAllByText('Sign In')
    expect(buttons[0].className).toContain('focus-visible')
  })

  // --- Interaction ---
  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<TopNavBar onAction={onAction} />)
    const buttons = screen.getAllByText('Sign In')
    await user.click(buttons[0])
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  // --- Icon support ---
  it('renders icons alongside link labels', () => {
    const links: TopNavLink[] = [
      {
        label: 'Home',
        href: '/',
        icon: <span data-testid="home-icon">H</span>,
      },
    ]
    render(<TopNavBar links={links} />)
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
  })
  // --- Dropdown ---
  it('renders dropdown toggle for links with children', () => {
    const links: TopNavLink[] = [
      {
        label: 'Components',
        href: '#components',
        children: [
          { label: 'Buttons', href: '#buttons' },
          { label: 'Cards', href: '#cards' },
        ],
      },
    ]
    render(<TopNavBar links={links} />)
    const toggle = screen.getByRole('button', { name: /Components/ })
    expect(toggle).toHaveAttribute('aria-haspopup', 'true')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    const links: TopNavLink[] = [
      {
        label: 'Components',
        href: '#components',
        children: [
          { label: 'Buttons', href: '#buttons' },
          { label: 'Cards', href: '#cards' },
        ],
      },
    ]
    render(<TopNavBar links={links} />)
    const toggle = screen.getByRole('button', { name: /Components/ })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes dropdown on Escape', async () => {
    const user = userEvent.setup()
    const links: TopNavLink[] = [
      {
        label: 'Components',
        href: '#components',
        children: [{ label: 'Buttons', href: '#buttons' }],
      },
    ]
    render(<TopNavBar links={links} />)
    const toggle = screen.getByRole('button', { name: /Components/ })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  // --- Mobile menu ---
  it('renders hamburger button with aria attributes', () => {
    render(<TopNavBar links={[{ label: 'Home', href: '/' }]} />)
    const hamburger = screen.getByLabelText('Open menu')
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    expect(hamburger).toHaveAttribute('aria-controls', 'topnav-mobile-menu')
  })

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup()
    render(<TopNavBar links={[{ label: 'Home', href: '/' }]} />)
    const hamburger = screen.getByLabelText('Open menu')
    await user.click(hamburger)
    expect(screen.getByLabelText('Close menu')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('closes mobile menu on Escape', async () => {
    const user = userEvent.setup()
    render(<TopNavBar links={[{ label: 'Home', href: '/' }]} />)
    await user.click(screen.getByLabelText('Open menu'))
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.getByLabelText('Open menu')).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})

describe('TopNavBar accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<TopNavBar />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
