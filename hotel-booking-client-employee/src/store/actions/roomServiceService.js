import RoomServiceService from '../../services/roomServiceService'
import {
	statisticServiceRoomGet,
	statisticServiceRoomGetError,
	statisticServiceRoomGetSuccess,
	statusServiceRoomEdit,
	statusServiceRoomEditError,
	statusServiceRoomEditSuccess,
	roomForServiceGet,
	roomForServiceGetError,
	roomForServiceGetSuccess,
	resetMessages
} from '../reducers/roomServiceReducer'

export const statusServiceRoomEditAction = (id_room, id_room_service_status) => async (dispatch) => {
	try {
		dispatch(statusServiceRoomEdit())
		await RoomServiceService.editStatusServiceRoom(id_room, id_room_service_status)
		dispatch(statusServiceRoomEditSuccess('Статус комнаты успешно изменен'))
	} catch (e) {
		dispatch(statusServiceRoomEditError(e.response?.data.message))
	}
}

export const roomForServiceGetAction = () => async (dispatch) => {
	try {
		dispatch(roomForServiceGet())
		let response = await RoomServiceService.getRoomForService()
		dispatch(roomForServiceGetSuccess({ data: response.data }))
	} catch (e) {
		dispatch(roomForServiceGetError(e.response?.data.message))
	}
}

export const statisticServiceRoomGetAction = () => async (dispatch) => {
	try {
		dispatch(statisticServiceRoomGet())
		let response = await RoomServiceService.getStatisticServiceRoom()
		dispatch(statisticServiceRoomGetSuccess({ data: response.data }))
	} catch (e) {
		dispatch(statisticServiceRoomGetError(e.response?.data.message))
	}
}

export const resetMessagesAction = () => async (dispatch) => {
	dispatch(resetMessages())
}
