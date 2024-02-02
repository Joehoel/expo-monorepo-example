import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { appRouter } from './root';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

// type Bindings = HttpBindings & {
//   DB: MySql2Database;
// };

const app = new Hono();

app.use('*', logger());

// Setup CORS for the frontend
app.use('/trpc/*', async (c, next) => {
  return await cors({
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    // https://hono.dev/middleware/builtin/cors#options
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
