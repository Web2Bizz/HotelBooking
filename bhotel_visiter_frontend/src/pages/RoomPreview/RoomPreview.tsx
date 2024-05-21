import { Button } from 'antd'
import { RoomInfo, RoomReviews, RoomsImg, SimilarRooms } from '../../widgets'
import './style.scss'

const images = ['url.jpg', 'url.jpg', 'url.jpg', 'url.jpg', 'url.jpg', 'url.jpg']

const RoomPreview = () => {
	const onBack = () => {
		console.log('back')
	}

	return (
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
	)
}

export default RoomPreview
