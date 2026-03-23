import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  /** Size preset */
  size?: InputSize
}

const sizeConfig = {
  sm: {
    wrapper: 'gap-1',
    label: 'text-xs',
    input: 'px-2 py-1.5 text-sm',
    helper: 'text-xs',
  },
  md: {
    wrapper: 'gap-1.5',
    label: 'text-xs',
    input: 'px-3 py-2 text-sm',
    helper: 'text-xs',
  },
  lg: {
    wrapper: 'gap-2',
    label: 'text-base',
    input: 'px-4 py-3 text-lg',
    helper: 'text-sm',
  },
} as const

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, size = 'md', ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const descriptionId = error
      ? `${inputId}-error`
      : helperText
        ? `${inputId}-helper`
        : undefined
    const config = sizeConfig[size]

    return (
      <div className={cn('flex flex-col', config.wrapper)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn('font-semibold font-manrope text-foreground', config.label)}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error || undefined}
          aria-describedby={descriptionId}
          className={cn(
            'rounded-ethos border border-outline-variant/30 bg-card font-manrope text-foreground placeholder:text-muted-foreground transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-transparent',
            config.input,
            error && 'border-error focus-visible:ring-error',
            props.disabled && 'opacity-60 cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} role="alert" className={cn('text-error font-manrope flex items-center gap-1.5', config.helper)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className={cn('text-muted-foreground font-manrope', config.helper)}>{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
