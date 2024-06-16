import Router from 'express';
import UserController from '../controller/user.controller.js';
import RoomController from '../controller/room.controller.js';

const userController = new UserController();
const v2Router = new Router();

const roomsController = new RoomController();

v2Router.post('/registration', userController.RegistrateUser)
v2Router.put('/user', userController.Editv2User)
v2Router.post('/filter', roomsController.FilterRoom)

export default v2Router;