# Toast (3D 堆叠通知)

> 基于 Base UI Toast 引擎构建的 3D 层叠通知系统，支持 6 个停靠方位、锚定元素提示（Anchored Toasts）、悬停展开、全方向滑动关闭、重复触发缩放提醒、Promise 状态流转与跨模块全局通知。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/toast
```

- **Registry JSON**: `/r/toast.json`
- **Import Path**: `@/components/ui/toast`
- **Exports**: `TOAST_POSITIONS`, `ToastProvider`, `AnchoredToastProvider`, `createToaster`, `useToast`, `useAnchoredToast`
- **Base UI Primitive**: `@base-ui/react/toast` ([Base UI Docs](https://base-ui.com/react/components/toast))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`, `@glaze/tokens`

## API Reference

### TOAST_POSITIONS

Inherits standard Base UI / HTML element props.

### ToastProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — | — |
| `position?` | `ToastPosition` | `'bottom-right'` | 通知视口停靠位置；同时决定入场方向、堆叠方向与默认滑动关闭方向。 @default 'bottom-right' |
| `limit?` | `number` | `4` | 同时可见的最大通知数，超出的旧通知会标记 `data-limited` 并淡出。 @default 4 |
| `timeout?` | `number` | `4200` | 默认自动关闭时长（ms），`0` 表示不自动关闭。 @default 4200 |
| `swipeDirection?` | `ToastSwipeDirection \| ToastSwipeDirection[]` | — | 自定义滑动关闭方向，默认根据 `position` 推导（如 `top-right` → `['up', 'right']`）。 |
| `toastManager?` | `Toaster \| ToastManager` | — | 由 `createToaster()` 创建的全局通知器（或 Base UI `createToastManager()`），用于在 React 组件外部触发通知。 |
| `className?` | `string` | — | 附加到通知视口（`Toast.Viewport`）的类名 |

### AnchoredToastProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children?` | `React.ReactNode` | — | — |
| `limit?` | `number` | `3` | 同时可见的最大锚定通知数。 @default 3 |
| `timeout?` | `number` | `2600` | 锚定通知默认自动关闭时长（ms），`0` 表示不自动关闭。 @default 2600 |
| `toastManager?` | `Toaster \| ToastManager` | — | 由 `createToaster()` 创建的独立锚定通知器 |
| `className?` | `string` | — | 附加到锚定通知视口（`Toast.Viewport`）的类名 |

### createToaster

Inherits standard Base UI / HTML element props.

### useToast

Inherits standard Base UI / HTML element props.

### useAnchoredToast

Inherits standard Base UI / HTML element props.

### Supporting Types

#### `ToastData`

| Property | Type | Required |
| --- | --- | --- |
| `status` | `ToastStatus` | No |
| `closeOnAction` | `boolean` | No |

#### `ViewportRegistryEntry`

| Property | Type | Required |
| --- | --- | --- |
| `owner` | `symbol \| null` | Yes |
| `listeners` | `Map<symbol, (isOwner: boolean) => void>` | Yes |

#### `NotifyOptions`

| Property | Type | Required |
| --- | --- | --- |
| `title` | `React.ReactNode` | Yes |
| `description` | `React.ReactNode` | No |
| `status` | `ToastStatus` | No |
| `id` | `string` | No |
| `timeout` | `number` | No |
| `priority` | `'low' \| 'high'` | No |
| `actionLabel` | `React.ReactNode` | No |
| `onAction` | `() => void` | No |
| `closeOnAction` | `boolean` | No |
| `onClose` | `() => void` | No |
| `onRemove` | `() => void` | No |
| `anchor` | `Element \| null` | No |
| `side` | `ToastAnchorSide` | No |
| `align` | `ToastAnchorAlign` | No |
| `sideOffset` | `number` | No |
| `positionerProps` | `ToastManagerPositionerProps` | No |

#### `ToastPromiseOptions`

| Property | Type | Required |
| --- | --- | --- |
| `loading` | `string \| ToastUpdateOptions` | Yes |
| `success` | `ToastPromiseStage<Value>` | Yes |
| `error` | `ToastPromiseStage<unknown>` | Yes |

#### `Toaster`

