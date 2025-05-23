import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';

export default defineConfig({
  site: process.env.PUBLIC_BASE_URL,
  output: 'server',
  vite: {
    ssr: {
      external: ['node:async_hooks'],
    },
  },

  css: {
    postcss: {
      plugins: [
        autoprefixer({ flexbox: 'no-2009' }),
        postcssNested(),
        cssnano(),
      ],
    },
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react(), sitemap()],
  devToolbar: {
    enabled: false,
  },
});
