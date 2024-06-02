import { t } from "../utils/trpc"

const getHotelProperties = t.procedure
	.query(async () => {
		const data = await fetch("http://87.242.117.193:9090/api/hotelSettings/getHotelProperties")
		return (await data.json()) as {
            id_hotel_properties: string
            hotel_name: string
            hotel_logo: string
            hotel_country: string
            hotel_region: string
            hotel_city: string
            hotel_street: string
            hotel_number_house: string
            hotel_count_floor: string
            hotel_count_room: number
            contact_email: string
            contact_number_phone: string
            owner_name: string
            owner_number_phone: string
            owner_email: string
            id_personal_data_storage_policy: string
        }
	})

export { getHotelProperties }