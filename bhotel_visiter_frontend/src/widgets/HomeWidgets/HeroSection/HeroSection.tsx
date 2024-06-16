import { trpc } from '@helpers'
import { Button } from 'antd'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import './style.scss'
import { UserContext } from '@contexts'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

	const context = useContext(UserContext)
	const navigate = useNavigate()
	
	const onBooking = () => {
		console.log('booking')

		if (context.isLoggined) {
			navigate('/booking')
		} else {
			navigate('/login')
		}
		
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
