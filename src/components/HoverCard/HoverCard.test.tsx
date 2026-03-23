import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { HoverCard, HoverCardTrigger } from './HoverCard'

describe('HoverCard', () => {
  const defaultProps = {
    name: 'Jane Doe',
    imageSrc: 'https://example.com/avatar.jpg',
  }

  // --- Rendering ---
  it('renders without crashing with required props', () => {
    render(<HoverCard {...defaultProps} />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders the avatar image with correct src and alt', () => {
    render(<HoverCard {...defaultProps} imageAlt="Jane profile" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    expect(img).toHaveAttribute('alt', 'Jane profile')
  })

  it('uses name as default alt text when imageAlt is not provided', () => {
    render(<HoverCard {...defaultProps} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'Jane Doe')
  })

  it('renders subtitle when provided', () => {
    render(<HoverCard {...defaultProps} subtitle="Born Jan 1, 2000" />)
    expect(screen.getByText('Born Jan 1, 2000')).toBeInTheDocument()
  })

  it('does not render subtitle when omitted', () => {
    render(<HoverCard {...defaultProps} />)
    expect(screen.queryByText('Born Jan 1, 2000')).not.toBeInTheDocument()
  })

  it('renders status label when status is provided', () => {
    render(
      <HoverCard {...defaultProps} status={{ label: 'Active', variant: 'active' }} />,
    )
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders action as a link when actionHref is provided', () => {
    render(
      <HoverCard {...defaultProps} actionLabel="View Profile" actionHref="/profile" />,
    )
    const link = screen.getByText('View Profile')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/profile')
  })

  it('renders action as a button when only actionLabel is provided', () => {
    render(<HoverCard {...defaultProps} actionLabel="View Profile" />)
    const btn = screen.getByText('View Profile')
    expect(btn.tagName).toBe('BUTTON')
  })

  it('does not render action when actionLabel is omitted', () => {
    render(<HoverCard {...defaultProps} />)
    expect(screen.queryByText('View Profile')).not.toBeInTheDocument()
  })

  // --- Size variants ---
  it('renders all size variants without errors', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<HoverCard {...defaultProps} size={size} />)
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
      unmount()
    })
  })

  // --- Status dot shapes per variant ---
  it('renders a circle SVG shape for active status', () => {
    const { container } = render(
      <HoverCard {...defaultProps} status={{ label: 'Active', variant: 'active' }} />,
    )
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    const activeSvg = Array.from(svgs).find((svg) =>
      svg.querySelector('circle'),
    )
    expect(activeSvg).toBeTruthy()
  })

  it('renders a triangle path SVG shape for warning status', () => {
    const { container } = render(
      <HoverCard {...defaultProps} status={{ label: 'At Risk', variant: 'warning' }} />,
    )
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    const warningSvg = Array.from(svgs).find((svg) =>
      svg.querySelector('path'),
    )
    expect(warningSvg).toBeTruthy()
  })

  it('renders an x-circle SVG shape for error status', () => {
    const { container } = render(
      <HoverCard {...defaultProps} status={{ label: 'Error', variant: 'error' }} />,
    )
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    const errorSvg = Array.from(svgs).find(
      (svg) => svg.querySelector('circle') && svg.querySelector('line'),
    )
    expect(errorSvg).toBeTruthy()
  })

  // --- Accessibility ---
  it('status icons have aria-hidden="true"', () => {
    const { container } = render(
      <HoverCard {...defaultProps} status={{ label: 'Active', variant: 'active' }} />,
    )
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    expect(svgs.length).toBeGreaterThanOrEqual(1)
  })

  it('action link has focus-visible classes', () => {
    render(
      <HoverCard {...defaultProps} actionLabel="View" actionHref="/view" />,
    )
    const link = screen.getByText('View')
    expect(link.className).toContain('focus-visible')
  })

  // --- Interaction ---
  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(
      <HoverCard {...defaultProps} actionLabel="Click Me" onAction={onAction} />,
    )
    await user.click(screen.getByText('Click Me'))
    expect(onAction).toHaveBeenCalledTimes(1)
  })
})

describe('HoverCardTrigger', () => {
  it('renders the trigger children', () => {
    render(
      <HoverCardTrigger card={<div>Card content</div>}>
        Hover me
      </HoverCardTrigger>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('has aria-expanded attribute on the trigger', () => {
    render(
      <HoverCardTrigger card={<div>Card</div>}>
        Trigger
      </HoverCardTrigger>,
    )
    const trigger = screen.getByText('Trigger')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('has focus-visible classes on the trigger', () => {
    render(
      <HoverCardTrigger card={<div>Card</div>}>
        Trigger
      </HoverCardTrigger>,
    )
    const trigger = screen.getByText('Trigger')
    expect(trigger.className).toContain('focus-visible')
  })
})

describe('HoverCard accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <HoverCard name="Jane Doe" imageSrc="https://example.com/avatar.jpg" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
