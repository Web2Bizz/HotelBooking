import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { adminRouter } from '../chains'

export const RouterApp = () => {
	const router = createBrowserRouter([...adminRouter])

	return <RouterProvider router={router}></RouterProvider>
}
