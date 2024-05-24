import { StarFilled } from '@ant-design/icons'
import { Divider, Tag, Typography } from 'antd'
import './style.scss'
import { useNavigate } from 'react-router-dom'

type RoomCardProps = {
	id: string
	facility: Array<string>
}

const RoomCard = (props: RoomCardProps) => {
	const navigate = useNavigate()

	const { Link } = Typography
	const { id, facility } = props

	return (
		<div className='RoomCard-wrapper'>
			<div className='RoomCard-container'>
				<div className='RoomCard-img'>
					<img src='https://placehold.co/268x360' alt='room-img' />
				</div>
				<div className='RoomCard-info'>
					<div className='RoomCard-info__rate'>
						<div>
							<StarFilled />
							<span style={{ marginLeft: 10 }}>4.56</span>
						</div>
					</div>
					<div style={{ marginTop: 15 }} className='RoomCard-info__facility'>
						<p>{facility.slice(0, 4).reduce((acc, current) => acc + ' • ' + current, '')}</p>
					</div>
					<div className='RoomCard-info__price'>
						<div style={{ marginBottom: '10px' }} className='RoomCard-info__price__tag'>
							<Tag>-15%</Tag>
						</div>
						<div>
							<p style={{ fontSize: '30px' }}>31$ / ночь</p>
							<span>31$ / ночь</span>
						</div>
					</div>
					<Divider />
					<Link onClick={() => navigate(`/room/${id}`)} style={{ fontSize: '16px' }}>
						Подробнее
					</Link>
				</div>
			</div>
		</div>
	)
}

export default RoomCard
