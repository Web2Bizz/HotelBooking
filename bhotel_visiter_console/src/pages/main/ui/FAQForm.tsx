import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type TFAQFormItem = {
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
			<>{props.item.id}</>
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
				className='mt-2'
				label='Удалить пункт'
			/>
		</div>
	)
}

const FAQList = (props: { items: Array<TFAQFormItem> } & THandlers) => {
	return props.items.map((item, index) => <FAQItem key={index} item={item} {...props} />)
}

export const FAQForm = () => {
	const [items, setItems] = useState<Array<TFAQFormItem>>([])

	const handleCreate = () => {
		setItems((prev) => [...prev, { id: uuidv4(), title: '', description: '' }])
	}

	const handleUpdateTitle = (id: string, value: string) => {
		const origin = items

		const element = origin.find((o) => o.id === id)

		if (element === undefined) return

		const index = origin.indexOf(element)

		if (index === -1) return

		origin[index].title = value

		setItems(origin)
	}

	const handleUpdateDescription = (id: string, value: string) => {
		const origin = items

		const element = origin.find((o) => o.id === id)

		if (element === undefined) return

		const index = origin.indexOf(element)

		if (index === -1) return

		origin[index].description = value

		setItems(origin)
	}

	const handleDelete = (id: string) => {
		const origin = items

		console.log(id)

		const element = origin.find((o) => o.id === id)

		if (element === undefined) return

		const index = origin.indexOf(element)

		console.log(index)

		if (index === -1) return

		origin.splice(index, 1)

		console.log(origin)

		setItems(origin)
	}

	return (
		<div className='flex flex-column'>
			<h3>Часто задаваемые вопросы</h3>
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
			<Button className='mt-4' onClick={handleCreate} label='Добавить ещё' />
		</div>
	)
}
