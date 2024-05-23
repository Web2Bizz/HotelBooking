import './style.scss'
import { ReviewCard, ReviewStatistic } from '../../../features'
import { TReviews } from 'src/features/RoomReviews/ReviewCard/ReviewCard'
import { useEffect, useState } from 'react'

type Rating = {
	stars: number
	count: number
}

const ratings: Rating[] = [
	{ stars: 5, count: 200 },
	{ stars: 4, count: 120 },
	{ stars: 3, count: 75 },
	{ stars: 2, count: 30 },
	{ stars: 1, count: 20 }
]



const RoomReviews = () => {
	const [reviews, setReviews] = useState<Array<TReviews>>()
	useEffect(() => {
		setReviews([
			{
				avatarUrl: 'https://webgradients.com/public/webgradients_png/011%20Dusty%20Grass.png',
				name: 'Мария',
				surname: 'Иванова',
				message: 'Тараканы прибежали и унесли мою люстру, обратно не вернули',
				rating: 2,
			},
			{
				avatarUrl: 'https://webgradients.com/public/webgradients_png/001%20Warm%20Flame.png',
				name: 'Алексей',
				surname: 'Смирнов',
				message: 'Не могу войти в номер',
				rating: 1,
			},
			{
				avatarUrl: 'https://webgradients.com/public/webgradients_png/005%20Young%20Passion.png',
				name: 'Дмитрий',
				surname: 'Маслеников',
				message: 'Номер классный, две люстры зачем-то, но да ладно',
				rating: 5,
			}
		])
	}, [])
	return (
		<div className='RoomReviews-wrapper'>
			<h1>Отзывы</h1>
			<div className='RoomReviews-container'>
				<div className='RoomReviews-reviews'>
					{reviews && reviews.map(item => (
						<ReviewCard {...item}/>
					))}
				</div>
				<ReviewStatistic ratings={ratings} />
			</div>
		</div>
	)
}

export default RoomReviews
