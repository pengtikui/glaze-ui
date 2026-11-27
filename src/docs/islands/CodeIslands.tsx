import { CliCommand, type CliCommandProps } from '@/docs/components/CliCommand'
import { CodeBlock, type CodeBlockProps } from '@/docs/components/CodeBlock'
import { GlazeProviders } from '@/docs/components/GlazeProviders'

export function CliCommandIsland(props: CliCommandProps) {
  return (
    <GlazeProviders>
      <CliCommand {...props} />
    </GlazeProviders>
  )
}

export function CodeBlockIsland(props: CodeBlockProps) {
  return (
    <GlazeProviders>
      <CodeBlock {...props} />
    </GlazeProviders>
  )
}
