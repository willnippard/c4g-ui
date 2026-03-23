import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  cloneElement,
  isValidElement,
} from 'react'
import { cn } from '../../lib/utils'

export interface DropdownMenuItem {
  key: string
  label: ReactNode
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  /** Red styling for destructive actions */
  danger?: boolean
  /** Renders a separator line instead of an item */
  divider?: boolean
}

export type DropdownMenuSize = 'sm' | 'md' | 'lg'

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Button or element that opens the menu */
  trigger: ReactElement
  /** Menu items to display */
  items: DropdownMenuItem[]
  /** Horizontal alignment of the dropdown relative to the trigger. @default 'left' */
  align?: 'left' | 'right'
  /** Size variant. @default 'md' */
  size?: DropdownMenuSize
}

const sizeConfig = {
  sm: {
    menu: 'min-w-[160px] py-1',
    item: 'px-3 py-1.5 text-xs gap-2',
    icon: 'w-3.5 h-3.5',
    divider: 'my-1',
  },
  md: {
    menu: 'min-w-[200px] py-1.5',
    item: 'px-4 py-2 text-sm gap-2.5',
    icon: 'w-4 h-4',
    divider: 'my-1.5',
  },
  lg: {
    menu: 'min-w-[240px] py-2',
    item: 'px-5 py-3 text-base gap-3',
    icon: 'w-5 h-5',
    divider: 'my-2',
  },
} as const

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      className,
      trigger,
      items,
      align = 'left',
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const sc = sizeConfig[size]
    const [open, setOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const menuRef = useRef<HTMLDivElement | null>(null)
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref],
    )

    // Actionable (non-divider) items for keyboard navigation
    const actionableItems = items.filter((item) => !item.divider)

    const close = useCallback(() => {
      setOpen(false)
      setFocusedIndex(-1)
    }, [])

    // Close on outside click
    useEffect(() => {
      if (!open) return
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          close()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, close])

    // Close on Escape
    useEffect(() => {
      if (!open) return
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          close()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, close])

    // Focus management
    useEffect(() => {
      if (open && focusedIndex >= 0) {
        itemRefs.current[focusedIndex]?.focus()
      }
    }, [open, focusedIndex])

    const handleTriggerClick = () => {
      if (open) {
        close()
      } else {
        setOpen(true)
        setFocusedIndex(-1)
      }
    }

    const handleMenuKeyDown = (e: React.KeyboardEvent) => {
      const enabledItems = actionableItems.filter((item) => !item.disabled)

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const nextIndex = findNextEnabledIndex(focusedIndex, 1)
          if (nextIndex !== -1) setFocusedIndex(nextIndex)
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prevIndex = findNextEnabledIndex(focusedIndex, -1)
          if (prevIndex !== -1) setFocusedIndex(prevIndex)
          break
        }
        case 'Home': {
          e.preventDefault()
          const firstEnabled = actionableItems.findIndex(
            (item) => !item.disabled,
          )
          if (firstEnabled !== -1) setFocusedIndex(firstEnabled)
          break
        }
        case 'End': {
          e.preventDefault()
          for (let i = actionableItems.length - 1; i >= 0; i--) {
            if (!actionableItems[i].disabled) {
              setFocusedIndex(i)
              break
            }
          }
          break
        }
        case 'Enter':
        case ' ': {
          e.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < enabledItems.length) {
            const item = actionableItems[focusedIndex]
            if (item && !item.disabled) {
              item.onClick?.()
              close()
            }
          }
          break
        }
        case 'Tab': {
          close()
          break
        }
      }
    }

    const findNextEnabledIndex = (
      current: number,
      direction: 1 | -1,
    ): number => {
      const len = actionableItems.length
      let index = current + direction
      if (index < 0) index = len - 1
      if (index >= len) index = 0

      const start = index
      do {
        if (!actionableItems[index].disabled) return index
        index += direction
        if (index < 0) index = len - 1
        if (index >= len) index = 0
      } while (index !== start)

      return -1
    }

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' && !open) {
        e.preventDefault()
        setOpen(true)
        const firstEnabled = actionableItems.findIndex(
          (item) => !item.disabled,
        )
        if (firstEnabled !== -1) setFocusedIndex(firstEnabled)
      }
    }

    // Clone trigger to inject aria attributes and handlers
    const triggerElement = isValidElement(trigger)
      ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
          onClick: (e: React.MouseEvent) => {
            handleTriggerClick()
            const originalOnClick = (
              trigger as ReactElement<Record<string, unknown>>
            ).props?.onClick
            if (typeof originalOnClick === 'function') {
              originalOnClick(e)
            }
          },
          onKeyDown: (e: React.KeyboardEvent) => {
            handleTriggerKeyDown(e)
            const originalOnKeyDown = (
              trigger as ReactElement<Record<string, unknown>>
            ).props?.onKeyDown
            if (typeof originalOnKeyDown === 'function') {
              originalOnKeyDown(e)
            }
          },
          'aria-haspopup': 'menu' as const,
          'aria-expanded': open,
        })
      : trigger

    let actionableIndex = 0

    return (
      <div
        ref={setRefs}
        className={cn('relative inline-block', className)}
        {...props}
      >
        {triggerElement}

        <div
          ref={menuRef}
          role="menu"
          aria-label="Actions"
          onKeyDown={handleMenuKeyDown}
          className={cn(
            'absolute top-full mt-2 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 font-manrope transition-all duration-200',
            sc.menu,
            align === 'right' ? 'right-0' : 'left-0',
            open
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none',
          )}
        >
          {items.map((item) => {
            if (item.divider) {
              return (
                <div
                  key={item.key}
                  role="separator"
                  className={cn(
                    'border-t border-outline-variant/20',
                    sc.divider,
                  )}
                />
              )
            }

            const currentActionableIndex = actionableIndex++

            return (
              <button
                key={item.key}
                ref={(el) => {
                  itemRefs.current[currentActionableIndex] = el
                }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                tabIndex={focusedIndex === currentActionableIndex ? 0 : -1}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.()
                    close()
                  }
                }}
                className={cn(
                  'flex items-center w-full mx-0 rounded-lg font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                  sc.item,
                  item.danger
                    ? 'text-error hover:bg-error/10'
                    : 'text-on-surface hover:bg-surface-container-high',
                  item.disabled && 'opacity-60 cursor-not-allowed',
                )}
              >
                {item.icon && (
                  <span className={cn('shrink-0', sc.icon)}>{item.icon}</span>
                )}
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  },
)

DropdownMenu.displayName = 'DropdownMenu'
