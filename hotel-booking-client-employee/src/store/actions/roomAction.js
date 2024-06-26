import RoomService from '../../services/roomService'
import {
	roomCreate,
	roomCreateSuccess,
	roomCreateError,
	resetMessages,
	roomGet,
	roomGetError,
	roomGetSuccess,
	roomDelete,
	roomDeleteError,
	roomDeleteSuccess,
	roomEdit,
	roomEditError,
	roomEditStatus,
	roomEditStatusSuccess,
	roomEditStatusError,
	roomEditSuccess
} from '../reducers/roomReducer'

export const roomCreateAction = (id_room_type, room_floor, id_status, numberRoom, targetKeys) => async (dispatch) => {
	try {
		dispatch(roomCreate())
		await RoomService.createRoom(id_room_type, room_floor, id_status, numberRoom, targetKeys)
		dispatch(roomCreateSuccess('Номер успешно создан'))
	} catch (e) {
		dispatch(roomCreateError(e.response?.data.message))
	}
}

export const roomEditAction =
	(id_room, id_room_type, room_floor, id_status, numberRoom, targetKeys) => async (dispatch) => {
		try {
			dispatch(roomEdit())
			await RoomService.editRoom(id_room, id_room_type, room_floor, id_status, numberRoom, targetKeys)
			dispatch(roomEditSuccess('Номер успешно изменен'))
		} catch (e) {
			dispatch(roomEditError(e.response?.data.message))
		}
	}
export const roomEditStatusAction = (id_room) => async (dispatch) => {
	try {
		dispatch(roomEditStatus())
		await RoomService.editRoomStatus(id_room)
		dispatch(roomEditStatusSuccess('Статус успешно изменен'))
	} catch (e) {
		dispatch(roomEditStatusError(e.response?.data.message))
	}
}
export const roomGetAction = () => async (dispatch) => {
	try {
		dispatch(roomGet())
		let response = await RoomService.getRoom()
		dispatch(roomGetSuccess({ data: response.data }))
	} catch (e) {
		dispatch(roomGetError(e.response?.data.message))
	}
}

export const roomDeleteAction = (id_room) => async (dispatch) => {
	try {
		dispatch(roomDelete())
		await RoomService.deleteRoom(id_room)
		dispatch(roomDeleteSuccess('Номер успешно удален'))
	} catch (e) {
		dispatch(roomDeleteError(e.response?.data.message))
	}
}

export const resetMessagesAction = () => async (dispatch) => {
	dispatch(resetMessages())
}
