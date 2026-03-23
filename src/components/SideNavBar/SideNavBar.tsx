import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type SideNavItem = {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

export type SideNavFooterLink = {
  label: string
  href: string
  icon?: React.ReactNode
}

export interface SideNavBarProps extends HTMLAttributes<HTMLElement> {
  brandIcon?: React.ReactNode
  title?: string
  subtitle?: string
  items: SideNavItem[]
  footerLinks?: SideNavFooterLink[]
  footerAction?: { label: string; onClick: () => void }
}

export const SideNavBar = forwardRef<HTMLElement, SideNavBarProps>(
  (
    {
      className,
      brandIcon,
      title,
      subtitle,
      items,
      footerLinks,
      footerAction,
      ...props
    },
    ref,
  ) => {
    return (
      <aside
        ref={ref}
        aria-label={title ?? 'Side navigation'}
        className={cn(
          'h-screen w-64 bg-surface-container-low flex flex-col py-6 px-4 font-manrope',
          className,
        )}
        {...props}
      >
        {(brandIcon || title || subtitle) && (
          <div className="flex items-center gap-3 px-4 mb-10">
            {brandIcon && (
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary shrink-0">
                {brandIcon}
              </div>
            )}
            <div className="overflow-hidden">
              {title && (
                <h2 className="font-epilogue font-bold text-primary leading-none truncate">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-[10px] uppercase tracking-widest text-on-secondary-container font-bold mt-1 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        <nav aria-label="Side" className="flex-1 space-y-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                item.active
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-secondary-container hover:bg-surface-container-high hover:translate-x-1',
              )}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {(footerAction || footerLinks) && (
          <div className="mt-auto pt-6 border-t border-outline-variant/20 space-y-1">
            {footerLinks &&
              footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold text-on-secondary-container hover:bg-surface-container-high transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  {link.icon && <span className="shrink-0">{link.icon}</span>}
                  <span>{link.label}</span>
                </a>
              ))}
            {footerAction && (
              <button
                type="button"
                onClick={footerAction.onClick}
                className="w-full mt-4 bg-primary text-on-primary py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {footerAction.label}
              </button>
            )}
          </div>
        )}
      </aside>
    )
  },
)

SideNavBar.displayName = 'SideNavBar'
