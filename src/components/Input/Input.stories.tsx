import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A text input with optional label, helper text, and error state. Uses auto-generated IDs for accessibility and supports sm/md/lg sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Must be at least 3 characters.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: 'invalid',
    error: 'Please enter a valid email address.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    size: 'lg',
  },
}
