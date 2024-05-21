import { Booking, Profile, ThanksPage, Settings, Payment } from '@pages'
import { RouteObject } from 'react-router-dom'

export const authRouter: RouteObject[] = [
	{
		path: '/profile',
		element: <Profile />
	},
	{
		path: '/room',
		children: [
			{
				path: ':id/booking',
				element: <Booking />
			}
		]
	},
	{
		path: '/thank',
		element: <ThanksPage />
	},
	{
		path: '/profile',
		element: <Profile />
	},
	{
		path: '/settings',
		element: <Settings />
	},
	{
		path: '/payments',
		element: <Payment />
	}
]
