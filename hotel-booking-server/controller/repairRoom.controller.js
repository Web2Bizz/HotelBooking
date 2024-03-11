import RepairRoomService from "../service/repairRoom.service.js";

const repairRoomService = new RepairRoomService();

class RepairRoomController {
  async CreateRepairApplication(req, res, next) {
    try {
      const { applications } = req.body;
      await repairRoomService.createRepairApplication(applications);
      return res.json("Заявки оставлены");
    } catch (e) {
      next(e);
    }
  }
  async EditRepairApplication(req, res, next) {
    try {
      const { id_repair, name_work, description_work, start_date, end_date } =
        req.body;
      await repairRoomService.editRepairApplication(
        id_repair,
        name_work,
        description_work,
        start_date,
        end_date
      );
      return res.json("Заявка изменена");
    } catch (e) {
      next(e);
    }
  }
  async EditRepairApplicationStatus(req, res, next) {
    try {
      const { id_repair, id_status_repair } = req.body;
      await repairRoomService.editRepairApplicationStatus(
        id_repair,
        id_status_repair
      );
      return res.json("Cтатус изменен");
    } catch (e) {
      next(e);
    }
  }
  async GetRepairApplications(req, res, next) {
    try {
      const response = await repairRoomService.getRepairApplications();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async GetRepairApplicationById(req, res, next) {
    try {
      const { id_room } = req.params;
      const response = await repairRoomService.getRepairApplicationById(
        id_room
      );
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async DeleteRepairApplication(req, res, next) {
    try {
      const { id_repair } = req.params;
      await repairRoomService.deleteRepairApplication(id_repair);
      return res.json("Заявка удалена");
    } catch (e) {
      next(e);
    }
  }
}

export default RepairRoomController;
