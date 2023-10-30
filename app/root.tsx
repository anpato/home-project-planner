import { cssBundleHref } from '@remix-run/css-bundle';
import { type LinksFunction } from '@remix-run/node';
import stylesheet from '~/styles/app.css';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRevalidator
} from '@remix-run/react';
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from '~/components/ui/toaster';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import LoadingTakeOver from '~/core/components/loading-takeover';
import InvitationDialog from '~/routes/my/components/invitation-dialog';
import { rootLoader } from '~/core/loaders/root.loader';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'use-credentials'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
  },
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
];

export { rootLoader as loader };

export default function App() {
  const { env, session } = useLoaderData<typeof rootLoader>();
  const { revalidate } = useRevalidator();
  const { state } = useLocation();
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_KEY)
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((e, session) => {
      if (
        e !== 'INITIAL_SESSION' &&
        session?.access_token !== serverAccessToken
      ) {
        revalidate();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, revalidate, supabase]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" onThemeChange={() => {}}>
          {state === 'loading' ? (
            <LoadingTakeOver />
          ) : (
            <Outlet context={{ supabase }} />
          )}

          <Toaster />
          <InvitationDialog />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
