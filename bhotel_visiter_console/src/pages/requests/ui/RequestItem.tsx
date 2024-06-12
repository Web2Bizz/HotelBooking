import { Button } from 'primereact/button'
import './style.css'

export const RequestItem = () => {
	return (
		<div className='request__list_item'>
			<span className='request__list_item-theme'>test</span>
			<span className='request__list_item-date'>07.03.2024</span>
			<div className='flex flex-row gap-3'>
				<Button outlined severity='secondary' label='Перейти' />
				<Button outlined severity='success' label='Отметить как решённое' />
			</div>
		</div>
	)
}
