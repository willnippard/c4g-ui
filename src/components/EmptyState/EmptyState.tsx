import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type EmptyStateSize = 'sm' | 'md' | 'lg'

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon or illustration rendered above the title */
  icon?: ReactNode
  /** Headline text */
  title: string
  /** Supporting description text */
  description?: string
  /** Action area, typically a Button */
  action?: ReactNode
  /** Size preset — controls icon size, text scale, and padding */
  size?: EmptyStateSize
}

const sizeConfig = {
  sm: {
    wrapper: 'py-8 px-4 gap-2',
    icon: 'h-10 w-10',
    title: 'text-sm',
    description: 'text-xs',
    action: 'mt-2',
  },
  md: {
    wrapper: 'py-16 px-8 gap-3',
    icon: 'h-16 w-16',
    title: 'text-xl',
    description: 'text-sm',
    action: 'mt-4',
  },
  lg: {
    wrapper: 'py-24 px-12 gap-4',
    icon: 'h-24 w-24',
    title: 'text-3xl',
    description: 'text-base',
    action: 'mt-6',
  },
} as const

function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="12"
        width="48"
        height="40"
        rx="4"
        className="stroke-on-surface-variant"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <circle
        cx="32"
        cy="28"
        r="6"
        className="stroke-on-surface-variant"
        strokeWidth="2"
      />
      <path
        d="M20 44 l8-8 l4 4 l8-10 l8 10"
        className="stroke-on-surface-variant"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size]

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          config.wrapper,
          className,
        )}
        {...props}
      >
        <div className={cn('text-on-surface-variant', config.icon)}>
          {icon ?? <DefaultIcon className="h-full w-full" />}
        </div>

        <h3
          className={cn(
            'font-epilogue font-bold text-on-surface',
            config.title,
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              'font-manrope text-on-surface-variant max-w-md',
              config.description,
            )}
          >
            {description}
          </p>
        )}

        {action && <div className={config.action}>{action}</div>}
      </div>
    )
  },
)

EmptyState.displayName = 'EmptyState'
