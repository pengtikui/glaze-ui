# Calendar (日历选择器)

> 基于 react-day-picker v10 与 date-fns v4 封装的 Glaze 日历原语，内置中文（zh-CN）与周一首日、单选/多选/日期区间、多月并排、年月下拉快选、周数显示、9 组柔彩色相强调与自定义单元格扩展。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/calendar
```

- **Registry JSON**: `/r/calendar.json`
- **Import Path**: `@/components/ui/calendar`
- **Exports**: `CalendarDayButton`, `Calendar`
- **NPM Dependencies**: `@phosphor-icons/react`, `cn`, `date-fns`, `react-day-picker`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`, `@glaze/tokens`

## API Reference

### CalendarDayButton

Extends: `DayButtonProps`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showTodayDot?` | `boolean` | `true` | 是否在未选中的“今日”下方展示圆点指示 |

### Calendar

Extends: `DayPickerProps`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `accent?` | `CalendarAccent` | `'ink'` | 选中态与区间高亮色：默认 ink（墨色主按钮 + 长春花柔和区间），或 9 组 Glaze 柔彩色相之一 |
| `surface?` | `CalendarSurface` | `'card'` | 外层表面形态：card（纯白 28px 釉面卡）、soft（柔灰内嵌块）、embedded（透明无内边距，适合 Popover / Tile 内嵌） |
| `size?` | `CalendarSize` | `'md'` | 日期单元格尺寸密度：sm (32px) | md (36px) | lg (42px) |
| `showTodayDot?` | `boolean` | `true` | 是否在“今日”数字下方显示圆点提示（仅未选中今日时显示） |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-accent` | 当前强调色主题（ink | sky | mint | peach | lilac | rose | lemon | aqua | periwinkle | coral） |
| `data-surface` | 外层表面形态（card | soft | embedded） |
| `data-size` | 日期格子尺寸密度（sm | md | lg） |
| `data-selected-single` | 单选/多选模式下处于选中态的日期按钮 |
| `data-range-start` | 范围选择起始日期按钮 |
| `data-range-middle` | 范围选择中间连续区间日期按钮 |
| `data-range-end` | 范围选择结束日期按钮 |
| `data-today` | 今日高亮标记 |
| `data-outside` | 属于上月或下月的补齐日期 |
| `data-disabled` | 不可选择的禁用日期 |

### CSS Variables

- `--cal-cell`
- `--cal-accent`
- `--cal-accent-ink`
- `--cal-range-bg`
- `--cal-range-ink`
- `--cal-today-bg`
- `--cal-today-ink`
- `--cal-today-dot`

## Source Code

