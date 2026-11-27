import type * as React from 'react'

export type PreviewSurface = 'white' | 'canvas' | 'dark'

export interface ComponentDemoItem {
  /** Anchor slug unique within this component page, e.g. 'variants', 'controlled' */
  id: string
  /** Short Chinese title displayed as section heading and TOC sub-item */
  title: string
  /** Concise 1-sentence description explaining the pattern / props shown */
  description?: string
  /** Live React element renderer */
  render: () => React.ReactNode
  /** Self-contained copy-pasteable TSX example code */
  code: string
  /** Preview box minimum height in px */
  minHeight?: number
  /** Preview box layout alignment */
  align?: 'center' | 'start'
  /** Preview box background surface */
  surface?: PreviewSurface
}

export interface ComponentDemoHero {
  render: () => React.ReactNode
  code: string
  minHeight?: number
  align?: 'center' | 'start'
  surface?: PreviewSurface
}

export interface ComponentDemoGroup {
  /** Primary showcase rendered at the top of the component page (#preview) */
  hero: ComponentDemoHero
  /** Additional Base UI-style scenario demos rendered under #examples */
  examples: ComponentDemoItem[]
}
