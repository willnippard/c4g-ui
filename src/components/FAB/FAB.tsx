import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type FABDensity = 'compact' | 'spacious' | 'zoomed'

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  /** Density preset — controls overall scale independently of size */
  density?: FABDensity
  icon?: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  fixed?: boolean
}

const sizeStyles: Record<NonNullable<FABProps['size']>, string> = {
  sm: 'w-12 h-12 text-xl',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-20 h-20 text-4xl',
}

const positionStyles: Record<NonNullable<FABProps['position']>, string> = {
  'bottom-right': 'bottom-8 right-8',
  'bottom-left': 'bottom-8 left-8',
  'top-right': 'top-8 right-8',
  'top-left': 'top-8 left-8',
}

const densityConfig = {
  compact: {
    button: 'w-10 h-10 text-lg',
    icon: 'w-4 h-4',
  },
  spacious: {
    button: '',
    icon: 'w-6 h-6',
  },
  zoomed: {
    button: 'w-24 h-24 text-5xl',
    icon: 'w-10 h-10',
  },
} as const

const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className,
      size = 'md',
      density = 'spacious',
      icon,
      position = 'bottom-right',
      fixed = true,
      disabled,
      'aria-label': ariaLabel = 'Action button',
      ...props
    },
    ref,
  ) => {
    const densityCfg = densityConfig[density]

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          sizeStyles[size],
          density !== 'spacious' && densityCfg.button,
          fixed && 'fixed z-50',
          fixed && positionStyles[position],
          disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:scale-110 active:scale-95',
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {icon ?? defaultIcon}
      </button>
    )
  },
)

FAB.displayName = 'FAB'
