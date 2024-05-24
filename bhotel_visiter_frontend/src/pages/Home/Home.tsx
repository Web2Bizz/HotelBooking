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
	coverType: string
	isDisplayDiscount: boolean
	isDisplayBooking: boolean
	isDisplayPopular: boolean
	isDisplayFAQ: boolean
}

const Home = () => {
	const [getSettings] = trpc.useQueries((t) => [t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')])

	const [data, setData] = useState<IMainPageFormData>()

	useEffect(() => {
		console.log(getSettings.data)

		setData(getSettings.data as IMainPageFormData)
	}, [getSettings.data])

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
				{data?.isDisplayPopular && <PopularRooms />}
				<IntroSection />
				{data?.isDisplayDiscount && <SalesSection />}
				{/* <ServiceSection /> */}
				{data?.isDisplayFAQ && <FAQSection />}
				<ListOfRoomsSection />
			</div>
			<Footer />
		</div>
	)
}

export default Home
