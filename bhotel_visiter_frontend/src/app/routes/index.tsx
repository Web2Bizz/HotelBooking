import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { publicRouter } from './public'
import { authRouter } from './auth'
import { useEffect, useState } from 'react'
import { trpc } from '@helpers'
import { initialUserData, TUserContext, UserContext, AppContext, IHotelData, initialHotelData } from '../contexts'

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

	const [userData, setUserData] = useState<TUserContext>(initialUserData)
	const [appData, setAppData] = useState<IHotelData>(initialHotelData)

	useEffect(() => {
		fetch('http://87.242.117.193:9090/api/hotelSettings/getHotelProperties', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((result) => setAppData(result))
			.catch((error) => console.error(error))
	}, [])

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<AppContext.Provider value={appData}>
					<UserContext.Provider value={userData}>
						<RouterProvider router={router}></RouterProvider>
					</UserContext.Provider>
				</AppContext.Provider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
