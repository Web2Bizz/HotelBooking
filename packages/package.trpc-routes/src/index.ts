import { inferRouterOutputs } from '@trpc/server'
import { v4 } from 'uuid'
import { z } from 'zod'
import { deleteFAQItem, getAllFAQ, getFrontendMainPage, getHotelProperties, setFrontendMainPage, updateFAQItem } from './routes'
import { TFaq } from './routes/faq'
import { PgClient } from './utils/index'
import { t } from './utils/trpc'

export const frontend_id = '67342c88-fd1e-425b-99b1-3cdc427b914a'

// Procedure for clean_journal
const getCleanJournal = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM clean_journal WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const addToCleanJournal = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			booking_id: z.string().uuid(),
			date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query('INSERT INTO clean_journal (id, booking_id, date) VALUES ($1, $2, $3) RETURNING *', [
			input.id,
			input.booking_id,
			input.date
		])
		await client.end()
		return res.rows[0]
	})

// Procedure for client
const getClient = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM client WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const addClient = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			birthday: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query('INSERT INTO client (id, birthday) VALUES ($1, $2) RETURNING *', [
			input.id,
			input.birthday
		])
		await client.end()
		return res.rows[0]
	})

const getUserById = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM client WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

// Procedure for frontend_config
const getFrontendConfig = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM frontend_config WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const setFrontendConfig = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			hotel_id: z.string().uuid()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query('UPDATE frontend_config SET hotel_id = $1 WHERE id = $2 RETURNING *', [
			input.hotel_id,
			input.id
		])
		await client.end()
		return res.rows[0]
	})

// Procedure for frontend_footer
const getFrontendFooter = t.procedure.query(async () => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM frontend_footer WHERE frontend_id = $1', [frontend_id])
	await client.end()
	return res.rows[0]
})

const setFrontendFooter = t.procedure
	.input(
		z.object({
			display_logo: z.boolean().default(true),
			display_label: z.boolean().default(true),
			display_social_block: z.boolean().default(false),
			background_color: z.string(),
			display_vk: z.boolean().default(true),
			vk_link: z.string(),
			display_dzen: z.boolean().default(true),
			dzen_link: z.string(),
			display_telegram: z.boolean().default(true),
			telegram_link: z.string(),
			display_youtube: z.boolean().default(true),
			youtube_link: z.string()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			`UPDATE frontend_footer SET 
			display_logo=$1, 
			display_label=$2, 
			display_social_block=$3, 
			background_color=$5, 
			display_vk=$6, 
			vk_link=$7, 
			display_dzen=$8, 
			dzen_link=$9, 
			display_telegram=$10, 
			telegram_link=$11, 
			display_youtube=$12, 
			youtube_link=$13 
			WHERE frontend_id = $4;`,
			[
				input.display_logo, 
				input.display_label, 
				input.display_social_block, 
				frontend_id,
				input.background_color,
				input.display_vk,
				input.vk_link,
				input.display_dzen,
				input.dzen_link,
				input.display_telegram,
				input.telegram_link,
				input.display_youtube,
				input.youtube_link
			]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for frontend_header
const getFrontendHeader = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM frontend_header WHERE frontend_id = $1', [input])
	await client.end()
	return res.rows[0]
})

const setFrontendHeader = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			frontend_id: z.string().uuid(),
			display_logo: z.boolean().default(true),
			display_search: z.boolean().default(true),
			display_details: z.boolean().default(true),
			display_booking_button: z.boolean().default(true),
			display_label: z.boolean().default(false),
			background_color: z.string().default('#3c3c3c')
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'UPDATE frontend_header SET display_logo = $2, display_search = $3, display_details = $4, display_booking_button = $5, display_label = $6, background_color = $7 WHERE frontend_id = $1 RETURNING *',
			[
				input.frontend_id,
				input.display_logo,
				input.display_search,
				input.display_details,
				input.display_booking_button,
				input.display_label,
				input.background_color
			]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for frontend_profile
const getFrontendProfile = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM frontend_profile WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const setFrontendProfile = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			frontend_id: z.string().uuid(),
			avatar_shape: z.string().default('ROUND')
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'UPDATE frontend_profile SET frontend_id = $1, avatar_shape = $2 WHERE id = $3 RETURNING *',
			[input.frontend_id, input.avatar_shape, input.id]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for notifications
const getNotifications = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM notifications WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const pushNotification = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			client_id: z.string().uuid(),
			is_readed: z.boolean().default(false),
			title: z.string(),
			message: z.string(),
			date: z
				.string()
				.refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
				.optional()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'INSERT INTO notifications (id, client_id, is_readed, title, message, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[input.id, input.client_id, input.is_readed, input.title, input.message, input.date || null]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for payment
const getPayment = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM payment WHERE client_id = $1', [input])
	await client.end()
	return res.rows
})

