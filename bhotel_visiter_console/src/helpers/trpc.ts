import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'trpc-package/dist/routes'

export const trpc = createTRPCReact<AppRouter>()
