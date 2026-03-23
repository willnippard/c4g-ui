import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type ProgressBarSize = 'sm' | 'md' | 'lg'
export type ProgressBarVariant = 'primary' | 'accent' | 'error'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100) */
  value: number
  /** Maximum value (default 100) */
  max?: number
  /** Label displayed above the bar */
  label?: string
  /** Show percentage text beside the bar */
  showValue?: boolean
  /** Bar fill color variant */
  variant?: ProgressBarVariant
  /** Size preset — controls bar height and text scale */
  size?: ProgressBarSize
}

const variantStyles: Record<ProgressBarVariant, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  error: 'bg-error',
}

const sizeConfig = {
  sm: {
    track: 'h-1',
    label: 'text-xs',
    value: 'text-xs',
    gap: 'gap-1',
  },
  md: {
    track: 'h-2',
    label: 'text-sm',
    value: 'text-sm',
    gap: 'gap-1.5',
  },
  lg: {
    track: 'h-3',
    label: 'text-base',
    value: 'text-base',
    gap: 'gap-2',
  },
} as const

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      label,
      showValue = false,
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size]
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div ref={ref} className={cn('flex flex-col', config.gap, className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className={cn('font-manrope font-medium text-on-surface', config.label)}>
                {label}
              </span>
            )}
            {showValue && (
              <span className={cn('font-manrope font-medium text-on-surface-variant', config.value)}>
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            'w-full bg-surface-container-low rounded-full overflow-hidden',
            config.track,
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label ?? `${Math.round(percentage)}%`}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variantStyles[variant],
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
