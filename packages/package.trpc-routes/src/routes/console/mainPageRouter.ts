import { TRPCError } from '@trpc/server'
import { PgClient } from '../../index.js'
import { publicProcedure, router } from '../../trpc.js'
import { z } from 'zod'
import { MainPageSettings } from '../../types/mainSettings.js'

const inputProps = z.object({
	id: z.string().uuid(),
	coverType: z.string(),
	isDisplayDiscount: z.boolean(),
	isDisplayBooking: z.boolean(),
	isDisplayPopular: z.boolean(),
	isDisplayFAQ: z.boolean()
})

export const mainPageRouter = router({
	getSettings: publicProcedure
		.input(z.string().uuid())
		.query(async (opts): Promise<MainPageSettings> => {
			const { input } = opts

			const client = PgClient()

			const hotel_id = input

			client.connect()

			return client
				.query(
					`SELECT
                        id,
                        cover_type,
                        display_discount,
						display_booking,
						display_popular,
						display_faq
                    FROM public.frontend_main_page
                    WHERE frontend_id=$1;`,
					[hotel_id]
				)
				.then((result) => {
					client.end()
					return {
						coverType: result.rows[0]['cover_type'],
						isDisplayDiscount: result.rows[0]['display_discount'],
						isDisplayBooking: result.rows[0]['display_booking'],
						isDisplayFAQ: result.rows[0]['display_faq'],
						isDisplayPopular: result.rows[0]['display_popular']
					} as MainPageSettings
				})
				.catch((err) => {
					client.end()
					throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err })
				})
		}),
	setSettings: publicProcedure.input(inputProps).mutation(async (opts) => {
		const { input } = opts

		const client = PgClient()

		client.connect()

		client.query(
			`UPDATE public.frontend_main_page SET
                cover_type=$1,
                display_discount=$2,
				display_booking=$3,
				display_popular=$4,
				display_faq=$5
            WHERE frontend_id=$6;`,
			[
				input.coverType,
				input.isDisplayDiscount,
				input.isDisplayBooking,
				input.isDisplayPopular,
				input.isDisplayFAQ,
				input.id
			]
		)
	})
})
