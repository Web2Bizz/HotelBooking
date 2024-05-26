import { trpc } from '@helpers'
import './style.scss'

const IntroSection = () => {
	const data = trpc.getHotelProperties.useQuery().data

	return (
		Array.isArray(data) &&
		data[0] !== undefined && (
			<div className='IntroSection-wrapper'>
				<div className='IntroSection-container'>
					<div className='IntroSection-img'>
						<img src='https://placehold.co/555x675' alt='intro-img' />
					</div>
					<div className='IntroSection-text'>
						<h1>Добро пожаловать в {data[0].hotel_name}</h1>
						<div>
							<p>Описание отеля тут должно быть какое-то наверное...</p>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default IntroSection
