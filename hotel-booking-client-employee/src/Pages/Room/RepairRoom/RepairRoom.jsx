import { useState } from 'react'
import RepairRoomTable from './components/RepairRoomTable/RepairRoomTable'
import StatisticRepairRoom from './components/StatisticRepairRoom/StatisticRepairRoom'
import PlaningRepairRoom from './components/PlaningRepairRoom/PlaningRepairRoom'
import RoomServiceRepair from '../RepairRoom/components/RoomServiceRepair/RoomServiceRepair'

export default function RepairRoom() {
	const [isRepair, setIsRepair] = useState(false)
	const [isPlaning, setIsPlaning] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [selectedRoom, setSelectedRoom] = useState('')

	return (
		<>
			{!isRepair && !isPlaning && (
				<>
					<h2>Ремонт номеров</h2>
					<StatisticRepairRoom />
					<RepairRoomTable
						setIsRepair={setIsRepair}
						setIsPlaning={setIsPlaning}
						setIsEdit={setIsEdit}
						setSelectedRoom={setSelectedRoom}
					/>
				</>
			)}
			{isRepair && <RoomServiceRepair isRepair={isRepair} setIsRepair={setIsRepair} selectedRoom={selectedRoom} />}
			{isPlaning && <PlaningRepairRoom setIsPlaning={setIsPlaning} />}
		</>
	)
}
