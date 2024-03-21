import { Card, Collapse, Divider, InputNumber, Form, Select } from 'antd'
import { useState } from 'react'
import './../../Services.scss'

const CalculatingThePrice = () => {
	return (
		<div>
			<p>
				<b>Укажите цены на услугу для 1 гостя за 1 сутки.</b>
			</p>
			<p>
				Общая стоимость услуги в номере = <b>цена * количество гостей * количество суток.</b>
			</p>
			<p>
				Напрмимер: детская кроватка(приносная), доп. место на раскладушке (приносное), ежедневное посещение бассейна или
				тренажерного зала.
			</p>
		</div>
	)
}

export default function TabCreateStep2() {
	return (
		<Card style={{ marginTop: '1vh' }}>
			<Form>
				<Form.Item
					label='Темп начисления цены'
					name='temp_accrual_rate'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Select
						defaultValue='per-guest-per-day'
						style={{ width: 220 }}
						options={[{ value: 'per-guest-per-day', label: 'За гостя в сутки' }]}
					/>
				</Form.Item>
				<Divider />
				<Collapse
					ghost
					style={{ backgroundColor: '#E5F4FF' }}
					items={[{ key: 1, label: 'Высчитывание цены', children: <CalculatingThePrice /> }]}
				/>
				<Form.Item
					label='Цена на услугу для одного гостя в сутки'
					name='service-price'
					rules={[{ required: true, message: 'Please input!' }]}
					style={{ marginTop: '1.5vh' }}
				>
					<InputNumber addonAfter='RUB' defaultValue={100} />
				</Form.Item>
			</Form>
		</Card>
	)
}
