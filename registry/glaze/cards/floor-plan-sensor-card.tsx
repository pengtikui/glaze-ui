import { HueTag } from '@/components/ui/hue-tag'
import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function FloorPlanSensorCard({
  title,
  rooms,
  tone = 'aqua',
}: {
  title: string
  rooms: { name: string; temp: string; humidity: string; lightOn: boolean; hue: Hue }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="l" tone={tone} className="justify-between gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
        <span className="text-[12px] font-semibold" style={{ color: theme.soft }}>
          全屋 {rooms.length} 区域传感器
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        {rooms.slice(0, 4).map((r) => (
          <div
            key={r.name}
            className="flex min-w-0 flex-col justify-between rounded-overlay p-4"
            style={{
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,0.1)'
                : theme.bg === '#FFFFFF'
                  ? '#F6F7F9'
                  : 'rgba(255,255,255,0.75)',
              color: theme.ink,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-bold">{r.name}</span>
              <StatusDot status={r.lightOn ? 'normal' : 'disabled'} />
            </div>
            <div className="font-glaze-display text-[30px] leading-none font-extrabold whitespace-nowrap">
              {r.temp}
            </div>
            <div className="flex items-center justify-between gap-2 text-[12px]" style={{ color: theme.soft }}>
              <span className="whitespace-nowrap">湿度 {r.humidity}</span>
              <HueTag hue={r.hue} size="sm" className="shrink-0">
                {r.lightOn ? '灯光开' : '待机'}
              </HueTag>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
