import { type InputHTMLAttributes, forwardRef, useEffect, useId, useRef } from 'react'
import { cn } from '../../lib/utils'

export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string
  description?: string
  error?: string
  size?: CheckboxSize
  indeterminate?: boolean
}

const sizeConfig = {
  sm: {
    wrapper: 'gap-2',
    box: 'w-4 h-4 rounded',
    label: 'text-xs',
    description: 'text-xs',
    error: 'text-xs',
    icon: { width: 10, height: 10, strokeWidth: 3 },
  },
  md: {
    wrapper: 'gap-3',
    box: 'w-5 h-5 rounded-md',
    label: 'text-sm',
    description: 'text-xs',
    error: 'text-xs',
    icon: { width: 12, height: 12, strokeWidth: 2.5 },
  },
  lg: {
    wrapper: 'gap-4',
    box: 'w-6 h-6 rounded-md',
    label: 'text-lg',
    description: 'text-sm',
    error: 'text-sm',
    icon: { width: 14, height: 14, strokeWidth: 2.5 },
  },
} as const

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      size = 'md',
      indeterminate = false,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const checkboxId = id || generatedId
    const descriptionId = description ? `${checkboxId}-description` : undefined
    const errorId = error ? `${checkboxId}-error` : undefined
    const describedBy = [errorId, descriptionId].filter(Boolean).join(' ') || undefined
    const config = sizeConfig[size]

    const internalRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      const el = internalRef.current
      if (el) {
        el.indeterminate = indeterminate
      }
    }, [indeterminate])

    return (
      <div className={cn('flex flex-col', config.wrapper)}>
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-start',
            config.wrapper,
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
            className,
          )}
        >
          <div className={cn('relative flex-shrink-0', config.box)}>
            <input
              ref={(node) => {
                internalRef.current = node
                if (typeof ref === 'function') {
                  ref(node)
                } else if (ref) {
                  ref.current = node
                }
              }}
              id={checkboxId}
              type="checkbox"
              aria-invalid={!!error || undefined}
              aria-describedby={describedBy}
              className="sr-only peer"
              disabled={disabled}
              {...props}
            />
            {/* Custom checkbox box */}
            <div
              aria-hidden="true"
              className={cn(
                'absolute inset-0 border-2 border-outline-variant transition-all duration-200',
                'bg-surface',
                'peer-checked:bg-primary peer-checked:border-primary',
                'peer-focus-visible:ring-4 peer-focus-visible:ring-primary/35',
                !disabled && 'peer-hover:ring-4 peer-hover:ring-primary/15',
                config.box,
                indeterminate && 'bg-primary border-primary',
                error && 'border-error peer-checked:bg-error peer-checked:border-error',
                error && indeterminate && 'bg-error border-error',
              )}
            />
            {/* Checkmark / dash icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={config.icon.width}
              height={config.icon.height}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={config.icon.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={cn(
                'absolute inset-0 m-auto text-on-primary transition-opacity duration-200 pointer-events-none',
                indeterminate ? 'opacity-100' : 'opacity-0 peer-checked:opacity-100',
              )}
            >
              {indeterminate ? (
                <line x1="5" y1="12" x2="19" y2="12" />
              ) : (
                <polyline points="20 6 9 17 4 12" />
              )}
            </svg>
          </div>
          {(label || description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <span
                  className={cn(
                    'font-semibold font-manrope text-on-surface select-none',
                    config.label,
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span
                  id={descriptionId}
                  className={cn(
                    'font-manrope text-on-surface-variant select-none',
                    config.description,
                  )}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {error && (
          <p
            id={errorId}
            role="alert"
            className={cn('text-error font-manrope flex items-center gap-1.5', config.error)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
