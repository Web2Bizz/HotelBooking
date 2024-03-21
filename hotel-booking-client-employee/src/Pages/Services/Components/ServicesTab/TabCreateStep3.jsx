import { Card, Input, Divider, InputNumber, Form, Select, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { TextArea } = Input
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

export default function TabCreateStep3() {
	return (
		<Card style={{ marginTop: '1vh' }}>
			<Form>
				<p>
					Сделайте услугу привлекательной для бронирования. Добавьте описание и фотографии, чтобы помочь гостям выбрать
					услуги. Услуги с фотографиями бронируют чаще.
				</p>
				<Form.Item label='Название услуги' name='name-service' rules={[{ required: true, message: 'Please input!' }]}>
					<div className='tabCreateStep-container'>
						<Input />
					</div>
				</Form.Item>
				<Form.Item
					label='Описание услуги'
					name='description-service'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<div className='tabCreateStep-container'>
						<TextArea showCount maxLength={100} style={{ height: 120, resize: 'none' }} />
					</div>
				</Form.Item>
				<Form.Item label='Фотографии' name='hotel-logo'>
					<div className='settings-hotel-logo-container'>
						<Upload action='/upload.do' listType='picture-card'>
							<button style={{ border: 0, background: 'none' }} type='button'>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>Загрузить</div>
							</button>
						</Upload>
						<div className='settings-hotel-logo'></div>
					</div>
				</Form.Item>
				<Divider />
				<Form.Item label='Группа услуг' name='temp_accrual_rate' rules={[{ required: true, message: 'Please input!' }]}>
					<Select defaultValue='none' style={{ width: 220 }} options={[{ value: 'none', label: 'без группы' }]} />
				</Form.Item>
			</Form>
		</Card>
	)
}
