import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper, type StepperProps } from './Stepper'

const defaultSteps: StepperProps['steps'] = [
  { key: 'account', label: 'Account' },
  { key: 'profile', label: 'Profile' },
  { key: 'review', label: 'Review' },
  { key: 'complete', label: 'Complete' },
]

const stepsWithDescriptions: StepperProps['steps'] = [
  { key: 'account', label: 'Account', description: 'Create your account' },
  { key: 'profile', label: 'Profile', description: 'Set up your profile' },
  { key: 'project', label: 'Project', description: 'Choose a project' },
  { key: 'review', label: 'Review', description: 'Review and submit' },
]

const meta: Meta<StepperProps> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A multi-step progress indicator supporting horizontal and vertical orientations, custom icons, step descriptions, and clickable steps. Available in sm, md, and lg sizes.',
      },
    },
  },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 3 } },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<StepperProps>

export const Horizontal: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: 'horizontal',
    size: 'md',
  },
  render: (args) => (
    <div className="w-[600px]">
      <Stepper {...args} />
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 2,
    orientation: 'vertical',
    size: 'md',
  },
}

export const WithDescriptions: Story = {
  args: {
    steps: stepsWithDescriptions,
    activeStep: 1,
    orientation: 'horizontal',
    size: 'md',
  },
  render: (args) => (
    <div className="w-[700px]">
      <Stepper {...args} />
    </div>
  ),
}

export const Clickable: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: 'horizontal',
    size: 'md',
    onStepClick: (index: number) => {
      alert(`Clicked step ${index + 1}`)
    },
  },
  render: (args) => (
    <div className="w-[600px]">
      <Stepper {...args} />
    </div>
  ),
}

export const CustomIcons: Story = {
  args: {
    steps: [
      { key: 'cart', label: 'Cart', icon: <span>&#128722;</span> },
      { key: 'shipping', label: 'Shipping', icon: <span>&#128666;</span> },
      { key: 'payment', label: 'Payment', icon: <span>&#128179;</span> },
      { key: 'confirm', label: 'Confirm', icon: <span>&#9989;</span> },
    ],
    activeStep: 2,
    orientation: 'horizontal',
    size: 'md',
  },
  render: (args) => (
    <div className="w-[600px]">
      <Stepper {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div>
        <p className="font-manrope text-on-surface-variant text-sm mb-4">Small</p>
        <div className="w-[500px]">
          <Stepper steps={defaultSteps} activeStep={2} size="sm" />
        </div>
      </div>
      <div>
        <p className="font-manrope text-on-surface-variant text-sm mb-4">Medium</p>
        <div className="w-[600px]">
          <Stepper steps={defaultSteps} activeStep={2} size="md" />
        </div>
      </div>
      <div>
        <p className="font-manrope text-on-surface-variant text-sm mb-4">Large</p>
        <div className="w-[700px]">
          <Stepper steps={defaultSteps} activeStep={2} size="lg" />
        </div>
      </div>
    </div>
  ),
}
