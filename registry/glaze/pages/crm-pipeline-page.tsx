import * as React from 'react'
import { DataManagementBlock } from '@/components/blocks/data-management-block'
import { ComposedRevenueCard } from '@/components/cards/composed-revenue-card'
import { FunnelCard } from '@/components/cards/funnel-card'
import { Avatar } from '@/components/ui/avatar'
import { HueTag } from '@/components/ui/hue-tag'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Hue } from '@/lib/tokens'

const PIPELINE_LANES: {
  stage: string
  hue: Hue
  total: string
  deals: { id: string; company: string; amount: string; owner: string; probability: string }[]
}[] = [
  {
    stage: '线索跟进',
    hue: 'sky',
    total: '¥ 24.5万',
    deals: [
      { id: 'D-101', company: '星海智算科技', amount: '¥ 120,000', owner: '陈', probability: '35%' },
      { id: 'D-102', company: '青云物流集团', amount: '¥ 125,000', owner: '许', probability: '40%' },
    ],
  },
  {
    stage: '方案演示',
    hue: 'periwinkle',
    total: '¥ 51.0万',
    deals: [
      { id: 'D-103', company: '华东商业银行', amount: '¥ 340,000', owner: '周', probability: '65%' },
      { id: 'D-104', company: '极光零售云', amount: '¥ 170,000', owner: '林', probability: '60%' },
    ],
  },
  {
    stage: '商务审批',
    hue: 'peach',
    total: '¥ 38.6万',
    deals: [
      { id: 'D-105', company: '明远医药研发', amount: '¥ 226,000', owner: '周', probability: '85%' },
      { id: 'D-106', company: '智联汽车工厂', amount: '¥ 160,000', owner: '陆', probability: '80%' },
    ],
  },
  {
    stage: '赢单签约',
    hue: 'mint',
    total: '¥ 69.2万',
    deals: [
      { id: 'D-107', company: '云帆跨境支付', amount: '¥ 412,000', owner: '陈', probability: '100%' },
      { id: 'D-108', company: '天枢能源监控', amount: '¥ 280,000', owner: '林', probability: '100%' },
    ],
  },
]

export function CrmPipelinePage() {
  const [view, setView] = React.useState<'table' | 'board' | 'forecast'>('table')

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6 px-4 py-8 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
              PAGE 13 · CRM.PIPE · 客户关系与商机管线
            </span>
            <h1 className="m-0 font-glaze-display text-[32px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
              CRM 订单与商机工作台
            </h1>
            <p className="m-0 text-[14px] text-[#5B6170]">
              支持台账列表、阶段看板与转化预测三视图切换，集成新建、抽屉审批与删除保护
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <StatusPill status="normal" label="Q4 达成率 114%" />
            <SegmentedControl
              size="sm"
              value={view}
              onValueChange={setView}
              options={[
                { value: 'table', label: '订单台账' },
                { value: 'board', label: '阶段看板' },
                { value: 'forecast', label: '漏斗预测' },
              ]}
            />
          </div>
        </header>

        {view === 'table' && <DataManagementBlock />}

        {view === 'board' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PIPELINE_LANES.map((lane) => (
              <Tile key={lane.stage} tone="white" className="justify-start gap-3.5 p-5">
                <div className="flex items-center justify-between gap-2">
                  <HueTag hue={lane.hue} size="sm">
                    {lane.stage}
                  </HueTag>
                  <span className="font-glaze-mono text-[12px] font-bold text-[#123A5C]">
                    {lane.total}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {lane.deals.map((d) => (
                    <div
                      key={d.id}
                      className="flex flex-col gap-2 rounded-inner bg-[#F6F7F9] p-4 transition-colors hover:bg-[#EEF0F4]"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                        <span className="font-glaze-mono font-bold text-[#4A4FB8]">{d.id}</span>
                        <span>赢单率 {d.probability}</span>
                      </div>
                      <div className="font-glaze-display text-[15px] font-extrabold text-[#1B1F27]">
                        {d.company}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-glaze-mono text-[14px] font-extrabold text-[#123A5C]">
                          {d.amount}
                        </span>
                        <Avatar fallback={d.owner} hue={lane.hue} size="xs" />
                      </div>
                    </div>
                  ))}
                </div>
              </Tile>
            ))}
          </div>
        )}

        {view === 'forecast' && (
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
            <div className="flex [&>*]:w-full [&>*]:flex-1">
              <FunnelCard
                tone="white"
                title="商机阶段转化漏斗"
                steps={[
                  { label: '有效线索', count: '420', pct: 100 },
                  { label: '方案演示', count: '218', pct: 52 },
                  { label: '商务审批', count: '94', pct: 22 },
                  { label: '正式签约', count: '58', pct: 14 },
                ]}
              />
            </div>
            <div className="flex lg:col-span-2 [&>*]:w-full [&>*]:flex-1">
              <ComposedRevenueCard
                tone="white"
                title="月度回款额与签约客单价趋势"
                subtitle="柱状表示实际回款（万元），折线表示平均客单价"
                xKey="month"
                data={[
                  { month: '7月', revenue: 42, arp: 8.4 },
                  { month: '8月', revenue: 51, arp: 9.2 },
                  { month: '9月', revenue: 58, arp: 9.8 },
                  { month: '10月', revenue: 64, arp: 11.1 },
                  { month: '11月', revenue: 79, arp: 12.6 },
                ]}
                series={[
                  { type: 'bar', dataKey: 'revenue', label: '回款额', hue: 'periwinkle', unit: '万' },
                  { type: 'line', dataKey: 'arp', label: '平均客单', hue: 'mint', yAxisId: 'right', unit: '万' },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
