import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { httpBatchLink, loggerLink } from '@trpc/client';
import Constants from 'expo-constants';
import { useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import superjson from 'superjson';

import { api } from '~/lib/trpc';

const storage = new MMKV({
  id: 'boodschappen-vergelijker',
});

const persister = createSyncStoragePersister({
  storage: {
    getItem(key) {
      return storage.getString(key) ?? null;
    },
    setItem(key, value) {
      storage.set(key, value);
    },
    removeItem(key) {
      storage.delete(key);
    },
  },
});

/**
 * A set of typesafe hooks for consuming your API.
 */
export { type RouterInputs, type RouterOutputs } from '@boodschappen-vergelijker/api';

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0] ?? 'localhost';

  if (!localhost) {
    throw new Error('Failed to get localhost. Please point to your production server.');
  }

  return `http://${localhost}:3000`;
};

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
          headers() {
            const headers = new Map<string, string>();
            headers.set('x-trpc-source', 'expo-react');
            return Object.fromEntries(headers);
          },
          transformer: superjson,
        }),
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
          colorMode: 'ansi',
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          maxAge: Infinity,
        }}
      >
        {props.children}
      </PersistQueryClientProvider>
    </api.Provider>
  );
}
