import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays contextual feedback messages with semantic variants (success, error, warning, info). Supports optional dismiss and action buttons.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onDismiss: { action: 'dismissed' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: { children: 'Your profile information has been securely updated.', variant: 'success' },
}

export const Error: Story = {
  args: { children: 'Unable to connect. Please check your network.', variant: 'error' },
}

export const Warning: Story = {
  args: { children: 'Your session will expire in 5 minutes.', variant: 'warning' },
}

export const Info: Story = {
  args: { children: 'A new version is available.', variant: 'info' },
}

export const WithDismiss: Story = {
  args: {
    children: 'Your profile information has been securely updated.',
    variant: 'success',
    onDismiss: () => {},
  },
}

export const WithAction: Story = {
  args: {
    children: 'A new version is available.',
    variant: 'info',
    action: { label: 'Update', onClick: () => {} },
  },
}

export const ErrorWithRetry: Story = {
  args: {
    children: 'Unable to connect. Please check your network and try again.',
    variant: 'error',
    action: { label: 'Retry', onClick: () => {} },
  },
}

export const Small: Story = {
  args: {
    children: 'Your profile information has been securely updated.',
    variant: 'success',
    size: 'sm',
    onDismiss: () => {},
    action: { label: 'Undo', onClick: () => {} },
  },
}

export const Medium: Story = {
  args: {
    children: 'Your profile information has been securely updated.',
    variant: 'success',
    size: 'md',
    onDismiss: () => {},
    action: { label: 'Undo', onClick: () => {} },
  },
}

export const Large: Story = {
  args: {
    children: 'Your profile information has been securely updated.',
    variant: 'success',
    size: 'lg',
    onDismiss: () => {},
    action: { label: 'Undo', onClick: () => {} },
  },
}
