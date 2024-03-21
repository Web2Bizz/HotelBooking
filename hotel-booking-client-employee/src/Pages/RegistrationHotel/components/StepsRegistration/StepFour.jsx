import { Form, Input, Card } from 'antd'

export default function StepFour() {
	return (
		<Card title='Шаг 4. Контактная информация' style={{ width: '100%' }}>
			<Form>
				<Form.Item
					label='Контактный телефон'
					name='contact-number-phone'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='+79081230101' />
				</Form.Item>
				<Form.Item
					label='Email для рассылок'
					name='contact-email'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='exampel@mail.com' />
				</Form.Item>
			</Form>
		</Card>
	)
}
