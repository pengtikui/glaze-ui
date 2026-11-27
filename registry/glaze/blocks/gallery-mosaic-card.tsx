import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'

export function GalleryMosaicCard({
  title,
  count,
  albums,
  tone = 'white',
}: {
  title: string
  count: string
  albums: { title: string; items: string; hue: Hue }[]
  tone?: TileTone
}) {
  return (
    <Tile size="l" tone={tone} className="justify-between gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
        <span className="text-[12px] font-semibold text-[#6B7280]">{count}</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        {albums.slice(0, 4).map((al) => (
          <div
            key={al.title}
            className="flex flex-col justify-end rounded-overlay p-4"
            style={{
              backgroundColor: HUE_PALETTES[al.hue][100],
              color: HUE_PALETTES[al.hue][900],
            }}
          >
            <div className="font-glaze-display text-[16px] font-extrabold">{al.title}</div>
            <div className="text-[12px]" style={{ color: HUE_PALETTES[al.hue][700] }}>
              {al.items}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
