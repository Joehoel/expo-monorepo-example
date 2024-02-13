import { helloRouter } from './routes/hello';
import { productRouter } from './routes/product';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
