import * as React from 'react'
import { MusicNotes, Pause, Play, SkipBack, SkipForward } from '@phosphor-icons/react'
import { Progress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function MediaPlayerCard({
  title,
  artist,
  duration = '03:42',
  progress = 64,
  tone = 'lilac-dark',
}: {
  title: string
  artist: string
  duration?: string
  progress?: number
  tone?: TileTone
}) {
  const [playing, setPlaying] = React.useState(true)
  const theme = TILE_THEMES[tone]
  const ctrlBg = theme.dark ? 'rgba(255,255,255,0.14)' : theme.bg === '#FFFFFF' ? '#F2F3F5' : 'rgba(255,255,255,0.72)'
  const playBg = theme.dark ? '#FFFFFF' : theme.ink
  const playFg = theme.dark ? '#1B1F27' : '#FFFFFF'
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control"
            style={{ backgroundColor: theme.track }}
          >
            <MusicNotes size={22} weight="fill" style={{ color: theme.accent }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-glaze-display text-[17px] font-extrabold">{title}</div>
            <div className="truncate text-[12px]" style={{ color: theme.soft }}>
              {artist}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="上一首"
            className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:brightness-95 ${PRESS_CLASS}`}
            style={{ backgroundColor: ctrlBg, color: theme.ink }}
          >
            <SkipBack size={14} weight="fill" />
          </button>
          <button
            type="button"
            aria-label={playing ? '暂停' : '播放'}
            onClick={() => setPlaying((p) => !p)}
            className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:opacity-90 ${PRESS_CLASS}`}
            style={{ backgroundColor: playBg, color: playFg }}
          >
            {playing ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
          </button>
          <button
            type="button"
            aria-label="下一首"
            className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:brightness-95 ${PRESS_CLASS}`}
            style={{ backgroundColor: ctrlBg, color: theme.ink }}
          >
            <SkipForward size={14} weight="fill" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Progress value={progress} barColor={theme.accent} trackColor={theme.track} />
        <div className="flex justify-between font-glaze-mono text-[11px]" style={{ color: theme.soft }}>
          <span>02:21</span>
          <span>{duration}</span>
        </div>
      </div>
    </Tile>
  )
}
