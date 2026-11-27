import * as React from 'react'
import { cn } from 'cn'
import {
  TILE_THEMES,
  type TileSize,
  type TileTheme,
  type TileTone,
} from '@/lib/tokens'

const TileContext = React.createContext<TileTheme>(TILE_THEMES.white)

export function useTileTheme() {
  return React.useContext(TileContext)
}

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: TileTone
  size?: TileSize
  interactive?: boolean
  padding?: 'default' | 'compact' | 'none'
  href?: string
}

const SIZE_CLASSES: Record<TileSize, string> = {
  s: 'glaze-size-s',
  w: 'glaze-size-w',
  t: 'glaze-size-t',
  l: 'glaze-size-l',
  f: 'glaze-size-f',
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  function Tile(
    {
      tone = 'white',
      size = 's',
      interactive = false,
      padding = 'default',
      href,
      className,
      style,
      onClick,
      children,
      ...props
    },
    ref,
  ) {
    const theme = TILE_THEMES[tone]

    const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined =
      href || onClick
        ? (e) => {
            onClick?.(e)
            if (href && !e.defaultPrevented) {
              window.open(href, '_blank', 'noopener,noreferrer')
            }
          }
        : undefined

    return (
      <TileContext.Provider value={theme}>
        <div
          ref={ref}
          data-tone={tone}
          data-size={size}
          onClick={handleClick}
          className={cn(
            'relative flex flex-col justify-between overflow-hidden rounded-tile contain-[layout_style]',
            SIZE_CLASSES[size],
            padding === 'default' && 'p-6',
            padding === 'compact' && 'p-5',
            padding === 'none' && 'p-0',
            (interactive || Boolean(href)) &&
              'cursor-pointer transition-[translate,filter] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:brightness-[0.985]',
            className,
          )}
          style={{
            backgroundColor: theme.bg,
            color: theme.ink,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </TileContext.Provider>
    )
  },
)
