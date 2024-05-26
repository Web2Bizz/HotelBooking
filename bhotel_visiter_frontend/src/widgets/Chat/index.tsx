import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { trpc } from '@helpers'
import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'

interface IFormHeaderSettings {
	display_logo: boolean
	display_label: boolean
	display_search: boolean
	display_booking: boolean
	display_details: boolean
	background_color: string
}

const Chat = () => {
	const [chatIsOpen, setChatIsOpen] = useState<boolean>(false)

	const [getHeaderSettings] = trpc.useQueries((t) => [t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')])

	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()
	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	return (
		<div className='chat'>
			{chatIsOpen && (
				<div className='chat-view'>
					<div className='chat-title'>Чат поддержки</div>
					<ul className='messages'>
						<li className='chat-my'>
							<span style={{ backgroundColor: headerData.background_color }}>
								Здравствуйте, хочу узнать, есть ли у вас скидка по поводу дня рождения?
							</span>
						</li>
						<li className='chat-bot'>
							<span>Здравствуйте! Николай, да у нас имеется возможность скидки по случаю дня рождения</span>
						</li>
						<li className='chat-my'>
							<span style={{ backgroundColor: headerData.background_color }}>Спасибо!</span>
						</li>
						<li className='chat-bot'>
							<span>Всего хорошего</span>
						</li>
					</ul>
					<div className='chat-form'>
						<Input placeholder='Введите сообщение' />
						<Button>
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
}

export default Chat
