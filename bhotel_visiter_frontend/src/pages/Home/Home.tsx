import { trpc } from '@helpers'
import {
	HeroSection,
	PopularRooms,
	IntroSection,
	SalesSection,
	ServiceSection,
	FAQSection,
	ListOfRoomsSection,
	Header,
	Footer
} from '../../widgets'
import { useContext, useEffect, useState } from 'react'
import './style.scss'
import AppContext from 'antd/es/app/context'
import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

interface IMainPageFormData {
	cover_type: string
	display_discount: boolean
	display_booking: boolean
	display_popular: boolean
	display_faq: boolean
}

interface IFormHeaderSettings {
	display_logo: boolean
	display_label: boolean
	display_search: boolean
	display_booking: boolean
	display_details: boolean
	background_color: string
}

const Home = () => {
	const [getMainPageSettings] = trpc.useQueries((t) => [t.getFrontendMainPage('67342c88-fd1e-425b-99b1-3cdc427b914a')])

	const [data, setData] = useState<IMainPageFormData>()
	const [mainPageSettings, setMainPageSettings] = useState()

	useEffect(() => {
		setData(getMainPageSettings.data as IMainPageFormData)
		setMainPageSettings(getMainPageSettings.data)
	}, [getMainPageSettings.data])

	const [getHeaderSettings] = trpc.useQueries((t) => [t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')])
	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()
	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	const hotelData = useContext(AppContext)

	const [chatIsOpen, setChatIsOpen] = useState<boolean>(false)

	return (
		<div>
			<Header />
			<HeroSection />
			<div
				style={{
					margin: '100px 250px',
					display: 'flex',
					flexDirection: 'column',
					gap: '150px'
				}}
			>
				{data?.display_popular && <PopularRooms />}
				<IntroSection />
				{data?.display_discount && <SalesSection />}
				{/* <ServiceSection /> */}
				{data?.display_faq && <FAQSection />}
				<ListOfRoomsSection />
				<div className='chat'>
					{chatIsOpen && (
						<div className='chat-view'>
							<div className='chat-title'>Чат поддержки</div>
							<ul className='messages'>
								<li className='chat-my'>
									<span style={{ backgroundColor: headerData.background_color }}>
										Здравствуйте, хочу узнать, есть ли у вас скидка по поводу дня рождения?
									</span>
								</li>
								<li className='chat-bot'>
									<span>Здравствуйте! Николай, да у нас имеется возможность скидки по случаю дня рождения</span>
								</li>
								<li className='chat-my'>
									<span style={{ backgroundColor: headerData.background_color }}>Спасибо!</span>
								</li>
								<li className='chat-bot'>
									<span>Всего хорошего</span>
								</li>
							</ul>
							<div className='chat-form'>
								<Input placeholder='Введите сообщение' />
								<Button>
									<SendOutlined />
								</Button>
							</div>
						</div>
					)}
					<div
						onClick={() => setChatIsOpen((prev) => !prev)}
						className='button'
						style={{ backgroundColor: headerData?.background_color }}
					>
						{!chatIsOpen ? <MessageOutlined /> : <CloseOutlined />}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Home
