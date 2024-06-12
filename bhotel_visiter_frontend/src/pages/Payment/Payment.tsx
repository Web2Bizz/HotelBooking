import { Button } from 'antd'
import { PaymentCard } from './../../features'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CardForm } from './CardForm'
import { UserContext } from '@contexts'
import { trpc } from '@helpers'

type PaymentData = {
	card_number: string
}

const Payment = () => {
	const navigate = useNavigate()
	const context = useContext(UserContext)
	const [payments, setPayments] = useState<Array<PaymentData>>()
	const [getPayment] = trpc.useQueries((t) => [t.getPayment(context.id_user)])

	useEffect(() => {
		getPayment.refetch()
	}, [])

	useEffect(() => {
		if (context.id_user !== undefined && context.id_user !== '') {
			setPayments(getPayment.data)
			console.log(getPayment.data)
			console.log(context.id_user)
		}
	}, [getPayment.data])

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
						icon={
							<i
								style={{ position: 'relative', top: 5 }}
								className='fi fi-ss-angle-double-left'
							></i>
						}
						onClick={() => navigate('/profile')}
					>
						{'Обратно в профиль'}
					</Button>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<div>
						<p>Платежные данные</p>
						<div>
							{payments?.map((payment, index) => (
								<PaymentCard key={index} card_number={payment.card_number} />
							))}
						</div>
					</div>
					<div style={{ width: 400 }}>
						<CardForm />
					</div>
				</div>
			</div>
		</>
	)
}

export default Payment
