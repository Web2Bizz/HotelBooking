import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { trpc } from '@helpers'
import { Button, Form, FormProps, Input, InputRef } from 'antd'
import {
	MutableRefObject,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useClickAway } from '@uidotdev/usehooks'
import { ChatView } from './ChatView'
import { UserContext } from '@contexts'
import { ChatList } from './ChatList'

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
	author_id: string
	message: string
	date: Date
}

type TRequestCreate = {
	title: string
}

type TPage = 'list' | 'chat' | 'create'

const Chat = () => {
	const [chatIsOpen, setChatIsOpen] = useState<boolean>(false)
	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()
	const [messages, setMessages] = useState<Array<Message>>([])
	const [getHeaderSettings] = trpc.useQueries((t) => [
		t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')
	])

	const [page, setPage] = useState<TPage>('list')
	const [currentChat, setCurrentChat] = useState<string | null>(null)

	const context = useContext(UserContext)

	const socketIoRef: MutableRefObject<Socket> = useRef<Socket>(null)
	const inputMessageRef = useRef<InputRef>(null)
	const ref = useClickAway<HTMLDivElement>(() => {
		setChatIsOpen(false)
	})

	useEffect(() => {
		socketIoRef.current = io(import.meta.env.VITE_APP_SOCKET_DOMAIN)
		if (socketIoRef.current === null) return
		socketIoRef.current?.on('message', (msg: Message) => {
			console.log(JSON.stringify(msg))
			setMessages((prev) => [...prev, msg])
		})
	}, [])

	useEffect(() => {
		if (currentChat === null) return

		fetch(`${import.meta.env.VITE_APP_SOCKET_DOMAIN}/messages/${currentChat}`)
			.then((response) => response.json())
			.then(setMessages)
	}, [page])

	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	const handleSendMessage = () => {
		socketIoRef.current?.emit('message', {
			roomId: currentChat,
			userId: context.id_user,
			message: inputMessageRef.current.input.value
		})

		inputMessageRef.current.input.value = ''
	}

	const onFinish: FormProps<TRequestCreate>['onFinish'] = (values) => {
		const payload = {
			userId: context.id_user,
			title: values.title
		}

		socketIoRef.current.emit('create room', payload, (response) => {
			console.log(response);
			setPage('chat')
			setCurrentChat(response.roomId)
		})

		console.log(payload)
	}

	return (
		context.isLoggined && (
			<div className='chat' ref={ref}>
				{chatIsOpen && (
					<div className='chat-view'>
						<div
							className='chat-title'
							onClick={() => {
								setPage('list')
								setMessages([])
							}}
						>
							Чат поддержки
						</div>
						{page === 'list' ? (
							<>
								<ChatList
									onClick={(id) => {
										setCurrentChat(id)
										setPage('chat')
										socketIoRef.current.emit('join room', id)
									}}
								/>
								<div className='chat-form'>
									<Button
										type='default'
										style={{ height: 40, width: '100%', marginTop: 3 }}
										onClick={() => setPage('create')}
									>
										Создать обращение
									</Button>
								</div>
							</>
						) : null}
						{page === 'chat' ? (
							<>
								<ChatView
									currentUserId={context.id_user}
									messages={messages}
									backgroundColor={headerData.background_color}
									socket={socketIoRef}
								/>
								<div className='chat-form'>
									<Input
										ref={inputMessageRef}
										placeholder='Введите сообщение'
									/>
									<Button onClick={handleSendMessage}>
										<SendOutlined />
									</Button>
								</div>
							</>
						) : null}
						{page === 'create' ? (
							<div className='messages'>
								<Form
									name='create-room'
									labelCol={{ span: 40 }}
									style={{ width: '100%' }}
									initialValues={{ remember: true }}
									onFinish={onFinish}
									layout={'vertical'}
									autoComplete='off'
								>
									<Form.Item<TRequestCreate>
										label='Описание проблемы'
										name='title'
										style={{ width: '100%' }}
										rules={[
											{ required: true, message: 'Введите опиание проблемы' }
										]}
									>
										<Input style={{ width: '100%' }} size='large' />
									</Form.Item>
									<Form.Item style={{ width: '100%' }}>
										<Button
											type='primary'
											htmlType='submit'
											style={{ width: '100%', height: 40 }}
										>
											Создать
										</Button>
									</Form.Item>
								</Form>
							</div>
						) : null}
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
