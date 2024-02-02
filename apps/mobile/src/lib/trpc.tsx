import { AppRouter } from '@boodschappen-vergelijker/api';
import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<AppRouter>();
