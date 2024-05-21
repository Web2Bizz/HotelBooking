import { TRPCError } from '@trpc/server'
import { PgClient } from '../../index.js'
import { publicProcedure, router } from '../../trpc.js'
import z from 'zod'
import { HeaderSettings } from '../../types/mainSettings.js'

const headerProps = z.object({
	isDisplayLogo: z.boolean(),
	isDisplayName: z.boolean(),
	isDisplaySearch: z.boolean(),
	isDisplayBooking: z.boolean(),
	isDisplayProfileDetails: z.boolean(),
	backgroundColor: z.string().startsWith('#'),
	id: z.string().uuid()
})

export const headerRouter = router({
	setSettings: publicProcedure.input(headerProps).mutation(async (opts) => {
		const { input } = opts

		const client = PgClient()

		client.connect()

		client.query(
			`UPDATE public.frontend_header SET 
				display_logo=$1, 
				display_label=$2, 
				display_search=$3, 
				display_booking_button=$4, 
				display_details=$5,
				background_color=$6
			WHERE frontend_id=$7;`,
			[
				input.isDisplayLogo,
				input.isDisplayName,
				input.isDisplaySearch,
				input.isDisplayBooking,
				input.isDisplayProfileDetails,
				input.backgroundColor,
				input.id
			]
		)
	}),
	getSettings: publicProcedure
		.input(z.string().uuid())
		.query(async (opts): Promise<HeaderSettings> => {
			const { input } = opts

			const client = PgClient()

			const hotel_id = input

			client.connect()

			return client
				.query(
					`SELECT 
						display_logo, 
						display_label,
						display_search, 
						display_booking_button, 
						display_details,
						background_color,
						id
					FROM public.frontend_header 
					WHERE frontend_id=$1`,
					[hotel_id]
				)
				.then((result) => {
					client.end()
					return {
						id: result.rows[0]['id'],
						isDisplayLogo: result.rows[0]['display_logo'],
						isDisplayBooking: result.rows[0]['display_booking_button'],
						isDisplayName: result.rows[0]['display_label'],
						isDisplayProfileDetails: result.rows[0]['display_details'],
						isDisplaySearch: result.rows[0]['display_search'],
						backgroundColor: result.rows[0]['background_color']
					} as HeaderSettings
				})
				.catch((err) => {
					client.end()
					throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err })
				})
		})
})
