import { Rate, Button } from 'antd'
import { PeculiaritiesRooms } from '../../../features'
import './style.scss'

const RoomInfo = () => {
	type ListItem = {
		id: number
		content: string
	}

	const data: ListItem[] = [
		{ id: 1, content: 'Пункт 1' },
		{ id: 2, content: 'Пункт 2' }
	]

	const onBooking = () => {
		console.log('booking')
	}

	return (
		<div className='RoomInfo-container'>
			<div>
				<div className='RoomInfo-city'>
					<div></div>
					<p>Димитровград</p>
				</div>
				<div className='RoomInfo-name'>
					<h1>Отель Черемшан</h1>
					<p>Двухкомнатный номер</p>
				</div>
				<div className='RoomInfo-rate'>
					<Rate disabled={true} />
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
