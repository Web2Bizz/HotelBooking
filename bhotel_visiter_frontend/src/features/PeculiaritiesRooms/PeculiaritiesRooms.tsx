import './style.scss'

type ListItem = {
	id: number
	content: string
}

type PeculiaritiesRoomsProps = {
	items: ListItem[]
}

const PeculiaritiesRooms: React.FC<PeculiaritiesRoomsProps> = ({ items }) => {
	return (
		<div className='PeculiaritiesRooms-container'>
			<p>Удобства:</p>
			<ul className='PeculiaritiesRooms-custom-list'>
				{items.map((item) => (
					<li key={item.id} className='PeculiaritiesRooms-custom-list-item'>
						{item.content}
					</li>
				))}
			</ul>
		</div>
	)
}

export default PeculiaritiesRooms
