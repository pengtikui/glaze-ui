import * as React from 'react'
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
  startOfToday,
  subDays,
} from 'date-fns'
import { enUS, ja, zhCN } from 'date-fns/locale'
import {
  AirplaneTilt,
  CalendarBlank,
  CalendarDots,
  Clock,
  Sparkle,
  X,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  CalendarDayButton,
  type CalendarAccent,
  type CalendarSize,
  type CalendarSurface,
  type DateRange,
} from '@/components/ui/calendar'
import {
  Form,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormReset,
  FormSubmit,
  useForm,
} from '@/components/ui/form'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { Popover } from '@/components/ui/popover'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { Switch } from '@/components/ui/switch'
import type { ComponentDemoGroup } from '@/docs/examples/types'

/* ============================================================================
 * 1. Hero — 基础单选日历 + date-fns 中文格式化 + 回到今天
 * ========================================================================== */
function CalendarHeroDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [date, setDate] = React.useState<Date | undefined>(today)
  const [month, setMonth] = React.useState<Date>(today)

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium text-[#1B1F27]">
              {date ? format(date, 'yyyy 年 M 月 d 日 · EEEE', { locale: zhCN }) : '未选择日期'}
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setDate(today)
                setMonth(today)
              }}
            >
              回到今天
            </Button>
          </div>
        }
      />
    </div>
  )
}

/* ============================================================================
 * 2. 双月日期范围选择（mode="range" + numberOfMonths={2}）
 * ========================================================================== */
function CalendarRangeDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: addDays(today, 2),
    to: addDays(today, 11),
  })

  const nights =
    range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        defaultMonth={today}
        accent="periwinkle"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <HueTag hue="periwinkle" size="sm">
                {range?.from
                  ? range.to
                    ? `${format(range.from, 'yyyy/MM/dd')} → ${format(range.to, 'yyyy/MM/dd')}`
                    : `${format(range.from, 'yyyy/MM/dd')} → 请选择结束日`
                  : '点击选择起始与结束日期'}
              </HueTag>
              {nights > 0 && (
                <span className="font-glaze-mono text-[12px] font-bold text-[#4A4FB8]">
                  共 {nights + 1} 天（{nights} 晚）
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRange(undefined)}
              >
                清除
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  setRange({ from: addDays(today, 2), to: addDays(today, 11) })
                }
              >
                示例区间
              </Button>
            </div>
          </div>
        }
      />
    </div>
  )
}

/* ============================================================================
 * 3. 快捷区间预设（date-fns 相对日期计算）
 * ========================================================================== */
function CalendarPresetsDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const presets = React.useMemo(
    () => [
      { id: 'today', label: '今天', range: { from: today, to: today } },
      { id: 'last7', label: '最近 7 天', range: { from: subDays(today, 6), to: today } },
      { id: 'last30', label: '最近 30 天', range: { from: subDays(today, 29), to: today } },
      {
        id: 'thisMonth',
        label: '本月完整周期',
        range: { from: startOfMonth(today), to: endOfMonth(today) },
      },
      { id: 'next14', label: '未来 14 天', range: { from: today, to: addDays(today, 13) } },
    ],
    [today],
  )

  const [activePreset, setActivePreset] = React.useState('last7')
  const [range, setRange] = React.useState<DateRange | undefined>(presets[1].range)
  const [month, setMonth] = React.useState<Date>(presets[1].range.from)

  const handleSelectPreset = (preset: (typeof presets)[number]) => {
    setActivePreset(preset.id)
    setRange(preset.range)
    setMonth(preset.range.from)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-tile bg-white md:flex-row">
      <div className="flex flex-col justify-between gap-3 bg-[#F6F7F9] p-4 md:w-48">
        <div>
          <div className="mb-2.5 flex items-center gap-1.5 px-2 text-[11.5px] font-bold text-[#6B7280]">
            <Clock size={14} weight="bold" />
            <span>快捷时间窗</span>
          </div>
          <div className="flex flex-row flex-wrap gap-1.5 md:flex-col">
            {presets.map((p) => {
              const active = activePreset === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className={`cursor-pointer rounded-full border-0 px-3.5 py-2 text-left text-[12.5px] font-semibold transition-colors ${
                    active
                      ? 'bg-[#1B1F27] text-white'
                      : 'bg-white text-[#5B6170] hover:bg-[#EEF0F4] hover:text-[#1B1F27]'
                  }`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="rounded-[14px] bg-white p-3 text-[11.5px] leading-relaxed text-[#5B6170]">
          <div className="font-bold text-[#123A5C]">当前筛选范围</div>
          <div className="mt-1 font-glaze-mono text-[11px]">
            {range?.from ? format(range.from, 'yyyy-MM-dd') : '—'}
            <br />→ {range?.to ? format(range.to, 'yyyy-MM-dd') : '—'}
          </div>
        </div>
      </div>

      <div className="p-4">
        <Calendar
          surface="embedded"
          accent="sky"
          mode="range"
          numberOfMonths={2}
          month={month}
          onMonthChange={setMonth}
          selected={range}
          onSelect={(next) => {
            setActivePreset('custom')
            setRange(next)
          }}
        />
      </div>
    </div>
  )
}

/* ============================================================================
 * 4. 多选日期（mode="multiple" + max={5}）
 * ========================================================================== */
function CalendarMultipleDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [dates, setDates] = React.useState<Date[] | undefined>([
    today,
    addDays(today, 2),
    addDays(today, 5),
  ])

  const sorted = React.useMemo(
    () => [...(dates ?? [])].sort((a, b) => a.getTime() - b.getTime()),
    [dates],
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="multiple"
        max={5}
        accent="mint"
        selected={dates}
        onSelect={setDates}
        footer={
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[#1B1F27]">
                已选候选日（最多 5 天）
              </span>
              <span className="font-glaze-mono font-bold text-[#2F6B28]">
                {sorted.length} / 5
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sorted.length === 0 ? (
                <span className="text-[12px] text-[#8A90A0]">点击日历添加排班或会议候选日</span>
              ) : (
                sorted.map((d) => (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() =>
                      setDates((prev) => prev?.filter((item) => !isSameDay(item, d)))
                    }
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full border-0 bg-[#E2F5DA] px-2.5 py-1 font-glaze-mono text-[11.5px] font-bold text-[#173F12] transition-opacity hover:opacity-80"
                  >
                    <span>{format(d, 'MM/dd')}</span>
                    <X size={11} weight="bold" />
                  </button>
                ))
              )}
            </div>
          </div>
        }
      />
    </div>
  )
}

/* ============================================================================
 * 5. 年月下拉快选（captionLayout="dropdown"）
 * ========================================================================== */
function CalendarDropdownDemo() {
  const [layout, setLayout] = React.useState<'dropdown' | 'dropdown-months' | 'dropdown-years'>(
    'dropdown',
  )
  const [date, setDate] = React.useState<Date | undefined>(new Date(1998, 7, 18))

  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedControl
        size="sm"
        value={layout}
        onValueChange={(v) =>
          setLayout(v as 'dropdown' | 'dropdown-months' | 'dropdown-years')
        }
        options={[
          { value: 'dropdown', label: '年月双下拉' },
          { value: 'dropdown-months', label: '仅月份下拉' },
          { value: 'dropdown-years', label: '仅年份下拉' },
        ]}
      />
      <Calendar
        mode="single"
        captionLayout={layout}
        accent="lilac"
        selected={date}
        onSelect={setDate}
        defaultMonth={date}
        startMonth={new Date(1980, 0)}
        endMonth={new Date(2035, 11)}
        footer={
          <div className="flex items-center justify-between text-[12px]">
            <span>跨年快速定位（1980 — 2035）</span>
            <span className="font-glaze-mono font-bold text-[#6A2D70]">
              {date ? format(date, 'yyyy-MM-dd') : '未选择'}
            </span>
          </div>
        }
      />
    </div>
  )
}

/* ============================================================================
 * 6. 弹出式日期与区间选择器（Popover + Calendar + date-fns）
 * ========================================================================== */
function CalendarPopoverPickerDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(addDays(today, 3))
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: addDays(today, 1),
    to: addDays(today, 6),
  })

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="px-1 text-[12px] font-semibold text-[#5B6170]">单日选择器</span>
        <Popover
          align="start"
          className="w-auto p-3.5"
          trigger={
            <Button variant="secondary" className="min-w-56 justify-between bg-white hover:bg-[#F6F7F9]">
              <span className="flex items-center gap-2">
                <CalendarBlank size={16} weight="duotone" className="text-[#4A4FB8]" />
                <span className={singleDate ? 'text-[#1B1F27]' : 'text-[#8A90A0]'}>
                  {singleDate
                    ? format(singleDate, 'yyyy 年 M 月 d 日', { locale: zhCN })
                    : '选择发布日期'}
                </span>
              </span>
              <HueTag hue="periwinkle" size="xs">
                {singleDate ? format(singleDate, 'EEE', { locale: zhCN }) : '单选'}
              </HueTag>
            </Button>
          }
        >
          <Calendar
            surface="embedded"
            size="sm"
            mode="single"
            selected={singleDate}
            onSelect={setSingleDate}
          />
        </Popover>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="px-1 text-[12px] font-semibold text-[#5B6170]">双月区间选择器</span>
        <Popover
          align="start"
          className="w-auto p-3.5"
          trigger={
            <Button variant="secondary" className="min-w-72 justify-between bg-white hover:bg-[#F6F7F9]">
              <span className="flex items-center gap-2">
                <CalendarDots size={16} weight="duotone" className="text-[#2FA79B]" />
                <span className="font-glaze-mono text-[13px] text-[#1B1F27]">
                  {range?.from
                    ? range.to
                      ? `${format(range.from, 'yyyy/MM/dd')} - ${format(range.to, 'yyyy/MM/dd')}`
                      : `${format(range.from, 'yyyy/MM/dd')} - ...`
                    : '选择统计区间'}
                </span>
              </span>
              {range?.from && range?.to && (
                <HueTag hue="aqua" size="xs">
                  {differenceInCalendarDays(range.to, range.from) + 1} 天
                </HueTag>
              )}
            </Button>
          }
        >
          <Calendar
            surface="embedded"
            size="sm"
            accent="aqua"
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
          />
        </Popover>
      </div>
    </div>
  )
}

