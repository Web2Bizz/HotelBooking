import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

export const ChatForm = () => {
	return (
		<div className='chat-form'>
			<div className='grid w-full'>
				<div className='col-11'>
					<InputText className='w-full' placeholder='Введите сообщение' />
				</div>
				<div className='col-1'>
					<Button className='w-full' icon={'pi pi-send'} />
				</div>
			</div>
		</div>
	)
}
