import {
  createContext,
  createRequestHandler,
  RouterContextProvider,
} from 'react-router';

type CloudflareContext = {
  env: CloudflareEnvironment;
  ctx: ExecutionContext;
};

export const cloudflareContext = createContext<CloudflareContext>();

declare global {
  interface CloudflareEnvironment extends Env {}
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
);

function getLoadContext(env: CloudflareEnvironment, ctx: ExecutionContext) {
  const context = new RouterContextProvider();
  context.set(cloudflareContext, { env, ctx });
  return context;
}

export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, getLoadContext(env, ctx));
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
