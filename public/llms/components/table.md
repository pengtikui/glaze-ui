# Table (语义表格)

> 纯 HTML 语义表格标签与 Glaze 样式原语（Table / TableHeader / TableBody / TableFooter / TableRow / TableHead / TableCell / TableCaption），支持紧凑/标准/宽松密度上下文、表头吸顶、行选中态与等宽数字排版，零重依赖。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/table
```

- **Registry JSON**: `/r/table.json`
- **Import Path**: `@/components/ui/table`
- **Exports**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`
- **NPM Dependencies**: `cn`

## API Reference

### Table

Extends: `React.TableHTMLAttributes<HTMLTableElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `density?` | `TableDensity` | `'comfortable'` | Row vertical padding density |
| `stickyHeader?` | `boolean` | `false` | Sticky table header when scrolled vertically |
| `containerClassName?` | `string` | — | Extra classes on the scrollable container |

### TableHeader

Extends: `React.HTMLAttributes<HTMLTableSectionElement>`

Inherits standard Base UI / HTML element props.

### TableBody

Extends: `React.HTMLAttributes<HTMLTableSectionElement>`

Inherits standard Base UI / HTML element props.

### TableFooter

Extends: `React.HTMLAttributes<HTMLTableSectionElement>`

Inherits standard Base UI / HTML element props.

### TableRow

Extends: `React.HTMLAttributes<HTMLTableRowElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `selected?` | `boolean` | `false` | Highlight row as selected |
| `interactive?` | `boolean` | `false` | Show pointer cursor for clickable rows |

### TableHead

Extends: `React.ThHTMLAttributes<HTMLTableCellElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align?` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal alignment of header text |
| `sticky?` | `boolean` | `false` | Stick header cell to top when scrolling vertically |

### TableCell

Extends: `React.TdHTMLAttributes<HTMLTableCellElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align?` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal alignment of cell content |

### TableCaption

Extends: `React.HTMLAttributes<HTMLTableCaptionElement>`

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-density` | 表格密度（compact | comfortable | spacious） |
| `data-selected` | 当前行处于选中高亮态 |

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'

export type TableDensity = 'compact' | 'comfortable' | 'spacious'

const DENSITY_CELL_PADDING: Record<TableDensity, string> = {
  compact: 'py-2 px-3',
  comfortable: 'py-3 px-3.5',
  spacious: 'py-4 px-4',
}

const DENSITY_HEAD_PADDING: Record<TableDensity, string> = {
  compact: 'py-2 px-3',
  comfortable: 'py-2.5 px-3.5',
  spacious: 'py-3 px-4',
}

const TableDensityContext = React.createContext<TableDensity>('comfortable')

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Row vertical padding density */
  density?: TableDensity
  /** Sticky table header when scrolled vertically */
  stickyHeader?: boolean
  /** Extra classes on the scrollable container */
  containerClassName?: string
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { density = 'comfortable', stickyHeader = false, containerClassName, className, ...props },
  ref,
) {
  return (
    <TableDensityContext.Provider value={density}>
      <div
        className={cn(
          'w-full overflow-x-auto',
          stickyHeader && 'max-h-[540px] overflow-y-auto',
          containerClassName,
        )}
      >
        <table
          ref={ref}
          data-density={density}
          className={cn(
            'w-full border-collapse text-left text-[13.5px] text-[#1B1F27] tabular-nums',
            className,
          )}
          {...props}
        />
      </div>
    </TableDensityContext.Provider>
  )
})

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={cn(
          'text-[12px] font-semibold text-[#6B7280] [&_tr]:hover:bg-transparent',
          className,
        )}
        {...props}
      />
    )
  },
)

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn('divide-y divide-[#F2F3F5]', className)} {...props} />
  },
)

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        className={cn(
          'border-t border-[#E8EBF0] bg-[#F6F7F9]/70 font-semibold text-[#1B1F27] [&_tr]:hover:bg-transparent',
          className,
        )}
        {...props}
      />
    )
  },
)

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Highlight row as selected */
  selected?: boolean
  /** Show pointer cursor for clickable rows */
  interactive?: boolean
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { selected = false, interactive = false, className, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-selected={selected ? '' : undefined}
      className={cn(
        'transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
        selected ? 'bg-[#F3F4FE]/85 hover:bg-[#F3F4FE]' : 'hover:bg-[#F6F7F9]/85',
        interactive && 'cursor-pointer',
        className,
      )}
      {...props}
    />
  )
})

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Horizontal alignment of header text */
  align?: 'left' | 'center' | 'right'
  /** Stick header cell to top when scrolling vertically */
  sticky?: boolean
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { align = 'left', sticky = false, className, ...props },
  ref,
) {
  const density = React.useContext(TableDensityContext)
  return (
    <th
      ref={ref}
      className={cn(
        'border-b border-[#EEF0F3] font-semibold whitespace-nowrap text-[#6B7280] select-none',
        DENSITY_HEAD_PADDING[density],
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        sticky && 'sticky top-0 z-10 bg-white',
        className,
      )}
      {...props}
    />
  )
})

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Horizontal alignment of cell content */
  align?: 'left' | 'center' | 'right'
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align = 'left', className, ...props },
  ref,
) {
  const density = React.useContext(TableDensityContext)
  return (
    <td
      ref={ref}
      className={cn(
        'align-middle text-[#1B1F27]',
        DENSITY_CELL_PADDING[density],
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className,
      )}
      {...props}
    />
  )
})

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return (
      <caption
        ref={ref}
        className={cn('mt-3 text-[12px] text-[#8A90A0]', className)}
        {...props}
      />
    )
  },
)
```
