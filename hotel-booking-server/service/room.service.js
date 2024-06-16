import client from "../db.js";
import ApiError from "../exceptions/api-error.js";
import { v4 as uuidv4 } from "uuid";

class RoomService {
  async getRoom() {
    const response = await client.query(
      `select 
      R.id_room, R.room_number, R.room_floor, R.facility, RT.room_type, RS.status, RS.color
      from public.room as R 
      inner join public.roomtype as RT on R.id_room_type = RT.id_room_type
      inner join public.roomstatus as RS on R.id_status = RS.id_status 
      order by R.id_room asc `
    );
    return response;
  }

  async getCurrentRoom(id) {
    const response = await client.query(
      `select 
      R.id_room, R.room_number, R.room_floor, R.facility, RT.room_type, RS.status, RS.color
      from public.room as R 
      inner join public.roomtype as RT on R.id_room_type = RT.id_room_type
      inner join public.roomstatus as RS on R.id_status = RS.id_status
      WHERE id_room = '${id}'
      order by R.id_room asc `
    );
    return response;
  }
  async createRoom(
    id_room_type,
    room_floor,
    id_status,
    numberRoom,
    targetKeys
  ) {
    let idRoom = uuidv4();
    let status = "";
    if (id_status === null || id_status === undefined) {
      status = "024e26c7-5e33-4f35-a88e-e6f5c9322e02";
    } else {
      status = id_status;
    }

    let hasAlreadyField = await client.query(
      `select room_number from public.room where room_number = $1`,
      [numberRoom]
    );
    if (
      hasAlreadyField.rows[0] !== null &&
      hasAlreadyField.rows[0] !== undefined
    ) {
      throw ApiError.BadRequest("Комната с данным номером уже существует");
    }

    await client.query(
      `insert into public.room (id_room_type, room_floor, id_status, room_number, id_room, facility) 
        values ($1, $2, $3, $4, $5, $6)`,
      [id_room_type, room_floor, status, numberRoom, idRoom, targetKeys]
    );
  }
  async editRoom(
    id_room,
    id_room_type,
    room_floor,
    id_status,
    numberRoom,
    targetKeys
  ) {
    await client.query(
      `update public.room set id_room_type = $1, room_floor = $2, room_number = $3, facility = $4 
      where id_room = $5`,
      [id_room_type, room_floor, numberRoom, targetKeys, id_room]
    );
  }

  async editRoomStatus(id_room) {
    await client.query(`
    update public.room set id_status = '024e26c7-5e33-4f35-a88e-e6f5c9322e02' where id_room = $1
    `, [id_room])
  }

  async deleteRoom(id_room) {
    // await client.query(`delete from public.roomandfacility where id_room = $1`, [id_room]);
    await client.query(`delete from public.room where id_room = $1`, [id_room]);
  }
}

export default RoomService;
