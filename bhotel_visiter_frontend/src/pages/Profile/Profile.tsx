import { ProfileCard, UpcomingBooking, HistoryBooking } from '../../widgets'

const Profile = () => {
	return (
		<div
			className='Profile-container'
			style={{
				margin: '100px 250px',
				display: 'flex',
				gap: '20px'
			}}
		>
			<ProfileCard />
			<div>
				<UpcomingBooking />
				<HistoryBooking />
			</div>
		</div>
	)
}

export default Profile
