import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal, type ModalProps } from './Modal'
import { Button } from '../Button'

const meta: Meta<ModalProps> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An accessible modal dialog with focus trapping, Escape-to-close, and overlay click support. Includes optional title and footer slots, in sm/md/lg sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<ModalProps>

const ModalTemplate = (args: ModalProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  args: {
    title: 'Modal Title',
    children: 'This is the modal body content. You can place any content here.',
  },
  render: (args) => <ModalTemplate {...args} />,
}

export const Small: Story = {
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: 'A compact modal for simple confirmations or short messages.',
  },
  render: (args) => <ModalTemplate {...args} />,
}

export const Large: Story = {
  args: {
    title: 'Large Modal',
    size: 'lg',
    children:
      'A large modal suitable for forms, detailed content, or complex interactions that need more space.',
  },
  render: (args) => <ModalTemplate {...args} />,
}

export const WithFooter: Story = {
  args: {
    title: 'Confirm Action',
    children: 'Are you sure you want to proceed? This action cannot be undone.',
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </>
    ),
  },
  render: (args) => <ModalTemplate {...args} />,
}

export const LongContent: Story = {
  args: {
    title: 'Terms of Service',
    children: (
      <div className="space-y-4">
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    ),
    footer: (
      <>
        <Button variant="secondary">Decline</Button>
        <Button variant="primary">Accept</Button>
      </>
    ),
  },
  render: (args) => <ModalTemplate {...args} />,
}

export const NoCloseOnOverlay: Story = {
  args: {
    title: 'Persistent Modal',
    closeOnOverlayClick: false,
    children:
      'This modal cannot be closed by clicking the overlay. Use the close button or press Escape.',
  },
  render: (args) => <ModalTemplate {...args} />,
}
