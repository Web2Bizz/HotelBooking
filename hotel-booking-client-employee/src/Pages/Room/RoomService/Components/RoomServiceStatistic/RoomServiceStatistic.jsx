import './../../RoomService.scss'
import { Progress } from 'antd'

const RoomServiceStatistic = ({ data }) => {
	return (
		<>
			<div className='d-flex statistic-container'>
				<div className='statistic-block'>
					<p style={{ fontSize: '2vh' }}>Занятость номеров</p>
					<div className='statistic-progress'>
						<div>
							<p>Свободен</p>
							<Progress percent={data?.free_percentage} />
						</div>
						<div>
							<p>Занят</p>
							<Progress percent={data?.busy_percentage} />
						</div>
						<div>
							<p>Ремонт</p>
							<Progress percent={data?.repair_percentage} />
						</div>
					</div>
				</div>
				<div className='statistic-block'>
					<p style={{ fontSize: '2vh' }}>Статус уборки</p>
					<div className='statistic-progress'>
						<div>
							<p>Грязно</p>
							<Progress percent={data?.dirty_percentage} />
						</div>
						<div>
							<p>Убрано</p>
							<Progress percent={data?.cleaned_percentage} />
						</div>
						<div>
							<p>Проверяется</p>
							<Progress percent={data?.checked_percentage} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RoomServiceStatistic