/* ============================================================================
 * 7. 禁选规则、周末屏蔽与区间跨度限制（disabled + min / max）
 * ========================================================================== */
function CalendarDisabledDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [blockWeekends, setBlockWeekends] = React.useState(true)
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  const disabledMatchers = React.useMemo(
    () => [
      { before: today },
      ...(blockWeekends ? [{ dayOfWeek: [0, 6] }] : []),
      addDays(today, 4),
    ],
    [today, blockWeekends],
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center gap-4 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-[#5B6170]">
        <span className="flex items-center gap-2">
          <span>屏蔽周末</span>
          <Switch checked={blockWeekends} onCheckedChange={setBlockWeekends} hue="coral" />
        </span>
        <span className="text-[#CDD3DD]">|</span>
        <span className="text-[12px]">
          自动禁用过去日期 + {format(addDays(today, 4), 'M/d')}（维护日），区间需选 2~7 天
        </span>
      </div>

      <Calendar
        mode="range"
        accent="coral"
        min={2}
        max={7}
        excludeDisabled
        disabled={disabledMatchers}
        selected={range}
        onSelect={setRange}
        footer={
          <div className="flex items-center justify-between text-[12px]">
            <span>
              {range?.from && range?.to
                ? `已预约：${format(range.from, 'MM/dd')} — ${format(range.to, 'MM/dd')}（${
                    differenceInCalendarDays(range.to, range.from) + 1
                  } 天）`
                : '请选择 2 至 7 天的连续可用工作日'}
            </span>
            {range && (
              <Button size="sm" variant="ghost" onClick={() => setRange(undefined)}>
                重置
              </Button>
            )}
          </div>
        }
      />
    </div>
  )
}

/* ============================================================================
 * 8. 色相强调、尺寸密度与表面形态（accent + size + surface）
 * ========================================================================== */
function CalendarThemesDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [accent, setAccent] = React.useState<CalendarAccent>('sky')
  const [size, setSize] = React.useState<CalendarSize>('md')
  const [surface, setSurface] = React.useState<CalendarSurface>('card')
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: addDays(today, 1),
    to: addDays(today, 6),
  })

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-[18px] bg-white px-4 py-3">
        <SegmentedControl
          size="sm"
          value={accent}
          onValueChange={(v) => setAccent(v as CalendarAccent)}
          options={[
            { value: 'ink', label: '墨色' },
            { value: 'periwinkle', label: '长春花' },
            { value: 'sky', label: '天蓝' },
            { value: 'mint', label: '薄荷' },
            { value: 'aqua', label: '湖水' },
            { value: 'coral', label: '珊瑚' },
          ]}
        />
        <SegmentedControl
          size="sm"
          value={size}
          onValueChange={(v) => setSize(v as CalendarSize)}
          options={[
            { value: 'sm', label: 'sm · 32px' },
            { value: 'md', label: 'md · 36px' },
            { value: 'lg', label: 'lg · 42px' },
          ]}
        />
        <SegmentedControl
          size="sm"
          value={surface}
          onValueChange={(v) => setSurface(v as CalendarSurface)}
          options={[
            { value: 'card', label: 'card 白卡' },
            { value: 'soft', label: 'soft 柔灰' },
          ]}
        />
      </div>

      <Calendar
        mode="range"
        accent={accent}
        size={size}
        surface={surface}
        selected={range}
        onSelect={setRange}
      />
    </div>
  )
}

