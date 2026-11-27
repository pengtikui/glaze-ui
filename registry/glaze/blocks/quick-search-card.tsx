import * as React from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function QuickSearchCard({
  title,
  placeholder = '搜索服务、文档、命令…',
  suggestions,
  onSelect,
  tone = 'periwinkle',
}: {
  title: string
  placeholder?: string
  suggestions: string[]
  onSelect?: (q: string) => void
  tone?: TileTone
}) {
  const [query, setQuery] = React.useState('')
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
        {title}
      </span>
      <Input
        surface="white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        leadingIcon={<MagnifyingGlass size={15} weight="bold" />}
      />
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setQuery(s)
              onSelect?.(s)
            }}
            className={`cursor-pointer rounded-full bg-white/75 px-3 py-1 text-[11px] font-semibold text-[#1B1F27] hover:bg-white ${PRESS_CLASS}`}
          >
            {s}
          </button>
        ))}
      </div>
    </Tile>
  )
}
