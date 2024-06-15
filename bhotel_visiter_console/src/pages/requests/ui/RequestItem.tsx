import { Button } from 'primereact/button'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { TRequestItem } from '@types'

export const RequestItem = (props: TRequestItem) => {
	const { id, date, status, title } = props

	const isResolved = status === 'RESOLVED'

	const navigate = useNavigate()

	return (
		<div className='request__list_item'>
			<span className='request__list_item-theme'>{title}</span>
			<span className='request__list_item-date'>
				{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
			</span>
			<div className='flex flex-row gap-3'>
				{isResolved ? (
					<>
						<Button outlined severity='secondary' onClick={() => navigate(`${id}`)} label='Перейти' />
						<Button outlined severity='success' label='Отметить как решённое' />
					</>
				) : (
					'Вопрос решён'
				)}
			</div>
		</div>
	)
}
