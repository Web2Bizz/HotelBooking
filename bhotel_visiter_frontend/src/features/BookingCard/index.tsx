import './style.scss'
import { Button } from 'antd'

type BookingCardProps = {
	type: string
	image: string
}

export const BookingCard: React.FC<BookingCardProps> = ({ type, image }) => {
	return (
		<div className='BookingCard-container'>
			<div className='BookingCard-img'>
				<img src={'/' + image} alt='booking-img' />
			</div>
			<div className='BookingCard-content'>
				<div className='BookingCard-text'>
					<h1>Номер Черемшан</h1>
					<p>26.04.24 - 28.04.24</p>
					<p>Двухкомнатный номер</p>
				</div>
				<div className='BookingCard-buttons'>
					{type === 'history' ? (
						<Button style={{ opacity: 0 }}>Повторить бронь</Button>
					) : (
						<Button danger>Отменить бронь</Button>
					)}
					<Button type='primary'>Детали</Button>
				</div>
			</div>
		</div>
	)
}
