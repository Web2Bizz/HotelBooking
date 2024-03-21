import { Card, Radio, Space, Input, Form } from 'antd'
import { useState } from 'react'
import './../../Services.scss'

export default function TabCreateStep1() {
	const [value, setValue] = useState(1)
	const onChange = (e) => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}
	return (
		<Card style={{ marginTop: '1vh' }}>
			<Form>
				<Form.Item label='Тип услуги' name='type-service' rules={[{ required: true, message: 'Please input!' }]}>
					<div className='tabCreateStep-container'>
						<Radio.Group onChange={onChange} value={value}>
							<Space direction='vertical'>
								<Radio value={1}>
									<div className='tabCreateStep-radio'>
										<p>Общая</p>
										<span>Все услуги, кроме питания.</span>
									</div>
								</Radio>
								<Radio value={2}>
									<div className='tabCreateStep-radio'>
										<p>Питание</p>
										<span>Все услуги питания.</span>
									</div>
								</Radio>
							</Space>
						</Radio.Group>
					</div>
				</Form.Item>
				<Form.Item label='Название услуги' name='name-service' rules={[{ required: true, message: 'Please input!' }]}>
					<div className='tabCreateStep-container'>
						<Input />
					</div>
				</Form.Item>
			</Form>
		</Card>
	)
}
