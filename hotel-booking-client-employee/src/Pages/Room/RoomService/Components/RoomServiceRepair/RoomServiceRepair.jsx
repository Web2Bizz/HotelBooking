import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Input, DatePicker } from 'antd'
const { TextArea } = Input

export default function RoomServiceRepair(props) {
	const onBackButton = () => {
		props.setIsRepair(false)
	}
	const onChange = (value, dateString) => {
		console.log('Selected Time: ', value)
		console.log('Formatted Selected Time: ', dateString)
	}
	const onOk = (value) => {
		console.log('onOk: ', value)
	}
	return (
		<>
			<h2>Ремонт</h2>
			<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
				Назад
			</Button>
			<Card style={{ marginTop: '1vh', marginBottom: '1vh' }}>
				<p>Список плановых ремонтов</p>
				<Divider />
				<div className='d-flex flex-column'>
					<div className='roomService__repair-listItem'>
						<p>Название работ</p>
						<div>
							<Input />
						</div>
					</div>
					<div className='roomService__repair-listItem'>
						<p>Описание ремонта</p>
						<div>
							<TextArea
								// value={value}
								// onChange={(e) => setValue(e.target.value)}
								autoSize={{ minRows: 3, maxRows: 5 }}
							/>
						</div>
					</div>
					<div className='roomService__repair-listItem'>
						<p>Недоступен для заселения с</p>
						<div style={{ width: '40%' }}>
							<DatePicker showTime onChange={onChange} onOk={onOk} />
						</div>
					</div>
					<div className='roomService__repair-listItem'>
						<p>Недоступен для заселения по</p>
						<div style={{ width: '40%' }}>
							<DatePicker showTime onChange={onChange} onOk={onOk} />
						</div>
					</div>
				</div>
				<Divider />
				<a style={{ color: '#3B92FF' }}>+ Добавить еще период ремонта</a>
			</Card>
			<Button type='primary'>Сохранить</Button>
		</>
	)
}
