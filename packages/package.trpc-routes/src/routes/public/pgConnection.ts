import { Client } from 'pg'
import { publicProcedure, router } from '../../trpc.js'
import { Response, pgData } from './../../types/index.js'
import { TRPCError } from '@trpc/server'
import { PgClient } from '../../index.js'

export const pgConnectionaRouter = router({
	checkConnection: publicProcedure
		.use(async (opts) => {
			const { PG_ADDRESS, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } =
				process.env

			if (PG_ADDRESS === undefined)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'PG_ADDRESS is undefined'
				})

			if (PG_PORT === undefined)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'PG_PORT is undefined'
				})

			if (PG_DATABASE === undefined)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'PG_DATABASE is undefined'
				})

			if (PG_USER === undefined)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'PG_USER is undefined'
				})

			if (PG_PASSWORD === undefined)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'PG_PASSWORD is undefined'
				})

			return opts.next({
				ctx: {
					PG_ADDRESS,
					PG_PORT,
					PG_DATABASE,
					PG_USER,
					PG_PASSWORD
				}
			})
		})
		.query(async (ctx): Promise<Response> => {
			const client = PgClient()

			client.connect()

			client.end()

			return { status: 'OK' }
		}),
	getPgData: publicProcedure.query(async (): Promise<pgData> => {
		const { PG_ADDRESS, PG_PORT, PG_DATABASE, PG_USER } = process.env

		return { name: PG_DATABASE, host: PG_ADDRESS, port: PG_PORT, user: PG_USER }
	})
})
