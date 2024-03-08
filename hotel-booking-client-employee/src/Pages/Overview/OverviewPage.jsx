import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Card, Tag } from 'antd'
import { getFullDate, numberWithSpaces, profitThenLastMonth } from '../../services/functionService'
import './OverviewPage.scss'
import ReactECharts from 'echarts-for-react'
import { optionVisitors, optionActivityGuest, optionAvailableRooms } from './optionsCharts'
import QuerysService from '../../services/querysService'

const OverviewPage = () => {
	// #region Вспомогательные переменные
	const [data, setData] = useState({
		revenuePerMonth: [],
		roomInformation: [],
		visitorsInThreeMonths: [],
		howManyArrivedAndHowManyLeft: []
	})
	// #endregion

	// #region UseEffect
	useEffect(() => {
		const querysOverview = async () => {
			let RevenuePerMonth = await QuerysService.getRevenuePerMonth()
			let RoomInformation = await QuerysService.getRoomInformation()
			let VisitorsInThreeMonths = await QuerysService.getVisitorsInThreeMonths()
			let HowManyArrived = await QuerysService.getHowManyArrived()
			let HowManyLeft = await QuerysService.getHowManyLeft()

			setData({
				...data,
				revenuePerMonth: RevenuePerMonth.data[0],
				roomInformation: RoomInformation.data[0],
				visitorsInThreeMonths: VisitorsInThreeMonths.data[0],
				HowManyArrived: HowManyArrived.data,
				HowManyLeft: HowManyLeft.data
			})
		}
		querysOverview()
	}, [])
	// #endregion

	return (
		<>
			<div>
				<div className='overview-day'>
					<p style={{ fontSize: '2vh', paddingBottom: '3vh' }}>{getFullDate(dayjs())}</p>
				</div>
				<div className='overview-card__text'>
					<Card style={{ marginBottom: '3vh' }}>
						<p>Обзор</p>
						<div className='d-f overview-card__overview'>
							<div className='d-f'>
								<div className='d-f' style={{ marginRight: '11vh' }}>
									<div className='d-f ai-c'>
										<img src='image/1.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
									</div>
									<div className='overview-card__overview__text d-f fd-c jc-c' style={{ paddingLeft: '2vh' }}>
										<p>₽{numberWithSpaces(data.revenuePerMonth?.current_month)}</p>
										<p>Выручка за месяц</p>
									</div>
								</div>
								<div className='d-f'>
									<div>
										<img
											src={
												profitThenLastMonth(data.revenuePerMonth?.current_month, data.revenuePerMonth?.last_month) >= 0
													? 'image/plus.png'
													: 'image/minus.png'
											}
											alt='img'
											style={{ width: '20vh' }}
										/>
									</div>
									<div
										className='overview-card__overview__text d-f fd-c jc-c'
										style={{ paddingLeft: '2vh', width: '18vh' }}
									>
										<p
											className={
												profitThenLastMonth(data.revenuePerMonth?.current_month, data.revenuePerMonth?.last_month) >= 0
													? 'plusRevenue'
													: 'negativeRevenue'
											}
										>
											{profitThenLastMonth(data.revenuePerMonth?.current_month, data.revenuePerMonth?.last_month)}%
										</p>
										<p>
											Месячный темп <br /> роста
										</p>
									</div>
								</div>
							</div>
							<div className='d-f jc-sb overview-card__overview__block' style={{ width: '100%', marginLeft: '6vh' }}>
								<div className='d-f jc-sb ai-c' style={{ backgroundColor: '#3B92FF', padding: '2vh' }}>
									<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
										<p>{data.visitorsInThreeMonths?.count_guests}</p>
										<p>Новых гостей</p>
									</div>
									<div>
										<img src='image/2.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
									</div>
								</div>
								<div className='d-f jc-sb ai-c' style={{ backgroundColor: '#5571C9', padding: '2vh' }}>
									<div className='overview-card__overview__block__text' style={{ width: '100%', paddingLeft: '2vh' }}>
										<p>{data.roomInformation?.all_rooms}</p>
										<p>Комнат</p>
									</div>
									<div>
										<img src='image/3.png' alt='img' style={{ width: '8vh', height: '8vh' }} />
									</div>
								</div>
							</div>
						</div>
					</Card>
					<div className='d-f overview-card__room__container'>
						<Card style={{ width: '60%' }}>
							<div className='overview-card__room'>
								<p style={{ marginBottom: '3vh' }}>Статистика комнат</p>
								<div className='d-f jc-sb status-room__text'>
									<div style={{ width: '45%' }}>
										<div className='d-f fd-c status-room__list'>
											<div>
												<p>Свободные комнаты</p>
												<Tag>
													<p>{data.roomInformation?.available_room}</p>
												</Tag>
											</div>
											<div>
												<p>Чистые</p>
												<Tag>
													<p>{data.roomInformation?.count_clear_room_available}</p>
												</Tag>
											</div>
											<div>
												<p>Грязные</p>
												<Tag>
													<p>{data.roomInformation?.count_dirty_room_available}</p>
												</Tag>
											</div>
											<div>
												<p>Проверено</p>
												<Tag>
													<p>{data.roomInformation?.count_wating_room_available}</p>
												</Tag>
											</div>
										</div>
									</div>
									<div style={{ width: '45%' }}>
										<div className='d-f fd-c status-room__list'>
											<div>
												<p>Забронированные комнаты</p>
												<Tag>
													<p>{data.roomInformation?.reserved_room}</p>
												</Tag>
											</div>
											<div>
												<p>Чистые</p>
												<Tag>
													<p>{data.roomInformation?.count_clear_room_reserved}</p>
												</Tag>
											</div>
											<div>
												<p>Грязные</p>
												<Tag>
													<p>{data.roomInformation?.count_dirty_room_reserved}</p>
												</Tag>
											</div>
											<div>
												<p>Проверено</p>
												<Tag>
													<p>{data.roomInformation?.count_wating_room_reserved}</p>
												</Tag>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
						<Card style={{ width: '36%' }}>
							<div className='overview-card__room'>
								<div>
									<p>Посетители</p>
									<ReactECharts
										option={optionVisitors(data.visitorsInThreeMonths)}
										style={{ width: '90%', height: '30vh' }}
									/>
								</div>
							</div>
						</Card>
					</div>
					<div className='d-f overview-card__room__container'>
						<Card style={{ width: '68%', marginBottom: '3vh' }}>
							<div className='overview-card__guests'>
								<p>Активность гостей</p>
								<ReactECharts option={optionActivityGuest(data.HowManyArrived, data.HowManyLeft)} />
							</div>
						</Card>
						<Card style={{ width: '28%', marginBottom: '3vh' }}>
							<div className='overview-card__guests'>
								<p>Свободные комнаты</p>
								<ReactECharts option={optionAvailableRooms(data.roomInformation)} />
							</div>
						</Card>
					</div>
				</div>
			</div>
		</>
	)
}

export default OverviewPage
