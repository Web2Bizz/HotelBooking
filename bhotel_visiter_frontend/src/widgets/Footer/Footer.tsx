import { useContext } from 'react'
import './style.scss'
import { Avatar, Button } from 'antd'
import { AppContext } from './../../app/contexts'

const Footer = () => {
	const onSubscribe = () => {
		console.log('onSubscribe')
	}

	const hotelData = useContext(AppContext)

	return (
		Array.isArray(hotelData) && (
			<div className='Footer-wrapper'>
				<div>
					<div className='Footer-logo'>
						<Avatar shape='square' size={90} src={hotelData[0].hotel_logo} />
						<p>{hotelData[0].hotel_name}</p>
					</div>
					<div className='Footer-links'>
						<div style={{ marginRight: '150px' }}>
							<p>Компания</p>
							<a href=''>О нас</a>
							<a href=''>Контакты</a>
							<a href=''>Обработка персональных данных</a>
							<a href=''>Документы</a>
						</div>
						<div style={{ marginRight: '180px' }}>
							<p>Услуги</p>
							<a href=''>Бронирование</a>
							<a href=''>Отказ от брони</a>
						</div>
						<div style={{ marginRight: '125px' }}>
							<p>Мы в соц. сетях</p>
							<a href=''>ВКонтакте</a>
							<a href=''>Телеграм</a>
							<a href=''>Дзен</a>
							<a href=''>Одноклассники</a>
						</div>
						<div className='Footer-button'>
							<p>Рассылка</p>
							<span>
								Подписываясь на рассылку, я даю согласие на обработку персональных данных и на получение рекламных
								сообщений и новостей о товарах и услугах.
							</span>
							<Button type='primary' onClick={onSubscribe}>
								Подписаться
							</Button>
						</div>
					</div>
					<div className='Footer-copyright'>
						<p>2024 © ООО «Название». Все права защищены</p>
					</div>
				</div>
			</div>
		)
	)
}

export default Footer
