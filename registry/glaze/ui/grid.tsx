import * as React from 'react'
import { cn } from 'cn'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Force preview column count (used by responsive grid demos) */
  forceCols?: 4 | 2 | 1
}

export function Grid({
  forceCols,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'glaze-grid',
        forceCols === 2 && 'glaze-grid-cols-2',
        forceCols === 1 && 'glaze-grid-cols-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
