import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Select, Transfer, message, InputNumber, Collapse } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessagesAction, roomCreateAction, roomEditAction, roomGetAction } from '../../../store/actions/roomAction'

import './Room.scss'
import Loading from '../../../components/Loading/Loading'

const RoomCreate = (props) => {
	//Notification
	const [messageApi, contextHolder] = message.useMessage()

	//Transfer
	const [mockData, setMockData] = useState([])
	//Selected fields
	const [targetKeys, setTargetKeys] = useState([])

	//Room fields
	const [floorRoomf, setFloorRoomf] = useState()
	const [statusRoomf, setStatusRoomf] = useState()
	const [typeRoomf, setTypeRoomf] = useState()
	const [numberRoomf, setNumberRoomf] = useState()

	//State
	const dispatch = useDispatch()
	const { room, isLoading, error, success } = useSelector((state) => state.roomStore)
	const { statusRoom, facilityRoom, typeRoom } = useSelector((state) => state.additionalsStore)
	const statusData = () => {
		let temp = []
		statusRoom.map((item) => {
			temp.push({
				value: item.id_status,
				label: item.status
			})
		})
		return temp
	}
	const facilityData = () => {
		let temp = []
		facilityRoom.map((item) => {
			temp.push({
				key: item.facility,
				title: item.facility
			})
		})
		return temp
	}
	const typeData = () => {
		let temp = []
		typeRoom.map((item) => {
			temp.push({
				value: item.id_room_type,
				label: item.room_type
			})
		})
		return temp
	}

	//
	// Load data for editing
	//
	useEffect(() => {
		if (props.onEditRoom === true) {
			loadDataForEdit()
		}
		// eslint-disable-next-line
	}, [props.onEditRoom])

	const loadDataForEdit = () => {
		room.map((item) => {
			if (item.id_room === props?.editRow) {
				let id_room_type
				typeRoom.map((sub) => {
					if (item.room_type === sub.room_type) {
						id_room_type = sub.id_room_type
					}
				})
				let id_status
				statusRoom.map((sub) => {
					if (item.status === sub.status) {
						id_status = sub.id_status
					}
				})
				setFloorRoomf(item.room_floor)
				setStatusRoomf(id_status)
				setTypeRoomf(id_room_type)
				setNumberRoomf(item.room_number)
				setTargetKeys(item.facility)
			}
		})
	}

	//
	// Transfer code
	//
	const getMock = () => {
		const mockData = facilityData()
		const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key)
		setMockData(mockData)
		if (props.onEditRoom === false) {
			setTargetKeys(initialTargetKeys)
		}
	}

	useEffect(() => {
		getMock()
	}, [])

	const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

	const handleChange = (newTargetKeys) => {
		setTargetKeys(newTargetKeys)
	}
	//
	// Notification
	//
	useEffect(() => {
		if (!isEmpty(success)) {
			dispatch(resetMessagesAction())
			dispatch(roomGetAction())
		}
		// eslint-disable-next-line
	}, [error, success])

	const errorEmptyField = () => {
		messageApi.open({
			type: 'error',
			content: 'Не все поля заполнены'
		})
	}

	//
	// Create room button
	//
	const isEmpty = (value) => {
		if (value === '' || value === null || value === undefined) {
			return true
		}
		return false
	}
	const onCreateRoom = () => {
		if (props.onEditRoom) {
			dispatch(roomEditAction(props.editRow, typeRoomf, floorRoomf, statusRoomf, numberRoomf, targetKeys))
			return
		} else {
			if (isEmpty(typeRoomf) || isEmpty(floorRoomf) || isEmpty(statusRoomf) || isEmpty(numberRoomf)) {
				errorEmptyField()
			} else {
				dispatch(roomCreateAction(typeRoomf, floorRoomf, statusRoomf, numberRoomf, targetKeys))
			}
		}
	}

	//
	// Back button
	//
	const onBackButton = () => {
		//Закрыть окно редактирования\добавления
		props.setOnCreateRoom(true)
		//Изменяем статус редактирования
		props.setOnEditRoom(false)
	}
	return (
		<>
			{contextHolder}
			<div className='d-flex justify-content-between align-items-center'>
				{props.onEditRoom ? <h2>Редактирование номера</h2> : <h2>Создание номера</h2>}
				<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
					Назад
				</Button>
			</div>
			<div>
				<div className='d-flex' style={{ gap: '3vh' }}>
					<Card title='Этаж номера' style={{ width: '30%' }}>
						<p style={{ color: 'gray' }}>В данном пункте, выбираеться этаж, на котором расположен номер</p>
						<div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
							<div>
								<div className='create-room__choise-room_roof'></div>
								<div className='create-room__choise-room_wall'>
									<div className='create-room__choise-room_signboard'>Отель</div>
									<div className='create-room__choise-room_floor'>
										<div>
											<p>5 Этаж</p>
										</div>
										<div className='selected-floor'>
											<p>4 Этаж</p>
										</div>
										<div>
											<p>3 Этаж</p>
										</div>
										<div>
											<p>2 Этаж</p>
										</div>
										<div>
											<p>1 Этаж</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
					<div className='d-flex flex-column' style={{ gap: '3vh' }}>
						<Card title='Тип номера'>
							<div className='roomType-img'>
								<p style={{ color: 'gray' }}>
									В данном пункте, выбирается тип номера для проживания, основываясь на количестве кроватей
								</p>
								<Card>
									<div className='roomType__card'>
										<div>
											<img src='public/image/x1.svg' alt='x1' />
										</div>
										<div>
											<img src='public/image/x2.svg' alt='x2' />
										</div>
										<div className='roomType__card_selected'>
											<img src='public/image/x3.svg' alt='x4' />
										</div>
										<div>
											<img src='public/image/vip.svg' alt='vip' />
										</div>
									</div>
								</Card>
							</div>
						</Card>
						<Card title='Удобства номера'>
							<p style={{ color: 'gray' }}>
								В данном пункте, выбируються удобства и услуги номера. В списке представлены все опции которые
								предоставляются отелем.
							</p>
							<Transfer
								listStyle={{
									width: '100%'
								}}
								dataSource={mockData}
								filterOption={filterOption}
								targetKeys={targetKeys}
								onChange={handleChange}
								render={(item) => item.title}
							/>
						</Card>
					</div>
				</div>
				<Button className='createRoom__btn' type='primary' onClick={() => onCreateRoom()}>
					{props.onEditRoom ? 'Сохранить' : 'Создать'}
				</Button>
			</div>

			<Collapse
				size='large'
				items={[
					{
						key: '1',
						label: 'Отладка',
						children: (
							<Row gutter={20}>
								<Col span={5}>
									<Card title='Этаж комнаты' bordered={true}>
										<Select
											placeholder='Выберите этаж...'
											style={{ width: 160 }}
											value={props.onEditRoom ? floorRoomf + ' Этаж' : floorRoomf === '' ? null : floorRoomf}
											options={[
												{ value: '1', label: '1 Этаж' },
												{ value: '2', label: '2 Этаж' },
												{ value: '3', label: '3 Этаж' },
												{ value: '4', label: '4 Этаж' },
												{ value: '5', label: '5 Этаж' }
											]}
											onChange={(e) => setFloorRoomf(e)}
										/>
									</Card>
								</Col>
								<Col span={4.5}>
									<Card title='Статус комнаты' bordered={true}>
										<Select
											placeholder='Выберите статус...'
											value={statusRoomf}
											style={{ width: 220 }}
											options={statusData()}
											onChange={(e) => setStatusRoomf(e)}
										/>
									</Card>
								</Col>
								<Col span={4.5}>
									<Card title='Тип комнаты' bordered={true}>
										<Select
											placeholder='Выберите тип...'
											style={{ width: 220 }}
											value={typeRoomf}
											options={typeData()}
											onChange={(e) => setTypeRoomf(e)}
										/>
									</Card>
								</Col>
								<Col span={4.5}>
									<Card title='Номер комнаты' bordered={true}>
										<InputNumber
											min={100}
											max={999}
											placeholder='Введите номер комнаты...'
											value={numberRoomf}
											onChange={(e) => setNumberRoomf(e)}
										/>
									</Card>
								</Col>
								<Col span={10}>
									<Card title='Удобства' bordered={true}>
										<Transfer
											dataSource={mockData}
											filterOption={filterOption}
											targetKeys={targetKeys}
											onChange={handleChange}
											render={(item) => item.title}
										/>
									</Card>
								</Col>
							</Row>
						)
					}
				]}
			/>

			{isLoading && <Loading />}
		</>
	)
}

export default RoomCreate
