import './style.scss'
import { BookingCard } from '../../../features'

const HistoryBooking = () => {
	return (
		<div>
			<div className='UpcomingBooking-title'>
				<p>История бронирований</p>
			</div>
			<div className='UpcomingBooking-list'>
				<BookingCard image='d1.jpg' type={'history'} />
				<BookingCard image='d2.jpg' type={'history'} />
				<BookingCard image='d3.jpg' type={'history'} />
			</div>
		</div>
	)
}

export default HistoryBooking
