import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@boodschappen-vergelijker/api';
import superjson from 'superjson';
import fetch from 'node-fetch';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
  transformer: superjson,
});
