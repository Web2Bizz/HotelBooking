import Router from "express";
import RepairRoomController from "../controller/repairRoom.controller.js";

const repairRoomController = new RepairRoomController();
const repairRoomRouter = new Router();

repairRoomRouter.get(
  "/getRepairApplications",
  repairRoomController.GetRepairApplications
);
repairRoomRouter.get(
		"/getRepairApplicationsStatistic",
		repairRoomController.GetRepairApplicationsStatistic
);
repairRoomRouter.get(
  "/getRepairApplicationById/:id",
  repairRoomController.GetRepairApplicationById
);
repairRoomRouter.put(
  "/editRepairApplicationStatus",
  repairRoomController.EditRepairApplicationStatus
);
repairRoomRouter.put(
  "/editRepairApplication",
  repairRoomController.EditRepairApplication
);
repairRoomRouter.post(
  "/createRepairApplication",
  repairRoomController.CreateRepairApplication
);
repairRoomRouter.delete(
  "/deleteRepairApplication/:id",
  repairRoomController.DeleteRepairApplication
);

export default repairRoomRouter;
