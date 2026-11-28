import * as React from 'react'
import {
  Archive,
  EnvelopeSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  PencilSimpleLine,
  Star,
  Tag,
  Trash,
  Tray,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { StatusPill } from '@/components/ui/status-pill'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import type { Hue } from '@/lib/tokens'

type MailboxFolder = 'inbox' | 'starred' | 'sent' | 'archive'

interface MailItem {
  id: string
  folder: MailboxFolder
  sender: string
  email: string
  initials: string
  hue: Hue
  subject: string
  preview: string
  body: string
  time: string
  label: string
  labelHue: Hue
  unread: boolean
  starred: boolean
}

const INITIAL_MAILS: MailItem[] = [
  {
    id: 'm1',
    folder: 'inbox',
    sender: '陈思远',
    email: 'chen@glaze.design',
    initials: '陈',
    hue: 'sky',
    subject: 'Glaze v2.1 Cards & Blocks 架构评审纪要',
    preview: '所有 119 张卡片与 10 个通用业务 Block 已同步至 Registry，建议明天上午发布…',
    body: '团队好：\n\n本次架构调整已经完成以下核心目标：\n1. 卡片正式独立为 /cards 维度，与基础组件平级并按 7 大业务域重新归类；\n2. 新增 10 个参考 shadcn 理念封装的复合业务 Blocks（认证、KPI 总览、数据管理、预约、分栏收件箱等）；\n3. 新增 5 个完全不同交互形态的完整业务页面。\n\n如无其他意见，明天上午 10:00 正式发布 v2.1。',
    time: '10:42',
    label: '产品发布',
    labelHue: 'periwinkle',
    unread: true,
    starred: true,
  },
  {
    id: 'm2',
    folder: 'inbox',
    sender: '林知夏',
    email: 'lin@glaze.design',
    initials: '林',
    hue: 'mint',
    subject: '企业客户私有化 Registry 接入答疑',
    preview: '金融客户团队询问如何在内网环境通过 REGISTRY_DEP_MODE=url 进行零配置分发…',
    body: 'Hi 大家，\n\n华东某银行研发平台团队正在评估 Glaze UI，他们希望在内网 Nginx 静态托管 public/r/*.json。我已经把 REGISTRY_BASE_URL 与直链构建方案发给对方，预计本周五安排一次 30 分钟的架构演示。',
    time: '09:18',
    label: '客户支持',
    labelHue: 'mint',
    unread: true,
    starred: false,
  },
  {
    id: 'm3',
    folder: 'inbox',
    sender: '周明哲',
    email: 'zhou@glaze.design',
    initials: '周',
    hue: 'peach',
    subject: '亚太边缘集群 P99 延迟优化周报',
    preview: '切换 HTTP/3 QUIC 与连接池复用后，上海/新加坡链路 P99 由 26ms 降至 18ms…',
    body: '本周完成了三地多活边缘网关的协议栈升级：\n- P99 响应耗时：26ms → 18ms（下降 30.7%）\n- 峰值吞吐容量：提升至 62k req/s\n- 证书自动续签覆盖率：100%',
    time: '昨天',
    label: '基础设施',
    labelHue: 'peach',
    unread: false,
    starred: true,
  },
  {
    id: 'm4',
    folder: 'sent',
    sender: '我 → 许清禾',
    email: 'xu@glaze.design',
    initials: '我',
    hue: 'lilac',
    subject: 'Re: Q4 订阅账单与席位扩容确认',
    preview: '已核对 12 家年度企业客户的 8 折账单，财务可以直接触发自动开票流程。',
    body: '清禾，\n\n账单核对完全一致，已同步更新至 CRM 合同台账，可以直接进入开票流程。',
    time: '周三',
    label: '财务账单',
    labelHue: 'lilac',
    unread: false,
    starred: false,
  },
  {
    id: 'm5',
    folder: 'archive',
    sender: 'GitHub Actions',
    email: 'bot@github.com',
    initials: 'CI',
    hue: 'aqua',
    subject: '[glaze-ui] Production Astro Build #418 Passed',
    preview: 'Build succeeded in 18.4s · 0 TypeScript errors · 212 static routes generated.',
    body: 'Deployment preview is live and all static registry JSON files passed schema validation.',
    time: '11 月 24 日',
    label: '自动化',
    labelHue: 'aqua',
    unread: false,
    starred: false,
  },
]

export function MailDeskPage() {
  const toast = useToast()
  const [mails, setMails] = React.useState<MailItem[]>(INITIAL_MAILS)
  const [folder, setFolder] = React.useState<MailboxFolder>('inbox')
  const [query, setQuery] = React.useState('')
  const [selectedId, setSelectedId] = React.useState(INITIAL_MAILS[0].id)
  const [replyText, setReplyText] = React.useState('')
  const [composeOpen, setComposeOpen] = React.useState(false)

  const composeForm = useForm({
    defaultValues: { to: '', subject: '', body: '' },
    onSubmit: async ({ value }) => {
      const next: MailItem = {
        id: `m-${Date.now()}`,
        folder: 'sent',
        sender: `我 → ${value.to}`,
        email: value.to,
        initials: '我',
        hue: 'periwinkle',
        subject: value.subject,
        preview: value.body.slice(0, 60),
        body: value.body,
        time: '刚刚',
        label: '已发送',
        labelHue: 'sky',
        unread: false,
        starred: false,
      }
      setMails((prev) => [next, ...prev])
      setComposeOpen(false)
      composeForm.reset()
      toast({ title: '邮件已发送', description: value.subject, status: 'normal' })
    },
  })

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return mails.filter((m) => {
      if (folder === 'starred') {
        if (!m.starred) return false
      } else if (m.folder !== folder) {
        return false
      }
      if (q && !`${m.sender} ${m.subject} ${m.preview}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [mails, folder, query])

  const activeMail = mails.find((m) => m.id === selectedId) ?? filtered[0] ?? null

  const unreadInboxCount = mails.filter((m) => m.folder === 'inbox' && m.unread).length
  const starredCount = mails.filter((m) => m.starred).length

  return (
    <div className="h-screen overflow-hidden bg-[#F2F4F8] text-[#1B1F27]">
      <SidebarProvider defaultOpen variant="sidebar" className="h-full min-h-0">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="gap-3 p-3.5">
            <div className="flex items-center gap-2.5 px-1 group-data-[collapsible=icon]/sidebar:justify-center group-data-[collapsible=icon]/sidebar:px-0">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#123A5C] text-white">
                <EnvelopeSimple size={17} weight="fill" />
              </span>
              <div className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
                <div className="truncate font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
                  Glaze Mail
                </div>
                <div className="truncate text-[11px] text-[#6B7280]">desk@glaze.design</div>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              aria-label="写新邮件"
              className="w-full group-data-[collapsible=icon]/sidebar:mx-auto group-data-[collapsible=icon]/sidebar:h-10 group-data-[collapsible=icon]/sidebar:w-10 group-data-[collapsible=icon]/sidebar:px-0"
              onClick={() => setComposeOpen(true)}
            >
              <PencilSimpleLine size={15} weight="bold" />
              <span className="group-data-[collapsible=icon]/sidebar:hidden">写新邮件</span>
            </Button>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>邮箱目录</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {(
                    [
                      { id: 'inbox', label: '收件箱', icon: Tray, badge: unreadInboxCount },
                      { id: 'starred', label: '已标星', icon: Star, badge: starredCount },
                      { id: 'sent', label: '已发送', icon: PaperPlaneTilt, badge: 0 },
                      { id: 'archive', label: '已归档', icon: Archive, badge: 0 },
                    ] as const
                  ).map((item) => {
                    const Icon = item.icon
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={folder === item.id}
                          tooltip={item.label}
                          icon={<Icon size={17} weight={folder === item.id ? 'fill' : 'regular'} />}
                          trailing={
                            item.badge > 0 ? (
                              <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                            ) : undefined
                          }
                          onClick={() => setFolder(item.id)}
                        >
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>分类标签</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    { name: '产品发布', color: '#7B80EA' },
                    { name: '客户支持', color: '#2FA79B' },
                    { name: '基础设施', color: '#E3A33B' },
                  ].map((tag) => (
                    <SidebarMenuItem key={tag.name}>
                      <SidebarMenuButton
                        tooltip={tag.name}
                        icon={<Tag size={16} style={{ color: tag.color }} weight="fill" />}
                        onClick={() => setQuery(tag.name)}
                      >
                        {tag.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-3">
            <div className="flex items-center gap-2.5 rounded-inner bg-[#F6F7F9] p-2.5 group-data-[collapsible=icon]/sidebar:justify-center group-data-[collapsible=icon]/sidebar:bg-transparent group-data-[collapsible=icon]/sidebar:p-0">
              <Avatar fallback="林" hue="periwinkle" size="sm" />
              <div className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
                <div className="truncate text-[13px] font-bold text-[#1B1F27]">林知夏</div>
                <div className="truncate text-[11px] text-[#6B7280]">在线 · 值班中</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F2F4F8]">
          <header className="flex h-15 shrink-0 items-center justify-between gap-3 border-b border-[#E5E8EE] bg-[#F2F4F8] px-4">
            <div className="flex items-center gap-2.5">
              <SidebarTrigger />
              <span className="font-glaze-display text-[17px] font-extrabold text-[#123A5C]">
                邮件与工单分栏工作台
              </span>
              <StatusPill status="normal" label="实时同步" size="sm" />
            </div>

            <div className="w-64 sm:w-80">
              <Input
                surface="white"
                inputSize="sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索发件人、主题或标签…"
                leadingIcon={<MagnifyingGlass size={15} />}
              />
            </div>
          </header>

          <div className="min-h-0 flex-1 p-4">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel defaultSize="38%" minSize="26%">
                <div className="flex h-full flex-col rounded-tile bg-white p-3">
                  <div className="flex items-center justify-between px-2 pb-2.5">
                    <span className="text-[12px] font-bold text-[#6B7280]">
                      共 {filtered.length} 封会话
                    </span>
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="cursor-pointer border-0 bg-transparent p-0 text-[12px] font-semibold text-[#4A4FB8]"
                      >
                        清除筛选
                      </button>
                    )}
                  </div>
                  <ScrollArea className="min-h-0 flex-1 pr-1">
                    <div className="flex flex-col gap-1.5">
                      {filtered.map((m) => {
                        const isSelected = activeMail?.id === m.id
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedId(m.id)
                              setMails((prev) =>
                                prev.map((item) =>
                                  item.id === m.id ? { ...item, unread: false } : item,
                                ),
                              )
                            }}
                            className={cn(
                              'flex w-full cursor-pointer flex-col gap-1.5 rounded-inner border-0 p-3.5 text-left transition-colors',
                              isSelected ? 'bg-[#E4E6FD]/55' : 'bg-transparent hover:bg-[#F6F7F9]',
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Avatar fallback={m.initials} hue={m.hue} size="xs" />
                                <span className="text-[13px] font-bold text-[#1B1F27]">
                                  {m.sender}
                                </span>
                                {m.unread && (
                                  <span className="h-2 w-2 rounded-full bg-[#4A9BD8]" />
                                )}
                              </div>
                              <span className="text-[11px] text-[#8A90A0]">{m.time}</span>
                            </div>
                            <div className="truncate text-[13.5px] font-bold text-[#123A5C]">
                              {m.subject}
                            </div>
                            <div className="line-clamp-2 text-[12px] text-[#6B7280]">
                              {m.preview}
                            </div>
                            <div className="pt-0.5">
                              <HueTag hue={m.labelHue} size="xs">
                                {m.label}
                              </HueTag>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle variant="gap" hue="periwinkle" />

              <ResizablePanel defaultSize="62%" minSize="38%">
                {activeMail ? (
                  <div className="flex h-full flex-col justify-between gap-4 rounded-tile bg-white p-6">
                    <div className="flex min-h-0 flex-1 flex-col gap-4">
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#EEF0F3] pb-4">
                        <div className="flex items-center gap-3">
                          <Avatar fallback={activeMail.initials} hue={activeMail.hue} size="md" />
                          <div>
                            <h1 className="m-0 font-glaze-display text-[20px] font-extrabold text-[#123A5C]">
                              {activeMail.subject}
                            </h1>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-[#6B7280]">
                              <span className="font-semibold text-[#1B1F27]">
                                {activeMail.sender}
                              </span>
                              <span>&lt;{activeMail.email}&gt;</span>
                              <span>·</span>
                              <span>{activeMail.time}</span>
                              <HueTag hue={activeMail.labelHue} size="xs">
                                {activeMail.label}
                              </HueTag>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Button
                            size="icon"
                            variant="secondary"
                            aria-label="切换星标"
                            onClick={() =>
                              setMails((prev) =>
                                prev.map((item) =>
                                  item.id === activeMail.id
                                    ? { ...item, starred: !item.starred }
                                    : item,
                                ),
                              )
                            }
                          >
                            <Star
                              size={16}
                              weight={activeMail.starred ? 'fill' : 'regular'}
                              className={activeMail.starred ? 'text-[#E3A33B]' : ''}
                            />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            aria-label="归档"
                            onClick={() => {
                              setMails((prev) =>
                                prev.map((item) =>
                                  item.id === activeMail.id ? { ...item, folder: 'archive' } : item,
                                ),
                              )
                              toast({ title: '已移至归档', status: 'info' })
                            }}
                          >
                            <Archive size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            aria-label="删除"
                            onClick={() => {
                              setMails((prev) => prev.filter((item) => item.id !== activeMail.id))
                              toast({ title: '已删除该邮件', status: 'warning' })
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>

                      <ScrollArea className="min-h-0 flex-1 pr-2">
                        <div className="rounded-inner bg-[#F6F7F9] p-5 text-[14px] leading-7 whitespace-pre-line text-[#1B1F27]">
                          {activeMail.body}
                        </div>
                      </ScrollArea>
                    </div>

                    <div className="flex flex-col gap-2.5 border-t border-[#EEF0F3] pt-4">
                      <Textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`回复 ${activeMail.sender}…`}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[#8A90A0]">
                          拖动中央分隔条可自由调节列表与阅读区宽度
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={!replyText.trim()}
                          onClick={() => {
                            toast({
                              title: `已回复 ${activeMail.sender}`,
                              description: replyText.trim(),
                              status: 'normal',
                            })
                            setReplyText('')
                          }}
                        >
                          <PaperPlaneTilt size={14} weight="fill" />
                          <span>发送回复</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-tile bg-white text-[14px] text-[#8A90A0]">
                    当前目录暂无会话
                  </div>
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Dialog
        open={composeOpen}
        onOpenChange={setComposeOpen}
        title="撰写新邮件"
        description="发送后将自动保存在已发送目录"
      >
        <Form form={composeForm} className="flex flex-col gap-4">
          <composeForm.Field
            name="to"
            validators={{
              onChange: ({ value }) => (!value.trim() ? '请填写收件人邮箱' : undefined),
            }}
          >
            {(field) => (
              <FormItem field={field}>
                <FormLabel required>收件人</FormLabel>
                <FormControl>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="teammate@glaze.design"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </composeForm.Field>

          <composeForm.Field
            name="subject"
            validators={{
              onChange: ({ value }) => (!value.trim() ? '请填写邮件主题' : undefined),
            }}
          >
            {(field) => (
              <FormItem field={field}>
                <FormLabel required>主题</FormLabel>
                <FormControl>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="输入邮件主题"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </composeForm.Field>

          <composeForm.Field name="body">
            {(field) => (
              <FormItem field={field}>
                <FormLabel>正文内容</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="编写正文…"
                  />
                </FormControl>
              </FormItem>
            )}
          </composeForm.Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setComposeOpen(false)}>
              取消
            </Button>
            <FormSubmit variant="primary">立即发送</FormSubmit>
          </div>
        </Form>
      </Dialog>
    </div>
  )
}
