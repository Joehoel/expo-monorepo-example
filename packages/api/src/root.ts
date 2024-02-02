import { helloRouter } from './routes/hello';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  hello: helloRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
