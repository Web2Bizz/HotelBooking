import RepairRoomService from '../../services/repairRoomService'
import {
	repairApplicationByIdGet,
	repairApplicationByIdGetError,
	repairApplicationByIdGetSuccess,
	repairApplicationCreate,
	repairApplicationCreateError,
	repairApplicationCreateSuccess,
	repairApplicationDelete,
	repairApplicationDeleteError,
	repairApplicationDeleteSuccess,
	repairApplicationEdit,
	repairApplicationEditError,
	repairApplicationEditSuccess,
	repairApplicationStatusEdit,
	repairApplicationStatusEditError,
	repairApplicationStatusEditSuccess,
	repairApplicationsGet,
	repairApplicationsGetError,
	repairApplicationsGetSuccess,
	resetMessages
} from '../reducers/repairRoomReducer'

export const repairApplicationByIdGetAction = (id_room) => async (dispatch) => {
	try {
		dispatch(repairApplicationByIdGet())
		let response = await RepairRoomService.getRepairApplicationById(id_room)
		dispatch(repairApplicationByIdGetSuccess({ data: response.data }))
	} catch (e) {
		dispatch(repairApplicationByIdGetError(e.response?.data.message))
	}
}

export const repairApplicationsGetAction = () => async (dispatch) => {
	try {
		dispatch(repairApplicationsGet())
		let response = await RepairRoomService.getRepairApplications()
		dispatch(repairApplicationsGetSuccess({ data: response.data }))
	} catch (e) {
		dispatch(repairApplicationsGetError(e.response?.data.message))
	}
}

export const repairApplicationEditAction =
	(id_repair, name_work, description_work, start_date, end_date) => async (dispatch) => {
		try {
			dispatch(repairApplicationEdit())
			await RepairRoomService.editRepairApplication(id_repair, name_work, description_work, start_date, end_date)
			dispatch(repairApplicationEditSuccess('Заявка успешно изменена'))
		} catch (e) {
			dispatch(repairApplicationEditError(e.response?.data.message))
		}
	}

export const repairApplicationStatusEditAction = (id_repair, id_status_repair) => async (dispatch) => {
	try {
		dispatch(repairApplicationStatusEdit())
		await RepairRoomService.editRepairApplicationStatus(id_repair, id_status_repair)
		dispatch(repairApplicationStatusEditSuccess('Статус заявки успешно изменен'))
	} catch (e) {
		dispatch(repairApplicationStatusEditError(e.response?.data.message))
	}
}

export const repairApplicationCreateAction = (applications) => async (dispatch) => {
	try {
		dispatch(repairApplicationCreate())
		await RepairRoomService.createRepairApplication(applications)
		dispatch(repairApplicationCreateSuccess('Заявки успешно созданы'))
	} catch (e) {
		dispatch(repairApplicationCreateError(e.response?.data.message))
	}
}

export const repairApplicationDeleteAction = (id_repair) => async (dispatch) => {
	try {
		dispatch(repairApplicationDelete())
		await RepairRoomService.deleteRoom(id_repair)
		dispatch(repairApplicationDeleteSuccess('Комната успешно удалена'))
	} catch (e) {
		dispatch(repairApplicationDeleteError(e.response?.data.message))
	}
}

export const resetMessagesAction = () => async (dispatch) => {
	dispatch(resetMessages())
}
