import { AreaTrendCard } from '@/components/cards/area-trend-card'
import { MetricCard } from '@/components/cards/metric-card'
import { SparkAreaCard } from '@/components/cards/spark-area-card'
import { StatusCard } from '@/components/cards/status-card'
import { Grid } from '@/components/ui/grid'
import { GlazeProviders } from '@/docs/components/GlazeProviders'
import { BLOCKS_LIST, CARDS_LIST, COMPONENTS_LIST, PAGES_LIST } from '@/docs/data/catalog'

export function HomeBentoIsland() {
  const totalItems = COMPONENTS_LIST.length + CARDS_LIST.length + BLOCKS_LIST.length + PAGES_LIST.length + 4
  return (
    <GlazeProviders pathname="/">
      <Grid>
        <StatusCard
          label="Registry"
          statusText={String(totalItems)}
          description={`${COMPONENTS_LIST.length} 组件 · ${CARDS_LIST.length} 卡片 · ${BLOCKS_LIST.length} Blocks · ${PAGES_LIST.length} 页面`}
          status="normal"
          tone="mint"
        />
        <SparkAreaCard
          tone="sky"
          label="基础组件"
          value={String(COMPONENTS_LIST.length)}
          unit="项"
          delta="Base UI 1.9"
          points={[48, 54, 58, 64, 72, 76, 80, COMPONENTS_LIST.length]}
        />
        <AreaTrendCard
          title="专用业务卡片"
          summary={`${CARDS_LIST.length} 张 · S/W/T/L/F`}
          tone="white"
          points={[52, 68, 76, 88, 96, 108, 114, CARDS_LIST.length]}
          axisLabels={['S', 'W', 'T', 'L', 'F']}
        />
        <MetricCard label="通用 Blocks" value={String(BLOCKS_LIST.length)} unit="区块" tone="sky-dark" />
        <MetricCard label="完整页面" value={String(PAGES_LIST.length)} unit="页" tone="peach" />
        <MetricCard label="卡片尺寸" value="5" unit="S/W/T/L/F" tone="periwinkle" />
        <MetricCard label="柔彩色相" value="9" unit="× 6 阶" tone="white" />
      </Grid>
    </GlazeProviders>
  )
}