| Property | Type | Required |
| --- | --- | --- |
| `notify` | `(options: NotifyOptions) => string` | Yes |
| `update` | `(id: string, options: ToastUpdateOptions) => void` | Yes |
| `close` | `(id?: string) => void` | Yes |
| `promise` | `<Value>(promise: Promise<Value>, options: ToastPromiseOptions<Value>) => Promise<Value>` | Yes |
| `manager` | `ToastManager<ToastData>` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-position` | 视口停靠位置（top/bottom × left/center/right） |
| `data-status` | 当前通知语义状态（normal / warning / error / info / disabled / loading） |
| `data-bump` | 重复触发同一 ID 或状态更新时的缩放提醒动效标记（a / b） |
| `data-expanded` | 通知堆叠处于展开态 |
| `data-behind` | 处于非最前方的折叠内容 |
| `data-swiping` | 正在滑动关闭 |
| `data-swipe-direction` | 滑动关闭方向（up / down / left / right） |
| `data-limited` | 超出最大显示数量被隐藏 |

### CSS Variables

- `--toast-index`
- `--toast-offset-y`
- `--toast-height`
- `--glaze-toast-dir`
- `--glaze-toast-inset`
- `--glaze-dur-toast`

## Source Code

```tsx
import * as React from 'react'
import { Toast as BaseToast } from '@base-ui/react/toast'
import type {
  ToastManager,
  ToastManagerAddOptions,
  ToastManagerPositionerProps,
  ToastManagerUpdateOptions,
  ToastObject,
} from '@base-ui/react/toast'
import {
  CheckCircle,
  CircleNotch,
  Info,
  Warning,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { SEMANTIC_TOKENS, type Status } from '@/lib/tokens'
import { PRESS_CLASS } from '@/lib/motion'

/** 通知视口在屏幕中的 6 个停靠位置（遵循 Base UI「Custom position」范式，通过 `data-position` 驱动 CSS）。 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastSwipeDirection = 'up' | 'down' | 'left' | 'right'

/** 锚定通知相对于锚点元素的停靠方位 */
export type ToastAnchorSide = 'top' | 'bottom' | 'left' | 'right'

/** 锚定通知相对于锚点元素的对齐方式 */
export type ToastAnchorAlign = 'start' | 'center' | 'end'

/** 5 种语义状态 + `loading`（加载中：显示旋转图标且暂停自动关闭计时）。 */
export type ToastStatus = Status | 'loading'

export interface ToastData {
  status?: ToastStatus
  /** 点击操作按钮后是否自动关闭该通知，默认 `true` */
  closeOnAction?: boolean
}

export const TOAST_POSITIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

const DEFAULT_SWIPE: Record<ToastPosition, ToastSwipeDirection[]> = {
  'top-left': ['up', 'left'],
  'top-center': ['up'],
  'top-right': ['up', 'right'],
  'bottom-left': ['down', 'left'],
  'bottom-center': ['down'],
  'bottom-right': ['down', 'right'],
}

type ManagerLike = Pick<ToastManager<ToastData>, 'add' | 'close' | 'update' | 'promise'>

const ToasterContext = React.createContext<Toaster | null>(null)
const AnchoredToastContext = React.createContext<Toaster | null>(null)

interface ViewportRegistryEntry {
  owner: symbol | null
  listeners: Map<symbol, (isOwner: boolean) => void>
}

const managerViewportRegistry = new WeakMap<ToastManager<any>, ViewportRegistryEntry>()
let nextViewportLayer = 60

function useIsViewportOwner(manager?: ToastManager<any>) {
  const tokenRef = React.useRef<symbol | null>(null)
  if (!tokenRef.current) tokenRef.current = Symbol('toast-viewport')
  const [isOwner, setIsOwner] = React.useState(!manager)

  React.useEffect(() => {
    if (!manager) {
      setIsOwner(true)
      return
    }
    const token = tokenRef.current!
    let entry = managerViewportRegistry.get(manager)
    if (!entry) {
      entry = { owner: null, listeners: new Map() }
      managerViewportRegistry.set(manager, entry)
    }
    entry.listeners.set(token, setIsOwner)
    if (entry.owner === null) {
      entry.owner = token
    }
    setIsOwner(entry.owner === token)

    return () => {
      entry!.listeners.delete(token)
      if (entry!.owner === token) {
        const nextEntry = entry!.listeners.entries().next()
        if (!nextEntry.done) {
          const [nextToken, notifyNext] = nextEntry.value
          entry!.owner = nextToken
          notifyNext(true)
        } else {
          entry!.owner = null
          managerViewportRegistry.delete(manager)
        }
      }
    }
  }, [manager])

  return isOwner
}

export interface ToastProviderProps {
  children?: React.ReactNode
  /**
   * 通知视口停靠位置；同时决定入场方向、堆叠方向与默认滑动关闭方向。
   * @default 'bottom-right'
   */
  position?: ToastPosition
  /**
   * 同时可见的最大通知数，超出的旧通知会标记 `data-limited` 并淡出。
   * @default 4
   */
  limit?: number
  /**
   * 默认自动关闭时长（ms），`0` 表示不自动关闭。
   * @default 4200
   */
  timeout?: number
  /** 自定义滑动关闭方向，默认根据 `position` 推导（如 `top-right` → `['up', 'right']`）。 */
  swipeDirection?: ToastSwipeDirection | ToastSwipeDirection[]
  /** 由 `createToaster()` 创建的全局通知器（或 Base UI `createToastManager()`），用于在 React 组件外部触发通知。 */
  toastManager?: Toaster | ToastManager
  /** 附加到通知视口（`Toast.Viewport`）的类名 */
  className?: string
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  limit = 4,
  timeout = 4200,
  swipeDirection,
  toastManager,
  className,
}: ToastProviderProps) {
  const manager =
    typeof toastManager === 'function' ? toastManager.manager : toastManager
  const isViewportOwner = useIsViewportOwner(manager)
  const sharedToaster = React.useMemo(
    () => (manager ? buildToaster(manager) : null),
    [manager],
  )
  const anchoredToaster = React.useMemo(() => createToaster(), [])

  return (
    <BaseToast.Provider
      limit={limit}
      timeout={timeout}
      toastManager={isViewportOwner ? manager : undefined}
    >
      <ToasterContext.Provider value={sharedToaster}>
        <AnchoredToastContext.Provider value={anchoredToaster}>
          {children}
        </AnchoredToastContext.Provider>
      </ToasterContext.Provider>
      {isViewportOwner && (
        <ToastViewport
          position={position}
          swipeDirection={swipeDirection ?? DEFAULT_SWIPE[position]}
          className={className}
        />
      )}
      <AnchoredToastProvider toastManager={anchoredToaster} />
    </BaseToast.Provider>
  )
}

