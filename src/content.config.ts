import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string().optional(),
    description: z.string(),
    order: z.number().default(99),
    interactiveWidget: z.enum(['foundations', 'ai-endpoints']).optional(),
  }),
})

export const collections = { docs }
