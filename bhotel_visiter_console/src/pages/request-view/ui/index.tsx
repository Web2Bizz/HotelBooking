import { AdminPageTitle } from '@widgets'
import { Chat } from './Chat'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

export const RequestViewPage = () => {

	const navigate = useNavigate()
	
	return (
		<>
			<AdminPageTitle title={'Обращение №XXX'} />
			<Button outlined label='К списку обращений' onClick={() => navigate('/requests')}/>
			<Chat />
		</>
	)
}
