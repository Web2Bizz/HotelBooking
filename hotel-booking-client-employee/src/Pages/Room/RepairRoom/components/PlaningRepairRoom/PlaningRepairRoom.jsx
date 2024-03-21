import { Radio, Card, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import '../../style.scss'

export default function PlaningRepairRoom(props) {
	const onBackButton = () => {
		props.setIsPlaning(false)
	}
	return (
		<>
			<div className='d-f justify-content-between' style={{ marginBottom: '1vh' }}>
				<h2>Планирование ремонтных работ</h2>
				<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
					Назад
				</Button>
			</div>
			<div className='planing-wrapper'>
				<Card title='Покраска стен' style={{ marginBottom: '2vh' }}>
					<div className='planing-container'>
						<div className='planing-info'>
							<div className='planing-info-date'>
								<div>
									<p>Начало ремонта</p>
									<span>2022-01-10</span>
								</div>
								<div>
									<p>Окончание ремонта</p>
									<span>2022-01-12</span>
								</div>
							</div>
							<div>
								<p>Описание работы</p>
								<span>Покрасить стены в спальне</span>
							</div>
						</div>
						<div className='planing-radio'>
							<Radio.Group defaultValue='a' buttonStyle='solid'>
								<Radio.Button value='a'>Новая задача</Radio.Button>
								<Radio.Button value='b'>Начать задачу</Radio.Button>
								<Radio.Button value='c'>Завершить задачу</Radio.Button>
								<Radio.Button value='d'>Отменить задачу</Radio.Button>
							</Radio.Group>
						</div>
					</div>
				</Card>

				<div className='d-f justify-content-end'>
					<Button type='primary'>Сохранить</Button>
				</div>
			</div>
		</>
	)
}
