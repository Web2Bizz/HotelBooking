import PageWithoutServices from './PageWithoutServices'
import { Card, Button } from 'antd'

export default function ServicesTab(props) {
	return (
		<>
			<Button type='primary' style={{ marginBottom: '1.5vh' }} onClick={() => props.setIsServiceTabCreate(true)}>
				+ Создать услугу
			</Button>
			<Card>
				<PageWithoutServices />
			</Card>
		</>
	)
}
