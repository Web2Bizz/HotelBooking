import { trpc } from '@helpers'
import './style.scss'
import y from './cover.png'

const IntroSection = () => {
	const data = trpc.getHotelProperties.useQuery().data

	return (
		Array.isArray(data) &&
		data[0] !== undefined && (
			<div className='IntroSection-wrapper'>
				<div className='IntroSection-container'>
					<div className='IntroSection-img'>
						<img height={700} style={{ backgroundPositionX: 1000 }} src={y} alt='intro-img' />
					</div>
					<div className='IntroSection-text'>
						<h1>Добро пожаловать в {data[0].hotel_name}</h1>
						<div>
							<p>
								Отель «Три сосны» расположен в живописном городе Димитровград, предлагая своим гостям комфортное
								проживание и качественный сервис.
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default IntroSection
