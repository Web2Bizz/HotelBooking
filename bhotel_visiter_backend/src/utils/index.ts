import pg from 'pg'
const { Client } = pg

export const pgClient = () =>
	new Client({
		host: process.env.PG_ADDRESS,
		port: process.env.PG_PORT,
		database: process.env.PG_DATABASE,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD
	})
