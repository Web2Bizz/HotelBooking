import {
	ApiPage,
	BookingPage,
	FooterPage,
	GeneralPage,
	HeaderPage,
	MainPage,
	// MenuPage,
	OptionsAddPage,
	OptionsListPage
} from '@pages'
import { AdminLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const adminRouter: RouteObject[] = [
	{
		path: '/',
		children: [
			{
				path: '',
				element: (
					<AdminLayout>
						<MainPage />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: 'gui',
		children: [
			{
				path: 'general',
				element: (
					<AdminLayout>
						<GeneralPage />
					</AdminLayout>
				)
			},
			// {
			// 	path: 'menu',
			// 	element: (
			// 		<AdminLayout>
			// 			<MenuPage />
			// 		</AdminLayout>
			// 	)
			// },
			{
				path: 'footer',
				element: (
					<AdminLayout>
						<FooterPage />
					</AdminLayout>
				)
			},
			{
				path: 'main',
				element: (
					<AdminLayout>
						<MainPage />
					</AdminLayout>
				)
			},
			{
				path: 'header',
				element: (
					<AdminLayout>
						<HeaderPage />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: 'options',
		children: [
			{
				path: '',
				element: (
					<AdminLayout>
						<OptionsListPage />
					</AdminLayout>
				)
			},
			{
				path: 'add',
				element: (
					<AdminLayout>
						<OptionsAddPage />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: 'booking',
		element: (
			<AdminLayout>
				<BookingPage />
			</AdminLayout>
		)
	},
	{
		path: 'system',
		children: [
			{
				path: 'api',
				element: (
					<AdminLayout>
						<ApiPage />
					</AdminLayout>
				)
			}
		]
	}
]
