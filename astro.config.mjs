import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';
import cssnano from 'cssnano';

import svelte from '@astrojs/svelte';

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
        postcssNesting(),
        cssnano(),
      ],
    },
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.local(),
        name: 'NaN Jaune',
        cssVariable: '--font-nan-jaune',
        options: {
          variants: [
            {
              weight: '100 900',
              style: 'normal',
              src: ['./src/assets/fonts/NaNJaune-Maxi-VF.woff2'],
            },
          ],
        },
      },
    ],
  },
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react(), sitemap(), svelte()],
  devToolbar: {
    enabled: false,
  },
});
