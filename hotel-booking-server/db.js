import * as dotenv from 'dotenv'
import pg from 'pg'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const USERNAME = process.env.POSTGRES_USER
const PASSWORD = process.env.POSTGRES_PASSWORD
const HOST = process.env.POSTGRES_HOST
const PORT = process.env.POSTGRES_PORT
const DATABASE = process.env.POSTGRES_DB

if (!USERNAME) throw Error(`env variable is empty: USERNAME`)

if (!PASSWORD) throw Error(`env variable is empty: PASSWORD`)

if (!HOST) throw Error(`env variable is empty: HOST`)

if (!PORT) throw Error(`env variable is empty: PORT`)

if (!DATABASE) throw Error(`env variable is empty: DATABASE`)

const conStringPri = `postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
const Client = pg.Client
const client = new Client({ connectionString: conStringPri })

client.connect()

export default client
