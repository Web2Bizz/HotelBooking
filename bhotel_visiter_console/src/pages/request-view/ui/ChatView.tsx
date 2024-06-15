import { TMessage } from '@types'
import './style.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ChatView = () => {
	const [messages] = useState<Array<TMessage>>([])
	const { id } = useParams()

	useEffect(() => {
		if (id === undefined || id === null) return

		fetch(`${import.meta.env.VITE_APP_SOCKET_DOMAIN}/messages/${id}`)
	}, [id])

	const messageList = (
		<ul className='chat-list'>
			{messages.map((message, item) => (
				<li key={item}>
					<div className='chat-list__item'>
						<div className='chat-list__item-text'>{message.message}</div>
					</div>
				</li>
			))}
		</ul>
	)

	return messageList
}
