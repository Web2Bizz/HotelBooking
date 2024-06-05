import client from '../db.js'

class RoomServiceService {
	async getRoomForService() {
		const response = await client.query(
			`select 
          R.id_room, R.room_number, R.room_floor, R.id_repair, RT.room_type, RS.status, RS.color,
          B.arrival_date, B.departure_date, B.count_adults, B.count_children, SGR.status_guest_room,
          SGR.id_status_guest_room, SGR.color_sgr
          from public.room as R 
          inner join public.roomtype as RT on R.id_room_type = RT.id_room_type
          inner join public.roomstatus as RS on R.id_status = RS.id_status
          left join public.booking as B on R.id_room = B.id_room
          inner join public.roomservicestatus as SGR on SGR.id_status_guest_room = R.id_room_service_status
          order by R.id_room asc`
		)
		return response
	}
	async getStatisticServiceRoom() {
		const response = await client.query(
			`SELECT 
      ROUND((SELECT COUNT(*) FROM room WHERE id_room_service_status = '2e74346c-439f-4c06-9fd8-428a9abbcc97') * 100.0 / COUNT(*)) AS dirty_percentage,
      ROUND((SELECT COUNT(*) FROM room WHERE id_room_service_status = '8c18094a-7f8b-4ad8-8023-e4419371c3b5') * 100.0 / COUNT(*)) AS cleaned_percentage,
      ROUND((SELECT COUNT(*) FROM room WHERE id_room_service_status = '76504da9-eff2-4fdd-becb-43b4ade0ef92') * 100.0 / COUNT(*)) AS checked_percentage,
      ROUND((SELECT COUNT(*) FROM room WHERE id_status = '024e26c7-5e33-4f35-a88e-e6f5c9322e02') * 100.0 / COUNT(*)) AS free_percentage,
      ROUND((SELECT COUNT(*) FROM room WHERE id_status = '91128392-8f10-4cde-9684-0148536f9a1b' or id_status = '5e6c8c25-5492-447c-9c2b-eb1fe1a2a208') * 100.0 / COUNT(*)) AS busy_percentage,
      ROUND((SELECT COUNT(*) FROM room WHERE id_repair IS NOT NULL) * 100.0 / COUNT(*)) AS repair_percentage
        FROM room;`
		)
		return response
	}
	async editStatusServiceRoom(id_room, id_room_service_status) {
		const response = await client.query(`update public.room set id_room_service_status = $1 where id_room = $2`, [
			id_room_service_status,
			id_room
		])
		return response
	}
}

export default RoomServiceService
