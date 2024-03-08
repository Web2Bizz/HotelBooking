import { Dropdown, Space, Table, Button, Tag } from 'antd'
import { DownOutlined, MoreOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function TableRoom(props) {
	const DropdownStatus = () => {
		const items = [
			{
				label: 'https://www.antgroup.com',
				key: '0'
			},
			{
				label: 'https://www.aliyun.com',
				key: '1'
			},
			{
				label: '3rd menu item',
				key: '3'
			}
		]
		return (
			<Dropdown.Button
				menu={{
					items
				}}
				trigger={['click']}
				icon={<DownOutlined />}
			>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						Статус: все
						{/* <DownOutlined /> */}
					</Space>
				</a>
			</Dropdown.Button>
		)
	}

	const DropdownFloor = () => {
		const items = [
			{
				label: 'https://www.antgroup.com',
				key: '0'
			},
			{
				label: 'https://www.aliyun.com',
				key: '1'
			},
			{
				label: '3rd menu item',
				key: '3'
			}
		]
		return (
			<div style={{ paddingRight: '2vh' }}>
				<Dropdown.Button
					menu={{
						items
					}}
					trigger={['click']}
					icon={<DownOutlined />}
				>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							Этаж: все
							{/* <DownOutlined /> */}
						</Space>
					</a>
				</Dropdown.Button>
			</div>
		)
	}

	const dataSource = [
		{
			key: '1',
			numberRoom: '#234',
			floor: 3,
			typeRoom: 'VIP',
			occupancy: 'Занято',
			numberGuests: 4,
			departureDate: '12.04.22',
			arrivalDate: '09.04.22',
			repair: null,
			status: 'Проверено'
		},
		{
			key: '1',
			numberRoom: '#114',
			floor: 2,
			typeRoom: 'Одна кровать',
			occupancy: 'Свободна',
			numberGuests: null,
			departureDate: null,
			arrivalDate: null,
			repair: null,
			status: 'Проверено'
		}
	]

	const columns = [
		{
			title: 'Номер комнаты',
			dataIndex: 'numberRoom',
			key: 'numberRoom',
			render: (text) => <h5>{text}</h5>
		},
		{
			title: 'Этаж',
			dataIndex: 'floor',
			key: 'floor',
			align: 'center'
		},
		{
			title: 'Тип комнаты',
			dataIndex: 'typeRoom',
			key: 'typeRoom',
			align: 'center'
		},
		{
			title: 'Занятость',
			dataIndex: 'occupancy',
			key: 'occupancy',
			align: 'center',
			render: (occupancy) => <Tag color='red'>{occupancy}</Tag>
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
			align: 'center'
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (status) => <Tag color='green'>{status}</Tag>
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
							<Button shape='circle' icon={<MoreOutlined />} />
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]

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
					<p>Проверен</p>
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
		}
		if (key === 'clean') {
		}
		if (key === 'checked') {
		}
		if (key === 'repair') {
			props.setIsRepair(true)
		}
	}

	return (
		<>
			<div className='service-room-filters'>
				<DropdownFloor />
				<DropdownStatus />
			</div>
			<Table columns={columns} dataSource={dataSource} />
		</>
	)
}
