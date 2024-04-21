import HotelSettingsService from '../../services/hotelSettingsService.js'
import {
	hotelPropertiesEditError,
	hotelPropertiesEditSuccess,
	hotelPropertiesGetError,
	hotelPropertiesGetSuccess,
	hotelPropertiesGet,
	hotelPropertiesEdit,
	registrationHotelError,
	registrationHotelSuccess,
	registrationHotel,

	resetMessages
} from '../reducers/hotelSettingsReducer.js'

export const hotelPropertiesGetAction = () => async (dispatch) => {
	try {
		dispatch(hotelPropertiesGet())
		let response = await HotelSettingsService.getHotelProperties()
		dispatch(hotelPropertiesGetSuccess({ data: response.data }))
	} catch (e) {
		dispatch(hotelPropertiesGetError(e.response?.data.message))
	}
}

export const hotelPropertiesEditAction =
	(fields) => async (dispatch) => {
		try {
			dispatch(hotelPropertiesEdit())
			await HotelSettingsService.editHotelProperties(fields)
			dispatch(hotelPropertiesEditSuccess('Настройки отеля изменены'))
		} catch (e) {
			dispatch(hotelPropertiesEditError(e.response?.data.message))
		}
	}

export const registrationHotelAction = (fields) => async (dispatch) => {
	try {
		dispatch(registrationHotel())
		await HotelSettingsService.registrationHotel(fields)
		dispatch(registrationHotelSuccess('Регистрация отеля успешно заверешена'))
	} catch (e) {
		dispatch(registrationHotelError(e.response?.data.message))
	}
}

export const resetMessagesAction = () => async (dispatch) => {
	dispatch(resetMessages())
}
