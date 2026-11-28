# DataTable (数据表格)

> 基于 Table 语义原语与 TanStack Table v9 封装的完备数据表格组件，内置排序、全局搜索、分段筛选、多选批量操作、行展开、列显隐、密度切换与分页。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/data-table
```

- **Registry JSON**: `/r/data-table.json`
- **Import Path**: `@/components/ui/data-table`
- **Exports**: `createGlazeColumnHelper`, `DataTable`
- **NPM Dependencies**: `@phosphor-icons/react`, `@tanstack/react-table`, `cn`
- **Registry Dependencies**: `@glaze/button`, `@glaze/checkbox`, `@glaze/input`, `@glaze/motion`, `@glaze/popover`, `@glaze/segmented-control`, `@glaze/select`, `@glaze/style`, `@glaze/table`, `@glaze/tile`, `@glaze/tokens`

## API Reference

### createGlazeColumnHelper

Inherits standard Base UI / HTML element props.

### DataTable

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `TData[]` | — | Data array (keep memoized or state-backed for stable row models) |
| `columns` | `DataTableColumnDef<TData, any>[]` | — | TanStack Table v9 column definitions |
| `getRowId?` | `(originalRow: TData, index: number) => string` | — | Optional stable row ID extractor |
| `title?` | `React.ReactNode` | — | Optional card title |
| `description?` | `React.ReactNode` | — | Optional card subtitle / description |
| `tone?` | `TileTone` | `'white'` | Card tone when wrapped in Tile (defaults to 'white') |
| `embedded?` | `boolean` | `false` | Render bare without the outer Glaze Tile wrapper |
| `density?` | `TableDensity` | — | Controlled row density |
| `defaultDensity?` | `TableDensity` | `'comfortable'` | Default row density when uncontrolled |
| `onDensityChange?` | `(density: TableDensity) => void` | — | Callback when density is changed via the toolbar button |
| `enableDensityToggle?` | `boolean` | `false` | Show interactive density toggle button in toolbar |
| `searchable?` | `boolean` | `true` | Enable global keyword search input |
| `searchPlaceholder?` | `string` | `'搜索关键字…'` | Placeholder text for global search input |
| `facetFilter?` | `DataTableFacetFilter` | — | Quick segmented filter bound to a specific column |
| `enableSorting?` | `boolean` | `true` | Enable sorting on sortable columns (default: true) |
| `initialSorting?` | `SortingState` | `[]` | Initial sorting state |
| `enableRowSelection?` | `boolean` | `false` | Enable multi-row selection with Glaze checkboxes |
| `rowSelection?` | `RowSelectionState` | — | Controlled row selection state |
| `onRowSelectionChange?` | `React.Dispatch<React.SetStateAction<RowSelectionState>>` | — | Controlled row selection updater |
| `bulkActions?` | `(selectedRows: TData[], clearSelection: () => void) => React.ReactNode` | — | Custom bulk action controls shown when 1+ rows are selected |
| `renderSubComponent?` | `(row: DataTableRow<TData>) => React.ReactNode` | — | Render an expandable detail panel below each row |
| `getRowCanExpand?` | `(row: DataTableRow<TData>) => boolean` | — | Optional predicate controlling whether a specific row can expand |
| `enableColumnVisibility?` | `boolean` | `false` | Enable column visibility selector popover |
| `initialColumnVisibility?` | `Record<string, boolean>` | `{}` | Initial column visibility map |
| `enablePagination?` | `boolean` | `true` | Enable client-side pagination footer (default: true) |
| `defaultPageSize?` | `number` | `5` | Initial page size (default: 5) |
| `pageSizeOptions?` | `number[]` | `[5, 10, 20, 50]` | Page size choices in footer select |
| `stickyHeader?` | `boolean` | `false` | Sticky header inside a vertically scrollable viewport |
| `striped?` | `boolean` | `false` | Show subtle alternating stripe background |
| `loading?` | `boolean` | `false` | Loading skeleton state |
| `onRowClick?` | `(row: TData) => void` | — | Row click handler (ignored when clicking interactive controls inside a row) |
| `toolbarActions?` | `React.ReactNode` | — | Extra action buttons placed on the right side of the toolbar |
| `emptyTitle?` | `string` | `'暂无匹配数据'` | Empty state heading |
| `emptyDescription?` | `string` | `'尝试调整搜索关键字或筛选条件后再查看。'` | Empty state description |
| `emptyAction?` | `React.ReactNode` | — | Custom empty state action |
| `minTableWidth?` | `number \| string` | `680` | Minimum table width before horizontal scroll activates |
| `className?` | `string` | — | Extra container classes |

### Supporting Types

#### `GlazeColumnMeta`

| Property | Type | Required |
| --- | --- | --- |
| `align` | `'left' \| 'center' \| 'right'` | No |
| `label` | `string` | No |
| `headerClassName` | `string` | No |
| `cellClassName` | `string` | No |
| `numeric` | `boolean` | No |

#### `DataTableFacetFilter`

| Property | Type | Required |
| --- | --- | --- |
| `columnId` | `string` | Yes |
| `options` | `SegmentedOption<string>[]` | Yes |
| `allLabel` | `string` | No |
| `ariaLabel` | `string` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-density` | 表格密度（compact | comfortable | spacious） |
| `data-selected` | 当前行处于勾选选中态 |

