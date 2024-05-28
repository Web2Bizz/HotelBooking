import './main.css'

const Message = (props) => {
	return (
		<>
		<li
			className={
				props.owner === 'USER'
				? 'chat__message-item_user'
				: 'chat__message-item_bot'
			}
			style={{whiteSpace: "pre-line", display: 'block'}}
			>
			<div dangerouslySetInnerHTML={{__html: props.message}}></div>
		</li>
			{(Array.isArray(props.inlineButtons) && props.inlineButtons.length > 0 ? <div>
				{
					props.inlineButtons.map((button, index) => 
						<button key={index}>{button.title}</button>
					)
				}
			</div> : null)}
		</>
	)
}

export default Message
