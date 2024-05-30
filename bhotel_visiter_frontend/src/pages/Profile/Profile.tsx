import { CSSProperties } from 'react'
import { Container, Header, HistoryBooking, ProfileCard, UpcomingBooking } from '../../widgets'

const profile: CSSProperties = {
	display: 'flex',
	gap: '20px'
}

const Profile = () => {
	return (
		<Container>
			<div className='Profile-container' style={profile}>
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
