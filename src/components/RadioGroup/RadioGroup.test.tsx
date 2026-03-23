import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from './RadioGroup'
import type { RadioOption } from './RadioGroup'

const defaultOptions: RadioOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const optionsWithDescriptions: RadioOption[] = [
  { value: 'a', label: 'Option A', description: 'Description A' },
  { value: 'b', label: 'Option B', description: 'Description B' },
]

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('renders all radio options', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      const radios = screen.getAllByRole('radio')
      expect(radios).toHaveLength(3)
    })

    it('renders labels for each option', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      expect(screen.getByText('Option A')).toBeInTheDocument()
      expect(screen.getByText('Option B')).toBeInTheDocument()
      expect(screen.getByText('Option C')).toBeInTheDocument()
    })

    it('renders a legend when provided', () => {
      render(<RadioGroup options={defaultOptions} name="test" legend="Choose one" />)
      expect(screen.getByText('Choose one')).toBeInTheDocument()
    })

    it('does not render a legend when not provided', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      const fieldset = screen.getByRole('radiogroup')
      const legend = fieldset.querySelector('legend')
      expect(legend).toBeNull()
    })

    it('renders error message', () => {
      render(<RadioGroup options={defaultOptions} name="test" error="Please select" />)
      expect(screen.getByText('Please select')).toBeInTheDocument()
    })

    it('does not render error message when not provided', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('renders option descriptions when provided', () => {
      render(<RadioGroup options={optionsWithDescriptions} name="test" />)
      expect(screen.getByText('Description A')).toBeInTheDocument()
      expect(screen.getByText('Description B')).toBeInTheDocument()
    })

    it('renders with disabled state', () => {
      render(<RadioGroup options={defaultOptions} name="test" disabled />)
      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toBeDisabled()
      })
    })

    it('renders with individually disabled options', () => {
      const options: RadioOption[] = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
      ]
      render(<RadioGroup options={options} name="test" />)
      expect(screen.getByLabelText('A')).not.toBeDisabled()
      expect(screen.getByLabelText('B')).toBeDisabled()
    })

    it('checks the radio matching the value prop', () => {
      render(<RadioGroup options={defaultOptions} name="test" value="b" />)
      expect(screen.getByLabelText('Option B')).toBeChecked()
      expect(screen.getByLabelText('Option A')).not.toBeChecked()
    })
  })

  describe('Accessibility', () => {
    it('has role="radiogroup" on fieldset', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('sets aria-required when required is true', () => {
      render(<RadioGroup options={defaultOptions} name="test" required />)
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-required', 'true')
    })

    it('does not set aria-required when required is false', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-required')
    })

    it('sets aria-invalid when error is present', () => {
      render(<RadioGroup options={defaultOptions} name="test" error="Error" />)
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when there is no error', () => {
      render(<RadioGroup options={defaultOptions} name="test" />)
      expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-invalid')
    })

    it('sets aria-describedby pointing to error element', () => {
      render(<RadioGroup options={defaultOptions} name="test" error="Select one" />)
      const radiogroup = screen.getByRole('radiogroup')
      const describedBy = radiogroup.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const errorEl = document.getElementById(describedBy!)
      expect(errorEl).toHaveTextContent('Select one')
    })

    it('error message has role="alert"', () => {
      render(<RadioGroup options={defaultOptions} name="test" error="Required" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Required')
    })

    it('error message contains an SVG icon', () => {
      render(<RadioGroup options={defaultOptions} name="test" error="Required" />)
      const alertEl = screen.getByRole('alert')
      const svg = alertEl.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('option descriptions are linked via aria-describedby', () => {
      render(<RadioGroup options={optionsWithDescriptions} name="test" />)
      // The label includes description text, so use exact: false to find by display value
      const radios = screen.getAllByRole('radio')
      const radioA = radios[0]
      const describedBy = radioA.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const descEl = document.getElementById(describedBy!)
      expect(descEl).toHaveTextContent('Description A')
    })
  })

  describe('Interaction', () => {
    it('calls onChange with the correct value when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup options={defaultOptions} name="test" onChange={handleChange} />)
      await user.click(screen.getByLabelText('Option B'))
      expect(handleChange).toHaveBeenCalledWith('b')
    })

    it('calls onChange with the correct value when clicking labels', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup options={defaultOptions} name="test" onChange={handleChange} />)
      await user.click(screen.getByText('Option C'))
      expect(handleChange).toHaveBeenCalledWith('c')
    })

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup options={defaultOptions} name="test" disabled onChange={handleChange} />)
      await user.click(screen.getByLabelText('Option A'))
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not call onChange on individually disabled options', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const options: RadioOption[] = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
      ]
      render(<RadioGroup options={options} name="test" onChange={handleChange} />)
      await user.click(screen.getByLabelText('B'))
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('navigates between options with keyboard', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup options={defaultOptions} name="test" value="a" onChange={handleChange} />)
      const radioA = screen.getByLabelText('Option A')
      radioA.focus()
      await user.keyboard('{ArrowDown}')
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('Size variants', () => {
    it('renders with compact size', () => {
      render(<RadioGroup options={defaultOptions} name="test" size="compact" />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('renders with spacious size', () => {
      render(<RadioGroup options={defaultOptions} name="test" size="spacious" />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('renders with zoomed size', () => {
      render(<RadioGroup options={defaultOptions} name="test" size="zoomed" />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })
  })
})
