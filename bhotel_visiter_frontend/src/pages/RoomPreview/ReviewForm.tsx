import { trpc } from '@helpers'
import { Button, Input, Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState, useEffect } from 'react'

interface IFormHeaderSettings {
	display_logo: boolean
	display_label: boolean
	display_search: boolean
	display_booking: boolean
	display_details: boolean
	background_color: string
}

export const ReviewForm = () => {
	const [getHeaderSettings] = trpc.useQueries((t) => [t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')])
	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()
	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'column', marginBlock: 10 }}>
				<label style={{ fontSize: 26, marginTop: 15, marginBottom: 10 }}>Оценка</label>
				<Rate />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', marginBlock: 10 }}>
				<label style={{ fontSize: 26, marginTop: 15, marginBottom: 10 }}>Текст отзыва</label>
				<TextArea style={{ height: 200, fontSize: 18 }} placeholder='Напишите отзыв' />
			</div>
			<Button type='primary' style={{ height: 50, backgroundColor: headerData.background_color }}>
				Отправить
			</Button>
		</div>
	)
}
