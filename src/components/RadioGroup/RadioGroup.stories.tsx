import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An accessible radio button group with support for legends, descriptions, error messages, and horizontal or vertical orientation. Available in sm, md, and lg sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    legend: { control: 'text' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const defaultOptions = [
  { value: 'standard', label: 'Standard Protocol' },
  { value: 'express', label: 'Express Protocol' },
  { value: 'custom', label: 'Custom Protocol' },
]

export const Default: Story = {
  args: {
    name: 'plan',
    options: defaultOptions,
  },
}

export const WithSelection: Story = {
  args: {
    name: 'plan',
    options: defaultOptions,
    value: 'express',
  },
}

export const WithLegend: Story = {
  args: {
    name: 'impact',
    options: [
      { value: 'climate', label: 'Climate Action' },
      { value: 'education', label: 'Education' },
      { value: 'health', label: 'Public Health' },
    ],
    legend: 'Impact Categories',
    value: 'climate',
  },
}

export const Horizontal: Story = {
  args: {
    name: 'frequency',
    options: [
      { value: 'once', label: 'Once' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
    ],
    legend: 'Frequency',
    orientation: 'horizontal',
    value: 'monthly',
  },
}

export const WithDescriptions: Story = {
  args: {
    name: 'plan',
    options: [
      {
        value: 'standard',
        label: 'Standard Protocol',
        description: 'Best for most projects. 2-4 week timeline.',
      },
      {
        value: 'express',
        label: 'Express Protocol',
        description: 'Accelerated delivery within 1 week.',
      },
      {
        value: 'custom',
        label: 'Custom Protocol',
        description: 'Fully customized to your needs.',
      },
    ],
    legend: 'Select a protocol',
    value: 'standard',
  },
}

export const WithError: Story = {
  args: {
    name: 'plan',
    options: defaultOptions,
    legend: 'Select a protocol',
    error: 'Please select a protocol to continue.',
  },
}

export const WithDisabledOption: Story = {
  args: {
    name: 'plan',
    options: [
      { value: 'standard', label: 'Standard Protocol' },
      { value: 'express', label: 'Express Protocol', disabled: true },
      { value: 'custom', label: 'Custom Protocol' },
    ],
    value: 'standard',
  },
}

export const DisabledGroup: Story = {
  args: {
    name: 'plan',
    options: defaultOptions,
    legend: 'Select a protocol',
    value: 'standard',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    name: 'plan-sm',
    options: defaultOptions,
    legend: 'Select a protocol',
    value: 'standard',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    name: 'plan-md',
    options: defaultOptions,
    legend: 'Select a protocol',
    value: 'standard',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    name: 'plan-lg',
    options: defaultOptions,
    legend: 'Select a protocol',
    value: 'standard',
    size: 'lg',
  },
}
