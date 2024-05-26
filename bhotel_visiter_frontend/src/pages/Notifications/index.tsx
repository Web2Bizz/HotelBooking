import { Container, ProfileCard } from '@widgets'
import { useEffect, useState } from 'react'
import './style.scss'
import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

type TNotification = {
	id: string
	title: string
	content: string
	date: Date
	isReaded: boolean
}

const NotificationItem = (props: TNotification) => {
	const { id, title, content, date, isReaded } = props

	return (
		<div className='notification'>
			<p className='notification__title'>{title}</p>
			<p className='notification__content'>{content}</p>
			<div className='notification__status'>
				{isReaded ? (
					<span>Прочитано</span>
				) : (
					<Button>
						<CheckOutlined />
					</Button>
				)}
			</div>
			<p className='notification__date'></p>
		</div>
	)
}

const NotificationList = () => {
	const [notifications, setNotifications] = useState<Array<TNotification>>([])

	useEffect(() => {
		setNotifications([
			{
				id: '0',
				title: 'Уведомление о бронировании',
				content: 'Оставте отзыв о вашем проживании в номере',
				date: new Date(Date.now()),
				isReaded: false
			},
			{
				id: '0',
				title: 'Уведомление о бронировании',
				content: 'Бронирование подтверждено, Ваш номер 34',
				date: new Date(Date.now()),
				isReaded: !false
			},
			{
				id: '1',
				title: 'Добавлен новый способ оплаты',
				content: 'Добавлена оплата картой МИР',
				date: new Date(Date.now()),
				isReaded: !false
			}
		])
	}, [])

	return notifications.length > 0 ? (
		<div className='notifications'>
			{notifications.map((notify) => (
				<NotificationItem {...notify} />
			))}
		</div>
	) : (
		<p>Уведомлений нет</p>
	)
}

const NotificationsPage = () => {
	return (
		<div style={{ paddingTop: 10 }}>
			<Container>
				<div style={{ display: 'flex', gap: 20, width: '100%' }}>
					<div>
						<ProfileCard />
					</div>
					<div style={{ width: '100%' }}>
						<p style={{ fontSize: 24, marginBottom: 20 }}>Уведомления</p>
						<NotificationList />
					</div>
				</div>
			</Container>
		</div>
	)
}

export default NotificationsPage
