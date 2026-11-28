import { BookOpen } from '@phosphor-icons/react'
import { AiSourceItem, type AiSourceEntry } from '@/components/ui/ai-sources'
import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface AiSourcesCardProps {
  title?: string
  queryLabel?: string
  sources: AiSourceEntry[]
  tone?: TileTone
}

export function AiSourcesCard({
  title = 'RAG 溯源参考',
  queryLabel = '语义检索 · Top 4',
  sources,
  tone = 'white',
}: AiSourcesCardProps) {
  const theme = TILE_THEMES[tone]

  return (
    <Tile size="t" tone={tone} className="justify-start gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen size={17} weight="duotone" style={{ color: theme.accent }} />
          <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        </div>
        <HueTag hue="sky" size="xs">
          {sources.length} 篇
        </HueTag>
      </div>

      <span className="-mt-1 text-[12px]" style={{ color: theme.soft }}>
        {queryLabel}
      </span>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {sources.map((src) => (
          <AiSourceItem
            key={src.id}
            title={src.title}
            url={src.url}
            domain={src.domain}
            snippet={src.snippet}
            score={src.score}
            hue={src.hue}
            className={tone === 'white' ? 'bg-[#F6F7F9] hover:bg-[#EEF0F4]' : undefined}
          />
        ))}
      </div>
    </Tile>
  )
}
