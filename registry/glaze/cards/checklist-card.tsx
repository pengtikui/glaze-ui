import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function ChecklistCard({
  title,
  items,
  tone = 'white',
}: {
  title: string
  items: { id: string; label: string; checked?: boolean; tag?: string; hue?: Hue }[]
  tone?: TileTone
}) {
  const [checkedMap, setCheckedMap] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((it) => [it.id, Boolean(it.checked)])),
  )
  const doneCount = Object.values(checkedMap).filter(Boolean).length
  const theme = TILE_THEMES[tone]

  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        <span className="font-glaze-mono text-[12px] font-bold" style={{ color: theme.soft }}>
          {doneCount}/{items.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {items.map((it) => {
          const isDone = Boolean(checkedMap[it.id])
          return (
            <div key={it.id} className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Checkbox
                  checked={isDone}
                  onCheckedChange={(v) =>
                    setCheckedMap((prev) => ({ ...prev, [it.id]: Boolean(v) }))
                  }
                  label={
                    <span className={isDone ? 'text-[#8A90A0] line-through' : ''}>
                      {it.label}
                    </span>
                  }
                />
              </div>
              {it.tag && (
                <HueTag hue={it.hue ?? 'periwinkle'} size="sm" className="shrink-0">
                  {it.tag}
                </HueTag>
              )}
            </div>
          )
        })}
      </div>
    </Tile>
  )
}
