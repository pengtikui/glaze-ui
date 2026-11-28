import * as React from 'react'
import { Avatar } from '@/components/ui/avatar'
import {
  createGlazeColumnHelper,
  DataTable,
  type DataTableColumnDef,
} from '@/components/ui/data-table'
import { HueTag } from '@/components/ui/hue-tag'
import { Progress } from '@/components/ui/progress'
import { StatusPill } from '@/components/ui/status-pill'
import type { Hue, Status, TileTone } from '@/lib/tokens'

export type TaskFilterState = 'all' | 'doing' | 'done' | 'risk' | 'todo'

export interface DataTableRow {
  id: string
  name: string
  group: string
  groupHue: Hue
  owner: string
  ownerAvatar: string
  ownerHue: Hue
  progress: number
  stateKey: Exclude<TaskFilterState, 'all'>
  stateLabel: string
  status: Status
  updatedAt: string
}

export interface DataTableCardProps {
  title: string
  rows: DataTableRow[]
  filterOptions?: { value: TaskFilterState; label: string }[]
  tone?: TileTone
  headerAction?: React.ReactNode
}

const columnHelper = createGlazeColumnHelper<DataTableRow>()

export function DataTableCard({
  title,
  rows,
  filterOptions = [
    { value: 'all', label: '全部' },
    { value: 'doing', label: '进行中' },
    { value: 'done', label: '已完成' },
  ],
  tone = 'white',
  headerAction,
}: DataTableCardProps) {
  const columns = React.useMemo(
    () =>
      [
        columnHelper.accessor('name', {
          header: '名称',
          meta: { label: '名称' },
          cell: (ctx) => <span className="font-semibold text-[#1B1F27]">{ctx.getValue()}</span>,
        }),
        columnHelper.accessor('group', {
          header: '分组',
          meta: { label: '分组' },
          cell: (ctx) => (
            <HueTag hue={ctx.row.original.groupHue}>{ctx.getValue()}</HueTag>
          ),
        }),
        columnHelper.accessor('owner', {
          header: '负责人',
          meta: { label: '负责人' },
          cell: (ctx) => (
            <span className="inline-flex items-center gap-2">
              <Avatar
                fallback={ctx.row.original.ownerAvatar}
                hue={ctx.row.original.ownerHue}
                size="xs"
                ringWidth={0}
              />
              <span>{ctx.getValue()}</span>
            </span>
          ),
        }),
        columnHelper.accessor('progress', {
          header: '进度',
          meta: { label: '进度', numeric: true },
          cell: (ctx) => (
            <span className="flex min-w-36 items-center gap-2.5">
              <Progress
                value={ctx.getValue()}
                hue="periwinkle"
                height="sm"
                className="flex-1"
              />
              <span className="w-9 text-right text-[13px] tabular-nums text-[#5B6170]">
                {ctx.getValue()}%
              </span>
            </span>
          ),
        }),
        columnHelper.accessor('stateKey', {
          header: '状态',
          meta: { label: '状态' },
          filterFn: 'equalsString',
          cell: (ctx) => (
            <StatusPill status={ctx.row.original.status}>
              {ctx.row.original.stateLabel}
            </StatusPill>
          ),
        }),
        columnHelper.accessor('updatedAt', {
          header: '更新时间',
          meta: { label: '更新时间', align: 'right' },
          cell: (ctx) => <span className="text-[#6B7280]">{ctx.getValue()}</span>,
        }),
      ] as DataTableColumnDef<DataTableRow, unknown>[],
    [],
  )

  return (
    <div className="glaze-size-f min-w-0">
      <DataTable
        title={title}
        data={rows}
        columns={columns}
        tone={tone}
        searchable
        searchPlaceholder={`搜索 ${title}…`}
        facetFilter={{
          columnId: 'stateKey',
          allLabel: filterOptions.find((o) => o.value === 'all')?.label ?? '全部',
          options: filterOptions
            .filter((o) => o.value !== 'all')
            .map((o) => ({ value: o.value, label: o.label })),
        }}
        enableColumnVisibility
        enableDensityToggle
        enablePagination={rows.length > 6}
        defaultPageSize={6}
        toolbarActions={headerAction}
      />
    </div>
  )
}
