import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://victortorres.dev',
  integrations: [vue(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
})