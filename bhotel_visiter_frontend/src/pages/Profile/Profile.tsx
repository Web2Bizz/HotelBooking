import { Container, Header, HistoryBooking, ProfileCard, UpcomingBooking } from '../../widgets'

const Profile = () => {
	return (
		<Container>
			<div
				className='Profile-container'
				style={{
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
		</Container>
	)
}

export default Profile
