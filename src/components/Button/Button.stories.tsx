import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A versatile button component with primary, secondary, and accent variants. Supports size and density presets for fine-grained layout control.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'accent'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    density: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Primary Button', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Secondary Button', variant: 'secondary' },
}

export const Accent: Story = {
  args: { children: 'Accent Button', variant: 'accent' },
}

export const Small: Story = {
  args: { children: 'Small', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Large', size: 'lg' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}

export const DensitySm: Story = {
  args: { children: 'Density SM', density: 'sm' },
}

export const DensityMd: Story = {
  args: { children: 'Density MD', density: 'md' },
}

export const DensityLg: Story = {
  args: { children: 'Density LG', density: 'lg' },
}

export const AllDensities: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button density="sm">SM</Button>
      <Button density="md">MD</Button>
      <Button density="lg">LG</Button>
    </div>
  ),
}
