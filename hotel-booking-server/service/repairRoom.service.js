import client from "../db.js";
import { v4 as uuidv4 } from "uuid";

class RepairRoomService {
  async createRepairApplication(applications) {
    let arrRepairs = [];
    for (let i = 0; i < applications.length; i++) {
      let idRepair = uuidv4();
      arrRepairs.push(idRepair);
      await client.query(
        `
        insert into public.repairroom (id_repair, id_room, name_work, description_work, start_date, end_date)
        values ($1, $2, $3, $4, $5, $6)
      `,
        [
          idRepair,
          applications[i].id_room,
          applications[i].name_work,
          applications[i].description_work,
          applications[i].start_date,
          applications[i].end_date,
        ]
      );
    }
    let previousArrRepairs = await client.query(
      `select id_repair from public.room where id_room = $1`,
      [applications[0].id_room]
    );
    let newMergedArrRepairs = [];
    if (
      previousArrRepairs.rows[0].id_repair === undefined ||
      previousArrRepairs.rows[0].id_repair === null
    ) {
      newMergedArrRepairs = arrRepairs;
    } else {
      newMergedArrRepairs =
        previousArrRepairs.rows[0].id_repair.concat(arrRepairs);
    }
    const response = await client.query(
      `update public.room set id_repair = $1, id_status = 'b4cc08c0-0c4b-4d81-ad4e-475e816d08e6' where id_room = $2`,
      [newMergedArrRepairs, applications[0].id_room]
    );
    return response;
  }
  async editRepairApplication(
    id_repair,
    name_work,
    description_work,
    start_date,
    end_date
  ) {
    const response = await client.query(
      `update public.repairroom  
      set name_work = $1, description_work = $2, start_date = $3, end_date = $4 
      where id_repair = $5`,
      [name_work, description_work, start_date, end_date, id_repair]
    );
    return response;
  }
  async editRepairApplicationStatus(id_repair, id_status_repair) {
    const response = await client.query(
      `update public.repairroom  
      set id_status_repair = $1 where id_repair = $2`,
      [id_status_repair, id_repair]
    );
    return response;
  }
  async getRepairApplications() {
    const response = await client.query(`
    select 
    RR.id_repair, RR.name_work, RR.description_work, RR.start_date, RR.end_date, 
    R.room_number, R.id_room, SR.status_repair, SR.color
    from repairroom as RR
    inner join room as R on RR.id_room = R.id_room
    inner join statusrepair as SR on RR.id_status_repair = SR.id_status_repair
    `);
    return response;
  }
  async getRepairApplicationById(id_repair) {
    const response = await client.query(
      `
    select 
    RR.id_repair, RR.name_work, RR.description_work, RR.start_date, RR.end_date, 
    R.room_number, SR.status_repair, SR.color
    from repairroom as RR
    inner join room as R on RR.id_room = R.id_room
    inner join statusrepair as SR on RR.id_status_repair = SR.id_status_repair
    where RR.id_repair = id_repair
    `,
      [id_repair]
    );
    return response;
  }
  async deleteRepairApplication(id_repair) {
    await client.query(`delete from public.repairroom where id_repair = $1`, [
      id_repair,
    ]);
  }
}

export default RepairRoomService;
