import { io, Socket } from 'socket.io-client'
import { RequestItem } from './RequestItem'
import { useEffect, useRef, useState } from 'react'
import { TRoom } from '@types'

export const RequestList = () => {
	const socketIoRef = useRef<Socket>()
	const [rooms, setRooms] = useState<Array<TRoom>>([])

	useEffect(() => {
		socketIoRef.current = io(import.meta.env.VITE_APP_SOCKET_DOMAIN)

		fetch(`${import.meta.env.VITE_APP_SOCKET_DOMAIN}/rooms`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result)
				setRooms(result)
			})

		if (socketIoRef.current === null) return
	}, [])

	return (
		<div className='request__list'>
			{rooms.map((item, index) => (
				<RequestItem
					date={new Date(Date.parse(item.date_of_creating))}
					{...item}
					key={index}
				/>
			))}
		</div>
	)
}
