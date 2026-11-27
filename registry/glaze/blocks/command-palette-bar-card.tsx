import * as React from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function CommandPaletteBarCard({
  placeholder = '输入指令、跳转到节点或搜索模块…',
  quickActions,
  onAction,
  tone = 'ink',
}: {
  placeholder?: string
  quickActions: { label: string; shortcut: string }[]
  onAction?: (label: string) => void
  tone?: TileTone
}) {
  const [val, setVal] = React.useState('')
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <Input
            surface="white"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={placeholder}
            leadingIcon={<MagnifyingGlass size={16} weight="bold" />}
            trailingElement={
              <kbd className="rounded-full bg-[#F2F3F5] px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold text-[#5B6170] whitespace-nowrap">
                ⌘ K
              </kbd>
            }
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => onAction?.(a.label)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold whitespace-nowrap hover:brightness-95 ${PRESS_CLASS}`}
              style={{
                backgroundColor: theme.dark
                  ? 'rgba(255,255,255,0.12)'
                  : theme.bg === '#FFFFFF'
                    ? '#F2F3F5'
                    : 'rgba(255,255,255,0.7)',
                color: theme.ink,
              }}
            >
              <span>{a.label}</span>
              <span className="font-glaze-mono text-[10px]" style={{ color: theme.soft }}>
                {a.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Tile>
  )
}
