import { Button } from 'antd'
import { trpc } from '@helpers'
import './style.scss'
import { useEffect, useState } from 'react'
import { THotelProperties } from 'trpc-package'

const HeroSection = () => {
	const onBooking = () => {
		console.log('booking')
	}
	const data = trpc.getHotelProperties.useQuery().data

	const [properties, setProperties] = useState<any>({})

	useEffect(() => {
		if (data === undefined) return
	}, [])

	return (
		Array.isArray(data) &&
		data[0] !== undefined && (
			<div className='HeroSection-wrapper'>
				<div className='HeroSection-container'>
					<div>
						<h1>{data[0].hotel_name}</h1>
						<p>Добро пожаловать!</p>
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
