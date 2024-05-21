import { publicProcedure, router } from '../../trpc.js'
import { User } from '../../types/index.js'
import z from 'zod'

const userModel = {
	id: z.string(),
	name: z.string(),
	surname: z.string(),
	fatherName: z.string(),
	email: z.string()
}

export const userRouter = router({
	getAll: publicProcedure.query((): Array<User> => {
		return []
	}),
	getById: publicProcedure.input(z.string()).query((opts): User => {
		const { input } = opts

		return {
			id: '',
			name: '',
			surname: '',
			fatherName: '',
			email: ''
		}
	}),
	setById: publicProcedure.input(z.object(userModel)).mutation((opts) => {
		const { input } = opts
	}),
	deleteById: publicProcedure.input(z.string()).query((opts) => {
		const { input } = opts
	})
})
