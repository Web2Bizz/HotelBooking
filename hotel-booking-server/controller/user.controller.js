import UserService from '../service/user.service.js'
import ApiError from '../exceptions/api-error.js'

const userService = new UserService()

class UserController {
	async Login(req, res, next) {
		try {
			const { login, password } = req.body
			const response = await userService.login(login, password)
			return res.json(response.rows)
		} catch (e) {
			next(e)
		}
	}
	async GetUsers(req, res, next) {
		try {
			const response = await userService.getUsers()
			return res.json(response.rows)
		} catch (e) {
			next(e)
		}
	}
	async CreateUser(req, res, next) {
		try {
			const { login, email, password } = req.body
			await userService.createUser(login, email, password)
			return res.json('success')
		} catch (e) {
			next(e)
		}
	}
	async RegistrateUser(req, res, next) {
		try {
			const { login, email, password, name, surname, fatherName } = req.body
			await userService.registrate(
				name,
				surname,
				fatherName,
				login,
				email,
				password
			)
			return res.json('success')
		} catch (e) {
			next(e)
		}
	}

	async Editv2User(req, res, next) {
		try {
			const {
				id_user,
				login,
				password,
				email,
				birthday,
				name,
				surname,
				father_name,
				phone
			} = req.body.id_user
			await userService.editV2User(
				id_user,
				login,
				password,
				email,
				birthday,
				name,
				surname,
				father_name,
				phone
			)
			return res.json('Пользователь изменен')
		} catch (e) {
			next(e)
		}
	}

	async EditUser(req, res, next) {
		try {
			const { id_user, login, password, role, email } = req.body.id_user
			await userService.editUser(id_user, login, password, role, email)
			return res.json('Пользователь изменен')
		} catch (e) {
			next(e)
		}
	}
	async DeleteUser(req, res, next) {
		try {
			const { id } = req.params
			await userService.deleteUser(id)
			return res.json('Пользователь удален')
		} catch (e) {
			next(e)
		}
	}
}

export default UserController
