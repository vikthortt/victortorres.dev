import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // integrations: [vue(), tailwind()]
  site: 'https://victortorres.dev',

  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});