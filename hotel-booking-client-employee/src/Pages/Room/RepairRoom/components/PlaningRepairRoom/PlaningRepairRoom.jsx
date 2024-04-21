import { Radio, Card, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import '../../style.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	repairApplicationStatusEditAction,
	resetMessagesAction
} from '../../../../../store/actions/repairRoomAction.js'

export default function PlaningRepairRoom(props) {
	const dispatch = useDispatch()
	const [messageApi, contextHolder] = message.useMessage()
	const [convertedData, setConvertedData] = useState();
	const { statusRepair } = useSelector((state) => state.additionalsStore)
	const onBackButton = () => {
		props.setIsPlaning(false)
	}


	function convertDataArray(dataArray) {
		const tempArray = []
		for (let i = 0; i < dataArray.length; i++) {
			tempArray.push({
				closeroom: dataArray[i].closeroom,
				description_work: dataArray[i].description_work,
				end_date: dataArray[i].end_date,
				start_date: dataArray[i].start_date,
				name_work: dataArray[i].name_work,
				id_repair: dataArray[i].id_repair,
				id_status_repair: dataArray[i].id_status_repair
			})
		}
		return tempArray
	}

	useEffect(() => {
			let currentData = props.data.find(obj => obj.repairs[0].id_room === props.selectedRoom).repairs;
			setConvertedData(convertDataArray(currentData));
	}, []);

	const onGroupChange = (id_repair, status, name_work) => {
		dispatch(repairApplicationStatusEditAction(id_repair, status))
		messageApi.success(`Статус задачи '${name_work}' успешно изменен`)
		dispatch(resetMessagesAction())
	}

	const drawCardRepairs = (data) => {
		return data?.map((item, key) => (
			<Card key={key} title={item.name_work} style={{ marginBottom: '2vh' }}>
				<div className='planing-container'>
					<div className='planing-info'>
						<div className='planing-info-date'>
							<div>
								<p>Начало ремонта</p>
								<span>{item.start_date}</span>
							</div>
							<div>
								<p>Окончание ремонта</p>
								<span>{item.end_date}</span>
							</div>
						</div>
						<div>
							<p>Описание работы</p>
							<span>{item.description_work}</span>
						</div>
					</div>
					<div className='planing-radio'>
						<Radio.Group defaultValue={item.id_status_repair} buttonStyle='solid' onChange={(e) => onGroupChange(item.id_repair, e.target.value, item.name_work)}>
							{statusRepair?.map((s_item) => {
								console.log(s_item.id_status_repair)
								return (
									<Radio.Button key={s_item.id_status_repair} value={s_item.id_status_repair}>
										{s_item.status_repair}
									</Radio.Button>
								);
							})}
						</Radio.Group>
					</div>
				</div>
			</Card>
		))
	}

	return (
		<>
			{contextHolder}
			<div className='d-f justify-content-between' style={{ marginBottom: '1vh' }}>
				<h2>Планирование ремонтных работ</h2>
				<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
					Назад
				</Button>
			</div>
			<div className='planing-wrapper'>
				{drawCardRepairs(convertedData)}
			</div>
		</>
	)
}
