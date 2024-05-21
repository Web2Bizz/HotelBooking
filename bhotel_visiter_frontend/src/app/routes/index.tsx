import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { publicRouter } from './public'
import { authRouter } from './auth'
import { useState } from 'react'
import { trpc } from '@helpers'

export const RouterApp = () => {
	const router = createBrowserRouter([...publicRouter, ...authRouter])

	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://127.0.0.1:8556/trpc'
				})
			]
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}