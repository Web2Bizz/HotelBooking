import { Home, Catalog, Login, RegistrationPage } from '@pages'
import { RouteObject } from 'react-router-dom'
import { roomRouter } from './room'

export const publicRouter: RouteObject[] = [
	{
		path: '/',
		children: [
			{
				path: '',
				element: <Home />
			},
			{
				path: 'catalog',
				element: <Catalog />
			},
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'registration',
				element: <RegistrationPage/>
			},
			...roomRouter
		]
	}
]
