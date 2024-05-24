import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { adminRouter } from '../chains'
import { trpc } from '@helpers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'

export const RouterApp = () => {
	const router = createBrowserRouter([...adminRouter], { basename: '/console' })

	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://192.168.0.105:8556/trpc'
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
