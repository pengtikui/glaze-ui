import * as React from 'react'
import { CalendarBlank, DownloadSimple } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { AreaTrendCard } from '@/components/cards/area-trend-card'
import { MetricCard } from '@/components/cards/metric-card'
import { SparkAreaCard } from '@/components/cards/spark-area-card'
import { StatusCard } from '@/components/cards/status-card'
import { Button } from '@/components/ui/button'
import { Calendar, type DateRange } from '@/components/ui/calendar'
import { Grid } from '@/components/ui/grid'
import { Popover } from '@/components/ui/popover'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { useToast } from '@/components/ui/toast'

type RangeKey = '7d' | '30d' | '90d'

const RANGE_DATA: Record<
  RangeKey,
  {
    statusText: string
    statusDesc: string
    mrr: string
    mrrDelta: string
    mrrPoints: number[]
    activeUsers: string
    throughputSummary: string
    throughputPoints: number[]
    axisLabels: string[]
  }
> = {
  '7d': {
    statusText: '运行稳定',
    statusDesc: '18/18 节点在线 · 零异常',
    mrr: '284.6',
    mrrDelta: '+12.4%',
    mrrPoints: [210, 224, 232, 248, 255, 272, 285],
    activeUsers: '42.8',
    throughputSummary: '48.2 k/s · 峰值 61k',
    throughputPoints: [34, 41, 39, 52, 48, 56, 61, 48],
    axisLabels: ['周一', '周三', '周五', '周日'],
  },
  '30d': {
    statusText: '99.98%',
    statusDesc: '健康达标 · 本月 1 次自动扩容',
    mrr: '1,148',
    mrrDelta: '+18.9%',
    mrrPoints: [820, 880, 910, 960, 1020, 1090, 1148],
    activeUsers: '128.4',
    throughputSummary: '52.6 k/s · 月环比 +16%',
    throughputPoints: [38, 44, 49, 46, 55, 58, 52, 64],
    axisLabels: ['W1', 'W2', 'W3', 'W4'],
  },
  '90d': {
    statusText: '99.99%',
    statusDesc: 'SLA 达标 · 季度零 P0 故障',
    mrr: '3,420',
    mrrDelta: '+34.2%',
    mrrPoints: [2100, 2380, 2610, 2890, 3050, 3260, 3420],
    activeUsers: '316.0',
    throughputSummary: '58.4 k/s · 季同比 +42%',
    throughputPoints: [29, 36, 42, 48, 51, 56, 59, 66],
    axisLabels: ['9月', '10月', '11月', '当前'],
  },
}

export interface DashboardKpiOverviewBlockProps {
  title?: string
  subtitle?: string
}

export function DashboardKpiOverviewBlock({
  title = '核心指标总览',
  subtitle = '按统计窗口联动刷新全组指标卡片与趋势图',
}: DashboardKpiOverviewBlockProps) {
  const toast = useToast()
  const [rangeKey, setRangeKey] = React.useState<RangeKey>('30d')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 1),
    to: new Date(2026, 10, 29),
  })

  const d = RANGE_DATA[rangeKey]

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="m-0 font-glaze-display text-[24px] font-extrabold text-[#123A5C]">
            {title}
          </h2>
          <p className="m-0 mt-1 text-[13.5px] text-[#5B6170]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            size="sm"
            value={rangeKey}
            onValueChange={setRangeKey}
            options={[
              { value: '7d', label: '近 7 天' },
              { value: '30d', label: '近 30 天' },
              { value: '90d', label: '近 90 天' },
            ]}
          />

          <Popover
            trigger={
              <Button variant="secondary" size="sm">
                <CalendarBlank size={15} weight="bold" />
                <span className="tabular-nums">
                  {dateRange?.from ? format(dateRange.from, 'MM/dd') : '起'} –{' '}
                  {dateRange?.to ? format(dateRange.to, 'MM/dd') : '止'}
                </span>
              </Button>
            }
            align="end"
            className="w-auto p-3"
          >
            <Calendar
              mode="range"
              surface="embedded"
              size="sm"
              accent="periwinkle"
              selected={dateRange}
              onSelect={setDateRange}
              defaultMonth={dateRange?.from}
            />
          </Popover>

          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              toast({
                title: '已导出指标快照',
                description: `统计窗口：${rangeKey.toUpperCase()} · CSV 与 PDF 已生成`,
                status: 'normal',
              })
            }
          >
            <DownloadSimple size={15} weight="bold" />
            <span>导出报表</span>
          </Button>
        </div>
      </div>

      <Grid>
        <StatusCard
          label="集群状态"
          statusText={d.statusText}
          description={d.statusDesc}
          status="normal"
          tone="mint"
        />
        <SparkAreaCard
          label="经常性营收"
          value={d.mrr}
          unit="万"
          delta={d.mrrDelta}
          points={d.mrrPoints}
          tone="sky"
        />
        <AreaTrendCard
          title="实时请求吞吐"
          summary={d.throughputSummary}
          points={d.throughputPoints}
          axisLabels={d.axisLabels}
          tone="white"
        />
        <MetricCard label="活跃团队" value={d.activeUsers} unit="k" tone="periwinkle" />
        <MetricCard label="转化率" value="6.84" unit="%" tone="white" />
        <MetricCard label="P99 延迟" value="18.4" unit="ms" tone="white" />
        <MetricCard label="NPS 评分" value="74" unit="分" tone="sky-dark" />
      </Grid>
    </section>
  )
}
