import { router } from '../trpc.js'
import { adminRouter } from './admin/index.js'
import { clientRouter } from './client/index.js'
import { consoleRoute } from './console/index.js'
import { publicRouter } from './public/index.js'

export const appRouter = router({
	adminRouter,
	clientRouter,
	publicRouter,
	consoleRoute
})

export type AppRouter = typeof appRouter
