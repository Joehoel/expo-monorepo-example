import { drizzle } from 'drizzle-orm/mysql2';
import { MySql2Database } from 'drizzle-orm/mysql2';

export const createDb = (mysql2: MySql2Database) => {
  return drizzle(mysql2);
};
