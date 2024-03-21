import { useState, useEffect } from 'react'
import { Space, Dropdown, Table, Button, Tag } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { repairApplicationsGetAction } from '../../../../../store/actions/repairRoomAction'
import { getConvertedDate } from '../../../../../services/functionService'

export default function RepairRoomTable(props) {
	const [data, setData] = useState([])
	const dispatch = useDispatch()
	const { repairApplications, isLoading, success, error } = useSelector((state) => state.repairRoomStore)

	// #region UseEffect
	useEffect(() => {
		dispatch(repairApplicationsGetAction())
		loadData()
	}, [])

	// useEffect(() => {
	// 	loadData()
	// 	// eslint-disable-next-line
	// }, [roomForService, statisticServiceRoom])

	// useEffect(() => {
	// 	if (repairRoomSuccess === '') return
	// 	messageApi.success(repairRoomSuccess)
	// }, [repairRoomSuccess])

	// useEffect(() => {
	// 	if (error === '' && success === '') return
	// 	messageApi.open(messageGenerate(success, error))
	// 	dispatch(statisticServiceRoomGetAction())
	// 	dispatch(roomForServiceGetAction())
	// 	dispatch(resetMessagesAction())
	// }, [error, success])
	// #endregion

	const loadData = () => {
		console.log(repairApplications)
		if (repairApplications.length !== 0) {
			const transformedData = repairApplications.reduce((acc, item, key) => {
				const existingItem = acc.find((element) => element.room_number === item.room_number.toString())

				if (existingItem) {
					existingItem.repairs.push({
						key: key,
						name_work: item.name_work,
						description_work: item.description_work,
						start_date: getConvertedDate(item.start_date),
						end_date: getConvertedDate(item.end_date),
						status_repair: item.status_repair,
						color: item.color
					})
				} else {
					acc.push({
						key: key,
						room_number: item.room_number.toString(),
						repairs: [
							{
								key: `${'_' + key}`,
								name_work: item.name_work,
								description_work: item.description_work,
								start_date: getConvertedDate(item.start_date),
								end_date: getConvertedDate(item.end_date),
								status_repair: item.status_repair,
								color: item.color
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
					<img src='image/edit.png' />
					<p>Редактировать работы</p>
				</div>
			),
			key: 'edit-work'
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
			props.setIsRepair(true)
		}
		if (key === 'planing-work') {
			props.setIsPlaning(true)
		}
		if (key === 'edit-work') {
			props.setIsEdit(true)
		}
	}

	const columns = [
		{
			title: 'Номер комнаты',
			dataIndex: 'room_number',
			key: 'room_number'
		},
		{
			title: 'Действия',
			key: 'actions',
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
			}
		]

		return <Table columns={subColumns} dataSource={record.repairs} pagination={false} />
	}

	return <Table columns={columns} expandable={{ expandedRowRender }} dataSource={data} size='middle' />
}
