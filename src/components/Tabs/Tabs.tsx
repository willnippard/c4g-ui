import {
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
} from 'react'
import { cn } from '../../lib/utils'

export interface Tab {
  key: string
  label: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

export type TabsSize = 'sm' | 'md' | 'lg'

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  activeKey: string
  onTabChange: (key: string) => void
  size?: TabsSize
  children?: ReactNode
}

const sizeStyles: Record<TabsSize, { tab: string; icon: string }> = {
  sm: { tab: 'px-3 py-1.5 text-xs', icon: '[&>svg]:h-3.5 [&>svg]:w-3.5' },
  md: { tab: 'px-4 py-2 text-sm', icon: '[&>svg]:h-4 [&>svg]:w-4' },
  lg: { tab: 'px-5 py-2.5 text-base', icon: '[&>svg]:h-5 [&>svg]:w-5' },
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeKey, onTabChange, size = 'md', children, ...props }, ref) => {
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const focusTab = useCallback(
      (index: number) => {
        const tab = tabs[index]
        if (tab && !tab.disabled) {
          tabRefs.current[index]?.focus()
        }
      },
      [tabs],
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const enabledIndices = tabs
          .map((t, i) => (!t.disabled ? i : -1))
          .filter((i) => i !== -1)
        const currentEnabledIdx = enabledIndices.indexOf(index)

        let targetIndex: number | undefined

        switch (e.key) {
          case 'ArrowRight': {
            e.preventDefault()
            const nextIdx = (currentEnabledIdx + 1) % enabledIndices.length
            targetIndex = enabledIndices[nextIdx]
            break
          }
          case 'ArrowLeft': {
            e.preventDefault()
            const prevIdx =
              (currentEnabledIdx - 1 + enabledIndices.length) % enabledIndices.length
            targetIndex = enabledIndices[prevIdx]
            break
          }
          case 'Home': {
            e.preventDefault()
            targetIndex = enabledIndices[0]
            break
          }
          case 'End': {
            e.preventDefault()
            targetIndex = enabledIndices[enabledIndices.length - 1]
            break
          }
          case 'Enter':
          case ' ': {
            e.preventDefault()
            onTabChange(tabs[index].key)
            return
          }
          default:
            return
        }

        if (targetIndex !== undefined) {
          focusTab(targetIndex)
        }
      },
      [tabs, focusTab, onTabChange],
    )

    const styles = sizeStyles[size]
    const panelId = `tabpanel-${activeKey}`
    const tabId = (key: string) => `tab-${key}`

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Tab bar */}
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex overflow-x-auto border-b border-outline-variant/20"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.key === activeKey
            const isDisabled = !!tab.disabled

            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                id={tabId(tab.key)}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={isActive ? panelId : undefined}
                aria-disabled={isDisabled || undefined}
                tabIndex={isActive ? 0 : -1}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) onTabChange(tab.key)
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 font-manrope font-medium whitespace-nowrap transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  styles.tab,
                  isActive && 'border-b-2 border-primary text-primary',
                  !isActive && !isDisabled && 'text-on-surface-variant hover:text-on-surface',
                  isDisabled && 'opacity-60 cursor-not-allowed text-on-surface-variant',
                )}
              >
                {tab.icon && (
                  <span className={cn('inline-flex shrink-0', styles.icon)}>{tab.icon}</span>
                )}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab panel */}
        {children && (
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId(activeKey)}
            tabIndex={0}
            className="mt-4"
          >
            {children}
          </div>
        )}
      </div>
    )
  },
)

Tabs.displayName = 'Tabs'
