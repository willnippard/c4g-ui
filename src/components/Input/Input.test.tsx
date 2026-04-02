import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Input } from './Input'

describe('Input', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with a label', () => {
      render(<Input label="Email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('renders without a label', () => {
      render(<Input />)
      expect(screen.queryByRole('label')).not.toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<Input error="Required field" />)
      expect(screen.getByText('Required field')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Input helperText="Enter your email" />)
      expect(screen.getByText('Enter your email')).toBeInTheDocument()
    })

    it('hides helper text when error is present', () => {
      render(<Input helperText="Enter your email" error="Required" />)
      expect(screen.queryByText('Enter your email')).not.toBeInTheDocument()
      expect(screen.getByText('Required')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(<Input placeholder="john@example.com" />)
      expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument()
    })

    it('renders in disabled state', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('renders with a custom id', () => {
      render(<Input id="custom-id" label="Custom" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('id', 'custom-id')
    })

    it('auto-generates an id when none is provided', () => {
      render(<Input label="Auto" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('id')
      expect(input.id).not.toBe('')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-invalid when error is present', () => {
      render(<Input error="Invalid" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when there is no error', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
    })

    it('sets aria-describedby to the error id when error is present', () => {
      render(<Input id="test" error="Error message" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-error')
    })

    it('sets aria-describedby to the helper id when helperText is present', () => {
      render(<Input id="test" helperText="Some help" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-helper')
    })

    it('does not set aria-describedby when neither error nor helperText exist', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby')
    })

    it('associates the label with the input via htmlFor/id', () => {
      render(<Input label="Name" id="name-input" />)
      const label = screen.getByText('Name')
      expect(label).toHaveAttribute('for', 'name-input')
    })

    it('error message has role="alert"', () => {
      render(<Input error="Something went wrong" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
    })
  })

  describe('Interaction', () => {
    it('calls onChange when typing', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      await user.type(screen.getByRole('textbox'), 'hello')
      expect(handleChange).toHaveBeenCalledTimes(5)
    })

    it('does not allow typing when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input disabled onChange={handleChange} />)
      await user.type(screen.getByRole('textbox'), 'hello')
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('supports controlled value', () => {
      render(<Input value="controlled" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveValue('controlled')
    })

    it('can be focused via keyboard (tab)', async () => {
      const user = userEvent.setup()
      render(<Input label="Focus me" />)
      await user.tab()
      expect(screen.getByRole('textbox')).toHaveFocus()
    })
  })
})

describe('Input accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Email" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
