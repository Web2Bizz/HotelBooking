import { Button, Form, Steps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	hotelPropertiesGetAction,
	registrationHotelAction,
	resetMessagesAction
} from '../../../../store/actions/hotelSettingsAction.js'
import '../../style.scss'
import StepFive from './StepFive'
import StepFour from './StepFour'
import StepOne from './StepOne'
import StepThree from './StepThree'
import StepTwo from './StepTwo'

export default function StepsRegistration({ setIsLoading }) {
	const [formOne] = Form.useForm()
	const [formTwo] = Form.useForm()
	const [formThree] = Form.useForm()
	const [formFour] = Form.useForm()
	const [formFive] = Form.useForm()

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { success, error } = useSelector((state) => state.hotelSettingsStore)

	const [current, setCurrent] = useState(0)
	const [data, setData] = useState({
		hotel_name: '',
		hotel_logo: '',
		hotel_country: '',
		hotel_region: '',
		hotel_city: '',
		hotel_street: '',
		hotel_number_house: 0,
		hotel_count_floor: 0,
		hotel_count_room: 0,
		contact_email: '',
		contact_number_phone: '',
		owner_name: '',
		owner_number_phone: '',
		owner_email: '',
		id_personal_data_storage_policy: ''
	})
	const steps = [
		{
			title: 'Общие настройки',
			content: <StepOne data={data} setData={setData} form={formOne} />,
			form: formOne
		},
		{
			title: 'Данные пользователя',
			content: <StepTwo data={data} setData={setData} form={formTwo} />,
			form: formTwo
		},
		{
			title: 'Адрес',
			content: <StepThree data={data} setData={setData} form={formThree} />,
			form: formThree
		},
		{
			title: 'Контактная информация',
			content: <StepFour data={data} setData={setData} form={formFour} />,
			form: formFour
		},
		{
			title: 'Общие настройки отеля',
			content: <StepFive data={data} setData={setData} form={formFive} />,
			form: formFive
		}
	]

	const next = () => {
		steps[current].form
			.validateFields()
			.then(() => {
				setCurrent(current + 1)
			})
			.catch(() => {
				message.error('Перед тем как продвинуться дальше заполните обязательные поля!')
			})
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const complete = () => {
		steps[current].form
			.validateFields()
			.then(() => {
				dispatch(registrationHotelAction(data))
				dispatch(hotelPropertiesGetAction())
				dispatch(resetMessagesAction())
			})
			.catch(() => {
				message.error('Перед тем как продвинуться дальше заполните обязательные поля!')
			})
	}

	useEffect(() => {
		if (success) {
			setIsLoading(true)
			message.success(success)
			dispatch(hotelPropertiesGetAction())
			const timer = setTimeout(() => {
				navigate('/overview')
			}, 5000) // задержка в 3000 мс (3 секунды)
			// Очистка таймера при размонтировании компонента
			setIsLoading(false)
			return () => clearTimeout(timer)
		}
		if (error) {
			message.error(error)
		}
	}, [success, error])

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
					<Button type='primary' onClick={() => complete()}>
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
