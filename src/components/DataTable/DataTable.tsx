import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type DataTableSize = 'compact' | 'spacious' | 'zoomed'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  align?: 'left' | 'right'
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
}

const sizeConfig = {
  compact: {
    th: 'px-4 py-2 text-[10px]',
    td: 'px-4 py-2.5 text-xs',
    container: 'rounded-lg',
  },
  spacious: {
    th: 'px-8 py-4 text-xs',
    td: 'px-8 py-5 text-sm',
    container: 'rounded-xl',
  },
  zoomed: {
    th: 'px-12 py-6 text-sm',
    td: 'px-12 py-8 text-lg',
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

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  density,
  size,
  className,
  caption,
  emptyState,
}: DataTableProps<T>) {
  const resolved = resolveSize(size, density)
  const styles = sizeConfig[resolved]

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
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  styles.th,
                  'font-extrabold uppercase tracking-[0.15em] text-primary font-epilogue',
                  col.align === 'right' && 'text-right',
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20 font-manrope">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(styles.td, 'text-center text-on-surface-variant')}
              >
                {emptyState ?? 'No data available'}
              </td>
            </tr>
          ) : (
            data.map((row) => (
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
                    )}
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
