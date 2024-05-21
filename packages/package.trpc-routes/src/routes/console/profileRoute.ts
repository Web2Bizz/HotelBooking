import { TRPCError } from '@trpc/server'
import z from 'zod'
import { PgClient } from '../../index.js'
import { publicProcedure, router } from '../../trpc.js'
import { ProfileSettings } from '../../types/mainSettings.js'

const profileProps = z.object({
    avatarShape: z.string(),
	id: z.string().uuid()
})

export const profileRouter = router({
	setSettings: publicProcedure.input(profileProps).mutation(async (opts) => {
		const { input } = opts

		const client = PgClient()

		console.log(JSON.stringify(input))

		client.connect()

		client.query(
			`UPDATE public.frontend_profile SET 
				avatar_shape=$1,
			WHERE frontend_id=$2;`,
			[
				input.avatarShape,
				input.id
			]
		)
	}),
	getSettings: publicProcedure
		.input(z.string().uuid())
		.query(async (opts): Promise<ProfileSettings> => {
			const { input } = opts

			const client = PgClient()

			const hotel_id = input

			client.connect()

			return client
				.query(
					`SELECT 
						avatar_shape,
						id
					FROM public.frontend_profile
					WHERE frontend_id=$1`,
					[hotel_id]
				)
				.then((result) => {
					client.end()
					return {
						id: result.rows[0]['id'],
						avatarShape: result.rows[0]['avatar_shape'],
					} as ProfileSettings
				})
				.catch((err) => {
					client.end()
					throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err })
				})
		})
})
