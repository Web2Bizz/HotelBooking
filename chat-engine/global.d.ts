export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			SKT_PG_DATABASE: string
			SKT_PG_ADDRESS: string
			SKT_PG_PORT: number
			SKT_PG_USER: string
			SKT_PG_PASSWORD: string
		}
	}
}
