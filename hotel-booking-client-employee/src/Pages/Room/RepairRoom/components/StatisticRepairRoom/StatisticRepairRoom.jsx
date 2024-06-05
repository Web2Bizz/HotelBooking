import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { repairApplicationsStatisticGetAction } from '../../../../../store/actions/repairRoomAction.js'
import '../../style.scss'

export default function StatisticRepairRoom() {
	const { repairApplicationsStatistic, isLoading, success, error } = useSelector((state) => state.repairRoomStore)
	const dispatch = useDispatch()

	console.log(repairApplicationsStatistic)

	useEffect(() => {
		dispatch(repairApplicationsStatisticGetAction())
	}, [])

	useEffect(() => {
		if (error === '' && success === '') return
		dispatch(repairApplicationsStatisticGetAction())
	}, [error, success, isLoading])

	return (
		<>
			<div className='statistic-repair-room-container '>
				<div className='d-f jc-sb ai-c card-statistic statistic-repair-room__new'>
					<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
						<p>{repairApplicationsStatistic[0]?.new}</p>
						<p>Новые заявки</p>
					</div>
					<div>
						<img src='/image/repair-new.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
					</div>
				</div>
				<div className='d-f jc-sb ai-c card-statistic statistic-repair-room__inProgress'>
					<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
						<p>{repairApplicationsStatistic[0]?.inproccess}</p>
						<p>В процессе</p>
					</div>
					<div>
						<img src='/image/repair-inProgress.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
					</div>
				</div>
				<div className='d-f jc-sb ai-c card-statistic statistic-repair-room__complete'>
					<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
						<p>{repairApplicationsStatistic[0]?.done}</p>
						<p>Завершены</p>
					</div>
					<div>
						<img src='/image/repair-complete.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
					</div>
				</div>
			</div>
		</>
	)
}
