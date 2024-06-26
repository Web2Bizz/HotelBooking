import AdditionalsService from '../../services/additionalsService'
import {
	statusGet,
	statusGetError,
	statusGetSuccess,
	facilityGet,
	facilityGetError,
	facilityGetSuccess,
	typeGet,
	typeGetError,
	typeGetSuccess,
	statusDealGet,
	statusDealGetError,
	statusDealGetSuccess,
	cancelPolicyGet,
	cancelPolicyGetError,
	cancelPolicyGetSuccess,
	statusGuestGet,
	statusGuestGetSuccess,
	statusGuestGetError,
	statusGuestRoomGet,
	statusGuestRoomGetError,
	statusGuestRoomGetSuccess,
	statusRepairGet,
	statusRepairGetError,
	statusRepairGetSuccess,
	personalDataStoragePolicyGet,
	personalDataStoragePolicyGetError,
	personalDataStoragePolicyGetSuccess
} from '../reducers/additionalsReducer'

export const getStatusAction = () => async (dispatch) => {
	try {
		dispatch(statusGet())
		let response = await AdditionalsService.getStatus()
		dispatch(statusGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(statusGetError(e.response?.data.message))
	}
}
export const getFacilityAction = () => async (dispatch) => {
	try {
		dispatch(facilityGet())
		let response = await AdditionalsService.getFacility()
		dispatch(facilityGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(facilityGetError(e.response?.data.message))
	}
}
export const getTypeAction = () => async (dispatch) => {
	try {
		dispatch(typeGet())
		let response = await AdditionalsService.getType()
		dispatch(typeGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(typeGetError(e.response?.data.message))
	}
}
export const getStatusDealAction = () => async (dispatch) => {
	try {
		dispatch(statusDealGet())
		let response = await AdditionalsService.getStatusDeal()
		dispatch(statusDealGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(statusDealGetError(e.response?.data.message))
	}
}
export const getCancelPolicyAction = () => async (dispatch) => {
	try {
		dispatch(cancelPolicyGet())
		let response = await AdditionalsService.getCancelPolicy()
		dispatch(cancelPolicyGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(cancelPolicyGetError(e.response?.data.message))
	}
}

export const getStatusGuestAction = () => async (dispatch) => {
	try {
		dispatch(statusGuestGet())
		let response = await AdditionalsService.getStatusGuest()
		dispatch(statusGuestGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(statusGuestGetError(e.response?.data.message))
	}
}
export const getStatusGuestRoomAction = () => async (dispatch) => {
	try {
		dispatch(statusGuestRoomGet())
		let response = await AdditionalsService.getStatusGuestRoom()
		dispatch(statusGuestRoomGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(statusGuestRoomGetError(e.response?.data.message))
	}
}
export const getStatusRepairAction = () => async (dispatch) => {
	try {
		dispatch(statusRepairGet())
		let response = await AdditionalsService.getRepairStatus()
		dispatch(statusRepairGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(statusRepairGetError(e.response?.data.message))
	}
}

export const getPersonalDataStoragePolicyAction = () => async (dispatch) => {
	try {
		dispatch(personalDataStoragePolicyGet())
		let response = await AdditionalsService.getPersonalDataStoragePolicy()
		dispatch(personalDataStoragePolicyGetSuccess({ successLoad: 'Данные успешно загружены', data: response.data }))
	} catch (e) {
		dispatch(personalDataStoragePolicyGetError(e.response?.data.message))
	}
}
