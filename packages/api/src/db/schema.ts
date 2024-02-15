import { float, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { InferModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const products = mysqlTable('product', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  price: float('price').notNull(),
  nutri: varchar('nutri', { length: 2, enum: ['A', 'B', 'C', 'D', 'E'] }),
  unitSize: varchar('unitSize', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }).notNull(),
});

export const InsertProductSchema = createInsertSchema(products);
export const SelectProductSchema = createSelectSchema(products);

export type Product = InferSelectModel<typeof products>;
