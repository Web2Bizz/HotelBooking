import { Button } from 'antd'
import { Header, RoomInfo, RoomReviews, RoomsImg, SimilarRooms } from '../../widgets'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const images = [
	'http://localhost:5170/url1.jpg',
	'http://localhost:5170/d1.jpg',
	'http://localhost:5170/d2.jpg',
	'http://localhost:5170/d3.jpg',
	'http://localhost:5170/url1.jpg',
	'http://localhost:5170/url1.jpg'
]

const RoomPreview = () => {
	const navigate = useNavigate()

	const onBack = () => {
		navigate('/')
	}

	return (
		<>
			<Header />
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
