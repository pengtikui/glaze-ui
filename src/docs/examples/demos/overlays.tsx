import * as React from 'react'
import {
  Bell,
  Copy,
  Gear,
  Info,
  Lightning,
  SlidersHorizontal,
  Trash,
} from '@phosphor-icons/react'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Avatar, AvatarGroup } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Drawer } from '@/components/ui/drawer'
import { Field, FieldLabel } from '@/components/ui/field'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { Meter } from '@/components/ui/meter'
import { Popover } from '@/components/ui/popover'
import { PreviewCard } from '@/components/ui/preview-card'
import { Progress, SegmentedProgress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { SparkChart } from '@/components/ui/spark-chart'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/toast'
import { Tooltip } from '@/components/ui/tooltip'
import type { ComponentDemoGroup } from '@/docs/examples/types'

function DialogControlledFormDemo() {
  const toast = useToast()
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState('Grafana')
  const [url, setUrl] = React.useState('https://metrics.internal')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
    toast({ title: `已保存服务「${name}」`, description: url, status: 'normal' })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="primary">受控表单对话框</Button>}
      title="编辑监控入口"
      description="提交表单后由受控状态关闭对话框并触发 Toast 提示"
      footer={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button type="submit" form="edit-service-form">
            保存修改
          </Button>
        </>
      }
    >
      <form id="edit-service-form" onSubmit={handleSave} className="flex flex-col gap-3">
        <Field name="name">
          <FieldLabel>服务名称</FieldLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field name="url">
          <FieldLabel>访问地址</FieldLabel>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} required />
        </Field>
      </form>
    </Dialog>
  )
}

function DialogNestedDemo() {
  const toast = useToast()
  return (
    <Dialog
      trigger={<Button variant="secondary">打开主对话框（支持嵌套）</Button>}
      title="集群发布设置"
      description="参考 Base UI 嵌套对话框模式：主弹窗内部可继续唤起子级确认弹窗"
      footer={<DialogClose render={<Button variant="secondary">完成</Button>} />}
    >
      <div className="flex flex-col gap-4">
        <p className="m-0 text-[13px] leading-relaxed text-[#5B6170]">
          调整完灰度权重后，可直接在此唤起子级弹窗进行敏感操作确认，Esc 键会按层级依次关闭。
        </p>
        <div className="flex items-center justify-between rounded-[16px] bg-[#F6F7F9] p-3.5">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold">清理全部边缘缓存</span>
            <span className="text-[12px] text-[#6B7280]">将触发全球节点回源刷新</span>
          </div>
          <Dialog
            maxWidth="400px"
            trigger={<Button size="sm" variant="danger">立即清理</Button>}
            title="确认清理缓存？"
            description="清理后约 30 秒内回源带宽会短暂上升。"
            footer={
              <>
                <DialogClose render={<Button size="sm" variant="secondary">返回</Button>} />
                <DialogClose
                  render={
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => toast({ title: '已下发全球缓存清理指令', status: 'warning' })}
                    >
                      确认清理
                    </Button>
                  }
                />
              </>
            }
          />
        </div>
      </div>
    </Dialog>
  )
}

function AlertDialogProgrammaticDemo() {
  const toast = useToast()
  const [target, setTarget] = React.useState<string | null>(null)
  const items = ['nas-volume-01', 'edge-cache-sg']
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {items.map((id) => (
        <div key={id} className="flex items-center justify-between rounded-[14px] bg-[#F6F7F9] px-4 py-2.5">
          <span className="font-glaze-mono text-[13px] font-semibold">{id}</span>
          <Button size="sm" variant="danger" onClick={() => setTarget(id)}>
            卸载
          </Button>
        </div>
      ))}
      <AlertDialog
        open={Boolean(target)}
        onOpenChange={(open) => {
          if (!open) setTarget(null)
        }}
        title={`卸载卷 ${target ?? ''}？`}
        description="卸载后正在写入的容器将暂时无法访问该卷，但数据不会被删除。"
        confirmLabel="确认卸载"
        cancelLabel="保留挂载"
        danger
        onConfirm={() => {
          toast({ title: `已安全卸载 ${target}`, status: 'warning' })
          setTarget(null)
        }}
      />
    </div>
  )
}

function DrawerListDetailDemo() {
  const nodes = [
    { id: 'cn-sh-01', name: '华东主节点', cpu: 42, mem: 61, status: 'normal' as const },
    { id: 'ap-sg-02', name: '新加坡边缘', cpu: 84, mem: 78, status: 'warning' as const },
  ]
  const [active, setActive] = React.useState<(typeof nodes)[number] | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {nodes.map((node) => (
        <button
          key={node.id}
          type="button"
          onClick={() => setActive(node)}
          className="flex cursor-pointer items-center justify-between rounded-[16px] bg-[#F6F7F9] px-4 py-3 text-left transition-colors hover:bg-[#EEF0F4]"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#1B1F27]">{node.name}</span>
            <span className="font-glaze-mono text-[11px] text-[#6B7280]">{node.id}</span>
          </div>
          <StatusPill status={node.status} size="sm" label={node.status === 'normal' ? '健康' : '高负载'} />
        </button>
      ))}
      <Drawer
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
        side="right"
        title={active ? `${active.name} (${active.id})` : ''}
        description="共享单个受控 Drawer 实例动态切换节点详情"
      >
        {active && (
          <div className="flex flex-col gap-4">
            <Meter value={active.cpu} label="CPU 负载" valueLabel={`${active.cpu}%`} />
            <Meter value={active.mem} label="内存占用" valueLabel={`${active.mem}%`} />
          </div>
        )}
      </Drawer>
    </div>
  )
}