### CSS Variables

- `--radius-tile`
- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludesSome,
  filterFn_equals,
  filterFn_equalsString,
  filterFn_includesString,
  filterFn_inNumberRange,
  globalFilteringFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretUpDown,
  Columns,
  FadersHorizontal,
  MagnifyingGlass,
  Rows,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Popover } from '@/components/ui/popover'
import { SegmentedControl, type SegmentedOption } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableDensity,
} from '@/components/ui/table'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

// ============================================================================
// TanStack Table v9 Feature Bundle & Typed Helpers
// ============================================================================

export interface GlazeColumnMeta {
  /** Horizontal text alignment for header and cells */
  align?: 'left' | 'center' | 'right'
  /** Human-readable column label shown in the column visibility menu */
  label?: string
  /** Extra classes applied to the header <th> */
  headerClassName?: string
  /** Extra classes applied to each body <td> */
  cellClassName?: string
  /** Apply tabular-nums & monospace-friendly alignment for numeric values */
  numeric?: boolean
}

/**
 * Static TanStack Table v9 feature set powering Glaze DataTable.
 * Includes sorting, global & column filtering, pagination, row selection,
 * row expansion, and column visibility with typed columnMeta.
 */
export const glazeTableFeatures = tableFeatures({
  columnVisibilityFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowExpandingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    equalsString: filterFn_equalsString,
    equals: filterFn_equals,
    arrIncludesSome: filterFn_arrIncludesSome,
    inNumberRange: filterFn_inNumberRange,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
  },
  columnMeta: {} as GlazeColumnMeta,
})

export type GlazeTableFeatures = typeof glazeTableFeatures

export type DataTableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  GlazeTableFeatures,
  TData,
  TValue
>

export type DataTableRow<TData extends RowData> = Row<GlazeTableFeatures, TData>

/**
 * Create a strongly-typed TanStack Table v9 column helper pre-bound to Glaze features.
 */
export function createGlazeColumnHelper<TData extends RowData>() {
  return createColumnHelper<GlazeTableFeatures, TData>()
}

// ============================================================================
// Full-Featured Glaze DataTable (Built on Table + TanStack Table v9)
// ============================================================================

export interface DataTableFacetFilter {
  /** Target column id to filter on */
  columnId: string
  /** Options rendered in the SegmentedControl (include 'all' or let allLabel prepend it) */
  options: SegmentedOption<string>[]
  /** Label for the reset-all tab (defaults to '全部') */
  allLabel?: string
  /** Accessible aria-label */
  ariaLabel?: string
}

