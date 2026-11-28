import * as React from 'react'
import { Archive, MagnifyingGlass, PaperPlaneTilt, Star } from '@phosphor-icons/react'
import { cn } from 'cn'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { Textarea } from '@/components/ui/textarea'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'
import type { Hue } from '@/lib/tokens'

interface InboxThread {
  id: string
  sender: string
  initials: string
  hue: Hue
  subject: string
  preview: string
  body: string
  time: string
  tag: string
  tagHue: Hue
  unread: boolean
  starred: boolean
}

const INITIAL_THREADS: InboxThread[] = [
  {
    id: 't1',
    sender: '周明哲',
    initials: '周',
    hue: 'sky',
    subject: '华东边缘节点证书自动续签确认',
    preview: '所有 18 个接入点的 TLS 证书已完成预检，计划今晚 23:00 无感切换…',
    body: '团队好，\n\n所有 18 个华东边缘接入点的 TLS 证书已完成预检，自动化脚本已在金丝雀节点验证通过，计划今晚 23:00 零停机滚动切换。如有特殊窗口限制请直接回复本工单。',
    time: '10:24',
    tag: '运维告警',
    tagHue: 'sky',
    unread: true,
    starred: true,
  },
  {
    id: 't2',
    sender: '林知夏',
    initials: '林',
    hue: 'periwinkle',
    subject: 'Glaze v2.1 新卡片与 Blocks 走查反馈',
    preview: '刚完成了 CalendarCard 和 SplitCompareCard 的视觉验收，整体非常统一…',
    body: '刚完成了新版 Cards 目录与 Blocks 模块的视觉验收：圆角与画布反差非常克制，建议在预约区块补充时区提示，其它部分可以直接合并发布。',
    time: '09:15',
    tag: '设计评审',
    tagHue: 'periwinkle',
    unread: true,
    starred: false,
  },
  {
    id: 't3',
    sender: '许清禾',
    initials: '许',
    hue: 'mint',
    subject: 'Q4 企业版客户续约账单核对',
    preview: '附件已整理本月 12 家年度客户的扩容席位明细，请财务同学复核…',
    body: '本月共有 12 家企业客户完成了席位扩容，年付 8 折折算后的应收账单已同步至 CRM 订单台账，确认无误后将自动开票。',
    time: '昨天',
    tag: '客户支持',
    tagHue: 'mint',
    unread: false,
    starred: false,
  },
]

export function SplitInboxBlock() {
  const toast = useToast()
  const [threads, setThreads] = React.useState<InboxThread[]>(INITIAL_THREADS)
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'starred'>('all')
  const [query, setQuery] = React.useState('')
  const [activeId, setActiveId] = React.useState(INITIAL_THREADS[0].id)
  const [reply, setReply] = React.useState('')

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return threads.filter((t) => {
      if (filter === 'unread' && !t.unread) return false
      if (filter === 'starred' && !t.starred) return false
      if (q && !`${t.sender} ${t.subject} ${t.preview}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [threads, filter, query])

  const active = threads.find((t) => t.id === activeId) ?? visible[0] ?? null

  const toggleStar = (id: string) => {
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t)))
  }

  const sendReply = () => {
    if (!reply.trim() || !active) return
    toast({ title: `已回复 ${active.sender}`, description: reply.trim(), status: 'normal' })
    setReply('')
  }

  return (
    <Tile tone="white" className="h-[520px] p-4">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="40%" minSize="28%">
          <div className="flex h-full flex-col gap-3 rounded-inner bg-[#F6F7F9] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-glaze-display text-[16px] font-extrabold text-[#123A5C]">
                收件箱
              </span>
              <SegmentedControl
                size="sm"
                value={filter}
                onValueChange={setFilter}
                options={[
                  { value: 'all', label: '全部' },
                  { value: 'unread', label: '未读' },
                  { value: 'starred', label: '星标' },
                ]}
              />
            </div>

            <Input
              surface="white"
              inputSize="sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索发件人或主题…"
              leadingIcon={<MagnifyingGlass size={14} />}
            />

            <ScrollArea className="min-h-0 flex-1 pr-1">
              <div className="flex flex-col gap-2">
                {visible.map((t) => {
                  const isActive = active?.id === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setActiveId(t.id)
                        setThreads((prev) =>
                          prev.map((item) => (item.id === t.id ? { ...item, unread: false } : item)),
                        )
                      }}
                      className={cn(
                        'flex w-full cursor-pointer flex-col gap-1.5 rounded-[16px] border-0 p-3.5 text-left transition-colors',
                        isActive ? 'bg-white' : 'bg-transparent hover:bg-white/60',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar fallback={t.initials} hue={t.hue} size="xs" />
                          <span className="text-[13px] font-bold text-[#1B1F27]">{t.sender}</span>
                          {t.unread && <span className="h-2 w-2 rounded-full bg-[#4A9BD8]" />}
                        </div>
                        <span className="text-[11px] text-[#8A90A0]">{t.time}</span>
                      </div>
                      <div className="truncate text-[13px] font-semibold text-[#123A5C]">
                        {t.subject}
                      </div>
                      <div className="line-clamp-2 text-[12px] text-[#6B7280]">{t.preview}</div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle variant="gap" hue="periwinkle" />

        <ResizablePanel defaultSize="60%" minSize="38%">
          {active ? (
            <div className="flex h-full flex-col justify-between gap-4 rounded-inner bg-[#F6F7F9] p-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={active.initials} hue={active.hue} size="md" />
                    <div>
                      <h3 className="m-0 font-glaze-display text-[17px] font-extrabold text-[#123A5C]">
                        {active.subject}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[12px] text-[#6B7280]">
                        <span>{active.sender}</span>
                        <span>·</span>
                        <span>{active.time}</span>
                        <HueTag hue={active.tagHue} size="xs">
                          {active.tag}
                        </HueTag>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="icon"
                      variant="secondary"
                      aria-label="标星"
                      onClick={() => toggleStar(active.id)}
                    >
                      <Star
                        size={15}
                        weight={active.starred ? 'fill' : 'regular'}
                        className={active.starred ? 'text-[#E3A33B]' : ''}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      aria-label="归档"
                      onClick={() => toast({ title: '已归档当前会话', status: 'info' })}
                    >
                      <Archive size={15} />
                    </Button>
                  </div>
                </div>

                <div className="rounded-[18px] bg-white p-4 text-[13.5px] leading-relaxed whitespace-pre-line text-[#1B1F27]">
                  {active.body}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Textarea
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={`快速回复 ${active.sender}…`}
                  className="bg-white"
                />
                <div className="flex items-center justify-between">
                  <StatusPill status="normal" label="自动草稿已保存" size="sm" />
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!reply.trim()}
                    onClick={sendReply}
                  >
                    <PaperPlaneTilt size={14} weight="fill" />
                    <span>发送回复</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-inner bg-[#F6F7F9] text-[13px] text-[#8A90A0]">
              当前筛选条件下暂无消息
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </Tile>
  )
}