function AlertDialogControlledDemo() {
  const toast = useToast()
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="soft" hue="periwinkle">发布到生产环境</Button>}
        title="确认发布 v2.4.0 至生产集群？"
        description="将按金丝雀策略分批滚动更新 14 个边缘节点，预计耗时 2 分钟。"
        confirmLabel="开始发布"
        cancelLabel="暂不发布"
        danger={false}
        onConfirm={() => toast({ title: '已启动 v2.4.0 滚动发布', status: 'normal' })}
      />
    </div>
  )
}

function DrawerHeroDemo() {
  const [rightOpen, setRightOpen] = React.useState(false)
  const [bottomOpen, setBottomOpen] = React.useState(false)
  return (
    <div className="flex flex-wrap gap-2.5">
      <Drawer
        open={rightOpen}
        onOpenChange={setRightOpen}
        side="right"
        trigger={<Button variant="primary">打开右侧抽屉</Button>}
        title="节点配置检查"
        description="支持手势向右拖拽或点击遮罩关闭"
      >
        <div className="flex flex-col gap-3 text-[14px] text-[#5B6170]">
          <p className="m-0">采用 300ms 进场 / 220ms 退场纯 CSS GPU 合成动画。</p>
          <StatusPill status="normal" label="所有检查项已通过" />
        </div>
      </Drawer>
      <Drawer
        open={bottomOpen}
        onOpenChange={setBottomOpen}
        side="bottom"
        trigger={<Button variant="secondary">打开底部抽屉</Button>}
        title="快捷操作面板"
        description="移动端友好的底部滑出抽屉"
      >
        <p className="m-0 text-[14px] text-[#5B6170]">向下拖动把手可流畅关闭。</p>
      </Drawer>
    </div>
  )
}

function DrawerFormFooterDemo() {
  const toast = useToast()
  const [open, setOpen] = React.useState(false)
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      trigger={<Button variant="soft" hue="sky">新建告警规则</Button>}
      title="新建告警规则"
      description="配置阈值与通知通道，底部固定操作栏始终可见"
      footer={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              toast({ title: '告警规则已启用', status: 'normal' })
            }}
          >
            保存规则
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field name="rule">
          <FieldLabel>规则名称</FieldLabel>
          <Input defaultValue="CPU 持续超载告警" />
        </Field>
        <Slider defaultValue={85} label="触发阈值" unit="%" hue="coral" />
        <label className="flex cursor-pointer items-center justify-between rounded-[14px] bg-[#F6F7F9] px-4 py-3 text-[13px] font-semibold">
          <span>同时推送飞书机器人</span>
          <Switch defaultChecked hue="mint" />
        </label>
      </div>
    </Drawer>
  )
}

function PopoverQuickTuneDemo() {
  const [rate, setRate] = React.useState(60)
  const [auto, setAuto] = React.useState(true)
  return (
    <Popover
      trigger={
        <Button variant="soft" hue="periwinkle">
          <SlidersHorizontal size={16} weight="bold" />
          <span>采样率 {rate}%</span>
        </Button>
      }
      title="实时链路采样配置"
      description="修改立即生效，无需重启网关"
    >
      <div className="flex w-64 flex-col gap-4 pt-2">
        <Slider value={rate} onValueChange={(v) => setRate(Number(v))} label="采样比例" unit="%" hue="periwinkle" />
        <label className="flex cursor-pointer items-center justify-between text-[13px] font-medium">
          <span>异常请求强制全量采样</span>
          <Switch size="sm" checked={auto} onCheckedChange={setAuto} hue="mint" />
        </label>
      </div>
    </Popover>
  )
}

function ToastHeroDemo() {
  const toast = useToast()
  const [count, setCount] = React.useState(1)
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button
        variant="primary"
        onClick={() => {
          toast({ title: `构建部署成功 #${count}`, description: '边缘节点已全部热更新完成', status: 'normal' })
          setCount((c) => c + 1)
        }}
      >
        触发成功通知
      </Button>
      <Button
        variant="soft"
        hue="peach"
        onClick={() => toast({ title: '存储水位偏高', description: 'NAS 卷 2 已使用 86%', status: 'warning' })}
      >
        触发警告
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ title: '节点连接超时', description: 'ap-sg-02 心跳中断 15s', status: 'error' })}
      >
        触发异常
      </Button>
    </div>
  )
}

function ToastUndoActionDemo() {
  const toast = useToast()
  const [deleted, setDeleted] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="danger"
        disabled={deleted}
        onClick={() => {
          setDeleted(true)
          toast({
            title: '已归档快照 snap-2026-11',
            description: '可在 30 天内从回收站恢复',
            status: 'warning',
            actionLabel: '撤销操作',
            onAction: () => {
              setDeleted(false)
              toast({ title: '已撤销归档', status: 'normal' })
            },
          })
        }}
      >
        <Trash size={15} />
        <span>{deleted ? '已归档（点击通知中撤销）' : '归档快照并支持撤销'}</span>
      </Button>
      {deleted && (
        <Button size="sm" variant="secondary" onClick={() => setDeleted(false)}>
          手动恢复
        </Button>
      )}
    </div>
  )
}

