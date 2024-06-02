import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Faq } from '../../../../../packages/package.trpc-routes/@types'

type TTourAddPricesFormItemProps = {
	onTitleChange: (id: string, value: string) => void
	onDescriptionChange: (id: string, value: string) => void
	onDelete: (id: string) => void
	data: Faq
	id: string
}

export const TourAddPricesFormItem = (props: TTourAddPricesFormItemProps) => {
	const { onDelete, data, id, onDescriptionChange, onTitleChange } = props

	return (
		<div className='flex flex-column justify-content-between'>
			<p>Заголовок вопроса</p>
			<InputText
				defaultValue={data.title}
				onChange={(e) => {
					onTitleChange(id, e.target.value)
				}}
			/>
			<p>Ответ на вопрос</p>
			<InputTextarea
				rows={7}
				defaultValue={data.description}
				onChange={(e) => {
					onDescriptionChange(id, e.target.value)
				}}
			/>
			<Button
				outlined
				className='mt-2'
				severity='danger'
				label='Удалить'
				onClick={(e) => {
					e.preventDefault()
					onDelete(data.id)
				}}
			/>
		</div>
	)
}