/* ============================================================================
 * 9. 周数显示与多语言本地化（showWeekNumber + ISOWeek + date-fns/locale）
 * ========================================================================== */
function CalendarLocaleWeekDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [lang, setLang] = React.useState<'zh' | 'en' | 'ja'>('zh')
  const [date, setDate] = React.useState<Date | undefined>(today)

  const localeMap = { zh: zhCN, en: enUS, ja }
  const currentLocale = localeMap[lang]

  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedControl
        size="sm"
        value={lang}
        onValueChange={(v) => setLang(v as 'zh' | 'en' | 'ja')}
        options={[
          { value: 'zh', label: '简体中文 (zhCN)' },
          { value: 'en', label: 'English (enUS)' },
          { value: 'ja', label: '日本語 (ja)' },
        ]}
      />

      <Calendar
        mode="single"
        accent="aqua"
        locale={currentLocale}
        showWeekNumber
        ISOWeek
        selected={date}
        onSelect={setDate}
        footer={
          <div className="flex items-center justify-between text-[12px]">
            <span>ISO 8601 周数 · W{date ? format(date, 'II') : '--'}</span>
            <span className="font-bold text-[#0B3D38]">
              {date ? format(date, 'PPP', { locale: currentLocale }) : '—'}
            </span>
          </div>
        }
      />
    </div>
  )
}

/* ============================================================================
 * 10. 自定义日期单元格：日程标记 & 机酒价格日历（components.DayButton）
 * ========================================================================== */
function CalendarCustomCellsDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [selectedEventDate, setSelectedEventDate] = React.useState<Date | undefined>(today)
  const [stayRange, setStayRange] = React.useState<DateRange | undefined>({
    from: addDays(today, 2),
    to: addDays(today, 5),
  })

  const schedules = React.useMemo(
    () => [
      {
        date: today,
        title: '设计系统组件评审',
        time: '14:00 - 15:00',
        status: 'info' as const,
        dot: '#4A9BD8',
      },
      {
        date: addDays(today, 2),
        title: 'v2.1 Registry 正式发布',
        time: '10:30 - 11:30',
        status: 'normal' as const,
        dot: '#49A851',
      },
      {
        date: addDays(today, 5),
        title: '核心集群压测窗口',
        time: '22:00 - 23:30',
        status: 'warning' as const,
        dot: '#E3A33B',
      },
    ],
    [today],
  )

  const getPrice = (d: Date) => {
    const day = d.getDate()
    const isWknd = d.getDay() === 0 || d.getDay() === 6
    if (isWknd) return 860 + (day % 3) * 40
    return day % 4 === 0 ? 520 : 620 + (day % 3) * 30
  }

  const activeDayEvents = schedules.filter(
    (s) => selectedEventDate && isSameDay(s.date, selectedEventDate),
  )

  const totalPrice = React.useMemo(() => {
    if (!stayRange?.from || !stayRange?.to) return 0
    const nights = differenceInCalendarDays(stayRange.to, stayRange.from)
    if (nights <= 0) return 0
    let sum = 0
    for (let i = 0; i < nights; i++) {
      sum += getPrice(addDays(stayRange.from, i))
    }
    return sum
  }, [stayRange])

  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
      {/* A. 日程圆点日历 */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-tile bg-white p-5">
        <div className="flex w-full items-center justify-between">
          <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
            日程圆点标记
          </span>
          <HueTag hue="sky" size="xs">
            自定义 DayButton
          </HueTag>
        </div>

        <Calendar
          surface="embedded"
          mode="single"
          selected={selectedEventDate}
          onSelect={setSelectedEventDate}
          showTodayDot={false}
          components={{
            DayButton: ({ day, modifiers, children, ...btnProps }) => {
              const matched = schedules.find((s) => isSameDay(s.date, day.date))
              return (
                <CalendarDayButton
                  day={day}
                  modifiers={modifiers}
                  showTodayDot={false}
                  {...btnProps}
                >
                  <span>{children}</span>
                  {matched && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-1 h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: modifiers.selected ? '#FFFFFF' : matched.dot,
                      }}
                    />
                  )}
                </CalendarDayButton>
              )
            },
          }}
        />

        <div className="w-full rounded-[16px] bg-[#F6F7F9] p-3">
          {activeDayEvents.length > 0 ? (
            activeDayEvents.map((ev) => (
              <div key={ev.title} className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[13px] font-bold text-[#1B1F27]">{ev.title}</div>
                  <div className="font-glaze-mono text-[11.5px] text-[#6B7280]">{ev.time}</div>
                </div>
                <StatusPill status={ev.status}>已安排</StatusPill>
              </div>
            ))
          ) : (
            <div className="text-center text-[12px] text-[#8A90A0]">
              {selectedEventDate ? format(selectedEventDate, 'M 月 d 日') : '当日'}暂无日程安排
            </div>
          )}
        </div>
      </div>

      {/* B. 价格预订日历 */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-tile bg-white p-5">
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center gap-1.5 font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
            <Sparkle size={16} weight="duotone" className="text-[#49A851]" />
            <span>酒店价格日历</span>
          </span>
          <HueTag hue="mint" size="xs">
            实时计价
          </HueTag>
        </div>

        <Calendar
          surface="embedded"
          size="lg"
          accent="mint"
          mode="range"
          selected={stayRange}
          onSelect={setStayRange}
          showTodayDot={false}
          disabled={{ before: today }}
          components={{
            DayButton: ({ day, modifiers, children, ...btnProps }) => {
              const price = getPrice(day.date)
              const isCheap = price <= 560
              const isEndpoint = modifiers.range_start || modifiers.range_end
              return (
                <CalendarDayButton
                  day={day}
                  modifiers={modifiers}
                  showTodayDot={false}
                  className="gap-0.5 rounded-[14px]"
                  {...btnProps}
                >
                  <span className="text-[13px] leading-none">{children}</span>
                  {!modifiers.outside && !modifiers.disabled && (
                    <span
                      className={`font-glaze-mono text-[9.5px] leading-none font-bold ${
                        isEndpoint
                          ? 'text-white/85'
                          : isCheap
                            ? 'text-[#2F6B28]'
                            : 'text-[#8A90A0]'
                      }`}
                    >
                      ¥{price}
                    </span>
                  )}
                </CalendarDayButton>
              )
            },
          }}
        />

        <div className="flex w-full items-center justify-between rounded-[16px] bg-[#F1FAEC] px-4 py-3 text-[#173F12]">
          <div className="text-[12px]">
            {stayRange?.from && stayRange?.to
              ? `${format(stayRange.from, 'M/d')} 入住 · ${differenceInCalendarDays(
                  stayRange.to,
                  stayRange.from,
                )} 晚`
              : '请选择入住与离店日期'}
          </div>
          <div className="font-glaze-display text-[18px] font-extrabold tabular-nums">
            {totalPrice > 0 ? `¥${totalPrice.toLocaleString()}` : '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
 * 11. 搭配 TanStack Form 表单校验（Form + Popover + Calendar）
 * ========================================================================== */
function CalendarFormDemo() {
  const today = React.useMemo(() => startOfToday(), [])
  const [submitted, setSubmitted] = React.useState<{
    destination: string
    period: string
    days: number
  } | null>(null)

  const form = useForm({
    defaultValues: {
      destination: '上海 · 张江研发中心',
      tripRange: undefined as DateRange | undefined,
    },
    onSubmit: ({ value }) => {
      if (!value.tripRange?.from || !value.tripRange?.to) return
      setSubmitted({
        destination: value.destination,
        period: `${format(value.tripRange.from, 'yyyy-MM-dd')} 至 ${format(
          value.tripRange.to,
          'yyyy-MM-dd',
        )}`,
        days: differenceInCalendarDays(value.tripRange.to, value.tripRange.from) + 1,
      })
    },
  })

  return (
    <div className="w-full max-w-md rounded-tile bg-white p-6">
      <Form form={form} className="gap-4">
        <form.Field
          name="destination"
          validators={{
            onChange: ({ value }) =>
              value.trim().length < 2 ? '请填写至少 2 个字的出差目的地' : undefined,
          }}
        >
          {(field) => (
            <FormItem field={field}>
              <FormLabel required>出差目的地</FormLabel>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="例如：北京 / 深圳 / 新加坡"
              />
              <FormMessage />
            </FormItem>
          )}
        </form.Field>

        <form.Field
          name="tripRange"
          validators={{
            onChange: ({ value }) => {
              if (!value?.from || !value?.to) {
                return '请选择完整的出发与返程日期区间'
              }
              if (differenceInCalendarDays(value.to, value.from) > 14) {
                return '单次差旅申请不得超过 15 天'
              }
              return undefined
            },
          }}
        >
          {(field) => {
            const val = field.state.value
            return (
              <FormItem field={field}>
                <FormLabel required>行程日期区间</FormLabel>
                <Popover
                  align="start"
                  className="w-auto p-3.5"
                  trigger={
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <AirplaneTilt size={16} weight="duotone" className="text-[#4A9BD8]" />
                        <span className={val?.from ? 'text-[#1B1F27]' : 'text-[#8A90A0]'}>
                          {val?.from
                            ? val.to
                              ? `${format(val.from, 'yyyy/MM/dd')} → ${format(val.to, 'yyyy/MM/dd')}`
                              : `${format(val.from, 'yyyy/MM/dd')} → 请选择返程日`
                            : '点击打开日历选择出发与返程日'}
                        </span>
                      </span>
                      <CalendarBlank size={15} className="text-[#6B7280]" />
                    </Button>
                  }
                >
                  <Calendar
                    surface="embedded"
                    size="sm"
                    accent="sky"
                    mode="range"
                    disabled={{ before: today }}
                    selected={val}
                    onSelect={(next) => {
                      field.handleChange(next)
                      field.handleBlur()
                    }}
                  />
                </Popover>
                <FormDescription>不可选择今天以前的日期，单次行程最长 15 天。</FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        </form.Field>

        <div className="flex items-center gap-2 pt-1">
          <FormSubmit>提交差旅申请</FormSubmit>
          <FormReset onClick={() => setSubmitted(null)}>重置</FormReset>
        </div>
      </Form>

      {submitted && (
        <div className="mt-4 rounded-[16px] bg-[#EEF7FD] p-3.5 text-[12.5px] text-[#123A5C]">
          <div className="font-bold">已提交行程：{submitted.destination}</div>
          <div className="mt-0.5 font-glaze-mono text-[12px] text-[#24557F]">
            {submitted.period} · 共 {submitted.days} 天
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================================
 * Exported Demo Group
 * ========================================================================== */
export const CALENDAR_DEMO: ComponentDemoGroup = {
  hero: {
    align: 'center',
    minHeight: 420,
    surface: 'canvas',
    render: () => <CalendarHeroDemo />,
    code: `import * as React from 'react'
import { format, startOfToday } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

export function CalendarExample() {
  const today = startOfToday()
  const [date, setDate] = React.useState<Date | undefined>(today)
  const [month, setMonth] = React.useState<Date>(today)

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      month={month}
      onMonthChange={setMonth}
      footer={
        <div className="flex items-center justify-between gap-3">
          <span>{date ? format(date, 'yyyy 年 M 月 d 日 · EEEE', { locale: zhCN }) : '未选择'}</span>
          <Button size="sm" variant="secondary" onClick={() => { setDate(today); setMonth(today) }}>
            回到今天
          </Button>
        </div>
      }
    />
  )
}`,
  },
  examples: [
    {
      id: 'date-range',
      title: '双月日期区间选择（mode="range" + numberOfMonths）',
      description:
        '通过 mode="range" 与 numberOfMonths={2} 并排展示两个月，起止日期自动渲染连续柔彩胶囊区间带，并搭配 date-fns 计算天数/晚数。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarRangeDemo />,
      code: `import * as React from 'react'
import { addDays, differenceInCalendarDays, format, startOfToday } from 'date-fns'
import { Calendar, type DateRange } from '@/components/ui/calendar'

export function DateRangeExample() {
  const today = startOfToday()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: addDays(today, 2),
    to: addDays(today, 11),
  })

  const days =
    range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) + 1 : 0

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      accent="periwinkle"
      selected={range}
      onSelect={setRange}
      footer={
        range?.from && range?.to
          ? \`\${format(range.from, 'yyyy/MM/dd')} → \${format(range.to, 'yyyy/MM/dd')}（共 \${days} 天）\`
          : '请选择起止日期'
      }
    />
  )
}`,
    },
    {
      id: 'presets-range',
      title: '快捷时间窗预设（date-fns 相对日期计算）',
      description:
        '在 BI 看板与监控检索中，结合 date-fns 的 subDays / addDays / startOfMonth / endOfMonth 快速切换近 7 天、近 30 天与本月区间，并同步跳转可视月份。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarPresetsDemo />,
      code: `import * as React from 'react'
import { endOfMonth, startOfMonth, startOfToday, subDays } from 'date-fns'
import { Calendar, type DateRange } from '@/components/ui/calendar'

export function PresetsCalendarExample() {
  const today = startOfToday()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: subDays(today, 6),
    to: today,
  })
  const [month, setMonth] = React.useState(today)

  const applyPreset = (from: Date, to: Date) => {
    setRange({ from, to })
    setMonth(from)
  }

  return (
    <div className="flex rounded-tile bg-white p-4 gap-4">
      <div className="flex flex-col gap-1.5">
        <button onClick={() => applyPreset(subDays(today, 6), today)}>最近 7 天</button>
        <button onClick={() => applyPreset(subDays(today, 29), today)}>最近 30 天</button>
        <button onClick={() => applyPreset(startOfMonth(today), endOfMonth(today))}>本月</button>
      </div>
      <Calendar
        surface="embedded"
        accent="sky"
        mode="range"
        numberOfMonths={2}
        month={month}
        onMonthChange={setMonth}
        selected={range}
        onSelect={setRange}
      />
    </div>
  )
}`,
    },
    {
      id: 'multiple-dates',
      title: '多日期选择与上限约束（mode="multiple"）',
      description:
        '适用于排班计划、会议候选日等场景，设置 max={5} 限制最多选择数量，支持从底部标签单独移除已选日期。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarMultipleDemo />,
      code: `import * as React from 'react'
import { addDays, format, startOfToday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

export function MultipleDatesExample() {
  const today = startOfToday()
  const [dates, setDates] = React.useState<Date[] | undefined>([
    today,
    addDays(today, 2),
    addDays(today, 5),
  ])

  return (
    <Calendar
      mode="multiple"
      max={5}
      accent="mint"
      selected={dates}
      onSelect={setDates}
      footer={\`已选 \${dates?.length ?? 0} / 5 天：\${(dates ?? []).map((d) => format(d, 'MM/dd')).join('、')}\`}
    />
  )
}`,
    },
    {
      id: 'dropdown-navigation',
      title: '年月下拉快速跳转（captionLayout="dropdown"）',
      description:
        '用于出生日期、合同起止日或历史归档筛选。开启 captionLayout="dropdown" 配合 startMonth / endMonth，无需逐月翻页即可直达任意年份月份。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarDropdownDemo />,
      code: `import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'

export function DropdownCaptionExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(1998, 7, 18))

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      accent="lilac"
      selected={date}
      onSelect={setDate}
      defaultMonth={date}
      startMonth={new Date(1980, 0)}
      endMonth={new Date(2035, 11)}
    />
  )
}`,
    },
    {
      id: 'date-picker-popover',
      title: '弹出式日期与区间选择器（Popover + Calendar）',
      description:
        '将 surface="embedded" 与 size="sm" 组合放入 Glaze Popover，即可零冗余嵌套边框构建单日 DatePicker 与双月 DateRangePicker。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarPopoverPickerDemo />,
      code: `import * as React from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { CalendarBlank } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover } from '@/components/ui/popover'

export function DatePickerExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Popover
      align="start"
      className="w-auto p-3.5"
      trigger={
        <Button variant="secondary">
          <CalendarBlank size={16} />
          <span>{date ? format(date, 'yyyy 年 M 月 d 日', { locale: zhCN }) : '选择日期'}</span>
        </Button>
      }
    >
      <Calendar
        surface="embedded"
        size="sm"
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    </Popover>
  )
}`,
    },
    {
      id: 'disabled-and-constraints',
      title: '禁选日期、周末屏蔽与区间跨度约束（disabled + min / max）',
      description:
        '利用 react-day-picker Matcher 规则轻松屏蔽过去日期、周末或特定维护日，并通过 excludeDisabled 与 min / max 防止跨过禁用日或超出允许天数。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarDisabledDemo />,
      code: `import * as React from 'react'
import { addDays, startOfToday } from 'date-fns'
import { Calendar, type DateRange } from '@/components/ui/calendar'

export function DisabledDatesExample() {
  const today = startOfToday()
  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      accent="coral"
      min={2}
      max={7}
      excludeDisabled
      disabled={[
        { before: today },
        { dayOfWeek: [0, 6] },
        addDays(today, 4),
      ]}
      selected={range}
      onSelect={setRange}
    />
  )
}`,
    },
    {
      id: 'accents-and-sizes',
      title: '色相强调、尺寸密度与表面变体（accent / size / surface）',
      description:
        '支持默认墨色（ink）及全部 9 组 Glaze 柔彩色相，提供 sm (32px) / md (36px) / lg (42px) 三档格宽和 card / soft / embedded 三种容器表面。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarThemesDemo />,
      code: `import { Calendar } from '@/components/ui/calendar'

export function AccentAndSizeExample() {
  return (
    <Calendar
      mode="range"
      accent="sky"
      size="lg"
      surface="soft"
    />
  )
}`,
    },
    {
      id: 'week-numbers-and-locale',
      title: 'ISO 周数与多语言切换（showWeekNumber + date-fns/locale）',
      description:
        '开启 showWeekNumber 与 ISOWeek 显示全年周序，直接传入 date-fns/locale 中的任意语言包（zhCN / enUS / ja 等）即可自动适配星期、月份标题与格式化输出。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarLocaleWeekDemo />,
      code: `import * as React from 'react'
import { enUS } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'

export function LocaleWeekExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      accent="aqua"
      locale={enUS}
      showWeekNumber
      ISOWeek
      selected={date}
      onSelect={setDate}
    />
  )
}`,
    },
    {
      id: 'custom-day-button',
      title: '自定义日期单元格：日程标记与价格日历（CalendarDayButton）',
      description:
        '复用导出的 CalendarDayButton 原语扩展每日内容，轻松实现日程多色圆点提醒、酒店/机票价格日历等业务形态。',
      align: 'start',
      surface: 'canvas',
      render: () => <CalendarCustomCellsDemo />,
      code: `import { Calendar, CalendarDayButton } from '@/components/ui/calendar'

export function PriceCalendarExample() {
  return (
    <Calendar
      mode="range"
      size="lg"
      accent="mint"
      showTodayDot={false}
      components={{
        DayButton: ({ day, modifiers, children, ...props }) => (
          <CalendarDayButton
            day={day}
            modifiers={modifiers}
            showTodayDot={false}
            className="gap-0.5 rounded-[14px]"
            {...props}
          >
            <span>{children}</span>
            {!modifiers.outside && (
              <span className="font-glaze-mono text-[9.5px] font-bold">¥580</span>
            )}
          </CalendarDayButton>
        ),
      }}
    />
  )
}`,
    },
    {
      id: 'form-integration',
      title: '搭配 TanStack Form 表单校验（Form + Popover + Calendar）',
      description:
        '将 Calendar 嵌入 Glaze Form 作为受控日期区间字段，结合 date-fns 编写跨度校验规则并在提交后格式化输出结果。',
      align: 'center',
      surface: 'canvas',
      render: () => <CalendarFormDemo />,
      code: `import { differenceInCalendarDays, format, startOfToday } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar, type DateRange } from '@/components/ui/calendar'
import { Form, FormItem, FormLabel, FormMessage, FormSubmit, useForm } from '@/components/ui/form'
import { Popover } from '@/components/ui/popover'

export function TripFormExample() {
  const form = useForm({
    defaultValues: { tripRange: undefined as DateRange | undefined },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <Form form={form}>
      <form.Field
        name="tripRange"
        validators={{
          onChange: ({ value }) => {
            if (!value?.from || !value?.to) return '请选择完整的出发与返程日期区间'
            if (differenceInCalendarDays(value.to, value.from) > 14) return '单次行程不得超过 15 天'
            return undefined
          },
        }}
      >
        {(field) => (
          <FormItem field={field}>
            <FormLabel required>行程日期区间</FormLabel>
            <Popover
              align="start"
              className="w-auto p-3.5"
              trigger={
                <Button type="button" variant="secondary">
                  {field.state.value?.from && field.state.value?.to
                    ? \`\${format(field.state.value.from, 'yyyy/MM/dd')} → \${format(field.state.value.to, 'yyyy/MM/dd')}\`
                    : '选择行程日期'}
                </Button>
              }
            >
              <Calendar
                surface="embedded"
                size="sm"
                mode="range"
                disabled={{ before: startOfToday() }}
                selected={field.state.value}
                onSelect={(next) => {
                  field.handleChange(next)
                  field.handleBlur()
                }}
              />
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <FormSubmit>提交申请</FormSubmit>
    </Form>
  )
}`,
    },
  ],
}
