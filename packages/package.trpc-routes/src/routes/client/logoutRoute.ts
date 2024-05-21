import { publicProcedure, router } from '../../trpc.js'
import { User } from '../../types/index.js'
import z from 'zod'

export const logoutRouter = router({
	logout: publicProcedure.input(z.string()).query(() => {
		return 'logout'
	})
})
