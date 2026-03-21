import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

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
          <p className="text-xs text-red-500 font-manrope">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-muted-foreground font-manrope">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
