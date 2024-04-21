import $api from '../http'

export default class HotelSettingsService {
	static async getHotelProperties() {
		return await $api.get('/hotelSettings/getHotelProperties')
	}
	static async editHotelProperties(fields) {
		return await $api.put('/hotelSettings/editHotelProperties', { fields })
	}
	static async registrationHotel(fields) {
		return await $api.post('/hotelSettings/registrationHotel', { fields })
	}
}
