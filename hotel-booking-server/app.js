import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import errorMiddleware from './middleware/error.middleware.js'
import additionalsRouter from './routes/additionals.routes.js'
import bookingRouter from './routes/booking.routes.js'
import dealRouter from './routes/deal.routes.js'
import hotelSettingsRouter from './routes/hotelSettigs.routes.js'
import querysRouter from './routes/querys.routes.js'
import rateRouter from './routes/rate.routes.js'
import roomRouter from './routes/room.routes.js'
import repairRoomRouter from './routes/roomRepair.routes.js'
import roomServiceRouter from './routes/roomService.routes.js'
import userRouter from './routes/user.routes.js'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const PORT = process.env.PORT || 8080

const app = express()

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
		optionSuccessStatus: 200
	})
)
app.use(express.json())
app.use(cookieParser())
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(bodyParser.json())
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   } else {
//     next();
//   }
// });

app.use('/room', roomRouter)
app.use('/additionals', additionalsRouter)
app.use('/deal', dealRouter)
app.use('/rate', rateRouter)
app.use('/user', userRouter)
app.use('/booking', bookingRouter)
app.use('/querys', querysRouter)
app.use('/roomService', roomServiceRouter)
app.use('/repairRoom', repairRoomRouter)
app.use('/hotelSettings', hotelSettingsRouter)

app.use(errorMiddleware)

const start = () => {
	try {
		app.listen(PORT, () => console.log(`server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
