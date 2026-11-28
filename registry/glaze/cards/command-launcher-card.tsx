import * as React from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface CommandLauncherItem {
  label: string
  shortcut?: string
  group?: string
}

export interface CommandLauncherCardProps {
  title?: string
  placeholder?: string
  items: CommandLauncherItem[]
  onSelect?: (label: string) => void
  tone?: TileTone
}

export function CommandLauncherCard({
  title = '快捷命令检索',
  placeholder = '输入关键词过滤指令…',
  items,
  onSelect,
  tone = 'white',
}: CommandLauncherCardProps) {
  const theme = TILE_THEMES[tone]
  const [lastTriggered, setLastTriggered] = React.useState<string | null>(null)

  return (
    <Tile size="w" tone={tone} className="justify-between gap-2.5 p-5">
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="text-[13px] font-bold" style={{ color: theme.soft }}>
          {title}
        </span>
        {lastTriggered && (
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: theme.track, color: theme.ink }}
          >
            已执行：{lastTriggered}
          </span>
        )}
      </div>

      <Command className="rounded-inner bg-[#F6F7F9]/80">
        <CommandInput placeholder={placeholder} className="h-10 text-[13px]" />
        <CommandList className="max-h-30 p-1">
          <CommandEmpty className="py-4 text-[12px]">未找到匹配指令</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.label}
                value={item.label}
                onSelect={() => {
                  setLastTriggered(item.label)
                  onSelect?.(item.label)
                }}
                className="py-1.5 text-[13px]"
              >
                <span className="truncate font-medium">{item.label}</span>
                {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </Tile>
  )
}
