import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { CheckIcon } from '../../lib/icons'

export interface Step {
  key: string
  label: string
  description?: string
  icon?: ReactNode
}

export type StepperSize = 'sm' | 'md' | 'lg'
export type StepperOrientation = 'horizontal' | 'vertical'

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  /** 0-indexed active step */
  activeStep: number
  orientation?: StepperOrientation
  size?: StepperSize
  /** When provided, steps become clickable */
  onStepClick?: (index: number) => void
}

const sizeConfig = {
  sm: {
    circle: 'h-6 w-6 text-xs',
    label: 'text-xs',
    description: 'text-[11px]',
    connectorThickness: 'border-t',
    connectorThicknessVertical: 'border-l',
    gap: 'gap-1',
    iconSize: 'text-xs',
    connectorMargin: 'mx-1',
    connectorMarginVertical: 'my-1',
    connectorMinWidth: 'min-w-[24px]',
    connectorMinHeight: 'min-h-[24px]',
    circleIcon: 'h-3 w-3',
  },
  md: {
    circle: 'h-8 w-8 text-sm',
    label: 'text-sm',
    description: 'text-xs',
    connectorThickness: 'border-t-2',
    connectorThicknessVertical: 'border-l-2',
    gap: 'gap-1.5',
    iconSize: 'text-sm',
    connectorMargin: 'mx-2',
    connectorMarginVertical: 'my-2',
    connectorMinWidth: 'min-w-[32px]',
    connectorMinHeight: 'min-h-[32px]',
    circleIcon: 'h-4 w-4',
  },
  lg: {
    circle: 'h-10 w-10 text-base',
    label: 'text-base',
    description: 'text-sm',
    connectorThickness: 'border-t-[3px]',
    connectorThicknessVertical: 'border-l-[3px]',
    gap: 'gap-2',
    iconSize: 'text-base',
    connectorMargin: 'mx-3',
    connectorMarginVertical: 'my-3',
    connectorMinWidth: 'min-w-[40px]',
    connectorMinHeight: 'min-h-[40px]',
    circleIcon: 'h-5 w-5',
  },
} as const


export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      activeStep,
      orientation = 'horizontal',
      size = 'md',
      onStepClick,
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size]
    const isHorizontal = orientation === 'horizontal'

    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Progress"
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-start' : 'flex-col',
          className,
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep
          const isActive = index === activeStep
          const isClickable = !!onStepClick

          const stepContent = (
            <div
              className={cn(
                'flex items-center',
                isHorizontal ? 'flex-col' : 'flex-row',
                config.gap,
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  'flex items-center justify-center rounded-full shrink-0 transition-colors',
                  config.circle,
                  isCompleted && 'bg-primary text-on-primary',
                  isActive && 'bg-primary text-on-primary',
                  !isCompleted && !isActive && 'bg-surface-container text-on-surface-variant',
                )}
              >
                {isCompleted ? (
                  <CheckIcon className={cn(config.circleIcon, 'text-on-primary')} />
                ) : step.icon ? (
                  <span className={config.iconSize}>{step.icon}</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Label & description */}
              <div
                className={cn(
                  isHorizontal ? 'text-center' : 'text-left',
                )}
              >
                <div
                  className={cn(
                    'font-epilogue font-semibold transition-colors',
                    config.label,
                    (isCompleted || isActive) ? 'text-on-surface' : 'text-on-surface-variant',
                  )}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div
                    className={cn(
                      'font-manrope text-on-surface-variant',
                      config.description,
                    )}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          )

          return (
            <div
              key={step.key}
              className={cn(
                'flex',
                isHorizontal
                  ? 'flex-row items-start flex-1'
                  : 'flex-col',
                index === steps.length - 1 && isHorizontal && 'flex-none',
              )}
            >
              {/* Step */}
              {isClickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className={cn(
                    'cursor-pointer bg-transparent border-none p-0',
                    'rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    'hover:opacity-80 transition-opacity',
                  )}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`${step.label}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                >
                  {stepContent}
                </button>
              ) : (
                <div
                  aria-current={isActive ? 'step' : undefined}
                >
                  {stepContent}
                </div>
              )}

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    isHorizontal
                      ? cn(
                          'flex-1',
                          config.connectorMargin,
                          config.connectorMinWidth,
                          // Align connector with the circle center vertically
                          config.circle.includes('h-6') && 'mt-3',
                          config.circle.includes('h-8') && 'mt-4',
                          config.circle.includes('h-10') && 'mt-5',
                          config.connectorThickness,
                        )
                      : cn(
                          config.connectorMarginVertical,
                          config.connectorMinHeight,
                          // Align connector with the circle center horizontally
                          config.circle.includes('h-6') && 'ml-3',
                          config.circle.includes('h-8') && 'ml-4',
                          config.circle.includes('h-10') && 'ml-5',
                          config.connectorThicknessVertical,
                        ),
                    isCompleted
                      ? 'border-primary border-solid'
                      : 'border-outline-variant border-dashed',
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  },
)

Stepper.displayName = 'Stepper'
