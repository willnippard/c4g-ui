import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    size: { control: 'select', options: ['compact', 'spacious', 'zoomed'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'This is the card body content.',
  },
}

export const WithHeader: Story = {
  args: {
    header: 'Card Title',
    children: 'This is the card body content with a header.',
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'This is the card body content.',
    footer: <button className="text-sm text-primary hover:underline">Read more</button>,
  },
}

export const Compact: Story = {
  args: {
    size: 'compact',
    header: 'Compact Card',
    children: 'Tighter padding and smaller text for dense layouts.',
    footer: <button className="text-xs text-primary hover:underline">Read more</button>,
  },
}

export const Spacious: Story = {
  args: {
    size: 'spacious',
    header: 'Spacious Card',
    children: 'Default sizing with comfortable padding and standard text.',
    footer: <button className="text-sm text-primary hover:underline">Read more</button>,
  },
}

export const Zoomed: Story = {
  args: {
    size: 'zoomed',
    header: 'Zoomed Card',
    children: 'Larger padding, bigger text, and extra spacing for improved accessibility.',
    footer: <button className="text-base text-primary hover:underline">Read more</button>,
  },
}
