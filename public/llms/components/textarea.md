# Textarea (多行文本域)

> 采用 18px 圆角（rounded-inner）与柔灰底色（#F6F7F9）的多行输入框。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/textarea
```

- **Registry JSON**: `/r/textarea.json`
- **Import Path**: `@/components/ui/textarea`
- **Exports**: `Textarea`
- **NPM Dependencies**: `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### Textarea

Extends: `React.TextareaHTMLAttributes<HTMLTextAreaElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |

### CSS Variables

- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'
import { BOX_CONTROL, CONTROL_SOFT, CONTROL_WHITE } from '@/lib/motion'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  surface?: 'soft' | 'white'
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ surface = 'soft', className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-24 w-full resize-y px-4 py-3 text-[14px] text-[#1B1F27] placeholder:text-[#8A90A0]',
          BOX_CONTROL,
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
```
