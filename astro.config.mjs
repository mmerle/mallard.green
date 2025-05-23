import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import autoprefixer from 'autoprefixer';
import postcssnesting from 'postcss-nesting';
import cssnano from 'cssnano';

export default defineConfig({
  site: process.env.PUBLIC_BASE_URL,
  output: 'server',
  vite: {
    ssr: {
      external: ['node:async_hooks'],
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      // https://github.com/withastro/astro/issues/12824
      alias: import.meta.env.PROD && {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({ flexbox: 'no-2009' }),
        postcssnesting(),
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
