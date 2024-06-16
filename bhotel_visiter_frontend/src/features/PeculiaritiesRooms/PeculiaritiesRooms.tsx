import './style.scss'

type PeculiaritiesRoomsProps = {
	items: Array<string>
}

const PeculiaritiesRooms: React.FC<PeculiaritiesRoomsProps> = ({ items }) => {
	return items && (
		<div className='PeculiaritiesRooms-container'>
			<p>Удобства:</p>
			<ul className='PeculiaritiesRooms-custom-list'>
				{items.map((item, index) => (
					<li key={index} className='PeculiaritiesRooms-custom-list-item'>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}

export default PeculiaritiesRooms
