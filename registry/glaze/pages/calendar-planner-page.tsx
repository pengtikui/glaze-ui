import * as React from 'react'
import { format } from 'date-fns'
import { CalendarPlus, Clock, MapPin, Users } from '@phosphor-icons/react'
import { CalendarBookingBlock } from '@/components/blocks/calendar-booking-block'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Drawer } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmit,
  useForm,
} from '@/components/ui/form'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

interface ScheduleEvent {
  id: string
  day: number // 0=Mon..4=Fri
  time: string
  duration: string
  title: string
  calendar: 'design' | 'eng' | 'customer'
  hue: Hue
  location: string
  attendees: string[]
}

const INITIAL_EVENTS: ScheduleEvent[] = [
  { id: 'e1', day: 0, time: '10:00', duration: '45m', title: 'Glaze v2.1 卡片分类复盘', calendar: 'design', hue: 'periwinkle', location: '会议室 A · 飞书视频', attendees: ['林', '陈', '许'] },
  { id: 'e2', day: 0, time: '15:00', duration: '60m', title: '华东客户私有 Registry 方案演示', calendar: 'customer', hue: 'mint', location: '线上会议室', attendees: ['周', '林'] },
  { id: 'e3', day: 1, time: '11:00', duration: '30m', title: 'TanStack Table 性能优化同步', calendar: 'eng', hue: 'sky', location: '技术讨论区', attendees: ['陈', '陆'] },
  { id: 'e4', day: 2, time: '14:00', duration: '90m', title: 'AI Elements 交互走查与体验评审', calendar: 'design', hue: 'lilac', location: 'Design Lab', attendees: ['林', '许', '陈'] },
  { id: 'e5', day: 3, time: '10:30', duration: '45m', title: 'Q4 营收与订阅转化分析会', calendar: 'customer', hue: 'peach', location: '大会议室 B', attendees: ['周', '许'] },
  { id: 'e6', day: 4, time: '16:00', duration: '60m', title: '周五研发闪电分享 & Demo Day', calendar: 'eng', hue: 'aqua', location: '大厅剧场', attendees: ['林', '陈', '周', '陆'] },
]

const WEEK_DAYS = [
  { idx: 0, label: '周一', date: '11/23' },
  { idx: 1, label: '周二', date: '11/24' },
  { idx: 2, label: '周三', date: '11/25' },
  { idx: 3, label: '周四', date: '11/26' },
  { idx: 4, label: '周五', date: '11/27' },
]

