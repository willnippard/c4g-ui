import { type ReactNode, useState, useMemo, useCallback } from 'react'
import { cn } from '../../lib/utils'

export type DataTableSize = 'compact' | 'spacious' | 'zoomed'
export type SortDirection = 'asc' | 'desc'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  align?: 'left' | 'right'
  /** Max width (e.g. '200px', '12rem'). Content exceeding this width is truncated with an ellipsis. */
  maxWidth?: string
  /** When true, this column header becomes clickable and supports sorting. */
  sortable?: boolean
  /** Custom comparator for client-side sorting. Receives two rows; return negative, 0, or positive. */
  sortComparator?: (a: T, b: T) => number
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  /** @deprecated Use `size` instead */
  density?: 'condensed' | 'default'
  /** Size preset — controls padding, gaps, and text scale */
  size?: DataTableSize
  className?: string
  caption?: string
  emptyState?: ReactNode
  /** Active sort column key. When provided, enables controlled (server-side) mode. */
  sortKey?: string
  /** Active sort direction. When provided alongside sortKey, enables controlled mode. */
  sortDirection?: SortDirection
  /** Called when a sortable column header is clicked. */
  onSort?: (key: string, direction: SortDirection) => void
}

const sizeConfig = {
  compact: {
    th: 'px-4 py-2 text-[10px] whitespace-nowrap',
    td: 'px-4 py-2.5 text-xs whitespace-nowrap',
    container: 'rounded-lg',
  },
  spacious: {
    th: 'px-8 py-4 text-xs whitespace-nowrap',
    td: 'px-8 py-5 text-sm whitespace-nowrap',
    container: 'rounded-xl',
  },
  zoomed: {
    th: 'px-12 py-6 text-sm whitespace-nowrap',
    td: 'px-12 py-8 text-lg whitespace-nowrap',
    container: 'rounded-2xl',
  },
} as const

/** Map legacy density values to the new size prop */
function resolveSize(
  size: DataTableSize | undefined,
  density: 'condensed' | 'default' | undefined,
): DataTableSize {
  if (size) return size
  if (density === 'condensed') return 'compact'
  return 'spacious'
}

function defaultComparator<T>(a: T, b: T, key: string): number {
  const aVal = (a as Record<string, unknown>)[key]
  const bVal = (b as Record<string, unknown>)[key]

  if (aVal == null && bVal == null) return 0
  if (aVal == null) return -1
  if (bVal == null) return 1

  if (typeof aVal === 'number' && typeof bVal === 'number') {
    return aVal - bVal
  }

  return String(aVal).localeCompare(String(bVal))
}

function SortIndicator({ direction, active }: { direction: SortDirection | null; active: boolean }) {
  return (
    <span
      className={cn(
        'ml-1.5 inline-flex flex-col text-[0.6em] leading-none select-none',
        active ? 'text-primary' : 'text-on-surface-variant/40',
      )}
      aria-hidden="true"
    >
      <span className={cn(active && direction === 'asc' ? 'text-primary' : 'text-on-surface-variant/40')}>
        ↑
      </span>
      <span className={cn(active && direction === 'desc' ? 'text-primary' : 'text-on-surface-variant/40')}>
        ↓
      </span>
    </span>
  )
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  density,
  size,
  className,
  caption,
  emptyState,
  sortKey: controlledSortKey,
  sortDirection: controlledSortDirection,
  onSort,
}: DataTableProps<T>) {
  const resolved = resolveSize(size, density)
  const styles = sizeConfig[resolved]

  // Determine if we're in controlled (server-side) mode
  const isControlled = controlledSortKey !== undefined && controlledSortDirection !== undefined

  // Internal state for uncontrolled (client-side) mode
  const [internalSortKey, setInternalSortKey] = useState<string | null>(null)
  const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>('asc')

  // Resolve active sort state
  const activeSortKey = isControlled ? controlledSortKey : internalSortKey
  const activeSortDirection = isControlled ? controlledSortDirection : internalSortDirection

  const handleHeaderClick = useCallback(
    (columnKey: string) => {
      if (isControlled) {
        // In controlled mode, just fire the callback and let the consumer decide
        const nextDirection: SortDirection =
          activeSortKey === columnKey && activeSortDirection === 'asc' ? 'desc' : 'asc'
        onSort?.(columnKey, nextDirection)
      } else {
        // In uncontrolled mode, manage state internally
        setInternalSortKey((prevKey) => {
          const isSameKey = prevKey === columnKey
          const nextDirection: SortDirection = isSameKey && internalSortDirection === 'asc' ? 'desc' : 'asc'
          setInternalSortDirection(nextDirection)
          onSort?.(columnKey, nextDirection)
          return columnKey
        })
      }
    },
    [isControlled, activeSortKey, activeSortDirection, internalSortDirection, onSort],
  )

  // Client-side sorting
  const sortedData = useMemo(() => {
    if (isControlled || !activeSortKey) return data

    const column = columns.find((c) => c.key === activeSortKey)
    if (!column) return data

    const comparator = column.sortComparator ?? ((a: T, b: T) => defaultComparator(a, b, activeSortKey))

    return [...data].sort((a, b) => {
      const result = comparator(a, b)
      return activeSortDirection === 'asc' ? result : -result
    })
  }, [data, isControlled, activeSortKey, activeSortDirection, columns])

  return (
    <div
      className={cn(
        'overflow-x-auto bg-surface-container-lowest shadow-sm border border-outline-variant/40',
        styles.container,
        className,
      )}
    >
      <table className="w-full text-left border-collapse">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="bg-primary/5 border-b border-outline-variant/30">
            {columns.map((col) => {
              const isSortable = col.sortable === true
              const isActive = isSortable && activeSortKey === col.key

              return (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    styles.th,
                    'font-extrabold uppercase tracking-[0.15em] text-primary font-epilogue',
                    col.align === 'right' && 'text-right',
                    isSortable && 'cursor-pointer select-none hover:bg-primary/10 transition-colors',
                    isActive && 'bg-primary/8',
                  )}
                  onClick={isSortable ? () => handleHeaderClick(col.key) : undefined}
                  aria-sort={
                    isActive
                      ? activeSortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {isSortable && (
                      <SortIndicator
                        direction={isActive ? activeSortDirection ?? null : null}
                        active={isActive}
                      />
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 font-manrope">
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(styles.td, 'text-center text-on-surface-variant')}
              >
                {emptyState ?? 'No data available'}
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="hover:bg-surface-container-low/30 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      styles.td,
                      'text-on-surface',
                      col.align === 'right' && 'text-right',
                      col.maxWidth && 'overflow-hidden text-ellipsis',
                    )}
                    style={col.maxWidth ? { maxWidth: col.maxWidth } : undefined}
                    title={
                      col.maxWidth && !col.render
                        ? String((row as Record<string, unknown>)[col.key] ?? '')
                        : undefined
                    }
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
