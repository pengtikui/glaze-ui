import { FileCode, FileImage, FilePdf, FileText } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function FileListCard({
  title,
  files,
  tone = 'white',
}: {
  title: string
  files: { name: string; type: 'doc' | 'pdf' | 'img' | 'code'; size: string; updated: string }[]
  tone?: TileTone
}) {
  const iconMap = {
    doc: { icon: <FileText size={16} weight="duotone" />, hue: 'sky' as Hue },
    pdf: { icon: <FilePdf size={16} weight="duotone" />, hue: 'coral' as Hue },
    img: { icon: <FileImage size={16} weight="duotone" />, hue: 'lilac' as Hue },
    code: { icon: <FileCode size={16} weight="duotone" />, hue: 'aqua' as Hue },
  }
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {files.map((f) => {
          const meta = iconMap[f.type]
          return (
            <div
              key={f.name}
              className="flex items-center gap-3 rounded-2xl bg-[#F6F7F9] px-3 py-2.5"
            >
              <IconTile hue={meta.hue} size="sm" radius="icon">
                {meta.icon}
              </IconTile>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-[#1B1F27]">{f.name}</div>
                <div className="text-[11px] text-[#8A90A0]">
                  {f.size} · {f.updated}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Tile>
  )
}
