import { type inferAsyncReturnType } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { createDb } from './db/client';

interface ApiContextProps {
  db: MySql2Database;
}

export const createContext = async (
  mysql: MySql2Database,
  opts: FetchCreateContextFnOptions
): Promise<ApiContextProps> => {
  const db = createDb(mysql);

  return { db };
};

export type Context = inferAsyncReturnType<typeof createContext>;
