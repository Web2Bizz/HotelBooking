import './style.scss'
import { BookingCard } from '../../../features'

const HistoryBooking = () => {
	return (
		<div>
			<div className='UpcomingBooking-title'>
				<p>История бронирований</p>
			</div>
			<div className='UpcomingBooking-list'>
				<BookingCard type={'history'} />
				<BookingCard type={'history'} />
				<BookingCard type={'history'} />
			</div>
		</div>
	)
}

export default HistoryBooking
