import {
	ApiPage,
	BookingPage,
	DeniedPage,
	FooterPage,
	GeneralPage,
	HeaderPage,
	LoginPage,
	MainPage,
	OptionsAddPage,
	OptionsListPage,
	RequestsPage,
	RequestViewPage
} from '@pages'
import { AdminLayout, AuthenticatedLayout, UnauthenticatedLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const adminRouter: RouteObject[] = [
	{
		path: 'login',
		element: (
			<UnauthenticatedLayout>
				<LoginPage />
			</UnauthenticatedLayout>
		)
	},
	{
		path: 'denied',
		element: <DeniedPage />
	},
	{
		path: '/',
		element: (
			<AuthenticatedLayout>
				<AdminLayout />
			</AuthenticatedLayout>
		),
		children: [
			{
				path: '',
				element: <MainPage />
			},
			{
				path: 'requests',
				children: [
					{
						path: '',
						element: <RequestsPage />
					},
					{
						path: ':id',
						element: <RequestViewPage />
					}
				]
			},
			{
				path: 'gui',
				children: [
					{
						path: 'general',
						element: <GeneralPage />
					},
					{
						path: 'footer',
						element: <FooterPage />
					},
					{
						path: 'main',
						element: <MainPage />
					},
					{
						path: 'header',
						element: <HeaderPage />
					}
				]
			},
			{
				path: 'options',
				children: [
					{
						path: '',
						element: <OptionsListPage />
					},
					{
						path: 'add',
						element: <OptionsAddPage />
					}
				]
			},
			{
				path: 'booking',
				element: <BookingPage />
			},
			{
				path: 'system',
				children: [
					{
						path: 'api',
						element: <ApiPage />
					}
				]
			}
		]
	}
]
