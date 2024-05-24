import {
	ProfileCard,
	UpcomingBooking,
	HistoryBooking,
	Header
} from '../../widgets'

const Profile = () => {
	return (
		<>
			<Header />
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
		</>
	)
}

export default Profile
