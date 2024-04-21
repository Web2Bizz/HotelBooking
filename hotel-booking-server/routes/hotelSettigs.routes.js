import Router from "express";
import HotelSettingsController from "../controller/hotelSettings.controller.js";
import repairRoomRouter from "./roomRepair.routes.js";

const hotelSettingsController = new HotelSettingsController();
const hotelSettingsRouter = new Router();

hotelSettingsRouter.post(
		"/registrationHotel",
		hotelSettingsController.RegistrationHotel
);
hotelSettingsRouter.put(
		"/editHotelProperties",
		hotelSettingsController.EditHotelProperties
);
hotelSettingsRouter.get(
		"/getHotelProperties",
		hotelSettingsController.GetHotelProperties
);

export default hotelSettingsRouter