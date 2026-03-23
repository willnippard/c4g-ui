import { type SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export type SelectOption = { value: string; label: string }

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  options: SelectOption[]
  placeholder?: string
  helperText?: string
  error?: string
  /** Size preset */
  size?: SelectSize
}

const sizeConfig = {
  sm: {
    wrapper: 'gap-1',
    label: 'text-xs',
    select: 'px-2 py-1.5 pr-8 text-sm',
    iconWrapper: 'right-2',
    iconSvg: 'h-4 w-4',
    helper: 'text-xs',
  },
  md: {
    wrapper: 'gap-1.5',
    label: 'text-xs',
    select: 'px-3 py-2 pr-10 text-sm',
    iconWrapper: 'right-3',
    iconSvg: 'h-5 w-5',
    helper: 'text-xs',
  },
  lg: {
    wrapper: 'gap-2',
    label: 'text-base',
    select: 'px-4 py-3 pr-12 text-lg',
    iconWrapper: 'right-4',
    iconSvg: 'h-6 w-6',
    helper: 'text-sm',
  },
} as const

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, placeholder, error, helperText, id, size = 'md', ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const descriptionId = error
      ? `${selectId}-error`
      : helperText
        ? `${selectId}-helper`
        : undefined
    const config = sizeConfig[size]

    return (
      <div className={cn('flex flex-col', config.wrapper)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn('font-semibold font-manrope text-foreground', config.label)}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error || undefined}
            aria-describedby={descriptionId}
            className={cn(
              'w-full rounded-ethos border border-outline-variant/30 bg-card font-manrope text-foreground appearance-none transition-colors cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-transparent',
              config.select,
              error && 'border-error focus-visible:ring-error',
              props.disabled && 'opacity-60 cursor-not-allowed',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 flex items-center',
              config.iconWrapper,
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={cn('text-on-surface-variant', config.iconSvg)}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} role="alert" className={cn('text-error font-manrope flex items-center gap-1.5', config.helper)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className={cn('text-muted-foreground font-manrope', config.helper)}>{helperText}</p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
