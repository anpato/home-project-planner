import path from 'path';
import express from 'express';
import compression from 'compression';
import { createRequestHandler } from '@remix-run/express';
import type { AppLoadContext, ServerBuild } from '@remix-run/server-runtime';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import * as chokidar from 'chokidar';
import { supabaseServer } from '~/services/supbase';
import { createRemixRequest } from '@remix-run/express/dist/server';

function getLoadContext(
  request: express.Request,
  response: express.Response
): AppLoadContext {
  response.append('url', 'http://localhost:3000');
  const remixRequest = createRemixRequest(request, response);

  return {
    supabase: (resp: Response = new Response()) =>
      supabaseServer(remixRequest, resp)
  };
}

// patch in Remix runtime globals
installGlobals();

const BUILD_PATH = path.resolve('./build/index.js');
let build: ServerBuild = require(BUILD_PATH);

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use('/', express.static('public/build', { immutable: true, maxAge: '1y' }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

// Check if the server is running in development mode and use the devBuild to reflect realtime changes in the codebase.
app.all(
  '*',
  process.env.NODE_ENV === 'development'
    ? createDevRequestHandler()
    : createRequestHandler({
        build,
        mode: process.env.NODE_ENV,
        getLoadContext
      })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // send "ready" message to dev server
  if (process.env.NODE_ENV === 'development') {
    console.log(`📢 Broadcasting changes to dev server 📢`);
    broadcastDevReady(build);
  }
});

// Create a request handler that watches for changes to the server build during development.
function createDevRequestHandler() {
  async function handleServerUpdate() {
    // 1. re-import the server build
    build = await reimportServer();
    // 2. tell dev server that this app server is now up-to-date and ready
    console.log(`📢 Broadcasting changes to dev server 📢`);
    broadcastDevReady(build);
  }

  chokidar
    .watch(BUILD_PATH, { ignoreInitial: true })
    .on('add', handleServerUpdate)
    .on('change', handleServerUpdate)
    .on('unlink', handleServerUpdate);

  // wrap request handler to make sure its recreated with the latest build for every request
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      return createRequestHandler({
        build,
        mode: 'development',
        getLoadContext
      })(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

// CJS require cache busting
/**
 * @type {() => Promise<ServerBuild>}
 */
async function reimportServer() {
  // 1. manually remove the server build from the require cache
  Object.keys(require.cache).forEach((key) => {
    if (key.startsWith(BUILD_PATH)) {
      delete require.cache[key];
    }
  });

  // 2. re-import the server build
  return require(BUILD_PATH);
}
