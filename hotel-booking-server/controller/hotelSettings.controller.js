import HotelSettingsService from '../service/hotelSettings.service.js'

const hotelSettingsService = new HotelSettingsService()

class HotelSettingsController {
	async RegistrationHotel(req, res, next) {
		try {
			const {fields} = req.body;
			await hotelSettingsService.registrationHotel(fields);
			return res.json("Отель зарегистрирован");
		} catch (e) {
			next(e);
		}
	}
	async EditHotelProperties(req, res, next) {
		try {
			const {fields} = req.body;
			const test = await hotelSettingsService.editHotelProperties(fields);
			console.log(test)
			return res.json("Настройки отеля изменены");
		} catch (e) {
			next(e);
		}
	}
	async GetHotelProperties(req, res, next) {
		try {
			const response = await hotelSettingsService.getHotelProperties();
			return res.json(response.rows);
		} catch (e) {
			next(e);
		}
	}
}

export  default HotelSettingsController;