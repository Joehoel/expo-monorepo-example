import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { appRouter } from './root';
import { bearerAuth } from 'hono/bearer-auth';

const app = new Hono();

app.use('*', logger());

app.use('/auth/*', bearerAuth({ token: 'hello world' }));

// Setup CORS for the frontend
app.use('/trpc/*', async (c, next) => {
  return await cors({
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })(c, next);
});

// Setup TRPC server with context
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  })
);

serve(app);
