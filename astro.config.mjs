import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://tordans.github.io',
  base: import.meta.env.DEV ? '' : '/berlin-bikenetwork-monitoring',

  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
