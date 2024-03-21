import '../../style.scss'

export default function StatisticRepairRoom() {
	return (
		<>
			<div className='statistic-repair-room-container '>
				<div className='d-f jc-sb ai-c card-statistic statistic-repair-room__new'>
					<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
						<p>32</p>
						<p>Новые заявки</p>
					</div>
					<div>
						<img src='image/repair-new.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
					</div>
				</div>
				<div className='d-f jc-sb ai-c card-statistic statistic-repair-room__inProgress'>
					<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
						<p>1</p>
						<p>В процессе</p>
					</div>
					<div>
						<img src='image/repair-inProgress.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
					</div>
				</div>
				<div className='d-f jc-sb ai-c card-statistic statistic-repair-room__complete'>
					<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
						<p>4</p>
						<p>Завершены</p>
					</div>
					<div>
						<img src='image/repair-complete.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
					</div>
				</div>
			</div>
		</>
	)
}
