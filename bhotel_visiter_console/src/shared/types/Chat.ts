export type TMessage = {
	authorId: string
	message: string
	date: Date
}

export type TRequestItem = {
	id: string
	date: Date
	status: string
	title: string
}

export type TRoom = {
	id: string
	user_id: string
	status: string
	date_of_creating: string
	title: string
}