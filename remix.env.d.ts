import '@remix-run/dev';
import '@remix-run/node';
import type { LoadContext } from './app/types/context';

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext extends LoadContext {}
}
