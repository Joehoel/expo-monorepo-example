import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { appRouter } from './root';
import { logger } from 'hono/logger';

// type Bindings = HttpBindings & {
//   DB: MySql2Database;
// };

const app = new Hono();

app.use('*', logger());

// Setup TRPC server with context
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  })
);

serve(app);
