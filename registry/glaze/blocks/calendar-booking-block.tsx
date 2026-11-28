import * as React from 'react'
import { format } from 'date-fns'
import { CalendarCheck, Clock, VideoCamera } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select } from '@/components/ui/select'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'
import { PRESS_CLASS } from '@/lib/motion'

const TIME_SLOTS = [
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '14:00',
  '14:30',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
]

export interface CalendarBookingBlockProps {
  hostName?: string
  meetingTitle?: string
  durationLabel?: string
}

export function CalendarBookingBlock({
  hostName = 'Glaze 架构顾问组',
  meetingTitle = '设计系统落地方案 1v1 演示',
  durationLabel = '30 分钟 · 视频会议',
}: CalendarBookingBlockProps) {
  const toast = useToast()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    () => new Date(2026, 10, 29),
  )
  const [selectedSlot, setSelectedSlot] = React.useState<string>('14:30')
  const [confirmed, setConfirmed] = React.useState(false)

  const form = useForm({
    defaultValues: {
      guestName: '',
      guestEmail: '',
      topic: 'registry',
    },
    onSubmit: async ({ value }) => {
      setConfirmed(true)
      const dateLabel = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '待定'
      toast({
        title: '预约已确认',
        description: `${dateLabel} ${selectedSlot} · 邀请已发送至 ${value.guestEmail}`,
        status: 'normal',
      })
    },
  })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Tile tone="white" className="min-w-0 justify-between gap-5 p-6 lg:col-span-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <HueTag hue="periwinkle" size="sm">
              在线预约
            </HueTag>
            <StatusPill status="normal" label="本周可约" size="sm" />
          </div>
          <h3 className="m-0 font-glaze-display text-[20px] font-extrabold text-[#123A5C]">
            {meetingTitle}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-[#5B6170]">
            <span className="inline-flex items-center gap-1">
              <VideoCamera size={14} weight="bold" />
              {durationLabel}
            </span>
            <span>主讲：{hostName}</span>
          </div>
        </div>

        <div className="flex justify-center rounded-inner bg-[#F6F7F9] p-3">
          <Calendar
            mode="single"
            surface="embedded"
            size="sm"
            accent="periwinkle"
            selected={selectedDate}
            onSelect={(d) => {
              setSelectedDate(d)
              setConfirmed(false)
            }}
            defaultMonth={selectedDate}
          />
        </div>
      </Tile>

      <Tile tone="white" className="min-w-0 justify-start gap-4 p-6 lg:col-span-3">
        <div className="flex items-center justify-between">
          <span className="font-glaze-display text-[16px] font-extrabold text-[#1B1F27]">
            选择时段
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] text-[#6B7280]">
            <Clock size={13} />
            UTC+8
          </span>
        </div>

        <ScrollArea className="h-[340px] flex-1 pr-2">
          <div className="flex flex-col gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = slot === selectedSlot
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setSelectedSlot(slot)
                    setConfirmed(false)
                  }}
                  className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-full border-0 px-4 text-[13px] font-bold tabular-nums transition-colors ${PRESS_CLASS}`}
                  style={{
                    backgroundColor: active ? '#123A5C' : '#F6F7F9',
                    color: active ? '#FFFFFF' : '#1B1F27',
                  }}
                >
                  <span>{slot}</span>
                  <span className="text-[11px] font-medium opacity-75">
                    {active ? '已选' : '可约'}
                  </span>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </Tile>

      <Tile tone="sky" className="min-w-0 justify-between gap-4 p-6 lg:col-span-4">
        <div>
          <span className="font-glaze-display text-[18px] font-extrabold text-[#123A5C]">
            确认参会信息
          </span>
          <p className="m-0 mt-1 text-[13px] text-[#24557F]">
            已选：{selectedDate ? format(selectedDate, 'yyyy 年 MM 月 dd 日') : '请选择日期'} ·{' '}
            {selectedSlot}
          </p>
        </div>

        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-inner bg-white/80 p-6 text-center">
            <CalendarCheck size={36} weight="duotone" className="text-[#2F6B28]" />
            <div className="font-glaze-display text-[18px] font-extrabold text-[#123A5C]">
              日程已锁定
            </div>
            <p className="m-0 text-[13px] text-[#5B6170]">
              会议链接与日历 ICS 附件已发往你的邮箱。
            </p>
            <Button variant="secondary" size="sm" onClick={() => setConfirmed(false)}>
              修改预约时间
            </Button>
          </div>
        ) : (
          <Form form={form} className="flex flex-1 flex-col justify-between gap-3">
            <div className="flex flex-col gap-3">
              <form.Field
                name="guestName"
                validators={{
                  onChange: ({ value }) => (!value.trim() ? '请填写你的姓名' : undefined),
                }}
              >
                {(field) => (
                  <FormItem field={field}>
                    <FormLabel required>你的姓名</FormLabel>
                    <FormControl>
                      <Input
                        surface="white"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="如：陈思远"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              </form.Field>

              <form.Field
                name="guestEmail"
                validators={{
                  onChange: ({ value }) =>
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '请填写有效邮箱' : undefined,
                }}
              >
                {(field) => (
                  <FormItem field={field}>
                    <FormLabel required>接收邀请邮箱</FormLabel>
                    <FormControl>
                      <Input
                        surface="white"
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="you@company.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              </form.Field>

              <form.Field name="topic">
                {(field) => (
                  <FormItem field={field}>
                    <FormLabel>关注主题</FormLabel>
                    <FormControl>
                      <Select
                        surface="white"
                        value={field.state.value}
                        onValueChange={(v) => field.handleChange(v ?? 'registry')}
                        options={[
                          { value: 'registry', label: '私有 Registry 搭建' },
                          { value: 'ai', label: 'AI 智能体界面集成' },
                          { value: 'migration', label: '旧组件库平滑迁移' },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              </form.Field>
            </div>

            <FormSubmit variant="primary" className="w-full">
              确认预约时段
            </FormSubmit>
          </Form>
        )}
      </Tile>
    </div>
  )
}
