import { type HTMLAttributes, forwardRef, useMemo, useState } from 'react'
import { cn } from '../../lib/utils'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { DataTable, type DataTableColumn, type DataTableSize } from '../DataTable'
import { Input } from '../Input'
import { Select, type SelectOption } from '../Select'

export interface DataTableAdvancedColumn<T> extends DataTableColumn<T> {
  /** Enable a per-column filter dropdown for this column */
  filterable?: boolean
  /** Extract the filterable value from a row (defaults to row[key]) */
  filterValue?: (row: T) => string
}

export interface DataTableAdvancedProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  columns: DataTableAdvancedColumn<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  /** Size preset — controls padding, gaps, and text scale */
  size?: DataTableSize
  caption?: string
  /** Content shown when `data` is empty (before any filtering) */
  emptyState?: React.ReactNode
  /** Content shown when search/filters produce no results */
  noResultsState?: React.ReactNode
  /** Placeholder text for the search input */
  searchPlaceholder?: string
}

function getRowValue<T>(row: T, key: string): string {
  return String((row as Record<string, unknown>)[key] ?? '')
}

function DataTableAdvancedInner<T>(
  {
    columns,
    data,
    keyExtractor,
    size = 'md',
    caption,
    className,
    emptyState,
    noResultsState,
    searchPlaceholder = 'Search...',
    ...props
  }: DataTableAdvancedProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [search, setSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})

  const filterableColumns = useMemo(
    () => columns.filter((col) => col.filterable),
    [columns],
  )

  /** Unique values per filterable column */
  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {}
    for (const col of filterableColumns) {
      const values = new Set<string>()
      for (const row of data) {
        const v = col.filterValue ? col.filterValue(row) : getRowValue(row, col.key)
        if (v) values.add(v)
      }
      options[col.key] = Array.from(values).sort()
    }
    return options
  }, [data, filterableColumns])

  /** Filtered dataset */
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim()

    return data.filter((row) => {
      // Global search: match any column
      if (q) {
        const matches = columns.some((col) => {
          const val = col.filterValue ? col.filterValue(row) : getRowValue(row, col.key)
          return val.toLowerCase().includes(q)
        })
        if (!matches) return false
      }

      // Per-column filters
      for (const [key, filterVal] of Object.entries(columnFilters)) {
        if (!filterVal) continue
        const col = columns.find((c) => c.key === key)
        if (!col) continue
        const rowVal = col.filterValue ? col.filterValue(row) : getRowValue(row, col.key)
        if (rowVal !== filterVal) return false
      }

      return true
    })
  }, [data, search, columnFilters, columns])

  const activeFilterCount = Object.values(columnFilters).filter(Boolean).length
  const isFiltered = search.trim() !== '' || activeFilterCount > 0
  const hasData = data.length > 0
  const hasResults = filteredData.length > 0

  function clearFilter(key: string) {
    setColumnFilters((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function clearAllFilters() {
    setSearch('')
    setColumnFilters({})
  }

  // Map advanced columns back to base DataTableColumn for the inner table
  const baseColumns: DataTableColumn<T>[] = columns.map((col) => {
    const { key, header, render, align, maxWidth } = col
    return { key, header, render, align, maxWidth }
  })

  const sizeToInput: Record<DataTableSize, 'sm' | 'md' | 'lg'> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  }

  const sizeToGap: Record<DataTableSize, string> = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  }

  const sizeToText: Record<DataTableSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const sizeToPadding: Record<DataTableSize, string> = {
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
  }

  const sizeToIcon: Record<DataTableSize, number> = {
    sm: 24,
    md: 32,
    lg: 40,
  }

  const noResultsContent = noResultsState ?? (
    <div className={cn('flex flex-col items-center', sizeToPadding[size], sizeToGap[size])}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={sizeToIcon[size]}
        height={sizeToIcon[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-on-surface-variant/50"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <p className={cn('text-on-surface-variant font-manrope', sizeToText[size])}>
        No results match your search or filters.
      </p>
      <Button
        variant="secondary"
        size={sizeToInput[size]}
        onClick={clearAllFilters}
      >
        Clear all filters
      </Button>
    </div>
  )

  return (
    <div
      ref={ref}
      className={cn('flex flex-col', sizeToGap[size], className)}
      {...props}
    >
      {/* Toolbar: search + column filters */}
      <div className={cn('flex flex-wrap items-end', sizeToGap[size])}>
        <div className="w-full max-w-xs">
          <Input
            size={sizeToInput[size]}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search table"
          />
        </div>

        {filterableColumns.map((col) => {
          const options: SelectOption[] = [
            { value: '', label: 'All' },
            ...(filterOptions[col.key] ?? []).map((val) => ({ value: val, label: val })),
          ]
          return (
            <div key={col.key} className="min-w-[120px] max-w-[240px]">
              <Select
                label={col.header}
                size={sizeToInput[size]}
                options={options}
                value={columnFilters[col.key] ?? ''}
                onChange={(e) =>
                  setColumnFilters((prev) => ({
                    ...prev,
                    [col.key]: e.target.value,
                  }))
                }
                aria-label={`Filter by ${col.header}`}
              />
            </div>
          )
        })}
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className={cn('flex flex-wrap items-center', sizeToGap[size])}>
          {Object.entries(columnFilters)
            .filter(([, v]) => Boolean(v))
            .map(([key, val]) => {
              const col = columns.find((c) => c.key === key)
              return (
                <Badge
                  key={key}
                  variant="accent"
                  size={size}
                  className="inline-flex items-center gap-1 cursor-default"
                >
                  <span className="font-semibold">{col?.header}:</span> {val}
                  <button
                    type="button"
                    onClick={() => clearFilter(key)}
                    className="ml-0.5 hover:text-accent-foreground/70 transition-colors"
                    aria-label={`Remove ${col?.header} filter`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </Badge>
              )
            })}
          <Button
            variant="secondary"
            size={sizeToInput[size]}
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Row count */}
      {hasData && isFiltered && (
        <p
          className={cn(
            'text-on-surface-variant font-manrope',
            size === 'sm' ? 'text-[10px]' : sizeToText[size],
          )}
          aria-live="polite"
        >
          Showing {filteredData.length} of {data.length} result{data.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Table or empty/no-results state */}
      {hasData && !hasResults ? (
        <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/40 rounded-xl">
          {noResultsContent}
        </div>
      ) : (
        <DataTable<T>
          columns={baseColumns}
          data={filteredData}
          keyExtractor={keyExtractor}
          size={size}
          caption={caption}
          emptyState={emptyState}
        />
      )}
    </div>
  )
}

export const DataTableAdvanced = forwardRef(DataTableAdvancedInner) as <T>(
  props: DataTableAdvancedProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement | null

(DataTableAdvancedInner as { displayName?: string }).displayName = 'DataTableAdvanced'
