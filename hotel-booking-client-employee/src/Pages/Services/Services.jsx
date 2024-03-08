import { Tabs } from 'antd'
import ServicesGroupTab from './Components/ServicesGroupTab/ServicesGroupTab'
import ServicesTab from './Components/ServicesTab/ServicesTab'
import { useState } from 'react'
import ServicesTabCreate from './Components/ServicesTab/ServicesTabCreate'

export default function Services() {
	const [isServiceTabCreate, setIsServiceTabCreate] = useState(false)
	const items = [
		{
			key: 1,
			label: 'Группы услуг',
			children: <ServicesGroupTab />
		},
		{
			key: 2,
			label: 'Услуги',
			children: <ServicesTab isServiceTabCreate={isServiceTabCreate} setIsServiceTabCreate={setIsServiceTabCreate} />
		}
	]
	return !isServiceTabCreate ? (
		<>
			<h2>Услуги</h2>
			<div>
				<Tabs defaultActiveKey='1' type='card' items={items} />
			</div>
		</>
	) : (
		<ServicesTabCreate setIsServiceTabCreate={setIsServiceTabCreate} />
	)
}
