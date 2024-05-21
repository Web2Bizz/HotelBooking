import { TRPCError } from '@trpc/server'
import { PgClient } from '../../index.js'
import { publicProcedure, router } from '../../trpc.js'
import z from 'zod'
import { FooterSettings } from '../../types/mainSettings.js'

const footerProps = z.object({
	isDisplayLogo: z.boolean(),
	isDisplayName: z.boolean(),
	isDisplaySocialBlock: z.boolean(),
	id: z.string().uuid()
})

export const footerRouter = router({
	setSettings: publicProcedure.input(footerProps).mutation((opts) => {
		const { input } = opts

		const client = PgClient()

		client.connect()

		client
			.query(
				`UPDATE public.frontend_footer SET 
				  display_logo=$1, 
				  display_label=$2, 
				  display_social_block=$3 
				WHERE frontend_id=$4;`,
				[
					input.isDisplayLogo,
					input.isDisplayName,
					input.isDisplaySocialBlock,
					input.id
				]
			)
	}),
	getSettings: publicProcedure
		.input(z.string().uuid())
		.query(async (opts): Promise<FooterSettings> => {
			const { input } = opts

			const client = PgClient()

			const hotel_id = input

			client.connect()

			return client
				.query(
					`SELECT 
						display_logo, 
						display_label,
						display_social_block,
						id
					FROM public.frontend_footer 
					WHERE frontend_id=$1`,
					[hotel_id]
				)
				.then((result) => {
					client.end()

					return {
						id: result.rows[0]['id'],
						isDisplayLogo: result.rows[0]['display_logo'],
						isDisplayName: result.rows[0]['display_label'],
						isDisplaySocialBlock: result.rows[0]['display_social_block']
					} as FooterSettings
				})
				.catch((err) => {
					client.end()
					throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err })
				})
		})
})
