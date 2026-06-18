import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src/app',
  buildDirectory: 'build',
  ssr: true,
  future: {
    v8_middleware: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
