import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Toggle />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('renders with a label', () => {
      render(<Toggle label="Dark mode" />)
      expect(screen.getByText('Dark mode')).toBeInTheDocument()
    })

    it('does not render a label span when label is not provided', () => {
      const { container } = render(<Toggle />)
      const spans = container.querySelectorAll('span')
      expect(spans).toHaveLength(0)
    })

    it('renders in disabled state', () => {
      render(<Toggle disabled />)
      expect(screen.getByRole('switch')).toBeDisabled()
    })

    it('renders with a custom id', () => {
      render(<Toggle id="custom-toggle" />)
      expect(screen.getByRole('switch')).toHaveAttribute('id', 'custom-toggle')
    })

    it('auto-generates an id when none is provided', () => {
      render(<Toggle />)
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('id')
      expect(toggle.id).not.toBe('')
    })

    it('renders as unchecked by default', () => {
      render(<Toggle />)
      expect(screen.getByRole('switch')).not.toBeChecked()
    })

    it('renders as checked when defaultChecked is true', () => {
      render(<Toggle defaultChecked />)
      expect(screen.getByRole('switch')).toBeChecked()
    })
  })

  describe('Accessibility', () => {
    it('has role="switch"', () => {
      render(<Toggle />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('is a checkbox input with role switch', () => {
      render(<Toggle />)
      const toggle = screen.getByRole('switch')
      expect(toggle.tagName).toBe('INPUT')
      expect(toggle).toHaveAttribute('type', 'checkbox')
    })

    it('sets aria-labelledby when label is provided', () => {
      render(<Toggle label="Notifications" id="notif" />)
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-labelledby', 'notif-label')
      const labelEl = document.getElementById('notif-label')
      expect(labelEl).toHaveTextContent('Notifications')
    })

    it('does not set aria-labelledby when label is not provided', () => {
      render(<Toggle />)
      expect(screen.getByRole('switch')).not.toHaveAttribute('aria-labelledby')
    })

    it('has a visual label associated via htmlFor', () => {
      render(<Toggle label="Enable" id="enable-toggle" />)
      const toggle = screen.getByRole('switch')
      // The input's parent label has htmlFor
      const parentLabel = toggle.closest('label')
      expect(parentLabel).toHaveAttribute('for', 'enable-toggle')
    })

    it('thumb element is marked aria-hidden', () => {
      const { container } = render(<Toggle />)
      const thumbs = container.querySelectorAll('[aria-hidden="true"]')
      expect(thumbs.length).toBeGreaterThan(0)
    })
  })

  describe('Interaction', () => {
    it('toggles on click', async () => {
      const user = userEvent.setup()
      render(<Toggle />)
      const toggle = screen.getByRole('switch')
      expect(toggle).not.toBeChecked()
      await user.click(toggle)
      expect(toggle).toBeChecked()
      await user.click(toggle)
      expect(toggle).not.toBeChecked()
    })

    it('calls onChange when toggled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Toggle onChange={handleChange} />)
      await user.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Toggle disabled onChange={handleChange} />)
      await user.click(screen.getByRole('switch'))
      expect(handleChange).not.toHaveBeenCalled()
      expect(screen.getByRole('switch')).not.toBeChecked()
    })

    it('toggles when clicking the label text', async () => {
      const user = userEvent.setup()
      render(<Toggle label="Click me" />)
      const toggle = screen.getByRole('switch')
      expect(toggle).not.toBeChecked()
      await user.click(screen.getByText('Click me'))
      expect(toggle).toBeChecked()
    })

    it('can be toggled via keyboard (Space)', async () => {
      const user = userEvent.setup()
      render(<Toggle />)
      const toggle = screen.getByRole('switch')
      toggle.focus()
      await user.keyboard(' ')
      expect(toggle).toBeChecked()
    })

    it('can be focused via Tab', async () => {
      const user = userEvent.setup()
      render(<Toggle />)
      await user.tab()
      expect(screen.getByRole('switch')).toHaveFocus()
    })
  })

  describe('Size variants', () => {
    it('renders with sm size', () => {
      render(<Toggle size="sm" />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('renders with md size (default)', () => {
      render(<Toggle size="md" />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })
  })
})
