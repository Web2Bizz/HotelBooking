import $api from '../http'

export default class AdditionalsService {
	static async getStatus() {
		return await $api.get('/additionals/getStatus')
	}
	static async getFacility() {
		return await $api.get('/additionals/getFacility')
	}
	static async getFacilityConnection() {
		return await $api.get('/additionals/getFacilityConnection')
	}
	static async getType() {
		return await $api.get('/additionals/getType')
	}
	static async getStatusDeal() {
		return await $api.get('/additionals/getStatusDeal')
	}
	static async getCancelPolicy() {
		return await $api.get('/additionals/getCancelPolicy')
	}
	static async getStatusGuest() {
		return await $api.get('/additionals/getStatusGuest')
	}
	static async getStatusGuestRoom() {
		return await $api.get('/additionals/getStatusGuestRoom')
	}
	static async getRepairStatus() {
		return await $api.get('/additionals/getRepairStatus')
	}
	static async getPersonalDataStoragePolicy() {
		return await $api.get('/additionals/getPersonalDataStoragePolicy')
	}
}
