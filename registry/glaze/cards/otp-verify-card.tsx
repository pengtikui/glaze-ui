import * as React from 'react'
import { ShieldCheck } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { IconTile } from '@/components/ui/icon-tile'
import { OTPField } from '@/components/ui/otp-field'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface OtpVerifyCardProps {
  title?: string
  subtitle?: string
  expectedCode?: string
  iconHue?: Hue
  tone?: TileTone
  onVerify?: (code: string, ok: boolean) => void
}

export function OtpVerifyCard({
  title = '二次验证 (2FA)',
  subtitle = '输入验证器中的 6 位动态口令',
  expectedCode = '248910',
  iconHue = 'periwinkle',
  tone = 'white',
  onVerify,
}: OtpVerifyCardProps) {
  const theme = TILE_THEMES[tone]
  const [code, setCode] = React.useState('')
  const [state, setState] = React.useState<'idle' | 'verified' | 'error'>('idle')

  const handleSubmit = () => {
    const ok = code.length === 6 && (!expectedCode || code === expectedCode)
    setState(ok ? 'verified' : 'error')
    onVerify?.(code, ok)
  }

  return (
    <Tile size="w" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconTile hue={iconHue} size="sm">
            <ShieldCheck size={18} weight="fill" />
          </IconTile>
          <div className="flex flex-col">
            <span className="font-glaze-display text-[16px] font-extrabold">{title}</span>
            <span className="text-[12px]" style={{ color: theme.soft }}>
              {subtitle}
            </span>
          </div>
        </div>
        {state === 'verified' ? (
          <StatusPill status="normal" label="验证通过" size="sm" />
        ) : state === 'error' ? (
          <StatusPill status="error" label="口令有误" size="sm" />
        ) : (
          <StatusPill status="info" label={`示例 ${expectedCode}`} size="sm" />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <OTPField
          value={code}
          onValueChange={(next) => {
            setCode(next)
            if (state !== 'idle') setState('idle')
          }}
        />
        <Button
          variant="primary"
          size="sm"
          disabled={code.length < 6}
          onClick={handleSubmit}
        >
          验证口令
        </Button>
      </div>
    </Tile>
  )
}
