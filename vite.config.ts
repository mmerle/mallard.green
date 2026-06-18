import { fileURLToPath, URL } from 'node:url';
import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'PUBLIC_',
  plugins: [cloudflare({ viteEnvironment: { name: 'ssr' } }), reactRouter()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist()),
      drafts: {
        customMedia: true,
      },
    },
  },
  build: {
    cssCodeSplit: false,
  },
});
