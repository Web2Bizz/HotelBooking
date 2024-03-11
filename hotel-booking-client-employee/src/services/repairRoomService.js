import $api from '../http'

export default class RepairRoomService {
	static async getRepairApplications() {
		return await $api.get('/repairRoom/getRepairApplications')
	}
	static async getRepairApplicationById(id_room) {
		return await $api.get(`/repairRoom/getRepairApplicationById/${id_room}`)
	}
	static async editRepairApplication(id_repair, name_work, description_work, start_date, end_date) {
		return await $api.put('/repairRoom/editRepairApplication', {
			id_repair,
			name_work,
			description_work,
			start_date,
			end_date
		})
	}
	static async editRepairApplicationStatus(id_repair, id_status_repair) {
		return await $api.put('/repairRoom/editRepairApplicationStatus', { id_repair, id_status_repair })
	}
	static async createRepairApplication(applications) {
		return await $api.post('/repairRoom/createRepairApplication', { applications })
	}
	static async deleteRepairApplication(id_repair) {
		return await $api.post(`/repairRoom/deleteRepairApplication/${id_repair}`)
	}
}
