import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@boodschappen-vergelijker/api';
import SuperJSON from 'superjson';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      transformer: SuperJSON,
    }),
  ],
});