export function CalendarPlannerPage() {
  const toast = useToast()
  const [mode, setMode] = React.useState<'schedule' | 'booking'>('schedule')
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    () => new Date(2026, 10, 26),
  )
  const [events, setEvents] = React.useState<ScheduleEvent[]>(INITIAL_EVENTS)
  const [enabledCals, setEnabledCals] = React.useState<Record<string, boolean>>({
    design: true,
    eng: true,
    customer: true,
  })
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const form = useForm({
    defaultValues: {
      title: '',
      day: '3',
      time: '14:30',
      calendar: 'design',
      location: '线上会议室',
    },
    onSubmit: async ({ value }) => {
      const cal = value.calendar as ScheduleEvent['calendar']
      const hue: Hue = cal === 'design' ? 'periwinkle' : cal === 'eng' ? 'sky' : 'mint'
      const next: ScheduleEvent = {
        id: `e-${Date.now()}`,
        day: Number(value.day),
        time: value.time,
        duration: '45m',
        title: value.title,
        calendar: cal,
        hue,
        location: value.location,
        attendees: ['林', '陈'],
      }
      setEvents((prev) => [...prev, next])
      setDrawerOpen(false)
      form.reset()
      toast({ title: '已创建新日程', description: `${next.time} · ${next.title}`, status: 'normal' })
    },
  })

  const visibleEvents = events.filter((e) => enabledCals[e.calendar])

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6 px-4 py-8 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
              PAGE 12 · PLAN.CAL · 日程排期与团队预约中心
            </span>
            <h1 className="m-0 font-glaze-display text-[32px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
              团队日程与会议预约
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <SegmentedControl
              size="sm"
              value={mode}
              onValueChange={setMode}
              options={[
                { value: 'schedule', label: '团队周视图' },
                { value: 'booking', label: '对外预约页' },
              ]}
            />
            <Button variant="primary" size="sm" onClick={() => setDrawerOpen(true)}>
              <CalendarPlus size={15} weight="bold" />
              <span>新建日程</span>
            </Button>
          </div>
        </header>

        {mode === 'booking' ? (
          <CalendarBookingBlock />
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
            <aside className="flex flex-col gap-4 lg:col-span-4 xl:col-span-3">
              <Tile tone="white" className="min-h-0 items-center justify-start p-4">
                <Calendar
                  mode="single"
                  surface="embedded"
                  size="sm"
                  accent="periwinkle"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  defaultMonth={selectedDate}
                />
              </Tile>

              <Tile tone="white" className="min-h-0 justify-start gap-3.5 p-5">
                <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
                  我的日历图层
                </span>
                <div className="flex flex-col gap-2.5">
                  {[
                    { key: 'design', label: '产品与设计评审', hue: 'periwinkle' as Hue },
                    { key: 'eng', label: '研发与架构同步', hue: 'sky' as Hue },
                    { key: 'customer', label: '客户演示与商务', hue: 'mint' as Hue },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-2">
                      <Checkbox
                        checked={enabledCals[item.key]}
                        onCheckedChange={(v) =>
                          setEnabledCals((prev) => ({ ...prev, [item.key]: v }))
                        }
                        label={item.label}
                      />
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: HUE_PALETTES[item.hue][500] }}
                      />
                    </div>
                  ))}
                </div>
              </Tile>

              <Tile tone="sky-dark" className="min-h-0 justify-start gap-1.5 p-5">
                <span className="text-[12px] text-white/70">选中日期</span>
                <span className="font-glaze-display text-[22px] font-extrabold text-white">
                  {selectedDate ? format(selectedDate, 'MM 月 dd 日') : '本周'}
                </span>
                <span className="text-[12.5px] text-white/80">
                  本周共排期 {visibleEvents.length} 场核心会议
                </span>
              </Tile>
            </aside>

            <main className="flex flex-col lg:col-span-8 xl:col-span-9">
              <Tile tone="white" className="h-full flex-1 justify-start gap-4 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-glaze-display text-[18px] font-extrabold text-[#123A5C]">
                    2026 年 11 月第 4 周排期
                  </span>
                  <StatusPill status="normal" label={`${visibleEvents.length} 项日程`} size="sm" />
                </div>

                <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-5">
                  {WEEK_DAYS.map((wd) => {
                    const dayEvents = visibleEvents.filter((e) => e.day === wd.idx)
                    return (
                      <div
                        key={wd.idx}
                        className="flex min-h-[460px] flex-col gap-2.5 rounded-inner bg-[#F6F7F9] p-3"
                      >
                        <div className="flex items-baseline justify-between border-b border-[#E8EBF0] pb-2">
                          <span className="font-glaze-display text-[14px] font-extrabold text-[#123A5C]">
                            {wd.label}
                          </span>
                          <span className="font-glaze-mono text-[11px] font-semibold text-[#8A90A0]">
                            {wd.date}
                          </span>
                        </div>

                        {dayEvents.length === 0 ? (
                          <div className="flex flex-1 items-center justify-center text-[12px] text-[#9CA3AF]">
                            专注时段
                          </div>
                        ) : (
                          dayEvents.map((ev) => {
                            const pal = HUE_PALETTES[ev.hue]
                            return (
                              <div
                                key={ev.id}
                                onClick={() =>
                                  toast({
                                    title: ev.title,
                                    description: `${wd.label} ${ev.time} · ${ev.location}`,
                                    status: 'info',
                                  })
                                }
                                className="flex cursor-pointer flex-col gap-2 rounded-[16px] p-3 transition-transform hover:-translate-y-0.5"
                                style={{ backgroundColor: pal[100], color: pal[900] }}
                              >
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                  <span className="inline-flex items-center gap-1 tabular-nums">
                                    <Clock size={12} weight="bold" />
                                    {ev.time}
                                  </span>
                                  <span>{ev.duration}</span>
                                </div>
                                <div className="text-[13px] leading-snug font-extrabold">
                                  {ev.title}
                                </div>
                                <div className="flex items-center gap-1 text-[11px] opacity-80">
                                  <MapPin size={11} />
                                  <span className="truncate">{ev.location}</span>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                  <div className="flex -space-x-1.5">
                                    {ev.attendees.map((a) => (
                                      <Avatar key={a} fallback={a} hue={ev.hue} size="xs" />
                                    ))}
                                  </div>
                                  <HueTag hue={ev.hue} size="xs">
                                    <Users size={10} />
                                    {ev.attendees.length}
                                  </HueTag>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    )
                  })}
                </div>
              </Tile>
            </main>
          </div>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        side="right"
        title="新建团队日程"
        description="填写主题、时间与所属图层后将即时同步至周视图"
      >
        <Form form={form} className="flex flex-col gap-4">
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) => (!value.trim() ? '请填写日程主题' : undefined),
            }}
          >
            {(field) => (
              <FormItem field={field}>
                <FormLabel required>日程主题</FormLabel>
                <FormControl>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="如：组件库无障碍规范走查"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-3">
            <form.Field name="day">
              {(field) => (
                <FormItem field={field}>
                  <FormLabel>日期</FormLabel>
                  <FormControl>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v ?? '3')}
                      options={WEEK_DAYS.map((d) => ({
                        value: String(d.idx),
                        label: `${d.label} (${d.date})`,
                      }))}
                    />
                  </FormControl>
                </FormItem>
              )}
            </form.Field>

            <form.Field name="time">
              {(field) => (
                <FormItem field={field}>
                  <FormLabel>开始时间</FormLabel>
                  <FormControl>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            </form.Field>
          </div>

          <form.Field name="calendar">
            {(field) => (
              <FormItem field={field}>
                <FormLabel>日历图层</FormLabel>
                <FormControl>
                  <Select
                    value={field.state.value}
                    onValueChange={(v) => field.handleChange(v ?? 'design')}
                    options={[
                      { value: 'design', label: '产品与设计评审' },
                      { value: 'eng', label: '研发与架构同步' },
                      { value: 'customer', label: '客户演示与商务' },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          </form.Field>

          <form.Field name="location">
            {(field) => (
              <FormItem field={field}>
                <FormLabel>会议地点</FormLabel>
                <FormControl>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          </form.Field>

          <FormSubmit variant="primary" className="mt-2 w-full">
            保存到团队日历
          </FormSubmit>
        </Form>
      </Drawer>
    </div>
  )
}
