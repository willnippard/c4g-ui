import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthBlock } from './AuthBlock'

const meta: Meta<typeof AuthBlock> = {
  title: 'Blocks/AuthBlock',
  component: AuthBlock,
  argTypes: {
    mode: { control: 'select', options: ['login', 'signup'] },
    layout: { control: 'select', options: ['split', 'centered'] },
    splitRatio: { control: 'select', options: ['2', '3'] },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AuthBlock>

export const SplitLogin: Story = {
  args: { layout: 'split', splitRatio: '3' },
}

export const SplitSignUp: Story = {
  args: { layout: 'split', splitRatio: '3', mode: 'signup' },
}

export const SplitHalf: Story = {
  args: { layout: 'split', splitRatio: '2' },
}

export const CenteredLogin: Story = {
  args: { layout: 'centered' },
}

export const CenteredSignUp: Story = {
  args: { layout: 'centered', mode: 'signup' },
}

export const WithHandlers: Story = {
  args: {
    layout: 'split',
    splitRatio: '3',
    onSubmit: (data) => console.log('Submit:', data),
    onSSOClick: (provider) => console.log('SSO:', provider),
    onModeChange: (mode) => console.log('Mode:', mode),
    onForgotPassword: () => console.log('Forgot password'),
  },
}
