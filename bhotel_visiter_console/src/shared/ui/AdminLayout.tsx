import { Outlet } from 'react-router-dom'
import { SideBar } from '../../widgets'

export const AdminLayout = () => {
	return (
		<div className='grid'>
			<div className='col-2 p-0'>
				<SideBar />
			</div>
			<div className='col-10 p-0 pl-4'>
				<Outlet />
			</div>
		</div>
	)
}
