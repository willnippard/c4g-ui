import type { Meta, StoryObj } from '@storybook/react'
import { FAB } from './FAB'

const meta: Meta<typeof FAB> = {
  title: 'Components/FAB',
  component: FAB,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    density: { control: 'select', options: ['compact', 'spacious', 'zoomed'] },
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
    },
    fixed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    fixed: false,
  },
}

export default meta
type Story = StoryObj<typeof FAB>

export const Default: Story = {
  args: { fixed: false },
}

export const Small: Story = {
  args: { size: 'sm', fixed: false },
}

export const Large: Story = {
  args: { size: 'lg', fixed: false },
}

export const CustomIcon: Story = {
  args: {
    fixed: false,
    'aria-label': 'Edit',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
}

export const AllPositions: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <FAB fixed={false} aria-label="Bottom right" />
      <FAB fixed={false} position="bottom-left" aria-label="Bottom left" />
      <FAB fixed={false} position="top-right" aria-label="Top right" />
      <FAB fixed={false} position="top-left" aria-label="Top left" />
    </div>
  ),
}

export const Compact: Story = {
  args: { density: 'compact', fixed: false },
}

export const Spacious: Story = {
  args: { density: 'spacious', fixed: false },
}

export const Zoomed: Story = {
  args: { density: 'zoomed', fixed: false },
}

export const AllDensities: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <FAB density="compact" fixed={false} aria-label="Compact" />
      <FAB density="spacious" fixed={false} aria-label="Spacious" />
      <FAB density="zoomed" fixed={false} aria-label="Zoomed" />
    </div>
  ),
}
