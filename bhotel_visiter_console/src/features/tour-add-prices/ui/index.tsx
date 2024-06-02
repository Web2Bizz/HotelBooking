import { AddPriceTourContext } from '@contexts'
import { Button } from 'primereact/button'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TourAddPricesFormItem } from './TourAddPricesFormItem'
import { Faq } from '../../../../../packages/package.trpc-routes/@types'

type TTourAddPricesFormProps = {
	onDelete?: (id: string) => void
	onEdit?: (data: Faq) => void
	onAppend?: (data: Faq) => void
}

export const TourAddPricesForm = (props: TTourAddPricesFormProps) => {
	const context = useContext(AddPriceTourContext)
	const { onDelete, onEdit, onAppend } = props

	const hanbleAddToList = () => {
		const data = { id: uuidv4(), title: '', description: '' }
		context.setFields([...context.fields, data])
		onAppend?.(data)
	}

	//TODO сделать рефакторинг сдесь когда-нибудь в прекрасном далёком
	const onTitleChange = (id: string, value: string) => {
		const origin = context.fields

		const item = origin.find((item) => item.id === id)
		if (item === undefined) return

		const index = origin.indexOf(item)

		origin[index].title = value

		onEdit?.(origin[index])

		context.setFields(origin)
	}

	const onDescriptionChange = (id: string, value: string) => {
		const origin = context.fields

		const item = origin.find((item) => item.id === id)
		if (item === undefined) return

		const index = origin.indexOf(item)

		origin[index].description = value

		onEdit?.(origin[index])

		context.setFields(origin)
	}

	const handleDeleteFromList = (id: string) => {
		const origin = context.fields
		const result = origin.filter((r) => r.id !== id)

		onDelete?.(id)

		context.setFields(result)
	}

	return (
		<div className='flex flex-column'>
			<h3>Частозадаваемые вопросы</h3>
			<div className='flex flex-column gap-3 mb-3'>
				{context.fields.map((item) => (
					<TourAddPricesFormItem
						key={item.id}
						onTitleChange={onTitleChange}
						onDescriptionChange={onDescriptionChange}
						onDelete={handleDeleteFromList}
						data={item}
						id={item.id}
					/>
				))}
			</div>
			<Button
				label='Добавить новый пункт'
				outlined
				onClick={(e) => {
					hanbleAddToList()
					e.preventDefault()
				}}
			/>
		</div>
	)
}
