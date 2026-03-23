import { forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export type RadioOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioGroupSize = 'compact' | 'spacious' | 'zoomed'

export interface RadioGroupProps {
  options: RadioOption[]
  name: string
  value?: string
  onChange?: (value: string) => void
  legend?: string
  error?: string
  disabled?: boolean
  required?: boolean
  orientation?: 'vertical' | 'horizontal'
  /** Size preset */
  size?: RadioGroupSize
  className?: string
}

const sizeConfig = {
  compact: {
    wrapper: 'gap-2',
    legend: 'text-xs mb-1',
    verticalGap: 'gap-2',
    horizontalGap: 'gap-6',
    optionGap: 'gap-3',
    label: 'text-xs',
    description: 'text-xs',
    error: 'text-xs',
  },
  spacious: {
    wrapper: 'gap-3',
    legend: 'text-xs mb-2',
    verticalGap: 'gap-4',
    horizontalGap: 'gap-8',
    optionGap: 'gap-4',
    label: 'text-sm',
    description: 'text-xs',
    error: 'text-xs',
  },
  zoomed: {
    wrapper: 'gap-4',
    legend: 'text-base mb-3',
    verticalGap: 'gap-6',
    horizontalGap: 'gap-10',
    optionGap: 'gap-5',
    label: 'text-lg',
    description: 'text-sm',
    error: 'text-sm',
  },
} as const

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      options,
      name,
      value,
      onChange,
      legend,
      error,
      disabled,
      required,
      orientation = 'vertical',
      size = 'spacious',
      className,
    },
    ref,
  ) => {
    const groupId = useId()
    const errorId = error ? `${groupId}-error` : undefined
    const config = sizeConfig[size]

    return (
      <fieldset
        ref={ref}
        role="radiogroup"
        aria-required={required || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={errorId}
        disabled={disabled}
        className={cn('flex flex-col', config.wrapper, className)}
      >
        {legend && (
          <legend className={cn('font-bold text-on-surface-variant uppercase tracking-widest', config.legend)}>
            {legend}
          </legend>
        )}
        <div
          className={cn(
            orientation === 'vertical'
              ? cn('flex flex-col', config.verticalGap)
              : cn('flex items-center', config.horizontalGap),
          )}
        >
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`
            const descriptionId = option.description
              ? `${optionId}-desc`
              : undefined
            const isDisabled = disabled || option.disabled

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  'flex items-center cursor-pointer',
                  config.optionGap,
                  isDisabled && 'opacity-60 cursor-not-allowed',
                )}
              >
                <input
                  id={optionId}
                  className="radio-tactile"
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  disabled={isDisabled}
                  aria-describedby={descriptionId}
                  onChange={() => onChange?.(option.value)}
                />
                <div className="flex flex-col">
                  <span className={cn('font-semibold text-on-surface', config.label)}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span
                      id={descriptionId}
                      className={cn('text-on-surface-variant', config.description)}
                    >
                      {option.description}
                    </span>
                  )}
                </div>
              </label>
            )
          })}
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            className={cn('text-error font-manrope flex items-center gap-1.5', config.error)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </fieldset>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
