import React, { useState } from 'react'
import { Button, message, Steps } from 'antd'
import '../../style.scss'
import StepFour from './StepFour'
import StepOne from './StepOne'
import StepThree from './StepThree'
import StepTwo from './StepTwo'
import StepFive from './StepFive'

const steps = [
	{
		title: 'Общие настройки',
		content: <StepOne />
	},
	{
		title: 'Данные пользователя',
		content: <StepTwo />
	},
	{
		title: 'Адрес',
		content: <StepThree />
	},
	{
		title: 'Контактная информация',
		content: <StepFour />
	},
	{
		title: 'Общие настройки отеля',
		content: <StepFive />
	}
]

export default function StepsRegistration() {
	const [current, setCurrent] = useState(0)

	const next = () => {
		setCurrent(current + 1)
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const items = steps.map((item) => ({ key: item.title, title: item.title }))

	return (
		<>
			<div className='registration-steps-container'>
				<div className='registration-steps-divider'>
					<Steps current={current} items={items} direction='vertical' />
				</div>

				<div className='registration-steps-content'>{steps[current].content}</div>
			</div>

			<div style={{ marginTop: 24 }}>
				{current < steps.length - 1 && (
					<Button type='primary' onClick={() => next()}>
						Дальше
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type='primary' onClick={() => message.success('Processing complete!')}>
						Сохранить
					</Button>
				)}
				{current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
						Назад
					</Button>
				)}
			</div>
		</>
	)
}
