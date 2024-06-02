import z from "zod"
import { PgClient } from "../utils"
import { t } from "../utils/trpc"

export type TFaq = {
	id: string
	title: string
	description: string
}

const getAllFAQ = t.procedure.query(async () => {
	const client = await PgClient()
		const res = await client.query<TFaq>('SELECT * FROM public.frontend_faq;')
		await client.end()
		return res.rows
})

const updateFAQItem = t.procedure
	.input(
		z.object({
			id: z.string().uuid(),
			title: z.string(),
			description: z.string()
		})
	)
	.mutation(async ({ input }) => {
		const client = await PgClient()
		const res = await client.query('UPDATE frontend_faq SET title=$2, description=$3 WHERE id=$1 RETURNING *', [
			input.id,
			input.title,
			input.description
		])
		await client.end()
		return res.rows[0]
	})

const deleteFAQItem = t.procedure.input(z.array(z.string().uuid())).mutation(async ({input}) => {
	const client = await PgClient()
	let y = ''

	console.log(input.length);
	

	for (let i = 0; i < input.length; i++) {
		y += `DELETE FROM frontend_faq WHERE id='${input[i]}';`
	}

	const res = await client.query(y)

	await client.end()
	return res.rows[0]
})

export { getAllFAQ, updateFAQItem, deleteFAQItem }