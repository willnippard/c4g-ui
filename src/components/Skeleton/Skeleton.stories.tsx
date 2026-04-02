import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'
import { Card } from '../Card/Card'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A placeholder loading indicator with text, rectangular, and rounded variants. Supports multi-line text skeletons and sm, md, lg size presets.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['text', 'rectangular', 'rounded'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    lines: { control: 'number' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const TextLine: Story = {
  args: { variant: 'text', width: '100%' },
}

export const MultipleLines: Story = {
  args: { variant: 'text', lines: 4, width: '100%' },
}

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: 320, height: 180 },
}

export const Rounded: Story = {
  args: { variant: 'rounded', width: 48, height: 48 },
}

export const CardSkeleton: Story = {
  render: () => (
    <Card size="md" style={{ width: 360 }}>
      <div className="flex flex-col gap-4">
        <Skeleton variant="rectangular" width="100%" height={160} />
        <Skeleton variant="text" width="60%" size="lg" />
        <Skeleton variant="text" lines={3} width="100%" />
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
      </div>
    </Card>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 300 }}>
      <div>
        <p className="text-on-surface text-sm mb-2 font-manrope">Small</p>
        <Skeleton variant="text" lines={3} size="sm" width="100%" />
      </div>
      <div>
        <p className="text-on-surface text-sm mb-2 font-manrope">Medium</p>
        <Skeleton variant="text" lines={3} size="md" width="100%" />
      </div>
      <div>
        <p className="text-on-surface text-sm mb-2 font-manrope">Large</p>
        <Skeleton variant="text" lines={3} size="lg" width="100%" />
      </div>
    </div>
  ),
}
