import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5501
	},
	preview: {
		host: '0.0.0.0',
		port: 5501
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@features': path.resolve(__dirname, './src/features'),
			'@ui': path.resolve(__dirname, './src/shared/ui'),
			'@helpers': path.resolve(__dirname, './src/helpers'),
			'@contexts': path.resolve(__dirname, './src/app/contexts'),
			'@types': path.resolve(__dirname, './src/shared/types'),
		}
	},
	plugins: [react()]
	// base: './'
})
