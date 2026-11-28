import * as React from 'react'
import { Plus } from '@phosphor-icons/react'
import { AlertBannerCard } from '@/components/cards/alert-banner-card'
import { CalendarCard } from '@/components/cards/calendar-card'
import { ChecklistCard } from '@/components/cards/checklist-card'
import { CodeDeployCard } from '@/components/cards/code-deploy-card'
import { DataTableCard, type DataTableRow } from '@/components/cards/data-table-card'
import { EventTimelineCard } from '@/components/cards/event-timeline-card'
import { GanttScheduleCard } from '@/components/cards/gantt-schedule-card'
import { HeatmapCard } from '@/components/cards/heatmap-card'
import { HeroMetricCard } from '@/components/cards/hero-metric-card'
import { KanbanMiniCard } from '@/components/cards/kanban-mini-card'
import { MembersCard } from '@/components/cards/members-card'
import { PhaseTimelineCard } from '@/components/cards/phase-timeline-card'
import { RingCard } from '@/components/cards/ring-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Grid } from '@/components/ui/grid'
import { Input } from '@/components/ui/input'
import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'
import { Select } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/components/ui/toast'
import type { Hue, Status } from '@/lib/tokens'

const INITIAL_TASKS: DataTableRow[] = [
  {
    id: 't1',
    name: 'Design Token 体系定稿',
    group: '设计',
    groupHue: 'lilac',
    owner: '周舟',
    ownerAvatar: '周',
    ownerHue: 'aqua',
    progress: 100,
    stateKey: 'done',
    stateLabel: '已完成',
    status: 'normal',
    updatedAt: '11月20日',
  },
  {
    id: 't2',
    name: 'Base UI 单文件拆分与动效统一',
    group: '工程',
    groupHue: 'sky',
    owner: '林一',
    ownerAvatar: '林',
    ownerHue: 'rose',
    progress: 92,
    stateKey: 'doing',
    stateLabel: '进行中',
    status: 'info',
    updatedAt: '今天 10:20',
  },
  {
    id: 't3',
    name: '大表格虚拟滚动性能回归',
    group: '工程',
    groupHue: 'sky',
    owner: '陈晨',
    ownerAvatar: '陈',
    ownerHue: 'lemon',
    progress: 45,
    stateKey: 'risk',
    stateLabel: '有风险',
    status: 'error',
    updatedAt: '今天 09:05',
  },
  {
    id: 't4',
    name: '100 种卡片模块文档与示例',
    group: '文档',
    groupHue: 'mint',
    owner: '吴越',
    ownerAvatar: '吴',
    ownerHue: 'peach',
    progress: 80,
    stateKey: 'doing',
    stateLabel: '进行中',
    status: 'info',
    updatedAt: '昨天',
  },
  {
    id: 't5',
    name: 'Design System 2.0 正式发布',
    group: '发布',
    groupHue: 'coral',
    owner: '周舟',
    ownerAvatar: '周',
    ownerHue: 'aqua',
    progress: 20,
    stateKey: 'todo',
    stateLabel: '筹备中',
    status: 'disabled',
    updatedAt: '计划中',
  },
]

