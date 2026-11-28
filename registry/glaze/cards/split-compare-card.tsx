import { HueTag } from '@/components/ui/hue-tag'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'

export interface SplitComparePane {
  badge: string
  badgeHue: Hue
  title: string
  status?: Status
  statusLabel?: string
  metrics: { label: string; value: string }[]
  snippet?: string
}

export interface SplitCompareCardProps {
  title?: string
  subtitle?: string
  left: SplitComparePane
  right: SplitComparePane
  tone?: TileTone
}

function PaneContent({ pane }: { pane: SplitComparePane }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3 rounded-inner bg-[#F6F7F9] p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <HueTag hue={pane.badgeHue} size="sm">
            {pane.badge}
          </HueTag>
          <span className="font-glaze-display text-[15px] font-extrabold text-[#1B1F27]">
            {pane.title}
          </span>
        </div>
        {pane.status && pane.statusLabel && (
          <StatusPill status={pane.status} label={pane.statusLabel} size="sm" />
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {pane.metrics.map((m) => (
          <div key={m.label} className="rounded-[12px] bg-white px-3 py-2">
            <div className="text-[11px] text-[#6B7280]">{m.label}</div>
            <div className="mt-0.5 font-glaze-display text-[16px] font-extrabold tabular-nums text-[#1B1F27]">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {pane.snippet && (
        <pre className="m-0 overflow-x-auto rounded-[12px] bg-[#1B1F27] px-3 py-2.5 font-glaze-mono text-[11px] leading-relaxed text-[#E2E8F0]">
          {pane.snippet}
        </pre>
      )}
    </div>
  )
}

export function SplitCompareCard({
  title = '双版本灰度对比',
  subtitle = '拖动中央把手实时调节对照比例',
  left,
  right,
  tone = 'white',
}: SplitCompareCardProps) {
  const theme = TILE_THEMES[tone]

  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-glaze-display text-[20px] font-extrabold">{title}</div>
        <span className="text-[12px]" style={{ color: theme.soft }}>
          {subtitle}
        </span>
      </div>

      <div className="h-60 w-full">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="50%" minSize="28%">
            <PaneContent pane={left} />
          </ResizablePanel>
          <ResizableHandle withHandle variant="gap" hue="periwinkle" />
          <ResizablePanel defaultSize="50%" minSize="28%">
            <PaneContent pane={right} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Tile>
  )
}
