import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
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
