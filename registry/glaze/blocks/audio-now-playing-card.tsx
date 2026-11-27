import * as React from 'react'
import { Pause, Play } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function AudioNowPlayingCard({
  track,
  artist,
  tone = 'lilac-dark',
}: {
  track: string
  artist: string
  tone?: TileTone
}) {
  const [playing, setPlaying] = React.useState(true)
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold" style={{ color: theme.soft }}>
          正在播放
        </span>
        <div className="flex h-4.5 items-end gap-0.5">
          {[10, 16, 12, 18].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full transition-[height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                height: playing ? h : 6,
                backgroundColor: theme.accent,
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="truncate font-glaze-display text-[18px] font-extrabold">
          {track}
        </div>
        <div className="truncate text-[12px]" style={{ color: theme.soft }}>
          {artist}
        </div>
      </div>
      <Button
        size="sm"
        variant={theme.dark ? 'dark-surface' : 'primary'}
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? <Pause size={13} weight="fill" /> : <Play size={13} weight="fill" />}
        {playing ? '暂停' : '继续播放'}
      </Button>
    </Tile>
  )
}
