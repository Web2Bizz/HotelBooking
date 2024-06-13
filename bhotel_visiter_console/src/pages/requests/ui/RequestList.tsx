import { io, Socket } from 'socket.io-client'
import { RequestItem } from './RequestItem'
import { useEffect, useRef } from 'react'

export const RequestList = () => {
	const socketIoRef = useRef<Socket>()

	useEffect(() => {
		socketIoRef.current = io(import.meta.env.VITE_APP_SOCKET_DOMAIN)

		if (socketIoRef.current === null) return
	}, [])

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
