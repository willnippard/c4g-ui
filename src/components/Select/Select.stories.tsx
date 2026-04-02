import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled native select dropdown with label, placeholder, helper text, and error state support. Uses auto-generated IDs for accessibility and comes in sm, md, and lg sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const sampleOptions = [
  { value: 'community', label: 'Community Growth' },
  { value: 'education', label: 'Education' },
  { value: 'environment', label: 'Environment' },
  { value: 'health', label: 'Health & Wellness' },
]

export const Default: Story = {
  args: {
    options: sampleOptions,
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
    helperText: 'Choose the category that best fits your project.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Project Type',
    options: [{ value: '', label: 'Select an option...' }, ...sampleOptions],
    error: 'Please select a project type.',
  },
}

export const WithPlaceholder: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
    placeholder: 'Select a project type...',
    defaultValue: '',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Project Type',
    options: sampleOptions,
    size: 'lg',
  },
}