export interface AnchoredToastProviderProps {
  children?: React.ReactNode
  /**
   * 同时可见的最大锚定通知数。
   * @default 3
   */
  limit?: number
  /**
   * 锚定通知默认自动关闭时长（ms），`0` 表示不自动关闭。
   * @default 2600
   */
  timeout?: number
  /** 由 `createToaster()` 创建的独立锚定通知器 */
  toastManager?: Toaster | ToastManager
  /** 附加到锚定通知视口（`Toast.Viewport`）的类名 */
  className?: string
}

/**
 * 独立的锚定通知 Provider（遵循 Base UI Anchored Toasts 规范，基于 `Toast.Positioner`）。
 * `<ToastProvider>` 已内置一份默认实例，通常直接使用 `useAnchoredToast()` 即可；如需自定义超时、上限或全局实例，可单独挂载本组件。
 */
export function AnchoredToastProvider({
  children,
  limit = 3,
  timeout = 2600,
  toastManager,
  className,
}: AnchoredToastProviderProps) {
  const fallbackToaster = React.useMemo(() => createToaster(), [])
  const resolvedToaster =
    typeof toastManager === 'function' ? toastManager : fallbackToaster
  const manager =
    typeof toastManager === 'function'
      ? toastManager.manager
      : (toastManager ?? fallbackToaster.manager)

  return (
    <BaseToast.Provider limit={limit} timeout={timeout} toastManager={manager}>
      {children ? (
        <AnchoredToastContext.Provider value={resolvedToaster}>
          {children}
        </AnchoredToastContext.Provider>
      ) : null}
      <AnchoredToastViewport className={className} />
    </BaseToast.Provider>
  )
}

function resolveStatus(toast: ToastObject<ToastData>): ToastStatus {
  if (toast.type === 'loading') return 'loading'
  return toast.data?.status ?? 'info'
}

function resolveBump(toast: ToastObject<ToastData>, status: ToastStatus): 'a' | 'b' | undefined {
  if (!toast.updateKey || toast.updateKey <= 0 || status === 'loading') return undefined
  return toast.updateKey % 2 === 1 ? 'a' : 'b'
}

const STATUS_ICON = {
  normal: CheckCircle,
  warning: Warning,
  error: WarningCircle,
  info: Info,
  disabled: Info,
} as const

