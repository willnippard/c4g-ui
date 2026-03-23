import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'impact'
  size?: 'compact' | 'spacious' | 'zoomed'
  title: string
  description?: string
  icon?: ReactNode
  onDismiss?: () => void
}

/** @deprecated Use `Toast` instead */
export type ImpactToastProps = ToastProps

const variantStyles: Record<NonNullable<ToastProps['variant']>, { container: string; icon: string }> = {
  success: {
    container: 'bg-toast-success text-white border-white/10',
    icon: 'text-white/70',
  },
  error: {
    container: 'bg-toast-error text-white border-white/10',
    icon: 'text-white/70',
  },
  warning: {
    container: 'bg-toast-warning text-white border-white/10',
    icon: 'text-white/70',
  },
  info: {
    container: 'bg-toast-info text-white border-white/10',
    icon: 'text-white/70',
  },
  impact: {
    container: 'bg-toast-impact text-white border-white/10',
    icon: 'text-white/70',
  },
}

const sizeConfig = {
  compact: {
    container: 'p-2.5 gap-2',
    icon: 'h-4 w-4',
    iconWrapper: 'mt-0',
    title: 'text-xs font-bold',
    description: 'text-[10px] mt-0.5',
    dismissIcon: 'h-3 w-3',
  },
  spacious: {
    container: 'p-4 gap-3',
    icon: 'h-5 w-5',
    iconWrapper: 'mt-0.5',
    title: 'text-sm font-bold',
    description: 'text-xs mt-1',
    dismissIcon: 'h-4 w-4',
  },
  zoomed: {
    container: 'p-8 gap-5',
    icon: 'h-8 w-8',
    iconWrapper: 'mt-1',
    title: 'text-xl font-bold',
    description: 'text-base mt-2',
    dismissIcon: 'h-6 w-6',
  },
} as const

const makeDefaultIcon = (iconSize: string, variant: NonNullable<ToastProps['variant']>): ReactNode => {
  switch (variant) {
    case 'success':
    case 'impact':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    case 'error':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )
    case 'warning':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'info':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={iconSize} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
  }
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', size = 'spacious', title, description, icon, onDismiss, ...props }, ref) => {
    const styles = variantStyles[variant]
    const config = sizeConfig[size]

    return (
      <div
        ref={ref}
        role={variant === 'error' ? 'alert' : 'status'}
        className={cn(
          'rounded-lg shadow-xl backdrop-blur-md flex items-start border',
          config.container,
          styles.container,
          className,
        )}
        {...props}
      >
        <span className={cn('shrink-0', config.iconWrapper, styles.icon)}>
          {icon ?? makeDefaultIcon(config.icon, variant)}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className={config.title}>{title}</h4>
          {description && (
            <p className={cn('leading-relaxed opacity-90', config.description)}>
              {description}
            </p>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={config.dismissIcon} aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    )
  },
)

Toast.displayName = 'Toast'

/** @deprecated Use `Toast` instead */
export const ImpactToast = Toast
