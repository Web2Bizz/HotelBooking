import { createContext } from 'react'

export interface IHotelData {
	id_hotel_properties: string
	hotel_name: string
	hotel_logo: string
	hotel_country: string
	hotel_region: string
	hotel_city: string
	hotel_street: string
	hotel_number_house: string
	hotel_count_floor: number
	hotel_count_room: number
	contact_email: string
	contact_number_phone: string
	owner_name: string
	owner_number_phone: string
	owner_email: string
	id_personal_data_storage_policy: string
}

export const initialHotelData: IHotelData = {
	id_hotel_properties: '',
	hotel_name: '',
	hotel_logo: '',
	hotel_country: '',
	hotel_region: '',
	hotel_city: '',
	hotel_street: '',
	hotel_number_house: '',
	hotel_count_floor: 0,
	hotel_count_room: 0,
	contact_email: '',
	contact_number_phone: '',
	owner_name: '',
	owner_number_phone: '',
	owner_email: '',
	id_personal_data_storage_policy: ''
}

export const AppContext = createContext(initialHotelData)
