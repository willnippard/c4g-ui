import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const descriptionId = error
      ? `${inputId}-error`
      : helperText
        ? `${inputId}-helper`
        : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold font-manrope text-foreground dark:text-foreground-dark"
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
            'rounded-ethos border border-border bg-card px-3 py-2 text-sm font-manrope text-foreground placeholder:text-muted-foreground transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'dark:border-border-dark dark:bg-card-dark dark:text-foreground-dark dark:placeholder:text-muted-foreground',
            error && 'border-red-500 focus:ring-red-500 dark:border-red-500',
            props.disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500 font-manrope">{error}</p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground font-manrope">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