export interface DataTableProps<TData extends RowData> {
  /** Data array (keep memoized or state-backed for stable row models) */
  data: TData[]
  /** TanStack Table v9 column definitions */
  columns: DataTableColumnDef<TData, any>[]
  /** Optional stable row ID extractor */
  getRowId?: (originalRow: TData, index: number) => string
  /** Optional card title */
  title?: React.ReactNode
  /** Optional card subtitle / description */
  description?: React.ReactNode
  /** Card tone when wrapped in Tile (defaults to 'white') */
  tone?: TileTone
  /** Render bare without the outer Glaze Tile wrapper */
  embedded?: boolean
  /** Controlled row density */
  density?: TableDensity
  /** Default row density when uncontrolled */
  defaultDensity?: TableDensity
  /** Callback when density is changed via the toolbar button */
  onDensityChange?: (density: TableDensity) => void
  /** Show interactive density toggle button in toolbar */
  enableDensityToggle?: boolean
  /** Enable global keyword search input */
  searchable?: boolean
  /** Placeholder text for global search input */
  searchPlaceholder?: string
  /** Quick segmented filter bound to a specific column */
  facetFilter?: DataTableFacetFilter
  /** Enable sorting on sortable columns (default: true) */
  enableSorting?: boolean
  /** Initial sorting state */
  initialSorting?: SortingState
  /** Enable multi-row selection with Glaze checkboxes */
  enableRowSelection?: boolean
  /** Controlled row selection state */
  rowSelection?: RowSelectionState
  /** Controlled row selection updater */
  onRowSelectionChange?: React.Dispatch<React.SetStateAction<RowSelectionState>>
  /** Custom bulk action controls shown when 1+ rows are selected */
  bulkActions?: (selectedRows: TData[], clearSelection: () => void) => React.ReactNode
  /** Render an expandable detail panel below each row */
  renderSubComponent?: (row: DataTableRow<TData>) => React.ReactNode
  /** Optional predicate controlling whether a specific row can expand */
  getRowCanExpand?: (row: DataTableRow<TData>) => boolean
  /** Enable column visibility selector popover */
  enableColumnVisibility?: boolean
  /** Initial column visibility map */
  initialColumnVisibility?: Record<string, boolean>
  /** Enable client-side pagination footer (default: true) */
  enablePagination?: boolean
  /** Initial page size (default: 5) */
  defaultPageSize?: number
  /** Page size choices in footer select */
  pageSizeOptions?: number[]
  /** Sticky header inside a vertically scrollable viewport */
  stickyHeader?: boolean
  /** Show subtle alternating stripe background */
  striped?: boolean
  /** Loading skeleton state */
  loading?: boolean
  /** Row click handler (ignored when clicking interactive controls inside a row) */
  onRowClick?: (row: TData) => void
  /** Extra action buttons placed on the right side of the toolbar */
  toolbarActions?: React.ReactNode
  /** Empty state heading */
  emptyTitle?: string
  /** Empty state description */
  emptyDescription?: string
  /** Custom empty state action */
  emptyAction?: React.ReactNode
  /** Minimum table width before horizontal scroll activates */
  minTableWidth?: number | string
  /** Extra container classes */
  className?: string
}

const DENSITY_CYCLE: TableDensity[] = ['comfortable', 'compact', 'spacious']
const DENSITY_LABEL: Record<TableDensity, string> = {
  compact: '紧凑',
  comfortable: '标准',
  spacious: '宽松',
}

function getColumnLabel<TData extends RowData>(col: {
  id: string
  columnDef: DataTableColumnDef<TData, any>
}): string {
  const meta = col.columnDef.meta as GlazeColumnMeta | undefined
  if (meta?.label) return meta.label
  if (typeof col.columnDef.header === 'string') return col.columnDef.header
  return col.id
}

function getVisiblePageNumbers(pageIndex: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, i) => i)
  }
  const pages: (number | 'ellipsis')[] = [0]
  if (pageIndex > 2) pages.push('ellipsis')
  const start = Math.max(1, pageIndex - 1)
  const end = Math.min(pageCount - 2, pageIndex + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (pageIndex < pageCount - 3) pages.push('ellipsis')
  pages.push(pageCount - 1)
  return pages
}

