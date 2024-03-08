import { useState } from 'react'
import { Card, Button } from 'antd'
import GroupTabTable from './GroupTabTable'
import GroupTabModal from './GroupTabModal'

export default function ServicesGroupTab() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	return (
		<>
			<Button type='primary' style={{ marginBottom: '1.5vh' }} onClick={() => setIsModalOpen(true)}>
				+ Добавить группу услуг
			</Button>
			<Card>
				<GroupTabTable />
			</Card>

			<GroupTabModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</>
	)
}
