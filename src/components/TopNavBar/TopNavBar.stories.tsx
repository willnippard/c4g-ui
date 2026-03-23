import type { Meta, StoryObj } from '@storybook/react'
import type { TopNavLink } from './TopNavBar'
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

const IconBell = (
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
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
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

const dropdownLinks: TopNavLink[] = [
  { label: 'Home', href: '#home', icon: IconHome },
  {
    label: 'Components',
    href: '#components',
    icon: IconCode,
    active: true,
    children: [
      { label: 'Buttons', href: '#buttons' },
      { label: 'Cards', href: '#cards', active: true },
      { label: 'Inputs', href: '#inputs' },
      { label: 'Navigation', href: '#navigation' },
    ],
  },
  { label: 'Docs', href: '#docs', icon: IconBook },
]

export const WithDropdowns: Story = {
  args: {
    links: dropdownLinks,
    style: { position: 'relative' },
  },
}

const megaMenuContent = (
  <div className="grid grid-cols-3 gap-8 font-manrope">
    <div>
      <h3 className="font-epilogue font-bold text-primary text-sm mb-3">
        Getting Started
      </h3>
      <ul className="space-y-2 list-none m-0 p-0">
        <li>
          <a
            href="#install"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Installation
          </a>
        </li>
        <li>
          <a
            href="#quickstart"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Quick Start
          </a>
        </li>
        <li>
          <a
            href="#theming"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Theming
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="font-epilogue font-bold text-primary text-sm mb-3">
        Components
      </h3>
      <ul className="space-y-2 list-none m-0 p-0">
        <li>
          <a
            href="#buttons"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Buttons
          </a>
        </li>
        <li>
          <a
            href="#cards"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Cards
          </a>
        </li>
        <li>
          <a
            href="#forms"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Forms
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="font-epilogue font-bold text-primary text-sm mb-3">
        Resources
      </h3>
      <ul className="space-y-2 list-none m-0 p-0">
        <li>
          <a
            href="#github"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="#figma"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Figma
          </a>
        </li>
        <li>
          <a
            href="#changelog"
            className="text-sm text-on-surface hover:text-primary transition-colors duration-200"
          >
            Changelog
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export const WithMegaMenu: Story = {
  args: {
    links: [
      { label: 'Home', href: '#home', icon: IconHome },
      {
        label: 'Resources',
        href: '#resources',
        icon: IconBook,
        megaMenu: megaMenuContent,
      },
      { label: 'Team', href: '#team', icon: IconUsers },
    ],
    style: { position: 'relative' },
  },
}

export const MobileView: Story = {
  args: {
    links: [
      { label: 'Home', href: '#home', icon: IconHome },
      {
        label: 'Components',
        href: '#components',
        icon: IconCode,
        children: [
          { label: 'Buttons', href: '#buttons' },
          { label: 'Cards', href: '#cards' },
        ],
      },
      { label: 'Docs', href: '#docs', icon: IconBook },
    ],
    style: { position: 'relative' },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
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

const avatarAction = (
  <div className="flex items-center gap-3">
    <button
      type="button"
      className="relative text-on-surface hover:text-primary transition-colors duration-200"
      aria-label="Notifications"
    >
      {IconBell}
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
    </button>
    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-on-primary text-xs font-bold">
      WN
    </div>
  </div>
)

export const FullFeatured: Story = {
  args: {
    links: [
      { label: 'Home', href: '#home', icon: IconHome },
      {
        label: 'Components',
        href: '#components',
        icon: IconCode,
        active: true,
        children: [
          { label: 'Buttons', href: '#buttons' },
          { label: 'Cards', href: '#cards', active: true },
          { label: 'Inputs', href: '#inputs' },
        ],
      },
      {
        label: 'Resources',
        href: '#resources',
        icon: IconBook,
        megaMenu: megaMenuContent,
      },
      { label: 'Team', href: '#team', icon: IconUsers },
    ],
    actions: avatarAction,
    actionLabel: 'Get Started',
    style: { position: 'relative' },
  },
}
