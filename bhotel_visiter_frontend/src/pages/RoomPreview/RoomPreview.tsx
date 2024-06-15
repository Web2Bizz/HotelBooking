import { Button } from 'antd'
import { Header, RoomInfo, RoomReviews, RoomsImg, SimilarRooms } from '../../widgets'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const images = [
	'/url1.jpg',
	'/d1.jpg',
	'/d2.jpg',
	'/d3.jpg',
	'/url1.jpg',
	'/url1.jpg'
]

const RoomPreview = () => {
	const navigate = useNavigate()

	const onBack = () => {
		navigate('/')
	}

	return (
		<>
			<div
				style={{
					margin: '30px 250px 100px 250px',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<div className='RoomPreview-button'>
					<Button onClick={onBack}>{'<< К списку номеров'}</Button>
				</div>
				<div className='RoomPreview-room'>
					<RoomsImg images={images} />
					<RoomInfo />
				</div>
				<RoomReviews />
				<SimilarRooms />
			</div>
		</>
	)
}

export default RoomPreview
