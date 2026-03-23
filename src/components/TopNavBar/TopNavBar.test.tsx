import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TopNavBar } from './TopNavBar'

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
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('renders custom action button label', () => {
    render(<TopNavBar actionLabel="Get Started" />)
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('renders links when provided', () => {
    const links = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ]
    render(<TopNavBar links={links} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('does not render links section when links array is empty', () => {
    const { container } = render(<TopNavBar links={[]} />)
    const linkContainer = container.querySelector('.md\\:flex.gap-8')
    expect(linkContainer).not.toBeInTheDocument()
  })

  // --- Accessibility ---
  it('uses nav landmark element', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has aria-label on the nav element', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main')
  })

  it('sets aria-current="page" on active links', () => {
    const links = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
    ]
    render(<TopNavBar links={links} />)
    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('About')).not.toHaveAttribute('aria-current')
  })

  it('links render with correct href', () => {
    const links = [{ label: 'Docs', href: '/docs' }]
    render(<TopNavBar links={links} />)
    expect(screen.getByText('Docs')).toHaveAttribute('href', '/docs')
  })

  it('has focus-visible styles on links', () => {
    const links = [{ label: 'Link', href: '/link' }]
    render(<TopNavBar links={links} />)
    const link = screen.getByText('Link')
    expect(link.className).toContain('focus-visible')
  })

  it('has focus-visible styles on action button', () => {
    render(<TopNavBar />)
    const btn = screen.getByText('Sign In')
    expect(btn.className).toContain('focus-visible')
  })

  // --- Interaction ---
  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<TopNavBar onAction={onAction} />)
    await user.click(screen.getByText('Sign In'))
    expect(onAction).toHaveBeenCalledTimes(1)
  })
})
