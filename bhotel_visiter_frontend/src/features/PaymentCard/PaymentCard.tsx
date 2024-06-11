import { useContext, useEffect, useState } from 'react'
import './style.scss'
import { UserContext } from '@contexts'
import { trpc } from '@helpers'

const PaymentCard = (props: { card_number: string }) => {	
	return (
		<div className='PaymentCard-container'>
			<div className='PaymentCard-img'>
			</div>
			<div className='PaymentCard-text'>
				<p>{props.card_number.substring(0, 4)} **** **** ****</p>
			</div>
		</div>
	)
}

export default PaymentCard
