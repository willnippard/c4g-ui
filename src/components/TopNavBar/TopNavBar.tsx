import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type NavLink = {
  label: string
  href: string
  active?: boolean
}

export interface TopNavBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand element — text string or ReactNode (e.g. logo). */
  brand?: ReactNode
  links?: NavLink[]
  actionLabel?: string
  onAction?: () => void
}

export const TopNavBar = forwardRef<HTMLElement, TopNavBarProps>(
  (
    {
      className,
      brand = 'Code4Good',
      links = [],
      actionLabel = 'Sign In',
      onAction,
      ...props
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="Main"
        className={cn(
          'fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md',
          className,
        )}
        {...props}
      >
        <div className="flex justify-between items-center px-8 h-16 max-w-screen-2xl mx-auto">
          <div className="text-xl font-black text-primary font-epilogue uppercase tracking-tighter">
            {brand}
          </div>
          {links.length > 0 && (
            <div className="hidden md:flex gap-8 items-center">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={link.active ? 'page' : undefined}
                  className={cn(
                    'font-epilogue font-bold tracking-tight transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm',
                    link.active
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-on-surface opacity-70 hover:opacity-100',
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          <button
            type="button"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        </div>
      </nav>
    )
  },
)

TopNavBar.displayName = 'TopNavBar'
