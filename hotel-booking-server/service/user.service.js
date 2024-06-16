import client from '../db.js'
import ApiError from '../exceptions/api-error.js'

class UserService {
	async login(login, password) {
		const response = await client.query(
			`select * from public.users where (login = $1 or email = $1) and password = $2`,
			[login, password]
		)
		if (response.rows[0] === null || response.rows[0] === undefined) {
			throw ApiError.BadRequest('Неправильный логин или пароль')
		}
		return response
	}
	async getUsers() {
		const response = await client.query(
			`select * from public.users
      order by public.users.id_user asc `
		)
		return response
	}
	async createUser(login, email, password) {
		let hasAlreadyLogin = await client.query(
			`select login from public.users where login = $1`,
			[login]
		)
		let hasAlreadyEmail = await client.query(
			`select email from public.users where email = $1`,
			[email]
		)
		if (
			hasAlreadyLogin.rows[0] !== null &&
			hasAlreadyLogin.rows[0] !== undefined
		) {
			throw ApiError.BadRequest('Данный логин уже существует')
		}
		if (
			hasAlreadyEmail.rows[0] !== null &&
			hasAlreadyEmail.rows[0] !== undefined
		) {
			throw ApiError.BadRequest('Данная почта уже существует')
		}
		await client.query(
			`insert into public.users (login, email, password) 
        values ($1, $2, $3)`,
			[login, email, password]
		)
	}

	async registrate(name, surname, fatherName, login, email, password) {
		let hasAlreadyLogin = await client.query(
			`select login from public.users where login = $1`,
			[login]
		)
		let hasAlreadyEmail = await client.query(
			`select email from public.users where email = $1`,
			[email]
		)
		if (
			hasAlreadyLogin.rows[0] !== null &&
			hasAlreadyLogin.rows[0] !== undefined
		) {
			throw ApiError.BadRequest('Данный логин уже существует')
		}
		if (
			hasAlreadyEmail.rows[0] !== null &&
			hasAlreadyEmail.rows[0] !== undefined
		) {
			throw ApiError.BadRequest('Данная почта уже существует')
		}
		await client.query(
			`insert into public.users (login, email, password, name, surname, father_name) 
        values ($1, $2, $3, $4, $5, $6)`,
			[login, email, password, name, surname, fatherName]
		)
	}

	async editUser(id_user, login, password, role, email) {
		await client.query(
			`update public.users set login = $1, email = $2, password = $3, role = $4  
      where id_user = $5`,
			[login, email, password, role, id_user]
		)
	}

	async editV2User(id_user, login, password, email, birthday, name, surname, father_name, phone) {
		await client.query(
			`update public.users set 
				login = $2, 
				email = $3, 
				password = $4,
				birthday = $5,
                name = $6,
                surname = $7,
                father_name = $8,
                phone = $9
      		where id_user = $1`,
			[id_user, login, email, password, birthday, name, surname, father_name, phone]
		)
	}

	async deleteUser(id_user) {
		await client.query(`delete from public.users where id_user = $1`, [id_user])
	}
}

export default UserService
