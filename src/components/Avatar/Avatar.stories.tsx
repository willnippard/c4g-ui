import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['square', 'rounded'] },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://picsum.photos/seed/avatar1/200/200',
    alt: 'User photo',
    name: 'Jane Doe',
    size: 'md',
    variant: 'rounded',
  },
}

export const WithInitials: Story = {
  args: {
    name: 'Jane Doe',
    size: 'md',
    variant: 'rounded',
  },
}

export const Fallback: Story = {
  args: {
    src: 'https://broken-url.invalid/no-image.jpg',
    name: 'Alex Rivera',
    size: 'md',
    variant: 'rounded',
  },
  parameters: {
    docs: {
      description: {
        story: 'When the image fails to load, the avatar falls back to initials derived from the name.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Small User" size="sm" />
      <Avatar name="Medium User" size="md" />
      <Avatar name="Large User" size="lg" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Rounded Square" size="lg" variant="rounded" />
      <Avatar name="Square Shape" size="lg" variant="square" />
    </div>
  ),
}

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center -space-x-2">
      <Avatar
        src="https://picsum.photos/seed/avatar-a/200/200"
        name="Alice Chen"
        size="md"
        className="ring-2 ring-surface"
      />
      <Avatar
        name="Bob Martinez"
        size="md"
        className="ring-2 ring-surface"
      />
      <Avatar
        src="https://picsum.photos/seed/avatar-c/200/200"
        name="Carol Johnson"
        size="md"
        className="ring-2 ring-surface"
      />
      <Avatar
        name="David Kim"
        size="md"
        className="ring-2 ring-surface"
      />
      <Avatar
        name="Ella Wright"
        size="md"
        className="ring-2 ring-surface"
      />
    </div>
  ),
}
