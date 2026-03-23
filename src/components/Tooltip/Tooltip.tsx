import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { cn } from '../../lib/utils'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipSize = 'sm' | 'md' | 'lg'

export interface TooltipProps {
  /** Content rendered inside the tooltip */
  content: ReactNode
  /** Trigger element that activates the tooltip */
  children: ReactElement
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition
  /** Delay in milliseconds before showing the tooltip */
  delay?: number
  /** Size preset controlling text size and padding */
  size?: TooltipSize
}

const sizeConfig = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
} as const

const positionConfig = {
  top: {
    container: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    enter: 'animate-tooltip-top',
  },
  bottom: {
    container: 'top-full left-1/2 -translate-x-1/2 mt-2',
    enter: 'animate-tooltip-bottom',
  },
  left: {
    container: 'right-full top-1/2 -translate-y-1/2 mr-2',
    enter: 'animate-tooltip-left',
  },
  right: {
    container: 'left-full top-1/2 -translate-y-1/2 ml-2',
    enter: 'animate-tooltip-right',
  },
} as const

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = 'top', delay = 300, size = 'md' }, ref) => {
    const [visible, setVisible] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const tooltipId = useId()

    const clearTimer = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }, [])

    const show = useCallback(() => {
      clearTimer()
      timerRef.current = setTimeout(() => setVisible(true), delay)
    }, [clearTimer, delay])

    const hide = useCallback(() => {
      clearTimer()
      setVisible(false)
    }, [clearTimer])

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          hide()
        }
      }

      if (visible) {
        document.addEventListener('keydown', handleEscape)
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }, [visible, hide])

    useEffect(() => {
      return () => clearTimer()
    }, [clearTimer])

    const posConfig = positionConfig[position]

    const trigger = cloneElement(children, {
      'aria-describedby': visible ? tooltipId : undefined,
      onMouseEnter: (e: React.MouseEvent) => {
        show()
        children.props.onMouseEnter?.(e)
      },
      onMouseLeave: (e: React.MouseEvent) => {
        hide()
        children.props.onMouseLeave?.(e)
      },
      onFocus: (e: React.FocusEvent) => {
        show()
        children.props.onFocus?.(e)
      },
      onBlur: (e: React.FocusEvent) => {
        hide()
        children.props.onBlur?.(e)
      },
    })

    return (
      <div ref={ref} className="relative inline-flex">
        {trigger}
        {visible && (
          <div
            id={tooltipId}
            role="tooltip"
            className={cn(
              'absolute z-50 whitespace-nowrap',
              'bg-inverse-surface text-inverse-on-surface',
              'font-manrope rounded-lg shadow-md',
              'pointer-events-none',
              sizeConfig[size],
              posConfig.container,
              posConfig.enter,
            )}
          >
            {content}
          </div>
        )}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
