import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://tordans.github.io',
  base: import.meta.env.DEV ? '' : '/berlin-bikenetwork-monitoring',

  integrations: [tailwind(), react()],
})
