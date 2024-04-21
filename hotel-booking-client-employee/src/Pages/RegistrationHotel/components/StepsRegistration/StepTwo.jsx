import { Form, Input, Card } from 'antd'

export default function StepTwo({ data, setData, form }) {
	const onValuesChange = (changedValues) => {
		// Обновление локального состояния компонента
		setData({ ...data, ...changedValues });
	};
	return (
		<Card title='Шаг 2. Данные пользователя' style={{ width: '100%' }}>
			<Form
				form={form}
				initialValues={data}
				onValuesChange={onValuesChange}>
				<Form.Item label='ФИО' name='owner_name' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Кандратьев Евгиний Антольевич' />
				</Form.Item>
				<Form.Item
					label='Контактный телефон'
					name='owner_number_phone'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='+79081230101' />
				</Form.Item>
				<Form.Item label='Email' name='owner_email' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='example@mail.com' />
				</Form.Item>
			</Form>
		</Card>
	)
}
