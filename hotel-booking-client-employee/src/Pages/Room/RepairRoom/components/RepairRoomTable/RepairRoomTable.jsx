import React, { useState, useEffect } from 'react'
import { Space, Dropdown, Table, Button, Tag, message, Input, Modal } from 'antd'
import { ExclamationCircleFilled, MoreOutlined, SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
	repairApplicationDeleteAction,
	repairApplicationsGetAction,
	resetMessagesAction
} from '../../../../../store/actions/repairRoomAction'
import { getConvertedDate, messageGenerate } from '../../../../../services/functionService'
import { roomEditStatusAction } from '../../../../../store/actions/roomAction.js'

export default function RepairRoomTable({ setSelectedRoom, setIsRepair, data, setData, setIsEdit, setIsPlaning }) {
	const [messageApi, contextHolder] = message.useMessage()
	const dispatch = useDispatch()
	const { repairApplications, isLoading, success, error } = useSelector((state) => state.repairRoomStore)
	//serach
	const [searchText, setSearchText] = useState('')

	// #region UseEffect
	useEffect(() => {
		dispatch(repairApplicationsGetAction())
		loadData()
	}, [])

	useEffect(() => {
		loadData()
		// eslint-disable-next-line
	}, [repairApplications])

	useEffect(() => {
		if (error === '' && success === '') return
		messageApi.open(messageGenerate(success, error))
		dispatch(resetMessagesAction())
		dispatch(repairApplicationsGetAction())
	}, [error, success, isLoading])
	// #endregion

	const loadData = () => {
		if (repairApplications.length !== 0) {
			const transformedData = repairApplications.reduce((acc, item, key) => {
				const existingItem = acc.find((element) => element.room_number === item.room_number.toString())
				if (existingItem) {
					existingItem.repairs.push({
						key: key,
						id_room: item.id_room,
						id_repair: item.id_repair,
						name_work: item.name_work,
						description_work: item.description_work,
						start_date: getConvertedDate(item.start_date),
						end_date: getConvertedDate(item.end_date),
						status_repair: item.status_repair,
						color: item.color,
						closeroom: item.closeroom,
						id_status_repair: item.id_status_repair
					})
				} else {
					acc.push({
						key: key,
						room_number: item.room_number.toString(),
						repairs: [
							{
								key: `${'_' + key}`,
								id_room: item.id_room,
								id_repair: item.id_repair,
								name_work: item.name_work,
								description_work: item.description_work,
								start_date: getConvertedDate(item.start_date),
								end_date: getConvertedDate(item.end_date),
								status_repair: item.status_repair,
								color: item.color,
								closeroom: item.closeroom,
								id_status_repair: item.id_status_repair
							}
						]
					})
				}
				return acc
			}, [])
			setData(transformedData)
		}
	}

	const [items, setItems] = useState([
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='image/roomService_cleaning.svg' />
					<p>Добавить работу</p>
				</div>
			),
			key: 'add-work'
		},
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='image/planing.png' />
					<p>Планирование ремонта</p>
				</div>
			),
			key: 'planing-work'
		}
	])
	const onClick = ({ key }) => {
		if (key === 'add-work') {
			setIsRepair(true)
		}
		if (key === 'planing-work') {
			setIsPlaning(true)
		}
		if (key === 'edit-work') {
			setIsEdit(true)
		}
	}

	const columns = [
		{
			title: 'Номер номера',
			dataIndex: 'room_number',
			key: 'room_number',
			filteredValue: [searchText],
			onFilter: (value, record) => String(record.room_number).toLowerCase().includes(value.toLowerCase())
		},
		{
			title: 'Действия',
			key: 'actions',
			render: (_, record) => (
				<Space size='large'>
					<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
						<Space>
							<Button
								onClick={() => setSelectedRoom(record.repairs[0].id_room)}
								shape='circle'
								icon={<MoreOutlined />}
							/>
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]
	const { confirm } = Modal
	const onDeleteAplication = (id) => {
		confirm({
			title: 'Вы точно хотите удалить заявку?',
			icon: <ExclamationCircleFilled />,
			okText: 'Да',
			okType: 'danger',
			cancelText: 'Нет',
			onOk() {
				dispatch(repairApplicationDeleteAction(id))
			}
		})
	}

	const expandedRowRender = (record) => {
		const subColumns = [
			{ title: 'Название работы', dataIndex: 'name_work', key: 'name_work' },
			{ title: 'Описание работы', dataIndex: 'description_work', key: 'description_work' },
			{ title: 'Начало ремонта', dataIndex: 'start_date', key: 'start_date' },
			{ title: 'Окончание ремонта', dataIndex: 'end_date', key: 'end_date' },
			{
				title: 'Статус работы',
				dataIndex: 'status_repair',
				key: 'status_repair',
				render: (_, { status_repair, color }) => <Tag color={color}>{status_repair}</Tag>
			},
			{
				title: '',
				dataIndex: 'action',
				key: 'action',
				render: (_, { id_repair }) => <Button onClick={() => onDeleteAplication(id_repair)}>Удалить</Button>
			}
		]

		return <Table columns={subColumns} dataSource={record.repairs} pagination={false} />
	}

	return (
		<>
			{contextHolder}
			<div className='d-f justify-content-end'>
				<Input
					size={'large'}
					style={{ width: '16vw', margin: '1vh 0' }}
					placeholder='Поиск...'
					prefix={<SearchOutlined />}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>
			<Table columns={columns} expandable={{ expandedRowRender }} dataSource={data} size='middle' />
		</>
	)
}
