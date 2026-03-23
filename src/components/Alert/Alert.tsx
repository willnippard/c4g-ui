import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'

export type AlertSize = 'sm' | 'md' | 'lg'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info'
  size?: AlertSize
  onDismiss?: () => void
  action?: { label: string; onClick: () => void }
}

const variantStyles: Record<NonNullable<AlertProps['variant']>, string> = {
  success: 'bg-surface-container-low border-l-4 border-primary',
  error: 'bg-error-container/30 border-l-4 border-error',
  warning: 'bg-tertiary-fixed/30 border-l-4 border-tertiary',
  info: 'bg-surface-container-low border-l-4 border-on-surface-variant',
}

const actionVariantStyles: Record<NonNullable<AlertProps['variant']>, string> = {
  success: 'bg-primary text-on-primary',
  error: 'bg-error text-on-error',
  warning: 'bg-tertiary text-on-tertiary',
  info: 'bg-on-surface-variant text-surface-container-low',
}

const sizeConfig = {
  sm: {
    container: 'p-3 gap-2',
    text: 'text-sm',
    actionButton: 'px-2.5 py-1 text-xs',
    dismissIcon: 'w-4 h-4',
    dismissButton: 'p-0.5',
    contentGap: 'gap-2',
    variantIcon: 'w-4 h-4',
  },
  md: {
    container: 'p-6 gap-4',
    text: 'text-base',
    actionButton: 'px-4 py-1.5 text-xs',
    dismissIcon: 'w-5 h-5',
    dismissButton: 'p-1',
    contentGap: 'gap-3',
    variantIcon: 'w-5 h-5',
  },
  lg: {
    container: 'p-10 gap-6',
    text: 'text-xl',
    actionButton: 'px-6 py-2.5 text-base',
    dismissIcon: 'w-7 h-7',
    dismissButton: 'p-2',
    contentGap: 'gap-4',
    variantIcon: 'w-7 h-7',
  },
} as const

const variantIcons: Record<NonNullable<AlertProps['variant']>, (iconClass: string) => React.ReactNode> = {
  success: (iconClass) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('text-primary shrink-0', iconClass)}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (iconClass) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('text-error shrink-0', iconClass)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (iconClass) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('text-tertiary shrink-0', iconClass)}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (iconClass) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('text-on-surface-variant shrink-0', iconClass)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', size = 'md', onDismiss, action, children, ...props }, ref) => {
    const config = sizeConfig[size]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'rounded-r-lg flex items-center justify-between border border-l-0 border-outline-variant/20',
          config.container,
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        <div className={cn('flex items-center', config.contentGap)}>
          {variantIcons[variant](config.variantIcon)}
          <p className={cn('text-on-surface font-medium', config.text)}>{children}</p>
        </div>
        <div className="flex items-center gap-2">
          {action && (
            <Button
              variant="secondary"
              size={size}
              className={cn(
                config.actionButton,
                actionVariantStyles[variant],
              )}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {onDismiss && (
            <button
              type="button"
              className={cn(
                'text-on-surface-variant hover:text-on-surface transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface',
                config.dismissButton,
              )}
              onClick={onDismiss}
              aria-label="Dismiss alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={config.dismissIcon}
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
