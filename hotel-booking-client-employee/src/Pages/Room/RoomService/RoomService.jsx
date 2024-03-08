import { useState } from 'react'
import { Collapse } from 'antd'
import RoomServiceStatistic from './Components/RoomServiceStatistic/RoomServiceStatistic'
import TableRoom from './Components/TableRoom/TableRoom'
import RoomServiceRepair from './Components/RoomServiceRepair/RoomServiceRepair'

export default function RoomService() {
	const [isRepair, setIsRepair] = useState(false)
	return !isRepair ? (
		<>
			<h2>Обслуживание комнат</h2>
			<Collapse
				items={[{ key: '1', label: 'Статистика', children: <RoomServiceStatistic /> }]}
				defaultActiveKey={['1']}
			/>
			<TableRoom isRepair={isRepair} setIsRepair={setIsRepair} />
		</>
	) : (
		<>
			<RoomServiceRepair isRepair={isRepair} setIsRepair={setIsRepair} />
		</>
	)
}
