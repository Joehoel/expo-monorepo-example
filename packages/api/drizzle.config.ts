import type { Config } from 'drizzle-kit';
import { createConnectionString } from './src/lib/uri';

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'mysql2',
  verbose: true,
  dbCredentials: {
    uri: createConnectionString({
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      host: process.env.DB_HOST!,
      database: process.env.DB_NAME!,
      port: 3306,
    }),
  },
  strict: true,
} satisfies Config;
