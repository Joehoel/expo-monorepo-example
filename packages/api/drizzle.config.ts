import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'mysql2',
  verbose: true,
  strict: true,
} satisfies Config;
