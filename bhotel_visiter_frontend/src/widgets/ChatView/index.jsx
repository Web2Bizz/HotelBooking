import ChatContext from '@app/context'
import { useContext, useLayoutEffect, useRef } from 'react'
import Message from '../Message'
import './main.css'

const ChatView = (props) => {
	const messagesRef = useRef(null)
	const chatContext = useContext(ChatContext)
	const { socket } = props

	useLayoutEffect(() => {
		if (chatContext.buttonsHeight > 0) {
			messagesRef.current.style.height = `${
				messagesRef.current.clientHeight - chatContext.buttonsHeight
			}px`
		} else {
			messagesRef.current.style.height = `calc(100svh - 50px - 25px * 2 - 104px - 20px * 2 - 30px)`
		}
	}, [chatContext.buttonsHeight])

	useLayoutEffect(() => {
		if (messagesRef.current === null) return

		messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
	}, [chatContext])

	const isEmptyMessageBox =
		Array.isArray(chatContext.chat.chat.messages) &&
		chatContext.chat.chat.messages.length < 1

	const sendHelloMessage = () => {
		if (socket === undefined || socket === null) return

		socket.current.emit('chat message', {
			owner: 'USER',
			message: 'Привет'
		})
	}

	const getStartedMessage = isEmptyMessageBox ? (
		<li className="chat__message_get-started">
			<p>
				Введите <span onClick={sendHelloMessage}>Привет</span> чтобы приступить к диалогу
			</p>
		</li>
	) : null

	return (
		<ul ref={messagesRef} className="chat__message">
			{getStartedMessage}
			{Array.isArray(chatContext.chat.chat.messages) &&
				chatContext.chat.chat.messages !== undefined &&
				chatContext.chat.chat.messages.map((message, index) => (
					<Message
						key={index}
						owner={message.owner}
						message={message.message}
						inlineButtons={message.inlineButtons}
					/>
				))}
		</ul>
	)
}

export default ChatView
