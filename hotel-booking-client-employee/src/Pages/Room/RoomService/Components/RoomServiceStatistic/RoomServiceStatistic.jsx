import './../../RoomService.scss'
import { Progress } from 'antd'

const RoomServiceStatistic = () => {
	return (
		<>
			<div className='d-flex statistic-container'>
				<div className='statistic-block'>
					<p style={{ fontSize: '2vh' }}>Занятость номеров</p>
					<div className='statistic-progress'>
						<div>
							<p>Свободен (100%)</p>
							<Progress percent={100} />
						</div>
						<div>
							<p>Занят (50%)</p>
							<Progress percent={50} />
						</div>
						<div>
							<p>Ремонт (0%)</p>
							<Progress percent={0} />
						</div>
					</div>
				</div>
				<div className='statistic-block'>
					<p style={{ fontSize: '2vh' }}>Статус уборки</p>
					<div className='statistic-progress'>
						<div>
							<p>Грязно</p>
							<Progress percent={100} />
						</div>
						<div>
							<p>Убрано</p>
							<Progress percent={0} />
						</div>
						<div>
							<p>Проверено</p>
							<Progress percent={0} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RoomServiceStatistic
