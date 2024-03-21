import { Form, Input, Upload, Divider, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function StepOne() {
	return (
		<Card title='Шаг 1. Общие настройки' style={{ width: '100%' }}>
			<Form>
				<Form.Item label='Название отеля' name='hotel-name' rules={[{ required: true, message: 'Please input!' }]}>
					<Input placeholder='BookRoom' />
				</Form.Item>
				<Form.Item label='Логотип отеля' name='hotel-logo' rules={[{ required: true, message: 'Please input!' }]}>
					<Upload action='/upload.do' listType='picture-card'>
						<button style={{ border: 0, background: 'none' }} type='button'>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Загрузить</div>
						</button>
					</Upload>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Страна размещения'
					name='hotel-country'
					rules={[{ required: true, message: 'Please input!' }]}
				>
					<Input placeholder='Российская Федерация' />
				</Form.Item>
			</Form>
		</Card>
	)
}
