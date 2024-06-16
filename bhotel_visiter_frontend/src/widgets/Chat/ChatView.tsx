import { LegacyRef, useLayoutEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'
import { Message } from '.'

type TChatViewProps = {
	messages: Array<Message>
	backgroundColor: string
	socket: LegacyRef<Socket>
	currentUserId: string
}

export const ChatView = (props: TChatViewProps) => {
	const { messages, backgroundColor, currentUserId } = props

	const messagesRef = useRef<HTMLUListElement>(null)

	useLayoutEffect(() => {
		messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
	}, [messages.length])

	return (
		<ul className='messages' ref={messagesRef}>
			{messages.map((message, index) =>
				currentUserId === message.author_id ? (
					<li className={'chat-my'} key={index}>
						<span style={{ backgroundColor: backgroundColor }}>
							{message.message}
						</span>
					</li>
				) : (
					<li className={'chat-bot'} key={index}>
						<span>{message.message}</span>
					</li>
				)
			)}
			{/* <li className='chat-my'>
								<span style={{ backgroundColor: headerData.background_color }}>
									Здравствуйте, хочу узнать, есть ли у вас скидка по поводу дня
									рождения?
								</span>
							</li>
							<li className='chat-bot'>
								<span>
									Здравствуйте! Николай, да у нас имеется возможность скидки по
									случаю дня рождения
								</span>
							</li>
							<li className='chat-my'>
								<span style={{ backgroundColor: headerData.background_color }}>
									Спасибо!
								</span>
							</li>
							<li className='chat-bot'>
								<span>Всего хорошего</span>
							</li> */}
		</ul>
	)
}
