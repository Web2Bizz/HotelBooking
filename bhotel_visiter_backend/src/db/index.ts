import { pgClient } from './../utils/index.js'
import { v4 as uuidv4 } from 'uuid'

export const dbInitialize = (frontendId: string) => {
	const client = pgClient()

	client.connect()

	client.query(
		`INSERT INTO public.frontend_header (id, frontend_id) VALUES ($1, $2);`,
		[uuidv4(), frontendId]
	)
	client.query(
		`INSERT INTO public.frontend_main_page (id, frontend_id) VALUES ($1, $2);`,
		[uuidv4(), frontendId]
	)
	client.query(
		`INSERT INTO public.frontend_profile (id, frontend_id) VALUES ($1, $2);`,
		[uuidv4(), frontendId]
	)
}
