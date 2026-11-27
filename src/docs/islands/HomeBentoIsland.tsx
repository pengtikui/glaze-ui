import { AreaTrendCard } from '@/components/blocks/area-trend-card'
import { MetricCard } from '@/components/blocks/metric-card'
import { SparkAreaCard } from '@/components/blocks/spark-area-card'
import { StatusCard } from '@/components/blocks/status-card'
import { Grid } from '@/components/ui/grid'
import { GlazeProviders } from '@/docs/components/GlazeProviders'

export function HomeBentoIsland() {
  return (
    <GlazeProviders pathname="/">
      <Grid>
        <StatusCard
          label="Registry"
          statusText="179"
          description="58 组件 · 112 卡片 · 6 Demo"
          status="normal"
          tone="mint"
        />
        <SparkAreaCard
          tone="sky"
          label="Base UI"
          value="39"
          unit="原语"
          delta="v1.9"
          points={[28, 36, 42, 49, 58, 64, 78, 92]}
        />
        <AreaTrendCard
          title="Recharts v3"
          summary="10 种图表"
          tone="white"
          points={[42, 54, 48, 68, 76, 72, 88, 94]}
          axisLabels={['01', '02', '03', '04', '05']}
        />
        <MetricCard label="AI 文档" value="64" unit="MD" tone="sky-dark" />
        <MetricCard label="独立 Demo" value="6" unit="页" tone="peach" />
        <MetricCard label="卡片尺寸" value="5" unit="S/W/T/L/F" tone="periwinkle" />
        <MetricCard label="色相" value="9" unit="× 6 阶" tone="white" />
      </Grid>
    </GlazeProviders>
  )
}
