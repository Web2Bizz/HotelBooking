import { Form, Input, Card } from 'antd'

export default function StepFour({ data, setData, form }) {
	const onValuesChange = (changedValues) => {
		// Обновление локального состояния компонента
		setData({ ...data, ...changedValues });
	};
	return (
		<Card title='Шаг 4. Контактная информация' style={{ width: '100%' }}>
			<Form
				form={form}
				initialValues={data}
				onValuesChange={onValuesChange}>
				<Form.Item
					label='Контактный телефон'
					name='contact_number_phone'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='+79081230101' />
				</Form.Item>
				<Form.Item
					label='Email для рассылок'
					name='contact_email'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='exampel@mail.com' />
				</Form.Item>
			</Form>
		</Card>
	)
}
