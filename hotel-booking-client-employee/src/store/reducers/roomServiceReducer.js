import { createSlice } from '@reduxjs/toolkit'

const roomServiceSlice = createSlice({
	name: 'roomServiceStore',
	initialState: {
		roomForService: [],
		statisticServiceRoom: [],
		isLoading: false,
		error: '',
		success: ''
	},
	reducers: {
		statusServiceRoomEdit(state) {
			state.isLoading = true
		},
		statusServiceRoomEditSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		statusServiceRoomEditError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		roomForServiceGet(state) {
			state.isLoading = true
		},
		roomForServiceGetSuccess(state, action) {
			state.isLoading = false
			state.roomForService = action.payload.data
		},
		roomForServiceGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		statisticServiceRoomGet(state) {
			state.isLoading = true
		},
		statisticServiceRoomGetSuccess(state, action) {
			state.isLoading = false
			state.statisticServiceRoom = action.payload.data
		},
		statisticServiceRoomGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		resetMessages(state) {
			state.error = ''
			state.success = ''
		}
	}
})

export default roomServiceSlice.reducer
export const {
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
} = roomServiceSlice.actions
