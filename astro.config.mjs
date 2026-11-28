import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

const r = (rel) => new URL(rel, import.meta.url).pathname

export default defineConfig({
  site: 'https://github.com/pengtikui/glaze-ui',
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^@\/components\/ui$/, replacement: r('./registry/glaze/ui/index.ts') },
        { find: /^@\/components\/ui\/(.*)$/, replacement: r('./registry/glaze/ui/$1') },
        { find: /^@\/components\/cards$/, replacement: r('./registry/glaze/cards/index.ts') },
        { find: /^@\/components\/cards\/(.*)$/, replacement: r('./registry/glaze/cards/$1') },
        { find: /^@\/components\/blocks$/, replacement: r('./registry/glaze/blocks/index.ts') },
        { find: /^@\/components\/blocks\/(.*)$/, replacement: r('./registry/glaze/blocks/$1') },
        { find: /^@\/lib\/(.*)$/, replacement: r('./registry/glaze/lib/$1') },
        { find: /^@\/styles\/(.*)$/, replacement: r('./registry/glaze/styles/$1') },
        { find: /^@\/registry\/(.*)$/, replacement: r('./registry/$1') },
        { find: /^@\/(.*)$/, replacement: r('./src/$1') },
      ],
    },
  },
})