```tsx
import * as React from 'react'
import { format, type Locale } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import {
  DayPicker,
  type DateRange,
  type DayButtonProps,
  type DayPickerProps,
  type Matcher,
} from 'react-day-picker'
import { CaretDown, CaretLeft, CaretRight, CaretUp } from '@phosphor-icons/react'
import { cn } from 'cn'
import { PRESS_CLASS } from '@/lib/motion'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export type CalendarAccent = 'ink' | Hue
export type CalendarSurface = 'card' | 'soft' | 'embedded'
export type CalendarSize = 'sm' | 'md' | 'lg'

export interface CalendarStyleProps {
  /** 选中态与区间高亮色：默认 ink（墨色主按钮 + 长春花柔和区间），或 9 组 Glaze 柔彩色相之一 */
  accent?: CalendarAccent
  /** 外层表面形态：card（纯白 28px 釉面卡）、soft（柔灰内嵌块）、embedded（透明无内边距，适合 Popover / Tile 内嵌） */
  surface?: CalendarSurface
  /** 日期单元格尺寸密度：sm (32px) | md (36px) | lg (42px) */
  size?: CalendarSize
  /** 是否在“今日”数字下方显示圆点提示（仅未选中今日时显示） */
  showTodayDot?: boolean
}

export type CalendarProps = DayPickerProps & CalendarStyleProps

const CELL_SIZE_MAP: Record<CalendarSize, string> = {
  sm: '32px',
  md: '36px',
  lg: '42px',
}

function resolveCalendarPalette(accent: CalendarAccent) {
  if (accent === 'ink') {
    return {
      accent: '#1B1F27',
      accentInk: '#FFFFFF',
      rangeBg: HUE_PALETTES.periwinkle[100],
      rangeInk: HUE_PALETTES.periwinkle[900],
      todayBg: HUE_PALETTES.periwinkle[50],
      todayInk: HUE_PALETTES.periwinkle[700],
      todayDot: HUE_PALETTES.periwinkle[500],
    }
  }
  const palette = HUE_PALETTES[accent]
  return {
    accent: palette[700],
    accentInk: '#FFFFFF',
    rangeBg: palette[100],
    rangeInk: palette[900],
    todayBg: palette[50],
    todayInk: palette[700],
    todayDot: palette[500],
  }
}

export interface CalendarDayButtonProps extends DayButtonProps {
  /** 是否在未选中的“今日”下方展示圆点指示 */
  showTodayDot?: boolean
}

/**
 * 日历单元格按钮原语，暴露标准 data-* 状态属性以便在预订、日程、价格日历等场景自定义单元格内容。
 */
export function CalendarDayButton({
  className,
  day,
  modifiers,
  children,
  showTodayDot = true,
  ...props
}: CalendarDayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  const isSelectedSingle = Boolean(
    modifiers.selected &&
      !modifiers.range_start &&
      !modifiers.range_end &&
      !modifiers.range_middle,
  )
  const isRangeStart = Boolean(modifiers.range_start)
  const isRangeEnd = Boolean(modifiers.range_end)
  const isRangeMiddle = Boolean(modifiers.range_middle)
  const isToday = Boolean(modifiers.today)
  const isSelected = isSelectedSingle || isRangeStart || isRangeEnd

  return (
    <button
      ref={ref}
      type="button"
      data-slot="calendar-day-button"
      data-day={format(day.date, 'yyyy-MM-dd')}
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={isRangeStart || undefined}
      data-range-end={isRangeEnd || undefined}
      data-range-middle={isRangeMiddle || undefined}
      data-today={isToday || undefined}
      data-outside={modifiers.outside || undefined}
      data-disabled={modifiers.disabled || undefined}
      className={cn(
        'relative inline-flex h-[var(--cal-cell)] w-[var(--cal-cell)] cursor-pointer flex-col items-center justify-center rounded-full border-0 bg-transparent p-0 font-sans text-[13.5px] leading-none font-medium tabular-nums text-[#1B1F27] select-none outline-none',
        'transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
        'hover:bg-[#F2F3F5] active:scale-[0.95] glaze-focus',
        'data-[outside=true]:text-[#8A90A0]/65 data-[outside=true]:hover:bg-[#F6F7F9]',
        'data-[today=true]:bg-[var(--cal-today-bg)] data-[today=true]:font-bold data-[today=true]:text-[var(--cal-today-ink)]',
        'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:font-semibold data-[range-middle=true]:text-[var(--cal-range-ink)] data-[range-middle=true]:hover:bg-black/[0.04]',
        'data-[selected-single=true]:bg-[var(--cal-accent)] data-[selected-single=true]:font-bold data-[selected-single=true]:text-[var(--cal-accent-ink)] data-[selected-single=true]:hover:bg-[var(--cal-accent)]',
        'data-[range-start=true]:bg-[var(--cal-accent)] data-[range-start=true]:font-bold data-[range-start=true]:text-[var(--cal-accent-ink)] data-[range-start=true]:hover:bg-[var(--cal-accent)]',
        'data-[range-end=true]:bg-[var(--cal-accent)] data-[range-end=true]:font-bold data-[range-end=true]:text-[var(--cal-accent-ink)] data-[range-end=true]:hover:bg-[var(--cal-accent)]',
        'disabled:pointer-events-none disabled:cursor-default disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showTodayDot && isToday && !isSelected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 h-1 w-1 rounded-full"
          style={{ backgroundColor: 'var(--cal-today-dot)' }}
        />
      )}
    </button>
  )
}

/**
 * 基于 react-day-picker v10 与 date-fns v4 打造的 Glaze 日历组件。
 * 默认启用中文（zh-CN）与周一作为周起始日，支持单选、多选、日期范围、多月并排、年月下拉快选、周数显示与自定义单元格。
 */
export function Calendar({
  accent = 'ink',
  surface = 'card',
  size = 'md',
  showTodayDot = true,
  showOutsideDays = true,
  captionLayout = 'label',
  locale = zhCN,
  weekStartsOn = 1,
  className,
  classNames,
  components,
  formatters,
  labels,
  style,
  navLayout,
  ...props
}: CalendarProps) {
  const colors = resolveCalendarPalette(accent)
  const isChinese = !locale?.code || locale.code.toLowerCase().startsWith('zh')
  const isDropdownCaption = captionLayout !== 'label'
  const dateFnsLocale = (locale && 'localize' in locale && locale.localize ? locale : zhCN) as Locale

  const mergedFormatters = React.useMemo(
    () => ({
      formatCaption: (month: Date) =>
        isChinese
          ? format(month, 'yyyy 年 M 月', { locale: dateFnsLocale })
          : format(month, 'MMMM yyyy', { locale: dateFnsLocale }),
      formatMonthDropdown: (month: Date) =>
        isChinese
          ? format(month, 'M 月', { locale: dateFnsLocale })
          : format(month, 'MMM', { locale: dateFnsLocale }),
      formatYearDropdown: (year: Date) =>
        isChinese
          ? format(year, 'yyyy 年', { locale: dateFnsLocale })
          : format(year, 'yyyy', { locale: dateFnsLocale }),
      formatWeekdayName: (weekday: Date) =>
        isChinese
          ? format(weekday, 'cccccc', { locale: dateFnsLocale })
          : format(weekday, 'EEEEEE', { locale: dateFnsLocale }),
      ...formatters,
    }),
    [dateFnsLocale, formatters, isChinese],
  )

  const mergedLabels = React.useMemo(
    () =>
      isChinese
        ? {
            labelPrevious: () => '上个月',
            labelNext: () => '下个月',
            labelMonthDropdown: () => '选择月份',
            labelYearDropdown: () => '选择年份',
            ...labels,
          }
        : labels,
    [isChinese, labels],
  )

  const cssVars = {
    '--cal-cell': CELL_SIZE_MAP[size],
    '--cal-accent': colors.accent,
    '--cal-accent-ink': colors.accentInk,
    '--cal-range-bg': colors.rangeBg,
    '--cal-range-ink': colors.rangeInk,
    '--cal-today-bg': colors.todayBg,
    '--cal-today-ink': colors.todayInk,
    '--cal-today-dot': colors.todayDot,
    ...style,
  } as React.CSSProperties

  const navBtnClass = cn(
    'pointer-events-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-[#F6F7F9] text-[#1B1F27]',
    'hover:bg-[#EEF0F4] glaze-focus',
    'disabled:pointer-events-none disabled:opacity-35 aria-disabled:pointer-events-none aria-disabled:opacity-35',
    PRESS_CLASS,
  )

  return (
    <DayPicker
      data-slot="calendar"
      data-accent={accent}
      data-surface={surface}
      data-size={size}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      navLayout={navLayout}
      locale={locale}
      weekStartsOn={weekStartsOn}
      formatters={mergedFormatters}
      labels={mergedLabels}
      style={cssVars}
      className={cn(
        'w-fit text-[#1B1F27] select-none',
        surface === 'card' && 'rounded-tile bg-white p-5',
        surface === 'soft' && 'rounded-inner bg-[#F6F7F9] p-4',
        surface === 'embedded' && 'bg-transparent p-1',
        className,
      )}
      classNames={{
        root: 'relative',
        months: 'relative flex flex-col gap-5 sm:flex-row sm:gap-6',
        month: cn('flex flex-col gap-3', navLayout && 'relative'),
        nav: 'pointer-events-none absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between',
        button_previous: cn(
          navBtnClass,
          navLayout === 'around' && 'absolute top-0.5 left-0 z-10',
        ),
        button_next: cn(
          navBtnClass,
          navLayout === 'around' && 'absolute top-0.5 right-0 z-10',
        ),
        month_caption: 'flex h-9 items-center justify-center px-10',
        caption_label: cn(
          'inline-flex items-center gap-1 select-none',
          isDropdownCaption
            ? 'h-8 rounded-full bg-[#F6F7F9] px-3 text-[13px] font-bold text-[#1B1F27] transition-colors group-hover/dropdown:bg-[#EEF0F4]'
            : 'font-glaze-display text-[15px] font-extrabold tracking-[-0.01em] text-[#123A5C]',
        ),
        dropdowns: 'inline-flex items-center gap-1.5',
        dropdown_root:
          'group/dropdown relative inline-flex items-center rounded-full focus-within:ring-2 focus-within:ring-[#7B80EA] focus-within:ring-offset-1',
        dropdown: 'absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0',
        months_dropdown: '',
        years_dropdown: '',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday:
          'flex h-8 w-[var(--cal-cell)] items-center justify-center text-[12px] font-semibold text-[#6B7280] select-none',
        weeks: 'mt-1 flex flex-col gap-1',
        week: 'flex w-full items-center',
        week_number_header:
          'flex h-8 w-[var(--cal-cell)] items-center justify-center text-[11px] font-semibold text-[#8A90A0] select-none',
        week_number:
          'flex h-[var(--cal-cell)] w-[var(--cal-cell)] items-center justify-center font-glaze-mono text-[11px] font-medium text-[#8A90A0] select-none',
        day: 'relative flex h-[var(--cal-cell)] w-[var(--cal-cell)] items-center justify-center p-0 text-center',
        day_button: '',
        selected: '',
        today: '',
        outside: '',
        disabled: 'pointer-events-none opacity-35',
        hidden: 'invisible',
        range_start: 'glaze-cal-range-start rounded-l-full bg-[var(--cal-range-bg)]',
        range_middle: 'bg-[var(--cal-range-bg)]',
        range_end:
          'glaze-cal-range-end rounded-r-full bg-[var(--cal-range-bg)] [&.glaze-cal-range-start]:bg-transparent',
        footer: 'mt-3 border-t border-[#EEF0F3] pt-3 text-[12.5px] text-[#5B6170]',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: iconClassName }) => {
          if (orientation === 'left') {
            return <CaretLeft size={15} weight="bold" className={iconClassName} />
          }
          if (orientation === 'right') {
            return <CaretRight size={15} weight="bold" className={iconClassName} />
          }
          if (orientation === 'up') {
            return <CaretUp size={13} weight="bold" className={iconClassName} />
          }
          return (
            <CaretDown
              size={13}
              weight="bold"
              className={cn('text-[#5B6170]', iconClassName)}
            />
          )
        },
        DayButton: (dayButtonProps) => (
          <CalendarDayButton showTodayDot={showTodayDot} {...dayButtonProps} />
        ),
        ...components,
      }}
      {...props}
    />
  )
}

export type { DateRange, DayButtonProps, Matcher }
```
