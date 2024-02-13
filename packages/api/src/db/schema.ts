import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { createInsertSchema } from 'drizzle-zod';

export const products = mysqlTable('product', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  price: varchar('price', { length: 255 }).notNull(),
  nutri: varchar('nutri', { length: 2, enum: ['A', 'B', 'C', 'D', 'E'] }),
});

export const InsertProductSchema = createInsertSchema(products);
