import { trpc } from '@helpers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
	AppContext,
	IHotelData,
	TUserContext,
	UserContext,
	initialHotelData,
	initialUserData
} from '../contexts'
import { authRouter } from './auth'
import { publicRouter } from './public'

export const RouterApp = () => {
	const router = createBrowserRouter([...publicRouter, ...authRouter], { basename: '/client' })

	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${import.meta.env.VITE_APP_TRPC_API}`
				})
			]
		})
	)

	const [userData, setUserData] = useState<TUserContext>(initialUserData)
	const [appData, setAppData] = useState<IHotelData>(initialHotelData)

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem('userInfo')))
		fetch('http://87.242.117.193:9090/api/hotelSettings/getHotelProperties', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((result) => setAppData(result))
			.catch((error) => console.error(error))

		console.log(userData?.birthday);
		
	}, [])

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<AppContext.Provider value={appData}>
					<UserContext.Provider
						value={{
							id_user: userData?.id_user,
							name: userData?.name,
							surname: userData?.surname,
							father_name: userData?.father_name,
							email: userData?.email,
							role: userData?.role,
							birthday: '',
							phone: userData?.phone,
							isLoggined:
								userData?.id_user !== null && userData?.id_user !== undefined,
							setUserData: setUserData
						}}
					>
						<RouterProvider router={router}></RouterProvider>
					</UserContext.Provider>
				</AppContext.Provider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
