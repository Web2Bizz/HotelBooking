import Router from 'express';
import UserController from '../controller/user.controller.js';

const userController = new UserController();
const v2Router = new Router();

v2Router.post('/registration', userController.RegistrateUser)
v2Router.put('/user', userController.Editv2User)

export default v2Router;