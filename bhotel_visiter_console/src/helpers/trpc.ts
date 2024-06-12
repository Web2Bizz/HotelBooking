import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'trpc-package'

export const trpc = createTRPCReact<AppRouter>()
