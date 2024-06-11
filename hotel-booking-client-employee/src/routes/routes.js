import { createBrowserRouter } from 'react-router-dom'
import LayoutApp from '../Layout/Layout'
import { DealPage, RegistrationHotel, RepairRoom, RoomPage, RoomService, SettingsHotel, Users } from '../Pages'
import FrontdeskPage from '../Pages/Frontdesk/FrontdeskPage'
import GuestPage from '../Pages/Guest/GuestPage'
import LoginPage from '../Pages/Login/LoginPage'
import OverviewPage from '../Pages/Overview/OverviewPage'
import RatePage from '../Pages/Rate/RatePage.jsx'
import RegistrationPage from './../Pages/Registration/RegistrationPage'
// import AllEmployee from '../Pages/Employee/AllEmployee'
// import TaskEmployee from '../Pages/Employee/TaskEmployee/TaskEmployee'
// import SсheduleEmployee from '../Pages/Employee/SсheduleEmployee'
import Services from '../Pages/Services/Services'
import StatisticAndReports from '../Pages/StatisticAndReports/StatisticAndReports'

export const routes = createBrowserRouter(
	[
		{
			path: '/',
			children: [
				{
					path: '',
					element: <LoginPage />
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
