import { useState } from 'react'
import RepairRoomTable from './components/RepairRoomTable/RepairRoomTable'
import StatisticRepairRoom from './components/StatisticRepairRoom/StatisticRepairRoom'
import PlaningRepairRoom from './components/PlaningRepairRoom/PlaningRepairRoom'
import RoomServiceRepair from '../RoomService/Components/RoomServiceRepair/RoomServiceRepair.jsx'

export default function RepairRoom() {
	const [isRepair, setIsRepair] = useState(false)
	const [isPlaning, setIsPlaning] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [selectedRoom, setSelectedRoom] = useState()
	const [data, setData] = useState([])

	return (
		<>
			{!isRepair && !isPlaning && !isEdit && (
				<>
					<h2>Ремонт номеров</h2>
					<StatisticRepairRoom />
					<RepairRoomTable
						setIsRepair={setIsRepair}
						setIsPlaning={setIsPlaning}
						setIsEdit={setIsEdit}
						setSelectedRoom={setSelectedRoom}
						setData={setData}
						data={data}
					/>
				</>
			)}
			{isRepair &&
				<RoomServiceRepair
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					data={data}
					isRepair={isRepair}
					setIsRepair={setIsRepair}
					selectedRoom={selectedRoom}
				/>}
			{isPlaning && <PlaningRepairRoom setIsPlaning={setIsPlaning} data={data} selectedRoom={selectedRoom}/>}
		</>
	)
}
