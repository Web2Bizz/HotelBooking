import { AdminPageTitle } from '@widgets'
import { Chat } from './Chat'
import { Button } from 'primereact/button'

export const RequestViewPage = () => {
	return (
		<>
			<AdminPageTitle title={'Обращение №XXX'} />
			<Button outlined label='К списку обращений'/>
			<Chat />
		</>
	)
}
