import * as React from 'react'
import { Eye, Plus, Trash } from '@phosphor-icons/react'
import { KpiStripCard } from '@/components/cards/kpi-strip-card'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  createGlazeColumnHelper,
  DataTable,
  type DataTableColumnDef,
} from '@/components/ui/data-table'
import { Dialog } from '@/components/ui/dialog'
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
import { Select } from '@/components/ui/select'
import { StatusPill } from '@/components/ui/status-pill'
import { useToast } from '@/components/ui/toast'
import type { Hue, Status } from '@/lib/tokens'

export interface ManagedRecord {
  id: string
  name: string
  team: string
  teamHue: Hue
  owner: string
  ownerInitials: string
  ownerHue: Hue
  amount: string
  statusKey: 'active' | 'review' | 'paused'
  statusLabel: string
  status: Status
  updatedAt: string
}

const INITIAL_RECORDS: ManagedRecord[] = [
  {
    id: 'ORD-2041',
    name: '华东边缘加速企业版',
    team: '基础设施',
    teamHue: 'sky',
    owner: '陈思远',
    ownerInitials: '陈',
    ownerHue: 'periwinkle',
    amount: '¥ 128,000',
    statusKey: 'active',
    statusLabel: '履约中',
    status: 'normal',
    updatedAt: '10 分钟前',
  },
  {
    id: 'ORD-2042',
    name: 'AI 智能客服坐席扩容',
    team: 'AI 产品',
    teamHue: 'lilac',
    owner: '林知夏',
    ownerInitials: '林',
    ownerHue: 'mint',
    amount: '¥ 86,500',
    statusKey: 'review',
    statusLabel: '待审批',
    status: 'warning',
    updatedAt: '42 分钟前',
  },
  {
    id: 'ORD-2043',
    name: '金融级多活容灾套餐',
    team: '金融客户',
    teamHue: 'peach',
    owner: '周明哲',
    ownerInitials: '周',
    ownerHue: 'aqua',
    amount: '¥ 340,000',
    statusKey: 'active',
    statusLabel: '履约中',
    status: 'normal',
    updatedAt: '2 小时前',
  },
  {
    id: 'ORD-2044',
    name: '私有化设计系统培训',
    team: '专业服务',
    teamHue: 'mint',
    owner: '许清禾',
    ownerInitials: '许',
    ownerHue: 'rose',
    amount: '¥ 45,000',
    statusKey: 'paused',
    statusLabel: '已暂缓',
    status: 'disabled',
    updatedAt: '昨天',
  },
  {
    id: 'ORD-2045',
    name: '实时可观测性日志归档',
    team: '基础设施',
    teamHue: 'sky',
    owner: '陆远',
    ownerInitials: '陆',
    ownerHue: 'sky',
    amount: '¥ 92,400',
    statusKey: 'active',
    statusLabel: '履约中',
    status: 'normal',
    updatedAt: '昨天',
  },
]

const col = createGlazeColumnHelper<ManagedRecord>()

