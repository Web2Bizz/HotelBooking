import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { trpc } from '@helpers'
import { Button, Input, InputRef } from 'antd'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useClickAway } from '@uidotdev/usehooks'
import { ChatView } from './ChatView'
import { UserContext } from '@contexts'

interface IFormHeaderSettings {
	display_logo: boolean
	display_label: boolean
	display_search: boolean
	display_booking: boolean
	display_details: boolean
	background_color: string
}

export type Message = {
	authorId: string
	text: string
	date: Date
}

const Chat = () => {
	const [chatIsOpen, setChatIsOpen] = useState<boolean>(false)
	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()
	const [messages, setMessages] = useState<Array<Message>>([])
	const [getHeaderSettings] = trpc.useQueries((t) => [
		t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')
	])

	const context = useContext(UserContext)

	const socketIoRef = useRef<Socket>()
	const inputMessageRef = useRef<InputRef>(null)
	const ref = useClickAway<HTMLDivElement>(() => {
		setChatIsOpen(false)
	})

	useEffect(() => {
		socketIoRef.current = io(import.meta.env.VITE_APP_SOCKET_DOMAIN)

		if (socketIoRef.current === undefined) return

		socketIoRef.current?.on('message', (msg: Message) => {
			console.log(JSON.stringify(msg))

			setMessages((prev) => [...prev, msg])
		})
	}, [])

	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	const handleSendMessage = () => {
		socketIoRef.current?.emit('message', {
			userId: context.id_user,
			text: inputMessageRef.current.input.value
		})
	}

	return (
		context.isLoggined && (
			<div className='chat' ref={ref}>
				{chatIsOpen && (
					<div className='chat-view'>
						<div className='chat-title'>Чат поддержки</div>
						<ChatView
							messages={messages}
							backgroundColor={headerData.background_color}
							socket={socketIoRef}
						/>
						<div className='chat-form'>
							<Input ref={inputMessageRef} placeholder='Введите сообщение' />
							<Button onClick={() => handleSendMessage()}>
								<SendOutlined />
							</Button>
						</div>
					</div>
				)}
				<div
					onClick={() => setChatIsOpen((prev) => !prev)}
					className='button'
					style={{ backgroundColor: headerData?.background_color }}
				>
					{!chatIsOpen ? <MessageOutlined /> : <CloseOutlined />}
				</div>
			</div>
		)
	)
}

export default Chat
