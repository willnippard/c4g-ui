import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  // --- Rendering ---
  it('renders a nav with Pagination aria-label', () => {
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />,
    )
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
  })

  it('renders page buttons for small page count', () => {
    render(
      <Pagination totalPages={3} currentPage={1} onPageChange={vi.fn()} />,
    )
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 3')).toBeInTheDocument()
  })

  it('marks current page with aria-current', () => {
    render(
      <Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />,
    )
    expect(screen.getByLabelText('Go to page 3')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByLabelText('Go to page 1')).not.toHaveAttribute('aria-current')
  })

  // --- Page navigation ---
  it('calls onPageChange when a page button is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />,
    )
    await user.click(screen.getByLabelText('Go to page 2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page on next button click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <Pagination totalPages={5} currentPage={2} onPageChange={onPageChange} />,
    )
    await user.click(screen.getByLabelText('Go to next page'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with previous page on previous button click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />,
    )
    await user.click(screen.getByLabelText('Go to previous page'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  // --- Disabled boundaries ---
  it('disables previous button on first page', () => {
    render(
      <Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />,
    )
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(
      <Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />,
    )
    expect(screen.getByLabelText('Go to next page')).toBeDisabled()
  })

  it('enables both buttons on middle pages', () => {
    render(
      <Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />,
    )
    expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled()
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled()
  })

  // --- Ellipsis rendering ---
  it('renders ellipsis when pages are truncated', () => {
    const { container } = render(
      <Pagination totalPages={20} currentPage={10} onPageChange={vi.fn()} siblingCount={1} />,
    )
    const ellipses = container.querySelectorAll('[aria-hidden="true"]')
    // There should be ellipses (the chevron SVGs are also aria-hidden, so filter by text content)
    const ellipsisSpans = Array.from(ellipses).filter(
      (el) => el.tagName === 'SPAN',
    )
    expect(ellipsisSpans.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render ellipsis for small page counts', () => {
    const { container } = render(
      <Pagination totalPages={3} currentPage={2} onPageChange={vi.fn()} />,
    )
    const ellipsisSpans = Array.from(
      container.querySelectorAll('span[aria-hidden="true"]'),
    )
    expect(ellipsisSpans.length).toBe(0)
  })

  // --- Custom className ---
  it('accepts custom className', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={vi.fn()}
        className="my-pagination"
      />,
    )
    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('my-pagination')
  })
})

describe('Pagination accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Pagination totalPages={10} currentPage={5} onPageChange={vi.fn()} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations on first page', async () => {
    const { container } = render(
      <Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations on last page', async () => {
    const { container } = render(
      <Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