function ToastStackingDemo() {
  const toast = useToast()
  const fireBatch = () => {
    toast({ title: '1/3 校验 Registry Schema', status: 'info' })
    window.setTimeout(() => toast({ title: '2/3 生成 58 个组件 JSON', status: 'normal' }), 260)
    window.setTimeout(() => toast({ title: '3/3 已更新 public/llms-full.txt', status: 'normal' }), 520)
  }
  return (
    <Button variant="secondary" onClick={fireBatch}>
      <Lightning size={16} weight="bold" />
      <span>连续发送 3 条堆叠通知</span>
    </Button>
  )
}

function ProgressInteractiveDemo() {
  const [val, setVal] = React.useState(64)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Progress value={val} label="制品上传进度" showValue hue="sky" height="lg" />
      <Progress value={null} label="正在连接远程节点（不确定状态）" hue="periwinkle" height="sm" />
      <div className="flex items-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => setVal((v) => Math.max(0, v - 15))}>
          -15%
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setVal((v) => Math.min(100, v + 15))}>
          +15%
        </Button>
        <Button size="sm" variant="soft" hue="mint" onClick={() => setVal(100)}>
          完成 100%
        </Button>
      </div>
    </div>
  )
}

function MeterInteractiveDemo() {
  const [load, setLoad] = React.useState(62)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Meter
        value={load}
        label="实时内存水位（auto 阈值自动变色）"
        valueLabel={`${load}%`}
      />
      <Slider
        value={load}
        onValueChange={(v) => setLoad(Number(v))}
        min={0}
        max={100}
        label="拖动模拟负载变化"
        unit="%"
        hue="sky"
      />
    </div>
  )
}

