import { AI_DEMOS } from '@/docs/examples/demos/ai'
import { CALENDAR_DEMO } from '@/docs/examples/demos/calendar'
import { CHARTS_DEMOS } from '@/docs/examples/demos/charts'
import { INPUTS_DEMOS } from '@/docs/examples/demos/inputs'
import { NAVIGATION_DEMOS } from '@/docs/examples/demos/navigation'
import { OVERLAYS_DEMOS } from '@/docs/examples/demos/overlays'
import { PRIMITIVES_DEMOS } from '@/docs/examples/demos/primitives'
import { RESIZABLE_DEMO } from '@/docs/examples/demos/resizable'
import { SELECTION_DEMOS } from '@/docs/examples/demos/selection'
import { TOPOLOGY_DEMOS } from '@/docs/examples/demos/topology'
import type { ComponentDemoGroup } from '@/docs/examples/types'

export type { ComponentDemoGroup, ComponentDemoHero, ComponentDemoItem, PreviewSurface } from '@/docs/examples/types'

export const COMPONENT_DEMOS: Record<string, ComponentDemoGroup> = {
  ...PRIMITIVES_DEMOS,
  ...INPUTS_DEMOS,
  calendar: CALENDAR_DEMO,
  ...SELECTION_DEMOS,
  ...OVERLAYS_DEMOS,
  ...NAVIGATION_DEMOS,
  resizable: RESIZABLE_DEMO,
  ...CHARTS_DEMOS,
  ...AI_DEMOS,
  ...TOPOLOGY_DEMOS,
}
