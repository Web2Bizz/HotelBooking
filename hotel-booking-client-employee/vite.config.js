import react from '@vitejs/plugin-react'
import { defineConfig, transformWithEsbuild } from 'vite'

export default defineConfig({
	base: '/',
	server: {
		host: '0.0.0.0',
		port: 5002
	},
	plugins: [
		react(),
		{
			name: 'load+transform-js-files-as-jsx',
			async transform(code, id) {
				if (!id.match(/src\/.*\.js$/)) {
					return null
				}

				return transformWithEsbuild(code, id, {
					loader: 'jsx',
					jsx: 'automatic'
				})
			}
		}
	],

	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	}
})
