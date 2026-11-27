import * as React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { HueTag } from '@/components/ui/hue-tag'
import { Progress } from '@/components/ui/progress'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
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
  const [filter, setFilter] = React.useState<TaskFilterState>('all')

  const filtered = React.useMemo(() => {
    if (filter === 'all') return rows
    return rows.filter((r) => r.stateKey === filter)
  }, [rows, filter])

  return (
    <Tile size="f" tone={tone} className="justify-start gap-4 py-6 px-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-glaze-display text-[22px] font-extrabold">
          {title}
        </span>
        <div className="flex items-center gap-3">
          <SegmentedControl
            value={filter}
            onValueChange={setFilter}
            options={filterOptions}
            ariaLabel={`${title}筛选`}
          />
          {headerAction}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-195 border-collapse text-[14px]">
          <thead>
            <tr className="text-left text-[12px] text-[#6B7280]">
              <th className="py-2.5 pr-3 font-semibold">名称</th>
              <th className="py-2.5 px-3 font-semibold">分组</th>
              <th className="py-2.5 px-3 font-semibold">负责人</th>
              <th className="py-2.5 px-3 font-semibold w-50">进度</th>
              <th className="py-2.5 px-3 font-semibold">状态</th>
              <th className="py-2.5 pl-3 font-semibold text-right">更新时间</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[#F2F3F5] hover:bg-[#F6F7F9]/60 transition-colors"
              >
                <td className="py-3.5 pr-3 font-semibold text-[#1B1F27]">
                  {row.name}
                </td>
                <td className="py-3.5 px-3">
                  <HueTag hue={row.groupHue}>{row.group}</HueTag>
                </td>
                <td className="py-3.5 px-3">
                  <span className="inline-flex items-center gap-2">
                    <Avatar
                      fallback={row.ownerAvatar}
                      hue={row.ownerHue}
                      size="xs"
                      ringWidth={0}
                    />
                    <span>{row.owner}</span>
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className="flex items-center gap-2.5">
                    <Progress
                      value={row.progress}
                      hue="periwinkle"
                      height="sm"
                      className="flex-1"
                    />
                    <span className="w-9 text-[13px] text-[#5B6170]">
                      {row.progress}%
                    </span>
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <StatusPill status={row.status}>{row.stateLabel}</StatusPill>
                </td>
                <td className="py-3.5 pl-3 text-right text-[#6B7280]">
                  {row.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tile>
  )
}
