import * as React from 'react'
import { TreeStructure } from '@phosphor-icons/react'
import { HueTag } from '@/components/ui/hue-tag'
import { IconTile } from '@/components/ui/icon-tile'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Hue, Status, TileTone } from '@/lib/tokens'

export interface HierarchyChild {
  name: string
  tag: string
  tagHue: Hue
  meta: string
  status?: 'normal' | 'warn' | 'off'
}

export interface HierarchyGroup {
  mark: React.ReactNode
  hue: Hue
  name: string
  meta: string
  status: Status
  statusLabel: string
  highlightWarning?: boolean
  children: HierarchyChild[]
}

export interface HierarchyCardProps {
  rootTitle: string
  rootSubtitle: string
  rootIcon?: React.ReactNode
  groups: HierarchyGroup[]
  tone?: TileTone
}

export function HierarchyCard({
  rootTitle,
  rootSubtitle,
  rootIcon,
  groups,
  tone = 'white',
}: HierarchyCardProps) {
  return (
    <Tile size="f" tone={tone}>
      <div className="overflow-x-auto">
        <div className="min-w-215 flex items-start text-[13px] leading-4.5">
        {/* Root Node */}
        <div className="shrink-0 w-47 h-16 px-3 flex items-center gap-2.5 rounded-2xl bg-[#123A5C] text-white">
          <IconTile hue="dark-glass" size="sm">
            {rootIcon ?? <TreeStructure size={18} />}
          </IconTile>
          <span className="min-w-0">
            <b className="font-semibold block truncate">{rootTitle}</b>
            <span className="text-[12px] text-[#C9DDEE] block truncate">
              {rootSubtitle}
            </span>
          </span>
        </div>

        {/* Horizontal connector from root */}
        <div
          aria-hidden="true"
          className="shrink-0 w-7 h-0.5 mt-7.75 bg-[#CDD3DD]"
        />

        {/* Groups Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {groups.map((group, idx) => {
            const isFirst = idx === 0
            const isLast = idx === groups.length - 1
            return (
              <div
                key={idx}
                className="relative ml-7 p-3.5 rounded-inner bg-[#F6F7F9] flex flex-col gap-3"
                style={{
                  boxShadow: group.highlightWarning
                    ? 'inset 0 0 0 1.5px #F7B39C'
                    : 'none',
                }}
              >
                {/* Vertical tree branch spine */}
                {!(isFirst && isLast) && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-7 w-0.5 bg-[#CDD3DD]"
                    style={{
                      top: isFirst ? '32px' : '0px',
                      bottom: isLast ? 'auto' : '-12px',
                      height: isLast ? '33px' : 'auto',
                    }}
                  />
                )}
                {/* Horizontal connector into group */}
                <span
                  aria-hidden="true"
                  className="absolute -left-7 top-7.75 w-7 h-0.5 bg-[#CDD3DD]"
                />

                {/* Group Header */}
                <div className="flex items-center gap-3 min-h-9">
                  <IconTile hue={group.hue} size="sm" className="text-[14px]">
                    {group.mark}
                  </IconTile>
                  <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <b className="text-[15px] font-semibold text-[#1B1F27]">
                      {group.name}
                    </b>
                    <span className="text-[12px] text-[#6B7280]">
                      {group.meta}
                    </span>
                  </span>
                  <StatusPill status={group.status}>
                    {group.statusLabel}
                  </StatusPill>
                </div>

                {/* Group Children */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(175px,100%),1fr))] gap-x-4 gap-y-2.5 pt-3 border-t border-[#E8EBF0]">
                  {group.children.map((c, ci) => {
                    const isWarn = c.status === 'warn'
                    const isOff = c.status === 'off'
                    return (
                      <div
                        key={ci}
                        className="flex items-start gap-2.5"
                        style={{ opacity: isOff ? 0.6 : 1 }}
                      >
                        <StatusDot
                          status={
                            isWarn ? 'error' : isOff ? 'disabled' : 'normal'
                          }
                          animated={isWarn}
                          size="sm"
                          className="mt-1.5"
                        />
                        <span className="flex flex-col gap-0.75 min-w-0">
                          <span className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[13px] font-semibold text-[#1B1F27]">
                              {c.name}
                            </span>
                            <HueTag hue={c.tagHue} size="xs">
                              {c.tag}
                            </HueTag>
                          </span>
                          <span
                            className="text-[12px]"
                            style={{ color: isWarn ? '#A6360F' : '#6B7280' }}
                          >
                            {c.meta}
                          </span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </Tile>
  )
}
