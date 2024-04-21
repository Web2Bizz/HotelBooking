import { createSlice } from '@reduxjs/toolkit'

const hotelSettingsSlice = createSlice({
	name: 'hotelSettingsStore',
	initialState: {
		hotelProperties: [],
		isLoading: false,
		error: '',
		success: ''
	},
	reducers: {
		hotelPropertiesGet(state) {
			state.isLoading = true
		},
		hotelPropertiesGetSuccess(state, action) {
			state.isLoading = false
			state.hotelProperties = action.payload.data
		},
		hotelPropertiesGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		hotelPropertiesEdit(state) {
			state.isLoading = true
		},
		hotelPropertiesEditSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		hotelPropertiesEditError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		registrationHotel(state) {
			state.isLoading = true
		},
		registrationHotelSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		registrationHotelError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		resetMessages(state) {
			state.error = ''
			state.success = ''
		}
	}
})

export default hotelSettingsSlice.reducer
export const {
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
} = hotelSettingsSlice.actions
