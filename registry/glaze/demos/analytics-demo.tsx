import * as React from 'react'
import { BudgetMeterCard } from '@/components/blocks/budget-meter-card'
import { ComposedRevenueCard } from '@/components/blocks/composed-revenue-card'
import { CurrencyCard } from '@/components/blocks/currency-card'
import { DualSeriesTrendCard } from '@/components/blocks/dual-series-trend-card'
import { FunnelCard } from '@/components/blocks/funnel-card'
import { GroupedBarChartCard } from '@/components/blocks/grouped-bar-chart-card'
import { InteractiveAnalyticsCard } from '@/components/blocks/interactive-analytics-card'
import { KpiStripCard } from '@/components/blocks/kpi-strip-card'
import { LeaderboardCard } from '@/components/blocks/leaderboard-card'
import { MetricComparisonTableCard } from '@/components/blocks/metric-comparison-table-card'
import { PricingPlansCard } from '@/components/blocks/pricing-plans-card'
import { RatingCard } from '@/components/blocks/rating-card'
import { RevenueBreakdownCard } from '@/components/blocks/revenue-breakdown-card'
import { SparkMetricRowCard } from '@/components/blocks/spark-metric-row-card'
import { Button } from '@/components/ui/button'
import { Grid } from '@/components/ui/grid'
import { Select } from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

