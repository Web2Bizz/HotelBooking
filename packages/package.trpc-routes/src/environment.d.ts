declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ADMIN_API_HOST: string;
			APP_PORT: number
			PG_ADDRESS: string
			PG_PORT: number
			PG_DATABASE: string
			PG_USER: string
			PG_PASSWORD: string
			PG_CONNECTION_STRING: string
		}
	}
}

export {}
