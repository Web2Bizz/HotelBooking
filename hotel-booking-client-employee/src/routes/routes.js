import { createBrowserRouter } from 'react-router-dom'
import OverviewPage from '../Pages/Overview/OverviewPage'
import FrontdeskPage from '../Pages/Frontdesk/FrontdeskPage'
import GuestPage from '../Pages/Guest/GuestPage'
import { DealPage, RoomPage, RoomService, RepairRoom, RegistrationHotel, SettingsHotel, Users } from '../Pages'
import RatePage from '../Pages/Rate/RatePage.jsx'
import LoginPage from '../Pages/Login/LoginPage'
import RegistrationPage from './../Pages/Registration/RegistrationPage'
import HomePage from './../Pages/Home/HomePage'
import LayoutApp from '../Layout/Layout'
// import AllEmployee from '../Pages/Employee/AllEmployee'
// import TaskEmployee from '../Pages/Employee/TaskEmployee/TaskEmployee'
// import SсheduleEmployee from '../Pages/Employee/SсheduleEmployee'
import StatisticAndReports from '../Pages/StatisticAndReports/StatisticAndReports'
import Services from '../Pages/Services/Services'

export const routes = createBrowserRouter(
	[
		{
			path: '/',
			children: [
				{
					path: '',
					element: <HomePage />
				},
				{
					path: 'overview',
					element: (
						<LayoutApp>
							<OverviewPage />
						</LayoutApp>
					)
				},
				{
					path: 'frontdesk',
					element: (
						<LayoutApp>
							<FrontdeskPage />
						</LayoutApp>
					)
				},
				{
					path: 'guest',
					element: (
						<LayoutApp>
							<GuestPage />
						</LayoutApp>
					)
				},
				{
					path: 'allRoom',
					element: (
						<LayoutApp>
							<RoomPage />
						</LayoutApp>
					)
				},
				{
					path: 'ServiceRoom',
					element: (
						<LayoutApp>
							<RoomService />
						</LayoutApp>
					)
				},
				{
					path: 'repairRoom',
					element: (
						<LayoutApp>
							<RepairRoom />
						</LayoutApp>
					)
				},
				{
					path: 'deal',
					element: (
						<LayoutApp>
							<DealPage />
						</LayoutApp>
					)
				},
				{
					path: 'rate',
					element: (
						<LayoutApp>
							<RatePage />
						</LayoutApp>
					)
				},
				{
					path: 'statisticAndReports',
					element: (
						<LayoutApp>
							<StatisticAndReports />
						</LayoutApp>
					)
				},
				{
					path: 'services',
					element: (
						<LayoutApp>
							<Services />
						</LayoutApp>
					)
				},
				{
					path: 'setting-hotel',
					element: (
						<LayoutApp>
							<SettingsHotel />
						</LayoutApp>
					)
				},
				{
					path: 'users',
					element: (
						<LayoutApp>
							<Users />
						</LayoutApp>
					)
				},
				{
					path: 'login',
					element: <LoginPage />
				},
				{
					path: 'registration',
					element: <RegistrationPage />
				}
			]
		},
		{
			path: '/registration-hotel',
			element: <RegistrationHotel />
		}
	],
	{ basename: '/admin' }
)
