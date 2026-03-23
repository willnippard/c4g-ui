import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  // --- Rendering ---
  it('renders without crashing with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders children text', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('renders all variant types without errors', () => {
    const variants = ['primary', 'secondary', 'accent'] as const
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>Btn</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders all size types without errors', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Btn</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    })
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-primary')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-secondary')
  })

  it('applies accent variant classes', () => {
    render(<Button variant="accent">Accent</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-accent')
  })

  // --- Accessibility ---
  it('has focus-visible styles in class names', () => {
    render(<Button>Focusable</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('focus-visible')
  })

  it('applies disabled attribute when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies opacity class when disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('opacity-60')
  })

  // --- Interaction ---
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        No click
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('accepts custom className', () => {
    render(<Button className="my-class">Custom</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('my-class')
  })
})
