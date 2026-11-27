import { createHighlighter, type Highlighter } from 'shiki'

const SUPPORTED_LANGS = ['tsx', 'ts', 'bash', 'sh', 'json', 'css', 'markdown', 'md', 'html', 'text'] as const
const THEME = 'one-dark-pro'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighterInstance(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [...SUPPORTED_LANGS],
    })
  }
  return highlighterPromise
}

export async function highlightCode(code: string, lang: string = 'tsx'): Promise<string> {
  const normalized = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? lang : 'text'
  const highlighter = await getHighlighterInstance()
  return highlighter.codeToHtml(code.trim(), {
    lang: normalized,
    theme: THEME,
  })
}
