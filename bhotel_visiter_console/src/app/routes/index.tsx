import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { AppRouter } from 'trpc-package'
import { adminRouter } from '../chains'
import {
	initialUserData,
	TUserContext,
	UserContext
} from '../contexts/userContext'

const trpc = createTRPCReact<AppRouter>()

export const RouterApp = () => {
	const router = createBrowserRouter([...adminRouter], { basename: '/console' })

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

	const [userData, setUserData] = useLocalStorage<TUserContext>('userInfo', initialUserData)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
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
							userData?.id_user !== null &&
							userData?.id_user !== undefined &&
							userData?.id_user.length > 0,
						setUserData: setUserData
					}}
				>
					<RouterProvider router={router}></RouterProvider>
				</UserContext.Provider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
