import { Form, Input, Card } from 'antd'

export default function StepTwo() {
	return (
		<Card title='Шаг 2. Данные пользователя' style={{ width: '100%' }}>
			<Form>
				<Form.Item label='ФИО' name='owner-name' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Кандратьев Евгиний Антольевич' />
				</Form.Item>
				<Form.Item
					label='Контактный телефон'
					name='owner-number-phone'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='+79081230101' />
				</Form.Item>
				<Form.Item label='Email' name='owner-email' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='example@mail.com' />
				</Form.Item>
			</Form>
		</Card>
	)
}
