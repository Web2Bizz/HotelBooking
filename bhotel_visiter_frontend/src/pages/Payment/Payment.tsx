import { Button } from 'antd'
import { PaymentCard } from './../../features'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CardForm } from './CardForm'

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
			<div
				className='Payment-container'
				style={{
					margin: '100px 250px'
				}}
			>
				<div className='Payment-button'>
					<Button
						icon={<i style={{ position: 'relative', top: 5 }} className='fi fi-ss-angle-double-left'></i>}
						onClick={() => navigate('/profile')}
					>
						{'Обратно в профиль'}
					</Button>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<div>
						<p>Платежные данные</p>
						<div>
							<PaymentCard />
							<PaymentCard />
							<PaymentCard />
						</div>
					</div>
					<div>
						<CardForm />
					</div>
				</div>
			</div>
		</>
	)
}

export default Payment
