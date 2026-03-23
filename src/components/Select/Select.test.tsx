import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'
import type { SelectOption } from './Select'

const defaultOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('Select', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Select options={defaultOptions} />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders all options', () => {
      render(<Select options={defaultOptions} />)
      expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument()
    })

    it('renders with a label', () => {
      render(<Select options={defaultOptions} label="Fruit" />)
      expect(screen.getByLabelText('Fruit')).toBeInTheDocument()
    })

    it('does not render a label when not provided', () => {
      const { container } = render(<Select options={defaultOptions} />)
      expect(container.querySelector('label')).not.toBeInTheDocument()
    })

    it('renders with a placeholder option', () => {
      render(<Select options={defaultOptions} placeholder="Select a fruit..." />)
      // Placeholder option is hidden+disabled, so query by text instead
      expect(screen.getByText('Select a fruit...')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<Select options={defaultOptions} error="Required field" />)
      expect(screen.getByText('Required field')).toBeInTheDocument()
    })

    it('does not render error message when not provided', () => {
      render(<Select options={defaultOptions} />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Select options={defaultOptions} helperText="Pick your favorite" />)
      expect(screen.getByText('Pick your favorite')).toBeInTheDocument()
    })

    it('hides helper text when error is present', () => {
      render(<Select options={defaultOptions} helperText="Pick one" error="Required" />)
      expect(screen.queryByText('Pick one')).not.toBeInTheDocument()
      expect(screen.getByText('Required')).toBeInTheDocument()
    })

    it('renders in disabled state', () => {
      render(<Select options={defaultOptions} disabled />)
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('renders with a custom id', () => {
      render(<Select options={defaultOptions} id="fruit-select" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'fruit-select')
    })

    it('auto-generates an id when none is provided', () => {
      render(<Select options={defaultOptions} />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveAttribute('id')
      expect(select.id).not.toBe('')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-invalid when error is present', () => {
      render(<Select options={defaultOptions} error="Error" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when there is no error', () => {
      render(<Select options={defaultOptions} />)
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid')
    })

    it('sets aria-describedby to the error id when error is present', () => {
      render(<Select options={defaultOptions} id="sel" error="Bad" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'sel-error')
    })

    it('sets aria-describedby to the helper id when helperText is present', () => {
      render(<Select options={defaultOptions} id="sel" helperText="Help" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'sel-helper')
    })

    it('does not set aria-describedby when neither error nor helperText exist', () => {
      render(<Select options={defaultOptions} />)
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby')
    })

    it('associates the label with the select via htmlFor/id', () => {
      render(<Select options={defaultOptions} label="Choose" id="choose-sel" />)
      const label = screen.getByText('Choose')
      expect(label).toHaveAttribute('for', 'choose-sel')
    })

    it('error message has role="alert"', () => {
      render(<Select options={defaultOptions} error="Something wrong" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Something wrong')
    })

    it('error message contains an SVG icon', () => {
      render(<Select options={defaultOptions} error="Err" />)
      const alertEl = screen.getByRole('alert')
      const svg = alertEl.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('chevron icon is aria-hidden', () => {
      const { container } = render(<Select options={defaultOptions} />)
      // The chevron SVG in the select wrapper
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
      expect(svgs.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Interaction', () => {
    it('calls onChange when selecting an option', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Select options={defaultOptions} onChange={handleChange} />)
      await user.selectOptions(screen.getByRole('combobox'), 'banana')
      expect(handleChange).toHaveBeenCalled()
    })

    it('updates selected value', async () => {
      const user = userEvent.setup()
      render(<Select options={defaultOptions} />)
      const select = screen.getByRole('combobox')
      await user.selectOptions(select, 'cherry')
      expect(select).toHaveValue('cherry')
    })

    it('does not allow interaction when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Select options={defaultOptions} disabled onChange={handleChange} />)
      await user.selectOptions(screen.getByRole('combobox'), 'banana').catch(() => {})
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('supports controlled value', () => {
      render(<Select options={defaultOptions} value="banana" onChange={() => {}} />)
      expect(screen.getByRole('combobox')).toHaveValue('banana')
    })

    it('can be focused via Tab', async () => {
      const user = userEvent.setup()
      render(<Select options={defaultOptions} />)
      await user.tab()
      expect(screen.getByRole('combobox')).toHaveFocus()
    })
  })

  describe('Size variants', () => {
    it('renders with sm size', () => {
      render(<Select options={defaultOptions} size="sm" />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders with md size (default)', () => {
      render(<Select options={defaultOptions} size="md" />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders with lg size', () => {
      render(<Select options={defaultOptions} size="lg" />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })
})
