import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
