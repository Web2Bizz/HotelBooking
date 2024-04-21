import { Form, InputNumber, Card, Collapse, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

export default function StepFive({ data, setData, form }) {
	const onValuesChange = (changedValues) => {
		const updatedData = { ...data, ...changedValues }
		updatedData.hotel_number_room = parseInt(updatedData.hotel_number_room, 10)
		updatedData.hotel_number_floor = parseInt(updatedData.hotel_number_floor, 10)
		setData(updatedData)
	}
	const [selectData, setSelectData] = useState([])
	const { personalDataStoragePolicy } = useSelector((state) => state.additionalsStore)
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
	return (
		<Card title='Шаг 5. Общие настройки отеля' style={{ width: '100%' }}>
			<Form form={form} initialValues={data} onValuesChange={onValuesChange}>
				<Form.Item
					label='Количество номеров'
					name='hotel_count_room'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<InputNumber placeholder='100' style={{ width: '200px' }} />
				</Form.Item>
				<Form.Item
					label='Количество этажей'
					name='hotel_count_floor'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<InputNumber placeholder='5' style={{ width: '200px' }} />
				</Form.Item>
				<Form.Item
					label='Срок хранения персональных данных с даты выезда гостя'
					name='id_personal_data_storage_policy'
					rules={[{ required: true, message: 'Please input!' }]}
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
			</Form>
		</Card>
	)
}
