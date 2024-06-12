import { AdminPageTitle } from '@widgets'
import { RequestList } from './RequestList'
import './style.css'

export const RequestsPage = () => {
	return (
		<>
			<AdminPageTitle title={'Обращения'} />
			<RequestList />
		</>
	)
}
