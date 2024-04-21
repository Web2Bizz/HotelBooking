import { createSlice } from '@reduxjs/toolkit'

const repairRoomSlice = createSlice({
	name: 'repairRoomStore',
	initialState: {
		repairApplications: [],
		repairApplicationsStatistic: [],
		repairApplicationById: [],
		isLoading: false,
		error: '',
		success: ''
	},
	reducers: {
		repairApplicationsGet(state) {
			state.isLoading = true
		},
		repairApplicationsGetSuccess(state, action) {
			state.isLoading = false
			state.repairApplications = action.payload.data
		},
		repairApplicationsGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		repairApplicationsStatisticGet(state) {
			state.isLoading = true
		},
		repairApplicationsStatisticGetSuccess(state, action) {
			state.isLoading = false
			state.repairApplicationsStatistic = action.payload.data
		},
		repairApplicationsStatisticGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		repairApplicationByIdGet(state) {
			state.isLoading = true
		},
		repairApplicationByIdGetSuccess(state, action) {
			state.isLoading = false
			state.repairApplicationById = action.payload.data
		},
		repairApplicationByIdGetError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		repairApplicationEdit(state) {
			state.isLoading = true
		},
		repairApplicationEditSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		repairApplicationEditError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		repairApplicationStatusEdit(state) {
			state.isLoading = true
		},
		repairApplicationStatusEditSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		repairApplicationStatusEditError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		repairApplicationCreate(state) {
			state.isLoading = true
		},
		repairApplicationCreateSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		repairApplicationCreateError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		repairApplicationDelete(state) {
			state.isLoading = true
		},
		repairApplicationDeleteSuccess(state, action) {
			state.isLoading = false
			state.success = action.payload
		},
		repairApplicationDeleteError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		resetMessages(state) {
			state.error = ''
			state.success = ''
		}
	}
})

export default repairRoomSlice.reducer
export const {
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
	repairApplicationsStatisticGet,
	repairApplicationsStatisticGetError,
	repairApplicationsStatisticGetSuccess,

	resetMessages
} = repairRoomSlice.actions
