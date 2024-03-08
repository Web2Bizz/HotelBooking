import { Table, Space, Card, Input, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import ReactToPrint from 'react-to-print'
import { columnsGuests, columnsRoom, columnsRate, columnsDeal, columnsUsers } from './optionTables'
import QuerysService from '../../services/querysService'

export default function StatisticAndReports() {
	// #region Redux
	const { guests, isLoading: loadGuests } = useSelector((state) => state.bookingStore)
	const { room, isLoading: loadRoom } = useSelector((state) => state.roomStore)
	const { deal, isLoading: loadDeal } = useSelector((state) => state.dealStore)
	const { rate, isLoading: loadRate } = useSelector((state) => state.rateStore)
	const { users, isLoading: loadUsers } = useSelector((state) => state.userStore)
	// #endregion

	// #region Вспомогательные переменные
	const [queryData, setQueryData] = useState()
	const [modalVisible, setModalVisible] = useState(false)
	let refGuests = useRef(null)
	let refRoom = useRef(null)
	let refDeal = useRef(null)
	let refRate = useRef(null)
	let refUsers = useRef(null)
	const [data, setData] = useState({
		userInfo: [],
		guestsData: [],
		roomData: [],
		dealData: [],
		rateData: [],
		usersData: [],
		revenuePerMonth: [],
		roomInformation: [],
		visitorsInThreeMonths: [],
		howManyArrivedAndHowManyLeft: []
	})
	// #endregion

	// #region UseEffect
	useEffect(() => {
		const querysOverview = async () => {
			let RevenuePerMonth = await QuerysService.getRevenuePerMonth()
			let RoomInformation = await QuerysService.getRoomInformation()
			let VisitorsInThreeMonths = await QuerysService.getVisitorsInThreeMonths()
			let HowManyArrived = await QuerysService.getHowManyArrived()
			let HowManyLeft = await QuerysService.getHowManyLeft()
			setData({
				...data,
				userInfo: JSON.parse(localStorage.getItem('userInfo')),
				guestsData: guests,
				roomData: room,
				dealData: deal,
				rateData: rate,
				usersData: users,
				revenuePerMonth: RevenuePerMonth.data[0],
				roomInformation: RoomInformation.data[0],
				visitorsInThreeMonths: VisitorsInThreeMonths.data[0],
				HowManyArrived: HowManyArrived.data,
				HowManyLeft: HowManyLeft.data
			})
		}
		querysOverview()
	}, [guests, room, deal, rate, users])
	// #endregion

	// #region Отчеты общего назначения
	const GeneralPurposeReportsColumns = [
		{
			title: 'Отчет',
			dataIndex: 'title',
			key: 'title',
			render: (text, record) => (
				<ReactToPrint
					trigger={() => (
						<Space size='middle'>
							<a style={{ color: '#3B92FF' }}>{text}</a>
						</Space>
					)}
					content={() => record.refReport.current}
				/>
			)
		},
		{
			title: 'Описание отчета',
			key: 'description',
			dataIndex: 'description'
			// render: (description) => <p>{description}</p>
		}
	]
	const GeneralPurposeReportsData = [
		{
			key: '1',
			title: 'Все гости',
			description: 'Данные о всех гостях отеля',
			refReport: refGuests
		},
		{
			key: '2',
			title: 'Все комнаты',
			description: 'Данные о всех комнатах отеля',
			refReport: refRoom
		},
		{
			key: '3',
			title: 'Все расценки',
			description: 'Данные о всех расценках отеля',
			refReport: refRate
		},
		{
			key: '4',
			title: 'Все акции',
			description: 'Данные о всех акцияъ отеля',
			refReport: refDeal
		},
		{
			key: '5',
			title: 'Все пользователи',
			description: 'Данные о всех пользователях системы отеля',
			refReport: refUsers
		}
	]
	// #endregion
	// #region Отчеты общего назначения
	const StatisticalReportsColumns = [
		{
			title: 'Отчет',
			dataIndex: 'title',
			key: 'title',
			render: (text, record) => (
				<Space size='middle'>
					<a style={{ color: '#3B92FF' }} onClick={() => querysGet(record.query)}>
						{text}
					</a>
				</Space>
			)
		},
		{
			title: 'Описание отчета',
			key: 'description',
			dataIndex: 'description'
		}
	]
	const StatisticalReportsData = [
		{
			key: '1',
			title: 'Самое дорогое бронирование',
			description: 'Вывод пользователя, который совершил самое дорогое бронирование',
			query: 'MostExpensiveBooking'
		},
		{
			key: '2',
			title: 'Самое выбираемый номер за все время',
			description: 'Вывод номера, который имеет больше всего бронирований за все время',
			query: 'FrequentlySelectedRoomAllTime'
		},
		{
			key: '3',
			title: 'Самое выбираемый номер за этот месяц',
			description: 'Вывод номера, который имеет больше всего бронирований за этот месяц',
			query: 'FrequentlySelectedRoomForMonth'
		},
		{
			key: '4',
			title: 'Средний чек за день в этом месяце',
			description: 'Вывод среднего чека за день в этот месяц',
			query: 'AverageCheckPerDayThisMonth'
		},
		{
			key: '5',
			title: 'Самый посещаемый день за все время',
			description: 'Вывод самого посещаемого дня за все время',
			query: 'MostVisitedDay'
		}
	]
	// #endregion

	// #region Функции
	const querysGet = async (query, title) => {
		if (query === 'MostExpensiveBooking') {
			let data = await QuerysService.getMostExpensiveBooking()
			setQueryData(
				`Клиент: ${
					data.data[0].last_name + ' ' + data.data[0].first_name + ' ' + data.data[0].father_name
				}, забронировал номер за ${data.data[0].amount_paid} руб.`
			)
			setModalVisible(true)
			return
		}
		if (query === 'FrequentlySelectedRoomAllTime') {
			let data = await QuerysService.getFrequentlySelectedRoomAllTime()
			setQueryData(`Самый выбираемый номер за все время: #${data.data[0].room_number}`)
			setModalVisible(true)
			return
		}
		if (query === 'FrequentlySelectedRoomForMonth') {
			let data = await QuerysService.getFrequentlySelectedRoomForMonth()
			setQueryData(`Самый выбираемый номер за этот месяц: #${data.data[0].room_number}`)
			setModalVisible(true)
			return
		}
		if (query === 'AverageCheckPerDayThisMonth') {
			let data = await QuerysService.getAverageCheckPerDayThisMonth()
			setQueryData(`Средний чек за день в этом месяце: ${data.data[0].round} руб.`)
			setModalVisible(true)
			return
		}
		if (query === 'MostVisitedDay') {
			let data = await QuerysService.getMostVisitedDay()
			setQueryData(
				`Самый посещаемый день за все время: ${
					data.data[0].day + '.' + data.data[0].month + '.' + data.data[0].year
				} год.`
			)
			setModalVisible(true)
			return
		}
	}
	// #endregion

	return (
		<>
			<Modal title={'Результат'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={false}>
				<p>{queryData}</p>
			</Modal>

			<h2 style={{ paddingBottom: '3vh' }}>Статистичекие отчеты</h2>
			<Table columns={StatisticalReportsColumns} dataSource={StatisticalReportsData} pagination={false} />
			<h2 style={{ paddingBottom: '3vh', paddingTop: '2vh' }}>Отчеты общего назначения</h2>
			<Table columns={GeneralPurposeReportsColumns} dataSource={GeneralPurposeReportsData} pagination={false} />

			<div style={{ display: 'none' }}>
				<div ref={(el) => (refGuests.current = el)}>
					<h2 className='d-f jc-c'>Таблица гости</h2>
					<Table
						pagination={false}
						style={{ marginTop: '10px' }}
						columns={columnsGuests}
						dataSource={data.guestsData ? data.guestsData : null}
					/>
				</div>
				<div ref={(el) => (refRate.current = el)}>
					<h2 className='d-f jc-c'>Таблица расценки</h2>
					<Table pagination={false} style={{ marginTop: '10px' }} columns={columnsRate} dataSource={data.rateData} />
				</div>
				<div ref={(el) => (refRoom.current = el)}>
					<h2 className='d-f jc-c'>Таблица комнаты</h2>
					<Table pagination={false} style={{ marginTop: '10px' }} columns={columnsRoom} dataSource={data.roomData} />
				</div>
				<div ref={(el) => (refDeal.current = el)}>
					<h2 className='d-f jc-c'>Таблица акции</h2>
					<Table pagination={false} style={{ marginTop: '10px' }} columns={columnsDeal} dataSource={data.dealData} />
				</div>
				<div ref={(el) => (refUsers.current = el)}>
					<h2 className='d-f jc-c'>Таблица пользователи</h2>
					<Table pagination={false} style={{ marginTop: '10px' }} columns={columnsUsers} dataSource={data.usersData} />
				</div>
			</div>
		</>
	)
}
