import { z } from 'zod'
import { publicProcedure, router } from '../../trpc.js'

export const themeRoute = router({
	setTheme: publicProcedure.input(z.string()).query(() => {}),
	getTheme: publicProcedure.query((): string => '')
})
