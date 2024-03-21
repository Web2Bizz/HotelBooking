import { Form, Input, Card } from 'antd'

export default function StepThree() {
	return (
		<Card title='Шаг 3. Адрес' style={{ width: '100%' }}>
			<Form>
				<Form.Item label='Регион' name='hotel-region' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Ульяновская область' />
				</Form.Item>
				<Form.Item label='Город' name='hotel-city' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Димитровград' />
				</Form.Item>
				<Form.Item label='Улица' name='hotel-street' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Куйбышева' />
				</Form.Item>
				<Form.Item label='Номер дома' name='hotel-number-house' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='300' />
				</Form.Item>
			</Form>
		</Card>
	)
}
