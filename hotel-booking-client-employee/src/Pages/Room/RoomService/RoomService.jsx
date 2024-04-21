import { useState, useEffect } from 'react'
import { Collapse, message } from 'antd'
import RoomServiceStatistic from './Components/RoomServiceStatistic/RoomServiceStatistic'
import TableRoom from './Components/TableRoom/TableRoom'
import RoomServiceRepair from './Components/RoomServiceRepair/RoomServiceRepair'
import { useDispatch, useSelector } from 'react-redux'
import {
	statisticServiceRoomGetAction,
	roomForServiceGetAction,
	resetMessagesAction
} from '../../../store/actions/roomServiceService'
import { resetMessagesAction as repairResetMessagesAction } from '../../../store/actions/repairRoomAction'
import { messageGenerate } from '../../../services/functionService'
import { getConvertedDate } from '../../../services/functionService'

export default function RoomService() {
	const [isRepair, setIsRepair] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const [data, setData] = useState([])
	const [selectedRoom, setSelectedRoom] = useState('')
	const dispatch = useDispatch()
	const { roomForService, statisticServiceRoom, isLoading, success, error } = useSelector(
		(state) => state.roomServiceStore
	)
	const { success: repairRoomSuccess } = useSelector((state) => state.repairRoomStore)

	// #region UseEffect
	useEffect(() => {
		dispatch(statisticServiceRoomGetAction())
		dispatch(roomForServiceGetAction())
		loadData()
	}, [])

	useEffect(() => {
		loadData()
		// eslint-disable-next-line
	}, [roomForService, statisticServiceRoom])

	useEffect(() => {
		if (repairRoomSuccess === '') return
		messageApi.success(repairRoomSuccess)
		dispatch(statisticServiceRoomGetAction())
		dispatch(roomForServiceGetAction())
		dispatch(repairResetMessagesAction())
		loadData()
	}, [repairRoomSuccess])

	useEffect(() => {
		if (error === '' && success === '') return
		messageApi.open(messageGenerate(success, error))
		dispatch(statisticServiceRoomGetAction())
		dispatch(roomForServiceGetAction())
		dispatch(resetMessagesAction())
		loadData()
	}, [error, success])
	// #endregion

	const loadData = () => {
		let tempData = []
		if (roomForService.length !== 0) {
			// eslint-disable-next-line
			roomForService.map((item, key) => {
				tempData.push({
					key: key,
					idRoom: item?.id_room,
					numberRoom: '#' + item?.room_number,
					floor: item?.room_floor,
					typeRoom: item?.room_type,
					occupancy: item?.status,
					numberGuests:
						item?.count_adults + item?.count_children !== 0 ? item?.count_adults + item?.count_children : '',
					departureDate: getConvertedDate(item?.departure_date),
					arrivalDate: getConvertedDate(item?.arrival_date),
					repair:
						item?.id_repair === null || item?.id_repair === undefined || item?.id_repair.length === 0 ? false : true,
					status: item?.status_guest_room,
					idStatus: item?.id_status_guest_room,
					color_occupancy: item?.color,
					color_status: item?.color_sgr
				})
			})
			setData(tempData)
		}
	}

	return !isRepair ? (
		<>
			{contextHolder}
			<h2>Обслуживание номеров</h2>
			<Collapse
				items={[{ key: '1', label: 'Статистика', children: <RoomServiceStatistic data={statisticServiceRoom[0]} /> }]}
				defaultActiveKey={['1']}
			/>
			<TableRoom isRepair={isRepair} setIsRepair={setIsRepair} data={data} setSelectedRoom={setSelectedRoom} />
		</>
	) : (
		<>
			<RoomServiceRepair isRepair={isRepair} setIsRepair={setIsRepair} selectedRoom={selectedRoom} />
		</>
	)
}
