import {
	Booking,
	Profile,
	ThanksPage,
	Settings,
	Payment,
	NotificationsPage
} from '@pages'
import { DefaultLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const authRouter: RouteObject[] = [
	{
		path: '/profile',
		element: (
			<DefaultLayout>
				<div style={{ paddingTop: 10 }}>
					<Profile />
				</div>
			</DefaultLayout>
		)
	},
	{
		path: '/room',
		children: [
			{
				path: ':id/booking',
				element: (
					<DefaultLayout>
						<div style={{ paddingTop: 10 }}>
							<Booking />
						</div>
					</DefaultLayout>
				)
			}
		]
	},
	{
		path: '/thank',
		element: <ThanksPage />
	},
	{
		path: '/settings',
		element: (
			<DefaultLayout>
				<div style={{ paddingTop: 10 }}>
					<Settings />
				</div>
			</DefaultLayout>
		)
	},
	{
		path: '/payments',
		element: (
			<DefaultLayout>
				<div style={{ paddingTop: 10 }}>
					<Payment />
				</div>
			</DefaultLayout>
		)
	},
	{
		path: '/notifications',
		element: (
			<DefaultLayout>
				<NotificationsPage />
			</DefaultLayout>
		)
	},
	{
		path: '/booking',
		element: (
			<DefaultLayout>
				<Booking />
			</DefaultLayout>
		)
	}
]
