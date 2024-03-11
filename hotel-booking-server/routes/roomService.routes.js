import Router from "express";
import RoomServiceController from "../controller/roomService.controller.js";

const roomServiceController = new RoomServiceController();
const roomServiceRouter = new Router();

roomServiceRouter.get(
  "/getRoomForService",
  roomServiceController.GetRoomForService
);
roomServiceRouter.get(
  "/getStatisticServiceRoom",
  roomServiceController.GetStatisticServiceRoom
);
roomServiceRouter.put(
  "/editStatusServiceRoom",
  roomServiceController.EditStatusServiceRoom
);

export default roomServiceRouter;
