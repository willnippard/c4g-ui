import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    density: { control: 'select', options: ['compact', 'spacious', 'zoomed'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const WithLabel: Story = {
  args: { label: 'Push Notifications' },
}

export const CheckedWithLabel: Story = {
  args: { label: 'Push Notifications', defaultChecked: true },
}

export const Small: Story = {
  args: { size: 'sm', label: 'Compact toggle' },
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Disabled active' },
}

export const Compact: Story = {
  args: { density: 'compact', label: 'Compact' },
}

export const Spacious: Story = {
  args: { density: 'spacious', label: 'Spacious' },
}

export const Zoomed: Story = {
  args: { density: 'zoomed', label: 'Zoomed' },
}

export const AllDensities: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle density="compact" label="Compact" defaultChecked />
      <Toggle density="spacious" label="Spacious" defaultChecked />
      <Toggle density="zoomed" label="Zoomed" defaultChecked />
    </div>
  ),
}