export function AnalyticsDemoPage() {
  const toast = useToast()
  const [quarter, setQuarter] = React.useState('2026-q4')

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
            DEMO 04 · SAAS ANALYTICS · 营收与财务经营驾驶舱
          </span>
          <h1 className="m-0 font-glaze-display text-[36px] sm:text-[40px] leading-11 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            季度经营总览与增长分析
          </h1>
          <p className="m-0 text-[15px] text-[#5B6170]">
            ARR 突破 ¥1,840 万 · 净留存率 NRR 124% · 企业版续费率创年度新高
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-42.5">
            <Select
              surface="white"
              value={quarter}
              onValueChange={setQuarter}
              options={[
                { value: '2026-q4', label: '2026 Q4 实时' },
                { value: '2026-q3', label: '2026 Q3 结账' },
                { value: '2026-q2', label: '2026 Q2 结账' },
              ]}
            />
          </div>
          <Button
            variant="primary"
            onClick={() => toast({ title: '财务月报已导出', description: `${quarter}.pdf 已生成`, status: 'normal' })}
          >
            导出经营报表
          </Button>
        </div>
      </header>

      <Grid>
        <KpiStripCard
          tone="white"
          metrics={[
            { label: '月度经常性收入 MRR', value: '¥153.4万', delta: '+18.4%', status: 'normal', sub: '目标达成率 109%' },
            { label: '付费企业客户', value: '1,284', delta: '+64 家', status: 'normal', sub: '本月新增 72 · 流失 8' },
            { label: '净留存率 NRR', value: '124.2%', delta: '+3.1%', status: 'info', sub: '大客户增购强劲' },
            { label: '平均回本周期 CAC', value: '7.4 月', delta: '-0.8 月', status: 'normal', sub: '优于行业中位数 11 月' },
          ]}
        />

        <InteractiveAnalyticsCard
          tone="white"
          title="月度 ARR 增长与净新增趋势"
          subtitle="支持切换面积图 / 折线图 / 柱状图与点击图例筛选序列"
          summaries={[
            { label: '本季净增 ARR', value: '¥428万', delta: '+24.6%', status: 'normal' },
            { label: '增购贡献占比', value: '38.2%', delta: '+4.1%', status: 'info' },
            { label: '月度流失率', value: '0.84%', delta: '-0.3%', status: 'normal' },
          ]}
          xKey="month"
          referenceLine={{ y: 140, label: '月度目标' }}
          data={[
            { month: '7月', newArr: 112, expansion: 44 },
            { month: '8月', newArr: 124, expansion: 51 },
            { month: '9月', newArr: 118, expansion: 56 },
            { month: '10月', newArr: 138, expansion: 64 },
            { month: '11月', newArr: 152, expansion: 72 },
            { month: '12月', newArr: 168, expansion: 84 },
          ]}
          series={[
            { dataKey: 'newArr', label: '新签 ARR', hue: 'periwinkle', unit: '万' },
            { dataKey: 'expansion', label: '客户增购', hue: 'aqua', unit: '万' },
          ]}
        />

        <ComposedRevenueCard
          tone="white"
          title="营收与毛利率双轴走势"
          subtitle="柱状表示季度收入（万），折线表示毛利率（%）"
          delta="毛利 +3.2pt"
          xKey="q"
          leftYTickFormatter={(v) => `¥${v}万`}
          rightYTickFormatter={(v) => `${v}%`}
          data={[
            { q: 'Q1', enterprise: 210, selfServe: 100, margin: 66 },
            { q: 'Q2', enterprise: 248, selfServe: 117, margin: 69 },
            { q: 'Q3', enterprise: 282, selfServe: 130, margin: 71 },
            { q: 'Q4', enterprise: 318, selfServe: 145, margin: 74 },
          ]}
          series={[
            { type: 'bar', dataKey: 'enterprise', label: '企业订阅', hue: 'periwinkle', yAxisId: 'left', stackId: 's', unit: '万' },
            { type: 'bar', dataKey: 'selfServe', label: '自助订阅', hue: 'sky', yAxisId: 'left', stackId: 's', unit: '万' },
            { type: 'line', dataKey: 'margin', label: '毛利率', hue: 'coral', yAxisId: 'right', unit: '%' },
          ]}
        />

        <RevenueBreakdownCard
          tone="white"
          title="季度收入渠道构成"
          total="¥462.8万"
          delta="环比 +21.6%"
          channels={[
            { name: '企业年度订阅', amount: '¥248.0万', pct: 54, hue: 'periwinkle' },
            { name: '专业版自助订阅', amount: '¥116.4万', pct: 25, hue: 'aqua' },
            { name: '私有化部署授权', amount: '¥64.2万', pct: 14, hue: 'peach' },
            { name: '增值 API 用量包', amount: '¥34.2万', pct: 7, hue: 'rose' },
          ]}
        />

        <GroupedBarChartCard
          tone="white"
          title="年度季度营收对比 (万元)"
          legendA="2026 实际"
          legendB="2025 同期"
          groups={[
            { label: 'Q1', a: 310, b: 230 },
            { label: 'Q2', a: 365, b: 278 },
            { label: 'Q3', a: 412, b: 315 },
            { label: 'Q4', a: 463, b: 350 },
          ]}
        />

        <FunnelCard
          tone="periwinkle"
          title="线索转化漏斗"
          steps={[
            { label: '官网自然访问', count: '48,200', pct: 100 },
            { label: '注册免费试用', count: '5,420', pct: 64 },
            { label: '激活核心工作流', count: '2,180', pct: 42 },
            { label: '转化付费订阅', count: '684', pct: 24 },
          ]}
        />

        <LeaderboardCard
          tone="white"
          title="大客户成单排行"
          entries={[
            { name: '星尘科技', initials: '星', hue: 'periwinkle', score: '¥42.0万', sub: '企业版 · 300 席' },
            { name: '蔚蓝能源', initials: '蔚', hue: 'sky', score: '¥36.5万', sub: '私有化集群' },
            { name: '清风医疗', initials: '清', hue: 'mint', score: '¥28.0万', sub: '企业版 · 180 席' },
            { name: '极光物流', initials: '极', hue: 'peach', score: '¥21.8万', sub: '专业版升级' },
            { name: '云帆零售', initials: '云', hue: 'rose', score: '¥18.4万', sub: 'API 年度包' },
          ]}
        />

        <DualSeriesTrendCard
          tone="white"
          label="月度现金流入 vs 运营成本"
          seriesA={{ name: '现金流入', color: '#49A851', data: [82, 95, 112, 108, 134, 153], current: '¥153万' }}
          seriesB={{ name: '运营成本', color: '#E3A33B', data: [64, 68, 72, 75, 79, 84], current: '¥84万' }}
        />

        <BudgetMeterCard
          tone="white"
          label="Q4 市场投放预算消耗"
          spent={384000}
          budget={500000}
          categories={[
            { name: '内容营销', amount: '¥16.2万', hue: 'sky' },
            { name: '开发者活动', amount: '¥12.8万', hue: 'lilac' },
            { name: '搜索投放', amount: '¥9.4万', hue: 'peach' },
          ]}
        />

        <RatingCard
          tone="lemon"
          label="客户满意度 NPS"
          score="4.92"
          reviews="基于 1,420 份有效问卷"
        />

        <CurrencyCard
          tone="white"
          pair="USD / CNY"
          rate="7.214"
          change="-0.18%"
          status="info"
          range="海外回款结汇参考价"
        />

        <SparkMetricRowCard
          tone="white"
          items={[
            { label: '日活跃团队', value: '3,412', delta: '+12%', bars: [34, 42, 38, 48, 55, 62], hue: 'sky' },
            { label: '试用转付费', value: '12.6%', delta: '+1.8%', bars: [8, 9, 10, 11, 11, 13], hue: 'mint' },
            { label: '工单首响', value: '6.2m', delta: '-24%', bars: [12, 11, 9, 8, 7, 6], hue: 'aqua' },
          ]}
        />

        <PricingPlansCard
          tone="white"
          onSelect={(id) => toast({ title: `查看方案详情：${id}`, status: 'info' })}
          plans={[
            {
              id: 'starter',
              name: '团队版',
              price: '¥299',
              period: '/ 月起',
              hue: 'sky',
              features: ['最多 20 名协作成员', '完整 100 卡片组件', '基础 API 与 Webhook'],
            },
            {
              id: 'pro',
              name: '成长专业版',
              price: '¥899',
              period: '/ 月起',
              badge: '最受欢迎',
              hue: 'periwinkle',
              highlighted: true,
              features: ['无限协作成员与工作区', '高级分析与权限审计', '7×12 小时专属技术支持'],
            },
            {
              id: 'enterprise',
              name: '企业私有版',
              price: '定制',
              period: '年度授权',
              hue: 'aqua',
              features: ['私有云 / 离线部署包', 'SSO / SAML 与定制 SLA', '专属架构师驻场支持'],
            },
          ]}
        />

        <MetricComparisonTableCard
          tone="white"
          title="区域业务线健康度对比"
          columns={['华东大区', '华北大区', '华南大区', '海外亚太']}
          rows={[
            { metric: '季度营收达成', values: ['118%', '104%', '109%', '126%'], bestIndex: 3 },
            { metric: '平均客单价 ARPU', values: ['¥18,400', '¥16,200', '¥14,900', '¥22,600'], bestIndex: 3 },
            { metric: '年度续约率', values: ['96.4%', '94.1%', '93.8%', '95.2%'], bestIndex: 0 },
            { metric: '平均交付周期', values: ['4.2 天', '5.1 天', '4.8 天', '6.0 天'], bestIndex: 0 },
          ]}
        />
      </Grid>
    </div>
  )
}
