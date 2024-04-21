import client from "../db.js";

class HotelSettingsService {
	async registrationHotel(fields){
		const response = client.query(`
			insert into public.hotelproperties 
			(hotel_name, hotel_logo, hotel_country, hotel_region, hotel_city, hotel_street,
			hotel_number_house, hotel_count_floor, hotel_count_room, contact_email, 
			contact_number_phone, owner_name, owner_number_phone, owner_email, 
			id_personal_data_storage_policy)
			values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
		`, [fields.hotel_name, fields.hotel_logo.file.thumbUrl, fields.hotel_country, fields.hotel_region,
			fields.hotel_city, fields.hotel_street, fields.hotel_number_house, fields.hotel_count_floor,
			fields.hotel_count_room, fields.contact_email, fields.contact_number_phone,
			fields.owner_name, fields.owner_number_phone, fields.owner_email,
			fields.id_personal_data_storage_policy])
		return response
	}
	async editHotelProperties(fields){
		console.log(fields.hotel_logo.file)
		const logo = fields.hotel_logo.file === undefined ? fields.hotel_logo : fields.hotel_logo.file.thumbUrl;
		const response = client.query(`
			update public.hotelproperties set
			hotel_name = $1, hotel_logo = $2, hotel_country = $3, hotel_region = $4, hotel_city = $5,
			hotel_street = $6, hotel_number_house = $7, hotel_count_floor = $8, hotel_count_room = $9,
			contact_email = $10, contact_number_phone = $11, owner_name = $12, owner_number_phone = $13,
			owner_email = $14, id_personal_data_storage_policy = $15 where id_hotel_properties = $16
		`, [fields.hotel_name, logo, fields.hotel_country, fields.hotel_region,
			fields.hotel_city, fields.hotel_street, fields.hotel_number_house, fields.hotel_count_floor,
			fields.hotel_count_room, fields.contact_email, fields.contact_number_phone,
			fields.owner_name, fields.owner_number_phone, fields.owner_email,
			fields.id_personal_data_storage_policy, fields.id_hotel_properties])

		return response
	}

	async getHotelProperties(){
		const response = client.query(`
			select * from public.hotelproperties
		`)
		return response;
	}
}

export default HotelSettingsService