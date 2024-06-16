import { Button, Rate } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PeculiaritiesRooms } from '../../../features'
import './style.scss'

type TRoomInfo = {
	facility: Array<string>
	id_room: string
	room_type: string
	status: string
	room_number: number
	room_floor: number
}

const RoomInfo = () => {
	const [roomInfo, setRoomInfo] = useState<TRoomInfo>()
	const navigate = useNavigate()
	const { id } = useParams()

	const onBooking = () => {
		console.log('booking')
		navigate(`/booking/${id}`)
	}

	useEffect(() => {
		fetch(`${import.meta.env.VITE_APP_ADMIN_API}/room/getRoom/${id}`)
			.then((response) => response.json())
			.then((response) => {
				setRoomInfo(response[0])
			})

		console.log(roomInfo)
	}, [id])

	return (
		roomInfo && (
			<div className='RoomInfo-container'>
				<div>
					{/* можно убрать название города + иконку поменять на геолокацию */}
					<div className='RoomInfo-city'>
						<div></div>
						<p>Димитровград</p>
					</div>
					<div className='RoomInfo-name'>
						<h1>Номер - {roomInfo?.room_number}</h1>
						<p>Двухкомнатный номер</p>
					</div>
					<div className='RoomInfo-rate'>
						<Rate value={5} disabled={true} />
						<span className='RoomInfo-rate-span'>(12 отзывов)</span>
					</div>
					<div>
						<PeculiaritiesRooms items={roomInfo?.facility} />
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
					<p>* Выбор даты доступен на этапе бронирования</p>
				</div>
			</div>
		)
	)
}

export default RoomInfo
