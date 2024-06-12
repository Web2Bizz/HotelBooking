import z from "zod"
import { PgClient } from "../utils"
import { frontend_id } from ".."
import { t } from "../utils/trpc"

const getFrontendMainPage = t.procedure.query(async () => {
	const client = await PgClient()
	const res = await client.query('SELECT * FROM frontend_main_page WHERE frontend_id = $1', [frontend_id])
	await client.end()
	return res.rows[0] as {
        cover_type: string,
		display_discount: boolean,
		display_booking: boolean,
		display_popular: boolean,
		display_faq: boolean,
        welcome_message: string
    }
})

const setFrontendMainPage = t.procedure
	.input(
		z.object({
			cover_type: z.string().default('static'),
			display_discount: z.boolean().default(true),
			display_booking: z.boolean().default(true),
			display_popular: z.boolean().default(false),
			display_faq: z.boolean().default(true),
            welcome_message: z.string()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query(
			`UPDATE frontend_main_page SET 
                display_discount = $1, 
                display_booking = $2, 
                display_popular = $3, 
                display_faq = $4,
                welcome_message = $6
            WHERE frontend_id = $5 RETURNING *`,
			[input.display_discount, input.display_booking, input.display_popular, input.display_faq, frontend_id, input.welcome_message]
		)
		await client.end()
		return res.rows[0]
	})

export { getFrontendMainPage, setFrontendMainPage }