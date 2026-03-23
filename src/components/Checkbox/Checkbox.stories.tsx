import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { label: 'Accept terms' },
}

export const Checked: Story = {
  args: { label: 'Accept terms', defaultChecked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
}

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive updates about your projects via email.',
  },
}

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue.',
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
}

export const DisabledChecked: Story = {
  args: { label: 'Disabled checked', disabled: true, defaultChecked: true },
}

export const Small: Story = {
  args: { size: 'sm', label: 'Small checkbox' },
}

export const Medium: Story = {
  args: { size: 'md', label: 'Medium checkbox' },
}

export const Large: Story = {
  args: { size: 'lg', label: 'Large checkbox' },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  ),
}
