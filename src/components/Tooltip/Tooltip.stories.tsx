import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, type TooltipProps } from './Tooltip'
import { Button } from '../Button'

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A hover/focus-triggered tooltip that displays contextual information positioned relative to its trigger element. Supports top, bottom, left, and right positions with a configurable delay.',
      },
    },
  },
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    delay: { control: 'number' },
    content: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-[200px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<TooltipProps>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    size: 'md',
    children: <Button>Hover me</Button>,
  },
}

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-16 place-items-center py-16">
      <div />
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <div />

      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
}

export const CustomDelay: Story = {
  render: () => (
    <div className="flex gap-8">
      <Tooltip content="No delay" delay={0}>
        <Button>Instant (0ms)</Button>
      </Tooltip>
      <Tooltip content="Default delay" delay={300}>
        <Button>Default (300ms)</Button>
      </Tooltip>
      <Tooltip content="Slow delay" delay={1000}>
        <Button>Slow (1000ms)</Button>
      </Tooltip>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8">
      <Tooltip content="Small tooltip" size="sm">
        <Button size="sm">Small</Button>
      </Tooltip>
      <Tooltip content="Medium tooltip" size="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="Large tooltip" size="lg">
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
}
