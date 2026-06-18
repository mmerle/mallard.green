import Lenis from 'lenis';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { LinksFunction, MetaFunction } from 'react-router';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import '~/styles/global.css';
import '~/styles/utils.css';
import { siteMeta } from '~/utils/meta';
import s from './root.module.css';

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  {
    rel: 'preload',
    href: 'https://fonts.mallard.green/HelveticaNow/Helvetica-Now.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];

export const meta: MetaFunction = () => siteMeta();

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    function onWindowResize() {
      document.documentElement.style.setProperty(
        '--vh',
        `${document.documentElement.clientHeight * 0.01}px`,
      );
    }

    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    let frame = 0;

    function onRaf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(onRaf);
    }

    frame = requestAnimationFrame(onRaf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={s.app}>
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Unknown error';

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section className={s.error}>
      <h1>Something went wrong</h1>
      <p>{message}</p>
    </section>
  );
}
