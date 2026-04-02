import {
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'
import { cn } from '../../lib/utils'
import { ChevronDownIcon } from '../../lib/icons'

export type AccordionSize = 'sm' | 'md' | 'lg'

export interface AccordionItem {
  key: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of accordion items to render */
  items: AccordionItem[]
  /** Allow multiple panels open simultaneously */
  multiple?: boolean
  /** Keys of items that should be open by default */
  defaultOpenKeys?: string[]
  /** Size preset */
  size?: AccordionSize
}

const sizeConfig = {
  sm: {
    trigger: 'py-2 px-3 text-sm',
    content: 'px-3 pt-1 pb-2 text-xs',
    chevron: 'h-4 w-4',
  },
  md: {
    trigger: 'py-3 px-4 text-base',
    content: 'px-4 pt-1 pb-4 text-sm',
    chevron: 'h-5 w-5',
  },
  lg: {
    trigger: 'py-4 px-6 text-lg',
    content: 'px-6 pt-2 pb-6 text-base',
    chevron: 'h-6 w-6',
  },
} as const


export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      items,
      multiple = false,
      defaultOpenKeys = [],
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const [openKeys, setOpenKeys] = useState<Set<string>>(
      () => new Set(defaultOpenKeys),
    )
    const instanceId = useId()
    const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
    const config = sizeConfig[size]

    const toggle = useCallback(
      (key: string) => {
        setOpenKeys((prev) => {
          const next = new Set(prev)
          if (next.has(key)) {
            next.delete(key)
          } else {
            if (!multiple) {
              next.clear()
            }
            next.add(key)
          }
          return next
        })
      },
      [multiple],
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const enabledIndices = items
          .map((item, i) => (!item.disabled ? i : -1))
          .filter((i) => i !== -1)
        const currentEnabledIndex = enabledIndices.indexOf(index)

        let targetIndex: number | undefined

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            targetIndex =
              enabledIndices[
                (currentEnabledIndex + 1) % enabledIndices.length
              ]
            break
          case 'ArrowUp':
            e.preventDefault()
            targetIndex =
              enabledIndices[
                (currentEnabledIndex - 1 + enabledIndices.length) %
                  enabledIndices.length
              ]
            break
          case 'Home':
            e.preventDefault()
            targetIndex = enabledIndices[0]
            break
          case 'End':
            e.preventDefault()
            targetIndex = enabledIndices[enabledIndices.length - 1]
            break
        }

        if (targetIndex !== undefined) {
          triggerRefs.current[targetIndex]?.focus()
        }
      },
      [items],
    )

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-outline-variant/20 bg-surface-container-lowest overflow-hidden',
          className,
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isOpen = openKeys.has(item.key)
          const triggerId = `${instanceId}-trigger-${item.key}`
          const panelId = `${instanceId}-panel-${item.key}`

          return (
            <div
              key={item.key}
              className={cn(
                index > 0 && 'border-t border-outline-variant/20',
              )}
            >
              <h3 className="m-0">
                <button
                  ref={(el) => {
                    triggerRefs.current[index] = el
                  }}
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  disabled={item.disabled}
                  onClick={() => toggle(item.key)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2',
                    'font-epilogue font-semibold text-on-surface',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    item.disabled
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer hover:bg-surface-container-low',
                    config.trigger,
                  )}
                >
                  <span className="text-left">{item.title}</span>
                  <ChevronDownIcon
                    className={cn(
                      'shrink-0 text-on-surface-variant transition-transform duration-200',
                      isOpen && 'rotate-180',
                      config.chevron,
                    )}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={cn(
                  'grid transition-all duration-200 ease-in-out',
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      'font-manrope text-on-surface-variant',
                      config.content,
                    )}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'
