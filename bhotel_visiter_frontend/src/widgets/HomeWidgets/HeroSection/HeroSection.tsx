import { trpc } from '@helpers'
import { Button } from 'antd'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import './style.scss'

const HeroSection = () => {
	const onBooking = () => {
		console.log('booking')
	}

	const hotelData = trpc.getHotelProperties.useQuery().data
	const [mainPageData] = trpc.useQueries((t) => [t.getFrontendMainPage()])

	return (
		Array.isArray(hotelData) &&
		hotelData[0] !== undefined && (
			<ParallaxProvider>
				<div className='HeroSection-wrapper'>
					<Parallax speed={-10}>
						<div className='HeroSection-container'>
							<div>
								<h1>{hotelData[0].hotel_name}</h1>
								<p>{mainPageData.data.welcome_message}</p>
							</div>
							<div>
								<Button onClick={onBooking}>Забронировать номер</Button>
							</div>
						</div>
					</Parallax>
				</div>
			</ParallaxProvider>
		)
	)
}

export default HeroSection
