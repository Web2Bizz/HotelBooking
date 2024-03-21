import './style.scss'
import { Button } from 'antd'
import StepsRegistration from './components/StepsRegistration/StepsRegistration'

export default function RegistrationHotel() {
	return (
		<>
			<div className='registration-hotel-info'>
				<h2>
					<img src='image/logo.svg' alt='logo' style={{ width: '48px' }} />
					BookRoom
				</h2>

				<h3>Регистрация отеля</h3>
				<Button type='primary' size='large'>
					Назад
				</Button>
			</div>
			<div className='registration-hotel-steps-container'>
				<div className='registration-hotel-steps'>
					<StepsRegistration />
				</div>
			</div>
		</>
	)
}
