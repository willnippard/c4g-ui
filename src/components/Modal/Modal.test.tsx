import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  // --- Rendering ---
  it('renders nothing when open is false', () => {
    const { container } = render(
      <Modal open={false} onClose={vi.fn()}>
        Content
      </Modal>,
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders children when open is true', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        Modal body
      </Modal>,
    )
    expect(screen.getByText('Modal body')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="My Title">
        Content
      </Modal>,
    )
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} footer={<button>Save</button>}>
        Content
      </Modal>,
    )
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('renders dialog with aria-modal', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Dialog">
        Content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('sets aria-label from string title', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Settings">
        Content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-label', 'Settings')
  })

  // --- Close on Escape ---
  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="Test">
        Content
      </Modal>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} closeOnEscape={false} title="Test">
        Content
      </Modal>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  // --- Close on overlay click ---
  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="Test">
        Content
      </Modal>,
    )
    const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on overlay click when closeOnOverlayClick is false', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} closeOnOverlayClick={false} title="Test">
        Content
      </Modal>,
    )
    const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement
    fireEvent.click(overlay)
    expect(onClose).not.toHaveBeenCalled()
  })

  // --- Close button ---
  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="Test">
        Content
      </Modal>,
    )
    fireEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  // --- Size ---
  it('applies size class', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Test" size="lg">
        Content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('max-w-3xl')
  })

  // --- Custom className ---
  it('accepts custom className', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Test" className="my-modal">
        Content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('my-modal')
  })
})

describe('Modal accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Modal open={true} onClose={vi.fn()} title="Accessible Modal">
        <p>Modal content for a11y testing</p>
      </Modal>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations without title', async () => {
    const { container } = render(
      <Modal open={true} onClose={vi.fn()} aria-label="Untitled modal">
        <p>Content without title</p>
      </Modal>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
