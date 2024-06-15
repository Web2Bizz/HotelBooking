import { TMessage } from '@types'
import './style.css'

type TChatViewProps = {
	messages: Array<TMessage>
}

export const ChatView = (props: TChatViewProps) => {
	const { messages } = props

	return (
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
}
