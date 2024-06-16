import { UserContext } from '@contexts'
import { useContext, useEffect, useRef, useState } from 'react'
import './style.css'

type TRooms = {
	client_id: string
	id: string
	status: string
	date_of_creating: string
	title: string
}

type TChatListProps = {
	onClick: (id: string) => void
}

export const ChatList = (props: TChatListProps) => {
	const { onClick } = props
	const messagesRef = useRef<HTMLUListElement>(null)
	const [list, setList] = useState<Array<TRooms>>([])
	const context = useContext(UserContext)

	useEffect(() => {
		fetch(
			`${import.meta.env.VITE_APP_SOCKET_DOMAIN}/rooms-user/${context.id_user}`
		)
			.then((response) => response.json())
			.then(setList)
	}, [])

	return (
		<ul className='messages' ref={messagesRef}>
			{list.map((item, index) => (
				<li className='chat-item' key={index} onClick={() => onClick(item.id)}>
					{item.title !== null ? item.title : '(Обращение без темы)'}
				</li>
			))}
		</ul>
	)
}
