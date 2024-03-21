import { Form, Input, Card, Collapse, Select } from 'antd'

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

export default function StepFive() {
	return (
		<Card title='Шаг 5. Общие настройки отеля' style={{ width: '100%' }}>
			<Form>
				<Form.Item
					label='Количество комнат'
					name='hotel-number-room'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='100' />
				</Form.Item>
				<Form.Item
					label='Количество этажей'
					name='hotel-number-floor'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='5' />
				</Form.Item>
				<Form.Item
					label='Срок хранения персональных данных с даты выезда гостя'
					name='id_personal_data_storage_policy'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Select />
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
