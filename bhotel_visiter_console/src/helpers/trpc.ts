import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'trpc-package/dist'

export const trpc = createTRPCReact<AppRouter>()
