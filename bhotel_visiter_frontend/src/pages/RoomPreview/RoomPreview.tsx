import { Button } from 'antd'
import {
	Header,
	RoomInfo,
	RoomReviews,
	RoomsImg,
	SimilarRooms
} from '../../widgets'
import './style.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const RoomPreview = () => {
	const navigate = useNavigate()

	const onBack = () => {
		navigate('/')
	}

	const [images, setImages] = useState<Array<string>>([])

	const { id } = useParams()

	useEffect(() => {
		fetch(`http://87.242.117.193:7887/images/${id}`)
			.then((response) => response.json())
			.then((response) => {
				setImages(response.image_list)
				console.log(response.image_list)
			})
	}, [])

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
					{images && <RoomsImg images={images} />}
					<RoomInfo />
				</div>
				{false && <RoomReviews />}
				<SimilarRooms />
			</div>
		</>
	)
}

export default RoomPreview
