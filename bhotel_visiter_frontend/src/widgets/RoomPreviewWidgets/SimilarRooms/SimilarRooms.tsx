import { useEffect, useState } from 'react'
import { RoomCard } from '../../../features'
import './style.scss'

const SimilarRooms = () => {
	const [rooms, setRooms] = useState<Array<any>>()
	const [isFiltered, setIsFiltered] = useState<boolean>(false)
	const [fa, setFa] = useState<Array<any>>([])

	useEffect(() => {
		fetch('http://87.242.117.193:9090/api/room/getRoom')
			.then((response) => response.json())
			.then((result) => setRooms(result))
			.catch((error) => console.error(error))

		fetch('http://87.242.117.193:9090/api/additionals/getFacility')
			.then((response) => response.json())
			.then((response) =>
				setFa(response.map((i) => ({ label: i.facility, value: i.facility })))
			)
			.catch((error) => console.error(error))
	}, [])

	const ComponentToRender = (props: {
		id: string
		facility: Array<string>
		price: number
	}) => {
		const [image, setImage] = useState<string>()

		useEffect(() => {
			fetch(`http://87.242.117.193:7887/images/${props.id}`)
				.then((response) => response.json())
				.then((response) => {
					setImage(response.cover)
					console.log(response.cover)
				})
		}, [])

		return (
			<div className='ListOfRoomsSection-rooms-item'>
				<RoomCard
					price={props.price}
					image={image}
					id={props.id}
					facility={props.facility}
				/>
			</div>
		)
	}

	const currentComponents = rooms
		.splice(0, 4)
		.map((item, index) => (
			<ComponentToRender
				id={item.id_room}
				price={item.price}
				facility={item.facility}
				key={index}
			/>
		))

	return (
		<div className='SimilarRooms-container'>
			<h1>Похожие отели</h1>
			<div className='SimilarRooms-rooms'>{currentComponents}</div>
		</div>
	)
}

export default SimilarRooms
