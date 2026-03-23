import type { Meta, StoryObj } from '@storybook/react'
import { TopNavBar } from './TopNavBar'

/* ------------------------------------------------------------------ */
/* Helper icons (inline SVGs to avoid external deps in stories)       */
/* ------------------------------------------------------------------ */

const IconHome = (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
    />
  </svg>
)

const IconBook = (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const IconUsers = (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

const IconCode = (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
)

/* ------------------------------------------------------------------ */
/* Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof TopNavBar> = {
  title: 'Components/TopNavBar',
  component: TopNavBar,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: '300px' }}>
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

/* ------------------------------------------------------------------ */
/* Stories                                                              */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    links: [
      { label: 'Library', href: '#library' },
      { label: 'Components', href: '#components', active: true },
      { label: 'Docs', href: '#docs' },
    ],
    style: { position: 'relative' },
  },
}

export const WithIcons: Story = {
  args: {
    links: [
      { label: 'Home', href: '#home', icon: IconHome },
      { label: 'Library', href: '#library', icon: IconBook, active: true },
      { label: 'Team', href: '#team', icon: IconUsers },
      { label: 'Code', href: '#code', icon: IconCode },
    ],
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
