import { Card, Radio, Space, Input } from 'antd'
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
			<div>
				<div className='tabCreateStep-inputs'>
					<p>Тип</p>
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
				</div>
				<div className='tabCreateStep-inputs'>
					<p>Название</p>
					<div className='tabCreateStep-container'>
						<Input />
					</div>
				</div>
			</div>
		</Card>
	)
}
