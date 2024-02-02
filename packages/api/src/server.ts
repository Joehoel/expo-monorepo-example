import { trpcServer } from '@hono/trpc-server';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createContext } from './context';
import { serve } from '@hono/node-server';
import { type HttpBindings } from '@hono/node-server';
import { appRouter } from './root';

type Bindings = HttpBindings & {
  DB: MySql2Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Setup CORS for the frontend
app.use('/trpc/*', async (c, next) => {
  return await cors({
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })(c, next);
});

// Setup TRPC server with context
app.use('/trpc/*', async (c, next) => {
  return await trpcServer({
    router: appRouter,
    createContext: async (opts) => {
      return await createContext(c.env.DB, opts);
    },
  })(c, next);
});

serve({
  fetch: app.fetch,
  port: 8787,
});
