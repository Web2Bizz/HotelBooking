import { CSSProperties, useContext, useEffect, useState } from 'react'
import { Avatar, Button } from 'antd'
import { AppContext } from './../../app/contexts'
import { trpc } from '@helpers'
import { IFormHeaderSettings } from '../Header/Header'
import './style.scss'
import { Container } from '@widgets'

interface IFormFooterSettings {
	display_logo: boolean
	display_label: boolean
	display_social_block: boolean
	background_color: string
	display_vk: boolean
	vk_link: string
	display_dzen: boolean
	dzen_link: string
	display_telegram: boolean
	telegram_link: string
	display_youtube: boolean
	youtube_link: string
}

const Footer = () => {
	const onSubscribe = () => {
		console.log('onSubscribe')
	}

	const hotelData = useContext(AppContext)

	const [getFooterSettings, getHeaderSettings] = trpc.useQueries((t) => [
		t.getFrontendFooter(),
		t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')
	])

	const [footerData, setFooterData] = useState<IFormFooterSettings>()
	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()

	useEffect(() => {
		setFooterData(getFooterSettings.data as IFormFooterSettings)
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getFooterSettings.data])

	return (
		Array.isArray(hotelData) &&
		footerData && (
			<div className='Footer-wrapper' style={{ backgroundColor: `#${footerData.background_color}` }}>
				<Container>
					<div className='Footer-logo'>
						{footerData.display_logo && <Avatar shape='square' size={90} src={hotelData[0].hotel_logo} />}
						{footerData.display_label && <p>{hotelData[0].hotel_name}</p>}
					</div>
					<div className='Footer-links'>
						<div style={{ marginRight: '150px' }}>
							<p>Компания</p>
							<a href=''>О нас</a>
							<a href=''>Контакты</a>
							{/* <a href=''>Обработка персональных данных</a> */}
							<a href=''>Документы</a>
						</div>
						<div style={{ marginRight: '180px' }}>
							<p>Услуги</p>
							<a href=''>Бронирование</a>
							<a href=''>Отказ от брони</a>
						</div>
						{footerData.display_social_block && (
							<div style={{ marginRight: '125px' }}>
								<p>Мы в соц. сетях</p>
								{footerData.display_vk && (
									<a target='_blank' href={`https://vk.com/${footerData.vk_link}`}>
										<i className='fi fi-brands-vk'></i>
										<span>ВКонтакте</span>
									</a>
								)}
								{footerData.display_telegram && (
									<a target='_blank' href={`https://t.me/${footerData.telegram_link}`}>
										<i className='fi fi-brands-telegram'></i>
										<span>Телеграм</span>
									</a>
								)}
								{footerData.display_dzen && (
									<a target='_blank' href={`https://dzen.ru/${footerData.dzen_link}`}>
										<i className='fi fi-brands-yandex'></i>
										<span>Дзен</span>
									</a>
								)}
								{footerData.display_youtube && (
									<a target='_blank' href={`https://youtube.com/${footerData.youtube_link}`}>
										<i className='fi fi-brands-youtube'></i>
										<span>YouTube</span>
									</a>
								)}
							</div>
						)}
						<div className='Footer-button'>
							<p>Рассылка</p>
							<span>
								Подписываясь на рассылку, я даю согласие на обработку персональных данных и на получение рекламных
								сообщений и новостей о товарах и услугах.
							</span>
							<Button type='primary' onClick={onSubscribe} style={{ backgroundColor: headerData.background_color }}>
								Подписаться
							</Button>
						</div>
					</div>
					<div className='Footer-copyright'>
						<p>2024 © ООО «{hotelData[0].hotel_name}». Все права защищены</p>
					</div>
				</Container>
			</div>
		)
	)
}

export default Footer
