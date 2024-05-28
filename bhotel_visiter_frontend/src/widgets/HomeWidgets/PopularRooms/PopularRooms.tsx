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
						<p>Надо чат гпт попросить вписать суда что-то</p>
					</div>
					<div>
						<Button onClick={onBooking} type='primary'>
							Забронировать номер
						</Button>
					</div>
				</div>
				<div className='PopularRooms-rooms'>
					<RoomCard id={''} facility={[]} image={''} />
					<RoomCard id={''} facility={[]} image={''} />
				</div>
			</div>
		</div>
	)
}

export default PopularRooms
