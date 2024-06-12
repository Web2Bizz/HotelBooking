import {
	ApiPage,
	BookingPage,
	FooterPage,
	GeneralPage,
	HeaderPage,
	MainPage,
	OptionsAddPage,
	OptionsListPage,
	RequestsPage,
	RequestViewPage
} from '@pages'
import { AdminLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const adminRouter: RouteObject[] = [
	{
		path: '/',
		element: <AdminLayout />,
		children: [
			{
				path: '',
				element: <MainPage />
			},
			{
				path: 'requests',
				element: <RequestsPage />
			},
			{
				path: 'request',
				children: [
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
