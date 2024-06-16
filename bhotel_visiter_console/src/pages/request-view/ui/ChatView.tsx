import { TMessage } from '@types'
import './style.css'
import { useLayoutEffect, useRef } from 'react'

type TChatViewProps = {
	messages: Array<TMessage>
}

export const ChatView = (props: TChatViewProps) => {
	const { messages } = props

	const messagesRef = useRef<HTMLUListElement>(null)

	useLayoutEffect(() => {
		if (messagesRef.current === null) return
			
		messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
	}, [messages.length])

	return (
		<ul ref={messagesRef} className='chat-list'>
			{messages.map((message, item) => (
				<li key={item}>
					<div className='chat-list__item'>
						<div className='chat-list__item-text'>{message.message}</div>
					</div>
				</li>
			))}
		</ul>
	)
}
