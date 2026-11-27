import { Avatar } from '@/components/ui/avatar'
import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import type { Hue, Status, TileTone } from '@/lib/tokens'

export function ContactListCard({
  title,
  contacts,
  tone = 'white',
}: {
  title: string
  contacts: { name: string; role: string; initials: string; hue: Hue; status: Status }[]
  tone?: TileTone
}) {
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-3">
        {contacts.map((c) => (
          <div key={c.name} className="flex items-center justify-between gap-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <Avatar fallback={c.initials} hue={c.hue} size="sm" />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-bold text-[#1B1F27]">{c.name}</div>
                <div className="truncate text-[11px] text-[#6B7280]">{c.role}</div>
              </div>
            </div>
            <StatusDot status={c.status} mode={c.status === 'normal' ? 'ripple' : 'static'} />
          </div>
        ))}
      </div>
    </Tile>
  )
}
