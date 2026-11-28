import * as React from 'react'
import {
  ArrowsClockwise,
  ArrowsHorizontal,
  Code,
  Database,
  Desktop,
  DeviceMobile,
  DeviceTablet,
  EnvelopeSimple,
  FileCode,
  FileTs,
  FolderOpen,
  Laptop,
  PaperPlaneTilt,
  SidebarSimple,
  Star,
  TerminalWindow,
  Tray,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ResizableSeparatorOverlay,
  useDefaultLayout,
  useGroupRef,
  usePanelRef,
  type Layout,
  type ResizableHandleVariant,
} from '@/components/ui/resizable'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Switch } from '@/components/ui/switch'
import { Tile } from '@/components/ui/tile'
import type { ComponentDemoGroup } from '@/docs/examples/types'
import type { Hue } from '@/lib/tokens'

/* ============================================================================
 * 1. Hero — 三栏嵌套工作台（水平 + 垂直）
 * ========================================================================== */
function ResizableHeroDemo() {
  const [activeFile, setActiveFile] = React.useState('resizable.tsx')
  const [sidebarPct, setSidebarPct] = React.useState(26)
  const [terminalPct, setTerminalPct] = React.useState(34)

  const files = [
    { name: 'resizable.tsx', badge: 'UI', hue: 'periwinkle' as const, lines: 186 },
    { name: 'calendar.tsx', badge: 'UI', hue: 'sky' as const, lines: 242 },
    { name: 'tokens.ts', badge: 'Lib', hue: 'mint' as const, lines: 557 },
    { name: 'glaze.css', badge: 'CSS', hue: 'lilac' as const, lines: 587 },
  ]

  return (
    <div className="w-full overflow-hidden rounded-tile bg-white">
      <div className="flex items-center justify-between border-b border-[#EEF0F3] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#E4E6FD] text-[#4A4FB8]">
            <Code size={15} weight="bold" />
          </span>
          <span className="font-glaze-display text-[14px] font-extrabold text-[#123A5C]">
            Glaze Workspace
          </span>
          <HueTag hue="periwinkle" size="xs">
            嵌套分栏
          </HueTag>
        </div>
        <div className="flex items-center gap-2 font-glaze-mono text-[11px] text-[#6B7280]">
          <span>侧栏 {Math.round(sidebarPct)}%</span>
          <span>·</span>
          <span>终端 {Math.round(terminalPct)}%</span>
        </div>
      </div>

      <div className="h-[340px] w-full">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            id="hero-sidebar"
            defaultSize="26%"
            minSize="18%"
            maxSize="42%"
            onResize={(size) => setSidebarPct(size.asPercentage)}
            className="flex flex-col bg-[#F6F7F9] p-3.5"
          >
            <div className="mb-2.5 flex items-center gap-1.5 px-1.5 text-[11px] font-bold tracking-wide text-[#6B7280] uppercase">
              <FolderOpen size={14} weight="bold" />
              <span>registry/glaze</span>
            </div>
            <div className="flex flex-col gap-1">
              {files.map((f) => {
                const active = f.name === activeFile
                return (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setActiveFile(f.name)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-[12px] border-0 px-2.5 py-2 text-left text-[12.5px] transition-colors ${
                      active
                        ? 'bg-white font-bold text-[#123A5C]'
                        : 'bg-transparent font-medium text-[#5B6170] hover:bg-white/70 hover:text-[#1B1F27]'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <FileTs
                        size={14}
                        weight={active ? 'fill' : 'regular'}
                        className={active ? 'text-[#4A4FB8]' : 'text-[#8A90A0]'}
                      />
                      <span className="truncate">{f.name}</span>
                    </span>
                    <HueTag hue={f.hue} size="xs">
                      {f.badge}
                    </HueTag>
                  </button>
                )
              })}
            </div>
            <div className="mt-auto rounded-[12px] bg-white px-3 py-2 text-[11px] text-[#6B7280]">
              拖动分隔线或双击把手恢复默认比例
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel id="hero-main" defaultSize="74%" minSize="40%">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel
                id="hero-editor"
                defaultSize="66%"
                minSize="35%"
                className="flex flex-col bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode size={15} weight="bold" className="text-[#4A4FB8]" />
                    <span className="font-glaze-mono text-[13px] font-bold text-[#1B1F27]">
                      {activeFile}
                    </span>
                  </div>
                  <StatusPill status="normal">
                    TypeScript 5.8
                  </StatusPill>
                </div>
                <pre className="mt-3 flex-1 overflow-auto rounded-[14px] bg-[#F6F7F9] p-3.5 font-glaze-mono text-[12px] leading-relaxed text-[#1B1F27]">
{`<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize="26%" minSize="18%">
    <FileExplorer active="${activeFile}" />
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="74%">
    <EditorSplitView />
  </ResizablePanel>
</ResizablePanelGroup>`}
                </pre>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel
                id="hero-terminal"
                defaultSize="34%"
                minSize="22%"
                onResize={(size) => setTerminalPct(size.asPercentage)}
                className="flex flex-col bg-[#1B1F27] p-3.5 text-[#E8EBF0]"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#8A90A0]">
                  <span className="flex items-center gap-1.5">
                    <TerminalWindow size={14} weight="bold" className="text-[#B5BAF6]" />
                    <span className="text-white">输出终端</span>
                  </span>
                  <span className="font-glaze-mono text-[#93DAD3]">✓ 0 errors · 180ms</span>
                </div>
                <div className="mt-2.5 flex flex-col gap-1 font-glaze-mono text-[11.5px] leading-relaxed">
                  <div>
                    <span className="text-[#93DAD3]">$</span> pnpm run build:registry
                  </div>
                  <div className="text-[#C5CAD3]">
                    Built @glaze/resizable → public/r/resizable.json
                  </div>
                  <div className="text-[#B2DE9F]">
                    ✓ TypeScript check passed for {activeFile}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

/* ============================================================================
 * 2. 分隔把手变体与色相（line / pill / gap + hue）
 * ========================================================================== */
function ResizableVariantsDemo() {
  const [variant, setVariant] = React.useState<ResizableHandleVariant>('gap')
  const [withHandle, setWithHandle] = React.useState(false)
  const [hue, setHue] = React.useState<Hue>('periwinkle')

  const isGap = variant === 'gap'

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedControl
            size="sm"
            value={variant}
            onValueChange={(v) => setVariant(v as ResizableHandleVariant)}
            options={[
              { value: 'line', label: 'line 细线' },
              { value: 'pill', label: 'pill 胶囊' },
              { value: 'gap', label: 'gap 釉面槽' },
            ]}
          />
          <SegmentedControl
            size="sm"
            value={hue}
            onValueChange={(v) => setHue(v as Hue)}
            options={[
              { value: 'periwinkle', label: '长春花' },
              { value: 'sky', label: '天蓝' },
              { value: 'mint', label: '薄荷' },
              { value: 'coral', label: '珊瑚' },
            ]}
          />
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#5B6170]">
          <span>显示图标把手</span>
          <Switch checked={withHandle} onCheckedChange={setWithHandle} hue={hue} />
        </div>
      </div>

      <div
        className={
          isGap
            ? 'h-[210px] w-full'
            : 'h-[210px] w-full overflow-hidden rounded-tile bg-white'
        }
      >
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="38%" minSize="22%">
            {isGap ? (
              <Tile
                tone="sky"
                className="h-full min-h-0 justify-between p-5"
              >
                <HueTag hue="sky" size="xs">
                  左栏 · Tile
                </HueTag>
                <div>
                  <div className="font-glaze-display text-[18px] font-extrabold text-[#123A5C]">
                    无描边釉面分栏
                  </div>
                  <p className="m-0 mt-1 text-[12.5px] text-[#24557F]">
                    variant=&quot;gap&quot; 保留画布留白，悬停即浮现胶囊抓手
                  </p>
                </div>
              </Tile>
            ) : (
              <div className="flex h-full flex-col justify-between bg-[#F6F7F9] p-5">
                <HueTag hue={hue} size="xs">
                  面板 A · {variant}
                </HueTag>
                <div>
                  <div className="font-glaze-display text-[17px] font-extrabold text-[#1B1F27]">
                    左侧导航区
                  </div>
                  <p className="m-0 mt-1 text-[12.5px] text-[#6B7280]">
                    悬停或拖拽分隔条查看 {hue} 色相高亮反馈
                  </p>
                </div>
              </div>
            )}
          </ResizablePanel>

          <ResizableHandle variant={variant} withHandle={withHandle} hue={hue} />

          <ResizablePanel defaultSize="62%" minSize="30%">
            {isGap ? (
              <Tile
                tone="white"
                className="h-full min-h-0 justify-between p-5"
              >
                <div className="flex items-center justify-between">
                  <HueTag hue={hue} size="xs">
                    右栏 · 主内容卡
                  </HueTag>
                  <StatusPill status="normal">已对齐画布</StatusPill>
                </div>
                <div>
                  <div className="font-glaze-display text-[18px] font-extrabold text-[#1B1F27]">
                    实时拖拽调整双卡宽度比例
                  </div>
                  <p className="m-0 mt-1 text-[12.5px] text-[#5B6170]">
                    遵循 Glaze 无边框无阴影原则，依靠画布与卡片底色对比区分层级
                  </p>
                </div>
              </Tile>
            ) : (
              <div className="flex h-full flex-col justify-between bg-white p-5">
                <HueTag hue="mint" size="xs">
                  面板 B · 主内容
                </HueTag>
                <div>
                  <div className="font-glaze-display text-[17px] font-extrabold text-[#1B1F27]">
                    工作区画布
                  </div>
                  <p className="m-0 mt-1 text-[12.5px] text-[#6B7280]">
                    支持鼠标、触控拖拽，以及 Tab 聚焦后使用左右方向键精细微调
                  </p>
                </div>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

/* ============================================================================
 * 3. 垂直上下分栏（SQL 查询台）
 * ========================================================================== */
function ResizableVerticalDemo() {
  return (
    <div className="h-[310px] w-full overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel
          defaultSize="48%"
          minSize="26%"
          className="flex flex-col bg-[#F6F7F9] p-4"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] font-bold text-[#123A5C]">
              <Database size={15} weight="bold" className="text-[#4A9BD8]" />
              <span>SQL 查询编辑器</span>
            </span>
            <HueTag hue="sky" size="xs">
              PostgreSQL 17
            </HueTag>
          </div>
          <pre className="mt-2.5 flex-1 overflow-auto rounded-[14px] bg-white p-3 font-glaze-mono text-[12px] leading-relaxed text-[#1B1F27]">
{`SELECT region, count(*) AS active_nodes, round(avg(latency_ms), 1) AS avg_p99
FROM cluster_telemetry
WHERE observed_at >= now() - interval '24 hours'
GROUP BY region
ORDER BY active_nodes DESC;`}
          </pre>
        </ResizablePanel>

        <ResizableHandle withHandle hue="sky" />

        <ResizablePanel
          defaultSize="52%"
          minSize="26%"
          className="flex flex-col bg-white p-4"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#1B1F27]">查询结果 · 3 行</span>
            <span className="font-glaze-mono text-[11.5px] text-[#2F6B28]">耗时 14.2 ms</span>
          </div>
          <div className="flex-1 overflow-auto rounded-[14px] bg-[#F6F7F9] p-2">
            <div className="grid grid-cols-3 border-b border-[#E8EBF0] px-3 py-1.5 text-[11.5px] font-bold text-[#6B7280]">
              <span>区域</span>
              <span className="text-right">活跃节点</span>
              <span className="text-right">平均 P99</span>
            </div>
            {[
              { region: '华东 · 上海', nodes: 48, p99: '16.4 ms' },
              { region: '华北 · 北京', nodes: 32, p99: '21.8 ms' },
              { region: '新加坡 · SG', nodes: 24, p99: '29.1 ms' },
            ].map((row) => (
              <div
                key={row.region}
                className="grid grid-cols-3 rounded-[10px] px-3 py-2 text-[12.5px] text-[#1B1F27] hover:bg-white"
              >
                <span className="font-semibold">{row.region}</span>
                <span className="text-right font-glaze-mono">{row.nodes}</span>
                <span className="text-right font-glaze-mono text-[#24557F]">{row.p99}</span>
              </div>
            ))}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

/* ============================================================================
 * 4. 可折叠侧栏与命令式控制（collapsible + usePanelRef + useGroupRef）
 * ========================================================================== */
function ResizableCollapsibleDemo() {
  const groupRef = useGroupRef()
  const sidebarRef = usePanelRef()
  const [collapsed, setCollapsed] = React.useState(false)
  const [pixelWidth, setPixelWidth] = React.useState(0)
  const [pctWidth, setPctWidth] = React.useState(28)

  const toggleSidebar = () => {
    const panel = sidebarRef.current
    if (!panel) return
    if (panel.isCollapsed()) {
      panel.expand()
    } else {
      panel.collapse()
    }
  }

  const resetLayout = () => {
    groupRef.current?.setLayout({ nav: 28, content: 72 })
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[18px] bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={toggleSidebar}>
            <SidebarSimple size={15} weight="bold" />
            <span>{collapsed ? '展开侧栏' : '折叠侧栏'}</span>
          </Button>
          <Button size="sm" variant="ghost" onClick={resetLayout}>
            <ArrowsClockwise size={14} weight="bold" />
            <span>重置 28 / 72</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 font-glaze-mono text-[12px] text-[#5B6170]">
          <StatusDot status={collapsed ? 'warning' : 'normal'} />
          <span>
            {collapsed ? '已折叠' : '已展开'} · {Math.round(pctWidth)}% ({Math.round(pixelWidth)}px)
          </span>
        </div>
      </div>

      <div className="h-[240px] w-full overflow-hidden rounded-tile bg-white">
        <ResizablePanelGroup groupRef={groupRef} orientation="horizontal">
          <ResizablePanel
            id="nav"
            panelRef={sidebarRef}
            defaultSize="28%"
            minSize="18%"
            maxSize="45%"
            collapsible
            collapsedSize="7%"
            onResize={(size) => {
              setPixelWidth(size.inPixels)
              setPctWidth(size.asPercentage)
              setCollapsed(size.asPercentage <= 8)
            }}
            className="flex flex-col bg-[#F6F7F9] p-3"
          >
            <div className="flex flex-col gap-1.5">
              {[
                { icon: Tray, label: '收件箱', count: 12 },
                { icon: Star, label: '星标项目', count: 4 },
                { icon: PaperPlaneTilt, label: '已发送', count: 29 },
              ].map((item) => (
                <div
                  key={item.label}
                  title={item.label}
                  className={`flex items-center rounded-[12px] bg-white px-2.5 py-2 text-[12.5px] font-semibold text-[#1B1F27] ${
                    collapsed ? 'justify-center px-0' : 'justify-between'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={16} weight="duotone" className="shrink-0 text-[#4A4FB8]" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </span>
                  {!collapsed && (
                    <span className="font-glaze-mono text-[11px] text-[#6B7280]">{item.count}</span>
                  )}
                </div>
              ))}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle hue="periwinkle" />

          <ResizablePanel id="content" defaultSize="72%" minSize="40%" className="flex flex-col justify-between p-5">
            <div>
              <HueTag hue="periwinkle" size="xs">
                collapsible + collapsedSize=&quot;7%&quot;
              </HueTag>
              <h4 className="m-0 mt-2 font-glaze-display text-[17px] font-extrabold text-[#123A5C]">
                拖过最小阈值自动吸附折叠为图标栏
              </h4>
              <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#5B6170]">
                将左侧分隔线持续向左拖过 18% 的最小宽度阈值时，侧栏会自动折叠至 7% 图标条；也可以通过
                <code className="mx-1 rounded bg-[#F2F3F5] px-1.5 py-0.5 font-glaze-mono text-[11.5px]">
                  usePanelRef()
                </code>
                调用 <code className="font-glaze-mono text-[11.5px]">collapse()</code> /{' '}
                <code className="font-glaze-mono text-[11.5px]">expand()</code> 命令式切换。
              </p>
            </div>
            <div className="rounded-[14px] bg-[#F3F4FE] px-3.5 py-2.5 text-[12px] text-[#262B7A]">
              小提示：键盘焦点位于分隔条时，按 <strong>Enter</strong> 键即可一键折叠/展开相邻可折叠面板。
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

/* ============================================================================
 * 5. 多档位吸附刻度（snapSizes + snapBehavior）
 * ========================================================================== */
function ResizableSnapDemo() {
  const [snapBehavior, setSnapBehavior] = React.useState<'on-drag' | 'on-release'>('on-drag')
  const [viewportPct, setViewportPct] = React.useState(55)

  const breakpoints = [
    { label: 'Mobile', pct: 35, icon: DeviceMobile },
    { label: 'Tablet', pct: 55, icon: DeviceTablet },
    { label: 'Laptop', pct: 75, icon: Laptop },
    { label: 'Wide', pct: 90, icon: Desktop },
  ]

  const currentBp =
    breakpoints.reduce((prev, curr) =>
      Math.abs(curr.pct - viewportPct) < Math.abs(prev.pct - viewportPct) ? curr : prev,
    )

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[18px] bg-white px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          {breakpoints.map((bp) => {
            const active = bp.label === currentBp.label
            return (
              <span
                key={bp.label}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold transition-colors ${
                  active
                    ? 'bg-[#D5F2EF] text-[#0B3D38]'
                    : 'bg-[#F6F7F9] text-[#6B7280]'
                }`}
              >
                <bp.icon size={13} weight={active ? 'fill' : 'regular'} />
                <span>
                  {bp.label} {bp.pct}%
                </span>
              </span>
            )
          })}
        </div>
        <SegmentedControl
          size="sm"
          value={snapBehavior}
          onValueChange={(v) => setSnapBehavior(v as 'on-drag' | 'on-release')}
          options={[
            { value: 'on-drag', label: '拖拽吸附' },
            { value: 'on-release', label: '松手吸附' },
          ]}
        />
      </div>

      <div className="h-[210px] w-full overflow-hidden rounded-tile bg-white">
        <ResizablePanelGroup orientation="horizontal" snapBehavior={snapBehavior}>
          <ResizablePanel
            id="snap-stage"
            defaultSize="55%"
            minSize="35%"
            maxSize="90%"
            snapSizes={['35%', '55%', '75%', '90%']}
            onResize={(size) => setViewportPct(size.asPercentage)}
            className="flex flex-col items-center justify-center bg-[#EDF9F8] p-5 text-center"
          >
            <currentBp.icon size={28} weight="duotone" className="text-[#17625B]" />
            <div className="mt-2 font-glaze-display text-[20px] font-extrabold text-[#0B3D38]">
              {currentBp.label} · {Math.round(viewportPct)}%
            </div>
            <p className="m-0 mt-1 text-[12px] text-[#17625B]">
              吸附档位：35% / 55% / 75% / 90%（{snapBehavior}）
            </p>
          </ResizablePanel>

          <ResizableHandle withHandle hue="aqua" />

          <ResizablePanel
            id="snap-backdrop"
            defaultSize="45%"
            minSize="10%"
            className="flex items-center justify-center bg-[#F6F7F9] p-4 text-center text-[12.5px] text-[#8A90A0]"
          >
            <span>画布外留白区</span>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

/* ============================================================================
 * 6. 延迟拖拽预览线（resizePreviewMode="separator"）
 * ========================================================================== */
function ResizableDeferredPreviewDemo() {
  const [commitCount, setCommitCount] = React.useState(0)
  const [lastLayout, setLastLayout] = React.useState<Layout>({ left: 45, right: 55 })

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[18px] bg-white px-4 py-2.5 text-[12.5px] text-[#5B6170]">
        <span className="flex items-center gap-2">
          <ArrowsHorizontal size={15} weight="bold" className="text-[#A6360F]" />
          <span>拖拽分隔线时仅移动珊瑚色预览线，松手后才重排重型面板</span>
        </span>
        <HueTag hue="coral" size="xs">
          已提交重排 {commitCount} 次
        </HueTag>
      </div>

      <div className="h-[200px] w-full overflow-hidden rounded-tile bg-white">
        <ResizablePanelGroup
          orientation="horizontal"
          resizePreviewMode="separator"
          onLayoutChanged={(layout, meta) => {
            setLastLayout(layout)
            if (meta.isUserInteraction) {
              setCommitCount((c) => c + 1)
            }
          }}
        >
          <ResizableSeparatorOverlay hue="coral" className="w-1" />
          <ResizablePanel
            id="left"
            defaultSize="45%"
            minSize="25%"
            className="flex flex-col justify-between bg-[#FEF2EE] p-5"
          >
            <HueTag hue="coral" size="xs">
              重型图表画布
            </HueTag>
            <div>
              <div className="font-glaze-display text-[24px] font-extrabold text-[#5E1E0A] tabular-nums">
                {Math.round(lastLayout.left ?? 45)}%
              </div>
              <div className="text-[12px] text-[#A6360F]">避免拖拽过程中高频重绘 SVG / Canvas</div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle hue="coral" />

          <ResizablePanel
            id="right"
            defaultSize="55%"
            minSize="25%"
            className="flex flex-col justify-between bg-white p-5"
          >
            <HueTag hue="peach" size="xs">
              万行数据表格
            </HueTag>
            <div>
              <div className="font-glaze-display text-[24px] font-extrabold text-[#4D2306] tabular-nums">
                {Math.round(lastLayout.right ?? 55)}%
              </div>
              <div className="text-[12px] text-[#8A4B12]">松手瞬间触发 onLayoutChanged 提交布局</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

/* ============================================================================
 * 7. 布局持久化（useDefaultLayout）
 * ========================================================================== */
function ResizablePersistenceDemo() {
  const groupRef = useGroupRef()
  const storage = React.useMemo(
    () => (typeof window !== 'undefined' ? window.localStorage : undefined),
    [],
  )
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'glaze-docs-resizable-persist-v1',
    storage,
  })
  const [snapshot, setSnapshot] = React.useState<Layout>(
    defaultLayout ?? { colA: 25, colB: 50, colC: 25 },
  )

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[18px] bg-white px-4 py-2.5">
        <span className="font-glaze-mono text-[12px] text-[#5B6170]">
          localStorage: {JSON.stringify(
            Object.fromEntries(
              Object.entries(snapshot).map(([k, v]) => [k, Math.round(v)]),
            ),
          )}
        </span>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            const next = { colA: 25, colB: 50, colC: 25 }
            groupRef.current?.setLayout(next)
            setSnapshot(next)
            onLayoutChanged(next, { isUserInteraction: false })
          }}
        >
          <ArrowsClockwise size={14} weight="bold" />
          <span>恢复默认 25 / 50 / 25</span>
        </Button>
      </div>

      <div className="h-[190px] w-full overflow-hidden rounded-tile bg-white">
        <ResizablePanelGroup
          groupRef={groupRef}
          orientation="horizontal"
          defaultLayout={defaultLayout}
          onLayoutChanged={(layout, meta) => {
            onLayoutChanged(layout, meta)
            setSnapshot(layout)
          }}
        >
          <ResizablePanel
            id="colA"
            defaultSize="25%"
            minSize="15%"
            className="flex flex-col items-center justify-center bg-[#F1FAEC] p-4"
          >
            <span className="text-[11px] font-bold text-[#2F6B28]">左栏 colA</span>
            <span className="mt-1 font-glaze-display text-[22px] font-extrabold text-[#173F12] tabular-nums">
              {Math.round(snapshot.colA ?? 25)}%
            </span>
          </ResizablePanel>

          <ResizableHandle variant="pill" hue="mint" />

          <ResizablePanel
            id="colB"
            defaultSize="50%"
            minSize="25%"
            className="flex flex-col items-center justify-center bg-white p-4"
          >
            <span className="text-[11px] font-bold text-[#6B7280]">主栏 colB</span>
            <span className="mt-1 font-glaze-display text-[22px] font-extrabold text-[#1B1F27] tabular-nums">
              {Math.round(snapshot.colB ?? 50)}%
            </span>
          </ResizablePanel>

          <ResizableHandle variant="pill" hue="mint" />

          <ResizablePanel
            id="colC"
            defaultSize="25%"
            minSize="15%"
            className="flex flex-col items-center justify-center bg-[#EEF7FD] p-4"
          >
            <span className="text-[11px] font-bold text-[#24557F]">右栏 colC</span>
            <span className="mt-1 font-glaze-display text-[22px] font-extrabold text-[#123A5C] tabular-nums">
              {Math.round(snapshot.colC ?? 25)}%
            </span>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

/* ============================================================================
 * 8. 三栏邮件工作台（真实业务组合场景）
 * ========================================================================== */
const MAIL_ITEMS = [
  {
    id: 'm1',
    from: '林知夏 · 设计系统',
    subject: 'Glaze v2.1 日历与分栏组件走查记录',
    time: '10:24',
    tag: '设计评审',
    hue: 'periwinkle' as const,
    body: '已完成 Calendar 与 Resizable 的亮色釉面视觉验收：无描边白卡与 #F2F4F8 画布层级清晰，键盘焦点与范围连续胶囊过渡自然，可以合并发布。',
  },
  {
    id: 'm2',
    from: '周牧野 · 基础设施',
    subject: '华东边缘集群 HTTP/3 灰度完成通知',
    time: '09:12',
    tag: '发布公告',
    hue: 'mint' as const,
    body: '上海与杭州 42 个边缘接入点已完成 QUIC 协议切换，P99 建连延迟下降 28%，当前错误率 0.00%。',
  },
  {
    id: 'm3',
    from: '许念 · 产品运营',
    subject: 'Q4 开发者文档站搜索热词周报',
    time: '昨天',
    tag: '周报',
    hue: 'sky' as const,
    body: '本周组件文档站访问量环比增长 34%，其中 DataTable、Form 与 Calendar 的示例代码复制次数位列前三。',
  },
]

function ResizableMailWorkbenchDemo() {
  const [selectedId, setSelectedId] = React.useState(MAIL_ITEMS[0].id)
  const activeMail = MAIL_ITEMS.find((m) => m.id === selectedId) ?? MAIL_ITEMS[0]

  return (
    <div className="h-[290px] w-full overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          id="mail-list"
          defaultSize="38%"
          minSize="28%"
          maxSize="52%"
          className="flex flex-col bg-[#F6F7F9] p-3"
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#123A5C]">
              <EnvelopeSimple size={15} weight="duotone" className="text-[#4A4FB8]" />
              <span>收件箱</span>
            </span>
            <HueTag hue="periwinkle" size="xs">
              3 封未读
            </HueTag>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 overflow-auto">
            {MAIL_ITEMS.map((item) => {
              const selected = item.id === activeMail.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`flex w-full cursor-pointer flex-col gap-1 rounded-[14px] border-0 p-3 text-left transition-colors ${
                    selected ? 'bg-white' : 'bg-transparent hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12.5px] font-bold text-[#1B1F27]">
                      {item.from}
                    </span>
                    <span className="shrink-0 font-glaze-mono text-[11px] text-[#8A90A0]">
                      {item.time}
                    </span>
                  </div>
                  <div className="truncate text-[12px] text-[#5B6170]">{item.subject}</div>
                </button>
              )
            })}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          id="mail-detail"
          defaultSize="62%"
          minSize="42%"
          className="flex flex-col justify-between bg-white p-5"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <HueTag hue={activeMail.hue} size="sm">
                {activeMail.tag}
              </HueTag>
              <span className="font-glaze-mono text-[11.5px] text-[#8A90A0]">{activeMail.time}</span>
            </div>
            <h4 className="m-0 mt-3 font-glaze-display text-[17px] font-extrabold text-[#123A5C]">
              {activeMail.subject}
            </h4>
            <div className="mt-1 text-[12.5px] font-medium text-[#6B7280]">
              发件人：{activeMail.from}
            </div>
            <p className="m-0 mt-4 text-[13.5px] leading-relaxed text-[#1B1F27]">
              {activeMail.body}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-[#EEF0F3] pt-3 text-[11.5px] text-[#8A90A0]">
            <span>Tab 聚焦把手 · ← / → 调整比例 · 双击恢复默认</span>
            <Button size="sm" variant="primary">
              回复
            </Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

/* ============================================================================
 * Exported Demo Group
 * ========================================================================== */
export const RESIZABLE_DEMO: ComponentDemoGroup = {
  hero: {
    align: 'start',
    minHeight: 400,
    surface: 'canvas',
    render: () => <ResizableHeroDemo />,
    code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export function WorkspaceExample() {
  return (
    <div className="h-[340px] w-full overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="26%" minSize="18%" maxSize="42%">
          {/* 左侧文件树 */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="74%" minSize="40%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="66%" minSize="35%">
              {/* 顶部编辑器 */}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="34%" minSize="22%">
              {/* 底部终端输出 */}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}`,
  },
  examples: [
    {
      id: 'handle-variants',
      title: '分隔把手变体与色相（line / pill / gap + hue）',
      description:
        '内置细线（line）、柔和胶囊（pill）与透明画布槽（gap）三种分隔条形态；其中 gap 专为在 #F2F4F8 画布上无描边分割多张 Glaze Tile 卡片打造，并支持 9 组色相自定义悬停与拖拽高亮色。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizableVariantsDemo />,
      code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Tile } from '@/components/ui/tile'

export function GapTilesExample() {
  return (
    <div className="h-[210px] w-full">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="38%" minSize="22%">
          <Tile tone="sky" className="h-full min-h-0">左侧釉面卡</Tile>
        </ResizablePanel>
        <ResizableHandle variant="gap" hue="periwinkle" />
        <ResizablePanel defaultSize="62%" minSize="30%">
          <Tile tone="white" className="h-full min-h-0">右侧主内容卡</Tile>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}`,
    },
    {
      id: 'vertical-split',
      title: '垂直上下分栏（orientation="vertical"）',
      description:
        '将 orientation 设为 "vertical" 即可构建上下分栏，ResizableHandle 会自动感应父分组方向并切换为水平分隔把手与上下拖拽光标。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizableVerticalDemo />,
      code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export function VerticalSplitExample() {
  return (
    <div className="h-[310px] w-full overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize="48%" minSize="26%">
          {/* SQL 编辑器 */}
        </ResizablePanel>
        <ResizableHandle withHandle hue="sky" />
        <ResizablePanel defaultSize="52%" minSize="26%">
          {/* 查询结果表 */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}`,
    },
    {
      id: 'collapsible-sidebar',
      title: '可折叠面板与命令式控制（collapsible + usePanelRef）',
      description:
        '为侧栏面板配置 collapsible、collapsedSize 与 minSize，拖过阈值自动折叠为窄图标栏；结合 usePanelRef 与 useGroupRef 可随时以编程方式折叠、展开或重置布局。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizableCollapsibleDemo />,
      code: `import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useGroupRef,
  usePanelRef,
} from '@/components/ui/resizable'

export function CollapsibleExample() {
  const groupRef = useGroupRef()
  const sidebarRef = usePanelRef()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            sidebarRef.current?.isCollapsed()
              ? sidebarRef.current.expand()
              : sidebarRef.current?.collapse()
          }
        >
          切换侧栏折叠
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => groupRef.current?.setLayout({ nav: 28, content: 72 })}
        >
          重置比例
        </Button>
      </div>
      <div className="h-[240px] overflow-hidden rounded-tile bg-white">
        <ResizablePanelGroup groupRef={groupRef} orientation="horizontal">
          <ResizablePanel
            id="nav"
            panelRef={sidebarRef}
            defaultSize="28%"
            minSize="18%"
            maxSize="45%"
            collapsible
            collapsedSize="7%"
          >
            {/* 导航项 */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel id="content" defaultSize="72%" minSize="40%">
            {/* 主内容 */}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}`,
    },
    {
      id: 'snap-sizes',
      title: '多档位吸附刻度（snapSizes + snapBehavior）',
      description:
        '通过 snapSizes 指定固定百分比或像素断点，支持拖拽过程中实时吸附（on-drag）或松手时平滑归位（on-release），非常适合响应式视口预览器。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizableSnapDemo />,
      code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export function SnapViewportExample() {
  return (
    <div className="h-[210px] overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup orientation="horizontal" snapBehavior="on-drag">
        <ResizablePanel
          id="stage"
          defaultSize="55%"
          minSize="35%"
          maxSize="90%"
          snapSizes={['35%', '55%', '75%', '90%']}
        >
          {/* 响应式预览舞台 */}
        </ResizablePanel>
        <ResizableHandle withHandle hue="aqua" />
        <ResizablePanel id="backdrop" defaultSize="45%" minSize="10%">
          {/* 画布留白 */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}`,
    },
    {
      id: 'deferred-preview',
      title: '延迟拖拽预览线（resizePreviewMode="separator"）',
      description:
        '当面板内部包含重型图表、拓扑画布或大表格时，开启 resizePreviewMode="separator" 并挂载 ResizableSeparatorOverlay，拖拽期间仅移动轻量预览线，松手后一次性提交布局重排。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizableDeferredPreviewDemo />,
      code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ResizableSeparatorOverlay,
} from '@/components/ui/resizable'

export function DeferredPreviewExample() {
  return (
    <div className="h-[200px] overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup
        orientation="horizontal"
        resizePreviewMode="separator"
        onLayoutChanged={(layout, meta) => {
          if (meta.isUserInteraction) console.log('Committed:', layout)
        }}
      >
        <ResizableSeparatorOverlay hue="coral" className="w-1" />
        <ResizablePanel id="left" defaultSize="45%" minSize="25%">
          {/* 重型图表 */}
        </ResizablePanel>
        <ResizableHandle withHandle hue="coral" />
        <ResizablePanel id="right" defaultSize="55%" minSize="25%">
          {/* 大数据表格 */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}`,
    },
    {
      id: 'layout-persistence',
      title: '布局持久化记忆（useDefaultLayout）',
      description:
        '借助 react-resizable-panels v4 内置的 useDefaultLayout Hook 将分栏比例写入 localStorage，刷新页面后自动还原用户上次拖拽的布局。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizablePersistenceDemo />,
      code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useDefaultLayout,
} from '@/components/ui/resizable'

export function PersistedLayoutExample() {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'my-dashboard-split',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  })

  return (
    <div className="h-[190px] overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup
        orientation="horizontal"
        defaultLayout={defaultLayout}
        onLayoutChanged={onLayoutChanged}
      >
        <ResizablePanel id="colA" defaultSize="25%" minSize="15%" />
        <ResizableHandle variant="pill" hue="mint" />
        <ResizablePanel id="colB" defaultSize="50%" minSize="25%" />
        <ResizableHandle variant="pill" hue="mint" />
        <ResizablePanel id="colC" defaultSize="25%" minSize="15%" />
      </ResizablePanelGroup>
    </div>
  )
}`,
    },
    {
      id: 'mail-workbench',
      title: '经典收件箱分栏工作台（键盘无障碍）',
      description:
        '结合列表与详情面板的常见业务分栏示例。分隔把手原生实现 WAI-ARIA role="separator"，支持 Tab 聚焦、方向键调节、Home/End 跳至极值与双击复位。',
      align: 'start',
      surface: 'canvas',
      render: () => <ResizableMailWorkbenchDemo />,
      code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export function MailWorkbench() {
  return (
    <div className="h-[290px] overflow-hidden rounded-tile bg-white">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel id="mail-list" defaultSize="38%" minSize="28%" maxSize="52%">
          {/* 邮件列表 */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel id="mail-detail" defaultSize="62%" minSize="42%">
          {/* 邮件正文预览 */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}`,
    },
  ],
}
