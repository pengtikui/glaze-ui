import * as React from 'react'
import { Toast as BaseToast } from '@base-ui/react/toast'
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { SEMANTIC_TOKENS, type Status } from '@/lib/tokens'
import { PRESS_CLASS } from '@/lib/motion'

export interface ToastData {
  status?: Status
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseToast.Provider limit={4} timeout={4200}>
      {children}
      <ToastViewport />
    </BaseToast.Provider>
  )
}

function ToastViewport() {
  const { toasts } = BaseToast.useToastManager()

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className="glaze-toast-viewport">
        {toasts.map((toast) => {
          const data = (toast.data ?? {}) as ToastData
          const status: Status = data.status ?? 'info'
          const token = SEMANTIC_TOKENS[status]

          const Icon =
            status === 'normal'
              ? CheckCircle
              : status === 'warning'
                ? Warning
                : status === 'error'
                  ? WarningCircle
                  : Info

          return (
            <BaseToast.Root
              key={toast.id}
              toast={toast}
              swipeDirection={['down', 'right']}
              className="glaze-toast-root"
            >
              <BaseToast.Content className="glaze-toast-content flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: token.pillBg, color: token.ink }}
                >
                  <Icon size={17} weight="fill" />
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
                      {...toast.actionProps}
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

export interface NotifyOptions {
  title: string
  description?: string
  status?: Status
  actionLabel?: string
  onAction?: () => void
}

export function useToast() {
  const manager = BaseToast.useToastManager()
  return React.useMemo(() => {
    const fn = (opts: NotifyOptions) =>
      manager.add({
        title: opts.title,
        description: opts.description,
        data: { status: opts.status ?? 'info' } satisfies ToastData,
        actionProps: opts.actionLabel
          ? { children: opts.actionLabel, onClick: opts.onAction }
          : undefined,
      })
    return Object.assign(fn, {
      notify: fn,
      close: manager.close,
    })
  }, [manager])
}
