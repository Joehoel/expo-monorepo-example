import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const helloRouter = createTRPCRouter({
  world: publicProcedure.input(z.string()).query(({ input }) => {
    return `Hello ${input}!`;
  }),
});
