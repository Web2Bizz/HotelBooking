export type TMessage = {
    text: string
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