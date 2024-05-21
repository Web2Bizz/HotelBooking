import './style.scss'
import { ReviewCard, ReviewStatistic } from '../../../features'

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
	return (
		<div className='RoomReviews-wrapper'>
			<h1>Отзывы</h1>
			<div className='RoomReviews-container'>
				<div className='RoomReviews-reviews'>
					<ReviewCard />
					<ReviewCard />
				</div>
				<ReviewStatistic ratings={ratings} />
			</div>
		</div>
	)
}

export default RoomReviews
