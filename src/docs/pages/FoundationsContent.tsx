import * as React from 'react'
import { motion } from 'motion/react'
import {
  Bell,
  ChartBar,
  Check,
  Clock,
  Folder,
  Heart,
  List,
  Star,
  Sun,
} from '@phosphor-icons/react'
import {
  Button,
  Grid,
  HueTag,
  Popover,
  SegmentedControl,
  StatusPill,
  Switch,
  Tile,
  useToast,
} from '@/components/ui'
import {
  DURATION,
  EASE_STANDARD,
  MOTION_SPRING,
  MOTION_TOKENS,
} from '@/lib/motion'
import {
  DATAVIZ_PALETTES,
  HUE_LIST,
  NEUTRALS,
  RADII_TOKENS,
  SEMANTIC_TOKENS,
  SPACING_TOKENS,
  TILE_THEMES,
  TYPOGRAPHY_SCALE,
  type Status,
  type TileTone,
} from '@/lib/tokens'

const TILE_PREVIEW_ORDER: TileTone[] = [
  'sky',
  'mint',
  'peach',
  'lilac',
  'rose',
  'lemon',
  'aqua',
  'periwinkle',
  'coral',
  'sky-dark',
  'lilac-dark',
  'aqua-dark',
  'ink',
]

const SHADE_KEYS = [50, 100, 300, 500, 700, 900] as const

const GRID_SPECS = [
  { k: '容器', v: '1200', n: '最大宽度，两侧边距 24' },
  { k: '列数', v: '4', n: '平板 2 列 · 手机 1 列' },
  { k: '列宽', v: '288', n: '容器 1200 时' },
  { k: '行高', v: '200', n: '手机端改为最小 160' },
  { k: '间隙', v: '16', n: '行列一致' },
  { k: '圆角', v: '28', n: '所有格子统一' },
]

const ICON_SAMPLES = [Star, Bell, ChartBar, Folder, Heart, Clock, List, Sun, Check]

function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-4 pb-3 border-b border-[#EEF0F3]">
      <h2 className="m-0 font-glaze-display text-[24px] font-extrabold text-[#1B1F27]">
        {title}
      </h2>
      {subtitle && <span className="text-[14px] text-[#6B7280]">{subtitle}</span>}
    </div>
  )
}