export function DataTable<TData extends RowData>({
  data,
  columns: userColumns,
  getRowId,
  title,
  description,
  tone = 'white',
  embedded = false,
  density: controlledDensity,
  defaultDensity = 'comfortable',
  onDensityChange,
  enableDensityToggle = false,
  searchable = true,
  searchPlaceholder = '搜索关键字…',
  facetFilter,
  enableSorting = true,
  initialSorting = [],
  enableRowSelection = false,
  rowSelection: controlledRowSelection,
  onRowSelectionChange: controlledOnRowSelectionChange,
  bulkActions,
  renderSubComponent,
  getRowCanExpand,
  enableColumnVisibility = false,
  initialColumnVisibility = {},
  enablePagination = true,
  defaultPageSize = 5,
  pageSizeOptions = [5, 10, 20, 50],
  stickyHeader = false,
  striped = false,
  loading = false,
  onRowClick,
  toolbarActions,
  emptyTitle = '暂无匹配数据',
  emptyDescription = '尝试调整搜索关键字或筛选条件后再查看。',
  emptyAction,
  minTableWidth = 680,
  className,
}: DataTableProps<TData>) {
  const [internalDensity, setInternalDensity] = React.useState<TableDensity>(
    controlledDensity ?? defaultDensity,
  )
  const density = controlledDensity ?? internalDensity

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<Record<string, boolean>>(initialColumnVisibility)
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({})
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: enablePagination ? defaultPageSize : Math.max(data.length, 100),
  })

  const rowSelection = controlledRowSelection ?? internalRowSelection
  const setRowSelection = controlledOnRowSelectionChange ?? setInternalRowSelection

  // Keep pageSize synced when pagination is disabled and data grows
  React.useEffect(() => {
    if (!enablePagination) {
      setPagination((prev) => ({ ...prev, pageIndex: 0, pageSize: Math.max(data.length, 100) }))
    }
  }, [enablePagination, data.length])

  // Build effective columns with optional selection & expander columns prepended
  const columns = React.useMemo<DataTableColumnDef<TData, any>[]>(() => {
    const prefix: DataTableColumnDef<TData, any>[] = []

    if (renderSubComponent) {
      prefix.push({
        id: '__expand__',
        enableSorting: false,
        enableHiding: false,
        meta: {
          align: 'center',
          label: '展开详情',
          headerClassName: 'w-10 px-2',
          cellClassName: 'w-10 px-2',
        },
        header: () => null,
        cell: ({ row }) => {
          if (!row.getCanExpand()) return null
          const isOpen = row.getIsExpanded()
          return (
            <button
              type="button"
              aria-label={isOpen ? '收起行详情' : '展开行详情'}
              aria-expanded={isOpen}
              onClick={(e) => {
                e.stopPropagation()
                row.toggleExpanded()
              }}
              className={cn(
                'inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#EEF0F3] hover:text-[#1B1F27]',
                isOpen && 'bg-[#F3F4FE] text-[#4A4FB8]',
              )}
            >
              <CaretRight
                size={13}
                weight="bold"
                className={cn(
                  'transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isOpen && 'rotate-90',
                )}
              />
            </button>
          )
        },
      })
    }

    if (enableRowSelection) {
      prefix.push({
        id: '__select__',
        enableSorting: false,
        enableHiding: false,
        meta: {
          align: 'center',
          label: '选择行',
          headerClassName: 'w-11 px-2.5',
          cellClassName: 'w-11 px-2.5',
        },
        header: ({ table }) => (
          <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              aria-label="全选当前页"
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={
                !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
              }
              onCheckedChange={(checked) => table.toggleAllPageRowsSelected(Boolean(checked))}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              aria-label="选择当前行"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onCheckedChange={(checked) => row.toggleSelected(Boolean(checked))}
            />
          </div>
        ),
      })
    }

    return prefix.length > 0 ? [...prefix, ...userColumns] : userColumns
  }, [enableRowSelection, renderSubComponent, userColumns])

  const table = useTable({
    features: glazeTableFeatures,
    data,
    columns,
    getRowId,
    enableSorting,
    enableRowSelection,
    getRowCanExpand: renderSubComponent
      ? (row) => (getRowCanExpand ? getRowCanExpand(row) : true)
      : undefined,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
  })

  // Facet filter value synced with columnFilters
  const activeFacetValue = React.useMemo(() => {
    if (!facetFilter) return '__all__'
    const found = columnFilters.find((f) => f.id === facetFilter.columnId)
    return found && typeof found.value === 'string' ? found.value : '__all__'
  }, [facetFilter, columnFilters])

  const handleFacetChange = React.useCallback(
    (val: string) => {
      if (!facetFilter) return
      setColumnFilters((prev) => {
        const rest = prev.filter((f) => f.id !== facetFilter.columnId)
        if (val === '__all__') return rest
        return [...rest, { id: facetFilter.columnId, value: val }]
      })
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    },
    [facetFilter],
  )

  const facetOptions = React.useMemo<SegmentedOption<string>[]>(() => {
    if (!facetFilter) return []
    const hasAll = facetFilter.options.some((o) => o.value === '__all__')
    return hasAll
      ? facetFilter.options
      : [{ value: '__all__', label: facetFilter.allLabel ?? '全部' }, ...facetFilter.options]
  }, [facetFilter])

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((r) => r.original)
  const selectedCount = selectedRows.length
  const totalFilteredCount = table.getFilteredRowModel().rows.length
  const pageRows = table.getRowModel().rows
  const pageCount = Math.max(1, table.getPageCount())
  const pageIndex = table.state.pagination.pageIndex
  const pageSize = table.state.pagination.pageSize
  const hasActiveFilters = Boolean(globalFilter.trim()) || columnFilters.length > 0
  const hideableColumns = table.getAllLeafColumns().filter((c) => c.getCanHide())
  const hiddenCount = hideableColumns.filter((c) => !c.getIsVisible()).length

  const clearFilters = () => {
    setGlobalFilter('')
    setColumnFilters([])
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const clearSelection = () => setRowSelection({})

  const handleCycleDensity = () => {
    const idx = DENSITY_CYCLE.indexOf(density)
    const next = DENSITY_CYCLE[(idx + 1) % DENSITY_CYCLE.length]
    if (controlledDensity === undefined) setInternalDensity(next)
    onDensityChange?.(next)
  }

  const theme = TILE_THEMES[tone]

  const content = (
    <div className={cn('flex flex-col gap-4', embedded && className)}>
      {/* Header Row: Title / Subtitle + Right Actions */}
      {(title || description || toolbarActions) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            {title && (
              <h2 className="m-0 font-glaze-display text-[20px] leading-7 font-extrabold text-[#1B1F27]">
                {title}
              </h2>
            )}
            {description && (
              <p className="m-0 text-[13px] text-[#6B7280]">{description}</p>
            )}
          </div>
          {toolbarActions && (
            <div className="flex shrink-0 flex-wrap items-center gap-2">{toolbarActions}</div>
          )}
        </div>
      )}

      {/* Toolbar Row: Search + Facet SegmentedControl + Column Visibility + Density */}
      {(searchable || facetFilter || enableColumnVisibility || enableDensityToggle) && (
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
            {searchable && (
              <div className="w-full sm:w-64">
                <Input
                  inputSize="sm"
                  surface="soft"
                  value={globalFilter}
                  onChange={(e) => {
                    setGlobalFilter(e.target.value)
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                  }}
                  placeholder={searchPlaceholder}
                  leadingIcon={<MagnifyingGlass size={14} weight="bold" />}
                  trailingElement={
                    globalFilter ? (
                      <button
                        type="button"
                        onClick={() => setGlobalFilter('')}
                        aria-label="清空搜索"
                        className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
                      >
                        <X size={11} weight="bold" />
                      </button>
                    ) : undefined
                  }
                />
              </div>
            )}

            {facetFilter && (
              <SegmentedControl
                size="sm"
                ariaLabel={facetFilter.ariaLabel ?? '表格筛选'}
                value={activeFacetValue}
                onValueChange={handleFacetChange}
                options={facetOptions}
              />
            )}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-full bg-[#F2F3F5] px-3 text-[12px] font-semibold text-[#5B6170] transition-colors hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
              >
                <X size={12} weight="bold" />
                <span>重置筛选</span>
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {enableDensityToggle && !controlledDensity && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCycleDensity}
              >
                <Rows size={14} weight="duotone" />
                <span>密度：{DENSITY_LABEL[density]}</span>
              </Button>
            )}

            {enableColumnVisibility && hideableColumns.length > 0 && (
              <Popover
                side="bottom"
                align="end"
                title="显示列配置"
                description="勾选要在表格中展示的数据列"
                className="w-60 p-4"
                trigger={
                  <Button type="button" variant="secondary" size="sm">
                    <Columns size={14} weight="duotone" />
                    <span>列设置</span>
                    {hiddenCount > 0 && (
                      <span className="rounded-full bg-[#E4E6FD] px-1.5 py-0.5 font-glaze-mono text-[10px] font-bold text-[#4A4FB8]">
                        -{hiddenCount}
                      </span>
                    )}
                  </Button>
                }
              >
                <div className="flex flex-col gap-2.5">
                  {hideableColumns.map((col) => (
                    <Checkbox
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(checked) => col.toggleVisibility(Boolean(checked))}
                      label={
                        <span className="text-[13px] font-medium text-[#1B1F27]">
                          {getColumnLabel(col)}
                        </span>
                      }
                    />
                  ))}
                  {hiddenCount > 0 && (
                    <div className="border-t border-[#F2F3F5] pt-2">
                      <button
                        type="button"
                        onClick={() => table.resetColumnVisibility()}
                        className="cursor-pointer text-[12px] font-semibold text-[#4A4FB8] hover:underline"
                      >
                        恢复显示全部列
                      </button>
                    </div>
                  )}
                </div>
              </Popover>
            )}
          </div>
        </div>
      )}

      {/* Bulk Row Selection Bar */}
      {enableRowSelection && selectedCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-[18px] bg-[#F3F4FE] px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#4A4FB8] px-2 font-glaze-mono text-[11px] font-bold text-white">
              {selectedCount}
            </span>
            <span className="text-[13px] font-bold text-[#262B7A]">
              已选中 {selectedCount} 条记录
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {bulkActions?.(selectedRows, clearSelection)}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-[#4A4FB8] hover:bg-[#E4E6FD] hover:text-[#262B7A]"
            >
              取消选择
            </Button>
          </div>
        </div>
      )}

      {/* Core Semantic Table */}
      <Table
        density={density}
        stickyHeader={stickyHeader}
        style={{ minWidth: typeof minTableWidth === 'number' ? `${minTableWidth}px` : minTableWidth }}
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as GlazeColumnMeta | undefined
                const align = meta?.align ?? (meta?.numeric ? 'right' : 'left')
                const canSort = enableSorting && header.column.getCanSort()
                const sorted = header.column.getIsSorted()

                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    align={align}
                    sticky={stickyHeader}
                    className={meta?.headerClassName}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          'group inline-flex cursor-pointer items-center gap-1 rounded-full py-0.5 text-[12px] font-semibold transition-colors outline-none',
                          'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
                          align === 'right' && 'flex-row-reverse',
                          sorted
                            ? 'text-[#262B7A]'
                            : 'text-[#6B7280] hover:text-[#1B1F27]',
                        )}
                      >
                        <span>
                          <table.FlexRender header={header} />
                        </span>
                        <span
                          className={cn(
                            'inline-flex shrink-0 transition-colors',
                            sorted
                              ? 'text-[#4A4FB8]'
                              : 'text-[#CDD3DD] group-hover:text-[#8A90A0]',
                          )}
                        >
                          {sorted === 'asc' ? (
                            <CaretUp size={12} weight="bold" />
                          ) : sorted === 'desc' ? (
                            <CaretDown size={12} weight="bold" />
                          ) : (
                            <CaretUpDown size={12} weight="bold" />
                          )}
                        </span>
                      </button>
                    ) : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: Math.min(pageSize, 5) }).map((_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`} className="hover:bg-transparent">
                {table.getVisibleLeafColumns().map((col) => (
                  <TableCell key={col.id}>
                    <div className="h-4 w-full max-w-36 animate-pulse rounded-full bg-[#EEF0F3]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : pageRows.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={Math.max(1, table.getVisibleLeafColumns().length)}
                className="py-12 text-center"
              >
                <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F7F9] text-[#8A90A0]">
                    <FadersHorizontal size={18} weight="duotone" />
                  </span>
                  <span className="font-glaze-display text-[15px] font-extrabold text-[#1B1F27]">
                    {emptyTitle}
                  </span>
                  <span className="text-[12.5px] text-[#6B7280]">{emptyDescription}</span>
                  <div className="mt-1 flex items-center gap-2">
                    {hasActiveFilters && (
                      <Button type="button" size="sm" variant="soft" hue="periwinkle" onClick={clearFilters}>
                        清空筛选条件
                      </Button>
                    )}
                    {emptyAction}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map((row, idx) => {
              const isSelected = row.getIsSelected()
              const isExpanded = row.getIsExpanded()
              return (
                <React.Fragment key={row.id}>
                  <TableRow
                    selected={isSelected}
                    interactive={Boolean(onRowClick)}
                    className={cn(striped && idx % 2 === 1 && !isSelected && 'bg-[#F6F7F9]/45')}
                    onClick={
                      onRowClick
                        ? (e) => {
                            const target = e.target as HTMLElement
                            if (target.closest('button, a, input, [role="checkbox"], [role="menuitem"]')) {
                              return
                            }
                            onRowClick(row.original)
                          }
                        : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as GlazeColumnMeta | undefined
                      const align = meta?.align ?? (meta?.numeric ? 'right' : 'left')
                      return (
                        <TableCell
                          key={cell.id}
                          align={align}
                          className={cn(meta?.numeric && 'font-glaze-mono', meta?.cellClassName)}
                        >
                          <table.FlexRender cell={cell} />
                        </TableCell>
                      )
                    })}
                  </TableRow>

                  {isExpanded && renderSubComponent && (
                    <TableRow className="bg-[#F6F7F9]/65 hover:bg-[#F6F7F9]/65">
                      <TableCell colSpan={row.getVisibleCells().length} className="px-4 py-3.5">
                        <div className="rounded-inner bg-white p-4">
                          {renderSubComponent(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      {enablePagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F2F3F5] pt-3.5 text-[12.5px] text-[#6B7280]">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              共 <strong className="font-bold text-[#1B1F27]">{totalFilteredCount}</strong> 条
              {totalFilteredCount !== data.length && (
                <span className="text-[#8A90A0]">（总计 {data.length} 条）</span>
              )}
            </span>
            <span className="text-[#CDD3DD]">·</span>
            <span>
              第 <strong className="font-bold text-[#1B1F27]">{pageIndex + 1}</strong> / {pageCount} 页
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5">
              <span className="hidden text-[12px] text-[#8A90A0] sm:inline">每页</span>
              <div className="w-24">
                <Select
                  size="sm"
                  surface="soft"
                  value={String(pageSize)}
                  onValueChange={(v) => {
                    const nextSize = Number(v)
                    if (!Number.isNaN(nextSize)) {
                      setPagination({ pageIndex: 0, pageSize: nextSize })
                    }
                  }}
                  options={pageSizeOptions.map((n) => ({ value: String(n), label: `${n} 条` }))}
                />
              </div>
            </div>

            {/* Page Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="首页"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
                className={cn(
                  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F6F7F9] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27] disabled:pointer-events-none disabled:opacity-40',
                  PRESS_CLASS,
                )}
              >
                <CaretDoubleLeft size={13} weight="bold" />
              </button>
              <button
                type="button"
                aria-label="上一页"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                className={cn(
                  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F6F7F9] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27] disabled:pointer-events-none disabled:opacity-40',
                  PRESS_CLASS,
                )}
              >
                <CaretLeft size={13} weight="bold" />
              </button>

              {getVisiblePageNumbers(pageIndex, pageCount).map((p, i) =>
                p === 'ellipsis' ? (
                  <span key={`el-${i}`} className="px-1.5 text-[12px] text-[#8A90A0]">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    aria-current={p === pageIndex ? 'page' : undefined}
                    onClick={() => table.setPageIndex(p)}
                    className={cn(
                      'inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-full px-2 font-glaze-mono text-[12px] font-bold transition-colors',
                      p === pageIndex
                        ? 'bg-[#1B1F27] text-white'
                        : 'bg-transparent text-[#5B6170] hover:bg-[#F2F3F5] hover:text-[#1B1F27]',
                    )}
                  >
                    {p + 1}
                  </button>
                ),
              )}

              <button
                type="button"
                aria-label="下一页"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                className={cn(
                  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F6F7F9] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27] disabled:pointer-events-none disabled:opacity-40',
                  PRESS_CLASS,
                )}
              >
                <CaretRight size={13} weight="bold" />
              </button>
              <button
                type="button"
                aria-label="末页"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(pageCount - 1)}
                className={cn(
                  'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F6F7F9] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27] disabled:pointer-events-none disabled:opacity-40',
                  PRESS_CLASS,
                )}
              >
                <CaretDoubleRight size={13} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  if (embedded) return content

  return (
    <Tile
      size="f"
      tone={tone}
      className={cn('justify-start px-6 py-6 sm:px-7', className)}
      style={{ backgroundColor: theme.bg, color: theme.ink }}
    >
      {content}
    </Tile>
  )
}
```
