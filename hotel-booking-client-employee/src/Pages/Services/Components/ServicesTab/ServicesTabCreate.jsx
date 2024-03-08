import { useState } from 'react'
import { Button, message, Steps } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import TabCreateStep1 from './TabCreateStep1'
import TabCreateStep2 from './TabCreateStep2'
import TabCreateStep3 from './TabCreateStep3'
const steps = [
	{
		title: 'Тип и название',
		content: <TabCreateStep1 />
	},
	{
		title: 'Ценообразование',
		content: <TabCreateStep2 />
	},
	{
		title: 'Оформление',
		content: <TabCreateStep3 />
	}
]
export default function ServicesTabCreate(props) {
	const [current, setCurrent] = useState(0)
	const next = () => {
		setCurrent(current + 1)
	}
	const prev = () => {
		setCurrent(current - 1)
	}
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title
	}))
	const onBackButton = () => {
		props.setIsServiceTabCreate(false)
	}
	return (
		<>
			<h2>Создание услуги</h2>
			<Button
				style={{ marginTop: '1vh', marginBottom: '1vh' }}
				type='text'
				icon={<ArrowLeftOutlined />}
				onClick={() => onBackButton()}
			>
				Отмена
			</Button>
			<Steps current={current} items={items} />
			<div>{steps[current].content}</div>
			<div
				style={{
					marginTop: 24
				}}
			>
				{current < steps.length - 1 && (
					<Button type='primary' onClick={() => next()}>
						Дальше
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type='primary' onClick={() => message.success('Processing complete!')}>
						Создать
					</Button>
				)}
				{current > 0 && (
					<Button
						style={{
							margin: '0 8px'
						}}
						onClick={() => prev()}
					>
						Назад
					</Button>
				)}
			</div>
		</>
	)
}
