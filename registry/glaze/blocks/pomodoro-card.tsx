import * as React from 'react'
import { Timer } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function PomodoroCard({
  task,
  minutes = 25,
  tone = 'coral',
}: {
  task: string
  minutes?: number
  tone?: TileTone
}) {
  const [secondsLeft, setSecondsLeft] = React.useState(minutes * 60)
  const [running, setRunning] = React.useState(false)
  const theme = TILE_THEMES[tone]

  React.useEffect(() => {
    if (!running) return
    const t = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(t)
  }, [running])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return (
    <Tile size="w" tone={tone} className="flex-row items-center justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: theme.soft }}>
          <Timer size={16} weight="bold" />
          <span>专注番茄钟</span>
        </div>
        <div className="font-glaze-display text-[48px] leading-none font-extrabold tracking-[-0.03em]">
          {mm}:{ss}
        </div>
        <span className="text-[12px]" style={{ color: theme.soft }}>
          {task}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="primary" onClick={() => setRunning((r) => !r)}>
          {running ? '暂停' : '开始专注'}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setRunning(false)
            setSecondsLeft(minutes * 60)
          }}
        >
          重置
        </Button>
      </div>
    </Tile>
  )
}
