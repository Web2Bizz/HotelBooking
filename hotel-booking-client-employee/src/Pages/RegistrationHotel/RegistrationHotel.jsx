import './style.scss'
import StepsRegistration from './components/StepsRegistration/StepsRegistration'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPersonalDataStoragePolicyAction } from '../../store/actions/additionalsAction.js'

export default function RegistrationHotel() {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(getPersonalDataStoragePolicyAction())
	},[])

	return (
		<div className='registration-container'>
			<div className='registration-hotel-info'>
				<h2>
					<img src='image/logo.svg' alt='logo' style={{ width: '48px' }} />
					BookRoom
				</h2>

			</div>
			<div className='registration-hotel-steps-container'>
				<div className='registration-hotel-steps'>
					<h3 style={{marginBottom: '3vh'}}>Регистрация отеля</h3>
					<StepsRegistration />
				</div>
			</div>
		</div>
	)
}
