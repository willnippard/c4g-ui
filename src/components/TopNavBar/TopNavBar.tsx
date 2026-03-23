import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type TopNavLink = {
  label: string
  href: string
  icon?: ReactNode
  active?: boolean
  children?: TopNavLink[]
  megaMenu?: ReactNode
}

/** @deprecated Use TopNavLink instead */
export type NavLink = TopNavLink

export interface TopNavBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand element — text string or ReactNode (e.g. logo). */
  brand?: ReactNode
  links?: TopNavLink[]
  actionLabel?: string
  onAction?: () => void
  /** Secondary actions area (avatar, icons, etc.) rendered before the action button. */
  actions?: ReactNode
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
          {/* Brand */}
          <div className="text-xl font-black text-primary font-epilogue uppercase tracking-tighter">
            {brand}
          </div>

          {/* Right side: links + action button */}
          <div className="flex items-center gap-4">
            {/* Desktop links */}
            {links.length > 0 && (
              <ul className="hidden md:flex gap-1 items-center list-none m-0 p-0 mr-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={link.active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold font-manrope transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                        link.active
                          ? 'bg-surface-container-lowest text-primary'
                          : 'text-on-surface hover:bg-surface-container-high',
                      )}
                    >
                      {link.icon && (
                        <span className="shrink-0">{link.icon}</span>
                      )}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {/* Action button */}
            <button
            type="button"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            onClick={onAction}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </nav>
    )
  },
)

TopNavBar.displayName = 'TopNavBar'
