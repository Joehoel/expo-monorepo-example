import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { InsertProductSchema, products } from '../db/schema';
import { db } from '../db/client';
import { exists, isNotNull } from 'drizzle-orm';

export const productRouter = createTRPCRouter({
  insertOne: publicProcedure.input(InsertProductSchema).mutation(({ input, ctx }) => {
    return db.insert(products).values(input).execute();
  }),
  getAll: publicProcedure.query(() => {
    return db.select().from(products).execute();
  }),
});
