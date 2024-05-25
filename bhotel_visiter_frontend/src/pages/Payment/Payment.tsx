import { Button } from 'antd'
import { PaymentCard } from './../../features'
import './style.scss'
import { Header } from '@widgets'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

type TPayment = {
	id: string
	type: 'MIR' | 'MASTER_CARD' | 'UNION_PAY' | 'MAESTRO' | 'VISA'
	number: string
}

const Payment = () => {
	const navigate = useNavigate()

	const [payment, setPayment] = useState<Array<TPayment>>()

	useEffect(() => {
		setPayment([
			{
				id: '0',
				type: 'MIR',
				number: '0000 0000 1224 1224'
			}
		])
	}, [])

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
					<Button>Добавить</Button>
				</div>
			</div>
		</>
	)
}

export default Payment
