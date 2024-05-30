import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useEffect, useState } from 'react'

export type TFAQFormItem = {
	id: string
	title: string
	description: string
}

type THandlers = {
	onTitleUpdate: (id: string, value: string) => void
	onDescriptionUpdate: (id: string, value: string) => void
	onDelete: (id: string) => void
}

type TFAQItem = {
	item: TFAQFormItem
} & THandlers

const FAQItem = (props: TFAQItem) => {
	const { onTitleUpdate, onDescriptionUpdate, onDelete } = props

	const [title, setTitle] = useState<string>()
	const [description, setDescription] = useState<string>()

	useEffect(() => {
		setTitle(props.item.title)
		setDescription(props.item.description)
	}, [props.item.description, props.item.title])

	return (
		<div className='p-2 flex flex-column'>
			<label className='my-1'>Заголовок</label>
			<InputText
				value={title}
				onChange={(e) => {
					onTitleUpdate(props.item.id, e.target.value)
					setTitle(e.target.value)
				}}
			/>
			<label className='my-1'>Описание</label>
			<InputTextarea
				rows={10}
				value={description}
				onChange={(e) => {
					onDescriptionUpdate(props.item.id, e.target.value)
					setDescription(e.target.value)
				}}
			/>
			<Button
				onClick={() => onDelete(props.item.id)}
				severity='danger'
				outlined
				icon='pi pi-trash'
				className='mt-2'
				label='Удалить пункт'
			/>
		</div>
	)
}

const FAQList = (props: { items: Array<TFAQFormItem> } & THandlers) => {
	return props.items.map((item, index) => <FAQItem key={index} item={item} {...props} />)
}

type TFAQFormProps = {
	handleCreate: () => void
	handleUpdateTitle: (id: string, value: string) => void
	handleUpdateDescription: (id: string, value: string) => void
	handleDelete: (id: string) => void
	items: Array<TFAQFormItem>
}

export const FAQForm = (props: TFAQFormProps) => {
	const { handleCreate, handleUpdateTitle, handleUpdateDescription, handleDelete, items } = props

	return (
		<div className='flex flex-column'>
			<h3>Блок Часто задаваемые вопросы</h3>
			{items.length > 0 ? (
				<FAQList
					onDelete={handleDelete}
					onTitleUpdate={handleUpdateTitle}
					onDescriptionUpdate={handleUpdateDescription}
					items={items}
				/>
			) : (
				<p style={{ textAlign: 'center' }}>Пусто</p>
			)}
			<Button className='mt-4' icon='pi pi-plus' outlined onClick={handleCreate} label='Добавить ещё' />
		</div>
	)
}
