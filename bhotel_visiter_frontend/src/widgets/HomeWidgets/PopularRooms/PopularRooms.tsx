import { Button } from 'antd'
import { RoomCard } from '../../../features'
import './style.scss'

const PopularRooms = () => {
	const onBooking = () => {
		console.log('booking')
	}

	return (
		<div className='PopularRooms-wrapper'>
			<div className='PopularRooms-container'>
				<div className='PopularRooms-info'>
					<div>
						<h1>Сейчас популярно</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
					</div>
					<div>
						<Button onClick={onBooking} type='primary'>
							Забронировать номер
						</Button>
					</div>
				</div>
				<div className='PopularRooms-rooms'>
					<RoomCard />
					<RoomCard />
				</div>
			</div>
		</div>
	)
}

export default PopularRooms
