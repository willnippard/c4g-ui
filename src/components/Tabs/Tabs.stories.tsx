import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, type TabsProps } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
)

const ControlledTabs = (props: Omit<TabsProps, 'activeKey' | 'onTabChange'> & { activeKey?: string }) => {
  const [activeKey, setActiveKey] = useState(props.activeKey ?? props.tabs[0]?.key ?? '')
  return <Tabs {...props} activeKey={activeKey} onTabChange={setActiveKey} />
}

export const Default: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { key: 'overview', label: 'Overview' },
        { key: 'activity', label: 'Activity' },
        { key: 'settings', label: 'Settings' },
      ]}
    >
      <p className="text-on-surface font-manrope">Tab panel content goes here.</p>
    </ControlledTabs>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { key: 'starred', label: 'Starred', icon: <StarIcon /> },
        { key: 'profile', label: 'Profile', icon: <UserIcon /> },
        { key: 'settings', label: 'Settings', icon: <GearIcon /> },
      ]}
    >
      <p className="text-on-surface font-manrope">Content with icon tabs.</p>
    </ControlledTabs>
  ),
}

export const DisabledTab: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { key: 'active', label: 'Active' },
        { key: 'disabled', label: 'Disabled', disabled: true },
        { key: 'another', label: 'Another' },
      ]}
    >
      <p className="text-on-surface font-manrope">The second tab is disabled.</p>
    </ControlledTabs>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="text-on-surface-variant font-manrope text-sm mb-2">Size: {size}</p>
          <ControlledTabs
            size={size}
            tabs={[
              { key: 'one', label: 'Tab One' },
              { key: 'two', label: 'Tab Two' },
              { key: 'three', label: 'Tab Three' },
            ]}
          >
            <p className="text-on-surface font-manrope">Panel content for {size} tabs.</p>
          </ControlledTabs>
        </div>
      ))}
    </div>
  ),
}

export const ManyTabs: Story = {
  render: () => (
    <div className="max-w-md">
      <ControlledTabs
        tabs={Array.from({ length: 12 }, (_, i) => ({
          key: `tab-${i + 1}`,
          label: `Tab ${i + 1}`,
        }))}
      >
        <p className="text-on-surface font-manrope">Scroll the tab bar to see more tabs.</p>
      </ControlledTabs>
    </div>
  ),
}
