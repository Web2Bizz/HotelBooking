import PageWithoutServices from './PageWithoutServices'
import { Card, Button } from 'antd'
import ServiceTabTable from './ServiceTabTable'

export default function ServicesTab(props) {
	return (
		<>
			<Button type='primary' style={{ marginBottom: '1.5vh' }} onClick={() => props.setIsServiceTabCreate(true)}>
				+ Создать услугу
			</Button>
			<Card>
				<ServiceTabTable />
				{/* <PageWithoutServices /> */}
			</Card>
		</>
	)
}
