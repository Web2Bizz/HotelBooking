import { useState } from 'react'
import { ListOfRoomsFilter, RoomCard } from '../../features'
import { RadioChangeEvent, Collapse, Pagination, Button } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import './style.scss'

const ListOfRoomsSection = () => {
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

	const handleAmenitiesChange = (checkedValues: CheckboxValueType[]) => {
		console.log('Selected Amenities:', checkedValues)
	}

	const handleFloorChange = (checkedValues: CheckboxValueType[]) => {
		console.log('Selected Floors:', checkedValues)
	}

	const floorOptions = Array.from({ length: 5 }, (v, k) => ({
		label: `Этаж ${k + 1}`,
		value: `floor_${k + 1}`
	}))

	const onBooking = () => {
		console.log('booking')
	}

	const ComponentToRender = () => {
		return (
			<div className='ListOfRoomsSection-rooms-item'>
				<RoomCard />
			</div>
		)
	}

	const [currentPage, setCurrentPage] = useState(1)
	const totalComponents = 7
	const onPageChange = (page: number) => {
		setCurrentPage(page)
	}

	// Вычисляем диапазон компонентов для текущей страницы
	const pageSize = 6 // Максимум 6 компонентов на странице
	const currentComponents = [...Array(totalComponents)]
		.slice((currentPage - 1) * pageSize, currentPage * pageSize)
		.map((_, index) => <ComponentToRender key={index} />)

	const collapseItems = [
		{
			key: '1',
			label: 'Цена',
			children: (
				<ListOfRoomsFilter
					type='price'
					range={true}
					min={0}
					max={1000}
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
			children: <ListOfRoomsFilter type='guests' min={1} max={10} defaultValue={2} onChange={handleGuestsChange} />
		},
		{
			key: '4',
			label: 'Удобства',
			children: (
				<ListOfRoomsFilter
					type='amenities'
					options={[
						{ label: 'Кондиционер', value: 'ac' },
						{ label: 'Ванна', value: 'bath' },
						{ label: 'Туалет', value: 'toilet' },
						{ label: 'Фен', value: 'hairdryer' }
					]}
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
				<Collapse items={collapseItems} defaultActiveKey={['1', '2', '3', '4']} />
				<Button onClick={onBooking} type='primary'>
					Забронировать номер
				</Button>
			</div>
			<div className='ListOfRoomsSection-rooms-container'>
				<div className='ListOfRoomsSection-rooms'>{currentComponents}</div>
				<div className='ListOfRoomsSection-pagination'>
					<Pagination
						current={currentPage}
						onChange={onPageChange}
						total={totalComponents}
						pageSize={pageSize}
						showSizeChanger={false}
					/>
				</div>
			</div>
		</div>
	)
}

export default ListOfRoomsSection