import { trpc } from '@helpers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppContext, IHotelData, TUserContext, UserContext, initialHotelData, initialUserData } from '../contexts'
import { authRouter } from './auth'
import { publicRouter } from './public'

export const RouterApp = () => {
	const router = createBrowserRouter([...publicRouter, ...authRouter])

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
