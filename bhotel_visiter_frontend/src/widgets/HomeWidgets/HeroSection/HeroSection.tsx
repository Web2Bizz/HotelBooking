import { trpc } from '@helpers'
import { Button } from 'antd'
import './style.scss'

const HeroSection = () => {
	const onBooking = () => {
		console.log('booking')
	}

	const hotelData = trpc.getHotelProperties.useQuery().data
	const [mainPageData] = trpc.useQueries(t => [t.getFrontendMainPage()])

	return (
		Array.isArray(hotelData) &&
		hotelData[0] !== undefined && (
			<div className='HeroSection-wrapper'>
				<div className='HeroSection-container'>
					<div>
						<h1>{hotelData[0].hotel_name}</h1>
						<p>{mainPageData.data.welcome_message}</p>
					</div>
					<div>
						<Button onClick={onBooking}>Забронировать номер</Button>
					</div>
				</div>
			</div>
		)
	)
}

export default HeroSection
