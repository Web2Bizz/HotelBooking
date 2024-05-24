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
import { useEffect, useState } from 'react'

interface IMainPageFormData {
	cover_type: string
	display_discount: boolean
	display_booking: boolean
	display_popular: boolean
	display_faq: boolean
}

const Home = () => {
	const [getMainPageSettings] = trpc.useQueries((t) => [t.getFrontendMainPage('67342c88-fd1e-425b-99b1-3cdc427b914a')])

	const [data, setData] = useState<IMainPageFormData>()
	const [mainPageSettings, setMainPageSettings] = useState()

	useEffect(() => {
		setData(getMainPageSettings.data as IMainPageFormData)
		setMainPageSettings(getMainPageSettings.data)
	}, [getMainPageSettings.data])

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
		</div>
	)
}

export default Home
