import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'accent', 'muted'] },
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
