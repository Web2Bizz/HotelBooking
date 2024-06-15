/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_ADMIN_API: string
	readonly VITE_APP_TRPC_API: string
	readonly VITE_APP_SOCKET_DOMAIN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