export const OVERLAYS_DEMOS: Record<string, ComponentDemoGroup> = {
  dialog: {
    hero: {
      render: () => (
        <Dialog
          trigger={<Button variant="primary">打开对话框</Button>}
          title="新增内网服务入口"
          description="采用 28px 圆角与纯 CSS 200ms 进场动画（无 backdrop-blur）"
          footer={
            <>
              <DialogClose render={<Button variant="secondary">取消</Button>} />
              <DialogClose render={<Button variant="primary">确认保存</Button>} />
            </>
          }
        >
          <Input placeholder="输入服务名称，例如 Grafana" />
        </Dialog>
      ),
      code: `import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Dialog
      trigger={<Button variant="primary">打开对话框</Button>}
      title="新增内网服务入口"
      description="配置后将同步到应用发射台"
      footer={
        <>
          <DialogClose render={<Button variant="secondary">取消</Button>} />
          <DialogClose render={<Button variant="primary">确认保存</Button>} />
        </>
      }
    >
      <Input placeholder="输入服务名称，例如 Grafana" />
    </Dialog>
  )
}`,
    },
    examples: [
      {
        id: 'controlled-form',
        title: '受控表单提交',
        description: '通过 open 与 onOpenChange 控制关闭时机，在表单校验提交后关闭并通知用户。',
        minHeight: 150,
        render: () => <DialogControlledFormDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function Example() {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>受控表单对话框</Button>}
      title="编辑监控入口"
      footer={<Button onClick={() => setOpen(false)}>保存修改</Button>}
    >
      <Input defaultValue="Grafana" />
    </Dialog>
  )
}`,
      },
      {
        id: 'nested-dialogs',
        title: '嵌套对话框',
        description: '参考 Base UI 嵌套模式：在主对话框内打开二级确认弹窗，键盘焦点与 Esc 键逐层回收。',
        minHeight: 150,
        render: () => <DialogNestedDemo />,
        code: `import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'

export function Example() {
  return (
    <Dialog
      trigger={<Button variant="secondary">打开主对话框</Button>}
      title="集群发布设置"
      footer={<DialogClose render={<Button variant="secondary">完成</Button>} />}
    >
      <Dialog
        maxWidth="400px"
        trigger={<Button size="sm" variant="danger">清理缓存</Button>}
        title="确认清理缓存？"
        footer={<DialogClose render={<Button size="sm" variant="danger">确认</Button>} />}
      />
    </Dialog>
  )
}`,
      },
      {
        id: 'wide-scrollable',
        title: '自定义宽度与长内容滚动（maxWidth）',
        description: '通过 maxWidth 扩展弹窗尺寸，内容超出视口高度时由 BaseDialog.Viewport 原生流畅滚动。',
        minHeight: 150,
        render: () => (
          <Dialog
            maxWidth="620px"
            trigger={<Button variant="soft" hue="sky">查看发布说明（宽版 620px）</Button>}
            title="Glaze UI v2.0 发布说明"
            description="完整架构升级与迁移清单"
            footer={<DialogClose render={<Button>我知道了</Button>} />}
          >
            <div className="flex flex-col gap-3 text-[13.5px] leading-relaxed text-[#5B6170]">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="rounded-[16px] bg-[#F6F7F9] p-3.5">
                  <strong className="text-[#1B1F27]">更新条目 #{i + 1}</strong>
                  <p className="m-0 mt-1">
                    全面升级至 Base UI 1.9 原生过渡状态属性，移除浮层遮罩模糊以确保 60fps 帧率。
                  </p>
                </div>
              ))}
            </div>
          </Dialog>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'

export function Example() {
  return (
    <Dialog
      maxWidth="620px"
      trigger={<Button variant="soft" hue="sky">查看发布说明</Button>}
      title="Glaze UI v2.0 发布说明"
      footer={<DialogClose render={<Button>我知道了</Button>} />}
    >
      <p>支持超长内容自动滚动...</p>
    </Dialog>
  )
}`,
      },
    ],
  },

  'alert-dialog': {
    hero: {
      render: () => (
        <AlertDialog
          trigger={<Button variant="danger">销毁集群节点</Button>}
          title="确认销毁该节点？"
          description="此操作不可撤销，该节点上的临时缓存卷将被永久清除。"
          confirmLabel="确认销毁"
          danger
        />
      ),
      code: `import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <AlertDialog
      trigger={<Button variant="danger">销毁集群节点</Button>}
      title="确认销毁该节点？"
      description="此操作不可撤销，该节点上的临时缓存卷将被永久清除。"
      confirmLabel="确认销毁"
      danger
    />
  )
}`,
    },
    examples: [
      {
        id: 'non-destructive',
        title: '非破坏性确认与执行回调（danger={false}）',
        description: '设置 danger={false} 切换为主色确认按钮，用于上线发布、权限移交等需要显式确认的关键流程。',
        minHeight: 150,
        render: () => <AlertDialogControlledDemo />,
        code: `import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <AlertDialog
      trigger={<Button variant="soft" hue="periwinkle">发布到生产环境</Button>}
      title="确认发布 v2.4.0 至生产集群？"
      description="将按金丝雀策略分批滚动更新 14 个边缘节点。"
      confirmLabel="开始发布"
      cancelLabel="暂不发布"
      danger={false}
      onConfirm={() => console.log('deploy started')}
    />
  )
}`,
      },
      {
        id: 'programmatic-shared',
        title: '列表复用单个受控确认框',
        description: '省略 trigger，通过状态保存待确认条目 ID，多个列表项共享同一个 AlertDialog 实例。',
        render: () => <AlertDialogProgrammaticDemo />,
        code: `import * as React from 'react'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function Example() {
  const [target, setTarget] = React.useState<string | null>(null)
  return (
    <>
      <Button size="sm" variant="danger" onClick={() => setTarget('nas-volume-01')}>卸载卷</Button>
      <AlertDialog
        open={Boolean(target)}
        onOpenChange={(open) => !open && setTarget(null)}
        title={\`卸载卷 \${target ?? ''}？\`}
        description="卸载后正在写入的容器将暂时无法访问该卷。"
        confirmLabel="确认卸载"
        onConfirm={() => setTarget(null)}
      />
    </>
  )
}`,
      },
    ],
  },

  drawer: {
    hero: {
      render: () => <DrawerHeroDemo />,
      code: `import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'

export function Example() {
  return (
    <div className="flex gap-2.5">
      <Drawer side="right" trigger={<Button>打开右侧抽屉</Button>} title="节点配置检查">
        <p>支持向右滑动手势关闭。</p>
      </Drawer>
      <Drawer side="bottom" trigger={<Button variant="secondary">打开底部抽屉</Button>} title="快捷操作">
        <p>支持向下滑动手势关闭。</p>
      </Drawer>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'form-with-footer',
        title: '带底部操作栏的表单抽屉（footer）',
        description: '传入 footer 会在抽屉底部自动固定分割线与操作按钮，中间内容区独立滚动。',
        minHeight: 150,
        render: () => <DrawerFormFooterDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'

export function Example() {
  const [open, setOpen] = React.useState(false)
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      trigger={<Button variant="soft" hue="sky">新建告警规则</Button>}
      title="新建告警规则"
      footer={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={() => setOpen(false)}>保存规则</Button>
        </>
      }
    >
      <Input defaultValue="CPU 持续超载告警" />
    </Drawer>
  )
}`,
      },
      {
        id: 'list-detail-drawer',
        title: '列表点击唤起受控详情抽屉',
        description: '点击列表中的任意节点项，使用同一个受控 Drawer 动态加载该节点的实时负载详情。',
        render: () => <DrawerListDetailDemo />,
        code: `import * as React from 'react'
import { Drawer } from '@/components/ui/drawer'
import { Meter } from '@/components/ui/meter'

export function Example() {
  const [active, setActive] = React.useState<{ id: string; cpu: number } | null>(null)
  return (
    <>
      <button type="button" onClick={() => setActive({ id: 'cn-sh-01', cpu: 42 })}>查看节点</button>
      <Drawer open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)} title={active?.id ?? ''}>
        {active && <Meter value={active.cpu} label="CPU 负载" valueLabel={\`\${active.cpu}%\`} />}
      </Drawer>
    </>
  )
}`,
      },
    ],
  },

  popover: {
    hero: {
      render: () => (
        <Popover
          trigger={<Button variant="secondary">筛选条件</Button>}
          title="按区域筛选"
          description="实时过滤当前画布指标"
        >
          <div className="flex flex-col gap-2 pt-2">
            <Checkbox defaultChecked label="华东集群" />
            <Checkbox defaultChecked label="亚太边缘" />
          </div>
        </Popover>
      ),
      code: `import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover } from '@/components/ui/popover'

export function Example() {
  return (
    <Popover trigger={<Button variant="secondary">筛选条件</Button>} title="按区域筛选">
      <div className="flex flex-col gap-2 pt-2">
        <Checkbox defaultChecked label="华东集群" />
        <Checkbox defaultChecked label="亚太边缘" />
      </div>
    </Popover>
  )
}`,
    },
    examples: [
      {
        id: 'quick-controls',
        title: '快捷参数微调面板',
        description: '在气泡浮层内嵌入 Slider 与 Switch，不离开当前上下文即可完成参数实时调节。',
        minHeight: 160,
        render: () => <PopoverQuickTuneDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'

export function Example() {
  const [rate, setRate] = React.useState(60)
  return (
    <Popover trigger={<Button variant="soft" hue="periwinkle">采样率 {rate}%</Button>} title="采样配置">
      <div className="w-60 pt-2">
        <Slider value={rate} onValueChange={(v) => setRate(Number(v))} label="采样比例" unit="%" />
      </div>
    </Popover>
  )
}`,
      },
      {
        id: 'placements',
        title: '四个弹出方位（top / right / bottom / left）',
        description: '支持任意方位弹出并在视口边缘自动翻转避让。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center gap-2.5">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Popover
                key={side}
                side={side}
                trigger={<Button size="sm" variant="secondary">side=&quot;{side}&quot;</Button>}
                title={`方向：${side}`}
              >
                <p className="m-0 pt-1 text-[12px] text-[#5B6170]">自动避开视口边界并保持柔和间距。</p>
              </Popover>
            ))}
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

export function Example() {
  return (
    <div className="flex gap-2">
      <Popover side="top" trigger={<Button size="sm">上方</Button>} title="上方气泡" />
      <Popover side="right" trigger={<Button size="sm">右侧</Button>} title="右侧气泡" />
      <Popover side="bottom" trigger={<Button size="sm">下方</Button>} title="下方气泡" />
      <Popover side="left" trigger={<Button size="sm">左侧</Button>} title="左侧气泡" />
    </div>
  )
}`,
      },
    ],
  },

  'preview-card': {
    hero: {
      render: () => (
        <PreviewCard
          trigger={
            <a href="#preview" onClick={(e) => e.preventDefault()} className="font-semibold text-[#4A4FB8] underline">
              悬停预览 @glaze/tile
            </a>
          }
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">Glaze Tile</span>
            <p className="m-0 text-[13px] text-[#5B6170]">无描边无阴影核心容器，内置 14 种主题并通过 Context 同步图表配色。</p>
          </div>
        </PreviewCard>
      ),
      code: `import { PreviewCard } from '@/components/ui/preview-card'

export function Example() {
  return (
    <PreviewCard trigger={<a href="#">悬停预览 @glaze/tile</a>}>
      <div className="flex flex-col gap-1.5">
        <span className="font-bold">Glaze Tile</span>
        <p className="text-[13px] text-[#5B6170]">无描边无阴影核心容器，内置 14 种主题。</p>
      </div>
    </PreviewCard>
  )
}`,
    },
    examples: [
      {
        id: 'member-and-metric',
        title: '成员名片与指标快照预览',
        description: '悬停链接即可预览协作成员资料卡或实时吞吐微趋势图，减少页面跳转打断。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center gap-6 text-[14px]">
            <PreviewCard
              side="bottom"
              trigger={
                <a href="#example-member-and-metric" onClick={(e) => e.preventDefault()} className="font-semibold text-[#123A5C] underline decoration-[#7B80EA]/50 underline-offset-4">
                  @林知行
                </a>
              }
            >
              <div className="flex w-60 flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <Avatar fallback="林" hue="periwinkle" size="md" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#1B1F27]">林知行</span>
                    <span className="text-[12px] text-[#6B7280]">设计系统架构师</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <StatusPill status="normal" size="sm" label="在线" />
                  <HueTag hue="sky" size="xs">维护 58 组件</HueTag>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard
              side="top"
              trigger={
                <a href="#example-member-and-metric" onClick={(e) => e.preventDefault()} className="font-semibold text-[#2F6B28] underline decoration-[#2F6B28]/40 underline-offset-4">
                  cn-sh-edge-01 (48.2k/s)
                </a>
              }
            >
              <div className="flex w-56 flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-bold text-[#1B1F27]">近 6 小时吞吐</span>
                  <span className="font-glaze-display text-[16px] font-extrabold text-[#123A5C]">48.2k/s</span>
                </div>
                <SparkChart data={[31, 36, 33, 42, 45, 48]} variant="area" hue="mint" height={42} showTooltip={false} />
              </div>
            </PreviewCard>
          </div>
        ),
        code: `import { Avatar } from '@/components/ui/avatar'
import { PreviewCard } from '@/components/ui/preview-card'
import { StatusPill } from '@/components/ui/status-pill'

export function Example() {
  return (
    <PreviewCard side="bottom" trigger={<a href="#">@林知行</a>}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <Avatar fallback="林" hue="periwinkle" />
          <div>
            <div className="font-bold">林知行</div>
            <div className="text-[12px] text-[#6B7280]">设计系统架构师</div>
          </div>
        </div>
        <StatusPill status="normal" size="sm" label="在线" />
      </div>
    </PreviewCard>
  )
}`,
      },
      {
        id: 'placements',
        title: '不同弹出方向（side）',
        description: '根据触发链接所在位置设置 top、bottom、left 或 right 方向展示预览卡。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-4 text-[13px]">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <PreviewCard
                key={side}
                side={side}
                trigger={
                  <a
                    href="#example-placements"
                    onClick={(e) => e.preventDefault()}
                    className="rounded-full bg-[#F6F7F9] px-3.5 py-1.5 font-semibold text-[#123A5C] no-underline hover:bg-[#E4E6FD]"
                  >
                    悬停 ({side})
                  </a>
                }
              >
                <div className="text-[12px] text-[#5B6170]">
                  <strong className="text-[#1B1F27]">side=&quot;{side}&quot;</strong> · 悬停离开后优雅淡出
                </div>
              </PreviewCard>
            ))}
          </div>
        ),
        code: `import { PreviewCard } from '@/components/ui/preview-card'

export function Example() {
  return (
    <div className="flex gap-3">
      <PreviewCard side="top" trigger={<a href="#">上方预览</a>}>顶部卡片</PreviewCard>
      <PreviewCard side="right" trigger={<a href="#">右侧预览</a>}>右侧卡片</PreviewCard>
    </div>
  )
}`,
      },
    ],
  },

  tooltip: {
    hero: {
      render: () => (
        <div className="flex items-center gap-3">
          <Tooltip content="复制到剪贴板 (⌘C)">
            <Button variant="secondary" size="icon" aria-label="复制"><Copy size={16} /></Button>
          </Tooltip>
          <Tooltip content="打开系统设置" side="bottom">
            <Button variant="secondary" size="icon" aria-label="设置"><Gear size={16} /></Button>
          </Tooltip>
        </div>
      ),
      code: `import { Copy, Gear } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Tooltip content="复制到剪贴板 (⌘C)">
        <Button variant="secondary" size="icon" aria-label="复制"><Copy size={16} /></Button>
      </Tooltip>
      <Tooltip content="打开系统设置" side="bottom">
        <Button variant="secondary" size="icon" aria-label="设置"><Gear size={16} /></Button>
      </Tooltip>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'sides-and-delay',
        title: '四向定位与延迟响应（side / delay）',
        description: '外层 TooltipProvider 会自动协调同组提示快速切换，也支持为单个 Tooltip 指定即时 delay={0}。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center gap-2.5">
            <Tooltip content="顶部提示" side="top">
              <Button size="sm" variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip content="右侧提示" side="right">
              <Button size="sm" variant="secondary">Right</Button>
            </Tooltip>
            <Tooltip content="底部提示" side="bottom">
              <Button size="sm" variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content="左侧提示" side="left">
              <Button size="sm" variant="secondary">Left</Button>
            </Tooltip>
            <Tooltip content="0ms 即时弹出" delay={0}>
              <Button size="sm" variant="soft" hue="sky">
                <Info size={14} weight="bold" />
                <span>无延迟</span>
              </Button>
            </Tooltip>
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export function Example() {
  return (
    <div className="flex gap-2">
      <Tooltip content="顶部提示" side="top"><Button size="sm">Top</Button></Tooltip>
      <Tooltip content="右侧提示" side="right"><Button size="sm">Right</Button></Tooltip>
      <Tooltip content="0ms 即时弹出" delay={0}><Button size="sm">无延迟</Button></Tooltip>
    </div>
  )
}`,
      },
      {
        id: 'rich-shortcut',
        title: '富内容与快捷键提示',
        description: 'content 支持任意 ReactNode，可在气泡中展示操作标题与键盘快捷键徽章。',
        minHeight: 150,
        render: () => (
          <Tooltip
            delay={0}
            content={
              <span className="inline-flex items-center gap-2">
                <span>全局命令面板</span>
                <kbd className="rounded bg-white/20 px-1.5 py-0.5 font-glaze-mono text-[10px]">⌘K</kbd>
              </span>
            }
          >
            <Button variant="primary">悬停查看快捷键</Button>
          </Tooltip>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export function Example() {
  return (
    <Tooltip
      content={
        <span className="inline-flex items-center gap-2">
          <span>全局命令面板</span>
          <kbd className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </span>
      }
    >
      <Button>悬停查看快捷键</Button>
    </Tooltip>
  )
}`,
      },
    ],
  },

  toast: {
    hero: {
      render: () => <ToastHeroDemo />,
      code: `import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

export function Example() {
  const toast = useToast()
  return (
    <div className="flex gap-2.5">
      <Button onClick={() => toast({ title: '部署成功', description: '全部节点已生效', status: 'normal' })}>
        成功通知
      </Button>
      <Button variant="soft" hue="peach" onClick={() => toast({ title: '存储水位偏高', status: 'warning' })}>
        警告通知
      </Button>
      <Button variant="danger" onClick={() => toast({ title: '节点连接超时', status: 'error' })}>
        异常通知
      </Button>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'undo-action',
        title: '带撤销操作按钮的通知（actionLabel + onAction）',
        description: '参考 Base UI Undo Toast 范式：在非破坏性或可逆操作后提供一键撤销入口。',
        minHeight: 150,
        render: () => <ToastUndoActionDemo />,
        code: `import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

export function Example() {
  const toast = useToast()
  return (
    <Button
      variant="danger"
      onClick={() =>
        toast({
          title: '已归档快照 snap-2026-11',
          description: '可在 30 天内从回收站恢复',
          status: 'warning',
          actionLabel: '撤销操作',
          onAction: () => toast({ title: '已撤销归档', status: 'normal' }),
        })
      }
    >
      归档快照
    </Button>
  )
}`,
      },
      {
        id: 'stacked-batch',
        title: '多条通知自动堆叠与悬停展开',
        description: 'ToastProvider 默认支持最多 4 条通知层叠呈现，悬停可展开全部并支持向右/向下滑动关闭。',
        minHeight: 150,
        render: () => <ToastStackingDemo />,
        code: `import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

export function Example() {
  const toast = useToast()
  const fireBatch = () => {
    toast({ title: '1/3 校验 Registry Schema', status: 'info' })
    setTimeout(() => toast({ title: '2/3 生成组件 JSON', status: 'normal' }), 260)
    setTimeout(() => toast({ title: '3/3 已更新 llms-full.txt', status: 'normal' }), 520)
  }
  return <Button variant="secondary" onClick={fireBatch}>连续发送 3 条堆叠通知</Button>
}`,
      },
    ],
  },

  progress: {
    hero: {
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-5">
          <Progress value={72} label="镜像同步进度" showValue hue="periwinkle" />
          <SegmentedProgress
            segments={[
              { value: 42, color: '#7B80EA', label: '计算' },
              { value: 26, color: '#2FA79B', label: '存储' },
              { value: 18, color: '#E3A33B', label: '缓存' },
            ]}
          />
        </div>
      ),
      code: `import { Progress, SegmentedProgress } from '@/components/ui/progress'

export function Example() {
  return (
    <div className="flex flex-col gap-5">
      <Progress value={72} label="镜像同步进度" showValue hue="periwinkle" />
      <SegmentedProgress
        segments={[
          { value: 42, color: '#7B80EA', label: '计算' },
          { value: 26, color: '#2FA79B', label: '存储' },
          { value: 18, color: '#E3A33B', label: '缓存' },
        ]}
      />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'ring-variant',
        title: '环形进度条（variant="ring"）',
        description: '内置 SVG 环形进度模式，支持自定义 size 直径、strokeWidth 与多色相。',
        minHeight: 170,
        render: () => (
          <div className="flex flex-wrap items-center gap-6">
            <Progress variant="ring" value={88} size={72} strokeWidth={7} hue="mint" showValue />
            <Progress variant="ring" value={64} size={72} strokeWidth={7} hue="sky" showValue />
            <Progress variant="ring" value={42} size={72} strokeWidth={7} hue="periwinkle" showValue />
            <Progress variant="ring" value={95} size={72} strokeWidth={7} hue="coral" showValue />
          </div>
        ),
        code: `import { Progress } from '@/components/ui/progress'

export function Example() {
  return (
    <div className="flex items-center gap-6">
      <Progress variant="ring" value={88} size={72} strokeWidth={7} hue="mint" showValue />
      <Progress variant="ring" value={64} size={72} strokeWidth={7} hue="sky" showValue />
      <Progress variant="ring" value={95} size={72} strokeWidth={7} hue="coral" showValue />
    </div>
  )
}`,
      },
      {
        id: 'dynamic-and-indeterminate',
        title: '动态更新与不确定状态（value={null}）',
        description: '支持动态调节进度值；当任务总耗时未知时传入 value={null} 呈现不确定进度状态。',
        render: () => <ProgressInteractiveDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export function Example() {
  const [val, setVal] = React.useState(64)
  return (
    <div className="flex flex-col gap-4">
      <Progress value={val} label="制品上传进度" showValue hue="sky" height="lg" />
      <Progress value={null} label="正在连接远程节点..." hue="periwinkle" height="sm" />
      <Button size="sm" onClick={() => setVal((v) => Math.min(100, v + 15))}>+15%</Button>
    </div>
  )
}`,
      },
    ],
  },

  meter: {
    hero: {
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-4">
          <Meter value={42} label="正常负载" valueLabel="42%" />
          <Meter value={78} label="警戒水位" valueLabel="78%" />
          <Meter value={94} label="临界告警" valueLabel="94%" />
        </div>
      ),
      code: `import { Meter } from '@/components/ui/meter'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Meter value={42} label="正常负载" valueLabel="42%" />
      <Meter value={78} label="警戒水位" valueLabel="78%" />
      <Meter value={94} label="临界告警" valueLabel="94%" />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'interactive-threshold',
        title: '自动阈值变色体验（hue="auto"）',
        description: '默认 hue="auto" 会根据百分比在绿色健康、橙黄警戒、珊瑚临界三档自动切换配色。',
        render: () => <MeterInteractiveDemo />,
        code: `import * as React from 'react'
import { Meter } from '@/components/ui/meter'
import { Slider } from '@/components/ui/slider'

export function Example() {
  const [load, setLoad] = React.useState(62)
  return (
    <div className="flex flex-col gap-4">
      <Meter value={load} label="实时内存水位" valueLabel={\`\${load}%\`} />
      <Slider value={load} onValueChange={(v) => setLoad(Number(v))} label="模拟负载" unit="%" />
    </div>
  )
}`,
      },
      {
        id: 'custom-range-and-hue',
        title: '自定义数值区间与固定色相',
        description: '设置 min / max 计量任意物理单位（如存储容量 GB），并可通过 hue 指定固定柔彩色相。',
        render: () => (
          <div className="flex w-full max-w-md flex-col gap-4">
            <Meter value={680} min={0} max={1024} hue="periwinkle" label="对象存储配额" valueLabel="680 / 1,024 GB" />
            <Meter value={36} min={0} max={64} hue="aqua" label="活跃 Worker 线程" valueLabel="36 / 64" />
          </div>
        ),
        code: `import { Meter } from '@/components/ui/meter'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Meter value={680} min={0} max={1024} hue="periwinkle" label="对象存储配额" valueLabel="680 / 1,024 GB" />
      <Meter value={36} min={0} max={64} hue="aqua" label="活跃 Worker" valueLabel="36 / 64" />
    </div>
  )
}`,
      },
    ],
  },

  avatar: {
    hero: {
      render: () => (
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5">
            <Avatar fallback="林" hue="rose" size="sm" />
            <Avatar fallback="周" hue="aqua" size="md" />
            <Avatar fallback="陈" hue="periwinkle" size="lg" />
          </div>
          <AvatarGroup
            items={[
              { label: '林', hue: 'rose' },
              { label: '周', hue: 'aqua' },
              { label: '陈', hue: 'sky' },
              { label: '顾', hue: 'peach' },
              { label: '许', hue: 'mint' },
            ]}
            max={4}
          />
        </div>
      ),
      code: `import { Avatar, AvatarGroup } from '@/components/ui/avatar'

export function Example() {
  return (
    <div className="flex items-center gap-6">
      <Avatar fallback="周" hue="aqua" size="md" />
      <AvatarGroup
        items={[
          { label: '林', hue: 'rose' },
          { label: '周', hue: 'aqua' },
          { label: '陈', hue: 'sky' },
          { label: '顾', hue: 'peach' },
          { label: '许', hue: 'mint' },
        ]}
        max={4}
      />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'sizes-and-status',
        title: '四级尺寸与在线状态角标',
        description: '内置 xs / sm / md / lg 尺寸，可搭配 ringWidth 与 StatusDot 呈现成员实时在线态。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center gap-5">
            <Avatar fallback="A" hue="sky" size="xs" />
            <Avatar fallback="B" hue="mint" size="sm" />
            <div className="relative inline-flex">
              <Avatar fallback="陈" hue="periwinkle" size="md" ringWidth={2} />
              <span className="absolute -right-0.5 -bottom-0.5 rounded-full bg-white p-0.5">
                <StatusDot status="normal" mode="ripple" size="sm" />
              </span>
            </div>
            <div className="relative inline-flex">
              <Avatar fallback="陆" hue="peach" size="lg" ringWidth={2} />
              <span className="absolute right-0 bottom-0 rounded-full bg-white p-0.5">
                <StatusDot status="warning" size="md" />
              </span>
            </div>
          </div>
        ),
        code: `import { Avatar } from '@/components/ui/avatar'
import { StatusDot } from '@/components/ui/status-dot'

export function Example() {
  return (
    <div className="relative inline-flex">
      <Avatar fallback="陈" hue="periwinkle" size="md" ringWidth={2} />
      <span className="absolute -right-0.5 -bottom-0.5 rounded-full bg-white p-0.5">
        <StatusDot status="normal" mode="ripple" size="sm" />
      </span>
    </div>
  )
}`,
      },
      {
        id: 'group-overflow',
        title: '头像组溢出折叠（AvatarGroup）',
        description: '通过 max 限制显示人数并自动渲染 +N 溢出气泡，支持自定义 ringColor 适配柔彩或深色底。',
        surface: 'canvas',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-6">
            <AvatarGroup
              size="md"
              ringColor="#E9ECF2"
              max={3}
              items={[
                { label: '林', hue: 'rose' },
                { label: '周', hue: 'aqua' },
                { label: '陈', hue: 'sky' },
                { label: '顾', hue: 'peach' },
                { label: '许', hue: 'mint' },
                { label: '沈', hue: 'lilac' },
              ]}
            />
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#5B6170]">
              <Bell size={15} />
              <span>6 位协作者正在查看</span>
            </div>
          </div>
        ),
        code: `import { AvatarGroup } from '@/components/ui/avatar'

export function Example() {
  return (
    <AvatarGroup
      size="md"
      max={3}
      items={[
        { label: '林', hue: 'rose' },
        { label: '周', hue: 'aqua' },
        { label: '陈', hue: 'sky' },
        { label: '顾', hue: 'peach' },
      ]}
    />
  )
}`,
      },
    ],
  },
}
