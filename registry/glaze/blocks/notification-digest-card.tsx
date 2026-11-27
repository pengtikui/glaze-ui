import { Bell } from '@phosphor-icons/react'
import { CountBadge } from '@/components/ui/count-badge'
import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function NotificationDigestCard({
  title = '消息摘要',
  unreadCount,
  categories,
  latest,
  tone = 'white',
}: {
  title?: string
  unreadCount: number
  categories: { label: string; count: number; hue: Hue }[]
  latest: string
  tone?: TileTone
}) {
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={18} weight="duotone" className="text-[#7B80EA]" />
          <span className="font-glaze-display text-[16px] font-extrabold">{title}</span>
        </div>
        <CountBadge count={unreadCount} hue="coral" />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <HueTag key={c.label} hue={c.hue} size="sm">
            {c.label} · {c.count}
          </HueTag>
        ))}
      </div>
      <p className="truncate rounded-[12px] bg-[#F6F7F9] px-3 py-2 text-[12px] text-[#5B6170]">
        最新：{latest}
      </p>
    </Tile>
  )
}