export function DataManagementBlock() {
  const toast = useToast()
  const [records, setRecords] = React.useState<ManagedRecord[]>(INITIAL_RECORDS)
  const [inspectRow, setInspectRow] = React.useState<ManagedRecord | null>(null)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [deleteTarget, setDeleteTarget] = React.useState<ManagedRecord | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      team: '基础设施',
      owner: '林知夏',
      amount: '¥ 60,000',
    },
    onSubmit: async ({ value }) => {
      const next: ManagedRecord = {
        id: `ORD-${2046 + records.length}`,
        name: value.name,
        team: value.team,
        teamHue: value.team === 'AI 产品' ? 'lilac' : value.team === '金融客户' ? 'peach' : 'sky',
        owner: value.owner,
        ownerInitials: value.owner.slice(0, 1),
        ownerHue: 'periwinkle',
        amount: value.amount,
        statusKey: 'review',
        statusLabel: '待审批',
        status: 'warning',
        updatedAt: '刚刚',
      }
      setRecords((prev) => [next, ...prev])
      setCreateOpen(false)
      form.reset()
      toast({ title: '新建记录成功', description: `${next.id} · ${next.name}`, status: 'normal' })
    },
  })

  const columns = React.useMemo(
    () =>
      [
        col.accessor('id', {
          header: '编号',
          meta: { label: '编号' },
          cell: (c) => (
            <span className="font-glaze-mono text-[12px] font-bold text-[#4A4FB8]">
              {c.getValue()}
            </span>
          ),
        }),
        col.accessor('name', {
          header: '项目名称',
          meta: { label: '项目名称' },
          cell: (c) => <span className="font-semibold text-[#1B1F27]">{c.getValue()}</span>,
        }),
        col.accessor('team', {
          header: '归属团队',
          meta: { label: '归属团队' },
          cell: (c) => <HueTag hue={c.row.original.teamHue}>{c.getValue()}</HueTag>,
        }),
        col.accessor('owner', {
          header: '负责人',
          meta: { label: '负责人' },
          cell: (c) => (
            <span className="inline-flex items-center gap-2">
              <Avatar
                fallback={c.row.original.ownerInitials}
                hue={c.row.original.ownerHue}
                size="xs"
                ringWidth={0}
              />
              <span>{c.getValue()}</span>
            </span>
          ),
        }),
        col.accessor('amount', {
          header: '合同金额',
          meta: { label: '合同金额', align: 'right', numeric: true },
          cell: (c) => <span className="font-glaze-mono font-bold">{c.getValue()}</span>,
        }),
        col.accessor('statusKey', {
          header: '状态',
          meta: { label: '状态' },
          filterFn: 'equalsString',
          cell: (c) => (
            <StatusPill status={c.row.original.status} size="sm">
              {c.row.original.statusLabel}
            </StatusPill>
          ),
        }),
        col.display({
          id: 'actions',
          header: '操作',
          meta: { label: '操作', align: 'right', headerClassName: 'w-32', cellClassName: 'w-32' },
          cell: (c) => (
            <div className="flex items-center justify-end gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setInspectRow(c.row.original)}
              >
                <Eye size={14} />
                <span>详情</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label="删除记录"
                onClick={() => setDeleteTarget(c.row.original)}
              >
                <Trash size={14} className="text-[#C83D2B]" />
              </Button>
            </div>
          ),
        }),
      ] as DataTableColumnDef<ManagedRecord, unknown>[],
    [],
  )

  return (
    <section className="flex flex-col gap-4">
      <KpiStripCard
        tone="white"
        metrics={[
          { label: '记录总数', value: String(records.length), delta: '实时同步', status: 'info', sub: '当前台账' },
          {
            label: '履约中',
            value: String(records.filter((r) => r.statusKey === 'active').length),
            delta: '+14%',
            status: 'normal',
            sub: '健康履约',
          },
          {
            label: '待审批',
            value: String(records.filter((r) => r.statusKey === 'review').length),
            delta: '需关注',
            status: 'warning',
            sub: '等待复核',
          },
          { label: '签约总额', value: '¥69.2万', delta: '+22.5%', status: 'normal', sub: '本季度累计' },
        ]}
      />

      <DataTable
        title="合同与订单台账"
        data={records}
        columns={columns}
        searchable
        searchPlaceholder="搜索编号、项目或负责人…"
        enableRowSelection
        enableColumnVisibility
        enableDensityToggle
        facetFilter={{
          columnId: 'statusKey',
          allLabel: '全部状态',
          options: [
            { value: 'active', label: '履约中' },
            { value: 'review', label: '待审批' },
            { value: 'paused', label: '已暂缓' },
          ],
        }}
        toolbarActions={
          <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>
            <Plus size={14} weight="bold" />
            <span>新建订单</span>
          </Button>
        }
      />

      <Drawer
        open={Boolean(inspectRow)}
        onOpenChange={(open) => !open && setInspectRow(null)}
        side="right"
        title={inspectRow ? `${inspectRow.id} · ${inspectRow.name}` : ''}
        description="合同主体信息与履约状态详情"
      >
        {inspectRow && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-inner bg-[#F6F7F9] p-4">
              <div>
                <div className="text-[12px] text-[#6B7280]">合同金额</div>
                <div className="mt-1 font-glaze-display text-[26px] font-extrabold text-[#123A5C]">
                  {inspectRow.amount}
                </div>
              </div>
              <StatusPill status={inspectRow.status} label={inspectRow.statusLabel} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div className="rounded-inner bg-[#F6F7F9] p-3.5">
                <div className="text-[#6B7280]">负责人</div>
                <div className="mt-1 font-bold text-[#1B1F27]">{inspectRow.owner}</div>
              </div>
              <div className="rounded-inner bg-[#F6F7F9] p-3.5">
                <div className="text-[#6B7280]">归属团队</div>
                <div className="mt-1 font-bold text-[#1B1F27]">{inspectRow.team}</div>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => {
                setRecords((prev) =>
                  prev.map((r) =>
                    r.id === inspectRow.id
                      ? { ...r, statusKey: 'active', statusLabel: '履约中', status: 'normal', updatedAt: '刚刚' }
                      : r,
                  ),
                )
                setInspectRow(null)
                toast({ title: '已审批通过并转为履约中', status: 'normal' })
              }}
            >
              批准并推进至履约中
            </Button>
          </div>
        )}
      </Drawer>

      <Dialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="新建订单记录"
        description="提交后将自动写入当前数据台账"
      >
        <Form form={form} className="flex flex-col gap-4">
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => (!value.trim() ? '请填写项目名称' : undefined),
            }}
          >
            {(field) => (
              <FormItem field={field}>
                <FormLabel required>项目名称</FormLabel>
                <FormControl>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="例如：华南区专享集群部署"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </form.Field>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <form.Field name="team">
              {(field) => (
                <FormItem field={field}>
                  <FormLabel>归属团队</FormLabel>
                  <FormControl>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v ?? '基础设施')}
                      options={[
                        { value: '基础设施', label: '基础设施' },
                        { value: 'AI 产品', label: 'AI 产品' },
                        { value: '金融客户', label: '金融客户' },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            </form.Field>

            <form.Field name="amount">
              {(field) => (
                <FormItem field={field}>
                  <FormLabel>合同金额</FormLabel>
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

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <FormSubmit variant="primary">确认创建</FormSubmit>
          </div>
        </Form>
      </Dialog>

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="确认移除该记录？"
        description={
          deleteTarget
            ? `移除 ${deleteTarget.id}（${deleteTarget.name}）后将无法恢复，请谨慎操作。`
            : ''
        }
        confirmLabel="确认移除"
        cancelLabel="保留"
        danger
        onConfirm={() => {
          if (!deleteTarget) return
          setRecords((prev) => prev.filter((r) => r.id !== deleteTarget.id))
          toast({ title: `已移除 ${deleteTarget.id}`, status: 'warning' })
          setDeleteTarget(null)
        }}
      />
    </section>
  )
}
