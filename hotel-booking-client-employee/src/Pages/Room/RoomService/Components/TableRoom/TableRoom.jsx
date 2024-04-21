import { Dropdown, Space, Table, Button, Tag, Input, Checkbox } from 'antd'
import { SearchOutlined, MoreOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { statusServiceRoomEditAction, roomForServiceGetAction } from '../../../../../store/actions/roomServiceService'

export default function TableRoom(props) {
	//serach
	const [searchText, setSearchText] = useState('')

	const [selectedRow, setSelectedRow] = useState()
	const dispatch = useDispatch()

	//filters
	const getFloorFilters = () => {
		const countFloor = 5
		let items = []
		for (let i = 1; i < countFloor + 1; i++) {
			items.push({ text: i + ' Этаж', value: i })
		}
		return items
	}
	const getTypeRoomFilters = () => {
		return [
			{ text: 'VIP', value: 'VIP' },
			{ text: 'Одна кровать', value: 'Одна кровать' },
			{ text: 'Две кровати', value: 'Две кровати' },
			{ text: 'Три кровати', value: 'Три кровати' }
		]
	}
	const getOccupancyFilters = () => {
		return [
			{ text: 'Доступно', value: 'Доступно' },
			{ text: 'Заселено', value: 'Заселено' },
			{ text: 'Забронировано', value: 'Забронировано' },
			{ text: 'Заблокировано ', value: 'Заблокировано' },
			{ text: 'Ожидание ', value: 'Ожидание' }
		]
	}
	const getRepairFilters = () => {
		return [
			{ text: 'Идет ремонт', value: 'true' },
			{ text: 'Не идет ремонт', value: 'false' }
		]
	}
	const getStatusFilters = () => {
		return [
			{ text: 'Грязный', value: 'Грязный' },
			{ text: 'Убирается', value: 'Убирается' },
			{ text: 'Проверяется', value: 'Проверяется' },
			{ text: 'Чистый ', value: 'Чистый' }
		]
	}

	const [filteredInfo, setFilteredInfo] = useState({})
	const handleChange = (pagination, filters, sorter) => {
		setFilteredInfo(filters)
	}

	const columns = [
		{
			title: 'Номер номера',
			dataIndex: 'numberRoom',
			key: 'numberRoom',
			render: (text) => <h5>{text}</h5>,

			sorter: (a, b) => a.numberRoom.toString().substring(1) - b.numberRoom.toString().substring(1),

			filteredValue: [searchText],
			onFilter: (value, record) =>
				String(record.numberRoom).toLowerCase().includes(value.toLowerCase()) ||
				String(record.departureDate).toLowerCase().includes(value.toLowerCase()) ||
				String(record.arrivalDate).toLowerCase().includes(value.toLowerCase())
		},
		{
			title: 'Этаж',
			dataIndex: 'floor',
			key: 'floor',
			align: 'center',

			filteredValue: filteredInfo.floor,
			filters: getFloorFilters(),
			onFilter: (value, record) => record.floor.toString().includes(value)
		},
		{
			title: 'Тип номера',
			dataIndex: 'typeRoom',
			key: 'typeRoom',
			align: 'center',

			filteredValue: filteredInfo.typeRoom,
			filters: getTypeRoomFilters(),
			onFilter: (value, record) => record.typeRoom.toString().includes(value)
		},
		{
			title: 'Занятость',
			dataIndex: 'occupancy',
			key: 'occupancy',
			align: 'center',
			render: (_, { occupancy, color_occupancy }) => <Tag color={color_occupancy}>{occupancy}</Tag>,

			filteredValue: filteredInfo.occupancy,
			filters: getOccupancyFilters(),
			onFilter: (value, record) => record.occupancy.toString().includes(value)
		},
		{
			title: 'Количество взрослых / детей',
			dataIndex: 'numberGuests',
			key: 'numberGuests',
			align: 'center'
		},
		{
			title: 'Номер будет освобожден',
			dataIndex: 'departureDate',
			key: 'departureDate',
			align: 'center'
		},
		{
			title: 'Номер будет заселен',
			dataIndex: 'arrivalDate',
			key: 'arrivalDate',
			align: 'center'
		},
		{
			title: 'Ремонт',
			dataIndex: 'repair',
			key: 'repair',
			align: 'center',
			render: (value) => <Checkbox checked={value} />,

			filteredValue: filteredInfo.repair,
			filters: getRepairFilters(),
			onFilter: (value, record) => record.repair.toString().includes(value)
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (_, { status, color_status }) => <Tag color={color_status}>{status}</Tag>,

			filteredValue: filteredInfo.status,
			filters: getStatusFilters(),
			onFilter: (value, record) => record.status.toString().includes(value)
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			align: 'center',
			render: (_, record) => (
				<Space size='large'>
					<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
						<Space>
							<Button onClick={() => setSelectedRow(record.idRoom)} shape='circle' icon={<MoreOutlined />} />
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]

	console.log(props.data)

	const [items, setItems] = useState([
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='image/roomService_cleaning.svg' />
					<p>Требует уборки</p>
				</div>
			),
			key: 'cleaning'
		},
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='image/roomService_cleanRoom.svg' />

					<p>Убран</p>
				</div>
			),
			key: 'clean'
		},
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='image/roomService_checked.svg' />
					<p>Проверить</p>
				</div>
			),
			key: 'checked'
		},
		{
			type: 'divider'
		},
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='image/roomService_repair.svg' />
					<p>Ремонт</p>
				</div>
			),
			key: 'repair'
		}
	])
	const onClick = ({ key }) => {
		if (key === 'cleaning') {
			dispatch(statusServiceRoomEditAction(selectedRow, '2e74346c-439f-4c06-9fd8-428a9abbcc97'))
			dispatch(roomForServiceGetAction())
		}
		if (key === 'clean') {
			dispatch(statusServiceRoomEditAction(selectedRow, '8c18094a-7f8b-4ad8-8023-e4419371c3b5'))
		}
		if (key === 'checked') {
			dispatch(statusServiceRoomEditAction(selectedRow, '76504da9-eff2-4fdd-becb-43b4ade0ef92'))
		}
		if (key === 'repair') {
			props.setSelectedRoom(selectedRow)
			props.setIsRepair(true)
		}
	}

	return (
		<div>
			<div className='d-f justify-content-end'>
				<Input
					size={'large'}
					style={{ width: '16vw', marginTop: '2vh' }}
					placeholder='Поиск...'
					prefix={<SearchOutlined />}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>
			<Table style={{ paddingTop: '1vh' }} columns={columns} dataSource={props.data} onChange={handleChange} />
		</div>
	)
}
