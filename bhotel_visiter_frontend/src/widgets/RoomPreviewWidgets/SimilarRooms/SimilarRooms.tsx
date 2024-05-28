import { RoomCard } from '../../../features'
import './style.scss'

const SimilarRooms = () => {
	const currentComponents = [...Array(4)].map((_, index) => (
		<div className='SimilarRooms-rooms-item'>
			<RoomCard facility={[]} id={index.toString()} key={index} image={''} />
		</div>
	))

	return (
		<div className='SimilarRooms-container'>
			<h1>Похожие отели</h1>
			<div className='SimilarRooms-rooms'>{currentComponents}</div>
		</div>
	)
}

export default SimilarRooms
