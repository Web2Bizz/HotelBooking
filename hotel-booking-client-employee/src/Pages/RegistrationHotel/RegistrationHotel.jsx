import { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPersonalDataStoragePolicyAction } from '../../store/actions/additionalsAction.js'
import StepsRegistration from './components/StepsRegistration/StepsRegistration'
import './style.scss'

import Loading from '../../components/Loading/Loading.jsx'

export default function RegistrationHotel() {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	useLayoutEffect(() => {
		dispatch(getPersonalDataStoragePolicyAction())
	}, [])

	return (
		<>
			{isLoading && <Loading />}
			<div className='registration-container'>
				<div className='registration-hotel-info'>
					<h2>
						<img src='/image/logo.svg' alt='logo' style={{ width: '48px' }} />
						BookRoom
					</h2>
				</div>
				<div className='registration-hotel-steps-container'>
					<div className='registration-hotel-steps'>
						<h3 style={{ marginBottom: '3vh' }}>Регистрация отеля</h3>
						<StepsRegistration setIsLoading={setIsLoading} />
					</div>
				</div>
			</div>
		</>
	)
}
