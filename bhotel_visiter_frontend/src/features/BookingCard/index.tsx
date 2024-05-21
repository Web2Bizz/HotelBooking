import './style.scss'
import { Button } from 'antd'

type BookingCardProps = {
	type: string
}

export const BookingCard: React.FC<BookingCardProps> = ({ type }) => {
	return (
		<div className='BookingCard-container'>
			<div className='BookingCard-img'>
				<img src='' alt='booking-img' />
			</div>
			<div className='BookingCard-content'>
				<div className='BookingCard-text'>
					<h1>Отель Черемшан</h1>
					<p>26.04.24 - 28.04.24</p>
					<p>Двухкомнатный номер</p>
				</div>
				<div className='BookingCard-buttons'>
					{type === 'history' ? <Button>Повторить бронь</Button> : <Button>Отменить бронь</Button>}
					<Button type='primary'>Детали</Button>
				</div>
			</div>
		</div>
	)
}
