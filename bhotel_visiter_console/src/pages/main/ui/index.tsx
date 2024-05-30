/* eslint-disable @typescript-eslint/ban-ts-comment */
import { trpc } from '@helpers'
import { AdminPageTitle, CustomCheckbox } from '@widgets'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FAQForm, TFAQFormItem } from './FAQForm'
import { WrapperUpload } from './WrapperUpload'
import { v4 as uuidv4 } from 'uuid'

interface IMainPageFormData {
	cover_type: string
	display_discount: boolean
	display_booking: boolean
	display_popular: boolean
	display_faq: boolean
}

export const MainPage = () => {
	const mutation = trpc.setFrontendMainPage.useMutation()
	const appendFAQ = trpc.appendFAQItem.useMutation()
	const removeFAQ = trpc.deleteFAQItem.useMutation()

	const [behaviour, setBehaviour] = useState<string>('Статичный фон')
	const [items, setItems] = useState<Array<TFAQFormItem>>([])

	const [addedItems] = useState<Array<TFAQFormItem>>([])
	const [removedItems, setRemovedItems] = useState<Array<string>>([])

	const [data, setData] = useState<IMainPageFormData>()

	const [getSettings] = trpc.useQueries((t) => [t.getFrontendMainPage('67342c88-fd1e-425b-99b1-3cdc427b914a')])
	const getAllFAQ = trpc.useQueries((t) => [t.getAllFAQ()])

	const { control, handleSubmit, reset } = useForm<IMainPageFormData>({
		defaultValues: async () => {
			return getSettings.data!
		},
		mode: 'all'
	})

	useEffect(() => {
		const y = getAllFAQ[0].data

		if (y === undefined) return

		setItems(y)
	}, [getAllFAQ])

	useEffect(() => {
		setData(getSettings.data as IMainPageFormData)
	}, [getSettings.data])

	useEffect(() => {
		if (data !== undefined) {
			reset({ ...data })
		}
	}, [data, reset])

	const onSubmit: SubmitHandler<IMainPageFormData> = (formData) => {
		if (addedItems.length > 0) appendFAQ.mutate(addedItems)

		if (removedItems.length > 0) removeFAQ.mutate(removedItems)

		mutation.mutate({
			...formData,
			id: '67342c88-fd1e-425b-99b1-3cdc427b914a',
			frontend_id: '67342c88-fd1e-425b-99b1-3cdc427b914a'
		})
	}

	const handleCreate = () => {
		const item = { id: uuidv4(), title: '', description: '' }

		const orign = items

		orign.push(item)

		setItems(orign)
		// setAddedItems((prev) => [...prev, item])
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

		const element = origin.find((o) => o.id === id)

		if (element === undefined) return

		const index = origin.indexOf(element)

		if (index === -1) return

		origin.splice(index, 1)

		// setRemovedItems((prev) => [...prev, id])
		setItems(origin)
	}

	return (
		<>
			<AdminPageTitle title={'Главная страница'} />
			<form className='col-4' onSubmit={handleSubmit(onSubmit)}>
				<h3>Приветствие</h3>
				<Dropdown
					value={behaviour}
					onChange={(e) => setBehaviour(e.target.value)}
					className='col-12'
					placeholder='Выберете поведение фона'
					options={['Статичный фон', 'Карусель']}
				/>
				<WrapperUpload />
				<Controller
					name='display_discount'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать блок Скидок' {...field} />}
				/>
				<Controller
					name='display_booking'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать кнопку Забронировать номер' {...field} />}
				/>
				<Controller
					name='display_popular'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать блок Сейчас популярно' {...field} />}
				/>
				<Controller
					name='display_faq'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать блок Часто задаваемые вопросы' {...field} />}
				/>
				<FAQForm
					items={items}
					handleDelete={handleDelete}
					handleUpdateDescription={handleUpdateDescription}
					handleUpdateTitle={handleUpdateTitle}
					handleCreate={handleCreate}
				/>
				<Button label='Сохранить' icon='pi pi-save' className='col-12 mt-3' />
			</form>
		</>
	)
}
