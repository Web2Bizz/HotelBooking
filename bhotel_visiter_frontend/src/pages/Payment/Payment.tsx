import { Button } from 'antd'
import { PaymentCard } from './../../features'
import './style.scss'
import { Header } from '@widgets'
import { useNavigate } from 'react-router-dom'

const Payment = () => {

	const navigate = useNavigate()

	return (
		<>
			<Header />
			<div
				className='Payment-container'
				style={{
					margin: '100px 250px'
				}}
			>
				<div className='Payment-button'>
					<Button onClick={() => navigate('/profile')}>{'<< Обратно в профиль'}</Button>
				</div>
				<div>
					<p>Платежные данные</p>
					<div>
						<PaymentCard />
						<PaymentCard />
						<PaymentCard />
					</div>
				</div>
			</div>
		</>
	)
}

export default Payment
