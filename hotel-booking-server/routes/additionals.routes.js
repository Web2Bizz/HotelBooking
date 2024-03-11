import Router from "express";
import AdditionalsController from "../controller/additionals.controller.js";

const additionalsController = new AdditionalsController();
const additionalsRouter = new Router();

additionalsRouter.get("/getStatus", additionalsController.GetStatusRoom);
additionalsRouter.post("/createStatus", additionalsController.CreateStatusRoom);
additionalsRouter.put("/editStatus", additionalsController.EditStatusRoom);
additionalsRouter.delete(
  "/deleteStatus/:id",
  additionalsController.DeleteStatusRoom
);

additionalsRouter.get("/getFacility", additionalsController.GetFacilityRoom);
additionalsRouter.post(
  "/createFacility",
  additionalsController.CreateFacilityRoom
);
additionalsRouter.put("/editFacility", additionalsController.EditFacilityRoom);
additionalsRouter.delete(
  "/deleteFacility/:id",
  additionalsController.DeleteFacilityRoom
);

additionalsRouter.get("/getType", additionalsController.GetTypeRoom);
additionalsRouter.post("/createType", additionalsController.CreateTypeRoom);
additionalsRouter.put("/editType", additionalsController.EditTypeRoom);
additionalsRouter.delete(
  "/deleteType/:id",
  additionalsController.DeleteTypeRoom
);

additionalsRouter.get("/getStatusDeal", additionalsController.GetStatusDeal);
additionalsRouter.post(
  "/createStatusDeal",
  additionalsController.CreateStatusDeal
);
additionalsRouter.put("/editStatusDeal", additionalsController.EditStatusDeal);
additionalsRouter.delete(
  "/deleteStatusDeal/:id",
  additionalsController.DeleteStatusDeal
);

additionalsRouter.get(
  "/getCancelPolicy",
  additionalsController.GetCancelPolicy
);
additionalsRouter.post(
  "/createCancelPolicy",
  additionalsController.CreateCancelPolicy
);
additionalsRouter.put(
  "/editCancelPolicy",
  additionalsController.EditCancelPolicy
);
additionalsRouter.delete(
  "/deleteCancelPolicy/:id",
  additionalsController.DeleteCancelPolicy
);

additionalsRouter.get("/getStatusGuest", additionalsController.GetStatusGuest);
additionalsRouter.get(
  "/getStatusGuestRoom",
  additionalsController.GetStatusGuestRoom
);
additionalsRouter.get(
  "/getRepairStatus",
  additionalsController.GetRepairStatus
);

export default additionalsRouter;
