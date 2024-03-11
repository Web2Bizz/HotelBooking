import RoomServiceService from "../service/roomService.service.js";

const roomServiceService = new RoomServiceService();

class RoomServiceController {
  async GetRoomForService(req, res, next) {
    try {
      const response = await roomServiceService.getRoomForService();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async GetStatisticServiceRoom(req, res, next) {
    try {
      const response = await roomServiceService.getStatisticServiceRoom();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
  async EditStatusServiceRoom(req, res, next) {
    try {
      const { id_room, id_room_service_status } = req.body;
      await roomServiceService.editStatusServiceRoom(
        id_room,
        id_room_service_status
      );
      return res.json("Статус изменен");
    } catch (e) {
      next(e);
    }
  }
}

export default RoomServiceController;
