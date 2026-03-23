import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with status role', () => {
    render(<Skeleton />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('contains sr-only Loading text', () => {
    render(<Skeleton />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('applies text variant by default', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstElementChild?.className).toContain('rounded-full')
  })

  it('applies rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />)
    expect(container.firstElementChild?.className).toContain('rounded-none')
  })

  it('applies rounded variant', () => {
    const { container } = render(<Skeleton variant="rounded" />)
    expect(container.firstElementChild?.className).toContain('rounded-xl')
  })

  it('renders multiple lines for text variant', () => {
    render(<Skeleton variant="text" lines={3} />)
    const status = screen.getByRole('status')
    // 3 line divs + 1 sr-only span
    const divs = status.querySelectorAll('div')
    expect(divs.length).toBe(3)
  })

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width={200} height={100} />)
    const el = container.firstElementChild as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('100px')
  })

  it('applies size sm', () => {
    const { container } = render(<Skeleton size="sm" />)
    expect(container.firstElementChild?.className).toContain('h-3')
  })

  it('forwards className', () => {
    const { container } = render(<Skeleton className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Skeleton />)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations with multiple lines', async () => {
      const { container } = render(<Skeleton lines={3} />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
