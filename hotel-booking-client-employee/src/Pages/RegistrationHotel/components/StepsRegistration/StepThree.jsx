import { Form, Input, Card } from 'antd'

export default function StepThree({ data, setData, form }) {
	const onValuesChange = (changedValues) => {
		// Обновление локального состояния компонента
		setData({ ...data, ...changedValues });
	};
	return (
		<Card title='Шаг 3. Адрес' style={{ width: '100%' }}>
			<Form
				form={form}
				initialValues={data}
				onValuesChange={onValuesChange}>
				<Form.Item label='Регион' name='hotel_region' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Ульяновская область' />
				</Form.Item>
				<Form.Item label='Город' name='hotel_city' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Димитровград' />
				</Form.Item>
				<Form.Item label='Улица' name='hotel_street' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='Куйбышева' />
				</Form.Item>
				<Form.Item label='Номер дома' name='hotel_number_house' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='300' />
				</Form.Item>
			</Form>
		</Card>
	)
}
