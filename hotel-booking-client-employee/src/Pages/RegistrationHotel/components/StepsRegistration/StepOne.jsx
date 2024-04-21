import { Form, Input, Upload, Divider, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function StepOne({ data, setData, form }) {

	const onValuesChange = (changedValues) => {
		// Обновление локального состояния компонента
		setData({ ...data, ...changedValues });
	};

	const handleCustomRequest = (options) => {
		options.onSuccess(null, options.file);
	};

	return (
		<Card title='Шаг 1. Общие настройки' style={{ width: '100%' }}>
			<Form
				form={form}
				initialValues={data}
				onValuesChange={onValuesChange}
			>
				<Form.Item label='Название отеля' name='hotel_name' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='BookRoom' />
				</Form.Item>
				<Form.Item label='Логотип отеля' name='hotel_logo' rules={[{ required: true, message: 'Please input!' }]}>
					<Upload customRequest={handleCustomRequest} listType='picture-card' multiple={false} maxCount={1}>
						<button style={{ border: 0, background: 'none' }} type='button'>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Загрузить</div>
						</button>
					</Upload>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Страна размещения'
					name='hotel_country'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='Российская Федерация' />
				</Form.Item>
			</Form>
		</Card>
	)
}
