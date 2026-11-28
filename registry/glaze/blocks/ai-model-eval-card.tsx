import * as React from 'react'
import { CheckCircle, Lightning } from '@phosphor-icons/react'
import { AiModelSelector, type AiModelOption } from '@/components/ui/ai-context-meter'
import { HueTag } from '@/components/ui/hue-tag'
import { Progress } from '@/components/ui/progress'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export interface AiModelEvalRow {
  id: string
  name: string
  provider: string
  contextWindow: string
  tag: string
  hue: Hue
  ttft: string
  throughput: string
  costPer1M: string
  reasoningScore: number
  codingScore: number
  status: 'normal' | 'info' | 'warning'
}

export interface AiModelEvalCardProps {
  title?: string
  subtitle?: string
  rows: AiModelEvalRow[]
  defaultModelId?: string
  onSelectDefault?: (modelId: string) => void
  tone?: TileTone
}

export function AiModelEvalCard({
  title = '多模型评测与智能路由矩阵',
  subtitle = '实时基准 · 首字延迟 / 吞吐 / 推理与编程得分对比',
  rows,
  defaultModelId,
  onSelectDefault,
  tone = 'white',
}: AiModelEvalCardProps) {
  const [activeId, setActiveId] = React.useState(defaultModelId ?? rows[0]?.id ?? '')

  const modelOptions: AiModelOption[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    provider: r.provider,
    contextWindow: r.contextWindow,
    tag: r.tag,
    hue: r.hue,
  }))

  const handleSelect = (id: string) => {
    setActiveId(id)
    onSelectDefault?.(id)
  }

  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-glaze-display text-[19px] font-extrabold">{title}</span>
          <p className="m-0 mt-0.5 text-[13px] text-[#6B7280]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#6B7280]">默认主路由</span>
          <AiModelSelector
            models={modelOptions}
            value={activeId}
            onValueChange={handleSelect}
            side="bottom"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#EEF0F3] text-[11.5px] font-bold text-[#8A90A0]">
              <th className="py-2.5 pr-3">模型</th>
              <th className="px-3 py-2.5">上下文</th>
              <th className="px-3 py-2.5">TTFT</th>
              <th className="px-3 py-2.5">吞吐</th>
              <th className="px-3 py-2.5">推理得分</th>
              <th className="px-3 py-2.5">编码得分</th>
              <th className="px-3 py-2.5">价格 / 1M</th>
              <th className="py-2.5 pl-3 text-right">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F3F5]">
            {rows.map((row) => {
              const isDefault = row.id === activeId
              return (
                <tr
                  key={row.id}
                  onClick={() => handleSelect(row.id)}
                  className={
                    isDefault
                      ? 'cursor-pointer bg-[#F3F4FE]/75 transition-colors'
                      : 'cursor-pointer transition-colors hover:bg-[#F6F7F9]'
                  }
                >
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      {isDefault ? (
                        <CheckCircle size={15} weight="fill" className="shrink-0 text-[#4A4FB8]" />
                      ) : (
                        <Lightning size={14} weight="duotone" className="shrink-0 text-[#8A90A0]" />
                      )}
                      <span className="font-bold text-[#1B1F27]">{row.name}</span>
                      <HueTag hue={row.hue} size="xs">
                        {row.tag}
                      </HueTag>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-glaze-mono text-[12px] text-[#5B6170]">
                    {row.contextWindow}
                  </td>
                  <td className="px-3 py-3 font-glaze-mono font-semibold text-[#1B1F27]">
                    {row.ttft}
                  </td>
                  <td className="px-3 py-3 font-glaze-mono text-[#5B6170]">{row.throughput}</td>
                  <td className="w-36 px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={row.reasoningScore} hue={row.hue} height="sm" />
                      <span className="w-8 font-glaze-mono text-[11.5px] font-bold">
                        {row.reasoningScore}
                      </span>
                    </div>
                  </td>
                  <td className="w-36 px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={row.codingScore} hue="aqua" height="sm" />
                      <span className="w-8 font-glaze-mono text-[11.5px] font-bold">
                        {row.codingScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-glaze-mono text-[12px] font-semibold text-[#1B1F27]">
                    {row.costPer1M}
                  </td>
                  <td className="py-3 pl-3 text-right">
                    <StatusPill
                      status={row.status}
                      label={isDefault ? '主路由' : '可用'}
                      size="sm"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Tile>
  )
}
