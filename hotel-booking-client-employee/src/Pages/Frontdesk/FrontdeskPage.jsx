import { Button, Divider, Space, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CalendarComp from '../../components/Calendar/Calendar'
import Loading from '../../components/Loading/Loading'
import { messageGenerate } from '../../services/functionService'
import { guestsGetAction, resetMessagesAction } from '../../store/actions/bookingAction'
import FrontdeskCreate from './FrontdeskCreate'
import './FrontdeskPage.scss'

const FrontdeskPage = () => {
	// #region Вспомогательные переменные
	const dispatch = useDispatch()
	const [onCreateBooking, setOnCreateBooking] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const [data, setData] = useState()
	// #endregion

	// #region Redux
	const { guests, isLoading, success, error } = useSelector((state) => state.bookingStore)
	// #endregion

	// #region UseEffect
	useEffect(() => {
		dispatch(guestsGetAction())
		loadData()
	}, [])

	useEffect(() => {
		if (error === '' && success === '') return
		if (error || success) {
			messageApi.open(messageGenerate(success, error))
			dispatch(resetMessagesAction())
		}
	}, [error, success])
	// #endregion

	// #region Функции
	const loadData = () => {
		// setCount();
		let tempData = []
		if (guests.length !== 0) {
			// eslint-disable-next-line
			guests.map((item, key) => {
				tempData.push({
					key: key,
					idGuest: item?.id_guest,
					statusGuest: item.status_guest,
					statusGuestRoom: item.status_guest_room,
					numberGuest: item?.number_guest,
					firstName: item?.first_name,
					lastName: item?.last_name,
					fatherName: item?.father_name,
					phoneNumber: item?.phone_number,
					email: item?.email,
					idBooking: item?.id_booking,
					arrivalDate: item?.arrival_date,
					departureDate: item?.departure_date,
					countAdults: item?.count_adults,
					countChildren: item?.count_children,
					amountPaid: item?.amount_paid,
					idRoom: item?.id_room,
					numberRoom: item?.room_number,
					roomFloor: item?.room_floor,
					idRoomStatus: item?.id_status,
					statusRoom: item?.status,
					colorSG: item.color_sg,
					colorSGR: item.color_sgr
				})
			})
			setData(tempData)
		}
	}
	const onCreateBookingClick = () => {
		setOnCreateBooking(true)
	}
	// #endregion

	return (
		<>
			{contextHolder}
			{isLoading && <Loading />}
			{onCreateBooking ? (
				<FrontdeskCreate setOnCreateBooking={setOnCreateBooking} />
			) : (
				<>
					<h2>Оформление</h2>
					<div className='headerFrontdesk'>
						<div className='headerFrontdesk-tag'>
							<Divider orientation='left' orientationMargin='0'>
								Обозначения
							</Divider>
							<Space size={[0, 8]} wrap>
								<Tag color='orange' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Должен прибыть
								</Tag>
								<Tag color='red' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Должен выехать
								</Tag>
								<Tag color='green' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Прибыл
								</Tag>
								<Tag color='blue' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Выехал
								</Tag>
							</Space>
						</div>
						<div className='headerFrontdesk-create'>
							<Button type='primary' onClick={() => onCreateBookingClick()}>
								Оформить клиента
							</Button>
						</div>
					</div>
					<CalendarComp guests={data} />
				</>
			)}
		</>
	)
}

export default FrontdeskPage
