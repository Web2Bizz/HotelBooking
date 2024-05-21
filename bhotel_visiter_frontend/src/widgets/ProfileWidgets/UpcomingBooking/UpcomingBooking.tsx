import './style.scss'
import { BookingCard } from '../../../features'

const UpcomingBooking = () => {
	return (
		<div>
			<div className='UpcomingBooking-title' style={{ marginTop: 0 }}>
				<p>Ближайшая бронь</p>
			</div>
			<BookingCard type={'upcoming'} />
		</div>
	)
}

export default UpcomingBooking
