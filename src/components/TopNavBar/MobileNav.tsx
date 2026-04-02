import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'
import type { TopNavLink, TopNavBarSize } from './types'
import { sizeConfig } from './types'

interface MobileNavProps {
  mobileOpen: boolean
  onToggleMobile: () => void
  links: TopNavLink[]
  openDropdown: string | null
  onToggleDropdown: (href: string) => void
  actions?: ReactNode
  actionLabel: string
  onAction?: () => void
  size: TopNavBarSize
}

function hasSubmenu(link: TopNavLink): boolean {
  return !!(link.children?.length || link.megaMenu)
}

function renderMobileLink(
  link: TopNavLink,
  openDropdown: string | null,
  onToggleDropdown: (href: string) => void,
  sc: (typeof sizeConfig)[TopNavBarSize],
): JSX.Element {
  return (
    <li key={link.href} role="none">
      {hasSubmenu(link) ? (
        <>
          <button
            type="button"
            role="menuitem"
            onClick={() => onToggleDropdown(link.href)}
            aria-expanded={openDropdown === link.href}
            className={cn(
              'flex items-center gap-3 w-full px-4 rounded-lg font-semibold font-manrope transition-all duration-200',
              sc.mobileItem,
              sc.link.split(' ').find((c) => c.startsWith('text-')),
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              link.active
                ? 'bg-surface-container-lowest text-primary'
                : 'text-on-surface hover:bg-surface-container-high',
            )}
          >
            {link.icon && <span className="shrink-0">{link.icon}</span>}
            <span className="flex-1 text-left">{link.label}</span>
            <svg
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                openDropdown === link.href && 'rotate-180',
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown children as indented sub-items */}
          {link.children && openDropdown === link.href && (
            <ul
              className="space-y-1 mt-1 list-none m-0 p-0"
              role="menu"
            >
              {link.children.map((child) => (
                <li key={child.href} role="none">
                  <a
                    href={child.href}
                    role="menuitem"
                    aria-current={child.active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 pl-10 pr-4 rounded-lg font-semibold font-manrope transition-all duration-200',
                      sc.mobileItem,
                      sc.link.split(' ').find((c) => c.startsWith('text-')),
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                      child.active
                        ? 'text-primary bg-surface-container-lowest'
                        : 'text-on-secondary-container hover:bg-surface-container-high',
                    )}
                  >
                    {child.icon && (
                      <span className="shrink-0">{child.icon}</span>
                    )}
                    <span>{child.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Mega menu content inline in mobile */}
          {link.megaMenu && openDropdown === link.href && (
            <div className="px-4 py-3">{link.megaMenu}</div>
          )}
        </>
      ) : (
        <a
          href={link.href}
          role="menuitem"
          aria-current={link.active ? 'page' : undefined}
          className={cn(
            'flex items-center gap-3 px-4 rounded-lg font-semibold font-manrope transition-all duration-200',
            sc.mobileItem,
            sc.link.split(' ').find((c) => c.startsWith('text-')),
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            link.active
              ? 'bg-surface-container-lowest text-primary'
              : 'text-on-surface hover:bg-surface-container-high',
          )}
        >
          {link.icon && <span className="shrink-0">{link.icon}</span>}
          <span>{link.label}</span>
        </a>
      )}
    </li>
  )
}

const mobileMenuId = 'topnav-mobile-menu'

export function MobileNav({
  mobileOpen,
  onToggleMobile,
  links,
  openDropdown,
  onToggleDropdown,
  actions,
  actionLabel,
  onAction,
  size,
}: MobileNavProps) {
  const sc = sizeConfig[size]

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        type="button"
        className={cn(
          'md:hidden flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-high transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
          sc.hamburger,
        )}
        onClick={onToggleMobile}
        aria-expanded={mobileOpen}
        aria-controls={mobileMenuId}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      <div
        id={mobileMenuId}
        className={cn(
          'md:hidden bg-surface-container-low border-t border-outline-variant/20 transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul
          className="px-4 py-4 space-y-1 list-none m-0 p-0"
          role="menu"
          aria-label="Mobile navigation"
        >
          {links.map((link) =>
            renderMobileLink(link, openDropdown, onToggleDropdown, sc),
          )}
        </ul>

        <div className="px-4 pb-4 space-y-3">
          {/* Actions area in mobile */}
          {actions && (
            <div className="pt-3 border-t border-outline-variant/20">
              {actions}
            </div>
          )}

          {/* Action button in mobile */}
          <Button
            variant="primary"
            size={size}
            className={cn(
              'w-full',
              sc.mobileItem,
              sc.link.split(' ').find((c) => c.startsWith('text-')),
            )}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </>
  )
}