export function FoundationsPage({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const toast = useToast()
  const [gridCols, setGridCols] = React.useState<'4' | '2' | '1'>('4')
  const [motionSwitch, setMotionSwitch] = React.useState(true)
  const [motionTab, setMotionTab] = React.useState<'spring' | 'ease' | 'press'>('spring')

  const copyHex = (hex: string, name: string) => {
    navigator.clipboard?.writeText(hex).catch(() => {})
    toast({
      title: `已复制 ${hex}`,
      description: `${name} 色值已复制到剪贴板`,
      status: 'normal',
    })
  }

  return (
    <div className="flex flex-col gap-16">
      {/* Header */}
      {!hideHeader && (
        <header className="flex flex-col gap-1.5">
          <h1 className="m-0 font-glaze-display text-[34px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            设计规范
          </h1>
          <span className="text-[14px] text-[#6B7280]">色板 · 字体 · 圆角 · 栅格 · 动效（点击色块复制 HEX）</span>
        </header>
      )}

      {/* Color Palette 9 × 6 */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="色板" subtitle="9 组色相 × 6 级明度 · 点击复制 HEX" />
        <div className="overflow-x-auto">
          <div className="min-w-180 flex flex-col gap-3.5">
            <div className="grid grid-cols-[136px_repeat(6,minmax(0,1fr))] gap-x-2.5 text-[12px] text-[#6B7280]">
              <span />
              <span>50 · 浅底</span>
              <span>100 · 格子</span>
              <span>300 · 描边</span>
              <span>500 · 图形</span>
              <span>700 · 辅助字</span>
              <span>900 · 标题字</span>
            </div>
            {HUE_LIST.map((h) => (
              <div
                key={h.id}
                className="grid grid-cols-[136px_repeat(6,minmax(0,1fr))] gap-2.5 items-start"
              >
                <span className="flex flex-col gap-0.5 pt-2">
                  <span className="text-[15px] font-bold">{h.cn}</span>
                  <span className="text-[12px] text-[#6B7280]">{h.en}</span>
                </span>
                {SHADE_KEYS.map((step) => {
                  const hex = h[step]
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => copyHex(hex, `${h.cn} ${step}`)}
                      className="group flex flex-col gap-1.5 border-0 bg-transparent p-0 text-left cursor-pointer glaze-focus rounded-[12px]"
                    >
                      <span
                        className="h-13 w-full rounded-[12px] transition-transform duration-150 group-hover:scale-[1.03] group-active:scale-[0.98]"
                        style={{
                          backgroundColor: hex,
                          boxShadow:
                            step === 50
                              ? 'inset 0 0 0 1px rgba(16,24,40,0.06)'
                              : 'none',
                        }}
                      />
                      <span className="font-glaze-mono text-[11px] text-[#5B6170]">
                        {hex}
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-x-6 gap-y-3 p-5 px-6 rounded-inner bg-white text-[13px] leading-5">
          <span>
            <b>100</b> <span className="text-[#5B6170]">彩色格子的底色</span>
          </span>
          <span>
            <b>900</b> <span className="text-[#5B6170]">格子内的标题与数字</span>
          </span>
          <span>
            <b>700</b> <span className="text-[#5B6170]">格子内的标签与说明</span>
          </span>
          <span>
            <b>500</b> <span className="text-[#5B6170]">图表、进度、状态点</span>
          </span>
          <span>
            <b>300</b> <span className="text-[#5B6170]">描边、次要图形</span>
          </span>
          <span>
            <b>50</b> <span className="text-[#5B6170]">白格内的浅色提示底</span>
          </span>
          <span>
            <b>900 @ 12%</b>{' '}
            <span className="text-[#5B6170]">彩色格子里的轨道与分隔线</span>
          </span>
        </div>
      </section>

      {/* Tile Pairings */}
      <section className="flex flex-col gap-5">
        <SectionHeader
          title="格子配色"
          subtitle="浅色格 100 / 900 / 700 · 深色强调格 900 / 白 / 100"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(196px,100%),1fr))] gap-4">
          {TILE_PREVIEW_ORDER.map((toneKey) => {
            const t = TILE_THEMES[toneKey]
            return (
              <div
                key={toneKey}
                className="h-42 rounded-tile p-5.5 flex flex-col justify-between"
                style={{ backgroundColor: t.bg, color: t.ink }}
              >
                <span
                  className="flex justify-between text-[13px] font-medium"
                  style={{ color: t.soft }}
                >
                  <span>{t.cn}</span>
                  <span>{t.code}</span>
                </span>
                <span className="flex flex-col gap-2.5">
                  <span className="font-glaze-display text-[40px] leading-10.5 font-extrabold tracking-[-0.03em]">
                    128
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 rounded-[3px] overflow-hidden"
                    style={{ backgroundColor: t.track }}
                  >
                    <span
                      className="block w-[64%] h-full rounded-[3px]"
                      style={{ backgroundColor: t.accent }}
                    />
                  </span>
                </span>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px] leading-5.5">
          <div className="p-5 rounded-inner bg-white">
            <b className="font-bold">白色卡片无描边无投影</b>
            <p className="m-0 mt-1 text-[#5B6170]">
              页面画布采用 #F2F4F8 柔和冷灰，纯白 #FFFFFF 卡片无需边框与阴影即可清晰分离，保持极致干净的扁平节奏。
            </p>
          </div>
          <div className="p-5 rounded-inner bg-white">
            <b className="font-bold">全圆胶囊单行控件规范</b>
            <p className="m-0 mt-1 text-[#5B6170]">
              所有单行交互控件（Button / Select / Input / Combobox / Autocomplete / Switch / Tabs）统一全圆胶囊；多行内嵌块 18px，浮层 20px，卡片与弹窗 28px。
            </p>
          </div>
          <div className="p-5 rounded-inner bg-white">
            <b className="font-bold">轻柔协调的物理动效</b>
            <p className="m-0 mt-1 text-[#5B6170]">
              全站基于 GPU 合成层与 Motion 柔和缓动曲线（cubic-bezier(0.22, 1, 0.36, 1)），避免任何布局抖动与卡顿。
            </p>
          </div>
        </div>
      </section>

      {/* Neutrals & Semantic */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <SectionHeader title="中性色" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {NEUTRALS.map((n) => (
              <button
                key={n.name}
                type="button"
                onClick={() => copyHex(n.hex, n.name)}
                className="flex items-center gap-3 border-0 bg-transparent p-1.5 -m-1.5 rounded-control text-left hover:bg-[#F6F7F9] cursor-pointer transition-colors"
              >
                <span
                  className="w-10 h-10 shrink-0 rounded-[12px]"
                  style={{
                    backgroundColor: n.hex,
                    boxShadow: 'inset 0 0 0 1px rgba(16,24,40,0.08)',
                  }}
                />
                <span className="flex flex-col">
                  <span className="text-[13px] font-semibold">
                    {n.name}{' '}
                    <span className="font-glaze-mono font-normal text-[#6B7280]">
                      {n.hex}
                    </span>
                  </span>
                  <span className="text-[12px] text-[#6B7280]">{n.use}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <SectionHeader title="语义色" />
          <div className="flex flex-col gap-3">
            {(Object.keys(SEMANTIC_TOKENS) as Status[]).map((key) => {
              const m = SEMANTIC_TOKENS[key]
              return (
                <div
                  key={key}
                  className="grid grid-cols-[84px_1fr_auto] items-center gap-4 px-4 py-3 rounded-control"
                  style={{ backgroundColor: m.bg50 }}
                >
                  <span
                    className="text-[14px] font-bold"
                    style={{ color: m.ink }}
                  >
                    {m.name}
                  </span>
                  <span className="flex items-center gap-2.5 text-[12px] text-[#5B6170]">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: m.dot }}
                    />
                    <span className="font-glaze-mono">{m.dot}</span>
                    <span>{m.base}</span>
                  </span>
                  <StatusPill status={key} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Data Visualization Palettes */}
      <section className="flex flex-col gap-5">
        <SectionHeader
          title="数据可视化"
          subtitle="分类色取各色相的 500，按顺序使用；连续色取单一色相 100 → 900"
        />
        <div className="flex flex-wrap gap-10 items-end">
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold">分类 · 8 色</span>
            <div className="flex flex-wrap gap-1.5">
              {DATAVIZ_PALETTES.categorical.map((hex, i) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => copyHex(hex, `分类色 ${i + 1}`)}
                  className="flex flex-col items-center gap-1.5 border-0 bg-transparent p-0 cursor-pointer"
                >
                  <span
                    className="w-12.5 h-12.5 rounded-[12px] hover:scale-105 transition-transform"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-[11px] text-[#6B7280]">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold">连续 · 长春花</span>
            <div className="flex">
              {DATAVIZ_PALETTES.sequential.map((hex, i, arr) => (
                <span
                  key={hex}
                  className="w-12.5 h-12.5"
                  style={{
                    backgroundColor: hex,
                    borderRadius:
                      i === 0
                        ? '12px 0 0 12px'
                        : i === arr.length - 1
                          ? '0 12px 12px 0'
                          : '0',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold">发散 · 珊瑚 ↔ 湖水</span>
            <div className="flex">
              {DATAVIZ_PALETTES.diverging.map((hex, i, arr) => (
                <span
                  key={hex}
                  className="w-10.5 h-12.5"
                  style={{
                    backgroundColor: hex,
                    borderRadius:
                      i === 0
                        ? '12px 0 0 12px'
                        : i === arr.length - 1
                          ? '0 12px 12px 0'
                          : '0',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography Scale */}
      <section className="flex flex-col gap-5">
        <SectionHeader
          title="字体"
          subtitle="Plus Jakarta Sans 用于数字和标题 · Inter + 思源黑体用于正文"
        />
        <div className="flex flex-col">
          {TYPOGRAPHY_SCALE.map((t) => (
            <div
              key={t.name}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr_240px] gap-3 md:gap-6 items-center py-3.5 border-b border-[#F2F3F5]"
            >
              <span className="text-[13px] font-semibold text-[#5B6170]">
                {t.name}
              </span>
              <span
                style={{
                  fontFamily: t.family,
                  fontSize: t.size,
                  lineHeight: t.lh,
                  fontWeight: t.weight,
                  letterSpacing: t.ls,
                  color: t.color,
                }}
              >
                {t.sample}
              </span>
              <span className="text-[12px] text-[#6B7280]">{t.spec}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Radii & Spacing */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <SectionHeader title="圆角" subtitle="外大内小，逐层递减" />
          <div className="flex flex-wrap gap-4 items-end">
            {RADII_TOKENS.map((r) => (
              <div key={r.label} className="flex flex-col gap-2">
                <span
                  style={{
                    width: r.size,
                    height: 'height' in r ? r.height : r.size,
                    borderRadius: r.px,
                    backgroundColor: r.bg,
                  }}
                />
                <span className="text-[12px] text-[#5B6170]">
                  <b className="text-[#1B1F27]">
                    {'displayLabel' in r ? r.displayLabel : r.px}
                  </b>{' '}
                  {r.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <span className="text-[13px] font-bold">Phosphor 线性图标底 · 同色相 100 底 / 700 字</span>
            <div className="flex flex-wrap gap-2.5">
              {HUE_LIST.map((h, i) => {
                const Icon = ICON_SAMPLES[i]
                return (
                  <span
                    key={h.id}
                    className="w-9 h-9 rounded-icon flex items-center justify-center"
                    style={{ backgroundColor: h[100], color: h[700] }}
                  >
                    <Icon size={18} />
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <SectionHeader title="间距" subtitle="4 的倍数" />
          <div className="flex flex-col gap-2.5">
            {SPACING_TOKENS.map((p) => (
              <div
                key={p.v}
                className="flex items-center gap-3.5 text-[13px]"
              >
                <span className="w-7 font-bold text-right">{p.v}</span>
                <span
                  className="h-3 rounded-[3px] bg-[#7B80EA]"
                  style={{ width: `${p.v * 4.5}px` }}
                />
                <span className="text-[#6B7280]">{p.use}</span>
              </div>
            ))}
          </div>
          <p className="m-0 text-[13px] leading-5 text-[#5B6170]">
            层级：整体扁平。在 #F2F4F8 柔和冷灰画布上，纯白卡片不加描边与投影；内嵌区块与表单控件统一采用无边框 N25 (#F6F7F9)；仅分段选中胶囊与弹出浮层使用克制阴影。
          </p>
        </div>
      </section>

      {/* Grid System Interactive Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#EEF0F3]">
          <div className="flex items-baseline gap-4">
            <h2 className="m-0 font-glaze-display text-[24px] font-extrabold text-[#1B1F27]">
              五种尺寸与响应式重排
            </h2>
            <span className="text-[14px] text-[#6B7280]">
              切换视口列数实时预览 CSS Grid dense 重排
            </span>
          </div>
          <SegmentedControl
            value={gridCols}
            onValueChange={setGridCols}
            ariaLabel="网格预览列数"
            listClassName="bg-[#E6E9F0]"
            options={[
              { value: '4', label: '桌面 4 列' },
              { value: '2', label: '平板 2 列' },
              { value: '1', label: '手机 1 列' },
            ]}
          />
        </div>

        {/* Spec Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-y border-[#EEF0F3]">
          {GRID_SPECS.map((s) => (
            <div key={s.k} className="py-5 pr-5 flex flex-col gap-1">
              <span className="text-[13px] text-[#6B7280]">{s.k}</span>
              <span className="font-glaze-display text-[28px] leading-8.5 font-extrabold">
                {s.v}
              </span>
              <span className="text-[12px] text-[#6B7280]">{s.n}</span>
            </div>
          ))}
        </div>

        {/* Live Responsive Preview */}
        <motion.div
          layout
          transition={{ duration: DURATION.base, ease: EASE_STANDARD }}
          className="mx-auto w-full"
          style={{
            maxWidth:
              gridCols === '1' ? '390px' : gridCols === '2' ? '680px' : '100%',
          }}
        >
          <Grid forceCols={Number(gridCols) as 4 | 2 | 1}>
            <Tile size="l" tone="sky">
              <span className="font-glaze-display text-[56px] leading-14 font-extrabold">
                L
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[18px] font-bold">大格 · 2 × 2</span>
                <span className="text-[14px] text-[#24557F]">
                  592 × 416 · 主视觉、地图、大图表
                </span>
              </span>
            </Tile>
            <Tile size="t" tone="lilac">
              <span className="font-glaze-display text-[48px] leading-12 font-extrabold">
                T
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[17px] font-bold">竖格 · 1 × 2</span>
                <span className="text-[13px] text-[#6A2D70]">
                  288 × 416 · 条形列表、排行、事件流
                </span>
              </span>
            </Tile>
            <Tile size="s" tone="mint">
              <span className="font-glaze-display text-[40px] leading-10 font-extrabold">
                S
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[16px] font-bold">小格 · 1 × 1</span>
                <span className="text-[13px] text-[#2F6B28]">
                  288 × 200 · 单个指标、状态
                </span>
              </span>
            </Tile>
            <Tile size="s" tone="white">
              <span className="font-glaze-display text-[40px] leading-10 font-extrabold">
                S
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[16px] font-bold">小格 · 白色变体</span>
                <span className="text-[13px] text-[#6B7280]">与色块交替使用</span>
              </span>
            </Tile>
            <Tile size="w" tone="peach">
              <span className="font-glaze-display text-[48px] leading-12 font-extrabold">
                W
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[17px] font-bold">宽格 · 2 × 1</span>
                <span className="text-[13px] text-[#8A4B12]">
                  592 × 200 · 趋势图、应用入口、多指标
                </span>
              </span>
            </Tile>
            <Tile size="w" tone="white">
              <span className="font-glaze-display text-[48px] leading-12 font-extrabold">
                W
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[17px] font-bold">宽格 · 白色变体</span>
                <span className="text-[13px] text-[#6B7280]">
                  内容密集时优先用白色
                </span>
              </span>
            </Tile>
            <Tile
              size="f"
              tone="white"
              className="flex-row flex-wrap items-center justify-between gap-4 min-h-30 border-2 border-dashed border-[#CDD3DD]"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-glaze-display text-[48px] leading-12 font-extrabold">
                  F
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-bold">通栏 · 4 × 自适应</span>
                  <span className="text-[13px] text-[#6B7280]">
                    1200 × 内容高度 · 数据表格、层级结构、分布图
                  </span>
                </span>
              </span>
              <span className="text-[13px] text-[#6B7280]">
                虚线表示高度不受行高约束
              </span>
            </Tile>
          </Grid>
        </motion.div>
      </section>

      {/* Motion System Section */}
      <section className="flex flex-col gap-6">
        <SectionHeader
          title="动效 Motion"
          subtitle="150ms / 200ms / 300–360ms · 纯 CSS GPU 合成"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {MOTION_TOKENS.map((m) => (
            <div
              key={m.token}
              className="flex flex-col gap-2 rounded-3xl bg-white p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-glaze-display text-[17px] font-extrabold text-[#1B1F27]">
                  {m.name}
                </span>
                <HueTag hue="periwinkle" size="sm">
                  {m.token}
                </HueTag>
              </div>
              <span className="font-glaze-mono text-[12px] font-semibold text-[#4A4FB8]">
                {m.spec}
              </span>
              <p className="m-0 text-[13px] leading-relaxed text-[#5B6170]">
                {m.use}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Motion Playground */}
        <div className="rounded-tile bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EEF0F3]">
            <div>
              <h3 className="m-0 font-glaze-display text-[17px] font-extrabold text-[#1B1F27]">
                动效体验台
              </h3>
            </div>
            <SegmentedControl
              value={motionTab}
              onValueChange={setMotionTab}
              options={[
                { value: 'spring', label: '分级时长' },
                { value: 'ease', label: 'CSS 合成' },
                { value: 'press', label: '按压边界' },
              ]}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between gap-3 rounded-overlay bg-[#F6F7F9] p-4">
              <span className="text-[12px] font-semibold text-[#6B7280]">
                独立按钮按压 (150ms)
              </span>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">按住感受</Button>
                <Button variant="soft" hue="mint">
                  次级按压
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-overlay bg-[#F6F7F9] p-4">
              <span className="text-[12px] font-semibold text-[#6B7280]">
                纯 CSS 开关滑块 (200ms)
              </span>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold">
                  {motionSwitch ? '已启用 200ms 过渡' : '已关闭'}
                </span>
                <Switch
                  hue="periwinkle"
                  checked={motionSwitch}
                  onCheckedChange={setMotionSwitch}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-overlay bg-[#F6F7F9] p-4">
              <span className="text-[12px] font-semibold text-[#6B7280]">
                浮层双向过渡 (150ms / 120ms)
              </span>
              <Popover
                trigger={<Button variant="secondary">打开悬浮卡片</Button>}
                title="稳态锚点弹出"
                description="浮层触发器自动禁用按压缩放，避免锚点矩形变化造成位移闪烁；开关均具备轻快顺滑的纯 CSS 过渡。"
              />
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-overlay bg-[#F6F7F9] p-4">
              <span className="text-[12px] font-semibold text-[#6B7280]">
                3D 堆叠通知 (360ms)
              </span>
              <Button
                variant="soft"
                hue="sky"
                onClick={() =>
                  toast({
                    title: '分级动效通知',
                    description: `当前示例模式：${motionTab} · 360ms 丝滑进场与堆叠展开`,
                    status: 'info',
                  })
                }
              >
                触发堆叠 Toast
              </Button>
            </div>
          </div>

          <motion.div
            key={motionTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={MOTION_SPRING}
            className="mt-4 rounded-inner bg-[#EEF7FD] px-4 py-3 text-[13px] text-[#24557F]"
          >
            {motionTab === 'spring' &&
              '分级时长：Fast 150ms/120ms（Menu/Popover/Select 等浮层与按压）· Base 200ms/150ms（Tabs/Switch/Accordion/Dialog）· Emphasized 300ms/360ms（Drawer/Toast）。'}
            {motionTab === 'ease' &&
              'CSS 优先：所有 48 个 UI 原语全部基于原生 CSS transform / opacity 与 Base UI data-starting-style / data-ending-style 实现，零 JS 动画循环开销。'}
            {motionTab === 'press' &&
              'PRESS_SCALE: 0.97 — 仅用于独立紧凑操作控件（Button、Toggle、Checkbox、Radio、ToolbarButton、步进/关闭按钮）；Select、Tabs、Switch、Tile 以及所有浮层触发器（Menu、Menubar、Popover 等）禁用按压缩放。'}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
