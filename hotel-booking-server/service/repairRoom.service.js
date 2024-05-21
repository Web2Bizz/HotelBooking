import client from '../db.js'
import { v4 as uuidv4 } from 'uuid'

class RepairRoomService {
	async createRepairApplication(applications) {
		let arrRepairs = []
		for (let i = 0; i < applications.length; i++) {
			let idRepair = uuidv4()
			arrRepairs.push(idRepair)
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
					applications[i].end_date
				]
			)
		}
		let previousArrRepairs = await client.query(`select id_repair from public.room where id_room = $1`, [
			applications[0].id_room
		])
		let newMergedArrRepairs = []
		if (previousArrRepairs.rows[0].id_repair === undefined || previousArrRepairs.rows[0].id_repair === null) {
			newMergedArrRepairs = arrRepairs
		} else {
			newMergedArrRepairs = previousArrRepairs.rows[0].id_repair.concat(arrRepairs)
		}
		const response = await client.query(`update public.room set id_repair = $1 where id_room = $2`, [
			newMergedArrRepairs,
			applications[0].id_room
		])
		for (let i = 0; i < applications.length; i++) {
			if (applications[i].closeroom === true) {
				await client.query(
					`
        update public.room set id_status = 'b4cc08c0-0c4b-4d81-ad4e-475e816d08e6' 
        where id_room = $1`,
					[applications[0].id_room]
				)
			}
		}
		return response
	}
	async editRepairApplication(applications) {
		const previousCountApplications = client.query(
			`
    select count(*) from repairroom where id_room = $1`,
			[applications[0].id_room]
		)
		// for (let i = 0; i < applications.length; i++) {
		//   let editedApplication = applications[i];
		//   let idRepair = editedApplication.id_repair;
		//   await client.query(
		//       `
		//         update public.repairroom
		//         set id_room = $1,
		//             name_work = $2,
		//             description_work = $3,
		//             start_date = $4,
		//             end_date = $5
		//         where id_repair = $6
		//       `,
		//       [
		//         editedApplication.id_room,
		//         editedApplication.name_work,
		//         editedApplication.description_work,
		//         editedApplication.start_date,
		//         editedApplication.end_date,
		//         idRepair
		//       ]
		//   );
		// }
	}
	async editRepairApplicationStatus(id_repair, id_status_repair) {
		const response = await client.query(
			`update public.repairroom  
      set id_status_repair = $1 where id_repair = $2`,
			[id_status_repair, id_repair]
		)
		console.log(id_repair)
		return response
	}
	async getRepairApplications() {
		const response = await client.query(`
    select 
    RR.id_repair, RR.name_work, RR.description_work, RR.start_date, RR.end_date, 
    RR.closeroom, R.room_number, R.id_room, SR.status_repair, SR.color, SR.id_status_repair
    from repairroom as RR
    inner join room as R on RR.id_room = R.id_room
    inner join statusrepair as SR on RR.id_status_repair = SR.id_status_repair
    order by RR.id_repair asc
    `)
		return response
	}
	async getRepairApplicationsStatistic() {
		const response = await client.query(`
    SELECT
  (SELECT COUNT(*)
   FROM public.repairroom
   WHERE id_status_repair = '4b89fc86-1dba-4459-9c78-f4cad967cd70') AS new,
   (SELECT COUNT(*)
   FROM public.repairroom
   WHERE id_status_repair = 'dce20919-ca67-483c-81d8-262d133311a6') AS inProccess,
   (SELECT COUNT(*)
   FROM public.repairroom
   WHERE id_status_repair = '68f08224-fc5a-4f75-8e4d-12c0279f2527') AS done;
    `)
		return response
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
		)
		return response
	}
	async deleteRepairApplication(id_repair) {
		//Получаем id номера
		const idRoom = await client.query(`SELECT id_room FROM public.repairroom WHERE id_repair = $1`, [id_repair])
		//Получаем все работы этого номера
		const applications = await client.query(`SELECT id_repair FROM public.room WHERE id_room = $1`, [
			idRoom.rows[0].id_room
		])
		if (Array.isArray(applications.rows[0].id_repair)) {
			// Удаление id_repair из массива, если он является массивом
			let newArray = applications.rows[0].id_repair.filter((item) => item !== id_repair)
			// Обновление записи в базе данных
			await client.query(`UPDATE public.room SET id_repair = $1 WHERE id_room = $2`, [newArray, idRoom.rows[0].id_room])
			await client.query(`delete from public.repairroom where id_repair = $1`, [id_repair])
		}
	}
}

export default RepairRoomService
