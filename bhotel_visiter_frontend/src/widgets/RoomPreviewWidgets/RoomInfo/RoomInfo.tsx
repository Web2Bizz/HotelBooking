import { Rate, Button } from 'antd'
import { PeculiaritiesRooms } from '../../../features'
import './style.scss'



const RoomInfo = () => {
	type ListItem = {
		id: number
		content: string
	}

	const data: ListItem[] = [
		{ id: 1, content: 'Вайфай' },
		{ id: 2, content: 'Туалет' },
		{ id: 3, content: 'Холодильник' }
	]

	const onBooking = () => {
		console.log('booking')
	}

	return (
		<div className='RoomInfo-container'>
			<div>
				{/* можно убрать название города + иконку поменять на геолокацию */}
				<div className='RoomInfo-city'>
					<div></div>
					<p>Димитровград</p>
				</div>
				<div className='RoomInfo-name'>
					<h1>Номер - 32</h1>
					<p>Двухкомнатный номер</p>
				</div>
				<div className='RoomInfo-rate'>
					<Rate value={5} disabled={true} />
					<span className='RoomInfo-rate-span'>(12 отзывов)</span>
				</div>
				<div>
					<PeculiaritiesRooms items={data} />
				</div>
			</div>
			<div className='RoomInfo-button'>
				<p>
					<span>36$</span> / ночь
				</p>
				<div>
					<Button onClick={onBooking} type='primary'>
						Забронировать номер
					</Button>
				</div>
				<p>* Выбор даты и привилегий доступен на этапе бронирования</p>
			</div>
		</div>
	)
}

export default RoomInfo
