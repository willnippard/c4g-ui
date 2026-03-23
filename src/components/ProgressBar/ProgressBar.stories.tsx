import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal progress bar with animated fill, optional label, and percentage display. Offers primary/accent/error color variants and sm/md/lg sizes.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'accent', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 60 },
}

export const WithLabel: Story = {
  args: { value: 45, label: 'Upload progress', showValue: true },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <ProgressBar value={70} label="Primary" variant="primary" showValue />
      <ProgressBar value={50} label="Accent" variant="accent" showValue />
      <ProgressBar value={30} label="Error" variant="error" showValue />
    </div>
  ),
}

export const Animated: Story = {
  args: { value: 80, label: 'Loading...', showValue: true, variant: 'primary' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <ProgressBar value={65} label="Small" size="sm" showValue />
      <ProgressBar value={65} label="Medium" size="md" showValue />
      <ProgressBar value={65} label="Large" size="lg" showValue />
    </div>
  ),
}
