// import { useState } from 'react'
import { RequestItem } from './RequestItem'

// type TRequestItem = {
// 	id: string
// 	user: {
// 		id: string
// 		name: string
// 		surname: string
// 		patronymic: string
// 	}
// 	date: string
// 	theme: string
// 	status: string
// }

export const RequestList = () => {
	// const [requests, setRequests] = useState<Array<TRequestItem>>([])

	return (
		<div className='request__list'>
			<RequestItem />
			<RequestItem />
			<RequestItem />
			<RequestItem />
			<RequestItem />
			<RequestItem />
			<RequestItem />
			<RequestItem />
			<RequestItem />
		</div>
	)
}