export function WorkspaceDemoPage() {
  const toast = useToast()
  const [tasks, setTasks] = React.useState<DataTableRow[]>(INITIAL_TASKS)
  const [sprint, setSprint] = React.useState('sprint-24')
  const [createOpen, setCreateOpen] = React.useState(false)
  const [taskName, setTaskName] = React.useState('')
  const [taskGroup, setTaskGroup] = React.useState<'设计' | '工程' | '文档' | '发布'>('工程')
  const [taskState, setTaskState] = React.useState<'doing' | 'done' | 'risk'>('doing')
  const [taskProgress, setTaskProgress] = React.useState(60)

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskName.trim()) return
    const groupHueMap: Record<typeof taskGroup, Hue> = {
      设计: 'lilac',
      工程: 'sky',
      文档: 'mint',
      发布: 'coral',
    }
    const statusMap: Record<typeof taskState, { label: string; status: Status }> = {
      doing: { label: '进行中', status: 'info' },
      done: { label: '已完成', status: 'normal' },
      risk: { label: '有风险', status: 'error' },
    }
    const row: DataTableRow = {
      id: `t-${Date.now()}`,
      name: taskName.trim(),
      group: taskGroup,
      groupHue: groupHueMap[taskGroup],
      owner: '林一',
      ownerAvatar: '林',
      ownerHue: 'rose',
      progress: taskState === 'done' ? 100 : taskProgress,
      stateKey: taskState,
      stateLabel: statusMap[taskState].label,
      status: statusMap[taskState].status,
      updatedAt: '刚刚',
    }
    setTasks((prev) => [row, ...prev])
    setTaskName('')
    setCreateOpen(false)
    toast({ title: '已新增迭代任务', description: row.name, status: 'normal' })
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
            DEMO 02 · SPRINT WORKSPACE · 研发协作工作台
          </span>
          <h1 className="m-0 font-glaze-display text-[36px] sm:text-[40px] leading-11 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            Q4 设计系统 2.0 冲刺看板
          </h1>
          <p className="m-0 text-[15px] text-[#5B6170]">
            共 {tasks.length} 项核心交付物 · 距离发版还有 6 个工作日
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-45">
            <Select
              surface="white"
              value={sprint}
              onValueChange={setSprint}
              options={[
                { value: 'sprint-24', label: 'Sprint 24 (当前)' },
                { value: 'sprint-23', label: 'Sprint 23 (已归档)' },
                { value: 'sprint-25', label: 'Sprint 25 (规划中)' },
              ]}
            />
          </div>

          <Dialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            trigger={
              <Button variant="primary">
                <Plus size={16} weight="bold" />
                新建迭代任务
              </Button>
            }
            title="新建迭代任务"
            description="提交后立即写入下方数据表格"
            footer={
              <>
                <DialogClose render={<Button variant="secondary">取消</Button>} />
                <Button variant="primary" type="submit" form="create-task-form">
                  确认创建
                </Button>
              </>
            }
          >
            <form id="create-task-form" onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>任务名称</FieldLabel>
                <Input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="例如：编写无障碍键盘测试"
                  required
                />
              </Field>
              <Field>
                <FieldLabel>所属分组</FieldLabel>
                <Select
                  value={taskGroup}
                  onValueChange={(v) => setTaskGroup(v as typeof taskGroup)}
                  options={[
                    { value: '工程', label: '工程' },
                    { value: '设计', label: '设计' },
                    { value: '文档', label: '文档' },
                    { value: '发布', label: '发布' },
                  ]}
                />
              </Field>
              <RadioGroup
                value={taskState}
                onValueChange={(v) => setTaskState(v as typeof taskState)}
                className="grid grid-cols-3 gap-2"
              >
                <Radio card value="doing" label="进行中" />
                <Radio card value="done" label="已完成" />
                <Radio card value="risk" label="有风险" />
              </RadioGroup>
              <Slider
                label="初始完成度"
                value={taskProgress}
                onValueChange={(v) => setTaskProgress(typeof v === 'number' ? v : v[0])}
                unit="%"
                hue="periwinkle"
              />
            </form>
          </Dialog>
        </div>
      </header>

      <Grid>
        <HeroMetricCard
          tone="sky-dark"
          label="当前迭代燃尽完成率"
          value="78.4%"
          delta="+6.2% 今日推进"
          subMetrics={[
            { label: '已完成点', value: '64 SP' },
            { label: '剩余点', value: '18 SP' },
            { label: '交付日', value: '12/03' },
          ]}
        />
        <RingCard
          tone="mint"
          label="组件测试覆盖"
          numerator={48}
          denominator={48}
          description="全部通过类型与视觉检查"
        />
        <MembersCard
          tone="white"
          label="核心协作成员"
          countLabel="8 人协作"
          members={[
            { label: '周', hue: 'aqua' },
            { label: '林', hue: 'rose' },
            { label: '陈', hue: 'lemon' },
            { label: '吴', hue: 'peach' },
          ]}
          description="今日 6 人活跃提交"
        />

        <AlertBannerCard
          tone="coral"
          title="1 项阻塞风险需今日同步"
          description="大表格虚拟滚动回归存在边界高度抖动，建议下午 15:00 结对排查。"
          actionLabel="标记跟进"
          onAction={() => toast({ title: '已指派排查', description: '已通知陈晨与林一', status: 'warning' })}
        />
        <KanbanMiniCard
          tone="white"
          title="研发冲刺看板"
          columns={[
            {
              name: '开发中',
              hue: 'sky',
              cards: [
                { title: '100 卡片模块文档整理', tag: '文档', owner: '吴越' },
                { title: '暗色卡片对比度复检', tag: '设计', owner: '周舟' },
              ],
            },
            {
              name: '待合并 PR',
              hue: 'mint',
              cards: [
                { title: '统一浮层弹出与退场动效', tag: 'UI', owner: '林一' },
                { title: 'Toast 3D 堆叠动画', tag: 'Motion', owner: '林一' },
              ],
            },
          ]}
        />

        <CodeDeployCard
          tone="white"
          repo="design-system-web"
          branch="feat/unified-motion"
          commit="a8f31c2"
          duration="42s"
          status="normal"
          statusLabel="预览环境已部署"
        />

        <HeatmapCard tone="white" title="近 12 周代码提交热力图" />

        <CalendarCard
          tone="lilac"
          initialYear={2026}
          initialMonth={11}
          todayDay={27}
          eventDays={[5, 12, 18, 20, 27, 29]}
        />

        <EventTimelineCard
          tone="white"
          title="今日交付动态"
          events={[
            { time: '14:20', text: '合并 PR #142 单文件组件架构', status: 'normal' },
            { time: '11:45', text: '完成 6 套全场景 Demo 评审', status: 'info' },
            { time: '09:30', text: 'CI 发现 1 处表格边界回归', status: 'warning' },
            { time: '昨天', text: '发布 CSS 优先分级动效规范', status: 'normal' },
          ]}
        />

        <ChecklistCard
          tone="white"
          title="发版前检查清单"
          items={[
            { id: 'c1', label: '全量组件 TypeScript 类型检查', checked: true, tag: 'CI', hue: 'mint' },
            { id: 'c2', label: '浮层开关与键盘焦点回归', checked: true, tag: 'A11y', hue: 'sky' },
            { id: 'c3', label: '暗色聚焦卡片对比度复核', checked: true, tag: '视觉', hue: 'lilac' },
            { id: 'c4', label: '大表格滚动性能压测', checked: false, tag: '性能', hue: 'coral' },
            { id: 'c5', label: '更新发版变更日志与文档', checked: false, tag: '文档', hue: 'peach' },
          ]}
        />

        <PhaseTimelineCard
          tone="white"
          title="2.0 版本里程碑阶段"
          subtitle="计划 12 月 3 日全量发布"
          phases={[
            { name: 'Token 定稿', date: '11/05', state: 'done' },
            { name: '39 原语拆分', date: '11/16', state: 'done' },
            { name: '100 卡片与 6 Demo', date: '11/27', state: 'cur' },
            { name: '正式发布', date: '12/03', state: 'todo' },
          ]}
        />

        <GanttScheduleCard
          tone="white"
          title="跨职能排期甘特图"
          weeks={['W1', 'W2', 'W3', 'W4', 'W5']}
          lanes={[
            { name: '视觉 Token 与动效规范', owner: '周舟', startPct: 0, widthPct: 35, hue: 'lilac' },
            { name: 'Base UI 单文件组件重构', owner: '林一', startPct: 20, widthPct: 45, hue: 'sky' },
            { name: '100 业务卡片与 6 Demo', owner: '林一 · 吴越', startPct: 50, widthPct: 38, hue: 'mint' },
            { name: '全链路验收与发版', owner: '全员', startPct: 80, widthPct: 20, hue: 'peach' },
          ]}
        />

        <DataTableCard tone="white" title="全部迭代交付物清单" rows={tasks} />
      </Grid>
    </div>
  )
}
