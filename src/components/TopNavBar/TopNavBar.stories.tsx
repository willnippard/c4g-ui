import type { Meta, StoryObj } from '@storybook/react'
import { TopNavBar } from './TopNavBar'

const meta: Meta<typeof TopNavBar> = {
  title: 'Components/TopNavBar',
  component: TopNavBar,
  decorators: [
    (Story) => (
      // Use position: relative instead of fixed so it renders inline in Storybook
      <div style={{ position: 'relative', minHeight: '120px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    brand: { control: 'text' },
    actionLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof TopNavBar>

export const Default: Story = {
  args: {
    links: [
      { label: 'Library', href: '#library' },
      { label: 'Components', href: '#components', active: true },
      { label: 'Docs', href: '#docs' },
    ],
    // Override fixed positioning for Storybook display
    style: { position: 'relative' },
  },
}

export const NoLinks: Story = {
  args: {
    links: [],
    style: { position: 'relative' },
  },
}

export const CustomBrand: Story = {
  args: {
    brand: 'MyOrg',
    actionLabel: 'Get Started',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
    ],
    style: { position: 'relative' },
  },
}

export const WithActiveLink: Story = {
  args: {
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Projects', href: '#projects', active: true },
      { label: 'Team', href: '#team' },
      { label: 'Contact', href: '#contact' },
    ],
    style: { position: 'relative' },
  },
}