function ToastViewport({
  position,
  swipeDirection,
  className,
}: {
  position: ToastPosition
  swipeDirection: ToastSwipeDirection | ToastSwipeDirection[]
  className?: string
}) {
  const { toasts, close } = BaseToast.useToastManager<ToastData>()
  const [layer, setLayer] = React.useState(60)
  const frontKey = toasts[0] ? `${toasts[0].id}:${toasts[0].updateKey ?? 0}` : null
  const prevFrontKeyRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (frontKey && frontKey !== prevFrontKeyRef.current) {
      nextViewportLayer += 1
      setLayer(nextViewportLayer)
    }
    prevFrontKeyRef.current = frontKey
  }, [frontKey])

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        data-position={position}
        style={{ zIndex: layer }}
        className={cn('glaze-toast-viewport', className)}
      >
        {toasts.map((toast) => {
          const status = resolveStatus(toast)
          const token = SEMANTIC_TOKENS[status === 'loading' ? 'info' : status]
          const Icon = status === 'loading' ? CircleNotch : STATUS_ICON[status]
          const bump = resolveBump(toast, status)
          const { onClick: onActionClick, ...actionProps } = toast.actionProps ?? {}

          return (
            <BaseToast.Root
              key={toast.id}
              toast={toast}
              swipeDirection={swipeDirection}
              data-status={status}
              data-bump={bump}
              className="glaze-toast-root"
            >
              <BaseToast.Content className="glaze-toast-content flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: token.pillBg, color: token.ink }}
                >
                  <Icon
                    size={17}
                    weight={status === 'loading' ? 'bold' : 'fill'}
                    className={status === 'loading' ? 'animate-spin' : undefined}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  {toast.title && (
                    <BaseToast.Title className="text-[14px] font-bold text-[#1B1F27]">
                      {toast.title}
                    </BaseToast.Title>
                  )}
                  {toast.description && (
                    <BaseToast.Description className="mt-0.5 text-[12px] leading-relaxed text-[#6B7280]">
                      {toast.description}
                    </BaseToast.Description>
                  )}
                  {toast.actionProps && (
                    <BaseToast.Action
                      {...actionProps}
                      onClick={(event) => {
                        onActionClick?.(event)
                        if (toast.data?.closeOnAction !== false) close(toast.id)
                      }}
                      className={cn(
                        'mt-2 inline-flex cursor-pointer items-center rounded-full bg-[#F2F3F5] px-3 py-1 text-[12px] font-semibold text-[#1B1F27] hover:bg-[#E8EBF0]',
                        PRESS_CLASS,
                      )}
                    />
                  )}
                </div>
                <BaseToast.Close
                  aria-label="关闭通知"
                  className={cn(
                    'inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] hover:bg-[#F2F3F5] hover:text-[#1B1F27]',
                    PRESS_CLASS,
                  )}
                >
                  <X size={14} weight="bold" />
                </BaseToast.Close>
              </BaseToast.Content>
            </BaseToast.Root>
          )
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}

function AnchoredToastViewport({ className }: { className?: string }) {
  const { toasts, close } = BaseToast.useToastManager<ToastData>()

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className={cn('glaze-toast-anchored-viewport', className)}>
        {toasts.map((toast) => {
          const status = resolveStatus(toast)
          const token = SEMANTIC_TOKENS[status === 'loading' ? 'info' : status]
          const Icon = status === 'loading' ? CircleNotch : STATUS_ICON[status]
          const bump = resolveBump(toast, status)
          const { onClick: onActionClick, ...actionProps } = toast.actionProps ?? {}
          const sideOffset = toast.positionerProps?.sideOffset ?? 8

          return (
            <BaseToast.Positioner
              key={toast.id}
              toast={toast}
              sideOffset={sideOffset}
              className="glaze-toast-positioner"
            >
              <BaseToast.Root
                toast={toast}
                data-status={status}
                data-bump={bump}
                className="glaze-toast-anchored-root"
              >
                <BaseToast.Content className="glaze-toast-content flex items-center gap-2.5">
                  <span
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: token.pillBg, color: token.ink }}
                  >
                    <Icon
                      size={14}
                      weight={status === 'loading' ? 'bold' : 'fill'}
                      className={status === 'loading' ? 'animate-spin' : undefined}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    {toast.title && (
                      <BaseToast.Title className="text-[13px] font-bold leading-snug text-[#1B1F27]">
                        {toast.title}
                      </BaseToast.Title>
                    )}
                    {toast.description && (
                      <BaseToast.Description className="mt-0.5 text-[11.5px] leading-snug text-[#6B7280]">
                        {toast.description}
                      </BaseToast.Description>
                    )}
                  </div>
                  {toast.actionProps && (
                    <BaseToast.Action
                      {...actionProps}
                      onClick={(event) => {
                        onActionClick?.(event)
                        if (toast.data?.closeOnAction !== false) close(toast.id)
                      }}
                      className={cn(
                        'inline-flex shrink-0 cursor-pointer items-center rounded-full bg-[#F2F3F5] px-2.5 py-1 text-[11.5px] font-semibold text-[#1B1F27] hover:bg-[#E8EBF0]',
                        PRESS_CLASS,
                      )}
                    />
                  )}
                </BaseToast.Content>
              </BaseToast.Root>
            </BaseToast.Positioner>
          )
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}

export interface NotifyOptions {
  /** 通知标题 */
  title: React.ReactNode
  /** 通知描述，支持任意 ReactNode */
  description?: React.ReactNode
  /**
   * 语义状态；`loading` 会显示旋转图标并暂停自动关闭，直到被 `update` 为其它状态。
   * @default 'info'
   */
  status?: ToastStatus
  /** 自定义 ID：使用已存在的 ID 会原地更新该通知、重置计时并触发缩放提醒动效（去重 / upsert）。 */
  id?: string
  /** 本条通知的自动关闭时长（ms），`0` 表示常驻直到手动关闭；默认继承 `ToastProvider.timeout`。 */
  timeout?: number
  /**
   * 读屏播报优先级：`low` 礼貌播报（polite），`high` 立即打断播报（assertive）。
   * @default 'low'
   */
  priority?: 'low' | 'high'
  /** 操作按钮文案（如「撤销」） */
  actionLabel?: React.ReactNode
  /** 点击操作按钮的回调 */
  onAction?: () => void
  /**
   * 点击操作按钮后是否自动关闭本条通知。
   * @default true
   */
  closeOnAction?: boolean
  /** 通知开始关闭时触发（自动超时、手动关闭、滑动关闭均会触发） */
  onClose?: () => void
  /** 通知退场动画结束、从列表中移除后触发 */
  onRemove?: () => void
  /** 锚定通知的目标 DOM 元素（配合 `useAnchoredToast()` 使用，对应 `positionerProps.anchor`） */
  anchor?: Element | null
  /** 锚定通知相对锚点的停靠方位（默认 `'top'`） */
  side?: ToastAnchorSide
  /** 锚定通知相对锚点的对齐方式（默认 `'center'`） */
  align?: ToastAnchorAlign
  /** 锚定通知与锚点之间的像素间距（默认 `8`） */
  sideOffset?: number
  /** 透传给 Base UI `Toast.Positioner` 的完整定位参数 */
  positionerProps?: ToastManagerPositionerProps
}

/** `toast.update(id, options)` 可局部更新的字段 */
export type ToastUpdateOptions = Partial<Omit<NotifyOptions, 'id'>>

type ToastPromiseStage<Arg> =
  | string
  | ToastUpdateOptions
  | ((value: Arg) => string | ToastUpdateOptions)

export interface ToastPromiseOptions<Value> {
  /** Promise 进行中的展示内容（自动使用 `loading` 状态） */
  loading: string | ToastUpdateOptions
  /** Promise resolve 后的展示内容（默认 `normal` 状态），可传函数读取结果 */
  success: ToastPromiseStage<Value>
  /** Promise reject 后的展示内容（默认 `error` 状态），可传函数读取错误 */
  error: ToastPromiseStage<unknown>
}

export interface Toaster {
  /** 新增一条通知，返回通知 ID */
  (options: NotifyOptions): string
  /** 同调用本身：新增一条通知并返回 ID */
  notify: (options: NotifyOptions) => string
  /** 局部更新指定通知（标题、描述、状态、计时等） */
  update: (id: string, options: ToastUpdateOptions) => void
  /** 关闭指定通知；不传 ID 时关闭全部 */
  close: (id?: string) => void
  /** 绑定 Promise：进行中显示 loading，结束后自动切换为成功 / 失败通知 */
  promise: <Value>(promise: Promise<Value>, options: ToastPromiseOptions<Value>) => Promise<Value>
  /** 仅 `createToaster()` 返回：底层 Base UI ToastManager，用于传给 `ToastProvider` / `AnchoredToastProvider` */
  manager?: ToastManager<ToastData>
}

function toManagerOptions(
  opts: ToastUpdateOptions,
  prev?: ToastData,
): ToastManagerUpdateOptions<ToastData> {
  const out: ToastManagerUpdateOptions<ToastData> = {}
  if ('title' in opts) out.title = opts.title
  if ('description' in opts) out.description = opts.description
  if (opts.timeout !== undefined) out.timeout = opts.timeout
  if (opts.priority !== undefined) out.priority = opts.priority
  if (opts.onClose) out.onClose = opts.onClose
  if (opts.onRemove) out.onRemove = opts.onRemove
  if (opts.status !== undefined) out.type = opts.status
  if (opts.status !== undefined || opts.closeOnAction !== undefined) {
    out.data = {
      status: opts.status ?? prev?.status,
      closeOnAction: opts.closeOnAction ?? prev?.closeOnAction,
    }
  }
  if ('actionLabel' in opts || 'onAction' in opts) {
    out.actionProps = opts.actionLabel
      ? { children: opts.actionLabel, onClick: () => opts.onAction?.() }
      : undefined
  }
  if (
    opts.positionerProps !== undefined ||
    opts.anchor !== undefined ||
    opts.side !== undefined ||
    opts.align !== undefined ||
    opts.sideOffset !== undefined
  ) {
    out.positionerProps = {
      ...opts.positionerProps,
      ...(opts.anchor !== undefined ? { anchor: opts.anchor } : {}),
      ...(opts.side !== undefined ? { side: opts.side } : {}),
      ...(opts.align !== undefined ? { align: opts.align } : {}),
      ...(opts.sideOffset !== undefined ? { sideOffset: opts.sideOffset } : {}),
    }
  }
  return out
}

function resolveStage<Arg>(
  stage: ToastPromiseStage<Arg>,
  value: Arg,
  status: ToastStatus,
): ToastManagerUpdateOptions<ToastData> {
  const resolved = typeof stage === 'function' ? stage(value) : stage
  const opts = typeof resolved === 'string' ? { title: resolved } : resolved
  return toManagerOptions({ status, ...opts })
}

function buildToaster(manager: ManagerLike): Toaster {
  const notify = ({ id, ...opts }: NotifyOptions) =>
    manager.add({
      id,
      ...toManagerOptions({ status: 'info', ...opts }),
    } as ToastManagerAddOptions<ToastData>)

  return Object.assign(notify, {
    notify,
    update: (id: string, opts: ToastUpdateOptions) =>
      manager.update(id, (prev) => toManagerOptions(opts, prev.data)),
    close: (id?: string) => manager.close(id),
    promise: <Value,>(promise: Promise<Value>, options: ToastPromiseOptions<Value>) =>
      manager.promise<Value, ToastData>(promise, {
        loading: resolveStage(options.loading, undefined, 'loading'),
        success: (result) => resolveStage(options.success, result, 'normal'),
        error: (error) => resolveStage(options.error, error, 'error'),
      }),
  })
}

/**
 * 在 React 组件外部（请求拦截器、Store、工具函数等）触发通知的全局通知器。
 * 需将其传给 `<ToastProvider toastManager={toaster}>` 或 `<AnchoredToastProvider toastManager={toaster}>`。
 */
export function createToaster(): Toaster & { manager: ToastManager<ToastData> } {
  const manager = BaseToast.createToastManager<ToastData>()
  return Object.assign(buildToaster(manager), { manager })
}

/** 读取最近的 `ToastProvider`，返回可直接调用的通知器（含 `notify` / `update` / `close` / `promise`）。 */
export function useToast(): Toaster {
  const sharedToaster = React.useContext(ToasterContext)
  const { add, close, update, promise } = BaseToast.useToastManager<ToastData>()
  const localToaster = React.useMemo(
    () => buildToaster({ add, close, update, promise }),
    [add, close, update, promise],
  )
  return sharedToaster ?? localToaster
}

/**
 * 读取最近的 `AnchoredToastProvider`（`<ToastProvider>` 已自动内置），
 * 用于在按钮、输入框等指定锚点元素附近弹出轻提示（Base UI Anchored Toasts）。
 */
export function useAnchoredToast(): Toaster {
  const anchored = React.useContext(AnchoredToastContext)
  if (!anchored) {
    throw new Error('useAnchoredToast must be used within ToastProvider or AnchoredToastProvider')
  }
  return anchored
}
```
