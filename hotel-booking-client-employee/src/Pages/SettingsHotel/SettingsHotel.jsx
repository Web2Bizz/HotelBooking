import './style.scss'
import { Card, Form, Input, InputNumber, Upload, Select, Collapse, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useLayoutEffect, useState } from 'react'
import {
	hotelPropertiesEditAction,
	hotelPropertiesGetAction,
	resetMessagesAction
} from '../../store/actions/hotelSettingsAction.js'

const PersonalDataStoragePolicyInfo = () => {
	return (
		<div>
			<p>
				Средства размещения как операторы персональных данных обязаны выбирать период их хранения строго в соответствии
				с применимым законодательством в сфере защиты персональных данных. Персональные данные гостя должны храниться не
				дольше, чем этого требуют цели обработки персональных данных.
			</p>
			<p>
				<b>Удаленные персональные данные не восстанавливаются.</b>
			</p>
			<p>
				Срок хранения персональных данных устанавливается с даты выезда гостя, изменение правила применяется ко всем
				бронированиям.
			</p>
			<p>
				Используйте вариант срока хранения “бесконечно", только если это разрешено применимым законодательством.
				Персональные данные будут храниться, пока вы не измените срок хранения или гость не потребует удалить его
				данные.
			</p>
		</div>
	)
}

export default function SettingsHotel() {
	const dispatch = useDispatch()
	const { hotelProperties, success, error } = useSelector((state) => state.hotelSettingsStore)
	const { personalDataStoragePolicy } = useSelector((state) => state.additionalsStore)
	const [data, setData] = useState({})
	useLayoutEffect(() => {
		dispatch(hotelPropertiesGetAction())
	}, [])

	const onFinish = (values) => {
		dispatch(hotelPropertiesEditAction(values))
		dispatch(resetMessagesAction())
		dispatch(hotelPropertiesGetAction())
	}

	useEffect(() => {
		if (success) {
			message.success(success)
		}
		if (error) {
			message.error(error)
		}
	}, [success, error])

	const onValuesChange = (changedValues) => {
		// Обновление локального состояния компонента
		setData({ ...data, ...changedValues })
	}

	const [selectData, setSelectData] = useState([])
	useEffect(() => {
		loadDataForSelect()
	}, [])
	const loadDataForSelect = () => {
		const temp = personalDataStoragePolicy.map((item) => ({
			value: item.id_personal_data_storage_policy,
			label: item.personal_data_storage_policy
		}))
		setSelectData(temp)
	}

	const handleCustomRequest = (options) => {
		setData((data) => ({
			...data,
			hotel_logo: options.file // Передаем сам файл в состояние
		}))

		options.onSuccess(null, options.file) // Вызываем onSuccess
	}

	return (
		<>
			<h2>Настройки отеля</h2>
			<div className='settings-hotel-container'>
				<Form
					onValuesChange={onValuesChange}
					initialValues={{ ...hotelProperties[0], id_hotel_properties: hotelProperties[0]?.id_hotel_properties }} // Задаем начальные значения для полей
					onFinish={onFinish}
				>
					<Card title='Название и логотип'>
						<Form.Item label='' name='id_hotel_properties' style={{ display: 'none' }} />
						<Form.Item label='Название отеля' name='hotel_name'>
							<Input placeholder='BookRoom' />
						</Form.Item>
						<Form.Item label='Логотип отеля' name='hotel_logo'>
							<Upload maxCount={1} customRequest={handleCustomRequest} multiple={false} listType='picture-card'>
								<button style={{ border: 0, background: 'none' }} type='button'>
									<PlusOutlined />
									<div style={{ marginTop: 8 }}>Загрузить новое</div>
								</button>
							</Upload>
							{/*<div className='settings-hotel-logo'>*/}
							{/*	<img src={hotelProperties[0]?.hotel_logo} alt="previous_logo"/>*/}
							{/*</div>*/}
						</Form.Item>
					</Card>
					<Card title='Политика хранения персональных данных гостей'>
						<Form.Item
							label='Срок хранения персональных данных с даты выезда гостя'
							name='id_personal_data_storage_policy'
						>
							<Select options={selectData} />
						</Form.Item>
						<Collapse
							ghost
							style={{ backgroundColor: '#E5F4FF' }}
							items={[
								{ key: 1, label: 'Правила хранения персональных данных', children: <PersonalDataStoragePolicyInfo /> }
							]}
						/>
					</Card>
					<Card title='Адрес'>
						<Form.Item label='Страна' name='hotel_country'>
							<Input placeholder='Россия' />
						</Form.Item>
						<Form.Item label='Регион' name='hotel_region'>
							<Input placeholder='Ульяновская область' />
						</Form.Item>
						<Form.Item label='Город' name='hotel_city'>
							<Input placeholder='Димитровград' />
						</Form.Item>
						<Form.Item label='Улица' name='hotel_street'>
							<Input placeholder='Куйбышева' />
						</Form.Item>
						<Form.Item label='Номер дома' name='hotel_number_house'>
							<Input placeholder='300' />
						</Form.Item>
					</Card>
					<Card title='Данные для рассылки'>
						<Form.Item label='Контактный телефон' name='contact_number_phone'>
							<Input placeholder='+79081230101' />
						</Form.Item>
						<Form.Item label='Email для рассылок' name='contact_email'>
							<Input placeholder='exampel@mail.com' />
						</Form.Item>
					</Card>
					<Card title='Данные владельца'>
						<Form.Item label='ФИО владельца' name='owner_name'>
							<Input placeholder='ФИО' />
						</Form.Item>
						<Form.Item label='Контактный телефон' name='owner_number_phone'>
							<Input placeholder='+79081230101' />
						</Form.Item>
						<Form.Item label='Email' name='owner_email'>
							<Input placeholder='exampel@mail.com' />
						</Form.Item>
					</Card>
					<Card title='Общие настройки'>
						<Form.Item label='Количество номеров' name='hotel_count_room'>
							<InputNumber placeholder='100' style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item label='Количество этажей' name='hotel_count_floor'>
							<InputNumber placeholder='5' style={{ width: '100%' }} />
						</Form.Item>
					</Card>
					<Form.Item>
						<div className='settings-hotel-button'>
							<Button type='primary' htmlType='submit'>
								Сохранить
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
