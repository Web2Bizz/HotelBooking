import express from 'express'
import * as dotenv from 'dotenv'
import { createServer } from 'node:http'
import cors from 'cors'
import { Server } from 'socket.io'

const main = async () => {
	if (process.env.NODE_ENV === undefined) throw Error('NODE_ENV is undefined')

	dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

	const app = express()

	app.use(cors())
	console.log('cors mode enabled')

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

		socket.on('message', async (message) => {
			console.log('accepted new message')
		})

		socket.on('disconnect', async () => {
			console.log('user disconnected')
		})
	})

    if (process.env.PORT === undefined) throw new Error('PORT env-variable is undefined')

	server.listen(process.env.PORT, async () => {
		console.log(`server listen ${process.env.PORT} port`)
		console.log(`server started in ${process.env.NODE_ENV} mode`)
        console.log('ready to accept messages');
        
	})
}

main().catch(console.error)
