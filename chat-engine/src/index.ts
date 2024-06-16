import express, { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import { createServer } from 'node:http'
import cors from 'cors'
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import pg from 'pg'

const { Client } = pg

const main = async () => {
	if (process.env.NODE_ENV === undefined) throw Error('NODE_ENV is undefined')

	console.log(`launch in ${process.env.NODE_ENV} mode...`)

	dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

	const app = express()

	app.use(cors())
	console.log('cors mode enabled')

	if (process.env.SKT_PG_ADDRESS === undefined)
		throw Error('SKT_PG_ADDRESS is required')
	if (process.env.SKT_PG_PORT === undefined)
		throw Error('SKT_PG_PORT is required')
	if (process.env.SKT_PG_USER === undefined)
		throw Error('SKT_PG_USER is required')
	if (process.env.SKT_PG_PASSWORD === undefined)
		throw Error('SKT_PG_PASSWORD is required')
	if (process.env.SKT_PG_DATABASE === undefined)
		throw Error('SKT_PG_DATABASE is required')

	console.log('postgres client created')

	app.get(
		'/messages/:id',
		async (req: Request, res: Response): Promise<void> => {
			const { id } = req.params

			const pgClient = new Client({
				host: process.env.SKT_PG_ADDRESS,
				user: process.env.SKT_PG_USER,
				port: 5440,
				password: process.env.SKT_PG_PASSWORD,
				database: process.env.SKT_PG_DATABASE
			})

			await pgClient.connect()

			const result = await pgClient.query(
				`SELECT * FROM messages WHERE room_id='${id}'`
			)

			await pgClient.end()

			res.json(result.rows)
		}
	)

	app.get('/rooms', async (_, res) => {
		const pgClient = new Client({
			host: process.env.SKT_PG_ADDRESS,
			user: process.env.SKT_PG_USER,
			port: 5440,
			password: process.env.SKT_PG_PASSWORD,
			database: process.env.SKT_PG_DATABASE
		})

		await pgClient.connect()

		const result = await pgClient.query('SELECT * FROM rooms')

		await pgClient.end()

		res.json(result.rows)
	})

	app.get('/rooms-user/:userId', async (req, res) => {
		const { userId } = req.params

		const pgClient = new Client({
			host: process.env.SKT_PG_ADDRESS,
			user: process.env.SKT_PG_USER,
			port: 5440,
			password: process.env.SKT_PG_PASSWORD,
			database: process.env.SKT_PG_DATABASE
		})

		await pgClient.connect()

		const result = await pgClient.query('SELECT * FROM rooms WHERE client_id=$1', [userId])

		await pgClient.end()

		res.json(result.rows)
	})

	app.put(
		'/rooms/:id/status',
		async (req: Request, res: Response): Promise<void> => {
			const { id } = req.params
			const { status } = req.body

			if (status !== 'ACTIVE' && status !== 'RESOLVED') {
				res.status(400).json({
					error: 'Invalid status. Status must be either ACTIVE or RESOLVED.'
				})
				return
			}

			const pgClient = new Client({
				host: process.env.SKT_PG_ADDRESS,
				user: process.env.SKT_PG_USER,
				port: 5440,
				password: process.env.SKT_PG_PASSWORD,
				database: process.env.SKT_PG_DATABASE
			})

			await pgClient.connect()

			const result = await pgClient.query(
				`UPDATE rooms SET status=$1 WHERE id=$2 RETURNING *`,
				[status, id]
			)

			await pgClient.end()

			if (result.rows.length === 0) {
				res.status(404).json({ error: 'Room not found.' })
			} else {
				res.json(result.rows[0])
			}
		}
	)

	const server = createServer(app)

	const io = new Server(server, {
		connectionStateRecovery: {},
		cors: {
			origin: '*'
		}
	})

	console.log('io server is up')

	io.on('connection', async (socket) => {
		console.log('accepted new connection')

		socket.on('create room', async (payload, callback) => {
			const roomId = uuidv4()

			console.log('created room with id: ' + roomId)
			socket.join(roomId)
			console.log(`client id: ${payload.userId} joined to room ${roomId} `)

			const pgClient = new Client({
				user: process.env.SKT_PG_USER,
				password: process.env.SKT_PG_PASSWORD,
				host: process.env.SKT_PG_ADDRESS,
				port: 5440,
				database: process.env.SKT_PG_DATABASE
			})

			await pgClient.connect()

			await pgClient.query(
				`INSERT INTO rooms 
				(id, client_id, status, title) 
				VALUES 
				($1, $2, $3, $4)`,
				[roomId, payload.userId, 'ACTIVE', payload.title]
			)

			await pgClient.end()

			callback({
				roomId: roomId
			})
		})

		socket.on('join room', async (roomId) => {
			socket.join(roomId)
			console.log('socket joined in room: ' + roomId)
		})

		socket.on('leave room', async (roomId) => {
			socket.leave(roomId)
			console.log('socket left in room: ' + roomId)
		})

		socket.on('message', async (payload) => {
			console.log(`user with id: ${payload.userId} sent message`)

			console.log('accepted new message in room: ' + payload.roomId)

			io.to(payload.roomId).emit('message', payload)

			const pgClient = new Client({
				user: process.env.SKT_PG_USER,
				password: process.env.SKT_PG_PASSWORD,
				host: process.env.SKT_PG_ADDRESS,
				port: 5440,
				database: process.env.SKT_PG_DATABASE
			})

			await pgClient.connect()

			await pgClient.query(
				`INSERT INTO messages 
					(id, author_id, message, room_id) 
					VALUES 
					($1, $2, $3, $4)`,
				[uuidv4(), payload.userId, payload.message, payload.roomId]
			)
		})

		socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	})

	if (process.env.PORT === undefined)
		throw new Error('PORT env-variable is undefined')

	server.listen(process.env.PORT, () => {
		console.log(`server listen ${process.env.PORT} port`)
		console.log(`server started in ${process.env.NODE_ENV} mode`)
		console.log('ready to accept messages')
	})
}

main().catch(console.error)
