import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'accent', 'muted'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: { children: 'Primary', variant: 'primary' },
}

export const Accent: Story = {
  args: { children: 'Accent', variant: 'accent' },
}

export const Muted: Story = {
  args: { children: 'Muted', variant: 'muted' },
}

export const Small: Story = {
  args: { children: 'Small', variant: 'primary', size: 'sm' },
}

export const Medium: Story = {
  args: { children: 'Medium', variant: 'primary', size: 'md' },
}

export const Large: Story = {
  args: { children: 'Large', variant: 'primary', size: 'lg' },
}
