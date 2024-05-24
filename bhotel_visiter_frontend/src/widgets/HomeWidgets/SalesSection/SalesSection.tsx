import { Carousel } from 'antd'
import './style.scss'
import { useEffect, useState } from 'react'

type TDeals = {
	id: string
	deal_number: number
	deal_name: string
	reservation_left: number
	start_date: string
	end_date: string
	discount: number
	description: string
	status_deal: string
	room_type: string
	id_room_type: string
}

const SalesSection = () => {
	const [deals, setDeals] = useState<Array<TDeals>>([])
	const [readyDeals, setReadyDeals] = useState<Array<TDeals>>([])

	useEffect(() => {
		fetch('http://87.242.117.193:9090/api/deal/getDeal')
			.then((response) => response.json())
			.then((result) => setDeals(result))
			.catch((error) => console.error(error))
	}, [])

	useEffect(() => {
		deals.forEach((o) => console.log(o.end_date))
		setReadyDeals(deals)
	}, [deals])

	return (
		<div className='SalesSection-container'>
			<Carousel autoplay>
				{readyDeals.map((item) => (
					<div className='SalesSection-carouselContent'>
						<div className='SalesSection-example'>
							<p>
								<span>Скидка {item.discount}%</span> {item.deal_name}
							</p>
							<p>{item.status_deal}</p>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default SalesSection
