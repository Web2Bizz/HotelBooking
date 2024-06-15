import { TMessage } from '@types'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { ChatForm } from './ChatForm'
import { ChatView } from './ChatView'

export const Chat = () => {
	const { id } = useParams()

	const socketIoRef: MutableRefObject<Socket> = useRef<Socket>(
		null
	) as MutableRefObject<Socket>
	const [messages, setMessages] = useState<Array<TMessage>>([])

	useEffect(() => {
		fetch(`${import.meta.env.VITE_APP_SOCKET_DOMAIN}/messages/${id}`)
			.then((response) => response.json())
			.then(setMessages)
			.then(() => {
				socketIoRef.current = io(import.meta.env.VITE_APP_SOCKET_DOMAIN)

				if (socketIoRef.current === null) return

				socketIoRef.current?.on('message', (msg: TMessage) => {
					console.log(JSON.stringify(msg))

					setMessages((prev) => [...prev, msg])
				})
			})

		if (id === undefined || id === null) return
	}, [id])

	return (
		<>
			<ChatView messages={messages} />
			<ChatForm socketRef={socketIoRef} />
		</>
	)
}
