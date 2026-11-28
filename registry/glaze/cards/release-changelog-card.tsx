import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function ReleaseChangelogCard({
  releases,
  tone = 'white',
}: {
  releases: {
    version: string
    date: string
    hue: Hue
    title: string
    highlights: string[]
  }[]
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone} className="gap-4">
      <span className="font-glaze-display text-[20px] font-extrabold">近期版本发布记录</span>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {releases.slice(0, 3).map((r) => (
          <div key={r.version} className="flex flex-col gap-2.5 rounded-overlay bg-[#F6F7F9] p-4">
            <div className="flex items-center justify-between">
              <HueTag hue={r.hue} size="sm">
                {r.version}
              </HueTag>
              <span className="font-glaze-mono text-[11px] text-[#8A90A0]">{r.date}</span>
            </div>
            <div className="font-glaze-display text-[16px] font-extrabold text-[#1B1F27]">
              {r.title}
            </div>
            <ul className="flex flex-col gap-1.5 text-[12px] text-[#5B6170]">
              {r.highlights.map((h) => (
                <li key={h}>· {h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Tile>
  )
}
