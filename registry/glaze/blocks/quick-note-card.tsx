import * as React from 'react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function QuickNoteCard({
  title = '灵感速记',
  initialText,
  tag = '工作台',
  tone = 'lemon',
}: {
  title?: string
  initialText: string
  tag?: string
  tone?: TileTone
}) {
  const [text, setText] = React.useState(initialText)
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold">{title}</span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ backgroundColor: theme.track, color: theme.ink }}
        >
          {tag} · {text.length} 字
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-control bg-white/55 px-3 py-2 text-[13px] leading-relaxed text-[#1B1F27] outline-none focus:bg-white/85"
      />
    </Tile>
  )
}
