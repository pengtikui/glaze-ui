import * as React from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
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
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const theme = TILE_THEMES[tone]

  return (
    <>
      <Tile size="f" tone={tone} className="gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-between gap-3 rounded-full bg-white px-4 text-left text-[14px] text-[#8A90A0] transition-colors outline-none hover:bg-[#FAFBFC] focus-visible:ring-2 focus-visible:ring-[#7B80EA]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <MagnifyingGlass size={16} weight="bold" className="shrink-0 text-[#8A90A0]" />
              <span className="truncate">{placeholder}</span>
            </span>
            <kbd className="shrink-0 rounded-full bg-[#F2F3F5] px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold whitespace-nowrap text-[#5B6170]">
              ⌘ K
            </kbd>
          </button>

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

      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setQuery('')
        }}
        title="快捷指令面板"
        description="搜索并执行快捷命令"
        maxWidth="520px"
      >
        <CommandInput
          autoFocus
          value={query}
          onValueChange={setQuery}
          placeholder={placeholder}
        />
        <CommandList>
          <CommandEmpty>未找到匹配的指令</CommandEmpty>
          <CommandGroup heading="快捷指令">
            {quickActions.map((a) => (
              <CommandItem
                key={a.label}
                value={a.label}
                keywords={[a.shortcut]}
                onSelect={() => {
                  onAction?.(a.label)
                  setOpen(false)
                  setQuery('')
                }}
              >
                <span className="font-semibold">{a.label}</span>
                <CommandShortcut>{a.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <CommandFooter>
          <span>↑↓ 选择 · Enter 执行 · Esc 关闭</span>
          <span>{quickActions.length} 条快捷指令</span>
        </CommandFooter>
      </CommandDialog>
    </>
  )
}