const addPaymentMethod = t.procedure
	.input(
		z.object({
			client_id: z.string().uuid(),
			card_number: z.string(),
			card_expire: z.string(),
			card_user: z.string()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			`INSERT INTO payment (id, client_id, card_number, card_expire, card_user) VALUES ('${v4()}', $1, $2, $3, $4) RETURNING *`,
			[input.client_id, input.card_number, input.card_expire, input.card_user]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for review_room
const getReviewRoom = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM review_room WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const addReviewRoom = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			client_id: z.string().uuid(),
			message: z.string(),
			rate: z.number(),
			date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'INSERT INTO review_room (id, client_id, message, rate, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[input.id, input.client_id, input.message, input.rate, input.date]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for reviews
const getReviews = t.procedure
	.input(
		z.object({
			client_id: z.string().uuid(),
			date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		})
	)
	.query(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query('SELECT * FROM reviews WHERE client_id = $1 AND date = $2', [
			input.client_id,
			input.date
		])
		await client.end()
		return res.rows[0]
	})

const addReview = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			client_id: z.string().uuid(),
			message: z.string(),
			rate: z.number(),
			date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'INSERT INTO reviews (id, client_id, message, rate, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[input.id, input.client_id, input.message, input.rate, input.date]
		)
		await client.end()
		return res.rows[0]
	})

const getAllServices = t.procedure
	.query(async () => {
		const client = await PgClient()
		const res = await client.query('SELECT * FROM service')
		await client.end()
		return res.rows
})

// Procedure for service
const getService = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM service WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const setService = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			name: z.string(),
			description: z.string(),
			price: z.number(),
			is_available: z.boolean().default(true)
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'UPDATE service SET name = $1, description = $2, price = $3, is_available = $4 WHERE id = $5 RETURNING *',
			[input.name, input.description, input.price, input.is_available, input.id]
		)
		await client.end()
		return res.rows[0]
	})

const addService = t.procedure
	.input(
		z.object({
			name: z.string(),
			description: z.string(),
			price: z.number()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			`INSERT INTO service (id, name, description, price) VALUES ('${v4()}', $1, $2, $3) RETURNING *`,
			[input.name, input.description, input.price]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for service_receipt
const getServiceReceipt = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM service_receipt WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const addServiceReceipt = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			client_id: z.string().uuid(),
			date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'INSERT INTO service_receipt (id, client_id, date) VALUES ($1, $2, $3) RETURNING *',
			[input.id, input.client_id, input.date]
		)
		await client.end()
		return res.rows[0]
	})

// Procedure for service_receipt_item
const getServiceReceiptItem = t.procedure.input(z.string().uuid()).query(async ({ input }) => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM service_receipt_item WHERE id = $1', [input])
	await client.end()
	return res.rows[0]
})

const addServiceReceiptItem = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			service_id: z.string().uuid(),
			service_receipt_id: z.string().uuid(),
			price: z.number()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			'INSERT INTO service_receipt_item (id, service_id, service_receipt_id, price) VALUES ($1, $2, $3, $4) RETURNING *',
			[input.id, input.service_id, input.service_receipt_id, input.price]
		)
		await client.end()
		return res.rows[0]
	})

const addFAQItem = t.procedure
	.input(
		z.array(
			z.object({
				title: z.string(),
				description: z.string()
			})
		)
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()

		let y = ''

		for (let i = 0; i < input.length; i++) {
			y += `INSERT INTO frontend_faq (id, frontend_id, title, description) VALUES ('${v4()}', '${frontend_id}', '${input[i].title}', '${input[i].description}');`
		}

		const res = await client.query(y)
		await client.end()
		return res.rows[0]
	})



// Export the router
export const appRouter = t.router({
	getAllServices,
	getHotelProperties,
	getCleanJournal,
	addToCleanJournal,
	getClient,
	addClient,
	getUserById,
	getFrontendConfig,
	setFrontendConfig,
	getFrontendFooter,
	setFrontendFooter,
	getFrontendHeader,
	setFrontendHeader,
	getFrontendMainPage,
	setFrontendMainPage,
	getFrontendProfile,
	setFrontendProfile,
	getNotifications,
	pushNotification,
	getPayment,
	addPaymentMethod,
	getReviewRoom,
	addReviewRoom,
	getReviews,
	addReview,
	getService,
	setService,
	addService,
	getServiceReceipt,
	addServiceReceipt,
	getServiceReceiptItem,
	addServiceReceiptItem,
	addFAQItem,
	updateFAQItem,
	getAllFAQ,
	deleteFAQItem
})

export type AppRouter = typeof appRouter

type RouterOutput = inferRouterOutputs<AppRouter>;

export type HotelProperties = RouterOutput['getHotelProperties']
export type FrontendMainPageConfig = RouterOutput['getFrontendMainPage']
export type Faq = TFaq

export { t }
