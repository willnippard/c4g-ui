import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
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
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const navRef = useRef<HTMLElement | null>(null)
    const mobileMenuId = 'topnav-mobile-menu'

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        navRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref)
          (ref as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref],
    )

    // Close dropdowns on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) {
          setOpenDropdown(null)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on Escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpenDropdown(null)
          setMobileOpen(false)
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    const toggleDropdown = (href: string) => {
      setOpenDropdown((prev) => (prev === href ? null : href))
    }

    const hasSubmenu = (link: TopNavLink) =>
      !!(link.children?.length || link.megaMenu)

    const renderDesktopLink = (link: TopNavLink) => {
      const isOpen = openDropdown === link.href

      if (hasSubmenu(link)) {
        return (
          <li key={link.href} className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown(link.href)}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold font-manrope transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                link.active
                  ? 'bg-surface-container-lowest text-primary'
                  : 'text-on-surface hover:bg-surface-container-high',
              )}
            >
              {link.icon && <span className="shrink-0">{link.icon}</span>}
              <span>{link.label}</span>
              <svg
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isOpen && 'rotate-180',
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

            {/* Dropdown panel */}
            {link.children && link.children.length > 0 && (
              <div
                className={cn(
                  'absolute top-full left-0 mt-2 min-w-[220px] bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 py-2 transition-all duration-300',
                  isOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none',
                )}
              >
                {link.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    aria-current={child.active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-semibold font-manrope transition-all duration-200',
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
                ))}
              </div>
            )}

            {/* Mega menu panel */}
            {link.megaMenu && (
              <div
                className={cn(
                  'fixed left-0 right-0 top-16 bg-surface-container-lowest shadow-xl border-t border-outline-variant/20 transition-all duration-300',
                  isOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none',
                )}
              >
                <div className="max-w-screen-2xl mx-auto px-8 py-6">
                  {link.megaMenu}
                </div>
              </div>
            )}
          </li>
        )
      }

      return (
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
            {link.icon && <span className="shrink-0">{link.icon}</span>}
            <span>{link.label}</span>
          </a>
        </li>
      )
    }

    const renderMobileLink = (link: TopNavLink) => (
      <li key={link.href} role="none">
        {hasSubmenu(link) ? (
          <>
            <button
              type="button"
              role="menuitem"
              onClick={() => toggleDropdown(link.href)}
              aria-expanded={openDropdown === link.href}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold font-manrope transition-all duration-200',
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
                        'flex items-center gap-3 pl-10 pr-4 py-3 rounded-lg text-sm font-semibold font-manrope transition-all duration-200',
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
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold font-manrope transition-all duration-200',
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

    return (
      <nav
        ref={setRefs}
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

          {/* Right side: links + action button + hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop links */}
            {links.length > 0 && (
              <ul className="hidden md:flex gap-1 items-center list-none m-0 p-0 mr-2">
                {links.map((link) => renderDesktopLink(link))}
              </ul>
            )}

            {/* Action button (desktop only) */}
            <button
              type="button"
              className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              onClick={onAction}
            >
              {actionLabel}
            </button>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container-high transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              onClick={() => setMobileOpen((prev) => !prev)}
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
          </div>
        </div>

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
            {links.map((link) => renderMobileLink(link))}
          </ul>

          <div className="px-4 pb-4 space-y-3">
            {/* Action button in mobile */}
            <button
              type="button"
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
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
