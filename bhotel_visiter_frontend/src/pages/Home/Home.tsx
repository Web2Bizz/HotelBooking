import { trpc } from '@helpers'
import { Chat } from '@widgets'
import { useEffect, useState } from 'react'
import {
	FAQSection,
	Footer,
	Header,
	HeroSection,
	IntroSection,
	ListOfRoomsSection,
	PopularRooms,
	SalesSection
} from '../../widgets'
import './style.scss'
import { FrontendMainPageConfig } from '../../../../packages/package.trpc-routes/@types'

interface IFormHeaderSettings {
	display_logo: boolean
	display_label: boolean
	display_search: boolean
	display_booking: boolean
	display_details: boolean
	background_color: string
}

const Home = () => {
	const [getMainPageSettings] = trpc.useQueries((t) => [t.getFrontendMainPage()])

	const [data, setData] = useState<FrontendMainPageConfig>()

	useEffect(() => {
		setData(getMainPageSettings.data)
	}, [getMainPageSettings.data])

	const [getHeaderSettings] = trpc.useQueries((t) => [t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')])
	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()
	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

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
			</div>
			<Footer />
			<Chat />
		</div>
	)
}

export default Home
