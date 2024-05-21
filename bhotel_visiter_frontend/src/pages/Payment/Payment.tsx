import { Button } from 'antd'
import { PaymentCard } from './../../features'
import './style.scss'

const Payment = () => {
	return (
		<div
			className='Payment-container'
			style={{
				margin: '100px 250px'
			}}
		>
			<div className='Payment-button'>
				<Button>{'<< Обратно в профиль'}</Button>
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
	)
}

export default Payment
