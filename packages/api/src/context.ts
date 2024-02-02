import { type inferAsyncReturnType } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from './db/client';

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return { db };
};

export type Context = inferAsyncReturnType<typeof createContext>;
