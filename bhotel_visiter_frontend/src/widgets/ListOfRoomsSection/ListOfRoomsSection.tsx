import { useEffect, useState } from 'react'
import { ListOfRoomsFilter, RoomCard } from '../../features'
import { RadioChangeEvent, Collapse, Pagination, Button } from 'antd'
import './style.scss'

const ListOfRoomsSection = () => {
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

	const images = [
		'/d1.jpg',
		'/d2.jpg',
		'/d3.jpg',
		'/d4.jpg',
		'/d5.jpg',
		'/d6.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg',
		'/d1.jpg'
	]

	const handlePriceChange = (value: number[]) => {
		console.log('Selected Price:', value)
	}

	const handleRoomTypeChange = (e: RadioChangeEvent) => {
		console.log('Selected Room Type:', e.target.value)
	}

	const handleGuestsChange = (value: number | null) => {
		if (value !== null) {
			console.log('Selected Number of Guests:', value)
		}
	}

	const handleAmenitiesChange = (checkedValues: string[]) => {
		console.log('Selected Amenities:', checkedValues)
	}

	const handleFloorChange = (checkedValues: string[]) => {
		console.log('Selected Floors:', checkedValues)
	}

	const floorOptions = Array.from({ length: 4 }, (v, k) => ({
		label: `Этаж ${k + 1}`,
		value: (k + 1).toString()
	}))

	const onBooking = () => {
		console.log('booking')
		fetch(`${import.meta.env.VITE_APP_ADMIN_API}/v2/filter`, { method: 'POST' })
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
			})
	}

	const ComponentToRender = (props: {
		id: string
		facility: Array<string>
		image: string
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

	const [currentPage, setCurrentPage] = useState(1)
	const avalibleItems =
		Array.isArray(rooms) && rooms.filter((o) => o.status === 'Доступно')
	const totalComponents = avalibleItems.length
	const onPageChange = (page: number) => {
		setCurrentPage(page)
	}

	// Вычисляем диапазон компонентов для текущей страницы
	const maxDisplayItemsPerPage = 6 // Максимум 6 компонентов на странице
	const currentComponents =
		Array.isArray(avalibleItems) &&
		avalibleItems
			.slice(
				(currentPage - 1) * maxDisplayItemsPerPage,
				currentPage * maxDisplayItemsPerPage
			)
			.map((item, index) => (
				<ComponentToRender
					image={images[index]}
					id={item.id_room}
					price={item.price}
					facility={item.facility}
					key={index}
				/>
			))

	const collapseItems = [
		{
			key: '1',
			label: 'Цена',
			children: (
				<ListOfRoomsFilter
					type='price'
					range={true}
					min={1000}
					max={40000}
					defaultValue={[100, 500]}
					onAfterChange={handlePriceChange}
				/>
			)
		},
		{
			key: '2',
			label: 'Тип комнаты',
			children: (
				<ListOfRoomsFilter
					type='roomType'
					options={[
						{ label: 'Одноместный', value: 'single' },
						{ label: 'Двухместный', value: 'double' },
						{ label: 'Люкс', value: 'suite' }
					]}
					onChange={handleRoomTypeChange}
				/>
			)
		},
		{
			key: '3',
			label: 'Количество гостей',
			children: (
				<ListOfRoomsFilter
					type='guests'
					min={1}
					max={10}
					defaultValue={2}
					onChange={handleGuestsChange}
				/>
			)
		},
		{
			key: '4',
			label: 'Удобства',
			children: (
				<ListOfRoomsFilter
					type='amenities'
					options={fa}
					onChange={handleAmenitiesChange}
				/>
			)
		},
		{
			key: '5',
			label: 'Этаж',
			children: (
				<ListOfRoomsFilter
					type='floor'
					options={floorOptions}
					defaultValue={['floor_1']}
					onChange={handleFloorChange}
				/>
			)
		}
	]

	return (
		<div className='ListOfRoomsSection-container'>
			<div className='ListOfRoomsSection-collapse'>
				<Collapse
					items={collapseItems}
					defaultActiveKey={['1', '2', '3', '4']}
				/>
				<Button
					onClick={() => {
						onBooking()
						setIsFiltered((prev) => !prev)
					}}
					type='primary'
				>
					{!isFiltered ? 'Фильтровать' : 'Сбросить фильтр'}
				</Button>
			</div>
			<div className='ListOfRoomsSection-rooms-container'>
				<div className='ListOfRoomsSection-rooms'>{currentComponents}</div>
				<div className='ListOfRoomsSection-pagination'>
					<Pagination
						current={currentPage}
						onChange={onPageChange}
						total={totalComponents}
						pageSize={maxDisplayItemsPerPage}
						showSizeChanger={false}
					/>
				</div>
			</div>
		</div>
	)
}

export default ListOfRoomsSection
