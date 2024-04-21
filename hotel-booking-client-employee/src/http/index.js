import axios from 'axios'

const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.API_URL
})

export default $api
