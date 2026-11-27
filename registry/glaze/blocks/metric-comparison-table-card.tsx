import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export function MetricComparisonTableCard({
  title,
  columns,
  rows,
  tone = 'white',
}: {
  title: string
  columns: string[]
  rows: { metric: string; values: string[]; bestIndex?: number }[]
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone} className="gap-4">
      <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
      <div className="overflow-x-auto">
        <table className="w-full min-w-140 border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#EEF0F3] text-[12px] text-[#8A90A0]">
              <th className="py-2.5 pr-4 font-semibold whitespace-nowrap">对比指标</th>
              {columns.map((c) => (
                <th key={c} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric} className="border-b border-[#EEF0F3] last:border-b-0">
                <td className="py-3 pr-4 font-semibold text-[#1B1F27] whitespace-nowrap">{r.metric}</td>
                {r.values.map((v, idx) => (
                  <td key={idx} className="px-3 py-3 font-glaze-mono whitespace-nowrap">
                    {r.bestIndex === idx ? (
                      <span className="inline-flex rounded-full bg-[#E2F5DA] px-2.5 py-0.5 font-bold text-[#2F6B28]">
                        {v}
                      </span>
                    ) : (
                      <span className="text-[#5B6170]">{v}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tile>
  )
}
