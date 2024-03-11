import $api from '../http'

export default class RoomServiceService {
	static async editStatusServiceRoom(id_room, id_room_service_status) {
		return await $api.put('/roomService/editStatusServiceRoom', { id_room, id_room_service_status })
	}
	static async getRoomForService() {
		return await $api.get('/roomService/getRoomForService')
	}
	static async getStatisticServiceRoom() {
		return await $api.get('/roomService/getStatisticServiceRoom')
	}
}
