import { Button } from 'antd'
import { trpc } from '@helpers'
import './style.scss'
import { useEffect } from 'react'

const HeroSection = () => {
	const onBooking = () => {
		console.log('booking')
	}

	const data = trpc.publicRouter.siteDataRouter.getName.useQuery().data

	console.log(data)

	return (
		<div className='HeroSection-wrapper'>
			<div className='HeroSection-container'>
				<div>
					<h1>Три сосны</h1>
					<p>Крутая фраза чтобы привлечь аудиторию</p>
				</div>
				<div>
					<Button onClick={onBooking}>Забронировать номер</Button>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
