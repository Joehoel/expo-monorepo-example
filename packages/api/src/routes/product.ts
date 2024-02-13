import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { InsertProductSchema, products } from '../db/schema';
import { db } from '../db/client';

export const productRouter = createTRPCRouter({
  insertOne: publicProcedure.input(InsertProductSchema).mutation(({ input, ctx }) => {
    return db.insert(products).values(input).execute();
  }),
});
