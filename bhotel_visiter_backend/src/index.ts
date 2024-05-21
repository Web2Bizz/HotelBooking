import { env } from 'process'
import * as trpcExpress from '@trpc/server/adapters/express'
import { log, error, clear, warn } from 'console'
import dotenv from 'dotenv'
import { appRouter } from 'trpc-package/dist/index.js'
import express from 'express'
import cors from 'cors'
import { pgClient } from './utils/index.js'
import { dbInitialize } from './db/index.js'

dotenv.config({ path: `.env.${env.NODE_ENV}` })

const app = express()

type THotelData = { id_hotel_properties: string }

const getCurrentHotelData = async (): Promise<
	Array<THotelData> | undefined
> => {
	const requestOptions = {
		method: 'GET'
	}

	return await fetch(
		`${process.env.ADMIN_API_HOSTNAME}/api/hotelSettings/getHotelProperties`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => result as Array<THotelData>)
		.catch((error) => {
			error(error)
			return undefined
		})
}

const checkHotelData = async (): Promise<boolean> => {
	return getCurrentHotelData().then((result) => {
		if (result === undefined || result === null || !Array.isArray(result))
			return false

		return true
	})
}

const ensureHotelDataExisting = async (): Promise<boolean> => {
	const client = pgClient()

	client.connect()

	const count = (
		await client.query('SELECT * FROM public.frontend_config ORDER BY id ASC')
	).rowCount

	return count !== null && count > 0
}

export const runTRPCServer = () => {
	if (env.PORT === undefined) throw Error('PORT env not defined')

	checkHotelData().then((result) => {
		if (!result) throw new Error('Cannot find hotel data')

		log('Hotel data loaded successfully')
	})

	ensureHotelDataExisting().then(async (result) => {
		if (!result) {
			warn('Cannot find hotel data in database, lets create it!')

			const data = await getCurrentHotelData()

			if (data === undefined) throw new Error()

			const hotelId = data[0].id_hotel_properties

			const client = pgClient()

			client.connect()

			const frontendId = '67342c88-fd1e-425b-99b1-3cdc427b914a'

			client
				.query(
					`
                INSERT INTO public.frontend_config (
                    id,
					hotel_id
                )
                VALUES (
                    $1,
					$2
                );`,
					[frontendId, hotelId]
				)
				.then(() => {
					dbInitialize(frontendId)
				})

			log('Hotel data created successfully')
		}

		log('Hotel data loaded successfully')
	})

	app.use(cors())
	app.use(
		'/trpc',
		trpcExpress.createExpressMiddleware({
			router: appRouter
		})
	)

	app.listen(env.PORT)
}

const main = async (): Promise<void> => {
	dotenv.config({ path: `.env.${env.NODE_ENV}` })

	clear()

	log(`
✨ Server started on ${env.NODE_ENV} mode
✨ Server listen now port: ${env.PORT}
✨ Listen PG_ADDRESS: ${env.PG_ADDRESS}
✨        PG_PORT: ${env.PG_PORT}
✨        PG_DATABASE: ${env.PG_DATABASE}
✨        ADMIN_API_HOST: ${env.ADMIN_API_HOSTNAME}`)

	runTRPCServer()
}

main().catch(error)
