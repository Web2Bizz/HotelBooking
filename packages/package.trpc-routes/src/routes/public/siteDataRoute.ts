import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../../trpc.js'
import { Hotel } from './../../types/index.js'
import z from 'zod'

export const siteDataRouter = router({
	getName: publicProcedure.query(async (): Promise<Hotel> => {
		const { ADMIN_API_HOSTNAME } = process.env

		if (ADMIN_API_HOSTNAME === undefined)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'ADMIN_API_HOSTNAME is undefined'
			})

		return await fetch(
			`${ADMIN_API_HOSTNAME}/hotelSettings/getHotelProperties`,
			{
				method: 'GET',
				redirect: 'follow'
			}
		)
			.then((response) => response.json())
			.catch((error) => console.error(error))
	})
})
